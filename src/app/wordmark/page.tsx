import type { Metadata } from "next";
import Image from "next/image";

// Internal comparison page — not public, not indexed.
export const metadata: Metadata = {
  title: "Wordmark options",
  robots: { index: false, follow: false },
};

// The saved/canonical splash background (warm glow on dark indigo-black).
const bgCurrent = `
  radial-gradient(120% 95% at 50% 24%, rgba(201,65,130,0.42) 0%, rgba(119,52,132,0.26) 34%, rgba(8,7,28,0) 66%),
  radial-gradient(150% 120% at 50% 118%, rgba(8,50,126,0.40) 0%, rgba(8,7,28,0) 58%),
  linear-gradient(180deg, #0a0822 0%, #0c0926 46%, #150a2b 100%)
`;

const MARK = "/logos/mark-gradient.png";

/* -------------------------------------------------------------------------- */
/* Marks                                                                       */
/* -------------------------------------------------------------------------- */

function Mark({ size = 56 }: { size?: number }) {
  return (
    <div className="relative w-fit">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(201,65,130,0.5) 0%, rgba(201,65,130,0) 70%)",
        }}
      />
      <Image
        src={MARK}
        alt="Unraveled mark"
        width={900}
        height={900}
        style={{ width: size, height: "auto" }}
        className="drop-shadow-[0_12px_30px_rgba(201,65,130,0.4)]"
      />
    </div>
  );
}

/* The mark recolored: grayscale 3D shading underneath, a new gradient painted
   through the block silhouette on top (mix-blend 'color' keeps the facets). */
