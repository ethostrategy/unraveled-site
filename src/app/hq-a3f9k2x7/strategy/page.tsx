import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
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
  marketTrend?: string; // one-line market/growth headline
  market?: { fact: string; source: string }[]; // sourced market-size + growth facts
};

const VERTICALS: Vertical[] = [
  {
    key: "app",
    group: "b2c",
    name: "Application",
    eyebrow: "B2C · APPLICATION",
    color: "#9a7fe0",
    principle: "The framework, made intelligent.",
    marketTrend: "Relationship-health apps are a proven, monetizable category: incumbents have scaled to seven-figure active-user counts and drawn venture funding and acquisitions, though nearly all target existing couples, not the 18-30 pre-couples we open with.",
    market: [
      { fact: "Paired, a couples relationship app, grew to 1M+ monthly active users by Nov 2024 and cites 8M+ downloads.", source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12001865/" },
      { fact: "Relish, an AI-plus-human relationship-coaching app, raised a $5M Series A led by Bessemer in 2020 ($7.2M total).", source: "https://news.crunchbase.com/startups/relish-secures-5m-series-a-to-grow-relationship-training-app/" },
      { fact: "Lasting, a relationship-counseling app (~$12/mo), was acquired by telehealth company Talkspace in 2020, validating relationship apps as acquisition targets.", source: "https://www.businesswire.com/news/home/20201112005199/en/Talkspace-Announces-Acquisition-of-Leading-Relationship-Counseling-App-Lasting" },
    ],
    positioning: {
      what: "Profiles, the four assessments (Two Truths, Anchor Styles, Blueprint, Love Dialects), and the Reps + Lab practice tabs. Free.",
      who: "18–30, relationship-curious: friends, situationships, family, self, not just couples. The free front door to everything.",
      why: "Owns the white space couples apps miss: the pre-commitment 18–30 graph, not couples-in-crisis. Two Truths and Self Talk have no direct competitor there. Free by design, it's the audience + data engine that feeds the paid products.",
    },
    funnel: [
      { name: "Awareness", tactics: ["Podcast clips", "IG / TikTok", "SEO", "Content"] },
      { name: "Consideration", tactics: ["App store page", "Two Truths preview", "Testimonials"] },
      { name: "Conversion", tactics: ["Free signup", "No paywall"] },
      { name: "Retention", tactics: ["Weekly Reps", "Community"] },
    ],
    monetization: [
      "Always free. It's the funnel, not an ads or data business.",
      "Earns indirectly by routing users to paid products.",
      "Premium features later, only if they add real value.",
      "Zero-retention, no-train data terms. Trust is the asset.",
    ],
  },
  {
    key: "cardgame",
    group: "b2c",
    name: "Card game",
    eyebrow: "B2C · CARD GAME",
    color: "#e273ac",
    principle: "The framework, in your hands.",
    marketTrend: "The real comp is the conversation / relationship card-game niche, led by We're Not Really Strangers and a wave of couples decks (How Deep Will You Go, Esther Perel's Where Should We Begin). A proven, social-led category, and the exact space Between Us plays in.",
    market: [
      { fact: "We're Not Really Strangers reached an estimated $5–10M in revenue with 2.2M Instagram followers, built almost entirely on its own social account, the model Between Us follows.", source: "https://www.zoominfo.com/c/were-not-really-strangers/402811637" },
      { fact: "How Deep Will You Go?, a couples conversation deck, reports 100,000+ users across its Amazon and TikTok Shop editions, direct demand in Between Us's exact niche.", source: "https://howdeepwillyougo.com/products/no2" },
      { fact: "Esther Perel's Where Should We Begin? (2021, now a 2nd edition) proves the premium, brand-led end of the category.", source: "https://www.estherperel.com/where-should-we-begin-a-game-of-stories" },
    ],
    positioning: {
      what: "Between Us: the card game. Three decks so far: Real Talk (intense, block-based), Sweet Talk (a light variety pack), and Self Talk (solo). Plays two-player or as a group.",
      who: "18–30 first: friends, couples, families. Built to gift and to film.",
      why: "The model made tangible and shareable. Podcast clips do the selling.",
    },
    funnel: [
      { name: "Awareness", tactics: ["Podcast clips", "Street videos", "IG / TikTok", "Influencer unboxings"] },
      { name: "Consideration", tactics: ["Product page + reviews", "Deck preview", "UGC playing"] },
      { name: "Conversion", tactics: ["Presale", "Gift bundles", "Referral (new buyer)"] },
      { name: "Retention", tactics: ["Collect the decks", "Referral (advocacy)"] },
    ],
    monetization: [
      "Bundle-led pricing: single deck $29, any two for $52, the full set $72 (the WNRS / Esther Perel price band). Free-ship bundles only and charge (or threshold) shipping on singles, since delivery is the biggest post-COGS cost.",
      "Founding-member pre-order + deposit: converts far better than a free waitlist and pre-funds the print run (presale / Kickstarter, non-dilutive).",
      "Validate on print-on-demand, then bulk-print overseas for margin. Real Talk anchors the launch; gift bundles as the decks land.",
      "Repeat buys from new decks + refills. Never ads or data.",
      "Versioned editions: when a deck's novelty fades, refresh its full question set and re-release it (OG → 2.0 → 3.0). A re-buy reason for owners and recurring revenue, retimed to demand, not the calendar.",
    ],
    build: [
      { name: "Real Talk", desc: "the deck. 10 blocks × 4 tiers (Foundation → Peak) × difficulty, plus challenge cards." },
      { name: "Sweet Talk", desc: "a separate light variety pack: mixed card mechanics, not just truth or dare, warmth / flirt / compliment-forward. Plays two-player or as a group party game." },
      { name: "Self Talk", desc: "the solo deck (Self is pulled out of the Universal deck so it plays alone)." },
      { name: "Dirty Talk", desc: "the spicy / adult edition, couples only (romantic partners). 120 cards across three heat levels (Mild / Medium / Spicy), tasteful and suggestive. Targeting Valentine's Day 2028." },
    ],
    link: { label: "The cards in Airtable", href: "https://airtable.com/appTiI05Rd5WMQQgg/tbl9GFd4bDdCZkzBF/viwBoZv6v7OkYv31v?blocks=hide" },
    notes: [
      { label: "Safety by design", body: "A consensual game with a rules card: pass any card, stop anytime, what's said here stays here. Don't play with anyone you don't feel safe with. Plays solo (Self Talk) for safe self-awareness." },
      { label: "How it plays", body: "Goal is to get closer, not to win. Built for two people in an existing relationship, not an icebreaker. Two moves: pass (put down a Real Talk card, any reason or none, unlimited) and skip (with both decks open, trade the current card for one from the other deck, one per player, and you do the card you draw, no camping in the fun deck). Players can make up their own rules too. Several rules still open (climb the tiers vs free-pick, dare pile)." },
      { label: "A note on power dynamics", body: "Real Talk is universal and works across relationship types. The one thing to weigh is power dynamics: where there's a real imbalance (a parent and a young child, a boss and a report), we don't recommend it, since the \"no ammo, safe to be open\" promise only holds between people who can be equally open. Sweet Talk, light and group-friendly, suits mixed ages and bigger gatherings." },
      { label: "Filmable by design", body: "The growth unit is a card whose reveal plays on camera. Design prompts for a shareable reaction (the \"both true\" gap moment), the way We're Not Really Strangers built its audience from filmed reveals rather than paid influencers." },
      { label: "Dual-mode by design", body: "Sweet Talk scales from a date to a crowd. Directed cards say \"another player / someone here / the group,\" never \"the other player,\" so it plays both two-player and as a group party game. (Dirty Talk is the exception: couples only.)" },
      { label: "Launch sequencing · open", body: "Real Talk launches Q1 2027 (Window A: order by mid-Oct 2026 to beat the Chinese New Year factory shutdown and peak ocean freight, land in December, launch Q1). Whether Sweet Talk + Self Talk ship alongside it or fast-follow is Will's call (Aug 12): shipping together maximizes gift bundles and basket size; a Real Talk hero keeps the launch focused and the content strongest." },
      { label: "Spicy edition · Dirty Talk", body: "Dirty Talk, the spicy / adult edition, is drafted (120 cards, three heat levels). Couples only, which lets it go spicier than a group deck; tasteful and suggestive, not graphic. Targeting a Valentine's Day 2028 launch, a fast follow to the Real Talk drop." },
    ],
  },
  {
    key: "merch",
    group: "b2c",
    name: "Merch",
    eyebrow: "B2C · MERCH & APPAREL",
    color: "#7d5bd4",
    principle: "Built, not found.",
    marketTrend: "Brand-led DTC apparel is a proven scale niche: creator and lifestyle brands build nine-figure businesses off a single identity, and the print-on-demand rails that make a small merch line viable are growing fast.",
    market: [
      { fact: "Gymshark, a DTC fitness-apparel brand built almost entirely on brand identity, reported £646M revenue in FY2025 (up from £607.3M).", source: "https://en.wikipedia.org/wiki/Gymshark" },
      { fact: "The global print-on-demand market was ~$12.96B in 2025, apparel the largest segment (estimated), the rails to run merch without inventory (Precedence Research).", source: "https://www.precedenceresearch.com/print-on-demand-market" },
      { fact: "The global custom T-shirt printing market was ~$9.23B in 2024, growing ~8% a year, the core format for branded-tagline apparel (Grand View Research).", source: "https://www.grandviewresearch.com/industry-analysis/custom-t-shirt-printing-market" },
    ],
    positioning: {
      what: "Apparel and accessories carrying the Unraveled marks and the line \"Built, not found.\" First drop 2027.",
      who: "Superfans and community who want to wear the belief. Walking billboards for the brand.",
      why: "Turns the brand line into something people wear, the way \"Just Do It\" made Nike a belief, not a shoe. High margin, pure brand, simple supply chain.",
    },
    funnel: [
      { name: "Awareness", tactics: ["Founder + community fits", "Drops", "UGC", "IG / TikTok"] },
      { name: "Consideration", tactics: ["Lookbook", "Limited drops", "Reviews"] },
      { name: "Conversion", tactics: ["DTC store", "Drop scarcity", "Bundles"] },
      { name: "Retention", tactics: ["New drops", "Member-only pieces", "Loyalty"] },
    ],
    monetization: [
      "Tees, hoodies, caps at healthy apparel margins.",
      "Limited drops create demand and scarcity.",
      "Print-on-demand first; hold inventory only on winners.",
      "Pure brand play, low supply-chain lift.",
    ],
    notes: [
      { label: "The Nike parallel", body: "\"Built, not found.\" is our \"Just Do It\": a belief you can wear, not just a product. Design the wordmark to read on a chest the way the swoosh does. Merch is how the philosophy walks around in public." },
    ],
  },
  {
    key: "books",
    group: "b2c",
    name: "Children's books",
    eyebrow: "B2C · CHILDREN'S BOOKS",
    color: "#6f8fd8",
    principle: "Emotional skills, from page one.",
    marketTrend: "A DTC children's SEL book brand is a validated model: the clearest direct comp, Slumberkins, built a multimillion-dollar business teaching emotional skills to young kids.",
    market: [
      { fact: "Slumberkins, a DTC social-emotional children's book + plush brand, reached ~$3M annual revenue; on Shark Tank it left without a deal, later partnering with The Jim Henson Company.", source: "https://www.sharktankblog.com/business/slumberkins/" },
      { fact: "Slumberkins raised a $2.8M seed round in 2019, investor validation of the SEL children's-book niche.", source: "https://www.globenewswire.com/news-release/2019/12/04/1956309/0/en/Slumberkins-Raises-2-8-Million-in-Seed-Round.html" },
      { fact: "The global children's picture book market was ~$4.7B in 2024, with North America cited as a trendsetter in social-emotional-learning themes (Cognitive Market Research).", source: "https://www.cognitivemarketresearch.com/children-picture-book-market-report" },
    ],
    positioning: {
      what: "A DTC board-book and picture-book line that teaches the 10 blocks to kids, one skill at a time. Launches 2028.",
      who: "Parents of 0–7s who want SEL at home. Gifted, shelved, and read at bedtime.",
      why: "Plants the framework early and opens the funnel to families. A proven category: Slumberkins built a brand on exactly this.",
    },
    funnel: [
      { name: "Awareness", tactics: ["Parent creators", "IG / TikTok", "Gift guides", "Podcast"] },
      { name: "Consideration", tactics: ["Inside-the-book preview", "Reviews", "Bundle with cards"] },
      { name: "Conversion", tactics: ["DTC store", "Gift sets", "Preorder"] },
      { name: "Retention", tactics: ["Collect the series", "Age-up titles", "New drops"] },
    ],
    monetization: [
      "Board books ~$12–18; boxed sets at a premium.",
      "DTC-first, then gift shops and retail.",
      "A series: one title per block, aging up with the reader.",
      "Bundles with the card game and app.",
    ],
  },
  {
    key: "experiences",
    group: "b2c",
    name: "Experiences",
    eyebrow: "B2C · EXPERIENCES",
    color: "#c768c6",
    principle: "The framework, lived out loud.",
    marketTrend: "In-person experiential and community-driven personal-growth is a real, revenue-generating market: escape rooms are a stable ~2,000-location US industry, and recurring-event community brands like Daybreaker have bootstrapped to seven-figure revenue.",
    market: [
      { fact: "The US had just over 2,000 escape-room facilities as of Dec 2025, stable since ~1,950 in 2023 (Room Escape Artist).", source: "https://roomescapeartist.com/2025/12/29/us-escape-room-industry-report-december-2025/" },
      { fact: "The US escape-room industry generates an estimated ~$300M a year (~40,000 weekly bookings at ~$150 each) (Room Escape Artist).", source: "https://roomescapeartist.com/2025/12/29/us-escape-room-industry-report-december-2025/" },
      { fact: "Daybreaker, a ticketed morning-dance community, grew to 800,000+ members across 30+ cities and bootstrapped to seven-figure revenue (estimated), tickets ~$25–$150+.", source: "https://community.inc/article/daybreaker" },
    ],
    positioning: {
      what: "Unraveled Paces cohorts, secret galas, and The Unraveling. Paid, in person.",
      who: "Engaged users ready to go deeper. The aspirational tier.",
      why: "The cohorts are the engine: they run Curriculum V1, generate the validation data that unlocks B2B, and deepen the superfan community. Galas and escape rooms are the aspirational brand moments.",
    },
    funnel: [
      { name: "Awareness", tactics: ["Cohort stories", "Gala buzz", "UGC recaps", "Referrals"] },
      { name: "Consideration", tactics: ["Waitlist", "Testimonials", "Preview events"] },
      { name: "Conversion", tactics: ["Cohort signup", "Limited seats"] },
      { name: "Retention", tactics: ["Alumni community", "The Lab"] },
    ],
    monetization: [
      "Recurring ticket / seat price per cohort.",
      "Galas + escape rooms: premium ticketed.",
      "Facilitator-led early; app-facilitated scales the margin.",
      "The highest-margin, brand-building line.",
    ],
  },
  {
    key: "k12",
    group: "b2b",
    name: "K-12 curriculum",
    eyebrow: "B2B · K-12 CURRICULUM",
    color: "#f0a0b8",
    principle: "Emotional education, built for every age.",
    marketTrend: "Social-emotional learning is a small but fast-growing EdTech niche, expanding ~20%+ a year off a low-single-digit-billion base, with adoption near-universal in US K-12; federal funding took a real 2025 hit, so don't lean on it.",
    market: [
      { fact: "The global social-emotional learning (SEL) market was ~$4.6B in 2024, projected to reach ~$33.7B by 2034 (~22% CAGR) (Market.us).", source: "https://market.us/report/social-and-emotional-learning-market/" },
      { fact: "83% of US school principals reported using an SEL curriculum in 2023-24, up from 76% in 2021-22 (CASEL/RAND, Sept 2024).", source: "https://casel.org/more-than-8-out-of-10-u-s-schools-implement-sel-nearly-all-states-have-supportive-policies/" },
      { fact: "The administration withheld ~$6.8B in federal education funds due July 1, 2025, so diversify off federal SEL money (EdWeek).", source: "https://www.edweek.org/policy-politics/schools-and-states-scramble-as-trump-freezes-6-8-billion-in-federal-funds/2025/07" },
    ],
    positioning: {
      what: "An SEL curriculum for schools, customized by band (K-5, 6-8, 9-12). The high-school track adds healthy-relationships and consent through health/PE, not full sex-ed.",
      who: "School districts. Sold older-to-younger; K-5 last (hardest, child-safety gated).",
      why: "The validated, CASEL-aligned framework as tech-integrated learning. Grant- and district-funded.",
    },
    funnel: [
      { name: "Awareness", tactics: ["White paper + Dr. Burke", "Conferences", "District networks"] },
      { name: "Consideration", tactics: ["Pilot proposals", "Case studies", "Demos"] },
      { name: "Conversion", tactics: ["Pilot → contract", "Grant-funded seats"] },
      { name: "Retention", tactics: ["Renewals", "Grade expansion"] },
    ],
    monetization: [
      "Per-district / per-seat licensing.",
      "Grant- and district-funded; underserved schools subsidized.",
      "Diversify off federal SEL money (tightening since 2025): lean district + health/PE budgets + private foundations. The HS consent/health angle rides more durable health budgets.",
      "Age bands expand the contract, K-5 up through 12.",
      "Gated on full validation and child-safety compliance.",
    ],
  },
  {
    key: "conferences",
    group: "b2b",
    name: "Conferences",
    eyebrow: "B2B · CONFERENCES & COMPETITIONS",
    color: "#d98cc8",
    principle: "Where campuses meet Unraveled.",
    marketTrend: "Career and education student organizations already embed inside schools at national scale, convening hundreds of thousands of members and drawing tens of thousands to each flagship conference, a proven low-lift path into institutions.",
    market: [
      { fact: "DECA, the marketing/business student organization, reports 322,248 members across 4,733 chapters (2024-25).", source: "https://www.deca.org/mission" },
      { fact: "DECA's flagship International Career Development Conference draws 25,000+ high-school students, advisors, and professionals annually.", source: "https://www.deca.org/conferences/icdc" },
      { fact: "HOSA-Future Health Professionals (200,000+ members) drew 12,600+ attendees to its 2024 International Leadership Conference.", source: "https://hosa.org/2024/07/" },
    ],
    positioning: {
      what: "High-school and university conferences, workshops, and competitions. Events, not curriculum.",
      who: "Students, clubs, and campuses, via the MBA + advisory network.",
      why: "The lower-lift way into institutions. It builds the pipeline for curriculum and corporate.",
    },
    funnel: [
      { name: "Awareness", tactics: ["Campus partners", "Advisory network", "Student orgs"] },
      { name: "Consideration", tactics: ["Event proposals", "Recaps", "Sponsor decks"] },
      { name: "Conversion", tactics: ["Event booking", "Sponsorships"] },
      { name: "Retention", tactics: ["Annual cadence", "Campus chapters"] },
    ],
    monetization: [
      "Near-breakeven: event fees + sponsors cover it, not a profit center.",
      "The real payoff is the pipeline it feeds (curriculum + corporate).",
      "Plus reach and grassroots cred on campuses.",
      "Network-driven, MBA-enabled.",
    ],
  },
  {
    key: "corporate",
    group: "b2b",
    name: "Corporate",
    eyebrow: "B2B · CORPORATE",
    color: "#ef9bb0",
    principle: "Relationship health, for teams.",
    marketTrend: "Corporate wellness is a large, growing market (~$68B in 2025), and the adjacent soft-skills / communication training market is growing fast, yet only about a third of organizations offer soft-skills training today, a large unmet need.",
    market: [
      { fact: "The corporate wellness market was ~$68B in 2025, projected to reach ~$138B by 2035 (~7.4% CAGR) (Precedence Research).", source: "https://www.precedenceresearch.com/corporate-wellness-market" },
      { fact: "The soft-skills (communication / interpersonal) training market was ~$37.2B in 2025, projected to reach ~$97.4B by 2034 (~11.3% CAGR) (IMARC).", source: "https://www.imarcgroup.com/soft-skills-training-market" },
      { fact: "Only 35% of organizations offer soft-skills training, versus 74% offering professional development generally, a large unmet need (Wiley Workplace Intelligence, n=2,070).", source: "https://www.everythingdisc.com/blogs/soft-skills-big-impact-elevating-workplace-satisfaction/" },
    ],
    positioning: {
      what: "Culture and relationship workshops for companies, tech-integrated.",
      who: "People and culture teams. The first paid B2B, once grassroots cool exists.",
      why: "The biggest, warmest near-term B2B market: corporate wellness is a ~$68B market, yet only about a third of employers offer soft-skills training today, a large unmet need. It sells on the white paper and Dr. Burke, and funds the harder K-12 build. Held until grassroots cool exists so the brand never reads corporate-first.",
    },
    funnel: [
      { name: "Awareness", tactics: ["White paper", "Founder network", "LinkedIn", "Referrals"] },
      { name: "Consideration", tactics: ["Pilot workshops", "Case studies", "ROI pitch"] },
      { name: "Conversion", tactics: ["Workshop contract", "Procurement"] },
      { name: "Retention", tactics: ["Retainers", "Team expansion"] },
    ],
    monetization: [
      "Per-workshop / per-engagement fees.",
      "Retainers and multi-team expansion (NRR).",
      "Highest near-term B2B revenue.",
      "Design Lead builds the tech-integrated format.",
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
      { head: "The card game is first revenue", body: "Between Us (Real Talk) ships ~early Q1 2027 (a few weeks before Valentine's): the first money in. The free App V1 launches first (Dec 5, 2026) to seed profiles + assessments, and each deck's QR activates digital play + an ecosystem unlock back in the app — but the cards are the first paid product. Real unit economics (manufacturing, shipping, margin), so a founding-member pre-order / presale (Kickstarter) de-risks and pre-funds the first run." },
      { head: "Then recurring, then B2B", body: "Cohorts (mid 2027, recurring) + expansion packs and demand-triggered versioned editions (OG → 2.0 → 3.0), then experiences (2028), then B2B workshops + curriculum (2028+, gated on the efficacy study + credibility)." },
      { head: "Diversify beyond federal", body: "Federal SEL grant streams are tightening (2025 priority shift). Spread non-dilutive funding across private foundations, corporate CSR, and campus/health budgets, and lead B2B with corporate (private wellness spend), not public money." },
      { head: "App free, never ads or data", body: "The app stays free (the funnel); monetized indirectly by routing users to paid products, never by ads or selling data." },
      { head: "Spend behind the money", body: "Stay lean; add cost only as grants and revenue actually land." },
    ],
    moves: [
      { when: "done", title: "Incorporate + open books", do: "LLC formed, equity split finalized; keep clean books from day one." },
      { when: "27 Q1", title: "Ship the card game (first revenue)", do: "Between Us launches ~Q1 2027 (Window A timing), the first money in. Presale / Kickstarter de-risks the print run; watch COGS + margin on a physical product." },
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
      { head: "Card game: rate it + warn it", body: "The card game surfaces heavy content, so it needs more than an 'adult' label: a clear age rating (17/18+) and a content warning on the box. The 'rules' card (consent, pass any card, stop anytime) doubles as the trauma-informed safety mechanic (the X-Card standard) and a liability shield. Add a 'not therapy' disclaimer; finalize with counsel." },
      { head: "Data privacy + security", body: "Handle sensitive relationship data with real privacy and security compliance: GDPR/CCPA, encryption, minimal collection." },
      { head: "Child rights + digital controls", body: "Age gating, COPPA-grade protections, and digital-media controls wherever minors are involved." },
      { head: "Patents when it's real", body: "Hold patents tentative until the intelligence model and app take shape." },
    ],
    moves: [
      { when: "done", title: "Lock entity + equity", do: "Operating agreement signed, cap table clean." },
      { when: "26 Q4", title: "Cover the card game", do: "Before the Dec launch: age rating + content warning on the box, the consent/rules card (pass, stop anytime) as the safety mechanic, and a 'not therapy' disclaimer. Run it by counsel." },
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
      { head: "Reviewers now, free", body: "The people you eventually want as advisors (Dr. Nadine Burke = top target) come in as framework reviewers first: no equity, they review for the academic contribution. Lean on Berkeley psych connections, not the MBA." },
      { head: "Why Dr. Burke", body: "Dr. Nadine Burke Harris (pediatrician, first CA Surgeon General, ACEs and toxic-stress pioneer) owns the exact science behind the framework, so her review is instant credibility. She's the ideal children's-health authority for the K-12 arc, and her policy network fits the B2B and MPP push. She's also a UC Berkeley (BS) and UC Davis (MD) alum, so your Berkeley / UC network is the warm path in. Mission-first, so the reviewer on-ramp works." },
      { head: "Psych advisor, then the board", body: "A single psych advisor bridges 2027-28 (the reviewer-turned-advisor); the full strategic board comes in Q3 2028, ~a year into the MBA once the network is developing. Advisory equity (0.1-0.5%, vesting) offered then, once the cap table and raise are clearer." },
      { head: "The on-ramp is the paper", body: "Approach WITH the published white paper: \"we put out our framework, would you review and endorse it?\" Concrete, flattering, and stronger than a cold ask because there's a real artifact. That review relationship becomes the advisory one." },
      { head: "Keep the cadence light", body: "Quarterly check-ins + ad-hoc access; give each advisor something to do (a review, an intro, a warm door) so they stay engaged." },
    ],
    moves: [
      { when: "27 Q1", title: "Approach with the paper", do: "Take the published white paper to Dr. Burke + SMEs: \"would you review and endorse this?\" Stronger than a cold ask; the review relationship becomes the advisory one." },
      { when: "26–27", title: "Keep it free early", do: "Reviewers come in for the academic contribution, no equity, via Berkeley connections." },
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
      { head: "Ten blocks, one model", body: "The 10-block relationship-health model plus Awareness: an organizational contribution nobody else has structured this way." },
      { head: "Thesis first, proof behind it", body: "Publish the thesis to claim the ideas, then layer credibility: Dr. Burke's endorsement, a psychometrician validating Two Truths, a curriculum efficacy study, and finally a peer-reviewed publication." },
      { head: "Own the IP", body: "Copyright the framework and content; the model is the defensible core the app and products express." },
      { head: "Data makes it better", body: "Cohort + app data powers the Two Truths validation and the curriculum efficacy study, the empirical proof behind the thesis." },
      { head: "Proof beats vibes", body: "Most relationship products run on vibes. A published, expert-reviewed, psychometrically validated framework is credibility competitors can't match, and it strengthens grant applications, B2B and K-12 sales, and press." },
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
      { head: "Built, not found", body: "One promise everywhere: connection is built with intention, not matched by an algorithm or simulated by AI. Real connection, against synthetic intimacy." },
      { head: "Ride the moment", body: "Anchor to the loneliness and friendship-recession wave (about half of US adults report loneliness; 15% of men have no close friends). It's the strongest cultural tailwind, and it strengthens both press and grant applications." },
      { head: "How it should feel", body: "Safe, seen, and a little brave; depth over hype, spectrum not scores." },
      { head: "Who + where", body: "18-30 first, on the channels they live on (Instagram, TikTok, newsletter), then LinkedIn for academia + investors." },
      { head: "Show real people", body: "A monthly podcast + real people going through the experience make it aspirational; cohorts supply the stories." },
      { head: "Community first", body: "Build a real grassroots community and trust before corporate/institutional, or it reads top-down." },
    ],
    moves: [
      { when: "26", title: "Nail the one promise", do: "\"Connection is built with intention, not matched by an algorithm.\" Same line everywhere." },
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
      { head: "Funded without dilution", body: "Grants-first, lean spend. See Financial." },
      { head: "Protect the work + people", body: "IP, data privacy, and child safety. See Legal." },
      { head: "A lean, leveraged team", body: "Founders + intern now, first committed hires 2028. See Resources." },
      { head: "Advisors at the right time", body: "Reviewers now, strategic advisors post-MBA. See Advisors." },
    ],
    moves: [
      { when: "done", title: "Incorporate + protect", do: "LLC + IP first. See Legal." },
      { when: "26–27", title: "Fund without dilution", do: "Grants + revenue, lean spend. See Financial." },
      { when: "27–28", title: "Stay lean", do: "Founders + intern now, first committed hires 2028. See Resources." },
      { when: "26+", title: "Add advisors on time", do: "Reviewers now, a strategic board post-MBA. See Advisors." },
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

function SIcon({ name, className }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    package: <><path d="M12 2.5l8 4.5v9L12 20.5 4 16V7z" /><path d="M4 7l8 4.5L20 7M12 11.5v9" /></>,
    users: <><circle cx="9" cy="8" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6" /><path d="M18 13.5a5.5 5.5 0 0 1 2.5 4.5" /></>,
    trending: <><path d="M3 17l6-6 4 4 8-8" /><path d="M16 7h5v5" /></>,
    coin: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10M14.5 9.2A2.6 2.6 0 0 0 12 8c-1.4 0-2.5.8-2.5 2s1.1 2 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2a2.6 2.6 0 0 1-2.5-1.2" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[name]}
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
  const pos: [string, string, string][] = [
    ["package", "What", v.positioning.what],
    ["users", "Who", v.positioning.who],
    ["trending", "Why it wins", v.positioning.why],
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
        {pos.map(([ic, h, b]) => (
          <div key={h} className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-3.5">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: `${v.color}22`, color: v.color }}>
                <SIcon name={ic} className="h-[15px] w-[15px]" />
              </span>
              <div className="text-[12.5px] font-semibold text-white/90">{h}</div>
            </div>
            <p className="mt-2.5 text-[12px] leading-snug text-white/55">{b}</p>
          </div>
        ))}
      </div>

      {/* Market: sourced size + growth facts */}
      {v.market && (
        <>
          <div className="mt-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Market · size &amp; growth</div>
          {v.marketTrend && <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">{v.marketTrend}</p>}
          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {v.market.map((m) => (
              <div key={m.fact} className="flex flex-col rounded-xl border border-white/[0.09] bg-white/[0.02] p-3.5">
                <p className="flex-1 text-[12px] leading-snug text-white/80">{m.fact}</p>
                <Link href={m.source} target="_blank" rel="noreferrer" className="mt-2.5 inline-block text-[10.5px] font-medium transition hover:underline" style={{ color: v.color }}>Source ↗</Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Product structure (optional): the decks / how it's built */}
      {v.build && (
        <>
          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">The decks</span>
            {v.link && (
              <Link href={v.link.href} target="_blank" rel="noreferrer" className="text-[11px] font-medium transition hover:underline" style={{ color: v.color }}>
                {v.link.label} ↗
              </Link>
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

      {/* Deck design system (card game only) */}
      {v.key === "cardgame" && (
        <>
          <div className="mt-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Design · the deck system</div>
          <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">One family, a colorway per deck, all pulled from the brand palette. Real Talk carries the full spectrum; each sub-deck takes a slice of it (Sweet light, Dirty dark, Self cool).</p>
          <div className="mt-3 overflow-hidden rounded-2xl border border-white/[0.09]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/between-us-decks.png" alt="Between Us deck colorway system: Real Talk, Sweet Talk, Dirty Talk, Self Talk" className="block w-full" />
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
          <div key={m} className="flex gap-2.5 rounded-xl border p-3" style={{ borderColor: "#f0a0b84d", background: "#f0a0b814" }}>
            <span className="mt-px shrink-0" style={{ color: "#f0a0b8" }}>
              <SIcon name="coin" className="h-4 w-4" />
            </span>
            <span className="text-[12px] leading-snug text-white/85">{m}</span>
          </div>
        ))}
      </div>

      {/* Manufacturing & unit economics (card game only) */}
      {v.key === "cardgame" && (
        <>
          <div className="mt-10 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Manufacturing &amp; unit economics <span className="font-normal tracking-normal text-white/30">· starting research for Will</span></div>
          <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">Two-phase: validate cheap on print-on-demand, then bulk-print overseas for margin. Figures are directional; Will firms them with real quotes.</p>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-3.5">
              <div className="text-[12.5px] font-semibold text-white/90">Path</div>
              <p className="mt-1 text-[12px] leading-snug text-white/60">POD proofs (MakePlayingCards / The Game Crafter, US, no tariff) → pre-orders size the run → bulk from MPC / QP overseas for margin. Poker 2.5×3.5&quot;, 300gsm, tuck box, ~120 cards.</p>
            </div>
            <div className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-3.5">
              <div className="text-[12.5px] font-semibold text-white/90">Timing · Window A</div>
              <p className="mt-1 text-[12px] leading-snug text-white/60">Order by mid-Oct 2026 to beat the Chinese New Year shutdown (~early Jan–mid Mar 2027) and ship after peak ocean season (Aug–Oct). Land Dec → Q1 2027 launch.</p>
            </div>
          </div>
          <div className="mt-2.5 overflow-x-auto rounded-xl border border-white/[0.09] bg-white/[0.02]">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-white/45">
                  <th className="p-2.5 text-left font-semibold">Per unit · single deck @ $29.99</th>
                  <th className="p-2.5 text-right font-semibold">Customer ships</th>
                  <th className="p-2.5 text-right font-semibold">Free shipping</th>
                </tr>
              </thead>
              <tbody className="text-white/75">
                <tr className="border-t border-white/[0.06]"><td className="p-2.5">Landed COGS (make + freight + duty)</td><td className="p-2.5 text-right">$6.75</td><td className="p-2.5 text-right">$6.75</td></tr>
                <tr className="border-t border-white/[0.06]"><td className="p-2.5">Pick / pack</td><td className="p-2.5 text-right">$3.00</td><td className="p-2.5 text-right">$3.00</td></tr>
                <tr className="border-t border-white/[0.06]"><td className="p-2.5">Delivery (postage)</td><td className="p-2.5 text-right text-white/40">customer</td><td className="p-2.5 text-right">$5.50</td></tr>
                <tr className="border-t border-white/[0.06]"><td className="p-2.5">Processing (3%)</td><td className="p-2.5 text-right">$0.90</td><td className="p-2.5 text-right">$0.90</td></tr>
                <tr className="border-t border-white/[0.12] font-semibold text-white/90"><td className="p-2.5">All-in cost</td><td className="p-2.5 text-right">$10.65</td><td className="p-2.5 text-right">$16.15</td></tr>
                <tr className="border-t border-white/[0.06] font-semibold" style={{ color: v.color }}><td className="p-2.5">Gross profit @ $29.99</td><td className="p-2.5 text-right">$19.34 (64%)</td><td className="p-2.5 text-right">$13.84 (46%)</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
            <div className="rounded-xl border p-3" style={{ borderColor: `${v.color}4d`, background: `${v.color}14` }}>
              <div className="text-[12px] font-semibold text-white/90">Bundle to protect margin</div>
              <p className="mt-1 text-[12px] leading-snug text-white/70">Free-ship bundles only; charge (or threshold) shipping on singles. One parcel carries 2–3 decks, so postage amortizes (~$2/deck). A 3-deck set at $72 free-shipped still nets ~55%.</p>
            </div>
            <div className="rounded-xl border p-3" style={{ borderColor: `${v.color}4d`, background: `${v.color}14` }}>
              <div className="text-[12px] font-semibold text-white/90">Model landed, not sticker</div>
              <p className="mt-1 text-[12px] leading-snug text-white/70">Tariffs are volatile (+20–50% on China imports), so model landed cost. DTC is where margin lives; wholesale at ~50% off roughly halves it.</p>
            </div>
          </div>
        </>
      )}

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
        { t: "Trademark + copyright", s: "building" },
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
              { t: "Founding AI Engineer", when: "27 Q3 · contingent" },
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

/* Grants pipeline — a working snapshot of the funding tracker (Airtable is the
 * live source). Three buckets: accepted, pending (submitted / applying now),
 * not started (eligible, upcoming windows). Refreshed Aug 2026. */
const GRANTS_AIRTABLE = "https://airtable.com/apprBK1ChbYH7Fryx/tbldjwAhpyNpRwBtQ";
const GRANTS: { accepted: { name: string; note: string }[]; submitted: { name: string; note: string }[]; pending: { name: string; note: string }[]; notStarted: { name: string; note: string }[] } = {
  accepted: [],
  submitted: [
    { name: "Amber Grant", note: "Submitted Jul 2 · $10k/mo + $50k year-end" },
    { name: "Freed Fellowship", note: "Submitted · $500/mo + $2.5k year-end" },
  ],
  pending: [
    { name: "Social Shifters", note: "Due Aug 31 · $1k–15k, founder under 30" },
    { name: "Hello Alice", note: "Profile live · rotating $5k–25k" },
    { name: "IFundWomen UFGA", note: "Profile · gateway to Visa She's Next" },
  ],
  notStarted: [
    { name: "UNESCO Youth for Peace", note: "Missed 2026 (closed Jul 19); target next cycle · best thematic fit" },
    { name: "Echoing Green", note: "Deadline Mar 1 2027 · $100k stipend" },
    { name: "Camelback", note: "~Early Mar 2027 · $40–50k + coaching, best match" },
    { name: "Google BFF", note: "Next US window ~2027 · up to $150k, via Will" },
    { name: "Milken-Penn GSE", note: "~Feb 2027 · education prize" },
    { name: "MassChallenge", note: "~Early 2027 · equity-free accelerator" },
    { name: "TiE Women", note: "~Mar 2027 · up to $50k, needs a validated offering" },
    { name: "WFN Fast Pitch", note: "~Apr–May 2027 · $55k + coaching" },
    { name: "AAPISTRONG", note: "Rolling · ~$10k, strong AAPI-woman fit" },
    { name: "Next Wave Fund", note: "Tie to the card-game Kickstarter · $10k" },
    { name: "Black Ambition", note: "Watch · 2026 prize paused, may resume 2027" },
  ],
};

function GrantsPipeline() {
  const cols: { label: string; color: string; items: { name: string; note: string }[]; empty?: string }[] = [
    { label: "Accepted", color: "#6f8fd8", items: GRANTS.accepted, empty: "None yet. First award targeted ~Q2 2027." },
    { label: "Submitted", color: "#9a7fe0", items: GRANTS.submitted, empty: "Awaiting the first submissions." },
    { label: "Pending", color: "#e273ac", items: GRANTS.pending },
    { label: "Not started", color: "#8f93a0", items: GRANTS.notStarted },
  ];
  return (
    <div className="mt-14">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Grants pipeline</span>
        <Link href={GRANTS_AIRTABLE} target="_blank" rel="noreferrer" className="text-[11px] font-medium text-[#9a7fe0] transition hover:underline">Full tracker in Airtable ↗</Link>
      </div>
      <p className="mt-2 max-w-2xl text-[12.5px] leading-snug text-white/55">Non-dilutive funding by status. The Airtable is the live source; this is the working snapshot (Aug 2026).</p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {cols.map((col) => (
          <div key={col.label} className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: col.color }} />
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: col.color }}>{col.label}</span>
              </div>
              <span className="text-[11px] text-white/35">{col.items.length}</span>
            </div>
            {col.items.length ? (
              <ul className="mt-3 space-y-2.5">
                {col.items.map((g) => (
                  <li key={g.name}>
                    <div className="text-[12.5px] font-semibold text-white/85">{g.name}</div>
                    <div className="text-[11px] leading-snug text-white/45">{g.note}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-[11.5px] leading-snug text-white/40">{col.empty}</p>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] leading-snug text-white/40">Others are parked as not-yet-eligible (need revenue or 1+ year operating): Cartier, Tory Burch, Global Good Fund, and more in the tracker. Berkeley SkyDeck is dilutive, a 2027 seed option rather than a grant.</p>
    </div>
  );
}

/* Brand mission / vision / values — the foundational statement under the Brand
 * pillar. Drafted from the existing brand promise + framework + positioning
 * (the FF MVV transcript never surfaced). */
const MVV = {
  mission: "We help people build the relationships they want, on purpose, not by luck.",
  vision: "A world where strong relationships are built by skill, not left to chance, the way we have learned to care for our bodies and minds.",
  values: [
    { t: "Built, not found", d: "Connection is a skill you practice, not luck you wait for." },
    { t: "Depth over hype", d: "Substance over vanity metrics and hot takes." },
    { t: "Safe, seen, a little brave", d: "Make it safe to be honest and go deeper." },
    { t: "Proof over vibes", d: "Grounded in real research, not pop psychology." },
    { t: "Human, not synthetic", d: "Real connection over algorithms and AI stand-ins." },
    { t: "Ground before institutions", d: "Earn trust with people first, then organizations." },
  ],
};

function BrandMVV() {
  return (
    <div className="mt-12">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Mission · Vision · Values</div>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-2xl border p-5" style={{ borderColor: "#e273ac4d", background: "#e273ac10" }}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#f6b0d3" }}>Mission</div>
          <p className="mt-2 text-balance text-[17px] leading-snug text-white/90" style={{ fontFamily: "var(--font-instrument)" }}>{MVV.mission}</p>
        </div>
        <div className="rounded-2xl border p-5" style={{ borderColor: "#6f8fd84d", background: "#6f8fd810" }}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#6f8fd8" }}>Vision</div>
          <p className="mt-2 text-balance text-[17px] leading-snug text-white/90" style={{ fontFamily: "var(--font-instrument)" }}>{MVV.vision}</p>
        </div>
      </div>
      <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40">Values</div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {MVV.values.map((v) => (
          <div key={v.t} className="rounded-xl border border-white/[0.09] bg-white/[0.02] p-3.5">
            <div className="text-[13px] font-semibold text-white/90">{v.t}</div>
            <p className="mt-1 text-[11.5px] leading-snug text-white/55">{v.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
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

      {p.key === "brand" && <BrandMVV />}

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
                    <Link
                      href={m.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[14.5px] font-semibold text-white underline decoration-white/30 underline-offset-2 transition hover:decoration-white"
                    >
                      {m.title}
                      <span className="text-[11px]" style={{ color: p.color }}>↗</span>
                    </Link>
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

      {p.key === "financial" && <GrantsPipeline />}
    </div>
  );
}

/* ────────────────────────────  Group overview (B2C / B2B)  ──────────────────── */

function GroupOverview({ gkey }: { gkey: "b2c" | "b2b" }) {
  const g = GROUPS.find((x) => x.key === gkey)!;
  const items = VERTICALS.filter((v) => v.group === gkey);
  const sub =
    gkey === "b2c"
      ? "The free app is the front door. It funnels into paid products and experiences."
      : "Institutions come after B2C proof and framework validation open the door.";
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: g.color }} />
        <span className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: g.color }}>{g.name}</span>
      </div>
      <p className="mt-3 max-w-2xl text-balance text-[22px] leading-tight text-white sm:text-[26px]" style={{ fontFamily: "var(--font-instrument)" }}>
        {sub}
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {items.map((v) => (
          <Link
            key={v.key}
            href={`${HQ}/strategy?v=${v.key}`}
            className="group overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.02] transition hover:bg-white/[0.04]"
          >
            <div className="h-1 w-full" style={{ background: v.color }} />
            <div className="p-4">
              <div className="text-[13.5px] font-semibold text-white/90">{v.name}</div>
              <p className="mt-2 text-[15px] leading-snug text-white/80" style={{ fontFamily: "var(--font-instrument)" }}>{v.principle}</p>
              <p className="mt-2.5 text-[12px] leading-snug text-white/50">{v.positioning.what}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium" style={{ color: v.color }}>
                Open <span className="transition group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
      {gkey === "b2c" && (
        <p className="mt-4 max-w-2xl text-[12px] leading-snug text-white/45">
          <span className="font-semibold text-white/70">Sequence, don&rsquo;t scatter.</span> 2026 focus is the card game, the free app, and the content engine. Merch, children&rsquo;s books, and experiences-at-scale are staged behind that proof, not run in parallel; two founders can only make one flywheel spin at a time.
        </p>
      )}
    </div>
  );
}

/* ────────────────────────────  Overview  ───────────────────────────────────── */

// The honest read: a research-backed assessment for the Strategy landing.
const READ_STRENGTHS = [
  "The tailwind is documented, not invented. Loneliness is a Surgeon-General-level problem, and \"built, not found\" sits directly against AI companionship.",
  "The card game + owned-content flywheel is the right engine: tabletop is one of the few growing toy categories, physical goods convert far better than a freemium app, and We're Not Really Strangers proved a deck can bootstrap a brand.",
  "Consumer-first-into-B2B is a proven motion (Calm / Headspace), and the wellness, L&D, and SEL markets behind it are large and real.",
];
const READ_WATCH = [
  "No reputable figure sizes the app itself. Keep it the funnel, not the business; revenue comes from cards, experiences, and B2B.",
  "The real risk is focus, not the market. Two founders across many lines: win the card game + content first, let the rest ride behind proof.",
  "The B2B bet has a federal-SEL funding headwind. Lead with corporate (private dollars) and diversified grants.",
  "Validation is the long pole and the differentiator. Start the white paper now; it gates the highest-value B2B.",
];

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

      {/* The honest read */}
      <div className="mt-14 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5 sm:p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">The honest read</div>
        <p className="mt-3 max-w-3xl text-balance text-[19px] leading-snug text-white/90 sm:text-[22px]" style={{ fontFamily: "var(--font-instrument)" }}>
          A well-timed shot at creating a category, not entering a sized one. The market isn&rsquo;t the question, focus and content velocity are.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#6f8fd8" }}>Why it can work</div>
            <ul className="mt-3 space-y-2.5">
              {READ_STRENGTHS.map((s) => (
                <li key={s} className="flex gap-2.5 text-[12.5px] leading-snug text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#6f8fd8" }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "#e273ac" }}>What to watch</div>
            <ul className="mt-3 space-y-2.5">
              {READ_WATCH.map((w) => (
                <li key={w} className="flex gap-2.5 text-[12.5px] leading-snug text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#e273ac" }} />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 border-t border-white/10 pt-4 text-[12.5px] leading-relaxed text-white/60">
          <span className="font-semibold text-white/80">Bottom line:</span> win the card game and the content flywheel first, use them to build the audience and the proof, then let merch, books, experiences-at-scale, and B2B earn their place behind it. Market sizes here are directional and the category is unproven, so the research validates the tailwinds and the wedge, not that the whole portfolio pencils out. That proof comes from the Dec 5 app launch, the Q1 2027 card drop, and the cohorts.
        </p>
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
  const onGroupOverview = v === "b2c" || v === "b2b";
  const vert = VERTICALS.find((x) => x.key === v);
  const pillar = !vert ? FOUNDATION.find((p) => p.key === v) : undefined;
  const activeKey = vert?.key ?? pillar?.key ?? "";
  const activeGroup = GROUPS.find((g) => g.key === v || (g.items as readonly string[]).includes(activeKey));
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
          Strategy
        </h1>

        {/* section nav */}
        <div className="mt-6 flex flex-wrap gap-2 text-[13px]">
          <Link href={`${HQ}/gantt`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Milestones</Link>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">Strategy</span>
          <Link href={`${HQ}/board`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Tasks</Link>
          <Link href={`${HQ}/kpis`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">KPIs</Link>
          <Link href={`${HQ}/marketing`} className="rounded-full border border-white/10 px-3.5 py-1 text-white/60 transition hover:text-white">Marketing</Link>
        </div>

        {/* top-level groups: Overview · B2C · B2B · Foundation */}
        <div className="mt-4 flex flex-wrap gap-1.5 text-[12px]">
          <Link href={`${HQ}/strategy`} className={`rounded-md px-2.5 py-1 ${!activeGroup ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}>
            Overview
          </Link>
          {GROUPS.map((g) => (
            <Link
              key={g.key}
              href={`${HQ}/strategy?v=${g.key === "foundation" ? g.items[0] : g.key}`}
              className={`rounded-md px-2.5 py-1 ${activeGroup?.key === g.key ? "text-white" : "text-white/45 hover:text-white/80"}`}
              style={activeGroup?.key === g.key ? { background: `${g.color}33` } : undefined}
            >
              {g.name}
            </Link>
          ))}
        </div>

        {/* second-level: items within the active group */}
        {activeGroup && (
          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/10 pt-4 text-[12px]">
            {(activeGroup.key === "b2c" || activeGroup.key === "b2b") && (
              <Link
                href={`${HQ}/strategy?v=${activeGroup.key}`}
                className={`rounded-md px-2.5 py-1 ${onGroupOverview ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}
              >
                Overview
              </Link>
            )}
            {activeGroup.items.map((k) => {
              const col = VERTICALS.find((x) => x.key === k)?.color ?? PILLARS.find((p) => p.key === k)?.color ?? "#fff";
              return (
                <Link
                  key={k}
                  href={`${HQ}/strategy?v=${k}`}
                  className={`rounded-md px-2.5 py-1 ${activeKey === k ? "text-white" : "text-white/45 hover:text-white/80"}`}
                  style={activeKey === k ? { background: `${col}33` } : undefined}
                >
                  {labelFor(k)}
                </Link>
              );
            })}
          </div>
        )}

        {/* body */}
        {onGroupOverview ? (
          <GroupOverview gkey={v as "b2c" | "b2b"} />
        ) : vert ? (
          <VerticalDetail v={vert} />
        ) : pillar ? (
          pillar.key === "operations" ? (
            <>
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-5 text-[12px]">
                <Link
                  href={`${HQ}/strategy?v=operations`}
                  className={`rounded-md px-2.5 py-1 ${!opsSel ? "bg-white/15 text-white" : "text-white/45 hover:text-white/80"}`}
                >
                  Overview
                </Link>
                {OPS.map((child) => (
                  <Link
                    key={child.key}
                    href={`${HQ}/strategy?v=operations&item=${child.key}`}
                    className={`rounded-md px-2.5 py-1 ${opsSel?.key === child.key ? "text-white" : "text-white/45 hover:text-white/80"}`}
                    style={opsSel?.key === child.key ? { background: `${child.color}33` } : undefined}
                  >
                    {child.name}
                  </Link>
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
