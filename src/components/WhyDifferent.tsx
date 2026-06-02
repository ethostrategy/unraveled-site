import Reveal from "./Reveal";

const points = [
  {
    title: "Universal, not romance-only",
    body: "One framework for romantic, platonic, familial — even the relationship you have with yourself. Most tools quietly assume a couple.",
    icon: "♾️",
  },
  {
    title: "Structural, not just feelings",
    body: "It names what a relationship needs to be healthy — separate from how it happens to feel. A bond can be loving and still be unsound.",
    icon: "🧱",
  },
  {
    title: "Ordered, not a checklist",
    body: "Ten blocks in a deliberate sequence, so you always know what to strengthen first instead of guessing.",
    icon: "🪜",
  },
  {
    title: "Built to practice",
    body: "Concrete, block-level steps — not just things to understand, but things to actually do this week.",
    icon: "🌱",
  },
];

const stats = [
  { value: "1 in 4", label: "adults 18–26 feel lonely most of the time" },
  { value: "~1,000", label: "fewer hours a year with friends than in 2003" },
  { value: "85 yrs", label: "of research: relationships top every predictor of a good life" },
];

export default function WhyDifferent() {
  return (
    <section
      id="why"
      className="relative scroll-mt-24 py-24 sm:py-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-iris">Why Unraveled</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-5 text-3xl tracking-tight text-white sm:text-[2.7rem]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              Not more advice. A structure you can trust.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-white/60">
              Therapists, influencers, books, family — all with their own take,
              often contradicting each other. Unraveled is one shared map,
              drawn from modern psychology and thinkers across history.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 90}>
              <div className="glass glass-hover h-full rounded-[1.75rem] p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-2xl ring-1 ring-white/10">
                  {p.icon}
                </span>
                <h3
                  className="mt-5 text-xl text-white"
                  style={{ fontFamily: "var(--font-instrument)" }}
                >
                  {p.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/60">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Why now */}
        <Reveal delay={120}>
          <div className="glass mt-12 rounded-[1.75rem] px-6 py-8 sm:px-10">
            <p className="text-center text-sm uppercase tracking-[0.22em] text-white/45">
              Why now
            </p>
            <div className="mt-6 grid gap-8 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-3xl text-spectrum sm:text-4xl"
                    style={{ fontFamily: "var(--font-instrument)" }}
                  >
                    {s.value}
                  </div>
                  <p className="mx-auto mt-2 max-w-[15rem] text-[13px] leading-snug text-white/55">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
