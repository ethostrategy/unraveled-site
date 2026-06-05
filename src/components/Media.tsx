import Reveal from "./Reveal";

/**
 * Instagram-style gallery of recent posts. Tiles are PLACEHOLDERS modeled on
 * the @unraveledapp aesthetic (the live feed is login-gated, so it can't be
 * pulled automatically yet). Swap `posts[].caption/href/img` for the real feed
 * — either hardcode a few post URLs + thumbnails, or wire an Instagram widget.
 */

type Post = {
  caption: string;
  tag: string;
  grad: string;
  href: string;
};

const IG = "https://instagram.com/unraveledapp";

const posts: Post[] = [
  { caption: "The 10 Blocks, explained", tag: "carousel", grad: "from-spectrum-1 to-spectrum-4", href: IG },
  { caption: "“Safety isn't a vibe — it's a structure.”", tag: "quote", grad: "from-spectrum-8 to-spectrum-10", href: IG },
  { caption: "POV: you finally named the pattern", tag: "reel", grad: "from-spectrum-5 to-spectrum-7", href: IG },
  { caption: "Trust, in 30 seconds", tag: "reel", grad: "from-spectrum-3 to-spectrum-6", href: IG },
  { caption: "Meet the founders 👋", tag: "photo", grad: "from-spectrum-6 to-spectrum-9", href: IG },
  { caption: "Romantic. Platonic. Familial.", tag: "carousel", grad: "from-spectrum-2 to-spectrum-5", href: IG },
  { caption: "“Boundaries are a love language.”", tag: "quote", grad: "from-spectrum-7 to-spectrum-10", href: IG },
  { caption: "Behind the framework", tag: "reel", grad: "from-spectrum-4 to-spectrum-8", href: IG },
];

export default function Media() {
  return (
    <section
      id="media"
      className="relative scroll-mt-24 py-24 sm:py-32"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <div>
            <Reveal>
              <p className="eyebrow text-[#e273ac]">Media</p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="mt-4 text-3xl tracking-tight text-white sm:text-[2.4rem]"
                style={{ fontFamily: "var(--font-instrument)" }}
              >
                Straight from the feed.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <a
              href={IG}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Follow @unraveledapp
            </a>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {posts.map((p, i) => (
              <a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl ring-1 ring-white/10"
                aria-label={`Instagram post: ${p.caption}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.grad}`}
                />
                <div className="bg-grain absolute inset-0 opacity-[0.12] mix-blend-overlay" />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <span className="self-start rounded-full bg-black/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur-sm">
                    {p.tag}
                  </span>
                  <p
                    className="text-[15px] leading-snug text-white"
                    style={{ fontFamily: "var(--font-instrument)" }}
                  >
                    {p.caption}
                  </p>
                </div>
                {/* hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-2xl">↗</span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>

        <p className="mt-6 text-center text-[13px] text-white/78">
          Placeholder posts — wired to the live @unraveledapp feed soon.
        </p>
      </div>
    </section>
  );
}
