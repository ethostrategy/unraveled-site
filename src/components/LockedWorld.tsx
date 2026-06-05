"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";
import { rallyFriends } from "@/lib/invite";
import ProductGlimpse from "./ProductGlimpse";

/**
 * "This is just the beginning." Only the ONE product that's up next has a live
 * code; the rest are complete shadows.
 *
 * Instant + rank: a correct guess celebrates immediately and returns the
 * member's RANK among solvers (1 = first). Prestige is by speed, so a leaked
 * answer only mints high-rank latecomers. A wrong guess says "not quite" so they
 * keep trying. The public counter tracks people TRYING, which drives the
 * collective unlock. Early access is a member benefit — the code is for the win.
 */

const APP = {
  key: "app",
  name: "The Unraveled app",
  riddle:
    "You pushed to start; the game is underway\nname what we help you do, every day.",
};

// Shadow idea nodes, hand-placed as a constellation (x/y are % of the box).
// Pushed wide toward the edges so the universe reaches out to the sides.
const NODES = [
  { x: 50, y: 11, s: 60, d: 7 },
  { x: 78, y: 19, s: 46, d: 9 },
  { x: 93, y: 44, s: 52, d: 8 },
  { x: 85, y: 73, s: 44, d: 10.5 },
  { x: 63, y: 87, s: 56, d: 8.5 },
  { x: 37, y: 88, s: 48, d: 9.5 },
  { x: 15, y: 74, s: 54, d: 7.5 },
  { x: 7, y: 45, s: 46, d: 11 },
  { x: 22, y: 19, s: 58, d: 8 },
  { x: 33, y: 43, s: 40, d: 12 },
  { x: 67, y: 43, s: 42, d: 9.2 },
  { x: 50, y: 80, s: 44, d: 8.2 },
];

const CRACK_STORE = "unraveled_cracked";

type Crack = { rank: number | null; at: string };

function readCracked(): Record<string, Crack> {
  try {
    return JSON.parse(window.localStorage.getItem(CRACK_STORE) || "{}");
  } catch {
    return {};
  }
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
    <div className="mx-auto mt-8 max-w-sm">
      <div className="mb-1.5 flex items-baseline justify-between text-[12px] text-white/70">
        <span>
          <span className="font-semibold text-white">{c.toLocaleString()}</span>{" "}
          cracked it
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
      className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
    >
      Bring your people in
    </button>
  );
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function LiveCodeCard() {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);
  const [cracked, setCracked] = useState<Crack | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [threshold, setThreshold] = useState(1000);

  useEffect(() => {
    const c = readCracked()[APP.key];
    if (c) setCracked(c);
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
    if (!value.trim() || cracked) return;
    // The bar counts correct cracks, so we let the server response set it.
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
        if (d.correct) {
          const c: Crack = {
            rank: typeof d.rank === "number" ? d.rank : null,
            at: new Date().toISOString(),
          };
          const store = readCracked();
          store[APP.key] = c;
          try {
            window.localStorage.setItem(CRACK_STORE, JSON.stringify(store));
          } catch {}
          setCracked(c);
          setValue("");
        } else {
          setWrong(true);
          setTimeout(() => setWrong(false), 500);
        }
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
        {cracked ? (
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
              You cracked it.
            </h3>
            <p className="relative mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-white/75">
              {cracked.rank
                ? `You're codebreaker #${cracked.rank.toLocaleString()}.`
                : "You're a codebreaker."}{" "}
              The earlier you crack it, the better your spot when {APP.name}{" "}
              opens.
              <span className="mt-1 block text-[12px] uppercase tracking-[0.16em] text-spectrum">
                Cracked {fmtDate(cracked.at)}
              </span>
            </p>
            <ProgressBar count={count} threshold={threshold} />
            <RallyButton />
          </div>
        ) : unlocked ? (
          <div className="relative mt-5">
            <span className="relative text-4xl">🎉</span>
            <h3
              className="relative mt-3 text-2xl text-white"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              You did it — together.
            </h3>
            <p className="relative mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-white/75">
              Enough of you showed up to unlock {APP.name}. Launch details are on
              the way.
            </p>
          </div>
        ) : (
          <>
            <h3
              className="text-2xl text-white sm:text-[1.7rem]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              {APP.name} is almost here.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-white/70">
              Crack the code to unlock the launch.
            </p>
            <p className="mx-auto mt-8 max-w-sm whitespace-pre-line text-[16px] italic leading-snug text-white/85">
              {APP.riddle}
            </p>
            <form
              onSubmit={submit}
              className={`mx-auto mt-8 flex max-w-sm gap-2 ${wrong ? "shake-x" : ""}`}
            >
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={wrong ? "Not quite — try again" : "Guess here"}
                aria-label="Enter your guess for the code"
                className={`min-w-0 flex-1 rounded-xl border bg-white/10 px-4 py-2.5 text-[15px] text-white outline-none transition placeholder:text-white/60 focus:bg-white/15 ${
                  wrong ? "border-rose/70" : "border-white/20 focus:border-white/50"
                }`}
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-white px-5 py-2.5 text-[14px] font-semibold text-ink transition hover:shadow-lg hover:shadow-black/15 active:scale-[0.97]"
              >
                Enter
              </button>
            </form>

            <ProgressBar count={count} threshold={threshold} />
            <RallyButton />
          </>
        )}
      </div>
    </div>
  );
}

