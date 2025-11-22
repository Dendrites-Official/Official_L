"use client";
import React from "react";
import GlobalAnalytics from "@/components/pains/GlobalAnalytics";
import UnpredictableMono from "@/components/pains/UnpredictableMono";
import IrreversibleMono from "@/components/pains/IrreversibleMono";
import FeaturesEscrowQuickPay from "@/components/pains/FeaturesEscrowQuickPay";
import PaymentsAckInPay from "../pains/PaymentsAckInPay";
import FadeUp from "@/components/ui/FadeUp";

interface SectionProps {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  children: React.ReactNode;
}

/**
 * Individual section that slides up and covers previous section
 */
function Section({ id, title, summary, tags, children }: SectionProps) {
  return (
    <div className="relative">
      <FadeUp>
        <section 
          id={id} 
          className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-black to-black pb-20"
        >
          <div className="flex flex-col relative">
            {/* Background gradient overlay for depth */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at top, rgba(6, 182, 212, 0.08) 0%, transparent 50%)`
              }}
            />

            {/* Header Section */}
            <div className="w-full px-4 sm:px-6 md:px-8 pt-20 md:pt-32 pb-8 relative z-10">
              <div className="max-w-7xl mx-auto">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-4">
                  {title}
                </h2>

                {/* Summary */}
                <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-4xl leading-relaxed">
                  {summary}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full px-4 sm:px-6 md:px-8 pb-12 relative z-10">
              <div className="max-w-7xl mx-auto">
                <div 
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(180deg, rgba(15,15,25,0.6) 0%, rgba(10,10,18,0.8) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.08)"
                  }}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>
    </div>
  );
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
      component: <GlobalAnalytics />
    },
    {
      id: "unpredictable-gas",
      title: "Unpredictable Gas",
      summary: "Quotes drift, inclusion delays spike costs. See how DNDX's Predictable Band locks fee ranges for real-world commerce.",
      tags: ["SAFE-COMMERCE", "PREDICTABLE GAS™", "SOFT-SLA"],
      component: <UnpredictableMono initialCongestion={75} />
    },
    {
      id: "irreversible-payments",
      title: "Irreversible Payments",
      summary: "Fat-finger sends and wrong chains equal losses. Explore UNDO windows and escrow-native flows.",
      tags: ["UNDO (180s)", "ESCROW", "REFUNDS"],
      component: <IrreversibleMono />
    },
    {
      id: "escrow-quickpay",
      title: "Escrow + QuickPay",
      summary: "Complex commerce needs trust-minimized flows. Visualize multi-party escrows with QuickPay settlements.",
      tags: ["MULTI-PARTY ESCROW", "QUICKPAY", "COMPLEX COMMERCE"],
      component: <FeaturesEscrowQuickPay />
    },
    {
      id: "ackpay",
      title: "AckPay — Request & Accept",
      summary: "Send a request link. Funds land as PENDING and only settle when you accept(); otherwise auto-refund.",
      tags: ["PENDING UNTIL ACCEPT()", "REQUEST LINKS", "AUTO-REFUND"],
      component: <PaymentsAckInPay />
    }
  ];

  return (
    <div className="relative w-full bg-black">
      {/* Intro Section - Not sticky */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Label */}
          <div className="mb-6">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-indigo-400 uppercase">
              Working with Dendrites
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.95] mb-6">
            The Friction You Hated.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              The Features We Shipped.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/60 max-w-3xl">
            Scroll through our solutions to the biggest pain points in Web3 commerce.
          </p>
        </div>
      </div>

      {/* Sections with Fade-Up Animation */}
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          summary={section.summary}
          tags={section.tags}
        >
          {section.component}
        </Section>
      ))}
    </div>
  );
}
