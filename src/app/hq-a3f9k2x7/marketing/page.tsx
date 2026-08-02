import { Fragment } from "react";
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

const PILLARS: { t: string; d: string }[] = [
  { t: "Educate", d: "Teach the framework + the blocks." },
  { t: "Provoke", d: "Pop-culture critiques + debate." },
  { t: "Behind-the-scenes", d: "The build + the founder journey." },
  { t: "Social proof", d: "Real people, experiences, testimonials." },
];

const CONTENT: { icon: string; t: string; ex: string }[] = [
  { icon: "chat", t: "Critiques + debate-sparkers", ex: "\"Trust red flag, or just insecurity?\"" },
  { icon: "megaphone", t: "Product-launch campaigns", ex: "Stop strangers to answer a card on camera." },
  { icon: "mic", t: "Podcast clips", ex: "A 30-second \"both true\" moment." },
  { icon: "play", t: "Experience videos", ex: "A cohort's breakthrough at The Unraveling." },
  { icon: "users", t: "Everyday people", ex: "Two friends playing Real Talk for the first time." },
  { icon: "layers", t: "Informative carousels", ex: "\"The 4 layers of a relationship,\" 6 slides." },
  { icon: "mail", t: "Newsletter", ex: "Block explainer + a subscriber-only Rep + BTS." },
];

