import { createHash } from "crypto";

/**
 * Password gate for the intern roadmap. The page is server-rendered and checks
 * for a cookie whose value is sha256("pranav:" + PRANAV_PASSWORD). Only the
 * /api/pranav-auth route can mint that cookie (after a correct password), so a
 * visitor can't forge it without knowing the secret.
 *
 * Set PRANAV_PASSWORD in the host env (Netlify → Environment variables). If it
 * is unset in production, the page stays locked (fail closed).
 */
export const PRANAV_COOKIE = "pranav_access";

export function expectedToken(): string {
  const pw = process.env.PRANAV_PASSWORD ?? "";
  return createHash("sha256").update("pranav:" + pw).digest("hex");
}

export function isConfigured(): boolean {
  return !!process.env.PRANAV_PASSWORD;
}
