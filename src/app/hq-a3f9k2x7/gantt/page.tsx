import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";
import { Marker, shapeForStream } from "../marker";

/**
 * HQ Roadmap — Timeline (Gantt) view. Alternative to the swimlane at
 * /hq-a3f9k2x7. Same workstreams + initiatives, but placed on a 16-quarter
 * timeline (2026 Q1 → 2029 Q4) as bars.
 *
 * TIMING IS A DRAFT: each initiative's start quarter `s` (0-15) and length `l`
 * (in quarters) are first-pass guesses to be refined. Milestones can later be
 * length-1 bars or diamond markers.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

const YEARS = [
  { year: "2026", obj: "BUILD", current: true },
  { year: "2027", obj: "LAUNCH", current: false },
  { year: "2028", obj: "EXPAND", current: false },
  { year: "2029", obj: "SCALE", current: false },
];

// s = start quarter (0 = 2026 Q1 … 15 = 2029 Q4), l = length in quarters
type Milestone = { t: string; s: number; l: number };
type Lane = { name: string; color: string; milestones: Milestone[] };
// Detailed per-item dates, kept for reference (roadmap renders OVERVIEW milestone stars).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LANES: Lane[] = [
  { name: "Framework", color: "#6f8fd8", milestones: [
    { t: "Framework V1 (block defs + dual-perspective assessments)", s: 2, l: 1 },
    { t: "AI partnership (ethical provider)", s: 2, l: 2 },
    { t: "Build app V1 (Two Truths + profiles)", s: 2, l: 4 },
    { t: "Block curriculum (intern + SME)", s: 2, l: 3 },
    { t: "Psychometric / SME review", s: 3, l: 1 },
    { t: "Prototype (testing)", s: 3, l: 1 },
    { t: "Framework V2 (SME-reviewed, launch-ready)", s: 5, l: 1 },
    { t: "Build app V2, then continuous iteration", s: 6, l: 10 },
    { t: "Framework V3 (data-informed)", s: 8, l: 3 },
  ] },
  { name: "Operations", color: "#b884d8", milestones: [
    { t: "Future Founders Ph.1 (demo day)", s: 0, l: 2 },
    { t: "Future Founders Ph.2", s: 2, l: 2 },
    { t: "Form LLC", s: 2, l: 1 },
    { t: "Operating agreement + equity split", s: 2, l: 1 },
    { t: "File trademark", s: 2, l: 1 },
    { t: "Trademark registered", s: 7, l: 2 },
    { t: "Register copyrights", s: 3, l: 2 },
    { t: "Grant funding (non-dilutive)", s: 2, l: 10 },
    { t: "Summer intern", s: 2, l: 1 },
    { t: "Madhuri full-time (+ MBA)", s: 6, l: 1 },
    { t: "First core hires (AI eng, education, marketing)", s: 11, l: 2 },
    { t: "Evaluate patents (if warranted)", s: 8, l: 2 },
  ] },
  { name: "Brand/Media", color: "#e273ac", milestones: [
    { t: "Instagram", s: 2, l: 3 },
    { t: "LinkedIn (academia/investors)", s: 3, l: 3 },
    { t: "TikTok", s: 4, l: 3 },
    { t: "Newsletter (Beehiiv)", s: 3, l: 3 },
    { t: "Film podcast (Dallas, w/ Will)", s: 3, l: 1 },
    { t: "Podcast + YouTube", s: 4, l: 3 },
    { t: "Threads, Reddit", s: 6, l: 2 },
    { t: "Sports/fitness partnerships", s: 12, l: 4 },
  ] },
  { name: "B2C Products", color: "#9a7fe0", milestones: [
    { t: "Card game MVP (for podcast)", s: 3, l: 1 },
    { t: "Card game presales", s: 4, l: 1 },
    { t: "Card game launch (7 packs)", s: 5, l: 1 },
    { t: "Deluxe block packs (e.g. Safety, Trust)", s: 6, l: 2 },
    { t: "Children's books (direct-to-family)", s: 8, l: 3 },
    { t: "Journals", s: 10, l: 4 },
    { t: "Test cohort matching", s: 2, l: 2 },
    { t: "Campus cohort testing", s: 2, l: 2 },
    { t: "First cohorts (pilot cities)", s: 4, l: 2 },
    { t: "Secret galas", s: 6, l: 1 },
    { t: "Test app-assisted facilitation", s: 8, l: 2 },
    { t: "Intelligence-driven matching (early)", s: 8, l: 4 },
    { t: "Multi-city cohorts", s: 8, l: 4 },
    { t: "App-facilitated cohorts at scale", s: 9, l: 3 },
  ] },
  { name: "B2B Products", color: "#f0a0b8", milestones: [
    { t: "Advisory board (faculty + clinical)", s: 2, l: 2 },
    { t: "K-12 curriculum build (emo-ed via health/PE)", s: 8, l: 4 },
    { t: "Corporate culture workshops", s: 9, l: 3 },
    { t: "University pilots", s: 10, l: 2 },
    { t: "University + HS partnerships", s: 11, l: 3 },
    { t: "HS/college conferences + competitions", s: 11, l: 3 },
    { t: "High school pilots", s: 12, l: 2 },
    { t: "License the framework", s: 12, l: 4 },
    { t: "B2B platform build", s: 12, l: 3 },
    { t: "Middle school pilots", s: 13, l: 2 },
    { t: "Elementary pilots (K-5)", s: 14, l: 2 },
    { t: "School-district contracts", s: 15, l: 1 },
    { t: "B2B SaaS subscriptions", s: 15, l: 1 },
  ] },
];

const NOW_Q = 2.15; // ~ early Q3 2026 (today), as a quarter index (0 = 2026 Q1)

// Roadmap stream name -> Strategy pillar key, so a y-axis label links to its tab.
const STREAM_TAB: Record<string, string> = {
  Framework: "framework",
  Intelligence: "intelligence",
  Operations: "operations",
  "Brand/Media": "brand",
  "B2C Products": "product",
  "B2B Products": "b2b",
};

// Marquee point-in-time moments, flagged with a star above the lanes.

// All-years OVERVIEW (the milestone map): curated key milestones (stars at their
// real quarter) + a work span per lane. Year tabs use the detailed bars in LANES.
const OVERVIEW: { name: string; color: string; work: [number, number]; ms: { t: string; q: number; cont?: boolean; detail?: boolean; desc?: string }[] }[] = [
  { name: "Framework", color: "#6f8fd8", work: [1, 13], ms: [
    { t: "Research", q: 1.15, detail: true, desc: "Literature review + framework research grounding the 10-block model (Apr 2026)." },
    { t: "10 blocks finalized", q: 1.48, detail: true, desc: "The 10-block model locked (May 2026), ~a month after the research." },
    { t: "Clinical pre-review", q: 2.2, detail: true, desc: "Preliminary review of the working draft by a physician with a Harvard MPH (UC Davis OBGYN resident); feedback folded into V1 before Dr. Burke's formal review." },
    { t: "V1 drafted", q: 2.49, desc: "Founders + intern draft the 10-block model and its assessments as the framework's first white-paper draft over the summer internship; finalized Aug 15, 2026." },
    { t: "Dr. Burke secured", q: 3.0, detail: true, desc: "Land Dr. Nadine Burke as the reviewer via a warm UC Davis intro (the OBGYN-resident friend to her faculty). Reviewer-first on-ramp, no equity." },
    { t: "Reviewed by Dr. Burke", q: 3.5, desc: "Dr. Nadine Burke reviews the framework AND the assessments; whatever assessments clear here set App V1's scope. Reviewer-first on-ramp, no equity, reached via the Berkeley / UC network. Feeds the white paper." },
    { t: "White paper (V2) published", q: 5.5, desc: "Publish the reviewer-revised framework as a citable preprint (PsyArXiv/OSF) + on the site. Framework V2 is the published white paper." },
    { t: "Journal submission", q: 7.5, desc: "Submit the framework to a peer-reviewed journal via Berkeley psych connections (undergrad network) — not the MBA (business, wrong domain). Reviewers can co-author the later validation studies. Review takes ~6-18 months." },
    { t: "Validation study", q: 10, desc: "First empirical study on real, consented app data (block independence, longitudinal) — the source of genuine psychometric credibility. Feeds V3." },
    { t: "V3 (data-informed)", q: 11.5, desc: "Revise the framework from validation data + reviewer critique; versioned explicitly." },
    { t: "Peer-reviewed publication", q: 13, desc: "The framework paper published in a journal — the academic-credibility milestone." },
  ] },
  { name: "Intelligence", color: "#9a7fe0", work: [2, 13], ms: [
    { t: "Set up Claude API", q: 2.5, desc: "Start as a customer: set up + build on an ethical provider's API (Anthropic / Claude). No formal deal needed; ship first, get startup credits, lock no-train data terms." },
    { t: "App V1 (profiles + assessments)", q: 4.3, desc: "App V1 launches (web + mobile together): Unraveled profiles + Two Truths, plus any other assessments (Anchors, Blueprint, Love Dialects, Reps, The Lab) that clear SME review by launch." },
    { t: "App V2 (intelligence)", q: 7.8, desc: "The intelligence layer turns assessment data into each user's living profile + Blueprint / personal algorithm (~late 2027); any assessments not reviewed by V1 roll in as they clear. You prototype through '27; the Founding AI Engineer hardens it, then it iterates continuously." },
    { t: "AI partnership", q: 9.5, desc: "Formal partnership / co-marketing once there's traction — pitch Unraveled as an ethical-AI case study (~mid 2028). The deal follows users + cohort data, not the other way around." },
  ] },
  { name: "Operations", color: "#b884d8", work: [0, 12], ms: [
    { t: "FF1 acceptance", q: 0.6, detail: true, desc: "Accepted into Future Founders Phase 1 (Feb 24, 2026)." }, { t: "LLC registered", q: 2.06, desc: "Unraveled LLC formed (July 2, 2026)." }, { t: "Psych advisor", q: 7.5, desc: "A single domain (psych) advisor: the reviewer-turned-advisor (Dr. Nadine Burke = top target), mission-driven, low or no equity. The full strategic board comes in 2029." },{ t: "Hire summer intern", q: 1.95, detail: true, desc: "Summer intern hired (June 29, 2026)." }, { t: "FF2 acceptance", q: 1.84, detail: true, desc: "Accepted into Future Founders Phase 2 (June 28, 2026)." }, { t: "First grant", q: 5.2, desc: "First non-dilutive grant awarded (~Q2 2027), the grants-first strategy's first proof point. Non-dilutive runway for the build." }, { t: "CEO full-time", q: 6.45, desc: "Madhuri goes full-time as CEO (Aug 2027), alongside the MBA (possibly a dual MBA/MPP, Aug 2027 to May 2030)." }, { t: "Trademark filed", q: 3.2, desc: "File the trademark application (~Q4 2026), after the LLC and before the app launch, to lock an early priority date. Registration follows ~8 to 12 months later on its own." }, { t: "Trademark registered", q: 5.8, desc: "The mark registers ~mid 2027 (~8 to 12 months after filing). Estimate; timing is USPTO-dependent and out of our hands." }, { t: "AI engineer", q: 6.7, desc: "Founding AI Engineer (~Q3 2027), first hire — hardens App V2's intelligence layer (security, privacy, scale) and owns data security/privacy compliance." }, { t: "Exp. design lead", q: 8.2, desc: "Experiential Design Lead (~early 2028): builds the AI-integrated experiences (escape rooms) and the tech-integrated learning across corporate, university, and the net-new 2029 K-12 curricula. Pulled early so the tech design exists before the experiences ship." }, { t: "Exp. marketing lead", q: 8.7, desc: "Experiential Marketing Lead (~early 2028): owns event planning (the galas), live experiences, and growth channels. Pulled early so gala planning has real lead time." }, { t: "Advisory board", q: 13.5, desc: "Full strategic advisory board stands up in 2029, once the MBA/MPP network is mature and the cap table is clear. Advisory equity offered then." },
  ] },
  { name: "Brand/Media", color: "#e273ac", work: [0, 15], ms: [
    { t: "Rebrand", q: 0.5, desc: "Brand refresh — visual identity + positioning locked (2026 Q1)." }, { t: "Website", q: 1.5, desc: "New marketing / waitlist site live (2026 Q2)." }, { t: "Instagram", q: 2.3 }, { t: "Newsletter", q: 3.75, desc: "Beehiiv newsletter launches on Unraveled's annual founding day (Dec 9, 2026); the owned-audience channel." }, { t: "Podcast + YouTube", q: 4.45, desc: "Podcast + YouTube launch (Feb 2027); podcast clips are the marketing engine. Moved from Jan to thin the H1 '27 crunch." }, { t: "TikTok", q: 4.95 }, { t: "Threads + Reddit", q: 6.3 }, { t: "Sports/fitness partnerships", q: 9.8, desc: "Sports + fitness brand partnerships (~mid 2028), a growth-phase play once grassroots cool is established." },
  ] },
  { name: "B2C Products", color: "#c768c6", work: [2, 14], ms: [
    { t: "Beta cohorts", q: 4.5, desc: "Test the framework with beta cohort groups (Unraveled Paces) once the SME review is incorporated (~Q1 2027, when it's ready enough to test); their results help shape the V2 white paper." },
    { t: "Card game MVP", q: 3.5, desc: "Playable prototype of Between Us (the card game), ready the quarter before the podcast so it can be played live." },
    { t: "First paid cohort", q: 6.0, desc: "Unraveled Paces monetizes (~mid 2027) after the beta cohorts prove the format. First recurring consumer revenue." },
    { t: "Card game", q: 6.5, desc: "Between Us, the 7-pack card game (1 standard + 6 sibling-inspired packs, incl. deluxe per-block packs), ships ~Aug 2027 after presales, once you're full-time to support the launch. Moved out of the H1 '27 crunch." },
    { t: "Secret galas", q: 10.0, desc: "First exclusive, secret, invite-only Unraveled gala (mid 2028), run by the Experiential Marketing Lead. A buzzy brand moment." },
    { t: "Escape rooms", q: 11.9, desc: "The Unraveling: an AI-integrated, Glow-&-Go-style gamified escape-room experience (late 2028), designed by the Experiential Design Lead." },
    { t: "Children's books", q: 14.7, desc: "Direct-to-family books for young kids, arriving right after the elementary push (2029)." },
    { t: "Multi-city cohorts", q: 11, desc: "Unraveled Paces expand to multiple pilot cities." },
  ] },
  { name: "B2B Products", color: "#f0a0b8", work: [2, 15], ms: [
    { t: "Corporate workshops", q: 9.5, desc: "First paid B2B: relationship/culture workshops for companies, once grassroots cool is established. Tech-integrated learning built with the Experiential Design Lead (hired early '28 for exactly this)." },
    { t: "University", q: 11, desc: "University pilots + partnerships, the easiest institutional entry via the MBA + advisory network. Tech-integrated learning like the rest, built with the Design Lead." },
    { t: "High school", q: 12.5, desc: "High-school programs via the health/PE emo-ed curriculum." },
    { t: "Middle school", q: 13.5, desc: "Middle-school programs." },
    { t: "Elementary", q: 14.5, desc: "Last, because young-kid curriculum is the hardest to develop (most developmental adaptation) — and the responsible answer if investors ask: prove and polish the product with adults before bringing it to children. When it lands, offered both grant-funded (underserved) and paid (districts)." },
  ] },
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

export default async function HQGantt({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const yi = YEARS.findIndex((y) => y.year === view);
  const single = yi >= 0;
  const totalQ = single ? 4 : 16; // quarter columns shown
  const qOffset = single ? yi * 4 : 0; // first visible quarter index
  const nowInView = NOW_Q >= qOffset && NOW_Q <= qOffset + totalQ;
  const nowLeft = ((NOW_Q - qOffset) / totalQ) * 100;

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
          Roadmap
        </h1>

        {/* section nav */}
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Milestones</span>
          <a href="/hq-a3f9k2x7/strategy" className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Strategy</a>
          <a href="/hq-a3f9k2x7/board" className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Board</a>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Docs · soon</span>
        </div>

        {/* year tabs */}
        <div className="mt-4 flex flex-wrap gap-1.5 text-[12px]">
          <a href="/hq-a3f9k2x7/gantt" className={`rounded-md px-2.5 py-1 ${!single ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}>All</a>
          {YEARS.map((y) => (
            <a key={y.year} href={`/hq-a3f9k2x7/gantt?view=${y.year}`} className={`rounded-md px-2.5 py-1 ${view === y.year ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}>
              {y.year}
            </a>
          ))}
        </div>

        {/* timeline */}
        <div className="mt-8 overflow-x-auto pb-4">
          <div className={single ? "min-w-[640px]" : "min-w-[1000px]"}>
            {/* year / quarter header (offset right by the lane-name column) */}
            <div className="grid" style={{ gridTemplateColumns: "104px 1fr" }}>
              <div />
              <div>
                {single ? (
                  <div>
                    <div className="flex items-baseline gap-2 px-1">
                      <span className="text-[26px] font-semibold leading-none" style={{ fontFamily: "var(--font-instrument)" }}>{YEARS[yi].year}</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">{YEARS[yi].obj}</span>
                    </div>
                    <div className="mt-2 grid text-[11px] text-white/40" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                      <span className="border-l border-white/10 px-2">Q1</span>
                      <span className="border-l border-white/10 px-2">Q2</span>
                      <span className="border-l border-white/10 px-2">Q3</span>
                      <span className="border-l border-white/10 px-2">Q4</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                    {YEARS.map((y) => (
                      <div key={y.year} className="border-l border-white/10 px-3 pb-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[22px] font-semibold leading-none" style={{ fontFamily: "var(--font-instrument)" }}>{y.year}</span>
                          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">{y.obj}</span>
                        </div>
                        <div className="mt-1.5 grid grid-cols-4 text-[10px] text-white/35">
                          <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* streams: fixed name column + milestone track; rules/now-line overlaid on the track area */}
            <div className="relative mt-3">
              <div className="pointer-events-none absolute inset-y-0 z-0" style={{ left: 104, right: 0 }}>
                {[25, 50, 75].map((pct) => (
                  <div key={pct} className="absolute inset-y-0 w-px bg-white/[0.08]" style={{ left: `${pct}%` }} />
                ))}
                {nowInView && (
                  <div className="absolute inset-y-0 z-10 w-px bg-[#e273ac]/70" style={{ left: `${nowLeft}%` }}>
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-wide text-[#f6b0d3]">Now</span>
                  </div>
                )}
              </div>

              {OVERVIEW.map((lane) => {
                const vis = lane.ms
                  .filter((m) => m.q >= qOffset && m.q <= qOffset + totalQ && (single || !m.detail))
                  .sort((a, b) => a.q - b.q);
                return (
                  <div key={lane.name} className="grid border-b border-white/[0.06] last:border-0" style={{ gridTemplateColumns: "104px 1fr" }}>
                    <a href={`/hq-a3f9k2x7/strategy?pillar=${STREAM_TAB[lane.name] ?? ""}`} title={`Open ${lane.name} strategy`} className="flex items-center pr-3 text-[13px] font-bold leading-tight transition hover:underline" style={{ color: lane.color }}>{lane.name}</a>
                    <div className="relative h-[68px]">
                      {vis.map((m, i) => (
                        <div
                          key={m.t}
                          className="absolute flex cursor-help flex-col items-center"
                          style={{ top: 6, left: `${((m.q - qOffset) / totalQ) * 100}%`, transform: "translateX(-50%)" }}
                          title={m.desc ? `${m.t} — ${m.desc}` : m.t}
                        >
                          <Marker color={lane.color} shape={shapeForStream(lane.name)} />
                          <span className="w-px bg-white/15" style={{ height: [5, 18, 31][i % 3] }} />
                          <span className="whitespace-nowrap text-[9px] leading-none text-white/75">{m.t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* legend for abbreviated labels — only on year tabs, where FF1/FF2 show */}
        {single && (
          <p className="mt-6 text-[11px] text-white/35">
            <span className="font-semibold text-white/55">FF1</span> Future Founders Phase 1
            <span className="mx-2 text-white/20">·</span>
            <span className="font-semibold text-white/55">FF2</span> Future Founders Phase 2
          </p>
        )}

      </div>
    </main>
  );
}
