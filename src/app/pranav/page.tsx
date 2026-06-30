import type { Metadata } from "next";
import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import { LogoMark } from "@/components/Logo";

/**
 * Pranav's internship roadmap: a private, game-style progress page.
 * Hidden: noindex + robots-disallowed (/pranav) + unlinked. Share the URL with
 * him directly.
 *
 * TO UPDATE HIS PROGRESS: change CURRENT_WEEK (1-6) as he advances, and bump
 * DAY1_DONE as he checks off onboarding steps. Everything else is static.
 * (Can be wired to Airtable later for self-serve updates, like /village.)
 */

export const metadata: Metadata = {
  title: "Pranav · Internship Roadmap",
  robots: { index: false, follow: false },
};

// ───────────────────────────────── PROGRESS KNOBS ─────────────────────────────
const CURRENT_WEEK = 1; // which week he's on (1-6)
const DAY1_DONE = 7; // how many Day 1 steps are complete (0-7)
// ───────────────────────────────────────────────────────────────────────────────

const INTERN = {
  name: "Pranav Eppanapally",
  title: "Research & Development Intern",
  dates: "June 29 – August 8, 2026",
  hours: "~15 hrs/week · remote & flexible",
  cadence: "Check-in every Monday with Madhuri",
};

const DAY1 = [
  "Accept your Gusto invite (payroll)",
  "Accept your Google Workspace invite (unraveleduniverse.com)",
  "Accept your Asana invite (task tracking)",
  "Schedule your weekly Monday check-in with Madhuri",
  "Read this roadmap top to bottom",
  "Read the Unraveled Framework overview",
  "Start your Week 1 assignment",
];

type Week = { n: number; dates: string; theme: string; focus: string[]; deliverable?: string };

const WEEKS: Week[] = [
  { n: 1, dates: "Jun 29 – Jul 4", theme: "Get Grounded", focus: ["Onboard and set up your tools", "Deep-read the Unraveled Framework and the assessments"], deliverable: "Present your assessment model to Madhuri by Jul 6" },
  { n: 2, dates: "Jul 7 – 11", theme: "Build the Blueprint", focus: ["Incorporate feedback", "Research scoring logic and psychometric approaches", "Propose a methodology for each block metric"] },
  { n: 3, dates: "Jul 14 – 18", theme: "Find Your Experts", focus: ["Finalize your SME target list (Berkeley network first)", "Draft and send approved outreach", "Begin IRB prep"] },
  { n: 4, dates: "Jul 21 – 25", theme: "Build Your Cohort", focus: ["Recruit focus-group participants", "Build the participant tracker", "Prepare discussion guides", "Confirm session dates"] },
  { n: 5, dates: "Jul 28 – Aug 1", theme: "In the Field", focus: ["Facilitate the focus-group sessions", "Compile notes and summaries", "Begin the curriculum outline draft"] },
  { n: 6, dates: "Aug 4 – 8", theme: "Deliver", focus: ["Finalize all deliverables", "Final review with Madhuri by August 8"] },
];

// Week 0 = onboarding, already complete. Prepended to the journey to showcase
// the head start; the progress track + "of 6" count still use the 6 main weeks.
const WEEK0: Week = {
  n: 0,
  dates: "Jun 29",
  theme: "Lift Off",
  focus: [
    "Accepted your Gusto, Google Workspace, and Asana invites",
    "Scheduled your weekly Monday check-in with Madhuri",
    "Read the roadmap and the Unraveled Framework overview",
  ],
};
const JOURNEY: Week[] = [WEEK0, ...WEEKS];

const STREAMS = [
  { name: "Assessment Refinement", desc: "Sharpen the actor- and partner-perspective assessments across all four relationship types, and propose scoring methodology for each block." },
  { name: "Expert Engagement", desc: "Build a target list of psychometricians and advisors, run outreach, and help prep the IRB submission and pre-registration." },
  { name: "Focus Group Recruitment", desc: "Recruit Gen Z adults (18+), keep a participant tracker, prepare guides, and facilitate sessions." },
  { name: "Curriculum Framework", desc: "Research comparable curricula and draft an outline mapped to the 10 blocks, tied to assessment scoring so improvement is measurable." },
];

const DELIVERABLES = [
  "Revised assessment draft with proposed scoring methodology",
  "SME outreach tracker with all feedback documented",
  "Focus-group participant list and session summaries",
  "Curriculum outline draft",
];

const CONTACTS = [
  { name: "Madhuri Gujje", role: "Co-Founder & CEO · your manager", contact: "madhuri@unraveleduniverse.com" },
  { name: "Namratha Gujje", role: "Research Advisor · 1 hr/week", contact: "" },
];

