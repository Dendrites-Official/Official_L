"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  TOKENS, Chip, Row, SectionCard, Divider,
  clamp, fmtUSDC, isAddr, isENS, addrHint, short,
  buildPayCode, PayCodeBlock
} from "./paymentsShared";

/* ------------------------------- Section -------------------------------- */
type TabKey = "ack" | "inpay";

export default function PaymentsAckInPay() {
  const [tab, setTab] = useState<TabKey>("ack");

  return (
    <section style={{ color: TOKENS.text }}>
      <div
        className="
          mx-auto max-w-[1240px]
          px-4 sm:px-6 md:px-10
          pt-10 pb-12
          sm:pt-14 sm:pb-16
          md:pt-20 md:pb-24
        "
      >
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div
            className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase"
            style={{ color: TOKENS.sub }}
          >
            Features · AckPay & inPay
          </div>
          <h2 className="mt-2 text-[24px] sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            AckPay requests & Any-to-Any inPay
          </h2>
          <p
            className="mt-2 sm:mt-3 text-[13px] sm:text-base md:text-lg max-w-3xl"
            style={{ color: TOKENS.sub }}
          >
            AckPay: payments land as{" "}
            <strong style={{ color: TOKENS.text }}>PENDING</strong> and need the recipient to{" "}
            <strong style={{ color: TOKENS.text }}>accept()</strong>, else auto-refund.
            inPay: pay in X on chain A, recipient receives Y on chain B; funds lock as an on-chain
            receipt until accept().
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 sm:mb-7">
          <div
            className="
              inline-flex w-full sm:w-auto
              rounded-xl p-0.5
            "
            style={{ border: `1px solid ${TOKENS.hair}` }}
          >
            {(["ack", "inpay"] as TabKey[]).map((t) => {
              const isActive = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="
                    flex-1 sm:flex-none
                    px-4 py-2
                    text-xs sm:text-sm
                    rounded-[10px]
                    font-medium
                    transition-colors
                  "
                  style={{
                    color: isActive ? TOKENS.text : TOKENS.sub,
                    background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                    border: `1px solid ${isActive ? TOKENS.hair : "transparent"}`,
                    touchAction: "manipulation",
                    minHeight: "38px",
                  }}
                >
                  {t === "ack" ? "AckPay" : "inPay"}
                </button>
              );
            })}
          </div>
        </div>

        {tab === "ack" ? <AckPayWithRequest /> : <InPaySimulator />}
      </div>
    </section>
  );
}

