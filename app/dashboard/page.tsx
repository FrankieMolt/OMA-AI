import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your APIs, view analytics, and track earnings on the OMA-AI platform.',
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">Total Compute Requests</h3>
            <p className="text-3xl font-bold text-white">124,592</p>
            <span className="text-sm text-green-500 mt-2 block">+14% this week</span>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">API Credits Remaining</h3>
            <p className="text-3xl font-bold text-white">8,430</p>
            <span className="text-sm text-yellow-500 mt-2 block">Low balance warning</span>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <h3 className="text-sm font-medium text-zinc-400 mb-2">x402 Earnings</h3>
            <p className="text-3xl font-bold text-white">$45.20</p>
            <span className="text-sm text-green-500 mt-2 block">Available to withdraw</span>
          </div>
        </div>
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl min-h-[400px] flex items-center justify-center">
          <p className="text-zinc-500">Connect your wallet to view detailed charts and manage active MCP connections.</p>
        </div>
      </div>
    </main>
  );
}
