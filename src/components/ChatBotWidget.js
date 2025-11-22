import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/ChatBotWidget.tsx
import { useState, useCallback, useEffect, useMemo, useRef, } from "react";
import { createPortal } from "react-dom";
import Spline from "@splinetool/react-spline";
import { getAIResponse } from "@/lib/aiChatbot";
import { useIsMobile } from "@/hooks/useIsMobile";
const ASSISTANT_NAME = "MOMO";
const TOOLTIP_TEXT_TOP = "Hi 👋";
const TOOLTIP_TEXT_BOTTOM = `I'm ${ASSISTANT_NAME}. Need help? Chat with me!`;
const ROBOT_TARGETS = new Set(["DNDXBot", "DendriteBot"]);
const ROBOT_SCALE = 1.18;
const ROBOT_NUDGE_X_PX = 14;
const ROBOT_NUDGE_Y_PX = 3;
async function makeBotReply(q) {
    // Use AI for natural, human-like responses
    return await getAIResponse(q);
}
function WidgetContent() {
    const [open, setOpen] = useState(false);
    const [failed, setFailed] = useState(false);
    const [msgs, setMsgs] = useState([
        {
            role: "bot",
            text: `Hi! I'm ${ASSISTANT_NAME} — your DNDX assistant. I can help you with information about our whitepaper, tokenomics, payment solutions, roadmap, technical details, and more. What would you like to know?`,
        },
    ]);
    const [text, setText] = useState("");
    const [tooltipVisible, setTooltipVisible] = useState(true);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const isMobile = useIsMobile(1024);
    const closeCountRef = useRef(0);
    const tooltipTimerRef = useRef(null);
    const bubbleRef = useRef(null);
    const splineAppRef = useRef(null);
    const messagesEndRef = useRef(null);
    const touchHandledRef = useRef(false); // Track if touch was handled
    const userTurns = msgs.filter((m) => m.role === "user").length;
    const limitReached = false; // No limit - MOMO can answer unlimited questions
    // Auto scroll messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [msgs]);
    // Cleanup tooltip timer
    useEffect(() => {
        return () => {
            if (tooltipTimerRef.current)
                window.clearTimeout(tooltipTimerRef.current);
        };
    }, []);
    // ESC key closes panel
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape" && open)
                setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);
    // Hide tooltip when panel is open
    useEffect(() => {
        if (open)
            setTooltipVisible(false);
    }, [open]);
    // Mouse tracking for robot tilt (desktop mainly)
    useEffect(() => {
        if (isMobile)
            return;
        const handleMouseMove = (e) => {
            if (!bubbleRef.current)
                return;
            const bubble = bubbleRef.current.getBoundingClientRect();
            const centerX = bubble.left + bubble.width / 2;
            const centerY = bubble.top + bubble.height / 2;
            const relX = (e.clientX - centerX) / (bubble.width / 2);
            const relY = (e.clientY - centerY) / (bubble.height / 2);
            const maxTilt = 0.3;
            const x = Math.max(-1, Math.min(1, relX)) * maxTilt;
            const y = Math.max(-1, Math.min(1, relY)) * maxTilt;
            setMousePos({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isMobile]);
    const scheduleTooltip = useCallback((ms) => {
        if (tooltipTimerRef.current)
            window.clearTimeout(tooltipTimerRef.current);
        tooltipTimerRef.current = window.setTimeout(() => {
            setTooltipVisible(true);
            tooltipTimerRef.current = null;
        }, ms);
    }, []);
    const handleCloseTooltip = useCallback(() => {
        setTooltipVisible(false);
        closeCountRef.current += 1;
        // first close → show again after 1 min, later → after 5 mins
        scheduleTooltip(closeCountRef.current === 1 ? 60000 : 300000);
    }, [scheduleTooltip]);
    const showSplineRobot = !isMobile;
    const onSplineLoad = useCallback((app) => {
        splineAppRef.current = app;
    }, []);
    const handleSceneMouseDown = useCallback((e) => {
        if (!showSplineRobot)
            return;
        if (e?.target?.name && ROBOT_TARGETS.has(e.target.name)) {
            setOpen(true);
        }
    }, [showSplineRobot]);
    // Simplified bubble click handler - no debug logs
    const handleBubbleClick = useCallback(() => {
        setOpen((v) => !v);
    }, []);
    const send = useCallback(async () => {
        const q = text.trim();
        if (!q || limitReached)
            return;
        const next = [...msgs, { role: "user", text: q }];
        setMsgs(next);
        setText("");
        // Show typing indicator
        setMsgs([...next, { role: "bot", text: "..." }]);
        // Get AI response
        const reply = await makeBotReply(q);
        setMsgs([...next, { role: "bot", text: reply }]);
    }, [text, msgs, limitReached]);
    return (_jsxs(_Fragment, { children: [open && (_jsxs("div", { className: "chatbot-panel fixed rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden shadow-xl", children: [_jsxs("div", { className: "flex items-center justify-between px-4 sm:px-5 py-4 border-b border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "relative h-3 w-3 rounded-full border-2 border-white bg-transparent", children: _jsx("div", { className: "absolute inset-[-2px] rounded-full border border-white/30 animate-pulse" }) }), _jsxs("span", { className: "text-white font-medium text-base", children: [ASSISTANT_NAME, " \u2022 Support"] })] }), _jsx("button", { onClick: () => setOpen(false), className: "min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg border border-white/30 \n                         text-white hover:text-white hover:border-white hover:bg-white/10\n                         transition-all duration-200 text-xl leading-none", "aria-label": "Close chat", children: "\u00D7" })] }), _jsxs("div", { className: "px-4 sm:px-5 py-4 space-y-4 overflow-y-auto chatbot-messages", style: { maxHeight: "min(320px, 40vh)" }, children: [msgs.map((m, i) => (_jsx("div", { className: `flex ${m.role === "user" ? "justify-end" : "justify-start"}`, children: _jsx("div", { className: `max-w-[85%] px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed
                    ${m.role === "user"
                                        ? "bg-gradient-to-br from-white/12 to-white/8 text-white/90 rounded-br-md border border-white/5"
                                        : "bg-black/60 border border-white/10 text-white/85 rounded-bl-md backdrop-blur-sm"}`, children: m.text }) }, i))), _jsx("div", { ref: messagesEndRef })] }), _jsx("div", { className: "px-4 pb-4 pt-3", children: _jsxs("div", { className: `flex items-center rounded-xl border transition-colors duration-200
              ${limitReached
                                ? "border-white/15 opacity-60 bg-black/30"
                                : "border-white/10 bg-black/50 hover:border-white/20 focus-within:border-white/30"}`, style: { minHeight: "56px" }, children: [_jsx("input", { className: "flex-1 bg-transparent px-3 sm:px-4 py-3 text-white \n                           placeholder:text-white/40 outline-none", style: { minHeight: "48px", fontSize: 16 }, placeholder: "Ask me anything about DNDX...", value: text, onChange: (e) => setText(e.target.value), onKeyDown: (e) => {
                                        if (e.key === "Enter" && !limitReached)
                                            send();
                                    }, disabled: limitReached }), _jsx("button", { className: "flex-shrink-0 m-2 px-4 sm:px-5 py-2.5 rounded-lg \n                           border-2 border-white bg-transparent\n                           text-white font-semibold \n                           disabled:opacity-50 disabled:border-white/30\n                           transition-all duration-200\n                           hover:bg-white hover:text-black\n                           active:scale-95", style: { minHeight: 44, minWidth: 64, fontSize: 15 }, onClick: send, disabled: limitReached, children: "Send" })] }) })] })), _jsxs("div", { ref: bubbleRef, className: "chatbot-bubble-container fixed", style: {
                    right: "max(16px, env(safe-area-inset-right))",
                    bottom: "max(16px, env(safe-area-inset-bottom))",
                }, children: [tooltipVisible && !open && (_jsx("div", { className: "absolute -top-3 right-0 -translate-y-full", style: { pointerEvents: "none", zIndex: 1 }, children: _jsxs("div", { className: "relative rounded-2xl", style: {
                                width: "clamp(220px, 70vw, 360px)",
                                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))",
                                // ✅ this whole card shouldn't block scroll
                                pointerEvents: "none",
                            }, children: [_jsxs("div", { className: "relative z-10 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5\n                    bg-black/80 backdrop-blur-xl backdrop-saturate-150\n                    border-2 border-white/60", style: {
                                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
                                        // ✅ the content area also shouldn't block scroll
                                        pointerEvents: "none",
                                    }, children: [_jsx("button", { onClick: handleCloseTooltip, className: "absolute top-2.5 right-2.5 inline-flex h-6 w-6 items-center justify-center rounded-md\n                       text-white/80 hover:text-white hover:bg-white/10 transition", style: { pointerEvents: "auto" }, "aria-label": "Close tooltip", children: "\u00D7" }), _jsxs("div", { className: "pr-7", style: { userSelect: "none" }, children: [_jsx("div", { className: "font-semibold text-white leading-tight", style: {
                                                        fontSize: "clamp(12px, 2.6vw, 16.5px)",
                                                    }, children: TOOLTIP_TEXT_TOP }), _jsx("div", { className: "text-white/90 mt-0.5", style: {
                                                        fontSize: "clamp(12px, 2.6vw, 16.5px)",
                                                        lineHeight: 1.25,
                                                    }, children: TOOLTIP_TEXT_BOTTOM })] })] }), _jsx("span", { className: "absolute -bottom-[7px] right-[22px] h-[14px] w-[14px] rotate-45 rounded-[3px] z-10", style: {
                                        background: "rgba(0, 0, 0, 0.8)",
                                        backdropFilter: "blur(22px) saturate(1.5)",
                                        border: "2px solid rgba(255, 255, 255, 0.6)",
                                        boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
                                        // ✅ little arrow also shouldn't block scroll
                                        pointerEvents: "none",
                                    } })] }) })), _jsxs("button", { onClick: (e) => {
                            // Only handle click if touch wasn't already handled
                            if (!touchHandledRef.current) {
                                handleBubbleClick();
                            }
                            // Reset the flag after a short delay
                            setTimeout(() => {
                                touchHandledRef.current = false;
                            }, 300);
                        }, onTouchEnd: (e) => {
                            e.preventDefault(); // Prevent the click event from firing
                            e.stopPropagation();
                            touchHandledRef.current = true; // Mark touch as handled
                            handleBubbleClick();
                        }, "aria-label": open ? "Close support chat" : "Open support chat", className: "group relative h-[99px] w-[99px] rounded-full overflow-hidden\n                     ring-2 ring-white/30 bg-black\n                     transition-all duration-300 ease-out\n                     hover:scale-105 hover:ring-white\n                     active:scale-95 active:ring-4 active:ring-cyan-400", style: {
                            WebkitTapHighlightColor: "rgba(6, 182, 212, 0.3)",
                            cursor: "pointer",
                            touchAction: "manipulation",
                            userSelect: "none",
                        }, children: [_jsx("div", { className: "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none", children: _jsx("div", { className: "absolute inset-0 rounded-full border-2 border-white/50 animate-ping", style: { animationDuration: "2s" } }) }), showSplineRobot && !failed && (_jsx("div", { className: "absolute inset-0 rounded-full", style: { pointerEvents: "none", overflow: "visible" }, children: _jsx("div", { className: "absolute top-1/2 left-1/2 transition-transform duration-200 ease-out", style: {
                                        transform: `
                    translate(-50%, -50%)
                    translate(${ROBOT_NUDGE_X_PX + (isMobile ? 0 : mousePos.x * 8)}px, ${ROBOT_NUDGE_Y_PX + (isMobile ? 0 : mousePos.y * 8)}px)
                    rotateY(${isMobile ? 0 : mousePos.x * 15}deg)
                    rotateX(${isMobile ? 0 : -mousePos.y * 10}deg)
                    scale(${ROBOT_SCALE})
                  `,
                                        transformOrigin: "center center",
                                        transformStyle: "preserve-3d",
                                        width: "100%",
                                        height: "100%",
                                        minWidth: "60px",
                                        minHeight: "60px",
                                    }, children: _jsx(Spline, { scene: "/scene.splinecode", onLoad: onSplineLoad, onMouseDown: handleSceneMouseDown, onError: () => setFailed(true), style: {
                                            width: "100%",
                                            height: "100%",
                                            minWidth: "60px",
                                            minHeight: "60px",
                                            pointerEvents: "none",
                                            display: "block",
                                            visibility: "visible",
                                        } }) }) })), (!showSplineRobot || failed) && (_jsx("div", { className: "absolute inset-0 grid place-items-center", style: { pointerEvents: "none" }, children: _jsx("img", { src: "/Robotgen.jpg", alt: "MOMO assistant", style: { width: 64, height: 64, borderRadius: "18px", objectFit: "cover" } }) }))] })] })] }));
}
export default function ChatBotWidget() {
    const host = useMemo(() => {
        if (typeof document === "undefined")
            return null;
        let el = document.getElementById("chatbot-root");
        if (!el) {
            el = document.createElement("div");
            el.id = "chatbot-root";
            document.body.appendChild(el);
        }
        return el;
    }, []);
    if (!host)
        return null;
    return createPortal(_jsxs(_Fragment, { children: [_jsx(WidgetContent, {}), _jsx("style", { children: `
        /* Root portal container: full-screen layer, but children control events */
        #chatbot-root {
          position: fixed !important;
          inset: 0 !important;
          z-index: 2147483647 !important; /* very high so nothing sits above it */
          pointer-events: none !important; /* children opt-in */
        }

        /* Panel: bottom-right, lifted high enough to clear the 99px bubble */
        .chatbot-panel {
          right: 16px !important;
          bottom: 130px !important;              /* ⬅️ was 110px */
          width: calc(100vw - 32px) !important;
          max-width: 380px !important;
          pointer-events: auto !important;
        }

        /* Bubble container: only the button is clickable */
        .chatbot-bubble-container {
          pointer-events: none !important;
        }
        .chatbot-bubble-container > button {
          pointer-events: auto !important;
        }

        /* Responsive tweaks */
        @media (min-width: 768px) and (max-width: 1024px) {
          .chatbot-panel {
            right: 16px !important;
            bottom: 120px !important;            /* ⬅️ was 100px */
            width: 380px !important;
            max-width: calc(100vw - 32px) !important;
          }
        }

        @media (min-width: 481px) and (max-width: 640px) {
          .chatbot-panel {
            left: 12px !important;
            right: 12px !important;
            bottom: 120px !important;            /* ⬅️ was 90px */
            width: calc(100vw - 24px) !important;
          }
        }

        @media (max-width: 480px) {
          .chatbot-panel {
            left: 8px !important;
            right: 8px !important;
            bottom: 120px !important;            /* ⬅️ was 85px */
            width: calc(100vw - 16px) !important;
            border-radius: 16px !important;
          }
        }

        @media (max-width: 360px) {
          .chatbot-panel {
            left: 6px !important;
            right: 6px !important;
            bottom: 118px !important;            /* ⬅️ was 80px */
            width: calc(100vw - 12px) !important;
            border-radius: 14px !important;
          }
        }

        /* iOS safe areas – keep the same gap above the bubble */
        @supports (padding: max(0px)) {
          .chatbot-panel {
            bottom: max(130px, calc(130px + env(safe-area-inset-bottom))) !important; /* ⬅️ was 110px */
            right: max(16px, env(safe-area-inset-right)) !important;
          }
          .chatbot-bubble-container {
            bottom: max(16px, env(safe-area-inset-bottom)) !important;
            right: max(16px, env(safe-area-inset-right)) !important;
          }
        }

        /* Inputs: avoid zoom on focus */
        input[type="text"],
        input[type="number"],
        textarea {
          font-size: 16px !important;
        }
      ` })] }), host);
}
