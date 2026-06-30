"use client";

import { useMemo, useState } from "react";

export type Villager = { name: string; note: string; order: number | null };

// Scale features turn on automatically as the list grows.
const GROUP_THRESHOLD = 30; // search box + A–Z index + letter sections
const COUNT_THRESHOLD = 12; // "Built alongside N people" line

function letterOf(name: string): string {
  const c = name.trim().charAt(0).toUpperCase();
  return c >= "A" && c <= "Z" ? c : "#";
}

function Card({ v, featured = false }: { v: Villager; featured?: boolean }) {
  return (
    <li
      className={`glass rounded-2xl p-5 ${featured ? "ring-1 ring-[#e273ac]/30" : ""}`}
    >
      <p
        className="text-[1.15rem] leading-tight text-white"
        style={{ fontFamily: "var(--font-instrument)" }}
      >
        {v.name}
      </p>
      {v.note && (
        <p className="mt-2 text-[14px] leading-relaxed text-white/80">{v.note}</p>
      )}
    </li>
  );
}

function Grid({ items, featured = false }: { items: Villager[]; featured?: boolean }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((v) => (
        <Card key={`${v.name}-${v.note.slice(0, 16)}`} v={v} featured={featured} />
      ))}
    </ul>
  );
}

export default function VillageWall({ villagers }: { villagers: Villager[] }) {
  const [q, setQ] = useState("");
  const total = villagers.length;

  const featured = useMemo(() => villagers.filter((v) => v.order != null), [villagers]);
  const rest = useMemo(() => villagers.filter((v) => v.order == null), [villagers]);

  const large = total > GROUP_THRESHOLD;
  const query = q.trim().toLowerCase();
  const searching = query.length > 0;

  const matches = useMemo(
    () => (searching ? villagers.filter((v) => v.name.toLowerCase().includes(query)) : []),
    [searching, query, villagers]
  );

  // Group the (already alphabetical) rest by first letter, A–Z then "#".
  const groups = useMemo(() => {
    const m = new Map<string, Villager[]>();
    for (const v of rest) {
      const k = letterOf(v.name);
      let arr = m.get(k);
      if (!arr) {
        arr = [];
        m.set(k, arr);
      }
      arr.push(v);
    }
    const keys = [...m.keys()].sort((a, b) => {
      if (a === "#") return 1;
      if (b === "#") return -1;
      return a.localeCompare(b);
    });
    return keys.map((k) => ({ letter: k, items: m.get(k)! }));
  }, [rest]);

  if (total === 0) return null;

  return (
    <div className="mx-auto mt-14 w-full max-w-5xl">
      {total >= COUNT_THRESHOLD && (
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
          Built alongside {total.toLocaleString()} people
        </p>
      )}

      {large && (
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Find your name"
          aria-label="Find your name"
          className="mx-auto mt-6 block w-full max-w-sm rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-center text-[15px] text-white outline-none transition placeholder:text-white/50 focus:border-white/50"
        />
      )}

      {searching ? (
        <div className="mt-10">
          {matches.length > 0 ? (
            <Grid items={matches} />
          ) : (
            <p className="text-center text-[15px] text-white/60">
              No one by that name — yet.
            </p>
          )}
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <div className="mt-10">
              <Grid items={featured} featured />
            </div>
          )}

          {large ? (
            <>
              <nav
                aria-label="Jump to a letter"
                className="glass sticky top-3 z-10 mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-3 gap-y-1 rounded-full px-4 py-2"
              >
                {groups.map((g) => (
                  <a
                    key={g.letter}
                    href={`#v-${g.letter}`}
                    className="text-[13px] font-semibold text-white/70 transition-colors hover:text-white"
                  >
                    {g.letter}
                  </a>
                ))}
              </nav>

              <div className="mt-10 space-y-12">
                {groups.map((g) => (
                  <section key={g.letter} id={`v-${g.letter}`} className="scroll-mt-20">
                    <h3
                      className="mb-4 text-2xl text-spectrum"
                      style={{ fontFamily: "var(--font-instrument)" }}
                    >
                      {g.letter}
                    </h3>
                    <Grid items={g.items} />
                  </section>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-10">
              <Grid items={rest} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
