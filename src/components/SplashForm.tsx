"use client";

import { useState, type FormEvent } from "react";

/**
 * Pre-launch early-access form: first name, last name, email.
 * Front-end only for now — simulates the request and shows a warm
 * confirmation. Wire `submitToBackend` to your email provider
 * (e.g. a /api/waitlist route, Resend, ConvertKit) when ready.
 */
async function submitToBackend(data: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  // TODO: POST `data` to your email provider / waitlist endpoint.
  await new Promise((r) => setTimeout(r, 850));
  return data;
}

export default function SplashForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    await submitToBackend({ firstName, lastName, email });
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div
        className="rounded-3xl border border-white/25 bg-white/15 p-7 text-center backdrop-blur-xl"
        role="status"
      >
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-white text-ink">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="M5 12.5 10 17.5 19 7"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="font-display text-2xl font-600 text-white">
          You&apos;re in, {firstName.trim()}.
        </p>
        <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-white/80">
          Welcome to the beginning. We&apos;ll email you the moment your door
          opens. 💌
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-2xl border border-white/30 bg-white/15 px-4 py-3.5 text-[15px] text-white outline-none transition placeholder:text-white/65 focus:border-white/60 focus:bg-white/20";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-white/25 bg-white/12 p-4 shadow-[0_30px_60px_-30px_rgba(7,18,60,0.55)] backdrop-blur-xl sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="firstName" className="sr-only">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            className={inputClass}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="lastName" className="sr-only">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            className={inputClass}
          />
        </div>
      </div>

      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        className={`${inputClass} mt-3`}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-3.5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-base font-semibold text-ink transition-all duration-300 hover:shadow-lg hover:shadow-black/15 active:scale-[0.99] disabled:opacity-70"
      >
        {status === "loading" ? "Beginning…" : "Begin your journey"}
        {status !== "loading" && (
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <p
        className={`mt-3.5 min-h-5 text-center text-sm ${
          status === "error" ? "text-white" : "text-white/70"
        }`}
        aria-live="polite"
      >
        {status === "error"
          ? "Please add your name and a valid email."
          : "Early access · 2026 · No spam, ever"}
      </p>
    </form>
  );
}
