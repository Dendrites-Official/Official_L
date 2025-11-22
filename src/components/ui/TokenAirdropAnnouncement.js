"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
/* --------------------- theme tokens (mono + vercel blue) --------------------- */
const TOKENS = {
    card: "#0B0B0B",
    hair: "rgba(255,255,255,0.10)",
    stroke: "rgba(255,255,255,0.18)",
    text: "#FAFAFA",
    sub: "rgba(255,255,255,0.70)",
    mute: "rgba(255,255,255,0.50)",
    blue: "#0070F3",
};
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);
/** tiny integer ticker UI */
function Ticker({ value }) {
    const str = useMemo(() => value.toLocaleString(), [value]);
    return _jsx("span", { className: "tabular-nums tracking-tight", style: { color: TOKENS.text }, children: str });
}
/* ------------------------------- main component ------------------------------ */
export default function TokenAirdropAnnouncement({ totalGiveaway = 100000000, presaleHref = "https://waitlist.dendrites.ai/", docsHref = "/sla", headline = "100,000,000 Free Transactions are up for grabs", subline = "Pre-sale incentive • usage-first • anti-sybil", }) {
    /* spotlight + tilt */
    const cardRef = useRef(null);
    const [spot, setSpot] = useState({ x: 50, y: 50 });
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
    useEffect(() => {
        const el = cardRef.current;
        if (!el)
            return;
        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            const x = clamp(((e.clientX - r.left) / r.width) * 100, 0, 100);
            const y = clamp(((e.clientY - r.top) / r.height) * 100, 0, 100);
            setSpot({ x, y });
            const cx = (x - 50) / 50, cy = (y - 50) / 50;
            setTilt({ rx: cy * 4, ry: -cx * 6 });
        };
        const onLeave = () => setTilt({ rx: 0, ry: 0 });
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
    }, []);
    /* animated ticker up to totalGiveaway */
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const duration = 900;
        const start = performance.now();
        const step = (t) => {
            const p = clamp((t - start) / duration, 0, 1);
            setTick(Math.round(totalGiveaway * easeOutCubic(p)));
            if (p < 1)
                requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [totalGiveaway]);
    /* details sheet */
    const [open, setOpen] = useState(false);
    return (_jsx("section", { style: { color: TOKENS.text }, children: _jsxs("div", { className: "mx-auto max-w-[1240px] px-5 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20", children: [_jsx("div", { className: "text-[30px] tracking-[0.22em] uppercase mb-3", style: { color: TOKENS.sub }, children: "Announcement" }), _jsxs("div", { ref: cardRef, className: "relative rounded-3xl overflow-hidden border", style: {
                        borderColor: TOKENS.stroke,
                        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                        transition: "transform 160ms ease",
                        background: TOKENS.card,
                    }, children: [_jsx("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0", style: {
                                background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(0,112,243,0.22), transparent 55%)`,
                                mixBlendMode: "screen",
                            } }), _jsx("div", { "aria-hidden": true, className: "absolute inset-0 opacity-[0.08]", style: {
                                backgroundImage: "linear-gradient(transparent 95%, rgba(255,255,255,0.35) 96%), linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.35) 96%)",
                                backgroundSize: "22px 22px",
                            } }), _jsx("div", { className: "relative p-5 sm:p-7 md:p-10", children: _jsxs("div", { className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6", children: [_jsxs("div", { className: "max-w-2xl", children: [_jsx("h3", { className: "text-[28px] sm:text-4xl md:text-5xl font-extrabold leading-tight", children: headline }), _jsx("p", { className: "mt-2 text-sm sm:text-base", style: { color: TOKENS.sub }, children: subline }), _jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-3", children: [_jsxs(Badge, { children: ["Total Giveaway: ", _jsx("strong", { className: "ml-1", children: _jsx(Ticker, { value: tick }) }), " Transactions Free"] }), _jsx(Badge, { tone: "info", children: "First pre-sale \u2014 details inside" })] })] }), _jsxs("div", { className: "w-full max-w-sm lg:text-right", children: [_jsxs("div", { className: "flex flex-col sm:flex-row lg:flex-col gap-2 sm:items-center lg:items-end", children: [_jsxs("a", { href: presaleHref, className: "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold", style: { background: TOKENS.blue, color: "#fff", border: `1px solid ${TOKENS.blue}` }, children: ["Join Pre-Sale Waitlist", _jsx("svg", { className: "ml-2 h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": true, children: _jsx("path", { d: "M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414L13 13.414a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-2-2a1 1 0 010-1.414z" }) })] }), _jsx("button", { onClick: () => setOpen(true), className: "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium", style: { background: "transparent", color: TOKENS.sub, border: `1px solid ${TOKENS.hair}` }, children: "View Details" })] }), _jsxs("ul", { className: "mt-3 text-xs space-y-1.5", style: { color: TOKENS.mute }, children: [_jsx("li", { children: "\u2022 Usage-first distribution" }), _jsx("li", { children: "\u2022 Anti-sybil & fair-claim rules" }), _jsx("li", { children: "\u2022 Credits via public /SLA" })] })] })] }) }), _jsx("div", { className: "relative border-t", style: { borderColor: TOKENS.hair }, children: _jsx(Marquee, {}) })] }), open && (_jsxs("div", { className: "fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4", children: [_jsx("div", { className: "absolute inset-0 bg-black/60", onClick: () => setOpen(false) }), _jsxs("div", { className: "relative w-full max-w-2xl rounded-2xl border shadow-2xl", style: { borderColor: TOKENS.stroke, background: TOKENS.card }, children: [_jsxs("div", { className: "px-5 py-4 flex items-center justify-between border-b", style: { borderColor: TOKENS.hair }, children: [_jsx("div", { className: "text-sm font-medium", children: "Giveaway Details" }), _jsx("button", { onClick: () => setOpen(false), className: "text-sm", style: { color: TOKENS.sub }, children: "Close" })] }), _jsxs("div", { className: "px-5 py-4 text-sm", style: { color: TOKENS.sub }, children: [_jsxs("p", { children: ["We\u2019re allocating ", _jsxs("strong", { style: { color: TOKENS.text }, children: [totalGiveaway.toLocaleString(), " Transactions Free"] }), " for early supporters at our first pre-sale. Claims will be usage-weighted with strict anti-sybil checks. Read our", _jsx("a", { className: "underline ml-1", style: { color: TOKENS.text }, href: docsHref, children: "/SLA" }), " for credits & guardrails."] }), _jsxs("ul", { className: "mt-3 space-y-1.5", children: [_jsx("li", { children: "\u2022 Flat, predictable user fees; 3-minute UNDO window." }), _jsx("li", { children: "\u2022 Escrow & refunds with milestone controls." }), _jsx("li", { children: "\u2022 Precise strokes, no glow soup \u2014 premium finish." })] })] }), _jsx("div", { className: "px-5 pb-5", children: _jsx("a", { href: presaleHref, className: "inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-semibold", style: { background: TOKENS.blue, color: "#fff", border: `1px solid ${TOKENS.blue}` }, children: "Get Whitelisted" }) })] })] }))] }) }));
}
/* ------------------------------- micro parts ------------------------------- */
function Badge({ children, tone = "default" }) {
    const border = tone === "info" ? "rgba(0,112,243,0.35)" : TOKENS.hair;
    const bg = tone === "info" ? "rgba(0,112,243,0.10)" : "transparent";
    const color = tone === "info" ? TOKENS.text : TOKENS.sub;
    return (_jsx("span", { className: "inline-flex items-center rounded-[10px] px-2.5 py-1 text-[12px]", style: { border: `1px solid ${border}`, background: bg, color }, children: children }));
}
function Marquee() {
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        let raf;
        const loop = () => { setOffset((x) => (x + 0.5) % 400); raf = requestAnimationFrame(loop); };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, []);
    const items = [
        "10,00,000 Transactions free for early supporters",
        "Usage-first • Anti-sybil",
        "Flat fees • UNDO window",
        "Escrow & /SLA credits",
        "Premium, precise build",
    ];
    return (_jsx("div", { className: "relative overflow-hidden py-2", style: { background: "#0c0c0c" }, children: _jsx("div", { className: "whitespace-nowrap will-change-transform", style: { transform: `translateX(-${offset}px)` }, "aria-hidden": true, children: Array.from({ length: 3 }).map((_, k) => (_jsx("span", { className: "inline-flex items-center text-xs sm:text-sm", style: { color: TOKENS.mute }, children: items.map((t, i) => (_jsxs("span", { className: "inline-flex items-center px-4", children: [t, _jsx("i", { className: "mx-4 h-3 w-px", style: { background: TOKENS.hair } })] }, `${k}-${i}`))) }, k))) }) }));
}
