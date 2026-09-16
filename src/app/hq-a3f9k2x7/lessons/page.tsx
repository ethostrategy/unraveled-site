import type { Metadata } from "next";
import Link from "next/link";
import Backdrop from "@/components/Backdrop";

/**
 * HQ Lessons — a running retrospective. Each entry captures a stretch where
 * things slipped (or went right), why, and the concrete change we're making so
 * it sticks. The point isn't blame; it's turning misses into process.
 *
 * Add a new entry by prepending to LESSONS (newest first).
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

type Lesson = {
  period: string;
  tag: string;
  title: string;
  what: string;
  why: string[];
  worked?: string;
  changes: string[];
};

const LESSONS: Lesson[] = [
  {
    period: "Sep 2 – 15, 2026",
    tag: "Miss",
    title: "The two-week stall",
    what: "Almost nothing planned for Sep 2 – 15 got finished. The Between Us manufacturing chain and the newsletter/social chain both sat still, and the deep-build tasks (app V1 scope, deck QR spec, trademark research, white paper) never started.",
    why: [
      "Vacation (Sep 3 – 13). We planned a full task load through the trip on the assumption there'd be time to work on the road. There wasn't.",
      "A hard external dependency wasn't sequenced for. The card-game decisions were gated on the Future Founders founder meetings (Isiuwa / Canaan), which hadn't happened yet. Even a finished pricing model wouldn't have unblocked the manufacturer pick.",
      "A brief and its deliverable didn't quite line up. The week needed the pricing / unit-economics plan, and what came back was a strong marketing launch strategy instead, so the finance chain didn't move. More an expectations gap than anything, and an easy one to close with a clearer ask up front.",
    ],
    worked:
      "That marketing launch strategy is genuinely useful and is already feeding the go-to-market plan. The gap was in how the ask was framed, not the work that came back.",
    changes: [
      "Definition of done on every task. A crisp “done when” line so the right deliverable comes back the first time.",
      "A request-form handoff for team deliverables. Brief the ask (scope, expected output, due date) through a submitted form so expectations are explicit and captured, not verbal.",
      "Plan around travel. Set realistic capacity for weeks with vacation or OOO instead of a full load, and mark them on the board.",
      "Sequence behind hard dependencies. Schedule dependent tasks after the gating event (e.g. the FF meeting), not optimistically before it.",
      "Lean on the standing Wednesday founder sync to confirm scope and unblock (already in place).",
    ],
  },
];

export default function HQLessons() {
  return (
    <main className="relative min-h-screen text-white">
      <Backdrop />
      <div className="relative mx-auto max-w-4xl px-6 py-10">
        {/* header */}
        <div className="flex items-center gap-3">
          <CubeMark className="h-7 w-7" />
          <span className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/55">Unraveled HQ</span>
        </div>
        <h1 className="mt-10 text-4xl leading-[1.05] sm:text-5xl" style={{ fontFamily: "var(--font-serif)" }}>
          Lessons
        </h1>

        {/* section nav */}
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <Link href={`${HQ}/milestones`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Milestones</Link>
          <Link href={`${HQ}/strategy`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Strategy</Link>
          <Link href={`${HQ}/board`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Tasks</Link>
          <Link href={`${HQ}/metrics`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Metrics</Link>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Lessons</span>
        </div>

        <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-white/55">
          A running retrospective. What slipped (or went right), why, and the change we&rsquo;re making so it sticks. Not blame &mdash; process.
        </p>

        {/* entries */}
        <div className="mt-10 space-y-8">
          {LESSONS.map((l) => (
            <article
              key={l.period}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_60px_-30px_rgba(7,18,60,0.6)] sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-rose/40 bg-rose/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose">
                  {l.tag}
                </span>
                <span className="text-[13px] font-medium text-white/55">{l.period}</span>
              </div>
              <h2 className="mt-4 text-2xl text-white sm:text-[1.7rem]" style={{ fontFamily: "var(--font-serif)" }}>
                {l.title}
              </h2>

              <p className="mt-4 text-[15px] leading-relaxed text-white/80">{l.what}</p>

              {/* Why */}
              <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Why it happened</p>
              <ul className="mt-3 space-y-2.5">
                {l.why.map((w, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose/70" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>

              {/* What worked */}
              {l.worked && (
                <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">What worked</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/80">{l.worked}</p>
                </div>
              )}

              {/* Changes */}
              <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">What we&rsquo;re changing</p>
              <ul className="mt-3 space-y-2.5">
                {l.changes.map((c, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-white/85">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#8FB4F9]" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
