import Reveal from "./Reveal";
import WaitlistForm from "./WaitlistForm";

export default function CTA() {
  return (
    <section id="waitlist" className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-20">
      <Reveal>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-spectrum px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* texture + glow */}
          <div className="absolute inset-0 bg-dotgrid opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="glow left-[12%] top-[10%] h-64 w-64 bg-white/20" />
          <div className="glow right-[8%] bottom-[0%] h-72 w-72 bg-spectrum-1/40" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-600 leading-[1.08] tracking-tight text-white sm:text-5xl">
              Become the person your next relationship deserves.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
              Join the waitlist for early access in 2026. Be first to unravel
              what&apos;s been holding you back — and walk in ready.
            </p>

            <div className="mx-auto mt-9 max-w-lg">
              <WaitlistForm variant="light" />
            </div>

            <p className="mt-8 text-sm text-white/70">
              Joining{" "}
              <span className="font-semibold text-white">12,000+</span> others
              doing the work before the relationship — not during it.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
