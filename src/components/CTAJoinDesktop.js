"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useCallback } from "react";
import Spline from "@splinetool/react-spline";
const isDev = import.meta.env.MODE === 'development';
const SCENE_URL = "https://prod.spline.design/qskE42qwDZauPPC6/scene.splinecode";
export default function CTAJoinDesktop({ ctaHref = "https://waitlist.dendrites.ai/", ctaLabel = "Join the Waitlist", }) {
    const splineRef = useRef(null);
    const handleLoad = useCallback((app) => {
        splineRef.current = app;
        if (isDev) {
            console.log("[CTAJoinDesktop] Spline loaded successfully!");
        }
    }, []);
    const handleError = useCallback((error) => {
        if (isDev) {
            console.error("[CTAJoinDesktop] Spline error:", error);
        }
    }, []);
    return (_jsxs("section", { className: "cta-desktop-outer", children: [_jsxs("div", { className: "cta-desktop-frame", children: [_jsx(Spline, { scene: SCENE_URL, onLoad: handleLoad, onError: handleError, className: "cta-desktop-spline" }), _jsx("a", { href: ctaHref, target: "_blank", rel: "noopener noreferrer", "aria-label": ctaLabel, className: "cta-desktop-overlay", onClick: () => console.log("[CTAJoinDesktop] Overlay clicked →", ctaHref) }), _jsx("div", { className: "cta-desktop-bottom-gradient", "aria-hidden": "true" })] }), _jsx("style", { children: `
        /* Full-bleed hero */
        .cta-desktop-outer {
          position: relative;
          width: 100vw;
          margin: 0;
          padding: 0;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          background: #000;
          overflow: hidden;
          display: flex;
          justify-content: center;
        }

        .cta-desktop-frame {
  position: relative;
  width: 100%;
  height: clamp(520px, 82vh, 980px); /* or min(64vh, 520px) if you prefer */
  min-height: 340px;
}

        /* Spline fill */
        .cta-desktop-spline {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .cta-desktop-spline canvas,
        .cta-desktop-spline iframe {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
          object-fit: cover !important;      /* cinematic, edge-to-edge */
          object-position: center !important;
        }

        /* Tiny zoom for “ultra-premium” feel on large screens */
        @media (min-width: 1024px) {
          .cta-desktop-spline {
            transform-origin: center center;
            transform: scale(1.04);
          }
        }

        /* Touch / pointer behavior */
        .cta-desktop-spline canvas {
          touch-action: pan-y !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -webkit-touch-callout: none !important;
        }

        /* Whole hero clickable */
        .cta-desktop-overlay {
          position: absolute;
          inset: 0;
          z-index: 5;
          cursor: pointer;
          background: transparent;
          display: block;
        }

        /* Soft floor gradient into next section */
        .cta-desktop-bottom-gradient {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 56px;
          background: linear-gradient(
            to top,
            #000 0%,
            rgba(0,0,0,0.8) 40%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 4;
        }

        /* Extra love for huge desktops */
        @media (min-width: 1440px) {
          .cta-desktop-frame {
            height: clamp(620px, 86vh, 1100px);
          }
        }
      ` })] }));
}
