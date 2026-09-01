import Reveal from "./Reveal";

const testimonials = [
  {
    quote:
      "I'd never have called myself the problem — but I kept choosing the same unavailable people. Unraveled showed me the pattern so gently I could actually look at it.",
    name: "Jordan M.",
    detail: "Single, by choice now",
    grad: "from-spectrum-9 to-spectrum-7",
  },
  {
    quote:
      "It's the first thing that didn't make me feel broken. The daily check-ins are two minutes and somehow I understand myself more after three weeks than after two years of overthinking.",
    name: "Priya R.",
    detail: "Recently engaged",
    grad: "from-spectrum-6 to-spectrum-3",
  },
  {
    quote:
      "My partner and I both use it. We're not fixing each other anymore — we're each doing our own work and meeting in the middle. Game changer.",
    name: "Sam & Theo",
    detail: "Together 2 years",
    grad: "from-spectrum-4 to-spectrum-2",
  },
  {
    quote:
      "After my divorce I was terrified of getting it wrong again. My readiness score going up week by week gave me something I hadn't had in years: hope I could trust.",
    name: "Marcus D.",
    detail: "Dating again at 41",
    grad: "from-spectrum-8 to-spectrum-10",
  },
];

export default function Testimonials() {
  return (
    <section
      id="stories"
      className="relative scroll-mt-24 py-24 sm:py-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-rose">Stories</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-5 text-3xl tracking-tight text-white sm:text-[2.7rem]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Quiet shifts, real change
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-white/60">
              Early testers, in their own words. Names changed, feelings real.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 gap-5 sm:columns-2 [&>*]:mb-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 110} className="break-inside-avoid">
              <figure className="glass glass-hover rounded-[1.75rem] p-7">
                <div className="flex gap-1 text-rose" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                      <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 text-[16px] leading-relaxed text-white/75">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${t.grad} text-sm font-semibold text-white`}
                  >
                    {t.name
                      .split(/[\s&]+/)
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-white/65">{t.detail}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
