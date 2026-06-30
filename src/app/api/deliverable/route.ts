import { NextResponse } from "next/server";

/**
 * Intern deliverable submission endpoint -> writes one row to Airtable.
 * Used by the private /pranav roadmap page. Server-side only so the Airtable
 * token is never exposed.
 *
 *   AIRTABLE_TOKEN              (required)
 *   AIRTABLE_BASE_ID            (optional) defaults to the Ethostrategy base
 *   AIRTABLE_DELIVERABLES_TABLE (optional) defaults to the Intern Deliverables table
 */

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const TABLE_ID = process.env.AIRTABLE_DELIVERABLES_TABLE ?? "tblIyLcy2dVxjIzkH";

export async function POST(request: Request) {
  let body: {
    title?: string;
    driveLink?: string;
    description?: string;
    process?: string;
    aiUsage?: string;
    learned?: string;
    didWell?: string;
    toImprove?: string;
    hours?: string | number;
    timeNotes?: string;
    week?: number;
    intern?: string;
    company?: string; // honeypot
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: pretend success without storing.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const title = (body.title ?? "").trim();
  const driveLink = (body.driveLink ?? "").trim();
  const hoursNum =
    body.hours === "" || body.hours == null ? null : Number(body.hours);

  if (!title) {
    return NextResponse.json({ error: "Please give your deliverable a name." }, { status: 422 });
  }
  if (!/^https?:\/\/\S+/i.test(driveLink)) {
    return NextResponse.json({ error: "Please paste a valid Drive link (starting with https://)." }, { status: 422 });
  }
  if (hoursNum != null && (Number.isNaN(hoursNum) || hoursNum < 0)) {
    return NextResponse.json({ error: "Hours must be a positive number." }, { status: 422 });
  }

  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    console.error("AIRTABLE_TOKEN is not set.");
    return NextResponse.json(
      { error: "Submissions are temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
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
              Title: title,
              "Drive Link": driveLink,
              Description: (body.description ?? "").trim(),
              Process: (body.process ?? "").trim(),
              "AI Usage": (body.aiUsage ?? "").trim(),
              Learned: (body.learned ?? "").trim(),
              "Did Well": (body.didWell ?? "").trim(),
              "To Improve": (body.toImprove ?? "").trim(),
              ...(hoursNum != null ? { Hours: hoursNum } : {}),
              "Time Notes": (body.timeNotes ?? "").trim(),
              ...(typeof body.week === "number" ? { Week: body.week } : {}),
              Intern: (body.intern ?? "").trim() || "Pranav Eppanapally",
              "Submitted At": new Date().toISOString(),
            },
          },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Airtable error:", res.status, detail);
      return NextResponse.json(
        { error: "Could not save your submission. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Deliverable POST failed:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
