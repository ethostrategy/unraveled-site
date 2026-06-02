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

const relationships = [
  { emoji: "💞", label: "Romantic", note: "Partner" },
  { emoji: "🤝", label: "Friendship", note: "Best friend" },
  { emoji: "🏡", label: "Family", note: "Mom" },
  { emoji: "🪞", label: "Yourself", note: "Self-to-self" },
];

function PickerScreen() {
  return (
    <div>
      <StatusBar />
      <div className="px-5 pb-2 pt-2">
        <p className="text-[12px] font-medium text-muted">Let&apos;s begin</p>
        <p className="font-display text-[18px] font-600 leading-tight text-ink">
          Which relationship?
        </p>
      </div>
      <div className="space-y-2.5 px-4 pt-2">
        {relationships.map((r) => (
          <div
            key={r.label}
            className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-line"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-spectrum-soft text-lg">
              {r.emoji}
            </span>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-ink">{r.label}</p>
              <p className="text-[11px] text-muted">{r.note}</p>
            </div>
            <span className="text-muted">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlockScreen() {
  return (
    <div>
      <StatusBar />
      <div className="px-5 pb-1 pt-2">
        <p className="text-[12px] font-medium text-muted">Foundation · Block 02</p>
        <p className="font-display text-[20px] font-600 leading-tight text-ink">
          Trust
        </p>
      </div>
      <div className="px-5 pt-2">
        <p className="text-[12px] leading-relaxed text-ink-soft">
          The expectation that you won&apos;t be harmed — and that what&apos;s
          said in confidence stays safe.
        </p>
      </div>
      <div className="mx-4 mt-4 rounded-2xl bg-white p-3.5 ring-1 ring-line">
        <p className="text-[12px] font-semibold text-ink">This week&apos;s practice</p>
        <p className="mt-1 text-[11px] leading-snug text-muted">
          Follow through on one small promise — and name it out loud when you do.
        </p>
      </div>
      <div className="mx-4 mt-3 rounded-2xl bg-spectrum-soft p-3.5">
        <p className="text-[12px] font-semibold text-ink">Where you are</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full"
            style={{ width: "72%", backgroundImage: "linear-gradient(90deg,#98327E,#C42E75)" }}
          />
        </div>
        <p className="mt-1.5 text-[10px] text-muted">Growing · +6 this month</p>
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
            <p className="eyebrow text-trust">Ecosystem</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-5 text-3xl tracking-tight text-white sm:text-[2.7rem]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              Start with the app.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-white/60">
              Pick any relationship in your life, see it block by block, and get
              small practices that move the needle. An early look:
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="relative mt-16 flex items-center justify-center gap-6">
            {/* spectrum glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spectrum opacity-25 blur-3xl" />

            <PhoneShell className="hidden -rotate-6 scale-90 opacity-90 lg:block">
              <PickerScreen />
            </PhoneShell>

            <div className="animate-[float_7s_ease-in-out_infinite]">
              <AppMockup />
            </div>

            <PhoneShell className="hidden rotate-6 scale-90 opacity-90 lg:block">
              <BlockScreen />
            </PhoneShell>
          </div>
        </Reveal>

        <p className="mt-10 text-center text-[13px] text-white/40">
          Concept screens — the product is in active design.
        </p>
      </div>
    </section>
  );
}
