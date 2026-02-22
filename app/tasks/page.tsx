import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tasks | OMA-AI',
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
    { name: 'Fetch SOL price', endpoint: '/price', cost: '$0.05' },
    { name: 'Get BTC/ETH prices', endpoint: '/price', cost: '$0.05' },
    { name: 'Trading signal', endpoint: '/signal', cost: '$0.25' },
    { name: 'On-chain analytics', endpoint: '/onchain', cost: '$0.50' },
  ]

  return (
    <main className="min-h-screen bg-[#050510] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050510]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-sm">OMA</span>
            </div>
            <span className="font-semibold">Tasks</span>
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">API Tasks</h1>
          <p className="text-gray-400 mb-8">Execute API calls</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5">
              <div className="text-2xl font-bold text-blue-400">{stats.calls || 0}</div>
              <div className="text-sm text-gray-400">Total Calls</div>
            </div>
            <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5">
              <div className="text-2xl font-bold text-green-400">{stats.realPayments || 0}</div>
              <div className="text-sm text-gray-400">Payments</div>
            </div>
            <div className="p-6 rounded-xl bg-[#0a0a15] border border-white/5">
              <div className="text-2xl font-bold text-yellow-400">${((stats.earnings || 0) / 100).toFixed(2)}</div>
              <div className="text-sm text-gray-400">Revenue</div>
            </div>
          </div>

          <div className="rounded-xl bg-[#0a0a15] border border-white/5 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#050510]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Task</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Endpoint</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Cost</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="px-6 py-4">{task.name}</td>
                    <td className="px-6 py-4"><code className="text-blue-400">{task.endpoint}</code></td>
                    <td className="px-6 py-4 text-green-400">{task.cost}</td>
                    <td className="px-6 py-4">
                      <a href={`${API_BASE}${task.endpoint}`} target="_blank" className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-sm text-white">Execute</a>
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
