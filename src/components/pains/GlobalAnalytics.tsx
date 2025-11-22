"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

/** Monochrome tokens — match UnpredictableMono */
const TOKENS = {
  stroke: "rgba(255,255,255,0.10)",
  hair: "rgba(255,255,255,0.08)",
  text: "#FAFAFA",
  sub: "rgba(255,255,255,0.64)",
  mute: "rgba(255,255,255,0.45)",
  line: "rgba(255,255,255,0.9)",
  accent: "#FFFFFF",

  // NEW: Vercel blue
  primary: "#0070F3",
  primarySoft: "rgba(0,112,243,0.55)",
};


type Net = { key: string; label: string; dailyTxAvg: number };
type AnnualData = { networks: Net[]; hacksUSD: number; scamsUSD: number };

const FALLBACK: AnnualData = {
  networks: [
    { key: "ethereum", label: "Ethereum (L1)", dailyTxAvg: 1_560_000 },
    { key: "bsc", label: "BNB Smart Chain", dailyTxAvg: 4_000_000 },
    { key: "arbitrum", label: "Arbitrum One", dailyTxAvg: 2_500_000 },
    { key: "base", label: "Base", dailyTxAvg: 1_600_000 },
    { key: "polygon", label: "Polygon PoS", dailyTxAvg: 2_000_000 },
  ],
  hacksUSD: 2_200_000_000,
  scamsUSD: 9_900_000_000,
};

const YEAR_DAYS = 365;

