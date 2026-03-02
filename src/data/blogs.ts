// src/data/blogs.ts
export type BlogCategoryId =
  | "all"
  | "vision"
  | "safe-commerce"
  | "technical"
  | "dev-guides"
  | "market"
  | "announcements"
  | "founder"
  | "ecosystem";

export type BlogArticle = {
  id: number;
  title: string;
  excerpt: string;
  category: BlogCategoryId;
  categoryLabel: string;
  date: string;
  readMins: number;
  pdfPath: string;
  featured?: boolean;
  heroImage?: string;
};

export const BLOG_CATEGORIES = [
  { id: "all" as const, label: "All" },
  { id: "vision" as const, label: "Vision & Narrative" },
  { id: "safe-commerce" as const, label: "Safe Commerce" },
  { id: "technical" as const, label: "Technical Papers" },
  { id: "dev-guides" as const, label: "Developer Guides" },
  { id: "market" as const, label: "Market Insights" },
  { id: "announcements" as const, label: "Announcements" },
  { id: "founder" as const, label: "Founder Letters" },
  { id: "ecosystem" as const, label: "Ecosystem / Airdrop" },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 14,
    title: "Season-0 Airdrop: Guide to Points, NFTs, Multipliers & Rewards",
    excerpt:
      "Season-0 is the proving ground for Dendrites. Learn how points, referrals, quests, access NFTs, prestige NFTs, and multipliers combine into the most merit-based airdrop in crypto.",
    category: "ecosystem",
    categoryLabel: "Ecosystem / Airdrop",
    date: "Nov 2025",
    readMins: 9,
    pdfPath: "",
    featured: true,
    heroImage: "/airdrop1.jpg",
  },
  {
    id: 13,
    title: "The Dendrites Protocol: A High-Level Summary of Every Feature",
    excerpt: "The complete guide: Predictable Gas™, SafetySend, AckPay, APP Escrow, PayCodes, QuickPay, SDK. Everything you need to understand Safe Commerce in one place.",
    category: "vision",
    categoryLabel: "Vision & Narrative",
    date: "Nov 2025",
    readMins: 8,
    pdfPath: "",
    heroImage: "/image.png",
    featured: true,
  },
  {
    id: 1,
    title: "The Vision of Dendrites: Why Crypto Needs a Trust Layer",
    excerpt: "Crypto solved the money layer but never solved the commerce layer. Dendrites introduces Safe Commerce — the trust layer digital money has been missing since day one.",
    category: "vision",
    categoryLabel: "Vision & Narrative",
    date: "Oct 2025",
    readMins: 6,
    pdfPath: "",
  },
  {
    id: 2,
    title: "Why Crypto Payments Are Broken (And How We Fix Them)",
    excerpt: "The 5 fatal flaws stopping crypto adoption: unpredictable fees, no undo, no refunds, no escrow, terrible UX. How Dendrites fixes all of them with one unified system.",
    category: "safe-commerce",
    categoryLabel: "Safe Commerce",
    date: "Oct 2025",
    readMins: 5,
    pdfPath: "",
  },
  {
    id: 3,
    title: "Introducing Predictable Gas™: Ending Fee Anxiety Forever",
    excerpt: "Crypto didn't fail because fees are high — it failed because they're unpredictable. Predictable Gas™ delivers pre-quoted fee bands and SLA Credits when reality exceeds the quote.",
    category: "safe-commerce",
    categoryLabel: "Safe Commerce",
    date: "Oct 2025",
    readMins: 6,
    pdfPath: "",
  },
  {
    id: 4,
    title: "SafetySend (UNDO): Reversible Crypto Payments for the First Time",
    excerpt: "Billions are lost every year to simple mistakes. SafetySend introduces a 3-minute undo window — the safety net crypto has needed since day one.",
    category: "safe-commerce",
    categoryLabel: "Safe Commerce",
    date: "Oct 2025",
    readMins: 5,
    pdfPath: "",
  },
  {
    id: 5,
    title: "APP Escrow Explained: Payments That Behave Like Workflows",
    excerpt: "Commerce requires structure: milestones, approvals, refunds, delivery checks. APP Escrow brings enterprise-grade payment workflows to crypto for the first time.",
    category: "technical",
    categoryLabel: "Technical Papers",
    date: "Oct 2025",
    readMins: 7,
    pdfPath: "",
  },
  {
    id: 6,
    title: "AckPay: Confirmation-Based Crypto Payments",
    excerpt: "Payments finalize only when the receiver accepts. If they don't confirm, funds auto-refund. The confirmation layer crypto has needed since day one.",
    category: "technical",
    categoryLabel: "Technical Papers",
    date: "Oct 2025",
    readMins: 6,
    pdfPath: "",
  },
  {
    id: 7,
    title: "Why \"Planning Gas\" Doesn't Work (Real Data Breakdown)",
    excerpt: "Gas volatility is chaotic, not predictable. MEV bots, liquidations, and spikes destroy every estimate. Real data shows why businesses need Predictable Gas™ instead.",
    category: "market",
    categoryLabel: "Market Insights",
    date: "Oct 2025",
    readMins: 7,
    pdfPath: "",
  },
  {
    id: 8,
    title: "$12B in 2024: The Harsh Reality of Crypto Scams & Mistakes",
    excerpt: "Over $12B lost in 2024 to user errors, scams, and irreversible mistakes. SafetySend, AckPay, and APP Escrow could prevent 50%+ of these losses.",
    category: "market",
    categoryLabel: "Market Insights",
    date: "Oct 2025",
    readMins: 6,
    pdfPath: "",
  },
  {
    id: 9,
    title: "A Developer's Guide to Using the Dendrites SDK (Simple Version)",
    excerpt: "Get Safe Commerce in minutes. No Solidity needed. Integrate Predictable Gas™, SafetySend, APP Escrow, and AckPay with just a few lines of JavaScript.",
    category: "dev-guides",
    categoryLabel: "Developer Guides",
    date: "Nov 2025",
    readMins: 8,
    pdfPath: "",
  },
  {
    id: 10,
    title: "Understanding PayCodes (EIP-681 for Safe Commerce)",
    excerpt: "PayCodes are enhanced payment URIs that embed Safe Commerce features: UNDO, AckPay, escrow, metadata. Error-proof, merchant-ready, universally compatible.",
    category: "dev-guides",
    categoryLabel: "Developer Guides",
    date: "Nov 2025",
    readMins: 5,
    pdfPath: "",
  },
  {
    id: 11,
    title: "Founder Letter #1: The Birth of Dendrites (Personal Edition)",
    excerpt: "From pain came purpose. From loss came leadership. The personal story behind Dendrites and why Safe Commerce became a mission, not just a protocol.",
    category: "founder",
    categoryLabel: "Founder Letters",
    date: "Nov 2025",
    readMins: 7,
    pdfPath: "",
  },
  {
    id: 12,
    title: "Dendrites Monthly Update #1: Building the Foundations of Safe Commerce",
    excerpt: "Architecture complete, SDK prototyping started, design system evolving. A transparent look at where we stand and what's coming next.",
    category: "announcements",
    categoryLabel: "Announcements",
    date: "Nov 2025",
    readMins: 6,
    pdfPath: "",
  },
  {
    id: 15,
    title: "Bulk Pay: Crypto Payouts at Scale — With Receipts You Can Actually Use",
    excerpt: "One-off payments are easy. What breaks teams is payouts: missed recipients, mismatched totals, no proof. Bulk Pay is Dendrites' payouts rail — paste a list, get a preview, send in one flow, and generate receipts that make ops and accounting sane.",
    category: "technical",
    categoryLabel: "Technical Papers",
    date: "Mar 2026",
    readMins: 6,
    pdfPath: "",
    heroImage: "/image.png",
  },
  {
    id: 16,
    title: "Wallet Health: A Simple Safety Snapshot for Your Wallet",
    excerpt: "Approvals accumulate silently. Unknown contracts get forgotten. Pending transactions confuse people. Wallet Health is Dendrites' lightweight safety snapshot — the first 30 seconds of clarity your wallet has been missing.",
    category: "safe-commerce",
    categoryLabel: "Safe Commerce",
    date: "Mar 2026",
    readMins: 6,
    pdfPath: "",
    heroImage: "/image.png",
  },
  {
    id: 17,
    title: "Receipts Explorer: The Proof Layer for Onchain Payments",
    excerpt: "A transaction hash is not a receipt. Receipts Explorer is Dendrites' proof layer — a clean, searchable, shareable receipt system built directly into payment rails. The difference between 'sending crypto' and running real commerce.",
    category: "technical",
    categoryLabel: "Technical Papers",
    date: "Mar 2026",
    readMins: 6,
    pdfPath: "",
    heroImage: "/image.png",
  },
  {
    id: 18,
    title: "Nonce Rescue: Fix Stuck Transactions Safely (Speed Up or Cancel)",
    excerpt: "A transaction gets stuck, nothing else goes through, your wallet feels frozen. Nonce Rescue is Dendrites' guided tool to fix stuck or pending transactions — with guardrails, clear explanations, and correct EIP-1559 fee logic. Built for the worst day UX.",
    category: "dev-guides",
    categoryLabel: "Developer Guides",
    date: "Mar 2026",
    readMins: 5,
    pdfPath: "",
    heroImage: "/image.png",
  },
  {
    id: 19,
    title: "QuickPay: Premium Gasless Sends — With Receipts Built In",
    excerpt: "Most crypto send experiences still feel like 2017 — paste an address and pray. QuickPay is Dendrites' answer: a premium payments UI designed to feel effortless, predictable, and verifiable. From the first send to real ops.",
    category: "safe-commerce",
    categoryLabel: "Safe Commerce",
    date: "Mar 2026",
    readMins: 6,
    pdfPath: "",
    heroImage: "/image.png",
  },
  {
    id: 20,
    title: "Security + Guardrails: How Dendrites Makes Sponsored Payments Safe",
    excerpt: "Building gasless payments is easy to demo — and hard to ship safely. Spam, abuse, draining budgets, malicious tokens. Dendrites treats security and guardrails as a product feature, not an afterthought. Here's how.",
    category: "technical",
    categoryLabel: "Technical Papers",
    date: "Mar 2026",
    readMins: 7,
    pdfPath: "",
    heroImage: "/image.png",
  },
  {
    id: 21,
    title: "Dendrites App (Beta): Gasless Payments + Wallet Safety — With Receipts Built In",
    excerpt: "Fees unpredictable. One wrong address irreversible. Payouts messy. No real receipts. Dendrites is fixing all of it. Introducing the Dendrites App (Beta) — a premium suite of payment rails and wallet safety tools tied together by a receipts-first proof layer.",
    category: "announcements",
    categoryLabel: "Announcements",
    date: "Mar 2026",
    readMins: 8,
    pdfPath: "",
    heroImage: "/airdrop1.jpg",
    featured: false,
  },
];
