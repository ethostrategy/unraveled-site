"use client";

import { useEffect, useState } from "react";

/**
 * The shared "world of Unraveled" field. A vivid rose glow top-left meets a deep
 * luminous blue from the bottom-right on a near-black base, with a soft orchid
 * bloom keeping the centre warm. The two glows slowly drift and the bloom
 * breathes (#1, motion-safe). On top of that (#2), the field is scroll-reactive:
 * it stays navy-cool up top and a rose wash rises as you descend toward the CTA,
 * tracing the brand spectrum as a journey. Fixed behind all content.
 */
export default function Backdrop() {
  const [p, setP] = useState(0); // scroll progress, 0 (top) → 1 (bottom)

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
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
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* static near-black base */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #08061c 0%, #0a0822 60%, #0a0b28 100%)",
        }}
      />
      {/* rose glow, top-left — slowly drifts */}
      <div
        className="bd-rose absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(110% 85% at 18% 10%, rgba(201,65,130,0.50) 0%, rgba(8,7,28,0) 62%)",
        }}
      />
      {/* deep blue glow, bottom-right — drifts opposite; recedes as you descend */}
      <div
        className="bd-blue absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 90% 122%, rgba(10,64,158,0.56) 0%, rgba(8,7,28,0) 60%)",
          opacity: 1 - 0.45 * p,
          transition: "opacity 120ms linear",
        }}
      />
      {/* scroll-reactive warm wash (#2) — rose rises from the bottom on descent */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(130% 92% at 50% 116%, rgba(201,65,130,0.55) 0%, rgba(201,65,130,0) 64%)",
          opacity: 0.1 + 0.62 * p,
          transition: "opacity 120ms linear",
        }}
      />
      {/* soft orchid bloom — keeps the centre warm; gently breathes */}
      <div
        className="bd-bloom absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(72% 56% at 50% 34%, rgba(140,58,150,0.30) 0%, rgba(140,58,150,0) 70%)",
        }}
      />
      {/* edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 105% at 50% 42%, transparent 52%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <div className="bg-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
