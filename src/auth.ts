import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Auth.js config for the internal HQ. Sign-in is Google only, hard-locked to
 * the Unraveled Workspace domain in two places:
 *   1. `hd` param nudges Google to the workspace account picker, and
 *   2. the `signIn` callback REJECTS any email that isn't a verified
 *      @unraveleduniverse.com address (the real gate — do not remove).
 * Client id/secret + AUTH_SECRET are read from env (AUTH_GOOGLE_ID,
 * AUTH_GOOGLE_SECRET, AUTH_SECRET). JWT sessions (no DB), so it runs on edge.
 */
const ALLOWED_DOMAIN = "unraveleduniverse.com";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: { params: { hd: ALLOWED_DOMAIN, prompt: "select_account" } },
    }),
  ],
  callbacks: {
    signIn({ profile }) {
      const p = profile as { email?: string; email_verified?: boolean } | undefined;
      const email = (p?.email ?? "").toLowerCase();
      return Boolean(p?.email_verified) && email.endsWith(`@${ALLOWED_DOMAIN}`);
    },
  },
  pages: { signIn: "/hq-a3f9k2x7/unlock" },
});
