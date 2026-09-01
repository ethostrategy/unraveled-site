import type { Metadata } from "next";
import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import MetricsBoard from "./MetricsBoard";

/**
 * HQ Metrics — the live KPI scoreboard + financial forecast + expenses (top,
 * MetricsBoard, Airtable-backed) over the metrics spine, built from the Future
 * Founders method:
 * buyer experience -> the team/function each stage needs -> the KPI that
 * proves it works. This is a SCAFFOLD. Firm numbers + owners land when the
 * speaker's buyer-experience template arrives; the stages and candidate KPIs
 * here are a first pass to react to, not final targets.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

const HQ = "/hq-a3f9k2x7";

// Workstream palette, reused so a stage's owner reads back to the roadmap lane.
const C = {
  framework: "#6f8fd8",
  intelligence: "#9a7fe0",
  operations: "#b884d8",
  brand: "#e273ac",
  b2c: "#c768c6",
  b2b: "#f0a0b8",
};

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

// Seed board-deck Financial Status grid (from the FF session's template) — the
// nine numbers investors read, in the standard 3x3 layout. Values fill in
// post-launch; pre-launch the point is to track them from day one.
const FINANCE: { k: string; d: string }[] = [
  { k: "Gross burn", d: "Total cash out per month." },
  { k: "Runway", d: "Months of cash left at current burn." },
  { k: "Cash-out date", d: "When the money runs out if nothing changes." },
  { k: "Net burn", d: "Burn minus revenue, the real monthly loss." },
  { k: "MRR (Δ)", d: "Monthly recurring revenue + change vs last month." },
  { k: "ARR (Δ)", d: "Annualized recurring revenue + change." },
  { k: "Customers", d: "Total paying customers." },
  { k: "New (# / $)", d: "Customers added this period + revenue." },
  { k: "Lost (# / $)", d: "Customers churned this period + revenue." },
];

/* ── Buyer-journey flowchart (modeled on the FF KPI session) ──────────────────
 * The visual map of each journey: swimlanes by owning team, a nurture side-loop,
 * and per-node metrics split into # of actions (blue) vs conversion (pink), the
 * session's green/red model in our palette. The stage cards below carry detail. */

type FMetric = { label: string; kind: "action" | "conversion"; stat?: string };
type FNode = {
  title: string;
  sub?: string;
  shape?: "box" | "gate" | "terminal";
  sources?: string[];
  metrics?: FMetric[];
  nurture?: { title: string; items: string[]; metric?: string };
};
type Lane = { name: string; color: string; nodes: FNode[] };
type Journey = { lanes: Lane[] };

const CONSUMER_J: Journey = {
  lanes: [
    { name: "Brand", color: C.brand, nodes: [
      { title: "Awareness", sub: "They first meet Unraveled", sources: ["Podcast", "IG / TikTok", "SEO", "Card game", "Referrals"], metrics: [{ label: "Reach / impressions", kind: "action", stat: "50k/mo" }, { label: "Signup rate", kind: "conversion", stat: "20%" }] },
    ] },
    { name: "Product", color: C.intelligence, nodes: [
      { title: "Free app", sub: "Make a profile, start Two Truths (no paywall)", metrics: [{ label: "Signups", kind: "action", stat: "1,000" }, { label: "Assessment starts", kind: "action", stat: "800" }, { label: "Signup → profile", kind: "conversion", stat: "80%" }] },
      { title: "Activation", sub: "Both partners finish, see the compare", shape: "gate", metrics: [{ label: "Both-partners-complete", kind: "conversion", stat: "50%" }, { label: "Time to first compare", kind: "conversion", stat: "<7 days" }], nurture: { title: "Return loop", items: ["Newsletter", "Weekly Reps", "Community", "Retake"], metric: "W2 / W4 retention" } },
    ] },
    { name: "Experiences · CS", color: C.operations, nodes: [
      { title: "Paid experience", sub: "Cohort, gala, or escape room", metrics: [{ label: "Free → paid", kind: "conversion", stat: "5%" }, { label: "Revenue / experience", kind: "action", stat: "$3k" }] },
      { title: "Refer + expand", sub: "Bring a partner, friend, or group", shape: "terminal", metrics: [{ label: "Referrals sent", kind: "action", stat: "200" }, { label: "Viral coefficient", kind: "conversion", stat: "0.4" }, { label: "NPS", kind: "conversion", stat: "50" }] },
    ] },
  ],
};

