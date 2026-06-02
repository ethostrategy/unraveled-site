import { NextResponse } from "next/server";

/**
 * Records that a member cracked a product's code, and reports how close the
 * community is to collectively unlocking it.
 *
 *   POST { email, product }  → records the crack (deduped by email+product),
 *                              returns { count, threshold, unlocked }
 *   GET  ?product=app        → returns { count, threshold, unlocked }
 *
 * Server-side only (Airtable token never reaches the browser). Non-blocking: the
 * client also persists the personal crack locally, so an unconfigured Airtable
 * just yields count:null instead of an error.
 *
 * Env:
 *   AIRTABLE_TOKEN          (required to store/count) personal access token
 *   AIRTABLE_BASE_ID        (optional) defaults to the Ethostrategy base
 *   AIRTABLE_UNLOCKS_TABLE  (required to store/count) the "Unlocks" table id
 *
 * Suggested "Unlocks" table fields: Email (single line), Product (single line),
 * Cracked At (date/time).
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Collective unlock goal per product. Tune per product over time.
const THRESHOLDS: Record<string, number> = { app: 1000 };
const DEFAULT_THRESHOLD = 1000;
function thresholdFor(product: string) {
  return THRESHOLDS[product] ?? DEFAULT_THRESHOLD;
}

function airtable() {
  const token = process.env.AIRTABLE_TOKEN;
  const table = process.env.AIRTABLE_UNLOCKS_TABLE;
  return token && table ? { token, table } : null;
}

function escapeFormula(s: string) {
  return s.replace(/'/g, "\\'");
}

// Count crack rows for a product. Stops once it's clearly past the threshold.
async function countUnlocks(
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

async function existing(
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
    const count = await countUnlocks(product, cfg);
    return NextResponse.json({ count, threshold, unlocked: count >= threshold });
  } catch {
    return NextResponse.json({ count: null, threshold, unlocked: false });
  }
}

export async function POST(request: Request) {
  let body: { email?: string; product?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  const product = (body.product ?? "").trim().slice(0, 64);
  if (!product) {
    return NextResponse.json({ error: "Missing product." }, { status: 422 });
  }
  const threshold = thresholdFor(product);
  const cfg = airtable();
  if (!cfg) {
    return NextResponse.json({ ok: true, stored: false, count: null, threshold });
  }

  try {
    // Dedupe: one crack per member per product.
    const already = await existing(email, product, cfg);
    if (!already) {
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
                "Cracked At": new Date().toISOString(),
              },
            },
          ],
        }),
      });
    }
    const count = await countUnlocks(product, cfg);
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
