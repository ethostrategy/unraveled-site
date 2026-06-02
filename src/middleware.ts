import { NextResponse, type NextRequest } from "next/server";

/**
 * The splash is a one-time gate.
 *  - A visitor without the `unraveled_member` cookie only ever sees the splash;
 *    if they try to deep-link into the site, they're sent back to it.
 *  - Once they submit (cookie set), the splash redirects them straight into the
 *    site, so they never fill the form twice.
 *
 * Disabled in development so the site stays reviewable without signing up.
 */
export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();

  const isMember = req.cookies.get("unraveled_member")?.value === "1";
  const { pathname } = req.nextUrl;
  const isSite = pathname === "/preview" || pathname.startsWith("/preview/");

  if (isSite && !isMember) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname === "/" && isMember) {
    return NextResponse.redirect(new URL("/preview", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/preview/:path*"],
};
