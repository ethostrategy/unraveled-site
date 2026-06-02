/**
 * The shared "world of Unraveled" field, tuned to match the splash: a vivid
 * rose glow top-left meeting a deep luminous blue from the bottom-right, with a
 * soft orchid bloom warming the centre so every screenful of the long page
 * reads as warm as the splash — not dark navy. Fixed behind all page content.
 */
export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* base spectrum field + corner glows */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(120% 95% at 15% 6%, rgba(201,65,130,0.66) 0%, rgba(14,12,42,0) 62%),
            radial-gradient(125% 105% at 93% 116%, rgba(26,86,194,0.66) 0%, rgba(14,12,42,0) 62%),
            linear-gradient(180deg, #100c34 0%, #130f3a 55%, #110e36 100%)
          `,
        }}
      />
      {/* soft orchid bloom keeping the centre of every screen warm */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(75% 60% at 50% 32%, rgba(140,58,150,0.40) 0%, rgba(140,58,150,0) 72%)",
        }}
      />
      {/* gentle edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 120% at 50% 38%, transparent 68%, rgba(0,0,0,0.36) 100%)",
        }}
      />
      <div className="bg-grain absolute inset-0 opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}
