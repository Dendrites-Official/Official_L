// src/components/OptimizedSplineLoader.tsx
import React, { lazy, Suspense, useState, useCallback, useEffect } from 'react';
import { useInViewport } from '@/hooks/useInViewport';
import { canHandleSpline, getLazyLoadThreshold, logDeviceInfo } from '@/lib/deviceDetection';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

// Error Boundary for Spline
class SplineErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('❌ [SplineErrorBoundary] Caught error:', error);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface OptimizedSplineLoaderProps {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: (spline: Application) => void;
  onError?: (error: Error) => void;
  fallbackImage?: string; // Show image instead of 3D on low-end devices
  fallback?: React.ReactNode;
  disableOrbitControls?: boolean;
  disableZoom?: boolean;
  minHeight?: string;
  forceLoad?: boolean; // Override device detection
}

/**
 * Performance-Optimized Spline Loader for Indian Mobile Market
 * 
 * Features:
 * - Device detection (skips 3D on low-end devices)
 * - Intersection Observer (loads only when visible)
 * - Lazy loading with Suspense
 * - Fallback image for low-end devices
 * - Network-aware loading
 */
export default function OptimizedSplineLoader({
  scene,
  className = '',
  style = {},
  onLoad,
  onError,
  fallbackImage,
  fallback,
  disableOrbitControls = false,
  disableZoom = false,
  minHeight = '100vh',
  forceLoad = false,
}: OptimizedSplineLoaderProps) {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Device detection
  const deviceCanHandle = canHandleSpline();
  const threshold = getLazyLoadThreshold();

  // Intersection Observer with device-specific threshold
  const { ref, isInViewport } = useInViewport({
    threshold: 0,
    rootMargin: `${threshold}px`,
    triggerOnce: true,
  });

  // Log device info on mount (dev only)
  useEffect(() => {
    logDeviceInfo();
  }, []);

  // Determine if we should load Spline
  useEffect(() => {
    if (forceLoad) {
      setShouldLoadSpline(true);
      return;
    }

    if (!deviceCanHandle) {
      // Low-end device - show fallback image
      if (import.meta.env.DEV) {
        console.log('⚡ [OptimizedSplineLoader] Low-end device detected - using fallback image');
      }
      setShouldLoadSpline(false);
      return;
    }

    // Load when in viewport
    if (isInViewport) {
      setShouldLoadSpline(true);
    }
  }, [isInViewport, deviceCanHandle, forceLoad]);

  const handleLoad = useCallback((spline: Application) => {
    if (import.meta.env.DEV) {
      console.log(`✅ [OptimizedSplineLoader] Scene loaded: ${scene}`);
    }
    
    // Apply controls settings
    try {
      if (disableOrbitControls && 'setOrbitControls' in spline) {
        (spline as any).setOrbitControls(false);
      }
      if (disableZoom && spline.setZoom) {
        spline.setZoom(1);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('⚠️ [OptimizedSplineLoader] Could not set controls:', err);
      }
    }

    // Enable pointer events
    requestAnimationFrame(() => {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.style.pointerEvents = 'auto';
        canvas.style.touchAction = 'auto';
        canvas.style.visibility = 'visible';
        canvas.style.opacity = '1';
      }
    });

    setIsLoaded(true);
    onLoad?.(spline);
  }, [scene, disableOrbitControls, disableZoom, onLoad]);

  const handleError = useCallback((error: Error) => {
    console.error('❌ [OptimizedSplineLoader] Failed to load scene:', error);
    setHasError(true);
    onError?.(error);
  }, [onError]);

  // Fallback for low-end devices or errors
  if (!deviceCanHandle && !forceLoad) {
    if (fallbackImage) {
      return (
        <div
          ref={ref}
          className={className}
          style={{
            ...style,
            minHeight,
            position: 'relative',
            overflow: 'hidden',
            background: '#000',
          }}
        >
          <img
            src={fallbackImage}
            alt="3D Scene Preview"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </div>
      );
    }
    
    // No fallback image - show custom fallback or nothing
    return fallback ? <>{fallback}</> : null;
  }

  // Error state
  if (hasError) {
    if (fallbackImage) {
      return (
        <div
          ref={ref}
          className={className}
          style={{ ...style, minHeight }}
        >
          <img
            src={fallbackImage}
            alt="3D Scene Preview"
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      );
    }
    return fallback ? <>{fallback}</> : null;
  }

  // Loading placeholder
  const loadingFallback = fallback || (
    <div
      className={className}
      style={{
        ...style,
        minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      }}
    >
      <div className="text-white/60 text-sm">Loading 3D Scene...</div>
    </div>
  );

  return (
    <div ref={ref} className={className} style={{ ...style, minHeight }}>
      {shouldLoadSpline ? (
        <SplineErrorBoundary 
          onError={() => setHasError(true)} 
          fallback={fallbackImage ? (
            <img src={fallbackImage} alt="3D Scene" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (fallback || loadingFallback)}
        >
          <Suspense fallback={loadingFallback}>
            <Spline
              scene={scene}
              onLoad={handleLoad}
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        </SplineErrorBoundary>
      ) : (
        loadingFallback
      )}
    </div>
  );
}
