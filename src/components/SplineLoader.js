import { jsx as _jsx } from "react/jsx-runtime";
// src/components/SplineLoader.tsx
import { lazy, Suspense, useState, useCallback } from 'react';
import { useInViewport } from '@/hooks/useInViewport';
const Spline = lazy(() => import('@splinetool/react-spline'));
/**
 * Optimized Spline Loader with:
 * - Intersection Observer (only loads when in viewport)
 * - Lazy loading with Suspense
 * - Error boundary
 * - Loading state
 * - Performance optimizations
 */
export default function SplineLoader({ scene, className = '', style = {}, onLoad, onError, fallback, disableOrbitControls = false, disableZoom = false, minHeight = '100vh', forceLoad = false, }) {
    const { ref, isInViewport } = useInViewport({
        threshold: 0,
        rootMargin: '0px', // Load immediately when component mounts
        triggerOnce: true,
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const handleLoad = useCallback((spline) => {
        if (import.meta.env.DEV) {
            console.log(`[SplineLoader] Scene loaded: ${scene}`);
        }
        // Apply controls settings (with type safety)
        try {
            if (disableOrbitControls && 'setOrbitControls' in spline) {
                spline.setOrbitControls(false);
            }
            if (disableZoom && spline.setZoom) {
                spline.setZoom(1); // Reset to default zoom level
            }
        }
        catch (err) {
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
    const handleError = useCallback((error) => {
        if (import.meta.env.DEV) {
            console.error('[SplineLoader] Error loading scene:', error);
        }
        setHasError(true);
        onError?.(error);
    }, [onError]);
    // Default fallback
    const defaultFallback = (_jsx("div", { className: "w-full h-full flex items-center justify-center bg-black/50", style: { minHeight }, children: _jsx("div", { className: "text-white/60 text-sm animate-pulse", children: "Loading 3D Scene..." }) }));
    // Error state
    if (hasError) {
        return (_jsx("div", { className: "w-full h-full flex items-center justify-center bg-black/50", style: { minHeight }, children: _jsx("div", { className: "text-white/40 text-sm", children: "Failed to load 3D scene" }) }));
    }
    const shouldLoad = forceLoad || isInViewport;
    return (_jsx("div", { ref: forceLoad ? undefined : ref, className: `spline-loader ${className}`, style: { minHeight, ...style }, children: shouldLoad ? (_jsx(Suspense, { fallback: fallback || defaultFallback, children: _jsx(Spline, { scene: scene, onLoad: handleLoad, onError: handleError, style: { width: '100%', height: '100%' } }) })) : (fallback || defaultFallback) }));
}
