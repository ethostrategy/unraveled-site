import React from "react";

/**
 * The Unraveled three-cube mark, drawn as a glowing white line-art wireframe.
 *
 * When animated, it rests as a clear logo, then the cubes tumble apart and
 * "roll into each other" — the two base cubes cross through the middle and the
 * top cube rolls back into its centered slot — before re-forming. One seamless,
 * continuous loop. (Motion lives in globals.css and only runs when the `.js`
 * class is present, so no-JS visitors and reduced-motion users see the finished
 * assembled wireframe.)
 */

type Pt = [number, number];
const W = 30; // half-width of a cube's top diamond
const H = 36; // extrusion height

// One isometric cube as a wireframe path: top diamond + the three visible
// vertical edges + the two lower edges + the centre seam.
function cubeD(cx: number, cy: number): string {
  const top: Pt = [cx, cy - W / 2];
  const r: Pt = [cx + W, cy];
  const b: Pt = [cx, cy + W / 2];
  const l: Pt = [cx - W, cy];
  const bl: Pt = [cx - W, cy + H];
  const bb: Pt = [cx, cy + W / 2 + H];
  const br: Pt = [cx + W, cy + H];
  const p = ([x, y]: Pt) => `${x},${y}`;
  return (
    `M${p(l)} L${p(top)} L${p(r)} L${p(b)} Z ` + // top diamond
    `M${p(l)} L${p(bl)} L${p(bb)} L${p(b)} ` + //   left face
    `M${p(bb)} L${p(br)} L${p(r)} ` + //            right face
    `M${p(b)} L${p(bb)}` //                         centre seam
  );
}

// Homes: two cubes form the base; the third rests perfectly centred on top.
// Geometry is centred on the 200×200 box (content spans y≈41–159, centre 100)
// so the mark sits true-centre in nav/footer next to the wordmark.
const CUBES = [
  { key: "bl", cls: "mr-bl", cx: 70, cy: 108 },
  { key: "br", cls: "mr-br", cx: 130, cy: 108 },
  { key: "top", cls: "mr-top", cx: 100, cy: 56 },
] as const;

export default function Mark({
  className,
  animate = true,
}: {
  className?: string;
  /** Set false for a static brand mark (nav, footer, favicons). */
  animate?: boolean;
}) {
  return (
    <svg
      viewBox="40 41 120 118"
      className={className}
      role="img"
      aria-label="Unraveled"
      style={{
        overflow: "visible",
        filter: "drop-shadow(0 12px 40px rgba(201,65,130,0.42))",
      }}
    >
      <defs>
        <filter id="mark-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>
      <g className={animate ? "mark-roll" : undefined}>
        {CUBES.map((c) => {
          const d = cubeD(c.cx, c.cy);
          return (
            <g key={c.key} className={`mark-roll-group ${c.cls}`}>
              {/* soft glow underlayer */}
              <path
                d={d}
                fill="none"
                stroke="#ffffff"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#mark-glow)"
                opacity={0.55}
              />
              {/* crisp light-thread */}
              <path
                d={d}
                fill="none"
                stroke="#ffffff"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
