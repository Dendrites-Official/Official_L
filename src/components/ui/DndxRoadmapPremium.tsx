// src/components/ui/DndxRoadmapPremium.tsx
"use client";
import * as React from "react";
import { motion, useMotionValue } from "framer-motion";

/* --------- Brand tokens --------- */
const BLUE = "#0070F3";
const CYAN = "#06B6D4";
const VIOLET = "#8B5CF6";
const HAIR = "rgba(255,255,255,0.14)";
const SUB  = "rgba(255,255,255,0.70)";
const MUTE = "rgba(255,255,255,0.55)";

/* --------- Micro UI --------- */
const Pill: React.FC<React.PropsWithChildren<{ tone?: "blue"|"green"|"amber"|"muted" }>> = ({ tone="muted", children }) => {
  const c = tone==="blue" ? BLUE : tone==="green" ? "#10B981" : tone==="amber" ? "#F59E0B" : "rgba(255,255,255,0.80)";
  return (
    <span className="inline-flex items-center rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-medium leading-none"
      style={{ color:c, border:`1px solid ${c}66`, background:`${c}10` }}>
      {children}
    </span>
  );
};

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-1.5 sm:space-y-2">
    {items.map((t,i)=>(
      <li key={i} className="flex gap-2 text-[12px] sm:text-[13px]" style={{color:SUB}}>
        <span className="mt-[6px] sm:mt-[7px] h-[5px] w-[5px] sm:h-[6px] sm:w-[6px] rounded-full bg-white/50 flex-shrink-0" />
        <span className="leading-relaxed">{t}</span>
      </li>
    ))}
  </ul>
);

const GlowCard: React.FC<React.PropsWithChildren<{ title?:string; foot?:string }>> = ({title,foot,children})=>(
  <div className="group relative rounded-lg sm:rounded-xl border p-3 sm:p-4 md:p-5"
       style={{ borderColor:HAIR, background:"linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))" }}>
    {title && (
      <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
        <h4 className="text-xs sm:text-sm font-semibold text-white">{title}</h4>
        <span className="h-px flex-1 bg-white/15" />
      </div>
    )}
    <div className="relative">{children}</div>
    {foot && <div className="mt-2 sm:mt-3 text-[10px] sm:text-[11px] leading-relaxed" style={{color:MUTE}}>{foot}</div>}
  </div>
);

const Tile: React.FC<{ title:string; sub?:string; chip?:React.ReactNode }>=({title,sub,chip})=>(
  <div className="rounded-lg sm:rounded-xl border p-2.5 sm:p-3 md:p-4 flex items-center gap-2.5 sm:gap-3 md:gap-4"
       style={{ borderColor:HAIR, background:"rgba(255,255,255,0.02)" }}>
    <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-md sm:rounded-lg flex-shrink-0"
         style={{ background:"radial-gradient(120% 120% at 0% 0%, rgba(0,112,243,0.22), rgba(0,112,243,0.06))" }} />
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        <div className="truncate text-xs sm:text-sm font-semibold text-white">{title}</div>{chip}
      </div>
      {sub && <div className="truncate text-[10px] sm:text-xs mt-0.5" style={{color:SUB}}>{sub}</div>}
    </div>
  </div>
);