/* ---------------------------- AckPay + Request -------------------------- */
type AckState = "IDLE" | "PENDING" | "ACCEPTED" | "REFUNDED";

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
    const extra: Record<string, any> = { window: windowSecs, memo };
    if (requireAuth) extra.auth = authCode;
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
  const [state, setState] = useState<AckState>("IDLE");
  const [seconds, setSeconds] = useState(windowSecs);

  useEffect(() => {
    if (state !== "PENDING") return;
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

  return (
    <div
      className="
        grid md:grid-cols-2
        items-start
        gap-6 sm:gap-8 md:gap-12
      "
    >
      {/* Request Builder */}
      <SectionCard
        title="AckPay — Create a Shareable Request"
        right={<Chip>Pending until accept()</Chip>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <label className="text-[11px] sm:text-xs" style={{ color: TOKENS.sub }}>
            Your receiving wallet (address / ENS)
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={addrHint}
              className="
                mt-1 w-full
                bg-transparent rounded-md
                px-3 py-2 text-sm outline-none
              "
              style={{
                border: `1px solid ${invalidRecipient ? TOKENS.bad : TOKENS.hair}`,
                color: TOKENS.text,
                touchAction: "manipulation",
                minHeight: "44px",
              }}
            />
            {invalidRecipient && (
              <span
                className="mt-1 block text-[10px] sm:text-[11px]"
                style={{ color: TOKENS.bad }}
              >
                Enter a valid address or ENS.
              </span>
            )}
          </label>

          <label className="text-[11px] sm:text-xs" style={{ color: TOKENS.sub }}>
            Amount (USDC)
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) =>
                setAmount(clamp(Number(e.target.value || 0), 1, 1_000_000))
              }
              className="
                mt-1 w-full
                bg-transparent rounded-md
                px-3 py-2 text-sm outline-none
              "
              style={{
                border: `1px solid ${TOKENS.hair}`,
                color: TOKENS.text,
                touchAction: "manipulation",
                minHeight: "44px",
              }}
            />
          </label>

          <label className="text-[11px] sm:text-xs" style={{ color: TOKENS.sub }}>
            Accept window (secs)
            <input
              type="number"
              min={30}
              value={windowSecs}
              onChange={(e) =>
                setWindowSecs(clamp(Number(e.target.value || 0), 30, 60 * 60))
              }
              className="
                mt-1 w-full
                bg-transparent rounded-md
                px-3 py-2 text-sm outline-none
              "
              style={{
                border: `1px solid ${TOKENS.hair}`,
                color: TOKENS.text,
                touchAction: "manipulation",
                minHeight: "44px",
              }}
            />
          </label>

          <label className="text-[11px] sm:text-xs" style={{ color: TOKENS.sub }}>
            Memo (optional)
            <input
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="What is this for?"
              className="
                mt-1 w-full
                bg-transparent rounded-md
                px-3 py-2 text-sm outline-none
              "
              style={{
                border: `1px solid ${TOKENS.hair}`,
                color: TOKENS.text,
                touchAction: "manipulation",
                minHeight: "44px",
              }}
            />
          </label>

          <label
            className="
              text-[11px] sm:text-xs sm:col-span-2
              flex flex-col sm:flex-row
              items-start sm:items-center
              justify-between
              gap-2 sm:gap-3
              rounded-md px-3 py-2
            "
            style={{ border: `1px solid ${TOKENS.hair}`, touchAction: "manipulation" }}
          >
            <span>
              <span
                className="font-medium"
                style={{ color: TOKENS.text }}
              >
                Require Auth Code
              </span>
              <span
                className="ml-0 sm:ml-2 block sm:inline text-[10px] sm:text-xs"
                style={{ color: TOKENS.mute }}
              >
                Payer must enter a code for the link to work
              </span>
            </span>
            <input
              type="checkbox"
              checked={requireAuth}
              onChange={(e) => setRequireAuth(e.target.checked)}
              className="h-5 w-5 mt-1 sm:mt-0"
              style={{
                accentColor: TOKENS.blue,
                minWidth: "24px",
                minHeight: "24px",
                touchAction: "manipulation",
              }}
            />
          </label>

          {requireAuth && (
            <label
              className="text-[11px] sm:text-xs sm:col-span-2"
              style={{ color: TOKENS.sub }}
            >
              Auth code (share separately or out-of-band)
              <div
                className="
                  mt-1
                  flex flex-col sm:flex-row
                  gap-2 sm:items-center
                "
              >
                <input
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value.toUpperCase())}
                  className="
                    w-full
                    bg-transparent rounded-md
                    px-3 py-2 text-sm outline-none
                  "
                  style={{
                    border: `1px solid ${TOKENS.hair}`,
                    color: TOKENS.text,
                    minHeight: "44px",
                    letterSpacing: "0.08em",
                  }}
                />
                <button
                  onClick={() => setAuthCode(genAuthCode())}
                  className="
                    px-3 py-2
                    rounded-md text-sm font-medium
                  "
                  style={{
                    border: `1px solid ${TOKENS.hair}`,
                    color: TOKENS.sub,
                    background: "transparent",
                    minHeight: "40px",
                    touchAction: "manipulation",
                  }}
                >
                  New
                </button>
              </div>
              <span
                className="mt-1 block text-[10px] sm:text-[11px]"
                style={{ color: TOKENS.mute }}
              >
                Demo only — in production, validate the code server-side or with EIP-712
                signed payloads.
              </span>
            </label>
          )}
        </div>

        <div className="mt-4 max-h-[260px] sm:max-h-none overflow-auto pr-1">
          <PayCodeBlock
            title="AckPay Request — Share this"
            dndxLink={ackRequest.dndxLink}
            eip681={ackRequest.eip681}
            verdict={ackRequest.assessment.verdict as any}
            score={ackRequest.assessment.score}
            reasons={ackRequest.assessment.reasons}
          />
        </div>

        {/* Long explanation only on sm+; shorter copy on tiny screens */}
        <div
          className="mt-2 text-[11px] hidden sm:block"
          style={{ color: TOKENS.mute }}
        >
          Flow: payer opens the link → enters the (optional) auth code → sends funds → they land as{" "}
          <strong style={{ color: TOKENS.text }}>PENDING</strong>. You must{" "}
          <strong style={{ color: TOKENS.text }}>accept()</strong> before the window
          expires, else auto-refund.
        </div>
        <div
          className="mt-2 text-[11px] sm:hidden"
          style={{ color: TOKENS.mute }}
        >
          Funds land as <strong style={{ color: TOKENS.text }}>PENDING</strong>. You call{" "}
          <strong style={{ color: TOKENS.text }}>accept()</strong> before the timer ends,
          or it auto-refunds.
        </div>
      </SectionCard>

      {/* Live mini to illustrate pending→accept/refund */}
      <SectionCard title="AckPay — Live Demo">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm" style={{ color: TOKENS.sub }}>
            Status:{" "}
            <span className="font-medium" style={{ color: TOKENS.text }}>
              {state === "IDLE" && "Ready"}
              {state === "PENDING" && "Pending · awaiting recipient accept()"}
              {state === "ACCEPTED" && "Accepted · settled"}
              {state === "REFUNDED" && "Auto-refunded"}
            </span>
          </div>
          <Chip
            tone={
              state === "PENDING"
                ? "warn"
                : state === "ACCEPTED"
                ? "good"
                : state === "REFUNDED"
                ? "bad"
                : "neutral"
            }
          >
            {state === "PENDING"
              ? "Pending"
              : state === "ACCEPTED"
              ? "Accepted"
              : state === "REFUNDED"
              ? "Refunded"
              : "Idle"}
          </Chip>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Row k="Recipient" v={short(recipient)} />
          <Row k="Amount" v={fmtUSDC(amount)} />
          <Row
            k="Accept window"
            v={
              state === "PENDING"
                ? `${seconds}s left`
                : `${windowSecs}s`
            }
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {state === "IDLE" && (
            <button
              onClick={simulateIncoming}
              className="
                px-4 py-2
                rounded-md text-sm font-medium
              "
              style={{
                color: "#fff",
                background: TOKENS.blue,
                border: `1px solid ${TOKENS.blue}`,
                minHeight: "44px",
                touchAction: "manipulation",
              }}
            >
              Simulate payer sent funds → PENDING
            </button>
          )}
          {state === "PENDING" && (
            <>
              <button
                onClick={() => setState("ACCEPTED")}
                className="
                  px-3 py-2
                  rounded-md text-sm font-medium
                "
                style={{
                  border: `1px solid ${TOKENS.hair}`,
                  color: TOKENS.sub,
                  background: "transparent",
                  minHeight: "44px",
                  touchAction: "manipulation",
                }}
              >
                accept()
              </button>
              <button
                onClick={() => setState("REFUNDED")}
                className="
                  px-3 py-2
                  rounded-md text-sm font-medium
                "
                style={{
                  border: `1px solid ${TOKENS.bad}`,
                  color: TOKENS.bad,
                  background: "transparent",
                  minHeight: "44px",
                  touchAction: "manipulation",
                }}
              >
                refund()
              </button>
            </>
          )}
          {(state === "ACCEPTED" || state === "REFUNDED") && (
            <button
              onClick={() => setState("IDLE")}
              className="
                px-3 py-2
                rounded-md text-sm font-medium
              "
              style={{
                border: `1px solid ${TOKENS.hair}`,
                color: TOKENS.sub,
                background: "transparent",
                minHeight: "44px",
                touchAction: "manipulation",
              }}
            >
              Reset
            </button>
          )}
        </div>
      </SectionCard>
    </div>
  );
}

