import Reveal from "./Reveal";

const stats = [
  { value: "4", label: "research-backed readiness dimensions" },
  { value: "10", label: "foundational blocks of relationship health" },
  { value: "2 min", label: "a day is all it takes to see your patterns" },
];

export default function Science() {
  return (
    <section
      id="science"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="pointer-events-none absolute right-[-8%] top-[20%] -z-10 h-[26rem] w-[26rem] rounded-full bg-iris/25 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow text-trust">Grounded in science</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-5 text-3xl leading-[1.12] tracking-tight text-white sm:text-[2.7rem]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              Built on the research that actually predicts healthy love
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-relaxed text-white/60">
              Unraveled draws on attachment theory, emotion regulation research,
              and decades of relationship science — grounded in evidence and
              translated into something you can feel in your day, not just
              read in a textbook.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={200 + i * 90}>
                <div>
                  <div
                    className="text-3xl text-spectrum sm:text-4xl"
                    style={{ fontFamily: "var(--font-instrument)" }}
                  >
                    {s.value}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-snug text-white/65">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* quote card */}
        <Reveal delay={160}>
          <figure className="glass relative rounded-[2rem] p-8 sm:p-10">
            <div className="absolute -top-5 left-8 grid h-12 w-12 place-items-center rounded-2xl bg-spectrum text-2xl text-white shadow-lg shadow-black/30">
              <span
                className="leading-none"
                style={{ fontFamily: "var(--font-instrument)" }}
              >
                &ldquo;
              </span>
            </div>
            <blockquote
              className="pt-4 text-xl leading-relaxed text-white sm:text-[1.4rem]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              Readiness isn&apos;t a feeling you wait for. It&apos;s a set of
              capacities you can actually build — self-awareness, regulation,
              and the courage to be known.
            </blockquote>
            <figcaption className="mt-6 text-sm text-white/65">
              The Unraveled approach to relationship readiness
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
