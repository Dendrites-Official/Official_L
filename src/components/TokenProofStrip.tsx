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

const EXPLORER_LINKS = [
  {
    label: "Etherscan",
    href: `https://etherscan.io/token/${CONTRACT_ADDRESS}`,
  },
  {
    label: "BaseScan",
    href: "https://basescan.org/address/0xb476b0c8faa3066e4051421c0be7d762ba347b01",
  },
  {
    label: "OpenSea",
    href: "https://opensea.io/collection/dendrites-season-0-pass",
  },
];

export default function TokenProofStrip() {
  return (
    <section className="token-proof-wrapper">
      <div className="token-proof-frame">
        {/* TOP: LABEL + TITLE + STATS */}
        <div className="token-proof-strip">
          <div className="token-proof-top">
            <div className="token-proof-core">
              {/* <p className="token-proof-chip">DNDX PROOF</p> */}
              <div className="token-proof-info">
                <p className="token-proof-title">
                  Official Token · Immutable Deploy
                </p>
                <p className="token-proof-subtitle">
                  Settlement lives on Ethereum. No public trading yet. Everything
                  routes through this contract until TGE.
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
          </div>

          {/* BOTTOM: CONTRACT + LINKS */}
          <div className="token-proof-bottom">
             <p className="token-proof-chip">DNDX PROOF</p>
            <div className="token-proof-address">
             
              <span className="token-proof-address-label">Contract</span>
              <span className="token-proof-address-value font-mono">
                {CONTRACT_ADDRESS}
              </span>
            </div>

            <div className="token-proof-actions">
              <span className="token-proof-audited">Audited</span>
              <div className="token-proof-links">
                {EXPLORER_LINKS.map((link) => (
                  <a
                    key={link.label}
                    className="token-proof-link"
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* NETWORK LANES (inside same frame) */}
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
      </div>

      <style>{`
        .token-proof-wrapper {
          width: 100%;
          padding: 1.25rem clamp(0.75rem, 3vw, 2.5rem) 0;
          color: #fff;
        }

        /* OUTER FRAME – capsule like your screenshot */
        .token-proof-frame {
          width: 100%;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.55);
          padding: 1.15rem 2rem 1.1rem;
          background: transparent;
        }

        .token-proof-strip {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .token-proof-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.25rem;
          flex-wrap: nowrap;
        }

        .token-proof-core {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          min-width: 0;
          max-width: 380px;
          flex-shrink: 1;
        }

        .token-proof-chip {
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.35);
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
        }

        .token-proof-title {
          font-size: 0.92rem;
          font-weight: 600;
          line-height: 1.25;
          margin-right: 1rem;
        }

        .token-proof-subtitle {
          margin-top: 0.25rem;
          font-size: 0.72rem;
          line-height: 1.4;
          color: rgba(255,255,255,0.7);
          max-width: 30ch;
        }

        .token-proof-info {
        margin-left: 2rem;
          display: flex;
          flex-direction: column;
        }

        .token-proof-stats {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(100px, 1fr);
          gap: 0.5rem;
          align-items: center;
          justify-content: flex-end;
          flex: 1;
        }

        .token-proof-stat {
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-size: 0.62rem;
          color: rgba(255,255,255,0.6);
        }

        .token-proof-stat span {
          display: block;
          margin-bottom: 0.18rem;
        }

        .token-proof-stat strong {
          display: block;
          color: #fff;
          font-size: 0.8rem;
          letter-spacing: 0.03em;
          font-weight: 600;
        }

        .token-proof-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.4rem;
          flex-wrap: wrap;
        }

        /* CONTRACT – outline only, no fill */
        .token-proof-address {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.7);
          background: transparent;
          min-width: 0;
        }

        .token-proof-address-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          color: rgba(148,163,184,0.95);
        }

        .token-proof-address-value {
          font-size: 0.8rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .token-proof-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .token-proof-audited {
          font-size: 0.8rem;
          color: #22c55e;
          font-weight: 500;
        }

        .token-proof-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .token-proof-link {
          font-size: 0.78rem;
          color: rgba(209,213,219,0.9);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          position: relative;
        }

        .token-proof-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -0.15rem;
          width: 0%;
          height: 1px;
          background: rgba(229,231,235,0.9);
          transition: width 0.18s ease;
        }

        .token-proof-link:hover {
          color: #fff;
        }

        .token-proof-link:hover::after {
          width: 100%;
        }

        /* NETWORK LANES – inside same frame, no extra borders */
        .network-lane-strip {
          width: 100%;
          margin-top: 0.9rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 0.5rem;
        }

        .network-lane-card {
          padding: 0.25rem 0.1rem 0.15rem;
          display: flex;
          gap: 0.6rem;
        }

        .network-lane-label {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: rgba(148,163,184,0.9);
          white-space: nowrap;
        }

        .network-lane-card h3 {
          margin-bottom: 0.15rem;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .network-lane-card p {
          margin: 0;
          font-size: 0.8rem;
          color: rgba(148,163,184,0.9);
        }

        /* RESPONSIVE – soften the pill on smaller screens */
        @media (max-width: 1024px) {
          .token-proof-frame {
            border-radius: 72px;
            padding: 1.25rem 1.8rem 1.1rem;
          }
        }

        @media (max-width: 900px) {
          .token-proof-frame {
            border-radius: 40px;
            padding: 1.1rem 1.3rem 1rem;
          }
          .token-proof-top {
            flex-direction: column;
            gap: 1rem;
          }
          .token-proof-stats {
            grid-auto-flow: row;
            grid-template-columns: repeat(3, minmax(0,1fr));
          }
          .token-proof-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
          .token-proof-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .token-proof-wrapper {
            padding: 0.9rem 0.9rem 0;
          }
          .token-proof-frame {
            border-radius: 24px;
            padding: 0.9rem 0.9rem 0.85rem;
          }
          .token-proof-core {
            flex-direction: column;
            gap: 0.4rem;
            max-width: none;
          }
          .token-proof-subtitle {
            max-width: none;
          }
          .token-proof-stats {
            grid-template-columns: 1fr;
            gap: 0.45rem;
          }
          .token-proof-address {
            width: 100%;
            justify-content: space-between;
          }
          .token-proof-address-value {
            white-space: normal;
            word-break: break-all;
            text-align: right;
          }
          .network-lane-strip {
            margin-top: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .token-proof-title {
            font-size: 0.95rem;
          }
          .token-proof-chip {
            font-size: 0.55rem;
            letter-spacing: 0.22em;
          }
          .token-proof-stat strong {
            font-size: 0.82rem;
          }
          .token-proof-link {
            font-size: 0.78rem;
          }
        }
      `}</style>
    </section>
  );
}
