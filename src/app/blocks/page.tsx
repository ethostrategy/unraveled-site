import Backdrop from "@/components/Backdrop";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Framework",
  description:
    "The Unraveled Relationship Framework: ten foundational blocks across four ordered layers, universal across every kind of relationship.",
};

const LAYERS = [
  {
    name: "Layer 1 — Foundation",
    blocks: ["Safety", "Trust", "Respect", "Freedom"],
    note: "The non-negotiable conditions. If any is absent or chronically compromised, the relationship should not be advanced.",
  },
  {
    name: "Layer 2 — In Relation",
    blocks: ["Honesty", "Communication", "Understanding"],
    note: "The daily interpersonal competencies — how two people show up in the space between them once the foundation is secured.",
  },
  {
    name: "Layer 3 — Under Friction",
    blocks: ["Conflict Resolution", "Boundaries"],
    note: "The skills that come online under friction — whether the relationship can absorb disagreement and the need to name limits.",
  },
  {
    name: "Layer 4 — Relationship in Motion",
    blocks: ["Compatibility"],
    note: "An emergent property — the long-arc alignment that results when the other nine blocks are functioning over time.",
  },
];

const BLOCKS: { name: string; def: string }[] = [
  { name: "Safety", def: "The condition of being able to exist within a relationship without fear of emotional, psychological, or physical harm. The prior condition that makes every other block possible." },
  { name: "Trust", def: "The expectation that the other person will act reliably and in good faith over time, including when no one is watching. The accumulated evidence of consistency." },
  { name: "Respect", def: "The consistent recognition of the other person's inherent dignity, autonomy, and worth, expressed in how they are spoken to, spoken about, and treated." },
  { name: "Freedom", def: "The ability of each person to maintain their own identity, interests, relationships, and growth trajectory within the bond, without fear of punishment or withdrawal." },
  { name: "Honesty", def: "The consistent commitment to truthfulness and transparency in communication and behavior — including the harder forms, such as disclosing information one would prefer to withhold." },
  { name: "Communication", def: "The ability to express thoughts, feelings, and needs clearly and constructively, and to receive the other's expressions with attention." },
  { name: "Understanding", def: "The extent to which each person feels accurately perceived — heard, validated, and meaningfully known — by the other." },
  { name: "Conflict Resolution", def: "The ability to navigate disagreement constructively and to repair relational ruptures after they occur." },
  { name: "Boundaries", def: "The ability to define, communicate, and uphold one's own limits within the relationship, and to respect the other's limits in turn." },
  { name: "Compatibility", def: "The long-arc alignment between two people's values, priorities, lifestyles, and trajectories — not their similarity in taste, but the degree to which their lives can continue to fit together as each life changes." },
];

const GAPS = [
  "Existing theories describe properties of individuals (attachment style, emotional intelligence) — not the relationship itself as a unit of analysis.",
  "Most are anchored to a single relationship type, usually romantic partnership, leaving friendship, family, work, and self under-specified.",
  "Many blur what a relationship feels like with whether it is structurally healthy — so a loving-but-unsafe relationship can't be diagnosed.",
  "They list relevant constructs without ordering them by priority — no built-in guidance on what to attend to first.",
  "They describe what to know, but rarely scaffold what to practice on Monday morning.",
];

export default function BlocksPage() {
  return (
    <div
      className="relative isolate flex min-h-dvh flex-col text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Backdrop />
      <Nav />
      <main className="flex-1 px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-4xl">
          {/* title */}
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
            The Framework
          </p>
          <h1
            className="mt-3 text-4xl leading-[1.08] text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            The Unraveled Relationship Framework
          </h1>
          <p className="mt-4 text-balance text-lg text-white/85">
            A structural model for assessing and strengthening relationship
            health.
          </p>
          <p className="mt-4 text-sm text-white/60">
            Madhuri Gujje &amp; Will Parker · Unraveled · v3.0
          </p>

          {/* abstract */}
          <section className="mt-12">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Abstract
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/85">
              Relationships are among the strongest predictors of human health
              and flourishing, yet most people receive no formal instruction in
              how to build or sustain them. Existing research maps attachment,
              marital satisfaction, communication, and conflict in depth — but
              the field lacks a compact, standardized framework that specifies
              the minimum structural conditions a relationship must satisfy to
              be considered healthy across contexts. This model organizes
              relational health around ten foundational components —
              &ldquo;blocks&rdquo; — arranged in four ordered layers and
              surrounded by a single meta-principle: awareness. It&apos;s
              universal across relationship type (romantic, platonic, familial,
              professional, self-to-self), gender and sexuality, age, and
              culture.
            </p>
          </section>

          {/* principle */}
          <section className="mt-12">
            <h2
              className="text-2xl text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The core claim
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/85">
              Healthy relationships have{" "}
              <span className="text-white">structural requirements</span>, not
              only emotional qualities. A relationship can be intense,
              meaningful, and loving and still be unhealthy. Emotional
              experience and structural health are distinguishable, and the
              structure can be named, ordered, and practiced.
            </p>
          </section>

          {/* why a new framework */}
          <section className="mt-12">
            <h2
              className="text-2xl text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Why a new framework
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/85">
              The empirical literature on what makes relationships healthy is
              vast. What&apos;s missing is a map a non-specialist can use. Five
              recurring gaps:
            </p>
            <ol className="mt-5 space-y-3">
              {GAPS.map((g, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[15px] leading-relaxed text-white/85"
                >
                  <span className="font-semibold text-spectrum">{i + 1}</span>
                  <span>{g}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* the pyramid */}
          <section className="mt-12">
            <h2
              className="text-2xl text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The pyramid
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/85">
              Ten blocks, four layers, read from the ground up and (within a
              layer) left to right. Lower blocks have priority: you can&apos;t
              make up for weak safety with strong communication. The whole
              structure is enveloped by{" "}
              <span className="text-white">awareness</span>, the condition in
              which every block is built and maintained.
            </p>
            <div className="mt-6 space-y-4">
              {LAYERS.map((l) => (
                <div key={l.name} className="glass rounded-2xl p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-spectrum">
                      {l.name}
                    </span>
                    <span className="text-white/60">·</span>
                    <span className="text-[13px] text-white/70">
                      {l.blocks.join(" · ")}
                    </span>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/80">
                    {l.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* the ten blocks */}
          <section className="mt-12">
            <h2
              className="text-2xl text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              The ten blocks
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {BLOCKS.map((b, i) => (
                <div key={b.name} className="glass rounded-2xl p-5">
                  <h3 className="flex items-baseline gap-3">
                    <span className="text-[13px] font-semibold text-spectrum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-xl text-white"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {b.name}
                    </span>
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                    {b.def}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-[1.5rem] glass p-8 text-center">
            <h2
              className="text-2xl text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Put the framework to work
            </h2>
            <p className="mx-auto mt-3 max-w-md text-balance text-[15px] leading-relaxed text-white/80">
              Unraveled turns these ten blocks into a shared language and a
              practice you can use with the people who matter. Get in early.
            </p>
            <Link
              href="/#join"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-ink hover:shadow-lg"
            >
              Get early access
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
