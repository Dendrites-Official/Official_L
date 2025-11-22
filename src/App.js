import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/App.tsx
import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// Global chrome
import Navbar from "@/components/Navbar";
import ChatBotWidget from "@/components/ChatBotWidget";
import MatrixIntro from "@/components/MatrixIntro";
import ErrorBoundary from "@/components/ErrorBoundary";
// Pages - Lazy loaded for better performance
const HomePage = lazy(() => import("@/pages/Home"));
const Docs = lazy(() => import("@/pages/Docs"));
const SLA = lazy(() => import("@/pages/SLA"));
const Security = lazy(() => import("@/pages/Security"));
const Blogs = lazy(() => import("@/pages/Blogs"));
const BlogArticle = lazy(() => import("@/pages/BlogArticle"));
const Roadmap = lazy(() => import("@/pages/Roadmap"));
const Launch = lazy(() => import("@/pages/Launch"));
const HeroExample = lazy(() => import("@/pages/HeroExample"));
const Careers = lazy(() => import("./components/Careers"));
const InternshipApplyPage = lazy(() => import("./components/InternshipApplyPage"));
const League = lazy(() => import("@/pages/League"));
/** Check if we should show intro (only once per session) */
const shouldShowIntro = () => {
    const shownA = sessionStorage.getItem("introShown") === "true";
    const shownB = sessionStorage.getItem("dndx:introShown") === "true";
    if (shownA || shownB)
        return false;
    const nav = performance.getEntriesByType("navigation")[0];
    return nav?.type === "reload" || nav?.type === "navigate";
};
/** Scroll to top on route change - only if no hash present */
function ScrollToTop() {
    const { pathname, hash } = useLocation();
    useEffect(() => {
        // Don't scroll to top if there's a hash (anchor link)
        if (!hash) {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }
    }, [pathname, hash]);
    return null;
}
/** Premium page transition wrapper with smooth animations - OPTIMIZED */
function PageTransition({ children }) {
    return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: {
            duration: 0.2,
            ease: "easeOut",
        }, className: "min-h-[calc(100svh-4rem)]", children: children }));
}
/** Loading fallback component for lazy-loaded pages */
function PageLoader() {
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-black", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white/20 border-r-white/80" }), _jsx("p", { className: "mt-4 text-white/60 text-sm", children: "Loading..." })] }) }));
}
export default function App() {
    const location = useLocation();
    const [showIntro, setShowIntro] = useState(() => shouldShowIntro());
    const [introComplete, setIntroComplete] = useState(false);
    // Consolidated scroll lock effect - single source of truth
    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;
        if (showIntro) {
            // Mark intro as shown immediately
            sessionStorage.setItem("introShown", "true");
            sessionStorage.setItem("dndx:introShown", "true");
            // Lock scroll
            root.classList.add("intro-open");
            body.style.overflow = "hidden";
            body.style.position = "fixed";
            body.style.width = "100%";
            body.style.top = "0";
        }
        else {
            // Unlock scroll
            root.classList.remove("intro-open");
            body.style.overflow = "";
            body.style.position = "";
            body.style.width = "";
            body.style.top = "";
        }
        return () => {
            // Cleanup
            root.classList.remove("intro-open");
            body.style.overflow = "";
            body.style.position = "";
            body.style.width = "";
            body.style.top = "";
        };
    }, [showIntro]);
    const handleIntroComplete = () => {
        setIntroComplete(true);
        sessionStorage.setItem("introShown", "true");
        sessionStorage.setItem("dndx:introShown", "true");
        setShowIntro(false);
    };
    return (_jsx(_Fragment, { children: _jsxs(ErrorBoundary, { children: [_jsx(AnimatePresence, { mode: "wait", children: showIntro && (_jsx(motion.div, { initial: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.6, ease: "easeInOut" }, children: _jsx(MatrixIntro, { onHandoff: handleIntroComplete }) }, "matrix-intro")) }), _jsx(ScrollToTop, {}), _jsx(Navbar, {}), _jsx("main", { className: "bg-black text-white", children: _jsx(motion.div, { initial: showIntro ? { opacity: 0, y: "100vh" } : { opacity: 1, y: 0 }, animate: introComplete ? { opacity: 1, y: 0 } : {}, transition: {
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                            opacity: { duration: 0.6, delay: 0.2 },
                        }, children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsxs(Routes, { location: location, children: [_jsx(Route, { path: "/", element: _jsx(PageTransition, { children: _jsx(HomePage, {}) }) }), _jsx(Route, { path: "/docs", element: _jsx(PageTransition, { children: _jsx(Docs, {}) }) }), _jsx(Route, { path: "/sla", element: _jsx(PageTransition, { children: _jsx(SLA, {}) }) }), _jsx(Route, { path: "/security", element: _jsx(PageTransition, { children: _jsx(Security, {}) }) }), _jsx(Route, { path: "/blogs", element: _jsx(PageTransition, { children: _jsx(Blogs, {}) }) }), _jsx(Route, { path: "/blogs/:id", element: _jsx(PageTransition, { children: _jsx(BlogArticle, {}) }) }), _jsx(Route, { path: "/roadmap", element: _jsx(PageTransition, { children: _jsx(Roadmap, {}) }) }), _jsx(Route, { path: "/launch", element: _jsx(PageTransition, { children: _jsx(Launch, {}) }) }), _jsx(Route, { path: "/hero-example", element: _jsx(PageTransition, { children: _jsx(HeroExample, {}) }) }), _jsx(Route, { path: "/careers", element: _jsx(PageTransition, { children: _jsx(Careers, {}) }) }), _jsx(Route, { path: "/careers/apply/:roleId", element: _jsx(PageTransition, { children: _jsx(InternshipApplyPage, {}) }) }), _jsx(Route, { path: "/league", element: _jsx(PageTransition, { children: _jsx(League, {}) }) })] }, location.pathname) }) }) }) }), "      ", _jsx(ChatBotWidget, {}), _jsx("style", { children: `
        html.intro-open [data-navbar] > div > div:first-child,
        html.intro-open [class*="ticker"],
        html.intro-open [class*="marquee"],
        html.intro-open #momo-widget,
        html.intro-open [data-chatbot],
        html.intro-open .chat-bubble {
          opacity: 0 !important;
          visibility: hidden !important;
        }
        html.intro-open #music-player {
          opacity: 1 !important;
          pointer-events: auto !important;
          visibility: visible !important;
        }
      ` })] }) }));
}
