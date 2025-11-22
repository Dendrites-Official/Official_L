"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
const pad2 = (n) => n.toString().padStart(2, "0");
const ZERO = { days: "00", hours: "00", minutes: "00", seconds: "00" };
function diffParts(to, now) {
    const d = Math.max(0, to - now);
    const days = Math.floor(d / (1000 * 60 * 60 * 24));
    const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((d % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
}
export default function CountDown({ target = "2025-10-31T00:00:00" }) {
    const targetMs = useMemo(() => new Date(target).getTime(), [target]);
    const [val, setVal] = useState(ZERO);
    const prevRef = useRef(ZERO);
    useEffect(() => {
        const tick = () => {
            const now = Date.now();
            if (now >= targetMs) {
                setVal(prev => {
                    prevRef.current = prev;
                    return ZERO;
                });
                return;
            }
            const p = diffParts(targetMs, now);
            const next = {
                days: String(p.days),
                hours: pad2(p.hours),
                minutes: pad2(p.minutes),
                seconds: pad2(p.seconds),
            };
            setVal(prev => {
                prevRef.current = prev;
                return next;
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [targetMs]);
    const prev = prevRef.current;
    return (_jsxs(_Fragment, { children: [_jsx("style", { dangerouslySetInnerHTML: { __html: `
        .countdown-wrapper-isolated {
          box-sizing: border-box;
        }
        
        .countdown-wrapper-isolated *,
        .countdown-wrapper-isolated *::before,
        .countdown-wrapper-isolated *::after {
          box-sizing: border-box;
        }
        
        .countdown-wrapper-isolated .flip-container {
          perspective: clamp(800px, 120vw, 1400px);
        }
        
        .countdown-wrapper-isolated .flip-card {
          position: relative;
          width: clamp(2.5rem, 8vw, 5rem);
          height: clamp(3.5rem, 11vw, 7.5rem);
          transform-style: preserve-3d;
        }
        
        .countdown-wrapper-isolated .flip-top-static {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          overflow: hidden;
          border-radius: clamp(6px, 1.2vw, 10px) clamp(6px, 1.2vw, 10px) 0 0;
          z-index: 2;
        }
        
        .countdown-wrapper-isolated .flip-top-static .flip-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 200%;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(1.6rem, 6.5vw, 3.8rem);
          font-weight: 800;
          color: #fff;
          border: none;
          border-radius: clamp(6px, 1.2vw, 10px);
          box-shadow: none;
        }
        
        .countdown-wrapper-isolated .flip-bottom-static {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 50%;
          overflow: hidden;
          border-radius: 0 0 clamp(6px, 1.2vw, 10px) clamp(6px, 1.2vw, 10px);
          z-index: 1;
        }
        
        .countdown-wrapper-isolated .flip-bottom-static .flip-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 200%;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(1.6rem, 6.5vw, 3.8rem);
          font-weight: 800;
          color: #fff;
          border: none;
          border-radius: clamp(6px, 1.2vw, 10px);
          box-shadow: none;
        }
        
        .countdown-wrapper-isolated .flip-divider {
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 0px;
          background: transparent;
          transform: translateY(-1px);
          z-index: 10;
        }
        
        .countdown-wrapper-isolated .flip-top-animated {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          transform-origin: center bottom;
          transform-style: preserve-3d;
          z-index: 5;
          border-radius: clamp(6px, 1.2vw, 10px) clamp(6px, 1.2vw, 10px) 0 0;
        }
        
        .countdown-wrapper-isolated .flip-top-animated.flipping {
          animation: flipDown 700ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }
        
        @keyframes flipDown {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(-180deg);
          }
        }
        
        .countdown-wrapper-isolated .flip-face-front {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          overflow: hidden;
          backface-visibility: hidden;
          border-radius: clamp(6px, 1.2vw, 10px) clamp(6px, 1.2vw, 10px) 0 0;
        }
        
        .countdown-wrapper-isolated .flip-face-front .flip-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 200%;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(1.6rem, 6.5vw, 3.8rem);
          font-weight: 800;
          color: #fff;
          border: none;
          border-radius: clamp(6px, 1.2vw, 10px);
          box-shadow: none;
        }
        
        .countdown-wrapper-isolated .flip-face-back {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          overflow: hidden;
          backface-visibility: hidden;
          transform: rotateX(180deg);
          border-radius: clamp(6px, 1.2vw, 10px) clamp(6px, 1.2vw, 10px) 0 0;
          background: transparent;
          border: none;
          box-shadow: none;
        }
        
        .countdown-wrapper-isolated .flip-shade {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          pointer-events: none;
          z-index: 1;
          border-radius: clamp(6px, 1.2vw, 10px) clamp(6px, 1.2vw, 10px) 0 0;
        }
        
        .countdown-wrapper-isolated .flip-top-animated.flipping .flip-shade {
          animation: shadeFade 700ms cubic-bezier(0.4, 0.0, 0.2, 1);
        }
        
        @keyframes shadeFade {
          0% {
            background: rgba(0, 0, 0, 0);
          }
          50% {
            background: rgba(0, 0, 0, 0.5);
          }
          100% {
            background: rgba(0, 0, 0, 0);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .countdown-wrapper-isolated .flip-top-animated.flipping {
            animation-duration: 0.01ms !important;
          }
        }
        
        @media (max-width: 640px) {
          .countdown-wrapper-isolated .flip-card {
            width: clamp(1.8rem, 8.5vw, 2.8rem);
            height: clamp(2.5rem, 11.5vw, 4.2rem);
          }
          
          .countdown-wrapper-isolated .flip-top-static .flip-content,
          .countdown-wrapper-isolated .flip-bottom-static .flip-content,
          .countdown-wrapper-isolated .flip-face-front .flip-content {
            font-size: clamp(1.1rem, 6.5vw, 2rem);
          }
        }
        
        @media (max-width: 480px) {
          .countdown-wrapper-isolated .flip-card {
            width: clamp(1.5rem, 9vw, 2.2rem);
            height: clamp(2.2rem, 12vw, 3.5rem);
          }
          
          .countdown-wrapper-isolated .flip-top-static .flip-content,
          .countdown-wrapper-isolated .flip-bottom-static .flip-content,
          .countdown-wrapper-isolated .flip-face-front .flip-content {
            font-size: clamp(1rem, 6vw, 1.6rem);
          }
        }
        
        @media (max-width: 380px) {
          .countdown-wrapper-isolated .flip-card {
            width: clamp(1.3rem, 8.5vw, 2rem);
            height: clamp(2rem, 11.5vw, 3.2rem);
          }
          
          .countdown-wrapper-isolated .flip-top-static .flip-content,
          .countdown-wrapper-isolated .flip-bottom-static .flip-content,
          .countdown-wrapper-isolated .flip-face-front .flip-content {
            font-size: clamp(0.9rem, 5.5vw, 1.4rem);
          }
        }
      ` } }), _jsx("div", { className: "countdown-wrapper-isolated w-full flex items-center justify-center px-6 sm:px-8 md:px-10 py-8", "aria-live": "polite", children: _jsx("div", { className: "relative rounded-2xl px-4 sm:px-5 md:px-6 py-4 sm:py-5 md:py-6\n                        bg-white/[0.01]\n                        backdrop-blur-sm\n                        border-[0.5px] border-sky-200/10\n                        shadow-[0_4px_24px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(224,242,254,0.04),0_0_1px_rgba(224,242,254,0.1)]", style: {
                        boxShadow: '0 4px 24px rgba(0,0,0,0.15), inset 0 1px 1px rgba(224,242,254,0.04), 0 0 1px rgba(224,242,254,0.1)'
                    }, children: _jsxs("div", { className: "relative flex items-end justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 mx-auto", style: { maxWidth: '100%' }, children: [_jsx(Unit, { label: "DAYS", current: val.days, previous: prev.days }), _jsx(Colon, {}), _jsx(Unit, { label: "HOURS", current: val.hours, previous: prev.hours }), _jsx(Colon, {}), _jsx(Unit, { label: "MINUTES", current: val.minutes, previous: prev.minutes }), _jsx(Colon, {}), _jsx(Unit, { label: "SECONDS", current: val.seconds, previous: prev.seconds })] }) }) })] }));
}
function Unit({ label, current, previous, }) {
    const cur = String(current).split("");
    const prev = String(previous).padStart(cur.length, "0").split("");
    return (_jsxs("div", { className: "flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3", children: [_jsx("div", { className: "flex items-center gap-1 sm:gap-1.5", children: cur.map((d, i) => (_jsx(FlipCard, { next: d, prev: prev[i] ?? "0" }, i))) }), _jsx("div", { className: "text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-light tracking-[0.25em] sm:tracking-[0.3em] uppercase", style: {
                    background: 'linear-gradient(90deg, rgba(224, 242, 254, 0.8) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(240, 249, 255, 0.8) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 2px rgba(224, 242, 254, 0.15))'
                }, children: label })] }));
}
function Colon() {
    return (_jsx("div", { className: "flex items-center pb-3 sm:pb-5 md:pb-7 lg:pb-9", children: _jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-cyan-300 font-bold leading-none", style: {
                fontSize: "clamp(1.2rem, 4.5vw, 2.5rem)"
            }, children: ":" }) }));
}
function FlipCard({ next, prev }) {
    const [isFlipping, setIsFlipping] = useState(false);
    const [displayNext, setDisplayNext] = useState(next);
    const [displayPrev, setDisplayPrev] = useState(prev);
    useEffect(() => {
        if (next !== displayNext) {
            setDisplayPrev(displayNext);
            setIsFlipping(true);
            const endTimer = setTimeout(() => {
                setIsFlipping(false);
                setDisplayNext(next);
            }, 700);
            return () => {
                clearTimeout(endTimer);
            };
        }
    }, [next, displayNext]);
    return (_jsx("div", { className: "flip-container", children: _jsxs("div", { className: "flip-card", children: [!isFlipping && (_jsx("div", { className: "flip-top-static", children: _jsx("div", { className: "flip-content", children: displayNext }) })), _jsx("div", { className: "flip-bottom-static", children: _jsx("div", { className: "flip-content", children: displayNext }) }), _jsx("div", { className: "flip-divider" }), isFlipping && (_jsxs("div", { className: "flip-top-animated flipping", children: [_jsx("div", { className: "flip-face-front", children: _jsx("div", { className: "flip-content", children: displayPrev }) }), _jsx("div", { className: "flip-face-back" }), _jsx("div", { className: "flip-shade" })] }))] }) }));
}
