import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HeroSection from "@/components/HeroSection";
import PremiumLogoMarquee from "@/components/ui/PremiumLogoMarquee";
// import PainsSection from "@/components/PainsSection";
import Footer from "@/components/Footer";
import PainsComposite from "./pains/PainsComposite";
import TokenAirdropAnnouncement from "./ui/TokenAirdropAnnouncement";
import DndxRoadmapPremium from "./ui/DndxRoadmapPremium";
// import SRLSignalHero from "./SRLSignalHero";
import SRLCommunityReviews from "./SRLCommunityReviews";
import ArticlesBlogs from "./ArticlesBlogs";
import SRLLayer2Hero from "./SRLLayer2Hero";
import Hero1 from "./Hero1";
import MobileSRL from "./MobileSRL";
import { useIsMobile } from "@/hooks/useIsMobile";
import CTAJoinMobile from "./CTAJoinMobile";
import CTAJoinDesktop from "./CTAJoinDesktop";
import TokenomicsSection from "./TokenomicsSection";
export default function LandingPage() {
    const isMobile = useIsMobile();
    return (_jsxs("div", { className: "relative bg-black text-white min-h-[100svh]", style: {
            WebkitOverflowScrolling: "touch",
            overflow: "visible",
            touchAction: "pan-y pinch-zoom",
        }, children: [_jsx(Hero1, {}), _jsx("section", { className: "w-full hero-section-wrapper", style: {
                    overflow: 'visible',
                    border: 'none',
                    borderTop: 'none',
                    borderBottom: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    marginBottom: 0,
                    paddingBottom: 0
                }, children: _jsx(HeroSection, {}) }), _jsx("section", { className: "min-h-[50svh] w-full flex items-center justify-center bg-black", style: {
                    overflow: 'visible',
                    border: 'none',
                    borderTop: 'none',
                    borderBottom: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    marginTop: 0,
                    paddingTop: 0,
                    paddingBottom: 0
                }, children: _jsx("div", { className: "w-full", children: _jsx(PremiumLogoMarquee, {}) }) }), _jsx("section", { className: "min-h-[100svh] w-full bg-black", style: { overflow: 'visible' }, children: _jsx("div", { className: "w-full", children: _jsx(PainsComposite, {}) }) }), isMobile ? (_jsx(MobileSRL, {})) : (_jsx(SRLLayer2Hero, {})), _jsx("section", { className: "w-full bg-black py-16 sm:py-20 md:py-24 lg:py-28", children: _jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12", children: [_jsxs("h2", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight", children: [_jsx("span", { className: "text-white", children: "SRL LAYER 2" }), " ", _jsx("span", { className: "bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent", children: "Three-Lane Technology" })] }), _jsx("p", { className: "mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-slate-300/90 font-medium", children: "Our proprietary scalability solution" }), _jsxs("div", { className: "mt-6 sm:mt-8 flex items-start gap-3 sm:gap-4", children: [_jsx("div", { className: "flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 mt-2.5" }), _jsx("p", { className: "text-base sm:text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed", children: "This is not our final technology. Subject to change based on ongoing research and requirements." })] })] }) }), _jsx("section", { className: "w-full bg-black text-white", style: { overflow: 'visible' }, children: _jsx(DndxRoadmapPremium, {}) }), _jsx(TokenomicsSection, {}), _jsx(ArticlesBlogs, {}), _jsx("section", { className: "min-h-[50svh] w-full flex items-center justify-center bg-black", style: { overflow: 'visible' }, children: _jsx("div", { className: "w-full", children: _jsx(TokenAirdropAnnouncement, { totalGiveaway: 1000000, presaleHref: "https://waitlist.dendrites.ai/" // point this to your waitlist / signup
                        , docsHref: "/sla", headline: "1,000,000 Transactions free for early supporters", subline: "Pre-sale incentive \u2022 usage-first \u2022 anti-sybil" }) }) }), _jsx(SRLCommunityReviews, {}), _jsx("div", { className: "hidden md:block", children: _jsx(CTAJoinDesktop, {}) }), _jsx("div", { className: "block md:hidden", children: _jsx(CTAJoinMobile, {}) }), _jsx("section", { className: "snap-start snap-always min-h-[100svh] w-full flex items-center justify-center bg-gradient-to-b from-black via-slate-950 to-slate-900 py-12 sm:py-16 md:py-20", children: _jsx(Footer, {}) })] }));
}
