import { LogoMark } from "./Logo";

const groups = [
  {
    title: "Product",
    links: ["How it works", "Features", "The science", "Pricing", "Early access"],
  },
  {
    title: "Company",
    links: ["About", "Our approach", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Blog", "Readiness guide", "Help center", "For therapists"],
  },
];

const socials = [
  { label: "Instagram", handle: "@unraveledapp", href: "https://instagram.com/unraveledapp" },
  { label: "TikTok", handle: "@unraveledapp", href: "https://tiktok.com/@unraveledapp" },
  { label: "LinkedIn", handle: "@unraveledapp", href: "https://linkedin.com/company/unraveledapp" },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* brand */}
          <div>
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
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/55">
              The relationship readiness and emotional-health app. Understand
              your patterns, heal what holds you back, and show up ready.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full text-xs font-semibold text-white/70 ring-1 ring-white/15 transition-colors hover:bg-spectrum hover:text-white hover:ring-transparent"
                  aria-label={`${s.label} — ${s.handle}`}
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
            <p className="mt-3 text-[13px] text-white/45">@unraveledapp</p>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="text-sm font-semibold text-white">{g.title}</h3>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-white/55 transition-colors hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* spectrum hairline */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-white/50 sm:flex-row">
          <p>© {2026} Unraveled. Made with care for the work of becoming ready.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
