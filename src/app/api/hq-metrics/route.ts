import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * HQ Metrics — live KPIs + monthly expenses, backed by the "HQ Metrics"
 * Airtable table (one row per metric). Read-only: Madhuri + Will edit the
 * Current values directly in Airtable, the Metrics tab just reflects them.
 *
 * Gated: requires a signed-in HQ session (middleware only covers page routes,
 * not /api, so we check auth() here). The Airtable token stays server-side.
 *
 *   AIRTABLE_TOKEN              (required) Airtable personal access token
 *   AIRTABLE_BASE_ID            (optional) defaults to the Ethostrategy base
 *   AIRTABLE_HQ_METRICS_TABLE   (optional) defaults to the HQ Metrics table
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const TABLE_ID = process.env.AIRTABLE_HQ_METRICS_TABLE ?? "tblI7WqVxfMnlklcG";

const F = {
  name: "fldM023iYsq6RcG5y",
  section: "fldIRjqpDE4l5cqYP",
  group: "fldbeAanEyINX60tl",
  current: "fldFMiOcDPGCw8ajq",
  target: "fldrgLbAyO0wEiT4t",
  unit: "fldamc9hEh8VzKJJt",
  order: "fldCnye7FQYlT8M9S",
  note: "fldgjFHhC8jqYYYh0",
} as const;

type AirtableRecord = { id: string; fields: Record<string, unknown> };

const str = (v: unknown) => (typeof v === "string" ? v : "");
const num = (v: unknown) => (typeof v === "number" ? v : 0);
const optNum = (v: unknown) => (typeof v === "number" ? v : null);

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
    }));
    return NextResponse.json({ items });
  } catch (err) {
    console.error("HQ metrics GET failed:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
