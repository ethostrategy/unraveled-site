import Link from "next/link";
import Mark from "./Mark";

/** Small static brand mark (no animation) for nav, footer, etc. */
export function LogoMark({ className }: { className?: string }) {
  return <Mark animate={false} className={className} />;
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Unraveled — home"
      className={`logo-roll group inline-flex items-center gap-2.5 ${className}`}
    >
      <Mark animate={false} className="h-8 w-8 -translate-y-[1.5px]" />
      <span
        className="text-[1.5rem] italic leading-none text-white"
        style={{ fontFamily: "var(--font-instrument)", letterSpacing: "0.02em" }}
      >
        Unraveled
      </span>
    </Link>
  );
}
