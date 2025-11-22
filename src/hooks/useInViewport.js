// src/hooks/useInViewport.ts
import { useEffect, useState, useRef } from 'react';
/**
 * Hook to detect when an element enters the viewport
 * Perfect for lazy-loading heavy components like Spline scenes
 *
 * @param threshold - Percentage of element that must be visible (0-1)
 * @param rootMargin - Margin around viewport (e.g., "200px" to preload before visible)
 * @param triggerOnce - If true, only triggers once and stays true
 */
export function useInViewport(options = {}) {
    const { threshold = 0.1, rootMargin = '200px', triggerOnce = true } = options;
    const [isInViewport, setIsInViewport] = useState(false);
    const [hasBeenInViewport, setHasBeenInViewport] = useState(false);
    const elementRef = useRef(null);
    useEffect(() => {
        const element = elementRef.current;
        if (!element)
            return;
        // If already triggered once and triggerOnce is true, skip
        if (hasBeenInViewport && triggerOnce)
            return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const inView = entry.isIntersecting;
                setIsInViewport(inView);
                if (inView && !hasBeenInViewport) {
                    setHasBeenInViewport(true);
                }
            });
        }, {
            threshold,
            rootMargin,
        });
        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, triggerOnce, hasBeenInViewport]);
    return {
        ref: elementRef,
        isInViewport: triggerOnce ? hasBeenInViewport : isInViewport,
        hasBeenInViewport,
    };
}
