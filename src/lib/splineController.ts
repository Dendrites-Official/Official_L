import { useEffect, useMemo, useRef, useState } from "react";

type CapabilityTier = "high" | "medium" | "low";

// Legacy behavior: always allow splines to hydrate immediately.
function requestSplinePermit(): { canRender: boolean; tier: CapabilityTier; release: () => void } {
  return {
    canRender: true,
    tier: "high",
    release: () => {},
  };
}

export function useSplineGate(_opts: { preferred?: CapabilityTier; hydrateOnce?: boolean } = {}) {
  const [ready, setReady] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const releaseRef = useRef<() => void>(() => {});

  const permit = useMemo(() => requestSplinePermit(), []);

  useEffect(() => {
    releaseRef.current = permit.release;
    setReady(true);
    setCanRender(permit.canRender);

    return () => {
      releaseRef.current();
    };
  }, [permit]);

  return {
    tier: permit.tier,
    ready,
    canRender,
    release: () => releaseRef.current(),
  };
}

export function shouldStreamSpline() {
  return true;
}

export function getFallbackAsset(section: "hero" | "srl" | "chatbot" | "cta" | "background") {
  switch (section) {
    case "hero":
      return "/hero_spline.png";
    case "srl":
      return "/SRL_spline.png";
    case "chatbot":
      return "/chatbot.png";
    case "cta":
      return "/page_end_cta.png";
    case "background":
    default:
      return "/backgrounddndx.png";
  }
}
