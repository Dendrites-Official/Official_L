"use client";

import React, { useCallback, useRef } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { getFallbackAsset, useSplineGate } from "@/lib/splineController";

type MobileSRLProps = {
  sceneUrl?: string;
};

export default function MobileSRL({
  sceneUrl = "https://prod.spline.design/Ma21i9Ulbjz29I-M/scene.splinecode",
}: MobileSRLProps) {
  const splineRef = useRef<Application | null>(null);
  const fallbackSrc = getFallbackAsset("srl");
  const { canRender } = useSplineGate({ preferred: "medium" });

  const handleLoad = useCallback((app: Application) => {
    splineRef.current = app;
    console.log("[MobileSRL] Spline loaded successfully!");
  }, []);

  const handleError = useCallback((error: any) => {
    console.error("[MobileSRL] Spline error:", error);
  }, []);

  return (
    <section className="mobile-srl-outer">
      <div className="mobile-srl-inner">
        {/* Phone-style box – Spline behaves like object-fit: contain */}
        <div className="mobile-srl-box">
          <div className="mobile-srl-frame">
            {canRender ? (
              <Spline
                scene={sceneUrl}
                onLoad={handleLoad}
                onError={handleError}
                className="mobile-srl-spline"
              />
            ) : (
              <div className="mobile-srl-spline">
                <img
                  src={fallbackSrc}
                  alt="SRL hero mobile fallback"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* === BOTTOM-LEFT OVERLAY COPY === */}
            {/* <div className="mobile-srl-overlay mobile-srl-overlay-bottom-left">
              <p className="mobile-srl-note">
                3 Lane technology is our properority ship.
              </p>
              <p className="mobile-srl-note">
                • This is not our final technology, it might change depending on
                the research and requirements.
              </p>
            </div> */}
          </div>

          {/* Soft bottom gradient (for separation from next section) */}
          <div className="mobile-srl-bottom-gradient" />
        </div>
      </div>

      <style>{`
        /* ===============================
           OUTER SECTION (full-bleed)
           =============================== */
        .mobile-srl-outer {
          position: relative;
          width: 100vw;
          margin: 0;
          padding: 0;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          /* keep background transparent so it inherits page bg */
          display: flex;
          justify-content: center;
          overflow: hidden;
          touch-action: pan-y;
          -webkit-overflow-scrolling: touch;
        }

        /* Full width, no side padding */
        .mobile-srl-inner {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          padding: 12px 0 32px; /* only vertical padding */
        }

        /* ===============================
           FIXED ASPECT-RATIO BOX
           (treat scene like a phone screen)
           =============================== */
        .mobile-srl-box {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 16;    /* tall, but we'll cap height with vh */
          height: min(80vh, 640px); /* 🔥 less tall, more responsive */
          min-height: 320px;
          overflow: visible;
        }

        .mobile-srl-frame {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 18px;
          overflow: hidden;
          /* you can uncomment these if you want a framed look */
          /* border: 1px solid rgba(255, 255, 255, 0.14); */
          /* background: radial-gradient(circle at 20% 0%, rgba(255,255,255,0.06), transparent 60%); */
        }

        /* Fallback for browsers without aspect-ratio support */
        @supports not (aspect-ratio: 9 / 16) {
          .mobile-srl-box {
            height: auto;
          }
          .mobile-srl-box::before {
            content: "";
            display: block;
            padding-top: 177.78%; /* 16/9 * 100 - inverted */
          }
          .mobile-srl-box > * {
            position: absolute;
            inset: 0;
          }
        }

        /* ===============================
           SPLINE CANVAS – OBJECT-FIT: CONTAIN
           =============================== */
        .mobile-srl-spline {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform-origin: center center;
          transform: scale(0.88); /* base zoom-out so edges are safe */
        }

        .mobile-srl-spline canvas,
        .mobile-srl-spline iframe {
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          max-width: 100% !important;
          max-height: 100% !important;
          object-fit: contain !important;   /* ✅ never crop at container edges */
          object-position: center !important;
        }

        /* Prevent scroll-to-zoom / pinch-zoom on canvas */
        .mobile-srl-spline canvas {
          touch-action: pan-y !important;
          user-select: none !important;
          -webkit-user-select: none !important;
          -webkit-touch-callout: none !important;
        }

        /* Soft bottom gradient for separation from next section */
        .mobile-srl-bottom-gradient {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 32px;
          background: linear-gradient(
            to top,
            #000 0%,
            #000 60%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* ===============================
           TEXT OVERLAY – BOTTOM LEFT
           =============================== */
        .mobile-srl-overlay {
          position: absolute;
          z-index: 3;
          color: #f9fafb;
          pointer-events: none; /* text should not block interactions */
          text-shadow: 0 0 18px rgba(0,0,0,0.6);
        }

        .mobile-srl-overlay-bottom-left {
          left: 16px;
          right: 16px;
          bottom: 18px; /* moved up a bit for breathing room */
          max-width: 84%;
          padding: 8px 10px;
          border-radius: 10px;
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.85),
            rgba(0,0,0,0.45)
          ); /* subtle pill so text pops on bright parts of scene */
        }

        .mobile-srl-note {
          font-size: 12px;          /* 🔥 slightly larger */
          line-height: 1.5;
          color: rgba(229, 231, 235, 0.95);
          margin: 0 0 4px 0;
        }

        .mobile-srl-note:last-child {
          margin-bottom: 0;
        }

        /* ===============================
           BREAKPOINTS (visibility + extra scaling)
           =============================== */

        /* Very small phones (≤ 400px) – more zoom-out */
        @media (max-width: 400px) {
          .mobile-srl-inner {
            padding-top: 10px;
            padding-bottom: 28px;
          }
          .mobile-srl-box {
            height: min(78vh, 560px);
            min-height: 300px;
          }
          .mobile-srl-spline {
            transform: scale(0.8);
          }
          .mobile-srl-note {
            font-size: 11px;
          }
        }

        /* Regular phones (401–767px) – iPhones, Pixels, most Androids */
        @media (min-width: 401px) and (max-width: 767px) {
          .mobile-srl-inner {
            padding-top: 14px;
            padding-bottom: 32px;
          }
          .mobile-srl-box {
            height: min(80vh, 620px);
            min-height: 320px;
          }
          .mobile-srl-spline {
            transform: scale(0.86);
          }
          .mobile-srl-note {
            font-size: 12px;
          }
        }

        /* Tablets (768–1024px) – iPads, Galaxy Tabs, etc. */
        @media (min-width: 768px) and (max-width: 1024px) {
          .mobile-srl-inner {
            padding-top: 20px;
            padding-bottom: 40px;
          }
          .mobile-srl-box {
            height: min(80vh, 700px);
            min-height: 420px;
          }
          .mobile-srl-spline {
            transform: scale(0.9);
          }
          .mobile-srl-note {
            font-size: 13px;
          }
        }

        /* Desktop (≥ 1025px) – hide mobile hero completely */
        // @media (min-width: 1025px) {
        //   .mobile-srl-outer {
        //     display: none !important;
        //   }
        // }

        /* iOS safe areas */
        @supports (padding: max(0px)) {
          .mobile-srl-inner {
            padding-top: max(12px, env(safe-area-inset-top));
            padding-bottom: max(32px, env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </section>
  );
}
