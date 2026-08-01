import type { Metadata } from "next";
import type { ReactNode } from "react";
import Backdrop from "@/components/Backdrop";
import { Marker, shapeForStream } from "../marker";

/**
 * HQ Strategy — organized by VERTICAL, not by function. Top split is B2C / B2B
 * / Foundation; each product line (app, card game, experiences; K-12,
 * conferences, corporate) carries its own Positioning → Marketing funnel →
 * Monetization. Foundation (Framework, Brand, Operations) is the shared layer
 * every vertical draws on. The Roadmap (/gantt) says when; this says why + how.
 * Copy is a working draft.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

const HQ = "/hq-a3f9k2x7";

/* ────────────────────────────  Verticals (B2C / B2B)  ──────────────────────── */

type Stage = { name: string; tactics: string[] };
type Vertical = {
  key: string;
  group: "b2c" | "b2b";
  name: string;
  eyebrow: string;
  color: string;
  principle: string;
  positioning: { what: string; who: string; why: string };
  funnel: Stage[]; // Awareness → Consideration → Conversion → Retention
  monetization: string[];
  build?: { name: string; desc: string }[]; // optional product structure ("the decks" / how it's built)
  link?: { label: string; href: string }; // optional external link (e.g. the content in Airtable)
  notes?: { label: string; body: string }[]; // extra strategy notes (safety, open decisions, etc.)
};

