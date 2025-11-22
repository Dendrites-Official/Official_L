"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GlobalAnalytics from "@/components/pains/GlobalAnalytics";
import UnpredictableMono from "@/components/pains/UnpredictableMono";
import IrreversibleMono from "@/components/pains/IrreversibleMono";
import FeaturesEscrowQuickPay from "@/components/pains/FeaturesEscrowQuickPay";
import PaymentsAckInPay from "../pains/PaymentsAckInPay";
import FadeUp from "@/components/ui/FadeUp";
/**
 * Individual section that slides up and covers previous section
 */
function Section({ id, title, summary, tags, children }) {
    return (_jsx("div", { className: "relative", children: _jsx(FadeUp, { children: _jsx("section", { id: id, className: "min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-black to-black pb-20", children: _jsxs("div", { className: "flex flex-col relative", children: [_jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
                                background: `radial-gradient(ellipse at top, rgba(6, 182, 212, 0.08) 0%, transparent 50%)`
                            } }), _jsx("div", { className: "w-full px-4 sm:px-6 md:px-8 pt-20 md:pt-32 pb-8 relative z-10", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: tags.map((tag) => (_jsx("span", { className: "text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20", children: tag }, tag))) }), _jsx("h2", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-4", children: title }), _jsx("p", { className: "text-lg sm:text-xl md:text-2xl text-white/70 max-w-4xl leading-relaxed", children: summary })] }) }), _jsx("div", { className: "w-full px-4 sm:px-6 md:px-8 pb-12 relative z-10", children: _jsx("div", { className: "max-w-7xl mx-auto", children: _jsx("div", { className: "rounded-2xl overflow-hidden", style: {
                                        background: "linear-gradient(180deg, rgba(15,15,25,0.6) 0%, rgba(10,10,18,0.8) 100%)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)"
                                    }, children: children }) }) })] }) }) }) }));
}
/**
 * Main showcase with stacked scroll sections
 */
export default function StackedPainsShowcase() {
    const sections = [
        {
            id: "global-analytics",
            title: "Global Analytics",
            summary: "An interactive snapshot across major EVM networks—toggle chains, adjust assumptions, and inspect how usage compounds risk.",
            tags: ["CREATIVE DEVELOPMENT", "DATA EXPERIENCE", "3D-LIKE VECTORS"],
            component: _jsx(GlobalAnalytics, {})
        },
        {
            id: "unpredictable-gas",
            title: "Unpredictable Gas",
            summary: "Quotes drift, inclusion delays spike costs. See how DNDX's Predictable Band locks fee ranges for real-world commerce.",
            tags: ["SAFE-COMMERCE", "PREDICTABLE GAS™", "SOFT-SLA"],
            component: _jsx(UnpredictableMono, { initialCongestion: 75 })
        },
        {
            id: "irreversible-payments",
            title: "Irreversible Payments",
            summary: "Fat-finger sends and wrong chains equal losses. Explore UNDO windows and escrow-native flows.",
            tags: ["UNDO (180s)", "ESCROW", "REFUNDS"],
            component: _jsx(IrreversibleMono, {})
        },
        {
            id: "escrow-quickpay",
            title: "Escrow + QuickPay",
            summary: "Complex commerce needs trust-minimized flows. Visualize multi-party escrows with QuickPay settlements.",
            tags: ["MULTI-PARTY ESCROW", "QUICKPAY", "COMPLEX COMMERCE"],
            component: _jsx(FeaturesEscrowQuickPay, {})
        },
        {
            id: "ackpay",
            title: "AckPay — Request & Accept",
            summary: "Send a request link. Funds land as PENDING and only settle when you accept(); otherwise auto-refund.",
            tags: ["PENDING UNTIL ACCEPT()", "REQUEST LINKS", "AUTO-REFUND"],
            component: _jsx(PaymentsAckInPay, {})
        }
    ];
    return (_jsxs("div", { className: "relative w-full bg-black", children: [_jsx("div", { className: "w-full px-4 sm:px-6 md:px-8 py-16 md:py-24", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("div", { className: "mb-6", children: _jsx("span", { className: "text-xs sm:text-sm font-semibold tracking-[0.2em] text-indigo-400 uppercase", children: "Working with Dendrites" }) }), _jsxs("h1", { className: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] mb-6", children: ["The Friction You Hated.", _jsx("br", {}), _jsx("span", { className: "bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent", children: "The Features We Shipped." })] }), _jsx("p", { className: "text-xl sm:text-2xl text-white/60 max-w-3xl", children: "Scroll through our solutions to the biggest pain points in Web3 commerce." })] }) }), sections.map((section) => (_jsx(Section, { id: section.id, title: section.title, summary: section.summary, tags: section.tags, children: section.component }, section.id)))] }));
}
