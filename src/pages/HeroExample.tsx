import React from 'react';
import HeroShell from '@/components/hero/HeroShell';
import Footer from '@/components/Footer';

/**
 * Example Hero Page
 * 
 * Demonstrates the hero section with:
 * - Hero section at the top
 * - Long scrollable content in the middle
 * - Footer at the bottom (unchanged, separate from hero)
 */

export default function HeroExamplePage() {
  const handleCtaClick = () => {
    console.log('🚀 Full Awakening Experience Started');
    // Your existing BackgroundDnDx logic can be triggered here
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <HeroShell onCtaClick={handleCtaClick} />

      {/* Placeholder Content for Scrolling */}
      <section className="relative py-24 px-4 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Future of Blockchain
            </h2>
            <p className="text-white/60 text-lg max-w-3xl mx-auto">
              DNDX combines predictable gas fees, safe commerce, and advanced
              governance to create a truly decentralized ecosystem.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: 'Predictable Gas',
                description: 'No more surprise transaction costs. Know exactly what you\'ll pay.',
                icon: '⚡',
              },
              {
                title: 'Safe Commerce',
                description: 'Built-in escrow and dispute resolution for secure transactions.',
                icon: '🔒',
              },
              {
                title: 'Governance',
                description: 'Community-driven decisions with transparent voting mechanisms.',
                icon: '🗳️',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg 
                           hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Placeholder long content */}
          <div className="mt-24 space-y-8">
            {[1, 2, 3, 4].map((section) => (
              <div
                key={section}
                className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Section {section}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Unchanged, separate block */}
      <div className="bg-gradient-to-b from-black via-slate-950 to-slate-900 py-12 sm:py-16 md:py-20">
        <Footer />
      </div>
    </div>
  );
}
