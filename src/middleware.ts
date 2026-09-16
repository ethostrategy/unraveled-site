import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * One gate remains:
 *
 * Internal HQ gate (`/hq-…`) — requires a signed-in Google session locked to
 * the Unraveled Workspace domain (see src/auth.ts). No session → redirect to
 * the HQ sign-in page. Active in all environments.
 *
 * The public marketing site is now ungated — the full site is served at "/"
 * for everyone, with signup living inside the page. The old "/preview" route
 * (where the gated site used to live) redirects to "/" so old links resolve.
 */
export default auth((req) => {
  const { pathname } = req.nextUrl;

  // ── Internal HQ gate (Google Workspace session) ──
  const HQ = "/hq-a3f9k2x7";
  if (pathname === HQ || pathname.startsWith(`${HQ}/`)) {
    if (pathname === `${HQ}/unlock`) return NextResponse.next(); // the sign-in page
    if (req.auth) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = `${HQ}/unlock`;
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // ── Retire the old gated route ──
  if (pathname === "/preview" || pathname.startsWith("/preview/")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/preview", "/preview/:path*", "/hq-a3f9k2x7", "/hq-a3f9k2x7/:path*"],
};
