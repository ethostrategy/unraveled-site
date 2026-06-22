"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { sendInvite } from "@/lib/invite";

const links = [
  { href: "#the-10-blocks", label: "10 Blocks" },
  { href: "#founders", label: "Our Story" },
  { href: "#world", label: "Unraveled Universe" },
  // { href: "#media", label: "Media" }, // hidden until the Media section is back
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
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav
          className={`mt-3 flex items-center rounded-full px-4 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5 ${
            scrolled
              ? "border border-white/10 bg-white/[0.06] shadow-lg shadow-black/30 backdrop-blur-xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          {/* left: logo (equal flex so the links sit dead-centre) */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            <button
              type="button"
              onClick={sendInvite}
              className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-300 hover:shadow-lg hover:shadow-black/20 active:scale-[0.98] sm:inline-flex"
            >
              Send an invite
            </button>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:bg-white/10 md:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-white transition-all duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-5 rounded bg-white transition-all duration-300 ${
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
          className={`glass mx-4 mt-2 origin-top rounded-3xl p-3 shadow-2xl shadow-black/40 transition-all duration-300 ${
            open ? "scale-100 opacity-100" : "-translate-y-2 scale-95 opacity-0"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3.5 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              sendInvite();
            }}
            className="mt-1 block w-full rounded-2xl bg-white px-4 py-3.5 text-center text-base font-semibold text-ink"
          >
            Send an invite
          </button>
        </div>
      </div>
    </header>
  );
}
