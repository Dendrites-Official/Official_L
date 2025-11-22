// src/components/Hero1.tsx
import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import SplineLoader from "@/components/SplineLoader";
import type { Application } from "@splinetool/runtime";
import { useSplineInteractions } from "@/hooks/useSplineInteractions";

/** Your scene URL */
const SCENE = "https://prod.spline.design/wrOy3QowMgzMN0CK/scene.splinecode";

export default function Hero1() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const splineAreaRef = useRef<HTMLDivElement | null>(null);
  const splineRef = useRef<Application | null>(null);

  // unify cursors / context menu for this spline area
  useSplineInteractions(splineAreaRef);

  const handleLoad = useCallback((app: Application) => {
    splineRef.current = app;
    
    // Mobile fix: Ensure canvas becomes visible and interactive
    requestAnimationFrame(() => {
      const canvas = splineAreaRef.current?.querySelector('canvas');
      if (canvas) {
        // Force visibility and interaction
        canvas.style.visibility = 'visible';
        canvas.style.opacity = '1';
        // Trigger reflow to ensure browser processes the scene
        void canvas.offsetHeight;
      }
    });
    
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    if (import.meta.env.DEV) {
      console.error("[Hero1] Failed to load Spline scene");
    }
  }, []);

  return (
    <section
      ref={heroRef}
      data-hero
      aria-label="DENDRITES — Hero"
      className="relative w-full bg-black overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      {/* --- Spline Stage --- */}
      <div 
        ref={splineAreaRef} 
        className="absolute inset-0 z-0"
      >
        <div className="spline-target">
          <SplineLoader
            scene={SCENE}
            onLoad={handleLoad}
            onError={handleError}
            disableOrbitControls={false}
            disableZoom={false}
            forceLoad
            fallback={
              <div className="w-full h-full bg-black flex items-center justify-center">
                <img
                  src="/logo_name2.png"
                  alt="Dendrites"
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
              
            }
            
          />
        </div>
      </div>



      {/* --- TOP-LEFT COPY (overlay, no pointer events) --- */}
      <motion.div 
        className="absolute left-4 top-6 sm:left-10 sm:top-10 z-10 max-w-xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15]">
          <span className="block text-white/95">
            COMMERCE-GRADE
          </span>
          <span className="block text-white/95">
            PAYMENTS
          </span>
          <span className="block text-white/95">
            Web3 simplicity.
          </span>
        </h1>
        <p className="mt-3 text-white/70 text-sm sm:text-base max-w-md">
          Predictable fees. Real refunds. Built for commerce, not speculation.
        </p>
      </motion.div>

      {/* --- CENTERED HERO TEXT - Bottom Right --- */}
      <motion.div 
        className="absolute right-4 bottom-6 sm:right-10 sm:bottom-10 z-10 max-w-4xl pointer-events-none text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15]">
          <span className="block text-white/95">
            Dendrites is a next-generation
          </span>
          <span className="block text-white/95">
            crypto payment protocol with
          </span>
          <span className="block text-white/95">
            Predictable Gas™, UNDO refunds,
          </span>
          <span className="block text-white/95">
            Escrow, and instant settlements
          </span>
          <span className="block text-white/95">
            built for Web3 businesses.
          </span>
        </h1>
      </motion.div>

      

      {/* --- Floor gradient for legibility --- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-56 z-5"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Local styles just to size Spline nicely */}
      <style>{`
        @supports (height: 100dvh) {
          section[aria-label*="Hero"] { min-height: 100dvh; }
        }

        /* Let Spline fill the hero */
        section[aria-label*="Hero"] .spline-target {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
          pointer-events: auto !important;
          touch-action: auto !important;
        }

        section[aria-label*="Hero"] .spline-target iframe[title="Spline"],
        section[aria-label*="Hero"] .spline-target iframe[src*="spline"],
        section[aria-label*="Hero"] .spline-target canvas {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          pointer-events: auto !important;
          touch-action: auto !important;
        }

        [data-hero],
        [data-hero] .sticky,
        [data-hero] .fixed {
          transform: none !important;
          will-change: auto !important;
        }

        /* Ambient glow effect */
        @keyframes ambient-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .ambient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: ambient-glow 8s ease-in-out infinite;
          pointer-events: none;
        }
        
        .orb-1 {
          top: 20%;
          left: 10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0, 209, 255, 0.15) 0%, transparent 70%);
          animation-delay: 0s;
        }
        
        .orb-2 {
          bottom: 30%;
          right: 15%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
          animation-delay: 2s;
        }
        
        .orb-3 {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%);
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
