// src/hooks/useReducedMotion.ts
import { useState, useEffect } from 'react';
import { useDeviceCapabilities } from '@/lib/deviceCapabilities';

/**
 * Hook to detect if user prefers reduced motion
 * Also considers device capabilities for performance
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const capabilities = useDeviceCapabilities();

  useEffect(() => {
    // Check user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Reduce motion if:
  // 1. User explicitly prefers reduced motion, OR
  // 2. Device is low-end
  const shouldReduceMotion = 
    prefersReducedMotion || 
    (capabilities?.tier === 'low-end');

  return shouldReduceMotion;
}

/**
 * Get optimized animation settings based on device capabilities
 * Returns motion variants that adapt to device performance
 */
export function useAdaptiveMotion() {
  const shouldReduce = useReducedMotion();
  const capabilities = useDeviceCapabilities();
  const isMobile = capabilities?.isMobile ?? false;

  return {
    shouldReduce,
    isMobile,
    // Faster durations on mobile
    duration: shouldReduce ? 0.2 : isMobile ? 0.4 : 0.6,
    // Simpler easing on mobile
    ease: shouldReduce ? 'linear' : 'easeOut',
    // Reduce spring stiffness on mobile
    spring: {
      stiffness: shouldReduce ? 200 : isMobile ? 100 : 80,
      damping: shouldReduce ? 30 : isMobile ? 20 : 15,
    },
    // Disable certain animations on reduced motion
    enableScale: !shouldReduce,
    enableRotate: !shouldReduce,
    enableBlur: !shouldReduce && !isMobile,
    // Reduce parallax effect on mobile
    parallaxIntensity: shouldReduce ? 0 : isMobile ? 0.3 : 0.5,
  };
}

/**
 * Get simplified motion variants for mobile
 */
export function getMotionVariants(options?: {
  enableOnMobile?: boolean;
  duration?: number;
}) {
  const { shouldReduce, isMobile, duration, ease } = useAdaptiveMotion();
  
  // If reduced motion is preferred, return minimal animations
  if (shouldReduce) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 }
    };
  }

  // If mobile and animations not explicitly enabled, use simplified version
  if (isMobile && !options?.enableOnMobile) {
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0 },
      transition: { duration: options?.duration ?? duration, ease }
    };
  }

  // Full animations for desktop
  return {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: options?.duration ?? duration, ease }
  };
}

export default useReducedMotion;
