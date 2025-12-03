import React, { useEffect, useRef, useState } from "react";

type CTAJoinMobileProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function CTAJoinMobile({
  ctaHref = "https://waitlist.dendrites.ai/",
  ctaLabel = "Join Airdrop",
}: CTAJoinMobileProps) {
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
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [videoReady]);

  return (
    <section className="cta-mobile-premium" ref={sectionRef}>
      <div className="cta-mobile-container">
        <div className="cta-mobile-header">
          <span className="cta-chip">Season-0</span>
          <h3>Join the Future of Crypto Commerce</h3>
          <p>
            Predictable fees, refunds that actually clear, and premium escrow backed by USDC.
            Join from your phone and get verified in minutes.
          </p>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            {ctaLabel}
          </a>
        </div>

        <div className="cta-mobile-video-shell">
          <div className="cta-mobile-video-frame" aria-hidden="true">
            {videoReady ? (
              <video
                className="cta-mobile-video"
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
              <div className="cta-mobile-video-placeholder">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </div>

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

      <style>{`
        .cta-mobile-premium {
          background: transparent;
          padding: 40px 16px;
          position: relative;
          border-top: 1px solid rgba(148,163,184,0.15);
          border-bottom: 1px solid rgba(148,163,184,0.15);
        }

        .cta-mobile-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .cta-mobile-header {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cta-chip {
          align-self: flex-start;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
          letter-spacing: 0.2em;
          font-size: 0.68rem;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          background: transparent;
        }

        .cta-mobile-header h3 {
          font-size: 1.85rem;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .cta-mobile-header p {
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          font-size: 1rem;
        }

        .cta-button {
          margin-top: 4px;
          width: 100%;
          padding: 12px 28px;
          border-radius: 999px;
          background: linear-gradient(135deg, #a3e635, #06b6d4);
          color: #020617;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.9rem;
          text-align: center;
          box-shadow: 0 18px 40px rgba(163,230,53,0.25), 0 0 70px rgba(6,182,212,0.12);
          transition: all 250ms ease;
        }

        .cta-button:active {
          transform: scale(0.97);
        }

        .cta-mobile-video-shell {
          width: 100%;
        }

        .cta-mobile-video-frame {
          width: 100%;
          height: 150px;
          border-radius: 16px;
          border: 1px solid rgba(148,163,184,0.3);
          overflow: hidden;
          position: relative;
        }

        .cta-mobile-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cta-mobile-video-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px dashed rgba(148,163,184,0.3);
        }

        .cta-mobile-video-placeholder span {
          display: block;
          width: 20%;
          height: 2px;
          background: rgba(148,163,184,0.4);
        }

        .cta-milestones {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cta-milestone {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }

        .milestone-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: 1px solid rgba(125,211,252,0.7);
          background: radial-gradient(circle, rgba(34,211,238,0.85), rgba(14,165,233,0.2));
          box-shadow: 0 0 10px rgba(34,211,238,0.45);
          margin-top: 4px;
          flex-shrink: 0;
        }

        .milestone-label {
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.78);
          margin-bottom: 4px;
        }

        .milestone-copy {
          font-size: 0.86rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.65);
        }

        .cta-status-inline {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cta-status-label {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: rgba(125,211,252,0.85);
        }

        .cta-status-items {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.84rem;
          color: rgba(255,255,255,0.75);
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

        @media (max-width: 420px) {
          .cta-mobile-premium {
            padding: 48px 16px;
          }

          .cta-mobile-header h3 {
            font-size: 1.75rem;
          }

          .cta-mobile-video-frame {
            height: 120px;
          }

          .cta-milestones {
            gap: 14px;
          }
        }
      `}</style>
    </section>
  );
}
