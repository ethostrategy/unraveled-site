import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";

/**
 * HQ Board — the founders' weekly plan, modeled on the intern roadmap.
 * Each week has a theme, a short bounded focus list per founder, and one
 * deliverable per founder (the "done for the week" line). The point is edges:
 * when the deliverable is met, the week counts as a win — anything beyond it
 * is optional, not owed.
 *
 * TO ADVANCE: bump CURRENT_WEEK as the weeks pass. Draft content — populate
 * with your real weekly targets and Will's split.
 */

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

const HQ = "/hq-a3f9k2x7";
const CURRENT_WEEK = 1; // which week is now; earlier weeks show complete, later ones muted

const PINK = "#e273ac";

type Person = { focus: string[]; deliverable: string; done?: number[] };
type Week = { n: number; dates: string; theme: string; madhuri: Person; will: Person };

const WEEKS: Week[] = [
  {
    n: 0,
    dates: "Jul 6 – 12",
    theme: "Set the base",
    madhuri: {
      focus: ["LLC filed", "Summer intern hired + started", "Instagram account claimed"],
      deliverable: "Entity live and the intern onboarded.",
      done: [0, 1, 2],
    },
    will: {
      focus: ["Between Us: lock the concept + the 7-pack structure"],
      deliverable: "Card-game concept doc agreed.",
      done: [0],
    },
  },
  {
    n: 1,
    dates: "Jul 13 – 19",
    theme: "Foundation",
    madhuri: {
      focus: [
        "Draft the Foundation layer: Safety, Trust, Respect, Freedom",
        "Kick off the intern + assign their first block-research task",
        "Instagram live: bio + 3 posts",
        "Draft the Dr. Burke intro message to your UC Davis friend (don't send yet)",
      ],
      deliverable: "Foundation layer written, intern working, IG live. Then close the laptop.",
    },
    will: {
      focus: ["Between Us: outline the standard pack", "Scope the App V1 build plan (what you'll build first)"],
      deliverable: "Standard-pack outline + a one-page V1 build plan.",
    },
  },
  {
    n: 2,
    dates: "Jul 20 – 26",
    theme: "In relation",
    madhuri: {
      focus: ["Draft the In-Relation layer: Honesty, Communication, Understanding", "Send the Dr. Burke intro ask via the UC Davis friend"],
      deliverable: "In-Relation layer drafted; the intro is in motion.",
    },
    will: {
      focus: ["Between Us: draft the first sibling pack", "Start the App V1 scaffold"],
      deliverable: "One sibling pack drafted; V1 repo scaffolded.",
    },
  },
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

function PersonColumn({ name, p, complete }: { name: string; p: Person; complete: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{name}</div>
      <ul className="mt-2.5 space-y-1.5">
        {p.focus.map((f, fi) => {
          const itemDone = complete || !!p.done?.includes(fi);
          return (
            <li key={f} className="flex gap-2.5 text-[13.5px] leading-relaxed text-white/80">
              {itemDone ? (
                <span className="shrink-0 text-[12px] font-semibold" style={{ color: PINK }}>✓</span>
              ) : (
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: PINK }} />
              )}
              <span className={itemDone && !complete ? "text-white/45 line-through" : undefined}>{f}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3.5 rounded-xl border px-3 py-2.5 text-[12.5px] leading-snug text-white/90" style={{ borderColor: `${PINK}4d`, background: `${PINK}14` }}>
        <span className="font-semibold" style={{ color: PINK }}>Done when · </span>
        {p.deliverable}
      </p>
    </div>
  );
}

export default function HQBoard() {
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
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-medium text-white">This week</span>
          <span className="rounded-full border border-white/10 px-3.5 py-1 text-white/40">Docs · soon</span>
        </div>

        <p className="mt-6 max-w-2xl text-[14px] text-white/55">
          The week is a win when each Done-when line is met. Everything past it is optional, not owed.
        </p>

        {/* weekly journey */}
        <ol className="mt-10">
          {WEEKS.map((w, i) => {
            const status = w.n < CURRENT_WEEK ? "complete" : w.n === CURRENT_WEEK ? "current" : "upcoming";
            const last = i === WEEKS.length - 1;
            return (
              <li key={w.n} className="flex gap-5">
                {/* node + connector */}
                <div className="flex flex-col items-center">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[14px] font-semibold"
                    style={
                      status === "current"
                        ? { background: "#1a1438", color: "#fff", boxShadow: `0 0 20px ${PINK}88`, border: `2px solid ${PINK}` }
                        : status === "complete"
                          ? { background: `${PINK}2e`, color: "#fff", border: `1px solid ${PINK}80` }
                          : { border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.4)" }
                    }
                  >
                    {status === "complete" ? "✓" : w.n}
                  </span>
                  {!last && <span className="my-1 w-px flex-1 bg-white/12" />}
                </div>

                {/* week card */}
                <div
                  className={`mb-7 flex-1 rounded-2xl border bg-white/[0.02] p-5 ${status === "upcoming" ? "opacity-70" : ""}`}
                  style={{ borderColor: status === "current" ? `${PINK}55` : "rgba(255,255,255,0.09)" }}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">Week {w.n} · {w.dates}</span>
                    {status === "current" && (
                      <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide" style={{ background: `${PINK}33`, color: PINK }}>This week</span>
                    )}
                    {status === "complete" && (
                      <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/70">Complete</span>
                    )}
                  </div>
                  <h3 className="mt-1.5 text-2xl text-white" style={{ fontFamily: "var(--font-instrument)" }}>{w.theme}</h3>

                  <div className="mt-4 grid gap-6 sm:grid-cols-2">
                    <PersonColumn name="Madhuri" p={w.madhuri} complete={status === "complete"} />
                    <PersonColumn name="Will" p={w.will} complete={status === "complete"} />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-4 text-[11px] text-white/35">Draft content — populate with your real weekly focus + Will's split. Hardcoded for now; can be made editable (Airtable-backed) next.</p>
      </div>
    </main>
  );
}
