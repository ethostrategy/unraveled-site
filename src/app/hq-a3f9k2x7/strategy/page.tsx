import type { Metadata } from "next";
import type { ReactNode } from "react";
import Backdrop from "@/components/Backdrop";
import { Marker, shapeForStream } from "../marker";

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
  // optional execution path: concrete, sequenced moves ("how we execute").
  // link makes a step's title a link out (e.g. to an Airtable tracker).
  moves?: { when: string; title: string; do: string; link?: string }[];
  // if set, this pillar is a sub-tab under the named top-level stream (e.g. "operations")
  parent?: string;
  // node position on the constellation, in a 0–100 square (center = 50,50)
  x: number;
  y: number;
};

const PILLARS: Pillar[] = [
  {
    key: "financial",
    parent: "operations",
    name: "Financial",
    color: "#6f8fd8",
    principle: "Grow without giving ourselves away.",
    points: [
      { head: "Grants first", body: "Win non-dilutive grants (SBIR/STTR, NIH/NSF) before raising any equity." },
      { head: "Earn it, don't sell data", body: "The app stays free (the funnel); revenue comes from the paid experiences (cohorts, card game, galas, escape rooms, workshops), never the app, ads, or data." },
      { head: "Spend as money lands", body: "Stay lean; grow spending only as grants and revenue come in." },
    ],
    moves: [
      { when: "done", title: "Incorporate + open books", do: "LLC formed; keep clean books and a clear equity split from day one." },
      { when: "26–27", title: "Chase non-dilutive money", do: "Apply broadly (SBIR/STTR, NIH, NSF, youth-mental-health foundations) so no single grant is a single point of failure; before touching equity. Full shortlist, deadlines, and effort in the tracker.", link: "https://airtable.com/apprBK1ChbYH7Fryx/tbldjwAhpyNpRwBtQ" },
      { when: "ongoing", title: "Make each experience pay", do: "Cohorts, app, card game, and galas each carry their own cost — never ads or data resale." },
      { when: "ongoing", title: "Spend behind the money", do: "Add cost only as grants and revenue actually land; default to lean." },
      { when: "later", title: "Raise last, if ever", do: "Take equity only once grants + revenue prove the model — and keep ownership." },
    ],
    x: 50,
    y: 11,
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
    x: 80,
    y: 26,
  },
  {
    key: "brand",
    name: "Brand/Media",
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
    x: 87,
    y: 59,
  },
  {
    key: "product",
    name: "B2C Products",
    color: "#9a7fe0",
    principle: "Everything we make expresses the framework.",
    points: [
      { head: "A tangible, experiential line", body: "The framework made real: the card game (Between Us), journals, children's books, cohorts (Unraveled Paces), The Unraveling (live), and galas." },
      { head: "Cohorts + app feed each other", body: "Real-world cohorts (Unraveled Paces) train the intelligence; the intelligence sharpens each cohort." },
      { head: "B2B when proven", body: "Expand into SaaS + licensing once the consumer foundation is solid." },
    ],
    moves: [
      { when: "27", title: "Web first", do: "Two Truths + Unraveled profiles ship on the web ahead of the app." },
      { when: "27", title: "Make it tangible", do: "Card game (Between Us), journals, and cohorts (Unraveled Paces) turn the model into things people hold." },
      { when: "27–28", title: "Each feeds the other", do: "Cohorts train the intelligence; the intelligence sharpens each cohort." },
      { when: "27+", title: "Add live experiences", do: "Galas + The Unraveling create the stories and the aspiration." },
      { when: "28+", title: "Expand by weakness", do: "Deluxe per-block packs + books, recommended off each user's profile." },
    ],
    x: 34,
    y: 85,
  },
  {
    key: "intelligence",
    name: "Intelligence",
    color: "#7d84dc",
    principle: "The framework, made intelligent.",
    points: [
      { head: "Built on a partnership", body: "The AI runs on an ethical model provider (e.g. Anthropic), not built from scratch." },
      { head: "Assessments are the input", body: "Every assessment feeds the user's profile and personal algorithm — open them in the sub-tabs below." },
      { head: "Profile to Blueprint", body: "App V2's intelligence layer turns assessment data into a living profile and relational Blueprint." },
      { head: "Iterates continuously", body: "From V2 on, the intelligence keeps learning and improving." },
    ],
    moves: [
      { when: "Now", title: "Ship on the API", do: "Build V1 on an ethical provider's API (Anthropic / Claude). You need a key, not a signed deal — ship first." },
      { when: "26 Q3", title: "Get credits", do: "Apply to startup-credit programs (Anthropic for Startups, accelerator perks, Future Founders) to defer spend while pre-revenue." },
      { when: "26 Q3", title: "Lock data terms", do: "Zero-retention / no-train terms so relationship data never trains anyone's model. Non-negotiable — ties to Legal." },
      { when: "Ongoing", title: "Stay swappable", do: "Keep the model behind a thin abstraction layer; keep the relationship non-exclusive so you're never locked in." },
      { when: "2027+", title: "Earn the partnership", do: "With cohort data + users, pitch Unraveled as an ethical-AI case study. The formal partnership follows traction." },
    ],
    x: 0,
    y: 0,
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
      { head: "2027–28: first core hires", body: "Founding AI engineer first (2027, build), then both experiential leads in early 2028: a design lead for the AI-integrated experiences + tech-integrated learning, and a marketing lead for events + growth." },
      { head: "Leverage over headcount", body: "Build on an ethical AI partnership + tools; hire only what compounds, keep ownership intact." },
    ],
    moves: [
      { when: "now", title: "Run lean", do: "Co-founders + a summer intern build V1." },
      { when: "27", title: "Go full-time", do: "Madhuri as CEO, alongside the MBA." },
      { when: "27–28", title: "Hire to compound", do: "Founding AI engineer first (2027), then both experiential leads early 2028 (design lead for AI-integrated experiences + tech learning, marketing lead for events + growth)." },
      { when: "ongoing", title: "Buy leverage, not headcount", do: "An ethical AI partnership + tools do the work of a bigger team." },
      { when: "ongoing", title: "Gate hires on money", do: "Fund hires from money in hand, not the calendar. The AI engineer is the one committed hire (2027); the experiential leads are contract-to-hire until cohort + card-game revenue or a second grant supports full-time. Keep the cap table clean." },
    ],
    x: 0,
    y: 0,
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
    x: 0,
    y: 0,
  },
  {
    key: "framework",
    name: "Framework",
    color: "#6f8fd8",
    principle: "The framework is the one thing no one can copy.",
    points: [
      { head: "Ten blocks, one model", body: "The 10-block relationship-health model + Awareness — an organizational contribution nobody else has structured this way." },
      { head: "Peer-reviewed credibility", body: "Reviewer panel (Dr. Nadine Burke = top target) → white paper → journal submission → validation studies, via Berkeley psych connections." },
      { head: "Own the IP", body: "Copyright the framework and content; the model is the defensible core the app and products express." },
      { head: "Data makes it better", body: "App data feeds the validation studies and a data-informed V3." },
    ],
    moves: [
      { when: "26 Q3", title: "Draft V1", do: "Madhuri drafts V1: the 10 blocks + assessments written up as the framework's first white-paper draft. Drafted by her, not the intern." },
      { when: "26 Q3", title: "Clinical review → V2", do: "A physician with an MPH (your UC Davis OBGYN friend) critiques V1; revise into V2. She also warms the Dr. Burke intro." },
      { when: "26 Q4", title: "Dr. Burke → V3", do: "Reach Dr. Burke via the warm UC Davis intro (not a cold email); she reviews V2, and you revise into V3, the launch-ready framework. No equity." },
      { when: "27 Q1–Q2", title: "Publish + protect", do: "Publish V3 as the white paper (citable preprint + on the site). File copyright + trademark the moment it's public." },
      { when: "27 H2", title: "Submit to journal", do: "Submit the larger writeup to one credible journal via the Berkeley connections; don't shotgun." },
      { when: "2028", title: "Validate on data", do: "Study on real app + cohort data turns V3 into a validated model." },
      { when: "2029", title: "Publish V4", do: "Data-informed V4 + the peer-reviewed publication, the credential competitors can't shortcut." },
    ],
    x: 0,
    y: 0,
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
    x: 0,
    y: 0,
  },
  {
    key: "b2b",
    name: "B2B Products",
    color: "#f0a0b8",
    principle: "Grow into institutions, top-down.",
    points: [
      { head: "Corporate first", body: "Culture and relationship workshops for companies, once grassroots cool is established." },
      { head: "Education, older to younger", body: "University → high school → middle school → elementary; young-kid curriculum is the hardest to build, so it comes last." },
      { head: "License + SaaS", body: "License the framework and sell a B2B SaaS platform once the consumer base is proven." },
    ],
    moves: [
      { when: "before B2B", title: "Prove consumer first", do: "No B2B pitch until grassroots cool + validation exist." },
      { when: "28", title: "Start with corporates", do: "Culture + relationship workshops for companies, once the brand has heat. Sell on the white paper + Dr. Burke's name; the full validation + publication is the credential that lands in time for the harder K-12 pitch in 2029." },
      { when: "28–29", title: "Go older to younger", do: "University → high school → middle school → elementary. All of it is tech-integrated learning built with the Design Lead; the younger K-12 also needs net-new developmental curriculum." },
      { when: "29", title: "Save the youngest for last", do: "Young-kid curriculum is hardest and child-safety gated — also the investor-safe reason to wait." },
      { when: "29+", title: "License + SaaS", do: "License the framework and sell a B2B platform once the base is proven." },
    ],
    x: 0,
    y: 0,
  },
];

