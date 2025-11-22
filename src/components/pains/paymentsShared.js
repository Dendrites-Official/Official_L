"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
/* ----------------------------- theme tokens ----------------------------- */
export const TOKENS = {
    hair: "rgba(255,255,255,0.10)",
    stroke: "rgba(255,255,255,0.16)",
    text: "#FAFAFA",
    sub: "rgba(255,255,255,0.70)",
    mute: "rgba(255,255,255,0.50)",
    ok: "#10B981",
    warn: "#F59E0B",
    bad: "#EF4444",
    blue: "#0070F3",
};
/* ------------------------------- atoms ---------------------------------- */
export function Chip({ tone = "neutral", children, }) {
    const stroke = tone === "good" ? TOKENS.ok : tone === "bad" ? TOKENS.bad : tone === "warn" ? TOKENS.warn : TOKENS.hair;
    const color = tone === "good" ? TOKENS.ok : tone === "bad" ? TOKENS.bad : tone === "warn" ? TOKENS.warn : TOKENS.sub;
    return (_jsx("span", { className: "inline-flex items-center rounded-[8px] px-2.5 py-1 text-[12px]", style: { border: `1px solid ${stroke}`, color }, children: children }));
}
export function Row({ k, v }) {
    return (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { style: { color: TOKENS.sub }, children: k }), _jsx("span", { className: "tabular-nums", style: { color: TOKENS.text }, children: v })] }));
}
export function SectionCard({ title, right, children, }) {
    return (_jsxs("div", { className: "rounded-2xl", style: { border: `1px solid ${TOKENS.stroke}` }, children: [_jsxs("div", { className: "px-4 py-3 flex items-center justify-between", style: { borderBottom: `1px solid ${TOKENS.hair}` }, children: [_jsx("div", { className: "text-sm font-medium", style: { color: TOKENS.text }, children: title }), right] }), _jsx("div", { className: "px-4 py-4", children: children })] }));
}
export function Divider() {
    return _jsx("div", { className: "h-px w-full", style: { background: TOKENS.hair } });
}
/* ----------------------------- utils ------------------------------------ */
export const clamp = (n, a, b) => Math.max(a, Math.min(n, b));
export const fmtUSDC = (n) => n < 1 ? `$${n.toFixed(2)} USDC` : `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })} USDC`;
export const isAddr = (v) => /^0x[a-fA-F0-9]{40}$/.test(v.trim());
export const isENS = (v) => /\./.test(v.trim());
export const addrHint = "0x… or ENS (e.g., name.eth)";
export const short = (v) => {
    const s = v?.trim() || "";
    if (!s)
        return "";
    if (isENS(s))
        return s;
    if (isAddr(s))
        return `${s.slice(0, 6)}…${s.slice(-4)}`;
    return s;
};
export function buildPayCode(args) {
    const { flow, chain, to, token, amount, undo, extra } = args;
    const dndx = new URL("https://pay.dndx/"); // illustrative
    dndx.pathname = flow; // quick | escrow | ack
    dndx.searchParams.set("chain", chain.toLowerCase());
    dndx.searchParams.set("to", to);
    dndx.searchParams.set("token", token);
    dndx.searchParams.set("amount", String(amount));
    if (typeof undo !== "undefined")
        dndx.searchParams.set("undo", undo ? "1" : "0");
    Object.entries(extra || {}).forEach(([k, v]) => v != null && dndx.searchParams.set(k, String(v)));
    const dndxLink = dndx.toString();
    const eip681 = `ethereum:${encodeURIComponent(to)}@8453/transfer?token=${token}&amount=${amount}`;
    const assessment = assessPayCodeRisk({
        link: dndxLink,
        to,
        amount,
        chain,
        undo: Boolean(undo),
    });
    return { dndxLink, eip681, assessment };
}
export function assessPayCodeRisk({ link, to, amount, undo, chain, }) {
    let score = 100;
    const reasons = [];
    if (!to || (!isAddr(to) && !isENS(to))) {
        score -= 35;
        reasons.push("Destination not a valid address/ENS");
    }
    if (!undo && /quick|escrow/.test(link)) {
        score -= 8;
        reasons.push("UNDO disabled");
    }
    if (amount <= 0) {
        score -= 20;
        reasons.push("Non-positive amount");
    }
    if (amount > 50000) {
        score -= 15;
        reasons.push("High amount > 50k");
    }
    if (!/pay\.dndx/.test(link)) {
        score -= 5;
        reasons.push("Non-canonical domain (demo)");
    }
    if (chain !== "Base") {
        score -= 10;
        reasons.push("Out-of-scope chain for v0");
    }
    const verdict = score >= 80 ? "Verified" : score >= 60 ? "Review" : "Risky";
    return { score: Math.max(1, Math.min(100, score)), reasons, verdict };
}
/* ----------------------------- Mock QR ---------------------------------- */
/* Deterministic visual; swap with a real QR lib in prod. */
export function MockQR({ data, size = 128 }) {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            return;
        const N = 25;
        const cell = Math.floor(size / N);
        canvas.width = canvas.height = cell * N;
        let h = 2166136261;
        for (let i = 0; i < data.length; i++) {
            h ^= data.charCodeAt(i);
            h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
        }
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FAFAFA";
        for (let y = 0; y < N; y++) {
            for (let x = 0; x < N; x++) {
                h = (h ^ (h >>> 13)) * 0x5bd1e995;
                const bit = (h >>> 17) & 1;
                if (bit)
                    ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1);
            }
        }
    }, [data, size]);
    return (_jsx("canvas", { ref: ref, width: size, height: size, style: {
            width: size,
            height: size,
            borderRadius: 8,
            border: `1px solid ${TOKENS.hair}`,
            display: 'block'
        } }));
}
/* ------------------------------ Small UI -------------------------------- */
export function PayCodeBlock({ title = "PayCode (demo)", dndxLink, eip681, verdict, score, reasons, }) {
    const copy = (t) => navigator?.clipboard?.writeText(t).catch(() => { });
    const tone = verdict === "Verified" ? "good" : verdict === "Review" ? "warn" : "bad";
    return (_jsx(SectionCard, { title: title, children: _jsx("div", { className: "grid grid-cols-1 gap-6 items-start", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs mb-1", style: { color: TOKENS.sub }, children: "DNDX PayCode" }), _jsx("code", { className: "block overflow-x-auto rounded-md p-2 text-xs", style: { border: `1px solid ${TOKENS.hair}`, color: TOKENS.text }, children: dndxLink }), _jsx("div", { className: "mt-2 flex gap-2", children: _jsx("button", { onClick: () => copy(dndxLink), className: "px-3 py-1.5 rounded-md text-xs", style: { border: `1px solid ${TOKENS.hair}`, color: TOKENS.sub, background: "transparent", minHeight: 36 }, children: "Copy PayCode" }) })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xs mb-1", style: { color: TOKENS.sub }, children: "EIP-681 (demo)" }), _jsx("code", { className: "block overflow-x-auto rounded-md p-2 text-xs", style: { border: `1px solid ${TOKENS.hair}`, color: TOKENS.text }, children: eip681 }), _jsx("div", { className: "mt-2 flex gap-2", children: _jsx("button", { onClick: () => copy(eip681), className: "px-3 py-1.5 rounded-md text-xs", style: { border: `1px solid ${TOKENS.hair}`, color: TOKENS.sub, background: "transparent", minHeight: 36 }, children: "Copy EIP-681" }) })] }), _jsxs("div", { className: "pt-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-xs", style: { color: TOKENS.sub }, children: "PayGuard assessment" }), _jsxs(Chip, { tone: tone, children: [verdict, " \u2022 ", score, "/100"] })] }), reasons.length > 0 && (_jsx("ul", { className: "mt-2 list-disc pl-5 text-[12px]", style: { color: TOKENS.mute }, children: reasons.map((r, i) => (_jsx("li", { children: r }, i))) }))] })] }) }) }));
}
