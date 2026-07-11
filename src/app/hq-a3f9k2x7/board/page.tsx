import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";
import { Marker, shapeForStream } from "../marker";

/**
 * HQ Board — a Kanban of tasks across the six workstreams. This is where the
 * playbook steps (Strategy) and milestones (Roadmap) become dated, owned work:
 * columns are status, each card carries its workstream color + a target quarter.
 * Seeded from the roadmap + strategy playbooks; the working truth for "what now".
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

type Task = { t: string; stream: Stream; due: string };
type Column = { name: string; tasks: Task[] };

// Status columns. Dates live on the cards (target quarter), not the columns.
const COLUMNS: Column[] = [
  {
    name: "Done",
    tasks: [
      { t: "Register the LLC", stream: "Operations", due: "Jul 2026" },
      { t: "Rebrand", stream: "Brand", due: "26 Q1" },
      { t: "Website live", stream: "Brand", due: "26 Q2" },
      { t: "Future Founders Phase 1 (demo day)", stream: "Operations", due: "Jun 2026" },
    ],
  },
  {
    name: "In progress",
    tasks: [
      { t: "Draft framework V1 (10 blocks + 6 assessments)", stream: "Framework", due: "26 Q3" },
      { t: "Onboard summer intern", stream: "Operations", due: "26 Q3" },
      { t: "Ship V1 features on the Claude API", stream: "Intelligence", due: "26 Q3" },
      { t: "Instagram presence", stream: "Brand", due: "26 Q3" },
    ],
  },
  {
    name: "Up next",
    tasks: [
      { t: "Recruit reviewer panel (Dr. Nadine Burke + Berkeley), via warm intros", stream: "Framework", due: "26 Q3" },
      { t: "Dr. Burke warm intro via UC Davis: ask OBGYN-resident friend to tap her UC Davis faculty/mentors", stream: "Framework", due: "26 Q3" },
      { t: "Apply for AI startup credits", stream: "Intelligence", due: "26 Q3" },
      { t: "Lock no-train / zero-retention data terms", stream: "Intelligence", due: "26 Q3" },
      { t: "Chase non-dilutive grants (SBIR / NIH)", stream: "Operations", due: "26 Q3–Q4" },
      { t: "Revise framework on SME feedback", stream: "Framework", due: "26 Q4" },
      { t: "Card game MVP (play live on the podcast)", stream: "B2C", due: "26 Q4" },
    ],
  },
  {
    name: "Backlog",
    tasks: [
      { t: "Publish white paper V2 + file copyright & trademark", stream: "Framework", due: "27 Q1–Q2" },
      { t: "Two Truths web launch", stream: "B2C", due: "27 Q1" },
      { t: "App V1 launch", stream: "Intelligence", due: "27 Q2" },
      { t: "Beta cohorts (Unraveled Paces)", stream: "B2C", due: "27 Q3" },
      { t: "Podcast + YouTube", stream: "Brand", due: "27 Q2" },
      { t: "CEO full-time", stream: "Operations", due: "Aug 2027" },
      { t: "Journal submission", stream: "Framework", due: "27 H2" },
      { t: "First hires: AI engineer → experiential marketing coord → learning design lead", stream: "Operations", due: "2028" },
      { t: "Corporate workshops", stream: "B2B", due: "2028" },
      { t: "Validation study on app + cohort data", stream: "Framework", due: "2028" },
    ],
  },
];

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

function Card({ task }: { task: Task }) {
  const c = STREAMS[task.stream];
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center gap-2">
        <Marker color={c} shape={shapeForStream(task.stream)} size={11} glow={false} />
        <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: c }}>
          {task.stream}
        </span>
        <span className="ml-auto text-[10px] text-white/40">{task.due}</span>
      </div>
      <p className="mt-1.5 text-[13px] leading-snug text-white/85">{task.t}</p>
    </div>
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

        {/* board */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <div key={col.name} className="w-[260px] shrink-0">
              <div className="flex items-center justify-between px-1 pb-2">
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">{col.name}</span>
                <span className="text-[11px] text-white/35">{col.tasks.length}</span>
              </div>
              <div className="space-y-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-2">
                {col.tasks.map((task) => (
                  <Card key={task.t} task={task} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[11px] text-white/35">
          Seeded from the Milestones + Strategy playbooks. Columns are status; each card carries its target quarter.
        </p>
      </div>
    </main>
  );
}
