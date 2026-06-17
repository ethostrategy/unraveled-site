"use client";

import { useEffect, useRef, useState } from "react";
// import Link from "next/link"; // re-enable with the "Read our research" link below

/**
 * "The framework" screen, split two columns: on the left, the framework intro
 * plus the why-it-matters stats; on the right, the 10 Blocks as a stepped
 * pyramid of real 3-D cubes (front/top/right faces, deep-blue base climbing to
 * rose at the apex). Cubes drop in apex-first → base as you scroll, tilt toward
 * you on hover, and open for a one-line definition on tap.
 */

type Block = { name: string; color: string; def: string; order: number };

// Definitions are faithful, user-facing distillations of the framework doc's
// formal "Definition." for each block.
const TIERS: Block[][] = [
  [{ name: "Compatibility", color: "#c94182", order: 9, def: "Growing together even as you change." }],
  [
    { name: "Conflict Resolution", color: "#b23079", order: 7, def: "Working through hard moments and repairing." },
    { name: "Boundaries", color: "#c33177", order: 8, def: "Honoring your limits, and theirs." },
  ],
  [
    { name: "Honesty", color: "#6f3486", order: 4, def: "Telling the truth and staying transparent, even when it's hard." },
    { name: "Communication", color: "#863683", order: 5, def: "Saying what you mean and truly hearing them." },
    { name: "Understanding", color: "#9c327e", order: 6, def: "Being seen for who you really are." },
  ],
  [
    { name: "Safety", color: "#0a3a86", order: 0, def: "Being together without fear of harm." },
    { name: "Trust", color: "#2a3f8f", order: 1, def: "Knowing they'll show up for you, again and again." },
    { name: "Respect", color: "#43398f", order: 2, def: "Your dignity, autonomy, and worth recognized." },
    { name: "Freedom", color: "#5a358a", order: 3, def: "The space and support to stay fully yourself." },
  ],
];

const STATS = [
  { value: "#1", label: "predictor of a long, happy life: your relationships" },
  { value: "∞", label: "scattered, contradicting takes on how to love" },
  { value: "0", label: "classes on relationships in 13 years of school" },
];

const TOTAL = 10;
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

function Cube({
  block,
  revealed,
  open,
  dimmed,
  onOpen,
  cubeRef,
}: {
  block: Block;
  revealed: boolean;
  open: boolean;
  dimmed: boolean;
  onOpen: () => void;
  cubeRef: (el: HTMLDivElement | null) => void;
}) {
  const c = block.color;
  const z = "calc(var(--pyr-s, 84px) / 2)";
  return (
    <div
      ref={cubeRef}
      style={{
        opacity: revealed ? (dimmed ? 0.16 : 1) : 0,
        // hidden → drop from above; selected → spotlight (scale up; others dim)
        transform: revealed
          ? open
            ? "scale(1.4)"
            : "none"
          : "translateY(-34px) scale(0.45)",
        transition:
          "opacity 0.4s ease, transform 0.5s cubic-bezier(0.2,1.1,0.3,1), filter 0.4s ease",
        zIndex: open ? 50 : undefined,
        filter: dimmed ? "saturate(0.5) blur(0.6px)" : undefined,
      }}
    >
      <div className="pyr-scene">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
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
            {open ? (
              <span className="flex flex-col gap-1 px-0.5">
                <span className="text-[8px] font-bold uppercase leading-none tracking-tight text-white sm:text-[10px]">
                  {block.name}
                </span>
                <span className="text-[7.5px] font-medium leading-[1.18] text-white/90 sm:text-[9px]">
                  {block.def}
                </span>
              </span>
            ) : (
              <span
                className="text-[8.5px] font-semibold uppercase leading-[1.05] tracking-tight text-white sm:text-[11.5px]"
                style={{ textShadow: "0 0 8px rgba(255,255,255,0.25)" }}
              >
                {block.name}
              </span>
            )}
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

  // A spotlighted block stays until you click anywhere else on the page.
  // (Cube clicks stopPropagation, so they never reach this handler.)
  useEffect(() => {
    if (!selected) return;
    const close = () => setSelected(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [selected]);

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
      className="relative scroll-mt-24 py-24 sm:py-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — framework intro + why-it-matters stats */}
          <div className="flex flex-col items-center gap-9 text-center lg:items-start lg:text-left">
            <div className="flex flex-col items-center gap-5 lg:items-start">
              <p className="eyebrow text-[#e273ac]">The framework</p>
              <h2
                className="text-3xl leading-tight tracking-tight text-white sm:text-[2.7rem] xl:text-[3.35rem]"
                style={{ fontFamily: "var(--font-instrument)" }}
              >
                10 Universal Blocks
              </h2>
              <p className="max-w-md text-balance text-[15px] leading-relaxed text-white/85">
                Every healthy relationship is built from the same ten blocks.
                Anything else builds on them.
              </p>
              {/* Hidden until the white paper is finalized — re-enable this
                  link AND restore the route (src/app/_framework → framework),
                  plus uncomment the next/link import at the top.
              <Link
                href="/framework"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-spectrum transition-opacity hover:opacity-80"
              >
                Read our research →
              </Link>
              */}
            </div>

            {/* why-it-matters stats */}
            <div className="w-full max-w-md border-t border-white/10 pt-8">
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">
                Why it matters
              </p>
              <div className="flex flex-col gap-5">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-center gap-4 lg:justify-start"
                  >
                    <span
                      className="w-12 shrink-0 text-3xl leading-none text-spectrum sm:text-4xl"
                      style={{ fontFamily: "var(--font-instrument)" }}
                    >
                      {s.value}
                    </span>
                    <p className="text-[14px] leading-snug text-white/85">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — the blocks */}
          <div className="flex flex-col items-center">
            <div
              ref={wrapRef}
              className="relative flex flex-col items-center gap-3 [--pyr-s:74px] sm:gap-6 sm:[--pyr-s:104px]"
            >
              {/* light-thread tracing the canonical order */}
              {thread && (
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox={`0 0 ${thread.w} ${thread.h}`}
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden
                  style={{
                    opacity: selected ? 0.1 : 1,
                    transition: "opacity 0.4s ease",
                  }}
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

              {TIERS.map((tier, ti) => {
                const tierHasOpen = tier.some((b) => selected?.name === b.name);
                return (
                  <div
                    key={ti}
                    className="relative flex justify-center gap-3 sm:gap-6"
                    style={{ zIndex: tierHasOpen ? 40 : 10 }}
                  >
                    {tier.map((b) => (
                      <Cube
                        key={b.name}
                        block={b}
                        // apex-first → base: highest order reveals first
                        revealed={TOTAL - b.order <= built}
                        open={selected?.name === b.name}
                        dimmed={!!selected && selected.name !== b.name}
                        onOpen={() => setSelected(b)}
                        cubeRef={(el) => {
                          cubeRefs.current[b.order] = el;
                        }}
                      />
                    ))}
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
