"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOpenPanel } from "@/components/experience/PainsShowcase";

type RowProps = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  location?: string;
  bgTint?: string;
  children: React.ReactNode;
};

export default function PortfolioHoverRow({
  id,
  title,
  summary,
  tags,
  location,
  // bgTint = "linear-gradient(180deg, rgba(8,10,16,0.72) 0%, rgba(8,10,16,0.94) 100%)",
  children,
}: RowProps) {
  const { openPanel, setOpenPanel } = useOpenPanel();
  const isOpen = openPanel === id;

  // Toggle on click
  const handleButtonClick = () => {
    if (isOpen) {
      setOpenPanel(null); // Close if already open
    } else {
      setOpenPanel(id); // Open this one
    }
  };

  return (
    <section
      id={id}
      className="w-full select-none"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Title/Summary Row - Click to toggle */}
      <div
        role="button"
        aria-expanded={isOpen}
        className="group relative cursor-pointer"
        onClick={handleButtonClick}
        style={{
          backfaceVisibility: "hidden",
          transform: "translate3d(0, 0, 0)"
        }}
      >
        <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-4 py-12 sm:py-14 md:py-16 px-5 sm:px-6 md:px-6 pr-14 sm:pr-16 md:pr-16">
          {/* Title - Premium mobile spacing */}
          <h3 className="col-span-12 md:col-span-3 text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold tracking-tight leading-tight transition-colors duration-300 group-hover:text-white/95 mb-3 sm:mb-4 md:mb-0">
            {title}
          </h3>
          
          {/* Summary - Better mobile readability */}
          <p className="col-span-12 md:col-span-6 text-sm sm:text-base md:text-base leading-relaxed md:leading-relaxed text-white/75 transition-colors duration-300 group-hover:text-white/85 mb-4 md:mb-0">
            {summary}
          </p>
          
          {/* Tags - Cleaner mobile layout */}
          <div className="col-span-12 md:col-span-3 flex flex-wrap md:flex-col items-start md:items-end gap-2 md:gap-1 text-[11px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.15em] font-medium">
            {tags.map((t) => (
              <span key={t} className="text-white/70 transition-colors duration-300 group-hover:text-white/90 bg-white/5 md:bg-transparent px-2 py-1 md:px-0 md:py-0 rounded md:rounded-none">
                {t}
              </span>
            ))}
            {location && (
              <div className="text-white/50 transition-colors duration-300 group-hover:text-white/75 w-full md:w-auto mt-2 md:mt-1">
                {location}
              </div>
            )}
          </div>

          {/* Down Arrow Indicator - Shows dropdown capability */}
          <div className="absolute right-5 sm:right-6 md:right-6 top-12 sm:top-14 md:top-16">
            <svg
              className={`w-5 h-5 sm:w-6 sm:h-6 text-white/60 transition-all duration-300 group-hover:text-white/90 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Hover line - More subtle on mobile */}
        <div
          className="pointer-events-none absolute left-0 right-0 bottom-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 20%, rgba(255,255,255,.3) 80%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>

      {/* Expandable Panel - Buttery smooth slide */}
      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
            }}
            transition={{ 
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ 
              overflow: "hidden",
              willChange: "height, opacity"
            }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ 
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.1,
              }}
              className="rounded-lg md:rounded-xl mx-2 sm:mx-3 md:mx-3 mb-6 sm:mb-6 md:mb-6"
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.03)",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden"
              }}
            >
              {/* Mobile Close Button - Only visible on mobile */}
              <div className="flex md:hidden justify-between items-center px-5 pt-4 pb-3 border-b border-white/10">
                <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wide">
                  {title}
                </h4>
                <button
                  onClick={() => setOpenPanel(null)}
                  aria-label="Close panel"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 transition-colors duration-200"
                >
                  <svg 
                    className="w-4 h-4 text-white/70" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="px-5 sm:px-6 md:px-6 py-6 sm:py-6 md:py-6">
                {children}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
