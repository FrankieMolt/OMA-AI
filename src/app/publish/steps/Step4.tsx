'use client';

import { DollarSign, Shield, Info } from 'lucide-react';

interface Step4Props {
  globalPricingUsdc: number;
  setGlobalPricingUsdc: (v: number) => void;
  x402Enabled: boolean;
  setX402Enabled: (v: boolean) => void;
}

export function Step4({
  globalPricingUsdc, setGlobalPricingUsdc,
  x402Enabled, setX402Enabled,
}: Step4Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Pricing & Payments</h2>
        <p className="text-gray-400">Set up pricing and payment options</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <label className="block text-sm font-bold text-gray-300">Global Pricing (USDC)</label>
          </div>
          <input aria-label="0.001" type="number" step="0.0001" min="0" placeholder="0.001"
            value={globalPricingUsdc} onChange={(e) => setGlobalPricingUsdc(parseFloat(e.target.value))}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono" />
          <p className="mt-2 text-sm text-gray-400">Default price per API call. Individual tools can override this.</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-violet-400" />
              <div>
                <label className="block text-sm font-bold text-gray-300">Enable x402 Payments</label>
                <p className="text-xs text-gray-400">Gasless microtransactions via x402 protocol</p>
              </div>
            </div>
            <button
              onClick={() => setX402Enabled(!x402Enabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${x402Enabled ? 'bg-violet-600' : 'bg-zinc-700'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${x402Enabled ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          {x402Enabled && (
            <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-violet-200 mb-2">x402 Payment Flow:</p>
                  <ul className="text-sm text-violet-300 space-y-1 list-disc list-inside">
                    <li>5% OMA platform fee</li>
                    <li>95% developer payout</li>
                    <li>Monthly USDC payouts</li>
                    <li>Gasless transactions on Base</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Base Price</span>
            <span className="text-white font-mono">${globalPricingUsdc.toFixed(4)} USDC/call</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">x402 Enabled</span>
            <span className={x402Enabled ? 'text-green-400' : 'text-gray-400'}>{x402Enabled ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
