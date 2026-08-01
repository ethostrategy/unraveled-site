import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";
import BudgetCalc from "./BudgetCalc";

/**
 * HQ Marketing — the cross-cutting marketing operating system (the "how"),
 * distinct from each product's own funnel in the Strategy tab (the "what").
 * Built from the Future Founders early-marketing sessions: the funnel model,
 * content types, the content engine + toolkit, principles, and the cost
 * picture + a budget calculator. Copy is a working draft.
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

const CONTENT: { t: string; d: string; ex: string }[] = [
  { t: "Critiques + debate-sparkers", d: "Read pop culture / reality TV through the 10 blocks.", ex: "\"Trust red flag, or just insecurity?\"" },
  { t: "Product-launch campaigns", d: "Rally a drop.", ex: "Stop strangers to answer a card on camera." },
  { t: "Podcast clips", d: "The engine, one cut per episode.", ex: "A 30-second \"both true\" moment." },
  { t: "Experience videos", d: "People inside the in-person experiences.", ex: "A cohort's breakthrough at The Unraveling." },
  { t: "Everyday people", d: "Real people, not celebrities.", ex: "Two friends playing Real Talk for the first time." },
  { t: "Informative carousels", d: "Teach one idea, swipe by swipe.", ex: "\"The 4 layers of a relationship,\" 6 slides." },
  { t: "Newsletter", d: "Owned channel (Beehiiv).", ex: "Block explainer + a subscriber-only Rep + BTS." },
];

const ENGINE: { step: string; tool: string; effort: string }[] = [
  { step: "Research the space", tool: "Competitors, culture, Reddit", effort: "monthly refresh" },
  { step: "Claude drafts ideas", tool: "Strategist agent", effort: "minutes, ongoing" },
  { step: "Review + refine", tool: "You + Will", effort: "~1 hr / batch" },
  { step: "Film", tool: "Batch on your phone", effort: "~2 hrs / week" },
  { step: "Edit + caption", tool: "CapCut, Captions", effort: "~20 min / post" },
  { step: "Schedule + track", tool: "Post tracker", effort: "weekly" },
];

const TOOLKIT: { t: string; d: string }[] = [
  { t: "Gear", d: "Smartphone, mic, tripod, light." },
  { t: "Software", d: "CapCut, Canva, Descript, CaptionsAI, Higgsfield, Nano Banana Pro." },
  { t: "Systems", d: "Content planner, AI strategist agent, post tracker." },
];

const COSTS: { bucket: string; note: string; items: string[]; total: string }[] = [
  { bucket: "Tools", note: "recurring / monthly", items: ["Beehiiv: free to 2.5k subs, ~$49/mo after", "CapCut ~$10", "Descript ~$16", "Captions ~$10", "Canva Pro — covered via EthoStrategy"], total: "≈ $35–85 / mo" },
  { bucket: "Gear", note: "one-time", items: ["Phone (owned)", "Mic ~$130", "Tripod ~$30", "Light ~$40"], total: "≈ $200 once" },
  { bucket: "Ad spend", note: "variable", items: ["Paid promotion of your best organic posts", "Only what you choose to put behind a winner", "Funnel math below"], total: "you set it" },
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
          <span className="font-semibold" style={{ color: PINK }}>Plan for multiple touchpoints per conversion by default.</span> Almost no one buys on first contact. Especially with young audiences the path zig-zags: they catch you on TikTok, forget, a friend mentions it, they check the site, get an email, come back weeks later. Assume ~6+ scattered touchpoints, never one clean top-to-bottom pass.
        </p>

        {/* CONTENT TYPES */}
        <div className="mt-12"><Eyebrow>Content types</Eyebrow></div>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT.map((c) => (
            <div key={c.t} className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-4">
              <div className="text-[13px] font-semibold text-white/90">{c.t}</div>
              <p className="mt-1 text-[12px] leading-snug text-white/55">{c.d}</p>
              <p className="mt-2 border-l-2 pl-2.5 text-[11.5px] italic leading-snug text-white/45" style={{ borderColor: `${PINK}66` }}>{c.ex}</p>
            </div>
          ))}
        </div>

        {/* CONTENT ENGINE */}
        <div className="mt-12"><Eyebrow>The content engine</Eyebrow></div>
        <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">A research-fed, Claude-drafted, human-reviewed content factory. Steps + rough effort:</p>
        <div className="mt-4 space-y-1.5">
          {ENGINE.map((e, i) => (
            <div key={e.step} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold" style={{ background: `${PINK}26`, color: PINK }}>{i + 1}</span>
              <div className="min-w-0 flex-1">
                <span className="text-[13px] font-semibold text-white/90">{e.step}</span>
                <span className="ml-2 text-[11.5px] text-white/45">{e.tool}</span>
              </div>
              <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-0.5 text-[10.5px] text-white/55">{e.effort}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          {TOOLKIT.map((k) => (
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

        {/* BUDGET / COSTS */}
        <div className="mt-12"><Eyebrow>Budget · the full cost picture</Eyebrow></div>
        <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">Ad spend is only one bucket. The real monthly cost is the tools; gear is a one-time hit; ad spend is optional on top.</p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          {COSTS.map((c) => (
            <div key={c.bucket} className="flex flex-col rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[13.5px] font-semibold text-white/90">{c.bucket}</span>
                <span className="text-[10.5px] uppercase tracking-wide text-white/40">{c.note}</span>
              </div>
              <ul className="mt-2.5 flex-1 space-y-1.5">
                {c.items.map((it) => (
                  <li key={it} className="flex gap-2 text-[11.5px] leading-snug text-white/65">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: PINK }} />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-3 border-t border-white/10 pt-2.5 text-[13px] font-semibold" style={{ color: PINK }}>{c.total}</div>
            </div>
          ))}
        </div>

        {/* AD SPEND CALCULATOR */}
        <p className="mt-6 max-w-2xl text-[12.5px] leading-snug text-white/55">
          Ad spend is the variable one. It's the funnel as math: <span className="text-white/80">impressions × CTR = clicks; clicks × CVR = conversions</span>; cost comes from CPC (per click) or CPM (per 1,000 impressions). Drag the assumptions to work backward from a spend to a cost per conversion.
        </p>
        <BudgetCalc />
      </div>
    </main>
  );
}
