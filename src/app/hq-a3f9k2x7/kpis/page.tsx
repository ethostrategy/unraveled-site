import type { Metadata } from "next";
import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import MetricsBoard from "./MetricsBoard";
import PipelineBoard from "./PipelineBoard";

/**
 * HQ Metrics — the live KPI scoreboard + financial forecast + expenses (top,
 * MetricsBoard, Airtable-backed) over the metrics spine, built from the Future
 * Founders method:
 * buyer experience -> the team/function each stage needs -> the KPI that
 * proves it works. This is a SCAFFOLD. Firm numbers + owners land when the
 * speaker's buyer-experience template arrives; the stages and candidate KPIs
 * here are a first pass to react to, not final targets.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

const HQ = "/hq-a3f9k2x7";

// Workstream palette, reused so a stage's owner reads back to the roadmap lane.
const C = {
  framework: "#6f8fd8",
  intelligence: "#9a7fe0",
  operations: "#b884d8",
  brand: "#e273ac",
  b2c: "#c768c6",
  b2b: "#f0a0b8",
};

type Stage = {
  step: string; // what the buyer does here
  what: string; // one line on the moment
  color: string; // owning-lane color for the rail
  owners: string[]; // the team/function this stage needs
  kpis: string[]; // candidate metrics (draft)
};

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

// Consumer-led spine: how a person meets Two Truths, gets to the "aha," comes
// back, pays for an experience, then brings others.
const CONSUMER: Stage[] = [
  {
    step: "Discover",
    what: "They first meet Unraveled, through content, a friend, or the card game.",
    color: C.brand,
    owners: ["Brand"],
    kpis: ["Reach / impressions", "Waitlist signups", "Signup source mix"],
  },
  {
    step: "Try",
    what: "Free entry: they make a profile and start Two Truths.",
    color: C.b2c,
    owners: ["Brand", "Intelligence"],
    kpis: ["Signup → profile rate", "Assessment starts", "Card-game units in play"],
  },
  {
    step: "Activate",
    what: "The aha: both partners finish and see the compare.",
    color: C.intelligence,
    owners: ["Intelligence"],
    kpis: ["Both-partners-complete rate", "Time to first compare", "“Both true” moment rate"],
  },
  {
    step: "Return",
    what: "They come back, retake, or go deeper into the framework.",
    color: C.intelligence,
    owners: ["Intelligence", "Brand"],
    kpis: ["W2 / W4 retention", "Repeat assessments", "Newsletter open rate"],
  },
  {
    step: "Pay",
    what: "They buy an experience: a cohort, gala, or escape room.",
    color: C.operations,
    owners: ["B2C", "Operations"],
    kpis: ["Free → paid conversion", "Cohort fill rate", "Revenue / experience", "LTV"],
  },
  {
    step: "Refer",
    what: "They bring a partner, friend, or group in.",
    color: C.brand,
    owners: ["Brand", "B2C"],
    kpis: ["Referral / invite rate", "Viral coefficient", "NPS"],
  },
];

// B2B lane: consumer proof + the white paper open the door to orgs.
const B2B: Stage[] = [
  {
    step: "Source",
    what: "Corporate, university, and K-12 leads enter the pipeline.",
    color: C.b2b,
    owners: ["B2B"],
    kpis: ["Qualified leads", "Discovery calls booked", "Pipeline value"],
  },
  {
    step: "Pilot",
    what: "A paid pilot workshop or cohort with one org.",
    color: C.operations,
    owners: ["B2B", "Operations"],
    kpis: ["Pilot close rate", "Pilot revenue", "Participant satisfaction"],
  },
  {
    step: "Expand",
    what: "The pilot renews and grows across the org.",
    color: C.b2b,
    owners: ["B2B"],
    kpis: ["Renewal rate", "Net revenue retention", "Seats / org"],
  },
];

// Inputs we control (drive these) → outcomes we watch (they follow).
const INPUTS = ["Discovery conversations", "Content posted", "Ad spend", "Demos / calls booked", "Emails + DMs sent"];
const OUTCOMES = ["Signups + activations", "Conversion rates", "Revenue", "Retention + referrals"];

// Seed board-deck Financial Status grid (from the FF session's template) — the
// nine numbers investors read, in the standard 3x3 layout. Values fill in
// post-launch; pre-launch the point is to track them from day one.
const FINANCE: { k: string; d: string }[] = [
  { k: "Gross burn", d: "Total cash out per month." },
  { k: "Runway", d: "Months of cash left at current burn." },
  { k: "Cash-out date", d: "When the money runs out if nothing changes." },
  { k: "Net burn", d: "Burn minus revenue, the real monthly loss." },
  { k: "MRR (Δ)", d: "Monthly recurring revenue + change vs last month." },
  { k: "ARR (Δ)", d: "Annualized recurring revenue + change." },
  { k: "Customers", d: "Total paying customers." },
  { k: "New (# / $)", d: "Customers added this period + revenue." },
  { k: "Lost (# / $)", d: "Customers churned this period + revenue." },
];

// Lessons from the session, translated to Unraveled.
const WATCH: { t: string; d: string }[] = [
  { t: "Second-demo beats first-demo enthusiasm", d: "The deeper funnel step predicts more than top-of-funnel excitement. For us: both-partners-complete beats raw signups." },
  { t: "Gross revenue can lie", d: "Rising contract values once masked a collapsing pipeline. Always read the conversion funnel underneath the top line." },
  { t: "Runway is survival", d: "One startup hit 3 days of payroll left. Know the cash position at all times." },
  { t: "Depth of engagement signals value", d: "Users lingering after a virtual event proved its worth. Our version: time to first compare, repeat assessments, weekly Reps." },
];

/* ── Buyer-journey flowchart (modeled on the FF KPI session) ──────────────────
 * The visual map of each journey: swimlanes by owning team, a nurture side-loop,
 * and per-node metrics split into # of actions (blue) vs conversion (pink), the
 * session's green/red model in our palette. The stage cards below carry detail. */

