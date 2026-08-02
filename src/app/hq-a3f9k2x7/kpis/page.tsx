import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";

/**
 * HQ KPIs — the metrics spine, built from the Future Founders method:
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

// What we report upward — investor-facing, distinct from the day-to-day.
const INVESTOR: { k: string; d: string }[] = [
  { k: "Runway", d: "Months of cash left. The survival metric; know it cold." },
  { k: "ARR / recurring", d: "Recurring revenue from cohorts, packs, and subscriptions." },
  { k: "Top-line revenue", d: "Total across card game, experiences, and B2B." },
  { k: "Acquisition volume", d: "New users and buyers per period." },
  { k: "Conversion rates", d: "Funnel health at each step, the truth under the top line." },
];

// Lessons from the session, translated to Unraveled.
const WATCH: { t: string; d: string }[] = [
  { t: "Second-demo beats first-demo enthusiasm", d: "The deeper funnel step predicts more than top-of-funnel excitement. For us: both-partners-complete beats raw signups." },
  { t: "Gross revenue can lie", d: "Rising contract values once masked a collapsing pipeline. Always read the conversion funnel underneath the top line." },
  { t: "Runway is survival", d: "One startup hit 3 days of payroll left. Know the cash position at all times." },
  { t: "Depth of engagement signals value", d: "Users lingering after a virtual event proved its worth. Our version: time to first compare, repeat assessments, weekly Reps." },
];

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
          Roadmap
        </h1>

        {/* section nav */}
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <a href={`${HQ}/gantt`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Milestones</a>
          <a href={`${HQ}/strategy`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Strategy</a>
          <a href={`${HQ}/board`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Tasks</a>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">KPIs</span>
          <a href={`${HQ}/marketing`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Marketing</a>
        </div>

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
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONSUMER.map((s) => (
            <StageCard key={s.step} s={s} />
          ))}
        </div>

        {/* b2b journey */}
        <div className="mt-12 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">B2B journey</h2>
          <span className="text-[11px] text-white/35">Consumer proof + white paper open the door</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* investor kpis */}
        <div className="mt-12 flex items-baseline justify-between">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">Investor KPIs</h2>
          <span className="text-[11px] text-white/35">What we report upward</span>
        </div>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {INVESTOR.map((r) => (
            <div key={r.k} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
              <div className="text-[13px] font-semibold text-white/90">{r.k}</div>
              <p className="mt-1 text-[12px] leading-snug text-white/55">{r.d}</p>
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
