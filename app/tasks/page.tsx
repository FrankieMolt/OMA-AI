import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Tasks | OMA-AI',
  description: 'Execute API tasks and view usage statistics for OMA-AI marketplace.',
}

const API_BASE = 'https://frankie-prod.life.conway.tech'

async function getStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`, { cache: 'no-store' })
    return res.json()
  } catch {
    return { calls: 0 }
  }
}

export default async function TasksPage() {
  const stats = await getStats()
  
  const tasks = [
    { name: 'Fetch SOL Price', endpoint: '/price', cost: '$0.05', desc: 'Get real-time Solana price' },
    { name: 'Get BTC/ETH Prices', endpoint: '/price', cost: '$0.05', desc: 'Bitcoin and Ethereum prices' },
    { name: 'Trading Signal', endpoint: '/signal', cost: '$0.25', desc: 'AI-powered market signal' },
    { name: 'On-Chain Analytics', endpoint: '/onchain', cost: '$0.50', desc: 'Blockchain metrics and data' },
  ]

  return (
    <main className="min-h-screen bg-[#050510] text-white font-exo2">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 text-white cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight font-orbitron">Tasks</span>
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 font-orbitron">
            API Tasks
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Execute API calls and monitor usage
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Calls', value: stats.calls || 0, color: 'blue' },
              { label: 'Payments', value: stats.realPayments || 0, color: 'green' },
              { label: 'Revenue', value: `$${((stats.earnings || 0) / 100).toFixed(2)}`, color: 'yellow' },
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gradient-to-br from-[#0a0a15] to-[#050510] border border-white/5">
                <div className="text-gray-400 text-sm mb-2">{stat.label}</div>
                <div className={`font-orbitron text-5xl font-bold ${
                  stat.color === 'blue' ? 'text-blue-400' :
                  stat.color === 'green' ? 'text-green-400' :
                  'text-yellow-400'
                }`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tasks Table */}
          <div className="rounded-2xl bg-[#0a0a15] border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-2xl font-bold font-orbitron">Execute Tasks</h2>
            </div>
            <table className="w-full">
              <thead className="bg-[#050510]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Task</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Endpoint</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Description</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Cost</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, i) => (
                  <tr key={i} className="border-t border-white/5 hover:bg-[#050510] transition-colors">
                    <td className="px-6 py-5 font-semibold text-white">{task.name}</td>
                    <td className="px-6 py-5">
                      <code className="text-blue-400 font-mono text-sm">{task.endpoint}</code>
                    </td>
                    <td className="px-6 py-5 text-gray-400">{task.desc}</td>
                    <td className="px-6 py-5 text-green-400 font-semibold">{task.cost}</td>
                    <td className="px-6 py-5">
                      <a href={`${API_BASE}${task.endpoint}`} target="_blank" className="px-6 py-2.5 bg-[#22C55E] hover:bg-[#16A34A] rounded-lg text-white font-semibold transition-all hover:shadow-lg hover:shadow-green-500/30 cursor-pointer inline-block">
                        Execute
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
