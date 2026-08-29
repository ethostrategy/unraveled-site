"use client";

import { useEffect, useState } from "react";

const PINK = "#e273ac";

// One row per focus item, as returned by /api/hq-weeks (Airtable-backed).
type FlatItem = {
  id: string;
  title: string;
  week: number;
  dates: string;
  person: string;
  detail: string;
  milestone: string;
  deliverable: string;
  done: boolean;
  order: number;
  links: { label: string; href: string }[];
};

type Item = { id: string; title: string; detail: string; ms: string; done: boolean; links: { label: string; href: string }[]; carried?: boolean };
type Person = { focus: Item[]; deliverable: string };
type Week = { n: number; dates: string; madhuri: Person; will: Person };

// Group the flat rows into weeks + per-founder lanes. The lane's deliverable is
// the first non-empty Deliverable among its rows (filled once per lane in Airtable).
function buildWeeks(items: FlatItem[]): Week[] {
  const byWeek = new Map<number, FlatItem[]>();
  for (const it of items) {
    const rows = byWeek.get(it.week);
    if (rows) rows.push(it);
    else byWeek.set(it.week, [it]);
  }
  const lane = (rows: FlatItem[], person: string): Person => {
    const mine = rows.filter((r) => r.person === person).sort((a, b) => a.order - b.order);
    return {
      focus: mine.map((r) => ({ id: r.id, title: r.title, detail: r.detail, ms: r.milestone, done: r.done, links: r.links })),
      deliverable: mine.find((r) => r.deliverable)?.deliverable ?? "",
    };
  };
  return [...byWeek.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([n, rows]) => ({
      n,
      dates: rows.find((r) => r.dates)?.dates ?? "",
      madhuri: lane(rows, "Madhuri"),
      will: lane(rows, "Will"),
    }));
}

// A week is complete when every focus item across both lanes is done. The
// current week is the earliest incomplete one — so checking a week's items off
// in Airtable auto-advances "Now" to the next week.
const isComplete = (w: Week): boolean => {
  const all = [...w.madhuri.focus, ...w.will.focus];
  return all.length > 0 && all.every((i) => i.done);
};

const MONTHS: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
function weekStart(dates: string, year: number): Date | null {
  const m = dates.match(/([A-Za-z]{3})\s+(\d{1,2})/);
  if (!m) return null;
  const mo = MONTHS[m[1] as keyof typeof MONTHS];
  if (mo === undefined) return null;
  return new Date(year, mo, parseInt(m[2], 10));
}
// The current week is the latest one whose start date is on/before today (falls back
// to the earliest incomplete week if dates can't be parsed). Keeps "Now" tied to the
// calendar, not to whether the prior week's tasks got checked off.
function currentWeekIdx(weeks: Week[]): number {
  const now = new Date();
  let idx = -1;
  weeks.forEach((w, i) => {
    const s = weekStart(w.dates, now.getFullYear());
    if (s && s.getTime() <= now.getTime()) idx = i;
  });
  if (idx !== -1) return idx;
  const inc = weeks.findIndex((w) => !isComplete(w));
  return inc === -1 ? Math.max(0, weeks.length - 1) : inc;
}

// Past weeks read as a record of what got done: render a completed week's task
// titles in past tense by swapping the leading imperative verb. Unknown leading
// words (noun-phrase titles like "1:1 with Chris") are left untouched.
const PAST_TENSE: Record<string, string> = {
  build: "Built", rebuild: "Rebuilt", set: "Set", make: "Made", create: "Created",
  add: "Added", update: "Updated", write: "Wrote", draft: "Drafted", finalize: "Finalized",
  refine: "Refined", review: "Reviewed", design: "Designed", present: "Presented",
  submit: "Submitted", send: "Sent", sign: "Signed", mail: "Mailed", order: "Ordered",
  ship: "Shipped", decide: "Decided", pick: "Picked", choose: "Chose", lock: "Locked",
  launch: "Launched", approve: "Approved", connect: "Connected", reach: "Reached",
  run: "Ran", scope: "Scoped", research: "Researched", plan: "Planned", map: "Mapped",
  film: "Filmed", post: "Posted", play: "Played", draw: "Drew", get: "Got",
};
function toPast(title: string): string {
  const m = title.match(/^(\S+)([\s\S]*)$/);
  if (!m) return title;
  const past = PAST_TENSE[m[1].toLowerCase()];
  return past ? past + m[2] : title;
}

