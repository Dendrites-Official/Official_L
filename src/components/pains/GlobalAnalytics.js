"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
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
const FALLBACK = {
    networks: [
        { key: "ethereum", label: "Ethereum (L1)", dailyTxAvg: 1560000 },
        { key: "bsc", label: "BNB Smart Chain", dailyTxAvg: 4000000 },
        { key: "arbitrum", label: "Arbitrum One", dailyTxAvg: 2500000 },
        { key: "base", label: "Base", dailyTxAvg: 1600000 },
        { key: "polygon", label: "Polygon PoS", dailyTxAvg: 2000000 },
    ],
    hacksUSD: 2200000000,
    scamsUSD: 9900000000,
};
const YEAR_DAYS = 365;
function fmtNum(n) {
    return new Intl.NumberFormat("en-US").format(Math.round(n));
}
function fmtUSD(n) {
    const abs = Math.abs(n);
    if (abs >= 1000000000)
        return `$${(n / 1000000000).toFixed(1)}B`;
    if (abs >= 1000000)
        return `$${(n / 1000000).toFixed(1)}M`;
    if (abs >= 1000)
        return `$${(n / 1000).toFixed(1)}K`;
    return `$${n.toFixed(0)}`;
}
export default function GlobalAnalytics() {
    /** ---------- data load / state ---------- */
    const [data, setData] = useState(FALLBACK);
    const [activeView, setActiveView] = useState("daily");
    const [assumptionPct, setAssumptionPct] = useState(0); // -25 .. +25
    const [enabled, setEnabled] = useState({});
    const [highlight, setHighlight] = useState(null);
    const [auto, setAuto] = useState(false);
    // Try live json -> lb json -> fallback
    useEffect(() => {
        (async () => {
            const tryFetch = async (url) => {
                try {
                    const r = await fetch(url, { cache: "no-store" });
                    if (!r.ok)
                        return null;
                    const j = await r.json();
                    if (j &&
                        Array.isArray(j.networks) &&
                        typeof j.networks[0]?.dailyTxAvg === "number") {
                        return j;
                    }
                    return null;
                }
                catch {
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
        const next = {};
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
    const visible = useMemo(() => nets.filter((n) => enabled[n.key]), [nets, enabled]);
    const totalDaily = useMemo(() => visible.reduce((s, n) => s + n.dailyAdj, 0), [visible]);
    const totalAnnual = useMemo(() => visible.reduce((s, n) => s + n.annualAdj, 0), [visible]);
    const maxDaily = useMemo(() => Math.max(...visible.map((n) => n.dailyAdj), 1), [visible]);
    /** ---------- auto-cycler for highlight ---------- */
    const idxRef = useRef(0);
    useEffect(() => {
        if (!auto || visible.length === 0)
            return;
        const id = setInterval(() => {
            idxRef.current = (idxRef.current + 1) % visible.length;
            setHighlight(visible[idxRef.current].key);
        }, 1600);
        return () => clearInterval(id);
    }, [auto, visible]);
    /** ---------- UI ---------- */
    return (_jsxs("section", { className: "ga-section", style: { color: TOKENS.text }, children: [_jsxs("div", { className: "ga-inner mx-auto max-w-[1240px] px-4 sm:px-6 md:px-10 pt-8 sm:pt-14 md:pt-20 pb-8 sm:pb-14 md:pb-20", children: [_jsxs("div", { className: "ga-header mb-4 sm:mb-6 md:mb-8", children: [_jsx("div", { className: "text-[10px] sm:text-[11px] tracking-[0.22em] uppercase", style: { color: TOKENS.sub }, children: "Market Activity \u00B7 Jan\u2013Dec 2024" }), _jsx("h2", { className: "mt-1 sm:mt-2 text-[20px] sm:text-[26px] md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight", children: "Billions of on-chain actions. Millions at risk." }), _jsx("p", { className: "mt-2 text-xs sm:text-sm md:text-lg max-w-2xl", style: { color: TOKENS.sub }, children: "Interactive snapshot across major EVM networks. Adjust assumptions, toggle chains, and export the view." })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6", children: [_jsx(KPI, { label: activeView === "daily"
                                    ? "Daily total (adj.)"
                                    : "Annualized total (adj.)", value: activeView === "daily"
                                    ? `${fmtNum(totalDaily)}`
                                    : `${fmtNum(totalAnnual)}`, sub: activeView === "daily"
                                    ? "Current day-equivalent with your assumptions & toggles"
                                    : "×365 of your adjusted daily total" }), _jsx(KPI, { label: "Funds lost to scams (\u201924)", value: fmtUSD(data.scamsUSD), sub: "Lower-bound" }), _jsx(KPI, { label: "Funds stolen in hacks (\u201924)", value: fmtUSD(data.hacksUSD), sub: "Exploits & breaches" })] }), _jsxs("div", { className: "mt-5 sm:mt-6 md:mt-8 flex flex-col lg:flex-row gap-4 sm:gap-6", children: [_jsxs("div", { className: "flex-1 rounded-xl p-3 sm:p-4 md:p-5", style: { border: `1px solid ${TOKENS.hair}` }, children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3", children: [_jsx(TabGroup, { active: activeView, onChange: setActiveView, items: [
                                                    { id: "daily", label: "Daily avg" },
                                                    { id: "annual", label: "Annualized" },
                                                ] }), _jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx("button", { className: "px-3 py-1.5 text-[11px] sm:text-xs rounded-md whitespace-nowrap flex-1 sm:flex-none", onClick: () => setAuto((v) => !v), style: {
                                                            border: `1px solid ${TOKENS.hair}`,
                                                            color: auto ? TOKENS.text : TOKENS.sub,
                                                            background: auto
                                                                ? "rgba(255,255,255,0.08)"
                                                                : "transparent",
                                                        }, children: auto ? "⏸ Pause cycle" : "▶ Auto cycle" }), _jsx("button", { className: "px-3 py-1.5 text-[11px] sm:text-xs rounded-md whitespace-nowrap flex-1 sm:flex-none", onClick: () => downloadCSV(visible, activeView), style: {
                                                            border: `1px solid ${TOKENS.hair}`,
                                                            color: TOKENS.sub,
                                                        }, children: "\u2B07 Export CSV" })] })] }), _jsx("div", { className: "mt-3 flex flex-wrap gap-1.5 sm:gap-2", children: nets.map((n) => (_jsx(ToggleChip, { label: n.label, active: !!enabled[n.key], onClick: () => setEnabled((prev) => ({ ...prev, [n.key]: !prev[n.key] })), onMouseEnter: () => setHighlight(n.key), onMouseLeave: () => setHighlight((h) => (auto ? h : null)) }, n.key))) }), _jsxs("div", { className: "mt-4", children: [_jsxs("div", { className: "flex items-center justify-between text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: [_jsx("span", { children: "Assumption (what-if)" }), _jsxs("span", { className: "tabular-nums", children: [assumptionPct, "%"] })] }), _jsx("input", { type: "range", min: -25, max: 25, step: 1, value: assumptionPct, onChange: (e) => setAssumptionPct(parseInt(e.target.value)), className: "w-full" }), _jsxs("div", { className: "mt-1 flex justify-between text-[10px] sm:text-[11px]", style: { color: TOKENS.mute }, children: [_jsx("span", { children: "\u221225%" }), _jsx("span", { children: "0%" }), _jsx("span", { children: "+25%" })] })] })] }), _jsxs("div", { className: "flex-1 rounded-xl", style: { border: `1px solid ${TOKENS.stroke}` }, children: [_jsx("div", { className: "px-3 sm:px-4 py-2 sm:py-3", style: { borderBottom: `1px solid ${TOKENS.hair}` }, children: _jsx("div", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: activeView === "daily"
                                                ? "Daily Transactions (avg, adjusted)"
                                                : "Annualized Transactions (adjusted)" }) }), _jsxs("div", { className: "px-2 sm:px-3 py-2", children: [_jsx(HollowBarsInteractive, { networks: visible, highlightKey: highlight, setHighlight: setHighlight, maxDaily: maxDaily, view: activeView, auto: auto }), _jsx("div", { className: "mt-1.5 text-[10px] sm:text-[11px]", style: { color: TOKENS.mute }, children: "Bars are hollow (no fills). Hover or tap a bar to see exact values. Toggle networks above to compare contributions." })] })] })] }), _jsxs("div", { className: "ga-bottom mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6", children: [_jsx(LossCard, { hacksUSD: data.hacksUSD, scamsUSD: data.scamsUSD }), _jsx(WhyPlanCard, {})] })] }), _jsx("style", { children: `
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
      ` })] }));
}
/* ============================== atoms ============================== */
function KPI({ label, value, sub, }) {
    return (_jsxs("div", { className: "kpi-card rounded-xl px-3 py-3 sm:px-4 sm:py-4", style: { border: `1px solid ${TOKENS.hair}` }, children: [_jsx("div", { className: "text-[10px] sm:text-[11px] uppercase", style: { color: TOKENS.sub }, children: label }), _jsx("div", { className: "text-lg sm:text-2xl md:text-3xl font-semibold tabular-nums mt-0.5 sm:mt-1", children: value }), sub ? (_jsx("div", { className: "mt-1 text-[10px] sm:text-xs md:text-[13px]", style: { color: TOKENS.mute }, children: sub })) : null] }));
}
function TabGroup({ active, onChange, items, }) {
    return (_jsx("div", { className: "inline-flex rounded-md p-0.5 w-full sm:w-auto", style: { background: "#0E0E0E", border: `1px solid ${TOKENS.hair}` }, children: items.map((it) => {
            const selected = active === it.id;
            return (_jsx("button", { onClick: () => onChange(it.id), className: "flex-1 sm:flex-none px-3 py-1.5 text-[11px] sm:text-xs rounded-[8px] transition-colors whitespace-nowrap", style: {
                    color: selected ? TOKENS.text : TOKENS.sub,
                    background: selected ? "rgba(255,255,255,0.08)" : "transparent",
                    border: `1px solid ${selected ? TOKENS.hair : "transparent"}`,
                }, children: it.label }, it.id));
        }) }));
}
function ToggleChip({ label, active, onClick, onMouseEnter, onMouseLeave, }) {
    return (_jsx("button", { onClick: onClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onTouchStart: onMouseEnter, onTouchEnd: onMouseLeave, className: "px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs rounded-md", style: {
            border: `1px solid ${TOKENS.hair}`,
            color: active ? TOKENS.text : TOKENS.sub,
            background: active ? "rgba(255,255,255,0.08)" : "transparent",
        }, children: label }));
}
/* ====================== interactive hollow bars ====================== */
function HollowBarsInteractive({ networks, highlightKey, setHighlight, maxDaily, view, auto, }) {
    const W = 680;
    const H = 220;
    const padX = 36;
    const padY = 28;
    const innerW = W - padX * 2;
    const innerH = H - padY * 2;
    const gap = 18;
    const barW = (innerW - gap * (networks.length - 1)) / Math.max(1, networks.length);
    const scaleY = (daily) => (daily / Math.max(1, maxDaily)) * (innerH - 22);
    const [tooltip, setTooltip] = useState(null);
    const svgRef = useRef(null);
    const showTooltip = (clientX, clientY, n) => {
        const rect = svgRef.current?.getBoundingClientRect();
        if (!rect)
            return;
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
    const handleEnter = (e, n) => {
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
            if (!auto)
                setTooltip(null);
            return;
        }
        const i = networks.findIndex((n) => n.key === highlightKey);
        if (i < 0)
            return;
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
    return (_jsx("div", { children: _jsxs("svg", { ref: svgRef, viewBox: `0 0 ${W} ${H}`, className: "w-full h-[190px] sm:h-[210px] md:h-[220px] block", onMouseLeave: handleLeave, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "ga-grid-line", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "rgba(148,163,184,0.28)" }), _jsx("stop", { offset: "100%", stopColor: "rgba(148,163,184,0.08)" })] }), _jsxs("linearGradient", { id: "ga-bar-fill", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#1D4ED8" }), _jsx("stop", { offset: "55%", stopColor: "#0070F3" }), _jsx("stop", { offset: "100%", stopColor: "#0B1120" })] }), _jsxs("linearGradient", { id: "ga-bar-fill-active", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#38BDF8" }), _jsx("stop", { offset: "45%", stopColor: "#0070F3" }), _jsx("stop", { offset: "100%", stopColor: "#020617" })] }), _jsx("filter", { id: "ga-bar-shadow", x: "-20%", y: "-20%", width: "140%", height: "140%", children: _jsx("feDropShadow", { dx: "0", dy: "10", stdDeviation: "12", floodColor: "rgba(0,112,243,0.5)" }) })] }), Array.from({ length: 3 }).map((_, i) => {
                    const y = padY + ((innerH - 10) / 4) * (i + 1);
                    return (_jsx("line", { x1: padX, y1: y, x2: W - padX, y2: y, stroke: "url(#ga-grid-line)", strokeWidth: 1 }, i));
                }), _jsx("line", { x1: padX, y1: H - padY, x2: W - padX, y2: H - padY, stroke: "rgba(148,163,184,0.55)", strokeWidth: 1 }), networks.map((n, i) => {
                    const h = scaleY(n.dailyAdj);
                    const x = padX + i * (barW + gap);
                    const y = H - padY - h;
                    const active = highlightKey === n.key;
                    return (_jsxs("g", { children: [_jsx("rect", { x: x, y: y, width: barW, height: h, rx: 9, fill: active ? "url(#ga-bar-fill-active)" : "url(#ga-bar-fill)", stroke: active ? TOKENS.primary : "rgba(148,163,184,0.5)", strokeWidth: active ? 1.6 : 1, filter: active ? "url(#ga-bar-shadow)" : "none", style: {
                                    transition: "stroke-width 180ms ease, stroke 180ms ease, filter 220ms ease, transform 160ms ease",
                                }, onMouseEnter: (e) => handleEnter(e, n), onTouchStart: (e) => {
                                    e.preventDefault();
                                    const touch = e.touches[0];
                                    showTooltip(touch.clientX, touch.clientY, n);
                                    setHighlight(n.key);
                                } }), _jsx("rect", { x: x, y: y, width: barW, height: h, rx: 9, fill: "transparent", tabIndex: 0, onFocus: (e) => handleEnter(e, n), onBlur: handleLeave, onTouchEnd: handleLeave, "aria-label": `${n.label} — Daily ${fmtNum(n.dailyAdj)}, Annual ${fmtNum(n.annualAdj)}` }), _jsx("text", { x: x + barW / 2, y: H - padY + 15, textAnchor: "middle", fontSize: "10", fill: "rgba(226,232,240,0.9)", children: n.label.split(" ")[0] }), _jsx("text", { x: x + barW / 2, y: H - padY + 28, textAnchor: "middle", fontSize: "9", fill: "rgba(148,163,184,0.9)", className: "tabular-nums", children: view === "daily"
                                    ? fmtNum(n.dailyAdj)
                                    : fmtNum(n.annualAdj) })] }, n.key));
                }), tooltip && (_jsxs("g", { transform: `translate(${tooltip.x}, ${tooltip.y})`, children: [_jsx("rect", { x: -110, y: -50, width: 220, height: 48, rx: 8, fill: "rgba(2,6,23,0.98)", stroke: "rgba(148,163,184,0.5)" }), tooltip.lines.map((ln, idx) => (_jsx("text", { x: -100, y: -32 + idx * 15, fontSize: idx === 0 ? 11 : 10, fill: idx === 0
                                ? "#E5E7EB"
                                : "rgba(156,163,175,0.95)", children: ln }, idx)))] }))] }) }));
}
/* ====================== extra cards ====================== */
function LossCard({ hacksUSD, scamsUSD, }) {
    return (_jsxs("div", { className: "rounded-2xl ga-card", style: { border: `1px solid ${TOKENS.stroke}` }, children: [_jsx("div", { className: "px-3 sm:px-4 py-2 sm:py-3", style: { borderBottom: `1px solid ${TOKENS.hair}` }, children: _jsx("div", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: "Losses & Risk (2024)" }) }), _jsxs("div", { className: "px-3 sm:px-4 md:px-5 py-4 sm:py-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6", children: [_jsx(MiniKPI, { title: "Scams/Fraud (lower-bound)", value: fmtUSD(scamsUSD), note: "Chainalysis" }), _jsx(MiniKPI, { title: "Hacks/Exploits", value: fmtUSD(hacksUSD), note: "Chainalysis / TRM Labs" }), _jsx(Pill, { children: "Romance/grooming scams elevated" }), _jsx(Pill, { children: "Infra & key compromises dominated hack losses" })] })] }));
}
function WhyPlanCard() {
    return (_jsxs("div", { className: "rounded-2xl ga-card", style: { border: `1px solid ${TOKENS.stroke}` }, children: [_jsx("div", { className: "px-3 sm:px-4 py-2 sm:py-3", style: { borderBottom: `1px solid ${TOKENS.hair}` }, children: _jsx("div", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: "Why \u201Cplanning gas\u201D fails" }) }), _jsxs("div", { className: "px-3 sm:px-4 md:px-5 py-4 sm:py-5 text-[12px] sm:text-[13px] leading-relaxed", style: { color: TOKENS.sub }, children: [_jsxs("ul", { className: "list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2", children: [_jsx("li", { children: "Congestion is spiky; quotes drift between click and inclusion." }), _jsx("li", { children: "Wallets juggle native gas tokens per chain \u2192 failed/completed ratios worsen." }), _jsx("li", { children: "Manual timing (\u201Cwait till night\u201D) saves pennies but burns opportunities." })] }), _jsxs("div", { className: "mt-3 sm:mt-4 rounded-lg px-3 py-3", style: { border: `1px solid ${TOKENS.hair}` }, children: [_jsx("div", { className: "font-medium text-[12px] sm:text-[13px]", style: { color: TOKENS.text }, children: "DNDX counter-proposal" }), _jsxs("div", { className: "mt-1.5 text-[12px]", children: [_jsx("b", { children: "Predictable band (\u00B15%)" }), ", ", _jsx("b", { children: "UNDO (180s)" }), ",", " ", _jsx("b", { children: "/SLA credits" }), ", and ", _jsx("b", { children: "Escrow/Refund" }), " at the protocol layer. No timing games. No juggling gas tokens."] })] })] })] }));
}
function MiniKPI({ title, value, note, }) {
    return (_jsxs("div", { className: "rounded-lg px-3 py-2.5 sm:px-4 sm:py-3", style: { border: `1px solid ${TOKENS.hair}` }, children: [_jsx("div", { className: "text-[11px]", style: { color: TOKENS.sub }, children: title }), _jsx("div", { className: "text-lg sm:text-xl font-semibold mt-0.5", children: value }), note ? (_jsx("div", { className: "text-[10px] sm:text-[11px] mt-1", style: { color: TOKENS.mute }, children: note })) : null] }));
}
function Pill({ children }) {
    return (_jsx("div", { className: "text-[11px] sm:text-xs rounded-md px-3 py-2", style: { border: `1px solid ${TOKENS.hair}`, color: TOKENS.sub }, children: children }));
}
/* ====================== helpers ====================== */
function downloadCSV(networks, view) {
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
