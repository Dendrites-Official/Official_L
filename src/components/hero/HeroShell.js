import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RobotSpline from './RobotSpline';
import SlidePanel from './SlidePanel';
import CodeTicker from './CodeTicker';
export default function HeroShell({ onCtaClick }) {
    const splineContainerRef = useRef(null);
    const sectionRef = useRef(null);
    const [splineHeight, setSplineHeight] = useState(720);
    const [showPanel, setShowPanel] = useState(false);
    /**
     * Height clamping with ResizeObserver
     * Watches Spline container and updates state + CSS variable
     */
    useEffect(() => {
        if (!splineContainerRef.current)
            return;
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
    return (_jsxs("section", { ref: sectionRef, className: "relative w-full bg-black overflow-hidden", style: {
            background: 'linear-gradient(180deg, #000000 0%, #0B0B0D 100%)',
        }, children: [_jsxs("div", { className: "relative w-full max-w-[1920px] mx-auto", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[70%_30%]", children: [_jsxs("div", { className: "relative", children: [_jsx(RobotSpline, { ref: splineContainerRef }), _jsx(SlidePanel, { isVisible: showPanel, maxHeight: splineHeight }), _jsx(motion.div, { className: "absolute bottom-8 left-8 z-20", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.8, duration: 0.6 }, children: _jsxs("button", { onClick: handleCtaClick, className: "group relative px-6 py-3 sm:px-8 sm:py-4 \n                           bg-gradient-to-r from-cyan-500 to-blue-600 \n                           text-white font-bold text-sm sm:text-base\n                           rounded-lg overflow-hidden\n                           hover:shadow-[0_0_30px_rgba(0,209,255,0.5)]\n                           transition-all duration-300\n                           focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black", "aria-label": "Start Full Awakening Experience", children: [_jsxs("span", { className: "relative z-10 flex items-center gap-2", children: [_jsx("span", { children: "\u25B6" }), _jsx("span", { children: "EXPERIENCE FULL AWAKENING" })] }), _jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500", initial: { x: '-100%' }, whileHover: { x: '100%' }, transition: { duration: 0.6 } })] }) })] }), _jsx("div", { className: "hidden lg:block relative", children: _jsx(CodeTicker, { maxHeight: splineHeight }) })] }), _jsx("div", { className: "lg:hidden", children: _jsx(CodeTicker, { maxHeight: 300 }) })] }), _jsx("div", { className: "absolute inset-0 pointer-events-none opacity-10", children: _jsx("div", { className: "absolute inset-0", style: {
                        backgroundImage: `
              linear-gradient(to right, rgba(0, 209, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 209, 255, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '80px 80px',
                    } }) })] }));
}
