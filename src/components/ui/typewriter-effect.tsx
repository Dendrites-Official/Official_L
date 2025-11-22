"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Elegant outlined style for hollow text
const tealOutline: React.CSSProperties = {
  color: "transparent",
  WebkitTextStroke: "1.15px #5eead4",
};

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  loopMs = 15000,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
  loopMs?: number;
}) => {
  const wordsArray = words.map((w) => ({ ...w, text: w.text.split("") }));
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const timerRef = useRef<number | null>(null);

  const run = async () => {
    await animate("span", { opacity: 0, display: "none", width: 0 }, { duration: 0 });
    await animate(
      "span",
      { display: "inline-block", opacity: 1, width: "fit-content" },
      { duration: 0.3, delay: stagger(0.1), ease: "easeInOut" }
    );
  };

  useEffect(() => {
    if (!isInView) return;
    run();
    timerRef.current = window.setInterval(run, loopMs) as unknown as number;
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isInView, loopMs]);

  return (
    <div
      className={cn(
        "font-chakra text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-3xl font-semibold",
        className
      )}
      style={{ whiteSpace: "nowrap" }}
    >
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, i) => (
          <div key={i} className="inline-block">
            {word.text.map((char, j) => (
              <motion.span
                key={`${i}-${j}`}
                initial={{ opacity: 0, display: "none", width: 0 }}
                className={cn("opacity-0 hidden", word.className)}
                style={tealOutline}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </div>
        ))}
      </motion.div>

      {/* cursor (teal bar) */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-teal-400", cursorClassName)}
      />
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  loopMs = 15000,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
  loopMs?: number;
}) => {
  const wordsArray = words.map((w) => ({ ...w, text: w.text.split("") }));
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setCycle((c) => c + 1), loopMs);
    return () => window.clearInterval(id);
  }, [loopMs]);

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        key={cycle}
        className="overflow-hidden pb-2"
        initial={{ width: "0%" }}
        animate={{ width: "fit-content" }}
        transition={{ duration: 2, ease: "linear", delay: 1 }}
      >
        <div
          className="Space_Grotesk text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-semibold"
          style={{ whiteSpace: "nowrap" }}
        >
          <div>
            {wordsArray.map((word, i) => (
              <div key={i} className="inline-block">
                {word.text.map((char, j) => (
                  <span key={`${i}-${j}`} className={cn(word.className)} style={tealOutline}>
                    {char}
                  </span>
                ))}
                &nbsp;
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-teal-400", cursorClassName)}
      />
    </div>
  );
};
