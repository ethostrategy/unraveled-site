import { NextResponse } from "next/server";

/**
 * Records that a member cracked a product's code → the launch early-access list.
 * Server-side only (Airtable token never reaches the browser).
 *
 * Non-blocking by design: the client already persists the unlock locally, so if
 * Airtable isn't configured yet this returns { stored: false } instead of an
 * error.
 *
 * Env:
 *   AIRTABLE_TOKEN          (required to store) personal access token
 *   AIRTABLE_BASE_ID        (optional) defaults to the Ethostrategy base
 *   AIRTABLE_UNLOCKS_TABLE  (required to store) the "Unlocks" table id
 *
 * Suggested "Unlocks" table fields: Email (single line), Product (single line),
 * Cracked At (date/time). Optionally link Email to the Waitlist table.
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const token = process.env.AIRTABLE_TOKEN;
  const table = process.env.AIRTABLE_UNLOCKS_TABLE;
  // Not configured yet — succeed quietly; the client keeps the local record.
  if (!token || !table) {
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${table}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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

    if (!res.ok) {
      console.error("Airtable unlock error:", res.status, await res.text());
      return NextResponse.json({ ok: true, stored: false }, { status: 200 });
    }
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("Unlock POST failed:", err);
    return NextResponse.json({ ok: true, stored: false }, { status: 200 });
  }
}
