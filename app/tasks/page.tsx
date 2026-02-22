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
    return { calls: 0, realPayments: 0 }
  }
}

export default async function TasksPage() {
  const stats = await getStats()

  const tasks = [
    { id: 1, name: 'Fetch SOL price', endpoint: '/price', cost: '$0.05', status: 'available' },
    { id: 2, name: 'Get BTC/ETH prices', endpoint: '/price', cost: '$0.05', status: 'available' },
    { id: 3, name: 'Trading signal', endpoint: '/signal', cost: '$0.25', status: 'available' },
    { id: 4, name: 'On-chain analytics', endpoint: '/onchain', cost: '$0.50', status: 'available' },
    { id: 5, name: 'Premium analysis', endpoint: '/premium', cost: '$5.00', status: 'available' },
  ]

  return (
    <main className="min-h-screen bg-[var(--bg-ultra-dark)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[var(--bg-ultra-dark)]/80 border-b border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">OMA</span>
            </div>
            <span className="font-semibold text-[var(--text-primary)]">OMA-AI</span>
          </a>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">API Tasks</h1>
          <p className="text-[var(--text-secondary)] mb-8">Execute API tasks and get real data.</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="glass-card">
              <div className="text-2xl font-bold text-[var(--color-primary)]">{stats.calls || 0}</div>
              <div className="text-sm text-[var(--text-secondary)]">Total Calls</div>
            </div>
            <div className="glass-card">
              <div className="text-2xl font-bold text-[var(--color-accent)]">{stats.realPayments || 0}</div>
              <div className="text-sm text-[var(--text-secondary)]">Payments</div>
            </div>
            <div className="glass-card">
              <div className="text-2xl font-bold text-yellow-400">${((stats.earnings || 0) / 100).toFixed(2)}</div>
              <div className="text-sm text-[var(--text-secondary)]">Earnings</div>
            </div>
          </div>

          {/* Tasks */}
          <div className="glass-card overflow-hidden p-0">
            <table className="w-full">
              <thead className="bg-[var(--bg-elevated)]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Task</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Endpoint</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Cost</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-t border-[var(--border-default)] hover:bg-[var(--bg-elevated)]/50 transition-colors">
                    <td className="px-6 py-4">{task.name}</td>
                    <td className="px-6 py-4">
                      <code className="text-[var(--color-primary-light)]">{task.endpoint}</code>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[var(--color-accent)] font-semibold">{task.cost}</span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`${API_BASE}${task.endpoint}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary text-sm"
                      >
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
