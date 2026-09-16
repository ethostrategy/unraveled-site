"use client";

import { useEffect, useState, type FormEvent } from "react";
import { sendInvite } from "@/lib/invite";

/**
 * Public early-access / newsletter signup. Unlike the old SplashForm, this does
 * NOT gate the site — there's no member cookie and no redirect. It captures the
 * signup (first name + email → /api/waitlist → Airtable, later synced to
 * Beehiiv) and shows an inline success state that invites the new member to
 * bring a friend. Used in the Hero and the "Join" band.
 *
 * A plain-language privacy disclosure sits right on the form (what we collect,
 * why, and the way out), linking to /privacy — this is the transparency the
 * form needs when it collects a name and email.
 */
export default function Signup({
  submitLabel = "Join the waitlist",
  loadingLabel = "Joining…",
  compact = false,
}: {
  submitLabel?: string;
  loadingLabel?: string;
  /** Tighter padding/typographic scale for in-hero placement. */
  compact?: boolean;
} = {}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [referredBy, setReferredBy] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string;
    email?: string;
  }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

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
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, referredBy, company }),
        keepalive: true,
      });
      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        referralCode?: string;
      };
      if (!res.ok) {
        throw new Error(payload.error ?? "Couldn't save your spot. Please try again.");
      }
      // Remember this member's referral code so their share links credit them.
      try {
        if (payload.referralCode)
          window.localStorage.setItem("unraveled_ref", payload.referralCode);
        window.localStorage.setItem("unraveled_name", firstName.trim());
        window.localStorage.setItem("unraveled_email", email.trim());
      } catch {
        /* storage blocked — non-fatal */
      }
      setStatus("done");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
      setStatus("idle");
    }
  }

  const inputBase =
    "w-full rounded-xl border bg-white/15 px-4 py-3 text-[15px] text-white outline-none transition placeholder:text-white/60 focus:bg-white/20";
  const borderFor = (err?: string) =>
    err
      ? "border-rose/80 focus:border-rose"
      : "border-white/30 focus:border-white/60";

  const shell = compact
    ? "rounded-3xl border border-white/25 bg-white/12 p-3.5 shadow-[0_30px_60px_-30px_rgba(7,18,60,0.55)] backdrop-blur-xl sm:p-4"
    : "rounded-3xl border border-white/20 bg-white/[0.08] p-4 shadow-[0_30px_60px_-30px_rgba(7,18,60,0.55)] backdrop-blur-xl sm:p-5";

  // ── Success state — no gate, just a warm confirmation + a share nudge ──
  if (status === "done") {
    return (
      <div className={`${shell} text-center`} aria-live="polite">
        <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p
          className="mt-4 text-xl text-white"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          You&apos;re on the list{firstName ? `, ${firstName.trim()}` : ""}.
        </p>
        <p className="mx-auto mt-2 max-w-sm text-[14px] leading-relaxed text-white/75">
          We&apos;ll be in touch as early access opens. Unraveled is better with
          your people in it — bring someone along.
        </p>
        <button
          type="button"
          onClick={sendInvite}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink transition-all duration-300 hover:shadow-lg hover:shadow-black/20 active:scale-[0.98]"
        >
          Invite a friend
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
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={shell}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="su-firstName" className="sr-only">
            First name
          </label>
          <input
            id="su-firstName"
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
          <label htmlFor="su-email" className="sr-only">
            Email address
          </label>
          <input
            id="su-email"
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
        <label htmlFor="su-company">Company</label>
        <input
          id="su-company"
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
        <p className="mt-2.5 text-center text-[13px] text-rose" aria-live="polite">
          {errorMsg}
        </p>
      )}

      {/* Plain-language privacy disclosure — what we collect, why, the way out. */}
      <p className="mt-3 text-balance text-center text-[12.5px] leading-relaxed text-white/60">
        We&apos;ll only use your name and email to send occasional Unraveled
        updates. No spam, no sharing, leave anytime.{" "}
        <a href="/privacy" className="underline decoration-white/30 underline-offset-2 hover:text-white/85">
          Privacy
        </a>
        .
      </p>
    </form>
  );
}
