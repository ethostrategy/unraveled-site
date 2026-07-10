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
    { t: "Framework v1 (block defs + dual-perspective assessments)", s: 2, l: 1 },
    { t: "Psychometric / SME review", s: 3, l: 1 },
    { t: "Framework v2 (SME-reviewed, launch-ready)", s: 5, l: 1 },
    { t: "Framework v3 (data-informed)", s: 8, l: 3 },
    { t: "License the framework", s: 12, l: 4 },
  ] },
  { name: "Operations", color: "#b884d8", milestones: [
    { t: "Future Founders (accelerator)", s: 0, l: 4 },
    { t: "Form LLC", s: 2, l: 1 },
    { t: "Operating agreement + equity split", s: 2, l: 1 },
    { t: "File trademark", s: 2, l: 1 },
    { t: "Trademark registered", s: 5, l: 2 },
    { t: "Register copyrights", s: 3, l: 2 },
    { t: "Grant funding (non-dilutive)", s: 2, l: 10 },
    { t: "Summer intern", s: 2, l: 1 },
    { t: "Founder full-time (+ MBA)", s: 6, l: 1 },
    { t: "First core hires (AI eng, education, marketing)", s: 11, l: 2 },
    { t: "Evaluate patents (if warranted)", s: 8, l: 2 },
  ] },
  { name: "Intelligence", color: "#9a7fe0", milestones: [
    { t: "AI partnership (ethical provider)", s: 2, l: 2 },
    { t: "Build app", s: 2, l: 2 },
    { t: "Block curriculum (intern + SME)", s: 2, l: 3 },
    { t: "Prototype (testing)", s: 3, l: 1 },
    { t: "Web app: assessments + profiles", s: 4, l: 1 },
    { t: "App public launch", s: 5, l: 1 },
    { t: "App v2", s: 8, l: 2 },
    { t: "B2B platform build", s: 12, l: 3 },
    { t: "App v3", s: 12, l: 2 },
    { t: "B2B SaaS subscriptions", s: 15, l: 1 },
  ] },
  { name: "Brand/Media", color: "#e273ac", milestones: [
    { t: "Instagram", s: 2, l: 3 },
    { t: "LinkedIn (academia/investors)", s: 3, l: 3 },
    { t: "TikTok", s: 3, l: 3 },
    { t: "Newsletter (Beehiiv)", s: 3, l: 3 },
    { t: "Film podcast (Dallas, w/ Will)", s: 3, l: 1 },
    { t: "Podcast + YouTube", s: 4, l: 3 },
    { t: "Threads, Reddit", s: 6, l: 2 },
    { t: "Brand collabs", s: 12, l: 4 },
  ] },
  { name: "Products", color: "#cf6f9e", milestones: [
    { t: "Card game MVP (for podcast)", s: 3, l: 1 },
    { t: "Card game presales", s: 4, l: 1 },
    { t: "Card game launch (7 packs)", s: 5, l: 1 },
    { t: "Deluxe block packs (e.g. Safety, Trust)", s: 8, l: 3 },
    { t: "Journals", s: 10, l: 4 },
    // direct-to-family elementary entry (not school-gated)
    { t: "Children's books (direct-to-family)", s: 8, l: 3 },
  ] },
  { name: "Community", color: "#c768c6", milestones: [
    { t: "Test cohort matching", s: 2, l: 2 },
    { t: "Campus cohort testing", s: 2, l: 2 },
    { t: "First cohorts (pilot cities)", s: 4, l: 2 },
    { t: "Test app-assisted facilitation", s: 6, l: 2 },
    { t: "Intelligence-driven matching", s: 8, l: 4 },
    { t: "Multi-city cohorts", s: 8, l: 4 },
    { t: "App-facilitated cohorts at scale", s: 9, l: 3 },
    { t: "Corporate culture workshops", s: 10, l: 3 },
  ] },
  { name: "Education", color: "#f0a0b8", milestones: [
    { t: "Advisory board (faculty + clinical)", s: 2, l: 2 },
    { t: "University pilots", s: 10, l: 3 },
    { t: "HS/college conferences + competitions", s: 10, l: 6 },
    { t: "University + HS partnerships", s: 12, l: 3 },
    { t: "Emo-ed pilots (K-5, underserved regions)", s: 8, l: 4 },
    { t: "K-12 curriculum (emo-ed via health/PE)", s: 12, l: 3 },
    { t: "School pilots (middle/high)", s: 14, l: 2 },
    { t: "School-district contracts", s: 15, l: 1 },
  ] },
];

const NOW_Q = 2.15; // ~ early Q3 2026 (today), as a quarter index (0 = 2026 Q1)

