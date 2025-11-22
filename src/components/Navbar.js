import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/Navbar.tsx
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MobileMenu from "./nav/MobileMenu";
const cn = (...v) => v.filter(Boolean).join(" ");
const BRAND_NAME = "Dendrites";
const TICKER = "DNDX";
/* >>> change links to objects to match MobileMenu <<< */
const links = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Blogs", href: "/blogs" },
    { label: "SLA", href: "/sla" },
    { label: "LeadBoard", href: "https://waitlist.dendrites.ai/leaderboard" },
    { label: "Roadmap", href: "/roadmap" },
];
/* CTA pill (unchanged visuals) */
function CTA({ to, children, variant = "primary", className = "", }) {
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();
    const isPrimary = variant === "primary";
    const clip = "polygon(8% 0, 92% 0, 100% 100%, 0% 100%)";
    const base = "relative inline-flex items-center justify-center h-12 px-8 font-semibold transition use-dndx-cursor select-none";
    const handleClick = (e) => {
        e.preventDefault();
        setIsClicked(true);
        const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 120 : 800;
        window.setTimeout(() => {
            setIsClicked(false);
            if (to.startsWith("http"))
                window.open(to, "_blank", "noopener,noreferrer");
            else
                navigate(to);
        }, delay);
    };
    const cls = isPrimary
        ? `${base} text-black
       hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]
       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${className}`
        : `${base} text-white/90 border border-white/10 bg-black/70
       shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
       hover:text-white hover:border-white/30
       hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]
       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${className}`;
    const style = isPrimary
        ? {
            background: "linear-gradient(135deg,#E8E8E8 0%,#FFFFFF 38%,#C0C0C0 100%)",
            clipPath: clip,
            WebkitClipPath: clip,
            transform: isClicked ? "scale(0.95)" : "scale(1)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }
        : {
            clipPath: clip,
            WebkitClipPath: clip,
            transform: isClicked ? "scale(0.95)" : "scale(1)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        };
    return (_jsxs("a", { href: to, onClick: handleClick, className: cls, style: style, children: [!isPrimary && (_jsx("span", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 rounded-md opacity-0 hover:opacity-100 transition\n                     bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]", style: { clipPath: clip, WebkitClipPath: clip } })), children] }));
}
function TickerBar() {
    return (_jsx("div", { className: "h-10 relative z-40 border-y border-white/10 bg-black/95 backdrop-blur-md overflow-hidden", children: _jsxs("div", { className: "whitespace-nowrap leading-10", children: [_jsx("div", { className: "inline-block animate-marquee", children: Array.from({ length: 8 }).map((_, i) => (_jsxs("span", { className: "mx-8 tracking-widest text-xs sm:text-sm font-geometric font-geometric-bold text-white/90 uppercase", children: [BRAND_NAME, " \u00B7 Ticker: ", TICKER, " \u00B7 Safe-Commerce \u00B7 SRL L2 Roadmap \u00B7 Predictable Gas\u2122 \u00B7 APP Escrow \u00B7 SafetySend \u00B7 Soft-SLA"] }, i))) }), _jsx("div", { className: "inline-block animate-marquee", "aria-hidden": "true", children: Array.from({ length: 8 }).map((_, i) => (_jsxs("span", { className: "mx-8 tracking-widest text-xs sm:text-sm font-geometric font-geometric-bold text-white/90 uppercase", children: [BRAND_NAME, " \u00B7 Ticker: ", TICKER, " \u00B7 Safe-Commerce \u00B7 SRL L2 Roadmap \u00B7 Predictable Gas\u2122 \u00B7 APP Escrow \u00B7 SafetySend \u00B7 Soft-SLA"] }, `dup-${i}`))) })] }) }));
}
export default function Navbar() {
    const [open, setOpen] = useState(false);
    const loc = useLocation();
    const navigate = useNavigate();
    useEffect(() => setOpen(false), [loc.pathname]);
    const navbarRef = useRef(null);
    const [topOffset, setTopOffset] = useState(96);
    useLayoutEffect(() => {
        const update = () => {
            const headerH = navbarRef.current?.getBoundingClientRect().height ?? 64;
            const tickerH = 40;
            setTopOffset(Math.round(headerH + tickerH));
        };
        update();
        const ro = new ResizeObserver(update);
        if (navbarRef.current)
            ro.observe(navbarRef.current);
        window.addEventListener("resize", update, { passive: true });
        window.addEventListener("orientationchange", update);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", update);
            window.removeEventListener("orientationchange", update);
        };
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs(motion.div, { initial: { y: -18, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }, className: "fixed top-0 left-0 right-0 z-[1001]", style: { margin: 0, padding: 0 }, role: "banner", children: [_jsx("header", { children: _jsx("div", { ref: navbarRef, className: "backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10", "data-navbar": true, children: _jsxs("div", { className: "w-full h-16 md:h-20 lg:h-24 relative xl:grid xl:grid-cols-3 flex items-center justify-between px-4 md:px-5 lg:px-6 gap-3", style: {
                                    paddingTop: "env(safe-area-inset-top)",
                                }, children: [_jsxs(NavLink, { to: "/", className: "flex items-center gap-3 md:gap-4 lg:gap-6 min-w-0 xl:flex-none flex-1 xl:justify-start", "aria-label": "Go to Home", children: [_jsx("img", { src: "/videos/logo33.gif", alt: "DNDX", className: "\n    h-11 w-auto max-w-[170px]  /* mobile - larger yet still capped */\n    md:h-14 md:max-w-none      /* tablets - fits in h-20 navbar */\n    lg:h-16 lg:w-auto          /* desktop - fits in h-24 navbar */\n    xl:h-16 xl:w-auto          /* big desktop */\n    object-contain flex-shrink-0\n  ", style: {
                                                    filter: "brightness(1.2) contrast(1.1)",
                                                    backgroundColor: 'transparent',
                                                    mixBlendMode: 'screen',
                                                } }), _jsx("span", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white tracking-[0.1em] uppercase truncate", style: {
                                                    fontFamily: "'Orbitron', 'Rajdhani', 'Exo 2', sans-serif",
                                                    fontWeight: 300,
                                                    letterSpacing: '0.10em',
                                                    textShadow: '0 0 1px rgba(255,255,255,0.3)',
                                                } })] }), _jsx("div", { className: "hidden xl:flex items-center justify-center", children: _jsxs("div", { className: "nav-shelf relative flex items-center justify-between w-full max-w-2xl px-4 translate-y-[10px]", children: [_jsx(CTA, { to: "/league", variant: "dark", children: "Leagues" }), _jsx(CTA, { to: "/launch", variant: "primary", className: "z-10", children: "Launch DNDX" }), _jsx(CTA, { to: "https://waitlist.dendrites.ai/", variant: "dark", children: "Waitlist" })] }) }), _jsxs("div", { className: "flex items-center justify-end gap-2 md:gap-3 h-full xl:flex-none flex-shrink-0", children: [_jsx("nav", { className: "hidden xl:flex items-center gap-3 lg:gap-5", "aria-label": "Primary", children: links.map((l) => (_jsxs(NavLink, { to: l.href, className: ({ isActive }) => `group relative inline-block px-1 py-2 use-dndx-cursor ${isActive ? "text-white" : "text-white/80"} hover:text-white transition-colors`, end: l.href === "/", children: [_jsx("span", { className: "relative", children: l.label }), _jsx("span", { className: "pointer-events-none absolute left-0 right-0 -bottom-[6px] h-[2px] rounded-full\n                                   bg-gradient-to-r from-slate-300 via-white to-slate-300\n                                   group-hover:shadow-[0_0_8px_rgba(255,255,255,0.2)]\n                                   origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" })] }, l.href))) }), _jsxs(motion.button, { type: "button", onClick: () => setOpen(!open), className: "hamburger xl:hidden relative ml-2 md:ml-4 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md overflow-hidden self-center flex-shrink-0", style: {
                                                    pointerEvents: 'auto',
                                                    touchAction: 'manipulation',
                                                    WebkitTapHighlightColor: 'transparent',
                                                }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, "aria-label": open ? "Close menu" : "Open menu", "aria-expanded": open, "aria-controls": "mobile-menu-panel", children: [_jsx(motion.div, { className: "absolute inset-0 rounded-full p-[2px] pointer-events-none", animate: {
                                                            opacity: open ? 1 : 0.6,
                                                        }, transition: { duration: 0.3, ease: "easeOut" }, children: _jsx("div", { className: "w-full h-full rounded-full", style: {
                                                                background: open
                                                                    ? 'conic-gradient(from 0deg, rgba(255,199,0,0.8) 0deg, rgba(0,209,255,0.8) 180deg, rgba(255,199,0,0.8) 360deg)'
                                                                    : 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))',
                                                                filter: open ? 'blur(0.5px) drop-shadow(0 0 8px rgba(255,199,0,0.4))' : 'none',
                                                            } }) }), _jsx("div", { className: "absolute inset-[2px] rounded-full bg-black/90" }), _jsxs("div", { className: "relative w-6 h-5 flex flex-col justify-between pointer-events-none z-10", children: [_jsx(motion.span, { animate: {
                                                                    rotate: open ? 45 : 0,
                                                                    y: open ? 8 : 0,
                                                                    scaleX: open ? 1 : 1,
                                                                }, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, className: "block h-[2.5px] w-full bg-white rounded-full origin-center", style: {
                                                                    boxShadow: open ? '0 0 8px rgba(255,199,0,0.5)' : 'none',
                                                                } }), _jsx(motion.span, { animate: {
                                                                    opacity: open ? 0 : 1,
                                                                    scaleX: open ? 0 : 1,
                                                                }, transition: { duration: 0.2 }, className: "block h-[2.5px] w-full bg-white rounded-full" }), _jsx(motion.span, { animate: {
                                                                    rotate: open ? -45 : 0,
                                                                    y: open ? -8 : 0,
                                                                    scaleX: open ? 1 : 1,
                                                                }, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }, className: "block h-[2.5px] w-full bg-white rounded-full origin-center", style: {
                                                                    boxShadow: open ? '0 0 8px rgba(255,199,0,0.5)' : 'none',
                                                                } })] })] })] })] }) }) }), _jsx(TickerBar, {})] }), _jsx("div", { "aria-hidden": true, className: "h-[calc(4rem+2.5rem)] md:h-[calc(5rem+2.5rem)] lg:h-[calc(6rem+2.5rem)]", style: { minHeight: 'calc(4rem + 2.5rem)' } }), _jsx(MobileMenu, { open: open, onClose: () => setOpen(false), topOffsetPx: topOffset, links: links, 
                /* >>> pass activeHref instead of isLinkActive <<< */
                activeHref: loc.pathname }), _jsx("style", { children: `
        /* Optimized marquee animation - GPU accelerated */
        @keyframes marquee { 
          0% { transform: translate3d(0, 0, 0); } 
          100% { transform: translate3d(-50%, 0, 0); } 
        }
        .animate-marquee { 
          animation: marquee 30s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .grain-texture{
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          background-repeat:repeat;background-size:180px 180px;animation:grain 8s steps(10) infinite;
        }
        @keyframes grain{
          0%,100%{transform:translate(0,0)}
          10%{transform:translate(-1%,-1%)}
          20%{transform:translate(-3%,2%)}
          30%{transform:translate(1%,-2%)}
          40%{transform:translate(-2%,3%)}
          50%{transform:translate(-1%,1%)}
          60%{transform:translate(2%,0%)}
          70%{transform:translate(0%,2%)}
          80%{transform:translate(1%,4%)}
          90%{transform:translate(-2%,1%)}
        }

        html, body {
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .no-scrollbar::-webkit-scrollbar { width: 0; height: 0; display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` })] }));
}
