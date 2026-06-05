"use client";

import Reveal from "./Reveal";
import { sendInvite } from "@/lib/invite";

export default function CTA() {
  return (
    <section
      id="invite"
      className="scroll-mt-24 px-4 py-12 sm:px-6 sm:py-20"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Reveal>
        <div className="glass relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* glow accents */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-spectrum/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-10 h-72 w-72 rounded-full bg-spectrum-1/40 blur-3xl" />

          <div className="relative">
            <h2
              className="mx-auto max-w-2xl text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              You&apos;re in. Bring someone with you.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-white/85">
              Unraveled only gets better with the people you love in it.
            </p>

            <button
              type="button"
              onClick={sendInvite}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink transition-all duration-300 hover:shadow-lg hover:shadow-black/20 active:scale-[0.98]"
            >
              Share your invite
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
