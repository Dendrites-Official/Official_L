import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
/**
 * Stacks each child as a full-viewport sticky "slide".
 * Later slides sit above earlier ones as you scroll down.
 * NOTE: Keep the wrapper free of transform/perspective/filter/overflow:hidden.
 */
export default function StackedScrollLayout({ children, className }) {
    const slides = React.Children.toArray(children);
    return (_jsx("div", { className: `relative w-full isolate ${className ?? ""}`, children: slides.map((child, i) => (_jsx("section", { className: "sticky top-0 h-[100svh] w-full", style: { zIndex: i + 1 }, children: _jsx("div", { className: "h-full w-full", children: child }) }, i))) }));
}
