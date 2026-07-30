import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * HQ Weeks — the founders' weekly plan, backed by the "HQ Weeks" Airtable
 * table (one row per focus item). Read-only: Madhuri + Will edit directly in
 * Airtable, the page just reflects it.
 *
 * Gated: requires a signed-in HQ session (the middleware only covers page
 * routes, not /api, so we check auth() here). The Airtable token stays
 * server-side and is never exposed to the browser.
 *
 *   AIRTABLE_TOKEN            (required) Airtable personal access token
 *   AIRTABLE_BASE_ID          (optional) defaults to the Ethostrategy base
 *   AIRTABLE_HQ_WEEKS_TABLE   (optional) defaults to the HQ Weeks table
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const TABLE_ID = process.env.AIRTABLE_HQ_WEEKS_TABLE ?? "tbln4lsExsXlykYVG";

const F = {
  title: "fldzznOdEkmIxdhjg",
  week: "fldMllL4EjwyEMwtV",
  dates: "fldJ9b0zY6CxRmqPs",
  person: "fldR1qo6zGnfnNHT2",
  detail: "fldrVX3zxpHERjY21",
  milestone: "fldkgz8RH1S9cCTAE",
  deliverable: "fldAVb3ppDuOJsgd4",
  done: "fldKyP1JOzL8OylW7",
  order: "fldjr4HKfiSKIQMlE",
  link: "fldsMYdbI0wHzrmum",
} as const;

type AirtableRecord = { id: string; fields: Record<string, unknown> };

const str = (v: unknown) => (typeof v === "string" ? v : "");
const num = (v: unknown) => (typeof v === "number" ? v : 0);

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) return NextResponse.json({ error: "Weeks are not configured." }, { status: 503 });

  try {
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("HQ weeks read error:", res.status, await res.text());
      return NextResponse.json({ error: "Could not load the weeks." }, { status: 502 });
    }
    const data = (await res.json()) as { records?: AirtableRecord[] };
    const items = (data.records ?? []).map((r) => ({
      id: r.id,
      title: str(r.fields[F.title]),
      week: num(r.fields[F.week]),
      dates: str(r.fields[F.dates]),
      person: str(r.fields[F.person]),
      detail: str(r.fields[F.detail]),
      milestone: str(r.fields[F.milestone]),
      deliverable: str(r.fields[F.deliverable]),
      done: r.fields[F.done] === true,
      order: num(r.fields[F.order]),
      link: str(r.fields[F.link]),
    }));
    return NextResponse.json({ items });
  } catch (err) {
    console.error("HQ weeks GET failed:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
