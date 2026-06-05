import Reveal from "./Reveal";
import Marquee from "./Marquee";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 text-center sm:px-6"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <h1
            className="text-balance text-[2.1rem] leading-[1.06] text-white sm:text-[2.6rem] lg:text-[2.9rem] lg:whitespace-nowrap"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            Level up <span className="italic text-spectrum">every</span>{" "}
            relationship in your life.
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg leading-relaxed text-white/65">
            Romantic, platonic, familial — even the one with yourself.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-9">
            <Marquee embedded />
          </div>
        </Reveal>
      </div>

      {/* animated scroll cue */}
      <a
        href="#the-10-blocks"
        aria-label="Scroll to the framework"
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 text-white/55 transition-colors hover:text-white/90"
      >
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="grid h-9 w-9 animate-bounce place-items-center rounded-full border border-white/15">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="M12 5v14M6 13l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </section>
  );
}
