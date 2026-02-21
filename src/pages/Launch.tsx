import React, { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";

import BackgroundDnDx from "@/components/BackgroundDnDx";
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";

const isDev = import.meta.env.MODE === "development";

// Theme
const VERCEL_BLUE = "#0070F3";

// Redirect target
const TESTNETS_URL = "https://dendrites.xyz";

// Timing
const SETTLE_MS = 10000; // Spline/robot settle time (10 seconds)
const LOAD_MS = 10000; // blank premium loading time (10 seconds)

type Phase = "settle" | "loading" | "select";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/**
 * Measures your fixed header/nav height so our content doesn't render underneath it.
 * Falls back to 80px for a more reasonable spacing.
 */
function useHeaderOffset(fallback = 0) {
  const [offset, setOffset] = useState<number>(fallback);

  useEffect(() => {
    const pickHeader = (): HTMLElement | null => {
      // Try common containers (adjust if your app uses a specific selector)
      return (
        (document.querySelector("[data-navbar]") as HTMLElement | null) ||
        (document.querySelector("[data-site-header]") as HTMLElement | null) ||
        (document.querySelector("header") as HTMLElement | null) ||
        (document.querySelector("nav") as HTMLElement | null)
      );
    };

    const compute = () => {
      const el = pickHeader();
      if (!el) {
        setOffset(0);
        return;
      }
      const h = Math.ceil(el.getBoundingClientRect().height);
      // Minimal buffer - just the navbar height
      setOffset(clamp(h, 0, 50));
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [fallback]);

  return offset;
}

/* ---------------------------------------
   Phase 1: Preparing HUD (visible on robot)
   - placed bottom-left so it never sits under the navbar
---------------------------------------- */
function PreparingHUD({ remainingMs }: { remainingMs: number }) {
  const seconds = Math.max(0, Math.ceil(remainingMs / 1000));
  const progress = clamp(1 - remainingMs / SETTLE_MS, 0, 1);

  return (
    <div className="pointer-events-none fixed bottom-6 left-4 z-[80] w-[min(420px,92vw)] rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] tracking-[0.30em] uppercase text-white/55">
            Launch DNDX
          </div>
          <div className="mt-1 truncate text-sm font-semibold tracking-tight text-white">
            Preparing interface
          </div>
          <div className="mt-1 text-xs text-white/55">
            Spline settling • camera sync • {seconds}s
          </div>
        </div>

        <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
          Step 1/3
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-full border border-white/10 bg-white/5">
        <div
          className="h-[6px]"
          style={{
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, rgba(255,255,255,0.55), ${VERCEL_BLUE})`,
          }}
        />
      </div>

      <div className="mt-3 text-[11px] text-white/45">
        Tip: Tap <span className="text-white/70">TestNets</span> when ready.
      </div>
    </div>
  );
}

/* ---------------------------------------
   Phase 2: NEW Premium Loading (blank black)
   - BIG “DNDX” monoline stroke-draw
   - Vercel blue accents + scan beam
   - Looks clean (not generic)
---------------------------------------- */
function DndxVercelStrokeLoading({
  durationMs = LOAD_MS,
  onDone,
}: {
  durationMs?: number;
  onDone?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [t, setT] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = clamp(elapsed / durationMs, 0, 1);
      setT(next);

      if (elapsed >= durationMs) {
        onDone?.();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, onDone]);

  const pct = useMemo(() => Math.round(t * 100), [t]);

  const progressStyle: CSSProperties = {
    transform: `scaleX(${t})`,
    transformOrigin: "0% 50%",
    background: `linear-gradient(90deg, rgba(255,255,255,0.70), ${VERCEL_BLUE})`,
  };

  // Stroke animation values
  const dash = 2200;
  const dashOffset = dash * (1 - t);

  return (
    <div className="absolute inset-0 flex w-full items-center justify-center bg-black px-4">
      {/* very subtle vignette */}
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(70%_60%_at_50%_45%,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_45%,rgba(0,0,0,0.92)_100%)]" />

      <div className="relative w-full max-w-[920px]">
        <div className="mx-auto w-full max-w-[760px] text-center">
          <div className="text-[10px] tracking-[0.32em] uppercase text-white/55">
            DNDX Boot Sequence
          </div>
          <div className="mt-2 text-sm text-white/55">
            Verifying routes • sealing trust layer • {pct}%
          </div>

          <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-black px-5 py-10 sm:px-8 sm:py-12">
            {/* subtle grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

            <div className="relative">
              {/* Big DNDX stroke */}
              <motion.svg
                viewBox="0 0 1200 320"
                className="mx-auto block w-[min(720px,92vw)]"
                initial={false}
              >
                <defs>
                  <linearGradient id="dndxGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.80)" />
                    <stop offset="55%" stopColor="rgba(255,255,255,0.25)" />
                    <stop offset="100%" stopColor={VERCEL_BLUE} />
                  </linearGradient>
                  <filter id="dndxGlow">
                    <feGaussianBlur stdDeviation="2.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* D (left) - monoline outline-ish */}
                <motion.path
                  d="M85 70 L85 250
                     M85 70 C220 70 260 110 260 160 C260 210 220 250 85 250"
                  fill="none"
                  stroke="url(#dndxGrad)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#dndxGlow)"
                  strokeDasharray={dash}
                  strokeDashoffset={dashOffset}
                  transition={{ duration: 0 }}
                />

                {/* N */}
                <motion.path
                  d="M365 250 L365 70 L510 250 L510 70"
                  fill="none"
                  stroke="url(#dndxGrad)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#dndxGlow)"
                  strokeDasharray={dash}
                  strokeDashoffset={dashOffset}
                  transition={{ duration: 0 }}
                />

                {/* D (right) */}
                <motion.path
                  d="M615 70 L615 250
                     M615 70 C750 70 790 110 790 160 C790 210 750 250 615 250"
                  fill="none"
                  stroke="url(#dndxGrad)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#dndxGlow)"
                  strokeDasharray={dash}
                  strokeDashoffset={dashOffset}
                  transition={{ duration: 0 }}
                />

                {/* X */}
                <motion.path
                  d="M920 70 L1080 250"
                  fill="none"
                  stroke="url(#dndxGrad)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#dndxGlow)"
                  strokeDasharray={dash}
                  strokeDashoffset={dashOffset}
                  transition={{ duration: 0 }}
                />
                <motion.path
                  d="M1080 70 L920 250"
                  fill="none"
                  stroke="url(#dndxGrad)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#dndxGlow)"
                  strokeDasharray={dash}
                  strokeDashoffset={dashOffset}
                  transition={{ duration: 0 }}
                />

                {/* Nodes (small) */}
                {[
                  { cx: 85, cy: 70 },
                  { cx: 85, cy: 250 },
                  { cx: 260, cy: 160 },
                  { cx: 365, cy: 70 },
                  { cx: 510, cy: 250 },
                  { cx: 615, cy: 70 },
                  { cx: 790, cy: 160 },
                  { cx: 920, cy: 70 },
                  { cx: 1080, cy: 250 },
                ].map((p, i) => (
                  <g key={i} opacity={0.95}>
                    <circle
                      cx={p.cx}
                      cy={p.cy}
                      r="10"
                      fill="rgba(255,255,255,0.10)"
                      stroke="rgba(255,255,255,0.20)"
                    />
                    <motion.circle
                      cx={p.cx}
                      cy={p.cy}
                      r="5"
                      fill={VERCEL_BLUE}
                      animate={
                        reduceMotion
                          ? undefined
                          : { opacity: [0.25, 1, 0.25], scale: [1, 1.18, 1] }
                      }
                      transition={{ duration: 1.25, repeat: Infinity, delay: i * 0.06 }}
                    />
                  </g>
                ))}
              </motion.svg>

              {/* Scan beam over the word */}
              {!reduceMotion && (
                <motion.div
                  className="pointer-events-none absolute inset-x-0 top-0 h-full"
                  animate={{ x: ["-35%", "135%"] }}
                  transition={{ duration: 1.15, ease: "linear", repeat: Infinity }}
                  style={{
                    width: "40%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(0,112,243,0.18), transparent)",
                    mixBlendMode: "screen",
                  }}
                />
              )}
            </div>

            {/* Progress */}
            <div className="relative mt-9">
              <div className="flex items-center justify-between text-[11px] text-white/45">
                <span className="tracking-[0.22em] uppercase">Step 2/3</span>
                <span className="tabular-nums">{pct}%</span>
              </div>

              <div className="mt-3 overflow-hidden rounded-full border border-white/10 bg-white/5">
                <div className="h-[6px] w-full" style={progressStyle} />
              </div>

              <div className="mt-4 text-xs text-white/45">
                <span style={{ color: VERCEL_BLUE }}>●</span> DNDX signal locked •
                preparing network selector
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------
   Modal (Portal + high z-index) — FIXED
---------------------------------------- */
function PremiumDialog({
  open,
  title,
  message,
  primaryLabel,
  onClose,
  onPrimary,
  isRedirecting,
}: {
  open: boolean;
  title: string;
  message: string;
  primaryLabel: string;
  onClose: () => void;
  onPrimary: () => void;
  isRedirecting: boolean;
}) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-[3px]"
            onClick={() => {
              if (!isRedirecting) onClose();
            }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/15 bg-black text-white shadow-2xl"
            initial={{ y: 12, scale: 0.985, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.99, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-[2px] w-full"
              style={{
                background: `linear-gradient(90deg, ${VERCEL_BLUE}, rgba(255,255,255,0.0))`,
              }}
            />

            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg sm:text-xl font-semibold tracking-tight">
                    {title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/70">
                    {message}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!isRedirecting) onClose();
                  }}
                  disabled={isRedirecting}
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/85 hover:border-white/30 disabled:opacity-50"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!isRedirecting) onClose();
                  }}
                  disabled={isRedirecting}
                  className="w-full sm:w-auto rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white/80 hover:border-white/30 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={onPrimary}
                  disabled={isRedirecting}
                  className="w-full sm:w-auto rounded-xl border border-white/20 bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-white/90 disabled:opacity-70"
                >
                  {isRedirecting ? "Redirecting…" : primaryLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ---------------------------------------
   Premium Buttons
   - MainNets disabled
   - TestNets opens dialog only
---------------------------------------- */
function PremiumNetworkButton({
  title,
  subtitle,
  badge,
  disabled,
  onClick,
}: {
  title: string;
  subtitle: string;
  badge: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const reduceMotion = useReducedMotion();

  if (disabled) {
    return (
      <div className="relative rounded-3xl p-[1px] bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.06))]">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick?.(e);
          }}
          className="w-full cursor-pointer rounded-3xl border border-white/10 bg-black px-6 py-7 text-left text-white/55 sm:px-8 hover:border-white/15 transition-colors"
        >
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="text-[clamp(22px,4.6vw,34px)] font-semibold tracking-tight text-white/60">
                {title}
              </div>
              <div className="mt-1 text-sm text-white/35">{subtitle}</div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
              {badge}
            </div>
          </div>
          <div className="mt-6 h-[1px] w-full bg-white/10" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl p-[1px] bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(0,112,243,0.24),rgba(255,255,255,0.10))]">
      <motion.button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick?.(e);
        }}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        whileTap={{ scale: 0.985 }}
        className="group relative w-full overflow-hidden rounded-3xl bg-black px-6 py-7 text-left text-white focus:outline-none focus:ring-2 focus:ring-white/25 sm:px-8"
      >
        {/* hover sheen */}
        <span
          className="pointer-events-none absolute -inset-y-16 -inset-x-24 rotate-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), rgba(0,112,243,0.16), transparent)",
          }}
        />
        <span className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />

        <div className="relative flex items-start justify-between gap-5">
          <div>
            <div className="text-[clamp(22px,4.6vw,34px)] font-semibold tracking-tight">
              {title}
            </div>
            <div className="mt-1 text-sm text-white/60">{subtitle}</div>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
              {badge}
            </div>

            <motion.div
              className="h-2 w-2 rounded-full"
              style={{ background: VERCEL_BLUE }}
              animate={
                reduceMotion
                  ? undefined
                  : { opacity: [0.25, 1, 0.25], scale: [0.95, 1.1, 0.95] }
              }
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </div>
        </div>

        <div className="relative mt-6 h-[1px] w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full w-1/2"
            style={{
              background: `linear-gradient(90deg, transparent, ${VERCEL_BLUE}, transparent)`,
            }}
            initial={{ x: "-60%" }}
            animate={reduceMotion ? { x: "-60%" } : { x: ["-60%", "160%"] }}
            transition={{ duration: 1.25, ease: "linear", repeat: Infinity }}
          />
        </div>
      </motion.button>
    </div>
  );
}

/* ---------------------------------------
   Page
---------------------------------------- */
export default function LaunchDNDX() {
  const reduceMotion = useReducedMotion();
  const headerOffset = useHeaderOffset(80);

  // Replay sequence even if already on /launch (dispatch window event from navbar)
  const [runId, setRunId] = useState(() => Date.now());
  const [phase, setPhase] = useState<Phase>("settle");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'mainnets' | 'testnets'>('testnets');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [settleRemainingMs, setSettleRemainingMs] = useState(SETTLE_MS);
  const redirectTimerRef = useRef<number | null>(null);

  const restart = () => {
    setRunId(Date.now());
    setPhase("settle");
    setDialogOpen(false);
    setDialogType('testnets');
    setIsRedirecting(false);
    setSettleRemainingMs(SETTLE_MS);
  };

  useEffect(() => {
    const onLaunch = () => restart();
    window.addEventListener("dndx:launch", onLaunch);
    return () => window.removeEventListener("dndx:launch", onLaunch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Phase 1 countdown
  useEffect(() => {
    if (isDev) console.log("🚀 LaunchDNDX run:", runId);
    if (phase !== "settle") return;

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const rem = Math.max(0, SETTLE_MS - elapsed);
      setSettleRemainingMs(rem);

      if (elapsed >= SETTLE_MS) {
        cancelAnimationFrame(raf);
        setPhase("loading");
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, runId]);

  const doRedirectTestnets = () => {
    setIsRedirecting(true);
    if (redirectTimerRef.current) window.clearTimeout(redirectTimerRef.current);

    redirectTimerRef.current = window.setTimeout(() => {
      // Open in new tab
      window.open(TESTNETS_URL, '_blank', 'noopener,noreferrer');
      setIsRedirecting(false);
      setDialogOpen(false);
    }, reduceMotion ? 0 : 450);
  };

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) window.clearTimeout(redirectTimerRef.current);
    };
  }, []);

  // Common page padding to avoid rendering under your fixed navbar/ticker
  const phaseWrapStyle: React.CSSProperties = {
    paddingTop: headerOffset,
    paddingBottom: 24,
  };

  // Loading phase should be full screen with no padding
  const loadingWrapStyle: React.CSSProperties = {
    paddingTop: 0,
    paddingBottom: 0,
  };

  return (
    <>
      {/* Phase 1: Robot visible + preparing HUD */}
      {phase === "settle" && (
        <div
          key={`settle-${runId}`}
          className="relative min-h-[100svh] w-full bg-black"
          style={phaseWrapStyle}
        >
          <BackgroundDnDx />
          <MusicPlayer />
          <PreparingHUD remainingMs={settleRemainingMs} />
        </div>
      )}

      {/* Phase 2: Blank premium loading (no robot/background) */}
      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <motion.div
            key={`loading-${runId}`}
            className="relative min-h-[100svh] w-full bg-black"
            style={loadingWrapStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.22 }}
          >
            <MusicPlayer />
            <DndxVercelStrokeLoading
              durationMs={LOAD_MS}
              onDone={() => setPhase("select")}
            />
          </motion.div>
        )}

        {/* Phase 3: Premium network buttons */}
        {phase === "select" && (
          <motion.div
            key={`select-${runId}`}
            className="relative min-h-[100svh] w-full bg-black"
            style={phaseWrapStyle}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.22 }}
          >
            <MusicPlayer />

            <div className="mx-auto flex min-h-[calc(100svh-140px)] w-full max-w-4xl items-center justify-center px-4">
              <div className="w-full">
                <div className="mb-7 text-center">
                  <div className="text-[clamp(18px,3.6vw,22px)] font-semibold tracking-tight text-white">
                    Choose a network
                  </div>
                  <div className="mt-1 text-sm text-white/55">
                    MainNets are coming soon • TestNets are live
                  </div>
                </div>

                <div className="grid gap-4">
                  <PremiumNetworkButton
                    title="MainNets"
                    subtitle="Token + liquidity + main claim"
                    badge="Coming Soon"
                    disabled
                    onClick={() => {
                      setDialogType('mainnets');
                      setIsRedirecting(false);
                      setDialogOpen(true);
                    }}
                  />

                  <PremiumNetworkButton
                    title="TestNets"
                    subtitle="Live quests + activity"
                    badge="Live"
                    onClick={() => {
                      setDialogType('testnets');
                      setIsRedirecting(false);
                      setDialogOpen(true);
                    }}
                  />
                </div>
              </div>
            </div>

            <PremiumDialog
              open={dialogOpen}
              title={dialogType === 'mainnets' ? 'MainNets — Coming Soon' : 'TestNets — Live'}
              message={
                dialogType === 'mainnets'
                  ? 'MainNets are not live yet. You can still visit dendrites.xyz to learn more and stay updated.'
                  : 'TestNets are live! Continue to dendrites.xyz to access them and start exploring.'
              }
              primaryLabel={dialogType === 'mainnets' ? 'Visit dendrites.xyz' : 'Continue to TestNets'}
              onClose={() => {
                if (!isRedirecting) setDialogOpen(false);
              }}
              onPrimary={doRedirectTestnets}
              isRedirecting={isRedirecting}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-b from-black via-slate-950 to-slate-900 py-12 sm:py-16 md:py-20">
        <Footer />
      </div>
    </>
  );
}
