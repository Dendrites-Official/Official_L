"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { TOKENS, Chip, Row, SectionCard, Divider, clamp, fmtUSDC, isAddr, isENS, addrHint, short, buildPayCode, PayCodeBlock } from "./paymentsShared";
export default function PaymentsAckInPay() {
    const [tab, setTab] = useState("ack");
    return (_jsx("section", { style: { color: TOKENS.text }, children: _jsxs("div", { className: "\n          mx-auto max-w-[1240px]\n          px-4 sm:px-6 md:px-10\n          pt-10 pb-12\n          sm:pt-14 sm:pb-16\n          md:pt-20 md:pb-24\n        ", children: [_jsxs("div", { className: "mb-6 sm:mb-8 md:mb-10", children: [_jsx("div", { className: "text-[9px] sm:text-[10px] tracking-[0.22em] uppercase", style: { color: TOKENS.sub }, children: "Features \u00B7 AckPay & inPay" }), _jsx("h2", { className: "mt-2 text-[24px] sm:text-4xl md:text-5xl font-extrabold tracking-tight", children: "AckPay requests & Any-to-Any inPay" }), _jsxs("p", { className: "mt-2 sm:mt-3 text-[13px] sm:text-base md:text-lg max-w-3xl", style: { color: TOKENS.sub }, children: ["AckPay: payments land as", " ", _jsx("strong", { style: { color: TOKENS.text }, children: "PENDING" }), " and need the recipient to", " ", _jsx("strong", { style: { color: TOKENS.text }, children: "accept()" }), ", else auto-refund. inPay: pay in X on chain A, recipient receives Y on chain B; funds lock as an on-chain receipt until accept()."] })] }), _jsx("div", { className: "mb-6 sm:mb-7", children: _jsx("div", { className: "\n              inline-flex w-full sm:w-auto\n              rounded-xl p-0.5\n            ", style: { border: `1px solid ${TOKENS.hair}` }, children: ["ack", "inpay"].map((t) => {
                            const isActive = tab === t;
                            return (_jsx("button", { onClick: () => setTab(t), className: "\n                    flex-1 sm:flex-none\n                    px-4 py-2\n                    text-xs sm:text-sm\n                    rounded-[10px]\n                    font-medium\n                    transition-colors\n                  ", style: {
                                    color: isActive ? TOKENS.text : TOKENS.sub,
                                    background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                                    border: `1px solid ${isActive ? TOKENS.hair : "transparent"}`,
                                    touchAction: "manipulation",
                                    minHeight: "38px",
                                }, children: t === "ack" ? "AckPay" : "inPay" }, t));
                        }) }) }), tab === "ack" ? _jsx(AckPayWithRequest, {}) : _jsx(InPaySimulator, {})] }) }));
}
function AckPayWithRequest() {
    // --- Request Builder (payee generates a payment URL) ---
    const [recipient, setRecipient] = useState("merchant.accept.eth");
    const [amount, setAmount] = useState(42);
    const [windowSecs, setWindowSecs] = useState(180); // demo window
    const [requireAuth, setRequireAuth] = useState(true);
    const [authCode, setAuthCode] = useState(() => genAuthCode());
    const [memo, setMemo] = useState("Order #A19");
    const invalidRecipient = recipient && !(isAddr(recipient) || isENS(recipient));
    const ackRequest = useMemo(() => {
        const extra = { window: windowSecs, memo };
        if (requireAuth)
            extra.auth = authCode;
        return buildPayCode({
            flow: "ack",
            chain: "Base",
            to: recipient,
            token: "USDC",
            amount,
            extra,
        });
    }, [recipient, amount, windowSecs, requireAuth, authCode, memo]);
    // --- Live AckPay mini (payer sent funds → pending → accept/refund) ---
    const [state, setState] = useState("IDLE");
    const [seconds, setSeconds] = useState(windowSecs);
    useEffect(() => {
        if (state !== "PENDING")
            return;
        setSeconds(windowSecs);
        const i = setInterval(() => {
            setSeconds((s) => {
                if (s <= 1) {
                    clearInterval(i);
                    setState("REFUNDED");
                    return 0;
                }
                return s - 1;
            });
        }, 1000);
        return () => clearInterval(i);
    }, [state, windowSecs]);
    function simulateIncoming() {
        setState("PENDING");
    }
    return (_jsxs("div", { className: "\n        grid md:grid-cols-2\n        items-start\n        gap-6 sm:gap-8 md:gap-12\n      ", children: [_jsxs(SectionCard, { title: "AckPay \u2014 Create a Shareable Request", right: _jsx(Chip, { children: "Pending until accept()" }), children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4", children: [_jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Your receiving wallet (address / ENS)", _jsx("input", { value: recipient, onChange: (e) => setRecipient(e.target.value), placeholder: addrHint, className: "\n                mt-1 w-full\n                bg-transparent rounded-md\n                px-3 py-2 text-sm outline-none\n              ", style: {
                                            border: `1px solid ${invalidRecipient ? TOKENS.bad : TOKENS.hair}`,
                                            color: TOKENS.text,
                                            touchAction: "manipulation",
                                            minHeight: "44px",
                                        } }), invalidRecipient && (_jsx("span", { className: "mt-1 block text-[10px] sm:text-[11px]", style: { color: TOKENS.bad }, children: "Enter a valid address or ENS." }))] }), _jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Amount (USDC)", _jsx("input", { type: "number", min: 1, value: amount, onChange: (e) => setAmount(clamp(Number(e.target.value || 0), 1, 1000000)), className: "\n                mt-1 w-full\n                bg-transparent rounded-md\n                px-3 py-2 text-sm outline-none\n              ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.text,
                                            touchAction: "manipulation",
                                            minHeight: "44px",
                                        } })] }), _jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Accept window (secs)", _jsx("input", { type: "number", min: 30, value: windowSecs, onChange: (e) => setWindowSecs(clamp(Number(e.target.value || 0), 30, 60 * 60)), className: "\n                mt-1 w-full\n                bg-transparent rounded-md\n                px-3 py-2 text-sm outline-none\n              ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.text,
                                            touchAction: "manipulation",
                                            minHeight: "44px",
                                        } })] }), _jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Memo (optional)", _jsx("input", { value: memo, onChange: (e) => setMemo(e.target.value), placeholder: "What is this for?", className: "\n                mt-1 w-full\n                bg-transparent rounded-md\n                px-3 py-2 text-sm outline-none\n              ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.text,
                                            touchAction: "manipulation",
                                            minHeight: "44px",
                                        } })] }), _jsxs("label", { className: "\n              text-[11px] sm:text-xs sm:col-span-2\n              flex flex-col sm:flex-row\n              items-start sm:items-center\n              justify-between\n              gap-2 sm:gap-3\n              rounded-md px-3 py-2\n            ", style: { border: `1px solid ${TOKENS.hair}`, touchAction: "manipulation" }, children: [_jsxs("span", { children: [_jsx("span", { className: "font-medium", style: { color: TOKENS.text }, children: "Require Auth Code" }), _jsx("span", { className: "ml-0 sm:ml-2 block sm:inline text-[10px] sm:text-xs", style: { color: TOKENS.mute }, children: "Payer must enter a code for the link to work" })] }), _jsx("input", { type: "checkbox", checked: requireAuth, onChange: (e) => setRequireAuth(e.target.checked), className: "h-5 w-5 mt-1 sm:mt-0", style: {
                                            accentColor: TOKENS.blue,
                                            minWidth: "24px",
                                            minHeight: "24px",
                                            touchAction: "manipulation",
                                        } })] }), requireAuth && (_jsxs("label", { className: "text-[11px] sm:text-xs sm:col-span-2", style: { color: TOKENS.sub }, children: ["Auth code (share separately or out-of-band)", _jsxs("div", { className: "\n                  mt-1\n                  flex flex-col sm:flex-row\n                  gap-2 sm:items-center\n                ", children: [_jsx("input", { value: authCode, onChange: (e) => setAuthCode(e.target.value.toUpperCase()), className: "\n                    w-full\n                    bg-transparent rounded-md\n                    px-3 py-2 text-sm outline-none\n                  ", style: {
                                                    border: `1px solid ${TOKENS.hair}`,
                                                    color: TOKENS.text,
                                                    minHeight: "44px",
                                                    letterSpacing: "0.08em",
                                                } }), _jsx("button", { onClick: () => setAuthCode(genAuthCode()), className: "\n                    px-3 py-2\n                    rounded-md text-sm font-medium\n                  ", style: {
                                                    border: `1px solid ${TOKENS.hair}`,
                                                    color: TOKENS.sub,
                                                    background: "transparent",
                                                    minHeight: "40px",
                                                    touchAction: "manipulation",
                                                }, children: "New" })] }), _jsx("span", { className: "mt-1 block text-[10px] sm:text-[11px]", style: { color: TOKENS.mute }, children: "Demo only \u2014 in production, validate the code server-side or with EIP-712 signed payloads." })] }))] }), _jsx("div", { className: "mt-4 max-h-[260px] sm:max-h-none overflow-auto pr-1", children: _jsx(PayCodeBlock, { title: "AckPay Request \u2014 Share this", dndxLink: ackRequest.dndxLink, eip681: ackRequest.eip681, verdict: ackRequest.assessment.verdict, score: ackRequest.assessment.score, reasons: ackRequest.assessment.reasons }) }), _jsxs("div", { className: "mt-2 text-[11px] hidden sm:block", style: { color: TOKENS.mute }, children: ["Flow: payer opens the link \u2192 enters the (optional) auth code \u2192 sends funds \u2192 they land as", " ", _jsx("strong", { style: { color: TOKENS.text }, children: "PENDING" }), ". You must", " ", _jsx("strong", { style: { color: TOKENS.text }, children: "accept()" }), " before the window expires, else auto-refund."] }), _jsxs("div", { className: "mt-2 text-[11px] sm:hidden", style: { color: TOKENS.mute }, children: ["Funds land as ", _jsx("strong", { style: { color: TOKENS.text }, children: "PENDING" }), ". You call", " ", _jsx("strong", { style: { color: TOKENS.text }, children: "accept()" }), " before the timer ends, or it auto-refunds."] })] }), _jsxs(SectionCard, { title: "AckPay \u2014 Live Demo", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsxs("div", { className: "text-sm", style: { color: TOKENS.sub }, children: ["Status:", " ", _jsxs("span", { className: "font-medium", style: { color: TOKENS.text }, children: [state === "IDLE" && "Ready", state === "PENDING" && "Pending · awaiting recipient accept()", state === "ACCEPTED" && "Accepted · settled", state === "REFUNDED" && "Auto-refunded"] })] }), _jsx(Chip, { tone: state === "PENDING"
                                    ? "warn"
                                    : state === "ACCEPTED"
                                        ? "good"
                                        : state === "REFUNDED"
                                            ? "bad"
                                            : "neutral", children: state === "PENDING"
                                    ? "Pending"
                                    : state === "ACCEPTED"
                                        ? "Accepted"
                                        : state === "REFUNDED"
                                            ? "Refunded"
                                            : "Idle" })] }), _jsxs("div", { className: "mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2", children: [_jsx(Row, { k: "Recipient", v: short(recipient) }), _jsx(Row, { k: "Amount", v: fmtUSDC(amount) }), _jsx(Row, { k: "Accept window", v: state === "PENDING"
                                    ? `${seconds}s left`
                                    : `${windowSecs}s` })] }), _jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [state === "IDLE" && (_jsx("button", { onClick: simulateIncoming, className: "\n                px-4 py-2\n                rounded-md text-sm font-medium\n              ", style: {
                                    color: "#fff",
                                    background: TOKENS.blue,
                                    border: `1px solid ${TOKENS.blue}`,
                                    minHeight: "44px",
                                    touchAction: "manipulation",
                                }, children: "Simulate payer sent funds \u2192 PENDING" })), state === "PENDING" && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setState("ACCEPTED"), className: "\n                  px-3 py-2\n                  rounded-md text-sm font-medium\n                ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.sub,
                                            background: "transparent",
                                            minHeight: "44px",
                                            touchAction: "manipulation",
                                        }, children: "accept()" }), _jsx("button", { onClick: () => setState("REFUNDED"), className: "\n                  px-3 py-2\n                  rounded-md text-sm font-medium\n                ", style: {
                                            border: `1px solid ${TOKENS.bad}`,
                                            color: TOKENS.bad,
                                            background: "transparent",
                                            minHeight: "44px",
                                            touchAction: "manipulation",
                                        }, children: "refund()" })] })), (state === "ACCEPTED" || state === "REFUNDED") && (_jsx("button", { onClick: () => setState("IDLE"), className: "\n                px-3 py-2\n                rounded-md text-sm font-medium\n              ", style: {
                                    border: `1px solid ${TOKENS.hair}`,
                                    color: TOKENS.sub,
                                    background: "transparent",
                                    minHeight: "44px",
                                    touchAction: "manipulation",
                                }, children: "Reset" }))] })] })] }));
}
const CHAINS = ["Base", "Ethereum", "Arbitrum", "Polygon"];
const TOKS = ["USDC", "USDT", "DAI"];
function InPaySimulator() {
    const [fromChain, setFromChain] = useState("Base");
    const [toChain, setToChain] = useState("Base");
    const [fromToken, setFromToken] = useState("USDC");
    const [toToken, setToToken] = useState("USDC");
    const [amount, setAmount] = useState(120);
    const [state, setState] = useState("IDLE");
    const [routeQuote, setRouteQuote] = useState(null);
    function findRoute() {
        setState("ROUTING");
        setRouteQuote(null);
        setTimeout(() => {
            const fail = (fromChain === "Ethereum" && toChain === "Polygon" && amount < 10) ||
                (fromToken !== "USDC" && toToken === "USDC" && amount < 5);
            if (fail) {
                setState("FAILED");
            }
            else {
                const slip = Math.max(0, Math.min(0.8, amount * 0.001));
                setRouteQuote(Math.max(1, amount - slip));
                setState("ROUTE_FOUND");
            }
        }, 900);
    }
    function accept() {
        if (state === "ROUTE_FOUND")
            setState("ACCEPTED");
    }
    function refund() {
        if (state === "FAILED" || state === "ROUTE_FOUND")
            setState("REFUNDED");
    }
    function reset() {
        setState("IDLE");
        setRouteQuote(null);
        setAmount(120);
        setFromChain("Base");
        setToChain("Base");
        setFromToken("USDC");
        setToToken("USDC");
    }
    return (_jsxs("div", { className: "\n        grid md:grid-cols-2\n        items-start\n        gap-5 sm:gap-7 md:gap-12\n      ", children: [_jsxs(SectionCard, { title: "inPay \u00B7 Any-to-Any with Receipt Lock", right: _jsx(Chip, { children: "USDC\u2192USDC on Base (v0 scope)" }), children: [_jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-4", children: [_jsx("div", { className: "col-span-2 sm:col-span-1", children: _jsx(SelectRow, { label: "From chain", value: fromChain, setValue: setFromChain, options: CHAINS }) }), _jsx("div", { className: "col-span-2 sm:col-span-1", children: _jsx(SelectRow, { label: "To chain", value: toChain, setValue: setToChain, options: CHAINS }) }), _jsx("div", { className: "col-span-2 sm:col-span-1", children: _jsx(SelectRow, { label: "From token", value: fromToken, setValue: setFromToken, options: TOKS }) }), _jsx("div", { className: "col-span-2 sm:col-span-1", children: _jsx(SelectRow, { label: "To token", value: toToken, setValue: setToToken, options: TOKS }) }), _jsx("div", { className: "col-span-2", children: _jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: ["Amount (from)", _jsx("input", { type: "number", min: 1, value: amount, onChange: (e) => setAmount(clamp(Number(e.target.value || 0), 1, 1000000)), className: "\n                  mt-1 w-full\n                  bg-transparent rounded-md\n                  px-3 py-2 text-sm outline-none\n                ", style: {
                                                border: `1px solid ${TOKENS.hair}`,
                                                color: TOKENS.text,
                                                touchAction: "manipulation",
                                                minHeight: "40px",
                                            } })] }) })] }), _jsxs("div", { className: "mt-3 grid grid-cols-2 gap-3", children: [_jsx(Row, { k: "Route state", v: state === "IDLE" ? "Idle" : state.replace("_", " ") }), _jsx(Row, { k: "Quoted receive", v: routeQuote ? fmtUSDC(routeQuote) : "—" })] }), _jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [state === "IDLE" && (_jsx("button", { onClick: findRoute, className: "\n                px-4 py-2\n                rounded-md text-sm font-medium\n              ", style: {
                                    color: "#fff",
                                    background: TOKENS.blue,
                                    border: `1px solid ${TOKENS.blue}`,
                                    touchAction: "manipulation",
                                    minHeight: "40px",
                                }, children: "Find route" })), state === "ROUTING" && _jsx(Chip, { tone: "warn", children: "Finding best path\u2026" }), state === "ROUTE_FOUND" && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: accept, className: "\n                  px-3 py-2\n                  rounded-md text-sm font-medium\n                ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.sub,
                                            background: "transparent",
                                            touchAction: "manipulation",
                                            minHeight: "40px",
                                        }, children: "accept()" }), _jsx("button", { onClick: refund, className: "\n                  px-3 py-2\n                  rounded-md text-sm font-medium\n                ", style: {
                                            border: `1px solid ${TOKENS.bad}`,
                                            color: TOKENS.bad,
                                            background: "transparent",
                                            touchAction: "manipulation",
                                            minHeight: "40px",
                                        }, children: "refund()" })] })), state === "FAILED" && (_jsxs(_Fragment, { children: [_jsx(Chip, { tone: "bad", children: "No safe path found" }), _jsx("button", { onClick: refund, className: "\n                  px-3 py-2\n                  rounded-md text-sm font-medium\n                ", style: {
                                            border: `1px solid ${TOKENS.hair}`,
                                            color: TOKENS.sub,
                                            background: "transparent",
                                            touchAction: "manipulation",
                                            minHeight: "40px",
                                        }, children: "Refund to payer" })] })), (state === "ACCEPTED" || state === "REFUNDED") && (_jsx("button", { onClick: reset, className: "\n                px-3 py-2\n                rounded-md text-sm font-medium\n              ", style: {
                                    border: `1px solid ${TOKENS.hair}`,
                                    color: TOKENS.sub,
                                    background: "transparent",
                                    touchAction: "manipulation",
                                    minHeight: "40px",
                                }, children: "New inPay" }))] }), _jsx("div", { className: "mt-3 text-[11px] hidden sm:block", style: { color: TOKENS.mute }, children: "v0 scope: USDC\u2192USDC on Base with explicit accept(). On failure or reject, refund() returns funds to payer. Routes use private lanes when available." }), _jsx("div", { className: "mt-3 text-[11px] sm:hidden", style: { color: TOKENS.mute }, children: "v0: USDC\u2192USDC on Base with accept(). If a route fails or is declined, refund() sends funds back." })] }), _jsx(SectionCard, { title: "Route & Receipt", children: state === "ROUTE_FOUND" ? (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx(Chip, { children: "Path found" }), _jsx(Chip, { tone: "warn", children: "Pending accept()" })] }), _jsx(Divider, {}), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(Row, { k: "From", v: `${fromToken} on ${fromChain}` }), _jsx(Row, { k: "To", v: `${toToken} on ${toChain}` }), _jsx(Row, { k: "Amount", v: fmtUSDC(amount) }), _jsx(Row, { k: "Quoted receive", v: routeQuote ? fmtUSDC(routeQuote) : "—" })] }), _jsx(Divider, {}), _jsx("div", { className: "text-[11px]", style: { color: TOKENS.mute }, children: "Funds are locked as a receipt until accept(). If not accepted in time, refund() is available." })] })) : state === "ACCEPTED" ? (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "flex flex-wrap items-center gap-2", children: _jsx(Chip, { tone: "good", children: "Settled" }) }), _jsx(Divider, {}), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(Row, { k: "From", v: `${fromToken} on ${fromChain}` }), _jsx(Row, { k: "To", v: `${toToken} on ${toChain}` }), _jsx(Row, { k: "You receive", v: routeQuote ? fmtUSDC(routeQuote) : "—" })] })] })) : state === "REFUNDED" ? (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "flex flex-wrap items-center gap-2", children: _jsx(Chip, { tone: "bad", children: "Refunded" }) }), _jsx(Divider, {}), _jsx("div", { className: "text-sm", style: { color: TOKENS.mute }, children: "Route failed or recipient declined. Funds returned to payer." })] })) : state === "FAILED" ? (_jsx("div", { className: "text-sm", style: { color: TOKENS.mute }, children: "No viable path for the current selection. Try another chain/token pair." })) : (_jsx("div", { className: "text-sm", style: { color: TOKENS.mute }, children: "Find a route to view the receipt." })) })] }));
}
function SelectRow({ label, value, setValue, options, }) {
    return (_jsxs("label", { className: "text-[11px] sm:text-xs", style: { color: TOKENS.sub }, children: [label, _jsx("select", { value: value, onChange: (e) => setValue(e.target.value), className: "\n          mt-1 w-full\n          bg-transparent rounded-md\n          px-3 py-2 text-sm outline-none\n        ", style: {
                    border: `1px solid ${TOKENS.hair}`,
                    color: TOKENS.text,
                    touchAction: "manipulation",
                    minHeight: "44px",
                }, children: options.map((o) => (_jsx("option", { value: o, style: { background: "#000", color: TOKENS.text }, children: o }, o))) })] }));
}
/* ------------------------------ helpers --------------------------------- */
function genAuthCode() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for (let i = 0; i < 6; i++) {
        s += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return s;
}
