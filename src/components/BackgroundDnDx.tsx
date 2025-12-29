import { motion } from 'framer-motion';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useDeviceCapabilities } from '@/lib/deviceCapabilities';
import { SplineSkeleton } from '@/components/ui/SkeletonLoader';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Lazy load Spline for better performance
const Spline = lazy(() => import('@splinetool/react-spline'));

export default function BackgroundDnDx() {
  // Device capability detection - Default to true (show Spline) until proven otherwise
  const capabilities = useDeviceCapabilities();
  const shouldShowSpline = capabilities 
    ? (capabilities.isDesktop || capabilities.tier !== 'low-end') 
    : true; // Always show on desktop, or non-low-end devices
  const shouldReduce = useReducedMotion();
  
  // Detect Android low-end devices
  const isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
  const isLowEndAndroid = isAndroid && capabilities?.tier === 'low-end';
  
  const [splineApp, setSplineApp] = useState<any>(null);

  // Silence unused state warning + hook for future customisation
  useEffect(() => {
    if (splineApp) {
      // Placeholder: keep reference to loaded Spline app if you need it later
      // console.log('Spline app loaded', splineApp);
    }
  }, [splineApp]);

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Main Container */}
      <div className="relative w-full min-h-screen h-screen flex">
        {/* Robot Section */}
        <motion.div
          className="relative bg-black min-h-screen h-screen w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: shouldReduce ? 0.3 : 0.8,
            ease: shouldReduce ? 'linear' : [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Large DENDRITES logo behind Spline - Hidden on low-end Android */}
          {!isLowEndAndroid && (
            <div className="absolute inset-0 flex items-start justify-center z-0 pt-16 sm:pt-20 md:pt-12 lg:pt-16 overflow-hidden">
              <motion.div
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: shouldReduce ? 0.3 : 1.5, ease: 'easeOut' }}
                className="text-center"
                style={{ 
                  width: '100%',
                  maxWidth: '95vw',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img 
                  src="/looogo2.png" 
                  alt="DENDRITES" 
                  className="dendrites-logo-red"
                  style={{ 
                    width: '80vw',
                    maxWidth: '1200px',
                    height: 'auto',
                    filter: 'brightness(0) saturate(100%) invert(27%) sepia(98%) saturate(7426%) hue-rotate(357deg) brightness(99%) contrast(114%)',
                    objectFit: 'contain'
                  }}
                />
              </motion.div>
            </div>
          )}

          {/* Spline 3D scene on top - Conditional based on device capability */}
          <div className="absolute inset-0 z-10 w-full h-full">
            {shouldShowSpline ? (
              <Suspense fallback={<SplineSkeleton />}>
                <Spline
                  scene="https://prod.spline.design/ynTLyzsgTExDGNe9/scene.splinecode"
                  style={{ width: '100%', height: '100%' }}
                  onLoad={(app) => setSplineApp(app)}
                />
              </Suspense>
            ) : (
              /* Fallback for mobile/low-end devices */
              <div className="w-full h-full flex items-center justify-center overflow-hidden">
                <img
                  src={isLowEndAndroid ? "/A_robot.png" : "/robottt.webp"}
                  alt="DNDX Robot"
                  className="max-w-[90%] max-h-[90%] object-contain"
                  style={{
                    filter: 'brightness(1.1) contrast(1.05)',
                    imageRendering: 'crisp-edges',
                  }}
                />
              </div>
            )}
          </div>
        </motion.div>
        {/* END Robot Section */}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

        /* Hide Spline watermark */
        #spline-watermark,
        [class*="watermark"],
        [class*="spline-watermark"],
        a[href*="spline.design"],
        canvas + div,
        canvas ~ a[href*="spline"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }

        .dendrites-logo-container {
          width: 100%;
          max-width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dendrites-logo {
          width: clamp(400px, 90vw, 1800px);
          height: auto;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
          filter:
            brightness(0)
            saturate(100%)
            invert(27%)
            sepia(98%)
            saturate(7426%)
            hue-rotate(357deg)
            brightness(103%)
            contrast(114%);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          max-width: 100%;
        }

        @media (max-width: 374px) {
          .dendrites-logo {
            width: clamp(320px, 92vw, 400px);
          }
        }

        @media (min-width: 375px) and (max-width: 428px) {
          .dendrites-logo {
            width: clamp(350px, 90vw, 450px);
          }
        }

        @media (min-width: 429px) and (max-width: 480px) {
          .dendrites-logo {
            width: clamp(400px, 88vw, 520px);
          }
        }

        @media (min-width: 481px) and (max-width: 600px) {
          .dendrites-logo {
            width: clamp(450px, 86vw, 600px);
          }
        }

        @media (min-width: 601px) and (max-width: 768px) {
          .dendrites-logo {
            width: clamp(550px, 85vw, 800px);
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .dendrites-logo {
            width: clamp(700px, 82vw, 1100px);
          }
        }

        @media (min-width: 1025px) {
          .dendrites-logo {
            width: clamp(900px, 80vw, 1500px);
          }
        }

        @media (min-width: 1920px) {
          .dendrites-logo {
            width: clamp(1200px, 75vw, 1800px);
          }
        }

        @media (max-width: 926px) and (orientation: landscape) {
          .dendrites-logo {
            width: clamp(300px, 60vw, 500px);
          }
        }

        .dendrites-text {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          letter-spacing: 0.02em;
          color: #FF3333;
          text-transform: uppercase;
          line-height: 1;
          user-select: none;
          pointer-events: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          filter: contrast(1.4) brightness(1.1);
          text-shadow:
            0 0 20px rgba(255, 51, 51, 0.6),
            0 0 40px rgba(255, 51, 51, 0.4),
            0 5px 25px rgba(0, 0, 0, 0.6);
          word-wrap: normal;
          overflow-wrap: normal;
          hyphens: none;
          white-space: nowrap;
        }

        @media (max-width: 374px) {
          .dendrites-text {
            font-size: clamp(2.5rem, 10vw, 4rem);
            letter-spacing: 0.1em;
            line-height: 0.85;
          }
        }

        @media (min-width: 375px) and (max-width: 428px) {
          .dendrites-text {
            font-size: clamp(3rem, 11vw, 5rem);
            letter-spacing: 0.12em;
            line-height: 0.9;
          }
        }

        @media (min-width: 429px) and (max-width: 480px) {
          .dendrites-text {
            font-size: clamp(3.5rem, 11vw, 6rem);
            letter-spacing: 0.14em;
            line-height: 0.9;
          }
        }

        @media (min-width: 481px) and (max-width: 600px) {
          .dendrites-text {
            font-size: clamp(4rem, 12vw, 7rem);
            letter-spacing: 0.15em;
            line-height: 0.9;
          }
        }

        @media (min-width: 601px) and (max-width: 768px) {
          .dendrites-text {
            font-size: clamp(5rem, 13vw, 9rem);
            letter-spacing: 0.16em;
            line-height: 0.95;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .dendrites-text {
            font-size: clamp(6rem, 14vw, 12rem);
            letter-spacing: 0.18em;
            line-height: 1;
          }
        }

        @media (min-width: 1025px) {
          .dendrites-text {
            font-size: clamp(8rem, 15vw, 20rem);
            letter-spacing: 0.18em;
            line-height: 1;
          }
        }

        @media (min-width: 1920px) {
          .dendrites-text {
            font-size: clamp(12rem, 15vw, 24rem);
            letter-spacing: 0.2em;
          }
        }

        @media (max-width: 926px) and (orientation: landscape) {
          .dendrites-text {
            font-size: clamp(2rem, 8vh, 4rem);
            letter-spacing: 0.12em;
            line-height: 0.85;
          }
        }
      `}</style>
    </div>
  );
}
