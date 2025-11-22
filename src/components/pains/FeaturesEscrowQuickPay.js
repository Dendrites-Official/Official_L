"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { TOKENS, Chip, Row, SectionCard, Divider, clamp, fmtUSDC, isAddr, isENS, addrHint, short, buildPayCode, PayCodeBlock } from "./paymentsShared";
export default function PaymentsEscrowQuickPay() {
    const [tab, setTab] = useState("escrow");
    return (_jsx("section", { id: "escrow-quickpay", style: { color: TOKENS.text }, children: _jsxs("div", { className: "\n          mx-auto max-w-[1240px]\n          px-4 sm:px-6 md:px-10\n          pt-10 pb-12\n          sm:pt-14 sm:pb-16\n          md:pt-20 md:pb-24\n        ", children: [_jsxs("div", { className: "mb-6 sm:mb-8 md:mb-10", children: [_jsx("div", { className: "text-[9px] sm:text-[10px] tracking-[0.22em] uppercase", style: { color: TOKENS.sub }, children: "Features \u00B7 Escrow & QuickPay" }), _jsx("h2", { className: "mt-2 text-[24px] sm:text-[28px] md:text-4xl lg:text-5xl font-extrabold tracking-tight", children: "Escrow and QuickPay" }), _jsx("p", { className: "mt-2 sm:mt-3 text-[13px] sm:text-sm md:text-base max-w-2xl", style: { color: TOKENS.sub }, children: "Trustable escrow with milestone control & refunds. Instant \u201Ccard-swipe\u201D crypto with flat, predictable fees and an UNDO window." })] }), _jsx("div", { className: "mb-6 sm:mb-7", children: _jsx("div", { className: "\n              inline-flex w-full sm:w-auto\n              rounded-xl p-0.5\n            ", style: { border: `1px solid ${TOKENS.hair}` }, children: ["escrow", "quick"].map((t) => {
                            const isActive = tab === t;
                            return (_jsx("button", { onClick: () => setTab(t), className: `
                    flex-1 sm:flex-none
                    px-4 py-2
                    text-xs sm:text-sm
                    rounded-[10px]
                    font-medium
                    transition-colors
                  `, style: {
                                    color: isActive ? TOKENS.text : TOKENS.sub,
                                    background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                                    border: `1px solid ${isActive ? TOKENS.hair : "transparent"}`,
                                    touchAction: "manipulation",
                                    minHeight: "38px",
                                }, children: t === "escrow" ? "Escrow" : "QuickPay" }, t));
                        }) }) }), tab === "escrow" ? _jsx(EscrowSimulator, {}) : _jsx(QuickPaySimulator, {})] }) }));
}
function EscrowSimulator() {
    const [payer, setPayer] = useState("");
    const [payee, setPayee] = useState("studio.partner.eth");
    const [verifier, setVerifier] = useState("");
    const [amount, setAmount] = useState(1200);
    const [timeout, setTimeoutSecs] = useState(72 * 3600);
    const [state, setState] = useState("INIT");
    const [released, setReleased] = useState(0);
    const [milestones, setMilestones] = useState([]);
    const [log, setLog] = useState([]);
    const remaining = Math.max(0, amount - released);
    const canFund = state === "INIT" &&
        amount > 0 &&
        payer.trim() &&
        payee.trim() &&
        (isAddr(payer) || isENS(payer)) &&
        (isAddr(payee) || isENS(payee));
    function logPush(s) {
        setLog((prev) => [`• ${new Date().toLocaleTimeString()} — ${s}`, ...prev].slice(0, 60));
    }
    function handleFund() {
        if (!canFund)
            return;
        setState("FUNDED");
        logPush(`Escrow funded by ${short(payer)}: ${fmtUSDC(amount)} → ${short(payee)}${verifier ? ` (verifier: ${short(verifier)})` : ""}`);
    }
    function handleAddMilestone() {
        const left = remaining;
        if (left <= 0)
            return;
        const chunk = Math.max(1, Math.round(left / 2));
        const id = Math.random().toString(36).slice(2, 7).toUpperCase();
        setMilestones((m) => [
            ...m,
            { id, label: `Milestone ${m.length + 1}`, amount: chunk, done: false },
        ]);
        logPush(`Milestone added: ${fmtUSDC(chunk)}`);
    }
    function handleRelease() {
        if (!(state === "FUNDED" && remaining > 0))
            return;
        const idx = milestones.findIndex((m) => !m.done);
        if (idx >= 0) {
            const ms = milestones[idx];
            ms.done = true;
            setMilestones([...milestones]);
            setReleased((r) => r + ms.amount);
            logPush(`Released milestone (${ms.label}): ${fmtUSDC(ms.amount)}`);
            if (released + ms.amount >= amount) {
                setState("FULL_RELEASE");
                logPush("Escrow fully released");
            }
            else {
                setState("PARTIAL_RELEASE");
            }
        }
        else {
            setReleased(amount);
            setState("FULL_RELEASE");
            logPush(`Released in full: ${fmtUSDC(amount)}`);
        }
    }
    function handleRefund() {
        if (!(state === "FUNDED" && remaining > 0))
            return;
        setState("REFUNDED");
        const back = amount - released;
        logPush(`Refunded to payer ${short(payer)}: ${fmtUSDC(back)} (unreleased portion)`);
    }
    function reset() {
        setState("INIT");
        setReleased(0);
        setMilestones([]);
        setLog([]);
    }
    const invalidPayer = payer && !(isAddr(payer) || isENS(payer));
    const invalidPayee = payee && !(isAddr(payee) || isENS(payee));
    // Escrow PayCode (demo)
    const escrowCode = buildPayCode({
        flow: "escrow",
        chain: "Base",
        to: payee,
        token: "USDC",
        amount,
        extra: { verifier: verifier || undefined, timeout },
    });
    return (_jsxs("div", { className: "\n        grid md:grid-cols-2\n        items-start\n        gap-6 sm:gap-7 md:gap-10\n      ", children: [_jsxs(SectionCard, { title: "APP Escrow \u00B7 Milestones & Refund", right: _jsx(Chip, { children: "Timeout + optional verifier" }), children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [_jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Payer (your wallet)", _jsx("input", { value: payer, onChange: (e) => setPayer(e.target.value), placeholder: addrHint, className: "\n                mt-1 w-full\n                bg-transparent rounded-md\n                px-3 py-2 text-sm outline-none\n              ", style: {
                                            border: `1px solid ${invalidPayer ? TOKENS.bad : TOKENS.hair}`,
                                            color: TOKENS.text,
                                            touchAction: "manipulation",
                                            minHeight: "40px",
                                        } }), invalidPayer && (_jsx("span", { className: "mt-1 block text-[10px] sm:text-[11px]", style: { color: TOKENS.bad }, children: "Enter a valid address or ENS." }))] }), _jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Payee (address / ENS)", _jsx("input", { value: payee, onChange: (e) => setPayee(e.target.value), placeholder: addrHint, className: "\n                mt-1 w-full\n                bg-transparent rounded-md\n                px-3 py-2 text-sm outline-none\n              ", style: {
                                            border: `1px solid ${invalidPayee ? TOKENS.bad : TOKENS.hair}`,
                                            color: TOKENS.text,
                                            touchAction: "manipulation",
                                            minHeight: "40px",
                                        } }), invalidPayee && (_jsx("span", { className: "mt-1 block text-[10px] sm:text-[11px]", style: { color: TOKENS.bad }, children: "Enter a valid address or ENS." }))] }), _jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Optional verifier", _jsx("input", { value: verifier, onChange: (e) => setVerifier(e.target.value), placeholder: addrHint, className: "\n                mt-1 w-full\n                bg-transparent rounded-md\n                px-3 py-2 text-sm outline-none\n              ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.text,
                                            touchAction: "manipulation",
                                            minHeight: "40px",
                                        } })] }), _jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Amount (USDC)", _jsx("input", { type: "number", min: 1, value: amount, onChange: (e) => setAmount(clamp(Number(e.target.value || 0), 1, 10000000)), className: "\n                mt-1 w-full\n                bg-transparent rounded-md\n                px-3 py-2 text-sm outline-none\n              ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.text,
                                            touchAction: "manipulation",
                                            minHeight: "40px",
                                        } })] }), _jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Timeout (secs)", _jsx("input", { type: "number", min: 3600, value: timeout, onChange: (e) => setTimeoutSecs(clamp(Number(e.target.value || 0), 3600, 30 * 24 * 3600)), className: "\n                mt-1 w-full\n                bg-transparent rounded-md\n                px-3 py-2 text-sm outline-none\n              ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.text,
                                            touchAction: "manipulation",
                                            minHeight: "40px",
                                        } })] })] }), _jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [_jsx(Row, { k: "State", v: _jsx("span", { children: state.replace(/_/g, " ") }) }), _jsx(Row, { k: "Released", v: fmtUSDC(released) }), _jsx(Row, { k: "Remaining", v: fmtUSDC(Math.max(0, amount - released)) }), _jsx(Row, { k: "Timeout", v: `${Math.round(timeout / 3600)}h` })] }), _jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [state === "INIT" && (_jsxs("button", { onClick: handleFund, disabled: !canFund, className: "\n                w-full sm:w-auto\n                px-4 py-2.5\n                rounded-md text-sm font-medium\n                disabled:opacity-40\n              ", style: {
                                    color: "#fff",
                                    background: TOKENS.blue,
                                    border: `1px solid ${TOKENS.blue}`,
                                    touchAction: "manipulation",
                                }, children: ["Fund Escrow \u00B7 ", fmtUSDC(amount)] })), state !== "INIT" && state !== "FULL_RELEASE" && state !== "REFUNDED" && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleAddMilestone, className: "\n                  flex-1 sm:flex-none\n                  px-3 py-2.5\n                  rounded-md text-sm font-medium\n                ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.sub,
                                            background: "transparent",
                                            touchAction: "manipulation",
                                        }, children: "Add milestone" }), _jsx("button", { onClick: handleRelease, className: "\n                  flex-1 sm:flex-none\n                  px-3 py-2.5\n                  rounded-md text-sm font-medium\n                ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.sub,
                                            background: "transparent",
                                            touchAction: "manipulation",
                                        }, children: "Release next" }), _jsx("button", { onClick: handleRefund, className: "\n                  w-full sm:w-auto\n                  px-3 py-2.5\n                  rounded-md text-sm font-medium\n                ", style: {
                                            border: `1px solid ${TOKENS.bad}`,
                                            color: TOKENS.bad,
                                            background: "transparent",
                                            touchAction: "manipulation",
                                        }, children: "Request refund" })] })), (state === "FULL_RELEASE" || state === "REFUNDED") && (_jsx("button", { onClick: reset, className: "\n                w-full sm:w-auto\n                px-3 py-2.5\n                rounded-md text-sm font-medium\n              ", style: {
                                    border: `1px solid ${TOKENS.hair}`,
                                    color: TOKENS.sub,
                                    background: "transparent",
                                    touchAction: "manipulation",
                                }, children: "New escrow" }))] })] }), _jsxs("div", { className: "space-y-5 sm:space-y-6", children: [_jsx(SectionCard, { title: "Milestones", children: milestones.length === 0 ? (_jsx("div", { className: "text-sm", style: { color: TOKENS.mute }, children: "No milestones yet. Add one to split releases." })) : (_jsx("ul", { className: "space-y-2", children: milestones.map((m) => (_jsxs("li", { className: "\n                    flex items-center justify-between\n                    rounded-md px-3 py-2\n                  ", style: { border: `1px solid ${TOKENS.hair}` }, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xs", style: { color: TOKENS.sub }, children: m.label }), m.done ? (_jsx(Chip, { tone: "good", children: "Released" })) : (_jsx(Chip, { tone: "warn", children: "Pending" }))] }), _jsx("div", { className: "tabular-nums", children: fmtUSDC(m.amount) })] }, m.id))) })) }), _jsx(PayCodeBlock, { title: "PayCode (demo)", dndxLink: escrowCode.dndxLink, eip681: escrowCode.eip681, verdict: escrowCode.assessment.verdict, score: escrowCode.assessment.score, reasons: escrowCode.assessment.reasons }), _jsx(SectionCard, { title: "Event log", children: log.length === 0 ? (_jsx("div", { className: "text-sm", style: { color: TOKENS.mute }, children: "Actions will appear here." })) : (_jsx("ul", { className: "space-y-1 text-[11px] sm:text-sm", style: { color: TOKENS.sub }, children: log.map((l, i) => (_jsx("li", { children: l }, i))) })) })] })] }));
}
/* --------------------------- QuickPay Simulator ------------------------- */
function QuickPaySimulator() {
    const [amount, setAmount] = useState(75);
    const [undo, setUndo] = useState(true);
    const [payee, setPayee] = useState("merchant.eth");
    const [showReceipt, setShowReceipt] = useState(false);
    const txPct = 0.002;
    const txMin = 0.05;
    const gasBase = 0.12;
    const gasJitter = useMemo(() => {
        const j = Math.sin(Date.now() / 4000) * 0.015 +
            Math.cos(Date.now() / 7000) * 0.01;
        return clamp(j, -0.03, 0.03);
    }, []);
    const fees = useMemo(() => {
        const transactionFee = Math.max(txMin, amount * txPct);
        const gasFee = clamp(gasBase + gasJitter, 0.08, 0.2);
        const total = transactionFee + gasFee;
        const slaBandHigh = transactionFee + gasBase + 0.02; // demo
        const cReal = transactionFee + gasFee;
        const creditRaw = Math.max(0, cReal - slaBandHigh);
        const credit = Math.min(0.5, Number(creditRaw.toFixed(2)));
        return {
            transactionFee,
            gasFee,
            total,
            userPays: amount + total,
            payeeReceives: amount,
            slaCredit: credit,
        };
    }, [amount, gasJitter]);
    function handlePay() {
        setShowReceipt(true);
    }
    function reset() {
        setShowReceipt(false);
        setAmount(75);
        setUndo(true);
    }
    const quickCode = buildPayCode({
        flow: "quick",
        chain: "Base",
        to: payee,
        token: "USDC",
        amount,
        undo,
    });
    return (_jsxs("div", { className: "\n        grid md:grid-cols-2\n        items-start\n        gap-6 sm:gap-7 md:gap-10\n      ", children: [_jsxs(SectionCard, { title: "QuickPay \u00B7 Instant Confirmation", right: _jsx(Chip, { children: "SafetySend (UNDO) supported" }), children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [_jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Amount (USDC)", _jsx("input", { type: "number", min: 1, value: amount, onChange: (e) => setAmount(clamp(Number(e.target.value || 0), 1, 1000000)), className: "\n                mt-1 w-full\n                bg-transparent rounded-md\n                px-3 py-2 text-sm outline-none\n              ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.text,
                                            touchAction: "manipulation",
                                            minHeight: "40px",
                                        } })] }), _jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Payee (address / ENS)", _jsx("input", { value: payee, onChange: (e) => setPayee(e.target.value), placeholder: addrHint, className: "\n                mt-1 w-full\n                bg-transparent rounded-md\n                px-3 py-2 text-sm outline-none\n              ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.text,
                                            touchAction: "manipulation",
                                            minHeight: "40px",
                                        } })] }), _jsxs("label", { className: "\n              text-[11px] sm:text-xs\n              flex flex-col sm:flex-row\n              items-start sm:items-center\n              justify-between gap-2 sm:gap-3\n              rounded-md px-3 py-2\n              md:col-span-2\n            ", style: { border: `1px solid ${TOKENS.hair}`, touchAction: "manipulation" }, children: [_jsxs("span", { children: [_jsx("span", { className: "font-medium", style: { color: TOKENS.text }, children: "SafetySend (UNDO)" }), _jsx("span", { className: "ml-0 sm:ml-2 block sm:inline text-[10px] sm:text-xs", style: { color: TOKENS.mute }, children: "3-minute window to cancel mistakes" })] }), _jsx("input", { type: "checkbox", checked: undo, onChange: (e) => setUndo(e.target.checked), className: "h-5 w-5 mt-1 sm:mt-0", style: {
                                            accentColor: TOKENS.blue,
                                            touchAction: "manipulation",
                                            minWidth: "24px",
                                            minHeight: "24px",
                                        } })] })] }), _jsxs("div", { className: "mt-4 space-y-1.5 sm:space-y-2", children: [_jsx(Row, { k: "Transaction fee (0.20%, min $0.05)", v: fmtUSDC(fees.transactionFee) }), _jsx(Row, { k: "Gas fee", v: fmtUSDC(fees.gasFee) }), _jsx(Row, { k: "User pays", v: fmtUSDC(fees.userPays) }), _jsx(Row, { k: "Payee receives", v: fmtUSDC(fees.payeeReceives) }), fees.slaCredit > 0 && (_jsx(Row, { k: "SLA credit (demo)", v: _jsx("span", { className: "text-emerald-300", children: fmtUSDC(fees.slaCredit) }) }))] }), _jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [fees.slaCredit > 0 ? (_jsx(Chip, { tone: "good", children: "SLA credit available" })) : (_jsx(Chip, { children: "Within SLA band" })), undo ? (_jsx(Chip, { tone: "warn", children: "UNDO active (3 mins)" })) : (_jsx(Chip, { children: "UNDO off" }))] }), _jsxs("div", { className: "mt-4 text-[11px]", style: { color: TOKENS.mute }, children: ["Fees are", " ", _jsx("strong", { style: { color: TOKENS.sub }, children: "illustrative" }), ". Users pay fees in ", _jsx("strong", { children: "USDC" }), "; no native gas token required. SLA credits are fee-offset only (non-transferable)."] }), _jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: !showReceipt ? (_jsxs("button", { onClick: handlePay, className: "\n                w-full sm:w-auto\n                px-4 py-2.5\n                rounded-md text-sm font-medium\n              ", style: {
                                color: "#fff",
                                background: TOKENS.blue,
                                border: `1px solid ${TOKENS.blue}`,
                                touchAction: "manipulation",
                            }, children: ["Pay now \u00B7 ", fmtUSDC(amount)] })) : (_jsx("button", { onClick: reset, className: "\n                w-full sm:w-auto\n                px-3 py-2.5\n                rounded-md text-sm font-medium\n              ", style: {
                                border: `1px solid ${TOKENS.hair}`,
                                color: TOKENS.sub,
                                background: "transparent",
                                touchAction: "manipulation",
                            }, children: "New QuickPay" })) })] }), _jsxs("div", { className: "space-y-5 sm:space-y-6", children: [_jsx(SectionCard, { title: "Instant Receipt", children: showReceipt ? (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx(Chip, { tone: "good", children: "Confirmed" }), undo ? (_jsx(Chip, { tone: "warn", children: "UNDO active (3 mins)" })) : (_jsx(Chip, { children: "UNDO off" })), fees.slaCredit > 0 && (_jsxs(Chip, { tone: "good", children: ["SLA credit ", fmtUSDC(fees.slaCredit)] }))] }), _jsx(Divider, {}), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(Row, { k: "Amount", v: fmtUSDC(amount) }), _jsx(Row, { k: "Transaction fee", v: fmtUSDC(fees.transactionFee) }), _jsx(Row, { k: "Gas fee", v: fmtUSDC(fees.gasFee) }), _jsx(Row, { k: "User pays", v: fmtUSDC(fees.userPays) }), _jsx(Row, { k: "Payee receives", v: fmtUSDC(fees.payeeReceives) })] }), _jsx(Divider, {}), _jsx("div", { className: "text-[10px] sm:text-[11px]", style: { color: TOKENS.mute }, children: "Receipt is for demonstration only; values are not final quotes." })] })) : (_jsx("div", { className: "text-sm", style: { color: TOKENS.mute }, children: "Complete a QuickPay to see the receipt." })) }), _jsx(PayCodeBlock, { title: "QR / PayCode (demo)", dndxLink: quickCode.dndxLink, eip681: quickCode.eip681, verdict: quickCode.assessment.verdict, score: quickCode.assessment.score, reasons: quickCode.assessment.reasons })] })] }));
}
