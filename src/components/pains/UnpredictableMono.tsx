"use client";
import React, { useEffect, useMemo, useState } from "react";

/* ------------------------- monochrome tokens ------------------------- */
const TOKENS = {
  stroke: "rgba(17, 0, 255, 0.1)",
  hair: "rgba(255,255,255,0.08)",
  text: "#FAFAFA",
  sub: "rgba(255,255,255,0.64)",
  mute: "rgba(255,255,255,0.45)",
  line: "rgba(255,255,255,0.9)",
  band: "rgba(255,255,255,0.12)",
};

const VERCEL_BLUE = "#0070F3";

/* ------------------------------ chains ------------------------------ */
type ChainKey = "ethereum" | "solana" | "base" | "arbitrum" | "polygon";

const REF_COST_USDC: Record<ChainKey, number> = {
  ethereum: 12.0,
  solana: 0.02,
  base: 0.15,
  arbitrum: 0.2,
  polygon: 0.05,
};

const CHAINS: { key: ChainKey; label: string; baseAmp: number; freq: number }[] = [
  { key: "ethereum", label: "Ethereum (L1)", baseAmp: 0.85, freq: 1.0 },
  { key: "solana",   label: "Solana",        baseAmp: 0.55, freq: 1.35 },
  { key: "base",     label: "Base (L2)",     baseAmp: 0.45, freq: 1.20 },
  { key: "arbitrum", label: "Arbitrum (L2)", baseAmp: 0.52, freq: 1.15 },
  { key: "polygon",  label: "Polygon",       baseAmp: 0.60, freq: 1.05 },
];

/* ------------------------------ helpers ------------------------------ */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function stddev(values: number[]) {
  const m = values.reduce((s, v) => s + v, 0) / values.length;
  const v = values.reduce((s, x) => s + (x - m) ** 2, 0) / values.length;
  return Math.sqrt(v);
}

function genSeries({
  points,
  t,
  amp,
  freqMul,
}: {
  points: number;
  t: number;
  amp: number;
  freqMul: number;
}) {
  const arr: number[] = [];
  for (let i = 0; i < points; i++) {
    const x = (i + t) / 10;
    const y =
      Math.sin(x * 1.25 * freqMul) * 0.58 +
      Math.sin(x * 0.72 * freqMul + 1.33) * 0.31 +
      Math.sin(x * 2.05 * freqMul + 0.6) * 0.11;
    arr.push(y * amp);
  }
  return arr;
}

