"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/SRLLayerHero.tsx
import { useRef } from "react";
import SplineLoader from "@/components/SplineLoader";
import { useSplineInteractions } from "@/hooks/useSplineInteractions";
export default function SRLLayerHero() {
    const splineAreaRef = useRef(null);
    useSplineInteractions(splineAreaRef);
    return (_jsxs("section", { className: "relative w-full bg-black overflow-hidden", children: [_jsx("div", { ref: splineAreaRef, className: "relative w-full h-[520px] md:h-[640px]", children: _jsx(SplineLoader, { scene: "https://prod.spline.design/Ma21i9Ulbjz29I-M/scene.splinecode", disableOrbitControls: false, disableZoom: false }) }), _jsx("div", { className: "srl2-hero-gradient" }), _jsx("style", { children: `
        /* ===============================
           DESKTOP HERO (FULL SCREEN)
           =============================== */
        .srl2-hero {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          height: 100vh;
          margin: 0;
          padding: 0;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          overflow: hidden;
          // background:
          //   radial-gradient(circle at 20% 0%, rgba(255,255,255,0.06), transparent 55%),
          //   #000;
        }

        @supports (min-height: 100svh) {
          .srl2-hero {
            min-height: 100svh;
            height: 100svh;
          }
        }

        .srl2-hero-inner {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* Spline fills the entire hero */
        .srl2-hero-spline {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .srl2-hero-spline canvas,
        .srl2-hero-spline iframe {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
          object-fit: cover !important;       /* full-bleed desktop hero */
          object-position: center center !important;
        }

        /* Glam overlay: bottom darkening + blue glow */
        .srl2-hero-gradient {
          pointer-events: none;
          position: absolute;
          inset: 0;
          // background:
          //   linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 40%),
          //   radial-gradient(circle at 80% 20%, rgba(0,112,243,0.4), transparent 55%);
          mix-blend-mode: normal;
          z-index: 2;
        }

        /* Desktop hero is HIDDEN on iPad & below */
        @media (max-width: 1024px) {
          .srl2-hero {
            display: none !important;
          }
        }
      ` })] }));
}
