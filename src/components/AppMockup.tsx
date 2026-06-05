/**
 * A stylized phone showing an active Unraveled QUEST — gamified and tied to the
 * real world. Quests push you to a place or a person; you complete them by
 * scanning a code on location. Pure markup + SVG, no images.
 */
export default function AppMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto w-[240px] rounded-[2.4rem] bg-ink p-2.5 shadow-2xl shadow-orchid/30 ring-1 ring-white/10 sm:w-[262px]">
        {/* notch */}
        <div className="absolute left-1/2 top-3.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
        <div className="relative flex aspect-[9/19.5] flex-col overflow-hidden rounded-[1.95rem] bg-cloud">
          {/* status bar */}
          <div className="flex items-center justify-between px-6 pb-2 pt-4 text-[11px] font-semibold text-ink">
            <span>9:41</span>
            <span className="opacity-60">●●●</span>
          </div>

          {/* header */}
          <div className="flex items-center justify-between px-6 pb-1 pt-2">
            <div>
              <p className="text-[12px] font-medium text-muted">Quest 7 · with Madhuri</p>
              <p className="font-display text-[19px] font-600 leading-tight text-ink">
                The Repair
              </p>
            </div>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-spectrum text-[13px] font-bold text-white">
              L4
            </span>
          </div>

          {/* quest objective — gamified gradient card */}
          <div
            className="mx-4 mt-3 overflow-hidden rounded-2xl p-4 text-white"
            style={{ backgroundImage: "linear-gradient(140deg, #41398f, #98327e 55%, #c94182)" }}
          >
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide">
              <span className="rounded-full bg-white/20 px-2 py-0.5">📍 In person</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5">+120 XP</span>
            </div>
            <p className="mt-2.5 text-[13px] font-semibold leading-snug">
              Tell Madhuri one thing you appreciate — out loud, face to face.
            </p>
            <div className="mt-3 space-y-1.5">
              {[
                { t: "Pick your moment", done: true },
                { t: "Say it in person", done: false },
              ].map((s) => (
                <div key={s.t} className="flex items-center gap-2 text-[12px]">
                  <span
                    className={`grid h-4 w-4 place-items-center rounded-full text-[9px] ${
                      s.done ? "bg-white text-ink" : "bg-white/25 text-white"
                    }`}
                  >
                    {s.done ? "✓" : ""}
                  </span>
                  <span className={s.done ? "line-through opacity-70" : ""}>{s.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* scan to complete */}
          <div className="mx-4 mt-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink py-3 text-[13px] font-semibold text-white">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2M7 12h10" />
              </svg>
              Scan to complete
            </button>
            <p className="mt-1.5 text-center text-[10px] text-muted">
              Scan the code at the spot to log it
            </p>
          </div>

          {/* level progress */}
          <div className="mx-4 mb-4 mt-auto rounded-2xl bg-white p-3 ring-1 ring-line">
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-ink">Level 4 · Connector</span>
              <span className="text-muted">320 / 500 XP</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full"
                style={{ width: "64%", backgroundImage: "linear-gradient(90deg,#773484,#c94182)" }}
              />
            </div>
          </div>

          {/* tab bar */}
          <div className="flex items-center justify-around border-t border-line bg-white/70 px-6 py-3 text-muted backdrop-blur">
            {["quests", "map", "play", "you"].map((t, i) => (
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
