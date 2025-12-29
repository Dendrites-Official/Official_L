import React, { useEffect } from "react";

export default function DendritesTrustLayer() {
  // Optional: set a more specific title for this page
  useEffect(() => {
    document.title =
      "Dendrites (DNDX) – Web3 Payments Trust Layer, Predictable Gas & SafetySend";
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Breadcrumb / Eyebrow */}
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
          Dendrites · Web3 Payments Trust Layer
        </p>

        {/* H1 – main brand message */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
          Dendrites (DNDX) – Web3 payments you can actually trust.
        </h1>

        <p className="text-base sm:text-lg text-white/70 max-w-3xl mb-10">
          Dendrites is a Web3 payments trust layer built for real commerce, not
          just trading. We combine{" "}
          <span className="text-white">predictable gas</span>,{" "}
          <span className="text-white">SafetySend (UNDO)</span>, and{" "}
          <span className="text-white">escrow-like flows</span> so freelancers,
          marketplaces, and crypto-native teams can send and receive payments
          with fewer surprises, fewer disputes, and real receipts.
        </p>

        {/* Section: Predictable Gas */}
        <section id="predictable-gas" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Predictable gas for crypto payments
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3">
            Today, most on-chain payments feel like a guess. You approve a
            transaction and hope the network isn&apos;t congested, the gas
            price doesn&apos;t spike, and the final cost matches what you saw
            in the UI. Dendrites introduces{" "}
            <span className="text-white">Predictable Gas™</span>, a model where
            fees are surfaced up front in stable units, so merchants and users
            know what they&apos;re paying before they commit.
          </p>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            Our goal is simple: make crypto payments feel as reliable as modern
            SaaS billing. That means giving buyers, sellers, and platforms a
            clear view of network costs, service fees, and margins, even when
            the underlying chains are volatile.
          </p>
        </section>

        {/* Section: SafetySend / UNDO */}
        <section id="safetysend-undo" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            SafetySend (UNDO) for mistaken sends
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3">
            On most chains, a wrong address or typo means the funds are gone
            forever. Dendrites introduces{" "}
            <span className="text-white">SafetySend</span>, an UNDO-style
            protection window for supported payment flows. Instead of a
            one-way push, a transaction can be placed into a protected state
            for a short period, allowing the sender or platform to cancel if
            something looks off.
          </p>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            This doesn&apos;t rewrite the rules of the chain. It wraps payments
            in a programmable layer that handles intent, confirmation, and
            dispute flows before final settlement, giving users more confidence
            when sending meaningful amounts on-chain.
          </p>
        </section>

        {/* Section: Escrow / SRL */}
        <section id="escrow-srl" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Escrow-like flows and the SRL – Stamp Receipt Layer
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3">
            Many &quot;escrow&quot; flows today still live in chats, emails,
            and screenshots. Dendrites moves that logic into a{" "}
            <span className="text-white">Stamp Receipt Layer (SRL)</span>,
            where both parties agree to the terms of a payment before funds
            move. Milestones, unlock conditions, and dispute paths can be
            encoded and tracked on-chain.
          </p>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            For marketplaces, agencies, and platforms, this means you can offer
            escrow-like protection and clear receipts to your users without
            building a full payments stack from scratch. For freelancers and
            clients, it means fewer trust issues, clearer expectations, and
            better records of what was delivered and paid.
          </p>
        </section>

        {/* Section: Ethereum + Base setup */}
        <section id="ethereum-base" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Ethereum settlement, Base utility
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3">
            The DNDX token is deployed on{" "}
            <span className="text-white">Ethereum mainnet</span>, providing an
            immutable settlement layer for custody, vesting, and future
            liquidity. Over time, this is where long-term value and formal
            proofs of ownership live.
          </p>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed">
            For day-to-day UX, Dendrites leans on{" "}
            <span className="text-white">Base</span> for faster, lower-cost
            activity: Season-0 quests, Neuron Pass NFTs, Predictable Gas demos,
            and other utility flows run on Base while still anchoring back to
            Ethereum for trust and verification.
          </p>
        </section>

        {/* Section: Season-0 / Neuron Pass / Galaxy Ladder */}
        <section id="season-0" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Season-0, Neuron Pass, and the Galaxy Ladder
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3">
            To bootstrap the network and reward early users, Dendrites is
            running <span className="text-white">Season-0</span> — an invite-only
            phase where participants can earn DNDX allocations and collectibles
            by completing quests, integrating flows, and helping us harden the
            product.
          </p>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3">
            <span className="text-white">Neuron Pass</span> NFTs represent
            access tiers for early adopters, with different levels tied to
            airdrop multipliers, support priority, and future perks. The{" "}
            <span className="text-white">Galaxy Ladder</span> leaderboard tracks
            Season-0 activity across quests and integrations, offering
            claimable rewards for the top cohort once this phase closes.
          </p>
        </section>

        {/* Section: Who Dendrites is for */}
        <section id="who-is-it-for" className="mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">
            Who Dendrites is built for
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-3">
            Dendrites is designed for teams who care about{" "}
            <span className="text-white">real revenue</span>, not just token
            charts:
          </p>
          <ul className="text-sm sm:text-base text-white/70 leading-relaxed space-y-2 list-disc list-inside">
            <li>Freelancers and studios that get paid in crypto.</li>
            <li>Marketplaces and platforms that route on-chain funds.</li>
            <li>SaaS tools adding Web3 payments without building rails.</li>
            <li>Crypto-native teams that need predictable, auditable flows.</li>
          </ul>
        </section>

        {/* Section: FAQ (good for SEO and users) */}
        <section id="faq" className="border-t border-white/10 pt-10 mt-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-6 text-sm sm:text-base text-white/70 leading-relaxed">
            <div>
              <h3 className="text-sm sm:text-base text-white mb-1">
                Is Dendrites just a token or a full product?
              </h3>
              <p>
                DNDX is the utility token for the Dendrites payments and trust
                layer, but the focus is on infrastructure — predictable gas,
                escrow-like flows, SafetySend, and tooling that helps real
                businesses run safer on-chain payments.
              </p>
            </div>
            <div>
              <h3 className="text-sm sm:text-base text-white mb-1">
                How is Dendrites different from typical crypto payment widgets?
              </h3>
              <p>
                Most widgets stop at &quot;send funds from A to B&quot;.
                Dendrites wraps payments in intent, receipts, and programmable
                rules so teams can encode milestones, refunds, and trust logic
                into their flows instead of handling everything manually in
                chats and screenshots.
              </p>
            </div>
            <div>
              <h3 className="text-sm sm:text-base text-white mb-1">
                Can I integrate Dendrites into my existing product?
              </h3>
              <p>
                Yes. The goal is to expose Dendrites through APIs, SDKs, and
                simple front-end components so you can add predictable,
                receipt-backed crypto payments without rebuilding your stack.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