// Sub-tabs: each product / assessment gets its own approach page.
type SubItem = { key: string; name: string; blurb: string; approach: string[] };

const PRODUCTS: SubItem[] = [
  { key: "between-us", name: "Between Us", blurb: "The conversation card game (incl. the deluxe per-block packs).", approach: [
    "7 packs: 1 standard + 6 that Will and Madhuri each co-create with their three siblings.",
    "MVP ready 26 Q4 to play live on the podcast; presales 27 Q1, launch 27 Q2.",
    "Deluxe per-block packs (Safety, Trust, ...) follow in 27 H2 — the app recommends the pack for a user's weak blocks.",
    "Podcast clips are the marketing engine.",
  ] },
  { key: "paces", name: "Unraveled Paces", blurb: "Peer cohort experiences (Will's name).", approach: [
    "Launch cohorts, then pilot cities, then multi-city; app-facilitated at scale.",
    "Cohorts and the app co-evolve — real-world cohorts train the intelligence.",
  ] },
  { key: "galas", name: "Secret galas", blurb: "Exclusive, invite-only brand events.", approach: [
    "First gala 27 Q3 — a buzzy, aspirational brand moment.",
  ] },
  { key: "unraveling", name: "The Unraveling", blurb: "Physical team challenge course — Reps, live.", approach: [
    "Glow-or-Go-style: rooms of physical challenges, each testing a relationship block.",
    "The in-person embodiment of Reps; leans into the fitness thread.",
    "Start as a pop-up, then a bigger build.",
  ] },
  { key: "books", name: "Children's books", blurb: "Direct-to-family young-kid entry.", approach: [
    "Reach young kids early, ahead of the (harder, later) school programs.",
  ] },
  { key: "journals", name: "Journals", blurb: "Guided reflection journals.", approach: [
    "2028 H2 onward, once the framework and app are mature.",
  ] },
];

