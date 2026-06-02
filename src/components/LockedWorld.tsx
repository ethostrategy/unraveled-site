"use client";

import { useEffect, useState } from "react";

/**
 * "This is just the beginning." Only the ONE product that's up next has a live
 * code; the rest are complete shadows.
 *
 * Two layered incentives when you crack the live code:
 *  - Personal: you become a founding member (early access + founding discount),
 *    stamped with the date and remembered on return (localStorage).
 *  - Collective: a community counter ticks toward a threshold; since you must be
 *    a member to enter the word, spreading the answer drives signups. At the
 *    threshold the product is symbolically unlocked for everyone.
 *
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
  word: "level up", // the word people rally others to enter
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

async function spreadTheWord() {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}/`;
  const text = `Crack the code with me — sign up to Unraveled and enter "${APP.word}" to help unlock the app for everyone:`;
  if (navigator.share) {
    try {
      await navigator.share({ title: "Unraveled", text, url });
      return;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
    }
  }
  window.location.href = `mailto:?subject=${encodeURIComponent(
    "Help unlock Unraveled"
  )}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
}

function ProgressBar({
  count,
  threshold,
}: {
  count: number | null;
  threshold: number;
}) {
  const c = count ?? 0;
  const pct = Math.min(100, (c / threshold) * 100);
  return (
    <div className="mx-auto mt-6 max-w-sm">
      <div className="mb-1.5 flex items-baseline justify-between text-[12px] text-white/55">
        <span>
          <span className="font-semibold text-white">{c.toLocaleString()}</span>{" "}
          cracked
        </span>
        <span>{threshold.toLocaleString()} to unlock</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-spectrum-3 via-spectrum-6 to-spectrum-10 transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function LiveCodeCard() {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [solvedAt, setSolvedAt] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [threshold, setThreshold] = useState(1000);

  useEffect(() => {
    const u = readUnlocks();
    if (u[APP.key]) setSolvedAt(u[APP.key]);
    fetch(`/api/unlock?product=${APP.key}`)
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.threshold === "number") setThreshold(d.threshold);
        if (typeof d.count === "number") setCount(d.count);
      })
      .catch(() => {});
  }, []);

  const unlocked = count !== null && count >= threshold;

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
    setCount((c) => (c ?? 0) + 1); // optimistic
    let email = "";
    try {
      email = window.localStorage.getItem("unraveled_email") || "";
    } catch {}
    fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, product: APP.key }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.count === "number") setCount(d.count);
        if (typeof d.threshold === "number") setThreshold(d.threshold);
      })
      .catch(() => {});
  }

  return (
    <div className="relative mx-auto max-w-xl">
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
          {unlocked ? "Community unlocked" : "Up next"}
        </span>

        {unlocked ? (
          <div className="relative mt-5">
            <div
              aria-hidden
              className="glow-burst pointer-events-none absolute inset-0 -z-0"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, rgba(201,65,130,0.35) 35%, rgba(201,65,130,0) 70%)",
              }}
            />
            <span className="relative text-4xl">🎉</span>
            <h3
              className="relative mt-3 text-2xl text-white"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              You cracked it — together.
            </h3>
            <p className="relative mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-white/75">
              {threshold.toLocaleString()} of you cracked the code. {APP.name} is
              unlocked — launch details are on the way.
            </p>
          </div>
        ) : (
          <>
            {solvedAt ? (
              <div className="mt-5">
                <span className="text-3xl">🔑</span>
                <h3
                  className="mt-2 text-2xl text-white"
                  style={{ fontFamily: "var(--font-instrument)" }}
                >
                  Code cracked. You&apos;re founding.
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-white/75">
                  First access <span className="text-white">+ a founding discount</span>{" "}
                  when {APP.name} opens.
                  <span className="mt-1 block text-[12px] uppercase tracking-[0.16em] text-spectrum">
                    Cracked {fmtDate(solvedAt)}
                  </span>
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

            {/* community progress (always shown until unlocked) */}
            <ProgressBar count={count} threshold={threshold} />
            <p className="mx-auto mt-4 max-w-sm text-[13px] text-white/55">
              Everyone must sign up to enter the word. Spread{" "}
              <span className="font-semibold text-white">&ldquo;{APP.word}&rdquo;</span>{" "}
              and unlock it for all of us.
            </p>
            <button
              type="button"
              onClick={spreadTheWord}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Spread the word
            </button>
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
            time — crack it together to summon what&apos;s next.
          </p>
        </div>

        <div className="mt-12">
          <LiveCodeCard />
        </div>

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