function GradientMark({
  size = 120,
  gradient,
  blend = "color",
}: {
  size?: number;
  gradient?: string;
  blend?: React.CSSProperties["mixBlendMode"];
}) {
  return (
    <div
      className="relative inline-block"
      style={{ width: size, isolation: "isolate" }}
    >
      <Image
        src={MARK}
        alt="Unraveled mark"
        width={900}
        height={900}
        style={{
          width: size,
          height: "auto",
          // No gradient → show the original baked colors.
          filter: gradient
            ? "grayscale(1) contrast(1.05) brightness(1.1)"
            : undefined,
        }}
      />
      {gradient && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: gradient,
            mixBlendMode: blend,
            maskImage: `url(${MARK})`,
            WebkitMaskImage: `url(${MARK})`,
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

// 1) All-caps wordmark treatments.
const caps: {
  id: string;
  label: string;
  fontVar: string;
  weight: string;
  tracking: string;
}[] = [
  { id: "unbounded", label: "Unbounded", fontVar: "--font-unbounded", weight: "600", tracking: "0.02em" },
  { id: "bricolage", label: "Bricolage Grotesque", fontVar: "--font-bricolage", weight: "700", tracking: "0.06em" },
  { id: "instrument", label: "Instrument Serif", fontVar: "--font-instrument", weight: "400", tracking: "0.10em" },
  { id: "geist", label: "Geist (logo-style)", fontVar: "--font-geist-sans", weight: "500", tracking: "0.26em" },
  { id: "outfit", label: "Outfit", fontVar: "--font-outfit", weight: "500", tracking: "0.20em" },
  { id: "quicksand", label: "Quicksand", fontVar: "--font-quicksand", weight: "600", tracking: "0.16em" },
];

// 2) Instrument Serif italic — variations on the favored direction. Body is
//    Outfit throughout; some pair an italic-serif tagline for an all-serif feel.
const systems: {
  id: string;
  label: string;
  text: string;
  tracking: string;
  size: string;
  taglineSerif?: boolean;
}[] = [
  { id: "title", label: "Italic · title case", text: "Unraveled", tracking: "0", size: "3rem" },
  { id: "lower", label: "Italic · lowercase", text: "unraveled", tracking: "0", size: "3rem" },
  { id: "airy", label: "Italic · airy spacing", text: "Unraveled", tracking: "0.06em", size: "3rem" },
  { id: "tight-big", label: "Italic · large & tight", text: "Unraveled", tracking: "-0.02em", size: "3.7rem" },
  { id: "lower-big", label: "Italic · lowercase, oversized", text: "unraveled", tracking: "-0.01em", size: "3.9rem" },
  { id: "all-serif", label: "Italic · serif tagline too", text: "Unraveled", tracking: "0", size: "3rem", taglineSerif: true },
];

// 3) One continuous gradient across the whole three-cube structure (same brand
//    palette) instead of each cube running its own. The two you like —
//    full-spectrum and rose-top — shown beside the current per-cube version.
const logoGradients: {
  id: string;
  label: string;
  gradient?: string;
  blend?: React.CSSProperties["mixBlendMode"];
}[] = [
  { id: "current", label: "Each cube its own (today)" },
  {
    id: "spectrum-diag",
    label: "Full spectrum · diagonal",
    gradient:
      "linear-gradient(135deg, #072d73 0%, #41398f 30%, #773484 55%, #c42e75 80%, #c94182 100%)",
  },
  {
    id: "spectrum-horiz",
    label: "Full spectrum · left → right",
    gradient:
      "linear-gradient(90deg, #072d73 0%, #41398f 30%, #773484 55%, #c42e75 80%, #c94182 100%)",
  },
  {
    id: "rosetop",
    label: "Rose-top → navy-base",
    gradient:
      "linear-gradient(180deg, #c94182 0%, #8d3281 40%, #41398f 72%, #08327e 100%)",
  },
];

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

const TAGLINE_FIRST = "The world’s first ";
const ENDNOTE = "Your data stays yours — no spam, ever";
const sansLabel = "var(--font-geist-sans)";

export default function WordmarkLab() {
  return (
    <main
      className="min-h-dvh px-6 py-16 text-white"
      style={{ backgroundImage: bgCurrent }}
    >
      <div className="mx-auto max-w-4xl">
        <p
          className="text-xs uppercase tracking-[0.3em] text-white/65"
          style={{ fontFamily: sansLabel }}
        >
          Internal · pick a direction
        </p>
        <h1
          className="mt-3 text-3xl font-500"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Type & logo lab
        </h1>
        <p
          className="mt-2 max-w-2xl text-sm text-white/60"
          style={{ fontFamily: sansLabel }}
        >
          Three explorations: (1) the wordmark in all-caps across fonts, (2)
          full type systems — display + body together so you see every line of
          text, and (3) the logo recolored with different gradient patterns.
          Tell me which you like (e.g. “caps · Unbounded”, “system 2”, “logo
          sunset”) and I’ll set it on the splash.
        </p>

        {/* ---- 1 · All caps ---- */}
        <h2 className="mt-14 text-xl font-600" style={{ fontFamily: sansLabel }}>
          1 · Wordmark in ALL CAPS
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {caps.map((c) => (
            <section
              key={c.id}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
            >
              <span
                className="text-[11px] uppercase tracking-[0.22em] text-white/60"
                style={{ fontFamily: sansLabel }}
              >
                {c.label}
              </span>
              <div className="mt-5 flex flex-col items-center gap-4 text-center">
                <Mark size={44} />
                <div
                  className="text-white"
                  style={{
                    fontFamily: `var(${c.fontVar})`,
                    fontWeight: c.weight as React.CSSProperties["fontWeight"],
                    letterSpacing: c.tracking,
                    fontSize: "2.4rem",
                    lineHeight: 1.05,
                  }}
                >
                  UNRAVELED
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* ---- 2 · Type systems ---- */}
        <h2 className="mt-16 text-xl font-600" style={{ fontFamily: sansLabel }}>
          2 · Instrument Serif italic — variations
        </h2>
        <p
          className="mt-2 text-sm text-white/65"
          style={{ fontFamily: sansLabel }}
        >
          Leaning into the italic direction you liked — variations on case,
          spacing and scale, plus an all-serif version. Body text (tagline,
          button, endnote) stays Outfit so you can judge the whole page; the last
          card sets the tagline + endnote in italic serif too.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {systems.map((s) => (
            <section
              key={s.id}
              className="overflow-hidden rounded-3xl border border-white/10"
            >
              <div
                className="bg-black/25 px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-white/65"
                style={{ fontFamily: sansLabel }}
              >
                {s.label}
              </div>
              <div className="flex flex-col items-center gap-4 px-7 py-10 text-center">
                <Mark size={50} />
                <div
                  className="italic text-white"
                  style={{
                    fontFamily: "var(--font-instrument)",
                    fontWeight: 400,
                    letterSpacing: s.tracking,
                    fontSize: s.size,
                    lineHeight: 1.02,
                  }}
                >
                  {s.text}
                </div>
                <p
                  className={`text-white/65 ${
                    s.taglineSerif ? "text-[18px] italic" : "text-[15px]"
                  }`}
                  style={{
                    fontFamily: s.taglineSerif
                      ? "var(--font-instrument)"
                      : "var(--font-outfit)",
                  }}
                >
                  {TAGLINE_FIRST}
                  <span className="text-white/95">relationship health</span>
                  {" "}company
                </p>
                <div
                  className="mt-1 w-full max-w-xs rounded-2xl bg-white px-6 py-3.5 text-center text-[15px] font-600 text-ink"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  Unlock early access →
                </div>
                <p
                  className="mt-1 text-[13px] italic text-white/65"
                  style={{
                    fontFamily: s.taglineSerif
                      ? "var(--font-instrument)"
                      : "var(--font-outfit)",
                  }}
                >
                  {ENDNOTE}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* ---- 3 · Logo gradient patterns ---- */}
        <h2 className="mt-16 text-xl font-600" style={{ fontFamily: sansLabel }}>
          3 · One continuous gradient across the structure
        </h2>
        <p
          className="mt-2 max-w-2xl text-sm text-white/65"
          style={{ fontFamily: sansLabel }}
        >
          Same brand palette — but instead of each cube running its own
          blue→pink, one gradient flows across all three cubes as a single
          object. The two you like (full spectrum + rose-top) shown beside
          today’s per-cube version. (Later, in-app, this same gradient could
          shift with the user’s level.)
        </p>
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {logoGradients.map((g) => (
            <div
              key={g.id}
              className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-8"
            >
              <GradientMark size={104} gradient={g.gradient} blend={g.blend} />
              <span
                className="text-center text-[11px] uppercase tracking-[0.18em] text-white/65"
                style={{ fontFamily: sansLabel }}
              >
                {g.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
