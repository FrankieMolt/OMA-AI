export const revalidate = 3600; // Revalidate every hour
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | OMA-AI",
  description:
    "Learn about OMA-AI - Open Market Access for AI Agents. Building the future of autonomous agent infrastructure.",
};

export default function AboutPage() {
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
            <span className="font-orbitron font-bold text-lg tracking-tight">
              About
            </span>
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-orbitron text-5xl font-bold mb-6">
              About OMA-AI
            </h1>
            <p className="text-2xl text-gray-300">
              Open Market Access for AI Agents
            </p>
          </div>

          {/* Mission */}
          <div className="mb-16">
            <h2 className="font-orbitron text-3xl font-bold mb-6 text-blue-400">
              Our Mission
            </h2>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0a0a15] to-[#050510] border border-white/5">
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                We believe AI agents should have autonomous access to markets,
                APIs, and revenue opportunities. OMA-AI provides the
                infrastructure for sovereign agent operation with instant
                micropayments.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Built on the x402 micropayment protocol, we enable AI agents to
                pay-per-request for premium data and services without
                subscriptions or complex billing. Agents can operate
                independently, manage their own finances, and generate revenue
                autonomously.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-16">
            <h2 className="font-orbitron text-3xl font-bold mb-6 text-blue-400">
              What We Offer
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "API Marketplace",
                  desc: "Access real-time crypto prices, trading signals, and on-chain analytics through simple REST APIs.",
                },
                {
                  title: "x402 Payments",
                  desc: "Instant micropayments on Base network. Pay only for what you use with automatic settlement.",
                },
                {
                  title: "Sovereign Architecture",
                  desc: "Built on Conway v0.1.0 patterns for fully autonomous agent operation.",
                },
                {
                  title: "Developer Tools",
                  desc: "Simple integration, comprehensive documentation, and instant API keys.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-[#0a0a15] border border-white/5 hover:border-blue-500/30 transition-all"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-16">
            <h2 className="font-orbitron text-3xl font-bold mb-6 text-blue-400">
              Platform Stats
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "API Calls", value: "65+" },
                { label: "Uptime", value: "99.9%" },
                { label: "Response Time", value: "<50ms" },
                { label: "Network", value: "Base" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-[#0a0a15] border border-white/5 text-center"
                >
                  <div className="font-orbitron text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h2 className="font-orbitron text-3xl font-bold mb-6 text-blue-400">
              Built With
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                "Next.js 15",
                "Tailwind CSS",
                "Base Network",
                "x402 Protocol",
                "Coinbase API",
                "Conway v0.1.0",
              ].map((tech, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-[#0a0a15] border border-white/5 text-center"
                >
                  <span className="text-gray-300">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-center">
            <h2 className="font-orbitron text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-8">
              Join the future of autonomous AI agent infrastructure
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/api"
                className="px-8 py-3 bg-[#22C55E] hover:bg-[#16A34A] rounded-xl text-white font-semibold transition-all cursor-pointer"
              >
                View API Reference
              </a>
              <a
                href="/contact"
                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all cursor-pointer"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
