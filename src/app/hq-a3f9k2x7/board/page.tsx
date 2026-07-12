import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";
import { Marker, shapeForStream } from "../marker";
import BoardColumns from "./BoardColumns";

/**
 * HQ Board — a Kanban of tasks across the six workstreams, backed by the
 * "HQ Board" Airtable table. Drag cards between columns to change status;
 * moves persist via /api/hq-board. This is the leadership "what now" view.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

const HQ = "/hq-a3f9k2x7";

// Workstream colors match the Roadmap streams so a card reads the same everywhere.
const STREAMS = {
  Framework: "#6f8fd8",
  Intelligence: "#9a7fe0",
  Operations: "#b884d8",
  Brand: "#e273ac",
  B2C: "#c768c6",
  B2B: "#f0a0b8",
} as const;
type Stream = keyof typeof STREAMS;

function CubeMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="40 41 120 118" fill="none" stroke="url(#hqcube)" strokeWidth={4.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <defs>
        <linearGradient id="hqcube" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#6f8fd8" />
          <stop offset="0.5" stopColor="#9a7fe0" />
          <stop offset="1" stopColor="#e273ac" />
        </linearGradient>
      </defs>
      <path d="M40,108 L70,93 L100,108 L70,123 Z M40,108 L40,144 L70,159 L70,123 M70,159 L100,144 L100,108 M70,123 L70,159" />
      <path d="M100,108 L130,93 L160,108 L130,123 Z M100,108 L100,144 L130,159 L130,123 M130,159 L160,144 L160,108 M130,123 L130,159" />
      <path d="M70,56 L100,41 L130,56 L100,71 Z M70,56 L70,92 L100,107 L100,71 M100,107 L130,92 L130,56 M100,71 L100,107" />
    </svg>
  );
}

export default function HQBoard() {
  return (
    <main className="relative min-h-screen text-white">
      <Backdrop />
      <div className="relative mx-auto max-w-6xl px-6 py-10">
        {/* header */}
        <div className="flex items-center gap-3">
          <CubeMark className="h-7 w-7" />
          <span className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/55">Unraveled HQ</span>
        </div>
        <h1 className="mt-10 text-4xl leading-[1.05] sm:text-5xl" style={{ fontFamily: "var(--font-instrument)" }}>
          Roadmap
        </h1>

        {/* section nav */}
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <a href={`${HQ}/gantt`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Milestones</a>
          <a href={`${HQ}/strategy`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Strategy</a>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Board</span>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Docs · soon</span>
        </div>

        {/* workstream legend */}
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-white/50">
          {(Object.keys(STREAMS) as Stream[]).map((s) => (
            <span key={s} className="flex items-center gap-1.5">
              <Marker color={STREAMS[s]} shape={shapeForStream(s)} size={11} glow={false} />
              {s}
            </span>
          ))}
        </div>

        {/* interactive, Airtable-backed board */}
        <BoardColumns />

        <p className="mt-4 text-[11px] text-white/35">Drag a card between columns to change its status; moves save to Airtable.</p>
      </div>
    </main>
  );
}
