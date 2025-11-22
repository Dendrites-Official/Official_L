"use client";
import React, { useMemo, useState } from "react";
import {
  TOKENS, Chip, Row, SectionCard, Divider,
  clamp, fmtUSDC, isAddr, isENS, addrHint, short,
  buildPayCode, PayCodeBlock
} from "./paymentsShared";

/* ------------------------------- Section -------------------------------- */
type TabKey = "escrow" | "quick";

export default function PaymentsEscrowQuickPay() {
  const [tab, setTab] = useState<TabKey>("escrow");

  return (
    <section id="escrow-quickpay" style={{ color: TOKENS.text }}>
      <div
        className="
          mx-auto max-w-[1240px]
          px-4 sm:px-6 md:px-10
          pt-10 pb-12
          sm:pt-14 sm:pb-16
          md:pt-20 md:pb-24
        "
      >
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div
            className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase"
            style={{ color: TOKENS.sub }}
          >
            Features · Escrow & QuickPay
          </div>
          <h2 className="mt-2 text-[24px] sm:text-[28px] md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Escrow and QuickPay
          </h2>
          <p
            className="mt-2 sm:mt-3 text-[13px] sm:text-sm md:text-base max-w-2xl"
            style={{ color: TOKENS.sub }}
          >
            Trustable escrow with milestone control & refunds. Instant “card-swipe” crypto with flat,
            predictable fees and an UNDO window.
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
            {(["escrow", "quick"] as TabKey[]).map((t) => {
              const isActive = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`
                    flex-1 sm:flex-none
                    px-4 py-2
                    text-xs sm:text-sm
                    rounded-[10px]
                    font-medium
                    transition-colors
                  `}
                  style={{
                    color: isActive ? TOKENS.text : TOKENS.sub,
                    background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                    border: `1px solid ${isActive ? TOKENS.hair : "transparent"}`,
                    touchAction: "manipulation",
                    minHeight: "38px",
                  }}
                >
                  {t === "escrow" ? "Escrow" : "QuickPay"}
                </button>
              );
            })}
          </div>
        </div>

        {tab === "escrow" ? <EscrowSimulator /> : <QuickPaySimulator />}
      </div>
    </section>
  );
}

/* ---------------------------- Escrow Simulator -------------------------- */
type EscrowState = "INIT" | "FUNDED" | "PARTIAL_RELEASE" | "FULL_RELEASE" | "REFUNDED";