const TOOLS = [
  { name: "Google Workspace", purpose: "Docs, Drive, email" },
  { name: "Asana", purpose: "Tasks & project tracking" },
  { name: "Gusto", purpose: "Payroll" },
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

export default function PranavPage() {
  const completed = Math.max(0, Math.min(WEEKS.length, CURRENT_WEEK - 1));

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
            what is next, and what you are building toward. It updates as you go.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-white/70">
            <span>{INTERN.title}</span>
            <span>{INTERN.dates}</span>
            <span>{INTERN.hours}</span>
          </div>

          {/* progress track */}
          <div className="glass mt-8 rounded-2xl p-5">
            <div className="flex items-baseline justify-between">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Your progress
              </p>
              <p className="text-[14px] text-white/85">
                Week {CURRENT_WEEK} of {WEEKS.length}
              </p>
            </div>
            <div className="mt-4 flex gap-1.5">
              {WEEKS.map((w) => (
                <div
                  key={w.n}
                  className={`h-2 flex-1 rounded-full ${
                    w.n < CURRENT_WEEK
                      ? "bg-gradient-to-r from-spectrum-1 to-spectrum-10"
                      : w.n === CURRENT_WEEK
                        ? "bg-[#e273ac]"
                        : "bg-white/12"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* DAY 1 CHECKLIST */}
        <section className="mt-16">
          <Eyebrow>First things first</Eyebrow>
          <H2>Day 1: get set up</H2>
          <ul className="mt-6 space-y-2.5">
            {DAY1.map((item, i) => {
              const done = i < DAY1_DONE;
              return (
                <li key={item} className="glass flex items-center gap-3 rounded-xl px-4 py-3">
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[13px] ${
                      done
                        ? "bg-gradient-to-br from-spectrum-1 to-spectrum-10 text-white"
                        : "border border-white/25 text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span className={`text-[15px] ${done ? "text-white/55 line-through" : "text-white/90"}`}>
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* 6-WEEK JOURNEY */}
        <section className="mt-16">
          <Eyebrow>The road ahead</Eyebrow>
          <H2>Your 6-week journey</H2>
          <ol className="mt-8">
            {JOURNEY.map((w, i) => {
              const status = w.n < CURRENT_WEEK ? "complete" : w.n === CURRENT_WEEK ? "current" : "upcoming";
              const last = i === JOURNEY.length - 1;
              return (
                <li key={w.n} className="flex gap-5">
                  {/* node + connector */}
                  <div className="flex flex-col items-center">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-[15px] font-semibold ${
                        status === "complete"
                          ? "bg-gradient-to-br from-spectrum-1 to-spectrum-10 text-white"
                          : status === "current"
                            ? "bg-[#1a1438] text-white ring-2 ring-[#e273ac] shadow-[0_0_22px_rgba(226,115,172,0.55)]"
                            : "border border-white/20 text-white/45"
                      }`}
                    >
                      {status === "complete" ? "✓" : w.n}
                    </span>
                    {!last && (
                      <span
                        className={`my-1 w-px flex-1 ${
                          w.n < CURRENT_WEEK
                            ? "bg-gradient-to-b from-spectrum-6 to-spectrum-10"
                            : "bg-white/12"
                        }`}
                      />
                    )}
                  </div>

                  {/* card */}
                  <div
                    className={`mb-7 flex-1 rounded-2xl p-5 ${
                      status === "upcoming" ? "glass opacity-60" : "glass"
                    } ${status === "current" ? "ring-1 ring-[#e273ac]/40" : ""}`}
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
                      {w.focus.map((f) => (
                        <li key={f} className="flex gap-2.5 text-[14px] leading-relaxed text-white/80">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-spectrum" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    {w.deliverable && (
                      <p className="mt-4 rounded-xl border border-[#e273ac]/30 bg-[#e273ac]/10 px-3.5 py-2.5 text-[13.5px] text-white/90">
                        <span className="font-semibold text-[#e273ac]">Deliverable · </span>
                        {w.deliverable}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* WORK STREAMS */}
        <section className="mt-10">
          <Eyebrow>What you own</Eyebrow>
          <H2>Your work streams</H2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {STREAMS.map((s, i) => (
              <div key={s.name} className="glass rounded-2xl p-5">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[13px] font-semibold text-spectrum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="text-[1.25rem] text-white"
                    style={{ fontFamily: "var(--font-instrument)" }}
                  >
                    {s.name}
                  </h3>
                </div>
                <p className="mt-2 text-[14px] leading-relaxed text-white/80">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL DELIVERABLES */}
        <section className="mt-16">
          <Eyebrow>The finish line</Eyebrow>
          <H2>Final deliverables, due Aug 8</H2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {DELIVERABLES.map((d) => (
              <li key={d} className="glass flex gap-3 rounded-xl p-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-spectrum-1 to-spectrum-10" />
                <span className="text-[14.5px] leading-relaxed text-white/85">{d}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* REFERENCE: contacts + tools */}
        <section className="mt-16 grid gap-8 sm:grid-cols-2">
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
              {TOOLS.map((t) => (
                <li key={t.name} className="glass rounded-xl p-4">
                  <p className="text-[15px] text-white">{t.name}</p>
                  <p className="text-[13px] text-white/70">{t.purpose}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ABOUT */}
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
