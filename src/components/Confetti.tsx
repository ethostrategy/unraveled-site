"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Full-screen, on-brand confetti burst for celebratory moments (e.g. solving
 * the riddle). Pieces are mostly little isometric Unraveled "blocks" (the cube
 * motif) in the brand spectrum, with a few streamers mixed in — tumbling down
 * across the whole viewport. Rendered through a portal to <body> so it escapes
 * any backdrop-filter/transform ancestor. Decorative + pointer-events-none.
 */

const COLORS = [
  "#c94182", // spectrum pink
  "#e273ac", // light pink
  "#2a3f8f", // blue
  "#43398f", // indigo
  "#5a358a", // purple
  "#9c327e", // magenta
  "#7c4dff", // violet
];

/** Darken a hex color toward black by factor f (0–1). */
function shade(hex: string, f: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * f);
  const g = Math.round(((n >> 8) & 255) * f);
  const b = Math.round((n & 255) * f);
  return `rgb(${r},${g},${b})`;
}

/** A tiny solid isometric cube — the Unraveled block. */
function Cube({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.14)}
      viewBox="0 0 28 32"
      style={{ display: "block" }}
    >
      <polygon points="14,2 26,9 14,16 2,9" fill={color} />
      <polygon points="2,9 14,16 14,30 2,23" fill={shade(color, 0.62)} />
      <polygon points="14,16 26,9 26,23 14,30" fill={shade(color, 0.42)} />
    </svg>
  );
}

export default function Confetti({ count = 130 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const pieces = Array.from({ length: count }, (_, i) => {
    const left = Math.random() * 100;
    const dx = `${Math.round(Math.random() * 220 - 110)}px`;
    const rot = `${Math.round(Math.random() * 1000 + 360)}deg`;
    const dur = `${(Math.random() * 2 + 3).toFixed(2)}s`;
    const delay = `${(Math.random() * 0.7).toFixed(2)}s`;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size = Math.round(Math.random() * 8 + 12); // 12–20px
    const isCube = Math.random() > 0.3; // mostly Unraveled blocks
    const inner = isCube ? (
      <Cube color={color} size={size} />
    ) : (
      <span
        style={{
          display: "block",
          width: `${Math.max(3, Math.round(size * 0.3))}px`,
          height: `${Math.round(size * 0.95)}px`,
          background: color,
          borderRadius: "1px",
        }}
      />
    );
    return (
      <span
        key={i}
        style={
          {
            position: "absolute",
            top: "-14vh",
            left: `${left}%`,
            "--dx": dx,
            "--rot": rot,
            animation: `confettiFall ${dur} ${delay} linear forwards`,
          } as React.CSSProperties
        }
      >
        {inner}
      </span>
    );
  });

  return createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
    >
      <style>{`@keyframes confettiFall{to{transform:translate3d(var(--dx),130vh,0) rotateZ(var(--rot));}}`}</style>
      {pieces}
    </div>,
    document.body
  );
}
