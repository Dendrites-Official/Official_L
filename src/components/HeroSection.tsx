// src/components/HeroSection.tsx
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountDown from "./CountDown";
import { GradientRingButton } from "@/components/ui/GradientRingButton";
import PremiumLogoMarquee from "@/components/ui/PremiumLogoMarquee";
import BackgroundHero from "./BackgroundHero";

export default function HeroSection() {
  const [showTrailer, setShowTrailer] = useState(false);
  // Removed animation reset loop for better performance

  /* -------------------- FlipWords -------------------- */
  const FlipWords = memo(() => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const words = useMemo(() => [
      { text: "UNDO ANY PAYMENT", highlight: "UNDO", color: "from-slate-100 to-sky-100" },
      { text: "PREDICTABLE FEES, ALWAYS", highlight: "PREDICTABLE", color: "from-zinc-100 to-blue-50" },
      { text: "GAS SPONSORED - NO TOKENS NEEDED", highlight: "GAS SPONSORED", color: "from-gray-100 to-sky-50" },
      { text: "SRL-POWERED Layer - 2 COMING 2026 ++", highlight: "SRL-POWERED", color: "from-neutral-100 to-cyan-50" },
    ], []);
    const nextWord = useCallback(() => setCurrentIndex((i) => (i + 1) % words.length), [words.length]);
    useEffect(() => { const t = setInterval(nextWord, 2000); return () => clearInterval(t); }, [nextWord]);

    const currentWord = words[currentIndex];
    const highlightText = useCallback((text: string, highlight: string) => {
      const parts = text.split(highlight);
      return (
        <>
          {parts.map((part, idx) => (
            <span key={idx} className="text-white/80">
              {part}
              {idx < parts.length - 1 && (
                <span 
                  className={`bg-gradient-to-r ${currentWord.color} bg-clip-text text-transparent font-bold`}
                >
                  {highlight}
                </span>
              )}
            </span>
          ))}
        </>
      );
    }, [currentWord.color]);

    return (
      <div className="relative flex items-center justify-center min-h-[60px] sm:min-h-[70px] px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWord.text}
            className="text-base sm:text-xl md:text-2xl lg:text-3xl font-[hape] tracking-wide text-center uppercase px-2"
            initial={{ y: 30, opacity: 0, filter: "blur(12px)", scale: 0.95 }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ y: -30, opacity: 0, filter: "blur(12px)", scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.35, 1] }}
          >
            {highlightText(currentWord.text, currentWord.highlight)}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  });

  /* -------------------- Scramble/Glitch Text Effect -------------------- */
  const ScrambleText = ({ 
    text, 
    className = "",
    delay = 0 
  }: { 
    text: string; 
    className?: string; 
    delay?: number;
  }) => {
    const [displayText, setDisplayText] = useState(text.split(''));
    const [isReady, setIsReady] = useState(false);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    
    useEffect(() => {
      // Wait for delay before starting animation
      const delayTimeout = setTimeout(() => {
        setIsReady(true);
        let iteration = 0;
            const interval = setInterval(() => {
              setDisplayText(text.split('').map((char, index) => {
                if (char === ' ' || char === '—') return char;
                if (index < iteration) return text[index];
                return chars[Math.floor(Math.random() * chars.length)];
              }));
              
              iteration += 1/3;
              
              if (iteration >= text.length) {
                clearInterval(interval);
                setDisplayText(text.split(''));
              }
            }, 60);        return () => clearInterval(interval);
      }, delay);
      
      return () => clearTimeout(delayTimeout);
    }, [text, delay]);
    
    return (
      <span 
        className={className}
        style={{ 
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.2s ease-in'
        }}
      >
        {displayText.join('')}
      </span>
    );
  };

  const HypertextLines = () => {
    const [lineSet, setLineSet] = useState(0);
    
    const lineSets = useMemo(() => [
      {
        line1: "CANCEL PAYMENTS — KNOW EXACT COSTS",
        line2: "NO TOKEN DRAMA — PROOF INFRASTRUCTURE",
      },
      {
        line1: "GAS SPONSORED — NO TOKENS NEEDED",
        line2: "APP ESCROW — SAFETYSEND SOFT-SLA",
      },
    ], []);

    useEffect(() => {
      const interval = setInterval(() => {
        setLineSet(prev => (prev + 1) % lineSets.length);
      }, 10000);
      return () => clearInterval(interval);
    }, []);

    const currentSet = lineSets[lineSet];
    
    // Parse text to identify silver/platinum words
    const parseWords = useCallback((text: string) => {
      const parts: { text: string; type: 'silver' | 'platinum' | 'separator' | 'normal' }[] = [];
      const words = text.split(' ');
      const silverKeywords = ['CANCEL', 'PAYMENTS', 'PROOF', 'INFRASTRUCTURE', 'GAS', 'SPONSORED', 'SAFETYSEND', 'SOFT-SLA'];
      const platinumKeywords = ['KNOW', 'EXACT', 'COSTS', 'NO', 'TOKEN', 'DRAMA', 'TOKENS', 'NEEDED', 'APP', 'ESCROW'];
      
      words.forEach((word, idx) => {
        if (word === '—') {
          parts.push({ text: word, type: 'separator' });
        } else if (silverKeywords.includes(word)) {
          parts.push({ text: word, type: 'silver' });
        } else if (platinumKeywords.includes(word)) {
          parts.push({ text: word, type: 'platinum' });
        } else {
          parts.push({ text: word, type: 'normal' });
        }
        
        if (idx < words.length - 1) {
          parts.push({ text: ' ', type: 'normal' });
        }
      });
      
      return parts;
    }, []);

    return (
      <div className="relative space-y-1 sm:space-y-2 min-h-[90px] sm:min-h-[100px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={lineSet}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {/* Line 1 */}
            <div 
              className="hypertext-line" 
              style={{ 
                fontFamily: "'Rajdhani', 'Orbitron', 'Exo 2', sans-serif",
                fontWeight: 300,
                letterSpacing: '0.15em'
              }}
            >
              {parseWords(currentSet.line1).map((part, idx) => (
                <ScrambleText
                  key={`${lineSet}-1-${idx}`}
                  text={part.text}
                  className={`hypertext-word ${part.type}`}
                  delay={idx * 30}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 px-4 my-3 sm:my-4">
              <div className="h-[0.5px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-sky-200/20 to-transparent" />
              <motion.div 
                className="h-1 w-1 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(224, 242, 254, 0.6) 0%, rgba(240, 249, 255, 0.3) 100%)',
                  boxShadow: '0 0 4px rgba(224, 242, 254, 0.2)'
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="h-[0.5px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-sky-200/20 to-transparent" />
            </div>

            {/* Line 2 */}
            <div 
              className="hypertext-line" 
              style={{ 
                fontFamily: "'Rajdhani', 'Orbitron', 'Exo 2', sans-serif",
                fontWeight: 300,
                letterSpacing: '0.15em'
              }}
            >
              {parseWords(currentSet.line2).map((part, idx) => (
                <ScrambleText
                  key={`${lineSet}-2-${idx}`}
                  text={part.text}
                  className={`hypertext-word ${part.type}`}
                  delay={idx * 30}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div 
      className="relative overflow-hidden w-full" 
      style={{ 
        background: 'rgba(0, 0, 0, 0.7)',
        border: 'none',
        outline: 'none',
        boxShadow: 'none'
      }}
    >
      {/* Spline 3D Background - HeroSection only */}
      {/* <BackgroundHero /> */}
      
      {/* Background world map */}
     {/* Background world map - OPTIMIZED */}
      <div aria-hidden className="absolute inset-0 -z-10 h-full">
        <motion.img
          src="/world_teal_8k.svg"
          alt=""
          className="w-full h-full object-cover pointer-events-none select-none opacity-40"
          style={{ 
            mixBlendMode: 'screen'
          }}
          initial={{ scale: 1.02 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_30%,transparent,rgba(0,0,0,0.7))]" />
      </div>
      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 py-10 sm:py-12 md:py-14 pb-10 sm:pb-12 md:pb-14">
        <div className="text-center w-full max-w-5xl lg:max-w-6xl mx-auto">


          {/* Rotating subheadline */}
          <FlipWords />

          {/* <div className="mt-4 sm:mt-5 md:mt-6">
            <CountDown />
          </div> */}

          {/* Hypertext Lines - Rotating every 10 seconds */}
          <motion.div 
            className="mt-2 sm:mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <HypertextLines />
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-3 sm:mt-4 md:mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <GradientRingButton size="lg" href="/#escrow-quickpay">Experience Undo</GradientRingButton>
              <GradientRingButton size="lg" href="/docs">Read Whitepaper</GradientRingButton>
              <TextArrowButton label="Watch Our trailer" onClick={() => setShowTrailer(true)} className="mt-1 sm:mt-0" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade - Reduced */}
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-14 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Trailer modal */}
      {showTrailer && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          style={{ zIndex: 99999 }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowTrailer(false); }}
          role="dialog" aria-modal="true" aria-label="Dendrites Trailer"
        >
          <div className="w-[90vw] max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 relative" style={{ zIndex: 100000 }}>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 text-white/80 hover:text-white text-sm px-2 py-1 rounded-md bg-white/10"
              style={{ zIndex: 100001 }}
              aria-label="Close trailer"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ouKS-UB9OfA?autoplay=1&mute=0&rel=0&modestbranding=1"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title="Dendrites Trailer"
            />
          </div>
        </div>
      )}

      {/* Local styles (headline) */}
      <style>{`
        .headline-gradient{
          background: linear-gradient(90deg, #FFFFFF 0%, #E0F2FE 35%, #F0F9FF 60%, #E8E8E8 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          filter: drop-shadow(0 1px 2px rgba(224, 242, 254, 0.1));
        }
        .headline-stroke{
          -webkit-text-stroke: 1px rgba(224, 242, 254, 0.12);
        }
        
        /* Hypertext Style - Scramble Effect with Page-Matched Aesthetics */
        .hypertext-line {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: clamp(0.3rem, 1.5vw, 0.85rem);
          font-family: 'Orbitron', 'Rajdhani', 'Exo 2', sans-serif;
          font-size: clamp(0.75rem, 2vw, 1.5rem);
          font-weight: 300;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0 1rem;
          min-height: 2rem;
        }
        
        .hypertext-word {
          position: relative;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.85);
          text-stroke: 1.5px rgba(255, 255, 255, 0.85);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 300;
        }
        
        .hypertext-word.separator {
          -webkit-text-stroke: 1.2px rgba(255, 255, 255, 0.5);
          text-stroke: 1.2px rgba(255, 255, 255, 0.5);
          opacity: 0.7;
          font-weight: 200;
        }
        
        /* Silver words - monochrome premium hollow with ice blue hint */
        .hypertext-word.silver {
          color: transparent;
          -webkit-text-stroke: 2px rgba(245, 245, 245, 0.9);
          text-stroke: 2px rgba(245, 245, 245, 0.9);
          background: transparent;
          font-weight: 300;
          filter: drop-shadow(0 0 1px rgba(224, 242, 254, 0.08));
        }
        
        /* Platinum words - monochrome premium hollow with subtle shimmer */
        .hypertext-word.platinum {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255, 255, 255, 1);
          text-stroke: 2px rgba(255, 255, 255, 1);
          background: transparent;
          font-weight: 300;
          filter: drop-shadow(0 0 1px rgba(240, 249, 255, 0.1));
        }
        
        /* Hover effects - subtle brightness only */
        .hypertext-word:hover {
          filter: brightness(1.2);
        }
        
        @media (max-width: 640px) {
          .hypertext-line {
            font-size: clamp(0.65rem, 3.2vw, 0.95rem);
            gap: clamp(0.25rem, 1.2vw, 0.45rem);
            font-weight: 300;
            letter-spacing: 0.1em;
          }
          .hypertext-word {
            -webkit-text-stroke: 1.3px rgba(255, 255, 255, 0.85);
            text-stroke: 1.3px rgba(255, 255, 255, 0.85);
          }
          .hypertext-word.separator {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
            text-stroke: 1px rgba(255, 255, 255, 0.5);
          }
          .hypertext-word.silver,
          .hypertext-word.platinum {
            -webkit-text-stroke: 1.6px rgba(255, 255, 255, 0.85);
            text-stroke: 1.6px rgba(255, 255, 255, 0.85);
          }
        }
        
        @media (max-width: 380px) {
          .hypertext-line {
            font-size: clamp(0.6rem, 3vw, 0.85rem);
            gap: clamp(0.2rem, 1vw, 0.4rem);
            font-weight: 300;
            letter-spacing: 0.09em;
          }
          .hypertext-word {
            -webkit-text-stroke: 1.2px rgba(255, 255, 255, 0.85);
            text-stroke: 1.2px rgba(255, 255, 255, 0.85);
          }
          .hypertext-word.silver,
          .hypertext-word.platinum {
            -webkit-text-stroke: 1.4px rgba(255, 255, 255, 0.85);
            text-stroke: 1.4px rgba(255, 255, 255, 0.85);
          }
        }
        
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        .animate-marquee { animation: marquee 25s linear infinite }
        html { scroll-behavior: smooth } body { overflow-x: hidden }
      `}</style>
    </div>
  );
}

/* Small Text + Arrow Button - Memoized */
const TextArrowButton = memo(function TextArrowButton({
  label = "Watch 45-sec trailer",
  onClick,
  href,
  className = "",
}: { label?: string; onClick?: () => void; href?: string; className?: string }) {
  return (
    <motion.a
      href={href}
      onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } }}
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.995 }}
      className={
        "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] " +
        "text-white/85 hover:text-white transition-colors select-none " +
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 " + className
      }
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <span className="absolute inset-0 rounded-full p-[1px] pointer-events-none" />
      <span className="absolute inset-[2px] rounded-full bg-black/60 backdrop-blur-[2px]" />
      <span className="relative z-10 inline-flex items-center gap-2">
        <span className="uppercase tracking-wide">{label}</span>
        <motion.svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
          className="translate-y-[0.5px]" whileHover={{ x: 2 }} transition={{ type: "tween", duration: 0.2 }}>
          <path d="M5 12h14" /><path d="M13 5l7 7-7 7" />
        </motion.svg>
      </span>
    </motion.a>
  );
});
