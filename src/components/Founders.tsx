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
    role: "Co-founder",
    grad: "from-spectrum-9 to-spectrum-6",
    quote:
      "I grew up in a home where healthy relationships were never modeled — so I had to learn them from scratch, with no reliable map. Advice was everywhere and contradicted itself everywhere. I wanted one thing anyone could trust, for any relationship.",
  },
  {
    name: "Will",
    role: "Co-founder",
    grad: "from-spectrum-3 to-spectrum-6",
    quote:
      "Studying human psychology and behavioral science, I kept seeing the same thing: a generation more connected than any before it, and lonelier than any before it. As tech and AI accelerate, the hunger for real connection only grows. We had to build for that.",
  },
];

const MILESTONES: { year: string; title: string; body: string }[] = [
  {
    year: "Dec 2019",
    title: "Two sticky notes at UC Berkeley",
    body: "In a tech & entrepreneurship class, ideas went up anonymously. Nobody voted for ours — so we voted for each other, paired up, and won 1st place in the pitch competition.",
  },
  {
    year: "2020",
    title: "Clinton Global Initiative University",
    body: "Selected for CGIU — the idea was becoming something real.",
  },
  {
    year: "2021",
    title: "Featured in the Los Angeles Times",
    body: "The work reached a wider audience for the first time.",
  },
  {
    year: "2021",
    title: "We paused",
    body: "Life pulled us in different directions. The idea waited.",
  },
  {
    year: "2026",
    title: "Reconnected — and relaunched",
    body: "We came back together, rebuilt around the framework, and joined Future Founders. You're early. That's the point.",
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
          <p className="eyebrow text-rose">Founders</p>
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

          <div ref={railRef} className="relative pl-12 sm:pl-16">
            {/* track + growing fill */}
            <div className="absolute left-[18px] top-2 h-[calc(100%-1rem)] w-[2px] rounded bg-white/12 sm:left-[26px]" />
            <div
              className="absolute left-[18px] top-2 w-[2px] rounded bg-gradient-to-b from-spectrum-3 via-spectrum-6 to-spectrum-10 sm:left-[26px]"
              style={{
                height: `calc((100% - 1rem) * ${progress})`,
                transition: "height 120ms linear",
              }}
            />

            <div className="space-y-10">
              {MILESTONES.map((m, i) => {
                const threshold = (i + 0.6) / MILESTONES.length;
                const active = progress >= threshold;
                return (
                  <div key={m.title} className="relative">
                    {/* dot */}
                    <span
                      className="absolute top-1 grid h-5 w-5 place-items-center rounded-full ring-4 ring-[#0c0a24] transition-all duration-500"
                      style={{
                        left: "-2.35rem",
                        background: active ? "#c94182" : "#2a2748",
                        boxShadow: active
                          ? "0 0 16px 2px rgba(201,65,130,0.6)"
                          : "none",
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
                    </span>
                    <div
                      className="transition-all duration-500"
                      style={{
                        opacity: active ? 1 : 0.35,
                        transform: active ? "translateY(0)" : "translateY(6px)",
                      }}
                    >
                      <div className="text-[12px] font-semibold uppercase tracking-wide text-spectrum">
                        {m.year}
                      </div>
                      <div className="mt-0.5 text-lg text-white" style={{ fontFamily: "var(--font-instrument)" }}>
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
