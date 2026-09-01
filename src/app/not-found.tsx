import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col items-center justify-center px-6 text-center text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Backdrop />

      <LogoMark className="h-14 w-14" />

      <p className="eyebrow mt-8 text-[#e273ac]">404</p>
      <h1
        className="mt-3 max-w-xl text-3xl tracking-tight sm:text-[2.5rem]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        This corner of the universe doesn&apos;t exist.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-balance text-white/80">
        The page you&apos;re looking for wandered off. Let&apos;s get you back.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition-all duration-300 hover:shadow-lg hover:shadow-black/20 active:scale-[0.98]"
      >
        Back home
        <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}
