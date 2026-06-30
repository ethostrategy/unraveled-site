import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import Backdrop from "@/components/Backdrop";
import { LogoMark } from "@/components/Logo";
import DeliverableForm from "@/components/DeliverableForm";
import PranavGate from "@/components/PranavGate";
import { PRANAV_COOKIE, expectedToken, isConfigured } from "@/lib/pranavAuth";

/**
 * Pranav's internship roadmap: a private, game-style progress page.
 * Protected: unguessable URL slug + noindex + a password gate (PRANAV_PASSWORD,
 * checked server-side via /api/pranav-auth) + unlinked. The slug is deliberately
 * NOT in robots.txt so it isn't leaked publicly. Share the URL + password with
 * him directly.
 *
 * TO UPDATE HIS PROGRESS: change CURRENT_WEEK (0-6) as he advances. Week 0 is
 * onboarding (already complete). Everything else is static.
 * (Can be wired to Airtable later for self-serve updates, like /village.)
 */

export const metadata: Metadata = {
  title: "Pranav · Internship Roadmap",
  robots: { index: false, follow: false },
};

// ───────────────────────────────── PROGRESS KNOB ──────────────────────────────
const CURRENT_WEEK = 1; // which week he's on (1-6). Week 0 = onboarding, done.
// ───────────────────────────────────────────────────────────────────────────────

// His internship folder (Google Workspace Drive). Used by the deliverable form.
const INTERN_FOLDER = "https://drive.google.com/drive/folders/1cBCs2AAevYr8JO3mM6nW4jbw93FsVd9s?usp=sharing";

const INTERN = {
  title: "Research & Development Intern",
  dates: "June 29 – August 8, 2026",
  hours: "~20 hrs/week · remote & flexible",
};

type Week = { n: number; dates: string; theme: string; focus: string[]; deliverable?: string };

const WEEKS: Week[] = [
  { n: 1, dates: "Jun 29 – Jul 4", theme: "Get Grounded", focus: ["Log in here and bookmark this page", "Set up your pranav@unraveleduniverse.com email and explore Google Workspace", "Read the Workplace Rights PDF and bookmark the Unraveled roadmap PDF", "RSVP to every weekly intern check-in, and reach out to reschedule any you cannot make", "Review the 2020 assessment drafts"], deliverable: "Refine the assessment language per Madhuri's guidance so it resonates with Gen Z, and is academically publishable and clinically testable. Create a user-facing version too if warranted. Due Jul 6." },
  { n: 2, dates: "Jul 7 – 11", theme: "Lock It In", focus: ["Finalize the assessments, incorporating Madhuri's feedback", "Draft the validation roadmap: psychometric review, IRB, and pilot study", "Build your SME list and send the first outreach to psychometricians (ongoing from here)", "Begin lining up test pairs across the four relationship types (ongoing from here)"], deliverable: "Finalized assessments and a validation roadmap. Due Jul 13." },
  { n: 3, dates: "Jul 14 – 18", theme: "Blueprint the Curriculum", focus: ["Research how comparable relationship and SEL programs structure their curricula", "Outline the block-based curriculum: session count and structure", "Keep SME outreach moving as replies come in"], deliverable: "Block-based curriculum outline, mapped to the 10 blocks. Due Jul 20." },
  { n: 4, dates: "Jul 21 – 25", theme: "Build the Curriculum", focus: ["Draft the curriculum sessions, mapped to the 10 blocks and to assessment scoring", "Confirm your test pairs and lock session dates"], deliverable: "Full curriculum draft, plus confirmed test pairs and dates. Due Jul 27." },
  { n: 5, dates: "Jul 28 – Aug 1", theme: "Test on Pairs", focus: ["Run the first pair sessions (Romantic, Platonic, Familial; Self as a solo reflection)", "Fold what you learn back into the curriculum and assessments"], deliverable: "First pair-test sessions run, with notes and synthesized feedback. Due Aug 3." },
  { n: 6, dates: "Aug 4 – 8", theme: "Deliver", focus: ["Finalize the curriculum and assessments", "Compile pair-test and SME feedback", "Final review with Madhuri"], deliverable: "Final curriculum, assessments, and a feedback wrap-up. Final review by Aug 8." },
];

// Week 0 = onboarding, already complete. Prepended to the journey to showcase
// the head start.
const WEEK0: Week = {
  n: 0,
  dates: "Jun 29",
  theme: "Lift Off",
  focus: [
    "Signed your contract",
    "Set up Gusto: direct deposit and I-9",
    "Met with Madhuri and Namratha to align on your deliverables",
  ],
};
const JOURNEY: Week[] = [WEEK0, ...WEEKS];

const STREAMS = [
  { name: "Assessment Refinement", desc: "Sharpen the dual-perspective assessments across all four relationship types, and propose scoring methodology for each block." },
  { name: "Expert Engagement", desc: "Build a target list of psychometricians and advisors, run outreach, and help prep the IRB submission and pre-registration." },
  { name: "Focus Group Recruitment", desc: "Recruit Gen Z adults (18+), keep a participant tracker, prepare guides, and facilitate sessions." },
  { name: "Curriculum Framework", desc: "Research comparable curricula and draft an outline mapped to the 10 blocks, tied to assessment scoring so improvement is measurable." },
];

const CONTACTS = [
  { name: "Madhuri Gujje", role: "Co-Founder & CEO · your manager", contact: "madhuri@unraveleduniverse.com" },
  { name: "Namratha Gujje", role: "Research Advisor · 1 hr/week", contact: "namratha.gujje@gmail.com" },
];

const TOOLS = [
  { name: "Google Workspace", purpose: "Docs, Drive, email" },
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

export default async function PranavPage() {
  // Password gate: render the gate unless a valid cookie is present. In local
  // dev with no password configured, stay open so the page is previewable.
  const jar = await cookies();
  const authed = isConfigured() && jar.get(PRANAV_COOKIE)?.value === expectedToken();
  const devOpen = process.env.NODE_ENV !== "production" && !isConfigured();
  if (!authed && !devOpen) return <PranavGate />;

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

        {/* SUBMIT A DELIVERABLE */}
        <section className="mt-8">
          <DeliverableForm week={CURRENT_WEEK} folderUrl={INTERN_FOLDER} />
        </section>

        {/* WORK STREAMS: set the stage: what you own */}
        <section className="mt-16">
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

        {/* JOURNEY */}
        <section className="mt-16">
          <Eyebrow>The road ahead</Eyebrow>
          <H2>Your journey</H2>
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
                    className={`mb-7 flex-1 rounded-2xl p-5 glass ${
                      status === "upcoming" ? "opacity-60" : ""
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
              {TOOLS.map((t) => (
                <li key={t.name} className="glass rounded-xl p-4">
                  <p className="text-[15px] text-white">{t.name}</p>
                  <p className="text-[13px] text-white/70">{t.purpose}</p>
                </li>
              ))}
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
