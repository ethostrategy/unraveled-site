import Reveal from "./Reveal";
import Signup from "./Signup";

/**
 * The primary conversion band near the foot of the homepage. Public-facing
 * replacement for the old invite-only CTA: it asks for the signup directly
 * (the share/invite loop now lives in the Signup success state). Anchored at
 * #join so "Get early access" links can scroll here.
 */
export default function JoinBand() {
  return (
    <section
      id="join"
      className="scroll-mt-24 px-4 pb-12 pt-4 sm:px-6 sm:pb-20 sm:pt-6"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Reveal>
        <div className="glass relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] px-6 py-14 text-center sm:px-12 sm:py-16">
          {/* glow accents */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-spectrum/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-10 h-72 w-72 rounded-full bg-spectrum-1/40 blur-3xl" />

          <div className="relative">
            <h2
              className="mx-auto max-w-2xl text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Be first through the door.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-white/85">
              Join the waitlist for early access to the app, the card game, and
              everything we&apos;re building.
            </p>

            <div className="mx-auto mt-8 max-w-lg text-left">
              <Signup submitLabel="Join the waitlist" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
