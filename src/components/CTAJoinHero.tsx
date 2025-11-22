// src/components/CTAJoinHero.tsx
"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import CTAJoinDesktop from "@/components/CTAJoinDesktop";
import CTAJoinMobile from "@/components/CTAJoinMobile";

export default function CTAJoinHero() {
  // same breakpoint you used in the hook (1024px = md/“tablet and down”)
  const isMobile = useIsMobile(1024);

  // On mobile/tablet → show the mobile full-bleed hero
  // On desktop → show the cinematic desktop hero
  return isMobile ? <CTAJoinMobile /> : <CTAJoinDesktop />;
}
