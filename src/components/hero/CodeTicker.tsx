import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CodeTicker Component
 * 
 * Displays a vertical marquee of blockchain/smart contract code snippets.
 * Pauses on hover for accessibility.
 * Respects prefers-reduced-motion for accessibility.
 */

const dummyCodeLines = [
  'const blockchain = new Blockchain();',
  'await contract.deploy({ gas: predictableGas });',
  'transaction.status = "PENDING";',
  'consensus.validate(block, validators);',
  'merkleTree.addLeaf(txHash);',
  'router.swap(pathArray);',
  'governance.propose(upgrade);',
  'pool.addLiquidity(tokenA, tokenB);',
  'bridge.transfer(tokens, L2);',
  'nft.transfer(from, to, tokenId);',
  'validator.stake(amount);',
  'escrow.adaptive = true;',
  'ledger.sync(baseNetwork);',
  'token.mint(address, value);',
  'quickPay.execute(amount, recipient);',
  'oracle.fetchPrice("ETH/USD");',
  'sla.credits += calculateReward();',
  'network.broadcast(transaction);',
  'await contract.deploy({ gas: predictableGas });',
  'const hash = keccak256(data);',
];

interface CodeTickerProps {
  maxHeight?: number;
}

export default function CodeTicker({ maxHeight }: CodeTickerProps) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Double the array for seamless loop
  const doubledLines = [...dummyCodeLines, ...dummyCodeLines];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black/40 backdrop-blur-sm border-l border-white/10"
      style={{ height: maxHeight ? `${maxHeight}px` : '100%' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Running code demonstration"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] font-mono text-white/60 uppercase tracking-wider">
            Running Dummy Code
          </span>
        </div>
      </div>

      {/* Scrolling Code Container */}
      <div className="pt-12 h-full overflow-hidden">
        <motion.div
          className="space-y-1"
          animate={
            isPaused || prefersReducedMotion
              ? { y: 0 }
              : { y: [0, -(doubledLines.length / 2) * 24] }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: doubledLines.length * 2,
                  ease: 'linear',
                  repeat: Infinity,
                }
          }
        >
          {doubledLines.map((line, idx) => (
            <motion.div
              key={idx}
              className="px-4 font-mono text-xs text-green-400/80 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 3,
                delay: idx * 0.1,
                repeat: Infinity,
              }}
            >
              {line}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient fades at top and bottom */}
      <div className="absolute top-12 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Pause indicator */}
      {isPaused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20"
        >
          <span className="text-xs font-mono text-white/80">PAUSED</span>
        </motion.div>
      )}
    </div>
  );
}
