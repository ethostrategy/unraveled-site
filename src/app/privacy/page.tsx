import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Unraveled collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE = "September 2, 2026";
const CONTACT = "hello@unraveleduniverse.com";

export default function PrivacyPage() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Backdrop />
      <Nav />
      <main className="flex-1 px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Legal
          </p>
          <h1
            className="mt-3 text-4xl sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60 sm:text-base">
            Effective {EFFECTIVE}
          </p>

          <div className="mt-8 h-px w-full bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />

          {/* Body */}
          <div className="glass mt-8 rounded-3xl p-6 sm:p-10">
            <div className="space-y-4 text-[15px] leading-relaxed text-white/80 sm:text-base">
              <p>
                Unraveled LLC (&ldquo;Unraveled,&rdquo; &ldquo;we,&rdquo;
                &ldquo;us&rdquo;) builds tools for healthier relationships.
                We&rsquo;re based in Austin, Texas. This policy explains what we
                collect on this site, why, and the choices you have. We keep it
                short because we keep our data collection small.
              </p>

              <h2
                className="mt-10 mb-3 text-xl sm:text-2xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                What we collect
              </h2>
              <p>
                When you join our waitlist or newsletter, we collect your first
                name and email address. That&rsquo;s it. We also gather basic,
                privacy-respecting analytics about site visits (things like page
                views and rough traffic sources) so we can understand what&rsquo;s
                working.
              </p>
              <p>
                We don&rsquo;t collect sensitive personal information, and
                Unraveled isn&rsquo;t directed to children under 13.
              </p>

              <h2
                className="mt-10 mb-3 text-xl sm:text-2xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Why we collect it
              </h2>
              <p>
                We use your name and email to send you early-access and
                occasional newsletter updates about Unraveled. We do this based
                on the consent you give when you sign up, and nothing more.
              </p>

              <h2
                className="mt-10 mb-3 text-xl sm:text-2xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                How your information is handled
              </h2>
              <p>
                Signups are stored in Airtable, and emails are sent through
                Beehiiv. This site is hosted on Netlify. These are service
                providers acting on our behalf to run the site and deliver our
                updates. We never sell, rent, or trade your information.
              </p>

              <h2
                className="mt-10 mb-3 text-xl sm:text-2xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Cookies
              </h2>
              <p>
                We use only the essential cookies needed for the site to work.
                No advertising cookies, no cross-site tracking.
              </p>

              <h2
                className="mt-10 mb-3 text-xl sm:text-2xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Your choices and rights
              </h2>
              <p>
                You can unsubscribe anytime using the link in every email. You
                can also request a copy of your data, or ask us to delete it, by
                emailing{" "}
                <a
                  href={`mailto:${CONTACT}`}
                  className="underline decoration-white/30 underline-offset-2 hover:text-white"
                >
                  {CONTACT}
                </a>
                .
              </p>

              <h2
                className="mt-10 mb-3 text-xl sm:text-2xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                How long we keep it
              </h2>
              <p>
                We keep your information until you unsubscribe or ask us to
                delete it. Once you do, we remove it from our active lists.
              </p>

              <h2
                className="mt-10 mb-3 text-xl sm:text-2xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Changes to this policy
              </h2>
              <p>
                We may update this policy from time to time. When we do,
                we&rsquo;ll change the effective date shown at the top of the
                page.
              </p>

              <h2
                className="mt-10 mb-3 text-xl sm:text-2xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Questions?
              </h2>
              <p>
                We&rsquo;re happy to help. Reach us anytime at{" "}
                <a
                  href={`mailto:${CONTACT}`}
                  className="underline decoration-white/30 underline-offset-2 hover:text-white"
                >
                  {CONTACT}
                </a>
                .
              </p>
            </div>
          </div>

          {/* Footer links */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] text-white/70">
            <Link
              href="/"
              className="underline decoration-white/30 underline-offset-2 hover:text-white"
            >
              Back to home
            </Link>
            <Link
              href="/#join"
              className="underline decoration-white/30 underline-offset-2 hover:text-white"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
