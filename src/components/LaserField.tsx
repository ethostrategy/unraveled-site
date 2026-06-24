"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Ambient "laser" field — glowing spectrum beams that streak across the page
 * like the 10-block light-thread, so the background feels like it's humming
 * with technology just before the reveal. Full-screen, pointer-events-none.
 * (Stage 1 of the unlock reveal — the "break & unveil" comes next.)
 */

const COLORS = ["#c94182", "#e273ac", "#5b6ff0", "#9c327e", "#7c4dff"];

export default function LaserField({ count = 16 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const beams = Array.from({ length: count }, (_, i) => {
    const top = Math.random() * 100;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const w = Math.round(Math.random() * 34 + 24); // 24–58vw
    const dur = (Math.random() * 3.5 + 3).toFixed(2); // 3–6.5s
    const delay = (Math.random() * 5).toFixed(2);
    const rot = (Math.random() * 18 - 9).toFixed(1); // -9..9deg
    const thick = Math.random() > 0.6 ? 2 : 1;
    return (
      <span
        key={i}
        style={
          {
            position: "absolute",
            top: `${top}%`,
            left: 0,
            width: `${w}vw`,
            height: `${thick}px`,
            background: `linear-gradient(90deg, transparent, ${color}, #fff, ${color}, transparent)`,
            filter: `drop-shadow(0 0 7px ${color})`,
            opacity: 0,
            "--rot": `${rot}deg`,
            animation: `laserSweep ${dur}s ${delay}s cubic-bezier(0.5,0,0.5,1) infinite`,
          } as React.CSSProperties
        }
      />
    );
  });

  return createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40] overflow-hidden"
    >
      <style>{`@keyframes laserSweep{
        0%   { transform: translateX(-60vw) rotate(var(--rot)); opacity: 0; }
        12%  { opacity: .95; }
        50%  { opacity: 1; }
        88%  { opacity: .85; }
        100% { transform: translateX(120vw) rotate(var(--rot)); opacity: 0; }
      }`}</style>
      {/* faint central bloom — energy gathering beneath */}
      <div
        className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,65,130,0.18), rgba(201,65,130,0) 68%)",
          animation: "laserBloom 3.5s ease-in-out infinite",
        }}
      />
      <style>{`@keyframes laserBloom{0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(.92)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)}}`}</style>
      {beams}
    </div>,
    document.body
  );
}
