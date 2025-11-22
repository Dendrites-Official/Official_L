// src/components/SplineLoader.tsx
import React, { lazy, Suspense, useState, useCallback } from 'react';
import { useInViewport } from '@/hooks/useInViewport';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineLoaderProps {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: (spline: Application) => void;
  onError?: (error: Error) => void;
  fallback?: React.ReactNode;
  disableOrbitControls?: boolean;
  disableZoom?: boolean;
  minHeight?: string;
  forceLoad?: boolean;
}

/**
 * Optimized Spline Loader with:
 * - Intersection Observer (only loads when in viewport)
 * - Lazy loading with Suspense
 * - Error boundary
 * - Loading state
 * - Performance optimizations
 */
export default function SplineLoader({
  scene,
  className = '',
  style = {},
  onLoad,
  onError,
  fallback,
  disableOrbitControls = false,
  disableZoom = false,
  minHeight = '100vh',
  forceLoad = false,
}: SplineLoaderProps) {
  const { ref, isInViewport } = useInViewport({
    threshold: 0,
    rootMargin: '0px', // Load immediately when component mounts
    triggerOnce: true,
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback((spline: Application) => {
    if (import.meta.env.DEV) {
      console.log(`[SplineLoader] Scene loaded: ${scene}`);
    }
    
    // Apply controls settings (with type safety)
    try {
      if (disableOrbitControls && 'setOrbitControls' in spline) {
        (spline as any).setOrbitControls(false);
      }
      if (disableZoom && spline.setZoom) {
        spline.setZoom(1); // Reset to default zoom level
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[SplineLoader] Could not set controls:', err);
      }
    }

    // Enable pointer events and ensure canvas is active
    requestAnimationFrame(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.style.pointerEvents = 'auto';
        canvas.style.touchAction = 'auto';
        // Ensure canvas is visible (mobile fix)
        canvas.style.visibility = 'visible';
        canvas.style.opacity = '1';
      }
    });

    setIsLoaded(true);
    onLoad?.(spline);
  }, [scene, disableOrbitControls, disableZoom, onLoad]);

  const handleError = useCallback((error: any) => {
    if (import.meta.env.DEV) {
      console.error('[SplineLoader] Error loading scene:', error);
    }
    setHasError(true);
    onError?.(error);
  }, [onError]);

  // Default fallback
  const defaultFallback = (
    <div 
      className="w-full h-full flex items-center justify-center bg-black/50"
      style={{ minHeight }}
    >
      <div className="text-white/60 text-sm animate-pulse">
        Loading 3D Scene...
      </div>
    </div>
  );

  // Error state
  if (hasError) {
    return (
      <div 
        className="w-full h-full flex items-center justify-center bg-black/50"
        style={{ minHeight }}
      >
        <div className="text-white/40 text-sm">
          Failed to load 3D scene
        </div>
      </div>
    );
  }

  const shouldLoad = forceLoad || isInViewport;

  return (
    <div 
      ref={forceLoad ? undefined : ref} 
      className={`spline-loader ${className}`}
      style={{ minHeight, ...style }}
    >
      {shouldLoad ? (
        <Suspense fallback={fallback || defaultFallback}>
          <Spline
            scene={scene}
            onLoad={handleLoad}
            onError={handleError}
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
}
