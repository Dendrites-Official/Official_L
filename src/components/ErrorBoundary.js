import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/ErrorBoundary.tsx
import { Component } from 'react';
/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        // Log error in development
        if (import.meta.env.DEV) {
            console.error('Error caught by boundary:', error, errorInfo);
        }
    }
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-black p-4", children: _jsx("div", { className: "max-w-md w-full bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4", children: _jsx("svg", { className: "w-8 h-8 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }), _jsx("h2", { className: "text-xl sm:text-2xl font-bold text-white mb-2", children: "Something went wrong" }), _jsx("p", { className: "text-white/60 mb-6 text-sm sm:text-base", children: "We encountered an unexpected error. Please try refreshing the page." }), _jsx("button", { onClick: () => window.location.reload(), className: "inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all duration-200 active:scale-95", children: "Refresh Page" })] }) }) }));
        }
        return this.props.children;
    }
}
