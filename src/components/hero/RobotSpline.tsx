// src/components/RobotSpline.tsx
import React, { forwardRef, useRef, memo } from "react";
import Spline from "@splinetool/react-spline";

interface RobotSplineProps {
  className?: string;
}

/**
 * RobotSpline
 *
 * Large responsive block with a Spline scene.
 * Good for mid-page feature sections.
 *
 * Height strategy:
 * - Mobile:  min-h 420px
 * - Small tablet: min-h 520px
 * - Tablet: min-h 600px
 * - Desktop: min-h 720px+
 */
const ROBOT_SCENE =
  "https://prod.spline.design/pdP5ps90BImUxnN1/scene.splinecode";

const RobotSpline = memo(forwardRef<HTMLDivElement, RobotSplineProps>(
  ({ className = "" }, ref) => {
    const splineInstance = useRef<any>(null);

    return (
      <div
        ref={ref}
        className={`
          relative w-full overflow-hidden
          min-h-[420px]
          sm:min-h-[520px]
          md:min-h-[600px]
          lg:min-h-[720px]
          xl:min-h-[820px]
          ${className}
        `}
        style={{
          background:
            "radial-gradient(circle at center, rgba(0, 209, 255, 0.06) 0%, transparent 70%)",
        }}
      >
        {/* Spline canvas */}
        <div className="absolute inset-0">
          <Spline
            scene={ROBOT_SCENE}
            onLoad={(app) => {
              splineInstance.current = app;
              console.log("[RobotSpline] Spline loaded");
            }}
            onError={(err) => {
              console.error("[RobotSpline] Failed to load Spline scene", err);
            }}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
        </div>

        {/* Soft glow overlay */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="
              absolute top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              w-[360px] h-[360px]
              sm:w-[480px] sm:h-[480px]
              md:w-[560px] md:h-[560px]
              opacity-25
            "
            style={{
              background:
                "radial-gradient(circle, rgba(0, 209, 255, 0.45) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />
        </div>
      </div>
    );
  }
));

RobotSpline.displayName = "RobotSpline";

export default RobotSpline;
