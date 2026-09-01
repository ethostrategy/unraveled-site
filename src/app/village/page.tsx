import type { Metadata } from "next";
import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import { LogoMark } from "@/components/Logo";
import VillageWall from "@/components/VillageWall";

/**
 * "The Village" — a thank-you wall for everyone who has contributed to
 * Unraveled. Hidden for now: noindex + not linked anywhere + disallowed in
 * robots.ts. Reachable by direct URL so it can be previewed; reveal later by
 * linking it.
 *
 * Names are managed in Airtable ("Unraveled Village" table) so the list can
 * grow without code changes. Add a row → it appears here. Check "Hidden" to
 * keep someone off; set "Order" to pin people higher (otherwise alphabetical).
 */

export const metadata: Metadata = {
  title: "The Village",
  // Hidden for now — keep it out of search engines.
  robots: { index: false, follow: false },
};

// Refresh from Airtable at most once a minute.
export const revalidate = 60;

const BASE_ID = process.env.AIRTABLE_BASE_ID ?? "app8j35I3Aw3HHwGt";
const TABLE_ID = process.env.AIRTABLE_VILLAGE_TABLE ?? "tblMieF0wdKKqP9nR";

type Villager = { name: string; note: string; order: number | null };

async function getVillagers(): Promise<Villager[]> {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) return [];

  const rows: Villager[] = [];
  let offset: string | undefined;
  try {
    do {
      const params = new URLSearchParams({
        filterByFormula: "NOT({Hidden})",
        pageSize: "100",
      });
      if (offset) params.set("offset", offset);
      const res = await fetch(
        `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          next: { revalidate: 60 },
        }
      );
      if (!res.ok) break;
      const data = (await res.json()) as {
        records?: { fields?: Record<string, unknown> }[];
        offset?: string;
      };
      for (const r of data.records ?? []) {
        const name = String(r.fields?.["Name"] ?? "").trim();
        if (!name) continue;
        rows.push({
          name,
          note: String(r.fields?.["Note"] ?? "").trim(),
          order: typeof r.fields?.["Order"] === "number" ? (r.fields["Order"] as number) : null,
        });
      }
      offset = data.offset;
    } while (offset);
  } catch {
    return rows;
  }

  // Pinned (with an Order) first, ascending; everyone else alphabetical.
  rows.sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    if (a.order != null) return -1;
    if (b.order != null) return 1;
    return a.name.localeCompare(b.name);
  });
  return rows;
}

export default async function VillagePage() {
  const villagers = await getVillagers();

  return (
    <div
      className="relative isolate flex min-h-dvh flex-col text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <Backdrop />

      {/* slim top bar */}
      <header className="mx-auto flex w-full max-w-4xl items-center justify-between px-5 py-6">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <span
            className="text-[1.4rem] italic leading-none text-white"
            style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.02em" }}
          >
            Unraveled
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-white/85 transition-colors hover:text-white"
        >
          ← Back
        </Link>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-28">
        {/* title + intro */}
        <section className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-[#e273ac]">The Village</p>
          <h1
            className="mt-3 text-4xl leading-[1.08] text-white sm:text-5xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            We didn&apos;t get here alone.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-white/85">
            Building something that helps people love better can&apos;t be done
            alone. Everyone here gave their time, their talent, and their belief
            to make Unraveled real.
          </p>
          <p
            className="mx-auto mt-5 text-2xl text-white sm:text-[1.7rem]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            This is yours too.
          </p>
        </section>

        {/* the village */}
        <VillageWall villagers={villagers} />

        {/* closing spectrum hairline */}
        <div className="mx-auto mt-20 h-px w-full max-w-3xl bg-gradient-to-r from-spectrum-1 via-spectrum-6 to-spectrum-10 opacity-40" />
      </main>
    </div>
  );
}
