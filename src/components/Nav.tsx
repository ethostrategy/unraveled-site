"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#science", label: "The science" },
  { href: "#stories", label: "Stories" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav
          className={`mt-3 flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5 ${
            scrolled
              ? "bg-white/80 shadow-lg shadow-ink/5 ring-1 ring-line backdrop-blur-xl"
              : "bg-transparent ring-1 ring-transparent"
          }`}
        >
          <Logo />

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-cloud hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#waitlist"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-spectrum hover:shadow-lg hover:shadow-orchid/30 sm:inline-flex"
            >
              Get early access
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-line transition-colors hover:bg-cloud md:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded bg-ink transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-ink transition-all duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded bg-ink transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div
          className={`mx-4 mt-2 origin-top rounded-3xl bg-white p-3 shadow-2xl shadow-ink/10 ring-1 ring-line transition-all duration-300 ${
            open ? "scale-100 opacity-100" : "-translate-y-2 scale-95 opacity-0"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3.5 text-base font-medium text-ink-soft transition-colors hover:bg-cloud"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-2xl bg-spectrum px-4 py-3.5 text-center text-base font-semibold text-white"
          >
            Get early access
          </a>
        </div>
      </div>
    </header>
  );
}
