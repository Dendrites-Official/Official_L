import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type AsProp = keyof JSX.IntrinsicElements | React.ComponentType<any>;

type Size = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, string> = {
  sm: "text-sm px-4 py-2.5",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
  xl: "text-xl px-10 py-5",
};

export type GradientRingButtonProps = {
  as?: AsProp;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
};

/**
 * Project-wide button:
 * - Rounded, dark interior, gradient outline (conic) with subtle glow
 * - No fill-on-hover (stays dark/hollow), the ring lights up
 * - Click triggers a quick 360° ring spin (same feel as navbar)
 */
export function GradientRingButton({
  as: Comp = "button",
  href,
  onClick,
  children,
  size = "lg",
  fullWidth = false,
  className = "",
  leftIcon,
  rightIcon,
  disabled = false,
  style,
}: GradientRingButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [rotationKey, setRotationKey] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    if (!href && !onClick) return;

    // keep the visual spin even for links
    setRotationKey((k) => k + 1);
    setClicked(true);

    const DURATION = 300;
    window.setTimeout(() => {
      setClicked(false);
      if (href) {
        if (/^https?:\/\//i.test(href)) {
          window.open(href, "_blank", "noopener,noreferrer");
        } else {
          // Handle hash navigation (e.g., /#escrow-quickpay)
          if (href.includes('#')) {
            const [path, rawHash] = href.split('#');
            const hash = rawHash?.replace(/^#/, "") ?? "";
            const notifySection = () => {
              if (!hash) return;
              window.dispatchEvent(
                new CustomEvent('dndx-open-section', { detail: hash })
              );
            };
            if (path === '/' || path === '') {
              notifySection();
              const targetHash = `#${hash}`;
              if (hash) {
                window.history.replaceState(null, '', targetHash);
              }
              // Same page, just scroll to hash - use setTimeout to ensure element exists
              setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 50);
            } else {
              // Different page with hash
              notifySection();
              navigate(`${path}#${hash}`);
              setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 500);
            }
          } else {
            const path = href.startsWith("/") ? href : `/${href}`;
            navigate(path);
          }
        }
      } else {
        onClick?.();
      }
    }, DURATION);
  };

  const Inner: any = Comp;

  return (
    <div
      className={[
        "group relative inline-flex rounded-full overflow-hidden",
        fullWidth ? "w-full" : "w-auto",
        className,
      ].join(" ")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
    >
      {/* White border with premium glow effect */}
      <div className="absolute inset-0 rounded-full p-[2px] pointer-events-none">
        {/* Base white ring */}
        <motion.div
          key={`base-${rotationKey}`}
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={false}
          animate={{ opacity: hovered || clicked ? 1 : 0.5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            background: "rgba(255, 255, 255, 0.9)",
          }}
        />

        {/* Premium glow effect on hover */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-all duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            opacity: hovered || clicked ? 1 : 0,
            boxShadow: hovered || clicked 
              ? "0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2)"
              : "none",
          }}
        />

        {/* Outer glow blur */}
        <div
          className="absolute inset-[-4px] rounded-full blur-md pointer-events-none transition-opacity duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            opacity: hovered || clicked ? 0.8 : 0,
          }}
        />
      </div>

      {/* Clickable surface (dark/hollow) */}
  <Inner
        onClick={handleClick}
        disabled={disabled}
        className={[
          "relative z-10 m-[2px] rounded-full",
          "bg-black/95", // dark interior
          "text-white font-semibold", // white text, premium weight
          "backdrop-blur-sm select-none cursor-pointer",
          "transition-all duration-300",
          sizeMap[size],
          fullWidth ? "w-full justify-center" : "w-auto",
          "inline-flex items-center gap-2",
          disabled ? "opacity-50 pointer-events-none" : "",
        ].join(" ")}
        style={{
          textShadow: hovered || clicked ? "0 0 10px rgba(255, 255, 255, 0.3)" : "none",
          ...style,
        }}
      >
        {leftIcon && <span className="inline-flex">{leftIcon}</span>}
        <span className="uppercase tracking-wide">{children}</span>
        {rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </Inner>
    </div>
  );
}
