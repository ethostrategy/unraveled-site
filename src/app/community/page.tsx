import Backdrop from "@/components/Backdrop";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description:
    "The people behind Unraveled — the village who helped us start, the folks we're inspired by, and where to follow along.",
};

export default function CommunityPage() {
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
            Community
          </p>
          <h1
            className="mt-5 text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            We didn&apos;t get here{" "}
            <span className="text-spectrum italic">alone</span>.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85">
            Unraveled is built by a community: the people who helped us start,
            the folks we&apos;re inspired by, and everyone building healthier
            relationships right alongside us.
          </p>

          <div className="mt-12 h-px w-full bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />

          {/* The Village */}
          <h2
            className="mt-16 text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            The Village
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/85">
            In the early days, a lot of people gave their time, their talent,
            and their belief to help make Unraveled real, many of them for free.
            We keep a wall for every one of them, because we couldn&apos;t have
            started without it.
          </p>
          <div className="mt-6">
            <Link
              href="/village"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 py-3 text-[15px] font-semibold text-white hover:bg-white/10"
            >
              Meet the village →
            </Link>
          </div>

          {/* In Good Company */}
          <h2
            className="mt-16 text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            In Good Company
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/85">
            A few shout-outs to the organizations and people we&apos;re inspired
            by and cheering for. We&apos;re better for sharing a corner of the
            world with them.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3
                className="text-xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Cope Notes
              </h3>
              <p className="mt-3 leading-relaxed text-white/85">
                A daily text for your mental health: short, science-backed notes
                that interrupt negative thought loops. Founded by Johnny
                Crowder.
              </p>
              <a
                href="https://www.copenotes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-[15px] font-semibold text-spectrum underline decoration-white/20 underline-offset-4 transition hover:decoration-white/60"
              >
                copenotes.com →
              </a>
            </div>

            <div className="glass rounded-3xl p-6 sm:p-8">
              <h3
                className="text-xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                More soon
              </h3>
              <p className="mt-3 leading-relaxed text-white/85">
                This list is growing. We&apos;re always finding new people and
                projects worth celebrating, so check back.
              </p>
            </div>
          </div>

          {/* Follow along */}
          <h2
            className="mt-16 text-2xl sm:text-3xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Follow along
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/85">
            Come find us. We share what we&apos;re building, what we&apos;re
            learning, and the occasional good conversation starter.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <a
              href="https://instagram.com/unraveleduniverse"
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex flex-col gap-1 rounded-3xl p-5 transition hover:bg-white/[0.02]"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
                Instagram
              </span>
              <span className="text-[15px] font-semibold text-white">
                @unraveleduniverse
              </span>
            </a>

            <a
              href="https://www.linkedin.com/company/unraveleduniverse"
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex flex-col gap-1 rounded-3xl p-5 transition hover:bg-white/[0.02]"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
                LinkedIn
              </span>
              <span className="text-[15px] font-semibold text-white">
                Unraveled
              </span>
            </a>

            <span
              aria-disabled="true"
              className="glass flex cursor-default flex-col gap-1 rounded-3xl p-5 opacity-50"
            >
              <span className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
                TikTok
                <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] tracking-[0.12em] text-white/70">
                  soon
                </span>
              </span>
              <span className="text-[15px] font-semibold text-white/70">
                @unraveled_universe
              </span>
            </span>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="mx-auto h-px w-full bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />
            <p className="mx-auto mt-16 max-w-xl text-lg leading-relaxed text-white/85">
              Want to build a healthier way to connect with us? There&apos;s room
              for you here.
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
