import Reveal from "./Reveal";
import Marquee from "./Marquee";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center sm:px-6"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <h1
            className="text-balance text-[2.5rem] leading-[1.05] tracking-[-0.01em] text-white sm:text-[3.1rem] lg:text-[3.9rem] xl:text-[4.7rem]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Level up your{" "}
            <span className="italic text-spectrum">relationships</span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-7 max-w-xl text-balance text-lg leading-relaxed text-white/70">
            Romantic, platonic, familial. Even the one with yourself.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#join"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-all duration-300 hover:shadow-lg hover:shadow-black/20 active:scale-[0.98]"
            >
              Start building
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-11">
            <Marquee embedded />
          </div>
        </Reveal>
      </div>

      {/* animated scroll cue */}
      <a
        href="#blocks"
        aria-label="Scroll to the framework"
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center text-white/40 transition-colors hover:text-white/70"
      >
        <span className="grid h-9 w-9 animate-bounce place-items-center rounded-full border border-white/10">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="M12 5v14M6 13l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </section>
  );
}
