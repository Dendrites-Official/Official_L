import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const POSITIONS = [
    {
        id: "frontend",
        title: "Front-End Developer — Product Interfaces (Intern)",
        department: "ENGINEERING",
        location: "Remote Worldwide",
        type: "Paid Internship",
        seatsTotal: 4,
        seatsOpen: 4,
    },
    {
        id: "backend",
        title: "Back-End Developer — Payments & Data (Intern)",
        department: "ENGINEERING",
        location: "Remote Worldwide",
        type: "Paid Internship",
        seatsTotal: 4,
        seatsOpen: 4,
    },
    {
        id: "marketing",
        title: "Marketing & Community — Growth Intern",
        department: "GROWTH",
        location: "Remote Worldwide",
        type: "Paid Internship",
        seatsTotal: 4,
        seatsOpen: 4,
    },
];
export default function Careers() {
    return (_jsx("section", { className: "w-full bg-black text-white", children: _jsxs("div", { className: "w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 md:py-24", children: [_jsxs("header", { className: "text-center mb-10 sm:mb-12 md:mb-16", children: [_jsx("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none", children: "Open Internships" }), _jsx("p", { className: "mt-3 text-sm sm:text-base text-white/60 max-w-xl mx-auto", children: "Early builders for DNDX and SRL L2. Paid, remote-friendly internships where you ship real things, not fake side projects." }), _jsx("div", { className: "mt-10 h-px w-full bg-white/12" })] }), _jsx("div", { children: POSITIONS.map((role) => (_jsxs("article", { className: "group relative py-7 sm:py-8 md:py-9", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:grid sm:grid-cols-[140px,minmax(0,1fr),210px] sm:items-center", children: [_jsx("div", { className: "sm:justify-self-start", children: _jsx("span", { className: "inline-flex items-center rounded-full border border-white/16 px-4 py-1 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/60", children: role.department }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg sm:text-xl md:text-[22px] font-semibold leading-tight", children: role.title }), _jsxs("p", { className: "mt-1 text-sm sm:text-base text-white/55", children: [role.location, _jsx("span", { className: "mx-2 text-white/30", children: "|" }), role.type] }), _jsxs("p", { className: "mt-1.5 text-xs sm:text-sm text-white/45", children: [role.seatsOpen, " of ", role.seatsTotal, " seats currently open"] })] }), _jsx("div", { className: "sm:justify-self-end flex sm:block", children: _jsx("div", { className: "ml-auto flex flex-col items-end gap-1 group/apply", children: _jsxs(Link, { to: `/careers/apply/${role.id}`, className: "inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white/80 group-hover:text-white group-hover/apply:text-white transition-colors", children: [_jsx("span", { className: "border-b border-transparent group-hover/apply:border-[#1850ebff] transition-colors", children: "Apply now" }), _jsx("span", { className: "inline-block text-base leading-none transform transition-transform group-hover/apply:translate-x-0.5 group-hover/apply:-translate-y-0.5", children: "\u2197" })] }) }) })] }), _jsx("div", { className: "pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/10 sm:left-[140px] group-hover:bg-white/20 transition-colors" })] }, role.id))) }), _jsxs("p", { className: "mt-10 text-xs sm:text-sm text-white/40 text-center", children: ["Don\u2019t see the right track?", " ", _jsx("a", { href: "mailto:jobs@dendrites.ai?subject=General%20internship%20interest%20@%20Dendrites&body=Hi%20Dendrites%20team%2C%0A%0AI%E2%80%99d%20love%20to%20introduce%20myself%20and%20explore%20how%20I%20could%20contribute%20to%20DNDX%20and%20SRL%20L2.%20Here%E2%80%99s%20a%20quick%20snapshot%20of%20who%20I%20am%20and%20what%20I%E2%80%99m%20excited%20about%3A%0A%0A-%20Background%20and%20focus%3A%0A-%20Relevant%20experience%20and%20links%3A%0A-%20How%20I%20could%20help%20ship%20commerce-grade%20payments%20and%20Undo%3A%0A%0ALooking%20forward%20to%20connecting!%0A%0ABest%2C%0A%5BYour%20name%5D", className: "underline decoration-white/30 hover:decoration-[#1850ebff] hover:text-white/80 transition-colors", children: "Send a general application" }), "."] })] }) }));
}
