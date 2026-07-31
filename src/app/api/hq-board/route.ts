import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * HQ Board tasks — read + move, backed by the "HQ Board" Airtable table.
 *
 * Gated: requires a signed-in HQ session (the middleware only covers page
 * routes, not /api, so we check auth() here). The Airtable token stays
 * server-side and is never exposed to the browser.
 *
 *   AIRTABLE_TOKEN            (required) Airtable personal access token
 *   AIRTABLE_BASE_ID          (optional) defaults to the Ethostrategy base
 *   AIRTABLE_HQ_BOARD_TABLE   (optional) defaults to the HQ Board table
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const TABLE_ID = process.env.AIRTABLE_HQ_BOARD_TABLE ?? "tblOeD8LCFbKbnWtS";

const F = {
  task: "fld8CgAuOAFV4MWCB",
  stream: "fld7OTtShiTnp8jBm",
  status: "fldStyLldrTKsG542",
  due: "fldQXQjGddvJaJtzq",
  order: "fldMuT0R3Zq32Oaos",
} as const;

const STATUSES = ["Up next", "In progress", "Done"] as const;

type AirtableRecord = { id: string; fields: Record<string, unknown> };

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) return NextResponse.json({ error: "Board is not configured." }, { status: 503 });

  try {
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?pageSize=100&returnFieldsByFieldId=true`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("HQ board read error:", res.status, await res.text());
      return NextResponse.json({ error: "Could not load the board." }, { status: 502 });
    }
    const data = (await res.json()) as { records?: AirtableRecord[] };
    const tasks = (data.records ?? []).map((r) => ({
      id: r.id,
      task: String(r.fields[F.task] ?? ""),
      stream: String(r.fields[F.stream] ?? ""),
      status: String(r.fields[F.status] ?? "Up next"),
      due: String(r.fields[F.due] ?? ""),
      order: typeof r.fields[F.order] === "number" ? (r.fields[F.order] as number) : 0,
    }));
    return NextResponse.json({ tasks });
  } catch (err) {
    console.error("HQ board GET failed:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) return NextResponse.json({ error: "Board is not configured." }, { status: 503 });

  let body: { id?: string; status?: string; order?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  const id = (body.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "Missing task id." }, { status: 422 });

  const fields: Record<string, string | number> = {};
  if (body.status && (STATUSES as readonly string[]).includes(body.status)) fields[F.status] = body.status;
  if (typeof body.order === "number") fields[F.order] = body.order;
  if (Object.keys(fields).length === 0) return NextResponse.json({ error: "Nothing to update." }, { status: 422 });

  try {
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ typecast: true, records: [{ id, fields }] }),
    });
    if (!res.ok) {
      console.error("HQ board write error:", res.status, await res.text());
      return NextResponse.json({ error: "Could not save the move." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("HQ board PATCH failed:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