function fmtNum(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}
function fmtUSD(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

export default function GlobalAnalytics() {
  /** ---------- data load / state ---------- */
  const [data, setData] = useState<AnnualData>(FALLBACK);
  const [activeView, setActiveView] = useState<"daily" | "annual">("daily");
  const [assumptionPct, setAssumptionPct] = useState(0); // -25 .. +25
  const [enabled, setEnabled] = useState<Record<string, boolean>>({});
  const [highlight, setHighlight] = useState<string | null>(null);
  const [auto, setAuto] = useState(false);

  // Try live json -> lb json -> fallback
  useEffect(() => {
    (async () => {
      const tryFetch = async (url: string) => {
        try {
          const r = await fetch(url, { cache: "no-store" });
          if (!r.ok) return null;
          const j = await r.json();
          if (
            j &&
            Array.isArray(j.networks) &&
            typeof j.networks[0]?.dailyTxAvg === "number"
          ) {
            return j as AnnualData;
          }
          return null;
        } catch {
          return null;
        }
      };

      const live = await tryFetch("/data/annual-tx-live.json");
      if (live) {
        setData(live);
        return;
      }

      const lb = await tryFetch("/data/annual-tx-lb.json");
      if (lb) {
        setData(lb);
        return;
      }

      setData(FALLBACK);
    })();
  }, []);

  // init enabled list
  useEffect(() => {
    const next: Record<string, boolean> = {};
    data.networks.forEach((n) => (next[n.key] = true));
    setEnabled(next);
  }, [data]);

  // normalized/assumption-applied list
  const nets = useMemo(() => {
    const f = 1 + assumptionPct / 100;
    return data.networks.map((n) => ({
      ...n,
      dailyAdj: Math.max(0, n.dailyTxAvg * f),
      annualAdj: Math.max(0, n.dailyTxAvg * f * YEAR_DAYS),
    }));
  }, [data, assumptionPct]);

  const visible = useMemo(
    () => nets.filter((n) => enabled[n.key]),
    [nets, enabled]
  );
  const totalDaily = useMemo(
    () => visible.reduce((s, n) => s + n.dailyAdj, 0),
    [visible]
  );
  const totalAnnual = useMemo(
    () => visible.reduce((s, n) => s + n.annualAdj, 0),
    [visible]
  );
  const maxDaily = useMemo(
    () => Math.max(...visible.map((n) => n.dailyAdj), 1),
    [visible]
  );

  /** ---------- auto-cycler for highlight ---------- */
  const idxRef = useRef(0);
  useEffect(() => {
    if (!auto || visible.length === 0) return;
    const id = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % visible.length;
      setHighlight(visible[idxRef.current].key);
    }, 1600);
    return () => clearInterval(id);
  }, [auto, visible]);

  /** ---------- UI ---------- */
  return (
    <section
      className="ga-section"
      style={{ color: TOKENS.text }}
    >
      <div className="ga-inner mx-auto max-w-[1240px] px-4 sm:px-6 md:px-10 pt-8 sm:pt-14 md:pt-20 pb-8 sm:pb-14 md:pb-20">
        {/* Header */}
        <div className="ga-header mb-4 sm:mb-6 md:mb-8">
          <div
            className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase"
            style={{ color: TOKENS.sub }}
          >
            Market Activity · Jan–Dec 2024
          </div>
          <h2 className="mt-1 sm:mt-2 text-[20px] sm:text-[26px] md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Billions of on-chain actions. Millions at risk.
          </h2>
          <p
            className="mt-2 text-xs sm:text-sm md:text-lg max-w-2xl"
            style={{ color: TOKENS.sub }}
          >
            Interactive snapshot across major EVM networks. Adjust assumptions,
            toggle chains, and export the view.
          </p>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <KPI
            label={
              activeView === "daily"
                ? "Daily total (adj.)"
                : "Annualized total (adj.)"
            }
            value={
              activeView === "daily"
                ? `${fmtNum(totalDaily)}`
                : `${fmtNum(totalAnnual)}`
            }
            sub={
              activeView === "daily"
                ? "Current day-equivalent with your assumptions & toggles"
                : "×365 of your adjusted daily total"
            }
          />
          <KPI
            label="Funds lost to scams (’24)"
            value={fmtUSD(data.scamsUSD)}
            sub="Lower-bound"
          />
          <KPI
            label="Funds stolen in hacks (’24)"
            value={fmtUSD(data.hacksUSD)}
            sub="Exploits & breaches"
          />
        </div>

        {/* Controls + Chart */}
        <div className="mt-5 sm:mt-6 md:mt-8 flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* View & networks */}
          <div
            className="flex-1 rounded-xl p-3 sm:p-4 md:p-5"
            style={{ border: `1px solid ${TOKENS.hair}` }}
          >
            {/* Tabs + buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <TabGroup
                active={activeView}
                onChange={setActiveView}
                items={[
                  { id: "daily", label: "Daily avg" },
                  { id: "annual", label: "Annualized" },
                ]}
              />
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  className="px-3 py-1.5 text-[11px] sm:text-xs rounded-md whitespace-nowrap flex-1 sm:flex-none"
                  onClick={() => setAuto((v) => !v)}
                  style={{
                    border: `1px solid ${TOKENS.hair}`,
                    color: auto ? TOKENS.text : TOKENS.sub,
                    background: auto
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                  }}
                >
                  {auto ? "⏸ Pause cycle" : "▶ Auto cycle"}
                </button>
                <button
                  className="px-3 py-1.5 text-[11px] sm:text-xs rounded-md whitespace-nowrap flex-1 sm:flex-none"
                  onClick={() => downloadCSV(visible, activeView)}
                  style={{
                    border: `1px solid ${TOKENS.hair}`,
                    color: TOKENS.sub,
                  }}
                >
                  ⬇ Export CSV
                </button>
              </div>
            </div>

            {/* Toggles */}
            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              {nets.map((n) => (
                <ToggleChip
                  key={n.key}
                  label={n.label}
                  active={!!enabled[n.key]}
                  onClick={() =>
                    setEnabled((prev) => ({ ...prev, [n.key]: !prev[n.key] }))
                  }
                  onMouseEnter={() => setHighlight(n.key)}
                  onMouseLeave={() =>
                    setHighlight((h) => (auto ? h : null))
                  }
                />
              ))}
            </div>

            {/* Assumption slider */}
            <div className="mt-4">
              <div
                className="flex items-center justify-between text-[11px] sm:text-xs"
                style={{ color: TOKENS.sub }}
              >
                <span>Assumption (what-if)</span>
                <span className="tabular-nums">{assumptionPct}%</span>
              </div>
              <input
                type="range"
                min={-25}
                max={25}
                step={1}
                value={assumptionPct}
                onChange={(e) =>
                  setAssumptionPct(parseInt(e.target.value))
                }
                className="w-full"
              />
              <div
                className="mt-1 flex justify-between text-[10px] sm:text-[11px]"
                style={{ color: TOKENS.mute }}
              >
                <span>−25%</span>
                <span>0%</span>
                <span>+25%</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div
            className="flex-1 rounded-xl"
            style={{ border: `1px solid ${TOKENS.stroke}` }}
          >
            <div
              className="px-3 sm:px-4 py-2 sm:py-3"
              style={{ borderBottom: `1px solid ${TOKENS.hair}` }}
            >
              <div
                className="text-[11px] sm:text-xs"
                style={{ color: TOKENS.sub }}
              >
                {activeView === "daily"
                  ? "Daily Transactions (avg, adjusted)"
                  : "Annualized Transactions (adjusted)"}
              </div>
            </div>
            <div className="px-2 sm:px-3 py-2">
              <HollowBarsInteractive
                networks={visible}
                highlightKey={highlight}
                setHighlight={setHighlight}
                maxDaily={maxDaily}
                view={activeView}
                auto={auto}
              />

              <div
                className="mt-1.5 text-[10px] sm:text-[11px]"
                style={{ color: TOKENS.mute }}
              >
                Bars are hollow (no fills). Hover or tap a bar to see exact
                values. Toggle networks above to compare contributions.
              </div>
            </div>
          </div>
        </div>

        {/* Losses + Why cards */}
        <div className="ga-bottom mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <LossCard hacksUSD={data.hacksUSD} scamsUSD={data.scamsUSD} />
          <WhyPlanCard />
        </div>
      </div>

      {/* Scoped layout tweaks so mobile isn’t super tall */}
      <style>{`
        .ga-section {
          width: 100%;
        }

        @media (max-width: 768px) {
          .ga-inner {
            padding-top: 1.5rem;  /* tighten vertical padding */
            padding-bottom: 1.75rem;
          }

          .ga-header h2 {
            line-height: 1.15;
          }

          /* KPIs: compact */
          .ga-inner .kpi-card {
            padding-top: 0.7rem;
            padding-bottom: 0.7rem;
          }

          /* Bottom cards: horizontal scroll instead of full stack */
          .ga-bottom {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            gap: 0.75rem;
            padding-bottom: 0.25rem;
            scroll-snap-type: x mandatory;
          }

          .ga-bottom > * {
            min-width: 85%;
            scroll-snap-align: start;
          }
        }

        @media (max-width: 480px) {
          .ga-inner {
            padding-left: 0.9rem;
            padding-right: 0.9rem;
          }

          .ga-header h2 {
            font-size: 18px;
          }
        }
      `}</style>
    </section>
  );
}

