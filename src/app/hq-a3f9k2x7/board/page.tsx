import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";
import WeeklyPlan from "./WeeklyPlan";

/**
 * HQ Weeks — the founders' weekly plan, modeled on the intern roadmap.
 * Each week has a short bounded focus list per founder and one "Done when"
 * line each — the win condition, so the week has an edge. Cards collapse.
 * Draft content — populate with your real weekly targets and Will's split.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

const HQ = "/hq-a3f9k2x7";

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

export default function HQWeeks() {
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
          Roadmap
        </h1>

        {/* section nav */}
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <a href={`${HQ}/gantt`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Milestones</a>
          <a href={`${HQ}/strategy`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Strategy</a>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Weeks</span>
          <a href={`${HQ}/kpis`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">KPIs</a>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Docs · soon</span>
        </div>

        <p className="mt-6 text-[12px] text-white/40">Founder sync · Wednesdays (shifting to Mondays)</p>

        <WeeklyPlan />
      </div>
    </main>
  );
}
