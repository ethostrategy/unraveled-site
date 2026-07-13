"use client";

import { useState } from "react";

const PINK = "#e273ac";
const CURRENT_WEEK = 1; // earlier weeks show complete, later ones preview

// Playbook-style step: a bold action title + short detail, tagged with the
// roadmap milestone it advances (ms).
type Item = { title: string; detail: string; ms: string };
type Person = { focus: Item[]; deliverable: string; done?: number[] };
type Week = { n: number; dates: string; madhuri: Person; will: Person };

// Draft content — populate with your real weekly focus + Will's split.
const WEEKS: Week[] = [
  {
    n: 0,
    dates: "Jul 1 – 11",
    madhuri: {
      focus: [
        { title: "File the LLC", detail: "Unraveled LLC formed (Jul 2).", ms: "LLC registered" },
        { title: "Claim Instagram", detail: "Handle secured.", ms: "Instagram" },
      ],
      deliverable: "Entity live; socials claimed.",
      done: [0, 1],
    },
    will: {
      focus: [{ title: "Lock the Between Us concept", detail: "The 7-pack structure agreed.", ms: "Card game MVP" }],
      deliverable: "Card-game concept agreed.",
      done: [0],
    },
  },
  {
    n: 1,
    dates: "Jul 13 – 17",
    madhuri: {
      focus: [
        { title: "Draft the Foundation layer", detail: "Safety, Trust, Respect, Freedom, written into the doc.", ms: "V1 drafted" },
        { title: "Kick off the intern", detail: "Onboard + assign their first block-research task.", ms: "V1 drafted" },
        { title: "Go live on Instagram", detail: "Bio + 3 posts up.", ms: "Instagram" },
        { title: "Draft the Dr. Burke ask", detail: "The intro message to your UC Davis friend — don't send yet.", ms: "Reviewed by Dr. Burke" },
      ],
      deliverable: "Foundation layer written, intern working, IG live. Then close the laptop.",
    },
    will: {
      focus: [
        { title: "Outline the standard pack", detail: "Between Us — the core deck.", ms: "Card game MVP" },
        { title: "Scope App V1", detail: "A one-page build plan: what to build first.", ms: "App V1" },
      ],
      deliverable: "Standard-pack outline + a one-page V1 build plan.",
    },
  },
  {
    n: 2,
    dates: "Jul 20 – 24",
    madhuri: {
      focus: [
        { title: "Draft the In-Relation layer", detail: "Honesty, Communication, Understanding.", ms: "V1 drafted" },
        { title: "Send the Dr. Burke ask", detail: "Via the UC Davis friend.", ms: "Reviewed by Dr. Burke" },
      ],
      deliverable: "In-Relation layer drafted; the intro is in motion.",
    },
    will: {
      focus: [
        { title: "Draft the first sibling pack", detail: "Between Us.", ms: "Card game MVP" },
        { title: "Start the V1 scaffold", detail: "The app repo + skeleton.", ms: "App V1" },
      ],
      deliverable: "One sibling pack drafted; V1 repo scaffolded.",
    },
  },
];

function PersonColumn({ name, p, complete }: { name: string; p: Person; complete: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{name}</div>
      <ul className="mt-3 space-y-3">
        {p.focus.map((f, fi) => {
          const itemDone = complete || !!p.done?.includes(fi);
          return (
            <li key={f.title} className="flex gap-2.5">
              {itemDone ? (
                <span className="mt-0.5 shrink-0 text-[12px] font-semibold" style={{ color: PINK }}>✓</span>
              ) : (
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: PINK }} />
              )}
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className={`text-[13.5px] font-semibold ${itemDone && !complete ? "text-white/40 line-through" : "text-white/90"}`}>{f.title}</span>
                  <span className="text-[10px] text-white/30">&rarr; {f.ms}</span>
                </div>
                <p className="text-[12px] leading-snug text-white/55">{f.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 rounded-xl border px-3 py-2.5 text-[12.5px] leading-snug text-white/90" style={{ borderColor: `${PINK}4d`, background: `${PINK}14` }}>
        <span className="font-semibold" style={{ color: PINK }}>Done when · </span>
        {p.deliverable}
      </p>
    </div>
  );
}

export default function WeeklyPlan() {
  const [open, setOpen] = useState<Set<number>>(new Set([CURRENT_WEEK]));
  const toggle = (n: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });

  return (
    <ol className="mt-8">
      {WEEKS.map((w, i) => {
        const status = w.n < CURRENT_WEEK ? "complete" : w.n === CURRENT_WEEK ? "current" : "upcoming";
        const last = i === WEEKS.length - 1;
        const isOpen = open.has(w.n);
        return (
          <li key={w.n} className="flex gap-5">
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

            <div
              className={`mb-5 flex-1 rounded-2xl border bg-white/[0.02] ${status === "upcoming" ? "opacity-80" : ""}`}
              style={{ borderColor: status === "current" ? `${PINK}55` : "rgba(255,255,255,0.09)" }}
            >
              <button
                type="button"
                onClick={() => toggle(w.n)}
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-white/[0.02]"
              >
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">Week {w.n} · {w.dates}</span>
                {status === "current" && (
                  <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide" style={{ background: `${PINK}33`, color: PINK }}>Now</span>
                )}
                <span className={`ml-auto text-[11px] text-white/40 transition-transform ${isOpen ? "rotate-90" : ""}`}>&#9656;</span>
              </button>
              {isOpen && (
                <div className="grid gap-6 px-5 pb-5 sm:grid-cols-2">
                  <PersonColumn name="Madhuri" p={w.madhuri} complete={status === "complete"} />
                  <PersonColumn name="Will" p={w.will} complete={status === "complete"} />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
