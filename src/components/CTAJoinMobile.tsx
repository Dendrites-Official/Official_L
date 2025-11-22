"use client";

import { useRef, useCallback, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

const isDev = import.meta.env.MODE === 'development';

const SCENE_URL =
  "https://prod.spline.design/qskE42qwDZauPPC6/scene.splinecode";

type CTAJoinMobileProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function CTAJoinMobile({
  ctaHref = "https://waitlist.dendrites.ai/",
  ctaLabel = "Join the Waitlist",
}: CTAJoinMobileProps) {
  const splineRef = useRef<Application | null>(null);

  // Zoom the Spline camera based on viewport width & aspect ratio
  const applyZoomForViewport = useCallback((app: Application) => {
    if (typeof window === "undefined") return;

    const anyApp = app as any;
    if (typeof anyApp.setZoom !== "function") {
      // Older runtime – nothing else to do
      return;
    }

    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const ar = w / h; // aspect ratio

    let zoom: number;

    // Primary decision by width, refined by aspect ratio
    if (w <= 375) {
      // Small phones – iPhone SE, older Androids
      zoom = 0.5;
    } else if (w <= 430) {
      // ✅ Modern phones – iPhone 12 / 12 Pro / 12 Pro Max / 13 / 14, Pixels, Samsungs
      zoom = ar < 0.7 ? 0.5 : 0.55;
    } else if (w <= 767) {
      // Big phones / phablets
      zoom = 0.6;
    } else if (w <= 1024) {
      // Tablets (iPads, Galaxy Tab, etc.)
      zoom = 0.8;
    } else {
      // Larger screens (if this component is ever used there)
      zoom = 1;
    }

    try {
      anyApp.setZoom(zoom);
    } catch {
      // ignore if runtime complains
    }
  }, []);

  const handleLoad = useCallback(
    (app: Application) => {
      splineRef.current = app;
      console.log("[CTAJoinMobile] Spline loaded");
      applyZoomForViewport(app);
    },
    [applyZoomForViewport]
  );

  const handleError = useCallback((error: any) => {
    if (isDev) {
      console.error("[CTAJoinMobile] Spline error:", error);
    }
  }, []);

  // Re-apply zoom on resize / orientation change
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onResize = () => {
      if (!splineRef.current) return;
      applyZoomForViewport(splineRef.current);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [applyZoomForViewport]);

  return (
    <section className="cta-mobile-outer">
      <Spline
        scene={SCENE_URL}
        onLoad={handleLoad}
        onError={handleError}
        className="cta-mobile-spline"
      />

      {/* Whole hero is the waitlist link */}
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ctaLabel}
        className="cta-mobile-overlay"
        onClick={() =>
          console.log("[CTAJoinMobile] Overlay clicked →", ctaHref)
        }
      />

      <style>{`
        /* =========================================
           FULL-BLEED MOBILE HERO (EDGE TO EDGE)
           ========================================= */
        .cta-mobile-outer {
          position: relative;
          width: 100vw;
          height: 90vh;   /* base – not quite full-screen to widen aspect */
          margin: 0;
          padding: 0;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          background: #000;
          overflow: hidden;
          touch-action: pan-y;
          -webkit-overflow-scrolling: touch;
        }

        @supports (height: 100dvh) {
          .cta-mobile-outer {
            height: 90dvh;  /* dynamic vh but still slightly shorter */
          }
        }

        /* Spline fills the hero section */
        .cta-mobile-spline {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        /* DOM never crops the scene – full Spline view in the box */
        .cta-mobile-outer canvas,
        .cta-mobile-outer iframe {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
          object-fit: contain !important;
          object-position: center center !important;
          background: #000;
        }

        .cta-mobile-outer canvas {
          touch-action: pan-y !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -webkit-touch-callout: none !important;
        }

        /* Entire hero is clickable */
        .cta-mobile-overlay {
          position: absolute;
          inset: 0;
          z-index: 5;
          cursor: pointer;
          background: transparent;
          display: block;
        }

        /* ===============================
           HEIGHT TUNING BY DEVICE CLASS
           =============================== */

        /* Small phones – iPhone SE, older devices */
        @media (max-width: 375px) {
          .cta-mobile-outer {
            height: min(82dvh, 640px);
          }
        }

        /* ✅ Modern phones – iPhone 12/12 Pro/12 Pro Max/13/14, Pixels, Samsungs */
        @media (min-width: 376px) and (max-width: 430px) {
          .cta-mobile-outer {
            height: min(80dvh, 640px); /* less tall -> wider aspect on 390×844 etc. */
          }
        }

        /* Big phones / small tablets portrait */
        @media (min-width: 431px) and (max-width: 767px) {
          .cta-mobile-outer {
            height: min(82dvh, 700px);
          }
        }

        /* Tablets portrait / small landscape */
        @media (min-width: 768px) and (max-width: 1024px) {
          .cta-mobile-outer {
            height: min(85vh, 780px);
          }
        }

        /* Larger screens (if this component is ever rendered there) */
        @media (min-width: 1025px) {
          .cta-mobile-outer {
            height: min(80vh, 900px);
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
}
