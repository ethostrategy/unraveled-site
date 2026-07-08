import type { Metadata } from "next";
import Backdrop from "@/components/Backdrop";
import { signIn } from "@/auth";

export const metadata: Metadata = {
  title: "Unraveled · HQ",
  robots: { index: false, follow: false },
};

const HQ = "/hq-a3f9k2x7";

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

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

export default async function HQUnlock({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const dest = next && next.startsWith(HQ) ? next : HQ;

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 text-white">
      <Backdrop />
      <div className="relative flex flex-col items-center text-center">
        <CubeMark className="h-12 w-12" />
        <span className="mt-5 text-[13px] font-semibold uppercase tracking-[0.22em] text-white/55">
          Unraveled HQ
        </span>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: dest });
          }}
          className="mt-7"
        >
          <button
            type="submit"
            className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3 text-[15px] font-medium text-white transition hover:bg-white/[0.1]"
          >
            <GoogleG />
            Continue with Google
          </button>
        </form>
      </div>
    </main>
  );
}
