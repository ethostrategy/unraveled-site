"use client";

import { useEffect, useState } from "react";

/**
 * "This is just the beginning." The wider world is a constellation of future
 * products. Only the ONE product that's up next has a live code to crack; the
 * rest are complete shadows until their turn.
 *
 * Cracking the live code records the member as a Founding member of that product
 * (early access + a founding discount at launch). Solves persist locally with a
 * date and are POSTed to /api/unlock (Airtable-backed) for the launch list.
 * Crack every code over time → the Master Key: a Secret Gala invite.
 */

const APP = {
  key: "app",
  name: "The Unraveled app",
  riddle:
    "You pushed to start, and the door opened wide;\nname what we help you do — and founding's inside.",
  answers: [
    "level up",
    "levelup",
    "level-up",
    "level up relationships",
    "level up your relationships",
    "grow",
  ],
};

const SHADOW_COUNT = 12;

const STORE = "unraveled_unlocks";

function readUnlocks(): Record<string, string> {
  try {
    return JSON.parse(window.localStorage.getItem(STORE) || "{}");
  } catch {
    return {};
  }
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ");
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function LiveCodeCard() {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [solvedAt, setSolvedAt] = useState<string | null>(null);

  useEffect(() => {
    const u = readUnlocks();
    if (u[APP.key]) setSolvedAt(u[APP.key]);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = normalize(value);
    if (!v) return;
    const hit = APP.answers.some((a) => v === a || v.includes(a));
    if (!hit) {
      setWrong(true);
      setTimeout(() => setWrong(false), 500);
      return;
    }
    const when = new Date().toISOString();
    const u = readUnlocks();
    u[APP.key] = u[APP.key] || when;
    try {
      window.localStorage.setItem(STORE, JSON.stringify(u));
    } catch {}
    setSolvedAt(u[APP.key]);
    // best-effort: record server-side for the launch list
    const email = (() => {
      try {
        return window.localStorage.getItem("unraveled_email") || "";
      } catch {
        return "";
      }
    })();
    fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, product: APP.key }),
    }).catch(() => {});
  }

  return (
    <div className="relative mx-auto max-w-xl">
      {/* lit glow ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-[2rem] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(201,65,130,0.55), rgba(201,65,130,0) 70%)",
        }}
      />
      <div className="glass relative overflow-hidden rounded-[1.75rem] p-7 text-center sm:p-9">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-spectrum" />
          Up next
        </span>

        {solvedAt ? (
          <div className="relative mt-5">
            <div
              aria-hidden
              className="glow-burst pointer-events-none absolute inset-0 -z-0"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, rgba(201,65,130,0.35) 35%, rgba(201,65,130,0) 70%)",
              }}
            />
            <span className="relative text-4xl">🔑</span>
            <h3
              className="relative mt-3 text-2xl text-white"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              Code cracked. You&apos;re founding.
            </h3>
            <p className="relative mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-white/75">
              You&apos;re on the founding list for {APP.name} — first access{" "}
              <span className="text-white">+ a founding discount</span> the day
              it opens. We&apos;ll email you.
            </p>
            <p className="relative mt-4 text-[12px] uppercase tracking-[0.18em] text-spectrum">
              Code cracked {fmtDate(solvedAt)}
            </p>
          </div>
        ) : (
          <>
            <h3
              className="mt-5 text-2xl text-white sm:text-[1.7rem]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              {APP.name} is almost here.
            </h3>
            <p className="mx-auto mt-2 max-w-md text-[15px] text-white/60">
              Crack the code to lock in founding access — early entry and a
              founding discount before anyone else.
            </p>

            <p className="mx-auto mt-6 max-w-sm whitespace-pre-line text-[16px] italic leading-relaxed text-white/80">
              {APP.riddle}
            </p>

            <form
              onSubmit={submit}
              className={`mx-auto mt-5 flex max-w-sm gap-2 ${wrong ? "shake-x" : ""}`}
            >
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={wrong ? "Not quite…" : "Crack the code"}
                aria-label="Answer the riddle to unlock founding access"
                className={`min-w-0 flex-1 rounded-xl border bg-white/10 px-4 py-2.5 text-[15px] text-white outline-none transition placeholder:text-white/45 focus:bg-white/15 ${
                  wrong ? "border-rose/70" : "border-white/20 focus:border-white/50"
                }`}
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-white px-5 py-2.5 text-[14px] font-semibold text-ink transition hover:shadow-lg hover:shadow-black/15 active:scale-[0.97]"
              >
                Unlock
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function LockedWorld() {
  return (
    <section
      id="world"
      className="relative scroll-mt-24 pb-24 pt-4 sm:pb-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-passion">The bigger picture</p>
          <h2
            className="mt-4 text-3xl tracking-tight text-white sm:text-[2.7rem]"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            This is just the beginning.
          </h2>
          <p className="mt-5 text-lg text-white/60">
            The app is the doorway to an entire world. One code goes live at a
            time — crack it to become a founding member before launch.
          </p>
        </div>

        {/* live node */}
        <div className="mt-12">
          <LiveCodeCard />
        </div>

        {/* shadow constellation */}
        <div className="mt-14">
          <p className="mb-6 text-center text-sm uppercase tracking-[0.22em] text-white/40">
            Still in shadow
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
            {Array.from({ length: SHADOW_COUNT }).map((_, i) => (
              <div
                key={i}
                className="grid aspect-square place-items-center rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                aria-hidden
              >
                <span className="text-lg text-white/20">🔒</span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-md text-center text-[15px] leading-relaxed text-white/45">
            Each shadow lights up as its product nears launch. Crack every code
            and you earn the <span className="text-white/80">Master Key</span> —
            an invite to a Secret Gala.
          </p>
        </div>
      </div>
    </section>
  );
}
