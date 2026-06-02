"use client";

import { useEffect, useState, type FormEvent } from "react";

/**
 * Pre-launch early-access form: first name + email (last name is collected
 * later, at real onboarding — fewer fields converts better here).
 *
 * Posts to /api/waitlist, which stores the signup in Airtable and returns the
 * new member's place in line plus a personal referral code. The success state
 * turns that into a share loop: invite friends, move up the list.
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
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<SignupResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  // Capture an incoming invite code (?ref=CODE) so we can credit the referrer.
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("ref");
    if (code) setReferredBy(code.trim().slice(0, 32));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!firstName.trim()) {
      setErrorMsg("Please add your name and a valid email.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please add your name and a valid email.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await submitToBackend({ firstName, email, referredBy, company });
      setResult(res);
      setStatus("done");
      // Remember this member: the gate skips the splash next time, and the
      // invite button can personalize with their referral code.
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
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    const shareUrl = result?.referralCode
      ? `${window.location.origin}/?ref=${result.referralCode}`
      : window.location.origin;

    async function copyLink() {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    }

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

        {typeof result?.position === "number" && (
          <p className="mt-3 text-[15px] text-white/80">
            You&apos;re{" "}
            <span className="font-600 text-white">
              #{result.position.toLocaleString()}
            </span>{" "}
            in line.
          </p>
        )}

        <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-white/80">
          Want in sooner? Every friend who joins with your link moves you up. ✨
        </p>

        {result?.referralCode && (
          <div className="mt-5">
            <div className="flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 p-1.5 pl-4">
              <span className="flex-1 truncate text-left text-[13px] text-white/75">
                {shareUrl.replace(/^https?:\/\//, "")}
              </span>
              <button
                type="button"
                onClick={copyLink}
                className="shrink-0 rounded-xl bg-white px-4 py-2 text-[13px] font-600 text-ink transition hover:shadow-lg hover:shadow-black/15 active:scale-[0.98]"
              >
                {copied ? "Copied ✓" : "Copy link"}
              </button>
            </div>
          </div>
        )}

        <a
          href="/preview"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[15px] font-semibold text-ink transition hover:shadow-lg hover:shadow-black/15 active:scale-[0.98]"
        >
          Step inside
          <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-white/30 bg-white/15 px-4 py-3 text-[15px] text-white outline-none transition placeholder:text-white/65 focus:border-white/60 focus:bg-white/20";

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
              if (status === "error") setStatus("idle");
            }}
            className={inputClass}
          />
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
              if (status === "error") setStatus("idle");
            }}
            className={inputClass}
          />
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

      <p
        className="text-center text-sm text-white empty:hidden mt-2.5"
        aria-live="polite"
      >
        {status === "error" ? errorMsg : ""}
      </p>
    </form>
  );
}
