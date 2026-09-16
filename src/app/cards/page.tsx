import Backdrop from "@/components/Backdrop";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Between Us",
  description:
    "Between Us is Unraveled's card game for real conversations, in person. A deck for every kind of relationship.",
};

const STEPS = [
  {
    n: "01",
    title: "Pick a deck",
    body: "Choose the one that fits the relationship and the mood.",
  },
  {
    n: "02",
    title: "Take turns",
    body: "Draw cards and trade real answers. No scorekeeping, no winners.",
  },
  {
    n: "03",
    title: "Keep going",
    body: "Scan the QR on the deck to play on in the Unraveled app and unlock more.",
  },
];

const DECKS = [
  {
    name: "Real Talk",
    grad: "linear-gradient(150deg,#072d73,#773484 55%,#c94182)",
    body: (
      <>
        The deep one. Built on the{" "}
        <Link
          href="/blocks"
          className="underline decoration-white/40 underline-offset-2 hover:decoration-white"
        >
          ten-block framework
        </Link>
        , with questions and challenges that go where small talk can&apos;t.
      </>
    ),
  },
  {
    name: "Sweet Talk",
    grad: "linear-gradient(150deg,#8d3281,#c42e75 60%,#e98cbe)",
    body: (
      <>
        Light and playful. A variety pack of mixed prompts and mini-games. The
        easiest way in.
      </>
    ),
  },
  {
    name: "Self Talk",
    grad: "linear-gradient(150deg,#072d73,#25388d 60%,#58368c)",
    body: (
      <>
        The deck you play alone. Prompts for the most important relationship,
        the one with yourself.
      </>
    ),
  },
];

export default function CardsPage() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Backdrop />
      <Nav />
      <main className="flex-1 px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <section className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Between Us
            </p>
            <h1
              className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              A card game for <span className="text-spectrum italic">real</span>{" "}
              conversations, in person.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Off the screen, into the world. Between Us is Unraveled&apos;s deck
              for every kind of relationship, romantic, platonic, familial, and
              the one you have with yourself.
            </p>
            <div className="mt-8">
              <Link
                href="/#join"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink hover:shadow-lg"
              >
                Get early access
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none">
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
          </section>

          {/* How it works */}
          <section className="mt-20 sm:mt-24">
            <div className="text-center">
              <h2
                className="text-3xl sm:text-4xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                How it works
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.n} className="glass rounded-3xl p-6 sm:p-8">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    {s.n}
                  </p>
                  <p
                    className="mt-3 text-xl text-white"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {s.title}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* The decks */}
          <section className="mt-20 sm:mt-24">
            <div className="text-center">
              <h2
                className="text-3xl sm:text-4xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                The <span className="text-spectrum italic">decks</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/85">
                One family of decks, three ways to play. Pick the one that meets
                you where you are.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {DECKS.map((d) => (
                <div
                  key={d.name}
                  className="group relative overflow-hidden rounded-3xl p-5 shadow-[0_30px_60px_-30px_rgba(7,18,60,0.6)] ring-1 ring-white/10"
                  style={{ backgroundImage: d.grad }}
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <div className="relative flex aspect-[3/4] flex-col justify-end">
                    <p
                      className="text-2xl text-white"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {d.name}
                    </p>
                    <p className="mt-2 text-[14px] leading-snug text-white/90">
                      {d.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-xl text-center text-[15px] leading-relaxed text-white/60">
              And a spicier edition for couples is in the works.
            </p>
          </section>

          {/* Who it's for */}
          <section className="mt-20 sm:mt-24">
            <div className="glass rounded-3xl p-8 text-center sm:p-12">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Who it&apos;s for
              </p>
              <p
                className="mx-auto mt-4 max-w-2xl text-2xl leading-snug sm:text-3xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Every kind of relationship. Romantic, platonic, familial, and
                the one with{" "}
                <span className="text-spectrum italic">yourself</span>.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-20 text-center sm:mt-24">
            <h2
              className="mx-auto max-w-2xl text-3xl leading-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Ready to play?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/85">
              Join the waitlist and be first in line when Between Us ships.
            </p>
            <div className="mt-8">
              <Link
                href="/#join"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink hover:shadow-lg"
              >
                Get early access
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none">
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
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
