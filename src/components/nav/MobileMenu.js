import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/nav/MobileMenu.tsx
import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GradientRingButton } from "@/components/ui/GradientRingButton";
const cn = (...v) => v.filter(Boolean).join(" ");
/* Gradient chip with click glow effect - OPTIMIZED */
function GradientChip({ children, onClick, className, }) {
    const [isGlowing, setIsGlowing] = React.useState(false);
    const timeoutRef = React.useRef();
    const triggerGlow = () => {
        setIsGlowing(true);
        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsGlowing(false), 600);
    };
    const handleClick = (e) => {
        e.stopPropagation();
        triggerGlow();
        setTimeout(() => onClick?.(), 150);
    };
    // Single touch handler - no conflicts
    const handleTouchEnd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        triggerGlow();
        setTimeout(() => onClick?.(), 150);
    };
    React.useEffect(() => {
        return () => {
            if (timeoutRef.current)
                clearTimeout(timeoutRef.current);
        };
    }, []);
    return (_jsxs("button", { type: "button", onClick: handleClick, onTouchEnd: handleTouchEnd, className: cn(
        // keep your visuals
        "relative z-0 inline-flex w-full items-center justify-center rounded-full py-3 px-5", "bg-black/90 backdrop-blur-sm border border-white/10 text-white", "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]", "transition-transform duration-300 active:scale-[0.98]", className), style: { WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }, children: [_jsx(motion.span, { "aria-hidden": true, className: "pointer-events-none absolute inset-0 rounded-full z-[-1]", animate: {
                    opacity: isGlowing ? 1 : 0.6,
                    scale: isGlowing ? 1.05 : 1,
                }, transition: { duration: 0.3, ease: "easeOut" }, style: {
                    background: isGlowing
                        ? "conic-gradient(from 0deg at 50% 50%, rgba(255,199,0,0.9) 0deg, rgba(255,211,77,0.9) 120deg, rgba(0,209,255,0.9) 240deg, rgba(255,199,0,0.9) 360deg)"
                        : "conic-gradient(from 0deg at 50% 50%, rgba(255,199,0,0.55) 0deg, rgba(255,211,77,0.55) 120deg, rgba(0,209,255,0.55) 240deg, rgba(255,199,0,0.55) 360deg)",
                    padding: 1,
                    WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    filter: isGlowing ? "blur(0.5px) drop-shadow(0 0 8px rgba(255,199,0,0.6)) drop-shadow(0 0 15px rgba(0,209,255,0.5))" : "none",
                } }), isGlowing && (_jsx(motion.span, { "aria-hidden": true, className: "pointer-events-none absolute inset-0 rounded-full z-[-2]", initial: { opacity: 0, scale: 0.95 }, animate: { opacity: [0.8, 0], scale: [0.95, 1.15] }, transition: { duration: 0.6, ease: "easeOut" }, style: {
                    background: "conic-gradient(from 0deg at 50% 50%, rgba(255,199,0,0.7) 0deg, rgba(0,209,255,0.7) 180deg, rgba(255,199,0,0.7) 360deg)",
                    filter: "blur(12px)",
                } })), children] }));
}
export default function MobileMenu({ open, onClose, topOffsetPx, links, activeHref, onNav, }) {
    const navigate = useNavigate();
    const panelRef = useRef(null);
    /* portal root */
    const portal = useMemo(() => {
        let n = document.getElementById("dndx-portal");
        if (!n) {
            n = document.createElement("div");
            n.id = "dndx-portal";
            document.body.appendChild(n);
        }
        return n;
    }, []);
    /* lock scroll while open (html + body) + prevent touch-move */
    useEffect(() => {
        if (!open)
            return;
        const html = document.documentElement;
        const body = document.body;
        // Save original values
        const prevHtmlOverflow = html.style.overflow;
        const prevBodyOverflow = body.style.overflow;
        const prevHtmlPosition = html.style.position;
        const prevBodyPosition = body.style.position;
        const prevHtmlHeight = html.style.height;
        const prevBodyHeight = body.style.height;
        // Lock scroll on both html and body
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        html.style.height = "100%";
        body.style.height = "100%";
        // Prevent touch-move on document to stop any scroll bleed-through
        const preventScroll = (e) => {
            // Allow scrolling inside the mobile menu panel
            const target = e.target;
            const scrollContainer = document.querySelector("[data-scroll]");
            if (scrollContainer && scrollContainer.contains(target)) {
                return; // allow scrolling inside menu
            }
            e.preventDefault();
        };
        document.addEventListener("touchmove", preventScroll, { passive: false });
        return () => {
            // Restore original values
            html.style.overflow = prevHtmlOverflow;
            body.style.overflow = prevBodyOverflow;
            html.style.position = prevHtmlPosition;
            body.style.position = prevBodyPosition;
            html.style.height = prevHtmlHeight;
            body.style.height = prevBodyHeight;
            document.removeEventListener("touchmove", preventScroll);
        };
    }, [open]);
    /* focus trap + ESC - but avoid triggering mobile keyboard */
    useEffect(() => {
        if (!open)
            return;
        const el = panelRef.current;
        // Don't auto-focus on mobile to prevent keyboard popup
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) {
            const focusFirst = () => {
                const first = el?.querySelector('button, a, [tabindex]:not([tabindex="-1"])');
                first?.focus({ preventScroll: true });
            };
            setTimeout(focusFirst, 100);
        }
        const onKey = (e) => {
            if (e.key === "Escape")
                onClose();
            if (e.key === "Tab") {
                const items = el?.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
                if (!items || items.length === 0)
                    return;
                const first = items[0];
                const last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
                else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener("keydown", onKey);
        return () => { window.removeEventListener("keydown", onKey); };
    }, [open, onClose]);
    /* iOS rubber-band fix inside the scroller */
    useLayoutEffect(() => {
        if (!open)
            return;
        const scroller = panelRef.current?.querySelector("[data-scroll]");
        if (!scroller)
            return;
        const lock = () => {
            const top = scroller.scrollTop;
            const max = scroller.scrollHeight - scroller.clientHeight;
            if (top <= 0)
                scroller.scrollTop = 1;
            if (top >= max)
                scroller.scrollTop = max - 1;
        };
        scroller.addEventListener("touchstart", lock, { passive: true });
        return () => scroller.removeEventListener("touchstart", lock);
    }, [open]);
    /* Auto-close menu when switching to large desktop view (xl = 1280px+) */
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280 && open) {
                onClose();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [open, onClose]);
    // smart navigation: internal routes, hash anchors, and full URLs
    const go = (href) => {
        onClose();
        onNav?.(href);
        // external url
        if (/^https?:\/\//i.test(href)) {
            window.location.assign(href);
            return;
        }
        // hash (or path + hash) => let browser scroll smoothly
        if (href.startsWith("#") || href.includes("#")) {
            window.location.assign(href);
            return;
        }
        // ensure leading slash for react-router
        const path = href.startsWith("/") ? href : `/${href}`;
        navigate(path);
    };
    return createPortal(_jsx(AnimatePresence, { mode: "wait", children: open && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }, className: "fixed inset-0", style: {
                zIndex: 99999,
                pointerEvents: 'auto',
                backgroundColor: 'transparent', // Transparent root, backdrop handles the overlay
                // iOS safe areas
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                // Support for iPhone notch and dynamic island
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)',
                paddingLeft: 'env(safe-area-inset-left)',
                paddingRight: 'env(safe-area-inset-right)',
            }, role: "dialog", "aria-modal": "true", "aria-label": "Navigation", children: [_jsx(motion.div, { className: "absolute inset-0 bg-black/60 z-0", onClick: onClose, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 } }), _jsx(motion.div, { ref: panelRef, id: "mobile-menu-panel", initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" }, transition: {
                        duration: 0.3,
                        ease: "easeOut",
                        type: "tween"
                    }, className: "absolute left-0 top-0 bottom-0 w-[min(85vw,420px)] bg-black/95 backdrop-blur-xl border-r border-white/10 shadow-2xl z-10", style: {
                        WebkitOverflowScrolling: 'touch',
                    }, onClick: (e) => e.stopPropagation(), children: _jsxs("div", { "data-scroll": true, className: "h-full flex flex-col overflow-y-auto overflow-x-hidden no-scrollbar\r\n                         px-4 sm:px-5 md:px-6 lg:px-7\r\n                         pt-4 sm:pt-5 md:pt-6 lg:pt-8\r\n                         pb-6 sm:pb-7 md:pb-8 lg:pb-10", style: {
                            WebkitOverflowScrolling: "touch",
                            overscrollBehavior: "contain",
                            touchAction: "pan-y",
                            scrollBehavior: "smooth",
                            // Safe area padding for all devices (iPhone notch, Samsung hole-punch, iPad)
                            paddingTop: 'max(1rem, env(safe-area-inset-top))',
                            paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
                            paddingLeft: 'max(1rem, env(safe-area-inset-left))',
                            paddingRight: 'max(1rem, env(safe-area-inset-right))',
                        }, children: [_jsxs("div", { className: "mb-6 sm:mb-7 md:mb-8 space-y-2.5 sm:space-y-3", children: [_jsx(GradientRingButton, { size: "lg", fullWidth: true, onClick: () => go("/launch"), className: "text-lg font-bold tracking-wide", style: { fontFamily: 'var(--font-hape)' }, children: "Launch DNDX" }), _jsxs("div", { className: "grid grid-cols-2 gap-2.5 sm:gap-3", children: [_jsx(GradientRingButton, { size: "md", fullWidth: true, onClick: () => go("/league"), className: "text-base font-bold tracking-wide", style: { fontFamily: 'var(--font-hape)' }, children: "Leagues" }), _jsx(GradientRingButton, { size: "md", fullWidth: true, onClick: () => window.open("https://waitlist.dendrites.ai/", "_blank", "noopener,noreferrer"), className: "text-base font-bold tracking-wide", style: { fontFamily: 'var(--font-hape)' }, children: "Waitlist" })] })] }), _jsx("div", { className: "h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-6 sm:mb-7 md:mb-8" }), _jsx("div", { className: "space-y-2.5 sm:space-y-3 mb-8 sm:mb-9 md:mb-10", children: links.map((l) => {
                                    const active = activeHref === "/" ? l.href === "/" : activeHref.startsWith(l.href);
                                    return (_jsx(GradientRingButton, { size: "lg", fullWidth: true, onClick: () => go(l.href), className: cn("text-lg font-bold tracking-wide", active ? "ring-2 ring-white/30" : ""), style: { fontFamily: 'var(--font-hape)' }, rightIcon: active ? (_jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-gradient-to-r from-[#FFC700] to-[#00D1FF] shadow-[0_0_8px_rgba(255,199,0,0.55)]" })) : undefined, children: l.label }, l.href));
                                }) }), _jsx("div", { className: "mt-auto pt-4 sm:pt-5 md:pt-6", children: _jsxs("div", { className: "flex items-center justify-between text-xs sm:text-sm text-white/30 tracking-wide", style: {
                                        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
                                    }, children: [_jsx("span", { children: "\u00A9 2025 Dendrites" }), _jsx("span", { className: "uppercase font-medium", children: "DNDX" })] }) })] }) })] }, "mobile-sheet-root")) }), portal);
}
