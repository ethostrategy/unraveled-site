"use client";

import { useState } from "react";

/**
 * "This is just the beginning" — the core app sits at the centre of a wider
 * world. Each future product is a locked node with a riddle; tap to reveal what
 * it is (it stays "coming soon"). Like unlocking characters in a game.
 */

type Node = {
  cat: string;
  name: string;
  riddle: string;
  emoji: string;
};

const NODES: Node[] = [
  {
    cat: "IRL · Live",
    name: "Live Experiences",
    emoji: "🎭",
    riddle: "Lights low, walls up. Strangers walk in; teammates walk out. Play is the password.",
  },
  {
    cat: "Game · Cards",
    name: "The Card Game",
    emoji: "🃏",
    riddle: "Fifty-two prompts. Shuffle, draw, and say the thing you'd never say first.",
  },
  {
    cat: "Event · Invite-only",
    name: "Secret Galas",
    emoji: "🥂",
    riddle: "An address you only get if you're invited. Masks optional — honesty required.",
  },
  {
    cat: "Audio",
    name: "The Podcast",
    emoji: "🎙️",
    riddle: "Press play to eavesdrop on the conversations everyone needs and no one starts.",
  },
  {
    cat: "Wear",
    name: "Merch",
    emoji: "🧥",
    riddle: "Wear the blocks. A quiet flex for the emotionally fluent.",
  },
];

function LockedCard({ node }: { node: Node }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="glass glass-hover group relative flex h-full min-h-[180px] flex-col rounded-[1.5rem] p-6 text-left"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          {node.cat}
        </span>
        <span
          className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm transition-transform duration-500 group-hover:scale-110"
          aria-hidden
        >
          {open ? "🔓" : "🔒"}
        </span>
      </div>

      {open ? (
        <div className="mt-4 flex flex-1 flex-col justify-center text-center">
          <span className="text-3xl">{node.emoji}</span>
          <p
            className="mt-2 text-xl text-white"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            {node.name}
          </p>
          <span className="mt-1 text-[12px] uppercase tracking-[0.18em] text-spectrum">
            Coming soon
          </span>
        </div>
      ) : (
        <div className="mt-4 flex flex-1 flex-col justify-center">
          <p className="text-[15px] italic leading-relaxed text-white/70">
            &ldquo;{node.riddle}&rdquo;
          </p>
          <span className="mt-4 text-[12px] font-medium text-white/40 transition-colors group-hover:text-white/70">
            Tap to unlock →
          </span>
        </div>
      )}
    </button>
  );
}

export default function LockedWorld() {
  return (
    <section
      id="world"
      className="relative scroll-mt-24 pb-24 pt-4 sm:pb-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-passion">The bigger picture</p>
          <h2
            className="mt-4 text-3xl tracking-tight text-white sm:text-[2.7rem]"
            style={{ fontFamily: "var(--font-instrument)" }}
          >
            This is just the beginning.
          </h2>
          <p className="mt-5 text-lg text-white/60">
            The app is the doorway. We&apos;re building an entire world around the
            framework — and unlocking it one piece at a time.
          </p>
        </div>

        {/* core node → branches */}
        <div className="mt-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-spectrum" />
            The Unraveled app · unlocked
          </div>
          <div className="h-10 w-px bg-gradient-to-b from-white/35 to-transparent" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NODES.map((n) => (
            <LockedCard key={n.name} node={n} />
          ))}
        </div>
      </div>
    </section>
  );
}
