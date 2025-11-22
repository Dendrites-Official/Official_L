import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Marquee from "react-fast-marquee";
const nativeTokenLogos = [
    { name: "Ethereum", src: "/logosmarquee/eth.png" },
    { name: "Bitcoin", src: "/logosmarquee/bitcoin.png" },
    { name: "Solana", src: "/logosmarquee/solona.png" },
    { name: "Polygon", src: "/logosmarquee/polygon.png" },
    { name: "BNB", src: "/logosmarquee/bnb.png" },
    { name: "Dogecoin", src: "/logosmarquee/dodge.png" },
    { name: "Red", src: "/logosmarquee/red.png" },
];
const brandLogos = [
    { name: "Company 1", src: "/logo.png" },
    { name: "Company 2", src: "/logo1.png" },
    { name: "Company 3", src: "/logo2.png" },
    { name: "Company 4", src: "/logo3.png" },
    { name: "Company 7", src: "/logo1.png" },
    { name: "Company 5", src: "/logo 5.jpg" },
    { name: "Company 6", src: "/SyncG1.png" },
];
const LogoItem = ({ name, src }) => (_jsx("div", { className: "\n      flex-shrink-0\n      w-32 md:w-40 lg:w-48       /* all logos get same slot width */\n      px-3                       /* small, consistent spacing */\n      flex items-center justify-center\n    ", children: _jsx("img", { src: src, alt: name, loading: "lazy", className: "\n        max-h-14 md:max-h-20 lg:max-h-24\n        w-auto\n        object-contain\n        filter grayscale\n        opacity-80\n        transition-all duration-300\n        hover:opacity-100\n        hover:grayscale-0\n        hover:scale-110\n      " }) }));
const LogoMarqueeRow = ({ logos, reverse = false, speed = 40, }) => {
    const COPIES = 3; // repeat to make the track long enough
    return (_jsx(Marquee, { direction: reverse ? "right" : "left", speed: speed, pauseOnHover: true, gradient: false, className: "py-4", children: Array.from({ length: COPIES }).map((_, copyIndex) => logos.map((logo, idx) => (_jsx(LogoItem, { ...logo }, `${copyIndex}-${logo.name}-${idx}`)))) }));
};
export default function PremiumLogoMarquee() {
    return (_jsxs("section", { className: "relative w-full bg-black py-10 md:py-14 overflow-hidden", children: [_jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-neutral-900/40 to-black" }), _jsxs("div", { className: "relative z-10 text-center mb-6 md:mb-8 px-4", children: [_jsx("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-3", children: "Multi-Chain. Brand-Grade." }), _jsx("p", { className: "text-xs md:text-sm text-gray-400 max-w-2xl mx-auto", children: "Chains and brands that take crypto seriously." })] }), _jsxs("div", { className: "relative z-10 space-y-2 md:space-y-4", children: [_jsx(LogoMarqueeRow, { logos: nativeTokenLogos, speed: 35 }), _jsx(LogoMarqueeRow, { logos: brandLogos, reverse: true, speed: 30 })] })] }));
}
