"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The 10 Blocks, drawn as the canonical stepped pyramid (deep-blue base climbing
 * to rose at the apex). The pyramid BUILDS itself block-by-block as you scroll —
 * in canonical reading order (base left→right, then up). Click any block for a
 * light pulse that sweeps up the structure plus a one-line definition.
 */

type Block = {
  name: string;
  color: string;
  def: string;
  order: number; // canonical build order, 0 = first
};

// Tiers rendered apex → base.
const TIERS: Block[][] = [
  [{ name: "Compatibility", color: "#c94182", order: 9, def: "The long-arc fit that the other nine make possible." }],
  [
    { name: "Conflict Resolution", color: "#b23079", order: 7, def: "Repairing rupture without breaking the bond." },
    { name: "Boundaries", color: "#c33177", order: 8, def: "Limits named — and honored." },
  ],
  [
    { name: "Honesty", color: "#6f3486", order: 4, def: "Truth, openly expressed." },
    { name: "Communication", color: "#863683", order: 5, def: "Said so the other can actually receive it." },
    { name: "Understanding", color: "#9c327e", order: 6, def: "Being truly known — not just heard." },
  ],
  [
    { name: "Safety", color: "#0a3a86", order: 0, def: "Being here without fear of harm." },
    { name: "Trust", color: "#2a3f8f", order: 1, def: "You won't be hurt; confidences are kept." },
    { name: "Respect", color: "#43398f", order: 2, def: "Your dignity is honored, even in disagreement." },
    { name: "Freedom", color: "#5a358a", order: 3, def: "Room to be your own person." },
  ],
];

const TOTAL = 10;

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function Pyramid() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [built, setBuilt] = useState(0); // how many blocks revealed (0..10)
  const [selected, setSelected] = useState<Block | null>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setBuilt(TOTAL);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // builds from when the pyramid's top reaches ~80% down the viewport
        // until it reaches ~30% — a comfortable scroll distance.
        const p = clamp01((vh * 0.8 - rect.top) / (vh * 0.5));
        setBuilt(Math.round(p * TOTAL));
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

  function handleClick(b: Block) {
    setSelected(b);
    setPulse((p) => p + 1);
  }

  return (
    <section
      id="the-10-blocks"
      className="relative scroll-mt-24 py-24 sm:py-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-orchid">The 10 Blocks</p>
          <h2
            className="mt-4 text-3xl tracking-tight text-white sm:text-[2.7rem]"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            Every relationship, built from the same ten.
          </h2>
        </div>

        {/* Pyramid */}
        <div
          ref={wrapRef}
          className="relative mx-auto mt-14 w-full max-w-[600px]"
        >
          {/* light pulse overlay */}
          {pulse > 0 && (
            <div
              key={pulse}
              aria-hidden
              className="pyramid-pulse pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-1/3"
              style={{
                background:
                  "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)",
                filter: "blur(8px)",
                mixBlendMode: "screen",
              }}
            />
          )}

          <div className="relative z-10 flex flex-col gap-1.5">
            {TIERS.map((tier, ti) => (
              <div key={ti} className="flex justify-center gap-1.5">
                {tier.map((b) => {
                  const revealed = b.order < built;
                  const isSel = selected?.name === b.name;
                  return (
                    <button
                      key={b.name}
                      type="button"
                      onClick={() => handleClick(b)}
                      className="group relative flex items-center justify-center rounded-lg outline-none ring-offset-0 transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-white/70"
                      style={{
                        width: "25%",
                        height: 78,
                        background: b.color,
                        opacity: revealed ? 1 : 0,
                        transform: revealed
                          ? "translateY(0) scale(1)"
                          : "translateY(16px) scale(0.94)",
                        boxShadow: isSel
                          ? "0 0 0 2px rgba(255,255,255,0.9), 0 10px 30px -8px rgba(201,65,130,0.6)"
                          : "inset 0 0 0 1px rgba(255,255,255,0.08)",
                      }}
                    >
                      <span className="px-1 text-center text-[12px] font-semibold uppercase leading-tight tracking-wide text-white sm:text-[13px]">
                        {b.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Definition popup / hint */}
        <div className="mx-auto mt-8 min-h-[3.5rem] max-w-md text-center">
          {selected ? (
            <p className="text-[15px] leading-relaxed text-white/80">
              <span className="font-semibold text-white">{selected.name}.</span>{" "}
              {selected.def}
            </p>
          ) : (
            <p className="text-[14px] text-white/45">
              Read from the ground up. Tap a block to see what it means.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
