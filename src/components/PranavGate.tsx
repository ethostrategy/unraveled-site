"use client";

import { useState, type FormEvent } from "react";
import Backdrop from "@/components/Backdrop";
import { LogoMark } from "@/components/Logo";

/**
 * Password screen shown in place of the intern roadmap until the visitor enters
 * the correct password (checked server-side by /api/pranav-auth).
 */
export default function PranavGate() {
  const [pw, setPw] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!pw) return;
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/pranav-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) {
        const payload = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Incorrect password.");
      }
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  return (
    <div
      className="relative isolate flex min-h-dvh flex-col items-center justify-center px-5 text-center text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Backdrop />

      <LogoMark className="h-12 w-12" />
      <span
        className="mt-4 text-[1.7rem] italic leading-none text-white"
        style={{ fontFamily: "var(--font-instrument)", letterSpacing: "0.02em" }}
      >
        Unraveled
      </span>

      <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#e273ac]">
        Private
      </p>
      <h1
        className="mt-2 text-2xl text-white sm:text-3xl"
        style={{ fontFamily: "var(--font-instrument)" }}
      >
        This page is password protected.
      </h1>

      <form onSubmit={handleSubmit} className="mt-7 w-full max-w-xs">
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          placeholder="Password"
          aria-label="Password"
          className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-center text-[15px] text-white outline-none transition placeholder:text-white/40 focus:border-white/60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-3 w-full rounded-xl bg-white px-6 py-3 text-[15px] font-semibold text-ink transition-all hover:shadow-lg hover:shadow-black/20 active:scale-[0.99] disabled:opacity-70"
        >
          {status === "loading" ? "Checking..." : "Enter"}
        </button>
        {error && <p className="mt-3 text-[13px] text-rose">{error}</p>}
      </form>
    </div>
  );
}
