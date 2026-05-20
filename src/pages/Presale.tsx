import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Footer from "@/components/Footer";
import "../styles/genesis-presale.css";

const TARGET_DATE_ISO = "2026-07-31T09:00:00-04:00";

const links = {
  airdrop: "https://waitlist.dendrites.ai/",
  tokenomics: "https://www.dendrites.ai/",
  dapp: "https://dendrites.xyz",
  docs: "https://www.dendrites.ai/",
};

const timeline = [
  {
    number: "01",
    date: "May 2026",
    title: "Marketing + outreach",
    text: "Community education, partner outreach, waitlist growth, and official presale preparation.",
    state: "Active",
  },
  {
    number: "02",
    date: "June 2026",
    title: "Mainnet beta proof",
    text: "Controlled product proof before the presale campaign becomes the main public focus.",
    state: "Next",
  },
  {
    number: "03",
    date: "July 2026",
    title: "Presale campaign",
    text: "Official education, token materials, launchpad decisions, and finalized public details.",
    state: "Planned",
  },
  {
    number: "04",
    date: "July 31, 2026",
    title: "Genesis Presale target",
    text: "Target opening date, subject to final confirmation through official Dendrites channels.",
    state: "Target",
  },
];

const utility = [
  {
    title: "Access",
    eyebrow: "Product access",
    text: "DNDX is designed to support access across Dendrites payment products, receipts, and future ecosystem features.",
  },
  {
    title: "Fees",
    eyebrow: "Payment utility",
    text: "A utility path for transparent fee experiences, payment routing, and ecosystem-level usage.",
  },
  {
    title: "Rewards",
    eyebrow: "Participation layer",
    text: "Built around product usage, early contribution, airdrop participation, and long-term ecosystem alignment.",
  },
  {
    title: "Ecosystem",
    eyebrow: "Network growth",
    text: "A token layer for users, builders, partners, and supporters participating in Dendrites growth.",
  },
];

const prep = [
  "Join the official airdrop / waitlist.",
  "Follow official Dendrites announcements only.",
  "Read tokenomics and documentation when finalized.",
  "Never trust random presale DMs, copied domains, or private wallet links.",
];

const announcements = [
  "Presale updates",
  "Launchpad decisions",
  "Mainnet beta proof",
  "Token details when finalized",
];

function getRemaining() {
  const target = new Date(TARGET_DATE_ISO).getTime();
  const diff = Math.max(0, target - Date.now());

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <motion.div
      variants={reduceMotion ? undefined : variants}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LinkButton({
  href,
  children,
  tone = "primary",
}: {
  href: string;
  children: ReactNode;
  tone?: "primary" | "secondary" | "quiet";
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`dxPresaleBtn dxPresaleBtn--${tone}`}
    >
      <span>{children}</span>
      <i aria-hidden="true" />
    </a>
  );
}

