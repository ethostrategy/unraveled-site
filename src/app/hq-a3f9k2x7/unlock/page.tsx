import type { Metadata } from "next";
import { Suspense } from "react";
import Backdrop from "@/components/Backdrop";
import UnlockForm from "./UnlockForm";

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

function CubeMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="40 41 120 118" fill="none" stroke="url(#hqlock)" strokeWidth={4.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <defs>
        <linearGradient id="hqlock" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#6f8fd8" />
          <stop offset="0.5" stopColor="#9a7fe0" />
          <stop offset="1" stopColor="#e273ac" />
        </linearGradient>
      </defs>
      <path d="M40,108 L70,93 L100,108 L70,123 Z M40,108 L40,144 L70,159 L70,123 M70,159 L100,144 L100,108 M70,123 L70,159" />
      <path d="M100,108 L130,93 L160,108 L130,123 Z M100,108 L100,144 L130,159 L130,123 M130,159 L160,144 L160,108 M130,123 L130,159" />
      <path d="M70,56 L100,41 L130,56 L100,71 Z M70,56 L70,92 L100,107 L100,71 M100,107 L130,92 L130,56 M100,71 L100,107" />
    </svg>
  );
}

export default function HQUnlock() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-white">
      <Backdrop />
      <div className="relative flex flex-col items-center text-center">
        <CubeMark className="h-12 w-12" />
        <span className="mt-5 text-[13px] font-semibold uppercase tracking-[0.22em] text-white/55">
          Unraveled HQ
        </span>
        <h1 className="mt-3 text-3xl sm:text-4xl" style={{ fontFamily: "var(--font-instrument)" }}>
          Private space
        </h1>
        <p className="mt-2 max-w-[300px] text-[14px] leading-relaxed text-white/60">
          For the team only. Enter the password to continue.
        </p>
        <Suspense fallback={null}>
          <UnlockForm />
        </Suspense>
      </div>
    </main>
  );
}
