"use client";

import { useEffect, useState, type FormEvent } from "react";

/**
 * Pre-launch early-access form: first name + email (last name is collected
 * later, at real onboarding — fewer fields converts better here).
 *
 * Posts to /api/waitlist, which stores the signup in Airtable and returns a
 * personal referral code. The success state turns that into a share loop:
 * invite friends so they come in with you. (No "place in line" is shown.)
 */
type SignupResult = {
  ok?: boolean;
  referralCode?: string;
  position?: number | null;
  error?: string;
};

async function submitToBackend(data: {
  firstName: string;
  email: string;
  referredBy: string;
  company: string; // honeypot
}): Promise<SignupResult> {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const payload = (await res.json().catch(() => ({}))) as SignupResult;
  if (!res.ok) {
    throw new Error(payload.error ?? "Signup failed. Please try again.");
  }
  return payload;
}

export default function SplashForm({
  submitLabel = "Push to start",
  loadingLabel = "Starting…",
}: {
  /** Button text. "Let me in" is splash-only; other placements pass their own. */
  submitLabel?: string;
  loadingLabel?: string;
} = {}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [referredBy, setReferredBy] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // server/submission errors only
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string;
    email?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  // Capture an incoming invite code (?ref=CODE) so we can credit the referrer.
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("ref");
    if (code) setReferredBy(code.trim().slice(0, 32));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: { firstName?: string; email?: string } = {};
    if (!firstName.trim()) errs.firstName = "Enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email";
    if (errs.firstName || errs.email) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setErrorMsg("");
    setStatus("loading");
    try {
      const res = await submitToBackend({ firstName, email, referredBy, company });
      // Remember this member so the gate skips the splash next time. The
      // referral code is still stored for whenever a share incentive exists.
      try {
        document.cookie = `unraveled_member=1; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
        window.localStorage.setItem("unraveled_member", "1");
        window.localStorage.setItem("unraveled_name", firstName.trim());
        window.localStorage.setItem("unraveled_email", email.trim());
        if (res.referralCode)
          window.localStorage.setItem("unraveled_ref", res.referralCode);
      } catch {
        /* storage blocked — non-fatal */
      }
      // Straight into the site — no interstitial screen.
      window.location.href = "/preview";
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  const inputBase =
    "w-full rounded-xl border bg-white/15 px-4 py-3 text-[15px] text-white outline-none transition placeholder:text-white/85 focus:bg-white/20";
  const borderFor = (err?: string) =>
    err
      ? "border-rose/80 focus:border-rose"
      : "border-white/30 focus:border-white/60";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-white/25 bg-white/12 p-3.5 shadow-[0_30px_60px_-30px_rgba(7,18,60,0.55)] backdrop-blur-xl sm:p-4"
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
              if (fieldErrors.firstName)
                setFieldErrors((p) => ({ ...p, firstName: undefined }));
            }}
            aria-invalid={!!fieldErrors.firstName}
            className={`${inputBase} ${borderFor(fieldErrors.firstName)}`}
          />
          {fieldErrors.firstName && (
            <p className="mt-1 px-1 text-left text-[12px] text-rose">
              {fieldErrors.firstName}
            </p>
          )}
        </div>
        <div className="flex-1">
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
              if (fieldErrors.email)
                setFieldErrors((p) => ({ ...p, email: undefined }));
            }}
            aria-invalid={!!fieldErrors.email}
            className={`${inputBase} ${borderFor(fieldErrors.email)}`}
          />
          {fieldErrors.email && (
            <p className="mt-1 px-1 text-left text-[12px] text-rose">
              {fieldErrors.email}
            </p>
          )}
        </div>
      </div>

      {/* Honeypot — hidden from users, catches bots. */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-ink transition-all duration-300 hover:shadow-lg hover:shadow-black/15 active:scale-[0.99] disabled:opacity-70"
      >
        {status === "loading" ? loadingLabel : submitLabel}
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

      {errorMsg && (
        <p
          className="mt-2.5 text-center text-[13px] text-rose"
          aria-live="polite"
        >
          {errorMsg}
        </p>
      )}
    </form>
  );
}
