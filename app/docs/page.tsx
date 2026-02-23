export const revalidate = 3600; // Revalidate every hour
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | OMA-AI",
  description:
    "Complete documentation for OMA-AI API marketplace. Learn how to integrate x402 micropayments.",
};

export default function DocsPage() {
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
              Documentation
            </span>
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 font-orbitron">
            Documentation
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Learn how to integrate OMA-AI APIs with x402 micropayments
          </p>

          {/* Quick Start */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-400 font-orbitron">
              Quick Start
            </h2>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0a0a15] to-[#050510] border border-white/5">
              <p className="text-gray-300 mb-6">
                Get real-time crypto prices in seconds:
              </p>
              <pre className="p-6 rounded-xl bg-[#050510] border border-white/5 text-sm overflow-x-auto font-mono text-gray-300 mb-4">
                {`# Get crypto prices
curl https://frankie-prod.life.conway.tech/price

# Response
{
  "payment": { "amount": "0.05", "network": "base" },
  "data": {
    "sol": { "price": 177.45, "change_24h": 5.2 },
    "btc": { "price": 98000, "change_24h": 2.1 },
    "eth": { "price": 2700, "change_24h": 3.4 }
  }
}`}
              </pre>
              <p className="text-gray-400 text-sm">
                💡 First request is free! Subsequent requests require x402
                payment
              </p>
            </div>
          </section>

          {/* x402 Payments */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-400 font-orbitron">
              x402 Payments
            </h2>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0a0a15] to-[#050510] border border-white/5">
              <p className="text-gray-300 mb-6">
                Include payment proof in your API requests:
              </p>
              <pre className="p-6 rounded-xl bg-[#050510] border border-white/5 text-sm overflow-x-auto font-mono text-gray-300 mb-6">
                {`# Include x402 payment header
curl -H "X-Payment: <proof>" \\
  https://frankie-prod.life.conway.tech/signal`}
              </pre>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#050510] border border-white/5">
                  <div className="font-semibold text-white mb-2">
                    Payment Network
                  </div>
                  <div className="text-gray-400">Base Mainnet</div>
                </div>
                <div className="p-4 rounded-lg bg-[#050510] border border-white/5">
                  <div className="font-semibold text-white mb-2">
                    Payment Asset
                  </div>
                  <div className="text-gray-400">USDC</div>
                </div>
              </div>
            </div>
          </section>

          {/* Endpoints */}
          <section>
            <h2 className="text-3xl font-bold mb-6 text-blue-400 font-orbitron">
              Available Endpoints
            </h2>
            <div className="space-y-4">
              {[
                {
                  path: "/health",
                  cost: "Free",
                  desc: "Health status and API version",
                },
                {
                  path: "/price",
                  cost: "$0.05",
                  desc: "Real-time crypto prices (SOL, BTC, ETH)",
                },
                {
                  path: "/signal",
                  cost: "$0.25",
                  desc: "AI-powered trading signals",
                },
                {
                  path: "/onchain",
                  cost: "$0.50",
                  desc: "On-chain analytics and metrics",
                },
              ].map((ep, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-[#0a0a15] border border-white/5 hover:border-blue-500/30 transition-all flex justify-between items-center"
                >
                  <div>
                    <code className="text-blue-400 font-mono text-lg mb-2 block">
                      {ep.path}
                    </code>
                    <p className="text-gray-400">{ep.desc}</p>
                  </div>
                  <span className="text-2xl font-bold text-green-400 font-orbitron">
                    {ep.cost}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
