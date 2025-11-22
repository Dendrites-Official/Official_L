import React from 'react';
import { motion } from 'framer-motion';

/**
 * SlidePanel Component
 * 
 * A right-to-left sliding panel that appears within the Spline section.
 * Height is clamped to match the Spline container height via CSS variable.
 * 
 * Z-index strategy:
 * - Panel: z-10 (slides over Spline but under CTA)
 * - CTA button: z-20 (always on top, never covered)
 * 
 * Animation:
 * - Initial: x: '100%' (off-canvas right)
 * - Animate: x: 0 (slides into view)
 * - Respects prefers-reduced-motion (reduces translate by 80%)
 */

interface SlidePanelProps {
  isVisible: boolean;
  maxHeight?: number;
  children?: React.ReactNode;
}

export default function SlidePanel({ isVisible, maxHeight, children }: SlidePanelProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <motion.div
      className="absolute top-0 left-0 w-full bg-white/5 backdrop-blur-md 
                 border-r border-white/10 overflow-hidden z-10"
      style={{
        height: maxHeight ? `${maxHeight}px` : '100%',
      }}
      initial={{ x: prefersReducedMotion ? '-20%' : '-100%', opacity: 0 }}
      animate={
        isVisible
          ? { x: 0, opacity: 1 }
          : { x: prefersReducedMotion ? '-20%' : '-100%', opacity: 0 }
      }
      transition={{
        type: 'tween',
        duration: prefersReducedMotion ? 0.3 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      role="region"
      aria-label="Interactive slide panel"
    >
      {/* Grid lines decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full p-8">
        {children || (
          <div className="flex flex-col items-center justify-center h-full text-center gap-12">
            {/* Music Bars Visualization */}
            <motion.div
              className="flex items-end justify-center gap-2 h-32"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-sm"
                  animate={{
                    height: [
                      `${20 + Math.random() * 80}%`,
                      `${30 + Math.random() * 70}%`,
                      `${20 + Math.random() * 80}%`,
                    ],
                  }}
                  transition={{
                    duration: 0.8 + Math.random() * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                  style={{
                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                System Initialized
              </h3>
              <p className="text-white/60 font-mono text-sm max-w-md">
                DNDX Protocol Active • Predictable Gas • Safe Commerce
              </p>
            </motion.div>
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
    </motion.div>
  );
}
