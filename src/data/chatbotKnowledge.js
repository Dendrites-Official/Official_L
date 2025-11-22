// Comprehensive knowledge base for MOMO chatbot
// Sources: Whitepaper, Litepaper, Tokenomics, Blogs
// Last updated: November 2025
// Total Supply: 7.6 BILLION DNDX tokens
export const KNOWLEDGE_BASE = [
    // GREETINGS
    {
        keywords: ['hi', 'hello', 'hey', 'yo', 'gm', 'greetings', 'sup'],
        response: "Hey! I'm MOMO, your DNDX assistant. I can help you with information about DNDX, tokenomics, our vision, payment solutions, and more. What would you like to know?",
        category: 'general'
    },
    // WHAT IS DNDX
    {
        keywords: ['what is dndx', 'what is dendrites', 'explain dndx', 'about dndx', 'dndx purpose'],
        response: "DNDX (Dendrites Network) is a Layer-2 blockchain solution designed for secure, transparent, and efficient payment processing. We're building the future of commerce with escrow-based payments, instant settlements, and crypto-to-fiat conversions. Our mission is to make digital transactions safer and more predictable for everyone.",
        category: 'general'
    },
    // LAYER 2
    {
        keywords: ['layer 2', 'layer-2', 'l2', 'blockchain', 'ethereum', 'base network'],
        response: "DNDX operates as a Layer-2 solution on Base (Ethereum L2). This gives us the security of Ethereum while providing faster transactions and lower fees. Our Layer-2 architecture enables instant settlements and scalable payment processing perfect for modern commerce.",
        category: 'technical'
    },
    // ESCROW & PAYMENTS
    {
        keywords: ['escrow', 'payment', 'transaction', 'pay', 'settlement', 'quick pay'],
        response: "DNDX uses smart contract-based escrow to hold funds securely until both parties confirm the transaction. This eliminates chargebacks, reduces fraud, and ensures predictable outcomes. We also offer Quick Pay for instant settlements and acknowledgment-in-pay for flexible payment terms.",
        category: 'commerce'
    },
    // TOKEN
    {
        keywords: ['token', 'dndx token', 'cryptocurrency', 'coin'],
        response: "The DNDX token is our native utility token used for transaction fees, staking, governance, and ecosystem rewards. Token holders can stake for rewards, participate in DAO governance, and benefit from network growth. Check our Tokenomics page for detailed distribution and utility information.",
        category: 'tokenomics'
    },
    // TOKENOMICS
    {
        keywords: ['tokenomics', 'distribution', 'supply', 'allocation', 'token distribution', 'total supply', 'how many tokens'],
        response: "DNDX has a total supply of 7.6 billion tokens with strategic allocation across the ecosystem. Tokens have vesting schedules to ensure long-term sustainability and prevent market manipulation. Visit our Tokenomics section or download the tokenomics PDF for detailed breakdown, vesting schedules, and unlock timelines.",
        category: 'tokenomics'
    },
    // STAKING
    {
        keywords: ['staking', 'stake', 'rewards', 'yield', 'apr', 'passive income'],
        response: "DNDX token holders can stake their tokens to earn rewards, participate in governance, and help secure the network. Staking rewards come from transaction fees and ecosystem growth. Details on staking pools, APR, and lock-up periods will be announced closer to launch.",
        category: 'tokenomics'
    },
    // VISION
    {
        keywords: ['vision', 'mission', 'goal', 'future', 'why dndx'],
        response: "Our vision is to eliminate the pain points of modern digital commerce: irreversible transactions, unpredictable chargebacks, and opaque payment processes. We're building a transparent, fair, and secure payment infrastructure where both buyers and sellers have protection and clarity. Read our 'Vision of Dendrites' blog for the full story.",
        category: 'vision'
    },
    // CHARGEBACKS
    {
        keywords: ['chargeback', 'dispute', 'refund', 'fraud', 'merchant protection'],
        response: "Traditional payment systems suffer from unpredictable chargebacks that can happen months after a transaction. DNDX eliminates this with escrow-based settlements. Funds are released only when both parties confirm, removing the uncertainty and protecting merchants from fraudulent chargebacks while still protecting buyers.",
        category: 'commerce'
    },
    // CRYPTO TO FIAT
    {
        keywords: ['crypto to fiat', 'convert', 'cash out', 'fiat conversion', 'withdrawal'],
        response: "DNDX enables seamless crypto-to-fiat conversions, allowing merchants and users to instantly convert their earnings to traditional currency. This bridges the gap between crypto payments and everyday banking, making it easy to use digital assets in real-world commerce.",
        category: 'commerce'
    },
    // SECURITY
    {
        keywords: ['security', 'safe', 'secure', 'audit', 'smart contract security'],
        response: "Security is our top priority. DNDX uses audited smart contracts, multi-signature wallets, and industry-standard encryption. Our escrow system ensures funds are protected until transaction completion. We're undergoing third-party security audits and following best practices for Layer-2 security.",
        category: 'technical'
    },
    // ROADMAP
    {
        keywords: ['roadmap', 'timeline', 'launch', 'when', 'release date', 'milestones'],
        response: "Our roadmap includes: Q4 2024 - Testnet launch & community building, Q1 2025 - Mainnet beta & merchant onboarding, Q2 2025 - Full public launch & exchange listings, Q3 2025 - Mobile apps & advanced features, Q4 2025 - Global expansion. Check our Roadmap page for detailed milestones.",
        category: 'roadmap'
    },
    // FEES
    {
        keywords: ['fees', 'cost', 'pricing', 'transaction fee', 'gas'],
        response: "DNDX transaction fees are significantly lower than traditional payment processors (typically 0.5-1% vs 2-3% for credit cards). Fees are paid in DNDX tokens and are transparent upfront. Gas fees on Base L2 are minimal, making micropayments feasible.",
        category: 'commerce'
    },
    // USE CASES
    {
        keywords: ['use case', 'application', 'example', 'who uses', 'for what'],
        response: "DNDX is perfect for: E-commerce (secure online shopping), Freelance platforms (escrow for gig work), Digital marketplaces (NFTs, digital goods), Subscription services (predictable recurring payments), International transfers (low-cost cross-border), Gaming economies (in-game transactions).",
        category: 'general'
    },
    // MERCHANTS
    {
        keywords: ['merchant', 'business', 'integration', 'api', 'sdk', 'developer'],
        response: "Merchants can integrate DNDX via our REST API or SDK. We provide plugins for popular e-commerce platforms (Shopify, WooCommerce), detailed documentation, and developer support. Integration takes minutes, not weeks. Check our Docs section for technical integration guides.",
        category: 'technical'
    },
    // DAO & GOVERNANCE
    {
        keywords: ['dao', 'governance', 'voting', 'community', 'proposal'],
        response: "DNDX is governed by a DAO where token holders vote on protocol upgrades, fee structures, and ecosystem initiatives. The more tokens you hold and stake, the more voting power you have. We believe in community-driven decision making for long-term sustainability.",
        category: 'tokenomics'
    },
    // TEAM
    {
        keywords: ['team', 'founder', 'who created', 'developers', 'about team'],
        response: "DNDX is built by a team of experienced blockchain engineers, payment industry veterans, and security experts. Our founder has deep experience in fintech and identified the critical pain points in digital commerce. We're backed by advisors from leading blockchain projects.",
        category: 'general'
    },
    // WALLET
    {
        keywords: ['wallet', 'metamask', 'connect', 'web3', 'wallet support'],
        response: "DNDX works with popular Web3 wallets like MetaMask, WalletConnect, Coinbase Wallet, and Rainbow. Simply connect your wallet, ensure you're on the Base network, and you're ready to transact. We're also building a native DNDX wallet for enhanced features.",
        category: 'technical'
    },
    // WHITEPAPER & LITEPAPER
    {
        keywords: ['whitepaper', 'litepaper', 'documentation', 'technical docs', 'read more', 'papers', 'documents'],
        response: "For detailed information, check out our comprehensive documentation: Whitepaper (full technical details), Litepaper (concise overview), and Tokenomics PDF. All are available in our Docs section. We also have 13 blog articles covering vision, technical deep-dives, founder insights, and use cases. Visit our Blogs page!",
        category: 'general'
    },
    // BLOGS REFERENCE
    {
        keywords: ['blog', 'article', 'read', 'content', 'learn more'],
        response: "We have an extensive blog covering topics like: The Vision of Dendrites, Why Crypto Needs Better Payments, Escrow Deep-Dive, Quick Pay features, Smart Contract Security, Token Utility, Merchant Integration, Global Analytics, DAO Governance, and more. Check out our Blogs section for all 13 articles!",
        category: 'general'
    },
    // AIRDROP & REWARDS
    {
        keywords: ['airdrop', 'free tokens', 'giveaway', 'earn tokens', 'rewards program'],
        response: "We're planning token airdrops and reward programs for early community members, testnet participants, and active users. Follow our official Twitter and join our Discord for announcements. Beware of scams - we'll never ask for your private keys!",
        category: 'tokenomics'
    },
    // PARTNERSHIPS
    {
        keywords: ['partner', 'partnership', 'collaboration', 'integration'],
        response: "We're actively partnering with e-commerce platforms, payment gateways, and blockchain projects to expand the DNDX ecosystem. Major partnerships will be announced on our official channels. Interested in partnering? Contact us at partnerships@dendrites.ai",
        category: 'general'
    },
    // EXCHANGE LISTINGS
    {
        keywords: ['exchange', 'listing', 'buy dndx', 'where to buy', 'trade'],
        response: "DNDX token listings on major exchanges will be announced post-mainnet launch. Initially, tokens will be available through our official launch platform and decentralized exchanges on Base. Follow our announcements for CEX listings.",
        category: 'tokenomics'
    },
    // SMART CONTRACTS
    {
        keywords: ['smart contract', 'contract address', 'verified', 'code'],
        response: "All DNDX smart contracts are open-source and will be verified on BaseScan upon deployment. Our escrow contracts, token contracts, and governance contracts undergo rigorous auditing. Contract addresses will be published on our official website and documentation.",
        category: 'technical'
    },
    // COMPETITION
    {
        keywords: ['competitor', 'vs', 'better than', 'alternative', 'comparison'],
        response: "Unlike traditional payment processors (high fees, chargebacks) and other crypto solutions (irreversible, complex), DNDX combines the best of both: low fees, escrow protection, user-friendly design, and instant settlements. We're focused on solving real commerce problems, not just speculation.",
        category: 'general'
    },
    // MOBILE APP
    {
        keywords: ['mobile', 'app', 'ios', 'android', 'phone'],
        response: "DNDX mobile apps for iOS and Android are in development and scheduled for Q3 2025. The apps will provide wallet functionality, easy payments, merchant tools, and portfolio tracking. Our web platform is already mobile-optimized for use on any device.",
        category: 'roadmap'
    },
    // KYC & COMPLIANCE
    {
        keywords: ['kyc', 'compliance', 'regulation', 'legal', 'license'],
        response: "DNDX complies with applicable regulations in supported jurisdictions. For certain features and higher transaction limits, KYC may be required. We're committed to building a compliant, long-term sustainable platform while preserving user privacy where possible.",
        category: 'general'
    },
    // TESTNET
    {
        keywords: ['testnet', 'test', 'demo', 'try', 'sandbox'],
        response: "Our testnet is currently live for developers and early testers. You can experiment with DNDX features using test tokens without real funds. Visit our Docs section for testnet access instructions and faucet links. Feedback is highly appreciated!",
        category: 'technical'
    },
    // IRREVERSIBLE TRANSACTIONS PROBLEM
    {
        keywords: ['irreversible', 'cant reverse', 'mistake', 'wrong address', 'accidental'],
        response: "Traditional crypto transactions are irreversible - send to the wrong address and your funds are gone forever. DNDX solves this with escrow-based transactions where funds are held until both parties confirm. This adds a safety layer while maintaining the speed of blockchain transactions.",
        category: 'commerce'
    },
    // ACKNOWLEDGMENT IN PAY
    {
        keywords: ['acknowledgment', 'ack in pay', 'acknowledge', 'confirmation'],
        response: "Acknowledgment-in-Pay (AIP) is our unique feature where payment confirmation triggers automatic acknowledgment from both parties. This creates a transparent, immutable record of transaction agreement, reducing disputes and building trust in digital commerce.",
        category: 'commerce'
    },
    // GLOBAL ANALYTICS
    {
        keywords: ['analytics', 'data', 'insights', 'metrics', 'dashboard', 'statistics'],
        response: "DNDX provides real-time global analytics for the network: transaction volumes, merchant activity, token metrics, geographic distribution, and more. Merchants get detailed analytics dashboards, while the community can view network health metrics. Transparency is key to our ecosystem.",
        category: 'technical'
    },
    // DEVELOPER RESOURCES
    {
        keywords: ['developer', 'build', 'code', 'github', 'open source'],
        response: "Developers can build on DNDX using our comprehensive API, SDK, and documentation. We provide code examples, integration guides, sandbox environments, and technical support. Check our Docs section for API references, GitHub repos, and developer tutorials. Building the future together!",
        category: 'technical'
    },
    // CONTACT & SUPPORT
    {
        keywords: ['contact', 'email', 'support', 'help', 'reach', 'talk to team'],
        response: "You can reach us at: General inquiries - hello@dendrites.ai, Technical support - support@dendrites.ai, Partnerships - partnerships@dendrites.ai, Press - press@dendrites.ai. Follow us on Twitter @dndx_official for updates!",
        category: 'general'
    },
    // SOCIAL MEDIA
    {
        keywords: ['twitter', 'discord', 'telegram', 'social', 'community', 'follow'],
        response: "Join our growing community! Follow us on Twitter @dndx_official for announcements, join our Discord for discussions, and subscribe to our newsletter for updates. Links are in the footer of our website. Let's build the future of payments together!",
        category: 'general'
    },
    // BENEFITS
    {
        keywords: ['benefit', 'advantage', 'why use', 'pros', 'good'],
        response: "DNDX offers: ✅ Lower fees than traditional processors (0.5-1% vs 2-3%), ✅ No chargebacks or disputes, ✅ Instant settlements, ✅ Transparent escrow protection, ✅ Crypto-to-fiat conversion, ✅ Global accessibility, ✅ Smart contract security, ✅ DAO governance. All benefits of crypto without the drawbacks!",
        category: 'general'
    },
    // GETTING STARTED
    {
        keywords: ['how to start', 'getting started', 'begin', 'first step', 'onboard'],
        response: "Getting started with DNDX is easy! 1) Connect your Web3 wallet (MetaMask, Coinbase Wallet, etc.), 2) Ensure you're on Base network, 3) Get DNDX tokens from our launch platform or DEX, 4) Start transacting! For merchants, check our integration docs in the Docs section.",
        category: 'general'
    },
];
// Fallback for complex or unrecognized questions
export const SUPPORT_FALLBACK = "That's a great question! For detailed technical support or complex inquiries, please contact our team at support@dendrites.ai - we'll get back to you within 24 hours with a comprehensive answer.";
// Calculate match score for better accuracy
function calculateMatchScore(query, keywords) {
    let score = 0;
    const queryWords = query.toLowerCase().split(/\s+/);
    for (const keyword of keywords) {
        const keywordLower = keyword.toLowerCase();
        // Exact match in query
        if (query.includes(keywordLower)) {
            score += 10;
        }
        // Word-by-word matching
        const keywordWords = keywordLower.split(/\s+/);
        for (const qWord of queryWords) {
            for (const kWord of keywordWords) {
                if (qWord === kWord) {
                    score += 5;
                }
                else if (qWord.includes(kWord) || kWord.includes(qWord)) {
                    score += 2;
                }
            }
        }
    }
    return score;
}
// Enhanced similarity matching function
export function findBestMatch(userQuery) {
    const query = userQuery.toLowerCase().trim();
    // If query is too short or just greeting
    if (query.length < 3) {
        return "Hey! I'm MOMO, your DNDX assistant. I can help you with information about DNDX, tokenomics, our vision, payment solutions, and more. What would you like to know?";
    }
    let bestMatch = null;
    let bestScore = 0;
    // Calculate scores for all entries
    for (const entry of KNOWLEDGE_BASE) {
        const score = calculateMatchScore(query, entry.keywords);
        if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
        }
    }
    // Require minimum score threshold
    if (bestMatch && bestScore >= 5) {
        return bestMatch.response;
    }
    // Check if question seems complex (long query, multiple sentences, technical terms)
    const isComplex = query.length > 100 ||
        query.split(/[.?!]/).length > 2 ||
        /\b(how does|explain|detail|specific|technical|implement|integrate)\b/.test(query);
    if (isComplex) {
        return SUPPORT_FALLBACK;
    }
    // For general unmatched queries, provide helpful guidance
    return "I can help you with information about DNDX tokenomics, payment solutions, escrow features, roadmap, team, security, integrations, and more. Try asking about a specific topic like 'What is DNDX?', 'How does escrow work?', or 'Tell me about tokenomics'. For complex questions, contact support@dendrites.ai";
}
