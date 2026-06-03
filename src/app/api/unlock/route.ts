import { NextResponse } from "next/server";

/**
 * Records a code-guess attempt and reports how many people are trying.
 *
 *   POST { email, product, guess }  → records the attempt (deduped per member),
 *                                     silently flags whether it was correct,
 *                                     returns { count, threshold, unlocked }.
 *                                     NEVER tells the client if they were right.
 *   GET  ?product=app               → returns { count, threshold, unlocked }
 *
 * Answers live here (server-side) so correctness can't be inspected in the
 * browser — the whole point is that nobody knows if they cracked it until
 * launch. `count` is how many people have TRIED (not how many were correct), so
 * the public counter can't be reverse-engineered into "the word works."
 *
 * Env:
 *   AIRTABLE_TOKEN          (required to store/count)
 *   AIRTABLE_BASE_ID        (optional) defaults to the Ethostrategy base
 *   AIRTABLE_UNLOCKS_TABLE  (required to store/count) the "Unlocks" table id
 *
 * "Unlocks" table fields: Email (single line), Product (single line),
 * Correct (checkbox), Cracked At (date/time).
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-product collective "people trying" goal.
const THRESHOLDS: Record<string, number> = { app: 1000 };
const DEFAULT_THRESHOLD = 1000;
const thresholdFor = (p: string) => THRESHOLDS[p] ?? DEFAULT_THRESHOLD;

// Accepted answers per product (server-side only).
const ANSWERS: Record<string, string[]> = {
  app: [
    "level up",
    "levelup",
    "level up relationships",
    "level up your relationships",
    "grow",
  ],
};

function normalize(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ");
}

function isCorrect(product: string, guess: string) {
  const v = normalize(guess);
  if (!v) return false;
  return (ANSWERS[product] ?? []).some((a) => v === a || v.includes(a));
}

function airtable() {
  const token = process.env.AIRTABLE_TOKEN;
  const table = process.env.AIRTABLE_UNLOCKS_TABLE;
  return token && table ? { token, table } : null;
}

const escapeFormula = (s: string) => s.replace(/'/g, "\\'");

// How many people have tried this product (one per member). Stops past cap.
async function countAttempts(
  product: string,
  cfg: { token: string; table: string }
): Promise<number> {
  const filter = encodeURIComponent(`{Product}='${escapeFormula(product)}'`);
  const cap = thresholdFor(product) + 1;
  let count = 0;
  let offset: string | undefined;
  do {
    const url =
      `https://api.airtable.com/v0/${BASE_ID}/${cfg.table}` +
      `?filterByFormula=${filter}&pageSize=100&fields%5B%5D=Product` +
      (offset ? `&offset=${offset}` : "");
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${cfg.token}` },
    });
    if (!res.ok) break;
    const data = (await res.json()) as { records?: unknown[]; offset?: string };
    count += data.records?.length ?? 0;
    offset = data.offset;
  } while (offset && count < cap);
  return count;
}

async function alreadyTried(
  email: string,
  product: string,
  cfg: { token: string; table: string }
): Promise<boolean> {
  if (!EMAIL_RE.test(email)) return false;
  const filter = encodeURIComponent(
    `AND({Email}='${escapeFormula(email)}',{Product}='${escapeFormula(product)}')`
  );
  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${cfg.table}?filterByFormula=${filter}&pageSize=1`,
    { headers: { Authorization: `Bearer ${cfg.token}` } }
  );
  if (!res.ok) return false;
  const data = (await res.json()) as { records?: unknown[] };
  return (data.records?.length ?? 0) > 0;
}

export async function GET(request: Request) {
  const product = (new URL(request.url).searchParams.get("product") ?? "")
    .trim()
    .slice(0, 64);
  if (!product) {
    return NextResponse.json({ error: "Missing product." }, { status: 422 });
  }
  const threshold = thresholdFor(product);
  const cfg = airtable();
  if (!cfg) return NextResponse.json({ count: null, threshold, unlocked: false });
  try {
    const count = await countAttempts(product, cfg);
    return NextResponse.json({ count, threshold, unlocked: count >= threshold });
  } catch {
    return NextResponse.json({ count: null, threshold, unlocked: false });
  }
}

export async function POST(request: Request) {
  let body: { email?: string; product?: string; guess?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const product = (body.product ?? "").trim().slice(0, 64);
  const guess = (body.guess ?? "").slice(0, 120);
  if (!product) {
    return NextResponse.json({ error: "Missing product." }, { status: 422 });
  }
  const threshold = thresholdFor(product);
  const correct = isCorrect(product, guess); // recorded, never returned
  const cfg = airtable();
  if (!cfg) {
    return NextResponse.json({ ok: true, stored: false, count: null, threshold });
  }

  try {
    if (!(await alreadyTried(email, product, cfg))) {
      await fetch(`https://api.airtable.com/v0/${BASE_ID}/${cfg.table}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cfg.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typecast: true,
          records: [
            {
              fields: {
                ...(EMAIL_RE.test(email) ? { Email: email } : {}),
                Product: product,
                Correct: correct,
                "Cracked At": new Date().toISOString(),
              },
            },
          ],
        }),
      });
    }
    const count = await countAttempts(product, cfg);
    return NextResponse.json({
      ok: true,
      stored: true,
      count,
      threshold,
      unlocked: count >= threshold,
    });
  } catch (err) {
    console.error("Unlock POST failed:", err);
    return NextResponse.json({ ok: true, stored: false, count: null, threshold });
  }
}
