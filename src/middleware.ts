import { NextResponse, type NextRequest } from "next/server";

/**
 * Two gates live here:
 *
 * 1. Internal HQ gate (`/hq-…`) — password-protected in ALL environments.
 *    Requests without a valid `unraveled_hq` cookie are redirected to the HQ
 *    unlock page. The cookie holds HQ_TOKEN (a server secret), so it can't be
 *    forged. Fail-closed: if HQ_TOKEN is unset, nobody gets in.
 *
 * 2. Splash gate ("/") — production only, so the marketing site stays
 *    reviewable in dev.
 *    - Without the `unraveled_member` cookie, "/" shows the splash.
 *    - Members get the full site via an internal REWRITE (clean URL, never /preview).
 *    - "/preview" is internal-only and redirects to "/".
 *    - Review bypass: `…/?review=<REVIEW_KEY>` lets a reviewer straight in.
 */
export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // ── 1. Internal HQ gate (all environments, fail-closed) ──
  const HQ = "/hq-a3f9k2x7";
  if (pathname === HQ || pathname.startsWith(`${HQ}/`)) {
    if (pathname === `${HQ}/unlock`) return NextResponse.next(); // the unlock page itself
    const unlocked =
      !!process.env.HQ_TOKEN &&
      req.cookies.get("unraveled_hq")?.value === process.env.HQ_TOKEN;
    if (unlocked) return NextResponse.next();
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

  // The site lives at the clean root now — /preview is internal-only, so send
  // any such URL back to "/".
  if (pathname === "/preview" || pathname.startsWith("/preview/")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Members get the full site, served via a rewrite so the URL stays "/".
  // Everyone else gets the splash.
  if (pathname === "/" && isMember) {
    return NextResponse.rewrite(new URL("/preview", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/preview", "/preview/:path*", "/hq-a3f9k2x7", "/hq-a3f9k2x7/:path*"],
};
