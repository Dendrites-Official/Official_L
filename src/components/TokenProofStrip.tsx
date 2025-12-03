import React from "react";

const tokenStats = [
  { label: "Status", value: "Pre-TGE · Invite only" },
  { label: "Chain", value: "Ethereum Mainnet" },
  { label: "Use", value: "Airdrops · Safety Escrow" },
];

const networkLanes = [
  {
    title: "Ethereum Settlement",
    copy: "Immutable contract, custody, vesting, and future liquidity. Every unlock clears here for provable trust.",
  },
  {
    title: "Base Utility",
    copy: "Season-0 quests, Neuron Pass NFTs, and Predictable Gas demos stay on Base for instant UX with ETH proofs.",
  },
];

const CONTRACT_ADDRESS = "0xA861beA2f4B2C1B8042cf7C31010ce55C20044f4";

export default function TokenProofStrip() {
  return (
    <section className="token-proof-wrapper">
      <div className="token-proof-strip">
        <div className="token-proof-core">
          <p className="token-proof-chip">DNDX PROOF</p>
          <div>
            <p className="token-proof-title">Official Token · Immutable Deploy</p>
            <p className="token-proof-subtitle">
              Settlement lives on Ethereum. No public trading yet. Everything routes through this contract until TGE.
            </p>
          </div>
        </div>

        <div className="token-proof-stats">
          {tokenStats.map((stat) => (
            <div key={stat.label} className="token-proof-stat">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>

        <div className="token-proof-address">
          <span className="font-mono">{CONTRACT_ADDRESS}</span>
        </div>

        <div className="token-proof-actions">
          <span className="token-proof-pill token-proof-pill--success">Audited</span>
          <a
            className="token-proof-pill"
            href={`https://etherscan.io/token/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Etherscan ↗
          </a>
        </div>
      </div>

      <div className="network-lane-strip">
        {networkLanes.map((lane) => (
          <article key={lane.title} className="network-lane-card">
            <p className="network-lane-label">Network Lane</p>
            <div>
              <h3>{lane.title}</h3>
              <p>{lane.copy}</p>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .token-proof-wrapper {
          width: 100%;
          padding: 1.25rem clamp(0.75rem, 3vw, 2.5rem) 0;
          color: #fff;
        }

        .token-proof-strip {
          width: 100%;
          display: grid;
          grid-template-columns: 1.6fr 1fr auto auto;
          gap: 0.75rem;
          padding: 0.85rem 1.35rem;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          background: transparent;
        }

        .token-proof-core {
          display: flex;
          gap: 1.15rem;
          align-items: center;
          min-width: 0;
        }

        .token-proof-chip {
          padding: 0.32rem 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.35);
          font-size: 0.62rem;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
        }

        .token-proof-title {
          font-size: clamp(0.95rem, 1.4vw, 1.15rem);
          font-weight: 600;
        }

        .token-proof-subtitle {
          margin-top: 0.2rem;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
        }

        .token-proof-stats {
          display: flex;
          gap: 1rem;
          align-items: center;
          justify-content: space-between;
        }

        .token-proof-stat {
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.6);
        }

        .token-proof-stat strong {
          display: block;
          margin-top: 0.25rem;
          color: #fff;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
        }

        .token-proof-address {
          display: flex;
          align-items: center;
          padding: 0.5rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.4);
          font-size: 0.88rem;
        }

        .token-proof-actions {
          display: flex;
          gap: 0.55rem;
          justify-content: flex-end;
          align-items: center;
        }

        .token-proof-pill {
          padding: 0.4rem 1.15rem;
          border-radius: 0;
          border: none;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.85);
          white-space: nowrap;
        }

        .token-proof-pill--success {
          color: rgb(190, 255, 210);
        }

        .network-lane-strip {
          width: 100%;
          margin: 0.35rem auto 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 0.35rem;
        }

        .network-lane-card {
          border: none;
          border-radius: 0;
          padding: 0.35rem 0;
          background: transparent;
          display: flex;
          gap: 0.6rem;
        }

        .network-lane-card h3 {
          margin-bottom: 0.15rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .network-lane-card p {
          margin: 0;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.72);
        }

        .network-lane-label {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: rgba(125,211,252,0.8);
          white-space: nowrap;
        }

        @media (max-width: 1280px) {
          .token-proof-strip {
            grid-template-columns: 1.5fr 1fr minmax(200px, 0.9fr);
            grid-template-areas:
              "core stats address"
              "actions actions actions";
          }
          .token-proof-core { grid-area: core; }
          .token-proof-stats { grid-area: stats; }
          .token-proof-address { grid-area: address; }
          .token-proof-actions {
            grid-area: actions;
            justify-content: flex-start;
          }
        }

        @media (max-width: 900px) {
          .token-proof-strip {
            grid-template-columns: 1fr;
            border-radius: 40px;
            padding: 0.9rem 1rem;
            gap: 0.6rem;
          }
          .token-proof-core {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .token-proof-actions {
            flex-wrap: wrap;
            gap: 0.4rem;
          }
          .token-proof-address {
            justify-content: flex-start;
          }
          .token-proof-stats {
            flex-wrap: wrap;
            justify-content: flex-start;
          }
        }

        @media (max-width: 680px) {
          .token-proof-wrapper {
            padding: 0.5rem 0.85rem 0;
          }
          .token-proof-strip {
            border-radius: 0;
            border: none;
            padding: 0;
            gap: 0.4rem;
            display: flex;
            flex-direction: column;
          }
          .token-proof-core {
            display: block;
          }
          .token-proof-chip {
            display: inline-block;
            padding: 0.2rem 0.5rem;
            letter-spacing: 0.12em;
            font-size: 0.56rem;
            border: 1px solid rgba(255,255,255,0.3);
            margin-bottom: 0.3rem;
          }
          .token-proof-title {
            font-size: 0.85rem;
            line-height: 1.3;
          }
          .token-proof-subtitle {
            display: none;
          }
          .token-proof-stats {
            display: flex;
            flex-direction: row;
            gap: 0.8rem;
            flex-wrap: wrap;
          }
          .token-proof-stat {
            letter-spacing: 0.06em;
            font-size: 0.62rem;
          }
          .token-proof-stat strong {
            font-size: 0.78rem;
            margin-top: 0.15rem;
          }
          .token-proof-address {
            width: 100%;
            border-radius: 0;
            justify-content: flex-start;
            font-size: 0.72rem;
            padding: 0;
            border: none;
          }
          .token-proof-actions {
            display: flex;
            flex-direction: row;
            gap: 1rem;
            flex-wrap: wrap;
            align-items: center;
          }
          .token-proof-pill {
            flex: 0 0 auto;
            padding: 0;
            font-size: 0.78rem;
            border-radius: 0;
          }
          .network-lane-strip {
            margin-top: 0.5rem;
            gap: 0.5rem;
          }
          .network-lane-card {
            display: block;
            padding: 0.25rem 0;
          }
          .network-lane-label {
            font-size: 0.56rem;
            letter-spacing: 0.12em;
            margin-bottom: 0.2rem;
          }
          .network-lane-card h3 {
            font-size: 0.85rem;
            margin-bottom: 0.15rem;
          }
          .network-lane-card p {
            font-size: 0.72rem;
            line-height: 1.4;
          }
        }

        @media (max-width: 520px) {
          .token-proof-wrapper {
            padding: 0.4rem 0.65rem 0;
          }
          .token-proof-strip {
            gap: 0.35rem;
          }
          .token-proof-chip {
            font-size: 0.54rem;
            padding: 0.18rem 0.45rem;
          }
          .token-proof-title {
            font-size: 0.8rem;
          }
          .token-proof-stat {
            font-size: 0.6rem;
          }
          .token-proof-stat strong {
            font-size: 0.75rem;
          }
          .token-proof-address {
            font-size: 0.68rem;
            word-break: break-all;
          }
          .token-proof-pill {
            font-size: 0.75rem;
            padding: 0.32rem 0.75rem;
          }
          .network-lane-card h3 {
            font-size: 0.8rem;
          }
          .network-lane-card p {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </section>
  );
}
