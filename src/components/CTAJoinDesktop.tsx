import React, { useEffect, useRef, useState } from "react";

type CTAJoinDesktopProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function CTAJoinDesktop({
  ctaHref = "https://waitlist.dendrites.ai/",
  ctaLabel = "Join Airdrop",
}: CTAJoinDesktopProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || videoReady) return;

    if (typeof IntersectionObserver === "undefined") {
      setVideoReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVideoReady(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [videoReady]);

  return (
    <section className="cta-premium-shell" ref={sectionRef}>
      <div className="cta-premium-container">
        <div className="cta-content-wrapper">
          <div className="cta-header">
            <span className="cta-chip">Priority Access</span>
            <h2>Join the Future of Crypto Commerce</h2>
            <p>
              Predictable fees, real refunds, and escrow you can trust. Built with USDC rails,
              zero speculation, and concierge-grade support for every launch partner.
            </p>
            <div className="cta-actions">
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button"
              >
                {ctaLabel}
              </a>
              <div className="cta-meta">
                <span className="dot" />
                Season-0 slots are limited; responses within 24 hours.
              </div>
            </div>
          </div>

          <div className="cta-essentials">
            <div className="cta-milestones">
              <div className="cta-milestone">
                <span className="milestone-dot" />
                <div>
                  <p className="milestone-label">Mission-0 Sync</p>
                  <p className="milestone-copy">Wallet + identity sync grants a launch badge and unlocks early airdrop multipliers.</p>
                </div>
              </div>
              <div className="cta-milestone">
                <span className="milestone-dot" />
                <div>
                  <p className="milestone-label">Neuron Pass Tiers</p>
                  <p className="milestone-copy">Standard + Genesis NFTs (Base) map to higher allocations and concierge escalation.</p>
                </div>
              </div>
              <div className="cta-milestone">
                <span className="milestone-dot" />
                <div>
                  <p className="milestone-label">Galaxy Ladder</p>
                  <p className="milestone-copy">Leaderboard collectibles for Top 1K; claimable once Presale-1 closes.</p>
                </div>
              </div>
            </div>

            <div className="cta-status-inline">
              <p className="cta-status-label">Project Status</p>
              <div className="cta-status-items">
                <span><span className="status-dot" />Token deployed (Nov 2025)</span>
                <span><span className="status-dot" />Season-0 live since Oct 17</span>
                <span><span className="status-dot" />Predictable Gas + SafetySend testnet</span>
                <span><span className="status-dot" />Presale-1 • Q1 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-visual-wrapper">
          <div className="cta-premium-visual" aria-hidden="true">
            {videoReady ? (
              <video
                className="cta-premium-video"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/page_end_cta.png"
                controls={false}
                controlsList="nodownload noplaybackrate nofullscreen"
                disablePictureInPicture
              >
                <source src="/NeuralPass.mp4" type="video/mp4" />
              </video>
            ) : (
              <div className="cta-video-placeholder">
                <div className="placeholder-line" />
                <div className="placeholder-line" />
                <div className="placeholder-dot" />
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .cta-premium-shell {
          width: 100%;
          background: transparent;
          padding: clamp(40px, 5vw, 72px) clamp(16px, 4vw, 48px);
          position: relative;
          overflow: visible;
          border-top: 1px solid rgba(148,163,184,0.15);
          border-bottom: 1px solid rgba(148,163,184,0.15);
        }

        .cta-premium-container {
          position: relative;
          z-index: 1;
          max-width: 1150px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) auto;
          gap: clamp(28px, 4vw, 48px);
          align-items: stretch;
        }

        .cta-content-wrapper {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vw, 40px);
        }

        .cta-header {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cta-chip {
          align-self: flex-start;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
          font-size: 0.72rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.02);
        }

        .cta-header h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.1;
          letter-spacing: -0.025em;
          font-weight: 700;
        }

        .cta-header p {
          color: rgba(255,255,255,0.7);
          font-size: clamp(0.95rem, 1.1vw, 1.05rem);
          line-height: 1.55;
          max-width: 36ch;
        }

        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
          margin-top: 6px;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 32px;
          border-radius: 999px;
          background: linear-gradient(135deg, #a3e635, #06b6d4);
          color: #020617;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 16px 36px rgba(163,230,53,0.22), 0 0 60px rgba(6,182,212,0.12);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 28px 65px rgba(163,230,53,0.35), 0 0 100px rgba(6,182,212,0.25);
        }

        .cta-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.6);
          font-size: 0.92rem;
        }

        .cta-meta .dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: linear-gradient(135deg, #22d3ee, #3b82f6);
          box-shadow: 0 0 12px rgba(34,211,238,0.6);
        }

        .cta-essentials {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cta-milestones {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .cta-milestone {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .milestone-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid rgba(125,211,252,0.7);
          background: radial-gradient(circle, rgba(34,211,238,0.85), rgba(14,165,233,0.2));
          box-shadow: 0 0 12px rgba(34,211,238,0.45);
          margin-top: 4px;
          flex-shrink: 0;
        }

        .milestone-label {
          font-size: 0.88rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.78);
          margin-bottom: 6px;
        }

        .milestone-copy {
          font-size: 0.88rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.65);
        }

        .cta-status-inline {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cta-status-label {
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.35em;
          color: rgba(125,211,252,0.85);
        }

        .cta-status-items {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 18px;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.72);
        }

        .cta-status-items span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(135deg, #22d3ee, #3b82f6);
          box-shadow: 0 0 8px rgba(34,211,238,0.5);
        }

        .cta-visual-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(180px, 22vw, 320px);
        }

        .cta-premium-visual {
          position: relative;
          width: 100%;
          height: clamp(160px, 23vw, 240px);
          border-radius: 20px;
          background: transparent;
          border: 1px solid rgba(148,163,184,0.2);
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.35);
        }

        .cta-premium-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cta-video-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px dashed rgba(148,163,184,0.35);
          gap: 10px;
        }

        .placeholder-line {
          width: 28%;
          height: 2px;
          background: rgba(148,163,184,0.45);
        }

        .placeholder-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(148,163,184,0.45);
        }

        @media (max-width: 1200px) {
          .cta-premium-container {
            grid-template-columns: 1fr auto;
          }
        }

        @media (max-width: 1024px) {
          .cta-premium-container {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .cta-visual-wrapper {
            order: -1;
            width: 100%;
          }

          .cta-premium-visual {
            height: 200px;
          }
        }

        @media (max-width: 768px) {
          .cta-premium-shell {
            padding: 40px 16px;
          }

          .cta-premium-visual {
            height: 180px;
          }

          .cta-button {
            width: 100%;
          }

          .cta-milestones {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .cta-header h2 {
            font-size: 2rem;
          }

          .cta-premium-visual {
            height: 170px;
            border-radius: 16px;
          }

          .cta-status-items {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}
