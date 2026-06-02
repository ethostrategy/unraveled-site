import Reveal from "./Reveal";

const truths = [
  "You keep attracting the same kind of partner — and the same ending.",
  "You're \"fine\" on your own, but unsure what you'd bring to something real.",
  "You want to do it differently this time, but don't know where to start.",
];

export default function Problem() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="eyebrow text-rose">The hard truth</p>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="mt-5 text-3xl leading-[1.15] tracking-tight text-white sm:text-[2.7rem]"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            Relationships rarely fail overnight. They unravel from threads we
            never learned to{" "}
            <span className="italic text-spectrum">see</span>.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
            Most of us were handed plenty of advice on finding someone — and
            almost none on becoming someone ready to be found.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
        {truths.map((t, i) => (
          <Reveal key={i} delay={i * 110}>
            <div className="glass glass-hover h-full rounded-3xl p-6 text-left">
              <span
                className="text-2xl text-spectrum"
                style={{ fontFamily: "var(--font-instrument)" }}
              >
                0{i + 1}
              </span>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                {t}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <p
          className="mx-auto mt-12 max-w-xl px-6 text-center text-xl italic text-white/90"
          style={{ fontFamily: "var(--font-instrument)" }}
        >
          Unraveled is where you turn those threads into clarity — before the
          next relationship, not after.
        </p>
      </Reveal>
    </section>
  );
}
