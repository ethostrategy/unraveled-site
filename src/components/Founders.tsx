"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Founders' section:
 *  - Two first-person quotes (Madhuri + Will) as glass cards, each with a
 *    bitmoji "sticker" that peeks out from behind the card when it enters view.
 *    (Bitmoji art is a placeholder gradient sticker until real PNGs are added
 *    to /public and swapped into FOUNDERS[].img.)
 *  - A roadmap whose progress line grows as you scroll through the section,
 *    lighting each milestone as it passes.
 */

type Founder = {
  name: string;
  role: string;
  quote: string;
  grad: string;
  img?: string; // e.g. "/bitmoji-madhuri.png" once provided
};

const FOUNDERS: Founder[] = [
  {
    name: "Madhuri",
    role: "Co-founder & CEO",
    grad: "from-spectrum-9 to-spectrum-6",
    quote:
      "I grew up in a home where healthy relationships were never modeled — so I had to learn them from scratch, with no reliable map. Advice was everywhere and contradicted itself everywhere. I wanted one thing anyone could trust, for any relationship.",
  },
  {
    name: "Will",
    role: "Co-founder & CSO",
    grad: "from-spectrum-3 to-spectrum-6",
    quote:
      "Studying human psychology and behavioral science, I kept seeing the same thing: a generation more connected than any before it, and lonelier than any before it. As tech and AI accelerate, the hunger for real connection only grows. We had to build for that.",
  },
];

