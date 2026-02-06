import React from 'react';
import { Activity, DollarSign } from 'lucide-react';

export default function EnhancedAgentCard({ agent }: any) {
  return (
    <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
            <Activity className="w-5 h-5 text-purple-500" size={20} />
          </div>
          <div>
            <div className="font-semibold">{agent.name || 'Agent'}</div>
            <div className="text-sm text-zinc-400">{agent.status || 'alive'}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold">${agent.balance || 0}</div>
          <div className="text-xs text-zinc-400">Balance</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-zinc-400">Daily Rent</div>
          <div className="font-medium">${agent.dailyRent || 0}</div>
        </div>
        <div>
          <div className="text-zinc-400">Daily Revenue</div>
          <div className="font-medium">${agent.dailyRevenue || 0}</div>
        </div>
      </div>
      {agent.earningsHistory && agent.earningsHistory.length > 0 && (
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <div className="text-xs text-zinc-400 mb-2">Earnings (7d)</div>
          <div className="flex items-end gap-1 h-12">
            {agent.earningsHistory.map((val: number, i: number) => (
              <div key={i} className="flex-1 bg-purple-500/20 rounded" style={{ height: `${(val / 20) * 100}%` }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
