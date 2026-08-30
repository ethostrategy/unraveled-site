import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * HQ Pipeline — the sales pipeline, backed by the "HQ Pipeline" Airtable table
 * (one row per lead/opportunity). Read-only: Madhuri + Will move leads through
 * stages in Airtable, the Metrics tab just reflects it.
 *
 * Gated on a signed-in HQ session; the Airtable token stays server-side.
 *
 *   AIRTABLE_TOKEN               (required) Airtable personal access token
 *   AIRTABLE_BASE_ID             (optional) defaults to the Ethostrategy base
 *   AIRTABLE_HQ_PIPELINE_TABLE   (optional) defaults to the HQ Pipeline table
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const TABLE_ID = process.env.AIRTABLE_HQ_PIPELINE_TABLE ?? "tblp3WALVyOT6N56Q";

const F = {
  name: "fld9rTmxWYZf26biL",
  type: "fldEyidy83FKs10Gs",
  stage: "fldh3nggqFhyuiQ8Q",
  value: "fldPU7LPuOeJGPITT",
  owner: "fld8qEejAtadeFthx",
  note: "flddurK7DF2aiYlC8",
  order: "fldZToxSn3tKziFO9",
} as const;

type AirtableRecord = { id: string; fields: Record<string, unknown> };

const str = (v: unknown) => (typeof v === "string" ? v : "");
const num = (v: unknown) => (typeof v === "number" ? v : 0);

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) return NextResponse.json({ error: "Pipeline is not configured." }, { status: 503 });

  try {
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100&returnFieldsByFieldId=true`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      console.error("HQ pipeline read error:", res.status, await res.text());
      return NextResponse.json({ error: "Could not load the pipeline." }, { status: 502 });
    }
    const data = (await res.json()) as { records?: AirtableRecord[] };
    const items = (data.records ?? []).map((r) => ({
      id: r.id,
      name: str(r.fields[F.name]),
      type: str(r.fields[F.type]),
      stage: str(r.fields[F.stage]),
      value: num(r.fields[F.value]),
      owner: str(r.fields[F.owner]),
      note: str(r.fields[F.note]),
      order: num(r.fields[F.order]),
    }));
    return NextResponse.json({ items });
  } catch (err) {
    console.error("HQ pipeline GET failed:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
