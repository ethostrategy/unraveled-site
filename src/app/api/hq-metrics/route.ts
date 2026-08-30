import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * HQ Metrics — live KPIs + monthly expenses, backed by the "HQ Metrics"
 * Airtable table (one row per metric). Read-only: Madhuri + Will edit the
 * Current values directly in Airtable, the Metrics tab just reflects them.
 *
 * Auto-fill: a metric whose Source is "Waitlist" ignores its typed Current and
 * shows the live signup count from the waitlist table instead. (Beehiiv /
 * Instagram / TikTok sources are reserved for later integrations.)
 *
 * Gated: requires a signed-in HQ session; the Airtable token stays server-side.
 *
 *   AIRTABLE_TOKEN              (required) Airtable personal access token
 *   AIRTABLE_BASE_ID            (optional) defaults to the Ethostrategy base
 *   AIRTABLE_HQ_METRICS_TABLE   (optional) defaults to the HQ Metrics table
 *   AIRTABLE_WAITLIST_TABLE     (optional) defaults to the Unraveled Waitlist table
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const TABLE_ID = process.env.AIRTABLE_HQ_METRICS_TABLE ?? "tblI7WqVxfMnlklcG";
const WAITLIST_TABLE = process.env.AIRTABLE_WAITLIST_TABLE ?? "tblKcLlDbUpXMQjy4";

const F = {
  name: "fldM023iYsq6RcG5y",
  section: "fldIRjqpDE4l5cqYP",
  group: "fldbeAanEyINX60tl",
  current: "fldFMiOcDPGCw8ajq",
  target: "fldrgLbAyO0wEiT4t",
  unit: "fldamc9hEh8VzKJJt",
  order: "fldCnye7FQYlT8M9S",
  note: "fldgjFHhC8jqYYYh0",
  source: "fldAm9PFzKxQic91F",
} as const;

type AirtableRecord = { id: string; fields: Record<string, unknown> };

const str = (v: unknown) => (typeof v === "string" ? v : "");
const num = (v: unknown) => (typeof v === "number" ? v : 0);
const optNum = (v: unknown) => (typeof v === "number" ? v : null);

// Live count of all rows in the waitlist table (paginated), for the auto-sourced KPI.
async function waitlistCount(token: string): Promise<number | null> {
  try {
    let count = 0;
    let offset: string | undefined;
    do {
      const url = `https://api.airtable.com/v0/${BASE_ID}/${WAITLIST_TABLE}?pageSize=100${offset ? `&offset=${offset}` : ""}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 60 } });
      if (!res.ok) return null;
      const data = (await res.json()) as { records?: unknown[]; offset?: string };
      count += data.records?.length ?? 0;
      offset = data.offset;
    } while (offset);
    return count;
  } catch {
    return null;
  }
}

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) return NextResponse.json({ error: "Metrics are not configured." }, { status: 503 });

  try {
    // returnFieldsByFieldId=true so fields are keyed by field ID (F.*), not name.
    // Cache 30s so repeated opens don't each round-trip; edits show within ~30s.
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100&returnFieldsByFieldId=true`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      console.error("HQ metrics read error:", res.status, await res.text());
      return NextResponse.json({ error: "Could not load the metrics." }, { status: 502 });
    }
    const data = (await res.json()) as { records?: AirtableRecord[] };
    const items = (data.records ?? []).map((r) => ({
      id: r.id,
      name: str(r.fields[F.name]),
      section: str(r.fields[F.section]),
      group: str(r.fields[F.group]),
      current: num(r.fields[F.current]),
      target: optNum(r.fields[F.target]),
      unit: str(r.fields[F.unit]),
      order: num(r.fields[F.order]),
      note: str(r.fields[F.note]),
      source: str(r.fields[F.source]),
    }));

    // Auto-fill: metrics sourced from "Waitlist" show the live signup count.
    if (items.some((m) => m.source === "Waitlist")) {
      const wc = await waitlistCount(token);
      if (wc != null) for (const m of items) if (m.source === "Waitlist") m.current = wc;
    }

    return NextResponse.json({ items });
  } catch (err) {
    console.error("HQ metrics GET failed:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
