"use client";

import { useEffect } from "react";

/**
 * Safety "Quick exit" — leaves the page instantly for anyone who may be viewing
 * in an unsafe situation. Standard on domestic-violence resource pages.
 *
 * Uses location.replace so this page is dropped from history (the Back button
 * won't return here), then lands on a neutral site. Also fires on the Escape
 * key. Fixed and always reachable while scrolling.
 */
export default function QuickExit() {
  const leave = () => {
    window.location.replace("https://www.google.com");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") leave();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <button
      type="button"
      onClick={leave}
      aria-label="Quick exit — leave this page immediately"
      className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#0a0822] shadow-[0_6px_24px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition hover:bg-white/90 sm:right-6 sm:top-6"
    >
      Quick exit
      <span aria-hidden className="text-base leading-none">&times;</span>
    </button>
  );
}
