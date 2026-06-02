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
    <section
      id="features"
      className="relative scroll-mt-24 py-24 sm:py-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-iris">Everything inside</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-5 text-3xl tracking-tight text-white sm:text-[2.7rem]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              A whole toolkit for the work that matters
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-white/60">
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
                className={`glass glass-hover group relative h-full overflow-hidden rounded-[1.75rem] p-7 hover:-translate-y-1 ${
                  f.big ? "sm:p-9" : ""
                }`}
              >
                {/* hover wash */}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-spectrum/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-2xl ring-1 ring-white/10 transition-colors group-hover:bg-white/15">
                  {f.emoji}
                </span>
                <h3
                  className={`mt-5 text-white ${
                    f.big ? "text-3xl" : "text-xl"
                  }`}
                  style={{ fontFamily: "var(--font-instrument)" }}
                >
                  {f.title}
                </h3>
                <p
                  className={`mt-2.5 leading-relaxed text-white/60 ${
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
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70 ring-1 ring-white/10"
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
