import Reveal from "./Reveal";

/**
 * The 10 Blocks, shown as the canonical pyramid: four layers read from the
 * ground up, enveloped by Awareness. Colours run the brand spectrum from the
 * foundation (deep trust-blue) to the apex (rose), matching the framework's
 * bottom-up, left-to-right reading order.
 */

type Layer = {
  name: string;
  caption: string;
  blocks: string[];
};

// Rendered apex-first (top of the visual) → base last.
const LAYERS: Layer[] = [
  {
    name: "Relationship in Motion",
    caption: "What emerges when everything beneath it is working.",
    blocks: ["Compatibility"],
  },
  {
    name: "Under Friction",
    caption: "The skills that come online when things get hard.",
    blocks: ["Conflict Resolution", "Boundaries"],
  },
  {
    name: "In Relation",
    caption: "How two people show up in the space between them.",
    blocks: ["Honesty", "Communication", "Understanding"],
  },
  {
    name: "Foundation",
    caption: "The non-negotiables. Present — or nothing above can hold.",
    blocks: ["Safety", "Trust", "Respect", "Freedom"],
  },
];

// Canonical order Safety(1) … Compatibility(10) → a spectrum colour each.
const COLOR: Record<string, string> = {
  Safety: "#08327E",
  Trust: "#1f3a86",
  Respect: "#41398f",
  Freedom: "#5a358a",
  Honesty: "#773484",
  Communication: "#8d3380",
  Understanding: "#a32f7b",
  "Conflict Resolution": "#b83177",
  Boundaries: "#c42e75",
  Compatibility: "#c94182",
};

export default function Pyramid() {
  // Base layer should animate in first (read bottom-up), apex last.
  const total = LAYERS.length;

  return (
    <section
      id="framework"
      className="relative scroll-mt-24 py-24 sm:py-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow text-orchid">The framework</p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-5 text-3xl tracking-tight text-white sm:text-[2.7rem]"
              style={{ fontFamily: "var(--font-instrument)" }}
            >
              Ten blocks. Every relationship.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg text-white/60">
              Every healthy relationship is built from the same ten blocks, in
              the same order — read from the ground up, and held together by{" "}
              <span className="text-white/90">awareness</span>.
            </p>
          </Reveal>
        </div>

        {/* The pyramid */}
        <Reveal delay={120}>
          <div className="relative mx-auto mt-16 max-w-3xl">
            {/* Awareness envelope */}
            <div className="pointer-events-none absolute -inset-x-2 -inset-y-6 rounded-[2.5rem] border border-white/15 sm:-inset-x-6" />
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0c0a24] px-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
              Awareness
            </span>

            <div className="flex flex-col items-center gap-3 px-3 py-8 sm:gap-4 sm:px-8">
              {LAYERS.map((layer, li) => {
                // base (last in array) reveals first
                const fromBaseDelay = (total - 1 - li) * 110;
                return (
                  <Reveal
                    key={layer.name}
                    delay={fromBaseDelay}
                    className="flex w-full justify-center"
                  >
                    <div className="group w-full">
                      <div className="flex justify-center gap-3 sm:gap-4">
                        {layer.blocks.map((b) => (
                          <div
                            key={b}
                            className="relative flex min-h-[60px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/12 px-3 py-3 text-center sm:min-h-[68px]"
                            style={{
                              maxWidth: 150,
                              background: `linear-gradient(160deg, ${COLOR[b]}44, ${COLOR[b]}14)`,
                            }}
                          >
                            <span
                              className="absolute inset-x-0 top-0 h-[2px]"
                              style={{ background: COLOR[b] }}
                            />
                            <span className="text-[13px] font-semibold leading-tight text-white sm:text-sm">
                              {b}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-center text-[12px] text-white/45">
                        <span className="font-semibold text-white/70">
                          {layer.name}
                        </span>{" "}
                        — {layer.caption}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-10 max-w-xl text-center text-[15px] leading-relaxed text-white/55">
            Lower blocks come first: you can&apos;t make up for shaky safety with
            great communication. Name where a relationship is strong, find the
            block that&apos;s missing, and you know exactly what to work on next.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
