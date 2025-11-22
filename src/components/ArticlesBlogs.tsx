"use client";
import { Link } from "react-router-dom";
import { BLOG_ARTICLES } from "../data/blogs";

type Article = {
  title: string;
  href: string;
  image: string;
  tag: string;
  date: string;     // e.g., "Feb 19"
  readMins: number; // e.g., 7
};

const TOKENS = {
  ink: "#0A0B10",
  hair: "rgba(255,255,255,0.12)",
  stroke: "rgba(255,255,255,0.18)",
  text: "#FAFAFA",
  sub: "rgba(255,255,255,0.70)",
};

const FALLBACK_IMAGES = ["/image.png", "/airdrop1.jpg", "/DX.jpg"];

const DEFAULT_ARTICLES: Article[] = (() => {
  const featuredArticles = BLOG_ARTICLES.filter((article) => article.featured);
  const nonFeatured = BLOG_ARTICLES.filter((article) => !article.featured);
  const prioritized = [...featuredArticles, ...nonFeatured].slice(0, 3);

  const pickArticle = (article: (typeof BLOG_ARTICLES)[number], fallbackIndex: number): Article => ({
    title: article.title,
    href: `/blogs/${article.id}`,
    image: article.heroImage ?? FALLBACK_IMAGES[fallbackIndex] ?? FALLBACK_IMAGES[0],
    tag: article.categoryLabel.toUpperCase(),
    date: article.date,
    readMins: article.readMins,
  });

  return prioritized.map((article, index) => pickArticle(article, index));
})();

export default function ArticlesBlogs({
  title = "Most popular articles",
  articles = DEFAULT_ARTICLES,
}: {
  title?: string;
  articles?: Article[];
}) {
  return (
    <section
      aria-label="Dendrites articles"
      className="relative overflow-hidden"
      style={{ background: '#000', paddingTop: '4rem' }}
    >
      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-6 md:px-10 py-14 sm:py-20">
        {/* Heading */}
        <h2
          className="text-center font-extrabold tracking-tight"
          style={{
            color: TOKENS.text,
            fontSize: "clamp(28px, 6.2vw, 76px)",
            lineHeight: 1.04,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h2>

        {/* Thin divider under heading */}
        <div
          className="mx-auto mt-6 w-full"
          style={{ height: 1, background: TOKENS.hair }}
        />

        {/* Grid */}
        <div className="mt-10 grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <ArticleCard key={i} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ a }: { a: Article }) {
  return (
    <Link
      to={a.href}
      className="group block focus:outline-none"
      aria-label={a.title}
    >
      {/* Thumb */}
      <div className="relative w-full overflow-hidden rounded-xl">
        {/* 16:9 like the reference; adjust to taste (66% height in ref maps well to 16:9) */}
        <div className="relative aspect-[16/9] w-full">
          <img
            src={a.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Meta row (tag + date) */}
      <div className="mt-4 flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 text-[11px] tracking-wide"
          style={{
            color: TOKENS.sub,
            border: `1px solid ${TOKENS.hair}`,
          }}
        >
          {a.tag.toUpperCase()}
        </span>
        <span
          className="text-sm tabular-nums"
          style={{ color: TOKENS.sub }}
          aria-label="Published date"
        >
          {a.date}
        </span>
      </div>

      {/* Title */}
      <h3
        className="mt-3 text-xl sm:text-2xl font-semibold"
        style={{ color: TOKENS.text }}
      >
        {a.title}
      </h3>

      {/* Read time */}
      <div className="mt-2 text-xs uppercase tracking-wide" style={{ color: TOKENS.sub }}>
        {a.readMins} min read
      </div>

      {/* Read more CTA row (underline anim + arrow) */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <span
            className="text-sm"
            style={{ color: TOKENS.text }}
          >
            Read more
          </span>
          <span
            className="transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
            style={{ color: TOKENS.text }}
          >
            →
          </span>
        </div>
        <div
          className="mt-2 w-full origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-0"
          style={{ height: 1, background: TOKENS.text }}
        />
        <div
          className="w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
          style={{ height: 1, background: TOKENS.text }}
        />
      </div>
    </Link>
  );
}