const VERTICALS: Vertical[] = [
  {
    key: "app",
    group: "b2c",
    name: "The App",
    eyebrow: "B2C · THE APP",
    color: "#9a7fe0",
    principle: "The framework, made intelligent.",
    positioning: {
      what: "Unraveled profiles, the assessments (Two Truths, Anchor Styles, Blueprint, Love Dialects), and the Reps + Lab practice tabs. Free.",
      who: "18–30, relationship-curious. The free front door to everything.",
      why: "A free funnel that feeds the paid experiences; the data makes every product smarter.",
    },
    funnel: [
      { name: "Awareness", tactics: ["Podcast clips", "IG / TikTok", "SEO", "Content"] },
      { name: "Consideration", tactics: ["App store page", "Two Truths preview", "Testimonials"] },
      { name: "Conversion", tactics: ["Free signup", "No paywall"] },
      { name: "Retention", tactics: ["Weekly Reps", "Community"] },
    ],
    monetization: [
      "Free, always — the funnel, never ads or data",
      "Monetizes indirectly: routes users to paid experiences + packs",
      "Premium features later only if they truly add value",
      "Zero-retention, no-train data terms — trust is the asset",
    ],
  },
  {
    key: "cardgame",
    group: "b2c",
    name: "Card game & goods",
    eyebrow: "B2C · CARD GAME & GOODS",
    color: "#e273ac",
    principle: "The framework, in your hands.",
    positioning: {
      what: "Between Us: the card game. Three decks: Real Talk (intense, block-based), Sweet Talk (light), and Self Talk (solo).",
      who: "18–30 first: friends, couples, families. Built to gift and to film.",
      why: "The model made tangible and shareable; podcast clips do the selling.",
    },
    funnel: [
      { name: "Awareness", tactics: ["Podcast clips", "Street videos", "IG / TikTok", "Influencer unboxings"] },
      { name: "Consideration", tactics: ["Product page + reviews", "Deck preview", "UGC playing"] },
      { name: "Conversion", tactics: ["Presale", "Gift bundles", "Referral (new buyer)"] },
      { name: "Retention", tactics: ["Collect the decks", "Referral (advocacy)"] },
    ],
    monetization: [
      "Real Talk deck $25–35; Sweet Talk + Self Talk as add-ons",
      "Presale / Kickstarter de-risks the first print run",
      "Bundle all three decks; Sweet Talk is the standalone light/fun deck",
      "LTV via new decks + refills, never ads or data",
    ],
    build: [
      { name: "Real Talk", desc: "the deck. 10 blocks × 4 tiers (Foundation → Peak) × difficulty, plus challenge cards." },
      { name: "Sweet Talk", desc: "a separate, light fun deck with its own content, not tied to the blocks. The lighthearted counterpart to Real Talk." },
      { name: "Self Talk", desc: "the solo deck (Self is pulled out of the Universal deck so it plays alone)." },
    ],
    link: { label: "The cards in Airtable", href: "https://airtable.com/appTiI05Rd5WMQQgg/tbl9GFd4bDdCZkzBF/viwBoZv6v7OkYv31v?blocks=hide" },
    notes: [
      { label: "Safety by design", body: "A consensual game with a rules card: pass any card, stop anytime, what's said here stays here. Don't play with anyone you don't feel safe with. Plays solo (Self Talk) for safe self-awareness." },
      { label: "How it plays", body: "Goal is to get closer, not to win. Built for two people in an existing relationship, not an icebreaker. Switch to the Sweet Talk fun deck when you want lighter play. Several rules still open (climb the tiers vs free-pick, dare pile, group play)." },
      { label: "Open decision · fun-pack model", body: "Undecided between a separate Sweet Talk pack (buy both) and one pack holding both intense and fun cards to switch by comfort. Decide before print." },
    ],
  },
  {
    key: "experiences",
    group: "b2c",
    name: "Experiences",
    eyebrow: "B2C · EXPERIENCES",
    color: "#c768c6",
    principle: "The framework, lived out loud.",
    positioning: {
      what: "Unraveled Paces cohorts, secret galas, and The Unraveling — paid, in person.",
      who: "Engaged users ready to go deeper; the aspirational tier.",
      why: "The stories and status that build the brand; cohorts train the intelligence.",
    },
    funnel: [
      { name: "Awareness", tactics: ["Cohort stories", "Gala buzz", "UGC recaps", "Referrals"] },
      { name: "Consideration", tactics: ["Waitlist", "Testimonials", "Preview events"] },
      { name: "Conversion", tactics: ["Cohort signup", "Limited seats"] },
      { name: "Retention", tactics: ["Alumni community", "The Lab"] },
    ],
    monetization: [
      "Ticket / seat price per cohort (recurring)",
      "Galas + escape rooms: premium ticketed",
      "Facilitator-led early; app-facilitated scales margin",
      "Highest-margin, brand-building line",
    ],
  },
  {
    key: "k12",
    group: "b2b",
    name: "K-12 curriculum",
    eyebrow: "B2B · K-12 CURRICULUM",
    color: "#f0a0b8",
    principle: "Emotional education, built for every age.",
    positioning: {
      what: "Emo-ed & sex-ed curriculum for schools, customized K-5 / 6-8 / 9-12.",
      who: "School districts. Sold older-to-younger; K-5 last (hardest, child-safety gated).",
      why: "The validated framework as tech-integrated learning; grant- and district-funded.",
    },
    funnel: [
      { name: "Awareness", tactics: ["White paper + Dr. Burke", "Conferences", "District networks"] },
      { name: "Consideration", tactics: ["Pilot proposals", "Case studies", "Demos"] },
      { name: "Conversion", tactics: ["Pilot → contract", "Grant-funded seats"] },
      { name: "Retention", tactics: ["Renewals", "Grade expansion"] },
    ],
    monetization: [
      "Per-district / per-seat licensing",
      "Grant-funded for underserved; paid for districts",
      "Age bands (K-5 → 12) expand the contract",
      "Gated on full validation + child-safety compliance",
    ],
  },
  {
    key: "conferences",
    group: "b2b",
    name: "Conferences",
    eyebrow: "B2B · CONFERENCES & COMPETITIONS",
    color: "#d98cc8",
    principle: "Where campuses meet Unraveled.",
    positioning: {
      what: "High-school + university conferences, workshops, and competitions — events, not curriculum.",
      who: "Students, clubs, and campuses, via the MBA + advisory network.",
      why: "Lower-lift institutional entry; builds the pipeline for curriculum + corporate.",
    },
    funnel: [
      { name: "Awareness", tactics: ["Campus partners", "Advisory network", "Student orgs"] },
      { name: "Consideration", tactics: ["Event proposals", "Recaps", "Sponsor decks"] },
      { name: "Conversion", tactics: ["Event booking", "Sponsorships"] },
      { name: "Retention", tactics: ["Annual cadence", "Campus chapters"] },
    ],
    monetization: [
      "Event fees + sponsorships",
      "Registration / ticket revenue",
      "Feeds the curriculum + corporate pipeline",
      "Network-driven, MBA-enabled",
    ],
  },
  {
    key: "corporate",
    group: "b2b",
    name: "Corporate",
    eyebrow: "B2B · CORPORATE",
    color: "#ef9bb0",
    principle: "Relationship health, for teams.",
    positioning: {
      what: "Culture and relationship workshops for companies; tech-integrated.",
      who: "People / culture teams. The first paid B2B, once grassroots cool exists.",
      why: "Sells on the white paper + Dr. Burke; funds the harder K-12 build.",
    },
    funnel: [
      { name: "Awareness", tactics: ["White paper", "Founder network", "LinkedIn", "Referrals"] },
      { name: "Consideration", tactics: ["Pilot workshops", "Case studies", "ROI pitch"] },
      { name: "Conversion", tactics: ["Workshop contract", "Procurement"] },
      { name: "Retention", tactics: ["Retainers", "Team expansion"] },
    ],
    monetization: [
      "Per-workshop / per-engagement fees",
      "Retainers + multi-team expansion (NRR)",
      "Highest near-term B2B revenue",
      "Design Lead builds the tech-integrated format",
    ],
  },
];

