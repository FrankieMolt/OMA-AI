export const revalidate = 3600; // Revalidate every hour

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | OMA-AI",
  description:
    "Simple, transparent pricing for OMA-AI marketplace. Pay per request with instant micropayments.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      desc: "Perfect for testing and development",
      features: [
        "100 free API calls/month",
        "Health & status endpoints",
        "Community support",
        "Basic documentation access",
      ],
      cta: "Get Started",
      ctaLink: "/api",
      popular: false,
      color: "gray",
    },
    {
      name: "Pay As You Go",
      price: "$0.05",
      period: "per request",
      desc: "For production AI agents",
      features: [
        "Unlimited API calls",
        "All premium endpoints",
        "Real-time crypto data",
        "Trading signals",
        "On-chain analytics",
        "Priority support",
        "99.9% uptime SLA",
      ],
      cta: "Start Building",
      ctaLink: "/api",
      popular: true,
      color: "green",
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      desc: "For large-scale deployments",
      features: [
        "Volume discounts",
        "Custom integrations",
        "Dedicated support",
        "Private endpoints",
        "SLA guarantees",
        "Priority feature requests",
      ],
      cta: "Contact Sales",
      ctaLink: "/contact",
      popular: false,
      color: "purple",
    },
  ];

  const apis = [
    { name: "Health Check", endpoint: "/health", price: "Free" },
    { name: "Crypto Prices", endpoint: "/price", price: "$0.05" },
    { name: "Trading Signals", endpoint: "/signal", price: "$0.25" },
    { name: "On-Chain Data", endpoint: "/onchain", price: "$0.50" },
  ];

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
              Pricing
            </span>
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 font-orbitron">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Pay only for what you use. No subscriptions, no hidden fees.
              Instant micropayments on Base network.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl ${
                  plan.popular
                    ? "bg-gradient-to-br from-green-500/10 to-green-600/10 border-2 border-green-500/50 shadow-xl shadow-green-500/20"
                    : "bg-[#0a0a15] border border-white/5"
                } hover:scale-105 transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-green-500 rounded-full text-sm font-bold text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold font-orbitron">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.ctaLink}
                  className={`block w-full py-3 rounded-xl text-center font-semibold transition-all cursor-pointer ${
                    plan.popular
                      ? "bg-[#22C55E] hover:bg-[#16A34A] text-white"
                      : "bg-white/5 hover:bg-white/10 border border-white/20 text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          {/* API Pricing Table */}
          <div className="rounded-2xl bg-[#0a0a15] border border-white/5 overflow-hidden mb-16">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-3xl font-bold font-orbitron">API Pricing</h2>
              <p className="text-gray-400 mt-2">
                Pay per request with instant settlement
              </p>
            </div>
            <table className="w-full">
              <thead className="bg-[#050510]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                    API Endpoint
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                    Description
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {apis.map((api, i) => (
                  <tr
                    key={i}
                    className="border-t border-white/5 hover:bg-[#050510] transition-colors"
                  >
                    <td className="px-6 py-5">
                      <code className="text-blue-400 font-mono">
                        {api.endpoint}
                      </code>
                    </td>
                    <td className="px-6 py-5 text-gray-300">{api.name}</td>
                    <td className="px-6 py-5 text-green-400 font-bold text-lg">
                      {api.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FAQ */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "What is x402?",
                a: "x402 is a micropayment protocol that enables instant, per-request payments on blockchain networks.",
              },
              {
                q: "How do I pay?",
                a: "Payments are automatic via USDC on Base network. Just include your payment proof in the API request header.",
              },
              {
                q: "Is there a free tier?",
                a: "Yes! Get 100 free API calls per month. Health and stats endpoints are always free.",
              },
              {
                q: "What networks are supported?",
                a: "Currently Base mainnet. More networks coming soon.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#0a0a15] border border-white/5"
              >
                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
