import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";

/**
 * HQ Strategy — a high-level view of the pillars behind the roadmap.
 * Overview = a radial "strategy constellation" (each pillar a node orbiting
 * the mission core). Sub-tabs (?pillar=…) open a detail view per pillar.
 * The Roadmap (/gantt) says when; this says why and how. Copy is a draft.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

type Pillar = {
  key: string;
  name: string;
  color: string;
  principle: string;
  points: string[];
  // node position on the constellation, in a 0–100 square (center = 50,50)
  x: number;
  y: number;
};

const PILLARS: Pillar[] = [
  {
    key: "financial",
    name: "Financial",
    color: "#6f8fd8",
    principle: "Grow without giving ourselves away.",
    points: [
      "Grants first: chase non-dilutive funding (SBIR/STTR, NIH/NSF) before any equity raise.",
      "Revenue from experiences people pay for (cohorts, app, products), not ads or data.",
      "Stage the burn: lean 2026 build, scale spend only as grants and revenue land.",
    ],
    x: 50,
    y: 11,
  },
  {
    key: "legal",
    name: "Legal",
    color: "#b884d8",
    principle: "Own the IP, protect the name.",
    points: [
      "Entity and equity settled early: LLC formed, operating agreement, clean split.",
      "Trademark the name and marks; register copyrights on the framework and content.",
      "Patents stay tentative until the intelligence model and app take real shape.",
    ],
    x: 80,
    y: 26,
  },
  {
    key: "brand",
    name: "Brand",
    color: "#e273ac",
    principle: "Strong relationships are built, not found.",
    points: [
      "Built for 18-30 year olds first: the assessment and app target young adults; K-12 and other segments are later extensions.",
      "One promise everywhere: connection is built with intention, not matched by an algorithm.",
      "Dark, deliberate, spectrum-not-scores. Depth over hype.",
      "Family-first founder story as the emotional spine.",
    ],
    x: 87,
    y: 59,
  },
  {
    key: "marketing",
    name: "Marketing",
    color: "#cf6f9e",
    principle: "Earn trust before we ask for anything.",
    points: [
      "Channels by capacity: Instagram (Aug), TikTok (Oct), Newsletter (Dec), LinkedIn for academia and investors.",
      "Monthly podcast (Will + Madhuri, with loved ones), launching 2027 with YouTube; clips pre-sell the card game.",
      "Feature real people going through the experience: the pride, the dared vulnerability, and the 'Love Island' pull make it aspirational, and cohorts supply the stories.",
      "Win on the ground first and make it genuinely cool; corporate and institutional channels come after, or it reads top-down and loses the cool.",
    ],
    x: 66,
    y: 85,
  },
  {
    key: "product",
    name: "Product",
    color: "#9a7fe0",
    principle: "The framework is the moat; everything else expresses it.",
    points: [
      "The app is the core: an AI relationship companion built on an ethical model partnership.",
      "A physical line makes the framework tangible: card game (7 packs), deluxe block packs, journals, children's books.",
      "Expand into B2B (SaaS + licensing) once the consumer foundation is proven.",
    ],
    x: 34,
    y: 85,
  },
  {
    key: "community",
    name: "Community",
    color: "#c768c6",
    principle: "Real connection, tested in the real world.",
    points: [
      "Cohort pilots on campuses and in pilot cities, then multi-city.",
      "Cohorts and the app co-evolve in parallel: real-world cohorts train the intelligence, and the intelligence sharpens each cohort.",
      "The app facilitates cohorts at scale; corporate workshops fund the youth conferences and competitions.",
    ],
    x: 13,
    y: 59,
  },
  {
    key: "education",
    name: "Education",
    color: "#f0a0b8",
    principle: "Teach the skills school never did.",
    points: [
      "An advisory board of faculty and clinicians grounds the work.",
      "K-12 curriculum as emotional education taught through health class and PE, then school pilots.",
      "Grow into university and high-school partnerships, then district contracts.",
    ],
    x: 20,
    y: 26,
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

const HQ = "/hq-a3f9k2x7";

function Constellation() {
  return (
    <div className="mt-8">
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        {/* connecting lines + rings */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
          {PILLARS.map((p) => (
            <line key={p.key} x1="50" y1="50" x2={p.x} y2={p.y} stroke={p.color} strokeOpacity="0.28" strokeWidth="0.35" />
          ))}
        </svg>

        {/* mission core */}
        <div className="absolute left-1/2 top-1/2 flex h-[118px] w-[118px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-center backdrop-blur-sm" style={{ boxShadow: "0 0 60px rgba(154,127,224,0.35)" }}>
          <CubeMark className="h-9 w-9" />
          <span className="mt-1.5 max-w-[86px] text-[10px] font-medium leading-tight text-white/70">
            built, not found
          </span>
        </div>

        {/* pillar nodes */}
        {PILLARS.map((p) => (
          <a
            key={p.key}
            href={`${HQ}/strategy?pillar=${p.key}`}
            title={p.principle}
            className="group absolute flex h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border text-center transition"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              borderColor: `${p.color}66`,
              background: `${p.color}1f`,
              boxShadow: `0 0 26px ${p.color}33`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full transition group-hover:scale-150" style={{ background: p.color }} />
            <span className="mt-1.5 px-1 text-[12px] font-semibold leading-tight text-white">{p.name}</span>
          </a>
        ))}
      </div>
      <p className="mt-6 text-center text-[13px] text-white/50">
        Seven pillars, one system. Tap any pillar to go deeper.
      </p>
    </div>
  );
}

function PillarDetail({ p }: { p: Pillar }) {
  return (
    <div className="mt-8 max-w-2xl">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
        <span className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: p.color }}>
          {p.name}
        </span>
      </div>
      <p className="mt-3 text-[26px] leading-tight text-white sm:text-[30px]" style={{ fontFamily: "var(--font-instrument)" }}>
        {p.principle}
      </p>
      <ul className="mt-5 space-y-3">
        {p.points.map((pt) => (
          <li key={pt} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color }} />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[12px] text-white/40">Draft — let's flesh this pillar out together.</p>
    </div>
  );
}

export default async function HQStrategy({
  searchParams,
}: {
  searchParams: Promise<{ pillar?: string }>;
}) {
  const { pillar } = await searchParams;
  const active = PILLARS.find((p) => p.key === pillar);

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
          <a href={`${HQ}/gantt`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Roadmap</a>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Strategy</span>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Board · soon</span>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Docs · soon</span>
        </div>

        {/* pillar sub-tabs */}
        <div className="mt-4 flex flex-wrap gap-1.5 text-[12px]">
          <a href={`${HQ}/strategy`} className={`rounded-md px-2.5 py-1 ${!active ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}>
            Overview
          </a>
          {PILLARS.map((p) => (
            <a
              key={p.key}
              href={`${HQ}/strategy?pillar=${p.key}`}
              className={`rounded-md px-2.5 py-1 ${active?.key === p.key ? "text-white" : "text-white/45 hover:text-white/80"}`}
              style={active?.key === p.key ? { background: `${p.color}33` } : undefined}
            >
              {p.name}
            </a>
          ))}
        </div>

        {active ? <PillarDetail p={active} /> : <Constellation />}

        {/* TODO (Madhuri): remove this footnote once the copy is approved. */}
        <p className="mt-10 text-[12px] text-white/40">Draft copy to refine together.</p>
      </div>
    </main>
  );
}