function EscrowSimulator() {
  const [payer, setPayer] = useState("");
  const [payee, setPayee] = useState("studio.partner.eth");
  const [verifier, setVerifier] = useState("");
  const [amount, setAmount] = useState(1200);
  const [timeout, setTimeoutSecs] = useState(72 * 3600);
  const [state, setState] = useState<EscrowState>("INIT");
  const [released, setReleased] = useState(0);
  const [milestones, setMilestones] = useState<
    { id: string; label: string; amount: number; done: boolean }[]
  >([]);
  const [log, setLog] = useState<string[]>([]);

  const remaining = Math.max(0, amount - released);
  const canFund =
    state === "INIT" &&
    amount > 0 &&
    payer.trim() &&
    payee.trim() &&
    (isAddr(payer) || isENS(payer)) &&
    (isAddr(payee) || isENS(payee));

  function logPush(s: string) {
    setLog((prev) => [`• ${new Date().toLocaleTimeString()} — ${s}`, ...prev].slice(0, 60));
  }

  function handleFund() {
    if (!canFund) return;
    setState("FUNDED");
    logPush(
      `Escrow funded by ${short(payer)}: ${fmtUSDC(amount)} → ${short(payee)}${
        verifier ? ` (verifier: ${short(verifier)})` : ""
      }`
    );
  }

  function handleAddMilestone() {
    const left = remaining;
    if (left <= 0) return;
    const chunk = Math.max(1, Math.round(left / 2));
    const id = Math.random().toString(36).slice(2, 7).toUpperCase();
    setMilestones((m) => [
      ...m,
      { id, label: `Milestone ${m.length + 1}`, amount: chunk, done: false },
    ]);
    logPush(`Milestone added: ${fmtUSDC(chunk)}`);
  }

  function handleRelease() {
    if (!(state === "FUNDED" && remaining > 0)) return;
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
      } else {
        setState("PARTIAL_RELEASE");
      }
    } else {
      setReleased(amount);
      setState("FULL_RELEASE");
      logPush(`Released in full: ${fmtUSDC(amount)}`);
    }
  }

  function handleRefund() {
    if (!(state === "FUNDED" && remaining > 0)) return;
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

  return (
    <div
      className="
        grid md:grid-cols-2
        items-start
        gap-6 sm:gap-7 md:gap-10
      "
    >
      {/* Left: main escrow form */}
      <SectionCard
        title="APP Escrow · Milestones & Refund"
        right={<Chip>Timeout + optional verifier</Chip>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-[11px] sm:text-xs" style={{ color: TOKENS.sub }}>
            Payer (your wallet)
            <input
              value={payer}
              onChange={(e) => setPayer(e.target.value)}
              placeholder={addrHint}
              className="
                mt-1 w-full
                bg-transparent rounded-md
                px-3 py-2 text-sm outline-none
              "
              style={{
                border: `1px solid ${invalidPayer ? TOKENS.bad : TOKENS.hair}`,
                color: TOKENS.text,
                touchAction: "manipulation",
                minHeight: "40px",
              }}
            />
            {invalidPayer && (
              <span
                className="mt-1 block text-[10px] sm:text-[11px]"
                style={{ color: TOKENS.bad }}
              >
                Enter a valid address or ENS.
              </span>
            )}
          </label>

          <label className="text-[11px] sm:text-xs" style={{ color: TOKENS.sub }}>
            Payee (address / ENS)
            <input
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
              placeholder={addrHint}
              className="
                mt-1 w-full
                bg-transparent rounded-md
                px-3 py-2 text-sm outline-none
              "
              style={{
                border: `1px solid ${invalidPayee ? TOKENS.bad : TOKENS.hair}`,
                color: TOKENS.text,
                touchAction: "manipulation",
                minHeight: "40px",
              }}
            />
            {invalidPayee && (
              <span
                className="mt-1 block text-[10px] sm:text-[11px]"
                style={{ color: TOKENS.bad }}
              >
                Enter a valid address or ENS.
              </span>
            )}
          </label>

          <label className="text-[11px] sm:text-xs" style={{ color: TOKENS.sub }}>
            Optional verifier
            <input
              value={verifier}
              onChange={(e) => setVerifier(e.target.value)}
              placeholder={addrHint}
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

          <label className="text-[11px] sm:text-xs" style={{ color: TOKENS.sub }}>
            Amount (USDC)
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) =>
                setAmount(clamp(Number(e.target.value || 0), 1, 10_000_000))
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

          <label className="text-[11px] sm:text-xs" style={{ color: TOKENS.sub }}>
            Timeout (secs)
            <input
              type="number"
              min={3600}
              value={timeout}
              onChange={(e) =>
                setTimeoutSecs(
                  clamp(Number(e.target.value || 0), 3600, 30 * 24 * 3600)
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

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Row k="State" v={<span>{state.replace(/_/g, " ")}</span>} />
          <Row k="Released" v={fmtUSDC(released)} />
          <Row k="Remaining" v={fmtUSDC(Math.max(0, amount - released))} />
          <Row k="Timeout" v={`${Math.round(timeout / 3600)}h`} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {state === "INIT" && (
            <button
              onClick={handleFund}
              disabled={!canFund}
              className="
                w-full sm:w-auto
                px-4 py-2.5
                rounded-md text-sm font-medium
                disabled:opacity-40
              "
              style={{
                color: "#fff",
                background: TOKENS.blue,
                border: `1px solid ${TOKENS.blue}`,
                touchAction: "manipulation",
              }}
            >
              Fund Escrow · {fmtUSDC(amount)}
            </button>
          )}
          {state !== "INIT" && state !== "FULL_RELEASE" && state !== "REFUNDED" && (
            <>
              <button
                onClick={handleAddMilestone}
                className="
                  flex-1 sm:flex-none
                  px-3 py-2.5
                  rounded-md text-sm font-medium
                "
                style={{
                  border: `1px solid ${TOKENS.hair}`,
                  color: TOKENS.sub,
                  background: "transparent",
                  touchAction: "manipulation",
                }}
              >
                Add milestone
              </button>
              <button
                onClick={handleRelease}
                className="
                  flex-1 sm:flex-none
                  px-3 py-2.5
                  rounded-md text-sm font-medium
                "
                style={{
                  border: `1px solid ${TOKENS.hair}`,
                  color: TOKENS.sub,
                  background: "transparent",
                  touchAction: "manipulation",
                }}
              >
                Release next
              </button>
              <button
                onClick={handleRefund}
                className="
                  w-full sm:w-auto
                  px-3 py-2.5
                  rounded-md text-sm font-medium
                "
                style={{
                  border: `1px solid ${TOKENS.bad}`,
                  color: TOKENS.bad,
                  background: "transparent",
                  touchAction: "manipulation",
                }}
              >
                Request refund
              </button>
            </>
          )}
          {(state === "FULL_RELEASE" || state === "REFUNDED") && (
            <button
              onClick={reset}
              className="
                w-full sm:w-auto
                px-3 py-2.5
                rounded-md text-sm font-medium
              "
              style={{
                border: `1px solid ${TOKENS.hair}`,
                color: TOKENS.sub,
                background: "transparent",
                touchAction: "manipulation",
              }}
            >
              New escrow
            </button>
          )}
        </div>
      </SectionCard>

      {/* Right: milestones + codes + log */}
      <div className="space-y-5 sm:space-y-6">
        <SectionCard title="Milestones">
          {milestones.length === 0 ? (
            <div className="text-sm" style={{ color: TOKENS.mute }}>
              No milestones yet. Add one to split releases.
            </div>
          ) : (
            <ul className="space-y-2">
              {milestones.map((m) => (
                <li
                  key={m.id}
                  className="
                    flex items-center justify-between
                    rounded-md px-3 py-2
                  "
                  style={{ border: `1px solid ${TOKENS.hair}` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: TOKENS.sub }}>
                      {m.label}
                    </span>
                    {m.done ? (
                      <Chip tone="good">Released</Chip>
                    ) : (
                      <Chip tone="warn">Pending</Chip>
                    )}
                  </div>
                  <div className="tabular-nums">{fmtUSDC(m.amount)}</div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        {/* PayCode – natural height on mobile */}
        <PayCodeBlock
          title="PayCode (demo)"
          dndxLink={escrowCode.dndxLink}
          eip681={escrowCode.eip681}
          verdict={escrowCode.assessment.verdict as any}
          score={escrowCode.assessment.score}
          reasons={escrowCode.assessment.reasons}
        />

        <SectionCard title="Event log">
          {log.length === 0 ? (
            <div className="text-sm" style={{ color: TOKENS.mute }}>
              Actions will appear here.
            </div>
          ) : (
            <ul
              className="space-y-1 text-[11px] sm:text-sm"
              style={{ color: TOKENS.sub }}
            >
              {log.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
    </div>
  );
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
    const j =
      Math.sin(Date.now() / 4000) * 0.015 +
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

  return (
    <div
      className="
        grid md:grid-cols-2
        items-start
        gap-6 sm:gap-7 md:gap-10
      "
    >
      {/* Left: quickpay form */}
      <SectionCard
        title="QuickPay · Instant Confirmation"
        right={<Chip>SafetySend (UNDO) supported</Chip>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                minHeight: "40px",
              }}
            />
          </label>

          <label className="text-[11px] sm:text-xs" style={{ color: TOKENS.sub }}>
            Payee (address / ENS)
            <input
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
              placeholder={addrHint}
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

          <label
            className="
              text-[11px] sm:text-xs
              flex flex-col sm:flex-row
              items-start sm:items-center
              justify-between gap-2 sm:gap-3
              rounded-md px-3 py-2
              md:col-span-2
            "
            style={{ border: `1px solid ${TOKENS.hair}`, touchAction: "manipulation" }}
          >
            <span>
              <span
                className="font-medium"
                style={{ color: TOKENS.text }}
              >
                SafetySend (UNDO)
              </span>
              <span
                className="ml-0 sm:ml-2 block sm:inline text-[10px] sm:text-xs"
                style={{ color: TOKENS.mute }}
              >
                3-minute window to cancel mistakes
              </span>
            </span>
            <input
              type="checkbox"
              checked={undo}
              onChange={(e) => setUndo(e.target.checked)}
              className="h-5 w-5 mt-1 sm:mt-0"
              style={{
                accentColor: TOKENS.blue,
                touchAction: "manipulation",
                minWidth: "24px",
                minHeight: "24px",
              }}
            />
          </label>
        </div>

        <div className="mt-4 space-y-1.5 sm:space-y-2">
          <Row
            k="Transaction fee (0.20%, min $0.05)"
            v={fmtUSDC(fees.transactionFee)}
          />
          <Row k="Gas fee" v={fmtUSDC(fees.gasFee)} />
          <Row k="User pays" v={fmtUSDC(fees.userPays)} />
          <Row k="Payee receives" v={fmtUSDC(fees.payeeReceives)} />
          {fees.slaCredit > 0 && (
            <Row
              k="SLA credit (demo)"
              v={
                <span className="text-emerald-300">
                  {fmtUSDC(fees.slaCredit)}
                </span>
              }
            />
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {fees.slaCredit > 0 ? (
            <Chip tone="good">SLA credit available</Chip>
          ) : (
            <Chip>Within SLA band</Chip>
          )}
          {undo ? (
            <Chip tone="warn">UNDO active (3 mins)</Chip>
          ) : (
            <Chip>UNDO off</Chip>
          )}
        </div>

        <div
          className="mt-4 text-[11px]"
          style={{ color: TOKENS.mute }}
        >
          Fees are{" "}
          <strong style={{ color: TOKENS.sub }}>illustrative</strong>. Users pay
          fees in <strong>USDC</strong>; no native gas token required. SLA credits
          are fee-offset only (non-transferable).
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {!showReceipt ? (
            <button
              onClick={handlePay}
              className="
                w-full sm:w-auto
                px-4 py-2.5
                rounded-md text-sm font-medium
              "
              style={{
                color: "#fff",
                background: TOKENS.blue,
                border: `1px solid ${TOKENS.blue}`,
                touchAction: "manipulation",
              }}
            >
              Pay now · {fmtUSDC(amount)}
            </button>
          ) : (
            <button
              onClick={reset}
              className="
                w-full sm:w-auto
                px-3 py-2.5
                rounded-md text-sm font-medium
              "
              style={{
                border: `1px solid ${TOKENS.hair}`,
                color: TOKENS.sub,
                background: "transparent",
                touchAction: "manipulation",
              }}
            >
              New QuickPay
            </button>
          )}
        </div>
      </SectionCard>

      {/* Right: receipt + paycode */}
      <div className="space-y-5 sm:space-y-6">
        <SectionCard title="Instant Receipt">
          {showReceipt ? (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="good">Confirmed</Chip>
                {undo ? (
                  <Chip tone="warn">UNDO active (3 mins)</Chip>
                ) : (
                  <Chip>UNDO off</Chip>
                )}
                {fees.slaCredit > 0 && (
                  <Chip tone="good">
                    SLA credit {fmtUSDC(fees.slaCredit)}
                  </Chip>
                )}
              </div>
              <Divider />
              <div className="grid grid-cols-2 gap-2">
                <Row k="Amount" v={fmtUSDC(amount)} />
                <Row
                  k="Transaction fee"
                  v={fmtUSDC(fees.transactionFee)}
                />
                <Row k="Gas fee" v={fmtUSDC(fees.gasFee)} />
                <Row k="User pays" v={fmtUSDC(fees.userPays)} />
                <Row
                  k="Payee receives"
                  v={fmtUSDC(fees.payeeReceives)}
                />
              </div>
              <Divider />
              <div
                className="text-[10px] sm:text-[11px]"
                style={{ color: TOKENS.mute }}
              >
                Receipt is for demonstration only; values are not final quotes.
              </div>
            </div>
          ) : (
            <div className="text-sm" style={{ color: TOKENS.mute }}>
              Complete a QuickPay to see the receipt.
            </div>
          )}
        </SectionCard>

        {/* PayCode – natural height on mobile */}
        <PayCodeBlock
          title="QR / PayCode (demo)"
          dndxLink={quickCode.dndxLink}
          eip681={quickCode.eip681}
          verdict={quickCode.assessment.verdict as any}
          score={quickCode.assessment.score}
          reasons={quickCode.assessment.reasons}
        />
      </div>
    </div>
  );
}
