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
  const [mediaReady, setMediaReady] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || mediaReady) return;

    if (typeof IntersectionObserver === "undefined") {
      setMediaReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMediaReady(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mediaReady]);

  return (
    <section className="cta-shell" ref={sectionRef}>
      <div className="cta-inner">
        <div className="cta-grid">
          {/* NFT / MEDIA COLUMN */}
          <div className="cta-media-col">
            <div className="cta-media-wrap">
              <div className="cta-media-frame">
                <div className="cta-media-inner">
                  {mediaReady ? (
                    <video
                      className="cta-media-video"
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
                      <source src="/NFT.mp4" type="video/mp4" />
                    </video>
                  ) : (
                    <div className="cta-media-skeleton">
                      <div className="cta-media-line" />
                      <div className="cta-media-line" />
                      <div className="cta-media-dot" />
                    </div>
                  )}
                  <div className="cta-media-glare" />
                </div>
              </div>

              <div className="cta-media-caption">
                <span className="cta-media-title">Neuron Pass • Genesis</span>
                <span className="cta-media-meta">
                  Access credential for Season-0 and early DNDX utility.
                </span>
              </div>
            </div>
          </div>

          {/* COPY / CTA COLUMN */}
          <div className="cta-copy-col">
            <div className="cta-eyebrow-row">
              <span className="cta-eyebrow">Season-0 Priority Access</span>
            </div>

            <h2 className="cta-title">Join the Dendrites waitlist</h2>

            <p className="cta-subcopy">
              Predictable fees, real refunds, and escrow for real work — so crypto behaves like
              a payment rail, not a guessing game.
            </p>

            <div className="cta-primary-row">
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn"
              >
                {ctaLabel}
              </a>
              <p className="cta-note">
                <span className="cta-dot" />
                Limited Season-0 capacity. Replies usually within 24 hours.
              </p>
            </div>

            <div className="cta-points">
              <div className="cta-point">
                <span className="cta-point-dot" />
                <div>
                  <p className="cta-point-label">Mission-0 Sync</p>
                  <p className="cta-point-copy">
                    Wallet + identity sync unlocks a launch badge and early multipliers.
                  </p>
                </div>
              </div>
              <div className="cta-point">
                <span className="cta-point-dot" />
                <div>
                  <p className="cta-point-label">Neuron Pass tiers</p>
                  <p className="cta-point-copy">
                    Standard + Genesis NFTs map to higher allocations and escalation.
                  </p>
                </div>
              </div>
              <div className="cta-point">
                <span className="cta-point-dot" />
                <div>
                  <p className="cta-point-label">Galaxy Ladder</p>
                  <p className="cta-point-copy">
                    Top 1K leaderboard collectibles after Presale-1 closes.
                  </p>
                </div>
              </div>
            </div>

            <div className="cta-status">
              <span className="cta-status-label">Project status</span>
              <div className="cta-status-list">
                <span>Token deployed • Nov 2025</span>
                <span>Season-0 live • Oct 17</span>
                <span>Predictable Gas + SafetySend (testnet)</span>
                <span>Presale-1 • Q1 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* SHELL – no background or borders, uses page theme */
        .cta-shell {
          width: 100%;
          background: transparent;
          border: none;
          padding: clamp(24px, 4vw, 40px) 0;
        }

        .cta-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 32px);
        }

        .cta-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(20px, 4vw, 40px);
          align-items: center;
        }

        .cta-media-col {
          order: 1;
          display: flex;
          justify-content: flex-start;
        }

        .cta-copy-col {
          order: 2;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* MEDIA / NFT BOX */
        .cta-media-wrap {
          width: 100%;
          max-width: 320px;
        }

        .cta-media-frame {
          border-radius: 18px;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(249,249,249,0.38),
            rgba(15,15,15,1)
          );
        }

        .cta-media-inner {
          position: relative;
          border-radius: 17px;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          box-shadow: 0 18px 50px rgba(0,0,0,0.75);
          background: #020617;
        }

        .cta-media-video,
        .cta-media-skeleton {
          width: 100%;
          height: 100%;
          display: block;
        }

        .cta-media-video {
          object-fit: cover;
        }

        .cta-media-skeleton {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .cta-media-line {
          width: 26%;
          height: 2px;
          background: rgba(156,163,175,0.9);
        }

        .cta-media-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: rgba(229,231,235,0.9);
        }

        .cta-media-glare {
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

        .cta-media-caption {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-top: 8px;
          font-size: 0.8rem;
          color: rgba(229,231,235,0.96);
        }

        .cta-media-title {
          font-weight: 600;
        }

        .cta-media-meta {
          font-size: 0.78rem;
          color: rgba(148,163,184,0.96);
        }

        /* COPY SIDE */
        .cta-eyebrow-row {
          display: flex;
          justify-content: flex-start;
        }

        .cta-eyebrow {
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.7);
          font-size: 0.68rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(229,231,235,0.96);
          background: rgba(0,0,0,0.7);
        }

        .cta-title {
          font-size: clamp(1.9rem, 3vw, 2.4rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          font-weight: 700;
          color: #f9fafb;
        }

        .cta-subcopy {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(209,213,219,0.92);
          max-width: 32rem;
        }

        .cta-primary-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        /* NEW PREMIUM BUTTON COLORS */
        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
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
            color 140ms ease,
            border-color 140ms ease;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 40px rgba(255, 255, 255, 0.25), 0 6px 16px rgba(0, 0, 0, 0.8);
          background: linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #D8D8D8 100%);
          border-color: rgba(255, 255, 255, 1);
        }

        .cta-note {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: rgba(148,163,184,0.96);
        }

        .cta-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #f9fafb;
          box-shadow: 0 0 10px rgba(249,250,251,0.7);
          flex-shrink: 0;
        }

        /* POINTS */
        .cta-points {
          margin-top: 10px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .cta-point {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .cta-point-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          border: 1px solid rgba(148,163,184,0.9);
          margin-top: 5px;
          flex-shrink: 0;
        }

        .cta-point-label {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: rgba(229,231,235,0.96);
          margin-bottom: 2px;
        }

        .cta-point-copy {
          font-size: 0.8rem;
          line-height: 1.5;
          color: rgba(156,163,175,0.96);
        }

        /* STATUS */
        .cta-status {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cta-status-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: rgba(156,163,175,0.96);
        }

        .cta-status-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px 14px;
          font-size: 0.78rem;
          color: rgba(148,163,184,0.96);
        }

        /* RESPONSIVE */
        @media (max-width: 1024px) {
          .cta-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
          }
          .cta-points {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 768px) {
          .cta-shell {
            padding: 18px 0 26px;
          }

          .cta-inner {
            padding-inline: 16px;
          }

          .cta-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
          }

          /* Mobile: same visual language, just stacked & tighter */
          .cta-media-col {
            order: 1;
            justify-content: center;
          }

          .cta-copy-col {
            order: 2;
            gap: 10px;
          }

          .cta-media-wrap {
            max-width: 320px;
          }

          .cta-title {
            font-size: 1.55rem;
          }

          .cta-subcopy {
            font-size: 0.9rem;
            max-width: 100%;
          }

          .cta-btn {
            width: 100%;
            justify-content: center;
            padding-block: 11px;
          }

          .cta-primary-row {
            align-items: flex-start;
          }

          .cta-note {
            font-size: 0.78rem;
          }

          .cta-points {
            grid-template-columns: minmax(0, 1fr);
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .cta-inner {
            padding-inline: 14px;
          }

          .cta-title {
            font-size: 1.45rem;
          }

          .cta-subcopy {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </section>
  );
}
