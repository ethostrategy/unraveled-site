"use client";

import { useEffect, useState } from "react";

/**
 * "This is just the beginning." Only the ONE product that's up next has a live
 * code; the rest are complete shadows.
 *
 * Hide-success design: a guess never tells you if you were right. Every guess
 * just "locks in" — correctness is recorded server-side (revealed at launch),
 * so the answer can't be confirmed and shared. The public counter tracks how
 * many people are TRYING (not who's correct), so it can't be reverse-engineered.
 * At the threshold the product is symbolically unlocked for everyone. Early
 * access itself is a member benefit — the code is for the win, not the gate.
 */

const APP = {
  key: "app",
  name: "The Unraveled app",
  riddle:
    "You pushed to start, and the door opened wide;\nsay what we help you do, with nothing to hide.",
};

const SHADOW_COUNT = 12;
const STORE = "unraveled_tried";

function readTried(): Record<string, string> {
  try {
    return JSON.parse(window.localStorage.getItem(STORE) || "{}");
  } catch {
    return {};
  }
}

async function rallyFriends() {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}/`;
  const text =
    "I'm trying to crack Unraveled's code to help unlock the app — sign up and take a shot with me:";
  if (navigator.share) {
    try {
      await navigator.share({ title: "Unraveled", text, url });
      return;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
    }
  }
  window.location.href = `mailto:?subject=${encodeURIComponent(
    "Crack the Unraveled code with me"
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
          trying to crack it
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

function RallyButton() {
  return (
    <button
      type="button"
      onClick={rallyFriends}
      className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
    >
      Rally your friends
    </button>
  );
}

function LiveCodeCard() {
  const [value, setValue] = useState("");
  const [tried, setTried] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [threshold, setThreshold] = useState(1000);

  useEffect(() => {
    if (readTried()[APP.key]) setTried(true);
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
    if (!value.trim()) return;
    const t = readTried();
    t[APP.key] = t[APP.key] || new Date().toISOString();
    try {
      window.localStorage.setItem(STORE, JSON.stringify(t));
    } catch {}
    setTried(true);
    setCount((c) => (c ?? 0) + 1); // optimistic: one more person trying
    let email = "";
    try {
      email = window.localStorage.getItem("unraveled_email") || "";
    } catch {}
    fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, product: APP.key, guess: value }),
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
          {unlocked ? "Unlocked together" : "Up next"}
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
              You did it — together.
            </h3>
            <p className="relative mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-white/75">
              Enough of you showed up to unlock {APP.name}. Launch details are on
              the way — and the codebreakers find out who cracked it.
            </p>
          </div>
        ) : (
          <>
            {tried ? (
              <div className="mt-5">
                <span className="text-3xl">🔒</span>
                <h3
                  className="mt-2 text-2xl text-white"
                  style={{ fontFamily: "var(--font-instrument)" }}
                >
                  Locked in.
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-white/75">
                  If you cracked it, you&apos;ll find out at launch. Either way,
                  every try pushes {APP.name} closer to unlocking.
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
                  Crack the code to help unlock it — you&apos;ll find out at
                  launch if you got it right.
                </p>
                <p className="mx-auto mt-6 max-w-sm whitespace-pre-line text-[16px] italic leading-relaxed text-white/80">
                  {APP.riddle}
                </p>
                <form onSubmit={submit} className="mx-auto mt-5 flex max-w-sm gap-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter your guess"
                    aria-label="Enter your guess for the code"
                    className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-[15px] text-white outline-none transition placeholder:text-white/45 focus:border-white/50 focus:bg-white/15"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-xl bg-white px-5 py-2.5 text-[14px] font-semibold text-ink transition hover:shadow-lg hover:shadow-black/15 active:scale-[0.97]"
                  >
                    Enter
                  </button>
                </form>
              </>
            )}

            <ProgressBar count={count} threshold={threshold} />
            <RallyButton />
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
          <p className="eyebrow text-passion">The Unraveled world</p>
          <h2
            className="mt-4 text-3xl tracking-tight text-white sm:text-[2.7rem]"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            This is just the beginning.
          </h2>
        </div>

        <div className="mt-12">
          <LiveCodeCard />
        </div>

        <div className="mt-14">
          <p className="mb-6 text-center text-sm uppercase tracking-[0.22em] text-white/40">
            Locked for now
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
            Each locked product lights up when it&apos;s ready to launch. Crack
            every code and you earn the{" "}
            <span className="text-white/80">Master Key</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