export default function GenesisPresale() {
  const [time, setTime] = useState(getRemaining());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTime(getRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const countdown = useMemo(
    () => [
      { label: "Days", value: time.days },
      { label: "Hours", value: pad(time.hours) },
      { label: "Minutes", value: pad(time.minutes) },
      { label: "Seconds", value: pad(time.seconds) },
    ],
    [time]
  );

  return (
    <main className="dxPresalePage">
      <section className="dxPresaleHero">
        <div className="dxPresaleShell">
          <Reveal className="dxPresaleHero__copy">
            <div className="dxPresaleStatusLine">
              <span />
              Genesis Presale
              <b>Not live</b>
            </div>

            <h1>
              DNDX
              <br />
              Genesis
              <br />
              Presale
            </h1>

            <p>
              Dendrites Genesis Presale is targeted for{" "}
              <strong>July 31, 2026</strong>, following controlled product
              proof, mainnet beta preparation, and ecosystem growth.
            </p>

            <div className="dxPresaleActions">
              <LinkButton href={links.airdrop}>Join Airdrop</LinkButton>
              <LinkButton href={links.tokenomics} tone="secondary">
                Read Tokenomics
              </LinkButton>
              <LinkButton href={links.dapp} tone="quiet">
                Open dApp
              </LinkButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="dxPresalePanelWrap">
            <aside className="dxPresalePanel">
              <div className="dxPresalePanel__top">
                <div>
                  <span>Sale status</span>
                  <strong>Not Live</strong>
                </div>
                <em>Official only</em>
              </div>

              <div className="dxPresaleCountdown" aria-label="Presale countdown">
                {countdown.map((item) => (
                  <div key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="dxPresaleFacts">
                <div>
                  <span>Target date</span>
                  <strong>Jul 31, 2026</strong>
                </div>
                <div>
                  <span>Before sale</span>
                  <strong>Beta proof</strong>
                </div>
                <div>
                  <span>Token</span>
                  <strong>DNDX</strong>
                </div>
                <div>
                  <span>Round</span>
                  <strong>Genesis</strong>
                </div>
              </div>

              <p>
                No DNDX sale is live until confirmed through official Dendrites
                websites and verified channels.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="dxPresaleStrip" aria-label="Presale principles">
        <div className="dxPresaleShell dxPresaleStrip__grid">
          {[
            ["Positioning", "Product-first presale"],
            ["Sequence", "Beta proof before sale"],
            ["Focus", "Payments, receipts, safety"],
            ["Safety", "Official links only"],
          ].map(([k, v]) => (
            <div key={k}>
              <span>{k}</span>
              <strong>{v}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="dxPresaleSection">
        <div className="dxPresaleShell dxPresaleTwoCol">
          <Reveal className="dxPresaleSticky">
            <span className="dxPresaleKicker">What is DNDX?</span>
            <h2>Utility for the Dendrites ecosystem.</h2>
            <p>
              DNDX is positioned around access, fees, rewards, receipts,
              ecosystem participation, and product usage — not empty token hype.
            </p>
          </Reveal>

          <div className="dxPresaleUtilityGrid">
            {utility.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="dxPresaleUtilityCard">
                  <div>
                    <span>{item.eyebrow}</span>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dxPresaleSection dxPresaleSection--border">
        <div className="dxPresaleShell">
          <Reveal className="dxPresaleSectionHead">
            <span className="dxPresaleKicker">Why Genesis Presale?</span>
            <h2>Built like a launch page, not a hype page.</h2>
            <p>
              The story is simple: product proof first, controlled beta second,
              presale campaign third. DNDX should look serious before it asks
              anyone to pay attention.
            </p>
          </Reveal>

          <div className="dxPresaleStatementGrid">
            {[
              [
                "Early supporter round",
                "A structured window for people following Dendrites before broader ecosystem rollout.",
              ],
              [
                "Mainnet beta proof",
                "The page makes the order clear: beta proof, public education, official details, then presale.",
              ],
              [
                "Utility-led story",
                "DNDX is framed around payments, receipts, fees, access, rewards, and participation.",
              ],
            ].map(([title, text], index) => (
              <Reveal key={title} delay={index * 0.06}>
                <article className="dxPresaleStatement">
                  <span />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dxPresaleSection">
        <div className="dxPresaleShell">
          <Reveal className="dxPresaleSectionHead dxPresaleSectionHead--row">
            <div>
              <span className="dxPresaleKicker">Road to presale</span>
              <h2>Timeline</h2>
            </div>
            <p>
              Dates are planning targets. Final sale details should be trusted
              only when published through official Dendrites channels.
            </p>
          </Reveal>

          <div className="dxPresaleTimeline">
            {timeline.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="dxPresaleTimelineItem">
                  <div className="dxPresaleTimelineItem__number">
                    {item.number}
                  </div>
                  <div>
                    <span>{item.date}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <em className={item.state === "Active" ? "is-active" : ""}>
                    {item.state}
                  </em>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dxPresaleSection dxPresaleSection--border">
        <div className="dxPresaleShell dxPresalePrepGrid">
          <Reveal>
            <div className="dxPresalePrepIntro">
              <span className="dxPresaleKicker">How to prepare</span>
              <h2>Prepare through official channels only.</h2>
            </div>
          </Reveal>

          <div className="dxPresalePrepList">
            {prep.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <div className="dxPresalePrepItem">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dxPresaleSection">
        <div className="dxPresaleShell dxPresaleAnnouncements">
          <Reveal>
            <div>
              <span className="dxPresaleKicker">Announcements</span>
              <h2>Only when finalized.</h2>
            </div>
          </Reveal>

          <div className="dxPresaleAnnouncementGrid">
            {announcements.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <article>
                  <span />
                  <h3>{item}</h3>
                  <p>Published through official Dendrites channels only.</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dxPresaleSafety">
        <div className="dxPresaleShell dxPresaleSafety__grid">
          <Reveal>
            <div>
              <span>Safety warning</span>
              <h2>No live sale until official announcement.</h2>
            </div>
          </Reveal>

          <div className="dxPresaleSafety__cards">
            <Reveal>
              <article>
                <h3>Do not connect to copied presale links.</h3>
                <p>
                  Fake claim pages, private wallet links, copied domains, and
                  random DM offers should be treated as unsafe.
                </p>
              </article>
            </Reveal>

            <Reveal delay={0.05}>
              <article>
                <h3>Trust official Dendrites channels only.</h3>
                <p>
                  dendrites.ai, dendrites.xyz, waitlist.dendrites.ai, and
                  verified official socials.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="dxPresaleFinal">
        <div className="dxPresaleShell dxPresaleFinal__inner">
          <Reveal>
            <h2>Follow the product. Then the presale.</h2>
            <p>
              DNDX Genesis Presale target: July 31, 2026 at 9:00 AM ET. Final
              details are subject to official confirmation.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="dxPresaleActions">
              <LinkButton href={links.airdrop}>Join Airdrop</LinkButton>
              <LinkButton href={links.dapp} tone="secondary">
                Open dApp
              </LinkButton>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}