/* ------------------------------ Sparkline ------------------------------ */
function Sparkline({
  series,
  width = 560,
  height = 150, // ⬅️ slightly shorter to avoid huge vertical stretch
  showBand,
  bandTop = 0.05,
  bandBottom = -0.05,
}: {
  series: number[];
  width?: number;
  height?: number;
  showBand: boolean;
  bandTop?: number;
  bandBottom?: number;
}) {
  const padX = 12;
  const padY = 10;
  const w = width - padX * 2;
  const h = height - padY * 2;

  const maxAbs = Math.max(0.25, ...series.map((v) => Math.abs(v)));
  const sx = (i: number) => (i / (series.length - 1)) * w + padX;
  const sy = (v: number) =>
    height - padY - ((v + maxAbs) / (maxAbs * 2)) * h;

  const path = series
    .map((v, i) => `${i ? "L" : "M"} ${sx(i)} ${sy(v)}`)
    .join(" ");

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="block"
      data-dndx-wave
      style={{ stroke: "initial" }} // reset inherited utilities
    >
      {showBand && (
        <rect
          x={padX}
          y={Math.min(sy(bandTop), sy(bandBottom))}
          width={w}
          height={Math.abs(sy(bandBottom) - sy(bandTop))}
          fill={TOKENS.band}
          rx={6}
        />
      )}

      <path
        d={path}
        className="dndx-wave"
        fill="none"
        stroke={VERCEL_BLUE}
        style={{ stroke: VERCEL_BLUE }}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        shapeRendering="geometricPrecision"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ========================== main export component ========================== */
export default function UnpredictableMono({
  initialCongestion = 60,
}: {
  initialCongestion?: number;
}) {
  const [chain, setChain] = useState<ChainKey>("ethereum");
  const [tab, setTab] = useState<"today" | "dndx">("today");
  const [congestion, setCongestion] = useState(initialCongestion);
  const [t, setT] = useState(0);

  const profile = CHAINS.find((c) => c.key === chain)!;
  const rawAmp = profile.baseAmp * lerp(0.35, 1.75, congestion / 100);
  const amp = tab === "today" ? rawAmp : Math.max(0.06, rawAmp * 0.2);
  const freq = profile.freq;

  useEffect(() => {
    let raf: number;
    const loop = () => {
      setT((x) => x + 0.5);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const series = useMemo(
    () => genSeries({ points: 80, t, amp, freqMul: freq }),
    [t, amp, freq]
  );
  const sigma = useMemo(() => stddev(series), [series]);
  const spread = useMemo(
    () => Math.max(...series.map((v) => Math.abs(v))),
    [series]
  );

  const baseCost = REF_COST_USDC[chain];
  const sigmaUSDC = sigma * baseCost;
  const spreadUSDC = spread * baseCost;

  return (
    <>
      <style>{`
        .congestion-slider {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: pan-x;
          width: 100%;
        }

        /* WebKit */
        .congestion-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${VERCEL_BLUE};
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 112, 243, 0.4);
          transition: all 0.2s ease;
          position: relative;
          z-index: 10;
          margin-top: -7px;
        }
        .congestion-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 3px 12px rgba(0, 112, 243, 0.6);
        }
        .congestion-slider::-webkit-slider-thumb:active {
          transform: scale(1.1);
          box-shadow: 0 4px 16px rgba(0, 112, 243, 0.7);
        }

        /* Firefox */
        .congestion-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${VERCEL_BLUE};
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 112, 243, 0.4);
          transition: all 0.2s ease;
        }
        .congestion-slider::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 3px 12px rgba(0, 112, 243, 0.6);
        }
        .congestion-slider::-moz-range-thumb:active {
          transform: scale(1.1);
          box-shadow: 0 4px 16px rgba(0, 112, 243, 0.7);
        }

        .congestion-slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 6px;
          border-radius: 3px;
        }
        .congestion-slider::-moz-range-track {
          width: 100%;
          height: 6px;
          border-radius: 3px;
        }

        @media (max-width: 640px) {
          .congestion-slider::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
            margin-top: -9px;
          }
          .congestion-slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
          }
          .congestion-slider::-webkit-slider-runnable-track {
            height: 8px;
            border-radius: 4px;
          }
          .congestion-slider::-moz-range-track {
            height: 8px;
            border-radius: 4px;
          }
        }
      `}</style>

      <section style={{ color: TOKENS.text }}>
        <div
          className="
            mx-auto max-w-[1240px]
            px-4 sm:px-6 md:px-10
            py-8 sm:py-12 md:py-18 lg:py-20
          "
        >
          {/* Header */}
          <div className="mb-5 sm:mb-7 md:mb-10">
            <div
              className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase"
              style={{ color: TOKENS.sub }}
            >
              Problem · Unpredictability
            </div>
            <h2 className="mt-2 text-[24px] sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Fees swing when networks breathe.
            </h2>
            <p
              className="mt-3 text-sm sm:text-base md:text-lg"
              style={{ color: TOKENS.sub }}
            >
              Spikes break margins. DNDX narrows variance to an expected band.
            </p>
          </div>

          {/* Main grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
            {/* Left column: metrics + chips */}
            <div className="space-y-5 sm:space-y-6">
              {/* Metrics: 2 columns even on mobile */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Metric
                  label="Live spread (24h)"
                  value={`±${Math.round(spread * 100)}%`}
                  sub={`≈ ±$${spreadUSDC.toFixed(
                    spreadUSDC < 1 ? 2 : 0
                  )} USDC`}
                />
                <Metric
                  label="σ (std dev) [USDC]"
                  value={sigma.toFixed(2)}
                  sub={`±$${sigmaUSDC.toFixed(
                    sigmaUSDC < 1 ? 2 : 2
                  )} USDC`}
                />
              </div>

              {/* Chips: tighter grid on phones */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                <Chip title="Gas spikes">
                  Short bursts of congestion expand fees beyond budget windows.
                </Chip>
                <Chip title="Irreversible errors">
                  Variance makes routing & quoting brittle; mistakes get costly.
                </Chip>
                <Chip title="Native token friction">
                  Users stall topping up gas tokens; flows lose completion.
                </Chip>
              </div>
            </div>

            {/* Right column: Simulator */}
            <Simulator
              chain={chain}
              setChain={setChain}
              tab={tab}
              setTab={setTab}
              congestion={congestion}
              setCongestion={setCongestion}
              series={series}
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------ subcomponents ------------------------------ */
function Metric({
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
      className="rounded-lg px-3 py-3 sm:px-4 sm:py-4"
      style={{ border: `1px solid ${TOKENS.hair}` }}
    >
      <div
        className="text-[9px] sm:text-[10px] md:text-[11px] uppercase"
        style={{ color: TOKENS.sub }}
      >
        {label}
      </div>
      <div className="text-lg sm:text-xl md:text-2xl font-semibold tabular-nums">
        {value}
      </div>
      {sub && (
        <div
          className="mt-1 text-[11px] sm:text-[13px]"
          style={{ color: TOKENS.mute }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function Chip({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-md px-3 py-2 sm:py-3"
      style={{ border: `1px solid ${TOKENS.hair}` }}
    >
      <div className="underline underline-offset-4 decoration-[1px] text-[11px] sm:text-[12px]">
        {title}
      </div>
      <div
        className="mt-1.5 text-[11px] sm:text-[13px]"
        style={{ color: TOKENS.sub }}
      >
        {children}
      </div>
    </div>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 text-xs sm:text-sm rounded-[8px] transition-colors"
      style={{
        color: active ? TOKENS.text : TOKENS.sub,
        background: active ? "rgba(255,255,255,0.08)" : "transparent",
        border: `1px solid ${active ? TOKENS.hair : "transparent"}`,
      }}
    >
      {children}
    </button>
  );
}

/* ------------------------------ Simulator ------------------------------ */
function Simulator({
  chain,
  setChain,
  tab,
  setTab,
  congestion,
  setCongestion,
  series,
}: {
  chain: ChainKey;
  setChain: (c: ChainKey) => void;
  tab: "today" | "dndx";
  setTab: (t: "today" | "dndx") => void;
  congestion: number;
  setCongestion: (n: number) => void;
  series: number[];
}) {
  const congestionLabel = (v: number) =>
    v < 25 ? "Idle" : v < 50 ? "Normal" : v < 75 ? "Busy" : "Peak";
  const liveMaxAbs = Math.max(...series.map((v) => Math.abs(v)));
  const liveSpreadPct = Math.round(liveMaxAbs * 100);
  const BAND_HALF = 0.05;

  return (
    <div
      className="rounded-2xl relative mt-6 md:mt-0"
      style={{ border: `1px solid ${TOKENS.stroke}` }}
    >
      {/* header row */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-4 py-3"
        style={{ borderBottom: `1px solid ${TOKENS.hair}` }}
      >
        <div
          className="inline-flex rounded-md p-0.5 self-start"
          style={{ background: "#0E0E0E", border: `1px solid ${TOKENS.hair}` }}
        >
          <Tab active={tab === "today"} onClick={() => setTab("today")}>
            Today
          </Tab>
          <Tab active={tab === "dndx"} onClick={() => setTab("dndx")}>
            With DNDX
          </Tab>
        </div>

        <div
          className="relative z-10 flex items-center gap-2 text-xs"
          style={{ color: TOKENS.sub }}
        >
          <span>Network</span>
          <select
            value={chain}
            onChange={(e) => setChain(e.target.value as ChainKey)}
            className="bg-transparent text-xs sm:text-sm rounded-md px-2 py-1 outline-none w-[170px] sm:w-auto"
            style={{
              border: `1px solid ${TOKENS.hair}`,
              color: TOKENS.text,
            }}
          >
            {CHAINS.map((c) => (
              <option key={c.key} value={c.key} className="bg-black">
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* chart */}
      <div className="px-3 sm:px-4 pt-4">
        <Sparkline
          series={series}
          showBand={tab === "dndx"}
          bandTop={BAND_HALF}
          bandBottom={-BAND_HALF}
          width={560}
          height={150}
        />
      </div>

      {/* controls + explainer */}
      <div className="px-3 sm:px-4 pb-4 sm:pb-5">
        {/* slider */}
        <div className="mt-3">
          <div
            className="flex items-center justify-between text-[11px] sm:text-xs"
            style={{ color: TOKENS.sub }}
          >
            <span>
              Congestion{" "}
              <span className="text-[10px] sm:text-[11px] opacity-70">
                ({congestionLabel(congestion)})
              </span>
            </span>
            <span className="tabular-nums text-[11px]">
              {congestion}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={congestion}
            onChange={(e) => setCongestion(parseInt(e.target.value))}
            className="w-full cursor-pointer congestion-slider"
            style={{
              WebkitAppearance: "none",
              appearance: "none",
              height: "6px",
              borderRadius: "3px",
              background: `linear-gradient(to right, ${VERCEL_BLUE} 0%, ${VERCEL_BLUE} ${congestion}%, ${TOKENS.hair} ${congestion}%, ${TOKENS.hair} 100%)`,
              outline: "none",
            }}
          />
          <div
            className="mt-1 flex justify-between text-[10px] sm:text-[11px]"
            style={{ color: TOKENS.mute }}
          >
            <span>Idle</span>
            <span>Normal</span>
            <span>Busy</span>
            <span>Peak</span>
          </div>
        </div>

        {/* explainer card */}
        <div
          className="mt-3 sm:mt-4 rounded-lg px-3 py-2.5 sm:py-3 text-[11px] sm:text-[13px] leading-relaxed"
          style={{ border: `1px solid ${TOKENS.hair}`, color: TOKENS.sub }}
        >
          <div
            className="mb-1.5 font-medium text-[11px] sm:text-[13px]"
            style={{ color: TOKENS.text }}
          >
            What “Congestion” means
          </div>
          <p>
            Congestion approximates <strong>blockspace demand</strong>—mempool
            pressure and how many transactions compete for inclusion. As it
            rises, fee variance and tails widen.
          </p>
          <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
            <li>
              <span className="opacity-80 text-[11px] sm:text-[12px]">
                Expected spread today:
              </span>{" "}
              <span className="tabular-nums text-[11px] sm:text-[12px]">
                ±{liveSpreadPct}%
              </span>
            </li>
            <li>
              <span className="opacity-80 text-[11px] sm:text-[12px]">
                Target band with DNDX:
              </span>{" "}
              <span className="tabular-nums text-[11px] sm:text-[12px]">
                ±5%
              </span>
            </li>
          </ul>
          <div
            className="mt-1.5 text-[10px] sm:text-[11px]"
            style={{ color: TOKENS.mute }}
          >
            Units: All dollar amounts are shown in <strong>USDC</strong>,
            independent of the selected chain.
          </div>
        </div>
      </div>
    </div>
  );
}
