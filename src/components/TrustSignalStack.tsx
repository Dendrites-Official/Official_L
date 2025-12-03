import React from "react";

const rewardHighlights = [
  {
    title: "Mission-0 Complete",
    copy: "Wallet + identity sync grants a launch badge and unlocks early airdrop multipliers.",
  },
  {
    title: "Neuron Pass Tiers",
    copy: "Standard + Genesis NFTs (Base) map to higher allocations and concierge escalation.",
  },
  {
    title: "Galaxy Ladder",
    copy: "Leaderboard collectibles for Top 1K; claimable once Presale-1 closes.",
  },
];

const roadmapStatus = [
  "Token deployed (Nov 2025)",
  "Season-0 live since Oct 17",
  "Predictable Gas + SafetySend testnet", 
  "Presale-1 • Q1 2026",
];

const learnLinks = [
  { label: "Docs", href: "https://dendrites.ai/docs" },
  { label: "Whitepaper", href: "https://dendrites.ai/docs#whitepaper" },
  { label: "Blogs", href: "https://dendrites.ai/blogs" },
];

export default function TrustSignalStack() {
  return (
    <section className="bg-gradient-to-b from-black via-slate-950/70 to-black py-12 sm:py-16 lg:py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rewardHighlights.map((item) => (
            <article key={item.title} className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-cyan-500/5 p-5">
              <p className="text-[0.6rem] uppercase tracking-[0.45em] text-white/50">Season-0</p>
              <h4 className="mt-2 text-lg font-semibold">{item.title}</h4>
              <p className="mt-2 text-sm text-white/70">{item.copy}</p>
            </article>
          ))}
        </div>


      </div>
    </section>
  );
}
