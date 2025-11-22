import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/InternshipApplyPage.tsx
import { useMemo, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
const ROLES = {
    frontend: {
        id: "frontend",
        title: "Front-End Developer — Product Interfaces (Intern)",
        label: "Front-End Developer · Internship",
        department: "ENGINEERING",
        location: "Remote Worldwide",
        type: "Paid Internship",
        seatsTotal: 4,
        seatsOpen: 4,
        intro: "You’ll work on the DNDX marketing site and product surfaces — fast, clean interfaces that feel as considered as the underlying protocol.",
        responsibilities: [
            "Implement UI components and flows in React + Vite + Tailwind, from specs and design mocks.",
            "Help keep the site and app responsive across devices and breakpoints.",
            "Polish details: hover states, loading states, error messages, micro-interactions.",
            "Pair with design and back-end to wire real data into interfaces.",
        ],
        requirements: [
            "You’re in Computer Science or a related technical field, or a recent graduate.",
            "Hands-on experience with React and modern JavaScript/TypeScript.",
            "Comfortable with Git/GitHub and basic CLI workflows.",
            "At least one real project: a site, dashboard, or app you can show and walk through.",
        ],
        outcomes: [
            "Ship production interfaces used by real merchants and partners.",
            "Get detailed feedback on code quality, structure, and UX decisions.",
            "Learn how design handoff, review and deployment actually work in a small product team.",
        ],
        compensationNote: "This is a paid internship. Final stipend details are shared during the selection process and depend on location and weekly time commitment.",
    },
    backend: {
        id: "backend",
        title: "Back-End Developer — Payments & Data (Intern)",
        label: "Back-End Developer · Internship",
        department: "ENGINEERING",
        location: "Remote Worldwide",
        type: "Paid Internship",
        seatsTotal: 4,
        seatsOpen: 4,
        intro: "You’ll help wire up the pipes behind DNDX — APIs, data flows and storage that keep commerce-grade payments safe and observable.",
        responsibilities: [
            "Build and maintain small APIs and services for payments, analytics, and internal tools.",
            "Work with SQL databases and services like Supabase / Firebase for data access.",
            "Partner with front-end and product to design clear, stable API contracts.",
            "Take security, logging and correctness seriously, even in experiments.",
        ],
        requirements: [
            "You’re in Computer Science or a related technical field, or a recent graduate.",
            "Some hands-on experience with Node.js / TypeScript or a similar back-end stack.",
            "You can read and write SQL, and understand basic schema design.",
            "Curiosity about reliability, transactions, and how real money systems stay safe.",
        ],
        outcomes: [
            "Touch real payment-adjacent code and data models, not toy examples.",
            "Learn how to design and evolve APIs without breaking existing clients.",
            "Get feedback on architecture decisions and trade-offs, not just syntax.",
        ],
        compensationNote: "This is a paid internship. Final stipend details are shared during the selection process and depend on location and weekly time commitment.",
    },
    marketing: {
        id: "marketing",
        title: "Marketing & Community — Growth Intern",
        label: "Marketing & Community · Internship",
        department: "GROWTH",
        location: "Remote Worldwide",
        type: "Paid Internship",
        seatsTotal: 4,
        seatsOpen: 4,
        intro: "You’ll help tell the DNDX story: own social channels, ship campaigns and keep a tight feedback loop with builders and merchants.",
        responsibilities: [
            "Plan and publish content across X, LinkedIn, Farcaster and Discord.",
            "Turn product launches, changes and roadmap into clear narrative arcs.",
            "Help track basic metrics: reach, engagement, signups and replies.",
            "Collaborate with design and engineering to pull real product into content.",
        ],
        requirements: [
            "You’re in Computer Science, Business, Marketing or a related field, or a recent graduate.",
            "Strong written English and the ability to explain technical ideas in simple language.",
            "You live on the internet: you understand how crypto / fintech conversations move online.",
            "You’re comfortable taking ownership for a channel or small campaign end-to-end.",
        ],
        outcomes: [
            "Build a real portfolio of posts, threads and small campaigns tied to actual product work.",
            "Learn how product, marketing and community talk to each other in a small team.",
            "Get direct feedback on messaging, tone, positioning and experiment design.",
        ],
        compensationNote: "This is a paid internship. Final stipend details are shared during the selection process and depend on location and weekly time commitment.",
    },
};
function buildMailto(role) {
    const subject = encodeURIComponent(`Application: ${role.title} — Internship @ Dendrites`);
    const body = encodeURIComponent(`Hi Dendrites team,

I'd like to apply for the ${role.title} (${role.type}).

Name:
Current city & time zone:
University / current status (e.g. 3rd year CS, recent graduate):

Links:
- Resume (PDF):
- Portfolio / GitHub:
- LinkedIn / X / Farcaster (optional):

Why I believe I'm a strong fit for this internship:
- (2–6 short bullet points on relevant work, interests, and how you think about this space.)

Availability:
- Earliest start date:
- Weekly hours you can commit:
- Any constraints (exams, other commitments):

Anything else you'd like to know about me:

Best,
[Your name here]`);
    return `mailto:jobs@dendrites.ai?subject=${subject}&body=${body}`;
}
function ToggleRow(props) {
    const { label, description, checked, onToggle } = props;
    return (_jsxs("button", { type: "button", onClick: onToggle, className: `w-full flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 sm:px-5 sm:py-3.5 text-left transition-colors
      ${checked
            ? "border-[#1850ebff] bg-white/[0.04]"
            : "border-white/10 bg-white/[0.02] hover:border-white/25"}`, children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-xs sm:text-sm font-medium text-white", children: label }), description && (_jsx("p", { className: "mt-0.5 text-[11px] sm:text-xs text-white/55", children: description }))] }), _jsx("div", { className: `relative h-5 w-9 rounded-full border transition-colors ${checked ? "border-[#1850ebff] bg-[#1850eb33]" : "border-white/25"}`, children: _jsx("span", { className: `absolute top-[2px] h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200 ${checked ? "right-[2px]" : "left-[2px]"}` }) })] }));
}
export default function InternshipApplyPage() {
    const { roleId } = useParams();
    const navigate = useNavigate();
    const role = useMemo(() => {
        if (!roleId)
            return ROLES.frontend;
        if (roleId === "backend" || roleId === "marketing" || roleId === "frontend")
            return ROLES[roleId];
        return ROLES.frontend;
    }, [roleId]);
    const [toggles, setToggles] = useState({
        eligible: false,
        resume: false,
        links: false,
        motivation: false,
        availability: false,
    });
    const allChecked = Object.values(toggles).every(Boolean);
    const mailtoHref = useMemo(() => buildMailto(role), [role]);
    const toggle = useCallback((key) => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    }, []);
    const handleApplyClick = useCallback(() => {
        if (!allChecked)
            return;
        window.location.href = mailtoHref;
    }, [allChecked, mailtoHref]);
    return (_jsx("section", { className: "w-full min-h-[100svh] bg-black text-white", children: _jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-18 md:py-20", children: [_jsxs("div", { className: "flex items-center justify-between gap-4 mb-8", children: [_jsxs("button", { type: "button", onClick: () => navigate(-1), className: "text-xs sm:text-sm text-white/60 hover:text-white flex items-center gap-1.5", children: [_jsx("span", { className: "text-base sm:text-lg", children: "\u2190" }), "Back to internships"] }), _jsx("span", { className: "text-[11px] sm:text-xs text-white/40 uppercase tracking-[0.2em]", children: "APPLICATION \u00B7 DNDX" })] }), _jsxs("div", { className: "rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.03] via-black to-black/95 px-5 sm:px-7 md:px-9 py-6 sm:py-8 md:py-9 shadow-[0_24px_80px_rgba(0,0,0,0.9)] mb-10 sm:mb-12", children: [_jsxs("p", { className: "text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white/50 mb-2", children: [role.department, " \u00B7 Internship"] }), _jsx("h1", { className: "text-2xl sm:text-3xl md:text-[32px] font-semibold tracking-tight", children: role.title }), _jsxs("p", { className: "mt-2 text-sm sm:text-base text-white/65", children: [role.location, _jsx("span", { className: "mx-2 text-white/30", children: "\u2022" }), role.type, _jsx("span", { className: "mx-2 text-white/30", children: "\u2022" }), role.seatsOpen, " of ", role.seatsTotal, " seats open"] }), _jsx("p", { className: "mt-4 text-sm sm:text-[15px] text-white/70 max-w-3xl", children: role.intro }), _jsx("p", { className: "mt-4 text-[11px] sm:text-xs text-white/50", children: role.compensationNote })] }), _jsxs("div", { className: "grid gap-10 lg:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)]", children: [_jsxs("div", { className: "space-y-5 sm:space-y-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-sm sm:text-base font-semibold tracking-tight mb-1.5", children: "Before you apply" }), _jsx("p", { className: "text-xs sm:text-sm text-white/60", children: "This page is just for you \u2014 no backend yet. Tick the checklist, then we'll open an email draft with everything structured." })] }), _jsxs("div", { className: "space-y-3 sm:space-y-3.5", children: [_jsx(ToggleRow, { label: "I\u2019m in Computer Science (or a related field) or a recent graduate.", checked: toggles.eligible, onToggle: () => toggle("eligible") }), _jsx(ToggleRow, { label: "I have a resume / CV ready to attach (PDF preferred).", checked: toggles.resume, onToggle: () => toggle("resume") }), _jsx(ToggleRow, { label: "I can share at least one link (GitHub, portfolio, LinkedIn or similar).", checked: toggles.links, onToggle: () => toggle("links") }), _jsx(ToggleRow, { label: "I can write 4\u20136 sentences on why I\u2019m a strong fit for this internship.", checked: toggles.motivation, onToggle: () => toggle("motivation") }), _jsx(ToggleRow, { label: "I have a rough idea of my availability (start date + weekly hours).", checked: toggles.availability, onToggle: () => toggle("availability") })] }), _jsxs("div", { className: "mt-4 space-y-2", children: [_jsx("button", { type: "button", onClick: handleApplyClick, disabled: !allChecked, className: `w-full rounded-2xl px-5 py-3.5 text-sm sm:text-base font-semibold transition-all
                ${allChecked
                                                ? "bg-white text-black hover:bg-[#f3f4f6] active:scale-[0.98]"
                                                : "bg-white/5 text-white/40 cursor-not-allowed"}`, children: "Open email draft & apply" }), _jsxs("p", { className: "text-[11px] sm:text-xs text-white/45", children: ["We'll open your default email client with a pre-filled template to", " ", _jsx("span", { className: "font-semibold text-white/70", children: "jobs@dendrites.ai" }), ". Attach your resume and edit the text before sending."] })] })] }), _jsxs("div", { className: "space-y-5 sm:space-y-6", children: [_jsxs("div", { className: "rounded-2xl border border-white/12 bg-white/[0.01] px-5 py-4 sm:px-6 sm:py-5", children: [_jsx("h2", { className: "text-sm sm:text-base font-semibold tracking-tight mb-2", children: "What you\u2019ll work on" }), _jsx("ul", { className: "space-y-1.5 text-xs sm:text-sm text-white/70", children: role.responsibilities.map((item) => (_jsxs("li", { className: "flex gap-2", children: [_jsx("span", { className: "mt-[5px] h-[5px] w-[5px] rounded-full bg-[#1850ebff]" }), _jsx("span", { children: item })] }, item))) })] }), _jsxs("div", { className: "rounded-2xl border border-white/12 bg-white/[0.01] px-5 py-4 sm:px-6 sm:py-5", children: [_jsx("h2", { className: "text-sm sm:text-base font-semibold tracking-tight mb-2", children: "Who this is for" }), _jsx("ul", { className: "space-y-1.5 text-xs sm:text-sm text-white/70", children: role.requirements.map((item) => (_jsxs("li", { className: "flex gap-2", children: [_jsx("span", { className: "mt-[5px] h-[5px] w-[5px] rounded-full bg-white/60" }), _jsx("span", { children: item })] }, item))) })] }), _jsxs("div", { className: "rounded-2xl border border-white/12 bg-white/[0.01] px-5 py-4 sm:px-6 sm:py-5", children: [_jsx("h2", { className: "text-sm sm:text-base font-semibold tracking-tight mb-2", children: "What you\u2019ll get out of it" }), _jsx("ul", { className: "space-y-1.5 text-xs sm:text-sm text-white/70", children: role.outcomes.map((item) => (_jsxs("li", { className: "flex gap-2", children: [_jsx("span", { className: "mt-[5px] h-[5px] w-[5px] rounded-full bg-emerald-400/80" }), _jsx("span", { children: item })] }, item))) }), _jsx("p", { className: "mt-3 text-[11px] sm:text-xs text-white/45", children: "We also provide a completion letter describing what you shipped, and we're happy to support future job applications with a reference when the internship has gone well." })] }), _jsx("div", { className: "text-[11px] sm:text-xs text-white/40", children: _jsx("p", { children: "DNDX internships are structured around real work and tight feedback loops. If you're serious about learning and shipping, we'll take your application seriously." }) })] })] }), _jsxs("div", { className: "mt-10 sm:mt-12 flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs text-white/40", children: [_jsx("span", { children: "\u00A9 2025 Dendrites AI \u00B7 Early team building commerce-grade Undo." }), _jsx(Link, { to: "/careers", className: "underline decoration-white/30 hover:decoration-[#1850ebff] hover:text-white/70", children: "View all open internships" })] })] }) }));
}
