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
  cubeRef,
}: {
  block: Block;
  revealed: boolean;
  open: boolean;
  onOpen: () => void;
  cubeRef: (el: HTMLDivElement | null) => void;
}) {
  const c = block.color;
  const z = "calc(var(--pyr-s, 84px) / 2)";
  return (
    <div
      ref={cubeRef}
      style={{
        opacity: revealed ? 1 : 0,
        // builds up into place (rises + settles) — no idle float
        transform: revealed ? "none" : "translateY(34px) scale(0.45)",
        transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(0.2,1.1,0.3,1)",
      }}
    >
      <div className="pyr-scene">
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
              : `drop-shadow(0 10px 22px color-mix(in srgb, ${c} 52%, transparent))`,
          }}
        >
          {/* front */}
          <span
            className="pyr-face flex items-center justify-center overflow-hidden px-1 text-center"
            style={{
              transform: `translateZ(${z})`,
              background: `color-mix(in srgb, ${c} 26%, #0b0926)`,
              border: `1.5px solid color-mix(in srgb, ${c} 82%, white)`,
              boxShadow: open
                ? `inset 0 0 18px color-mix(in srgb, ${c} 45%, transparent)`
                : `inset 0 0 12px color-mix(in srgb, ${c} 28%, transparent)`,
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
              background: `color-mix(in srgb, ${c} 64%, #0b0926)`,
              border: `1px solid color-mix(in srgb, ${c} 80%, white)`,
            }}
          />
          {/* right — shadowed */}
          <span
            aria-hidden
            className="pyr-face"
            style={{
              transform: `rotateY(90deg) translateZ(${z})`,
              background: `color-mix(in srgb, ${c} 30%, #050410)`,
              border: `1px solid color-mix(in srgb, ${c} 50%, black)`,
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default function Pyramid() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cubeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [built, setBuilt] = useState(0);
  const [selected, setSelected] = useState<Block | null>(null);
  const [thread, setThread] = useState<{ d: string; w: number; h: number } | null>(
    null
  );

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

  // Once built, trace a light-thread through the cube centres in canonical order.
  useEffect(() => {
    if (built < TOTAL) return;
    const measure = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const cb = wrap.getBoundingClientRect();
      const pts: string[] = [];
      for (let i = 0; i < TOTAL; i++) {
        const el = cubeRefs.current[i];
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = Math.round(r.left + r.width / 2 - cb.left);
        const y = Math.round(r.top + r.height / 2 - cb.top);
        pts.push(`${i ? "L" : "M"}${x} ${y}`);
      }
      setThread({ d: pts.join(" "), w: Math.round(cb.width), h: Math.round(cb.height) });
    };
    const t = setTimeout(measure, 650);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [built]);

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
            10 Must-Have Blocks
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-balance text-[15px] leading-relaxed text-white/55">
            Every healthy relationship is built from the same ten blocks.
            Everything else is an enhancement.
          </p>
        </div>

        <div
          ref={wrapRef}
          className="relative mt-10 flex flex-col items-center gap-3 [--pyr-s:80px] sm:gap-6 sm:[--pyr-s:116px]"
        >
          {/* light-thread tracing the canonical order */}
          {thread && (
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox={`0 0 ${thread.w} ${thread.h}`}
              preserveAspectRatio="none"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="thread-grad" x1="0" y1="1" x2="1" y2="0">
                  <stop stopColor="#2a3f8f" />
                  <stop offset="0.5" stopColor="#9c327e" />
                  <stop offset="1" stopColor="#c94182" />
                </linearGradient>
              </defs>
              <path
                d={thread.d}
                stroke="rgba(201,65,130,0.14)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="pyr-thread"
                d={thread.d}
                stroke="url(#thread-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1000}
                style={{ filter: "drop-shadow(0 0 5px rgba(201,65,130,0.8))" }}
              />
            </svg>
          )}

          {TIERS.map((tier, ti) => (
            <div key={ti} className="relative z-10 flex justify-center gap-3 sm:gap-6">
              {tier.map((b) => (
                <Cube
                  key={b.name}
                  block={b}
                  revealed={b.order < built}
                  open={selected?.name === b.name}
                  onOpen={() => setSelected(b)}
                  cubeRef={(el) => {
                    cubeRefs.current[b.order] = el;
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 flex min-h-[3rem] max-w-2xl items-center justify-center px-2 text-center">
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
