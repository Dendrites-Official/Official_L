"use client";
import { motion } from "framer-motion";

const TOKENS = {
  ink: "#0A0B10",
  hair: "rgba(255,255,255,0.10)",
  stroke: "rgba(255,255,255,0.18)",
  text: "#FAFAFA",
  sub: "rgba(255,255,255,0.70)",
  accentA: "#00D1FF", // teal / cyan
  accentB: "#FFC700", // gold
};

type Props = {
  title?: string;
  videoLeft?: string;   // YouTube embed URL
  videoRight?: string;  // YouTube embed URL
  ctaHref?: string;
  ctaLabel?: string;
};

export default function SRLCommunityReviews({
  title = "Community Reviews",
  // placeholder embeds; replace with your URLs later
  videoLeft = "https://www.youtube.com/embed/ouKS-UB9OfA",
  videoRight = "https://www.youtube.com/embed/kEc5IsadG8?start=472",
  ctaHref = "https://waitlist.dendrites.ai/",
  ctaLabel = "Join Waitlist",
}: Props) {
  return (
    <section
      className="relative overflow-hidden bg-black"
      aria-label="Community reviews and waitlist"
    >
      {/* micro-grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(transparent 97%, rgba(255,255,255,0.05) 98%), linear-gradient(90deg, transparent 97%, rgba(255,255,255,0.05) 98%)",
          backgroundSize: "20px 20px",
          maskImage:
            "radial-gradient(140% 120% at 50% 0%, #000 62%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-6 md:px-10 py-16 sm:py-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h2
            className="font-extrabold tracking-tight"
            style={{
              color: TOKENS.text,
              fontSize: "clamp(28px, 5.4vw, 56px)",
              lineHeight: 1.06,
            }}
          >
            {title}
          </h2>

          {/* understated 5-star row */}
          <div className="mt-3 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="url(#starGradient)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,199,0,0.95)" />
                    <stop offset="100%" stopColor="rgba(255,225,120,0.95)" />
                  </linearGradient>
                </defs>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </motion.div>

        {/* Videos */}
        <div className="mt-10 grid gap-5 sm:gap-6 lg:grid-cols-2">
          <VideoFrame src={videoLeft} title="Community review video 1" />
          <VideoFrame src={videoRight} title="Community review video 2" />
        </div>

        {/* CTA */}
        {/* <div className="mt-10 sm:mt-12 flex justify-center">
          <a
            href={ctaHref}
            className="group relative inline-flex items-center justify-center rounded-md px-6 sm:px-8 py-3 text-sm sm:text-base font-medium transition-all duration-200"
            style={{
              border: `1px solid ${TOKENS.accentA}`,
              color: TOKENS.accentA,
              background: "transparent",
              touchAction: "manipulation",
              minHeight: "44px",
            }}
          >
            {ctaLabel}
            <span
              className="ml-2 inline-block translate-x-0 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            >
              →
            </span>
          </a>
        </div> */}
      </div>
    </section>
  );
}

function VideoFrame({ src, title }: { src: string; title: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        border: `1px solid ${TOKENS.stroke}`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))",
        contain: "layout style paint"
      }}
    >
      {/* gradient edge on hover */}
      <div
        className="pointer-events-none absolute -inset-0.5 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,209,255,0.22), rgba(255,199,0,0.22))",
        }}
      />
      {/* 16:9 responsive frame */}
      <div className="relative w-full aspect-video" style={{ contain: "strict" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            border: "none",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden"
          }}
        />
      </div>

      {/* caption bar (optional, minimal) */}
      <div
        className="flex items-center justify-between px-3 sm:px-4 py-2"
        style={{ borderTop: `1px solid ${TOKENS.hair}` }}
      >
        <span className="text-xs sm:text-sm" style={{ color: TOKENS.sub }}>
          YouTube • External content
        </span>
        <span
          className="h-[10px] w-[10px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, #12f0ff 0%, #00d1ff 50%, transparent 52%)",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
