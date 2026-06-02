import { NextResponse } from "next/server";

/**
 * Waitlist signup endpoint → writes one row to Airtable.
 *
 * Runs server-side only, so the Airtable token is never exposed to the
 * browser. Configure these env vars (locally in .env.local, and in the
 * Netlify dashboard → Site settings → Environment variables):
 *
 *   AIRTABLE_TOKEN           (required) Airtable personal access token
 *   AIRTABLE_BASE_ID         (optional) defaults to the Ethostrategy base
 *   AIRTABLE_WAITLIST_TABLE  (optional) defaults to the Unraveled Waitlist table
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const TABLE_ID = process.env.AIRTABLE_WAITLIST_TABLE ?? "tblKcLlDbUpXMQjy4";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A short, unambiguous, URL-safe invite code (no 0/O/1/I to avoid confusion).
function makeReferralCode(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 7; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

export async function POST(request: Request) {
  let body: {
    firstName?: string;
    lastName?: string;
    email?: string;
    referredBy?: string; // referral code of the person who shared the link
    company?: string; // honeypot — real users leave this empty
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success without storing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const firstName = (body.firstName ?? "").trim();
  const lastName = (body.lastName ?? "").trim();
  const email = (body.email ?? "").trim();
  const referredBy = (body.referredBy ?? "").trim().slice(0, 32);

  if (!firstName || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide your first name and a valid email." },
      { status: 422 }
    );
  }

  // A short, URL-safe code this signup can share to invite friends.
  const referralCode = makeReferralCode();

  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    console.error("AIRTABLE_TOKEN is not set.");
    return NextResponse.json(
      { error: "Signups are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // typecast lets Airtable accept the single-select values as-is
          typecast: true,
          records: [
            {
              fields: {
                Email: email,
                "First Name": firstName,
                // Last Name is optional now — only send it when provided.
                ...(lastName ? { "Last Name": lastName } : {}),
                "Submitted At": new Date().toISOString(),
                Source: "Splash page",
                Status: "Waitlist",
                "Referral Code": referralCode,
                ...(referredBy ? { "Referred By": referredBy } : {}),
              },
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("Airtable error:", res.status, detail);
      return NextResponse.json(
        { error: "Could not save your signup. Please try again." },
        { status: 502 }
      );
    }

    // Airtable returns computed fields (e.g. an Autonumber "Position") in the
    // create response, so we can hand the new member their place in line
    // without a second request. Falls back gracefully if the field is absent.
    let position: number | null = null;
    try {
      const data = (await res.json()) as {
        records?: { fields?: Record<string, unknown> }[];
      };
      const raw = data.records?.[0]?.fields?.["Position"];
      if (typeof raw === "number") position = raw;
    } catch {
      // Non-fatal: the signup saved; we just won't show a number.
    }

    return NextResponse.json({ ok: true, referralCode, position });
  } catch (err) {
    console.error("Waitlist POST failed:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
