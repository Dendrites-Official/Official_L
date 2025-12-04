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

    return () => observer.disconnect();
  }, [videoReady]);

  return (
    <section className="cta-mobile-shell" ref={sectionRef}>
      <div className="cta-mobile-inner">
        {/* NFT CARD (same vibe as desktop, but compact) */}
        <div className="cta-mobile-card">
          <div className="cta-mobile-media-frame">
            <div className="cta-mobile-media-inner">
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
                  <div className="cta-mobile-line" />
                  <div className="cta-mobile-line" />
                  <div className="cta-mobile-dot" />
                </div>
              )}
              <div className="cta-mobile-glare" />
            </div>
          </div>

          <div className="cta-mobile-caption">
            <span className="cta-mobile-caption-title">Neuron Pass • Genesis</span>
            <span className="cta-mobile-caption-meta">
              Access credential for Season-0 and early DNDX utility.
            </span>
          </div>
        </div>

        {/* COPY + CTA */}
        <div className="cta-mobile-copy">
          <div className="cta-mobile-chip-row">
            <span className="cta-mobile-chip">Season-0 Priority Access</span>
          </div>

          <h3 className="cta-mobile-title">Join the Dendrites waitlist</h3>

          <p className="cta-mobile-sub">
            Predictable fees, real refunds, and escrow for real work — so crypto behaves like
            a payment rail, not a guessing game.
          </p>

          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-mobile-btn"
          >
            {ctaLabel}
          </a>

          <div className="cta-mobile-note">
            <span className="cta-mobile-dot" />
            Limited Season-0 capacity. Replies usually within 24 hours.
          </div>

          <div className="cta-mobile-points">
            <div className="cta-mobile-point">
              <span className="cta-mobile-point-dot" />
              <div>
                <p className="cta-mobile-point-label">Mission-0 Sync</p>
                <p className="cta-mobile-point-copy">
                  Wallet + identity sync unlocks a launch badge and early multipliers.
                </p>
              </div>
            </div>
            <div className="cta-mobile-point">
              <span className="cta-mobile-point-dot" />
              <div>
                <p className="cta-mobile-point-label">Neuron Pass tiers</p>
                <p className="cta-mobile-point-copy">
                  Standard + Genesis NFTs map to higher allocations and escalation.
                </p>
              </div>
            </div>
            <div className="cta-mobile-point">
              <span className="cta-mobile-point-dot" />
              <div>
                <p className="cta-mobile-point-label">Galaxy Ladder</p>
                <p className="cta-mobile-point-copy">
                  Top 1K leaderboard collectibles once Presale-1 closes.
                </p>
              </div>
            </div>
          </div>

          <div className="cta-mobile-status">
            <span className="cta-mobile-status-label">Project status</span>
            <div className="cta-mobile-status-list">
              <span>Token deployed • Nov 2025</span>
              <span>Season-0 live • Oct 17</span>
              <span>Predictable Gas + SafetySend (testnet)</span>
              <span>Presale-1 • Q1 2026</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* SHELL – no background/borders, uses page theme */
        .cta-mobile-shell {
          width: 100%;
          background: transparent;
          border: none;
          padding: 24px 0 32px;
        }

        .cta-mobile-inner {
          max-width: 520px;
          margin: 0 auto;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        /* NFT CARD */
        .cta-mobile-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cta-mobile-media-frame {
          border-radius: 18px;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(249,249,249,0.38),
            rgba(15,15,15,1)
          );
        }

        .cta-mobile-media-inner {
          position: relative;
          border-radius: 17px;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          background: #020617;
          box-shadow: 0 18px 50px rgba(0,0,0,0.75);
        }

        .cta-mobile-video,
        .cta-mobile-video-placeholder {
          width: 100%;
          height: 100%;
          display: block;
        }

        .cta-mobile-video {
          object-fit: cover;
        }

        .cta-mobile-video-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .cta-mobile-line {
          width: 24%;
          height: 2px;
          background: rgba(156,163,175,0.9);
        }

        .cta-mobile-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: rgba(229,231,235,0.9);
        }

        .cta-mobile-glare {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            rgba(249,250,251,0.22),
            transparent 45%
          );
          mix-blend-mode: screen;
          opacity: 0.45;
        }

        .cta-mobile-caption {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 0.8rem;
          color: rgba(229,231,235,0.96);
        }

        .cta-mobile-caption-title {
          font-weight: 600;
        }

        .cta-mobile-caption-meta {
          font-size: 0.78rem;
          color: rgba(148,163,184,0.96);
        }

        /* COPY */
        .cta-mobile-copy {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cta-mobile-chip-row {
          display: flex;
          justify-content: flex-start;
        }

        .cta-mobile-chip {
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.7);
          font-size: 0.66rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(229,231,235,0.96);
          background: rgba(0,0,0,0.7);
        }

        .cta-mobile-title {
          font-size: 1.45rem;
          line-height: 1.15;
          letter-spacing: -0.03em;
          font-weight: 700;
          color: #f9fafb;
        }

        .cta-mobile-sub {
          font-size: 0.9rem;
          line-height: 1.6;
          color: rgba(209,213,219,0.9);
        }

        /* PREMIUM DARK BUTTON */
        .cta-mobile-btn {
          margin-top: 2px;
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 24px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          background: linear-gradient(135deg, #FFFFFF 0%, #E8E8E8 50%, #C0C0C0 100%);
          color: #000000;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 12px 32px rgba(255, 255, 255, 0.15), 0 4px 12px rgba(0, 0, 0, 0.6);
          transition:
            transform 140ms ease,
            box-shadow 140ms ease,
            background 140ms ease,
            border-color 140ms ease;
        }

        .cta-mobile-btn:active {
          transform: translateY(1px) scale(0.98);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.12), 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .cta-mobile-btn:hover {
          background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #D8D8D8 100%);
          border-color: rgba(255, 255, 255, 1);
          box-shadow: 0 16px 40px rgba(255, 255, 255, 0.25), 0 6px 16px rgba(0, 0, 0, 0.8);
        }

        .cta-mobile-note {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.76rem;
          color: rgba(148,163,184,0.96);
        }

        .cta-mobile-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #f9fafb;
          box-shadow: 0 0 10px rgba(249,250,251,0.7);
          flex-shrink: 0;
        }

        /* POINTS */
        .cta-mobile-points {
          margin-top: 6px;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 10px;
        }

        .cta-mobile-point {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .cta-mobile-point-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.9);
          margin-top: 5px;
          flex-shrink: 0;
        }

        .cta-mobile-point-label {
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(229,231,235,0.96);
          margin-bottom: 2px;
        }

        .cta-mobile-point-copy {
          font-size: 0.8rem;
          line-height: 1.5;
          color: rgba(156,163,175,0.96);
        }

        /* STATUS */
        .cta-mobile-status {
          margin-top: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cta-mobile-status-label {
          font-size: 0.66rem;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: rgba(156,163,175,0.96);
        }

        .cta-mobile-status-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 12px;
          font-size: 0.78rem;
          color: rgba(148,163,184,0.96);
        }

        @media (max-width: 400px) {
          .cta-mobile-inner {
            padding-inline: 14px;
          }

          .cta-mobile-title {
            font-size: 1.35rem;
          }

          .cta-mobile-sub {
            font-size: 0.86rem;
          }
        }
      `}</style>
    </section>
  );
}
