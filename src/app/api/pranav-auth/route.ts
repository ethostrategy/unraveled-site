import { NextResponse } from "next/server";
import { PRANAV_COOKIE, expectedToken } from "@/lib/pranavAuth";

/**
 * Checks the intern-roadmap password and, on success, sets the access cookie.
 * Reads PRANAV_PASSWORD from the server env; the password is never exposed.
 */
export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const expected = process.env.PRANAV_PASSWORD ?? "";
  const provided = String(body.password ?? "");

  if (!expected || provided !== expected) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(PRANAV_COOKIE, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180, // 180 days
  });
  return res;
}
