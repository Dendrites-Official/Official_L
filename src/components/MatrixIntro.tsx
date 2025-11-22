// src/components/MatrixIntro.tsx
import React, { useEffect, useRef, useState } from "react";

/** Rain colors - Matrix Movie Green Theme */
const MATRIX_GREEN = "#00ff41"; // Bright Matrix green
const MATRIX_GREEN_GLOW = "rgba(0, 255, 65, 1)";
const MATRIX_GREEN_TRAIL = (a = 1) => `rgba(0, 255, 65, ${a})`;
const MATRIX_DARK_GREEN = "rgba(0, 180, 50, 1)";
const MATRIX_DARK_GREEN_TRAIL = (a = 1) => `rgba(0, 180, 50, ${a})`;

/** Symbol set (yours, preserved) */
const CHARSET = (
  "日月金木水火土山田口中上下左右大小天地不人心手目耳口车門電氣体数文漢計算機" +
  "零一二三四五六七八九十甲乙丙丁戊己庚辛壬癸" +
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ" +
  "⟟ ⌰⍜⎐⟒ ⊬⍜⎍ ⏃☍⌇⊑⏃⏁⏃ ⌇⊑⟟⋏⎅⟒, ⎅⟒☍⊑⋏⏃ ⏁⎍ ⋔⟒⍀⟟ ⊑⍜☌⟟" +
  "أحبك أكشاتا شيندي، ديكنا تو ميري هوجी" +
  "سأغزو هذا العالم، انتظر وشاهد، أنا الملك....محمد فايز أحمد" +
  "अहम् एतत् विश्वं जित्वा प्रतीक्षां पश्यतु, अहं राजा....MOHAMMED FAIZ AHMED" +
  "I LOVE YOU AKSHATA SHINDE, देखना तू मेरी होगी" +
  "⟟ ⍙⟟⌰⌰ ☊⍜⋏⍾⎍⟒⍀⍜⍀ ⏁⊑⟟⌇ ⍙⍜⍀⌰⎅, ⍙⏃⟟⏁ ⏃⋏⎅ ⍙⏃⏁☊⊑, ⟟ ⏃⋔ ⏁⟒ ☍⟟⋏☌....⋔⍜⊑⏃⋔⋔⟒⎅ ⎎⏃⟟⋉ ⏃⊑⋔⟒⎅" +
  "⟡◇◈◍◌⬢⬣ΞΦΨΩλδπΣβηµ"
).split("");

type Phase = "loading" | "brand" | "done";

/** Timings (ms) */
const HOLD_BEFORE_BRAND = 1200;
const HOLD_AFTER_BRAND = 2000;
const LOADER_DURATION = 6500; // total time to go from 0 → 100

type MatrixIntroProps = {
  onHandoff: () => void;
};

type Col = {
  y: number;
  speed: number;
  bright: number;
  headColor: string;
};