/* ============================== atoms ============================== */
function KPI({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div
      className="kpi-card rounded-xl px-3 py-3 sm:px-4 sm:py-4"
      style={{ border: `1px solid ${TOKENS.hair}` }}
    >
      <div
        className="text-[10px] sm:text-[11px] uppercase"
        style={{ color: TOKENS.sub }}
      >
        {label}
      </div>
      <div className="text-lg sm:text-2xl md:text-3xl font-semibold tabular-nums mt-0.5 sm:mt-1">
        {value}
      </div>
      {sub ? (
        <div
          className="mt-1 text-[10px] sm:text-xs md:text-[13px]"
          style={{ color: TOKENS.mute }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
}

function TabGroup<T extends string>({
  active,
  onChange,
  items,
}: {
  active: T;
  onChange: (v: T) => void;
  items: { id: T; label: string }[];
}) {
  return (
    <div
      className="inline-flex rounded-md p-0.5 w-full sm:w-auto"
      style={{ background: "#0E0E0E", border: `1px solid ${TOKENS.hair}` }}
    >
      {items.map((it) => {
        const selected = active === it.id;
        return (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            className="flex-1 sm:flex-none px-3 py-1.5 text-[11px] sm:text-xs rounded-[8px] transition-colors whitespace-nowrap"
            style={{
              color: selected ? TOKENS.text : TOKENS.sub,
              background: selected ? "rgba(255,255,255,0.08)" : "transparent",
              border: `1px solid ${
                selected ? TOKENS.hair : "transparent"
              }`,
            }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

function ToggleChip({
  label,
  active,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onMouseEnter} // Mobile: trigger on touch
      onTouchEnd={onMouseLeave} // Mobile: release on touch end
      className="px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs rounded-md"
      style={{
        border: `1px solid ${TOKENS.hair}`,
        color: active ? TOKENS.text : TOKENS.sub,
        background: active ? "rgba(255,255,255,0.08)" : "transparent",
      }}
    >
      {label}
    </button>
  );
}

/* ====================== interactive hollow bars ====================== */
function HollowBarsInteractive({
  networks,
  highlightKey,
  setHighlight,
  maxDaily,
  view,
  auto,
}: {
  networks: {
    key: string;
    label: string;
    dailyAdj: number;
    annualAdj: number;
  }[];
  highlightKey: string | null;
  setHighlight: (k: string | null) => void;
  maxDaily: number;
  view: "daily" | "annual";
  auto: boolean;
}) {
  const W = 680;
  const H = 220;
  const padX = 36;
  const padY = 28;
  const innerW = W - padX * 2;
  const innerH = H - padY * 2;
  const gap = 18;

  const barW =
    (innerW - gap * (networks.length - 1)) / Math.max(1, networks.length);

  const scaleY = (daily: number) =>
    (daily / Math.max(1, maxDaily)) * (innerH - 22);

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    lines: string[];
  } | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const showTooltip = (
    clientX: number,
    clientY: number,
    n: (typeof networks)[number]
  ) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    setTooltip({
      x: clientX - rect.left,
      y: clientY - rect.top - 12,
      lines: [
        n.label,
        `Daily (adj.): ${fmtNum(n.dailyAdj)}`,
        `Annual (adj.): ${fmtNum(n.annualAdj)}`,
      ],
    });
  };

  const handleEnter = (
    e: React.MouseEvent,
    n: (typeof networks)[number]
  ) => {
    showTooltip(e.clientX, e.clientY, n);
    setHighlight(n.key);
  };

  const handleLeave = () => {
    if (!auto) {
      setTooltip(null);
      setHighlight(null);
    }
  };

  // Auto tooltip when auto-cycling
  useEffect(() => {
    if (!auto || !highlightKey) {
      if (!auto) setTooltip(null);
      return;
    }
    const i = networks.findIndex((n) => n.key === highlightKey);
    if (i < 0) return;
    const n = networks[i];
    const h = scaleY(n.dailyAdj);
    const x = padX + i * (barW + gap);
    const y = H - padY - h;

    setTooltip({
      x: x + barW / 2,
      y: y - 10,
      lines: [
        n.label,
        `Daily (adj.): ${fmtNum(n.dailyAdj)}`,
        `Annual (adj.): ${fmtNum(n.annualAdj)}`,
      ],
    });
  }, [auto, highlightKey, networks, maxDaily]);

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-[190px] sm:h-[210px] md:h-[220px] block"
        onMouseLeave={handleLeave}
      >
        <defs>
          {/* Soft vertical grid gradient */}
          <linearGradient id="ga-grid-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(148,163,184,0.28)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0.08)" />
          </linearGradient>

          {/* Bar fills — Vercel blue style */}
          <linearGradient id="ga-bar-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1D4ED8" />
            <stop offset="55%" stopColor="#0070F3" />
            <stop offset="100%" stopColor="#0B1120" />
          </linearGradient>

          <linearGradient id="ga-bar-fill-active" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="45%" stopColor="#0070F3" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Subtle shadow for active bar */}
          <filter
            id="ga-bar-shadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="12"
              floodColor="rgba(0,112,243,0.5)"
            />
          </filter>
        </defs>

        {/* Horizontal grid lines (3) */}
        {Array.from({ length: 3 }).map((_, i) => {
          const y = padY + ((innerH - 10) / 4) * (i + 1);
          return (
            <line
              key={i}
              x1={padX}
              y1={y}
              x2={W - padX}
              y2={y}
              stroke="url(#ga-grid-line)"
              strokeWidth={1}
            />
          );
        })}

        {/* Baseline */}
        <line
          x1={padX}
          y1={H - padY}
          x2={W - padX}
          y2={H - padY}
          stroke="rgba(148,163,184,0.55)"
          strokeWidth={1}
        />

        {/* Bars */}
        {networks.map((n, i) => {
          const h = scaleY(n.dailyAdj);
          const x = padX + i * (barW + gap);
          const y = H - padY - h;
          const active = highlightKey === n.key;

          return (
            <g key={n.key}>
              {/* filled bar */}
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                rx={9}
                fill={active ? "url(#ga-bar-fill-active)" : "url(#ga-bar-fill)"}
                stroke={active ? TOKENS.primary : "rgba(148,163,184,0.5)"}
                strokeWidth={active ? 1.6 : 1}
                filter={active ? "url(#ga-bar-shadow)" : "none"}
                style={{
                  transition:
                    "stroke-width 180ms ease, stroke 180ms ease, filter 220ms ease, transform 160ms ease",
                }}
                onMouseEnter={(e) => handleEnter(e, n)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  showTooltip(touch.clientX, touch.clientY, n);
                  setHighlight(n.key);
                }}
              />

              {/* focusable hit-area */}
              <rect
                x={x}
                y={y}
                width={barW}
                height={h}
                rx={9}
                fill="transparent"
                tabIndex={0}
                onFocus={(e) =>
                  handleEnter(e as unknown as React.MouseEvent, n)
                }
                onBlur={handleLeave}
                onTouchEnd={handleLeave}
                aria-label={`${n.label} — Daily ${fmtNum(
                  n.dailyAdj
                )}, Annual ${fmtNum(n.annualAdj)}`}
              />

              {/* label: chain name */}
              <text
                x={x + barW / 2}
                y={H - padY + 15}
                textAnchor="middle"
                fontSize="10"
                fill="rgba(226,232,240,0.9)"
              >
                {n.label.split(" ")[0]}
              </text>

              {/* label: metric */}
              <text
                x={x + barW / 2}
                y={H - padY + 28}
                textAnchor="middle"
                fontSize="9"
                fill="rgba(148,163,184,0.9)"
                className="tabular-nums"
              >
                {view === "daily"
                  ? fmtNum(n.dailyAdj)
                  : fmtNum(n.annualAdj)}
              </text>
            </g>
          );
        })}

        {/* Tooltip */}
        {tooltip && (
          <g transform={`translate(${tooltip.x}, ${tooltip.y})`}>
            <rect
              x={-110}
              y={-50}
              width={220}
              height={48}
              rx={8}
              fill="rgba(2,6,23,0.98)"
              stroke="rgba(148,163,184,0.5)"
            />
            {tooltip.lines.map((ln, idx) => (
              <text
                key={idx}
                x={-100}
                y={-32 + idx * 15}
                fontSize={idx === 0 ? 11 : 10}
                fill={
                  idx === 0
                    ? "#E5E7EB"
                    : "rgba(156,163,175,0.95)"
                }
              >
                {ln}
              </text>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}



/* ====================== extra cards ====================== */
function LossCard({
  hacksUSD,
  scamsUSD,
}: {
  hacksUSD: number;
  scamsUSD: number;
}) {
  return (
    <div
      className="rounded-2xl ga-card"
      style={{ border: `1px solid ${TOKENS.stroke}` }}
    >
      <div
        className="px-3 sm:px-4 py-2 sm:py-3"
        style={{ borderBottom: `1px solid ${TOKENS.hair}` }}
      >
        <div
          className="text-[11px] sm:text-xs"
          style={{ color: TOKENS.sub }}
        >
          Losses & Risk (2024)
        </div>
      </div>
      <div className="px-3 sm:px-4 md:px-5 py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <MiniKPI
          title="Scams/Fraud (lower-bound)"
          value={fmtUSD(scamsUSD)}
          note="Chainalysis"
        />
        <MiniKPI
          title="Hacks/Exploits"
          value={fmtUSD(hacksUSD)}
          note="Chainalysis / TRM Labs"
        />
        <Pill>Romance/grooming scams elevated</Pill>
        <Pill>Infra & key compromises dominated hack losses</Pill>
      </div>
    </div>
  );
}

function WhyPlanCard() {
  return (
    <div
      className="rounded-2xl ga-card"
      style={{ border: `1px solid ${TOKENS.stroke}` }}
    >
      <div
        className="px-3 sm:px-4 py-2 sm:py-3"
        style={{ borderBottom: `1px solid ${TOKENS.hair}` }}
      >
        <div
          className="text-[11px] sm:text-xs"
          style={{ color: TOKENS.sub }}
        >
          Why “planning gas” fails
        </div>
      </div>
      <div
        className="px-3 sm:px-4 md:px-5 py-4 sm:py-5 text-[12px] sm:text-[13px] leading-relaxed"
        style={{ color: TOKENS.sub }}
      >
        <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2">
          <li>Congestion is spiky; quotes drift between click and inclusion.</li>
          <li>
            Wallets juggle native gas tokens per chain → failed/completed
            ratios worsen.
          </li>
          <li>
            Manual timing (“wait till night”) saves pennies but burns
            opportunities.
          </li>
        </ul>
        <div
          className="mt-3 sm:mt-4 rounded-lg px-3 py-3"
          style={{ border: `1px solid ${TOKENS.hair}` }}
        >
          <div
            className="font-medium text-[12px] sm:text-[13px]"
            style={{ color: TOKENS.text }}
          >
            DNDX counter-proposal
          </div>
          <div className="mt-1.5 text-[12px]">
            <b>Predictable band (±5%)</b>, <b>UNDO (180s)</b>,{" "}
            <b>/SLA credits</b>, and <b>Escrow/Refund</b> at the protocol
            layer. No timing games. No juggling gas tokens.
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniKPI({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note?: string;
}) {
  return (
    <div
      className="rounded-lg px-3 py-2.5 sm:px-4 sm:py-3"
      style={{ border: `1px solid ${TOKENS.hair}` }}
    >
      <div
        className="text-[11px]"
        style={{ color: TOKENS.sub }}
      >
        {title}
      </div>
      <div className="text-lg sm:text-xl font-semibold mt-0.5">
        {value}
      </div>
      {note ? (
        <div
          className="text-[10px] sm:text-[11px] mt-1"
          style={{ color: TOKENS.mute }}
        >
          {note}
        </div>
      ) : null}
    </div>
  );
}
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[11px] sm:text-xs rounded-md px-3 py-2"
      style={{ border: `1px solid ${TOKENS.hair}`, color: TOKENS.sub }}
    >
      {children}
    </div>
  );
}

/* ====================== helpers ====================== */
function downloadCSV(
  networks: {
    key: string;
    label: string;
    dailyAdj: number;
    annualAdj: number;
  }[],
  view: "daily" | "annual"
) {
  const rows = [
    ["label", "dailyAdjusted", "annualAdjusted"],
    ...networks.map((n) => [
      n.label,
      Math.round(n.dailyAdj),
      Math.round(n.annualAdj),
    ]),
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `chains-${view}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
