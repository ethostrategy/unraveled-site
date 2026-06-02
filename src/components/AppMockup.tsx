/**
 * A stylized phone showing Unraveled's readiness dashboard.
 * Pure markup + SVG — no images needed.
 */
export default function AppMockup({ className = "" }: { className?: string }) {
  const score = 78;
  const circumference = 2 * Math.PI * 52;
  const dash = (score / 100) * circumference;

  const dims = [
    { label: "Safety", value: 86, from: "#C42E75", to: "#C94182" },
    { label: "Trust", value: 72, from: "#98327E", to: "#C42E75" },
    { label: "Communication", value: 80, from: "#773484", to: "#98327E" },
    { label: "Boundaries", value: 64, from: "#41398F", to: "#773484" },
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto w-[280px] rounded-[2.75rem] bg-ink p-2.5 shadow-2xl shadow-orchid/30 ring-1 ring-white/10 sm:w-[310px]">
        {/* notch */}
        <div className="absolute left-1/2 top-3.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
        <div className="relative overflow-hidden rounded-[2.25rem] bg-cloud">
          {/* status bar */}
          <div className="flex items-center justify-between px-6 pb-2 pt-4 text-[11px] font-semibold text-ink">
            <span>9:41</span>
            <span className="flex items-center gap-1 opacity-70">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M2 22h20V2z" />
              </svg>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                <rect x="2" y="7" width="18" height="10" rx="2" />
                <rect x="21" y="10" width="2" height="4" rx="1" />
              </svg>
            </span>
          </div>

          {/* app header */}
          <div className="px-6 pb-1 pt-2">
            <p className="text-[12px] font-medium text-muted">
              You &amp; Mom · this month
            </p>
            <p className="font-display text-[19px] font-600 leading-tight text-ink">
              Relationship health
            </p>
          </div>

          {/* score ring */}
          <div className="relative mx-auto my-1 grid h-44 w-44 place-items-center">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <defs>
                <linearGradient id="ring" x1="0" y1="0" x2="120" y2="120">
                  <stop stopColor="#08327E" />
                  <stop offset="0.5" stopColor="#773484" />
                  <stop offset="1" stopColor="#C94182" />
                </linearGradient>
              </defs>
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#ECE8F1"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="url(#ring)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference}`}
              />
            </svg>
            <div className="absolute text-center">
              <div className="font-display text-[38px] font-600 leading-none text-ink">
                {score}
              </div>
              <div className="text-[11px] font-medium tracking-wide text-muted">
                HEALTHY-ISH
              </div>
            </div>
          </div>

          {/* dimensions */}
          <div className="space-y-3 px-6 pb-3 pt-1">
            {dims.map((d) => (
              <div key={d.label}>
                <div className="mb-1 flex items-center justify-between text-[11px]">
                  <span className="font-medium text-ink-soft">{d.label}</span>
                  <span className="font-semibold text-ink">{d.value}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${d.value}%`,
                      backgroundImage: `linear-gradient(90deg, ${d.from}, ${d.to})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* nudge card */}
          <div className="mx-4 mb-4 rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-line">
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-spectrum-soft text-sm">
                🌱
              </span>
              <div>
                <p className="text-[12px] font-semibold text-ink">
                  Today&apos;s reflection
                </p>
                <p className="text-[11px] leading-snug text-muted">
                  When did you last feel truly heard? What made it possible?
                </p>
              </div>
            </div>
          </div>

          {/* tab bar */}
          <div className="flex items-center justify-around border-t border-line bg-white/70 px-6 py-3 text-muted backdrop-blur">
            {["home", "growth", "journal", "you"].map((t, i) => (
              <div
                key={t}
                className={`grid h-7 w-7 place-items-center rounded-full ${
                  i === 0 ? "bg-spectrum text-white" : ""
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-current opacity-80" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
