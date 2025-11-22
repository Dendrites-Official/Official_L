// src/pages/Blogs.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { BLOG_ARTICLES, BLOG_CATEGORIES, type BlogCategoryId } from "../data/blogs";

export default function Blogs() {
  const featuredArticles = BLOG_ARTICLES.filter((a) => a.featured);
  const [activeCategory, setActiveCategory] = useState<BlogCategoryId>("all");

  const filteredArticles =
    activeCategory === "all"
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((a) => a.category === activeCategory);

  const shouldShowFeaturedHero = activeCategory === "all" && featuredArticles.length > 0;
  const featuredIds = new Set(featuredArticles.map((article) => article.id));
  const articlesToRender = shouldShowFeaturedHero
    ? filteredArticles.filter((article) => !featuredIds.has(article.id))
    : filteredArticles;
  const trendingPosts = BLOG_ARTICLES.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-black text-neutral-100">
      <main className="flex-1">
        {/* Hero Section - tighter spacing with quote */}
        <section className="border-b border-neutral-800 bg-black pt-12 sm:pt-16 md:pt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-6 sm:pb-8 md:pb-10 space-y-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">Dispatch 046</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Blog
              </h1>
            </div>
            <div className="space-y-3">
              <blockquote className="text-lg sm:text-xl md:text-2xl font-light text-neutral-200">
                “Documentation for people who need Safe Commerce to just work.”
              </blockquote>
              <p className="max-w-3xl text-sm sm:text-base leading-7 text-neutral-400">
                Insights, updates, and deep dives from the Dendrites team.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter - dropdown on mobile, pill rail on desktop */}
        <section className="sticky top-[118px] md:top-[126px] lg:top-[134px] z-40 border-b border-neutral-800 bg-black/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 sm:py-4 space-y-3">
            {/* Mobile dropdown */}
            <div className="lg:hidden space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
                Filter
              </p>
              <div className="relative">
                <label htmlFor="blog-category-select" className="sr-only">
                  Filter by category
                </label>
                <select
                  id="blog-category-select"
                  value={activeCategory}
                  onChange={(event) => setActiveCategory(event.target.value as BlogCategoryId)}
                  className="w-full appearance-none rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm font-semibold tracking-wide text-neutral-100 focus:border-white focus:outline-none pr-10"
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Desktop pills */}
            <div className="hidden lg:block">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Filter by category
              </div>
              <div className="flex flex-wrap gap-2 py-1">
                {BLOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-all ${
                      activeCategory === cat.id
                        ? "border-white bg-white text-black shadow-lg"
                        : "border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article - Mobile optimized */}
        {shouldShowFeaturedHero && (
          <section className="border-b border-neutral-800 bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
              <div className="space-y-10">
                {featuredArticles.map((article) => (
                  <div key={article.id} className="grid gap-6 sm:gap-8 lg:grid-cols-2">
                    <div>
                      <div className="mb-3">
                        <span className="inline-block rounded-full border border-neutral-700 bg-neutral-900 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-neutral-400">
                          {article.categoryLabel}
                        </span>
                      </div>
                      <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-white">
                        {article.title}
                      </h2>
                      <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed text-neutral-400 line-clamp-3 sm:line-clamp-none">
                        {article.excerpt}
                      </p>
                      <div className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-500">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readMins} min read</span>
                      </div>
                      <Link
                        to={`/blogs/${article.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-black transition-all hover:bg-neutral-200 shadow-lg"
                      >
                        READ FULL →
                      </Link>
                    </div>
                    <div className="aspect-video overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-800 bg-neutral-900 order-first lg:order-last">
                      <img
                        src={article.heroImage ?? "/image.png"}
                        alt={article.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Content: Blog Grid + Sidebar - Mobile optimized */}
        <section className="bg-black py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_320px]">
              {/* Blog Grid */}
              <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 auto-rows-min">
                {articlesToRender.map((article) => (
                  <article
                    key={article.id}
                    className="group flex flex-col rounded-xl sm:rounded-2xl border border-neutral-800 bg-neutral-950/50 p-4 sm:p-5 transition-all hover:border-neutral-600 hover:bg-neutral-900/50 hover:shadow-xl hover:shadow-neutral-900/20"
                  >
                    <div className="mb-2">
                      <span className="inline-block rounded-full border border-neutral-700 bg-neutral-900 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-neutral-400">
                        {article.categoryLabel}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg sm:text-xl font-semibold leading-tight text-neutral-100 group-hover:text-white line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed text-neutral-400 line-clamp-2">
                      {article.excerpt}
                    </p>
                      <div className="flex items-center justify-between border-t border-neutral-800 pt-3">
                      <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-neutral-500">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readMins} min</span>
                      </div>
                      <Link
                        to={`/blogs/${article.id}`}
                        className="text-xs sm:text-sm font-medium text-neutral-400 transition-colors group-hover:text-white"
                      >
                        READ →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Sidebar - Mobile optimized */}
              <aside className="space-y-6 sm:space-y-8">
                {/* Trending Posts - Mobile optimized */}
                <div className="rounded-xl sm:rounded-2xl border border-neutral-800 bg-neutral-950/50 p-4 sm:p-6">
                  <h3 className="mb-4 sm:mb-5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-400">
                    Trending Posts
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {trendingPosts.map((post, idx) => (
                      <Link
                        key={post.id}
                        to={`/blogs/${post.id}`}
                        className="group block border-b border-neutral-800 pb-3 sm:pb-4 last:border-0 last:pb-0 hover:border-neutral-700"
                      >
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <span className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-base sm:text-lg font-semibold text-neutral-500 group-hover:bg-neutral-700 group-hover:text-white transition-all">
                            {idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-medium leading-tight text-neutral-200 group-hover:text-white line-clamp-2">
                              {post.title}
                            </h4>
                            <div className="mt-1 text-[10px] sm:text-xs text-neutral-500">
                              {post.readMins} min read
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Most Important - Mobile optimized */}
                <div className="rounded-xl sm:rounded-2xl border border-neutral-800 bg-neutral-950/50 p-4 sm:p-6">
                  <h3 className="mb-4 sm:mb-5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-400">
                    Most Important
                  </h3>
                  <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                    <Link
                      to="/blogs/3"
                      className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span className="text-white transition-transform group-hover:translate-x-1">→</span>
                      <span className="line-clamp-1">Predictable Gas™ Explainer</span>
                    </Link>
                    <Link
                      to="/blogs/4"
                      className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span className="text-white transition-transform group-hover:translate-x-1">→</span>
                      <span className="line-clamp-1">UNDO: Reversible Crypto</span>
                    </Link>
                    <Link
                      to="/blogs/5"
                      className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span className="text-white transition-transform group-hover:translate-x-1">→</span>
                      <span className="line-clamp-1">APP Escrow Overview</span>
                    </Link>
                  </div>
                </div>

                {/* For Developers - Mobile optimized */}
                <div className="rounded-xl sm:rounded-2xl border border-neutral-800 bg-neutral-950/50 p-4 sm:p-6">
                  <h3 className="mb-4 sm:mb-5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-400">
                    For Developers
                  </h3>
                  <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                    <Link
                      to="/blogs/9"
                      className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span className="text-white transition-transform group-hover:translate-x-1">→</span>
                      <span className="line-clamp-1">SDK Quick Start</span>
                    </Link>
                    <Link
                      to="/blogs/10"
                      className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span className="text-white transition-transform group-hover:translate-x-1">→</span>
                      <span className="line-clamp-1">PayCode Integration</span>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
