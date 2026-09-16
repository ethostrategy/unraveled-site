import Backdrop from "@/components/Backdrop";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Founders from "@/components/Founders";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Unraveled is building a relationship-intelligence ecosystem that makes connection a learnable skill.",
};

export default function AboutPage() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Backdrop />
      <Nav />
      <main className="flex-1 pb-16 pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Hero */}
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Our Story
          </p>
          <h1
            className="mt-5 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Making connection a{" "}
            <span className="text-spectrum italic">learnable</span> skill.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            Unraveled is a relationship-intelligence ecosystem: digital tools and
            gamified in-person experiences that help young adults build the
            interpersonal skills no one taught them. Our ten-building-block
            framework turns connection into something you can actually learn,
            personalized by AI.
          </p>

          <div className="mt-12 h-px w-full bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />

          {/* Why we exist */}
          <h2
            className="mt-16 text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Why we exist
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/85">
            Relationship skills are almost never taught. Left untaught, those gaps
            ripple outward into loneliness, intimate-partner violence, and
            childhood trauma, a cycle that repeats across generations. We exist to
            break it.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-white/85">
            Most relationship advice online is noise, endless, contradictory, and
            impossible to trust. We're building something different: structured,
            science-backed, and built to actually stick.
          </p>

          {/* Our approach */}
          <h2
            className="mt-16 text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Our approach
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/85">
            It starts with our{" "}
            <Link
              href="/blocks"
              className="text-spectrum underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
            >
              10-block framework
            </Link>
            , a learnable structure for any relationship, romantic, platonic,
            familial, even the one with yourself. From there we build tools that
            put it to work.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3
                className="text-xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                The app
              </h3>
              <p className="mt-3 leading-relaxed text-white/85">
                Assessments like Two Truths help you see where you and the people
                you love actually stand, then guide you block by block toward
                stronger connection.
              </p>
            </div>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3
                className="text-xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Between Us
              </h3>
              <p className="mt-3 leading-relaxed text-white/85">
                A{" "}
                <Link
                  href="/cards"
                  className="text-spectrum underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
                >
                  card game
                </Link>{" "}
                that gets people off the screen and into real conversation, the
                framework, played out loud.
              </p>
            </div>
          </div>

        </div>

        {/* Why we built Unraveled + the journey so far — moved here from the homepage */}
        <Founders />

        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Company */}
          <div className="mt-16 glass rounded-3xl p-6 sm:p-8">
            <p className="leading-relaxed text-white/85">
              Unraveled LLC is based in Austin, Texas. Say hello anytime at{" "}
              <a
                href="mailto:hello@unraveleduniverse.com"
                className="text-spectrum underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
              >
                hello@unraveleduniverse.com
              </a>
              .
            </p>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="mx-auto h-px w-full bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />
            <h2
              className="mt-16 text-2xl sm:text-3xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Come build a better way to connect.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/85">
              We're just getting started. Join the waitlist and be first through
              the door.
            </p>
            <Link
              href="/#join"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink hover:shadow-lg"
            >
              Get early access
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
