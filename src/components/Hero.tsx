import AppMockup from "./AppMockup";
import WaitlistForm from "./WaitlistForm";
import Reveal from "./Reveal";

const avatars = ["#08327E", "#41398F", "#773484", "#98327E", "#C94182"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* ambient glows */}
      <div className="glow left-[-10%] top-[-6%] h-[34rem] w-[34rem] bg-passion/40" />
      <div className="glow right-[-12%] top-[10%] h-[30rem] w-[30rem] bg-trust/40" />
      <div className="glow left-[30%] top-[40%] h-[26rem] w-[26rem] bg-orchid/30" />
      <div className="absolute inset-0 bg-dotgrid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* left: copy */}
        <div className="relative z-10 text-center lg:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-spectrum px-4 py-1.5 text-sm font-medium text-ink-soft">
              <span className="h-2 w-2 rounded-full bg-spectrum" />
              Relationship readiness, meet emotional health
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[2.7rem] font-600 leading-[1.04] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.1rem]">
              Know you&apos;re{" "}
              <span className="text-spectrum">ready</span>{" "}
              for love that lasts.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
              Unraveled helps you understand your patterns, heal what holds you
              back, and walk into your next relationship clear, grounded, and
              genuinely ready — not just hoping for the best.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mx-auto mt-8 max-w-md lg:mx-0" id="waitlist-hero">
              <WaitlistForm />
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex -space-x-2.5">
                {avatars.map((c, i) => (
                  <span
                    key={i}
                    className="h-8 w-8 rounded-full ring-2 ring-white"
                    style={{
                      background: `linear-gradient(135deg, ${c}, ${
                        avatars[(i + 2) % avatars.length]
                      })`,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted">
                <span className="font-semibold text-ink">12,000+</span> people
                getting ready, together
              </p>
            </div>
          </Reveal>
        </div>

        {/* right: app mockup */}
        <Reveal delay={200} className="relative z-10">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-spectrum opacity-20 blur-2xl" />
            <div className="animate-[float_7s_ease-in-out_infinite]">
              <AppMockup />
            </div>

            {/* floating chips */}
            <div className="absolute -left-2 top-10 hidden animate-[float_9s_ease-in-out_infinite] rounded-2xl bg-white p-3 shadow-xl shadow-ink/10 ring-1 ring-line sm:flex sm:items-center sm:gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-spectrum-soft">
                💬
              </span>
              <div className="pr-1 text-left">
                <p className="text-[11px] font-semibold text-ink">Daily check-in</p>
                <p className="text-[10px] text-muted">2 min · streak 14</p>
              </div>
            </div>

            <div className="absolute -right-3 bottom-16 hidden animate-[float_11s_ease-in-out_infinite] rounded-2xl bg-white p-3 shadow-xl shadow-ink/10 ring-1 ring-line sm:flex sm:items-center sm:gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-spectrum text-sm text-white">
                ✓
              </span>
              <div className="pr-1 text-left">
                <p className="text-[11px] font-semibold text-ink">Pattern spotted</p>
                <p className="text-[10px] text-muted">Anxious → secure</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
