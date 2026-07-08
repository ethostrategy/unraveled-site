import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Two gates:
 *
 * 1. Internal HQ gate (`/hq-…`) — requires a signed-in Google session locked to
 *    the Unraveled Workspace domain (see src/auth.ts). No session → redirect to
 *    the HQ sign-in page. Active in all environments.
 *
 * 2. Splash gate ("/") — production only, so the marketing site stays
 *    reviewable in dev. Members (cookie) get the full site via a rewrite;
 *    everyone else gets the splash. `?review=<REVIEW_KEY>` is a reviewer bypass.
 */
export default auth((req) => {
  const { pathname, searchParams } = req.nextUrl;

  // ── 1. Internal HQ gate (Google Workspace session) ──
  const HQ = "/hq-a3f9k2x7";
  if (pathname === HQ || pathname.startsWith(`${HQ}/`)) {
    if (pathname === `${HQ}/unlock`) return NextResponse.next(); // the sign-in page
    if (req.auth) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = `${HQ}/unlock`;
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // ── 2. Splash gate (production only) ──
  if (process.env.NODE_ENV !== "production") return NextResponse.next();

  // Review bypass — grant access, remember the reviewer, land on the clean root.
  const reviewKey = process.env.REVIEW_KEY;
  if (reviewKey && searchParams.get("review") === reviewKey) {
    const clean = req.nextUrl.clone();
    clean.pathname = "/";
    clean.searchParams.delete("review");
    const res = NextResponse.redirect(clean);
    res.cookies.set("unraveled_review", "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
    return res;
  }

  const isMember =
    req.cookies.get("unraveled_member")?.value === "1" ||
    req.cookies.get("unraveled_review")?.value === "1";

  if (pathname === "/preview" || pathname.startsWith("/preview/")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/" && isMember) {
    return NextResponse.rewrite(new URL("/preview", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/", "/preview", "/preview/:path*", "/hq-a3f9k2x7", "/hq-a3f9k2x7/:path*"],
};