const ASSESSMENTS: SubItem[] = [
  { key: "anchors", name: "Anchors", blurb: "Attachment styles — how you bond and react under stress, per relationship.", approach: ["Approach — to build out."] },
  { key: "two-truths", name: "Two Truths", blurb: "Dual-perspective: both people rate the relationship on the 10 blocks, surfacing agreement, disagreement, and blindspots.", approach: ["Approach — to build out."] },
  { key: "blueprint", name: "Blueprint", blurb: "Your relational archetype — an entry point for singles and young adults.", approach: ["Approach — to build out."] },
  { key: "love-dialects", name: "Love Dialects", blurb: "Expanded care-preference inventory (~10-15 dialects), self-shareable.", approach: ["Approach — to build out."] },
  { key: "reps", name: "Reps", blurb: "Weekly social-fitness practice challenges in real-world contexts.", approach: ["Approach — to build out."] },
  { key: "the-lab", name: "The Lab", blurb: "Deep-engagement tier: sustained practice + community + workshops.", approach: ["Approach — to build out."] },
];

// Top-level strategy tabs, in order (mirroring the roadmap streams).
// Operations holds Financial / Legal / Resources / Advisors as sub-tabs.
const TOP = ["framework", "intelligence", "operations", "brand", "product", "b2b"]
  .map((k) => PILLARS.find((p) => p.key === k)!);
const OPS = PILLARS.filter((p) => p.parent === "operations");

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

