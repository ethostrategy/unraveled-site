import Mark from "@/components/Mark";
import SplashForm from "@/components/SplashForm";

/**
 * Splash / early-access door.
 * The visitor arrives in the dark, then is "let in": the deep, secretive
 * gradient dissolves on load to reveal its warm true form — as if stepping
 * into the world of Unraveled. The three-block mark is kept as-is; the
 * "Unraveled" wordmark is live Fraunces so the type can be tuned.
 */
export default function Home() {
  return (
    <main
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-[#050410] px-5 py-16"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      {/* Background — "bold aurora": a vivid rose glow up top-left meeting a
          deep, luminous blue sweeping in from the bottom-right, on near-black.
          One continuous field that nods to the full brand spectrum. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(110% 85% at 18% 10%, rgba(201,65,130,0.50) 0%, rgba(8,7,28,0) 62%),
            radial-gradient(120% 100% at 90% 122%, rgba(10,64,158,0.56) 0%, rgba(8,7,28,0) 60%),
            linear-gradient(180deg, #08061c 0%, #0a0822 60%, #0a0b28 100%)
          `,
        }}
      />
      {/* Edge vignette — seals the "being let in" feeling */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 105% at 50% 42%, transparent 52%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[520px] text-center">
        {/* Three-block mark (kept as-is) — enlarged with a stronger glow so it
            stands out as the hero of the page */}
        <div className="relative mx-auto w-fit animate-float-slow">
          {/* Breathing glow halo — slowly swells and settles, like a pulse */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-[200%] w-[200%] animate-breathe rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(201,65,130,0.6) 0%, rgba(119,52,132,0.35) 38%, rgba(201,65,130,0) 70%)",
            }}
          />
          {/* White mark, warming up on entry */}
          <div className="relative animate-door-warm">
            <Mark className="mx-auto h-auto w-[80px] sm:w-[92px]" />
          </div>
        </div>

        {/* Live wordmark — Instrument Serif italic, title case, airy spacing */}
        <h1
          className="mt-5 text-6xl italic leading-none text-white sm:text-7xl"
          style={{ fontFamily: "var(--font-instrument)", letterSpacing: "0.06em" }}
        >
          Unraveled
        </h1>

        <p className="mx-auto mt-5 text-[13px] uppercase leading-relaxed tracking-[0.2em] text-white/70 sm:text-sm">
          Level up your relationships
        </p>

        <div className="mx-auto mt-8 max-w-[440px]">
          <SplashForm />
        </div>
      </div>
    </main>
  );
}