/* --------- Roadmap data --------- */
const ROADMAP = [
  {
    title: "Public Preview · Foundation",
    content: (
      <div className="text-white">
        <div className="mb-4 sm:mb-6 flex flex-wrap gap-1.5 sm:gap-2">
          <Pill tone="blue">Now</Pill><Pill>Interactive demos only</Pill><Pill>Predictable Gas™</Pill><Pill tone="green">UNDO demo</Pill>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          <GlowCard title="What's live right now">
            <BulletList items={[
              "QuickPay demo (instant 'card-swipe' payments with Predictable Gas illustration)",
              "Escrow + milestones demo",
              "SafetySend (UNDO) demo",
              "AckPay / inPay preview UI (optional)",
              "Litepaper, whitepaper and public tokenomics"
            ]}/>
          </GlowCard>
          <GlowCard title="Narrative + data">
            <BulletList items={[
              "Market risk dashboard: scams, hacks, fee volatility across chains",
              "Clear story: commerce-grade payments, Predictable Gas™, UNDO, escrow, receipts",
              "Waitlist and presale interest growth"
            ]}/>
          </GlowCard>
        </div>
        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          <GlowCard title="Legal & structure in this phase">
            <BulletList items={[
              "BVI issuer incorporated as token-issuing entity",
              "Delaware company for R&D and product work in progress",
              "External legal counsel engaged to plan Reg S, Reg D 506(c), optional Reg CF paths"
            ]}/>
          </GlowCard>
          <GlowCard title="Goal of this phase">
            <BulletList items={[
              "Prove that the problem + solution resonates",
              "Grow waitlist and presale interest list",
              "Finalize protocol design before spending on audits and presales"
            ]}/>
          </GlowCard>
        </div>
      </div>
    ),
  },
  {
    title: "Mainnet Polishing · Audits · Patent · Testnets",
    content: (
      <div className="text-white">
        <div className="mb-4 sm:mb-6 flex flex-wrap gap-1.5 sm:gap-2">
          <Pill tone="amber">Next</Pill><Pill>Protocol build</Pill><Pill>Security audits</Pill><Pill>Patent filing</Pill>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          <GlowCard title="Protocol build & internal testing">
            <BulletList items={[
              "Finalize v1: Base as primary execution, Ethereum as main settlement & liquidity",
              "Implement smart contracts for Predictable Gas, QuickPay, Escrow, SafetySend (UNDO)",
              "Receipt / credit primitives for /SLA",
              "Internal testnets / forks for edge-case testing, gas modeling and failure modes"
            ]}/>
          </GlowCard>
          <GlowCard title="Security audits">
            <BulletList items={[
              "Freeze code for Audit Round 1 (core protocol + token)",
              "At least one independent security firm reviews contracts",
              "Fixes and Audit Round 2 if needed",
              "Launch bug bounty with defined rewards and disclosure process",
              "Public /security page with auditors, scope & high-level findings"
            ]}/>
          </GlowCard>
        </div>
        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          <GlowCard title="Patent filing – SRL L2">
            <BulletList items={[
              "Draft and file provisional patent covering SRL (Stamp & Receipt Layer) design",
              "Guaranteed lanes, SRL receipts, SRL Credit Vault / paymaster logic",
              "How Predictable Gas™, UNDO, receipts and credits interact at protocol level",
              "After filing: 'SRL L2 – patent pending' in docs and on site"
            ]}/>
          </GlowCard>
          <GlowCard title="Public testnets">
            <BulletList items={[
              "Deploy public testnet versions (e.g., Base Sepolia) of QuickPay + UNDO, Escrow + milestones",
              "Receipt / credit flows (demo only if needed)",
              "Testnet faucets or allocated test USDC",
              "Postman collection + SDK-Lite examples and merchant integrations"
            ]}/>
          </GlowCard>
        </div>
      </div>
    ),
  },
  {
    title: "Presale-1 · Mainnet v1",
    content: (
      <div className="text-white">
        <div className="mb-4 sm:mb-6 flex flex-wrap gap-1.5 sm:gap-2">
          <Pill>Planned</Pill><Pill>Reg S / Reg D 506(c)</Pill><Pill>Mainnet launch</Pill><Pill>Design partners</Pill>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          <GlowCard title="PRESALE-1 (before mainnet)">
            <BulletList items={[
              "With testnets live and audits published, run Presale-1",
              "Reg S raise for non-US participants",
              "Reg D 506(c) raise for US accredited investors",
              "Tokens are not liquid yet: investors receive vesting receipts / claims",
              "Clear docs: cliffs, vesting, and no instant insider dumps"
            ]}/>
          </GlowCard>
          <GlowCard title="Mainnet v1 launch">
            <BulletList items={[
              "Deploy mainnet v1 on Base (execution) with DNDX on Ethereum",
              "QuickPay with Predictable Gas in production",
              "Escrow with refunds & milestones",
              "SafetySend (UNDO window) live with configurable timers",
              "SLA credits / refund-first primitives wired to protocol",
              "Onboard design partners (first 2–5 merchants / platforms) to prove live usage"
            ]}/>
          </GlowCard>
        </div>
      </div>
    ),
  },
  {
    title: "Listing · Season-0 · Scale",
    content: (
      <div className="text-white">
        <div className="mb-4 sm:mb-6 flex flex-wrap gap-1.5 sm:gap-2">
          <Pill>Planned</Pill><Pill>Presale-2</Pill><Pill>Launchpads</Pill><Pill>VC</Pill><Pill>TGE</Pill>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          <GlowCard title="Growth between mainnet v1 and Presale-2">
            <BulletList items={[
              "Show real stats: QuickPay transactions, value protected by UNDO, escrow volume and refunds",
              "Improve developer surface: better docs, guides, SDKs and recipes",
              "Simple integrations for ecommerce / SaaS / wallets"
            ]}/>
          </GlowCard>
          <GlowCard title="PRESALE-2 + Launchpads">
            <BulletList items={[
              "Larger community allocation",
              "Potential launchpad rounds (e.g., ChainGPT Pad or others)",
              "Keep compliance spine: Reg S / Reg D etc.",
              "Heavy KYC/AML and anti-sybil rules for all retail rounds",
              "Respect early Presale-1 buyers (no crazy discount below their entry)"
            ]}/>
          </GlowCard>
        </div>
        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          <GlowCard title="Strategic VC rounds">
            <BulletList items={[
              "Close VC / strategic round to secure 18–24 months of runway",
              "Focus on investors bringing distribution (wallets, payment providers, exchanges)",
              "Credibility (well-known crypto or fintech funds) and technical help (infra partners, security)"
            ]}/>
          </GlowCard>
          <GlowCard title="Season-0 airdrop (usage-first)">
            <BulletList items={[
              "Users earn points and allocations by real activity (pay, receive, escrow, UNDO, etc.)",
              "Claims mint non-transferable receipts that vest toward TGE based on behavior-vesting rules",
              "Transparent leaderboards and anti-sybil filters"
            ]}/>
          </GlowCard>
        </div>
        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          <GlowCard title="Token Generation Event (TGE) & listing">
            <BulletList items={[
              "TGE + first DEX listing: Uniswap on Ethereum as primary",
              "LP ~0.5–1.5% of supply with matching USDC",
              "Target free float ~6–9% (presales + LP + MM)",
              "Presale & team allocations follow cliffs + long vesting (no instant dumps)",
              "Liquidity locked and publicly verifiable, ongoing bug bounty and /security updates"
            ]}/>
          </GlowCard>
          <GlowCard title="Post-listing network effect">
            <BulletList items={[
              "More merchants, wallets, platforms integrate QuickPay, Escrow and UNDO",
              "Case studies: how much money users saved via UNDO, refunds, and predictable gas",
              "Begin discussions with CEXs, where compliance and liquidity make sense"
            ]}/>
          </GlowCard>
        </div>
      </div>
    ),
  },
  {
    title: "R&D · inPay · SRL L2",
    content: (
      <div className="text-white">
        <div className="mb-4 sm:mb-6 flex flex-wrap gap-1.5 sm:gap-2">
          <Pill>Long-term</Pill><Pill>Any-to-any commerce</Pill><Pill>Patent pending → live network</Pill>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 lg:gap-4">
          <GlowCard title="inPay MVP – any-to-any commerce">
            <BulletList items={[
              "Build inPay on mainnet: payer sends X on chain A, merchant receives Y on chain B",
              "If routing (swap + bridge) fails → refund-first to the payer by default",
              "Work with 2–3 design-partner platforms: cross-chain SaaS, marketplaces, or payment gateways",
              "Show real 'any-to-any' commerce without bridge horror stories"
            ]}/>
          </GlowCard>
          <GlowCard title="SRL L2 – from patent-pending to live network">
            <BulletList items={[
              "Turn the patent-pending SRL design into a live system",
              "Guaranteed lanes for high-priority flows",
              "Service-level receipts anchored on-chain",
              "SRL Credit Vault + paymaster for predictable gas pricing for users",
              "Pilot SRL as L2 / rollup, or layer-on-top for partner chains, depending on research"
            ]}/>
          </GlowCard>
        </div>
        <div className="mt-4 sm:mt-6">
          <GlowCard title="Tooling, governance and ecosystem">
            <BulletList items={[
              "Ship operator consoles for lanes, receipts, /SLA credits and risk",
              "Ecosystem grants from the Treasury + Ecosystem buckets for builders",
              "Move gradually from founder-led to DAO-guided governance",
              "Community governance over credit policies, fee bands, and ecosystem grant allocations"
            ]}/>
          </GlowCard>
        </div>
      </div>
    ),
  },
];

