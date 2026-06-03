import { NextResponse } from "next/server";

/**
 * Code-guess endpoint with INSTANT feedback + rank.
 *
 *   POST { email, product, guess }
 *        → { correct, rank, count, threshold, unlocked }
 *          correct: was this guess right (instant dopamine)
 *          rank:    if correct, the member's position among solvers (1 = first).
 *                   Prestige is by SPEED, so a leaked answer only mints
 *                   high-rank latecomers.
 *          count:   how many people have TRIED (drives the collective unlock)
 *   GET  ?product=app → { count, threshold, unlocked }
 *
 * Answers live server-side. One row per member per product in the "Unlocks"
 * table: Email (single line), Product (single line), Correct (checkbox),
 * Rank (number), Cracked At (date/time). Non-blocking: with Airtable
 * unconfigured, correctness still works (computed here) but rank/count are null.
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const THRESHOLDS: Record<string, number> = { app: 1000 };
const DEFAULT_THRESHOLD = 1000;
const thresholdFor = (p: string) => THRESHOLDS[p] ?? DEFAULT_THRESHOLD;

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
  return s.toLowerCase().trim().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ");
}
function isCorrect(product: string, guess: string) {
  const v = normalize(guess);
  if (!v) return false;
  return (ANSWERS[product] ?? []).some((a) => v === a || v.includes(a));
}

type Cfg = { token: string; table: string };
function airtable(): Cfg | null {
  const token = process.env.AIRTABLE_TOKEN;
  const table = process.env.AIRTABLE_UNLOCKS_TABLE;
  return token && table ? { token, table } : null;
}
const escapeFormula = (s: string) => s.replace(/'/g, "\\'");

async function countRows(filterFormula: string, cap: number, cfg: Cfg) {
  const filter = encodeURIComponent(filterFormula);
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

const countTrying = (product: string, cfg: Cfg) =>
  countRows(`{Product}='${escapeFormula(product)}'`, thresholdFor(product) + 1, cfg);
const countCorrect = (product: string, cfg: Cfg) =>
  countRows(`AND({Product}='${escapeFormula(product)}',{Correct})`, 1_000_000, cfg);

async function findRow(email: string, product: string, cfg: Cfg) {
  if (!EMAIL_RE.test(email)) return null;
  const filter = encodeURIComponent(
    `AND({Email}='${escapeFormula(email)}',{Product}='${escapeFormula(product)}')`
  );
  const res = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${cfg.table}?filterByFormula=${filter}&pageSize=1`,
    { headers: { Authorization: `Bearer ${cfg.token}` } }
  );
  if (!res.ok) return null;
  const data = (await res.json()) as {
    records?: { id: string; fields?: { Correct?: boolean; Rank?: number } }[];
  };
  return data.records?.[0] ?? null;
}

async function writeRow(
  cfg: Cfg,
  recordId: string | null,
  fields: Record<string, unknown>
) {
  const base = `https://api.airtable.com/v0/${BASE_ID}/${cfg.table}`;
  if (recordId) {
    await fetch(`${base}/${recordId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ typecast: true, fields }),
    });
  } else {
    await fetch(base, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ typecast: true, records: [{ fields }] }),
    });
  }
}

export async function GET(request: Request) {
  const product = (new URL(request.url).searchParams.get("product") ?? "")
    .trim()
    .slice(0, 64);
  if (!product) return NextResponse.json({ error: "Missing product." }, { status: 422 });
  const threshold = thresholdFor(product);
  const cfg = airtable();
  if (!cfg) return NextResponse.json({ count: null, threshold, unlocked: false });
  try {
    const count = await countTrying(product, cfg);
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
  if (!product) return NextResponse.json({ error: "Missing product." }, { status: 422 });

  const threshold = thresholdFor(product);
  const correct = isCorrect(product, guess);
  const cfg = airtable();
  if (!cfg) {
    // Instant feedback still works; rank/count need Airtable.
    return NextResponse.json({ correct, rank: null, count: null, threshold });
  }

  try {
    const row = await findRow(email, product, cfg);

    // Already solved → return their existing rank.
    if (row?.fields?.Correct) {
      const count = await countTrying(product, cfg);
      return NextResponse.json({
        correct: true,
        rank: row.fields.Rank ?? null,
        count,
        threshold,
        unlocked: count >= threshold,
      });
    }

    let rank: number | null = null;
    if (correct) {
      rank = (await countCorrect(product, cfg)) + 1;
      await writeRow(cfg, row?.id ?? null, {
        ...(EMAIL_RE.test(email) ? { Email: email } : {}),
        Product: product,
        Correct: true,
        Rank: rank,
        "Cracked At": new Date().toISOString(),
      });
    } else if (!row) {
      // First (wrong) attempt still counts the member as "trying".
      await writeRow(cfg, null, {
        ...(EMAIL_RE.test(email) ? { Email: email } : {}),
        Product: product,
        Correct: false,
        "Cracked At": new Date().toISOString(),
      });
    }

    const count = await countTrying(product, cfg);
    return NextResponse.json({
      correct,
      rank,
      count,
      threshold,
      unlocked: count >= threshold,
    });
  } catch (err) {
    console.error("Unlock POST failed:", err);
    return NextResponse.json({ correct, rank: null, count: null, threshold });
  }
}
