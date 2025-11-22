import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/RobotSpline.tsx
import { forwardRef, useRef, memo } from "react";
import Spline from "@splinetool/react-spline";
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
const ROBOT_SCENE = "https://prod.spline.design/pdP5ps90BImUxnN1/scene.splinecode";
const RobotSpline = memo(forwardRef(({ className = "" }, ref) => {
    const splineInstance = useRef(null);
    return (_jsxs("div", { ref: ref, className: `
          relative w-full overflow-hidden
          min-h-[420px]
          sm:min-h-[520px]
          md:min-h-[600px]
          lg:min-h-[720px]
          xl:min-h-[820px]
          ${className}
        `, style: {
            background: "radial-gradient(circle at center, rgba(0, 209, 255, 0.06) 0%, transparent 70%)",
        }, children: [_jsx("div", { className: "absolute inset-0", children: _jsx(Spline, { scene: ROBOT_SCENE, onLoad: (app) => {
                        splineInstance.current = app;
                        console.log("[RobotSpline] Spline loaded");
                    }, onError: (err) => {
                        console.error("[RobotSpline] Failed to load Spline scene", err);
                    }, style: {
                        width: "100%",
                        height: "100%",
                        display: "block",
                    } }) }), _jsx("div", { className: "pointer-events-none absolute inset-0", children: _jsx("div", { className: "\n              absolute top-1/2 left-1/2\n              -translate-x-1/2 -translate-y-1/2\n              w-[360px] h-[360px]\n              sm:w-[480px] sm:h-[480px]\n              md:w-[560px] md:h-[560px]\n              opacity-25\n            ", style: {
                        background: "radial-gradient(circle, rgba(0, 209, 255, 0.45) 0%, transparent 70%)",
                        filter: "blur(70px)",
                    } }) })] }));
}));
RobotSpline.displayName = "RobotSpline";
export default RobotSpline;
