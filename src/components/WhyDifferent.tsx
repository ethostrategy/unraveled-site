import Reveal from "./Reveal";

const stats = [
  { value: "1 in 4", label: "adults 18–26 feel lonely most of the time" },
  { value: "~1,000", label: "fewer hours a year with friends than in 2003" },
  { value: "85 yrs", label: "of research: relationships top every predictor of a good life" },
];

export default function WhyDifferent() {
  return (
    <section
      id="why-now"
      className="relative scroll-mt-24 py-20 sm:py-28"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow text-rose">Why now</p>
            <h2
              className="mt-4 text-3xl tracking-tight text-white sm:text-[2.4rem]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              It&apos;s not just you.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-4xl text-spectrum sm:text-5xl"
                  style={{ fontFamily: "var(--font-instrument)" }}
                >
                  {s.value}
                </div>
                <p className="mx-auto mt-2.5 max-w-[15rem] text-[14px] leading-snug text-white/60">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
