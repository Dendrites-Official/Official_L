// src/pages/BlogArticle.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Footer from "../components/Footer";
import { BLOG_ARTICLES } from "../data/blogs";
import { blogContent } from "../data/blogContent";

export default function BlogArticle() {
  const { id } = useParams<{ id: string }>();
  const articleId = parseInt(id || "1");
  const article = BLOG_ARTICLES.find((a) => a.id === articleId);
  const content = blogContent[articleId];

  if (!article || !content) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-neutral-100">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-light">Article not found</h1>
            <Link
              to="/blogs"
              className="inline-block text-sm text-neutral-400 hover:text-neutral-100"
            >
              ← Back to all blogs
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-neutral-100">
      <main className="flex-1">
        {/* Article Header */}
        <section className="border-b border-neutral-900 bg-black">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-500 hover:text-neutral-300 mb-8"
            >
              ← Back to all blogs
            </Link>
            <div className="space-y-6">
              <div className="inline-block rounded-full border border-neutral-800 bg-neutral-950/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                {article.categoryLabel}
              </div>
              <h1 className="text-3xl font-light leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-neutral-500">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readMins} min read</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-black">
          <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <article className="prose prose-invert prose-neutral max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-light leading-tight tracking-tight sm:text-4xl mb-6 mt-12">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-light leading-tight tracking-tight sm:text-3xl mb-4 mt-10">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-light leading-tight tracking-tight sm:text-2xl mb-3 mt-8">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-base leading-relaxed text-neutral-300 mb-6">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2 mb-6 list-disc list-inside text-neutral-300">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="space-y-2 mb-6 list-decimal list-inside text-neutral-300">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-base leading-relaxed">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">{children}</strong>
                  ),
                  hr: () => <hr className="my-12 border-neutral-800" />,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-neutral-700 pl-6 italic text-neutral-400 my-6">
                      {children}
                    </blockquote>
                  ),
                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt || ""}
                      className="rounded-lg border border-neutral-800 my-8 w-full"
                    />
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="rounded bg-neutral-900 px-1.5 py-0.5 text-sm text-neutral-300 font-mono">
                        {children}
                      </code>
                    ) : (
                      <code className={`${className} block rounded-lg bg-neutral-950 border border-neutral-800 p-4 text-sm text-neutral-300 font-mono overflow-x-auto`}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </article>
          </div>
        </section>

        {/* Article Footer */}
        <section className="border-t border-neutral-900 bg-black">
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-neutral-100 transition hover:border-neutral-200 hover:bg-neutral-900"
              >
                ← All Articles
              </Link>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    article.title
                  )}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/60 px-4 py-2 text-xs uppercase tracking-[0.16em] text-neutral-400 transition hover:border-neutral-600 hover:text-neutral-200"
                >
                  Share on X
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
