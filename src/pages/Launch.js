import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import BackgroundDnDx from '@/components/BackgroundDnDx';
import MusicPlayer from '@/components/MusicPlayer';
import Footer from '@/components/Footer';
const isDev = import.meta.env.MODE === 'development';
export default function LaunchDNDX() {
    if (isDev) {
        console.log('🚀 Launch page rendering');
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'relative min-h-screen w-full', children: [_jsx(BackgroundDnDx, {}), _jsx(MusicPlayer, {})] }), _jsx("div", { className: 'relative bg-black text-white max-w-4xl mx-auto px-4 py-16', children: _jsx("div", { className: 'space-y-8', children: _jsxs("article", { className: 'border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors', children: [_jsx("h2", { className: 'text-2xl font-semibold mb-2', children: "Coming Soon" }), _jsx("p", { className: 'text-white/60 text-sm mb-4', children: "Stay tuned for updates" }), _jsx("p", { className: 'text-white/70', children: "Experience the full interactive demonstration soon. Check back for the complete DNDX launch experience with advanced features and capabilities." })] }) }) }), _jsx("div", { className: "bg-gradient-to-b from-black via-slate-950 to-slate-900 py-12 sm:py-16 md:py-20", children: _jsx(Footer, {}) })] }));
}
