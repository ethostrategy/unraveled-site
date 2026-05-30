import Reveal from "./Reveal";

const truths = [
  "You keep attracting the same kind of partner — and the same ending.",
  "You're \"fine\" on your own, but unsure what you'd bring to something real.",
  "You want to do it differently this time, but don't know where to start.",
];

export default function Problem() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose">
            The hard truth
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 font-display text-3xl font-500 leading-[1.15] tracking-tight text-ink sm:text-[2.7rem]">
            Relationships rarely fail overnight. They unravel from threads we
            never learned to{" "}
            <span className="italic text-spectrum">see</span>.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Most of us were handed plenty of advice on finding someone — and
            almost none on becoming someone ready to be found.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
        {truths.map((t, i) => (
          <Reveal key={i} delay={i * 110}>
            <div className="h-full rounded-3xl border border-line bg-white p-6 text-left transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/5">
              <span className="font-display text-2xl font-600 text-spectrum">
                0{i + 1}
              </span>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {t}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p className="mx-auto mt-12 max-w-xl px-6 text-center font-display text-xl italic text-ink">
          Unraveled is where you turn those threads into clarity — before the
          next relationship, not after.
        </p>
      </Reveal>
    </section>
  );
}
