"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The 10 Blocks as a stepped pyramid of real 3-D cubes (front/top/right faces,
 * deep-blue base climbing to rose at the apex). Cubes build in one-by-one as you
 * scroll (canonical order, base first), tilt toward you on hover, and open for a
 * one-line definition on tap.
 */

type Block = { name: string; color: string; def: string; order: number };

// Definitions are faithful, user-facing distillations of the framework doc's
// formal "Definition." for each block.
const TIERS: Block[][] = [
  [{ name: "Compatibility", color: "#c94182", order: 9, def: "Two lives that keep fitting as they change." }],
  [
    { name: "Conflict Resolution", color: "#b23079", order: 7, def: "Working through conflict, and repairing after." },
    { name: "Boundaries", color: "#c33177", order: 8, def: "Holding your limits — and respecting theirs." },
  ],
  [
    { name: "Honesty", color: "#6f3486", order: 4, def: "Truthfulness and transparency, even when it's hard." },
    { name: "Communication", color: "#863683", order: 5, def: "Saying what you mean — and truly hearing them." },
    { name: "Understanding", color: "#9c327e", order: 6, def: "Feeling accurately known — heard and validated." },
  ],
  [
    { name: "Safety", color: "#0a3a86", order: 0, def: "Being together without fear of harm." },
    { name: "Trust", color: "#2a3f8f", order: 1, def: "Counting on them to act in good faith over time." },
    { name: "Respect", color: "#43398f", order: 2, def: "Your dignity, autonomy, and worth — recognized." },
    { name: "Freedom", color: "#5a358a", order: 3, def: "Staying your own person inside the bond." },
  ],
];

const TOTAL = 10;
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

function Cube({
  block,
  revealed,
  open,
  onOpen,
}: {
  block: Block;
  revealed: boolean;
  open: boolean;
  onOpen: () => void;
}) {
  const c = block.color;
  const z = "calc(var(--pyr-s, 84px) / 2)";
  const floatDur = 6 + (block.order % 4) * 0.8;
  const floatDelay = (block.order % 5) * 0.5;
  return (
    <div
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "none" : "translateY(26px) scale(0.55)",
        transition: "opacity 0.55s ease, transform 0.6s cubic-bezier(0.2,1.05,0.3,1)",
      }}
    >
      <div
        className="pyr-scene"
        style={{ animation: `float ${floatDur}s ease-in-out ${floatDelay}s infinite` }}
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={block.name}
          className={`pyr-cube outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
            open ? "is-open" : ""
          }`}
          style={{
            filter: open
              ? `drop-shadow(0 0 30px color-mix(in srgb, ${c} 92%, transparent))`
              : `drop-shadow(0 8px 22px color-mix(in srgb, ${c} 50%, transparent))`,
          }}
        >
          {/* front */}
          <span
            className="pyr-face flex items-center justify-center overflow-hidden px-1 text-center"
            style={{
              transform: `translateZ(${z})`,
              background: `color-mix(in srgb, ${c} 24%, #0b0926)`,
              border: `1.5px solid color-mix(in srgb, ${c} 80%, white)`,
              boxShadow: open
                ? `inset 0 0 18px color-mix(in srgb, ${c} 45%, transparent)`
                : `inset 0 0 12px color-mix(in srgb, ${c} 26%, transparent)`,
            }}
          >
            <span
              className="text-[8.5px] font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-[11.5px]"
              style={{ textShadow: "0 0 8px rgba(255,255,255,0.25)" }}
            >
              {block.name}
            </span>
          </span>
          {/* top — lit */}
          <span
            aria-hidden
            className="pyr-face"
            style={{
              transform: `rotateX(90deg) translateZ(${z})`,
              background: `color-mix(in srgb, ${c} 54%, #0b0926)`,
              border: `1px solid color-mix(in srgb, ${c} 72%, white)`,
            }}
          />
          {/* right — shadowed */}
          <span
            aria-hidden
            className="pyr-face"
            style={{
              transform: `rotateY(90deg) translateZ(${z})`,
              background: `color-mix(in srgb, ${c} 16%, #050410)`,
              border: `1px solid color-mix(in srgb, ${c} 40%, black)`,
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default function Pyramid() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [built, setBuilt] = useState(0);
  const [selected, setSelected] = useState<Block | null>(null);

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
        const p = clamp01((vh * 0.82 - rect.top) / (vh * 0.5));
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

  return (
    <section
      id="the-10-blocks"
      className="relative scroll-mt-24 pb-24 pt-6 sm:pb-32 sm:pt-8"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-orchid">The framework</p>
          <h2
            className="mt-4 text-3xl tracking-tight text-white sm:text-[2.7rem]"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            The 10 Unraveled building blocks
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-white/55">
            Every healthy relationship is built from the same ten — in the same
            order, from the ground up.
          </p>
        </div>

        <div
          ref={wrapRef}
          className="mt-16 flex flex-col items-center gap-3 [--pyr-s:80px] sm:gap-5 sm:[--pyr-s:104px]"
        >
          {TIERS.map((tier, ti) => (
            <div key={ti} className="flex justify-center gap-3 sm:gap-5">
              {tier.map((b) => (
                <Cube
                  key={b.name}
                  block={b}
                  revealed={b.order < built}
                  open={selected?.name === b.name}
                  onOpen={() => setSelected(b)}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 flex min-h-[3rem] max-w-2xl items-center justify-center px-2 text-center">
          {selected ? (
            <p className="text-[15px] leading-relaxed text-white/85 sm:text-base">
              <span className="font-semibold text-white">{selected.name}.</span>{" "}
              {selected.def}
            </p>
          ) : (
            <p className="text-[14px] text-white/45">
              Tap a block to see what it means.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
