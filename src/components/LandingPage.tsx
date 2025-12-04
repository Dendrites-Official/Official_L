// src/components/LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";
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
import CTAJoin from "./CTAJoinDesktop";
import Hero1 from "./Hero1";
import MobileSRL from "./MobileSRL";
import { useIsMobile } from "@/hooks/useIsMobile"; 
import CTAJoinMobile from "./CTAJoinMobile";
import CTAJoinDesktop from "./CTAJoinDesktop";
import TokenomicsSection from "./TokenomicsSection";
// import TrustSignalStack from "./TrustSignalStack";
import TokenProofStrip from "./TokenProofStrip";

type LandingPageProps = {
  introReady?: boolean;
};

export default function LandingPage({ introReady = true }: LandingPageProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className="relative bg-black text-white min-h-[100svh]"
      style={{
        WebkitOverflowScrolling: "touch",
        overflow: "visible",
        touchAction: "pan-y pinch-zoom",
      }}
    >

      <Hero1 introReady={introReady} />


      {/* Page 1: Hero Section */}
      <section
        className="w-full hero-section-wrapper"
        style={{
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
        }}
      >
        <HeroSection />
      </section>

      <TokenProofStrip />

      {/* Page 2: Logo Marquee */}
      <section
        className="min-h-[50svh] w-full flex items-center justify-center bg-black"
        style={{
          overflow: 'visible',
          border: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          outline: 'none',
          boxShadow: 'none',
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: 0
        }}
      >
        <div className="w-full">
          <PremiumLogoMarquee />
        </div>
      </section>

      {/* Page 3: Pains Section */}
      <section className="min-h-[100svh] w-full bg-black" style={{ overflow: 'visible' }}>
        <div className="w-full">
          <PainsComposite />
        </div>
      </section>

      {isMobile ? (
        <MobileSRL />
      ) : (
        <SRLLayer2Hero />
      )}

      {/* SRL Layer 2 Description Section */}
      <section className="w-full bg-black py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Title with gradient accent */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            <span className="text-white">SRL LAYER 2</span>
            {" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Three-Lane Technology
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-slate-300/90 font-medium">
            Our proprietary scalability solution
          </p>

          {/* Disclaimer with icon */}
          <div className="mt-6 sm:mt-8 flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 mt-2.5" />
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl leading-relaxed">
              This is not our final technology. Subject to change based on ongoing research and requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-black text-white" style={{ overflow: 'visible' }}>
        <DndxRoadmapPremium />
      </section>

      {/* <TrustSignalStack /> */}

      <TokenomicsSection />

      <ArticlesBlogs />

      <section className="min-h-[50svh] w-full flex items-center justify-center bg-black" style={{ overflow: 'visible' }}>
        <div className="w-full">
          <TokenAirdropAnnouncement
            totalGiveaway={1_000_000}
            presaleHref="https://waitlist.dendrites.ai/"   // point this to your waitlist / signup
            docsHref="/sla"
            headline="1,000,000 Transactions free for early supporters"
            subline="Pre-sale incentive • usage-first • anti-sybil"
          />
        </div>
      </section>

      <SRLCommunityReviews />

      {/* Desktop / large screens */}
      <div className="hidden md:block">
        <CTAJoinDesktop />
      </div>

      {/* Mobile / tablets */}
      <div className="block md:hidden">
        <CTAJoinMobile />
      </div>

      {/* Page 5: Footer */}
      <section className="snap-start snap-always min-h-[100svh] w-full flex items-center justify-center bg-gradient-to-b from-black via-slate-950 to-slate-900 py-12 sm:py-16 md:py-20">
        <Footer />
      </section>
    </div>
  );
}
