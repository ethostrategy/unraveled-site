"use client";

import { useState, type FormEvent } from "react";

type WaitlistFormProps = {
  /** "light" for use on the dark gradient CTA band. */
  variant?: "default" | "light";
  className?: string;
};

export default function WaitlistForm({
  variant = "default",
  className = "",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const light = variant === "light";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // No backend yet — simulate the request so the UX is complete.
    // Wire this to your email provider (e.g. /api/waitlist) when ready.
    await new Promise((r) => setTimeout(r, 850));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div
        className={`flex items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-sm font-medium ${
          light
            ? "border-white/30 bg-white/15 text-white"
            : "border-spectrum bg-white text-ink"
        } ${className}`}
        role="status"
      >
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-spectrum text-white">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
            <path
              d="M4 10.5 8 14.5 16 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        You&apos;re on the list. We&apos;ll be in touch soon. 💌
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`w-full ${className}`}
    >
      <div
        className={`flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-1.5 ${
          light
            ? "sm:bg-white/15 sm:ring-1 sm:ring-white/25"
            : "sm:bg-white sm:ring-1 sm:ring-line sm:ring-spectrum-shadow"
        }`}
      >
        <label htmlFor={`wl-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`wl-${variant}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className={`min-w-0 flex-1 rounded-full px-5 py-3.5 text-base outline-none placeholder:text-muted/70 ${
            light
              ? "bg-white/10 text-white placeholder:text-white/60 ring-1 ring-white/20 sm:bg-transparent sm:ring-0"
              : "bg-cloud text-ink ring-1 ring-line sm:bg-transparent sm:ring-0"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`shrink-0 rounded-full px-6 py-3.5 text-base font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-70 ${
            light
              ? "bg-white text-ink hover:shadow-lg hover:shadow-black/10"
              : "bg-spectrum text-white hover:brightness-105 hover:shadow-lg hover:shadow-orchid/30"
          }`}
        >
          {status === "loading" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      <p
        className={`mt-2.5 min-h-5 pl-1 text-sm ${
          status === "error"
            ? "text-passion"
            : light
              ? "text-white/70"
              : "text-muted"
        }`}
        aria-live="polite"
      >
        {status === "error"
          ? "Please enter a valid email address."
          : "Free to join · No spam, ever · Early access in 2026"}
      </p>
    </form>
  );
}
