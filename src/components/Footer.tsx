import { LogoMark } from "./Logo";

/**
 * Social glyphs are simplified placeholders in brand colours — swap for the
 * official brand marks before launch if you want pixel-exact logos.
 */
const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/unraveledapp",
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
    label: "TikTok",
    href: "https://tiktok.com/@unraveledapp",
    color: "#a32f7b",
    icon: (
      <>
        <path d="M9 17.5V8.2a4.3 4.3 0 0 0 4.3 4.3V9.2A4.3 4.3 0 0 1 13.3 4h-2.6v9.5a2 2 0 1 1-2-2" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/unraveledapp",
    color: "#7a3aa0",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 10.5V16M7 7.5v.01M11 16v-3a2 2 0 0 1 4 0v3" />
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
                  fontFamily: "var(--font-instrument)",
                  letterSpacing: "0.02em",
                }}
              >
                Unraveled
              </span>
            </div>
            <p className="mt-4 text-balance text-[15px] leading-relaxed text-white/55">
              The universal framework for healthier relationships — romantic,
              platonic, and familial. Research-backed, gamified, and built to
              bring you off the screen and into the room.
            </p>
          </div>

          {/* socials */}
          <div className="sm:text-right">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/40">
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
            <p className="mt-3 text-[13px] text-white/45">@unraveledapp</p>
          </div>
        </div>

        {/* spectrum hairline */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />

        <p className="mt-6 text-[13px] text-white/45">© 2026 Unraveled</p>
      </div>
    </footer>
  );
}
