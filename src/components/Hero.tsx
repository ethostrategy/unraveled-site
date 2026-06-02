import AppMockup from "./AppMockup";
import SplashForm from "./SplashForm";
import Reveal from "./Reveal";

const avatars = ["#08327E", "#41398F", "#773484", "#98327E", "#C94182"];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* left: copy */}
        <div className="relative z-10 text-center lg:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/75 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-spectrum" />
              The universal relationship framework
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1
              className="mt-6 text-[2.9rem] leading-[1.02] text-white sm:text-6xl lg:text-[4.3rem]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              Level up{" "}
              <span className="italic text-spectrum">every</span>{" "}
              relationship in your life.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/65 lg:mx-0">
              Romantic, platonic, familial — even the one with yourself.
              Unraveled turns scattered, contradictory advice into one reliable
              framework you can actually build on, whoever you&apos;re building
              with.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mx-auto mt-8 max-w-md lg:mx-0" id="waitlist-hero">
              <SplashForm submitLabel="Get early access" loadingLabel="Joining…" />
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
              <div className="flex -space-x-2.5">
                {avatars.map((c, i) => (
                  <span
                    key={i}
                    className="h-8 w-8 rounded-full ring-2 ring-[#0a0822]"
                    style={{
                      background: `linear-gradient(135deg, ${c}, ${
                        avatars[(i + 2) % avatars.length]
                      })`,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-white/55">
                Be one of the first{" "}
                <span className="font-semibold text-white">100</span> founding
                members
              </p>
            </div>
          </Reveal>
        </div>

        {/* right: app mockup */}
        <Reveal delay={200} className="relative z-10">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-spectrum opacity-30 blur-3xl" />
            <div className="animate-[float_7s_ease-in-out_infinite]">
              <AppMockup />
            </div>

            {/* floating chips */}
            <div className="absolute -left-2 top-10 hidden animate-[float_9s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-white/10 p-3 shadow-xl shadow-black/30 backdrop-blur-xl sm:flex sm:items-center sm:gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
                💬
              </span>
              <div className="pr-1 text-left">
                <p className="text-[11px] font-semibold text-white">
                  Daily check-in
                </p>
                <p className="text-[10px] text-white/60">2 min · streak 14</p>
              </div>
            </div>

            <div className="absolute -right-3 bottom-16 hidden animate-[float_11s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-white/10 p-3 shadow-xl shadow-black/30 backdrop-blur-xl sm:flex sm:items-center sm:gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-spectrum text-sm text-white">
                ✓
              </span>
              <div className="pr-1 text-left">
                <p className="text-[11px] font-semibold text-white">
                  Pattern spotted
                </p>
                <p className="text-[10px] text-white/60">Anxious → secure</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
