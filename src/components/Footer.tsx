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

const socials = ["Instagram", "TikTok", "X", "LinkedIn"];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-cloud/50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <span className="font-display text-[1.45rem] font-600 tracking-tight text-ink">
                Unraveled
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
              The relationship readiness and emotional-health app. Understand
              your patterns, heal what holds you back, and show up ready.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full text-xs font-semibold text-ink-soft ring-1 ring-line transition-colors hover:bg-spectrum hover:text-white hover:ring-transparent"
                  aria-label={s}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g.title}>
                <h3 className="text-sm font-semibold text-ink">{g.title}</h3>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-muted transition-colors hover:text-ink"
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

        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
          <p>© {2026} Unraveled. Made with care for the work of becoming ready.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-ink">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
