import { redirect } from "next/navigation";

/**
 * Marketing moved into the Strategy tab (Foundation → Marketing). This route
 * redirects there so any existing links keep working.
 */
export default function HQMarketingRedirect() {
  redirect("/hq-a3f9k2x7/strategy?v=marketing");
}
