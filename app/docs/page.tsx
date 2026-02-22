import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation | OMA-AI',
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-[#050510] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-sm">OMA</span>
            </div>
            <span className="font-semibold">Documentation</span>
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Documentation</h1>

          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Quick Start</h2>
            <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5">
              <p className="text-gray-400 mb-4">Get real-time crypto prices:</p>
              <pre className="p-4 rounded-lg bg-[#050510] text-sm overflow-x-auto font-mono">
{`curl https://frankie-prod.life.conway.tech/price

{
  "payment": { "amount": "0.05", "network": "base" },
  "data": { "sol": { "price": 177.45 } }
}`}
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">x402 Payments</h2>
            <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5">
              <p className="text-gray-400 mb-4">Include payment proof:</p>
              <pre className="p-4 rounded-lg bg-[#050510] text-sm overflow-x-auto font-mono">
curl -H "X-Payment: proof" https://frankie-prod.life.conway.tech/signal
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Endpoints</h2>
            <div className="space-y-3">
              {[
                { path: '/health', cost: 'Free', desc: 'Health status' },
                { path: '/price', cost: '$0.05', desc: 'Crypto prices' },
                { path: '/signal', cost: '$0.25', desc: 'Trading signals' },
                { path: '/onchain', cost: '$0.50', desc: 'On-chain data' },
              ].map((ep) => (
                <div key={ep.path} className="p-4 rounded-xl bg-[#0a0a15] border border-white/5 flex justify-between items-center">
                  <div>
                    <code className="text-blue-400">{ep.path}</code>
                    <span className="text-gray-400 ml-4">{ep.desc}</span>
                  </div>
                  <span className="text-green-400">{ep.cost}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
