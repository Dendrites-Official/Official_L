"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
/* ------------------------- theme tokens (mono) ------------------------- */
const TOKENS = {
    hair: "rgba(255,255,255,0.10)",
    stroke: "rgba(255,255,255,0.16)",
    text: "#FAFAFA",
    sub: "rgba(255,255,255,0.70)",
    mute: "rgba(255,255,255,0.50)",
    band: "rgba(255,255,255,0.10)",
    ok: "#10B981",
    warn: "#F59E0B",
    bad: "#EF4444",
    blue: "#0070F3", // Vercel blue accent
};
const clamp = (n, a, b) => Math.max(a, Math.min(n, b));
const fmtUSDC = (n) => n < 1
    ? `$${n.toFixed(2)} USDC`
    : `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })} USDC`;
/* tiny safety stripe */
function Stripe({ w = 72, h = 10 }) {
    return (_jsxs("svg", { width: w, height: h, viewBox: `0 0 ${w} ${h}`, "aria-hidden": true, className: "block", children: [_jsxs("pattern", { id: "diags", width: "8", height: "8", patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)", children: [_jsx("rect", { width: "8", height: "8", fill: "transparent" }), _jsx("rect", { x: "0", y: "0", width: "4", height: "8", fill: TOKENS.hair })] }), _jsx("rect", { x: "0", y: "0", width: w, height: h, fill: "url(#diags)" }), _jsx("rect", { x: "0.5", y: "0.5", width: w - 1, height: h - 1, rx: "2", ry: "2", fill: "none", stroke: TOKENS.hair })] }));
}
function Chip({ tone = "neutral", children, className = "", }) {
    const stroke = tone === "good" ? TOKENS.ok : tone === "bad" ? TOKENS.bad : tone === "warn" ? TOKENS.warn : TOKENS.hair;
    const color = tone === "good" ? TOKENS.ok : tone === "bad" ? TOKENS.bad : tone === "warn" ? TOKENS.warn : TOKENS.sub;
    return (_jsx("span", { className: `inline-flex items-center rounded-[8px] px-2.5 py-1 text-[11px] sm:text-[12px] ${className}`, style: { border: `1px solid ${stroke}`, color }, children: children }));
}
function Metric({ label, value, sub }) {
    return (_jsxs("div", { className: "rounded-xl px-3 py-3 sm:px-4 sm:py-3", style: { border: `1px solid ${TOKENS.hair}` }, children: [_jsx("div", { className: "text-[9px] sm:text-[10px] tracking-[0.16em] uppercase", style: { color: TOKENS.sub }, children: label }), _jsx("div", { className: "mt-1 text-xl sm:text-2xl md:text-3xl font-semibold tabular-nums", children: value }), sub && (_jsx("div", { className: "mt-1 text-[11px] sm:text-xs", style: { color: TOKENS.mute }, children: sub }))] }));
}
function TimerBar({ remaining, total }) {
    const pct = Math.max(0, Math.min(1, remaining / total));
    return (_jsx("div", { className: "w-full rounded-md h-1.5 sm:h-2", style: { background: "rgba(255,255,255,0.06)" }, children: _jsx("div", { className: "h-1.5 sm:h-2 rounded-md", style: {
                width: `${pct * 100}%`,
                background: TOKENS.blue,
                transition: "width 0.15s linear",
            } }) }));
}
/* --------------------------- main component --------------------------- */
export default function IrreversibleMono() {
    const TOTAL = 180; // 3 minutes UNDO window
    const [amount, setAmount] = useState(250);
    const [payee, setPayee] = useState("vitalik.eth");
    const [enabled, setEnabled] = useState(true);
    const [state, setState] = useState("INIT");
    const [remaining, setRemaining] = useState(TOTAL);
    const startedAtRef = useRef(null);
    const rafRef = useRef(null);
    const [baseGasFee, setBaseGasFee] = useState(0.12); // ~USDC
    useEffect(() => {
        const interval = setInterval(() => {
            const jitter = 0.02 * Math.sin(Date.now() / 9000) +
                0.015 * Math.sin(Date.now() / 4000 + 1.1) +
                0.005 * Math.sin(Date.now() / 1500 + 0.3);
            setBaseGasFee(clamp(0.12 + jitter, 0.08, 0.2));
        }, 800);
        return () => clearInterval(interval);
    }, []);
    const transactionPct = 0.002;
    const transactionMin = 0.05;
    const quote = useMemo(() => {
        const transactionFee = Math.max(transactionMin, amount * transactionPct);
        const gasFee = baseGasFee;
        const totalFees = transactionFee + gasFee;
        const userPays = amount + totalFees;
        const payeeGets = amount;
        return {
            transactionFee,
            gasFee,
            totalFees,
            userPays,
            payeeGets,
        };
    }, [amount, baseGasFee]);
    const [lastReceipt, setLastReceipt] = useState(null);
    const canCancel = state === "HOLD" && remaining > 0;
    const canRelease = state === "HOLD" && remaining <= 0;
    /* ----------------------------- flow actions ----------------------------- */
    const handlePay = () => {
        if (!enabled)
            return;
        setState("HOLD");
        startedAtRef.current = performance.now();
        setRemaining(TOTAL);
        const now = new Date();
        const id = `PAY-${now.getFullYear()}${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}-${Math.random()
            .toString(36)
            .slice(2, 8)
            .toUpperCase()}`;
        const r = {
            id,
            timestampISO: now.toISOString(),
            status: "Initiated",
            payee,
            amountUSDC: amount,
            undoEnabled: enabled,
            transactionFeeUSDC: Number(quote.transactionFee.toFixed(4)),
            gasFeeUSDC: Number(quote.gasFee.toFixed(4)),
            userPaysUSDC: Number(quote.userPays.toFixed(4)),
            payeeReceivesUSDC: Number(quote.payeeGets.toFixed(4)),
            note: "Illustration only — not actual charges. With DNDX, users pay in USDC; no native gas token is required.",
        };
        setLastReceipt(r);
    };
    const handleCancel = () => {
        if (!canCancel)
            return;
        setState("CANCELED");
        stopLoop();
        setLastReceipt((prev) => prev
            ? {
                ...prev,
                status: "Canceled",
                refundUSDC: prev.amountUSDC,
            }
            : prev);
    };
    const handleRelease = () => {
        if (!canRelease)
            return;
        setState("RELEASED");
        stopLoop();
        setLastReceipt((prev) => (prev ? { ...prev, status: "Released" } : prev));
    };
    /* ------------------------------ timer loop ------------------------------ */
    useEffect(() => {
        if (state !== "HOLD")
            return;
        const tick = () => {
            if (!startedAtRef.current)
                return;
            const elapsedSec = (performance.now() - startedAtRef.current) / 1000;
            const left = clamp(Math.ceil(TOTAL - elapsedSec), 0, TOTAL);
            setRemaining(left);
            if (left > 0)
                rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return stopLoop;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
    function stopLoop() {
        if (rafRef.current !== null)
            cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        startedAtRef.current = null;
    }
    const stateLabel = state === "INIT"
        ? "Ready"
        : state === "HOLD"
            ? remaining > 0
                ? "On Hold (UNDO window)"
                : "Window ended"
            : state === "CANCELED"
                ? "Canceled · Refunded"
                : "Released to payee";
    const stateTone = state === "INIT"
        ? "neutral"
        : state === "HOLD"
            ? remaining > 0
                ? "warn"
                : "neutral"
            : state === "CANCELED"
                ? "good"
                : "neutral";
    const mm = Math.floor(remaining / 60).toString().padStart(2, "0");
    const ss = Math.floor(remaining % 60).toString().padStart(2, "0");
    /* --------------------------- PDF downloader --------------------------- */
    function pdfEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    }
    function downloadReceiptPDF() {
        if (!lastReceipt)
            return;
        const title = "DNDX — UNDO Receipt";
        const lines = [
            `Receipt ID: ${lastReceipt.id}`,
            `Timestamp:  ${new Date(lastReceipt.timestampISO).toLocaleString()}`,
            `Status:     ${lastReceipt.status}`,
            "",
            `Payee:      ${lastReceipt.payee}`,
            `Amount:     ${lastReceipt.amountUSDC} USDC`,
            `UNDO:       ${lastReceipt.undoEnabled ? "Enabled" : "Disabled"}`,
            "",
            "Fees (USDC):",
            `  Transaction fee: ${lastReceipt.transactionFeeUSDC}`,
            `  Gas fee:         ${lastReceipt.gasFeeUSDC}`,
            "",
            "Totals (USDC):",
            `  User pays:       ${lastReceipt.userPaysUSDC}`,
            `  Payee receives:  ${lastReceipt.payeeReceivesUSDC}`,
        ];
        if (lastReceipt.refundUSDC !== undefined) {
            lines.push(`  Refund (amount only): ${lastReceipt.refundUSDC}`);
        }
        lines.push("", "Notes:", lastReceipt.note);
        const pageW = 612;
        const pageH = 792;
        const left = 72;
        const top = 740;
        let content = "BT\n";
        content += "/F1 18 Tf\n";
        content += `${left} ${top} Td (${pdfEscape(title)}) Tj\n`;
        content += "/F1 11 Tf\n";
        let y = top - 28;
        for (const ln of lines) {
            content += `1 0 0 1 ${left} ${y} Tm (${pdfEscape(ln)}) Tj\n`;
            y -= 16;
        }
        content += "ET";
        const contentBytes = new TextEncoder().encode(content);
        const objects = [];
        objects.push("1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj");
        objects.push("2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj");
        objects.push(`3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] ` +
            `/Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj`);
        objects.push("4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj");
        objects.push(`5 0 obj << /Length ${contentBytes.length} >> stream\n${content}\nendstream endobj`);
        const header = "%PDF-1.4\n";
        const xrefPositions = [];
        let body = "";
        let offset = header.length;
        for (let i = 0; i < objects.length; i++) {
            xrefPositions[i + 1] = offset;
            const objStr = objects[i] + "\n";
            body += objStr;
            offset += objStr.length;
        }
        const xrefStart = offset;
        let xref = "xref\n0 " + (objects.length + 1) + "\n";
        xref += "0000000000 65535 f \n";
        for (let i = 1; i <= objects.length; i++) {
            xref += (xrefPositions[i] + "").padStart(10, "0") + " 00000 n \n";
        }
        const trailer = "trailer << /Size " +
            (objects.length + 1) +
            " /Root 1 0 R >>\nstartxref\n" +
            xrefStart +
            "\n%%EOF";
        const pdf = header + body + xref + trailer;
        const blob = new Blob([pdf], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${lastReceipt.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
    /* --------------------------------- UI --------------------------------- */
    return (_jsx("section", { style: { color: TOKENS.text }, children: _jsxs("div", { className: "\n          mx-auto max-w-[1240px]\n          px-4 sm:px-6 md:px-10\n          pt-10 pb-12\n          sm:pt-14 sm:pb-16\n          md:pt-20 md:pb-24\n        ", children: [_jsxs("div", { className: "mb-6 sm:mb-8 md:mb-10", children: [_jsxs("div", { className: "text-[9px] sm:text-[10px] tracking-[0.22em] uppercase flex items-center gap-2 flex-wrap", style: { color: TOKENS.sub }, children: [_jsx("span", { children: "Problem \u00B7 Irreversible" }), _jsx("span", { className: "text-[10px] sm:text-[11px] px-2 py-0.5 rounded border", style: { borderColor: TOKENS.hair, color: TOKENS.text }, children: "UNDO Feature" })] }), _jsx("h2", { className: "mt-2 text-[24px] sm:text-[28px] md:text-4xl lg:text-5xl font-extrabold tracking-tight", children: "UNDO Feature" }), _jsxs("p", { className: "mt-2 sm:mt-3 text-[13px] sm:text-sm md:text-base max-w-2xl", style: { color: TOKENS.sub }, children: ["Add a", " ", _jsx("span", { className: "font-semibold", style: { color: TOKENS.text }, children: "3-minute UNDO window" }), " ", "(SafetySend). Funds are placed on a short", " ", _jsx("span", { className: "font-semibold", children: "temporary hold" }), ". Cancel within the window \u2192 instant refund."] })] }), _jsxs("div", { className: "\n            grid md:grid-cols-2 items-start\n            gap-6 sm:gap-8 md:gap-10\n          ", children: [_jsxs("div", { className: "space-y-4 sm:space-y-5", children: [_jsxs("div", { className: "flex flex-wrap gap-2 sm:gap-2.5", children: [_jsx(Chip, { tone: "bad", children: "Irreversible by default" }), _jsx(Chip, { tone: "good", children: "UNDO within 180s" }), _jsx(Chip, { tone: "warn", className: "hidden xs:inline-flex sm:inline-flex", children: "Human mistakes happen" }), _jsx(Chip, { tone: "good", className: "hidden sm:inline-flex", children: "No native gas token" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-4", children: [_jsx(Metric, { label: "UNDO window", value: "3:00", sub: "180 seconds to cancel" }), _jsx(Metric, { label: "Happy-path tx", value: "1 tx", sub: "Auto-release (keeper)" })] }), _jsx("div", { className: "rounded-xl p-3 sm:p-4", style: { border: `1px solid ${TOKENS.hair}` }, children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "mt-0.5", children: _jsx(Stripe, {}) }), _jsxs("div", { className: "text-[11px] sm:text-sm leading-relaxed", style: { color: TOKENS.sub }, children: [_jsx("span", { className: "font-medium", style: { color: TOKENS.text }, children: "Fees shown are illustrative." }), " ", "With DNDX, users pay in ", _jsx("strong", { children: "USDC" }), "; no native tokens required in the UI flow."] })] }) }), _jsxs("div", { className: "rounded-xl p-3 sm:p-4 space-y-2", style: { border: `1px solid ${TOKENS.hair}` }, children: [_jsx("div", { className: "text-sm font-medium", style: { color: TOKENS.text }, children: "Live Quote (illustration)" }), _jsxs("div", { className: "grid grid-cols-1 gap-1.5 text-[11px] sm:text-sm", style: { color: TOKENS.sub }, children: [_jsxs("div", { className: "flex justify-between gap-2", children: [_jsx("span", { children: "Transaction fee (0.20%, min $0.05)" }), _jsx("span", { className: "tabular-nums", children: fmtUSDC(quote.transactionFee) })] }), _jsxs("div", { className: "flex justify-between gap-2", children: [_jsx("span", { children: "Gas fee" }), _jsx("span", { className: "tabular-nums", children: fmtUSDC(quote.gasFee) })] }), _jsxs("div", { className: "flex justify-between gap-2", children: [_jsx("span", { children: "User pays" }), _jsx("span", { className: "tabular-nums", children: fmtUSDC(quote.userPays) })] }), _jsxs("div", { className: "flex justify-between gap-2", children: [_jsx("span", { children: "Payee receives" }), _jsx("span", { className: "tabular-nums", children: fmtUSDC(quote.payeeGets) })] })] })] })] }), _jsxs("div", { className: "\n              rounded-2xl\n              overflow-hidden\n              max-w-full\n            ", style: { border: `1px solid ${TOKENS.stroke}` }, children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-3", style: { borderBottom: `1px solid ${TOKENS.hair}` }, children: [_jsxs("div", { className: "text-xs sm:text-sm", style: { color: TOKENS.mute }, children: ["Status \u00B7", " ", _jsx("span", { className: "font-medium", style: { color: TOKENS.text }, children: stateLabel })] }), _jsx(Chip, { tone: stateTone, children: state === "HOLD" && remaining > 0
                                                ? "UNDO active"
                                                : state === "CANCELED"
                                                    ? "Refunded"
                                                    : state === "RELEASED"
                                                        ? "Final"
                                                        : "Ready" })] }), _jsxs("div", { className: "px-3 sm:px-4 pt-3 pb-5 space-y-3 sm:space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [_jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Amount (USDC)", _jsx("input", { type: "number", min: 1, value: amount, onChange: (e) => setAmount(clamp(Number(e.target.value || 0), 1, 1000000)), className: "mt-1 w-full bg-transparent rounded-md px-3 py-2 text-sm outline-none", style: {
                                                                border: `1px solid ${TOKENS.hair}`,
                                                                color: TOKENS.text,
                                                                touchAction: "manipulation",
                                                                minHeight: "40px",
                                                            } })] }), _jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Payee (address / ENS)", _jsx("input", { type: "text", value: payee, onChange: (e) => setPayee(e.target.value), className: "mt-1 w-full bg-transparent rounded-md px-3 py-2 text-sm outline-none", style: {
                                                                border: `1px solid ${TOKENS.hair}`,
                                                                color: TOKENS.text,
                                                                touchAction: "manipulation",
                                                                minHeight: "40px",
                                                            } })] })] }), _jsxs("label", { className: "\n                  flex items-center justify-between gap-3\n                  rounded-md px-3 py-2\n                ", style: {
                                                border: `1px solid ${TOKENS.hair}`,
                                                touchAction: "manipulation",
                                            }, children: [_jsxs("div", { className: "text-[11px] sm:text-sm", children: [_jsx("div", { className: "font-medium", style: { color: TOKENS.text }, children: "SafetySend (UNDO)" }), _jsx("div", { className: "text-[10px] sm:text-xs", style: { color: TOKENS.mute }, children: "Funds held for 180s before final settlement. Fees are illustrative." })] }), _jsx("input", { type: "checkbox", checked: enabled, onChange: (e) => setEnabled(e.target.checked), className: "h-5 w-5", style: {
                                                        accentColor: TOKENS.blue,
                                                        touchAction: "manipulation",
                                                    } })] }), _jsxs("div", { className: "rounded-md p-3", style: { border: `1px solid ${TOKENS.hair}` }, children: [_jsxs("div", { className: "flex items-center justify-between text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: [_jsx("span", { children: state === "HOLD" ? "UNDO window" : "Timer" }), _jsxs("span", { className: "tabular-nums", style: { color: TOKENS.text }, children: [mm, ":", ss] })] }), _jsx("div", { className: "mt-2", children: _jsx(TimerBar, { remaining: state === "HOLD" ? remaining : 0, total: 180 }) })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [state === "INIT" && (_jsxs("button", { onClick: handlePay, className: "\n                      w-full sm:w-auto\n                      px-4 py-2.5\n                      rounded-md text-sm font-medium\n                    ", style: {
                                                        color: "#fff",
                                                        background: TOKENS.blue,
                                                        border: `1px solid ${TOKENS.blue}`,
                                                        touchAction: "manipulation",
                                                    }, children: ["Pay with UNDO \u00B7 ", fmtUSDC(amount)] })), state === "HOLD" && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleCancel, disabled: !canCancel, className: "\n                        flex-1 sm:flex-none\n                        px-3 py-2.5\n                        rounded-md text-sm font-medium\n                        disabled:opacity-40\n                      ", style: {
                                                                border: `1px solid ${TOKENS.bad}`,
                                                                color: TOKENS.bad,
                                                                background: "transparent",
                                                                touchAction: "manipulation",
                                                            }, children: "Cancel (Undo)" }), _jsx("button", { onClick: handleRelease, disabled: !canRelease, className: "\n                        flex-1 sm:flex-none\n                        px-3 py-2.5\n                        rounded-md text-sm font-medium\n                        disabled:opacity-40\n                      ", style: {
                                                                border: `1px solid ${TOKENS.hair}`,
                                                                color: TOKENS.sub,
                                                                background: "transparent",
                                                                touchAction: "manipulation",
                                                            }, children: "Release to Payee" })] })), (state === "CANCELED" || state === "RELEASED") && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => {
                                                                setState("INIT");
                                                                setRemaining(180);
                                                                setLastReceipt(null);
                                                            }, className: "\n                        flex-1 sm:flex-none\n                        px-3 py-2.5\n                        rounded-md text-sm font-medium\n                      ", style: {
                                                                border: `1px solid ${TOKENS.hair}`,
                                                                color: TOKENS.sub,
                                                                background: "transparent",
                                                                touchAction: "manipulation",
                                                            }, children: "Start new payment" }), lastReceipt && (_jsx("button", { onClick: downloadReceiptPDF, className: "\n                          flex-1 sm:flex-none\n                          px-3 py-2.5\n                          rounded-md text-sm font-medium\n                        ", style: {
                                                                color: TOKENS.text,
                                                                border: `1px solid ${TOKENS.hair}`,
                                                                background: "transparent",
                                                                touchAction: "manipulation",
                                                            }, children: "Download receipt (PDF)" }))] }))] }), lastReceipt && (_jsxs("div", { className: "\n                    rounded-md p-3\n                    text-[11px] sm:text-sm\n                    max-h-[220px] sm:max-h-none\n                    overflow-y-auto\n                  ", style: {
                                                border: `1px solid ${TOKENS.hair}`,
                                                color: TOKENS.sub,
                                            }, children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("span", { className: "font-medium", style: { color: TOKENS.text }, children: "Receipt" }), _jsx("span", { className: "px-2 py-0.5 rounded border text-[10px] sm:text-[11px]", style: { borderColor: TOKENS.hair }, children: lastReceipt.id }), _jsx("span", { className: "opacity-70", children: new Date(lastReceipt.timestampISO).toLocaleString() })] }), _jsxs("div", { className: "mt-2 grid grid-cols-2 gap-2", children: [_jsx("span", { children: "Payee" }), _jsx("span", { className: "tabular-nums", style: { color: TOKENS.text }, children: lastReceipt.payee }), _jsx("span", { children: "Amount" }), _jsx("span", { className: "tabular-nums", children: fmtUSDC(lastReceipt.amountUSDC) }), _jsx("span", { children: "Transaction fee" }), _jsx("span", { className: "tabular-nums", children: fmtUSDC(lastReceipt.transactionFeeUSDC) }), _jsx("span", { children: "Gas fee" }), _jsx("span", { className: "tabular-nums", children: fmtUSDC(lastReceipt.gasFeeUSDC) }), _jsx("span", { children: "User pays" }), _jsx("span", { className: "tabular-nums", children: fmtUSDC(lastReceipt.userPaysUSDC) }), _jsx("span", { children: "Payee receives" }), _jsx("span", { className: "tabular-nums", children: fmtUSDC(lastReceipt.payeeReceivesUSDC) }), lastReceipt.refundUSDC !== undefined && (_jsxs(_Fragment, { children: [_jsx("span", { children: "Refunded" }), _jsx("span", { className: "tabular-nums", children: fmtUSDC(lastReceipt.refundUSDC) })] }))] }), _jsx("div", { className: "mt-2 text-[10px] sm:text-[11px]", style: { color: TOKENS.mute }, children: lastReceipt.note })] })), _jsx("div", { className: "text-[10px] sm:text-[11px]", style: { color: TOKENS.mute }, children: "Demo: one tx to create; keeper auto-releases after the window (happy-path). Only payer can cancel within the window." })] })] })] })] }) }));
}
