// Roadmap milestone collision checker.
// Simulates the gantt layout (date-ordered 3-level stagger, label widths,
// worst-case min-width track) and flags any labels that would overlap in the
// All view or any year tab. Run after editing OVERVIEW in gantt/page.tsx:
//   node scripts/check-roadmap-crowding.js
// The page is Google-gated, so this replaces eyeballing the live preview.
const fs = require("fs");
const path = require("path");
const SRC = path.join(__dirname, "../src/app/hq-a3f9k2x7/gantt/page.tsx");
const text = fs.readFileSync(SRC, "utf8");

// --- extract OVERVIEW lanes ---
const ov = text.slice(text.indexOf("const OVERVIEW"), text.indexOf("\n];", text.indexOf("const OVERVIEW")));
const laneRe = /\{ name: "([^"]+)", color: "[^"]+", work: \[[^\]]*\], ms: \[([\s\S]*?)\] \}/g;
const msRe = /\{ t: "((?:[^"\\]|\\.)*)", q: ([0-9.]+)([^}]*)\}/g;
const lanes = [];
let lm;
while ((lm = laneRe.exec(ov))) {
  const name = lm[1];
  const ms = [];
  let mm;
  while ((mm = msRe.exec(lm[2]))) ms.push({ t: mm[1], q: parseFloat(mm[2]), detail: /detail:\s*true/.test(mm[3]) });
  lanes.push({ name, ms });
}

// --- layout model (worst case = min-width track) ---
const CHAR = 5.4, PAD = 6, LLVL = 3; // px per char (9px font), label padding, stagger levels
const views = [
  { label: "All", qOffset: 0, totalQ: 16, trackW: 1000 - 104, single: false },
  { label: "2026", qOffset: 0, totalQ: 4, trackW: 640 - 104, single: true },
  { label: "2027", qOffset: 4, totalQ: 4, trackW: 640 - 104, single: true },
  { label: "2028", qOffset: 8, totalQ: 4, trackW: 640 - 104, single: true },
  { label: "2029", qOffset: 12, totalQ: 4, trackW: 640 - 104, single: true },
];

let total = 0;
for (const v of views) {
  for (const lane of lanes) {
    const vis = lane.ms
      .filter((m) => m.q >= v.qOffset && m.q <= v.qOffset + v.totalQ && (v.single || !m.detail))
      .sort((a, b) => a.q - b.q)
      .map((m, i) => ({
        ...m,
        level: i % LLVL,
        x: ((m.q - v.qOffset) / v.totalQ) * v.trackW,
        half: (m.t.length * CHAR + PAD) / 2,
      }));
    for (let a = 0; a < vis.length; a++)
      for (let b = a + 1; b < vis.length; b++) {
        if (vis[a].level !== vis[b].level) continue;
        const gap = Math.abs(vis[a].x - vis[b].x) - (vis[a].half + vis[b].half);
        if (gap < 0) {
          total++;
          console.log(
            `[${v.label}] ${lane.name}: "${vis[a].t}" (q${vis[a].q}) <-> "${vis[b].t}" (q${vis[b].q})  overlap ${Math.round(-gap)}px (level ${vis[a].level})`
          );
        }
      }
  }
}
console.log(total === 0 ? "\nNo collisions." : `\n${total} collision(s).`);
process.exit(total === 0 ? 0 : 1);