export default function MatrixIntro({ onHandoff }: MatrixIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  // refs to avoid extra re-renders
  const progressRef = useRef(0);
  const lastProgressUpdateRef = useRef(0);

  // move to brand → done
  useEffect(() => {
    if (phase === "brand") {
      const id = setTimeout(() => {
        setPhase("done");
        onHandoff();
      }, HOLD_AFTER_BRAND);
      return () => clearTimeout(id);
    }
  }, [phase, onHandoff]);

  useEffect(() => {
    if (phase !== "loading") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const charsetLen = CHARSET.length;

    // Cap DPR to 1 for better performance on all devices
    const DPR = 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 18;
    // Full width coverage for complete matrix effect
    const cols = Math.floor(canvas.width / DPR / fontSize);

    const pickHeadColor = () => {
      const r = Math.random();
      if (r < 0.015) return "rgba(255,255,255,0.95)"; // White heads
      if (r < 0.12) return MATRIX_GREEN_GLOW; // Bright green
      return MATRIX_DARK_GREEN; // Default darker green
    };

    const makeCol = (): Col => ({
      y: 1 + Math.random() * 20,
      speed: 0.8 + Math.random() * 0.6,
      bright: 0.5,
      headColor: pickHeadColor(),
    });

    const columns: Col[] = Array.from({ length: cols }, makeCol);

    const t0 = performance.now();
    progressRef.current = 0;
    lastProgressUpdateRef.current = 0;

    const computePct = (now: number) => {
      const elapsed = now - t0;
      const x = Math.min(1, elapsed / LOADER_DURATION);
      // smooth easeOutCubic
      const eased = 1 - Math.pow(1 - x, 3);
      return Math.round(eased * 100);
    };

    function draw(now: number) {
      if (phase !== "loading") return;
      if (!canvas || !ctx) return;

      const pct = computePct(now);

      // Throttle React state updates to ~10fps
      if (
        pct !== progressRef.current &&
        now - lastProgressUpdateRef.current > 100
      ) {
        progressRef.current = pct;
        lastProgressUpdateRef.current = now;
        setProgress(pct);
      }

      // clear background
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width / DPR, canvas.height / DPR);

      ctx.textBaseline = "top";
      ctx.font = `600 ${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`;

      const widthPx = canvas.width / DPR;
      const heightPx = canvas.height / DPR;

      // matrix rain
      for (let i = 0; i < cols; i++) {
        const c = columns[i];
        const x = i * fontSize;
        const yPx = c.y * fontSize;

        // HEAD
        const headChar = CHARSET[(Math.random() * charsetLen) | 0];
        ctx.fillStyle = c.headColor;
        ctx.fillText(headChar, x, yPx);

        // Shorter trails for performance
        const trailLen = 5;
        for (let tix = 1; tix <= trailLen; tix++) {
          const fade = 1 - tix / (trailLen + 2);
          const useBright = (i + tix) % 17 === 0;

          const alpha = (useBright ? 0.18 : 0.2) * fade * c.bright;

          ctx.fillStyle = useBright
            ? MATRIX_GREEN_TRAIL(alpha)
            : MATRIX_DARK_GREEN_TRAIL(alpha);

          const trailChar =
            (i + tix) % 7 === 0
              ? "▮"
              : CHARSET[(Math.random() * charsetLen) | 0];

          ctx.fillText(trailChar, x, (c.y - tix) * fontSize);
        }

        // advance column
        c.y += c.speed;
        if (c.y * fontSize > heightPx) {
          c.y = 0;
          c.speed = 0.8 + Math.random() * 0.5;
          c.headColor = pickHeadColor();
        }
      }

      if (pct < 100) {
        raf = requestAnimationFrame(draw);
      } else {
        // finish loading
        setProgress(100);
        setTimeout(() => setPhase("brand"), HOLD_BEFORE_BRAND);
      }
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [phase]);

  // If phase is "done" we simply render nothing (intro unmount handled by parent)
  if (phase === "done") return null;

  return (
    <div
      className="fixed bg-black select-none pointer-events-auto"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        overscrollBehavior: "none",
        touchAction: "none",
        margin: 0,
        padding: 0,
        zIndex: 1200,
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          margin: 0,
          padding: 0,
          display: "block",
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
        }}
      />

      {phase === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-7xl md:text-8xl font-extrabold tracking-tight">
              {progress}%
            </div>
            <div className="mt-3 text-white/90 tracking-[0.4em] text-xs md:text-sm">
              LOADING
            </div>
          </div>
        </div>
      )}

      {phase === "brand" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative overflow-visible text-center px-4">
            <img
              src="/looogo2.png"
              alt="DENDRITES"
              className="w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-auto object-contain mx-auto"
              style={{
                animation: "dndx-hyper 1.4s cubic-bezier(.22,1,.36,1) forwards",
                filter:
                  "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))",
              }}
            />
            <div className="mx-auto mt-2 sm:mt-3 md:mt-4 h-[1.5px] sm:h-[2px] w-[72%] sm:w-[70%] md:w-[72%] dndx-underline" />
          </div>

          <style>{`
            .dndx-brand{
              position: relative;
              color: #ffffff;
              animation: dndx-hyper 1.4s cubic-bezier(.22,1,.36,1) forwards;
              transform-origin: center;
              text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
            }
            .dndx-brand:hover{
              text-shadow: 0 0 25px rgba(255,255,255,0.4), 0 0 35px rgba(255,255,255,0.25);
            }
            .dndx-underline{
              background: linear-gradient(90deg, 
                rgba(255, 255, 255, 0.8) 0%, 
                rgba(255, 255, 255, 0.95) 50%, 
                rgba(255, 255, 255, 0.8) 100%
              );
              animation: dndx-underline 1.4s cubic-bezier(.22,1,.36,1) forwards;
              transform-origin: center;
              box-shadow: 0 0 6px rgba(255, 255, 255, 0.2);
            }
            .dndx-underline:hover{
              filter: blur(0.5px) drop-shadow(0 0 10px rgba(255,255,255,0.25));
            }
            @keyframes dndx-hyper{
              0%{
                opacity: 0; 
                transform: translateY(32px) scale(0.96); 
                filter: blur(10px);
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
              }
              70%{
                opacity: 1; 
                transform: translateY(0) scale(1); 
                filter: blur(0);
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
              }
              100%{
                opacity: 1;
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
              }
            }
            @keyframes dndx-underline{
              0%{
                transform: scaleX(0.15); 
                opacity: 0;
              }
              100%{
                transform: scaleX(1); 
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