/* ────────────────────────────  Foundation (shared pillars)  ─────────────────── */

type Point = { head: string; body: string };
type Pillar = {
  key: string;
  name: string;
  color: string;
  principle: string;
  points: Point[];
  moves?: { when: string; title: string; do: string; link?: string }[];
  parent?: string; // sub-tab under a top-level pillar (e.g. "operations")
};

const PILLARS: Pillar[] = [
  {
    key: "financial",
    parent: "operations",
    name: "Financial",
    color: "#6f8fd8",
    principle: "Grow without giving ourselves away.",
    points: [
      { head: "Grants fund the build", body: "Win non-dilutive grants (SBIR/STTR, NIH/NSF, foundations) to fund 2026-27 before touching equity." },
      { head: "The card game is first revenue", body: "Between Us (Real Talk) ships Q4 2026: the first money in, ahead of the app. A physical product with real unit economics (manufacturing, shipping, margin), so presale / Kickstarter de-risks the first run." },
      { head: "Then recurring, then B2B", body: "Cohorts (mid 2027, recurring) + expansion packs, then experiences (2028), then B2B workshops + curriculum (2028+, gated on the efficacy study + credibility)." },
      { head: "App free, never ads or data", body: "The app stays free (the funnel); monetized indirectly by routing users to paid products, never by ads or selling data." },
      { head: "Spend behind the money", body: "Stay lean; add cost only as grants and revenue actually land." },
    ],
    moves: [
      { when: "done", title: "Incorporate + open books", do: "LLC formed, equity split finalized; keep clean books from day one." },
      { when: "26 Q4", title: "Ship the card game (first revenue)", do: "Between Us launches ~Q4 2026, the first money in. Presale / Kickstarter de-risks the print run; watch COGS + margin on a physical product." },
      { when: "26–27", title: "Chase non-dilutive money", do: "Apply broadly (SBIR/STTR, NIH, NSF, youth-mental-health foundations) so no single grant is a single point of failure, before any equity. Full shortlist + deadlines in the tracker.", link: "https://airtable.com/apprBK1ChbYH7Fryx/tbldjwAhpyNpRwBtQ" },
      { when: "27", title: "Turn on recurring", do: "First paid cohort + expansion packs bring recurring consumer revenue on top of the card game." },
      { when: "28+", title: "Add B2B revenue", do: "Corporate workshops then curriculum, gated on the curriculum efficacy study + the reviewed framework. Highest-value, credibility-dependent." },
      { when: "later", title: "Raise last, if ever", do: "Take equity only once grants + revenue prove the model, and keep ownership." },
    ],
  },
  {
    key: "legal",
    parent: "operations",
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
    moves: [
      { when: "done", title: "Lock entity + equity", do: "Operating agreement signed, cap table clean." },
      { when: "27", title: "Own the marks", do: "Trademark the name; copyright the framework + content the moment they go public." },
      { when: "27–28", title: "Build privacy in", do: "GDPR/CCPA compliance, encryption, minimal collection, and no-train AI terms for relationship data." },
      { when: "pre-K12", title: "Guard minors", do: "Age gating, COPPA-grade protections, and digital-media controls before any product touches children." },
      { when: "later", title: "Patent only when real", do: "Hold patents until the intelligence model + app take a defensible shape." },
    ],
  },
  {
    key: "resource",
    parent: "operations",
    name: "Resources",
    color: "#7d5bd4",
    principle: "A small team, hugely leveraged.",
    points: [
      { head: "Now: founders + intern", body: "Madhuri + Will (co-founders) and a summer intern building V1." },
      { head: "2027: CEO full-time", body: "Madhuri goes full-time as CEO in Aug 2027, alongside the MBA." },
      { head: "2027–28: first core hires", body: "Founding AI engineer (2027) to harden App V2, but now contingent: Madhuri may build V2 with AI tools instead. Then both experiential leads in early 2028: a design lead for the AI-integrated experiences + tech-integrated learning, and a marketing lead for events + growth." },
      { head: "Leverage over headcount", body: "Build on an ethical AI partnership + tools; hire only what compounds, keep ownership intact." },
    ],
    moves: [
      { when: "now", title: "Run lean", do: "Co-founders + a summer intern build V1." },
      { when: "27", title: "Go full-time", do: "Madhuri as CEO, alongside the MBA." },
      { when: "27–28", title: "Hire to compound", do: "Founding AI engineer (2027) if needed to harden V2, or Madhuri builds it with AI tools. Then both experiential leads early 2028 (design lead for AI-integrated experiences + tech learning, marketing lead for events + growth)." },
      { when: "ongoing", title: "Buy leverage, not headcount", do: "An ethical AI partnership + tools do the work of a bigger team." },
      { when: "ongoing", title: "Gate hires on money", do: "Fund hires from money in hand, not the calendar. The AI engineer is no longer a committed hire (Madhuri may build V2 with AI tools instead); the experiential leads are contract-to-hire until cohort + card-game revenue or a second grant supports full-time. Keep the cap table clean." },
    ],
  },
  {
    key: "advisors",
    parent: "operations",
    name: "Advisors",
    color: "#a878d8",
    principle: "The right advisors, at the right time, without giving up the company.",
    points: [
      { head: "Reviewers now, free", body: "The people you eventually want as advisors (Dr. Nadine Burke = top target) come in as framework reviewers first — no equity, they review for the academic contribution. Lean on Berkeley psych connections, not the MBA." },
      { head: "Why Dr. Burke", body: "Dr. Nadine Burke Harris (pediatrician, first CA Surgeon General, ACEs and toxic-stress pioneer) owns the exact science behind the framework, so her review is instant credibility. She's the ideal children's-health authority for the K-12 arc, and her policy network fits the B2B and MPP push. She's also a UC Berkeley (BS) and UC Davis (MD) alum, so your Berkeley / UC network is the warm path in. Mission-first, so the reviewer on-ramp works." },
      { head: "Psych advisor, then the board", body: "A single psych advisor bridges 2027-28 (the reviewer-turned-advisor); the full strategic board comes in Q3 2028, ~a year into the MBA once the network is developing. Advisory equity (0.1-0.5%, vesting) offered then, once the cap table and raise are clearer." },
      { head: "The on-ramp is the ask", body: "Lead with \"would you review our framework?\" — concrete, flattering, low-commitment. That review relationship becomes the advisory one." },
      { head: "Keep the cadence light", body: "Quarterly check-ins + ad-hoc access; give each advisor something to do (a review, an intro, a warm door) so they stay engaged." },
    ],
    moves: [
      { when: "now", title: "Lead with the review", do: "Ask \"would you review our framework?\" (Dr. Nadine Burke = top target). Concrete, flattering, low-commitment." },
      { when: "26–27", title: "Keep it free early", do: "Reviewers come in for the academic contribution — no equity — via Berkeley connections." },
      { when: "post-MBA", title: "Wait for the network", do: "Reach higher-caliber advisors once the MBA network + cap table are clearer." },
      { when: "post-MBA", title: "Then offer equity", do: "Advisory equity (0.1–0.5%, vesting) only when the raise is real." },
      { when: "ongoing", title: "Give them something to do", do: "A review, an intro, or a warm door each quarter keeps them engaged." },
    ],
  },
  {
    key: "framework",
    name: "Framework",
    color: "#6f8fd8",
    principle: "The framework is the one thing no one can copy.",
    points: [
      { head: "Ten blocks, one model", body: "The 10-block relationship-health model + Awareness — an organizational contribution nobody else has structured this way." },
      { head: "Thesis first, proof behind it", body: "Publish the thesis to claim the ideas, then layer credibility: Dr. Burke's endorsement, a psychometrician validating Two Truths, a curriculum efficacy study, and finally a peer-reviewed publication." },
      { head: "Own the IP", body: "Copyright the framework and content; the model is the defensible core the app and products express." },
      { head: "Data makes it better", body: "Cohort + app data powers the Two Truths validation and the curriculum efficacy study, the empirical proof behind the thesis." },
    ],
    moves: [
      { when: "26 Q3", title: "Draft the thesis (V1)", do: "Write the 10 blocks + assessments + product portfolio into V1. Drafted by Madhuri, not the intern." },
      { when: "26 Q4", title: "Polish, then publish to claim it", do: "A quick clinical read by your OBGYN friend, then publish the thesis as a preprint + on the site. It reserves + timestamps the ideas and becomes your outreach artifact. File copyright." },
      { when: "27 Q1", title: "Approach Burke + SMEs with it", do: "Take the published paper to Dr. Nadine Burke + SMEs, stronger than a cold ask. Their endorsement is the credibility; SMEs also review the other assessments (Anchor Styles, Love Dialects). No equity." },
      { when: "27 Q1", title: "Build the curriculum (V1)", do: "Develop V1 of the block-based cohort program (sessions + exercises) on the 10 blocks. A working draft, not the validated version; it must exist before the beta cohorts run." },
      { when: "27", title: "Validate Two Truths", do: "A psychometrician validates the Two Truths instrument (reliability + validity) once cohort/app data exists." },
      { when: "28", title: "Prove the curriculum", do: "Run the curriculum efficacy study through the 2027 cohorts. It must land before B2B, since every B2B solution is curriculum-integrated: corporate needs the proof to sell." },
      { when: "28–29", title: "Publish formally", do: "Submit the empirical writeup to a credible journal; the peer-reviewed publication is the gold standard that unlocks the K-12 sell." },
    ],
  },
  {
    key: "brand",
    name: "Brand",
    color: "#e273ac",
    principle: "Strong relationships are built, not found. We win on the ground first.",
    points: [
      { head: "Built, not found", body: "One promise everywhere: connection is built with intention, not matched by an algorithm." },
      { head: "How it should feel", body: "Safe, seen, and a little brave; depth over hype, spectrum not scores." },
      { head: "Who + where", body: "18-30 first, on the channels they live on (Instagram, TikTok, newsletter), then LinkedIn for academia + investors." },
      { head: "Show real people", body: "A monthly podcast + real people going through the experience make it aspirational; cohorts supply the stories." },
      { head: "Community first", body: "Build a real grassroots community and trust before corporate/institutional, or it reads top-down." },
    ],
    moves: [
      { when: "26", title: "Nail the one promise", do: "\"Connection is built with intention, not matched by an algorithm\" — same line everywhere." },
      { when: "26–27", title: "Go where 18–30 live", do: "Instagram + TikTok + newsletter first; LinkedIn later for academia + investors." },
      { when: "ongoing", title: "Show real people", do: "Monthly podcast + cohort stories make it aspirational, not hype." },
      { when: "ongoing", title: "Let products carry it", do: "The card game, galas, and The Unraveling are the brand out in the wild." },
      { when: "before B2B", title: "Community before corporate", do: "Build a real grassroots community first, or the institutional pitch reads top-down." },
    ],
  },
  {
    key: "operations",
    name: "Operations",
    color: "#b884d8",
    principle: "The business behind the mission.",
    points: [
      { head: "Funded without dilution", body: "Grants-first, lean spend — see Financial." },
      { head: "Protect the work + people", body: "IP, data privacy, and child safety — see Legal." },
      { head: "A lean, leveraged team", body: "Founders + intern now, first hires 2028 — see Resources." },
      { head: "Advisors at the right time", body: "Reviewers now, strategic advisors post-MBA — see Advisors." },
    ],
    moves: [
      { when: "done", title: "Incorporate + protect", do: "LLC + IP first — see Legal." },
      { when: "26–27", title: "Fund without dilution", do: "Grants + revenue, lean spend — see Financial." },
      { when: "27–28", title: "Stay lean", do: "Founders + intern now, first hires 2028 — see Resources." },
      { when: "26+", title: "Add advisors on time", do: "Reviewers now, a strategic board post-MBA — see Advisors." },
    ],
  },
];