const ENGINE: { phase: string; color: string; steps: { icon: string; step: string }[] }[] = [
  { phase: "Plan", color: "#6f8fd8", steps: [
    { icon: "search", step: "Research" },
    { icon: "spark", step: "Draft ideas" },
    { icon: "check", step: "Refine" },
  ] },
  { phase: "Produce", color: "#9a7fe0", steps: [
    { icon: "film", step: "Film video" },
    { icon: "cut", step: "Edit video" },
    { icon: "image", step: "Design graphics" },
  ] },
  { phase: "Publish", color: "#e273ac", steps: [
    { icon: "calendar", step: "Track" },
  ] },
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

const PRINCIPLES: { icon: string; t: string; d: string; flow?: string[]; loop?: boolean; tactics?: string[] }[] = [
  { icon: "globe", t: "Social isn't optional", d: "Your pages are the brand's living surface and the foundation of community, and networks turn word-of-mouth into exponential reach for minor cost." },
  { icon: "loop", t: "The engagement cycle", d: "Engaging back with your own audience compounds reach. It's part of the job, not optional.", flow: ["Post", "Platform counts it", "Audience engages", "You engage back", "Next post boosted"], loop: true, tactics: ["Giveaways + contests", "Micro-influencers", "Get tagged / UGC", "Peer-founder support"] },
  { icon: "trending", t: "Organic → paid", d: "Validate for free, then pay to amplify what already works.", flow: ["Best organic post", "Iterate variations", "Pick the winner", "Promote as an ad"] },
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

function EIcon({ name, className }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    spark: <path d="M12 3l2 5.5L19.5 10 14 12l-2 5.5L10 12 4.5 10 10 8.5z" />,
    check: <path d="M20 7L10 17l-5-5" />,
    film: <><rect x="3" y="6" width="12" height="12" rx="1.5" /><path d="M15 10l6-3v10l-6-3" /></>,
    cut: <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><path d="M8 8l12 10M8 16L20 6" /></>,
    calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" /></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></>,
    chat: <path d="M20 6H4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v3.5L11.5 17H20a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z" />,
    megaphone: <><path d="M3 10v4h4l9 5V5L7 10H3z" /><path d="M19 9a4 4 0 0 1 0 6" /></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0" /><path d="M12 17v4" /></>,
    play: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5l6 3.5-6 3.5z" /></>,
    users: <><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6" /><path d="M18 13.5a5.5 5.5 0 0 1 2.5 4.5" /></>,
    layers: <><rect x="8" y="4" width="11" height="15" rx="1.5" /><path d="M5 7v11a2 2 0 0 0 2 2h8" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 6 8-6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3.5 12h17" /><path d="M12 3a15 15 0 0 1 0 18" /><path d="M12 3a15 15 0 0 0 0 18" /></>,
    loop: <><path d="M20 11a8 8 0 1 0-1 5" /><path d="M20 4v6h-6" /></>,
    trending: <><path d="M3 17l6-6 4 4 8-8" /><path d="M16 7h5v5" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[name]}
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
        <div className="mt-5 space-y-3">
          {FUNNEL.map((f, i) => (
            <div key={f.stage} className="mx-auto" style={{ width: `${100 - i * 13}%` }}>
              <div className="rounded-xl px-4 py-2.5 text-center" style={{ background: `${f.color}22`, border: `1px solid ${f.color}55` }}>
                <span className="text-[14px] font-semibold text-white/90">{f.stage}</span>
                <span className="ml-2 text-[11.5px]" style={{ color: f.color }}>{f.goal}</span>
              </div>
              <div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
                {f.tools.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-white/60">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-xl border px-4 py-3 text-[12px] leading-snug text-white/70" style={{ borderColor: `${PINK}4d`, background: `${PINK}10` }}>
          <span className="font-semibold" style={{ color: PINK }}>Plan for multiple touchpoints per conversion by default.</span> Almost no one buys on first contact. Especially with young audiences the path zig-zags: they catch you on TikTok, forget, a friend mentions it, they check the site, get an email, come back weeks later. Assume ~6+ scattered touchpoints, never one clean top-to-bottom pass.
        </p>
        <p className="mt-2 rounded-xl border px-4 py-3 text-[12px] leading-snug text-white/70" style={{ borderColor: "#6f8fd84d", background: "#6f8fd810" }}>
          <span className="font-semibold" style={{ color: "#6f8fd8" }}>Every stage leaks.</span> Find where you lose people and plug it: too many links or an unclear next step at Consideration, a clunky signup at Conversion, silence after the sale at Retention.
        </p>

        {/* CONTENT PILLARS */}
        <div className="mt-12"><Eyebrow>Content pillars</Eyebrow></div>
        <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">The handful of themes everything ladders up to.</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.t} className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-3.5">
              <div className="text-[13px] font-semibold text-white/90">{p.t}</div>
              <p className="mt-1 text-[11.5px] leading-snug text-white/55">{p.d}</p>
            </div>
          ))}
        </div>

        {/* CONTENT TYPES */}
        <div className="mt-12"><Eyebrow>Content types</Eyebrow></div>
        <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">The formats those pillars take.</p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT.map((c) => (
            <div key={c.t} className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `${PINK}22`, color: PINK }}>
                  <EIcon name={c.icon} className="h-[18px] w-[18px]" />
                </span>
                <div className="text-[13px] font-semibold leading-tight text-white/90">{c.t}</div>
              </div>
              <p className="mt-2.5 text-[12px] leading-snug text-white/55">{c.ex}</p>
            </div>
          ))}
        </div>

        {/* CONTENT ENGINE */}
        <div className="mt-12"><Eyebrow>The content engine</Eyebrow></div>
        <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-stretch">
          {ENGINE.map((p, pi) => (
            <Fragment key={p.phase}>
              <div className="flex-1 rounded-2xl border p-3.5" style={{ borderColor: `${p.color}33`, background: `${p.color}0d` }}>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: p.color }}>{p.phase}</span>
                </div>
                <div className="mt-3 space-y-2">
                  {p.steps.map((s) => (
                    <div key={s.step} className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `${p.color}22`, color: p.color }}>
                        <EIcon name={s.icon} className="h-[18px] w-[18px]" />
                      </span>
                      <span className="flex-1 text-[13px] font-semibold text-white/90">{s.step}</span>
                    </div>
                  ))}
                </div>
              </div>
              {pi < ENGINE.length - 1 && (
                <div className="flex items-center justify-center lg:w-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 rotate-90 text-white/25 lg:rotate-0" aria-hidden>
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </div>
              )}
            </Fragment>
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
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: `${PINK}22`, color: PINK }}>
                  <EIcon name={p.icon} className="h-[18px] w-[18px]" />
                </span>
                <div className="text-[13.5px] font-semibold text-white/90">{p.t}</div>
              </div>
              {!p.flow && <p className="mt-2 text-[12.5px] leading-snug text-white/60">{p.d}</p>}
              {p.flow && (
                <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
                  {p.flow.map((s, i) => (
                    <Fragment key={s}>
                      <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: `${PINK}18`, color: "#f6b0d3" }}>{s}</span>
                      {i < p.flow!.length - 1 && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-white/25" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
                      )}
                    </Fragment>
                  ))}
                  {p.loop && (
                    <span className="ml-1 inline-flex items-center gap-1 text-[10.5px] text-white/40">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden><path d="M20 11a8 8 0 1 0-1 5" /><path d="M20 4v6h-6" /></svg>
                      repeats
                    </span>
                  )}
                </div>
              )}
              {p.tactics && (
                <div className="mt-3 border-t border-white/[0.06] pt-3">
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">Tactics</div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tactics.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-white/70">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* BUDGET / COSTS */}
        <div className="mt-12"><Eyebrow>Budget · the full cost picture</Eyebrow></div>
        <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">Ad spend is only one bucket. The real monthly cost is the tools; gear is a one-time hit; ad spend is optional on top.</p>

        {/* start lean */}
        <div className="mt-4 rounded-xl border px-4 py-3.5" style={{ borderColor: "#6f8fd84d", background: "#6f8fd810" }}>
          <div className="text-[13px] font-semibold" style={{ color: "#6f8fd8" }}>Start lean.</div>
          <p className="mt-1 text-[12px] leading-snug text-white/70">You don&rsquo;t need the whole funnel on day one. Pick one or two actions per stage, then improve.</p>
          <ul className="mt-2.5 space-y-1.5">
            {[
              ["Awareness", "one channel (TikTok or IG) + the newsletter signup"],
              ["Consideration", "the landing page + a few BTS / testimonial posts"],
              ["Conversion", "waitlist / presale page + one email sequence (Beehiiv free tier)"],
              ["Retention", "reply to every comment + DM, plus a simple referral ask"],
            ].map(([stage, action]) => (
              <li key={stage} className="flex gap-2 text-[12px] leading-snug text-white/70">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: "#6f8fd8" }} />
                <span><span className="font-semibold text-white/85">{stage}</span> · {action}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2.5 text-[11.5px] leading-snug text-white/50">Almost all free. Add paid amplification only once something works organically.</p>
        </div>

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
        <p className="mt-4 rounded-xl border px-4 py-3 text-[12px] leading-snug text-white/70" style={{ borderColor: `${PINK}4d`, background: `${PINK}10` }}>
          <span className="font-semibold" style={{ color: PINK }}>Cost per conversion is only half the math.</span> A customer is worth it only if the price beats the fully-loaded cost to serve them: product cost (COGS), packaging, shipping, software fees, and card processing. That bites hardest on the physical goods (card game, merch, books).
        </p>
      </div>
    </main>
  );
}
