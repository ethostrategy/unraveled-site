"use client";

import { useEffect, useState } from "react";
import type { ShareContent } from "@/lib/invite";

/**
 * Mounted once. Opens when any button calls openShare()/sendInvite()/
 * rallyFriends(). Offers the OS share sheet (routes to IG story, Snap,
 * Messages…) plus explicit text / email / X / copy with pre-composed copy.
 */
export default function ShareDialog() {
  const [open, setOpen] = useState(false);
  const [{ text, url }, setContent] = useState<ShareContent>({ text: "", url: "" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onShare = (e: Event) => {
      const detail = (e as CustomEvent<ShareContent>).detail;
      if (!detail) return;
      setContent(detail);
      setCopied(false);
      setOpen(true);
    };
    window.addEventListener("unraveled:share", onShare as EventListener);
    return () =>
      window.removeEventListener("unraveled:share", onShare as EventListener);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const full = `${text} ${url}`.trim();
  const canNative = typeof navigator !== "undefined" && !!navigator.share;

  const channels = [
    {
      label: "Text",
      onClick: () => {
        window.location.href = `sms:?&body=${encodeURIComponent(full)}`;
      },
      icon: <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />,
    },
    {
      label: "Email",
      onClick: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(
          "Come into Unraveled"
        )}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
      },
      icon: (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </>
      ),
    },
    {
      label: "Post to X",
      onClick: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank",
          "noopener"
        );
      },
      icon: <path d="M4 4l16 16M20 4L4 20" />,
    },
    {
      label: copied ? "Copied ✓" : "Copy link",
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(full);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* clipboard blocked */
        }
      },
      icon: (
        <>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h8" />
        </>
      ),
    },
  ];

  async function nativeShare() {
    if (!navigator.share) return;
    try {
      await navigator.share({ title: "Unraveled", text, url });
      setOpen(false);
    } catch {
      /* dismissed */
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div className="glass relative z-10 w-full max-w-md rounded-t-[1.75rem] p-6 sm:rounded-[1.75rem] sm:p-7">
        <div className="flex items-center justify-between">
          <h3
            className="text-xl text-white"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            Spread the word
          </h3>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        <p className="mt-3 rounded-2xl bg-white/5 p-3 text-[13px] leading-relaxed text-white/85">
          {text}{" "}
          <span className="text-spectrum">{url.replace(/^https?:\/\//, "")}</span>
        </p>

        {canNative && (
          <button
            type="button"
            onClick={nativeShare}
            className="mt-4 w-full rounded-xl bg-white py-3 text-[15px] font-semibold text-ink transition hover:shadow-lg hover:shadow-black/20"
          >
            Share…
          </button>
        )}

        <div className="mt-3 grid grid-cols-4 gap-2">
          {channels.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={c.onClick}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-3 text-[11px] font-medium text-white/80 transition-colors hover:bg-white/10"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {c.icon}
              </svg>
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
