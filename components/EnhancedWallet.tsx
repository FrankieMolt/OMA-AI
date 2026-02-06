import React from 'react';
import { Shield } from 'lucide-react';

export default function EnhancedWallet({ balances, transactions }: any) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="text-zinc-400 text-sm mb-1">USDC</div>
          <div className="text-2xl font-bold">${balances?.usdc || 0}</div>
        </div>
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="text-zinc-400 text-sm mb-1">ETH</div>
          <div className="text-2xl font-bold">{balances?.eth || 0}</div>
        </div>
        <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
          <div className="text-zinc-400 text-sm mb-1">SOL</div>
          <div className="text-2xl font-bold">{balances?.sol || 0}</div>
        </div>
      </div>
    </div>
  );
}