const OPS = PILLARS.filter((p) => p.parent === "operations");
const FOUNDATION = ["framework", "brand", "operations"].map((k) => PILLARS.find((p) => p.key === k)!);

// Top-level groups: B2C / B2B are verticals; Foundation is the shared pillars.
const GROUPS = [
  { key: "b2c", name: "B2C", color: "#c768c6", items: VERTICALS.filter((v) => v.group === "b2c").map((v) => v.key) },
  { key: "b2b", name: "B2B", color: "#f0a0b8", items: VERTICALS.filter((v) => v.group === "b2b").map((v) => v.key) },
  { key: "foundation", name: "Foundation", color: "#6f8fd8", items: FOUNDATION.map((p) => p.key) },
] as const;

function labelFor(key: string): string {
  return VERTICALS.find((v) => v.key === key)?.name ?? PILLARS.find((p) => p.key === key)?.name ?? key;
}

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

/* ────────────────────────────  The marketing funnel  ───────────────────────── */

// An inverted-triangle funnel: brand-gradient fill, hairline stage dividers,
// each stage's tactics sitting in the wide part of its band (they taper as the
// funnel narrows). Positions are fixed for four stages.
function Funnel({ stages }: { stages: Stage[] }) {
  const pos = [
    { top: 4, w: 84 },
    { top: 29, w: 64 },
    { top: 54, w: 44 },
    { top: 78, w: 27 },
  ];
  return (
    <div className="relative mx-auto mt-4 w-full max-w-[560px]" style={{ paddingBottom: "72%" }}>
      <svg viewBox="0 0 600 444" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="funnelfill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6f8fd8" />
            <stop offset="0.36" stopColor="#9a7fe0" />
            <stop offset="0.7" stopColor="#e273ac" />
            <stop offset="1" stopColor="#c768c6" />
          </linearGradient>
        </defs>
        <polygon points="24,4 576,4 300,436" fill="url(#funnelfill)" fillOpacity={0.17} stroke="url(#funnelfill)" strokeOpacity={0.85} strokeWidth={1.5} />
        <line x1="88" y1="112" x2="512" y2="112" stroke="#fff" strokeOpacity={0.13} />
        <line x1="152" y1="220" x2="448" y2="220" stroke="#fff" strokeOpacity={0.13} />
        <line x1="216" y1="328" x2="384" y2="328" stroke="#fff" strokeOpacity={0.13} />
      </svg>
      <div className="absolute inset-0">
        {stages.slice(0, 4).map((s, i) => (
          <div key={s.name} className="absolute -translate-x-1/2 text-center" style={{ top: `${pos[i].top}%`, left: "50%", width: `${pos[i].w}%` }}>
            <div className="text-[12.5px] font-semibold leading-tight text-white">{s.name}</div>
            <div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
              {s.tactics.map((t) => (
                <span key={t} className="rounded-full px-2 py-0.5 text-[10.5px] text-white" style={{ background: "rgba(255,255,255,0.16)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerticalDetail({ v }: { v: Vertical }) {
  const pos: [string, string][] = [
    ["What", v.positioning.what],
    ["Who", v.positioning.who],
    ["Why it wins", v.positioning.why],
  ];
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: v.color }} />
        <span className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: v.color }}>
          {v.eyebrow}
        </span>
      </div>
      <p className="mt-3 text-balance text-[25px] leading-tight text-white sm:text-[30px]" style={{ fontFamily: "var(--font-instrument)" }}>
        {v.principle}
      </p>

      {/* Positioning */}
      <div className="mt-9 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Positioning</div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
        {pos.map(([h, b]) => (
          <div key={h} className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-3.5">
            <div className="text-[12.5px] font-semibold text-white/90">{h}</div>
            <p className="mt-1.5 text-[12px] leading-snug text-white/55">{b}</p>
          </div>
        ))}
      </div>

      {/* Product structure (optional): the decks / how it's built */}
      {v.build && (
        <>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">The decks</span>
            {v.link && (
              <a href={v.link.href} target="_blank" rel="noreferrer" className="text-[11px] font-medium transition hover:underline" style={{ color: v.color }}>
                {v.link.label} ↗
              </a>
            )}
          </div>
          <div className="mt-3 space-y-2">
            {v.build.map((b) => (
              <div key={b.name} className="flex gap-2.5 text-[13px] leading-snug">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-sm" style={{ background: v.color }} />
                <span className="text-white/70">
                  <span className="font-semibold text-white/90">{b.name}</span> · {b.desc}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Marketing funnel */}
      <div className="mt-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Marketing · the funnel</div>
      <Funnel stages={v.funnel} />

      {/* Monetization */}
      <div className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        Monetization <span className="font-normal tracking-normal text-white/30">· CRO lens</span>
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {v.monetization.map((m) => (
          <div key={m} className="rounded-xl border p-3 text-[12px] leading-snug text-white/85" style={{ borderColor: "#f0a0b84d", background: "#f0a0b814" }}>
            {m}
          </div>
        ))}
      </div>

      {/* Strategy notes (optional): safety, how it plays, open decisions */}
      {v.notes && (
        <div className="mt-8 space-y-2.5">
          {v.notes.map((n) => (
            <div key={n.label} className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-3.5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: v.color }}>{n.label}</div>
              <p className="mt-1 text-[12.5px] leading-snug text-white/70">{n.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────  Foundation detail (pillars)  ─────────────────── */

function VizPanel({ children, takeaway }: { children: ReactNode; takeaway: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-white/[0.09] bg-white/[0.02] px-6 py-8">
      <div className="flex justify-center">{children}</div>
      <p className="mx-auto mt-5 max-w-2xl text-balance text-center text-[14.5px] leading-snug text-white/90">{takeaway}</p>
    </div>
  );
}

function PillarVisual({ p }: { p: Pillar }) {
  const c = p.color;
  switch (p.key) {
    case "financial":
      return (
        <VizPanel takeaway="Fund on grants and revenue, keep 100% ownership.">
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
        <VizPanel takeaway="Own the IP, guard the data, protect the minors.">
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
        <VizPanel takeaway="Built with intention, not matched by chance.">
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
    case "framework":
      return (
        <VizPanel takeaway="A model no one else has, made uncopyable.">
          <div className="flex flex-wrap items-center justify-center gap-5">
            <div className="text-center">
              <div className="grid grid-cols-5 gap-1.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i} className="h-6 w-6 rounded-[5px]" style={{ background: `${c}33`, border: `1px solid ${c}80` }} />
                ))}
              </div>
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-wide" style={{ color: c }}>
                10 blocks + awareness
              </div>
            </div>
            <span className="text-[26px]" style={{ color: c }}>&rarr;</span>
            <div className="flex h-[92px] w-[92px] flex-col items-center justify-center rounded-full text-center text-white" style={{ border: `3px solid ${c}`, boxShadow: `0 0 24px ${c}55` }}>
              <span className="text-[15px] font-extrabold leading-tight">Defensible</span>
              <span className="text-[10px] text-white/60">core IP</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {["Peer-reviewed", "© + ™ owned", "Data-validated"].map((s) => (
                <span key={s} className="rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white" style={{ background: `${c}22`, border: `1px solid ${c}66` }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </VizPanel>
      );
    case "resource":
      return (
        <VizPanel takeaway="A lean roster that grows with the money.">
          <div className="w-full max-w-sm space-y-2">
            {[
              { t: "Co-founders + summer intern", when: "now" },
              { t: "CEO full-time (+ MBA)", when: "27 Q3" },
              { t: "Founding AI Engineer", when: "27 Q3" },
              { t: "Experiential Design Lead", when: "28 Q1" },
              { t: "Experiential Marketing Lead", when: "28 Q1" },
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
        <VizPanel takeaway="Reviewers now, a psych advisor next, the full board in Q3 2028.">
          <div className="flex w-full max-w-md items-stretch gap-3">
            <div className="flex-1 rounded-xl p-4 text-center" style={{ background: `${c}1f`, border: `1px solid ${c}80` }}>
              <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: c }}>Now → 27-28</div>
              <div className="mt-1.5 text-[14px] font-semibold text-white">Reviewers, then a psych advisor</div>
              <div className="mt-1 text-[11px] text-white/60">no or low equity · mission</div>
            </div>
            <div className="flex-1 rounded-xl border border-white/10 p-4 text-center opacity-75">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-white/50">Q3 2028</div>
              <div className="mt-1.5 text-[14px] font-semibold text-white">Full advisory board</div>
              <div className="mt-1 text-[11px] text-white/60">advisory equity · mature network</div>
            </div>
          </div>
        </VizPanel>
      );
    case "operations":
      return (
        <VizPanel takeaway="Fund it, protect it, staff it, advise it.">
          <div className="grid w-full max-w-sm grid-cols-2 gap-2">
            {[
              { t: "Financial", s: "grants-first, no dilution" },
              { t: "Legal", s: "IP, privacy, child safety" },
              { t: "Resources", s: "lean, leveraged team" },
              { t: "Advisors", s: "right people, right time" },
            ].map((x) => (
              <div key={x.t} className="rounded-xl px-3 py-2.5" style={{ background: `${c}16`, border: `1px solid ${c}3a` }}>
                <div className="text-[13.5px] font-semibold text-white">{x.t}</div>
                <div className="mt-0.5 text-[11px] text-white/60">{x.s}</div>
              </div>
            ))}
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
        <Marker color={p.color} shape={shapeForStream(p.key)} size={12} glow={false} />
        <span className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: p.color }}>
          {p.name}
        </span>
      </div>
      <p className="mt-3 text-balance text-[25px] leading-tight text-white sm:text-[30px]" style={{ fontFamily: "var(--font-instrument)" }}>
        {p.principle}
      </p>

      <PillarVisual p={p} />

      {p.moves && (
        <div className="mt-12">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">The playbook</div>
          <ol className="mt-4">
            {p.moves.map((m, i) => (
              <li key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold"
                    style={{ background: `${p.color}26`, color: p.color }}
                  >
                    {i + 1}
                  </span>
                  {i < p.moves!.length - 1 && <span className="mt-1 w-px flex-1" style={{ background: `${p.color}2e` }} />}
                </div>
                <div className={i < p.moves!.length - 1 ? "min-w-0 pb-6" : "min-w-0"}>
                  {m.link ? (
                    <a
                      href={m.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[14.5px] font-semibold text-white underline decoration-white/30 underline-offset-2 transition hover:decoration-white"
                    >
                      {m.title}
                      <span className="text-[11px]" style={{ color: p.color }}>↗</span>
                    </a>
                  ) : (
                    <span className="text-[14.5px] font-semibold text-white">{m.title}</span>
                  )}
                  <p className="mt-1 text-[12.5px] leading-relaxed text-white/55">{m.do}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────  Overview  ───────────────────────────────────── */

function Overview() {
  const groups: { k: string; name: string; color: string; sub: string; items: { name: string; color: string }[] }[] = [
    { k: "b2c", name: "B2C", color: "#c768c6", sub: "free app funnels into paid products + experiences", items: VERTICALS.filter((v) => v.group === "b2c").map((v) => ({ name: v.name, color: v.color })) },
    { k: "b2b", name: "B2B", color: "#f0a0b8", sub: "institutions, gated by B2C proof + validation", items: VERTICALS.filter((v) => v.group === "b2b").map((v) => ({ name: v.name, color: v.color })) },
  ];
  return (
    <div className="mt-9">
      <div className="mb-4 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">How it fits together</div>

      {/* Foundation base */}
      <div className="rounded-xl border p-3 text-center" style={{ borderColor: "#6f8fd880", background: "#6f8fd81f" }}>
        <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "#6f8fd8" }}>Foundation</div>
        <div className="mt-0.5 text-[12.5px] text-white/85">the framework, brand, and operations every vertical is built on</div>
      </div>
      <div className="py-2 text-center text-[10.5px] text-white/45">↓ expressed as verticals, each with its own funnel</div>

      {/* Verticals */}
      <div className="grid gap-2.5 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.k} className="rounded-xl border p-4" style={{ borderColor: `${g.color}80`, background: `${g.color}14` }}>
            <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: g.color }}>{g.name}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {g.items.map((it) => (
                <span key={it.name} className="rounded-md px-2 py-1 text-[11.5px] text-white/90" style={{ background: `${it.color}26`, border: `1px solid ${it.color}55` }}>
                  {it.name}
                </span>
              ))}
            </div>
            <div className="mt-2.5 text-[10.5px] text-white/50">{g.sub}</div>
          </div>
        ))}
      </div>

      {/* Core */}
      <div className="mt-10 flex justify-center">
        <div
          className="flex h-[200px] w-[200px] flex-col items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-center backdrop-blur-sm"
          style={{ boxShadow: "0 0 80px rgba(154,127,224,0.4)" }}
        >
          <CubeMark className="h-14 w-14" />
          <span className="mt-3 max-w-[150px] text-[16px] leading-tight text-white/85" style={{ fontFamily: "var(--font-instrument)" }}>
            built, not found
          </span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────  Page  ───────────────────────────────────────── */

export default async function HQStrategy({
  searchParams,
}: {
  searchParams: Promise<{ v?: string; item?: string }>;
}) {
  const { v, item } = await searchParams;
  const vert = VERTICALS.find((x) => x.key === v);
  const pillar = !vert ? FOUNDATION.find((p) => p.key === v) : undefined;
  const activeKey = vert?.key ?? pillar?.key ?? "";
  const activeGroup = GROUPS.find((g) => (g.items as readonly string[]).includes(activeKey));
  const opsSel = pillar?.key === "operations" ? OPS.find((c) => c.key === item) : undefined;

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
          <a href={`${HQ}/gantt`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Milestones</a>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Strategy</span>
          <a href={`${HQ}/board`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Tasks</a>
          <a href={`${HQ}/kpis`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">KPIs</a>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Docs · soon</span>
        </div>

        {/* top-level groups: Overview · B2C · B2B · Foundation */}
        <div className="mt-4 flex flex-wrap gap-1.5 text-[12px]">
          <a href={`${HQ}/strategy`} className={`rounded-md px-2.5 py-1 ${!activeGroup ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}>
            Overview
          </a>
          {GROUPS.map((g) => (
            <a
              key={g.key}
              href={`${HQ}/strategy?v=${g.items[0]}`}
              className={`rounded-md px-2.5 py-1 ${activeGroup?.key === g.key ? "text-white" : "text-white/45 hover:text-white/80"}`}
              style={activeGroup?.key === g.key ? { background: `${g.color}33` } : undefined}
            >
              {g.name}
            </a>
          ))}
        </div>

        {/* second-level: items within the active group */}
        {activeGroup && (
          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/10 pt-4 text-[12px]">
            {activeGroup.items.map((k) => {
              const col = VERTICALS.find((x) => x.key === k)?.color ?? PILLARS.find((p) => p.key === k)?.color ?? "#fff";
              return (
                <a
                  key={k}
                  href={`${HQ}/strategy?v=${k}`}
                  className={`rounded-md px-2.5 py-1 ${activeKey === k ? "text-white" : "text-white/45 hover:text-white/80"}`}
                  style={activeKey === k ? { background: `${col}33` } : undefined}
                >
                  {labelFor(k)}
                </a>
              );
            })}
          </div>
        )}

        {/* body */}
        {vert ? (
          <VerticalDetail v={vert} />
        ) : pillar ? (
          pillar.key === "operations" ? (
            <>
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-5 text-[12px]">
                <a
                  href={`${HQ}/strategy?v=operations`}
                  className={`rounded-md px-2.5 py-1 ${!opsSel ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}
                >
                  Overview
                </a>
                {OPS.map((child) => (
                  <a
                    key={child.key}
                    href={`${HQ}/strategy?v=operations&item=${child.key}`}
                    className={`rounded-md px-2.5 py-1 ${opsSel?.key === child.key ? "text-white" : "text-white/45 hover:text-white/80"}`}
                    style={opsSel?.key === child.key ? { background: `${child.color}33` } : undefined}
                  >
                    {child.name}
                  </a>
                ))}
              </div>
              <PillarDetail p={opsSel ?? pillar} />
            </>
          ) : (
            <PillarDetail p={pillar} />
          )
        ) : (
          <Overview />
        )}
      </div>
    </main>
  );
}