type FMetric = { label: string; kind: "action" | "conversion" };
type FNode = {
  title: string;
  sub?: string;
  shape?: "box" | "gate" | "terminal";
  sources?: string[];
  metrics?: FMetric[];
  nurture?: { title: string; items: string[]; metric?: string };
};
type Lane = { name: string; color: string; nodes: FNode[] };
type Journey = { lanes: Lane[] };

const CONSUMER_J: Journey = {
  lanes: [
    { name: "Brand", color: C.brand, nodes: [
      { title: "Awareness", sub: "They first meet Unraveled", sources: ["Podcast", "IG / TikTok", "SEO", "Card game", "Referrals"], metrics: [{ label: "Reach / impressions", kind: "action" }, { label: "Signup rate", kind: "conversion" }] },
    ] },
    { name: "Product", color: C.intelligence, nodes: [
      { title: "Free app", sub: "Make a profile, start Two Truths (no paywall)", metrics: [{ label: "Signups", kind: "action" }, { label: "Assessment starts", kind: "action" }, { label: "Signup → profile", kind: "conversion" }] },
      { title: "Activation", sub: "Both partners finish, see the compare", shape: "gate", metrics: [{ label: "Both-partners-complete", kind: "conversion" }, { label: "Time to first compare", kind: "conversion" }], nurture: { title: "Return loop", items: ["Newsletter", "Weekly Reps", "Community", "Retake"], metric: "W2 / W4 retention" } },
    ] },
    { name: "Experiences · CS", color: C.operations, nodes: [
      { title: "Paid experience", sub: "Cohort, gala, or escape room", metrics: [{ label: "Free → paid", kind: "conversion" }, { label: "Revenue / experience", kind: "action" }] },
      { title: "Refer + expand", sub: "Bring a partner, friend, or group", shape: "terminal", metrics: [{ label: "Referrals sent", kind: "action" }, { label: "Viral coefficient", kind: "conversion" }, { label: "NPS", kind: "conversion" }] },
    ] },
  ],
};

const B2B_J: Journey = {
  lanes: [
    { name: "Marketing", color: C.b2b, nodes: [
      { title: "Awareness", sub: "Leads enter the pipeline", sources: ["White paper + Dr. Burke", "Conferences", "LinkedIn", "Referrals"], metrics: [{ label: "Outbound touches", kind: "action" }, { label: "Cold-email / referral conversion", kind: "conversion" }] },
      { title: "Site / white paper", sub: "\"Book a pilot call\" CTA", metrics: [{ label: "Site visitors", kind: "action" }, { label: "CTA conversion", kind: "conversion" }] },
    ] },
    { name: "Sales", color: C.framework, nodes: [
      { title: "Lead qualification", sub: "Qualified leads move on", shape: "gate", metrics: [{ label: "Discovery calls booked", kind: "action" }, { label: "Lead quality score", kind: "conversion" }], nurture: { title: "Lead nurturing", items: ["Case studies", "Webinars", "Roundtables", "Monthly check-in"], metric: "Winback score" } },
      { title: "Pilot demo", sub: "Paid pilot workshop or cohort", metrics: [{ label: "Pilots booked", kind: "action" }, { label: "Pilot close rate", kind: "conversion" }] },
      { title: "Work to close → Closed won", shape: "terminal", metrics: [{ label: "Close rate", kind: "conversion" }] },
    ] },
    { name: "Customer Success", color: C.operations, nodes: [
      { title: "Land & expand", sub: "Renew and grow across the org", shape: "terminal", metrics: [{ label: "Expansion seats", kind: "action" }, { label: "Renewal rate", kind: "conversion" }, { label: "NRR", kind: "conversion" }] },
    ] },
  ],
};

