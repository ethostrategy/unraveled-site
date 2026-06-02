"use client";

import { useState } from "react";

/**
 * "This is just the beginning" — the core app at the centre of a wider world.
 * Each future product is a LOCKED node with a rhyming couplet. Enter the right
 * word/phrase to unlock it (forgiving match); a correct answer triggers a glow
 * burst and reveals the product. No reveal fallback — locked stays locked.
 */

type Node = {
  cat: string;
  name: string;
  emoji: string;
  riddle: string; // two lines, "\n" between
  answers: string[]; // accepted (lowercased, normalized) answers
};

const NODES: Node[] = [
  {
    cat: "IRL · Live",
    name: "Live Experiences",
    emoji: "🗝️",
    riddle: "Solve it together or stay in the dark;\na room full of clues sets off the spark.",
    answers: ["escape room", "escape", "experience", "experiences", "live", "room"],
  },
  {
    cat: "Know yourself",
    name: "Assessments",
    emoji: "📊",
    riddle: "Answer me honestly, nothing to hide;\nI'll mirror the strengths and the gaps inside.",
    answers: ["assessment", "assessments", "quiz", "test", "score"],
  },
  {
    cat: "Community",
    name: "Regional Cohorts",
    emoji: "🪩",
    riddle: "A circle that meets in your own hometown;\nwe rise every week and we won't let you down.",
    answers: ["cohort", "cohorts", "regional cohorts", "group", "community"],
  },
  {
    cat: "Move together",
    name: "Unraveled Paces",
    emoji: "👟",
    riddle: "Lace up, head out, let the pavement unspool;\nwe bond on the move — that's the rule.",
    answers: ["paces", "pace", "run", "run club", "running", "unraveled paces"],
  },
  {
    cat: "Education",
    name: "Schools Program",
    emoji: "🎒",
    riddle: "They taught you the body but skipped the heart;\nwe walk into classrooms to teach the missing part.",
    answers: ["school", "schools", "sex ed", "education", "curriculum", "classroom"],
  },
  {
    cat: "Stories",
    name: "Anonymous Voices",
    emoji: "🕊️",
    riddle: "No name, no face, just the truth that you write;\na thousand confessions that step into light.",
    answers: ["voices", "anonymous voices", "blog", "stories", "voice"],
  },
  {
    cat: "Reflect",
    name: "Journals",
    emoji: "📓",
    riddle: "After the heartbreak, a page that won't judge;\nwrite out the grief and you'll feel the weight budge.",
    answers: ["journal", "journals", "journaling", "diary"],
  },
  {
    cat: "Game · Cards",
    name: "Card Game",
    emoji: "🃏",
    riddle: "Shuffle me up and pull a few;\nI'll make you say what's secretly true.",
    answers: ["cards", "card", "card game", "deck"],
  },
  {
    cat: "Audio",
    name: "Podcast",
    emoji: "🎙️",
    riddle: "Plug in your ears and press play;\nhear the talks you're scared to say.",
    answers: ["podcast", "pod", "podcasts"],
  },
  {
    cat: "Event · Invite-only",
    name: "Secret Galas",
    emoji: "🥂",
    riddle: "A secret address, an invite to claim;\narrive in a mask, leave with no shame.",
    answers: ["gala", "galas", "secret galas", "party", "ball"],
  },
  {
    cat: "Live · Cause",
    name: "Benefit Concerts",
    emoji: "🎤",
    riddle: "Lights and a crowd and a cause we hold dear;\nthe headliner sings and we all reappear.",
    answers: ["concert", "concerts", "benefit concert", "benefit concerts", "show"],
  },
  {
    cat: "Wear",
    name: "Merch",
    emoji: "🧥",
    riddle: "Wear me out loud or under your coat;\nten little blocks that you quietly tote.",
    answers: ["merch", "merchandise", "apparel", "clothes"],
  },
];

function normalize(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ");
}

function LockedCard({ node }: { node: Node }) {
  const [value, setValue] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [wrong, setWrong] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = normalize(value);
    if (!v) return;
    const hit = node.answers.some((a) => v === a || v.includes(a));
    if (hit) {
      setUnlocked(true);
      setWrong(false);
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 500);
    }
  }

  if (unlocked) {
    return (
      <div className="glass relative flex h-full min-h-[210px] flex-col items-center justify-center overflow-hidden rounded-[1.5rem] p-6 text-center">
        {/* glow burst */}
        <div
          aria-hidden
          className="glow-burst pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, rgba(201,65,130,0.4) 35%, rgba(201,65,130,0) 70%)",
          }}
        />
        <span className="relative text-4xl">{node.emoji}</span>
        <p
          className="relative mt-2 text-xl text-white"
          style={{ fontFamily: "var(--font-instrument)" }}
        >
          {node.name}
        </p>
        <span className="relative mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-spectrum">
          Unlocked · coming soon
        </span>
      </div>
    );
  }

  return (
    <div
      className={`glass flex h-full min-h-[210px] flex-col rounded-[1.5rem] p-6 ${
        wrong ? "shake-x" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          {node.cat}
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm" aria-hidden>
          🔒
        </span>
      </div>

      <p className="mt-4 flex-1 whitespace-pre-line text-[15px] italic leading-relaxed text-white/75">
        {node.riddle}
      </p>

      <form onSubmit={submit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={wrong ? "Not quite…" : "Answer to unlock"}
          aria-label={`Answer the riddle to unlock ${node.cat}`}
          className={`min-w-0 flex-1 rounded-xl border bg-white/10 px-3 py-2 text-[14px] text-white outline-none transition placeholder:text-white/45 focus:bg-white/15 ${
            wrong ? "border-rose/70" : "border-white/20 focus:border-white/50"
          }`}
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-white px-3.5 py-2 text-[13px] font-semibold text-ink transition hover:shadow-lg hover:shadow-black/15 active:scale-[0.97]"
          aria-label="Unlock"
        >
          Unlock
        </button>
      </form>
    </div>
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
            framework — each piece locked until you crack its riddle.
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

        <p className="mt-10 text-center text-[15px] italic text-white/45">
          …and so much more, still under lock.
        </p>
      </div>
    </section>
  );
}
