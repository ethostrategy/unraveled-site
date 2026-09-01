"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Live Metrics board — the KPI scoreboard + a financial forecast + expenses.
 * KPIs and expenses come live from the "HQ Metrics" Airtable table (via
 * /api/hq-metrics); Madhuri/Will edit the Current values there and this
 * reflects them within ~30s. The forecast is an interactive what-if tool
 * (price x customers - costs -> profit + runway).
 */

type Metric = {
  id: string;
  name: string;
  section: string;
  group: string;
  current: number;
  target: number | null;
  unit: string;
  order: number;
  note: string;
};

const PINK = "#e273ac";
const GROUP_COLOR: Record<string, string> = {
  Audience: "#6f8fd8",
  Product: "#9a7fe0",
  Revenue: "#c768c6",
  Funding: "#e273ac",
};

const nfmt = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: Number.isInteger(n) ? 0 : 2 });
const money = (n: number) => "$" + Math.round(n).toLocaleString();

function fmtVal(v: number, unit: string) {
  if (unit === "$") return money(v);
  if (unit === "%") return nfmt(v) + "%";
  return nfmt(v) + (unit ? ` ${unit}` : "");
}

function KpiCard({ m }: { m: Metric }) {
  const color = GROUP_COLOR[m.group] ?? PINK;
  const pct =
    m.target && m.target > 0 ? Math.min(100, Math.round((m.current / m.target) * 100)) : null;
  return (
    <div className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4">
      <div className="text-[12px] font-medium text-white/60">{m.name}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-[22px] font-semibold text-white/95">{fmtVal(m.current, m.unit)}</span>
        {m.target != null && (
          <span className="text-[11.5px] text-white/40">/ {fmtVal(m.target, m.unit)}</span>
        )}
      </div>
      {pct != null && (
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
        </div>
      )}
      {m.note && <div className="mt-2 text-[11px] leading-snug text-white/40">{m.note}</div>}
    </div>
  );
}

