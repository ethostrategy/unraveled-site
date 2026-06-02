import Reveal from "./Reveal";
import SplashForm from "./SplashForm";

export default function CTA() {
  return (
    <section
      id="waitlist"
      className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-20"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Reveal>
        <div className="glass relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* glow accents */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-spectrum/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-10 h-72 w-72 rounded-full bg-spectrum-1/40 blur-3xl" />

          <div className="relative">
            <h2
              className="mx-auto max-w-2xl text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              Build healthier relationships — every kind.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
              Join the first 100 founding members for early access. One reliable
              framework for every relationship in your life.
            </p>

            <div className="mx-auto mt-9 max-w-md text-left">
              <SplashForm submitLabel="Get early access" loadingLabel="Joining…" />
            </div>

            <p className="mt-8 text-sm text-white/55">
              Founding-member spots are limited to the first{" "}
              <span className="font-semibold text-white">100</span>.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
