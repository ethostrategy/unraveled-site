import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden px-4 pb-8 pt-36 text-center sm:px-6 sm:pb-10 sm:pt-44"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <h1
            className="text-[2.1rem] leading-[1.06] text-white sm:text-[2.6rem] lg:text-[2.9rem] lg:whitespace-nowrap"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            Level up <span className="italic text-spectrum">every</span>{" "}
            relationship in your life.
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65">
            Romantic, platonic, familial — even the one with yourself.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
