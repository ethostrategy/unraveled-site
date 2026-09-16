import Backdrop from "@/components/Backdrop";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Relationship Lab",
  description:
    "The Relationship Lab is Unraveled's app — the ten-block framework made interactive, with assessments, your relationship scores, and guided practice.",
};

const FEATURES = [
  {
    title: "Two Truths",
    body: "Our signature assessment. You and someone you love each answer honestly, then compare. Both true. Now you can talk about the gap.",
  },
  {
    title: "Your scores, as a spectrum",
    body: "See where each block stands, shown as a position on a spectrum rather than a cold number. Progress you can feel.",
  },
  {
    title: "Scan to play",
    body: "Every Between Us deck has a QR code that opens the game in the app, so a card night keeps going and unlocks more.",
  },
  {
    title: "Guided practice",
    body: "Small, science-backed prompts that move you block by block toward stronger connection, at your own pace.",
  },
];

export default function LabPage() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Backdrop />
      <Nav />
      <main className="flex-1 pb-16 pt-28 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Hero */}
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
            The Relationship Lab
          </p>
          <div className="mt-4">
            <span className="inline-flex rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-[12px] font-medium text-white/70">
              Launching December 2026
            </span>
          </div>
          <h1
            className="mt-5 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Your relationships, in the{" "}
            <span className="text-spectrum italic">lab</span>.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            The Lab is Unraveled&apos;s app, the place the ten-block framework
            stops being a chart and becomes something you actually use.
            Assessments, your scores, and guided practice, all personalized by
            AI.
          </p>
          <div className="mt-8">
            <Link
              href="/#join"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink hover:shadow-lg"
            >
              Get early access
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <p className="mt-4 text-[13px] text-white/50">
            Coming to iOS and Android. Get early access on web first.
          </p>

          <div className="mt-12 h-px w-full bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />

          {/* What's inside */}
          <h2
            className="mt-16 text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            What&apos;s inside
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass rounded-3xl p-6 sm:p-8">
                <h3
                  className="text-xl"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {f.title}
                </h3>
                <p className="mt-3 leading-relaxed text-white/85">{f.body}</p>
              </div>
            ))}
          </div>

          {/* How it fits together */}
          <h2
            className="mt-16 text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            How it fits together
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/85">
            The Lab is the digital home for our{" "}
            <Link
              href="/blocks"
              className="text-spectrum underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
            >
              framework
            </Link>
            , where you learn where you stand and practice getting closer.{" "}
            <Link
              href="/cards"
              className="text-spectrum underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
            >
              Between Us
            </Link>{" "}
            is the same framework played out loud, off the screen and across a
            table. Scan a deck and the night carries right back into the app.
          </p>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="mx-auto h-px w-full bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />
            <p className="mx-auto mt-16 max-w-xl text-lg leading-relaxed text-white/85">
              The Lab opens December 2026. Join the waitlist and be first
              through the door.
            </p>
            <Link
              href="/#join"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink hover:shadow-lg"
            >
              Get early access
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
