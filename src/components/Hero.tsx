import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden px-4 pb-20 pt-40 text-center sm:px-6 sm:pb-28 sm:pt-48"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="relative mx-auto max-w-3xl">
        <Reveal>
          <h1
            className="text-[3rem] leading-[1.03] text-white sm:text-7xl"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            Level up <span className="italic text-spectrum">every</span>{" "}
            relationship in your life.
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65">
            Romantic, platonic, familial — even the one with yourself.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <a
            href="#the-10-blocks"
            className="group mt-12 inline-flex flex-col items-center gap-2 text-sm text-white/45 transition-colors hover:text-white/70"
            aria-label="Scroll to the framework"
          >
            <span className="uppercase tracking-[0.18em]">Start with the blocks</span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-transform duration-300 group-hover:translate-y-1">
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
        </Reveal>
      </div>
    </section>
  );
}
