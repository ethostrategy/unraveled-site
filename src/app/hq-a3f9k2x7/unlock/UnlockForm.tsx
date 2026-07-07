"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const HQ = "/hq-a3f9k2x7";

export default function UnlockForm() {
  const router = useRouter();
  const params = useSearchParams();
  // only allow redirects back inside the HQ hub (no open redirect)
  const rawNext = params.get("next") || HQ;
  const next = rawNext.startsWith(`${HQ}`) ? rawNext : HQ;

  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!pw) return;
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/hq-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        router.replace(next);
        router.refresh();
      } else if (res.status === 503) {
        setErr("The gate isn't configured yet.");
      } else {
        setErr("Incorrect password.");
      }
    } catch {
      setErr("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-7 w-full max-w-[320px]">
      <label htmlFor="hq-pw" className="sr-only">
        HQ password
      </label>
      <input
        id="hq-pw"
        type="password"
        autoFocus
        autoComplete="current-password"
        value={pw}
        onChange={(e) => {
          setPw(e.target.value);
          if (err) setErr("");
        }}
        placeholder="Password"
        className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder-white/35 outline-none focus:border-[#e273ac]/60 focus:bg-white/[0.09]"
      />
      {err && <p className="mt-2 text-[13px] text-[#e273ac]">{err}</p>}
      <button
        type="submit"
        disabled={loading || !pw}
        className="mt-3 w-full rounded-xl bg-[#c94182] px-4 py-3 text-[15px] font-semibold text-white transition disabled:opacity-50"
      >
        {loading ? "Unlocking…" : "Enter HQ"}
      </button>
    </form>
  );
}
