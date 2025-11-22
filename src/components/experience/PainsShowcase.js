"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from "react";
import PortfolioHoverRow from "../experience/PortfolioHoverRow";
import GlobalAnalytics from "@/components/pains/GlobalAnalytics";
import UnpredictableMono from "@/components/pains/UnpredictableMono";
import IrreversibleMono from "@/components/pains/IrreversibleMono";
import FeaturesEscrowQuickPay from "@/components/pains/FeaturesEscrowQuickPay";
import PaymentsAckInPay from "../pains/PaymentsAckInPay";
import { useLocation } from "react-router-dom";
// Context to manage which panel is open
const OpenPanelContext = React.createContext({
    openPanel: null,
    setOpenPanel: () => { },
});
export function useOpenPanel() {
    return React.useContext(OpenPanelContext);
}
export default function PainsShowcase() {
    const [openPanel, setOpenPanel] = React.useState(null);
    const location = useLocation();
    useEffect(() => {
        if (location.hash === "#escrow-quickpay") {
            setOpenPanel("escrow-quickpay");
            requestAnimationFrame(() => {
                document.getElementById("escrow-quickpay")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });
        }
    }, [location.hash]);
    useEffect(() => {
        const handler = (event) => {
            const custom = event;
            if (custom.detail === "escrow-quickpay") {
                setOpenPanel("escrow-quickpay");
            }
        };
        window.addEventListener("dndx-open-section", handler);
        return () => window.removeEventListener("dndx-open-section", handler);
    }, []);
    return (_jsx(OpenPanelContext.Provider, { value: { openPanel, setOpenPanel }, children: _jsxs("div", { className: "w-full bg-black pt-16 pb-0", children: [_jsx("div", { className: "w-full px-4 sm:px-6 md:px-8 pb-8 md:pb-12", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("div", { className: "mb-4 md:mb-6", children: _jsx("span", { className: "text-xs sm:text-sm font-semibold tracking-[0.2em] text-indigo-400 uppercase", children: "Working with Dendrites" }) }), _jsx("h2", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight", children: "\u201CThe Friction You Hated. The Features We Shipped.\u201D" })] }) }), _jsx(PortfolioHoverRow, { id: "global-analytics", title: "Global Analytics", summary: "An interactive snapshot across major EVM networks\u2014toggle chains, adjust assumptions, and inspect how usage compounds risk.", tags: ["CREATIVE DEVELOPMENT", "DATA EXPERIENCE", "3D-LIKE VECTORS", "STRATEGY"], 
                    // location="NEW YORK, NY"
                    bgTint: "linear-gradient(180deg, rgba(5,10,12,0.78) 0%, rgba(5,10,12,0.94) 100%)", children: _jsx(GlobalAnalytics, {}) }), _jsx(PortfolioHoverRow, { id: "unpredictable-gas", title: "Unpredictable Gas", summary: "Quotes drift, inclusion delays spike costs. See how DNDX's Predictable Band locks fee ranges for real-world commerce.", tags: ["SAFE-COMMERCE", "PREDICTABLE GAS™", "SOFT-SLA"], 
                    // location="SAN FRANCISCO, CA"
                    bgTint: "linear-gradient(180deg, rgba(7,10,14,0.72) 0%, rgba(7,10,14,0.92) 100%)", children: _jsx(UnpredictableMono, { initialCongestion: 75 }) }), _jsx(PortfolioHoverRow, { id: "irreversible-payments", title: "Irreversible Payments", summary: "Fat-finger sends and wrong chains equal losses. Explore UNDO windows and escrow-native flows.", tags: ["UNDO (180s)", "ESCROW", "REFUNDS"], 
                    // location="TEL AVIV, IL"
                    bgTint: "linear-gradient(180deg, rgba(8,10,16,0.72) 0%, rgba(8,10,16,0.95) 100%)", children: _jsx(IrreversibleMono, {}) }), _jsx(PortfolioHoverRow, { id: "escrow-quickpay", title: "Escrow + QuickPay", summary: "Complex commerce needs trust-minimized flows. Visualize multi-party escrows with QuickPay settlements.", tags: ["MULTI-PARTY ESCROW", "QUICKPAY", "COMPLEX COMMERCE"], 
                    // location="LONDON, UK"
                    bgTint: "linear-gradient(180deg, rgba(10,10,18,0.72) 0%, rgba(10,10,18,0.95) 100%)", children: _jsx(FeaturesEscrowQuickPay, {}) }), _jsx(PortfolioHoverRow, { id: "ackpay", title: "AckPay \u2014 Request & Accept", summary: "Send a request link. Funds land as PENDING and only settle when you accept(); otherwise auto-refund.", tags: ["PENDING UNTIL ACCEPT()", "REQUEST LINKS", "AUTO-REFUND"], bgTint: "linear-gradient(180deg, rgba(10,10,18,0.72) 0%, rgba(10,10,18,0.95) 100%)", children: _jsx(PaymentsAckInPay, {}) })] }) }));
}
