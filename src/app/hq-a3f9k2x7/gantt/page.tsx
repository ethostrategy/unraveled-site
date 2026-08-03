import type { Metadata } from "next";
import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import { Marker, shapeForStream } from "../marker";

/**
 * HQ Milestones — the roadmap on a 16-quarter timeline (2026 Q1 → 2029 Q4):
 * curated milestone markers per workstream lane, with an All view + per-year
 * tabs. Quarter positions (`q`) are estimates and get refined as plans firm up.
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

// Today as a fractional quarter index (0 = 2026 Q1 start). Computed per request
// on the server so the "Now" marker moves on its own — no hardcoded date to age.
function currentQ(): number {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth(); // 0-11
  const d = now.getDate();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const months = (y - 2026) * 12 + m;
  const q = months / 3 + (d - 1) / (daysInMonth * 3);
  return Math.min(16, Math.max(0, q));
}

// Roadmap stream name -> Strategy vertical/foundation key, so a y-axis label
// links to its tab (Strategy is organized by vertical, addressed with ?v=).
const STREAM_TAB: Record<string, string> = {
  Framework: "framework",
  Intelligence: "app",
  Operations: "operations",
  "Brand/Media": "brand",
  "B2C Products": "cardgame",
  "B2B Products": "corporate",
  Grants: "operations&item=financial",
};

// Marquee point-in-time moments, flagged with a star above the lanes.

// All-years OVERVIEW (the milestone map): curated key milestones (stars at their
// real quarter) + a work span per lane. `detail:true` items show only on year tabs.
const OVERVIEW: { name: string; color: string; work: [number, number]; yearOnly?: boolean; ms: { t: string; q: number; cont?: boolean; detail?: boolean; desc?: string; gated?: boolean }[] }[] = [
  { name: "Framework", color: "#6f8fd8", work: [1, 13], ms: [
    { t: "Research", q: 1.15, detail: true, desc: "Literature review + framework research grounding the 10-block model (Apr 2026)." },
    { t: "10 blocks finalized", q: 1.48, detail: true, desc: "The 10-block model locked (May 2026), ~a month after the research." },
    { t: "V1 drafted", q: 2.49, desc: "Madhuri drafts V1: the thesis (10 blocks + assessments + product portfolio) written up (finalized ~mid-Aug 2026). Drafted by her, not the intern." },
    { t: "Clinical polish", q: 3.0, detail: true, desc: "A quick clinical read by a physician friend (Harvard MPH, UC Davis OBGYN resident) before the paper goes public; also warms the Dr. Burke intro." },
    { t: "White paper", q: 3.7, desc: "Publish the thesis as a preprint (PsyArXiv/OSF) + on the site (~Dec 2026): a conceptual contribution, no empirical claims yet. Publishing early reserves + timestamps the ideas and becomes the outreach artifact for experts. File copyright here." },
    { t: "Curriculum V1", q: 4.05, desc: "Develop V1 of the block-based curriculum: the actual cohort program (sessions + exercises) built on the 10 blocks. A working draft, NOT the clinically-validated version. Must exist before the beta cohorts (~Q1 2027) can run; the efficacy study later tests whether it works." },
    { t: "Burke + SME review", q: 4.35, desc: "Approach Dr. Nadine Burke (and other SMEs) WITH the published white paper (~early 2027), stronger than a cold ask. Their endorsement lands the credibility; SMEs also review the other assessments (Anchor Styles, Love Dialects). No equity." },
    { t: "Validate Two Truths", q: 5.7, desc: "A psychometrician validates the Two Truths assessment as a measurement instrument (reliability + validity), drawing on the beta cohort data (from the B2C lane, ~Q1 2027) so it is not gated on app scale (~mid 2027)." },
    { t: "Efficacy study", q: 8.5, desc: "The curriculum efficacy study: proof that going through the block-based curriculum moves Two Truths scores, run through the 2027 cohorts (the data engine). Must finish before B2B (~early 2028) because every B2B solution is curriculum-integrated: corporate needs this proof to sell." },
    { t: "Journal submission", q: 9.7, desc: "Submit the empirical writeup to a peer-reviewed journal (~mid 2028) via Berkeley psych connections. Review takes ~6-18 months." },
    { t: "Peer-reviewed publication", q: 12.5, desc: "The framework + efficacy paper published in a journal (~2029): the gold-standard academic credential that unlocks the highest-credibility sell (K-12)." },
  ] },
  { name: "Intelligence", color: "#9a7fe0", work: [2, 13], ms: [
    { t: "Set up Claude API", q: 2.5, desc: "Start as a customer: set up + build on an ethical provider's API (Anthropic / Claude). No formal deal needed; ship first, get startup credits, lock no-train data terms." },
    { t: "App V1 (profiles + assessments)", q: 4.3, desc: "App V1 launches (web + mobile together, ~Feb 2027, timed to the naturally-occurring Valentine's / relationship-content season): Unraveled profiles + Two Truths, plus any other assessments (Anchor Styles, Blueprint, Love Dialects) that clear SME review by launch. Lightweight personalization so the cohort loop starts early; the full algorithm comes with App V2." },
    { t: "App V2 (intelligence)", q: 7.8, desc: "The intelligence layer turns assessment data into each user's living profile + Blueprint / personal algorithm (~late 2027). Built either by the Founding AI Engineer or by Madhuri using AI tools if that proves enough; prototype through '27, then it iterates continuously." },
    { t: "AI partnership", q: 9.5, desc: "OPTIONAL upside, not a build dependency (you build as a customer throughout). A formal co-marketing partnership, distinct from the early startup credits: joint PR + the ethical-AI case study, plus better commercial terms (discounts, higher limits, support). Pursued once V2 + traction give you something to co-market (~mid 2028); follows leverage, could slip later if traction is slow." },
  ] },
  { name: "Operations", color: "#b884d8", work: [0, 12], ms: [
    { t: "FF1 acceptance", q: 0.6, detail: true, desc: "Accepted into Future Founders Phase 1 (Feb 24, 2026)." }, { t: "LLC registered", q: 2.06, desc: "Unraveled LLC formed (July 2, 2026)." }, { t: "Psych advisor", q: 7.5, desc: "A single domain (psych) advisor: the reviewer-turned-advisor (Dr. Nadine Burke = top target), mission-driven, low or no equity. The full strategic board comes in Q3 2028." },{ t: "FF2 acceptance", q: 1.84, detail: true, desc: "Accepted into Future Founders Phase 2 (June 28, 2026)." }, { t: "First grant", q: 5.2, detail: true, desc: "First non-dilutive grant awarded (~Q2 2027), the grants-first strategy's first proof point. Non-dilutive runway for the build. Year-tab only; the individual grant deadlines live in the Grants lane." }, { t: "CEO full-time", q: 6.45, desc: "Madhuri goes full-time as CEO (Aug 2027), alongside the MBA (possibly a dual MBA/MPP, Aug 2027 to May 2030)." }, { t: "Trademark filed", q: 3.2, desc: "File the trademark application (~Q4 2026), after the LLC and before the app launch, to lock an early priority date. Registration follows ~8 to 12 months later on its own." }, { t: "Trademark registered", q: 5.8, desc: "The mark registers ~mid 2027 (~8 to 12 months after filing). Estimate; timing is USPTO-dependent and out of our hands." }, { t: "AI engineer", q: 6.7, gated: true, desc: "Founding AI Engineer (~Q3 2027): hardens App V2's intelligence layer (security, privacy, scale) and owns data security/privacy compliance. Contingent, no longer fully committed: Madhuri may build V2 with AI tools instead and defer this hire, though the engineer is the safer path for hardening + compliance. Funded by the first grant; startup credits offset its own API cost." }, { t: "Exp. design lead", q: 8.2, gated: true, desc: "Experiential Design Lead (~early 2028): builds the AI-integrated experiences (escape rooms) and the tech-integrated learning across corporate, university, and the net-new 2029 K-12 curricula. Pulled early so the tech design exists before the experiences ship. Funding-gated: contractor/part-time until cohort + card-game revenue or a second grant supports full-time." }, { t: "Exp. marketing lead", q: 8.7, gated: true, desc: "Experiential Marketing Lead (~early 2028): owns event planning (the galas), live experiences, and growth channels. Scales the galas + events after the founders run the scrappy first ones in 2027. Funding-gated like the design lead (contractor/part-time until revenue supports); the experiences they build partly self-fund." }, { t: "Advisory board", q: 10.5, desc: "Full strategic advisory board stands up in Q3 2028, ~a year into the MBA once the network is developing and the cap table is clear. Advisory equity offered then." },
  ] },
  { name: "Brand/Media", color: "#e273ac", work: [0, 15], ms: [
    { t: "Rebrand", q: 0.5, desc: "Brand refresh — visual identity + positioning locked (2026 Q1)." }, { t: "Website", q: 1.5, desc: "New marketing / waitlist site live (2026 Q2)." }, { t: "Instagram", q: 2.3 }, { t: "Newsletter", q: 2.6, desc: "Beehiiv newsletter starts alongside social (~Sep 2026) to build an owned email list BEFORE the Dec 5 card launch. Format: (1) explain one relationship block through a pop-culture / reality-TV example; (2) a newsletter-exclusive weekly Rep, a small relationship practice unique to subscribers (NOT the actual card questions, which stay in the deck); (3) behind-the-build BTS. The list you grow now is who you sell the card game to on Dec 5." }, { t: "Podcast + YouTube", q: 4.1, desc: "Podcast + YouTube: filming can't start until late Nov 2026, so the podcast can't power the Dec 5 launch (TikTok + Instagram carry that). First episodes publish ~Jan 2027; podcast clips then become the marketing engine through 2027." }, { t: "TikTok", q: 3.5, desc: "TikTok launches with the card-game campaign (~Nov 2026): the youth channel that drives the Dec 5 Between Us launch and builds grassroots cred (street 'answer this card' videos, launch hype)." }, { t: "Threads + Reddit", q: 6.3 }, { t: "Sports/fitness partnerships", q: 9.8, desc: "Sports + fitness brand partnerships (~mid 2028), a growth-phase play once grassroots cool is established." }, { t: "Merch", q: 7.0, desc: "First 'built, not found' merch drop (~late 2027): simple apparel + goods, not a complex supply chain, a cheap community + revenue moment riding the card-game audience. Bigger co-branded merch scales with the sports/fitness partnerships in 2028." },
  ] },
  { name: "B2C Products", color: "#c768c6", work: [2, 14], ms: [
    { t: "Beta cohorts", q: 4.5, desc: "The first beta cohort groups (Unraveled Paces) run the draft Curriculum V1 (~Q1 2027), human-facilitated early (reading each assessment). They don't need the validated framework: they GENERATE the data that validates it, feeding the Two Truths validation and the curriculum efficacy study. The algorithm scales the personalization from App V2." },
    { t: "Real Talk built", q: 2.7, desc: "The Real Talk deck (Between Us) finalized in Airtable, block by block. Being built now." },
    { t: "Manufacturing + sales", q: 3.25, desc: "Set up manufacturing, shipping, and the sales pipeline for Between Us ahead of the Q4 launch." },
    { t: "Between Us launch", q: 3.71, desc: "Between Us launches with the Real Talk deck on Dec 5, the Unraveled founding day: the first physical product to market and the first consumer revenue, ahead of the app. Whether Sweet Talk + Self Talk ship alongside it or fast-follow is an open decision (Will's Aug 12 rec)." },
    { t: "Dirty Talk (V-Day)", q: 4.2, detail: true, gated: true, desc: "Dirty Talk, the spicy / adult edition, drafted (120 cards, three heat levels). Couples only. Target ~Feb 2027 for Valentine's Day, a fast follow to the Dec 5 launch; timing may still slip." },
    { t: "First paid cohort", q: 6.0, desc: "Unraveled Paces monetizes (~mid 2027) after the beta cohorts prove the format; first recurring cohort revenue." },
    { t: "Expansion packs", q: 6.7, desc: "Additional Between Us packs (~Q3/Q4 2027): new themed editions (intimacy, intellectual exploration), plus the start of the versioned-editions cadence, refreshing a deck's full question set and re-releasing it (OG → 2.0 → 3.0). Retimed to demand, when owners start to get bored, not a fixed calendar. (Sweet Talk + Self Talk launch timing is an open call, alongside the Dec 5 drop or a fast-follow; the spicy V-Day deck is its own drop.)" },
    { t: "First gala", q: 7.2, desc: "First exclusive, secret, invite-only Unraveled gala (~late 2027): a scrappy, self-run buzz moment, DIY before the Experiential Marketing Lead is hired. The lead scales galas from 2028 on." },
    { t: "Escape rooms", q: 11.9, desc: "The Unraveling: an AI-integrated, Glow-&-Go-style gamified escape-room experience (late 2028), designed by the Experiential Design Lead." },
    { t: "Children's books", q: 9.3, desc: "A standalone direct-to-family board-book and picture-book line (~2028): one relationship block per book, ages 0-7, sold direct + Amazon, evolving to a book + plush companion (the proven Slumberkins-style model). Rides the biggest, fastest-growing kids'-book segment (board books + SEL) and owns the white space of teaching RELATIONSHIPS (the 10 blocks), not just feelings. Not gated on the elementary K-12 work." },
    { t: "Multi-city cohorts", q: 11, desc: "Unraveled Paces expand to multiple pilot cities." },
  ] },
  { name: "B2B Products", color: "#f0a0b8", work: [2, 15], ms: [
    { t: "Corporate workshops", q: 9.5, desc: "First paid B2B, but deliberately NOT early: launching corporate before a grassroots youth following exists would make the brand read as 'corporate' and kill its cool on the ground, and a corporate-first product won't land with youth. So corporate waits for grassroots cred AND credibility (the reviewed + validated framework). Chosen as the first B2B (over students) because it is lower-cost to host and lower-liability. Relationship/culture workshops, tech-integrated learning built with the Experiential Design Lead. 2026-2027 stays focused on B2C + the framework." },
    { t: "Conferences", q: 11, desc: "High-school + university conferences, workshops, and competitions (events, not curriculum): the lower-lift institutional entry via the MBA + advisory network. Replaces standalone university pilots per the Strategy tab." },
    { t: "CASEL alignment", q: 11.7, desc: "The K-12 gate. CASEL sets the SEL standards districts buy against (the CASEL 5 competencies, one of which IS 'relationship skills', so Unraveled maps naturally). Two levels: (1) a light mapping of the 10 blocks to the CASEL 5, doable now with the finalized blocks, for immediate SEL credibility; (2) the full CASEL Program Guide designation, which needs the built curriculum + efficacy outcomes + a school-based, all-students, multi-year design, so it lands ~late 2028 and gates the K-12 rollout." },
    { t: "K-12: high school", q: 12.5, desc: "K-12 curriculum rollout starts with high school: SEL / emotional education, plus healthy-relationships + consent via health/PE (not a full sex-ed program). Sold oldest-to-youngest. Requires CASEL alignment first." },
    { t: "K-12: middle school", q: 13.5, desc: "Middle-school curriculum (grades 6-8), customized for the age band." },
    { t: "K-12: elementary", q: 14.5, desc: "Elementary (K-5) last: hardest to develop and child-safety gated. Prove and polish with adults first, the responsible answer if investors ask. Offered grant-funded (underserved) and paid (districts)." },
  ] },
  // Grants lane: eligible, non-dilutive grants placed at their deadlines. Year
  // tabs only (yearOnly hides it on the All view). Rolling grants (Amber, Freed,
  // Hello Alice, IFundWomen, AAPISTRONG) are continuous, so they aren't point-
  // plotted here. Deadlines refreshed Aug 2026 via web research; where a 2027
  // cycle isn't announced yet, the date is estimated from the just-closed 2026 one.
  { name: "Grants", color: "#7d5bd4", work: [2, 6.6], yearOnly: true, ms: [
    { t: "UNESCO", q: 2.2, detail: true, desc: "UNESCO Youth for Peace: deadline Jul 19 2026 (not applied, missed this cycle). Strongest thematic fit, Human Connection in the Age of AI. $10k + mentorship. Target the next cycle." },
    { t: "Social Shifters", q: 2.7, detail: true, desc: "Social Shifters Global Innovation Challenge: closes Aug 31 2026. Founder under 30, eligible. $1k to $15k." },
    { t: "Milken-Penn", q: 4.35, detail: true, desc: "Milken-Penn GSE Education Business Plan Competition (18th annual): opens ~late 2026, deadline ~mid-Feb 2027 (2026 closed Feb 11, via the Catapult accelerator). $40k prize. Ties to the education-ladder narrative." },
    { t: "Camelback", q: 4.6, detail: true, desc: "Camelback Fellowship (Cohort 17): reopens summer 2026, deadline ~early March 2027 (2026 closed Mar 2). ~$40k to $50k + coaching. Strongest thematic + demographic match." },
    { t: "Echoing Green", q: 4.85, detail: true, desc: "Echoing Green Fellowship: applications open now, deadline Mar 1 2027 (2pm ET). $100k stipend over 18 months. Strong impact fit." },
    { t: "MassChallenge", q: 5.1, detail: true, desc: "MassChallenge: equity-free accelerator. US early-stage window ~early 2027 (Switzerland 2026 ran Jan to Mar). Fits the non-dilutive plan; confirm the US dates." },
    { t: "Google BFF", q: 5.35, detail: true, desc: "Google for Startups Black Founders Fund: US applications opened Mar 2026; next cohort window ~2027. Eligible via Will (Black co-founder). Up to $150k equity-free, best after beta traction." },
    { t: "WFN Fast Pitch", q: 5.6, detail: true, desc: "Women Founders Network Fast Pitch: 2026 apps closed May 31 (event Oct 21). Next window ~April to May 2027. $55k + coaching, women-led. May favor some traction." },
    { t: "TiE Women", q: 5.9, detail: true, desc: "TiE Women Global Pitch: 2026 apps closed June; next cycle ~March to June 2027. Up to $50k equity-free. Needs a validated offering, not idea-stage." },
    { t: "Black Ambition", q: 6.6, detail: true, gated: true, desc: "PAUSED for 2026: Black Ambition shifted to a 'Deeper Bet' backing existing portfolio founders, with no new-applicant Prize round. Was a marquee non-dilutive target ($15k to $1M); monitor for a future cycle." },
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
  const NOW_Q = currentQ();
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
          Milestones
        </h1>

        {/* section nav */}
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Milestones</span>
          <Link href="/hq-a3f9k2x7/strategy" className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Strategy</Link>
          <Link href="/hq-a3f9k2x7/board" className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Tasks</Link>
          <Link href="/hq-a3f9k2x7/kpis" className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">KPIs</Link>
          <Link href="/hq-a3f9k2x7/marketing" className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Marketing</Link>
        </div>

        {/* year tabs */}
        <div className="mt-4 flex flex-wrap gap-1.5 text-[12px]">
          <Link href="/hq-a3f9k2x7/gantt" className={`rounded-md px-2.5 py-1 ${!single ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}>All</Link>
          {YEARS.map((y) => (
            <Link key={y.year} href={`/hq-a3f9k2x7/gantt?view=${y.year}`} className={`rounded-md px-2.5 py-1 ${view === y.year ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}>
              {y.year}
            </Link>
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
                  <div className="absolute z-10 flex flex-col items-center" style={{ left: `${nowLeft}%`, top: -13, transform: "translateX(-50%)" }}>
                    <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-wide text-[#f6b0d3]">Now</span>
                  </div>
                )}
              </div>

              {OVERVIEW.filter((lane) => single || !lane.yearOnly).map((lane) => {
                const vis = lane.ms
                  .filter((m) => m.q >= qOffset && m.q <= qOffset + totalQ && (single || !m.detail))
                  .sort((a, b) => a.q - b.q);
                return (
                  <div key={lane.name} className="grid border-b border-white/[0.06] last:border-0" style={{ gridTemplateColumns: "104px 1fr" }}>
                    <Link href={`/hq-a3f9k2x7/strategy?v=${STREAM_TAB[lane.name] ?? ""}`} title={`Open ${lane.name} strategy`} className="flex items-center pr-3 text-[13px] font-bold leading-tight transition hover:underline" style={{ color: lane.color }}>{lane.name}</Link>
                    <div className="relative h-[68px]">
                      {vis.map((m, i) => (
                        <div
                          key={m.t}
                          className="absolute flex cursor-help flex-col items-center"
                          style={{ top: 6, left: `${((m.q - qOffset) / totalQ) * 100}%`, transform: "translateX(-50%)" }}
                          title={m.desc ? `${m.t} — ${m.desc}` : m.t}
                        >
                          <Marker color={lane.color} shape={shapeForStream(lane.name)} gated={m.gated} />
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

        {/* key: hollow marker = capital-gated */}
        <p className="mt-6 flex items-center gap-1.5 text-[11px] text-white/35">
          <svg width={11} height={11} viewBox="0 0 10 10" aria-hidden>
            <rect x={1.3} y={1.3} width={7.4} height={7.4} rx={1.4} fill="none" stroke="#b884d8" strokeWidth={1.4} />
          </svg>
          hollow marker = capital-gated (contract-to-hire, starts when funding supports it)
        </p>

        {/* legend for abbreviated labels — only on year tabs, where FF1/FF2 show */}
        {single && (
          <p className="mt-2 text-[11px] text-white/35">
            <span className="font-semibold text-white/55">FF1</span> Future Founders Phase 1
            <span className="mx-2 text-white/20">·</span>
            <span className="font-semibold text-white/55">FF2</span> Future Founders Phase 2
          </p>
        )}

      </div>
    </main>
  );
}
