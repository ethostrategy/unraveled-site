import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";

/**
 * HQ Roadmap — Timeline (Gantt) view. Alternative to the swimlane at
 * /hq-a3f9k2x7. Same workstreams + initiatives, but placed on a 16-quarter
 * timeline (2026 Q1 → 2029 Q4) as bars.
 *
 * TIMING IS A DRAFT: each initiative's start quarter `s` (0-15) and length `l`
 * (in quarters) are first-pass guesses to be refined. Milestones can later be
 * length-1 bars or diamond markers.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

const YEARS = [
  { year: "2026", obj: "BUILD", current: true },
  { year: "2027", obj: "LAUNCH", current: false },
  { year: "2028", obj: "EXPAND", current: false },
  { year: "2029", obj: "SCALE", current: false },
];

// s = start quarter (0 = 2026 Q1 … 15 = 2029 Q4), l = length in quarters
type Milestone = { t: string; s: number; l: number };
type Lane = { name: string; color: string; milestones: Milestone[] };
const LANES: Lane[] = [
  { name: "Framework", color: "#6f8fd8", milestones: [
    { t: "Assessments + block definitions", s: 2, l: 1 },
    { t: "Psychometric / SME review", s: 3, l: 1 },
    { t: "Framework v2 (data-informed)", s: 8, l: 3 },
    { t: "License the framework", s: 12, l: 4 },
  ] },
  { name: "Operations", color: "#b884d8", milestones: [
    { t: "Form LLC, file trademark", s: 0, l: 1 },
    { t: "Provisional patent", s: 1, l: 2 },
    { t: "Trademark registered", s: 5, l: 2 },
    { t: "Utility patent (if warranted)", s: 6, l: 2 },
  ] },
  { name: "Intelligence", color: "#9a7fe0", milestones: [
    { t: "AI foundation (ethical AI partner)", s: 0, l: 2 },
    { t: "App beta (cohort testing)", s: 1, l: 3 },
    { t: "App public launch (free)", s: 4, l: 1 },
    { t: "Intelligence layer live", s: 5, l: 3 },
    { t: "App v2", s: 8, l: 2 },
    { t: "B2B platform build", s: 9, l: 3 },
    { t: "App v3", s: 12, l: 2 },
    { t: "B2B SaaS subscriptions", s: 13, l: 3 },
  ] },
  { name: "Brand/Media", color: "#e273ac", milestones: [
    { t: "Instagram + TikTok", s: 0, l: 4 },
    { t: "Threads, Reddit, newsletter", s: 1, l: 3 },
    { t: "LinkedIn, YouTube", s: 4, l: 4 },
    { t: "Podcast", s: 6, l: 2 },
    { t: "Brand collabs", s: 12, l: 4 },
  ] },
  { name: "Products", color: "#cf6f9e", milestones: [
    { t: "Card game", s: 6, l: 2 },
    { t: "Journals", s: 8, l: 3 },
    { t: "Children's books", s: 9, l: 3 },
  ] },
  { name: "Community", color: "#c768c6", milestones: [
    { t: "Test pairings / matching", s: 0, l: 4 },
    { t: "Campus cohort testing", s: 2, l: 2 },
    { t: "First cohorts (pilot cities)", s: 4, l: 2 },
    { t: "Test app-assisted facilitation", s: 6, l: 2 },
    { t: "Multi-city cohorts", s: 8, l: 4 },
    { t: "Facilitators at scale", s: 9, l: 3 },
    { t: "Corporate culture workshops", s: 12, l: 4 },
  ] },
  { name: "Education", color: "#f0a0b8", milestones: [
    { t: "Advisory board (faculty + clinical)", s: 0, l: 2 },
    { t: "Build K-12 curriculum (Sex-Ed / Emo-Ed)", s: 4, l: 4 },
    { t: "School pilots", s: 8, l: 3 },
    { t: "University + HS partnerships", s: 12, l: 3 },
    { t: "School-district contracts", s: 13, l: 3 },
  ] },
];

const NOW_FRAC = 2.15 / 16; // ~ early Q3 2026 (today)

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

export default function HQGantt() {
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
          The Roadmap
        </h1>

        {/* section nav */}
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <a href="/hq-a3f9k2x7" className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Swimlane</a>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Timeline</span>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Board · soon</span>
        </div>

        {/* timeline */}
        <div className="mt-12 overflow-x-auto pb-4">
          <div className="min-w-[1000px]">
            {/* year / quarter header (full width) */}
            <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              {YEARS.map((y) => (
                <div key={y.year} className="border-l border-white/10 px-3 pb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[22px] font-semibold leading-none" style={{ fontFamily: "var(--font-instrument)" }}>{y.year}</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">{y.obj}</span>
                    {y.current && (
                      <span className="ml-auto rounded-full bg-[#e273ac]/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#f6b0d3]">Now</span>
                    )}
                  </div>
                  <div className="mt-1.5 grid grid-cols-4 text-[10px] text-white/35">
                    <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                  </div>
                </div>
              ))}
            </div>

            {/* lanes with vertical year rules + now line overlaid */}
            <div className="relative mt-3">
              {/* year boundary rules */}
              {[25, 50, 75].map((pct) => (
                <div key={pct} className="pointer-events-none absolute inset-y-0 w-px bg-white/[0.08]" style={{ left: `${pct}%` }} />
              ))}
              {/* now line */}
              <div className="pointer-events-none absolute inset-y-0 z-10 w-px bg-[#e273ac]/70" style={{ left: `${NOW_FRAC * 100}%` }}>
                <span className="absolute left-1 top-0 text-[9px] font-bold uppercase tracking-wide text-[#f6b0d3]">Now</span>
              </div>

              {LANES.map((ws) => {
                // greedy first-fit packing so each lane uses as few rows as possible
                const sorted = [...ws.milestones].sort((a, b) => a.s - b.s);
                const rowEnd: number[] = [];
                const placed = sorted.map((m) => {
                  let r = rowEnd.findIndex((e) => e <= m.s);
                  if (r === -1) { r = rowEnd.length; rowEnd.push(0); }
                  rowEnd[r] = m.s + m.l;
                  return { ...m, r };
                });
                return (
                  <div key={ws.name} className="mb-3.5">
                    {/* lane header */}
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: ws.color }} />
                      <span className="text-[13px] font-semibold text-white">{ws.name}</span>
                    </div>
                    <div className="space-y-1">
                      {Array.from({ length: rowEnd.length }).map((_, r) => (
                        <div key={r} className="grid" style={{ gridTemplateColumns: "repeat(16, 1fr)" }}>
                          {placed.filter((p) => p.r === r).map((p) => (
                            <div
                              key={p.t}
                              className="flex h-6 items-center overflow-hidden rounded px-2"
                              style={{ gridColumn: `${p.s + 1} / span ${p.l}`, background: ws.color }}
                              title={p.t}
                            >
                              <span className="truncate text-[10.5px] font-medium" style={{ color: "#140d2b" }}>
                                {p.t}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* TODO (Madhuri): remove this footnote once the hub is finalized. */}
        <p className="mt-6 text-[12px] text-white/40">
          Draft timing — start quarters and lengths are first-pass guesses to refine; hover a bar
          for the full milestone. Compare with the <a href="/hq-a3f9k2x7" className="text-white/70 underline underline-offset-2">swimlane</a>.
        </p>
      </div>
    </main>
  );
}
