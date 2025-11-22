"use client";
import React, { useEffect, useRef } from "react";

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
export function Chip({
  tone = "neutral",
  children,
}: {
  tone?: "neutral" | "good" | "bad" | "warn";
  children: React.ReactNode;
}) {
  const stroke =
    tone === "good" ? TOKENS.ok : tone === "bad" ? TOKENS.bad : tone === "warn" ? TOKENS.warn : TOKENS.hair;
  const color =
    tone === "good" ? TOKENS.ok : tone === "bad" ? TOKENS.bad : tone === "warn" ? TOKENS.warn : TOKENS.sub;
  return (
    <span
      className="inline-flex items-center rounded-[8px] px-2.5 py-1 text-[12px]"
      style={{ border: `1px solid ${stroke}`, color }}
    >
      {children}
    </span>
  );
}

export function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span style={{ color: TOKENS.sub }}>{k}</span>
      <span className="tabular-nums" style={{ color: TOKENS.text }}>
        {v}
      </span>
    </div>
  );
}

export function SectionCard({
  title,
  right,
  children,
}: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl" style={{ border: `1px solid ${TOKENS.stroke}` }}>
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${TOKENS.hair}` }}
      >
        <div className="text-sm font-medium" style={{ color: TOKENS.text }}>
          {title}
        </div>
        {right}
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}

export function Divider() {
  return <div className="h-px w-full" style={{ background: TOKENS.hair }} />;
}

/* ----------------------------- utils ------------------------------------ */
export const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(n, b));
export const fmtUSDC = (n: number) =>
  n < 1 ? `$${n.toFixed(2)} USDC` : `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })} USDC`;

export const isAddr = (v: string) => /^0x[a-fA-F0-9]{40}$/.test(v.trim());
export const isENS = (v: string) => /\./.test(v.trim());
export const addrHint = "0x… or ENS (e.g., name.eth)";
export const short = (v: string) => {
  const s = v?.trim() || "";
  if (!s) return "";
  if (isENS(s)) return s;
  if (isAddr(s)) return `${s.slice(0, 6)}…${s.slice(-4)}`;
  return s;
};

/* ------------------------ PayCode + Risk (demo) ------------------------- */
export type PayCodeArgs = {
  flow: "quick" | "escrow" | "ack";
  chain: "Base";
  to: string; // destination / recipient
  token: "USDC";
  amount: number;
  undo?: boolean;
  extra?: Record<string, any>;
};

export function buildPayCode(args: PayCodeArgs) {
  const { flow, chain, to, token, amount, undo, extra } = args;
  const dndx = new URL("https://pay.dndx/"); // illustrative
  dndx.pathname = flow; // quick | escrow | ack
  dndx.searchParams.set("chain", chain.toLowerCase());
  dndx.searchParams.set("to", to);
  dndx.searchParams.set("token", token);
  dndx.searchParams.set("amount", String(amount));
  if (typeof undo !== "undefined") dndx.searchParams.set("undo", undo ? "1" : "0");
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

export function assessPayCodeRisk({
  link,
  to,
  amount,
  undo,
  chain,
}: {
  link: string;
  to: string;
  amount: number;
  undo: boolean;
  chain: string;
}) {
  let score = 100;
  const reasons: string[] = [];

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
  if (amount > 50_000) {
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
export function MockQR({ data, size = 128 }: { data: string; size?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
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
        if (bit) ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1);
      }
    }
  }, [data, size]);
  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      style={{ 
        width: size,
        height: size,
        borderRadius: 8, 
        border: `1px solid ${TOKENS.hair}`,
        display: 'block'
      }}
    />
  );
}

/* ------------------------------ Small UI -------------------------------- */
export function PayCodeBlock({
  title = "PayCode (demo)",
  dndxLink,
  eip681,
  verdict,
  score,
  reasons,
}: {
  title?: string;
  dndxLink: string;
  eip681: string;
  verdict: "Verified" | "Review" | "Risky";
  score: number;
  reasons: string[];
}) {
  const copy = (t: string) => navigator?.clipboard?.writeText(t).catch(() => {});
  const tone = verdict === "Verified" ? "good" : verdict === "Review" ? "warn" : "bad";

  return (
    <SectionCard title={title}>
      <div className="grid grid-cols-1 gap-6 items-start">
        {/* QR Code Section - Commented out temporarily */}
        {/* <div className="flex flex-col items-center md:items-start">
          <div className="text-xs mb-2" style={{ color: TOKENS.sub }}>
            QR Preview (demo)
          </div>
          <div
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              padding: 12,
              border: `1px solid ${TOKENS.hair}`, 
              background: "rgba(255,255,255,0.03)"
            }}
          >
            <MockQR data={dndxLink} size={140} />
          </div>
          <div className="mt-2 text-[11px] text-center md:text-left" style={{ color: TOKENS.mute, maxWidth: '164px' }}>
            Mock QR for preview only (not scannable).
          </div>
        </div> */}

        <div className="space-y-3">
          <div>
            <div className="text-xs mb-1" style={{ color: TOKENS.sub }}>
              DNDX PayCode
            </div>
            <code className="block overflow-x-auto rounded-md p-2 text-xs" style={{ border: `1px solid ${TOKENS.hair}`, color: TOKENS.text }}>
              {dndxLink}
            </code>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => copy(dndxLink)}
                className="px-3 py-1.5 rounded-md text-xs"
                style={{ border: `1px solid ${TOKENS.hair}`, color: TOKENS.sub, background: "transparent", minHeight: 36 }}
              >
                Copy PayCode
              </button>
            </div>
          </div>

          <div>
            <div className="text-xs mb-1" style={{ color: TOKENS.sub }}>
              EIP-681 (demo)
            </div>
            <code className="block overflow-x-auto rounded-md p-2 text-xs" style={{ border: `1px solid ${TOKENS.hair}`, color: TOKENS.text }}>
              {eip681}
            </code>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => copy(eip681)}
                className="px-3 py-1.5 rounded-md text-xs"
                style={{ border: `1px solid ${TOKENS.hair}`, color: TOKENS.sub, background: "transparent", minHeight: 36 }}
              >
                Copy EIP-681
              </button>
            </div>
          </div>

          <div className="pt-1">
            <div className="flex items-center justify-between">
              <div className="text-xs" style={{ color: TOKENS.sub }}>
                PayGuard assessment
              </div>
              <Chip tone={tone as any}>
                {verdict} • {score}/100
              </Chip>
            </div>
            {reasons.length > 0 && (
              <ul className="mt-2 list-disc pl-5 text-[12px]" style={{ color: TOKENS.mute }}>
                {reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
