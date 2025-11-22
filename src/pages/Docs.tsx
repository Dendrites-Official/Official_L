// src/pages/Docs.tsx
import React from "react";
import Navbar from "../components/Navbar";
import TokenomicsSection from "../components/TokenomicsSection";
import Footer from "../components/Footer"; // adjust path if needed

const Docs: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-black text-neutral-100">
   

      <main className="flex-1">
        {/* Hero / top navigation */}
        <section className="border-b border-neutral-900 bg-black">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                  <span className="h-px w-8 bg-neutral-700" />
                  Dendrites · Docs
                </div>
                <h1 className="text-2xl font-light tracking-tight sm:text-3xl lg:text-[2.4rem]">
                  Whitepaper, Tokenomics, Litepaper.
                  <span className="block text-neutral-300">
                    Everything behind predictable, safer crypto payments.
                  </span>
                </h1>
                <p className="text-[13px] leading-relaxed text-neutral-400 md:text-sm">
                  These docs describe how Dendrites (DNDX) turns unpredictable
                  gas, fragile escrow, and screenshot-based “agreements” into a
                  commerce-grade trust layer. Start high-level, or dive into the
                  math and vesting.
                </p>
                <p className="text-[11px] leading-relaxed text-neutral-500">
                  All content is informational. It does not quote token prices,
                  sale terms, or promise returns. Updates before{" "}
                  <span className="font-medium text-neutral-300">
                    Presale 1
                  </span>{" "}
                  will be reflected here.
                </p>
              </div>

              {/* anchor pills */}
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.18em] text-neutral-400">
                <a
                  href="#whitepaper"
                  className="rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1 transition hover:border-neutral-300 hover:bg-neutral-900 hover:text-neutral-100"
                >
                  Whitepaper
                </a>
                <a
                  href="#tokenomics"
                  className="rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1 transition hover:border-neutral-300 hover:bg-neutral-900 hover:text-neutral-100"
                >
                  Tokenomics
                </a>
                <a
                  href="#litepaper"
                  className="rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1 transition hover:border-neutral-300 hover:bg-neutral-900 hover:text-neutral-100"
                >
                  Litepaper
                </a>
              </div>
            </div>

            {/* 3 doc cards */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {/* Whitepaper card */}
              <div className="flex flex-col justify-between rounded-2xl border border-neutral-900 bg-neutral-950/60 px-4 py-4 sm:px-5 sm:py-5">
                <div className="space-y-2">
                  <div className="text-xs font-medium text-neutral-100">
                    Whitepaper
                  </div>
                  <p className="text-[13px] leading-relaxed text-neutral-400">
                    Formal spec for the Dendrites trust layer: predictable fees,
/SLA credits, SafetySend (UNDO), APP Escrow, and the Settlement &
Receipt Layer.
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[11px] text-neutral-500">
                    <li>• System overview, actors, trust assumptions.</li>
                    <li>• Predictable-fee model & band-based /SLA credits.</li>
                    <li>• Receipt ledger, states, and dispute handling.</li>
                  </ul>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <a
                    href="/docs/dndx-whitepaper-v1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1.5 font-medium uppercase tracking-[0.16em] hover:border-neutral-200 hover:bg-neutral-900"
                  >
                    <span className="h-[1px] w-4 bg-neutral-300" />
                    Download
                  </a>
                  <a
                    href="#whitepaper"
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-neutral-400 transition hover:text-neutral-100"
                  >
                    View summary
                    <span className="text-[13px]">↓</span>
                  </a>
                </div>
              </div>

              {/* Tokenomics card */}
              <div className="flex flex-col justify-between rounded-2xl border border-neutral-900 bg-neutral-950/60 px-4 py-4 sm:px-5 sm:py-5">
                <div className="space-y-2">
                  <div className="text-xs font-medium text-neutral-100">
                    Tokenomics
                  </div>
                  <p className="text-[13px] leading-relaxed text-neutral-400">
                    Fixed 7.6B supply, 0% inflation, and a float-controlled
                    vesting model designed for long-term stability.
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[11px] text-neutral-500">
                    <li>• Allocation breakdown and cliffs.</li>
                    <li>• Vesting architecture and TGE float.</li>
                    <li>• How DNDX powers Predictable Gas & /SLA.</li>
                  </ul>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <a
                    href="#tokenomics"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1.5 font-medium uppercase tracking-[0.16em] hover:border-neutral-200 hover:bg-neutral-900"
                  >
                    <span className="h-[1px] w-4 bg-neutral-300" />
                    View section
                  </a>
                  <a
                    href="/docs/dndx-tokenomics-v1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-neutral-400 transition hover:text-neutral-100"
                  >
                    Download PDF
                    <span className="text-[13px]">↗</span>
                  </a>
                </div>
              </div>

              {/* Litepaper card */}
              <div className="flex flex-col justify-between rounded-2xl border border-neutral-900 bg-neutral-950/60 px-4 py-4 sm:px-5 sm:py-5">
                <div className="space-y-2">
                  <div className="text-xs font-medium text-neutral-100">
                    Litepaper
                  </div>
                  <p className="text-[13px] leading-relaxed text-neutral-400">
                    High-level vision of Dendrites as a trust layer for global
                    digital money, focused on UX, flows, and roadmap instead of
                    formulas.
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[11px] text-neutral-500">
                    <li>• Why crypto feels unsafe for normal users.</li>
                    <li>• Predictable Gas™, /SLA credits, SafetySend, APP Escrow, AckPay.</li>
                    <li>• Testnets, mainnet intent, token utility & roadmap.</li>
                  </ul>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <a
                    href="#litepaper"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1.5 font-medium uppercase tracking-[0.16em] hover:border-neutral-200 hover:bg-neutral-900"
                  >
                    <span className="h-[1px] w-4 bg-neutral-300" />
                    View section
                  </a>
                  <a
                    href="/docs/dendrites-litepaper-v1.1.pdf"
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-neutral-400 transition hover:text-neutral-100"
                  >
                    Download PDF
                    <span className="text-[13px]">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Whitepaper summary block */}
        <section
          id="whitepaper"
          className="scroll-mt-24 lg:scroll-mt-28 border-b border-neutral-900 bg-black"
        >
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-4">
                <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                  Whitepaper
                </h2>
                <h3 className="text-xl font-light tracking-tight sm:text-2xl lg:text-3xl">
                  A commerce-grade trust layer for predictable fees and safer
                  payments.
                </h3>
                <p className="text-[13px] leading-relaxed text-neutral-400 md:text-sm">
                  The Dendrites Whitepaper describes how we quote fees up front,
                  enforce fee bands, issue /SLA credits when reality breaches
                  those bands, and route every payment through a minimal Receipt
                  Ledger with clear states for send, hold, release, refund, and
                  dispute.
                </p>
                <p className="text-[13px] leading-relaxed text-neutral-400 md:text-sm">
                  It covers system actors, trust assumptions, core flows,
                  predictable-fee math, AI assistants as logged helpers (not
                  oracles), and how all of this can sit on today’s L2s with a
                  forward Stamp & Receipt Layer (SRL) path.
                </p>
              </div>

              <div className="space-y-4 text-[13px] text-neutral-400">
                <div>
                  <div className="text-xs font-medium text-neutral-100">
                    Inside the paper
                  </div>
                  <ul className="mt-2 space-y-1.5 text-[12px]">
                    <li>
                      • UX gaps: unpredictable gas, best-effort inclusion,
                      fragile escrow, manual refunds.
                    </li>
                    <li>
                      • Predictable-fee model & /SLA credit issuance rules when
                      real fees break bands.
                    </li>
                    <li>
                      • Receipt Ledger FSM, invariants, and dispute paths
                      (UNDO, escrow, refunds, AckPay).
                    </li>
                    <li>
                      • AI assistants as assistive, auditable tools — not
                      trusted gods or price oracles.
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-neutral-100">
                    Download
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-[11px]">
                    <a
                      href="/docs/dndx-whitepaper-v1.pdf"
                      download
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1.5 font-medium uppercase tracking-[0.16em] text-neutral-100 hover:border-neutral-200 hover:bg-neutral-900"
                    >
                      <span className="h-[1px] w-4 bg-neutral-300" />
                      Download PDF
                    </a>
                    <span className="text-neutral-500">
                      v1.0 — November 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Whitepaper PDF viewer */}
        <section className="border-b border-neutral-900 bg-black">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
                  Whitepaper PDF
                </h3>
                <a
                  href="/docs/dndx-whitepaper-v1.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-100 hover:border-neutral-200 hover:bg-neutral-900"
                >
                  <span className="h-[1px] w-4 bg-neutral-300" />
                  Download PDF
                </a>
              </div>
              <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950">
                <iframe
                  src="/docs/dndx-whitepaper-v1.pdf"
                  className="w-full h-[600px] md:h-[800px]"
                  title="DNDX Whitepaper PDF"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tokenomics section with pie chart */}
        <TokenomicsSection />

        {/* Tokenomics PDF viewer */}
        <section className="border-b border-neutral-900 bg-black">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
                  Tokenomics PDF
                </h3>
                <a
                  href="/docs/dndx-tokenomics-v1.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-100 hover:border-neutral-200 hover:bg-neutral-900"
                >
                  <span className="h-[1px] w-4 bg-neutral-300" />
                  Download PDF
                </a>
              </div>
              <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950">
                <iframe
                  src="/docs/dndx-tokenomics-v1.pdf"
                  className="w-full h-[600px] md:h-[800px]"
                  title="DNDX Tokenomics PDF"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Litepaper section – real content */}
        <section
          id="litepaper"
          className="scroll-mt-24 lg:scroll-mt-28 border-t border-neutral-900 bg-black"
        >
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="space-y-4">
                <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                  Litepaper · v1.1
                </h2>
                <h3 className="text-xl font-light tracking-tight sm:text-2xl lg:text-3xl">
                  A trust layer for global digital money.
                </h3>
                <p className="text-[13px] leading-relaxed text-neutral-400 md:text-sm">
                  The Litepaper explains why today’s crypto payments feel unsafe:
                  fees that jump unpredictably, irreversible mistakes, manual and
                  messy refunds, primitive escrow, and businesses forced to
                  rebuild a settlement stack every time. Dendrites is positioned
                  as the missing trust and predictability layer above existing
                  chains — not a new meme token.
                </p>
                <p className="text-[13px] leading-relaxed text-neutral-400 md:text-sm">
                  It introduces the planned components: Predictable Gas™ with
                  pre-quoted fee bands, /SLA-style credits when those bands are
                  breached, SafetySend (UNDO) for short cancel windows, APP
                  Escrow for milestones and refunds, and AckPay so funds only
                  finalize when explicitly acknowledged.
                </p>
              </div>

              <div className="space-y-4 text-[13px] text-neutral-400">
                <div>
                  <div className="text-xs font-medium text-neutral-100">
                    What the Litepaper covers
                  </div>
                  <ul className="mt-2 space-y-1.5 text-[12px]">
                    <li>
                      • The problem: unpredictability, no undo, weak refund and
                      dispute flows, and UX that scares normal users.
                    </li>
                    <li>
                      • The Dendrites approach: a commerce-grade trust layer
                      adding predictability, workflows, escrow, dispute logic,
                      and auditability on top of today’s L2s.
                    </li>
                    <li>
                      • Universal access: individuals, wallets, apps,
                      businesses, marketplaces, fintech builders — one layer that
                      anyone can integrate.
                    </li>
                    <li>
                      • Developer vision: SDKs and simple integrations so teams
                      can plug in predictable fees, escrows, undo windows,
                      receipts, and payouts without rebuilding everything.
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-neutral-100">
                    Network phases & token role
                  </div>
                  <ul className="mt-2 space-y-1.5 text-[12px]">
                    <li>
                      • Phase 0 – Testnets: transparency, community testing,
                      developer onboarding, non-financial experiments.
                    </li>
                    <li>
                      • Phase 1 – Presale prep & ecosystem bootstrap: docs,
                      partnerships, initial community, Presale-1 & Presale-2.
                    </li>
                    <li>
                      • Phase 2 – Mainnet launch: intent to ship Predictable
                      Gas™, SafetySend, APP Escrow, AckPay, SLA Credits, and SDK
                      v1 (subject to change).
                    </li>
                    <li>
                      • Later phases – ecosystem tools, plugins, payout engines,
                      global commerce routing, and long-term SRL (Stamp &
                      Receipt Layer) research.
                    </li>
                    <li>
                      • DNDX: envisioned as a coordination / utility token for
                      fee bands, SLA credits, escrow flows, routing tiers, dev
                      access, and future governance — without promising yields
                      or returns.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Litepaper download / disclaimer */}
            <div className="mt-8 flex flex-col gap-4 border-t border-neutral-900 pt-6 text-[11px] text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl space-y-2">
                <div className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
                  Download Litepaper
                </div>
                <p>
                  The Litepaper is a forward-looking, non-binding overview. All
                  features, utilities, and timelines are subject to change and
                  do not constitute investment advice or a sale document.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/docs/dendrites-litepaper-v1.1.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-100 shadow-sm shadow-black/40 transition hover:border-neutral-200 hover:bg-neutral-900"
                >
                  <span className="h-[1px] w-4 bg-neutral-300" />
                  Download Litepaper
                </a>
              </div>
            </div>

            {/* Litepaper PDF viewer */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
                Read Litepaper
              </h3>
              <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950">
                <iframe
                  src="/docs/dendrites-litepaper-v1.1.pdf"
                  className="w-full h-[600px] md:h-[800px]"
                  title="Dendrites Litepaper PDF"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Compliance / disclaimer section */}
        <section className="border-t border-neutral-900 bg-black">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div className="space-y-3 text-[11px] leading-relaxed text-neutral-500">
              <div className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
                Public-safe disclaimer
              </div>
              <p>This docs page and all linked PDFs:</p>
              <ul className="space-y-1.5">
                <li>• Do not contain token pricing.</li>
                <li>• Do not contain sale schedules.</li>
                <li>• Do not promise returns or profits.</li>
                <li>• Are not a solicitation or offering.</li>
                <li>• Exist for educational and transparency purposes only.</li>
              </ul>
              <p className="mt-2">
                Any participation in token-related programs will require
                separate, jurisdiction-specific terms. If something here ever
                conflicts with the latest official legal docs, the legal docs
                win.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Docs;