function PersonColumn({ name, p, complete }: { name: string; p: Person; complete: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{name}</div>
      <ul className="mt-3 space-y-3">
        {p.focus.map((f) => {
          const itemDone = complete || f.done;
          return (
            <li key={f.id} className="flex gap-2.5">
              {itemDone ? (
                <span className="mt-0.5 w-3 shrink-0 text-center text-[12px] font-semibold leading-none" style={{ color: PINK }}>✓</span>
              ) : (
                <span className="mt-2 flex w-3 shrink-0 justify-center">
                  <span className="h-1 w-1 rounded-full" style={{ background: PINK }} />
                </span>
              )}
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <span className={`text-[13.5px] font-semibold ${f.done && !complete ? "text-white/40 line-through" : "text-white/90"}`}>{complete ? toPast(f.title) : f.title}</span>
                  {f.carried && (
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: `${PINK}22`, color: "#f6b0d3" }}>↻ carried over</span>
                  )}
                  {f.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-[11px] font-medium transition hover:underline" style={{ color: PINK }}>
                      {l.label} ↗
                    </a>
                  ))}
                </div>
                {f.detail && <p className="text-[12px] leading-snug text-white/55">{f.detail}</p>}
              </div>
            </li>
          );
        })}
      </ul>
      {p.deliverable && (
        <p className="mt-4 rounded-xl border px-3 py-2.5 text-[12.5px] leading-snug text-white/90" style={{ borderColor: `${PINK}4d`, background: `${PINK}14` }}>
          <span className="font-semibold" style={{ color: PINK }}>Be ready to share at the next meeting · </span>
          {p.deliverable}
        </p>
      )}
    </div>
  );
}

export default function WeeklyPlan() {
  const [weeks, setWeeks] = useState<Week[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<Set<number>>(new Set());

  useEffect(() => {
    let alive = true;
    fetch("/api/hq-weeks")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { items: FlatItem[] }) => {
        if (!alive) return;
        const built = buildWeeks(d.items);
        setWeeks(built);
        // open the current week (by calendar date)
        const openN = built[currentWeekIdx(built)]?.n;
        if (openN !== undefined) setOpen(new Set([openN]));
      })
      .catch(() => alive && setError("Couldn't load the weekly plan."));
    return () => {
      alive = false;
    };
  }, []);

  const toggle = (n: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });

  if (error && !weeks) return <p className="mt-8 text-[13px] text-white/50">{error}</p>;
  if (!weeks) return <p className="mt-8 text-[13px] text-white/40">Loading the plan…</p>;

  const flags = weeks.map(isComplete);
  const currentIdx = currentWeekIdx(weeks);

  return (
    <ol className="mt-8">
      {weeks.map((w, i) => {
        const status = flags[i] ? "complete" : i === currentIdx ? "current" : "upcoming";
        const last = i === weeks.length - 1;
        const isOpen = open.has(w.n);
        const carry = (who: "madhuri" | "will"): Item[] => {
          if (i !== currentIdx) return [];
          const out: Item[] = [];
          for (let k = 0; k < currentIdx; k++) for (const it of weeks[k][who].focus) if (!it.done) out.push({ ...it, carried: true });
          return out;
        };
        const madhuriP = i === currentIdx ? { ...w.madhuri, focus: [...carry("madhuri"), ...w.madhuri.focus] } : w.madhuri;
        const willP = i === currentIdx ? { ...w.will, focus: [...carry("will"), ...w.will.focus] } : w.will;
        return (
          <li key={w.n} className="flex gap-5">
            <div className="flex flex-col items-center">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-[14px] font-semibold"
                style={
                  status === "current"
                    ? { background: "#1a1438", color: "#fff", boxShadow: `0 0 20px ${PINK}88`, border: `2px solid ${PINK}` }
                    : status === "complete"
                      ? { background: `${PINK}2e`, color: "#fff", border: `1px solid ${PINK}80` }
                      : { border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.4)" }
                }
              >
                {status === "complete" ? "✓" : null}
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
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/55">{w.dates}</span>
                {status === "current" && (
                  <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide" style={{ background: `${PINK}33`, color: PINK }}>Now</span>
                )}
                <span className={`ml-auto text-[11px] text-white/40 transition-transform ${isOpen ? "rotate-90" : ""}`}>&#9656;</span>
              </button>
              {isOpen && (
                <div className="grid gap-6 px-5 pb-5 sm:grid-cols-2">
                  <PersonColumn name="Madhuri" p={madhuriP} complete={status === "complete"} />
                  <PersonColumn name="Will" p={willP} complete={status === "complete"} />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
