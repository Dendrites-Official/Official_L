import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';
export default function BackgroundDnDx() {
    const [splineApp, setSplineApp] = useState(null);
    const [showBubble, setShowBubble] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isFullExperience, setIsFullExperience] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [codeLines, setCodeLines] = useState([]);
    const sequenceTimeoutsRef = useRef([]);
    const isStoppedRef = useRef(false);
    const codeAnimationRef = useRef(null);
    // Silence unused state warning + hook for future customisation
    useEffect(() => {
        if (splineApp) {
            // Placeholder: keep reference to loaded Spline app if you need it later
            // console.log('Spline app loaded', splineApp);
        }
    }, [splineApp]);
    // Full cinematic script sections
    const scriptSections = [
        { voice: 'Initializing neural protocols' },
        { voice: 'D N D X mainframe detected' },
        { voice: 'Synchronizing ledgers. Calibrating predictable gas modules' },
        { voice: 'Activating S L A credit architecture' },
        {
            voice: 'The network is aligning with Base. New lanes are forming. Nodes awakening one by one',
        },
        { voice: 'Payments are learning to think, to adapt, to protect' },
        {
            voice: 'Welcome to the programmable payments layer, where UNDO, QuickPay, and Adaptive Escrow converge',
        },
        { voice: 'This is not a test. This is the testnet' },
        { voice: 'Preparing deployment sequence. Initiating self verification' },
        { voice: 'Integrity verified. Latency stable. Consensus achieved' },
        { voice: 'The chain of trust is almost live. Stand by' },
        { voice: 'D N D X Base Integration Engaged' },
        { voice: 'Soon, everything connects' },
    ];
    // Decode Base64 custom DNDX code snippets (813 lines)
    const decodeCodeSnippets = () => {
        const base64Snippets = [
            'Lyog6K+t6KiAOkpBVkEg6KGMOjEg6K+05piOOuWNoOS9jeekuuS+i++8jOS4peemgeeUqOS6jueUn+S6pyAqLyBjbGFzcyDnsbtfMXtzdGF0aWMgdm9pZCDmlrnms5VfMSgpe1N5c3RlbS5vdXQucHJpbnRsbigi6L6T5Ye6XzEiKTt9fQ==',
            'Lyog6K+t6KiAOkpTIOihjDoyIOivtOaYjjrljaDkvY3npLrkvovvvIzkuKXnpoHnlKjkuo7nlJ/kuqcgKi8gY29uc29sZS5sb2coJ+i+k+WHul8jMicp',
            'Lyog6K+t6KiAOkhUTUwg6KGMOjMg6K+05piOOuWNoOS9jeekuuS+i++8jOS4peemgeeUqOS6jueUn+S6pyAqLyA8ZGl2IGlkPSflnZdfMyc+5YaF5a65XzM8L2Rpdj4=',
            'Lyog6K+t6KiAOkNQUCDooYw6NCDor7TmmI465Y2g5L2N56S65L6L77yM5Lil56aB55So5LqO55Sf5LqnICovIHZvaWQg5Ye95pWwXzQoKXsgc3RkOjpjb3V0PDwi6L6T5Ye6XzQiPDxzdGQ6OmVuZGw7IH0=',
            'Lyog6K+t6KiAOkNQUCDooYw6NSDor7TmmI465Y2g5L2N56S65L6L77yM5Lil56aB55So5LqO55Sf5LqnICovIHZvaWQg5Ye95pWwXzUoKXsgc3RkOjpjb3V0PDwi6L6T5Ye6XzUiPDxzdGQ6OmVuZGw7IH0=',
            'Lyog6K+t6KiAOkdPIOihjDo2IOivtOaYjjrljaDkvY3npLrkvovvvIzkuKXnpoHnlKjkuo7nlJ/kuqcgKi8gZnVuYyDlh73mlbBfNigpeyBwcmludGxuKCLovpPlh7pfNiIpIH0=',
            'Lyog6K+t6KiAOkpBVkEg6KGMOjcg6K+05piOOuWNoOS9jeekuuS+i++8jOS4peemgeeUqOS6jueUn+S6pyAqLyBjbGFzcyDnsbtfN3tzdGF0aWMgdm9pZCDmlrnms5VfNygpe1N5c3RlbS5vdXQucHJpbnRsbigi6L6T5Ye6XzciKTt9fQ==',
            'Lyog6K+t6KiAOlBZIOihjDo4IOivtOaYjjrljaDkvY3npLrkvovvvIzkuKXnpoHnlKjkuo7nlJ/kuqcgKi8gcHJpbnQoJ+i+k+WHul84Jyk=',
            'Lyog6K+t6KiAOkpTT04g6KGMOjkg6K+05piOOuWNoOS9jeekuuS+i++8jOS4peemgeeUqOS6jueUn+S6pyAqLyB7IumUrl85Ijoi5YC8XzkifQ==',
            'Lyog6K+t6KiAOlRTIOihjDoxMCDor7TmmI465Y2g5L2N56S65L6L77yM5Lil56aB55So5LqO55Sf5LqnICovIGZ1bmN0aW9uIOWHveaVsF8xMDxUPih4OlQpOlR7cmV0dXJuIHg7fQ==',
            // ...rest of the 813 snippets in real implementation
        ];
        // SSR-safe: atob only exists in the browser
        if (typeof window === 'undefined' || typeof window.atob === 'undefined') {
            return ['// Code preview available in browser only'];
        }
        try {
            return base64Snippets.map((encoded) => window.atob(encoded));
        }
        catch (e) {
            console.error('Base64 decode error:', e);
            return ['// Decode error'];
        }
    };
    // Get all decoded code lines and double them for seamless looping
    const allCodeLines = useMemo(() => {
        const decoded = decodeCodeSnippets();
        return [...decoded, ...decoded];
    }, []);
    // Matrix-style continuous scrolling - high speed top to bottom
    const animateCode = () => {
        let scrollOffset = 0;
        const lineHeight = 24; // Approximate line height in pixels
        const scrollSpeed = 8;
        const animate = () => {
            scrollOffset += scrollSpeed;
            const startIndex = Math.floor(scrollOffset / lineHeight) % allCodeLines.length;
            const visibleCount = 30;
            const visibleLines = [];
            for (let i = 0; i < visibleCount; i += 1) {
                const index = (startIndex + i) % allCodeLines.length;
                visibleLines.push(allCodeLines[index]);
            }
            setCodeLines(visibleLines);
            if (isFullExperience && !isPaused) {
                codeAnimationRef.current = requestAnimationFrame(animate);
            }
        };
        animate();
    };
    // Function to speak individual section
    const speakSection = (section, onEnd) => {
        const utterance = new SpeechSynthesisUtterance(section.voice);
        utterance.rate = 0.75;
        utterance.pitch = 0.7;
        utterance.volume = 0.9;
        const voices = speechSynthesis.getVoices();
        const roboticVoice = voices.find((voice) => voice.name.includes('Alex') ||
            voice.name.includes('Daniel') ||
            voice.name.includes('Fred')) || voices.find((voice) => voice.lang.startsWith('en'));
        if (roboticVoice) {
            utterance.voice = roboticVoice;
        }
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
        speechSynthesis.speak(utterance);
    };
    // Start full cinematic experience
    const startFullExperience = () => {
        console.log('🚀 Starting Full Experience');
        sequenceTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
        sequenceTimeoutsRef.current = [];
        isStoppedRef.current = false;
        setIsFullExperience(true);
        setIsSpeaking(true);
        setIsPaused(false);
        setCurrentSection(0);
        setCodeLines(allCodeLines.slice(0, 30));
        animateCode();
        playSequence(0);
    };
    // Play sequence with timing
    const playSequence = (index) => {
        if (isStoppedRef.current)
            return;
        if (index >= scriptSections.length) {
            const timeout = setTimeout(() => {
                if (!isStoppedRef.current) {
                    stopFullExperience();
                }
            }, 2000);
            sequenceTimeoutsRef.current.push(timeout);
            return;
        }
        const section = scriptSections[index];
        speakSection(section, () => {
            if (isStoppedRef.current)
                return;
            const timeout = setTimeout(() => {
                if (!isStoppedRef.current) {
                    setCurrentSection(index + 1);
                    playSequence(index + 1);
                }
            }, 800);
            sequenceTimeoutsRef.current.push(timeout);
        });
    };
    // Stop full experience
    const stopFullExperience = () => {
        isStoppedRef.current = true;
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        }
        speechSynthesis.cancel();
        sequenceTimeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
        sequenceTimeoutsRef.current = [];
        setIsFullExperience(false);
        setIsSpeaking(false);
        setCurrentSection(0);
    };
    // Restart animation when full experience starts
    useEffect(() => {
        if (isFullExperience && !isPaused) {
            if (codeAnimationRef.current) {
                cancelAnimationFrame(codeAnimationRef.current);
            }
            animateCode();
        }
        return () => {
            if (codeAnimationRef.current) {
                cancelAnimationFrame(codeAnimationRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFullExperience, isPaused]);
    // ESC key to stop
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isFullExperience) {
                stopFullExperience();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFullExperience]);
    // Function to speak the short message with male robotic voice
    const speakMessage = () => {
        if (isSpeaking) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }
        const message = 'Hang on tight! We are releasing our test nets soon!';
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.95;
        utterance.pitch = 0.75;
        utterance.volume = 0.8;
        const voices = speechSynthesis.getVoices();
        const maleVoice = voices.find((voice) => voice.name.includes('Alex') ||
            voice.name.includes('Daniel') ||
            voice.name.includes('Fred') ||
            voice.name.includes('Bruce') ||
            (voice.name.includes('Male') && voice.lang.startsWith('en'))) || voices.find((voice) => voice.lang.startsWith('en'));
        if (maleVoice) {
            utterance.voice = maleVoice;
        }
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
    };
    // Show speech bubble after page load (NO AUTO-PLAY)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBubble(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (_jsxs("div", { className: "relative w-full min-h-screen bg-black overflow-hidden", children: [_jsxs("div", { className: "relative w-full min-h-screen h-screen flex", children: [_jsxs(motion.div, { className: "relative bg-black min-h-screen h-screen", initial: { width: '100%' }, animate: { width: isFullExperience ? '70%' : '100%' }, transition: {
                            type: 'tween',
                            duration: 0.8,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }, children: [_jsx("div", { className: "absolute inset-0 flex items-start justify-center z-0 px-4 pt-16 sm:pt-20 md:pt-12 lg:pt-16", children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.5, ease: 'easeOut' }, className: "text-center w-full max-w-[95vw]", children: _jsx("div", { className: "dendrites-logo-container", children: _jsx("img", { src: "/looogo2.png", alt: "DENDRITES", className: "dendrites-logo" }) }) }) }), _jsx("div", { className: "absolute inset-0 z-10 w-full h-full", children: _jsx(Spline, { scene: "https://prod.spline.design/ynTLyzsgTExDGNe9/scene.splinecode", style: { width: '100%', height: '100%' }, onLoad: (app) => setSplineApp(app) }) }), showBubble && (_jsx(_Fragment, { children: [0, 1, 2, 3, 4].map((i) => (_jsx(motion.div, { className: "absolute w-2 h-2 bg-white/70 rounded-full z-15", style: {
                                        left: '50%',
                                        top: '50%',
                                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                                    }, initial: {
                                        opacity: 0,
                                        scale: 0,
                                        x: 0,
                                        y: 0,
                                    }, animate: {
                                        opacity: [0, 1, 0.8, 0],
                                        scale: [0, 1.2, 1, 0.5],
                                        x: [0, -8, -12, -15],
                                        y: [0, -60, -100, -150],
                                    }, transition: {
                                        duration: 1.5,
                                        delay: 2.2 + i * 0.15,
                                        repeat: Infinity,
                                        repeatDelay: 3,
                                        ease: 'easeOut',
                                    } }, i))) })), showBubble && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.3, y: 40 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: {
                                    duration: 0.6,
                                    delay: 2.5,
                                    ease: [0.34, 1.56, 0.64, 1],
                                    type: 'spring',
                                    stiffness: 200,
                                    damping: 15,
                                }, className: "absolute z-20 px-2 sm:px-0", style: {
                                    left: '50%',
                                    top: '35%',
                                    transform: 'translate(-50%, -50%)',
                                }, children: _jsxs(motion.div, { onClick: speakMessage, animate: {
                                        scale: [1, 1.02, 1],
                                        filter: [
                                            'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))',
                                            'drop-shadow(0 0 25px rgba(255, 255, 255, 0.6))',
                                            'drop-shadow(0 0 15px rgba(255, 255, 255, 0.4))',
                                        ],
                                    }, transition: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }, className: "relative cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200\n                           w-[min(90vw,320px)] xs:w-[min(85vw,360px)] sm:w-[min(75vw,400px)]\n                           md:w-[min(70vw,450px)] lg:w-[480px]", title: "Click to play voice message", "aria-label": "Click dialogue box to play robot voice", role: "button", tabIndex: 0, onKeyDown: (e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            speakMessage();
                                        }
                                    }, children: [_jsx("div", { className: "absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-white/80 z-30" }), _jsx("div", { className: "absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-white/80 z-30" }), _jsx("div", { className: "absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-white/80 z-30" }), _jsx("div", { className: "absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-white/80 z-30" }), _jsxs(motion.div, { className: "absolute inset-0 z-5 pointer-events-none overflow-hidden rounded-lg", animate: {
                                                opacity: [0.1, 0.3, 0.1],
                                            }, transition: {
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: 'linear',
                                            }, children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" }), _jsx("div", { className: "absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" })] }), _jsxs("div", { className: "relative px-3 py-2 xs:px-4 xs:py-3 sm:px-5 sm:py-4\n                             bg-black/90 backdrop-blur-xl border-2 border-white/70", style: {
                                                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                                                boxShadow: `
                      0 0 30px rgba(255, 255, 255, 0.3),
                      inset 0 0 20px rgba(255, 255, 255, 0.05),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `,
                                            }, children: [_jsx(motion.div, { className: "absolute inset-0 pointer-events-none", style: {
                                                        background: 'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%)',
                                                    }, animate: {
                                                        y: ['-100%', '200%'],
                                                    }, transition: {
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        ease: 'linear',
                                                    } }), _jsxs("div", { className: "relative z-10 flex items-start gap-3", children: [_jsx(motion.div, { animate: {
                                                                scale: isSpeaking ? [1, 1.15, 1] : [1, 1.1, 1],
                                                            }, transition: {
                                                                duration: isSpeaking ? 0.5 : 1.5,
                                                                repeat: Infinity,
                                                                ease: 'easeInOut',
                                                            }, className: "flex-shrink-0 mt-0.5 pointer-events-none", children: _jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", className: "text-white transition-colors", children: [_jsx(motion.path, { d: "M11 5L6 9H2v6h4l5 4V5z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", fill: "rgba(255, 255, 255, 0.1)" }), _jsx(motion.path, { d: "M15.54 8.46a5 5 0 010 7.07", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", animate: {
                                                                            opacity: isSpeaking
                                                                                ? [0.8, 1, 0.8]
                                                                                : [0.4, 1, 0.4],
                                                                            pathLength: isSpeaking
                                                                                ? [0.8, 1, 0.8]
                                                                                : [0.5, 1, 0.5],
                                                                        }, transition: {
                                                                            duration: isSpeaking ? 0.4 : 2,
                                                                            repeat: Infinity,
                                                                            ease: 'easeInOut',
                                                                        } }), _jsx(motion.path, { d: "M18.07 5.93a10 10 0 010 12.14", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", animate: {
                                                                            opacity: isSpeaking
                                                                                ? [0.6, 1, 0.6]
                                                                                : [0.2, 0.8, 0.2],
                                                                            pathLength: isSpeaking
                                                                                ? [0.6, 1, 0.6]
                                                                                : [0.3, 1, 0.3],
                                                                        }, transition: {
                                                                            duration: isSpeaking ? 0.4 : 2,
                                                                            repeat: Infinity,
                                                                            ease: 'easeInOut',
                                                                            delay: 0.3,
                                                                        } })] }) }), _jsxs("div", { className: "flex-1", children: [!isFullExperience ? (_jsxs(_Fragment, { children: [_jsx(motion.p, { className: "text-white font-bold leading-tight tracking-wide", style: {
                                                                                fontSize: 'clamp(11px, 3.5vw, 16px)',
                                                                                textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)',
                                                                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                                                                letterSpacing: '0.03em',
                                                                            }, animate: {
                                                                                textShadow: [
                                                                                    '0 0 10px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)',
                                                                                    '0 0 15px rgba(255, 255, 255, 0.7), 0 2px 4px rgba(0, 0, 0, 0.8)',
                                                                                    '0 0 10px rgba(255, 255, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)',
                                                                                ],
                                                                            }, transition: {
                                                                                duration: 2,
                                                                                repeat: Infinity,
                                                                                ease: 'easeInOut',
                                                                            }, children: "HANG ON TIGHT WE ARE RELEASING OUR TEST NETS SOON!" }), _jsxs(motion.button, { onClick: (e) => {
                                                                                console.log('🔘 Button clicked!');
                                                                                e.stopPropagation();
                                                                                e.preventDefault();
                                                                                startFullExperience();
                                                                            }, className: "mt-3 px-3 py-1.5 text-xs font-mono font-bold text-white/90\n                                       border border-white/40 rounded hover:bg-white/10\n                                       hover:border-white/70 hover:text-white\n                                       transition-all duration-200 relative overflow-hidden group", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx("span", { className: "relative z-10", children: "\u25B6 EXPERIENCE FULL AWAKENING" }), _jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-[#FFC700]/20 to-[#00D1FF]/20", initial: { x: '-100%' }, whileHover: { x: '100%' }, transition: { duration: 0.6 } })] })] })) : (_jsxs(_Fragment, { children: [_jsx(motion.p, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-white/60 font-mono text-xs leading-relaxed", style: {
                                                                                fontSize: 'clamp(10px, 3vw, 14px)',
                                                                            }, children: isSpeaking
                                                                                ? 'System Active...'
                                                                                : 'Voice playback in progress...' }), _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "flex flex-col items-center justify-center gap-3 mt-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(motion.button, { onClick: (e) => {
                                                                                                e.stopPropagation();
                                                                                                if (isPaused) {
                                                                                                    setIsPaused(false);
                                                                                                    speechSynthesis.resume();
                                                                                                    animateCode();
                                                                                                }
                                                                                                else {
                                                                                                    setIsPaused(true);
                                                                                                    speechSynthesis.pause();
                                                                                                    if (codeAnimationRef.current) {
                                                                                                        cancelAnimationFrame(codeAnimationRef.current);
                                                                                                    }
                                                                                                }
                                                                                            }, className: "px-3 py-1.5 xs:px-4 xs:py-2 text-xs font-mono font-semibold\n                                           border-2 border-white/60 text-white rounded\n                                           hover:bg-white/10 hover:border-white/90\n                                           transition-all duration-200", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: isPaused ? 'PLAY' : 'PAUSE' }), _jsx(motion.button, { onClick: (e) => {
                                                                                                e.stopPropagation();
                                                                                                stopFullExperience();
                                                                                                if (codeAnimationRef.current) {
                                                                                                    cancelAnimationFrame(codeAnimationRef.current);
                                                                                                }
                                                                                                setCodeLines([]);
                                                                                            }, className: "px-3 py-1.5 xs:px-4 xs:py-2 text-xs font-mono font-semibold\n                                           border-2 border-red-500/60 text-red-400 rounded\n                                           hover:bg-red-500/10 hover:border-red-500/90\n                                           transition-all duration-200", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "STOP" })] }), _jsxs(motion.div, { className: "flex items-center gap-1", animate: {
                                                                                        opacity: [0.4, 1, 0.4],
                                                                                    }, transition: {
                                                                                        duration: 1.5,
                                                                                        repeat: Infinity,
                                                                                        ease: 'easeInOut',
                                                                                    }, children: [_jsx(motion.div, { className: "flex gap-0.5 items-end h-5", children: [0, 1, 2, 3, 4].map((i) => (_jsx(motion.div, { className: "w-1.5 bg-red-500/80 rounded-full", animate: {
                                                                                                    height: [
                                                                                                        '40%',
                                                                                                        '100%',
                                                                                                        '60%',
                                                                                                        '100%',
                                                                                                        '40%',
                                                                                                    ],
                                                                                                    opacity: [0.6, 1, 0.7, 1, 0.6],
                                                                                                }, transition: {
                                                                                                    duration: 1.2,
                                                                                                    repeat: Infinity,
                                                                                                    delay: i * 0.1,
                                                                                                    ease: 'easeInOut',
                                                                                                } }, i))) }), _jsx("span", { className: "text-white/70 text-[10px] font-mono ml-1", children: "LIVE BROADCAST" })] })] })] })), !isFullExperience && (_jsxs(motion.div, { className: "flex items-center gap-1 mt-2", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.5 }, children: [_jsx(motion.div, { className: "flex gap-0.5", animate: {
                                                                                opacity: [0.4, 1, 0.4],
                                                                            }, transition: {
                                                                                duration: 1.5,
                                                                                repeat: Infinity,
                                                                                ease: 'easeInOut',
                                                                            }, children: [0, 1, 2].map((i) => (_jsx(motion.div, { className: "w-1 bg-white/60 rounded-full", style: { height: '3px' }, animate: {
                                                                                    scaleY: [1, 1.5, 1],
                                                                                    opacity: [0.6, 1, 0.6],
                                                                                }, transition: {
                                                                                    duration: 0.8,
                                                                                    repeat: Infinity,
                                                                                    delay: i * 0.2,
                                                                                } }, i))) }), _jsx("span", { className: "text-white/60 text-[10px] font-mono ml-1", style: { letterSpacing: '0.05em' }, children: "LIVE BROADCAST" })] }))] })] }), _jsx("div", { className: "absolute top-1 left-1 w-3 h-3 border-t border-l border-white/30" }), _jsx("div", { className: "absolute top-1 right-1 w-3 h-3 border-t border-r border-white/30" }), _jsx("div", { className: "absolute bottom-1 left-1 w-3 h-3 border-b border-l border-white/30" }), _jsx("div", { className: "absolute bottom-1 right-1 w-3 h-3 border-b border-r border-white/30" })] }), _jsx("div", { className: "absolute left-1/2 -translate-x-1/2 z-0", style: { bottom: '-12px' }, children: _jsxs(motion.div, { animate: {
                                                    opacity: [0.8, 1, 0.8],
                                                }, transition: {
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }, children: [_jsx("div", { className: "w-0 h-0 border-l-[12px] border-r-[12px] border-t-[14px] border-l-transparent border-r-transparent border-t-white/70", style: {
                                                            filter: 'drop-shadow(0 2px 4px rgba(255, 255, 255, 0.3))',
                                                        } }), _jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[12px] border-l-transparent border-r-transparent border-t-black/90" })] }) }), [...Array(3)].map((_, i) => (_jsx(motion.div, { className: "absolute w-1 h-1 bg-white/40 rounded-full", style: {
                                                left: `${20 + i * 30}%`,
                                                top: '50%',
                                            }, animate: {
                                                y: [0, -20, 0],
                                                opacity: [0, 1, 0],
                                                scale: [0.5, 1, 0.5],
                                            }, transition: {
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.5,
                                                ease: 'easeInOut',
                                            } }, i)))] }) }))] }), _jsx(AnimatePresence, { children: isFullExperience && (_jsxs(motion.div, { initial: { width: 0, opacity: 0 }, animate: { width: '30%', opacity: 1 }, exit: { width: 0, opacity: 0 }, transition: {
                                type: 'tween',
                                duration: 0.8,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }, className: "relative bg-black/95 backdrop-blur-sm overflow-hidden border-l border-white/10 min-h-screen h-screen", children: [_jsx("div", { className: "absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-2", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex gap-1.5", children: [_jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-red-500/80" }), _jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-yellow-500/80" }), _jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-green-500/80" })] }), _jsx("span", { className: "text-[10px] font-mono text-white/60 uppercase tracking-wider", children: "Roll Out Dendrites OS v3.14.15" })] }) }), _jsx("div", { className: "h-full overflow-hidden pt-12 p-4 font-mono text-green-400 text-xs", children: _jsx(motion.div, { className: "space-y-1", children: codeLines.map((line, idx) => (_jsxs(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: [0, 1, 0.8], x: 0 }, transition: { duration: 0.15 }, className: "whitespace-nowrap opacity-70", children: [_jsx("span", { className: "text-green-500/40", children: ">" }), ' ', line] }, `${idx}-${line}`))) }) }), _jsx("div", { className: "absolute top-12 left-0 right-0 h-16 bg-gradient-to-b from-black/95 to-transparent pointer-events-none" }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/95 to-transparent pointer-events-none" })] })) })] }), _jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

        /* Hide Spline watermark */
        #spline-watermark,
        [class*="watermark"],
        [class*="spline-watermark"],
        a[href*="spline.design"],
        canvas + div,
        canvas ~ a[href*="spline"] {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }

        .dendrites-logo-container {
          width: 100%;
          max-width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dendrites-logo {
          width: clamp(400px, 90vw, 1800px);
          height: auto;
          object-fit: contain;
          user-select: none;
          pointer-events: none;
          filter:
            brightness(0)
            saturate(100%)
            invert(27%)
            sepia(98%)
            saturate(7426%)
            hue-rotate(357deg)
            brightness(103%)
            contrast(114%);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          max-width: 100%;
        }

        @media (max-width: 374px) {
          .dendrites-logo {
            width: clamp(320px, 92vw, 400px);
          }
        }

        @media (min-width: 375px) and (max-width: 428px) {
          .dendrites-logo {
            width: clamp(350px, 90vw, 450px);
          }
        }

        @media (min-width: 429px) and (max-width: 480px) {
          .dendrites-logo {
            width: clamp(400px, 88vw, 520px);
          }
        }

        @media (min-width: 481px) and (max-width: 600px) {
          .dendrites-logo {
            width: clamp(450px, 86vw, 600px);
          }
        }

        @media (min-width: 601px) and (max-width: 768px) {
          .dendrites-logo {
            width: clamp(550px, 85vw, 800px);
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .dendrites-logo {
            width: clamp(700px, 82vw, 1100px);
          }
        }

        @media (min-width: 1025px) {
          .dendrites-logo {
            width: clamp(900px, 80vw, 1500px);
          }
        }

        @media (min-width: 1920px) {
          .dendrites-logo {
            width: clamp(1200px, 75vw, 1800px);
          }
        }

        @media (max-width: 926px) and (orientation: landscape) {
          .dendrites-logo {
            width: clamp(300px, 60vw, 500px);
          }
        }

        .dendrites-text {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(3rem, 12vw, 20rem);
          font-weight: 900;
          letter-spacing: 0.18em;
          color: #FF3333;
          text-transform: uppercase;
          line-height: 0.9;
          user-select: none;
          pointer-events: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          filter: contrast(1.4) brightness(1.1);
          text-shadow:
            0 0 20px rgba(255, 51, 51, 0.6),
            0 0 40px rgba(255, 51, 51, 0.4),
            0 5px 25px rgba(0, 0, 0, 0.6);
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: none;
          white-space: normal;
          max-width: 100%;
        }

        @media (max-width: 374px) {
          .dendrites-text {
            font-size: clamp(2.5rem, 10vw, 4rem);
            letter-spacing: 0.1em;
            line-height: 0.85;
          }
        }

        @media (min-width: 375px) and (max-width: 428px) {
          .dendrites-text {
            font-size: clamp(3rem, 11vw, 5rem);
            letter-spacing: 0.12em;
            line-height: 0.9;
          }
        }

        @media (min-width: 429px) and (max-width: 480px) {
          .dendrites-text {
            font-size: clamp(3.5rem, 11vw, 6rem);
            letter-spacing: 0.14em;
            line-height: 0.9;
          }
        }

        @media (min-width: 481px) and (max-width: 600px) {
          .dendrites-text {
            font-size: clamp(4rem, 12vw, 7rem);
            letter-spacing: 0.15em;
            line-height: 0.9;
          }
        }

        @media (min-width: 601px) and (max-width: 768px) {
          .dendrites-text {
            font-size: clamp(5rem, 13vw, 9rem);
            letter-spacing: 0.16em;
            line-height: 0.95;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .dendrites-text {
            font-size: clamp(6rem, 14vw, 12rem);
            letter-spacing: 0.18em;
            line-height: 1;
          }
        }

        @media (min-width: 1025px) {
          .dendrites-text {
            font-size: clamp(8rem, 15vw, 20rem);
            letter-spacing: 0.18em;
            line-height: 1;
          }
        }

        @media (min-width: 1920px) {
          .dendrites-text {
            font-size: clamp(12rem, 15vw, 24rem);
            letter-spacing: 0.2em;
          }
        }

        @media (max-width: 926px) and (orientation: landscape) {
          .dendrites-text {
            font-size: clamp(2rem, 8vh, 4rem);
            letter-spacing: 0.12em;
            line-height: 0.85;
          }
        }
      ` })] }));
}
