import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";
import BudgetCalc from "./BudgetCalc";

/**
 * HQ Marketing — the cross-cutting marketing operating system (the "how"),
 * distinct from each product's own funnel in the Strategy tab (the "what").
 * Built from the Future Founders early-marketing sessions: the funnel model,
 * content types, the content engine + toolkit, principles, and a budget
 * calculator. Copy is a working draft.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

const HQ = "/hq-a3f9k2x7";
const PINK = "#e273ac";

const FUNNEL: { stage: string; goal: string; tools: string[]; color: string }[] = [
  { stage: "Awareness", goal: "Capture a broad audience", color: "#6f8fd8", tools: ["SEO + paid search", "Social ad campaigns", "Content (blogs / videos)", "Influencer partnerships", "Events + sponsorships", "FB / Reddit groups"] },
  { stage: "Consideration", goal: "Be the obvious best solution", color: "#9a7fe0", tools: ["App store page", "Interactive demos", "Screenshots", "Case studies", "Landing page", "Testimonials + reviews"] },
  { stage: "Conversion", goal: "Remove barriers to buy", color: "#e273ac", tools: ["Easy signup", "Clear value prop", "Access to support", "Limited-time deals", "Conversion popups + email/text"] },
  { stage: "Retention", goal: "Keep + drive word of mouth", color: "#c768c6", tools: ["Ongoing support", "Referral programs", "User-generated content", "Loyalty + exclusive access", "Regular comms"] },
];

const CONTENT: { t: string; d: string }[] = [
  { t: "Critiques + debate-sparkers", d: "Pop culture, media, reality TV, read through the framework." },
  { t: "Product-launch campaigns", d: "Card-game street challenges + 'answer this card' posts around drops." },
  { t: "Podcast clips", d: "The marketing engine: short cuts from every episode." },
  { t: "Experience videos", d: "Real people going through the in-person gamified experiences." },
  { t: "Everyday people", d: "Not celebrities, playing the card game or doing Unraveled activities." },
  { t: "Informative carousels", d: "Educational multi-slide posts (teach a block, a concept)." },
  { t: "Newsletter", d: "Owned channel: pop-culture block explainer + a subscriber-only Rep + BTS." },
];

const PRINCIPLES: { t: string; d: string }[] = [
  { t: "Social isn't optional", d: "Your pages are a dynamic part of the brand and the foundation of community; networks take word-of-mouth to exponential reach for minor cost." },
  { t: "The engagement cycle", d: "Post → the platform counts the activity → audience engages → you engage back → the platform rewards it → your next post gets boosted. Engaging back with your own audience compounds reach, it's part of the job." },
  { t: "Organic → paid", d: "Find the best-performing organic content, iterate it multiple ways, take the winner, then promote it as an ad. Validate for free before you pay to amplify." },
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{children}</div>;
}

export default function HQMarketing() {
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
          <a href={`${HQ}/board`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Tasks</a>
          <a href={`${HQ}/kpis`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">KPIs</a>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Marketing</span>
        </div>

        {/* intro */}
        <p className="mt-8 max-w-2xl text-[13.5px] leading-relaxed text-white/70">
          The marketing operating system, the <span className="text-white/90">how</span>. Each product carries its own funnel in <a href={`${HQ}/strategy`} className="underline decoration-white/30 underline-offset-2 hover:decoration-white">Strategy</a>; this is the shared playbook behind all of them.
        </p>

        {/* THE FUNNEL */}
        <div className="mt-10"><Eyebrow>The funnel</Eyebrow></div>
        <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">Reach wide, narrow to those who act; expect fall-off toward the bottom. Each stage has a different job.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FUNNEL.map((f) => (
            <div key={f.stage} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              <div className="h-1 w-full" style={{ background: f.color }} />
              <div className="p-4">
                <div className="text-[14px] font-semibold text-white/90">{f.stage}</div>
                <div className="mt-0.5 text-[11.5px]" style={{ color: f.color }}>{f.goal}</div>
                <ul className="mt-3 space-y-1.5">
                  {f.tools.map((t) => (
                    <li key={t} className="flex gap-2 text-[12px] leading-snug text-white/70">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: f.color }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-xl border px-4 py-3 text-[12px] leading-snug text-white/70" style={{ borderColor: `${PINK}4d`, background: `${PINK}10` }}>
          <span className="font-semibold" style={{ color: PINK }}>With younger audiences the funnel is clunky and nonlinear.</span> Plan for ~6+ touchpoints per conversion, across devices and contexts, not one clean path.
        </p>

        {/* CONTENT TYPES */}
        <div className="mt-12"><Eyebrow>Content types</Eyebrow></div>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT.map((c) => (
            <div key={c.t} className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-3.5">
              <div className="text-[13px] font-semibold text-white/90">{c.t}</div>
              <p className="mt-1 text-[12px] leading-snug text-white/55">{c.d}</p>
            </div>
          ))}
        </div>

        {/* CONTENT ENGINE */}
        <div className="mt-12"><Eyebrow>The content engine</Eyebrow></div>
        <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">A research-fed, Claude-agent, human-reviewed content factory (modeled on the FF director's system).</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11.5px]">
          {["Research + performance data", "Claude strategist agent", "Team review", "Refined posts", "Post tracker", "Produce (reels + carousels)"].map((s, i, arr) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-white/85">{s}</span>
              {i < arr.length - 1 && <span style={{ color: PINK }}>&rarr;</span>}
            </span>
          ))}
        </div>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          {[
            { t: "Gear", d: "Smartphone, mic, tripod, light." },
            { t: "Software", d: "CapCut, Canva, Descript, CaptionsAI, Higgsfield, Nano Banana Pro." },
            { t: "Systems", d: "Content planner, AI strategist agent, post tracker." },
          ].map((k) => (
            <div key={k.t} className="rounded-xl px-3.5 py-3" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="text-[12.5px] font-semibold text-white/90">{k.t}</div>
              <p className="mt-0.5 text-[11.5px] leading-snug text-white/55">{k.d}</p>
            </div>
          ))}
        </div>

        {/* PRINCIPLES */}
        <div className="mt-12"><Eyebrow>Principles</Eyebrow></div>
        <div className="mt-4 space-y-2.5">
          {PRINCIPLES.map((p) => (
            <div key={p.t} className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-4">
              <div className="text-[13.5px] font-semibold text-white/90">{p.t}</div>
              <p className="mt-1 text-[12.5px] leading-snug text-white/60">{p.d}</p>
            </div>
          ))}
        </div>

        {/* BUDGET */}
        <div className="mt-12"><Eyebrow>Budget · funnel math</Eyebrow></div>
        <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">
          Every ad budget is the funnel as math: <span className="text-white/80">impressions × CTR = clicks; clicks × CVR = conversions</span>; cost comes from CPC (per click) or CPM (per 1,000 impressions). Drag the assumptions to work backward from a spend to a cost per conversion.
        </p>
        <BudgetCalc />
      </div>
    </main>
  );
}
