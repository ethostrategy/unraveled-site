import Link from "next/link";
import { LogoMark } from "./Logo";

/**
 * Social glyphs are simplified placeholders in brand colours — swap for the
 * official brand marks before launch if you want pixel-exact logos.
 */
// TikTok is hidden until @unraveled_universe goes live — re-add here then.
const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/unraveleduniverse",
    color: "#c94182",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/unraveleduniverse",
    color: "#8FB4F9",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="7" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
        <path d="M7 10.5V17" />
        <path d="M11 17V10.5M11 13.5a2.4 2.4 0 0 1 4.8 0V17" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          {/* brand */}
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <span
                className="text-[1.5rem] italic leading-none text-white"
                style={{
                  fontFamily: "var(--font-serif)",
                  letterSpacing: "0.02em",
                }}
              >
                Unraveled
              </span>
            </div>
            <p className="mt-4 text-balance text-[15px] leading-relaxed text-white/85">
              The universal framework for healthier relationships, built to
              bring you off the screen and into the world.
            </p>
          </div>

          {/* socials */}
          <div className="sm:text-right">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/85">
              Follow along
            </p>
            <div className="mt-3 flex gap-3 sm:justify-end">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/15 transition-all hover:ring-white/30"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke={s.color}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
            <p className="mt-3 text-[13px] text-white/85">@unraveleduniverse</p>
          </div>
        </div>

        {/* spectrum hairline */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/70">
            © 2026 Unraveled LLC · Austin, TX ·{" "}
            <a
              href="mailto:hello@unraveleduniverse.com"
              className="transition-colors hover:text-white"
            >
              hello@unraveleduniverse.com
            </a>
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/70">
            <Link href="/about" className="transition-colors hover:text-white">
              Our Story
            </Link>
            <Link href="/blocks" className="transition-colors hover:text-white">
              The Framework
            </Link>
            <Link href="/cards" className="transition-colors hover:text-white">
              Between Us
            </Link>
            <Link href="/resources" className="transition-colors hover:text-white">
              Resources
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
