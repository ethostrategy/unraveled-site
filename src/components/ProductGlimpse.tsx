import AppMockup from "./AppMockup";
import Reveal from "./Reveal";

function PhoneShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-[230px] shrink-0 rounded-[2.4rem] bg-ink p-2.5 shadow-2xl shadow-orchid/30 ring-1 ring-white/10 ${className}`}
    >
      <div className="absolute left-1/2 top-3.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative min-h-[470px] overflow-hidden rounded-[1.95rem] bg-cloud">
        {children}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pb-2 pt-4 text-[11px] font-semibold text-ink">
      <span>9:41</span>
      <span className="opacity-60">●●●</span>
    </div>
  );
}

const journey = [
  { name: "First Words", state: "done" },
  { name: "The Check-In", state: "done" },
  { name: "The Repair", state: "current" },
  { name: "Hard Truths", state: "locked" },
  { name: "Show Up", state: "locked" },
];

function QuestMapScreen() {
  return (
    <div>
      <StatusBar />
      <div className="px-5 pb-1 pt-2">
        <p className="text-[12px] font-medium text-muted">Your journey</p>
        <p className="font-display text-[18px] font-600 leading-tight text-ink">
          Quests with Mom
        </p>
      </div>
      <div className="relative px-6 pt-4">
        <div className="absolute bottom-6 left-[2.05rem] top-7 w-[2px] bg-line" />
        <div className="space-y-3.5">
          {journey.map((q) => (
            <div key={q.name} className="relative flex items-center gap-3">
              <span
                className={`relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold ring-4 ring-cloud ${
                  q.state === "done"
                    ? "bg-spectrum text-white"
                    : q.state === "current"
                      ? "bg-white text-spectrum"
                      : "bg-line text-muted"
                }`}
                style={
                  q.state === "current"
                    ? { boxShadow: "0 0 0 3px rgba(201,65,130,0.35)" }
                    : undefined
                }
              >
                {q.state === "done" ? "✓" : q.state === "locked" ? "🔒" : "▶"}
              </span>
              <div
                className={`flex-1 rounded-xl px-3 py-2 text-[13px] font-semibold ${
                  q.state === "current"
                    ? "bg-white text-ink ring-1 ring-spectrum/40"
                    : q.state === "locked"
                      ? "text-muted"
                      : "text-ink-soft"
                }`}
              >
                {q.name}
                {q.state === "current" && (
                  <span className="ml-1 text-[10px] font-medium text-spectrum">
                    · +120 XP
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoopScreen() {
  return (
    <div>
      <StatusBar />
      <div className="px-5 pb-1 pt-2">
        <p className="text-[12px] font-medium text-muted">Play together</p>
        <p className="font-display text-[18px] font-600 leading-tight text-ink">
          You &amp; Sam
        </p>
      </div>

      {/* shared quest */}
      <div
        className="mx-4 mt-3 rounded-2xl p-4 text-white"
        style={{ backgroundImage: "linear-gradient(140deg,#08327e,#773484 60%,#c42e75)" }}
      >
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
          Co-op quest
        </span>
        <p className="mt-2 text-[13px] font-semibold leading-snug">
          Plan a no-phones dinner — just the two of you.
        </p>
        <div className="mt-3 flex items-center gap-3">
          {[
            { i: "S", done: true, from: "#41398f", to: "#c94182" },
            { i: "Y", done: false, from: "#773484", to: "#c42e75" },
          ].map((p) => (
            <div key={p.i} className="flex items-center gap-1.5">
              <span
                className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold text-white ring-2 ring-white/40"
                style={{ backgroundImage: `linear-gradient(135deg,${p.from},${p.to})` }}
              >
                {p.i}
              </span>
              <span className="text-[11px] text-white/85">
                {p.done ? "Ready ✓" : "Your move"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* invite */}
      <div className="mx-4 mt-3 flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-line">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-spectrum-soft text-lg">
          ＋
        </span>
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-ink">Invite someone in</p>
          <p className="text-[11px] text-muted">Partner · friend · family</p>
        </div>
        <span className="text-muted">›</span>
      </div>

      <div className="mx-4 mt-3 rounded-2xl bg-spectrum-soft p-3.5">
        <p className="text-[12px] font-semibold text-ink">Streak</p>
        <p className="mt-0.5 text-[11px] text-muted">3 quests cleared together 🔥</p>
      </div>
    </div>
  );
}

export default function ProductGlimpse() {
  return (
    <section
      id="ecosystem"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2
              className="text-3xl tracking-tight text-white sm:text-[2.7rem]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              The goal isn&apos;t more screen time. It&apos;s more face time.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 text-lg text-white/60">
              We know tech isn&apos;t always the answer — it&apos;s a tool. Our
              app keeps track of your relationship intelligence and progress
              over time, but encourages you to practice skills in person.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="relative mt-16 flex items-center justify-center gap-6">
            {/* spectrum glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spectrum opacity-25 blur-3xl" />

            <PhoneShell className="hidden -rotate-6 scale-90 opacity-90 lg:block">
              <QuestMapScreen />
            </PhoneShell>

            <div className="animate-[float_7s_ease-in-out_infinite]">
              <AppMockup />
            </div>

            <PhoneShell className="hidden rotate-6 scale-90 opacity-90 lg:block">
              <CoopScreen />
            </PhoneShell>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