function Flowchart({ j }: { j: Journey }) {
  // Flatten to a single numbered path, each step carrying its owning lane.
  const steps = j.lanes.flatMap((lane) => lane.nodes.map((n) => ({ n, lane })));
  return (
    <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-4 sm:p-5">
      <ol>
        {steps.map(({ n, lane }, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={n.title} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: lane.color }}>{i + 1}</span>
                {!last && <span className="mt-1 w-0.5 flex-1 rounded" style={{ background: `${lane.color}59` }} />}
              </div>
              <div className={last ? "min-w-0 flex-1" : "min-w-0 flex-1 pb-6"}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[14.5px] font-semibold text-white/90">{n.title}</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ background: `${lane.color}26`, color: lane.color }}>{lane.name}</span>
                </div>
                {n.sub && <p className="mt-1 text-[12.5px] leading-snug text-white/55">{n.sub}</p>}
                {n.sources && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {n.sources.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10.5px] text-white/55">{s}</span>
                    ))}
                  </div>
                )}
                {n.nurture && (
                  <div className="mt-3 rounded-lg border border-dashed p-2.5" style={{ borderColor: `${lane.color}80`, background: `${lane.color}0d` }}>
                    <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide" style={{ color: lane.color }}>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 14l-4-4 4-4" /><path d="M5 10h9a5 5 0 0 1 5 5v1" /></svg>
                      Not ready? {n.nurture.title}
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {n.nurture.items.map((it) => (
                        <span key={it} className="rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-white/55">{it}</span>
                      ))}
                    </div>
                    <div className="mt-1.5 text-[10px] text-white/40">then loops back to this step</div>
                  </div>
                )}
                {n.metrics && (
                  <div className="mt-3">
                    <div className="mb-1.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/35">KPIs &middot; targets</div>
                    <div className="flex flex-wrap gap-1.5">
                      {n.metrics.map((m) => (
                        <span key={m.label} className="rounded-full px-2 py-0.5 text-[10.5px] font-medium" style={{ background: m.kind === "action" ? "#6f8fd81f" : "#e273ac1f", color: m.kind === "action" ? "#a9c0ee" : "#f6b0d3" }}>{m.label}{m.stat && <span className="opacity-60"> &middot; {m.stat}</span>}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function HQKpis() {
  return (
    <main className="relative min-h-screen text-white">
      <Backdrop />
      <div className="relative mx-auto max-w-5xl px-6 py-10">
        {/* header */}
        <div className="flex items-center gap-3">
          <CubeMark className="h-7 w-7" />
          <span className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/55">Unraveled HQ</span>
        </div>
        <h1 className="mt-10 text-4xl leading-[1.05] sm:text-5xl" style={{ fontFamily: "var(--font-instrument)" }}>
          Metrics
        </h1>

        {/* section nav */}
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <Link href={`${HQ}/milestones`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Milestones</Link>
          <Link href={`${HQ}/strategy`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Strategy</Link>
          <Link href={`${HQ}/board`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Tasks</Link>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Metrics</span>
        </div>

        {/* live scoreboard + forecast + expenses */}
        <MetricsBoard />

        {/* consumer journey & KPIs */}
        <h2 className="mt-14 text-[26px] text-white/95" style={{ fontFamily: "var(--font-instrument)" }}>Consumer journey &amp; KPIs</h2>
        <Flowchart j={CONSUMER_J} />

        {/* financial status (board deck) */}
        <div className="mt-12 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">Financial status</h2>
        </div>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {FINANCE.map((f) => (
            <div key={f.k} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">{f.k}</div>
              <div className="mt-1 text-[22px] leading-none text-white/25" style={{ fontFamily: "var(--font-instrument)" }}>&mdash;</div>
              <p className="mt-2 text-[11.5px] leading-snug text-white/50">{f.d}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