/* ---------- Helpers: find scrollable ancestor ---------- */
function getScrollParent(node: HTMLElement | null): HTMLElement | Window {
  let el: HTMLElement | null = node;
  while (el && el !== document.body) {
    const style = getComputedStyle(el);
    const overflowY = style.overflowY;
    if (/(auto|scroll|overlay)/.test(overflowY) && el.scrollHeight > el.clientHeight) {
      return el;
    }
    el = el.parentElement;
  }
  // Lenis/Locomotive may transform body; still return window so rAF reads rects
  return window;
}

/* --------- Beam Timeline (works with custom scrollers) --------- */
function BeamTimeline({ data }: { data: typeof ROADMAP }) {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const railMeasureRef = React.useRef<HTMLDivElement>(null);

  const beamHeightMv = useMotionValue(0);
  const beamOpacityMv = useMotionValue(0);

  const measureRail = React.useCallback(() => {
    const el = railMeasureRef.current;
    if (!el) return 0;
    return Math.max(el.scrollHeight, el.getBoundingClientRect().height);
  }, []);

  const recompute = React.useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;

    // Progress window: when section top hits 85% → when section bottom hits 20%
    const startY = vh * 0.85;
    const endY   = vh * 0.20;
    const total  = rect.height + (startY - endY);
    const passed = startY - rect.top;

    const pRaw = passed / Math.max(1, total);
    const p = Math.min(1, Math.max(0, pRaw)); // clamp 0..1

    const railH = measureRail();

    // Height grows within the clip (no overflow into footer)
    beamHeightMv.set(p * railH);

    // Opacity: ease in (first 6%) and fade out near the end (last 7%)
    let opacity = 1;
    if (p <= 0.06) opacity = p / 0.06;
    else if (p >= 0.93) opacity = 1 - (p - 0.93) / 0.07;
    beamOpacityMv.set(Math.max(0, Math.min(1, opacity)));
  }, [beamHeightMv, beamOpacityMv, measureRail]);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const scrollHost = getScrollParent(el);
    let raf = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      recompute();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => recompute();
    const onLoad = () => recompute();

    if (scrollHost instanceof Window) {
      window.addEventListener("scroll", recompute, { passive: true });
      window.addEventListener("resize", onResize);
      window.addEventListener("load", onLoad);
    } else {
      scrollHost.addEventListener("scroll", recompute, { passive: true });
      window.addEventListener("resize", onResize);
      window.addEventListener("load", onLoad);
    }

    const ro = new ResizeObserver(recompute);
    if (railMeasureRef.current) ro.observe(railMeasureRef.current);

    recompute();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      if (scrollHost instanceof Window) {
        window.removeEventListener("scroll", recompute);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", onLoad);
      } else {
        scrollHost.removeEventListener("scroll", recompute);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", onLoad);
      }
      ro.disconnect();
    };
  }, [recompute]);

  return (
    <div ref={sectionRef} className="relative w-full px-4 sm:px-6 md:px-10">
      {/* Main Heading */}
      <div className="max-w-7xl mx-auto pt-12 sm:pt-16 md:pt-20 lg:pt-32 pb-6 sm:pb-8 md:pb-12 px-0 sm:px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-3 sm:mb-4">
          Roadmap
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed">
          Our journey to build predictable, safe crypto commerce with DNDX.
        </p>
      </div>

      {/* railMeasureRef wraps ALL items so we know the true height */}
      <div ref={railMeasureRef} className="relative max-w-7xl mx-auto pb-12 sm:pb-16 md:pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-8 sm:pt-12 md:pt-20 lg:pt-40 gap-0 md:gap-10">
            {/* sticky title rail */}
            <div className="sticky top-24 sm:top-32 md:top-40 z-10 flex flex-col md:flex-row items-center self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 sm:h-10 absolute left-2 sm:left-3 md:left-3 w-8 sm:w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-neutral-800 border border-neutral-700 p-1.5 sm:p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white/60 md:pl-16 lg:pl-20">
                {item.title}
              </h3>
            </div>

            {/* milestone content */}
            <div className="relative pl-14 sm:pl-16 md:pl-4 pr-0 sm:pr-2 md:pr-4 w-full">
              <h3 className="md:hidden block text-xl sm:text-2xl mb-3 sm:mb-4 text-left font-extrabold tracking-tight text-white/70">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* === CLIP WRAPPER ===
            Everything inside here is clipped to the roadmap height,
            so glow never spills into the footer. */}
        <div
          className="pointer-events-none absolute left-6 sm:left-7 md:left-8 top-0"
          style={{
            height: railMeasureRef.current
              ? Math.max(
                  railMeasureRef.current.scrollHeight,
                  railMeasureRef.current.getBoundingClientRect().height
                )
              : "100%",
            width: "3px",
            overflow: "hidden",
          }}
        >
          {/* hairline (1px) — we render it inside the clip so it's also bounded */}
          <div
            className="absolute left-0 top-0 w-[1px] bg-white/10"
            style={{ height: "100%" }}
          />

          {/* animated premium beam */}
          <motion.div
            className="absolute left-0 top-0 w-[2px] sm:w-[3px] rounded-full overflow-visible"
            style={{ height: beamHeightMv, opacity: beamOpacityMv }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(180deg, ${CYAN} 0%, ${BLUE} 45%, ${VIOLET} 100%)`,
                boxShadow: `0 0 8px ${BLUE}AA, 0 0 18px ${VIOLET}55`,
              }}
            />
            <div
              className="absolute -inset-x-[2px] sm:-inset-x-[3px] inset-y-0 rounded-full blur-[4px] sm:blur-[6px]"
              style={{ background: `linear-gradient(180deg, ${CYAN}88 0%, ${BLUE}88 45%, ${VIOLET}88 100%)` }}
            />
            <div
              className="absolute -inset-x-[8px] sm:-inset-x-[10px] inset-y-0 rounded-full blur-[10px] sm:blur-[14px]"
              style={{ background: `linear-gradient(180deg, ${CYAN}44 0%, ${BLUE}44 45%, ${VIOLET}44 100%)` }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-[24px] sm:w-[30px] h-[24px] sm:h-[30px] rounded-full blur-[10px] sm:blur-[14px]"
              style={{
                bottom: -6,
                background: `radial-gradient(circle, ${BLUE}CC 0%, transparent 70%)`,
                animation: "dndx-pulse 1.4s ease-in-out infinite",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* local keyframes */}
      <style>{`
        @keyframes dndx-pulse {
          0%, 100% { opacity: 0.9; transform: translate(-50%,0) scale(1); }
          50%      { opacity: 0.4; transform: translate(-50%,0) scale(1.12); }
        }
      `}</style>
    </div>
  );
}

export default function DndxRoadmapPremium() {
  return <BeamTimeline data={ROADMAP} />;
}
