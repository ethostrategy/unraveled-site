import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";

/**
 * HQ Strategy — a high-level view of the pillars behind the roadmap.
 * Overview = a radial "strategy constellation" (each pillar a node orbiting
 * the mission core). Sub-tabs (?pillar=…) open a detail view per pillar:
 * a hero principle + a grid of point cards. The Roadmap (/gantt) says when;
 * this says why and how. Copy is a working draft.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

type Point = { head: string; body: string };
type Pillar = {
  key: string;
  name: string;
  color: string;
  principle: string;
  points: Point[];
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
      { head: "Grants first", body: "Chase non-dilutive funding (SBIR/STTR, NIH/NSF) before any equity raise." },
      { head: "Earned, not extracted", body: "Revenue from experiences people pay for (cohorts, app, products), not ads or data." },
      { head: "Stage the burn", body: "Lean 2026 build; scale spend only as grants and revenue land." },
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
      { head: "Entity + equity early", body: "LLC formed, operating agreement, clean equity split." },
      { head: "Protect the marks", body: "Trademark the name and marks; register copyrights on the framework and content." },
      { head: "Patents when it's real", body: "Hold patents tentative until the intelligence model and app take shape." },
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
      { head: "For 18-30, first", body: "The assessment and app target young adults; K-12 and other segments are later extensions." },
      { head: "Built, not found", body: "Connection is built with intention, not matched by an algorithm." },
      { head: "Depth over hype", body: "Dark, deliberate, spectrum-not-scores." },
      { head: "Family-first story", body: "The founder story is the emotional spine." },
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
      { head: "Channels by capacity", body: "Instagram (Aug), TikTok (Oct), Newsletter (Dec), LinkedIn for academia and investors." },
      { head: "Monthly podcast", body: "Will + Madhuri with loved ones, launching 2027 with YouTube; clips pre-sell the card game." },
      { head: "Real people, real stories", body: "Feature people going through the experience: pride, dared vulnerability, the 'Love Island' pull. Cohorts supply the stories." },
      { head: "Cool on the ground first", body: "Win grassroots before corporate/institutional, or it reads top-down and loses the cool." },
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
      { head: "App at the core", body: "An AI relationship companion built on an ethical model partnership." },
      { head: "Make it tangible", body: "A physical line: card game (7 packs), deluxe block packs, journals, children's books." },
      { head: "B2B when proven", body: "Expand into SaaS + licensing once the consumer foundation is solid." },
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
      { head: "Cohorts, city by city", body: "Pilots on campuses and in pilot cities, then multi-city." },
      { head: "A parallel flywheel", body: "Cohorts and the app co-evolve: real-world cohorts train the intelligence, the intelligence sharpens each cohort." },
      { head: "Scale, then monetize", body: "The app facilitates cohorts at scale; corporate workshops fund the youth conferences and competitions." },
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
      { head: "18-30 core first", body: "University pilots and partnerships first, grounded by a faculty + clinical advisory board." },
      { head: "Impact track", body: "K-5 emo-ed pilots in underserved regions as a grant-funded initiative." },
      { head: "K-12 later", body: "Emotional education via health/PE and district contracts come later, as a downward extension." },
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
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
        <span className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: p.color }}>
          {p.name}
        </span>
      </div>
      <p className="mt-3 max-w-3xl text-[27px] leading-tight text-white sm:text-[33px]" style={{ fontFamily: "var(--font-instrument)" }}>
        {p.principle}
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {p.points.map((pt, i) => (
          <div key={pt.head} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold" style={{ background: `${p.color}26`, color: p.color }}>
                {i + 1}
              </span>
              <span className="text-[15px] font-semibold" style={{ color: p.color }}>
                {pt.head}
              </span>
            </div>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/70">{pt.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-7 text-[12px] text-white/40">Draft — let's refine this pillar together.</p>
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
