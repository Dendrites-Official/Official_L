// src/components/TokenomicsSection.tsx
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const TOKEN_SUPPLY = 7_600_000_000;

type AllocationSlice = {
  id: string;
  label: string;
  percent: number;
  tokens: number;
  role: string;
  vesting: string;
};

const ALLOCATIONS: AllocationSlice[] = [
  {
    id: "sale-strategic",
    label: "Sale & Strategic",
    percent: 24,
    tokens: TOKEN_SUPPLY * 0.24,
    role: "Vested sale rounds and strategic partners that help Dendrites reach real users and merchants.",
    vesting:
      "All allocations vest; this bucket alone never creates a massive TGE unlock. Overall float stays around ~6–9%.",
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
    vesting:
      "Rewards are earned and then vest. No fully liquid 'everyone gets a free airdrop at TGE'.",
  },
  {
    id: "ecosystem",
    label: "Ecosystem & Partnerships",
    percent: 12,
    tokens: TOKEN_SUPPLY * 0.12,
    role: "Integrations, partners, and ecosystem growth (wallets, infra, merchants, L2s).",
    vesting:
      "Mostly 3–36-month vesting, often milestone-based for larger integrations.",
  },
  {
    id: "liquidity",
    label: "Liquidity",
    percent: 8,
    tokens: TOKEN_SUPPLY * 0.08,
    role: "DEX / CEX liquidity and market-maker programs so users can actually move in and out of DNDX.",
    vesting:
      "LP tokens locked 6–12 months; MM programs unlock against clear performance goals.",
  },
  {
    id: "treasury",
    label: "Treasury & Safety Reserves",
    percent: 16,
    tokens: TOKEN_SUPPLY * 0.16,
    role: "Runway, /SLA credit pool, audits, operations, and true emergencies.",
    vesting:
      "Governance-controlled. Slow, transparent unlocks with multi-sig protections.",
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

const formatNumber = (value: number) =>
  value.toLocaleString("en-US", { maximumFractionDigits: 0 });

const TokenomicsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlice = ALLOCATIONS[activeIndex];

  return (
    <section
      id="tokenomics"
      className="scroll-mt-24 lg:scroll-mt-28 border-t border-neutral-900 bg-black text-neutral-100"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="flex flex-col gap-6 md:gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neutral-500">
              <span className="h-px w-8 bg-neutral-700" />
              DNDX · Tokenomics
            </div>
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl lg:text-[2.4rem]">
              A fixed 7.6B supply,
              <span className="block text-neutral-300">
                aligned with real on-chain usage.
              </span>
            </h2>
            <p className="text-[13px] leading-relaxed text-neutral-400 md:text-sm">
              DNDX is the economic backbone of Dendrites: Predictable Gas™, /SLA
              credits, SafetySend (UNDO), APP Escrow, and future governance.
              Supply is capped, inflation is 0%, and the early float is kept
              deliberately thin (~6–9% at TGE) so the protocol can grow without
              turning into a farm-and-dump.
            </p>
            <p className="text-[11px] leading-relaxed text-neutral-500">
              This Tokenomics overview is{" "}
              <span className="font-medium">Version 1.0</span> and may evolve
              before Presale 1. When in doubt, trust the latest PDFs published
              in <span className="font-medium text-neutral-300">/docs</span>.
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-3 text-[11px] text-neutral-400 lg:flex-col lg:items-end">
            <div className="rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1 uppercase tracking-[0.22em]">
              7,600,000,000 DNDX · 0% inflation
            </div>
            <div className="flex gap-6">
              <div className="space-y-0.5">
                <div className="text-neutral-500">TGE float</div>
                <div className="font-mono text-neutral-100">~6–9%</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-neutral-500">Status</div>
                <div className="font-mono text-neutral-100">Pre-presale</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main grid: chart + details */}
        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          {/* Chart (top on mobile) */}
          <div className="order-1 space-y-5 lg:order-none">
            <div className="flex items-center justify-between text-[11px] text-neutral-500">
              <span>Supply allocation</span>
              <span className="hidden items-center gap-2 sm:flex">
                <span className="h-px w-10 bg-neutral-700" />
                100% = 7.6B DNDX
              </span>
            </div>

            <div className="relative aspect-square w-full sm:aspect-[4/3]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ALLOCATIONS}
                    dataKey="percent"
                    nameKey="label"
                    innerRadius="55%"
                    outerRadius="92%"
                    paddingAngle={2}
                    stroke="#020617"
                    strokeWidth={1}
                    isAnimationActive={false}
                    onMouseEnter={(_, index: number) => setActiveIndex(index)}
                  >
                    {ALLOCATIONS.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                        fillOpacity={index === activeIndex ? 1 : 0.35}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Active slice explanation */}
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950/80 px-4 py-4 text-xs sm:px-5 sm:text-[13px]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                    Focus
                  </div>
                  <div className="mt-1 text-sm font-medium text-neutral-100">
                    {activeSlice.label}
                  </div>
                </div>
                <div className="flex gap-5 text-[11px] sm:text-xs">
                  <div>
                    <div className="text-neutral-500">Share</div>
                    <div className="font-mono text-neutral-100">
                      {activeSlice.percent}%
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-500">Tokens</div>
                    <div className="font-mono text-neutral-100">
                      {formatNumber(activeSlice.tokens)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 grid gap-3 text-[11px] text-neutral-400 sm:grid-cols-2">
                <div>
                  <div className="text-neutral-500">Role</div>
                  <p className="mt-1 leading-relaxed">{activeSlice.role}</p>
                </div>
                <div>
                  <div className="text-neutral-500">Vesting</div>
                  <p className="mt-1 leading-relaxed">{activeSlice.vesting}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legend / principles */}
          <div className="space-y-6">
            <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
              Breakdown
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950/60">
              {ALLOCATIONS.map((slice, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={slice.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className={`flex w-full items-start gap-4 px-3 py-3 text-left text-[11px] transition-colors sm:px-5 sm:py-4 ${
                      isActive
                        ? "bg-white/[0.03]"
                        : "hover:bg-white/[0.02] focus-visible:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex flex-col items-center pt-1 text-[11px] text-neutral-500">
                      <span
                        className="mb-2 h-2 w-2 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="font-mono text-[11px] text-neutral-300">
                        {slice.percent}%
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xs font-medium text-neutral-100">
                          {slice.label}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-500 sm:text-[11px]">
                          {formatNumber(slice.tokens)}{" "}
                          <span className="text-[9px]">DNDX</span>
                        </div>
                      </div>
                      <p className="text-[11px] leading-relaxed text-neutral-500">
                        {slice.role}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Economic design principles */}
            <div className="space-y-3 text-[11px] text-neutral-400 sm:text-[12px]">
              <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                Economic design principles
              </div>
              <ul className="space-y-1.5">
                <li>
                  <span className="font-semibold text-neutral-200">
                    Long-term alignment:
                  </span>{" "}
                  founders and team are locked with 9–12 month cliffs and
                  3-year vests.
                </li>
                <li>
                  <span className="font-semibold text-neutral-200">
                    Controlled liquidity:
                  </span>{" "}
                  early float is tightly capped; there’s no massive day-one
                  unlock.
                </li>
                <li>
                  <span className="font-semibold text-neutral-200">
                    Usage-based rewards:
                  </span>{" "}
                  community rewards are tied to on-chain behavior, not random
                  airdrops.
                </li>
                <li>
                  <span className="font-semibold text-neutral-200">
                    Sustainable treasury:
                  </span>{" "}
                  reserves unlock slowly via governance, funding /SLA credits,
                  audits, and protocol runway.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Token utility row */}
        <div className="mt-10 grid gap-8 border-t border-neutral-900 pt-8 lg:mt-12 lg:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-neutral-100">
              Where DNDX shows up in the product
            </h3>
            <p className="text-[13px] leading-relaxed text-neutral-400">
              The token isn’t just “there”. It powers the fee and trust layer:
            </p>
            <ul className="space-y-1.5 text-[13px] text-neutral-400">
              <li>
                <span className="font-medium text-neutral-100">
                  Predictable Gas™
                </span>{" "}
                – fee offsets and stability when real gas costs spike.
              </li>
              <li>
                <span className="font-medium text-neutral-100">
                  /SLA Credits
                </span>{" "}
                – automatic credits when realized cost breaches a published
                band.
              </li>
              <li>
                <span className="font-medium text-neutral-100">
                  SafetySend (UNDO)
                </span>{" "}
                – reversible sends during a short cancel window.
              </li>
              <li>
                <span className="font-medium text-neutral-100">
                  APP Escrow
                </span>{" "}
                – milestone-based holds and refunds written into the protocol.
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-[13px] text-neutral-400">
            <h3 className="text-sm font-medium text-neutral-100">
              Governance and ecosystem
            </h3>
            <p className="leading-relaxed">
              Over time, DNDX holders are expected to shape parameters, treasury
              programs, and ecosystem expansion. The model is built so that
              governance is a responsibility, not a meme.
            </p>
            <p className="leading-relaxed">
              None of this is an offer or a promise of returns. It’s a
              transparent map of how value, safety, and incentives are wired
              into the protocol.
            </p>
          </div>
        </div>

        {/* Download strip */}
        <div className="mt-8 flex flex-col gap-4 border-t border-neutral-900 pt-6 text-[11px] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            For exact vesting schedules and math, read the Tokenomics Overview
            PDF. For protocol internals, open the Whitepaper.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/docs/dndx-tokenomics-v1.pdf"
              download="dndx-tokenomics-v1.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-100 shadow-sm shadow-black/40 transition hover:border-neutral-200 hover:bg-neutral-900"
            >
              <span className="h-[1px] w-4 bg-neutral-300" />
              Download tokenomics
            </a>
            <a
              href="/docs/dndx-whitepaper-v1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-neutral-400 transition hover:text-neutral-100"
            >
              Read whitepaper
              <span className="text-[13px]">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