// High-level map of how the six workstreams feed each other (not chronology).
function FlowMap() {
  return (
    <div className="mt-8">
      <div className="mb-4 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">How it fits together</div>

      <div className="rounded-xl border p-3 text-center" style={{ borderColor: "#6f8fd880", background: "#6f8fd81f" }}>
        <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: "#6f8fd8" }}>Framework · the science</div>
        <div className="mt-0.5 text-[12.5px] text-white/85">the 10-block model + assessments; everything else expresses it</div>
      </div>

      <div className="grid grid-cols-3 gap-2 py-2 text-center text-[10.5px] text-white/45">
        <div>↓ assessments feed the app</div>
        <div>↓ expressed as products</div>
        <div>↓ curricula + credibility</div>
      </div>

      <div className="flex items-stretch gap-2.5">
        <div className="flex-[1.6] rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center justify-center gap-2 text-center">
            <div className="flex-1">
              <div className="text-[10.5px] font-semibold uppercase tracking-wide" style={{ color: "#9a7fe0" }}>Intelligence</div>
              <div className="text-[11.5px] text-white/85">app (free funnel)</div>
            </div>
            <div className="text-[18px] text-white/50">⇄</div>
            <div className="flex-1">
              <div className="text-[10.5px] font-semibold uppercase tracking-wide" style={{ color: "#c768c6" }}>B2C</div>
              <div className="text-[11.5px] text-white/85">paid experiences</div>
            </div>
          </div>
          <div className="mt-2 border-t border-white/10 pt-1.5 text-center text-[10.5px] text-white/45">each feeds the other: cohorts train the intelligence · it personalizes the experiences · free app funnels into paid</div>
        </div>
        <div className="flex flex-1 flex-col justify-center rounded-xl border p-3 text-center" style={{ borderColor: "#f0a0b880", background: "#f0a0b81a" }}>
          <div className="text-[10.5px] font-semibold uppercase tracking-wide" style={{ color: "#f0a0b8" }}>B2B</div>
          <div className="text-[11.5px] text-white/85">institutions</div>
          <div className="mt-1 text-[10px] text-white/45">↑ gated by B2C proof + validation</div>
        </div>
      </div>

    </div>
  );
}

function Constellation() {
  return (
    <div className="mt-10 flex justify-center">
      <div
        className="flex h-[220px] w-[220px] flex-col items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-center backdrop-blur-sm"
        style={{ boxShadow: "0 0 80px rgba(154,127,224,0.4)" }}
      >
        <CubeMark className="h-16 w-16" />
        <span className="mt-3 max-w-[150px] text-[16px] leading-tight text-white/85" style={{ fontFamily: "var(--font-instrument)" }}>
          built, not found
        </span>
      </div>
    </div>
  );
}

