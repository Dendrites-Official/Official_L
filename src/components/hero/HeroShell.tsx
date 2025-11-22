import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import RobotSpline from './RobotSpline';
import SlidePanel from './SlidePanel';
import CodeTicker from './CodeTicker';

/**
 * HeroShell Component
 * 
 * Main composition of the hero section with:
 * - Robot Spline (70% column on desktop, full on mobile)
 * - Sliding panel that appears on scroll into view
 * - Code ticker (30% column on desktop)
 * - CTA button that never gets covered (z-20)
 * 
 * Height clamping strategy:
 * - Uses ResizeObserver to track Spline container height
 * - Applies height to both SlidePanel and CodeTicker
 * - CSS variable --spline-h for dynamic height reference
 * 
 * Layout:
 * - Desktop (≥1024px): 70% main + 30% code ticker side-by-side
 * - Tablet (768-1023px): Stacked rows
 * - Mobile (<768px): Stacked with drawer-style panel
 */

interface HeroShellProps {
  onCtaClick?: () => void;
}

export default function HeroShell({ onCtaClick }: HeroShellProps) {
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [splineHeight, setSplineHeight] = useState(720);
  const [showPanel, setShowPanel] = useState(false);

  /**
   * Height clamping with ResizeObserver
   * Watches Spline container and updates state + CSS variable
   */
  useEffect(() => {
    if (!splineContainerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        setSplineHeight(height);
        // Set CSS variable for any child components that need it
        document.documentElement.style.setProperty('--spline-h', `${height}px`);
      }
    });

    resizeObserver.observe(splineContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      document.documentElement.style.removeProperty('--spline-h');
    };
  }, []);

  // Handle CTA button click - toggles the sliding panel
  const handleCtaClick = () => {
    setShowPanel(!showPanel);
    if (onCtaClick) {
      onCtaClick();
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0B0B0D 100%)',
      }}
    >
      {/* Grid Container: 70/30 split on desktop */}
      <div className="relative w-full max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%]">
          
          {/* Left Column: Spline + Sliding Panel + CTA */}
          <div className="relative">
            {/* Spline Container */}
            <RobotSpline ref={splineContainerRef} />

            {/* Sliding Panel - overlays Spline but stays within its height */}
            <SlidePanel isVisible={showPanel} maxHeight={splineHeight} />

            {/* CTA Button - ALWAYS ON TOP (z-20) */}
            <motion.div
              className="absolute bottom-8 left-8 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <button
                onClick={handleCtaClick}
                className="group relative px-6 py-3 sm:px-8 sm:py-4 
                           bg-gradient-to-r from-cyan-500 to-blue-600 
                           text-white font-bold text-sm sm:text-base
                           rounded-lg overflow-hidden
                           hover:shadow-[0_0_30px_rgba(0,209,255,0.5)]
                           transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Start Full Awakening Experience"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>▶</span>
                  <span>EXPERIENCE FULL AWAKENING</span>
                </span>
                
                {/* Hover gradient effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Code Ticker (30%) - Desktop only */}
          <div className="hidden lg:block relative">
            <CodeTicker maxHeight={splineHeight} />
          </div>
        </div>

        {/* Mobile Code Ticker - Below Spline on mobile/tablet */}
        <div className="lg:hidden">
          <CodeTicker maxHeight={300} />
        </div>
      </div>

      {/* Decorative grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 209, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 209, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>
    </section>
  );
}
