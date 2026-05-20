// src/pages/Home.tsx
import React from "react";
import LandingPage from "@/components/LandingPage"; // if alias "@" is set to ./src
import DNDXMiniLaunchPopup from "@/components/DNDXMiniLaunchPopup";

type HomePageProps = {
  introReady?: boolean;
  allowPopupOnInitialLoad?: boolean;
};

export default function HomePage({ introReady = true, allowPopupOnInitialLoad = true }: HomePageProps) {
  console.log("[HomePage] Rendering with props:", { introReady, allowPopupOnInitialLoad });
  return (
    <>
      <DNDXMiniLaunchPopup
        mode="always"
        waitlistHref="https://waitlist.dendrites.ai/"
        quickPayHref="/quickpay"
        termsHref="/terms"
        mainnetHref="https://dendrites.xyz"
        internshipHref="/careers/apply/0"
        // Force true to always show on home page after intro
        allowOnInitialLoad={true}
        introReady={introReady}
      />

      <LandingPage introReady={introReady} />
    </>
  );
}