function VizPanel({ children, takeaway }: { children: ReactNode; takeaway: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-white/[0.09] bg-white/[0.02] px-6 py-8">
      <div className="flex justify-center">{children}</div>
      <p className="mx-auto mt-5 max-w-2xl text-balance text-center text-[14.5px] leading-snug text-white/90">{takeaway}</p>
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
        <VizPanel takeaway="Every assessment feeds the user's algorithm.">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Assessments (web)", "App", "Physical line", "B2B"].map((s, i, arr) => (
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
    case "intelligence":
      return (
        <VizPanel takeaway="One personal algorithm, fed by every assessment.">
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["Every assessment", "Personal algorithm", "Living Blueprint"].map((s, i, arr) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="rounded-lg px-3 py-2 text-[13px] font-semibold text-white" style={{ background: `${c}${i === 1 ? "30" : "1f"}`, border: `1px solid ${c}${i === 1 ? "90" : "66"}` }}>
                    {s}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="flex flex-col items-center text-[9.5px] uppercase tracking-wide text-white/45">
                      <span className="text-[15px]" style={{ color: c }}>&rarr;</span>
                      {i === 0 ? "collects data" : "produces"}
                    </span>
                  )}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-white/55">
              <span className="text-[13px]" style={{ color: c }}>&#8635;</span> every assessment adds data; the algorithm sharpens from app V2 on
            </div>
          </div>
        </VizPanel>
      );
    case "b2b": {
      const bars = [
        { t: "Corporate", h: 100, bg: `${c}47`, bd: `${c}99` },
        { t: "University", h: 80, bg: `${c}3d`, bd: `${c}8c` },
        { t: "High school", h: 60, bg: `${c}33`, bd: `${c}80` },
        { t: "Middle", h: 42, bg: `${c}29`, bd: `${c}73` },
        { t: "Elementary", h: 26, bg: `${c}1a`, bd: `${c}66`, dashed: true },
      ];
      return (
        <VizPanel takeaway="Corporates first, then down the ages, youngest last.">
          <div className="w-full max-w-md">
            <div className="mx-auto w-fit rounded-lg px-3 py-1.5 text-center text-[11.5px] text-white/80" style={{ background: `${c}12`, border: `1px dashed ${c}66` }}>
              only on a proven B2C base + validated framework
            </div>
            <div className="my-1 text-center text-[14px]" style={{ color: c }}>&darr;</div>
            <div className="flex items-end justify-center gap-2" style={{ height: 116 }}>
              {bars.map((b) => (
                <div key={b.t} className="flex flex-1 flex-col items-center gap-1.5">
                  <div className="w-full rounded-t-md" style={{ height: b.h, background: b.bg, border: `1px ${b.dashed ? "dashed" : "solid"} ${b.bd}`, opacity: b.dashed ? 0.75 : 1 }} />
                  <span className="text-[10px] text-white/60">{b.t}</span>
                </div>
              ))}
            </div>
            <div className="mt-2.5 grid gap-2" style={{ gridTemplateColumns: "2fr 3fr" }}>
              <div className="rounded-lg px-2 py-1.5 text-center text-[10px] text-white/65" style={{ background: "#6f8fd812", border: "1px solid #6f8fd838" }}>
                credibility: <span className="text-white/90">white paper + Dr. Burke</span>
              </div>
              <div className="rounded-lg px-2 py-1.5 text-center text-[10px] text-white/65" style={{ background: "#6f8fd812", border: "1px solid #6f8fd838" }}>
                credibility: <span className="text-white/90">full validation</span> · elementary child-safety gated
              </div>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-white/45">
              <span>older → younger</span>
              <span>tech-integrated (Design Lead)</span>
              <span>2028 → 2029</span>
              <span>then license + SaaS</span>
            </div>
          </div>
        </VizPanel>
      );
    }
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

function SubTabs({ items, active, pillarKey, color }: { items: SubItem[]; active?: string; pillarKey: string; color: string }) {
  const sel = items.find((i) => i.key === active);
  return (
    <div className="mt-7">
      <div className="flex flex-wrap gap-1.5 text-[12px]">
        {items.map((it) => (
          <a
            key={it.key}
            href={`${HQ}/strategy?pillar=${pillarKey}&item=${it.key}`}
            className={`rounded-md px-2.5 py-1 ${active === it.key ? "text-white" : "text-white/45 hover:text-white/80"}`}
            style={active === it.key ? { background: `${color}33` } : undefined}
          >
            {it.name}
          </a>
        ))}
      </div>
      {sel ? (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-[16px] font-semibold" style={{ color }}>{sel.name}</div>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/70">{sel.blurb}</p>
          <ul className="mt-4 space-y-1.5">
            {sel.approach.map((a) => (
              <li key={a} className="flex gap-2 text-[13px] leading-relaxed text-white/70">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: color }} />
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] text-white/35">Approach — draft, to build out.</p>
        </div>
      ) : (
        <p className="mt-4 text-[12px] text-white/45">Pick one above to open its approach.</p>
      )}
    </div>
  );
}

export default async function HQStrategy({
  searchParams,
}: {
  searchParams: Promise<{ pillar?: string; item?: string }>;
}) {
  const { pillar, item } = await searchParams;
  const active = PILLARS.find((p) => p.key === pillar);
  const opsSel = active?.key === "operations" ? OPS.find((c) => c.key === item) : undefined;

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
          <a href={`${HQ}/board`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Weeks</a>
          <a href={`${HQ}/kpis`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">KPIs</a>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Docs · soon</span>
        </div>

        {/* pillar sub-tabs */}
        <div className="mt-4 flex flex-wrap gap-1.5 text-[12px]">
          <a href={`${HQ}/strategy`} className={`rounded-md px-2.5 py-1 ${!active ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}>
            Overview
          </a>
          {TOP.map((p) => (
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

        {active ? (
          active.key === "operations" ? (
            <>
              {/* operations second-level nav — its own layer at top, each child its own page */}
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-5 text-[12px]">
                <a
                  href={`${HQ}/strategy?pillar=operations`}
                  className={`rounded-md px-2.5 py-1 ${!opsSel ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}
                >
                  Overview
                </a>
                {OPS.map((child) => (
                  <a
                    key={child.key}
                    href={`${HQ}/strategy?pillar=operations&item=${child.key}`}
                    className={`rounded-md px-2.5 py-1 ${opsSel?.key === child.key ? "text-white" : "text-white/45 hover:text-white/80"}`}
                    style={opsSel?.key === child.key ? { background: `${child.color}33` } : undefined}
                  >
                    {child.name}
                  </a>
                ))}
              </div>
              <PillarDetail p={opsSel ?? active} />
            </>
          ) : (
            <>
              <PillarDetail p={active} />
              {active.key === "product" && <SubTabs items={PRODUCTS} active={item} pillarKey="product" color={active.color} />}
              {active.key === "intelligence" && <SubTabs items={ASSESSMENTS} active={item} pillarKey="intelligence" color={active.color} />}
            </>
          )
        ) : (
          <>
            <FlowMap />
            <Constellation />
          </>
        )}
      </div>
    </main>
  );
}
