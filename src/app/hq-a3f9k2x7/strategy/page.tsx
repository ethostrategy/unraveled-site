import type { Metadata } from "next";
import type { ReactNode } from "react";
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
      { head: "Grants first", body: "Win non-dilutive grants (SBIR/STTR, NIH/NSF) before raising any equity." },
      { head: "Earn it, don't sell data", body: "Revenue comes from experiences people pay for (cohorts, app, products), never ads or data." },
      { head: "Spend as money lands", body: "Stay lean; grow spending only as grants and revenue come in." },
    ],
    x: 50,
    y: 11,
  },
  {
    key: "legal",
    name: "Legal",
    color: "#b884d8",
    principle: "Protect the work, the data, and the people in it.",
    points: [
      { head: "Entity + equity early", body: "LLC formed, operating agreement, clean equity split." },
      { head: "Protect the marks", body: "Trademark the name and marks; register copyrights on the framework and content." },
      { head: "Data privacy + security", body: "Handle sensitive relationship data with real privacy and security compliance: GDPR/CCPA, encryption, minimal collection." },
      { head: "Child rights + digital controls", body: "Age gating, COPPA-grade protections, and digital-media controls wherever minors are involved." },
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
      { head: "Built, not found", body: "One promise everywhere: connection is built with intention, not matched by an algorithm." },
      { head: "How it should feel", body: "Safe, seen, and a little brave; depth over hype, warmth over judgment." },
      { head: "Spectrum, not scores", body: "Growth shows as movement along a spectrum, never a cold number or a verdict." },
      { head: "Family-first story", body: "The founder story and its family roots are the emotional spine." },
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
      { head: "Who: 18-30 first", body: "Reach young adults on the ground first; other segments come later." },
      { head: "Where: build in public", body: "Instagram (Aug '26), TikTok (Oct), newsletter (Dec), then LinkedIn for academia + investors." },
      { head: "How: show real people", body: "A monthly podcast plus real people going through the experience make it aspirational; cohorts supply the stories." },
      { head: "Order: grassroots, then corporate", body: "Win cool and trust with users before corporate/institutional, or it reads top-down." },
    ],
    x: 66,
    y: 85,
  },
  {
    key: "product",
    name: "Products",
    color: "#9a7fe0",
    principle: "The framework is the moat; everything else expresses it.",
    points: [
      { head: "Web-first, then the app", body: "Assessments and Unraveled profiles launch on the web first; the full AI companion app (on an ethical model partnership) follows." },
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
      { head: "Cohorts + app feed each other", body: "Real-world cohorts train the intelligence; the intelligence sharpens each cohort." },
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
      { head: "K-5 impact pilots", body: "Grant-funded emo-ed pilots in underserved elementary schools." },
      { head: "K-12 later", body: "Emotional education via health/PE and district contracts come later, as a downward extension." },
    ],
    x: 20,
    y: 26,
  },
  {
    key: "resource",
    name: "Resources",
    color: "#7d5bd4",
    principle: "A small team, hugely leveraged.",
    points: [
      { head: "Now: founders + intern", body: "Madhuri + Will (co-founders) and a summer intern building v1." },
      { head: "2027: CEO full-time", body: "Madhuri goes full-time as CEO in Aug 2027, alongside the MBA." },
      { head: "2028: first core hires", body: "In order: AI/security engineer (build), marketing + events director (grow), education / gamification lead (expand into B2B)." },
      { head: "Leverage over headcount", body: "Build on an ethical AI partnership + tools; hire only what compounds, keep ownership intact." },
    ],
    x: 0,
    y: 0,
  },
  {
    key: "advisors",
    name: "Advisors",
    color: "#a878d8",
    principle: "The right advisors, at the right time — without giving up the company.",
    points: [
      { head: "Reviewers now, free", body: "Framework reviewers (Mili +) review for the academic contribution and the mission — no equity, zero dilution. Bring them on now." },
      { head: "Strategic advisors post-MBA", body: "Wait for the MBA network to reach higher-caliber advisors; offer advisory equity (0.1-0.5%, vesting) then, once the cap table and raise are clearer." },
      { head: "The on-ramp is the ask", body: "Lead with \"would you review our framework?\" — concrete, flattering, low-commitment. That review relationship becomes the advisory one." },
      { head: "Keep the cadence light", body: "Quarterly check-ins + ad-hoc access; give each advisor something to do (a review, an intro, a warm door) so they stay engaged." },
    ],
    x: 0,
    y: 0,
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
  const n = PILLARS.length;
  const nodes = PILLARS.map((p, i) => {
    const a = ((-90 + (i * 360) / n) * Math.PI) / 180;
    return { ...p, x: 50 + 38 * Math.cos(a), y: 50 + 38 * Math.sin(a) };
  });
  return (
    <div className="mt-8">
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        {/* connecting lines + rings */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.3" />
          {nodes.map((p) => (
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
        {nodes.map((p) => (
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

function VizPanel({ children, takeaway }: { children: ReactNode; takeaway: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5">
      <div className="flex justify-center">{children}</div>
      <p className="mx-auto mt-4 max-w-md text-center text-[14.5px] leading-snug text-white/90">{takeaway}</p>
    </div>
  );
}

// Each pillar gets the diagram that best fits its information — deliberately
// different from one another. Keep them "10-second" readable.
function PillarVisual({ p }: { p: Pillar }) {
  const c = p.color;
  switch (p.key) {
    case "financial":
      return (
        <VizPanel takeaway="Fund on grants and revenue — keep 100% ownership.">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex flex-col gap-2">
              {["Grants", "Revenue"].map((s) => (
                <span key={s} className="rounded-lg px-5 py-2 text-center text-[15px] font-bold text-white" style={{ background: `${c}30`, border: `1px solid ${c}80` }}>
                  {s}
                </span>
              ))}
            </div>
            <span className="text-[28px]" style={{ color: c }}>&rarr;</span>
            <div className="flex h-[104px] w-[104px] flex-col items-center justify-center rounded-full text-white" style={{ border: `3px solid ${c}`, boxShadow: `0 0 24px ${c}55` }}>
              <span className="text-[30px] font-extrabold leading-none">100%</span>
              <span className="mt-0.5 text-[12px] text-white/60">ours</span>
            </div>
          </div>
        </VizPanel>
      );
    case "legal": {
      const rows: { t: string; s: "secured" | "building" | "tentative" }[] = [
        { t: "Entity + equity", s: "secured" },
        { t: "Trademark + copyright", s: "secured" },
        { t: "Data privacy + security", s: "building" },
        { t: "Child rights + media controls", s: "building" },
        { t: "Patents", s: "tentative" },
      ];
      const icon = { secured: "✓", building: "◐", tentative: "?" } as const;
      return (
        <VizPanel takeaway="Own the IP, guard everyone's data, and protect minors — patents only when warranted.">
          <div className="w-full max-w-sm space-y-2">
            {rows.map((r) => (
              <div key={r.t} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: `${c}14`, border: `1px solid ${c}2e` }}>
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{
                    background: r.s === "secured" ? c : r.s === "building" ? `${c}55` : "transparent",
                    color: r.s === "tentative" ? c : "#140d2b",
                    border: r.s === "tentative" ? `1px dashed ${c}` : undefined,
                  }}
                >
                  {icon[r.s]}
                </span>
                <span className="text-[14px] font-medium text-white">{r.t}</span>
                <span className="ml-auto text-[10px] uppercase tracking-wide text-white/50">{r.s === "building" ? "in progress" : r.s}</span>
              </div>
            ))}
          </div>
        </VizPanel>
      );
    }
    case "brand":
      return (
        <VizPanel takeaway="Relationships you build with intention, not match by chance.">
          <div className="flex w-full max-w-sm items-stretch gap-3">
            <div className="flex-1 rounded-xl border border-white/10 p-4 text-center opacity-60">
              <div className="text-[15px] font-semibold text-white line-through">Found</div>
              <div className="mt-0.5 text-[11px] text-white/55">left to chance</div>
            </div>
            <div className="flex-1 rounded-xl p-4 text-center" style={{ background: `${c}1f`, border: `1px solid ${c}80` }}>
              <div className="text-[15px] font-semibold text-white">Built</div>
              <div className="mt-0.5 text-[11px] text-white/70">with intention</div>
            </div>
          </div>
        </VizPanel>
      );
    case "marketing":
      return (
        <VizPanel takeaway="Be cool with users, earn their trust, then monetize and go corporate.">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Be cool on the ground", "Earn trust", "Then monetize + corporate"].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded-lg px-3 py-2 text-center text-[13px] font-semibold text-white" style={{ background: `${c}28`, border: `1px solid ${c}70` }}>{s}</span>
                {i < arr.length - 1 && <span className="text-[16px]" style={{ color: c }}>&rarr;</span>}
              </span>
            ))}
          </div>
        </VizPanel>
      );
    case "product":
      return (
        <VizPanel takeaway="Two Truths on the web first, then the app, then the physical line — one framework through it all.">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Two Truths (web)", "App", "Physical line", "B2B"].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded-lg px-3 py-2 text-[13px] font-semibold text-white" style={{ background: `${c}${i === arr.length - 1 ? "12" : "28"}`, border: `1px solid ${c}${i === arr.length - 1 ? "3a" : "70"}`, opacity: i === arr.length - 1 ? 0.7 : 1 }}>
                  {s}
                </span>
                {i < arr.length - 1 && <span className="text-[16px]" style={{ color: c }}>&rarr;</span>}
              </span>
            ))}
          </div>
        </VizPanel>
      );
    case "community":
      return (
        <VizPanel takeaway="Cohorts train the app; the app powers better cohorts.">
          <svg viewBox="0 0 320 140" className="w-full max-w-[360px]">
            <path d="M108,52 C150,26 170,26 212,52" fill="none" stroke={c} strokeWidth={2.5} />
            <polygon points="214,52 203,47 205,58" fill={c} />
            <text x="160" y="20" textAnchor="middle" fontSize="11" fill="#ffffff" fillOpacity={0.8}>trains</text>
            <path d="M212,88 C170,114 150,114 108,88" fill="none" stroke={c} strokeWidth={2.5} />
            <polygon points="106,88 117,93 115,82" fill={c} />
            <text x="160" y="132" textAnchor="middle" fontSize="11" fill="#ffffff" fillOpacity={0.8}>powers</text>
            <circle cx="66" cy="70" r="46" fill={c} fillOpacity={0.16} stroke={c} strokeOpacity={0.6} strokeWidth={1.5} />
            <text x="66" y="68" textAnchor="middle" fontSize="16" fontWeight="700" fill="#ffffff">Cohorts</text>
            <text x="66" y="84" textAnchor="middle" fontSize="10" fill="#ffffff" fillOpacity={0.6}>real world</text>
            <circle cx="254" cy="70" r="46" fill={c} fillOpacity={0.16} stroke={c} strokeOpacity={0.6} strokeWidth={1.5} />
            <text x="254" y="68" textAnchor="middle" fontSize="16" fontWeight="700" fill="#ffffff">App</text>
            <text x="254" y="84" textAnchor="middle" fontSize="10" fill="#ffffff" fillOpacity={0.6}>intelligence</text>
          </svg>
        </VizPanel>
      );
    case "education":
      return (
        <VizPanel takeaway="Start with 18-30, run a K-5 impact track, extend to K-12 later.">
          <svg viewBox="0 0 330 120" className="w-full max-w-[420px]">
            <line x1="24" y1="92" x2="306" y2="92" stroke="#ffffff" strokeOpacity={0.16} />
            <rect x="172" y="40" width="134" height="34" rx="8" fill={c} fillOpacity={0.24} stroke={c} strokeOpacity={0.65} />
            <circle cx="184" cy="50" r="8" fill={c} />
            <text x="184" y="53.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#140d2b">1</text>
            <text x="248" y="63" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">18-30</text>
            <rect x="26" y="40" width="64" height="34" rx="8" fill={c} fillOpacity={0.14} stroke={c} strokeOpacity={0.45} />
            <circle cx="38" cy="50" r="8" fill={c} fillOpacity={0.75} />
            <text x="38" y="53.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#140d2b">2</text>
            <text x="66" y="63" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff">K-5</text>
            <rect x="92" y="40" width="78" height="34" rx="8" fill="none" stroke={c} strokeOpacity={0.32} strokeDasharray="4 3" />
            <circle cx="104" cy="50" r="8" fill="#ffffff" fillOpacity={0.14} />
            <text x="104" y="53.5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff" fillOpacity={0.7}>3</text>
            <text x="134" y="63" textAnchor="middle" fontSize="12" fontWeight="700" fill="#ffffff" fillOpacity={0.72}>K-12</text>
            <text x="26" y="108" textAnchor="middle" fontSize="9" fill="#ffffff" fillOpacity={0.45}>5</text>
            <text x="92" y="108" textAnchor="middle" fontSize="9" fill="#ffffff" fillOpacity={0.45}>11</text>
            <text x="172" y="108" textAnchor="middle" fontSize="9" fill="#ffffff" fillOpacity={0.45}>18</text>
            <text x="306" y="108" textAnchor="middle" fontSize="9" fill="#ffffff" fillOpacity={0.45}>30</text>
          </svg>
        </VizPanel>
      );
    case "resource":
      return (
        <VizPanel takeaway="A lean roster that grows only when grants and revenue support it.">
          <div className="w-full max-w-sm space-y-2">
            {[
              { t: "Co-founders + summer intern", when: "now" },
              { t: "CEO full-time (+ MBA)", when: "27 Q3" },
              { t: "Founding AI/Security Engineer", when: "28 Q1" },
              { t: "Director of Marketing & Events", when: "28 Q2" },
              { t: "Director of Curriculum & Gamification", when: "28 H2" },
            ].map((r) => (
              <div key={r.t} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: `${c}14`, border: `1px solid ${c}2e` }}>
                <span className="text-[14px] font-medium text-white">{r.t}</span>
                <span className="ml-auto text-[10px] uppercase tracking-wide text-white/50">{r.when}</span>
              </div>
            ))}
          </div>
        </VizPanel>
      );
    case "advisors":
      return (
        <VizPanel takeaway="Reviewers now, for free. Strategic advisors after the MBA, with equity.">
          <div className="flex w-full max-w-md items-stretch gap-3">
            <div className="flex-1 rounded-xl p-4 text-center" style={{ background: `${c}1f`, border: `1px solid ${c}80` }}>
              <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: c }}>Now</div>
              <div className="mt-1.5 text-[14px] font-semibold text-white">Framework reviewers</div>
              <div className="mt-1 text-[11px] text-white/60">no equity · mission + credibility</div>
            </div>
            <div className="flex-1 rounded-xl border border-white/10 p-4 text-center opacity-75">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-white/50">Later · MBA</div>
              <div className="mt-1.5 text-[14px] font-semibold text-white">Strategic advisory board</div>
              <div className="mt-1 text-[11px] text-white/60">advisory equity · better network</div>
            </div>
          </div>
        </VizPanel>
      );
    default:
      return null;
  }
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

      <PillarVisual p={p} />

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
          <a href={`${HQ}/gantt`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Milestones</a>
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
