"use client";

import { useState } from "react";

const PINK = "#e273ac";

// Interactive version of the FF budget math: set a spend + assumptions
// (CPM, CTR, CVR) and see the funnel play out to a cost per conversion.
function Slider({ label, value, set, min, max, step, fmt }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step: number; fmt: (n: number) => string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-[12.5px] text-white/60">{label}</label>
        <span className="text-[13px] font-semibold text-white/90">{fmt(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="mt-1.5 w-full"
        style={{ accentColor: PINK }}
      />
    </div>
  );
}

export default function BudgetCalc() {
  const [spend, setSpend] = useState(100);
  const [cpm, setCpm] = useState(10); // $ per 1000 impressions
  const [ctr, setCtr] = useState(5); // %
  const [cvr, setCvr] = useState(2); // %

  const impressions = cpm > 0 ? (spend / cpm) * 1000 : 0;
  const clicks = impressions * (ctr / 100);
  const conversions = clicks * (cvr / 100);
  const cpc = clicks > 0 ? spend / clicks : 0;
  const costPerConv = conversions > 0 ? spend / conversions : 0;

  const int = (n: number) => Math.round(n).toLocaleString();
  const usd = (n: number) => `$${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

  const outputs = [
    { t: "Impressions", v: int(impressions) },
    { t: "Clicks", v: int(clicks), sub: `${ctr}% CTR` },
    { t: "Conversions", v: int(conversions), sub: `${cvr}% CVR` },
    { t: "Cost / conversion", v: usd(costPerConv), lead: true },
  ];

  return (
    <div className="mt-4 grid gap-5 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5 sm:grid-cols-2">
      <div className="space-y-4">
        <Slider label="Ad spend" value={spend} set={setSpend} min={50} max={5000} step={50} fmt={usd} />
        <Slider label="CPM (cost / 1,000 impressions)" value={cpm} set={setCpm} min={2} max={40} step={1} fmt={usd} />
        <Slider label="CTR (clicks / impressions)" value={ctr} set={setCtr} min={0.5} max={12} step={0.5} fmt={(n) => `${n}%`} />
        <Slider label="CVR (conversions / clicks)" value={cvr} set={setCvr} min={0.5} max={15} step={0.5} fmt={(n) => `${n}%`} />
        <p className="text-[11px] leading-snug text-white/40">CPC works out to <span className="text-white/70">{usd(cpc)}</span> per click.</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {outputs.map((o) => (
          <div key={o.t} className="flex flex-col justify-center rounded-xl p-3.5" style={o.lead ? { background: `${PINK}1f`, border: `1px solid ${PINK}66` } : { background: "rgba(255,255,255,0.03)" }}>
            <div className="text-[10.5px] uppercase tracking-wide text-white/45">{o.t}</div>
            <div className="mt-1 text-[22px] font-semibold leading-none" style={o.lead ? { color: PINK } : undefined}>{o.v}</div>
            {o.sub && <div className="mt-1 text-[10px] text-white/40">{o.sub}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
