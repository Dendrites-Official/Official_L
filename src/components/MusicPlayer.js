"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
function MusicPlayerInner() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume] = useState(0.5);
    const audioRef = useRef(null);
    // Create and configure the audio element once
    useEffect(() => {
        const audio = new Audio("/music/background-music1.mp3");
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
                audioRef.current = null;
            }
        };
    }, [volume]);
    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio)
            return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        }
        else {
            try {
                await audio.play();
                setIsPlaying(true);
            }
            catch (err) {
                console.error("Play failed:", err);
            }
        }
    };
    const barVariants = {
        playing: (i) => ({
            scaleY: [0.3, 1, 0.5, 1, 0.4, 1, 0.6],
            transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
            },
        }),
        paused: {
            scaleY: 0.3,
            transition: { duration: 0.3 },
        },
    };
    return (_jsx("div", { id: "music-player", style: {
            position: 'fixed',
            top: 'clamp(100px, 15vh, 150px)',
            right: 'clamp(16px, 4vw, 28px)',
            zIndex: 2147483647,
            pointerEvents: 'auto',
            willChange: 'transform',
            transform: 'translateZ(0)',
        }, children: _jsx("button", { type: "button", onClick: togglePlay, style: {
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: 'clamp(2px, 0.5vw, 3px)',
                padding: '0',
                width: 'clamp(28px, 8vw, 32px)',
                height: 'clamp(28px, 8vw, 32px)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent',
            }, "aria-label": isPlaying ? "Pause music" : "Play music", children: [0, 1, 2, 3].map((i) => (_jsx(motion.div, { style: {
                    width: "clamp(4px, 1.2vw, 5px)",
                    height: "100%",
                    backgroundColor: "#fa1313ff",
                    borderRadius: "2px",
                    transformOrigin: "bottom",
                }, variants: barVariants, animate: isPlaying ? "playing" : "paused", custom: i }, i))) }) }));
}
export default function MusicPlayer() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted)
        return null;
    // Render into <body> so it's not affected by any transforms
    return createPortal(_jsx(MusicPlayerInner, {}), document.body);
}
