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

export default function Marquee() {
  return (
    <section
      aria-label="What people are saying about Unraveled"
      className="relative border-y border-white/10 py-5"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0822] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0822] to-transparent" />
      <div className="flex overflow-hidden pause-on-hover">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-3 text-sm font-medium text-white/55"
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
