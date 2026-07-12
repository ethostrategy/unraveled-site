// Shared workstream markers, used across HQ views (Roadmap, Board, Strategy)
// so a workstream reads as the same shape + color everywhere.

export const STREAM_SHAPE: Record<string, string> = {
  framework: "circle",
  intelligence: "plus",
  operations: "square",
  brand: "triangle",
  b2c: "donut",
  b2b: "diamond",
};

// Map any of the display names / keys used across views to a marker shape.
export function shapeForStream(nameOrKey: string): string {
  const n = nameOrKey.toLowerCase();
  if (n.includes("framework")) return STREAM_SHAPE.framework;
  if (n.includes("intelligence")) return STREAM_SHAPE.intelligence;
  if (n.includes("operations")) return STREAM_SHAPE.operations;
  if (n.includes("brand")) return STREAM_SHAPE.brand;
  if (n.includes("b2c") || n === "product") return STREAM_SHAPE.b2c;
  if (n.includes("b2b")) return STREAM_SHAPE.b2b;
  return "circle";
}

export function Marker({
  color,
  shape,
  size = 11,
  glow = true,
  gated = false,
}: {
  color: string;
  shape: string;
  size?: number;
  glow?: boolean;
  // gated = capital-gated (contract-to-hire etc.) — render hollow, not filled.
  gated?: boolean;
}) {
  const p = gated ? { fill: "none", stroke: color, strokeWidth: 1.4 } : { fill: color };
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={glow ? { filter: `drop-shadow(0 0 3px ${color}b3)` } : undefined} aria-hidden>
      {shape === "circle" && <circle cx={5} cy={5} r={gated ? 3.5 : 4} {...p} />}
      {shape === "square" && <rect x={1.3} y={1.3} width={7.4} height={7.4} rx={1.4} {...p} />}
      {shape === "diamond" && <rect x={2} y={2} width={6} height={6} rx={1} transform="rotate(45 5 5)" {...p} />}
      {shape === "triangle" && <polygon points="5,0.8 9.2,8.7 0.8,8.7" {...p} />}
      {shape === "donut" && <circle cx={5} cy={5} r={3.2} fill="none" stroke={color} strokeWidth={2.1} />}
      {shape === "plus" && <path d="M4 1 H6 V4 H9 V6 H6 V9 H4 V6 H1 V4 H4 Z" {...p} />}
    </svg>
  );
}