const MILESTONES: {
  year: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}[] = [
  {
    year: "2019",
    icon: (
      <>
        <rect x="4" y="4" width="12" height="12" rx="2" />
        <rect x="8" y="8" width="12" height="12" rx="2" />
      </>
    ),
    title: "Two sticky notes in a classroom",
    body: "For an assignment to pitch a startup, nobody else liked our ideas but each other — so we paired up, and won 1st place.",
  },
  {
    year: "2020",
    icon: (
      <>
        <path d="M3 9l9-4 9 4-9 4-9-4Z" />
        <path d="M7 11v4c0 1.2 2.2 2.2 5 2.2s5-1 5-2.2v-4" />
        <path d="M21 9v4" />
      </>
    ),
    title: "Clinton Global Initiative University",
    body: "Selected for CGIU — the Clinton Foundation's program backing student-led ventures that take on real-world challenges.",
  },
  {
    year: "2021",
    icon: (
      <>
        <rect x="3" y="5" width="13" height="14" rx="2" />
        <path d="M16 9h4v8a2 2 0 0 1-4 0z" />
        <path d="M6 9h6M6 12.5h6M6 16h4" />
      </>
    ),
    title: "The Los Angeles Times",
    // ⚠️ confirm: what the article actually highlighted about Will
    body: "Featured in the Los Angeles Times — spotlighting Will's drive to rebuild connection for a lonelier generation.",
  },
  {
    year: "2021",
    icon: (
      <>
        <rect x="8" y="6" width="2.4" height="12" rx="1" />
        <rect x="13.6" y="6" width="2.4" height="12" rx="1" />
      </>
    ),
    title: "We paused",
    body: "Life pulled us in different directions. The idea waited.",
  },
  {
    year: "2026",
    icon: (
      <>
        <path d="M12 3c2.8 1.2 4.5 4 4.5 7.5 0 2-.8 3.8-1.8 5L12 18l-2.7-2.5c-1-1.2-1.8-3-1.8-5C7.5 7 9.2 4.2 12 3Z" />
        <circle cx="12" cy="9.5" r="1.5" />
        <path d="M8.6 16l-2 4 3.2-1.6M15.4 16l2 4-3.2-1.6" />
      </>
    ),
    title: "Future Founders & relaunch",
    body: "Reconnected — and selected into Future Founders, relaunching through the accelerator, more ready than ever.",
  },
];

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function Founders() {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [cardsIn, setCardsIn] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reveal the bitmojis when the quote cards enter view.
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCardsIn(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setCardsIn(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Grow the roadmap line with scroll position through the rail.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the rail top hits 75% down the viewport, 1 once scrolled through.
        const p = clamp01((vh * 0.75 - rect.top) / (rect.height * 0.85));
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="founders"
      className="relative scroll-mt-24 py-24 sm:py-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-rose">Our Story</p>
          <h2
            className="mt-5 text-3xl tracking-tight text-white sm:text-[2.7rem]"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            Why we built Unraveled
          </h2>
        </div>

        {/* Quote cards with peeking bitmojis */}
        <div
          ref={cardsRef}
          className="mt-20 grid gap-12 sm:grid-cols-2 sm:gap-6"
        >
          {FOUNDERS.map((f) => (
            <figure key={f.name} className="relative">
              {/* bitmoji sticker — sits behind the card and peeks up on reveal */}
              <div
                aria-hidden
                className="absolute left-1/2 top-0 z-0 -translate-x-1/2"
                style={{
                  transition:
                    "transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 600ms ease",
                  transform: cardsIn
                    ? "translate(-50%, -64%) rotate(-4deg)"
                    : "translate(-50%, 10%) scale(0.8)",
                  opacity: cardsIn ? 1 : 0,
                }}
              >
                {f.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.img} alt={f.name} className="h-28 w-28 object-contain drop-shadow-xl" />
                ) : (
                  <div
                    className={`grid h-24 w-24 place-items-center rounded-[2rem] bg-gradient-to-br ${f.grad} text-3xl font-700 text-white shadow-xl shadow-black/40 ring-4 ring-[#0c0a24]`}
                  >
                    {f.name[0]}
                  </div>
                )}
              </div>

              <blockquote className="glass relative z-10 rounded-[1.75rem] px-7 pb-7 pt-16 text-center">
                <p className="text-[16px] leading-relaxed text-white/80">
                  &ldquo;{f.quote}&rdquo;
                </p>
                <figcaption className="mt-5">
                  <span className="block font-semibold text-white">{f.name}</span>
                  <span className="text-sm text-white/55">{f.role}</span>
                </figcaption>
              </blockquote>
            </figure>
          ))}
        </div>

        {/* Roadmap */}
        <div className="mx-auto mt-24 max-w-2xl">
          <p className="mb-10 text-center text-sm uppercase tracking-[0.22em] text-white/45">
            The road so far
          </p>

          <div ref={railRef} className="relative">
            {/* track + growing fill, centered on the icon column (x = 24px) */}
            <div className="absolute left-6 top-3 h-[calc(100%-1.5rem)] w-[2px] -translate-x-1/2 rounded bg-white/12" />
            <div
              className="absolute left-6 top-3 w-[2px] -translate-x-1/2 rounded bg-gradient-to-b from-spectrum-3 via-spectrum-6 to-spectrum-10"
              style={{
                height: `calc((100% - 1.5rem) * ${progress})`,
                transition: "height 120ms linear",
              }}
            />

            <div className="space-y-7">
              {MILESTONES.map((m, i) => {
                const threshold = (i + 0.6) / MILESTONES.length;
                const active = progress >= threshold;
                return (
                  <div
                    key={m.title}
                    className="flex items-start gap-5 transition-all duration-500"
                    style={{
                      opacity: active ? 1 : 0.3,
                      transform: active ? "translateY(0)" : "translateY(8px)",
                    }}
                  >
                    {/* icon node */}
                    <span
                      className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full text-xl ring-4 ring-[#0c0a24] transition-all duration-500"
                      style={{
                        background: active
                          ? "linear-gradient(150deg,#773484,#c94182)"
                          : "#201d3c",
                        boxShadow: active
                          ? "0 0 20px 2px rgba(201,65,130,0.45)"
                          : "none",
                        filter: active ? "none" : "grayscale(0.6)",
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-[22px] w-[22px] text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {m.icon}
                      </svg>
                    </span>

                    <div className="pt-1">
                      <div className="text-[12px] font-semibold uppercase tracking-wide text-[#e273ac]">
                        {m.year}
                      </div>
                      <div
                        className="mt-0.5 text-lg text-white"
                        style={{ fontFamily: "var(--font-instrument)" }}
                      >
                        {m.title}
                      </div>
                      <p className="mt-1 text-[14px] leading-relaxed text-white/60">
                        {m.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
