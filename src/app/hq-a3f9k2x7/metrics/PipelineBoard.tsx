"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Sales pipeline — leads grouped into stage columns (Lead -> Qualified ->
 * Interested -> Paying), live from the "HQ Pipeline" Airtable table via
 * /api/hq-pipeline. Madhuri/Will move leads between stages in Airtable and
 * this reflects it. "Lost" leads are hidden from the board.
 */

type Lead = {
  id: string;
  name: string;
  type: string;
  stage: string;
  value: number;
  owner: string;
  note: string;
  order: number;
};

const STAGES = ["Lead", "Qualified", "Interested", "Paying"] as const;
const OPEN = ["Lead", "Qualified", "Interested"];

const STAGE_COLOR: Record<string, string> = {
  Lead: "#8a86a0",
  Qualified: "#6f8fd8",
  Interested: "#9a7fe0",
  Paying: "#6bbf8a",
};
const TYPE_COLOR: Record<string, string> = {
  B2B: "#6f8fd8",
  Partner: "#9a7fe0",
  Wholesale: "#5bbfae",
  Creator: "#e273ac",
  Grant: "#d9b24a",
  Other: "#8a86a0",
};
const money = (n: number) => "$" + Math.round(n).toLocaleString();

export default function PipelineBoard() {
  const [items, setItems] = useState<Lead[] | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch("/api/hq-pipeline")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("load"))))
      .then((d: { items: Lead[] }) => setItems(d.items ?? []))
      .catch(() => setErr(true));
  }, []);

  const byStage = useMemo(() => {
    const g: Record<string, Lead[]> = {};
    for (const s of STAGES) g[s] = [];
    for (const l of items ?? []) if (g[l.stage]) g[l.stage].push(l);
    for (const s of STAGES) g[s].sort((a, b) => a.order - b.order);
    return g;
  }, [items]);

  const open = useMemo(() => (items ?? []).filter((l) => OPEN.includes(l.stage)), [items]);
  const openValue = useMemo(() => open.reduce((s, l) => s + (l.value || 0), 0), [open]);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[22px] text-white/95" style={{ fontFamily: "var(--font-serif)" }}>
          Sales pipeline
        </h2>
        <span className="text-[12px] text-white/50">
          open <span className="font-semibold text-[#f6b0d3]">{money(openValue)}</span> · {open.length} leads
        </span>
      </div>

      {err && <p className="mt-3 text-[13px] text-white/50">Couldn&rsquo;t load the pipeline right now.</p>}
      {!items && !err && <p className="mt-3 text-[13px] text-white/40">Loading the pipeline&hellip;</p>}

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((stage) => {
          const leads = byStage[stage];
          return (
            <div key={stage} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: STAGE_COLOR[stage] }} />
                  <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white/60">{stage}</span>
                </div>
                <span className="text-[11px] text-white/35">{leads.length}</span>
              </div>

              <div className="mt-3 space-y-2">
                {leads.map((l) => (
                  <div key={l.id} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5">
                    <div className="text-[12.5px] font-medium leading-snug text-white/85">{l.name}</div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                      {l.type && (
                        <span
                          className="rounded-full px-1.5 py-0.5 text-[9.5px] font-semibold"
                          style={{
                            color: TYPE_COLOR[l.type] ?? "#8a86a0",
                            background: `${TYPE_COLOR[l.type] ?? "#8a86a0"}22`,
                          }}
                        >
                          {l.type}
                        </span>
                      )}
                      {l.value > 0 && <span className="text-[10.5px] text-white/45">{money(l.value)}</span>}
                      {l.owner && <span className="text-[10px] text-white/35">{l.owner}</span>}
                    </div>
                    {l.note && <div className="mt-1.5 text-[10.5px] leading-snug text-white/40">{l.note}</div>}
                  </div>
                ))}
                {leads.length === 0 && <div className="py-1 text-center text-[13px] text-white/20">&mdash;</div>}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-white/35">
        Add + move leads in the HQ Pipeline Airtable &middot; this reflects it live.
      </p>
    </div>
  );
}
