"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { BLOG_ARTICLES } from "../data/blogs";
const TOKENS = {
    ink: "#0A0B10",
    hair: "rgba(255,255,255,0.12)",
    stroke: "rgba(255,255,255,0.18)",
    text: "#FAFAFA",
    sub: "rgba(255,255,255,0.70)",
};
// Get the featured blog and two recent blogs from actual blog data
const FALLBACK_IMAGES = ["/airdrop1.jpg", "/image.png", "/DX.jpg"];
const featuredArticles = BLOG_ARTICLES.filter((article) => article.featured);
const nonFeatured = BLOG_ARTICLES.filter((article) => !article.featured);
const prioritized = [...featuredArticles, ...nonFeatured].slice(0, 3);

const DEFAULT_ARTICLES = prioritized.map((article, index) => ({
    title: article.title,
    href: `/blogs/${article.id}`,
    image: article.heroImage ?? FALLBACK_IMAGES[index] ?? FALLBACK_IMAGES[0],
    tag: article.categoryLabel.toUpperCase(),
    date: article.date,
    readMins: article.readMins,
}));
export default function ArticlesBlogs({ title = "Most popular articles", articles = DEFAULT_ARTICLES, }) {
    return (_jsx("section", { "aria-label": "Dendrites articles", className: "relative overflow-hidden", style: { background: '#000', paddingTop: '4rem' }, children: _jsxs("div", { className: "relative mx-auto max-w-[1240px] px-5 sm:px-6 md:px-10 py-14 sm:py-20", children: [_jsx("h2", { className: "text-center font-extrabold tracking-tight", style: {
                        color: TOKENS.text,
                        fontSize: "clamp(28px, 6.2vw, 76px)",
                        lineHeight: 1.04,
                        letterSpacing: "-0.01em",
                    }, children: title }), _jsx("div", { className: "mx-auto mt-6 w-full", style: { height: 1, background: TOKENS.hair } }), _jsx("div", { className: "mt-10 grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3", children: articles.map((a, i) => (_jsx(ArticleCard, { a: a }, i))) })] }) }));
}
function ArticleCard({ a }) {
    return (_jsxs(Link, { to: a.href, className: "group block focus:outline-none", "aria-label": a.title, children: [_jsx("div", { className: "relative w-full overflow-hidden rounded-xl", children: _jsx("div", { className: "relative aspect-[16/9] w-full", children: _jsx("img", { src: a.image, alt: "", className: "absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" }) }) }), _jsxs("div", { className: "mt-4 flex items-center justify-between", children: [_jsx("span", { className: "rounded-full px-3 py-1 text-[11px] tracking-wide", style: {
                            color: TOKENS.sub,
                            border: `1px solid ${TOKENS.hair}`,
                        }, children: a.tag.toUpperCase() }), _jsx("span", { className: "text-sm tabular-nums", style: { color: TOKENS.sub }, "aria-label": "Published date", children: a.date })] }), _jsx("h3", { className: "mt-3 text-xl sm:text-2xl font-semibold", style: { color: TOKENS.text }, children: a.title }), _jsxs("div", { className: "mt-2 text-xs uppercase tracking-wide", style: { color: TOKENS.sub }, children: [a.readMins, " min read"] }), _jsxs("div", { className: "mt-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm", style: { color: TOKENS.text }, children: "Read more" }), _jsx("span", { className: "transition-transform duration-200 group-hover:translate-x-1", "aria-hidden": true, style: { color: TOKENS.text }, children: "\u2192" })] }), _jsx("div", { className: "mt-2 w-full origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-0", style: { height: 1, background: TOKENS.text } }), _jsx("div", { className: "w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100", style: { height: 1, background: TOKENS.text } })] })] }));
}
