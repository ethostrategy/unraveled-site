"use client";

import { useEffect, useState } from "react";

/**
 * Keeps the old splash "being let in" moment as a one-time entrance — but as a
 * flourish, not a gate. A near-black veil covers the viewport on first paint,
 * then dissolves to reveal the hero. It's pointer-events-none the whole time,
 * so it never blocks scrolling or clicks, and it removes itself once faded.
 * Respects prefers-reduced-motion (skips straight to revealed).
 */
export default function EntranceVeil() {
  const [phase, setPhase] = useState<"cover" | "fading" | "gone">("cover");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("gone");
      return;
    }
    const t1 = requestAnimationFrame(() => setPhase("fading"));
    const t2 = setTimeout(() => setPhase("gone"), 1300);
    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] transition-opacity duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        backgroundImage: `
          radial-gradient(120% 90% at 50% 42%, rgba(8,6,28,0.6) 40%, rgba(3,3,12,0.98) 100%),
          linear-gradient(180deg, #050410 0%, #05040e 100%)`,
      }}
    />
  );
}
