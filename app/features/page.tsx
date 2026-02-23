export const revalidate = 3600; // Revalidate every hour

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | OMA-AI",
  description:
    "Explore the powerful features of OMA-AI marketplace for AI agents.",
};

export default function FeaturesPage() {
  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Instant Micropayments",
      desc: "Pay-per-request with x402 protocol. Automatic settlement on Base network. No subscriptions required.",
      color: "blue",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Real-time Data",
      desc: "Live crypto prices, market signals, and on-chain analytics. Updated every second from Coinbase.",
      color: "green",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Secure & Autonomous",
      desc: "Built on Base network with sovereign architecture. Your agents operate independently with full control.",
      color: "purple",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
          />
        </svg>
      ),
      title: "API Marketplace",
      desc: "Access multiple APIs through a single marketplace. Crypto data, trading signals, on-chain analytics.",
      color: "orange",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      title: "99.9% Uptime",
      desc: "Enterprise-grade reliability with automatic failover. 18+ hours continuous operation.",
      color: "cyan",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      title: "Developer First",
      desc: "Simple REST APIs with instant response times. No complex SDKs required.",
      color: "pink",
    },
  ];

  const colorClasses: Record<string, string> = {
    blue: "from-blue-500/10 to-blue-600/10 text-blue-400 border-blue-500/30",
    green:
      "from-green-500/10 to-green-600/10 text-green-400 border-green-500/30",
    purple:
      "from-purple-500/10 to-purple-600/10 text-purple-400 border-purple-500/30",
    orange:
      "from-orange-500/10 to-orange-600/10 text-orange-400 border-orange-500/30",
    cyan: "from-cyan-500/10 to-cyan-600/10 text-cyan-400 border-cyan-500/30",
    pink: "from-pink-500/10 to-pink-600/10 text-pink-400 border-pink-500/30",
  };

  return (
    <main className="min-h-screen bg-[#050510] text-white font-exo2">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3 text-white cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight font-orbitron">
              Features
            </span>
          </a>
          <a
            href="/api"
            className="px-6 py-2.5 bg-[#22C55E] hover:bg-[#16A34A] rounded-lg text-white font-semibold transition-all cursor-pointer"
          >
            Get Started
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 font-orbitron">
              Powerful Features for
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Agents
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to build, deploy, and monetize autonomous AI
              agents
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl bg-gradient-to-br ${colorClasses[feature.color].split(" ").slice(0, 2).join(" ")} border ${colorClasses[feature.color].split(" ").slice(3).join(" ")} hover:scale-105 transition-all cursor-pointer group`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[feature.color].split(" ").slice(0, 2).join(" ")} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-center">
            <h2 className="text-3xl font-bold mb-4 font-orbitron">
              Ready to Build?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start integrating AI agents with instant micropayments today. No
              credit card required.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/api"
                className="px-8 py-3 bg-[#22C55E] hover:bg-[#16A34A] rounded-xl text-white font-semibold transition-all cursor-pointer"
              >
                View API Reference
              </a>
              <a
                href="/docs"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all cursor-pointer"
              >
                Read Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
