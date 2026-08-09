import type { Metadata } from "next";
import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import { LogoMark } from "@/components/Logo";
import DeliverableForm from "@/components/DeliverableForm";

/**
 * Pranav's internship roadmap: a private, game-style progress page.
 * Private via an unguessable URL slug + noindex + unlinked (the slug is
 * deliberately NOT in robots.txt so it isn't leaked). Share the URL with him.
 *
 * TO UPDATE HIS PROGRESS: change CURRENT_WEEK (0-6) as he advances. Week 0 is
 * onboarding. Set PUBLISHED_WEEK to control how far ahead he can see (weeks
 * past it show as locked until you publish them).
 */

export const metadata: Metadata = {
  title: "Pranav · Internship Roadmap",
  robots: { index: false, follow: false },
};

// ───────────────────────────────── PROGRESS KNOBS ─────────────────────────────
const CURRENT_WEEK = 7; // 1-6 = the active week; 7 = internship complete. Week 0 = onboarding.
const PUBLISHED_WEEK = 6; // weeks past this show as locked until you publish them
const INTERNSHIP_COMPLETE = CURRENT_WEEK > 6; // wraps the roadmap into a completion send-off
// ───────────────────────────────────────────────────────────────────────────────

// His internship folder (Google Workspace Drive). Used by the deliverable form.
const INTERN_FOLDER = "https://drive.google.com/drive/folders/1cBCs2AAevYr8JO3mM6nW4jbw93FsVd9s?usp=sharing";
const ASSESSMENTS_BASE = "https://airtable.com/appd1489Bm6riEa9R";
const VALIDATION_DOC = "https://docs.google.com/document/d/1A488S-Mnf_minjbOtAFO53Z4XYweyuh0ar3l7RNmOVk/edit";

const INTERN = {
  title: "Research & Development Intern",
  dates: "June 29 – August 8, 2026",
  hours: "Up to 20 hrs/week · remote & flexible",
};

// `done` = indices of focus items already completed (for the in-progress week).
type Week = { n: number; dates: string; theme: string; focus: string[]; deliverable?: string; done?: number[]; moreLocked?: boolean; skipped?: boolean; note?: string; noteLinks?: { label: string; href: string }[] };