// Marquee point-in-time moments, flagged with a star above the lanes.
// q is a fractional quarter index (2.0 = start of 26 Q3) placing the star at its real date
const MOMENTS: { t: string; q: number }[] = [
  { t: "Demo day", q: 1.85 }, // Jun 17 2026
  { t: "LLC formed", q: 2.02 }, // Jul 2 2026
  { t: "Web assessments", q: 4.05 }, // early 27 Q1
  { t: "Podcast", q: 4.3 }, // ~Feb 2027
  { t: "Card game", q: 5.1 }, // ~Apr 2027
  { t: "App", q: 5.7 }, // ~Jun 2027
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

export default async function HQGantt({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const yi = YEARS.findIndex((y) => y.year === view);
  const single = yi >= 0;
  const totalQ = single ? 4 : 16; // quarter columns shown
  const qOffset = single ? yi * 4 : 0; // first visible quarter index
  const nowInView = NOW_Q >= qOffset && NOW_Q <= qOffset + totalQ;
  const nowLeft = ((NOW_Q - qOffset) / totalQ) * 100;

  // marquee moments visible in the current window, placed at their real date
  const moments = MOMENTS.filter((m) => m.q >= qOffset && m.q <= qOffset + totalQ);

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
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Roadmap</span>
          <a href="/hq-a3f9k2x7/strategy" className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Strategy</a>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Board · soon</span>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Docs · soon</span>
        </div>

        {/* year tabs */}
        <div className="mt-4 flex flex-wrap gap-1.5 text-[12px]">
          <a href="/hq-a3f9k2x7/gantt" className={`rounded-md px-2.5 py-1 ${!single ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}>All</a>
          {YEARS.map((y) => (
            <a key={y.year} href={`/hq-a3f9k2x7/gantt?view=${y.year}`} className={`rounded-md px-2.5 py-1 ${view === y.year ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}>
              {y.year}
            </a>
          ))}
        </div>

        {/* timeline */}
        <div className="mt-8 overflow-x-auto pb-4">
          <div className={single ? "min-w-[640px]" : "min-w-[1000px]"}>
            {/* year / quarter header */}
            {single ? (
              <div>
                <div className="flex items-baseline gap-2 px-1">
                  <span className="text-[26px] font-semibold leading-none" style={{ fontFamily: "var(--font-instrument)" }}>{YEARS[yi].year}</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">{YEARS[yi].obj}</span>
                </div>
                <div className="mt-2 grid text-[11px] text-white/40" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                  <span className="border-l border-white/10 px-2">Q1</span>
                  <span className="border-l border-white/10 px-2">Q2</span>
                  <span className="border-l border-white/10 px-2">Q3</span>
                  <span className="border-l border-white/10 px-2">Q4</span>
                </div>
              </div>
            ) : (
              <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                {YEARS.map((y) => (
                  <div key={y.year} className="border-l border-white/10 px-3 pb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[22px] font-semibold leading-none" style={{ fontFamily: "var(--font-instrument)" }}>{y.year}</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">{y.obj}</span>
                    </div>
                    <div className="mt-1.5 grid grid-cols-4 text-[10px] text-white/35">
                      <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* marquee moment flags, placed at their real date */}
            {moments.length > 0 && (
              <div className="relative mt-3 h-11">
                {moments.map((m, i) => (
                  <div
                    key={m.t}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${((m.q - qOffset) / totalQ) * 100}%`, transform: "translateX(-50%)", top: 0 }}
                    title={m.t}
                  >
                    <span className="text-[13px] leading-none" style={{ color: "#e273ac", textShadow: "0 0 8px rgba(226,115,172,0.7)" }}>★</span>
                    <span className="w-px bg-white/15" style={{ height: i % 2 === 1 ? 16 : 5 }} />
                    <span className="whitespace-nowrap text-[9px] leading-none text-white/75">{m.t}</span>
                  </div>
                ))}
              </div>
            )}

            {/* lanes with vertical rules + now line overlaid */}
            <div className="relative mt-3">
              {[25, 50, 75].map((pct) => (
                <div key={pct} className="pointer-events-none absolute inset-y-0 w-px bg-white/[0.08]" style={{ left: `${pct}%` }} />
              ))}
              {nowInView && (
                <div className="pointer-events-none absolute inset-y-0 z-10 w-px bg-[#e273ac]/70" style={{ left: `${nowLeft}%` }}>
                  <span className="absolute left-1 top-0 text-[9px] font-bold uppercase tracking-wide text-[#f6b0d3]">Now</span>
                </div>
              )}

              {LANES.map((ws) => {
                // clip each milestone to the visible window, then greedy-pack into rows
                const vis = ws.milestones
                  .map((m) => {
                    const vs = Math.max(m.s, qOffset);
                    const ve = Math.min(m.s + m.l - 1, qOffset + totalQ - 1);
                    return vs > ve ? null : { t: m.t, ls: vs - qOffset, ll: ve - vs + 1 };
                  })
                  .filter((m): m is { t: string; ls: number; ll: number } => m !== null);
                const sorted = [...vis].sort((a, b) => a.ls - b.ls);
                const rowEnd: number[] = [];
                const placed = sorted.map((m) => {
                  let r = rowEnd.findIndex((e) => e <= m.ls);
                  if (r === -1) { r = rowEnd.length; rowEnd.push(0); }
                  rowEnd[r] = m.ls + m.ll;
                  return { ...m, r };
                });
                return (
                  <div key={ws.name} className="mb-3.5">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: ws.color }} />
                      <span className="text-[13px] font-semibold text-white">{ws.name}</span>
                    </div>
                    <div className="space-y-1">
                      {Array.from({ length: rowEnd.length }).map((_, r) => (
                        <div key={r} className="grid" style={{ gridTemplateColumns: `repeat(${totalQ}, 1fr)` }}>
                          {placed.filter((p) => p.r === r).map((p) => (
                            <div
                              key={p.t}
                              className="flex h-6 items-center overflow-hidden rounded px-2"
                              style={{ gridColumn: `${p.ls + 1} / span ${p.ll}`, background: ws.color }}
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
          Draft timing to refine; hover a bar for the full name.{" "}
          {single ? (
            <a href="/hq-a3f9k2x7/gantt" className="text-white/70 underline underline-offset-2">Back to all years</a>
          ) : (
            "Pick a year above for the detailed view."
          )}
        </p>
      </div>
    </main>
  );
}
