import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function League() {
    const [glitchText, setGlitchText] = useState("LEAGUES");
    useEffect(() => {
        const glitchChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let interval;
        const startGlitch = () => {
            let iterations = 0;
            interval = window.setInterval(() => {
                setGlitchText((prev) => prev
                    .split("")
                    .map((char, index) => {
                    if (index < iterations) {
                        return "LEAGUES"[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                    .join(""));
                if (iterations >= 7) {
                    clearInterval(interval);
                    setGlitchText("LEAGUES");
                }
                iterations += 1 / 3;
            }, 50);
        };
        const glitchTimer = window.setInterval(startGlitch, 5000);
        startGlitch();
        return () => {
            clearInterval(interval);
            clearInterval(glitchTimer);
        };
    }, []);
    return (_jsxs("div", { className: "min-h-screen bg-black relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-20", children: _jsx("div", { className: "absolute inset-0", style: {
                        backgroundImage: `
            linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px)
          `,
                        backgroundSize: '50px 50px',
                        animation: 'gridMove 20s linear infinite'
                    } }) }), _jsx(motion.div, { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]", animate: {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }, transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                } }), _jsx(motion.div, { className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]", animate: {
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5],
                }, transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                } }), _jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, className: "text-center mb-8", children: [_jsx("h1", { className: "text-7xl md:text-9xl font-black mb-4 tracking-wider relative", style: {
                                    fontFamily: 'system-ui, -apple-system, sans-serif',
                                    textShadow: `
                0 0 10px rgba(0, 255, 157, 0.8),
                0 0 20px rgba(0, 255, 157, 0.6),
                0 0 30px rgba(0, 255, 157, 0.4),
                0 0 40px rgba(0, 255, 157, 0.2),
                2px 2px 0px rgba(255, 0, 255, 0.3),
                -2px -2px 0px rgba(0, 255, 255, 0.3)
              `,
                                    color: '#00ff9d'
                                }, children: glitchText }), _jsxs("div", { className: "relative inline-block", children: [_jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent", animate: {
                                            x: ['-100%', '200%'],
                                        }, transition: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear",
                                        } }), _jsx("p", { className: "text-xl md:text-2xl text-cyan-300 tracking-widest uppercase font-bold relative", children: "COMPETITIVE GAMING ECOSYSTEM" })] })] }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.3, duration: 0.6 }, className: "relative max-w-4xl w-full", children: [_jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg opacity-75 blur-lg animate-pulse" }), _jsxs("div", { className: "relative bg-black/90 border-2 border-cyan-500/50 rounded-lg p-8 md:p-12 backdrop-blur-sm", children: [_jsxs(motion.div, { className: "inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/50 rounded-full mb-6", animate: {
                                            boxShadow: [
                                                '0 0 10px rgba(0, 255, 157, 0.3)',
                                                '0 0 20px rgba(0, 255, 157, 0.6)',
                                                '0 0 10px rgba(0, 255, 157, 0.3)',
                                            ],
                                        }, transition: {
                                            duration: 2,
                                            repeat: Infinity,
                                        }, children: [_jsx("div", { className: "w-2 h-2 bg-cyan-400 rounded-full animate-pulse" }), _jsx("span", { className: "text-cyan-400 text-sm font-bold tracking-wider uppercase", children: "System Status: Active" })] }), _jsxs("h2", { className: "text-4xl md:text-6xl font-black text-white mb-6 leading-tight", children: ["FUTURE LEAGUES", _jsx("br", {}), _jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400", children: "WILL BE ANNOUNCED HERE" })] }), _jsx("p", { className: "text-xl md:text-2xl text-gray-400 mb-8 font-medium", children: "The arena is being prepared. Elite tournaments, massive prize pools, and legendary competitions are coming soon." }), _jsx("div", { className: "grid grid-cols-3 gap-4 mb-8", children: [
                                            { label: "Prize Pool", value: "TBA", color: "cyan" },
                                            { label: "Tournaments", value: "SOON", color: "purple" },
                                            { label: "Players", value: "∞", color: "pink" },
                                        ].map((stat, idx) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 + idx * 0.1 }, className: `border border-${stat.color}-500/30 bg-${stat.color}-500/5 rounded-lg p-4 text-center`, children: [_jsx("div", { className: `text-2xl md:text-3xl font-black text-${stat.color}-400 mb-1`, children: stat.value }), _jsx("div", { className: "text-xs text-gray-500 uppercase tracking-wider", children: stat.label })] }, stat.label))) }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: [_jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "relative group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white text-lg overflow-hidden", children: [_jsx("span", { className: "relative z-10", children: "STAY CONNECTED" }), _jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500", initial: { x: '100%' }, whileHover: { x: 0 }, transition: { duration: 0.3 } })] }), _jsx(motion.a, { href: "https://twitter.com/dndx_official", target: "_blank", rel: "noopener noreferrer", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "px-8 py-4 border-2 border-cyan-500/50 rounded-lg font-bold text-cyan-400 text-lg hover:bg-cyan-500/10 transition-colors", children: "FOLLOW UPDATES \u2192" })] })] })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1 }, className: "mt-12 overflow-hidden max-w-4xl w-full border border-cyan-500/20 rounded-lg bg-black/50", children: _jsx(motion.div, { className: "flex gap-8 py-3 px-4", animate: { x: [0, -1000] }, transition: {
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                            }, children: [...Array(10)].map((_, i) => (_jsx("span", { className: "text-cyan-400/60 text-sm font-mono whitespace-nowrap", children: "\u26A1 COMPETITIVE GAMING \u2022 \uD83C\uDFC6 MASSIVE PRIZES \u2022 \uD83C\uDFAE ELITE TOURNAMENTS" }, i))) }) })] }), _jsx("style", { children: `
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
      ` })] }));
}