const WEEKS: Week[] = [
  { n: 1, dates: "Jun 29 – Jul 5", theme: "Get Grounded", focus: ["Set up your pranav@unraveleduniverse.com email and explored Google Workspace", "Read the Workplace Rights PDF", "Bookmarked the Unraveled roadmap PDF", "Set up your Airtable account and opened the assessments base (2020 Draft, the four assessment tabs, and Definitions)", "Reviewed and refined the 2020 assessment questions", "Wrote a clinical/academic and a user-facing definition for each of the 10 blocks", "Reviewed your progress with Namratha, your Research Advisor", "Submitted your deliverable using the form above"], deliverable: "Review and refine the outdated assessment drafts, and write definitions for each of the 10 blocks. For the assessments: standardize every item to a 1-5 Likert statement, keep the dual-perspective structure, and aim for about 5 items per block across all four relationship types. Give each item two versions: a formal one (academically publishable and clinically testable) and a plain, accessible user-facing one. The formal version carries the rigor; the user-facing one carries the accessibility. In the user-facing wording, refer to the other person with a {name} placeholder that the app fills with their name (fallback: them). For the blocks: write two definitions each, one clinical/academic and one user-facing. It all lives in the Airtable base, which has six tabs: a 2020 Draft reference, the four end-state assessment tabs (Romantic, Platonic, Familial, Self), and a Definitions tab. Due by Monday afternoon (Jul 6).", done: [0, 1, 2, 3, 4, 5, 6, 7] },
  { n: 2, dates: "Jul 6 – 12", theme: "Lock It In", focus: ["Revise the assessment questions and block definitions based on advisor feedback", "Finalize all four assessments and the 10 block definitions in Airtable", "Draft the validation roadmap: psychometric review, IRB, and a pilot study", "List suggested SMEs, psychometricians, and test pairs for the validation roadmap", "Review your progress with Namratha, your Research Advisor", "Submit your deliverable using the form above"], deliverable: "A finalized assessment set plus a first-draft validation roadmap. For the assessments: fold in Namratha's feedback, lock every item to its final 1-5 Likert wording (both the formal and the user-facing version), and confirm each of the 10 blocks has its two definitions (clinical/academic and user-facing). For the validation roadmap, draft how we'll prove the assessments actually measure what they claim, in three parts. Psychometric review: the reliability and validity analyses to run (for example Cronbach's alpha or McDonald's omega for reliability; content, construct, and criterion validity; an exploratory factor analysis) and a target sample size. IRB: the review route that fits a study like this, the submission steps, consent, and a rough timeline. Pilot study: who takes part, how they're recruited, the procedure, the measures, and what success looks like. Finally, list the people to bring in: suggested SMEs and psychometricians with a short why for each, and candidate test pairs across all four relationship types. Due by Jul 13.", note: "New this week", noteLinks: [{ label: "Validation roadmap template", href: VALIDATION_DOC }, { label: "Airtable tabs", href: ASSESSMENTS_BASE }] },
  { n: 3, dates: "Jul 13 – 19", theme: "Blueprint the Curriculum", focus: ["Research how comparable relationship and SEL programs structure their curricula", "Outline the block-based curriculum: session count and structure", "Keep SME outreach moving as replies come in"], deliverable: "Block-based curriculum outline, mapped to the 10 blocks. Due by Jul 20.", skipped: true },
  { n: 4, dates: "Jul 20 – 26", theme: "Build the Curriculum", focus: ["Draft the curriculum sessions, mapped to the 10 blocks and to assessment scoring", "Confirm your test pairs and lock session dates"], deliverable: "Full curriculum draft, plus confirmed test pairs and dates. Due by Jul 27.", skipped: true },
  { n: 5, dates: "Jul 27 – Aug 2", theme: "Finish & Pitch", focus: ["Completed the validation roadmap in full: psychometric review, IRB plan, and pilot study design", "Finalized the SME/psychometrician and test-pair lists", "Built the social media marketing strategy deck: audience, channels, content pillars, and posting cadence", "Tied the strategy to waitlist growth and the launch funnel", "Reviewed your progress with Namratha, your Research Advisor", "Submitted your deliverables using the form above"], deliverable: "Two deliverables. (1) The complete validation roadmap, the full version this time: psychometric review, IRB plan, pilot study, plus the SME and test-pair lists. (2) A social media marketing strategy deck: audience, channels, content pillars, cadence, and how it feeds waitlist growth. Due by Aug 2." },
  { n: 6, dates: "Aug 3 – 8", theme: "Deliver", focus: ["Presented your validation roadmap and social media strategy to the team", "Folded in final feedback and polished both deliverables", "Produced 2-3 sample posts that bring the strategy to life", "Documented everything into a short handoff doc so it's pick-up-ready", "Had your final review with Madhuri and submitted your final work using the form above"], deliverable: "Final, presented versions of both deliverables, 2-3 sample posts, and a short handoff doc. Final review by Aug 8.", done: [0] },
];

// Week 0 = onboarding, already complete. Prepended to the journey to showcase
// the head start.
const WEEK0: Week = {
  n: 0,
  dates: "Jun 22 – 28",
  theme: "Lift Off",
  focus: [
    "Signed your contract",
    "Set up Gusto: direct deposit and I-9",
    "Met with Madhuri and Namratha to align on your deliverables",
  ],
};
const JOURNEY: Week[] = [WEEK0, ...WEEKS];

const CONTACTS = [
  { name: "Madhuri", role: "Co-Founder & CEO · your manager", contact: "madhuri@unraveleduniverse.com" },
  { name: "Namratha", role: "Research Advisor · 10 hrs total, use anytime", contact: "namratha.gujje@gmail.com" },
];

