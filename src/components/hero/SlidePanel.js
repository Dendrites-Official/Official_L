import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
export default function SlidePanel({ isVisible, maxHeight, children }) {
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handler = (e) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);
    return (_jsxs(motion.div, { className: "absolute top-0 left-0 w-full bg-white/5 backdrop-blur-md \n                 border-r border-white/10 overflow-hidden z-10", style: {
            height: maxHeight ? `${maxHeight}px` : '100%',
        }, initial: { x: prefersReducedMotion ? '-20%' : '-100%', opacity: 0 }, animate: isVisible
            ? { x: 0, opacity: 1 }
            : { x: prefersReducedMotion ? '-20%' : '-100%', opacity: 0 }, transition: {
            type: 'tween',
            duration: prefersReducedMotion ? 0.3 : 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
        }, role: "region", "aria-label": "Interactive slide panel", children: [_jsx("div", { className: "absolute inset-0 pointer-events-none opacity-20", children: _jsx("div", { className: "absolute inset-0", style: {
                        backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
                        backgroundSize: '40px 40px'
                    } }) }), _jsx("div", { className: "absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" }), _jsx("div", { className: "relative z-10 h-full p-8", children: children || (_jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center gap-12", children: [_jsx(motion.div, { className: "flex items-end justify-center gap-2 h-32", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.2, duration: 0.6 }, children: [...Array(12)].map((_, i) => (_jsx(motion.div, { className: "w-3 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-sm", animate: {
                                    height: [
                                        `${20 + Math.random() * 80}%`,
                                        `${30 + Math.random() * 70}%`,
                                        `${20 + Math.random() * 80}%`,
                                    ],
                                }, transition: {
                                    duration: 0.8 + Math.random() * 0.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.1,
                                }, style: {
                                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
                                } }, i))) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3, duration: 0.6 }, children: [_jsx("h3", { className: "text-2xl md:text-3xl font-bold text-white mb-4", children: "System Initialized" }), _jsx("p", { className: "text-white/60 font-mono text-sm max-w-md", children: "DNDX Protocol Active \u2022 Predictable Gas \u2022 Safe Commerce" })] })] })) }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" })] }));
}
