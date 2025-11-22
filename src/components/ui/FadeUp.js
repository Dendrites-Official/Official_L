import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function FadeUp({ children, delay = 0 }) {
    return (_jsx(motion.div, { "data-fade-up": true, initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15, margin: "0px 0px -100px 0px" }, transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay,
            opacity: { duration: 0.6 }
        }, children: children }));
}
