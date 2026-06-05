const items = [
  "For any kind of relationship",
  "Ten universal building blocks",
  "Inspired by thinkers across history",
  "Go at your own pace",
  "Feel more connected",
  "We all want healthier love",
  "Personalize your journey",
  "Social and emotional fitness",
];

/**
 * Scrolling descriptor ticker. `embedded` drops the divider border for use
 * inside the hero; the edge fade uses a mask (background-independent), so it
 * blends cleanly on any backdrop.
 */
export default function Marquee({ embedded = false }: { embedded?: boolean }) {
  return (
    <section
      aria-label="What Unraveled is about"
      className={`relative ${embedded ? "py-4" : "border-y border-white/10 py-5"}`}
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div
        className="flex overflow-hidden pause-on-hover"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-3 text-sm font-medium text-white/65"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-spectrum" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
