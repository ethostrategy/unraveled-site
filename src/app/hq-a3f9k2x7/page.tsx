import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";

/**
 * Unraveled HQ — the internal team hub (private, first page: the Roadmap).
 * Gated by a password (see middleware + /api/hq-unlock) and noindex + unlinked.
 *
 * The strategic roadmap: 5 workstreams x 4 phases (2026-2029). Workstreams,
 * phases, and initiatives are plain editable data so they can be renamed,
 * reordered, or extended freely. Each initiative carries a `done` flag that
 * drives per-workstream + overall progress. Next: quarterly goals + KPIs under
 * each phase, then click-to-toggle done state synced to Airtable, then a Kanban
 * board of tasks under each initiative.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

// ───────────────────────────── DATA ─────────────────────────────
const PHASES = [
  { year: "2026", obj: "BUILD", current: true },
  { year: "2027", obj: "LAUNCH", current: false },
  { year: "2028", obj: "EXPAND", current: false },
  { year: "2029", obj: "SCALE", current: false },
];

// An initiative is a string, or { t, done } once it has progress state.
type Item = string | { t: string; done?: boolean };
type Workstream = { name: string; color: string; blurb: string; cells: Item[][] };
const norm = (x: Item): { t: string; done: boolean } =>
  typeof x === "string" ? { t: x, done: false } : { done: false, ...x };

const WORKSTREAMS: Workstream[] = [
  { name: "Framework", color: "#6f8fd8", blurb: "Core IP & research", cells: [
    [{ t: "Form LLC, file trademark", done: true }, "Provisional patent"],
    ["Trademark registered", "Utility patent (if warranted)"],
    ["Framework v2 (data-informed)"],
    ["License the framework"] ] },
  { name: "Application", color: "#9a7fe0", blurb: "Product & AI", cells: [
    ["App beta (cohort testing)", "AI foundation (ethical AI partner)"],
    ["App public launch (free)", "Intelligence layer live"],
    ["App v2", "B2B platform build"],
    ["App v3", "B2B SaaS subscriptions"] ] },
  { name: "Community", color: "#c768c6", blurb: "Programs & cohorts", cells: [
    ["Test pairings / matching", "Campus cohort testing"],
    ["First cohorts (pilot cities)", "Test app-assisted facilitation"],
    ["Multi-city cohorts", "Facilitators at scale"],
    ["Corporate culture workshops"] ] },
  { name: "Brand", color: "#e273ac", blurb: "Growth & content", cells: [
    [{ t: "Instagram + TikTok", done: true }, "Threads, Reddit, newsletter"],
    ["LinkedIn, YouTube", "Podcast (live card-game beta)"],
    ["Journals", "Children's books"],
    ["Brand collabs"] ] },
  { name: "Education", color: "#f0a0b8", blurb: "Curriculum & schools", cells: [
    ["Advisory board (faculty + clinical)"],
    ["Build K-12 curriculum (Sex-Ed / Emo-Ed)"],
    ["School pilots"],
    ["University + HS partnerships", "School-district contracts"] ] },
];

const GRID = "168px repeat(4, minmax(0, 1fr))";

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

export default function HQ() {
  return (
    <main className="relative min-h-screen text-white">
      <Backdrop />
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
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
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Swimlane</span>
          <a href="/hq-a3f9k2x7/gantt" className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Timeline</a>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Board · soon</span>
        </div>

        {/* matrix */}
        <div className="mt-14 overflow-x-auto pb-4">
          <div className="min-w-[920px]">
            {/* phase header row — styled as column headers, not cards */}
            <div className="grid items-end gap-2.5" style={{ gridTemplateColumns: GRID }}>
              <div />
              {PHASES.map((p) => (
                <div key={p.year} className={`rounded-t-xl px-3.5 pb-2 pt-3 ${p.current ? "bg-white/[0.04]" : ""}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[28px] font-semibold leading-none" style={{ fontFamily: "var(--font-instrument)" }}>
                      {p.year}
                    </span>
                    {p.current && (
                      <span className="ml-auto rounded-full bg-[#e273ac]/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#f6b0d3]">
                        Now
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.18em] text-white/75">{p.obj}</div>
                  <div className="mt-2.5 h-px w-full bg-white/10" />
                </div>
              ))}
            </div>

            {/* workstream rows */}
            <div className="mt-4 space-y-2.5">
              {WORKSTREAMS.map((ws) => (
                  <div key={ws.name} className="grid items-stretch gap-2.5" style={{ gridTemplateColumns: GRID }}>
                    {/* label */}
                    <div
                      className="flex flex-col justify-center rounded-xl px-4 py-3"
                      style={{ background: `${ws.color}1f`, borderLeft: `3px solid ${ws.color}` }}
                    >
                      <span className="text-[15px] font-semibold text-white">{ws.name}</span>
                      <span className="mt-0.5 text-[11px] text-white/55">{ws.blurb}</span>
                    </div>

                    {/* phase cells — each initiative is its own glass chip */}
                    {ws.cells.map((cellItems, i) => (
                      <div
                        key={i}
                        className={`flex flex-col gap-1.5 rounded-xl p-2 ${
                          PHASES[i].current ? "bg-white/[0.045] ring-1 ring-white/10" : ""
                        }`}
                      >
                        {cellItems.map(norm).map((it) => (
                          <div
                            key={it.t}
                            className="flex items-start gap-2 rounded-lg bg-white/[0.06] px-2.5 py-1.5"
                          >
                            <span
                              className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                              style={{ background: ws.color }}
                            />
                            <span className="text-[12px] leading-snug text-white/85">{it.t}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
              ))}
            </div>
          </div>
        </div>

        {/* TODO (Madhuri): remove this footnote once the hub is finalized. */}
        <p className="mt-8 text-[12px] text-white/40">
          Progress is set in code for now · click-to-toggle + Airtable sync comes with the editable
          version · then quarterly goals &amp; KPIs, then a Kanban board of tasks.
        </p>
      </div>
    </main>
  );
}
