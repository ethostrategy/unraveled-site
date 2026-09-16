import Link from "next/link";
import Reveal from "./Reveal";

/**
 * Homepage teaser for Between Us, the card game. A compact section — three
 * deck chips in their brand colorways + a line — that links to the full /cards
 * page. Sits between the framework and the "Unraveled Universe" unlock section.
 */
const DECKS = [
  {
    name: "Real Talk",
    note: "The deep one. Built on the ten blocks.",
    grad: "linear-gradient(150deg,#072d73,#773484 55%,#c94182)",
  },
  {
    name: "Sweet Talk",
    note: "Light, playful, easy to start.",
    grad: "linear-gradient(150deg,#8d3281,#c42e75 60%,#e98cbe)",
  },
  {
    name: "Self Talk",
    note: "The one you play alone.",
    grad: "linear-gradient(150deg,#072d73,#25388d 60%,#58368c)",
  },
];

export default function CardsTeaser() {
  return (
    <section
      id="cards"
      className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Between Us
            </p>
            <h2
              className="mx-auto mt-3 max-w-2xl text-3xl leading-[1.1] text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The card game that gets you off the screen.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-white/85">
              Real conversations, in person — a deck for every kind of
              relationship. Scan the card to keep playing in the app.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                  <p className="mt-1.5 text-[14px] leading-snug text-white/85">
                    {d.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 text-center">
            <Link
              href="/cards"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:bg-white/10"
            >
              See the decks
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
        </Reveal>
      </div>
    </section>
  );
}
