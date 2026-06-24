import { NextResponse, type NextRequest } from "next/server";

/**
 * The splash is a one-time gate, and the site lives at the clean root URL.
 *  - Without the `unraveled_member` cookie, "/" shows the splash.
 *  - Once they sign up (cookie set), "/" serves the full site via an internal
 *    REWRITE — members browse at the clean URL and never see "/preview".
 *  - "/preview" is internal-only and redirects to "/".
 *
 * Review bypass: a private link `…/?review=<REVIEW_KEY>` lets a reviewer (e.g. a
 * co-founder) straight into the site. It drops a `review` cookie so they can
 * browse freely afterward, landing on the clean root. Set REVIEW_KEY in the
 * host's env vars; if unset, the bypass is disabled.
 *
 * Disabled entirely in development so the site stays reviewable without signing up.
 */
export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();

  const { pathname, searchParams } = req.nextUrl;

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
  matcher: ["/", "/preview", "/preview/:path*"],
};