function Flowchart({ j }: { j: Journey }) {
  // Flatten to a single numbered path, each step carrying its owning lane.
  const steps = j.lanes.flatMap((lane) => lane.nodes.map((n) => ({ n, lane })));
  return (
    <div className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-4 sm:p-5">
      <p className="mb-5 text-[11.5px] leading-snug text-white/45">
        Read top to bottom. The tag on each step is the team that owns it. The numbers each step is measured by are in the cards below.
      </p>
      <ol>
        {steps.map(({ n, lane }, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={n.title} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: lane.color }}>{i + 1}</span>
                {!last && <span className="mt-1 w-0.5 flex-1 rounded" style={{ background: `${lane.color}59` }} />}
              </div>
              <div className={last ? "min-w-0 flex-1" : "min-w-0 flex-1 pb-6"}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[14.5px] font-semibold text-white/90">{n.title}</span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ background: `${lane.color}26`, color: lane.color }}>{lane.name}</span>
                </div>
                {n.sub && <p className="mt-1 text-[12.5px] leading-snug text-white/55">{n.sub}</p>}
                {n.sources && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {n.sources.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10.5px] text-white/55">{s}</span>
                    ))}
                  </div>
                )}
                {n.nurture && (
                  <div className="mt-3 rounded-lg border border-dashed p-2.5" style={{ borderColor: `${lane.color}80`, background: `${lane.color}0d` }}>
                    <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide" style={{ color: lane.color }}>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 14l-4-4 4-4" /><path d="M5 10h9a5 5 0 0 1 5 5v1" /></svg>
                      Not ready? {n.nurture.title}
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {n.nurture.items.map((it) => (
                        <span key={it} className="rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-white/55">{it}</span>
                      ))}
                    </div>
                    <div className="mt-1.5 text-[10px] text-white/40">then loops back to this step</div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StageCard({ s }: { s: Stage }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
      <div className="h-1 w-full" style={{ background: s.color }} />
      <div className="p-5">
        <h3 className="text-[15px] font-semibold text-white/90">{s.step}</h3>
        <p className="mt-1 text-[12.5px] leading-snug text-white/55">{s.what}</p>

        <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">Owner</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {s.owners.map((o) => (
            <span key={o} className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium" style={{ borderColor: `${s.color}66`, color: s.color, background: `${s.color}12` }}>
              {o}
            </span>
          ))}
        </div>

        <div className="mt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">KPIs · draft</div>
        <ul className="mt-2 space-y-1.5">
          {s.kpis.map((k) => (
            <li key={k} className="flex gap-2 text-[12.5px] text-white/75">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: s.color }} />
              {k}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function HQKpis() {
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
          Metrics
        </h1>

        {/* section nav */}
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <Link href={`${HQ}/gantt`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Milestones</Link>
          <Link href={`${HQ}/strategy`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Strategy</Link>
          <Link href={`${HQ}/board`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Tasks</Link>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Metrics</span>
        </div>

        {/* live scoreboard + forecast + expenses */}
        <MetricsBoard />

        {/* sales pipeline */}
        <PipelineBoard />

        {/* how we measure — the KPI framework */}
        <h2 className="mt-14 text-[26px] text-white/95" style={{ fontFamily: "var(--font-instrument)" }}>How we measure</h2>

        {/* principle */}
        <div className="mt-8 rounded-2xl border px-5 py-4" style={{ borderColor: "#e273ac4d", background: "#e273ac10" }}>
          <p className="text-[13px] leading-relaxed text-white/80">
            <span className="font-semibold text-[#f6b0d3]">Customer-first, not investor-first. </span>
            We don&rsquo;t pick KPIs to look good in a deck. Every metric reflects what a real person does and what we learn from them. The number that matters shifts with the stage, and product-market fit is the moment we stop pushing the boulder uphill and start chasing it downhill. The Mom Test governs the conversations that feed the top of this funnel.
          </p>
        </div>

        {/* right now */}
        <div className="mt-4 grid gap-3 sm:grid-cols-[1.05fr_1fr]">
          <div className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">Right now · waitlist stage</div>
            <div className="mt-2 text-[17px] font-semibold text-white/90">Are we learning fast enough?</div>
            <p className="mt-2 text-[13px] leading-relaxed text-white/60">
              Pre-launch, the KPI isn&rsquo;t revenue. It&rsquo;s <span className="text-white/85">how many potential users we talk to and what we learn</span> until the need is clear and repeats (thematic saturation).
            </p>
          </div>
          <ul className="space-y-2">
            {["Talk to as many potential users as possible", "Don't over-commit to v1; the product can still change", "Watch for repeated feedback until the need is predictable"].map((x) => (
              <li key={x} className="flex gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5 text-[12.5px] leading-snug text-white/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: C.brand }} />
                {x}
              </li>
            ))}
          </ul>
        </div>

        {/* consumer journey */}
        <div className="mt-10 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">Consumer journey</h2>
          <span className="text-[11px] text-white/35">Free product → paid experiences</span>
        </div>
        <Flowchart j={CONSUMER_J} />
        <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">Stage detail</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONSUMER.map((s) => (
            <StageCard key={s.step} s={s} />
          ))}
        </div>

        {/* b2b journey */}
        <div className="mt-12 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">B2B journey</h2>
          <span className="text-[11px] text-white/35">Consumer proof + white paper open the door</span>
        </div>
        <Flowchart j={B2B_J} />
        <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">Stage detail</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {B2B.map((s) => (
            <StageCard key={s.step} s={s} />
          ))}
        </div>

        {/* inputs -> outcomes */}
        <div className="mt-12 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">Inputs → outcomes</h2>
          <span className="text-[11px] text-white/35">Drive the left, watch the right</span>
        </div>
        <div className="mt-4 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl border p-4" style={{ borderColor: `${C.framework}4d`, background: `${C.framework}12` }}>
            <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.framework }}>Inputs we control</div>
            <ul className="mt-3 space-y-1.5">
              {INPUTS.map((x) => (
                <li key={x} className="flex gap-2 text-[12.5px] text-white/80">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: C.framework }} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center py-1 text-white/30 sm:py-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 rotate-90 sm:rotate-0" aria-hidden>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </div>
          <div className="rounded-2xl border p-4" style={{ borderColor: `${C.brand}4d`, background: `${C.brand}12` }}>
            <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: C.brand }}>Outcomes we watch</div>
            <ul className="mt-3 space-y-1.5">
              {OUTCOMES.map((x) => (
                <li key={x} className="flex gap-2 text-[12.5px] text-white/80">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: C.brand }} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-white/40">Never read gross revenue alone; it can hide a weakening funnel underneath.</p>

        {/* financial status (board deck) */}
        <div className="mt-12 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">Financial status</h2>
          <span className="text-[11px] text-white/35">The seed board-deck grid</span>
        </div>
        <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">The nine numbers investors read. Values fill in post-launch; pre-launch, the point is to start tracking them from day one.</p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {FINANCE.map((f) => (
            <div key={f.k} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">{f.k}</div>
              <div className="mt-1 text-[22px] leading-none text-white/25" style={{ fontFamily: "var(--font-instrument)" }}>&mdash;</div>
              <p className="mt-2 text-[11.5px] leading-snug text-white/50">{f.d}</p>
            </div>
          ))}
        </div>

        {/* watch-outs */}
        <div className="mt-12 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">Watch-outs</div>
        <div className="mt-4 space-y-2">
          {WATCH.map((w) => (
            <div key={w.t} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
              <div className="text-[13px] font-semibold text-white/90">{w.t}</div>
              <p className="mt-1 text-[12.5px] leading-snug text-white/55">{w.d}</p>
            </div>
          ))}
        </div>

        {/* reporting note */}
        <p className="mt-12 text-[12px] leading-relaxed text-white/40">
          North-star: both-partners-complete rate, the activation moment Two Truths is built to create. Day to day we run on the customer journey; the Investor KPIs above are what goes upward. Firm targets get set once we have live funnel data.
        </p>
      </div>
    </main>
  );
}
