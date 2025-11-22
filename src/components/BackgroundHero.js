import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Spline from '@splinetool/react-spline';
import { useRef, useState, useEffect } from 'react';
const isDev = import.meta.env.MODE === 'development';
export default function BackgroundHero() {
    const splineRef = useRef(null);
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const animationFrameRef = useRef();
    useEffect(() => {
        // Suppress Spline-related console errors
        const originalError = console.error;
        console.error = (...args) => {
            const msg = args.join(' ');
            if (msg.includes('Spline') || msg.includes('spline') || msg.includes('WebGL')) {
                return; // Suppress Spline errors
            }
            originalError(...args);
        };
        return () => {
            console.error = originalError;
        };
    }, []);
    // Smooth cursor tracking with throttling
    useEffect(() => {
        let lastUpdate = 0;
        const throttleMs = 32; // ~30fps instead of 60fps for better performance
        const handleMouseMove = (e) => {
            const now = performance.now();
            if (now - lastUpdate < throttleMs)
                return;
            lastUpdate = now;
            // Cancel previous animation frame
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            animationFrameRef.current = requestAnimationFrame(() => {
                // Calculate normalized position (-1 to 1) with reduced intensity
                const x = ((e.clientX / window.innerWidth) * 2 - 1) * 0.3; // Reduced from 0.5
                const y = ((e.clientY / window.innerHeight) * 2 - 1) * 0.3; // Reduced from 0.5
                setMousePos({ x, y });
            });
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);
    function onLoad(spline) {
        splineRef.current = spline;
        setIsLoaded(true);
        if (isDev) {
            console.log('✅ Spline scene loaded successfully!');
        }
        // Function to remove watermark elements - ONLY in hero container
        const removeWatermarks = () => {
            if (!containerRef.current)
                return;
            const watermarkSelectors = [
                'a[href*="spline.design"]',
                'a[href*="spline"]',
                '[class*="watermark"]',
                '[id*="watermark"]'
            ];
            watermarkSelectors.forEach(selector => {
                // ONLY search within hero container, not entire document
                containerRef.current.querySelectorAll(selector).forEach(el => {
                    const element = el;
                    const anchor = el;
                    // Check if it's a watermark link
                    if (anchor.href?.includes('spline')) {
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                        element.style.opacity = '0';
                        element.remove();
                    }
                });
            });
        };
        // Remove immediately
        setTimeout(removeWatermarks, 100);
        // Reduced interval checks from 500ms to 1000ms
        const interval = setInterval(removeWatermarks, 1000);
        // Clean up after 5 seconds instead of 10
        setTimeout(() => clearInterval(interval), 5000);
    }
    function onError(error) {
        if (isDev) {
            console.log('Spline loading issue (non-critical)');
        }
        setError(null); // Don't show error to user
    }
    return (_jsxs("div", { ref: containerRef, className: "absolute inset-0 w-full h-full overflow-hidden hero-spline-container", style: {
            zIndex: 0,
            pointerEvents: 'none', // Keep pointer events disabled for scrolling
        }, children: [_jsx("div", { className: "absolute inset-0 flex items-center justify-center", style: {
                    transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, 0)`,
                    transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    mixBlendMode: 'normal',
                    opacity: 0.85,
                    filter: 'saturate(1.2) brightness(1.1)',
                    pointerEvents: 'none', // FIXED: Disable pointer events to allow scrolling
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    perspective: 1000,
                    WebkitPerspective: 1000,
                    marginBottom: '10px',
                }, children: _jsx("div", { style: {
                        width: '120%', // FIXED: Increased from 100% to make robot bigger
                        height: '120%', // FIXED: Increased from 100%
                        minHeight: '120vh', // FIXED: Increased from 100vh
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transform: 'scale(1.2)', // FIXED: Additional scale to make robot larger
                    }, children: _jsx(Spline, { scene: "https://prod.spline.design/Zq3rlNh2yNqCja-H/scene.splinecode", onLoad: onLoad, onError: onError, style: {
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            pointerEvents: 'none', // FIXED: Ensure Spline doesn't block scrolling
                        } }) }) }), _jsx("div", { className: "absolute inset-0 bg-black/10 pointer-events-none", style: { zIndex: 1 } }), _jsx("style", { children: `
        /* Target all possible watermark variations in hero container */
        .hero-spline-container #spline-watermark,
        .hero-spline-container [class*="watermark"],
        .hero-spline-container [id*="watermark"],
        .hero-spline-container a[href*="spline"],
        .hero-spline-container a[href*="spline.design"],
        .hero-spline-container div[style*="position: absolute"][style*="bottom"],
        .hero-spline-container div[style*="position: fixed"][style*="bottom"],
        .hero-spline-container canvas + div,
        .hero-spline-container canvas + a {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          width: 0 !important;
          height: 0 !important;
          position: absolute !important;
          z-index: -9999 !important;
          pointer-events: none !important;
          overflow: hidden !important;
        }
        
        /* Hide any text that says "Built with Spline" or similar */
        .hero-spline-container *:not(canvas):not(svg):not(path) {
          color: transparent !important;
        }
      ` })] }));
}
