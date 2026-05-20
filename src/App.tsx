// src/App.tsx
import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Global chrome
import Navbar from "@/components/Navbar";
import ChatBotWidget from "@/components/ChatBotWidget";
import MatrixIntro from "@/components/MatrixIntro";
// DNDXLaunchSequence removed — launch sequence is deprecated.
import MusicPlayer from "@/components/MusicPlayer";
import ExternalRedirect from "@/components/ExternalRedirect";
import ErrorBoundary from "@/components/ErrorBoundary";
import GenesisPresale from "@/pages/Presale";

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

const AboutDendrites = lazy(() => import("@/pages/AboutDendrites")); // 👈 NEW

/** Check if we should show intro (only once per session and only on home page) */
const shouldShowIntro = (): boolean => {
  // Only show intro on home page
  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    return false;
  }

  const shownA = sessionStorage.getItem("introShown") === "true";
  const shownB = sessionStorage.getItem("dndx:introShown") === "true";
  if (shownA || shownB) return false;

  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
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
function PageTransition({ children }: { children: React.ReactNode }) {
  const shouldReduce = useReducedMotion();

  // Simplified transition for reduced motion or mobile
  if (shouldReduce) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="min-h-[calc(100svh-4rem)]"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="min-h-[calc(100svh-4rem)]"
    >
      {children}
    </motion.div>
  );
}

/** Loading fallback component for lazy-loaded pages */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white/20 border-r-white/80" />
        <p className="mt-4 text-white/60 text-sm">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);
  const [showIntro, setShowIntro] = useState<boolean>(() => shouldShowIntro());
  const [introComplete, setIntroComplete] = useState<boolean>(false);
  const [chatbotReady, setChatbotReady] = useState(false);
  const introReady = !showIntro || introComplete;

  // Consolidated scroll lock effect - single source of truth
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (showIntro) {
      // Mark intro as shown immediately
      sessionStorage.setItem("introShown", "true");
      sessionStorage.setItem("dndx:introShown", "true");

      // Lock scroll - but only on desktop (>700px)
      const isMobile = window.innerWidth <= 700;
      
      root.classList.add("intro-open");
      
      if (!isMobile) {
        // Only lock scroll on desktop
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.width = "100%";
        body.style.top = "0";
      } else {
        // On mobile, forcefully ensure scroll is NOT blocked
        body.style.overflow = "";
        body.style.position = "";
        body.style.width = "";
        body.style.top = "";
      }
    } else {
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

  // CRITICAL: Force cleanup on window resize (if user rotates device or resizes window)
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 700;
      if (isMobile) {
        // Always ensure mobile can scroll
        document.body.style.position = "";
        document.body.style.overflow = "";
        document.body.style.top = "";
        document.body.style.width = "";
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Run immediately
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    sessionStorage.setItem("introShown", "true");
    sessionStorage.setItem("dndx:introShown", "true");
    setShowIntro(false);
  };

  // Track initial mount so we can differentiate full page loads from SPA navigations
  useEffect(() => {
    setIsInitialMount(true);
    // mark end of initial mount on next tick
    const t = window.setTimeout(() => setIsInitialMount(false), 0);
    return () => window.clearTimeout(t);
  }, []);

  // Always allow popup on home page - simplified logic
  const allowPopupOnThisLoad = true;
  console.log("[App] allowPopupOnThisLoad: true (always enabled on home page)");

  useEffect(() => {
    if (showIntro) {
      setChatbotReady(false);
      return;
    }

    setChatbotReady(false);
    const bootDelay = window.setTimeout(() => {
      setChatbotReady(true);
    }, 1200);

    return () => {
      window.clearTimeout(bootDelay);
    };
  }, [showIntro, location.pathname]);

  return (
    <>
      <ErrorBoundary>
        {/* Matrix Intro - fades out (only shows once per session) */}
        <AnimatePresence mode="wait">
          {showIntro && (
            <motion.div
              key="matrix-intro"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <MatrixIntro onHandoff={handleIntroComplete} />
            </motion.div>
          )}
        </AnimatePresence>

  {/* Launch sequence removed — no takeover sequence will be shown. */}

        <ScrollToTop />
        <Navbar />

        <main className="bg-black text-white">
          <motion.div
            initial={showIntro ? { opacity: 0, y: "100vh" } : { opacity: 1, y: 0 }}
            animate={introComplete ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.6, delay: 0.2 },
            }}
          >
            <AnimatePresence mode="wait">
              <Suspense fallback={<PageLoader />}>
                <Routes location={location} key={location.pathname}>
                  <Route
                    path="/"
                    element={
                      <PageTransition>
                        <HomePage introReady={introReady} allowPopupOnInitialLoad={allowPopupOnThisLoad} />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/docs"
                    element={
                      <PageTransition>
                        <Docs />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/sla"
                    element={
                      <PageTransition>
                        <SLA />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/security"
                    element={
                      <PageTransition>
                        <Security />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/blogs"
                    element={
                      <PageTransition>
                        <Blogs />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/blogs/:id"
                    element={
                      <PageTransition>
                        <BlogArticle />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/roadmap"
                    element={
                      <PageTransition>
                        <Roadmap />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/launch"
                    element={
                      <PageTransition>
                        <Launch />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/hero-example"
                    element={
                      <PageTransition>
                        <HeroExample />
                      </PageTransition>
                    }
                  />

                  {/* Careers */}
                  <Route
                    path="/careers"
                    element={
                      <PageTransition>
                        <Careers />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/careers/apply/:roleId"
                    element={
                      <PageTransition>
                        <InternshipApplyPage />
                      </PageTransition>
                    }
                  />

                  {/* Presale */}
                  <Route
                    path="/presale"
                    element={
                      <PageTransition>
                        <GenesisPresale />
                      </PageTransition>
                    }
                  />

                  {/* NEW: About Dendrites */}
                  <Route
                    path="/about"
                    element={
                      <PageTransition>
                        <AboutDendrites />
                      </PageTransition>
                    }
                  />

                  {/* External redirects */}
                  <Route
                    path="/airdrop"
                    element={<ExternalRedirect to="https://waitlist.dendrites.ai" />}
                  />
                  <Route
                    path="/leaderboard"
                    element={
                      <ExternalRedirect to="https://waitlist.dendrites.ai/leaderboard" />
                    }
                  />
                  <Route
                    path="/leadboard"
                    element={
                      <ExternalRedirect to="https://waitlist.dendrites.ai/leaderboard" />
                    }
                  />
                </Routes>
              </Suspense>
            </AnimatePresence>
          </motion.div>
        </main>
        {chatbotReady && <ChatBotWidget />}

        <style>{`
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
        `}</style>
      </ErrorBoundary>
      <Analytics />
    </>
  );
}
