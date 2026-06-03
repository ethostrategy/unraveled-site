"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The 10 Blocks as a stepped pyramid of real 3-D cubes (front/top/right faces,
 * deep-blue base climbing to rose at the apex). Cubes build in one-by-one as you
 * scroll (canonical order, base first), tilt toward you on hover, and open for a
 * one-line definition on tap.
 */

type Block = { name: string; color: string; def: string; order: number };

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
  return (
    <div
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
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
              ? "drop-shadow(0 14px 26px rgba(201,65,130,0.45))"
              : "drop-shadow(0 10px 18px rgba(0,0,0,0.35))",
          }}
        >
          {/* front */}
          <span
            className="pyr-face flex items-center justify-center p-1.5 text-center"
            style={{
              transform: "translateZ(42px)",
              background: `linear-gradient(155deg, color-mix(in srgb, ${c} 82%, white), ${c})`,
              boxShadow: open
                ? "inset 0 0 0 1.5px rgba(255,255,255,0.85)"
                : "inset 0 0 0 1px rgba(255,255,255,0.14)",
            }}
          >
            <span className="text-[11px] font-semibold uppercase leading-[1.1] tracking-wide text-white">
              {block.name}
            </span>
          </span>
          {/* top */}
          <span
            aria-hidden
            className="pyr-face"
            style={{
              transform: "rotateX(90deg) translateZ(42px)",
              background: `color-mix(in srgb, ${c} 70%, white)`,
            }}
          />
          {/* right */}
          <span
            aria-hidden
            className="pyr-face"
            style={{
              transform: "rotateY(90deg) translateZ(42px)",
              background: `color-mix(in srgb, ${c} 66%, black)`,
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
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-orchid">The framework</p>
          <h2
            className="mt-4 text-3xl tracking-tight text-white sm:text-[2.7rem]"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            The 10 Unraveled building blocks
          </h2>
        </div>

        <div
          ref={wrapRef}
          className="mt-16 flex flex-col items-center gap-3 sm:gap-3.5"
        >
          {TIERS.map((tier, ti) => (
            <div key={ti} className="flex justify-center gap-3 sm:gap-3.5">
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

        <div className="mx-auto mt-10 min-h-[3.5rem] max-w-md text-center">
          {selected ? (
            <p className="text-[15px] leading-relaxed text-white/80">
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
