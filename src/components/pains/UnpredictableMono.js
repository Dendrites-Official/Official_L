"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
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
const REF_COST_USDC = {
    ethereum: 12.0,
    solana: 0.02,
    base: 0.15,
    arbitrum: 0.2,
    polygon: 0.05,
};
const CHAINS = [
    { key: "ethereum", label: "Ethereum (L1)", baseAmp: 0.85, freq: 1.0 },
    { key: "solana", label: "Solana", baseAmp: 0.55, freq: 1.35 },
    { key: "base", label: "Base (L2)", baseAmp: 0.45, freq: 1.20 },
    { key: "arbitrum", label: "Arbitrum (L2)", baseAmp: 0.52, freq: 1.15 },
    { key: "polygon", label: "Polygon", baseAmp: 0.60, freq: 1.05 },
];
/* ------------------------------ helpers ------------------------------ */
const lerp = (a, b, t) => a + (b - a) * t;
function stddev(values) {
    const m = values.reduce((s, v) => s + v, 0) / values.length;
    const v = values.reduce((s, x) => s + (x - m) ** 2, 0) / values.length;
    return Math.sqrt(v);
}
function genSeries({ points, t, amp, freqMul, }) {
    const arr = [];
    for (let i = 0; i < points; i++) {
        const x = (i + t) / 10;
        const y = Math.sin(x * 1.25 * freqMul) * 0.58 +
            Math.sin(x * 0.72 * freqMul + 1.33) * 0.31 +
            Math.sin(x * 2.05 * freqMul + 0.6) * 0.11;
        arr.push(y * amp);
    }
    return arr;
}
/* ------------------------------ Sparkline ------------------------------ */
function Sparkline({ series, width = 560, height = 150, // ⬅️ slightly shorter to avoid huge vertical stretch
showBand, bandTop = 0.05, bandBottom = -0.05, }) {
    const padX = 12;
    const padY = 10;
    const w = width - padX * 2;
    const h = height - padY * 2;
    const maxAbs = Math.max(0.25, ...series.map((v) => Math.abs(v)));
    const sx = (i) => (i / (series.length - 1)) * w + padX;
    const sy = (v) => height - padY - ((v + maxAbs) / (maxAbs * 2)) * h;
    const path = series
        .map((v, i) => `${i ? "L" : "M"} ${sx(i)} ${sy(v)}`)
        .join(" ");
    return (_jsxs("svg", { width: "100%", height: height, viewBox: `0 0 ${width} ${height}`, className: "block", "data-dndx-wave": true, style: { stroke: "initial" }, children: [showBand && (_jsx("rect", { x: padX, y: Math.min(sy(bandTop), sy(bandBottom)), width: w, height: Math.abs(sy(bandBottom) - sy(bandTop)), fill: TOKENS.band, rx: 6 })), _jsx("path", { d: path, className: "dndx-wave", fill: "none", stroke: VERCEL_BLUE, style: { stroke: VERCEL_BLUE }, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", shapeRendering: "geometricPrecision", vectorEffect: "non-scaling-stroke" })] }));
}
/* ========================== main export component ========================== */
export default function UnpredictableMono({ initialCongestion = 60, }) {
    const [chain, setChain] = useState("ethereum");
    const [tab, setTab] = useState("today");
    const [congestion, setCongestion] = useState(initialCongestion);
    const [t, setT] = useState(0);
    const profile = CHAINS.find((c) => c.key === chain);
    const rawAmp = profile.baseAmp * lerp(0.35, 1.75, congestion / 100);
    const amp = tab === "today" ? rawAmp : Math.max(0.06, rawAmp * 0.2);
    const freq = profile.freq;
    useEffect(() => {
        let raf;
        const loop = () => {
            setT((x) => x + 0.5);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, []);
    const series = useMemo(() => genSeries({ points: 80, t, amp, freqMul: freq }), [t, amp, freq]);
    const sigma = useMemo(() => stddev(series), [series]);
    const spread = useMemo(() => Math.max(...series.map((v) => Math.abs(v))), [series]);
    const baseCost = REF_COST_USDC[chain];
    const sigmaUSDC = sigma * baseCost;
    const spreadUSDC = spread * baseCost;
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
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
      ` }), _jsx("section", { style: { color: TOKENS.text }, children: _jsxs("div", { className: "\n            mx-auto max-w-[1240px]\n            px-4 sm:px-6 md:px-10\n            py-8 sm:py-12 md:py-18 lg:py-20\n          ", children: [_jsxs("div", { className: "mb-5 sm:mb-7 md:mb-10", children: [_jsx("div", { className: "text-[10px] sm:text-[11px] tracking-[0.22em] uppercase", style: { color: TOKENS.sub }, children: "Problem \u00B7 Unpredictability" }), _jsx("h2", { className: "mt-2 text-[24px] sm:text-4xl md:text-5xl font-extrabold tracking-tight", children: "Fees swing when networks breathe." }), _jsx("p", { className: "mt-3 text-sm sm:text-base md:text-lg", style: { color: TOKENS.sub }, children: "Spikes break margins. DNDX narrows variance to an expected band." })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start", children: [_jsxs("div", { className: "space-y-5 sm:space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-4", children: [_jsx(Metric, { label: "Live spread (24h)", value: `±${Math.round(spread * 100)}%`, sub: `≈ ±$${spreadUSDC.toFixed(spreadUSDC < 1 ? 2 : 0)} USDC` }), _jsx(Metric, { label: "\u03C3 (std dev) [USDC]", value: sigma.toFixed(2), sub: `±$${sigmaUSDC.toFixed(sigmaUSDC < 1 ? 2 : 2)} USDC` })] }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm", children: [_jsx(Chip, { title: "Gas spikes", children: "Short bursts of congestion expand fees beyond budget windows." }), _jsx(Chip, { title: "Irreversible errors", children: "Variance makes routing & quoting brittle; mistakes get costly." }), _jsx(Chip, { title: "Native token friction", children: "Users stall topping up gas tokens; flows lose completion." })] })] }), _jsx(Simulator, { chain: chain, setChain: setChain, tab: tab, setTab: setTab, congestion: congestion, setCongestion: setCongestion, series: series })] })] }) })] }));
}
/* ------------------------------ subcomponents ------------------------------ */
function Metric({ label, value, sub, }) {
    return (_jsxs("div", { className: "rounded-lg px-3 py-3 sm:px-4 sm:py-4", style: { border: `1px solid ${TOKENS.hair}` }, children: [_jsx("div", { className: "text-[9px] sm:text-[10px] md:text-[11px] uppercase", style: { color: TOKENS.sub }, children: label }), _jsx("div", { className: "text-lg sm:text-xl md:text-2xl font-semibold tabular-nums", children: value }), sub && (_jsx("div", { className: "mt-1 text-[11px] sm:text-[13px]", style: { color: TOKENS.mute }, children: sub }))] }));
}
function Chip({ title, children }) {
    return (_jsxs("div", { className: "rounded-md px-3 py-2 sm:py-3", style: { border: `1px solid ${TOKENS.hair}` }, children: [_jsx("div", { className: "underline underline-offset-4 decoration-[1px] text-[11px] sm:text-[12px]", children: title }), _jsx("div", { className: "mt-1.5 text-[11px] sm:text-[13px]", style: { color: TOKENS.sub }, children: children })] }));
}
function Tab({ active, onClick, children, }) {
    return (_jsx("button", { onClick: onClick, className: "px-3 py-1.5 text-xs sm:text-sm rounded-[8px] transition-colors", style: {
            color: active ? TOKENS.text : TOKENS.sub,
            background: active ? "rgba(255,255,255,0.08)" : "transparent",
            border: `1px solid ${active ? TOKENS.hair : "transparent"}`,
        }, children: children }));
}
/* ------------------------------ Simulator ------------------------------ */
function Simulator({ chain, setChain, tab, setTab, congestion, setCongestion, series, }) {
    const congestionLabel = (v) => v < 25 ? "Idle" : v < 50 ? "Normal" : v < 75 ? "Busy" : "Peak";
    const liveMaxAbs = Math.max(...series.map((v) => Math.abs(v)));
    const liveSpreadPct = Math.round(liveMaxAbs * 100);
    const BAND_HALF = 0.05;
    return (_jsxs("div", { className: "rounded-2xl relative mt-6 md:mt-0", style: { border: `1px solid ${TOKENS.stroke}` }, children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-3 sm:px-4 py-3", style: { borderBottom: `1px solid ${TOKENS.hair}` }, children: [_jsxs("div", { className: "inline-flex rounded-md p-0.5 self-start", style: { background: "#0E0E0E", border: `1px solid ${TOKENS.hair}` }, children: [_jsx(Tab, { active: tab === "today", onClick: () => setTab("today"), children: "Today" }), _jsx(Tab, { active: tab === "dndx", onClick: () => setTab("dndx"), children: "With DNDX" })] }), _jsxs("div", { className: "relative z-10 flex items-center gap-2 text-xs", style: { color: TOKENS.sub }, children: [_jsx("span", { children: "Network" }), _jsx("select", { value: chain, onChange: (e) => setChain(e.target.value), className: "bg-transparent text-xs sm:text-sm rounded-md px-2 py-1 outline-none w-[170px] sm:w-auto", style: {
                                    border: `1px solid ${TOKENS.hair}`,
                                    color: TOKENS.text,
                                }, children: CHAINS.map((c) => (_jsx("option", { value: c.key, className: "bg-black", children: c.label }, c.key))) })] })] }), _jsx("div", { className: "px-3 sm:px-4 pt-4", children: _jsx(Sparkline, { series: series, showBand: tab === "dndx", bandTop: BAND_HALF, bandBottom: -BAND_HALF, width: 560, height: 150 }) }), _jsxs("div", { className: "px-3 sm:px-4 pb-4 sm:pb-5", children: [_jsxs("div", { className: "mt-3", children: [_jsxs("div", { className: "flex items-center justify-between text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: [_jsxs("span", { children: ["Congestion", " ", _jsxs("span", { className: "text-[10px] sm:text-[11px] opacity-70", children: ["(", congestionLabel(congestion), ")"] })] }), _jsxs("span", { className: "tabular-nums text-[11px]", children: [congestion, "%"] })] }), _jsx("input", { type: "range", min: 0, max: 100, value: congestion, onChange: (e) => setCongestion(parseInt(e.target.value)), className: "w-full cursor-pointer congestion-slider", style: {
                                    WebkitAppearance: "none",
                                    appearance: "none",
                                    height: "6px",
                                    borderRadius: "3px",
                                    background: `linear-gradient(to right, ${VERCEL_BLUE} 0%, ${VERCEL_BLUE} ${congestion}%, ${TOKENS.hair} ${congestion}%, ${TOKENS.hair} 100%)`,
                                    outline: "none",
                                } }), _jsxs("div", { className: "mt-1 flex justify-between text-[10px] sm:text-[11px]", style: { color: TOKENS.mute }, children: [_jsx("span", { children: "Idle" }), _jsx("span", { children: "Normal" }), _jsx("span", { children: "Busy" }), _jsx("span", { children: "Peak" })] })] }), _jsxs("div", { className: "mt-3 sm:mt-4 rounded-lg px-3 py-2.5 sm:py-3 text-[11px] sm:text-[13px] leading-relaxed", style: { border: `1px solid ${TOKENS.hair}`, color: TOKENS.sub }, children: [_jsx("div", { className: "mb-1.5 font-medium text-[11px] sm:text-[13px]", style: { color: TOKENS.text }, children: "What \u201CCongestion\u201D means" }), _jsxs("p", { children: ["Congestion approximates ", _jsx("strong", { children: "blockspace demand" }), "\u2014mempool pressure and how many transactions compete for inclusion. As it rises, fee variance and tails widen."] }), _jsxs("ul", { className: "mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2", children: [_jsxs("li", { children: [_jsx("span", { className: "opacity-80 text-[11px] sm:text-[12px]", children: "Expected spread today:" }), " ", _jsxs("span", { className: "tabular-nums text-[11px] sm:text-[12px]", children: ["\u00B1", liveSpreadPct, "%"] })] }), _jsxs("li", { children: [_jsx("span", { className: "opacity-80 text-[11px] sm:text-[12px]", children: "Target band with DNDX:" }), " ", _jsx("span", { className: "tabular-nums text-[11px] sm:text-[12px]", children: "\u00B15%" })] })] }), _jsxs("div", { className: "mt-1.5 text-[10px] sm:text-[11px]", style: { color: TOKENS.mute }, children: ["Units: All dollar amounts are shown in ", _jsx("strong", { children: "USDC" }), ", independent of the selected chain."] })] })] })] }));
}
