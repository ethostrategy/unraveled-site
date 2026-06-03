/**
 * The shared "world of Unraveled" field — mirrors the splash exactly: a vivid
 * rose glow top-left meeting a deep luminous blue from the bottom-right, on the
 * same near-black base, with a soft orchid bloom keeping the centre of every
 * screen warm (the splash gets that warmth from the mark's halo; the long page
 * needs it baked in). Fixed behind all page content.
 */
export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* base spectrum field — identical to the splash */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(110% 85% at 18% 10%, rgba(201,65,130,0.50) 0%, rgba(8,7,28,0) 62%),
            radial-gradient(120% 100% at 90% 122%, rgba(10,64,158,0.56) 0%, rgba(8,7,28,0) 60%),
            linear-gradient(180deg, #08061c 0%, #0a0822 60%, #0a0b28 100%)
          `,
        }}
      />
      {/* soft orchid bloom — keeps the centre of every screen warm */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(72% 56% at 50% 34%, rgba(140,58,150,0.30) 0%, rgba(140,58,150,0) 70%)",
        }}
      />
      {/* edge vignette — identical to the splash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 105% at 50% 42%, transparent 52%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <div className="bg-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
    </div>
  );
}
