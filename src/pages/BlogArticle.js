import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Footer from "../components/Footer";
import { BLOG_ARTICLES } from "../data/blogs";
import { blogContent } from "../data/blogContent";
export default function BlogArticle() {
    const { id } = useParams();
    const articleId = parseInt(id || "1");
    const article = BLOG_ARTICLES.find((a) => a.id === articleId);
    const content = blogContent[articleId];
    if (!article || !content) {
        return (_jsx("div", { className: "flex min-h-screen flex-col bg-black text-neutral-100", children: _jsx("main", { className: "flex-1 flex items-center justify-center", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-4xl font-light", children: "Article not found" }), _jsx(Link, { to: "/blogs", className: "inline-block text-sm text-neutral-400 hover:text-neutral-100", children: "\u2190 Back to all blogs" })] }) }) }));
    }
    return (_jsxs("div", { className: "flex min-h-screen flex-col bg-black text-neutral-100", children: [_jsxs("main", { className: "flex-1", children: [_jsx("section", { className: "border-b border-neutral-900 bg-black", children: _jsxs("div", { className: "mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16", children: [_jsx(Link, { to: "/blogs", className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-500 hover:text-neutral-300 mb-8", children: "\u2190 Back to all blogs" }), _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "inline-block rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400", children: article.categoryLabel }), _jsx("h1", { className: "text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl", children: article.title }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-neutral-500", children: [_jsx("span", { children: article.date }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: [article.readMins, " min read"] })] })] })] }) }), _jsx("section", { className: "bg-black", children: _jsx("div", { className: "mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16", children: _jsx("article", { className: "prose prose-invert prose-neutral max-w-none", children: _jsx(ReactMarkdown, { components: {
                                        h1: ({ children }) => (_jsx("h1", { className: "text-3xl font-light leading-tight tracking-tight sm:text-4xl mb-6 mt-12", children: children })),
                                        h2: ({ children }) => (_jsx("h2", { className: "text-2xl font-light leading-tight tracking-tight sm:text-3xl mb-4 mt-10", children: children })),
                                        h3: ({ children }) => (_jsx("h3", { className: "text-xl font-light leading-tight tracking-tight sm:text-2xl mb-3 mt-8", children: children })),
                                        p: ({ children }) => (_jsx("p", { className: "text-base leading-relaxed text-neutral-300 mb-6", children: children })),
                                        ul: ({ children }) => (_jsx("ul", { className: "space-y-2 mb-6 list-disc list-inside text-neutral-300", children: children })),
                                        ol: ({ children }) => (_jsx("ol", { className: "space-y-2 mb-6 list-decimal list-inside text-neutral-300", children: children })),
                                        li: ({ children }) => (_jsx("li", { className: "text-base leading-relaxed", children: children })),
                                        strong: ({ children }) => (_jsx("strong", { className: "font-semibold text-white", children: children })),
                                        hr: () => _jsx("hr", { className: "my-12 border-neutral-800" }),
                                        blockquote: ({ children }) => (_jsx("blockquote", { className: "border-l-2 border-neutral-700 pl-6 italic text-neutral-400 my-6", children: children })),
                                        img: ({ src, alt }) => (_jsx("img", { src: src, alt: alt || "", className: "rounded-lg border border-neutral-800 my-8 w-full" })),
                                        code: ({ children, className }) => {
                                            const isInline = !className;
                                            return isInline ? (_jsx("code", { className: "rounded bg-neutral-900 px-1.5 py-0.5 text-sm text-neutral-300 font-mono", children: children })) : (_jsx("code", { className: `${className} block rounded-lg bg-neutral-950 border border-neutral-800 p-4 text-sm text-neutral-300 font-mono overflow-x-auto`, children: children }));
                                        },
                                    }, children: content }) }) }) }), _jsx("section", { className: "border-t border-neutral-900 bg-black", children: _jsx("div", { className: "mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Link, { to: "/blogs", className: "inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-neutral-100 transition hover:border-neutral-200 hover:bg-neutral-900", children: "\u2190 All Articles" }), _jsx("div", { className: "flex gap-3", children: _jsx("a", { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/60 px-4 py-2 text-xs uppercase tracking-[0.16em] text-neutral-400 transition hover:border-neutral-600 hover:text-neutral-200", children: "Share on X" }) })] }) }) })] }), _jsx(Footer, {})] }));
}