function MindMap() {
  return (
    <div className="relative mx-auto h-[460px] w-full max-w-6xl sm:h-[560px]">
      {/* connecting threads */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {NODES.map((n, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="rgba(180,170,220,0.16)"
            strokeWidth="0.25"
          />
        ))}
      </svg>

      {/* central hub — the app: an unlocked, "up next" core. A circle like the
          locked nodes (so it reads as a product that just unlocked), but filled
          and alive: a soft glow + a pulsing halo signal it's next, no label. */}
      <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        {/* soft glow */}
        <div className="absolute h-32 w-32 rounded-full bg-spectrum-10/40 blur-2xl" />
        {/* pulsing 'up next' halo */}
        <span className="absolute h-[92px] w-[92px] animate-ping rounded-full bg-spectrum-10/25" />
        {/* circle app icon */}
        <div className="relative grid h-[92px] w-[92px] place-items-center rounded-full bg-gradient-to-br from-spectrum-3 via-spectrum-6 to-spectrum-10 shadow-xl shadow-black/30 ring-1 ring-white/30">
          <LogoMark className="h-12 w-12" />
        </div>
      </div>

      {/* shadow product nodes */}
      {NODES.map((n, i) => (
        <div
          key={i}
          className="group absolute z-10 hover:z-30"
          style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)" }}
        >
          <div style={{ animation: `float ${n.d}s ease-in-out infinite` }}>
            <div
              className="grid place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:scale-[1.6] group-hover:border-white/50 group-hover:shadow-[0_0_34px_rgba(201,65,130,0.55)]"
              style={{
                width: n.s,
                height: n.s,
                background:
                  "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.10), rgba(255,255,255,0.02) 70%)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-1/3 w-1/3 text-white/50 transition-colors group-hover:text-spectrum-10"
                aria-hidden
              >
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
            </div>
          </div>
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-white/0 transition-colors duration-300 group-hover:text-white/75">
            Locked
          </span>
        </div>
      ))}
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
      {/* product preview — the face-time pitch opens the universe */}
      <ProductGlimpse />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-[#e273ac]">Unraveled Universe</p>
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
      </div>

      {/* the constellation reaches wider than the text column, out to the sides */}
      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        <p className="mb-2 text-center text-sm uppercase tracking-[0.22em] text-white/75">
          The rest of our secrets are locked for now
        </p>
        <MindMap />
        <p className="mx-auto mt-4 max-w-md text-balance text-center text-[15px] leading-relaxed text-white/60">
          Each locked idea lights up when it&apos;s ready to launch.
        </p>
      </div>
    </section>
  );
}
