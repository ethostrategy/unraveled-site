import Link from "next/link";

type LogoProps = {
  className?: string;
  /** Inverts the wordmark color for dark backgrounds. */
  light?: boolean;
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="logo-spectrum"
          x1="6"
          y1="58"
          x2="58"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#08327E" />
          <stop offset="0.5" stopColor="#773484" />
          <stop offset="1" stopColor="#C94182" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#logo-spectrum)" />
      {/* the "U" — a thread coming undone */}
      <path
        d="M20 18v16a12 12 0 0 0 24 0V18"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="44" cy="44" r="4" fill="white" />
    </svg>
  );
}

export default function Logo({ className = "", light = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Unraveled — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoMark className="h-9 w-9 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6" />
      <span
        className={`font-display text-[1.45rem] font-600 tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        Unraveled
      </span>
    </Link>
  );
}
