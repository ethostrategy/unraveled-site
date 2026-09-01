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
      {/* rests as the assembled pyramid (correct alignment); rolls on hover */}
      <Mark animate={false} className="h-8 w-8 -translate-y-[1.5px]" />
      <span
        className="text-[1.05rem] font-light uppercase leading-none text-white"
        style={{ fontFamily: "var(--font-outfit)", letterSpacing: "0.26em" }}
      >
        Unraveled
      </span>
    </Link>
  );
}
