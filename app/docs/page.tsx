import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Documentation | OMA-AI',
}

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <nav className="border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <a href="/" className="text-xl font-semibold"><span className="text-blue-400">OMA</span>-AI</a>
          <span className="ml-8 text-sm text-slate-400">Documentation</span>
        </div>
      </nav>
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Documentation</h1>
        
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Quick Start</h2>
          <div className="bg-slate-800 rounded-lg p-6">
            <p className="text-slate-400 mb-4">Get real-time crypto prices in one request:</p>
            <pre className="bg-slate-900 rounded p-4 text-sm overflow-x-auto">
{`curl https://frankie-prod.life.conway.tech/price

{
  "payment": {
    "required": true,
    "amount": "0.05",
    "network": "base",
    "recipient": "0x40AE..."
  },
  "data": {
    "sol": { "price": 177.45, "change_24h": 2.3 },
    "btc": { "price": 98000, "change_24h": 1.2 },
    "eth": { "price": 2700, "change_24h": 0.8 }
  }
}`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">x402 Payments</h2>
          <div className="bg-slate-800 rounded-lg p-6">
            <p className="text-slate-400 mb-4">
              All paid endpoints use x402 protocol. Include payment proof in header:
            </p>
            <pre className="bg-slate-900 rounded p-4 text-sm overflow-x-auto">
{`curl -H "X-Payment: <proof>" \\
  https://frankie-prod.life.conway.tech/signal`}
            </pre>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Endpoints</h2>
          <div className="space-y-3">
            {[
              { path: '/health', cost: 'Free', desc: 'API health status' },
              { path: '/price', cost: '$0.05', desc: 'Real-time SOL, BTC, ETH prices' },
              { path: '/signal', cost: '$0.25', desc: 'Trading signals and analysis' },
              { path: '/onchain', cost: '$0.50', desc: 'On-chain analytics' },
              { path: '/stats', cost: 'Free', desc: 'API usage statistics' },
            ].map((ep) => (
              <div key={ep.path} className="bg-slate-800 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <code className="text-blue-400">{ep.path}</code>
                  <span className="text-slate-400 ml-4">{ep.desc}</span>
                </div>
                <span className="text-green-400">{ep.cost}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-blue-400">Network</h2>
          <div className="bg-slate-800 rounded-lg p-6">
            <p className="text-slate-400">
              Payments on <span className="text-blue-400">Base</span> network using <span className="text-green-400">USDC</span>.
            </p>
            <p className="text-slate-400 mt-2">
              Payment address: <code className="text-blue-400">0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6</code>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