function Num({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45">{label}</span>
      <div className="flex items-center rounded-lg border border-white/12 bg-white/[0.03] px-2.5 focus-within:border-white/30">
        {prefix && <span className="text-[13px] text-white/40">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="w-full bg-transparent py-1.5 pl-1 text-[14px] text-white/90 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </label>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">{label}</div>
      <div
        className="mt-1 text-[19px] font-semibold"
        style={{ color: accent ? "#f6b0d3" : "rgba(255,255,255,0.92)" }}
      >
        {value}
      </div>
    </div>
  );
}

export default function MetricsBoard() {
  const [items, setItems] = useState<Metric[] | null>(null);
  const [err, setErr] = useState(false);

  // Forecast inputs (what-if; independent of the live data).
  const [price, setPrice] = useState(29);
  const [decks, setDecks] = useState(100);
  const [cogs, setCogs] = useState(12);
  const [other, setOther] = useState(0);
  const [cash, setCash] = useState(25000);
  // App forecast (freemium — model still open: free-for-all vs a premium tier).
  const [appUsers, setAppUsers] = useState(1000);
  const [premiumPct, setPremiumPct] = useState(5);
  const [premiumPrice, setPremiumPrice] = useState(8);
  const [growth, setGrowth] = useState(8);

  useEffect(() => {
    fetch("/api/hq-metrics")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("load"))))
      .then((d: { items: Metric[] }) => setItems(d.items ?? []))
      .catch(() => setErr(true));
  }, []);

  const kpis = useMemo(
    () => (items ?? []).filter((m) => m.section === "KPI").sort((a, b) => a.order - b.order),
    [items],
  );
  const expenses = useMemo(
    () => (items ?? []).filter((m) => m.section === "Expense").sort((a, b) => a.order - b.order),
    [items],
  );
  const burn = useMemo(() => expenses.reduce((s, e) => s + (e.current || 0), 0), [expenses]);
  // Actual revenue booked so far — live from the Revenue-group $ KPIs on the scoreboard.
  const actualRevenue = useMemo(
    () => kpis.filter((k) => k.group === "Revenue" && k.unit === "$").reduce((s, k) => s + (k.current || 0), 0),
    [kpis],
  );

  const kpiGroups = useMemo(() => {
    const order: string[] = [];
    const g: Record<string, Metric[]> = {};
    for (const k of kpis) {
      const key = k.group || "Other";
      if (!g[key]) {
        g[key] = [];
        order.push(key);
      }
      g[key].push(k);
    }
    return order.map((key) => ({ key, items: g[key] }));
  }, [kpis]);

  // Forecast math.
  const revenue = price * decks + other;
  const cogsTotal = cogs * decks;
  const gross = revenue - cogsTotal;
  const net = gross - burn;
  const runwayTxt =
    net >= 0 ? "profitable" : cash > 0 ? `${(cash / -net).toFixed(1)} mo` : "0 mo";

  // App freemium math (works for free-for-all too: premium 0% -> $0 MRR).
  const premiumSubs = Math.round(appUsers * (premiumPct / 100));
  const appMRR = premiumSubs * premiumPrice;

  // 12-month revenue projection, compounding `growth`%/mo on both lines.
  const proj = useMemo(() => {
    const arr: { m: number; card: number; app: number; total: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const g = Math.pow(1 + growth / 100, i);
      const card = (price * decks + other) * g;
      const app = premiumSubs * premiumPrice * g;
      arr.push({ m: i + 1, card, app, total: card + app });
    }
    return arr;
  }, [price, decks, other, premiumSubs, premiumPrice, growth]);
  const projMax = Math.max(1, ...proj.map((r) => r.total));

  return (
    <div className="mt-8">
      {/* Live KPI scoreboard */}
      <h2 className="text-[22px] text-white/95" style={{ fontFamily: "var(--font-instrument)" }}>
        Scoreboard
      </h2>

      {err && (
        <p className="mt-3 text-[13px] text-white/50">Couldn&rsquo;t load the live metrics right now.</p>
      )}
      {!items && !err && <p className="mt-3 text-[13px] text-white/40">Loading the scoreboard&hellip;</p>}

      {kpiGroups.map(({ key, items: group }) => (
        <div key={key} className="mt-5">
          <div className="mb-2.5 flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: GROUP_COLOR[key] ?? PINK }}
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">{key}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {group.map((m) => (
              <KpiCard key={m.id} m={m} />
            ))}
          </div>
        </div>
      ))}

      {/* Financial forecast */}
      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border p-5" style={{ borderColor: "#e273ac33", background: "#e273ac0d" }}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Forecast &middot; Between Us</div>
          <p className="mt-1 text-[12px] leading-relaxed text-white/50">
            The card game as plain math: revenue = price &times; decks sold, minus what each deck costs to make (COGS) and your monthly bills (burn). See the term key below.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Num label="Price / deck" value={price} onChange={setPrice} prefix="$" />
            <Num label="Decks / mo" value={decks} onChange={setDecks} />
            <Num label="COGS / deck" value={cogs} onChange={setCogs} prefix="$" />
            <Num label="Other rev / mo" value={other} onChange={setOther} prefix="$" />
            <Num label="Cash on hand" value={cash} onChange={setCash} prefix="$" />
          </div>
        </div>

        <div className="rounded-2xl border p-5" style={{ borderColor: "#e273ac33", background: "#e273ac0d" }}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Projected · monthly</div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat label="Revenue" value={money(revenue)} />
            <Stat label="COGS" value={money(cogsTotal)} />
            <Stat label="Gross profit" value={money(gross)} />
            <Stat label="Expenses (burn)" value={money(burn)} />
            <Stat label="Net / mo" value={money(net)} accent />
            <Stat label="Runway" value={runwayTxt} accent />
          </div>
          <p className="mt-3 text-[11px] leading-snug text-white/40">
            Burn (your monthly costs) pulls live from the expenses below.
          </p>
        </div>
      </div>

      {/* App forecast — freemium what-if (model still open) */}
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border p-5" style={{ borderColor: "#6f8fd833", background: "#6f8fd80d" }}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Forecast &middot; Application</div>
          <p className="mt-1 text-[12px] leading-relaxed text-white/50">
            Freemium math: some % of your app users pay for a premium tier at a monthly price &rarr; recurring revenue (MRR). <span style={{ color: "#f6b0d3" }}>Model still open</span> &mdash; free for everyone vs a paid tier; for all-free, set premium to 0%.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Num label="App users" value={appUsers} onChange={setAppUsers} />
            <Num label="Premium %" value={premiumPct} onChange={setPremiumPct} />
            <Num label="Premium / mo" value={premiumPrice} onChange={setPremiumPrice} prefix="$" />
          </div>
        </div>
        <div className="rounded-2xl border p-5" style={{ borderColor: "#6f8fd833", background: "#6f8fd80d" }}>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Projected &middot; app</div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat label="Premium subs" value={premiumSubs.toLocaleString()} />
            <Stat label="App MRR" value={money(appMRR)} accent />
          </div>
          <p className="mt-3 text-[11px] leading-snug text-white/40">
            The app is a funnel either way &mdash; even free, it drives users to the paid products (cards, cohorts, experiences).
          </p>
        </div>
      </div>

      {/* revenue projection — multi-line, 12 months */}
      <div className="mt-6 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-[22px] text-white/95" style={{ fontFamily: "var(--font-instrument)" }}>Revenue projection</h2>
          <label className="flex items-center gap-1.5 text-[11px] text-white/45">
            growth / mo
            <input
              type="number"
              value={growth}
              onChange={(e) => setGrowth(Number(e.target.value) || 0)}
              className="w-14 rounded-md border border-white/12 bg-white/[0.03] px-2 py-1 text-[12px] text-white/90 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            %
          </label>
        </div>
        <p className="mt-1 text-[12px] leading-relaxed text-white/45">12 months out, compounding {growth}% per month on both revenue lines.</p>
        <svg viewBox="0 0 640 200" className="mt-3 w-full" role="img" aria-label="12-month revenue projection">
          <line x1="8" y1="180" x2="632" y2="180" stroke="rgba(255,255,255,0.12)" />
          {([
            { key: "card", color: "#6f8fd8" },
            { key: "app", color: "#9a7fe0" },
            { key: "total", color: "#e273ac" },
          ] as const).map(({ key, color }) => (
            <polyline
              key={key}
              fill="none"
              stroke={color}
              strokeWidth={2.4}
              strokeLinejoin="round"
              strokeLinecap="round"
              points={proj.map((r, i) => `${8 + (i / 11) * 624},${180 - (r[key] / projMax) * 156}`).join(" ")}
            />
          ))}
          {/* Actuals — real revenue booked so far (live), flat reference vs the plan */}
          <polyline
            fill="none"
            stroke="#ffffff"
            strokeWidth={2.4}
            strokeDasharray="2 5"
            strokeLinecap="round"
            points={proj.map((_, i) => `${8 + (i / 11) * 624},${180 - (actualRevenue / projMax) * 156}`).join(" ")}
          />
        </svg>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px]">
          {[
            { label: "Between Us (plan)", color: "#6f8fd8" },
            { label: "Application MRR (plan)", color: "#9a7fe0" },
            { label: "Total (plan)", color: "#e273ac" },
            { label: "Actual (to date)", color: "#ffffff" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-white/60">
              <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
          <span className="ml-auto text-white/40">month 12 total {money(proj[proj.length - 1].total)}/mo</span>
        </div>
      </div>

      {/* Expenses */}
      <div className="mt-8">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[22px] text-white/95" style={{ fontFamily: "var(--font-instrument)" }}>
            Expenses
          </h2>
          <span className="text-[12px] text-white/55">
            burn <span className="font-semibold text-[#f6b0d3]">{money(burn)}</span>/mo
          </span>
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/[0.09]">
          {expenses.map((e, i) => (
            <div
              key={e.id}
              className={`flex items-center justify-between px-4 py-2.5 ${i > 0 ? "border-t border-white/[0.06]" : ""}`}
            >
              <div className="min-w-0">
                <span className="text-[13.5px] text-white/85">{e.name}</span>
                {e.note && <span className="ml-2 text-[11px] text-white/35">{e.note}</span>}
              </div>
              <span className="text-[13.5px] font-medium text-white/80">{money(e.current)}/mo</span>
            </div>
          ))}
          {expenses.length === 0 && !err && (
            <div className="px-4 py-3 text-[12px] text-white/40">No expenses yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
