import Reveal from "./Reveal";

const stats = [
  { value: "4", label: "research-backed readiness dimensions" },
  { value: "200+", label: "guided practices, written with therapists" },
  { value: "2 min", label: "a day is all it takes to see your patterns" },
];

export default function Science() {
  return (
    <section
      id="science"
      className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
    >
      <div className="glow right-[-8%] top-[20%] h-[26rem] w-[26rem] bg-iris/25" />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-trust">
              Grounded in science
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-600 leading-[1.12] tracking-tight text-ink sm:text-[2.7rem]">
              Built on the research that actually predicts healthy love
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Unraveled draws on attachment theory, emotion regulation research,
              and decades of relationship science — translated by clinical
              psychologists into something you can feel in your day, not just
              read in a textbook.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={200 + i * 90}>
                <div>
                  <div className="font-display text-3xl font-600 text-spectrum sm:text-4xl">
                    {s.value}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-snug text-muted">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* quote card */}
        <Reveal delay={160}>
          <figure className="relative rounded-[2rem] border border-line bg-white p-8 ring-spectrum-shadow sm:p-10">
            <div className="absolute -top-5 left-8 grid h-12 w-12 place-items-center rounded-2xl bg-spectrum text-2xl text-white shadow-lg">
              <span className="font-display leading-none">&ldquo;</span>
            </div>
            <blockquote className="pt-4 font-display text-xl leading-relaxed text-ink sm:text-[1.4rem]">
              Readiness isn&apos;t a feeling you wait for. It&apos;s a set of
              capacities you can actually build — self-awareness, regulation,
              and the courage to be known.
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span className="h-11 w-11 rounded-full bg-gradient-to-br from-spectrum-4 to-spectrum-9" />
              <div>
                <div className="text-sm font-semibold text-ink">
                  Dr. Elena Hart, PhD
                </div>
                <div className="text-sm text-muted">
                  Clinical Psychologist · Unraveled Science Lead
                </div>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
