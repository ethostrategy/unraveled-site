const items = [
  "Backed by attachment science",
  "Built with therapists",
  "Private by design",
  "Featured in MindWell",
  "10k+ on the waitlist",
  "Trauma-informed",
  "No judgment, ever",
  "For every kind of love",
];

export default function Marquee() {
  return (
    <section
      aria-label="What people are saying about Unraveled"
      className="relative border-y border-line bg-cloud/60 py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cloud to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cloud to-transparent" />
      <div className="flex overflow-hidden pause-on-hover">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-3 text-sm font-medium text-ink-soft"
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