const TOOLS: { name: string; purpose: string; href?: string; tabs?: string[] }[] = [
  { name: "Shared drive", purpose: "Your intern folder", href: INTERN_FOLDER },
  {
    name: "Airtable",
    purpose: "Your data workspace",
    href: ASSESSMENTS_BASE,
    tabs: ["2020 Draft", "Romantic", "Platonic", "Familial", "Self", "Definitions", "Validation SMEs", "Test Pairs"],
  },
  { name: "Validation roadmap template", purpose: "Guidance for Week 2", href: VALIDATION_DOC },
  { name: "Gusto", purpose: "Payroll & timesheets", href: "https://app.gusto.com" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-[#e273ac]">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl text-white sm:text-[2.1rem]"
      style={{ fontFamily: "var(--font-instrument)" }}
    >
      {children}
    </h2>
  );
}

// Brand line-art padlock (matches the Unraveled mind-map locked aesthetic).
function LockGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export default function PranavPage() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Backdrop />

      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-6">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span
            className="text-[1.4rem] italic leading-none text-white"
            style={{ fontFamily: "var(--font-instrument)", letterSpacing: "0.02em" }}
          >
            Unraveled
          </span>
        </Link>
        <span className="text-sm text-white/70">Internship Roadmap</span>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-28">
        {/* WELCOME */}
        <section>
          <Eyebrow>R&amp;D Internship</Eyebrow>
          <h1
            className="mt-3 text-4xl leading-[1.05] text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            Welcome, Pranav.
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/85">
            This is your home base for the summer. It is your map: where you are,
            what is next, and what you are building toward. New focus each week,
            with deliverables due every Monday at your check-in with Madhuri.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-white/70">
            <span>{INTERN.title}</span>
            <span>{INTERN.dates}</span>
            <span>{INTERN.hours}</span>
          </div>

          {/* progress track: 7 bars: onboarding + 6 weeks */}
          <div className="glass mt-8 rounded-2xl p-5">
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">
              Your progress
            </p>
            <div className="mt-4 flex gap-1.5">
              {JOURNEY.map((w) => (
                <div
                  key={w.n}
                  className="h-2 flex-1 overflow-hidden rounded-full bg-white/12"
                >
                  {w.n < CURRENT_WEEK && !w.skipped && (
                    <div className="h-full w-full bg-gradient-to-r from-spectrum-1 to-spectrum-10" />
                  )}
                  {w.skipped && <div className="h-full w-full bg-white/20" />}
                  {w.n === CURRENT_WEEK && (
                    <div
                      className="h-full bg-[#e273ac]"
                      style={{ width: `${Math.max(8, Math.round(((w.done?.length ?? 0) / w.focus.length) * 100))}%` }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SUBMIT A DELIVERABLE — or the completion send-off once the internship ends */}
        <section className="mt-8">
          {INTERNSHIP_COMPLETE ? (
            <div className="rounded-2xl p-7 text-center glass ring-1 ring-[#e273ac]/40">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e273ac]">
                Internship complete
              </p>
              <h2 className="mt-2 text-2xl text-white sm:text-3xl" style={{ fontFamily: "var(--font-instrument)" }}>
                You did it, Pranav.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-white/85">
                Over six weeks you built the research and validation backbone Unraveled launches on:
                the refined assessments, the block definitions, the validation roadmap, and the
                marketing strategy. Thank you. June 29 to August 8, 2026.
              </p>
            </div>
          ) : (
            <DeliverableForm week={CURRENT_WEEK} folderUrl={INTERN_FOLDER} />
          )}
        </section>

        {/* JOURNEY */}
        <section className="mt-16">
          <Eyebrow>The road ahead</Eyebrow>
          <H2>Your journey</H2>
          <ol className="mt-8">
            {JOURNEY.map((w, i) => {
              const status = w.n < CURRENT_WEEK ? "complete" : w.n === CURRENT_WEEK ? "current" : "upcoming";
              const last = i === JOURNEY.length - 1;
              const locked = w.n > PUBLISHED_WEEK;
              const skipped = !!w.skipped;
              return (
                <li key={w.n} className="flex gap-5">
                  {/* node + connector */}
                  <div className="flex flex-col items-center">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-[15px] font-semibold ${
                        skipped
                          ? "border border-white/10 text-white/30"
                          : locked
                          ? "border border-white/15 text-white/35"
                          : status === "complete"
                            ? "bg-gradient-to-br from-spectrum-1 to-spectrum-10 text-white"
                            : status === "current"
                              ? "bg-[#1a1438] text-white ring-2 ring-[#e273ac] shadow-[0_0_22px_rgba(226,115,172,0.55)]"
                              : "border border-white/20 text-white/45"
                      }`}
                    >
                      {skipped ? "–" : locked ? <LockGlyph className="h-4 w-4" /> : status === "complete" ? "✓" : w.n}
                    </span>
                    {!last && (
                      <span
                        className={`my-1 w-px flex-1 ${
                          w.n < CURRENT_WEEK && !skipped
                            ? "bg-gradient-to-b from-spectrum-6 to-spectrum-10"
                            : "bg-white/12"
                        }`}
                      />
                    )}
                  </div>

                  {/* card */}
                  {skipped ? (
                    <div className="mb-7 flex-1 rounded-2xl glass opacity-55">
                      <div className="flex items-center gap-3 px-5 py-4">
                        <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">
                          Week {w.n} · {w.dates}
                        </span>
                        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                          Skipped
                        </span>
                      </div>
                      <div className="px-5 pb-5">
                        <h3 className="text-xl text-white/55" style={{ fontFamily: "var(--font-instrument)" }}>
                          {w.theme}
                        </h3>
                        <p className="mt-1 text-[13px] text-white/40">Not worked this cycle.</p>
                      </div>
                    </div>
                  ) : locked ? (
                    <div className="mb-7 flex-1 rounded-2xl glass opacity-70">
                      <div className="flex items-center gap-3 px-5 py-4">
                        <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/40">
                          Week {w.n} · {w.dates}
                        </span>
                        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/55">
                          <LockGlyph className="h-3 w-3" /> Locked
                        </span>
                      </div>
                      <div className="space-y-2 px-5 pb-5">
                        <div className="h-2.5 w-2/5 rounded-full bg-white/10 blur-[1.5px]" />
                        <div className="h-2.5 w-3/5 rounded-full bg-white/[0.07] blur-[1.5px]" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`mb-7 flex-1 rounded-2xl p-5 glass ${status === "current" ? "ring-1 ring-[#e273ac]/40" : ""}`}
                    >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">
                        Week {w.n} · {w.dates}
                      </span>
                      {status === "current" && (
                        <span className="rounded-full bg-[#e273ac]/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#e273ac]">
                          You are here
                        </span>
                      )}
                      {status === "complete" && (
                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/70">
                          Complete
                        </span>
                      )}
                    </div>
                    <h3
                      className="mt-1.5 text-2xl text-white"
                      style={{ fontFamily: "var(--font-instrument)" }}
                    >
                      {w.theme}
                    </h3>
                    <ul className="mt-3 space-y-1.5">
                      {w.focus.map((f, fi) => {
                        const itemDone = status === "complete" || !!w.done?.includes(fi);
                        return (
                          <li key={f} className="flex gap-2.5 text-[14px] leading-relaxed text-white/80">
                            {itemDone ? (
                              <span className="shrink-0 text-[13px] font-semibold leading-relaxed text-spectrum">✓</span>
                            ) : (
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-spectrum" />
                            )}
                            <span className={itemDone && status === "current" ? "text-white/50 line-through" : undefined}>{f}</span>
                          </li>
                        );
                      })}
                    </ul>
                    {w.moreLocked && (
                      <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                          <LockGlyph className="h-3 w-3" /> More unlocks soon
                        </div>
                        <div className="h-2.5 w-2/5 rounded-full bg-white/10 blur-[1.5px]" />
                        <div className="h-2.5 w-3/5 rounded-full bg-white/[0.07] blur-[1.5px]" />
                      </div>
                    )}
                    {w.note && (
                      <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">{w.note}</span>
                        {w.noteLinks?.map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13px] text-spectrum hover:underline"
                          >
                            {l.label} &rarr;
                          </a>
                        ))}
                      </div>
                    )}
                    {w.deliverable && (
                      <p className="mt-4 rounded-xl border border-[#e273ac]/30 bg-[#e273ac]/10 px-3.5 py-2.5 text-[13.5px] text-white/90">
                        <span className="font-semibold text-[#e273ac]">Deliverable · </span>
                        {w.deliverable}
                      </p>
                    )}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        {/* REFERENCE: contacts + tools */}
        <section className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <Eyebrow>Your people</Eyebrow>
            <h2 className="mt-2 text-xl text-white" style={{ fontFamily: "var(--font-instrument)" }}>
              Key contacts
            </h2>
            <ul className="mt-4 space-y-3">
              {CONTACTS.map((c) => (
                <li key={c.name} className="glass rounded-xl p-4">
                  <p className="text-[15px] text-white">{c.name}</p>
                  <p className="text-[13px] text-white/70">{c.role}</p>
                  {c.contact && (
                    <a href={`mailto:${c.contact}`} className="text-[13px] text-spectrum hover:underline">
                      {c.contact}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Your toolkit</Eyebrow>
            <h2 className="mt-2 text-xl text-white" style={{ fontFamily: "var(--font-instrument)" }}>
              Tools
            </h2>
            <ul className="mt-4 space-y-3">
              {TOOLS.map((t) =>
                t.href ? (
                  <li key={t.name}>
                    <a
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block glass rounded-xl p-4 transition-colors hover:bg-white/[0.08]"
                    >
                      <p className="text-[15px] text-white">{t.name}</p>
                      <p className="text-[13px] text-white/70">{t.purpose}</p>
                      {t.tabs && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {t.tabs.map((tab) => (
                            <span
                              key={tab}
                              className="rounded-md bg-white/[0.07] px-2 py-0.5 text-[11px] text-white/60"
                            >
                              {tab}
                            </span>
                          ))}
                        </div>
                      )}
                    </a>
                  </li>
                ) : (
                  <li key={t.name} className="glass rounded-xl p-4">
                    <p className="text-[15px] text-white">{t.name}</p>
                    <p className="text-[13px] text-white/70">{t.purpose}</p>
                  </li>
                )
              )}
            </ul>
          </div>
        </section>

        {/* ABOUT: the bigger picture (at the end) */}
        <section className="mt-16">
          <Eyebrow>The bigger picture</Eyebrow>
          <H2>About Unraveled</H2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85">
            Unraveled teaches the relationship skills no one is taught, and makes
            building healthy relationships of every kind something anyone can
            practice, measure, and improve. The product is a free app plus
            in-person cohorts and events, all built on one shared framework.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85">
            That framework is <span className="text-white">10 universal building blocks</span> that
            apply to every relationship (Romantic, Platonic, Familial, and Self):
            Safety, Trust, Respect, Freedom, Honesty, Communication, Understanding,
            Conflict Resolution, Boundaries, and Compatibility, arranged in a
            4-3-2-1 pyramid.
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/85">
            Right now we are in Bootcamp Phase 2 of the Future Founders program.
            Your summer of work is building the research and validation
            infrastructure the product launches with. It matters.
          </p>
        </section>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />
        <p className="mt-6 text-[13px] text-white/60">
          Unraveled · Internship roadmap for Pranav Eppanapally
        </p>
      </main>
    </div>
  );
}
