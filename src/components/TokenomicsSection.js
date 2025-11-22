import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/TokenomicsSection.tsx
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
const TOKEN_SUPPLY = 7600000000;
const ALLOCATIONS = [
    {
        id: "sale-strategic",
        label: "Sale & Strategic",
        percent: 24,
        tokens: TOKEN_SUPPLY * 0.24,
        role: "Vested sale rounds and strategic partners that help Dendrites reach real users and merchants.",
        vesting: "All allocations vest; this bucket alone never creates a massive TGE unlock. Overall float stays around ~6–9%.",
    },
    {
        id: "founder",
        label: "Founder Allocation",
        percent: 20,
        tokens: TOKEN_SUPPLY * 0.2,
        role: "Long-term skin-in-the-game for founding contributors.",
        vesting: "12-month cliff, then 36-month linear vest. 0% unlocked at TGE.",
    },
    {
        id: "team-esop",
        label: "Team & ESOP",
        percent: 8,
        tokens: TOKEN_SUPPLY * 0.08,
        role: "Current and future team, including ESOP-style grants.",
        vesting: "9-month cliff, then 36-month linear vest. Built to retain builders.",
    },
    {
        id: "community",
        label: "Community Rewards",
        percent: 12,
        tokens: TOKEN_SUPPLY * 0.12,
        role: "Usage-based rewards, quests, and contributor programs tied to real protocol activity.",
        vesting: "Rewards are earned and then vest. No fully liquid 'everyone gets a free airdrop at TGE'.",
    },
    {
        id: "ecosystem",
        label: "Ecosystem & Partnerships",
        percent: 12,
        tokens: TOKEN_SUPPLY * 0.12,
        role: "Integrations, partners, and ecosystem growth (wallets, infra, merchants, L2s).",
        vesting: "Mostly 3–36-month vesting, often milestone-based for larger integrations.",
    },
    {
        id: "liquidity",
        label: "Liquidity",
        percent: 8,
        tokens: TOKEN_SUPPLY * 0.08,
        role: "DEX / CEX liquidity and market-maker programs so users can actually move in and out of DNDX.",
        vesting: "LP tokens locked 6–12 months; MM programs unlock against clear performance goals.",
    },
    {
        id: "treasury",
        label: "Treasury & Safety Reserves",
        percent: 16,
        tokens: TOKEN_SUPPLY * 0.16,
        role: "Runway, /SLA credit pool, audits, operations, and true emergencies.",
        vesting: "Governance-controlled. Slow, transparent unlocks with multi-sig protections.",
    },
];
const COLORS = [
    "#ffffff",
    "#e5e5e5",
    "#d4d4d4",
    "#a3a3a3",
    "#737373",
    "#525252",
    "#262626",
];
const formatNumber = (value) => value.toLocaleString("en-US", { maximumFractionDigits: 0 });
const TokenomicsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeSlice = ALLOCATIONS[activeIndex];
    return (_jsx("section", { id: "tokenomics", className: "scroll-mt-24 lg:scroll-mt-28 border-t border-neutral-900 bg-black text-neutral-100", children: _jsxs("div", { className: "mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16", children: [_jsxs("div", { className: "flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-end lg:justify-between", children: [_jsxs("div", { className: "max-w-3xl space-y-4", children: [_jsxs("div", { className: "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neutral-500", children: [_jsx("span", { className: "h-px w-8 bg-neutral-700" }), "DNDX \u00B7 Tokenomics"] }), _jsxs("h2", { className: "text-2xl font-light tracking-tight sm:text-3xl lg:text-[2.4rem]", children: ["A fixed 7.6B supply,", _jsx("span", { className: "block text-neutral-300", children: "aligned with real on-chain usage." })] }), _jsx("p", { className: "text-[13px] leading-relaxed text-neutral-400 md:text-sm", children: "DNDX is the economic backbone of Dendrites: Predictable Gas\u2122, /SLA credits, SafetySend (UNDO), APP Escrow, and future governance. Supply is capped, inflation is 0%, and the early float is kept deliberately thin (~6\u20139% at TGE) so the protocol can grow without turning into a farm-and-dump." }), _jsxs("p", { className: "text-[11px] leading-relaxed text-neutral-500", children: ["This Tokenomics overview is", " ", _jsx("span", { className: "font-medium", children: "Version 1.0" }), " and may evolve before Presale 1. When in doubt, trust the latest PDFs published in ", _jsx("span", { className: "font-medium text-neutral-300", children: "/docs" }), "."] })] }), _jsxs("div", { className: "flex flex-wrap items-start gap-3 text-[11px] text-neutral-400 lg:flex-col lg:items-end", children: [_jsx("div", { className: "rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1 uppercase tracking-[0.22em]", children: "7,600,000,000 DNDX \u00B7 0% inflation" }), _jsxs("div", { className: "flex gap-6", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx("div", { className: "text-neutral-500", children: "TGE float" }), _jsx("div", { className: "font-mono text-neutral-100", children: "~6\u20139%" })] }), _jsxs("div", { className: "space-y-0.5", children: [_jsx("div", { className: "text-neutral-500", children: "Status" }), _jsx("div", { className: "font-mono text-neutral-100", children: "Pre-presale" })] })] })] })] }), _jsxs("div", { className: "mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start", children: [_jsxs("div", { className: "order-1 space-y-5 lg:order-none", children: [_jsxs("div", { className: "flex items-center justify-between text-[11px] text-neutral-500", children: [_jsx("span", { children: "Supply allocation" }), _jsxs("span", { className: "hidden items-center gap-2 sm:flex", children: [_jsx("span", { className: "h-px w-10 bg-neutral-700" }), "100% = 7.6B DNDX"] })] }), _jsx("div", { className: "relative aspect-square w-full sm:aspect-[4/3]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsx(PieChart, { children: _jsx(Pie, { data: ALLOCATIONS, dataKey: "percent", nameKey: "label", innerRadius: "55%", outerRadius: "92%", paddingAngle: 2, stroke: "#020617", strokeWidth: 1, isAnimationActive: false, onMouseEnter: (_, index) => setActiveIndex(index), children: ALLOCATIONS.map((_, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length], fillOpacity: index === activeIndex ? 1 : 0.35 }, index))) }) }) }) }), _jsxs("div", { className: "rounded-2xl border border-neutral-900 bg-neutral-950/80 px-4 py-4 text-xs sm:px-5 sm:text-[13px]", children: [_jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.22em] text-neutral-500", children: "Focus" }), _jsx("div", { className: "mt-1 text-sm font-medium text-neutral-100", children: activeSlice.label })] }), _jsxs("div", { className: "flex gap-5 text-[11px] sm:text-xs", children: [_jsxs("div", { children: [_jsx("div", { className: "text-neutral-500", children: "Share" }), _jsxs("div", { className: "font-mono text-neutral-100", children: [activeSlice.percent, "%"] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-neutral-500", children: "Tokens" }), _jsx("div", { className: "font-mono text-neutral-100", children: formatNumber(activeSlice.tokens) })] })] })] }), _jsxs("div", { className: "mt-3 grid gap-3 text-[11px] text-neutral-400 sm:grid-cols-2", children: [_jsxs("div", { children: [_jsx("div", { className: "text-neutral-500", children: "Role" }), _jsx("p", { className: "mt-1 leading-relaxed", children: activeSlice.role })] }), _jsxs("div", { children: [_jsx("div", { className: "text-neutral-500", children: "Vesting" }), _jsx("p", { className: "mt-1 leading-relaxed", children: activeSlice.vesting })] })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.22em] text-neutral-500", children: "Breakdown" }), _jsx("div", { className: "overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950/60", children: ALLOCATIONS.map((slice, index) => {
                                        const isActive = index === activeIndex;
                                        return (_jsxs("button", { type: "button", onMouseEnter: () => setActiveIndex(index), onFocus: () => setActiveIndex(index), className: `flex w-full items-start gap-4 px-3 py-3 text-left text-[11px] transition-colors sm:px-5 sm:py-4 ${isActive
                                                ? "bg-white/[0.03]"
                                                : "hover:bg-white/[0.02] focus-visible:bg-white/[0.03]"}`, children: [_jsxs("div", { className: "flex flex-col items-center pt-1 text-[11px] text-neutral-500", children: [_jsx("span", { className: "mb-2 h-2 w-2 rounded-full", style: { backgroundColor: COLORS[index] } }), _jsxs("span", { className: "font-mono text-[11px] text-neutral-300", children: [slice.percent, "%"] })] }), _jsxs("div", { className: "flex flex-1 flex-col gap-1", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("div", { className: "text-xs font-medium text-neutral-100", children: slice.label }), _jsxs("div", { className: "text-[10px] font-mono text-neutral-500 sm:text-[11px]", children: [formatNumber(slice.tokens), " ", _jsx("span", { className: "text-[9px]", children: "DNDX" })] })] }), _jsx("p", { className: "text-[11px] leading-relaxed text-neutral-500", children: slice.role })] })] }, slice.id));
                                    }) }), _jsxs("div", { className: "space-y-3 text-[11px] text-neutral-400 sm:text-[12px]", children: [_jsx("div", { className: "text-[11px] uppercase tracking-[0.22em] text-neutral-500", children: "Economic design principles" }), _jsxs("ul", { className: "space-y-1.5", children: [_jsxs("li", { children: [_jsx("span", { className: "font-semibold text-neutral-200", children: "Long-term alignment:" }), " ", "founders and team are locked with 9\u201312 month cliffs and 3-year vests."] }), _jsxs("li", { children: [_jsx("span", { className: "font-semibold text-neutral-200", children: "Controlled liquidity:" }), " ", "early float is tightly capped; there\u2019s no massive day-one unlock."] }), _jsxs("li", { children: [_jsx("span", { className: "font-semibold text-neutral-200", children: "Usage-based rewards:" }), " ", "community rewards are tied to on-chain behavior, not random airdrops."] }), _jsxs("li", { children: [_jsx("span", { className: "font-semibold text-neutral-200", children: "Sustainable treasury:" }), " ", "reserves unlock slowly via governance, funding /SLA credits, audits, and protocol runway."] })] })] })] })] }), _jsxs("div", { className: "mt-10 grid gap-8 border-t border-neutral-900 pt-8 lg:mt-12 lg:grid-cols-2", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "text-sm font-medium text-neutral-100", children: "Where DNDX shows up in the product" }), _jsx("p", { className: "text-[13px] leading-relaxed text-neutral-400", children: "The token isn\u2019t just \u201Cthere\u201D. It powers the fee and trust layer:" }), _jsxs("ul", { className: "space-y-1.5 text-[13px] text-neutral-400", children: [_jsxs("li", { children: [_jsx("span", { className: "font-medium text-neutral-100", children: "Predictable Gas\u2122" }), " ", "\u2013 fee offsets and stability when real gas costs spike."] }), _jsxs("li", { children: [_jsx("span", { className: "font-medium text-neutral-100", children: "/SLA Credits" }), " ", "\u2013 automatic credits when realized cost breaches a published band."] }), _jsxs("li", { children: [_jsx("span", { className: "font-medium text-neutral-100", children: "SafetySend (UNDO)" }), " ", "\u2013 reversible sends during a short cancel window."] }), _jsxs("li", { children: [_jsx("span", { className: "font-medium text-neutral-100", children: "APP Escrow" }), " ", "\u2013 milestone-based holds and refunds written into the protocol."] })] })] }), _jsxs("div", { className: "space-y-3 text-[13px] text-neutral-400", children: [_jsx("h3", { className: "text-sm font-medium text-neutral-100", children: "Governance and ecosystem" }), _jsx("p", { className: "leading-relaxed", children: "Over time, DNDX holders are expected to shape parameters, treasury programs, and ecosystem expansion. The model is built so that governance is a responsibility, not a meme." }), _jsx("p", { className: "leading-relaxed", children: "None of this is an offer or a promise of returns. It\u2019s a transparent map of how value, safety, and incentives are wired into the protocol." })] })] }), _jsxs("div", { className: "mt-8 flex flex-col gap-4 border-t border-neutral-900 pt-6 text-[11px] text-neutral-500 sm:flex-row sm:items-center sm:justify-between", children: [_jsx("p", { children: "For exact vesting schedules and math, read the Tokenomics Overview PDF. For protocol internals, open the Whitepaper." }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs("a", { href: "/docs/dndx-tokenomics-v1.pdf", download: "dndx-tokenomics-v1.pdf", className: "inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-100 shadow-sm shadow-black/40 transition hover:border-neutral-200 hover:bg-neutral-900", children: [_jsx("span", { className: "h-[1px] w-4 bg-neutral-300" }), "Download tokenomics"] }), _jsxs("a", { href: "/docs/dndx-whitepaper-v1.pdf", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-neutral-400 transition hover:text-neutral-100", children: ["Read whitepaper", _jsx("span", { className: "text-[13px]", children: "\u2197" })] })] })] })] }) }));
};
export default TokenomicsSection;
