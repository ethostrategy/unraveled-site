import Image from "next/image";
import SplashForm from "@/components/SplashForm";

// Exact brand background, sampled from the supplied gradient (blue → raspberry).
const brandGradient =
  "linear-gradient(180deg,#0A3C9A 0%,#2C3993 16%,#41388F 25%,#51368C 33%,#773384 50%,#99327D 66%,#BF2E77 83%,#D22D73 92%,#CE2864 100%)";

export default function Home() {
  return (
    <main
      style={{ backgroundImage: brandGradient }}
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-16"
    >
      <div className="relative z-10 w-full max-w-[520px] text-center">
        <Image
          src="/logos/unraveled-white.png"
          alt="Unraveled"
          width={1500}
          height={700}
          priority
          className="mx-auto h-auto w-[min(420px,86%)]"
        />

        <p className="mx-auto mt-7 max-w-[28ch] text-lg leading-relaxed text-white/90 sm:text-xl">
          The world&apos;s first{" "}
          <span className="font-600 text-white">
            relationship health app
          </span>
        </p>

        <div className="mx-auto mt-9 max-w-[440px]">
          <SplashForm />
        </div>
      </div>
    </main>
  );
}
