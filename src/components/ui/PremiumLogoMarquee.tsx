import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

type Logo = {
  name: string;
  src: string;
};

const nativeTokenLogos: Logo[] = [
  { name: "Ethereum", src: "/logosmarquee/eth.webp" },
  { name: "Bitcoin", src: "/logosmarquee/bitcoin.webp" },
  { name: "Solana", src: "/logosmarquee/solona.webp" },
  { name: "Polygon", src: "/logosmarquee/polygon.webp" },
  { name: "BNB", src: "/logosmarquee/bnb.webp" },
  { name: "Dogecoin", src: "/logosmarquee/dodge.webp" },
  { name: "Red", src: "/logosmarquee/red.webp" },
];

const brandLogos: Logo[] = [
  { name: "Company 2", src: "/logo1.webp" },
  { name: "Company 3", src: "/logo2.png" },
  { name: "Company 4", src: "/logo3.png" },
  { name: "Company 7", src: "/logo1.png" },
  { name: "Company 5", src: "/logo 5.jpg" },
  { name: "Company 6", src: "/SyncG1.png" },
];

const LogoItem = ({ name, src }: Logo) => (
  <div
    className="
      flex-shrink-0
      w-32 md:w-40 lg:w-48       /* all logos get same slot width */
      px-3                       /* small, consistent spacing */
      flex items-center justify-center
    "
  >
    <img
      src={src}
      alt={name}
      loading="lazy"
      className="
        max-h-14 md:max-h-20 lg:max-h-24
        w-auto
        object-contain
        filter grayscale
        opacity-80
        transition-all duration-300
        hover:opacity-100
        hover:grayscale-0
        hover:scale-110
      "
    />
  </div>
);

const LogoMarqueeRow = ({
  logos,
  reverse = false,
  speed = 40,
}: {
  logos: Logo[];
  reverse?: boolean;
  speed?: number;
}) => {
  const COPIES = 3; // repeat to make the track long enough

  return (
    <Marquee
      direction={reverse ? "right" : "left"}
      speed={speed}
      pauseOnHover
      gradient={false} // no edge fade, no extra visual gaps
      className="py-4"
    >
      {Array.from({ length: COPIES }).map((_, copyIndex) =>
        logos.map((logo, idx) => (
          <LogoItem key={`${copyIndex}-${logo.name}-${idx}`} {...logo} />
        ))
      )}
    </Marquee>
  );
};

export default function PremiumLogoMarquee() {
  // Responsive speeds - Lower number = SLOWER, Higher = FASTER
  const [row1Speed, setRow1Speed] = useState(25); // Medium mobile speed
  const [row2Speed, setRow2Speed] = useState(22);

  useEffect(() => {
    const updateSpeeds = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      
      if (isMobile) {
        // Medium speed for mobile
        setRow1Speed(25);
        setRow2Speed(22);
      } else {
        // Medium-fast desktop speeds
        setRow1Speed(35);
        setRow2Speed(30);
      }
    };
    
    // Initial check
    updateSpeeds();
    
    // Listen for viewport changes
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const handler = () => updateSpeeds();
    mobileQuery.addEventListener('change', handler);
    window.addEventListener('resize', updateSpeeds);
    
    return () => {
      mobileQuery.removeEventListener('change', handler);
      window.removeEventListener('resize', updateSpeeds);
    };
  }, []);

  return (
    <section className="relative w-full bg-black py-10 md:py-14 overflow-hidden">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-neutral-900/40 to-black" />

      {/* Section header */}
      <div className="relative z-10 text-center mb-6 md:mb-8 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-3">
          Multi-Chain. Brand-Grade.
        </h2>
        <p className="text-xs md:text-sm text-gray-400 max-w-2xl mx-auto">
          Chains and brands that take crypto seriously.
        </p>
      </div>

      {/* Marquee rows */}
      <div className="relative z-10 space-y-2 md:space-y-4">
        {/* Row 1: chains */}
        <LogoMarqueeRow key={`chains-${row1Speed}`} logos={nativeTokenLogos} speed={row1Speed} />
        {/* Row 2: brands */}
        <LogoMarqueeRow key={`brands-${row2Speed}`} logos={brandLogos} reverse speed={row2Speed} />
      </div>
    </section>
  );
}
