import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";

/**
 * HQ Strategy — a high-level, one-screen view of the pillars behind the
 * roadmap. The Roadmap (/gantt) answers "when"; this answers "why / how".
 * Copy is a working draft to refine with Madhuri.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

type Pillar = {
  name: string;
  color: string;
  principle: string;
  points: string[];
};

const PILLARS: Pillar[] = [
  {
    name: "Financial",
    color: "#6f8fd8",
    principle: "Grow without giving ourselves away.",
    points: [
      "Grants first: chase non-dilutive funding (SBIR/STTR, NIH/NSF) before any equity raise.",
      "Revenue from experiences people pay for (cohorts, app, products), not ads or data.",
      "Stage the burn: lean 2026 build, scale spend only as grants and revenue land.",
    ],
  },
  {
    name: "Legal",
    color: "#b884d8",
    principle: "Own the IP, protect the name.",
    points: [
      "Entity and equity settled early: LLC formed, operating agreement, clean split.",
      "Trademark the name and marks; register copyrights on the framework and content.",
      "Patents stay tentative until the intelligence model and app take real shape.",
    ],
  },
  {
    name: "Brand",
    color: "#e273ac",
    principle: "Strong relationships are built, not found.",
    points: [
      "One promise everywhere: connection is built with intention, not matched by an algorithm.",
      "Dark, deliberate, spectrum-not-scores. Depth over hype.",
      "Family-first founder story as the emotional spine.",
    ],
  },
  {
    name: "Marketing",
    color: "#cf6f9e",
    principle: "Earn trust before we ask for anything.",
    points: [
      "Channels by capacity: Instagram (Aug), TikTok (Oct), Newsletter (Dec), LinkedIn for academia and investors.",
      "Podcast-led in 2027: film in Dallas with Will, launch podcast + YouTube, use clips to pre-sell the card game.",
      "Community is the proof: cohorts and real stories do the convincing.",
    ],
  },
  {
    name: "Product",
    color: "#9a7fe0",
    principle: "The framework is the moat; everything else expresses it.",
    points: [
      "The app is the core: an AI relationship companion built on an ethical model partnership.",
      "A physical line makes the framework tangible: card game (7 packs), journals, children's books.",
      "Expand into B2B (SaaS + licensing) once the consumer foundation is proven.",
    ],
  },
  {
    name: "Community",
    color: "#c768c6",
    principle: "Real connection, tested in the real world.",
    points: [
      "Cohort pilots on campuses and in pilot cities, then multi-city.",
      "App-assisted facilitation, scaling to trained facilitators.",
      "Corporate culture workshops as a later revenue line.",
    ],
  },
  {
    name: "Education",
    color: "#f0a0b8",
    principle: "Teach the skills school never did.",
    points: [
      "An advisory board of faculty and clinicians grounds the work.",
      "Build K-12 curriculum (emotional and relational education), then pilot in schools.",
      "Grow into university and high-school partnerships, then district contracts.",
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

export default function HQStrategy() {
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
          Strategy
        </h1>
        <p className="mt-3 max-w-2xl text-[14px] text-white/55">
          The pillars behind the plan. The Roadmap says when; this says why and how.
        </p>

        {/* section nav */}
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <a href="/hq-a3f9k2x7/gantt" className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Roadmap</a>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Strategy</span>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Board · soon</span>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Docs · soon</span>
        </div>

        {/* pillar grid */}
        <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <div key={p.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: p.color }}>
                  {p.name}
                </span>
              </div>
              <p className="mt-2.5 text-[18px] leading-snug text-white" style={{ fontFamily: "var(--font-instrument)" }}>
                {p.principle}
              </p>
              <ul className="mt-3 space-y-1.5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-[13px] leading-relaxed text-white/70">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: p.color }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* TODO (Madhuri): remove this footnote once the copy is approved. */}
        <p className="mt-6 text-[12px] text-white/40">Draft copy to refine together.</p>
      </div>
    </main>
  );
}
