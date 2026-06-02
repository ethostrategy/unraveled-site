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
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <Mark
        animate={false}
        className="h-8 w-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
      />
      <span
        className="text-[1.5rem] italic leading-none text-white"
        style={{ fontFamily: "var(--font-instrument)", letterSpacing: "0.02em" }}
      >
        Unraveled
      </span>
    </Link>
  );
}
