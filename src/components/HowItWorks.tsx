import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Reflect",
    body: "Start with a science-backed readiness assessment across the dimensions that actually predict healthy relationships — attachment, regulation, communication, and self-awareness.",
    accent: "from-spectrum-1 to-spectrum-3",
    icon: (
      <path
        d="M12 3a9 9 0 1 0 9 9M12 7v5l3 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    n: "02",
    title: "Discover",
    body: "Unravel your patterns with personalized insights and gentle daily check-ins. See where you shine, where you snag, and the story underneath the way you love.",
    accent: "from-spectrum-5 to-spectrum-7",
    icon: (
      <path
        d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    n: "03",
    title: "Grow",
    body: "Follow guided growth paths built with therapists — small, doable practices that turn insight into change, so you show up to your next relationship genuinely ready.",
    accent: "from-spectrum-8 to-spectrum-10",
    icon: (
      <path
        d="M12 20v-9m0 0c0-3 2-5 5-5 0 3-2 5-5 5Zm0 0C12 8 10 6 7 6c0 3 2 5 5 5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 bg-cloud/60 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orchid">
              How it works
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-600 tracking-tight text-ink sm:text-[2.7rem]">
              Three steps from tangled to ready
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-muted">
              No quizzes that flatter you. A real, gentle process that meets you
              where you are.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
          {/* connecting line on desktop */}
          <div className="absolute left-0 right-0 top-[4.5rem] hidden h-px bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-30 lg:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="group relative h-full rounded-[1.75rem] border border-line bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orchid/10">
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-lg`}
                  >
                    <svg viewBox="0 0 24 24" className="h-7 w-7">
                      {s.icon}
                    </svg>
                  </span>
                  <span className="font-display text-5xl font-600 text-line transition-colors group-hover:text-cloud">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-600 text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
