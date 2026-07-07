import { NextResponse } from "next/server";

/**
 * HQ unlock endpoint. Checks the submitted password against HQ_PASSWORD (server
 * secret). On success, sets the httpOnly `unraveled_hq` cookie to HQ_TOKEN so
 * the middleware gate lets the browser through. Fail-closed: if either env var
 * is missing, the gate stays locked.
 */
export async function POST(req: Request) {
  const password = process.env.HQ_PASSWORD;
  const token = process.env.HQ_TOKEN;
  if (!password || !token) {
    return NextResponse.json({ error: "Gate not configured." }, { status: 503 });
  }

  let body: { password?: string } = {};
  try {
    body = await req.json();
  } catch {
    // ignore malformed body → treated as wrong password below
  }

  if (!body.password || body.password !== password) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("unraveled_hq", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 60, // 60 days
  });
  return res;
}
