import { NextResponse, type NextRequest } from "next/server";

/**
 * The splash is a one-time gate.
 *  - A visitor without the `unraveled_member` cookie only ever sees the splash;
 *    if they try to deep-link into the site, they're sent back to it.
 *  - Once they submit (cookie set), the splash redirects them straight into the
 *    site, so they never fill the form twice.
 *
 * Review bypass: a private link `…/preview?review=<REVIEW_KEY>` lets a reviewer
 * (e.g. a co-founder) straight into the full draft. It drops a `review` cookie
 * so they can browse freely after the first click. Set REVIEW_KEY in the host's
 * env vars; if it's unset, the bypass is disabled. (The link is unguessable and
 * `/preview` is noindex, so it stays non-public.)
 *
 * Disabled entirely in development so the site stays reviewable without signing up.
 */
export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();

  const { pathname, searchParams } = req.nextUrl;

  // Review bypass — grant access and remember the reviewer.
  const reviewKey = process.env.REVIEW_KEY;
  if (reviewKey && searchParams.get("review") === reviewKey) {
    const clean = req.nextUrl.clone();
    clean.searchParams.delete("review");
    const res = NextResponse.redirect(clean);
    res.cookies.set("unraveled_review", "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
    return res;
  }
  if (req.cookies.get("unraveled_review")?.value === "1") {
    return NextResponse.next();
  }

  const isMember = req.cookies.get("unraveled_member")?.value === "1";
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
