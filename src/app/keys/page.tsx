import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import { Plus, Copy, Trash2, Settings, Clock, Activity } from 'lucide-react';

export const metadata: Metadata = {
  title: 'API Keys - OMA-AI Developer Portal',
  description: 'Manage your OMA-AI API keys for MCP access. Create, rotate, and monitor usage.',
  keywords: ['API Keys', 'Developer Access', 'MCP API'],
};

const apiKeys = [
  { name: 'Production Key', key: 'oma_live_xxxxxxxxxxxx', lastUsed: '2 min ago', calls: 1247, status: 'active' },
  { name: 'Development Key', key: 'oma_test_xxxxxxxxxxxx', lastUsed: '1 hour ago', calls: 89, status: 'active' },
  { name: 'Staging Key', key: 'oma_stag_xxxxxxxxxxxx', lastUsed: 'Never', calls: 0, status: 'inactive' },
];

export default function KeysPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">API Keys</h1>
            <p className="text-gray-400 mt-2">Manage your API keys for OMA-AI MCP access</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Plus className="w-4 h-4" /> Create Key
          </button>
        </div>

        <GlassCard className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Your API Keys</h2>
            <span className="text-gray-400 text-sm">3 of 10 keys used</span>
          </div>
          <div className="space-y-4">
            {apiKeys.map((key, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                <div>
                  <div className="text-white font-medium">{key.name}</div>
                  <code className="text-gray-400 text-sm font-mono">{key.key}</code>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-gray-400 text-sm flex items-center gap-1"><Clock className="w-3 h-3" /> {key.lastUsed}</div>
                    <div className="text-green-400 text-sm">{key.calls} calls</div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${key.status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-zinc-700 text-gray-400'}`}>
                    {key.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-zinc-800 rounded"><Copy className="w-4 h-4 text-gray-400" /></button>
                    <button className="p-2 hover:bg-zinc-800 rounded"><Settings className="w-4 h-4 text-gray-400" /></button>
                    <button className="p-2 hover:bg-zinc-800 rounded"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Usage This Month</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-white">1,336</div>
              <div className="text-gray-400 text-sm">Total Calls</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">847</div>
              <div className="text-gray-400 text-sm">Credits Used</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">$8.47</div>
              <div className="text-gray-400 text-sm">Spend</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">89%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
