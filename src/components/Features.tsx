import Reveal from "./Reveal";

type Feature = {
  title: string;
  body: string;
  emoji: string;
  className: string;
  big?: boolean;
};

const features: Feature[] = [
  {
    title: "Readiness Score",
    body: "A living measure of where you stand across the dimensions that actually predict relationship health — updated as you grow, never to judge, only to guide.",
    emoji: "🧭",
    className: "sm:col-span-2",
    big: true,
  },
  {
    title: "Emotional check-ins",
    body: "Two-minute daily moments that track how you're really doing — and quietly surface the patterns underneath.",
    emoji: "💗",
    className: "",
  },
  {
    title: "Pattern insights",
    body: "See the recurring threads in how you connect, attach, and pull away — named clearly, without shame.",
    emoji: "🪡",
    className: "",
  },
  {
    title: "Guided growth paths",
    body: "Therapist-designed practices that turn 'I should work on this' into small steps you'll actually take.",
    emoji: "🌱",
    className: "",
  },
  {
    title: "Private by design",
    body: "Your inner world is yours. End-to-end encrypted, never sold, never used to train anything. Delete it all in one tap.",
    emoji: "🔒",
    className: "sm:col-span-2",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-iris">
              Everything inside
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display text-3xl font-600 tracking-tight text-ink sm:text-[2.7rem]">
              A whole toolkit for the work that matters
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-muted">
              Part mirror, part coach, part quiet companion — designed to make
              self-understanding feel less like homework and more like relief.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={(i % 3) * 90}
              className={f.className}
            >
              <article
                className={`group relative h-full overflow-hidden rounded-[1.75rem] border border-line bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-transparent hover:shadow-2xl hover:shadow-orchid/10 ${
                  f.big ? "sm:p-9" : ""
                }`}
              >
                {/* hover wash */}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-spectrum-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cloud text-2xl ring-1 ring-line transition-colors group-hover:bg-white">
                  {f.emoji}
                </span>
                <h3
                  className={`mt-5 font-display font-600 text-ink ${
                    f.big ? "text-3xl" : "text-xl"
                  }`}
                >
                  {f.title}
                </h3>
                <p
                  className={`mt-2.5 leading-relaxed text-muted ${
                    f.big ? "max-w-md text-[16px]" : "text-[15px]"
                  }`}
                >
                  {f.body}
                </p>
                {f.big && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Attachment", "Regulation", "Communication", "Self-awareness"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink-soft ring-1 ring-line"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