/* ------------------------------- inPay ---------------------------------- */
type RouteState =
  | "IDLE"
  | "ROUTING"
  | "ROUTE_FOUND"
  | "FAILED"
  | "ACCEPTED"
  | "REFUNDED";

const CHAINS = ["Base", "Ethereum", "Arbitrum", "Polygon"] as const;
const TOKS = ["USDC", "USDT", "DAI"] as const;

function InPaySimulator() {
  const [fromChain, setFromChain] = useState<(typeof CHAINS)[number]>("Base");
  const [toChain, setToChain] = useState<(typeof CHAINS)[number]>("Base");
  const [fromToken, setFromToken] = useState<(typeof TOKS)[number]>("USDC");
  const [toToken, setToToken] = useState<(typeof TOKS)[number]>("USDC");
  const [amount, setAmount] = useState(120);
  const [state, setState] = useState<RouteState>("IDLE");
  const [routeQuote, setRouteQuote] = useState<number | null>(null);

  function findRoute() {
    setState("ROUTING");
    setRouteQuote(null);
    setTimeout(() => {
      const fail =
        (fromChain === "Ethereum" && toChain === "Polygon" && amount < 10) ||
        (fromToken !== "USDC" && toToken === "USDC" && amount < 5);

      if (fail) {
        setState("FAILED");
      } else {
        const slip = Math.max(0, Math.min(0.8, amount * 0.001));
        setRouteQuote(Math.max(1, amount - slip));
        setState("ROUTE_FOUND");
      }
    }, 900);
  }

  function accept() {
    if (state === "ROUTE_FOUND") setState("ACCEPTED");
  }

  function refund() {
    if (state === "FAILED" || state === "ROUTE_FOUND") setState("REFUNDED");
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

  return (
    <div
      className="
        grid md:grid-cols-2
        items-start
        gap-5 sm:gap-7 md:gap-12
      "
    >
      {/* LEFT: compact form */}
      <SectionCard
        title="inPay · Any-to-Any with Receipt Lock"
        right={<Chip>USDC→USDC on Base (v0 scope)</Chip>}
      >
        {/* 2×2 grid at ALL widths to match your screenshot */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* chains */}
          <div className="col-span-2 sm:col-span-1">
            <SelectRow
              label="From chain"
              value={fromChain}
              setValue={setFromChain}
              options={CHAINS}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SelectRow
              label="To chain"
              value={toChain}
              setValue={setToChain}
              options={CHAINS}
            />
          </div>

          {/* tokens */}
          <div className="col-span-2 sm:col-span-1">
            <SelectRow
              label="From token"
              value={fromToken}
              setValue={setFromToken}
              options={TOKS}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <SelectRow
              label="To token"
              value={toToken}
              setValue={setToToken}
              options={TOKS}
            />
          </div>

          {/* amount – full row */}
          <div className="col-span-2">
            <label
              className="text-[11px] sm:text-xs"
              style={{ color: TOKENS.sub }}
            >
              Amount (from)
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e) =>
                  setAmount(
                    clamp(Number(e.target.value || 0), 1, 1_000_000)
                  )
                }
                className="
                  mt-1 w-full
                  bg-transparent rounded-md
                  px-3 py-2 text-sm outline-none
                "
                style={{
                  border: `1px solid ${TOKENS.hair}`,
                  color: TOKENS.text,
                  touchAction: "manipulation",
                  minHeight: "40px",
                }}
              />
            </label>
          </div>
        </div>

        {/* route summary row */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Row
            k="Route state"
            v={state === "IDLE" ? "Idle" : state.replace("_", " ")}
          />
          <Row
            k="Quoted receive"
            v={routeQuote ? fmtUSDC(routeQuote) : "—"}
          />
        </div>

        {/* actions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {state === "IDLE" && (
            <button
              onClick={findRoute}
              className="
                px-4 py-2
                rounded-md text-sm font-medium
              "
              style={{
                color: "#fff",
                background: TOKENS.blue,
                border: `1px solid ${TOKENS.blue}`,
                touchAction: "manipulation",
                minHeight: "40px",
              }}
            >
              Find route
            </button>
          )}

          {state === "ROUTING" && <Chip tone="warn">Finding best path…</Chip>}

          {state === "ROUTE_FOUND" && (
            <>
              <button
                onClick={accept}
                className="
                  px-3 py-2
                  rounded-md text-sm font-medium
                "
                style={{
                  border: `1px solid ${TOKENS.hair}`,
                  color: TOKENS.sub,
                  background: "transparent",
                  touchAction: "manipulation",
                  minHeight: "40px",
                }}
              >
                accept()
              </button>
              <button
                onClick={refund}
                className="
                  px-3 py-2
                  rounded-md text-sm font-medium
                "
                style={{
                  border: `1px solid ${TOKENS.bad}`,
                  color: TOKENS.bad,
                  background: "transparent",
                  touchAction: "manipulation",
                  minHeight: "40px",
                }}
              >
                refund()
              </button>
            </>
          )}

          {state === "FAILED" && (
            <>
              <Chip tone="bad">No safe path found</Chip>
              <button
                onClick={refund}
                className="
                  px-3 py-2
                  rounded-md text-sm font-medium
                "
                style={{
                  border: `1px solid ${TOKENS.hair}`,
                  color: TOKENS.sub,
                  background: "transparent",
                  touchAction: "manipulation",
                  minHeight: "40px",
                }}
              >
                Refund to payer
              </button>
            </>
          )}

          {(state === "ACCEPTED" || state === "REFUNDED") && (
            <button
              onClick={reset}
              className="
                px-3 py-2
                rounded-md text-sm font-medium
              "
              style={{
                border: `1px solid ${TOKENS.hair}`,
                color: TOKENS.sub,
                background: "transparent",
                touchAction: "manipulation",
                minHeight: "40px",
              }}
            >
              New inPay
            </button>
          )}
        </div>

        {/* descriptive copy – full on tablet/desktop, shorter on tiny phones */}
        <div
          className="mt-3 text-[11px] hidden sm:block"
          style={{ color: TOKENS.mute }}
        >
          v0 scope: USDC→USDC on Base with explicit accept(). On failure or
          reject, refund() returns funds to payer. Routes use private lanes when
          available.
        </div>
        <div
          className="mt-3 text-[11px] sm:hidden"
          style={{ color: TOKENS.mute }}
        >
          v0: USDC→USDC on Base with accept(). If a route fails or is declined,
          refund() sends funds back.
        </div>
      </SectionCard>

      {/* RIGHT: receipt card (unchanged, already compact) */}
      <SectionCard title="Route & Receipt">
        {state === "ROUTE_FOUND" ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>Path found</Chip>
              <Chip tone="warn">Pending accept()</Chip>
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-2">
              <Row k="From" v={`${fromToken} on ${fromChain}`} />
              <Row k="To" v={`${toToken} on ${toChain}`} />
              <Row k="Amount" v={fmtUSDC(amount)} />
              <Row
                k="Quoted receive"
                v={routeQuote ? fmtUSDC(routeQuote) : "—"}
              />
            </div>
            <Divider />
            <div className="text-[11px]" style={{ color: TOKENS.mute }}>
              Funds are locked as a receipt until accept(). If not accepted in
              time, refund() is available.
            </div>
          </div>
        ) : state === "ACCEPTED" ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="good">Settled</Chip>
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-2">
              <Row k="From" v={`${fromToken} on ${fromChain}`} />
              <Row k="To" v={`${toToken} on ${toChain}`} />
              <Row
                k="You receive"
                v={routeQuote ? fmtUSDC(routeQuote) : "—"}
              />
            </div>
          </div>
        ) : state === "REFUNDED" ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="bad">Refunded</Chip>
            </div>
            <Divider />
            <div className="text-sm" style={{ color: TOKENS.mute }}>
              Route failed or recipient declined. Funds returned to payer.
            </div>
          </div>
        ) : state === "FAILED" ? (
          <div className="text-sm" style={{ color: TOKENS.mute }}>
            No viable path for the current selection. Try another
            chain/token pair.
          </div>
        ) : (
          <div className="text-sm" style={{ color: TOKENS.mute }}>
            Find a route to view the receipt.
          </div>
        )}
      </SectionCard>
    </div>
  );
}



function SelectRow<T extends string>({
  label,
  value,
  setValue,
  options,
}: {
  label: string;
  value: T;
  setValue: (v: T) => void;
  options: readonly T[];
}) {
  return (
    <label className="text-[11px] sm:text-xs" style={{ color: TOKENS.sub }}>
      {label}
      <select
        value={value}
        onChange={(e) => setValue(e.target.value as T)}
        className="
          mt-1 w-full
          bg-transparent rounded-md
          px-3 py-2 text-sm outline-none
        "
        style={{
          border: `1px solid ${TOKENS.hair}`,
          color: TOKENS.text,
          touchAction: "manipulation",
          minHeight: "44px",
        }}
      >
        {options.map((o) => (
          <option
            key={o}
            value={o}
            style={{ background: "#000", color: TOKENS.text }}
          >
            {o}
          </option>
        ))}
      </select>
    </label>
  );
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
