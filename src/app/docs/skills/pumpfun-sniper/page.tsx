'use client';
import Link from 'next/link';

const EXAMPLE_CODE = "// Score a pump.fun token\nconst score = await tool(\"pumpfun-sniper.score_token\", { mint: \"TokenMintAddressHere\" });";

export default function PumpfunSniperDocPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/skills" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 mb-4">&#8592; Back to Skills</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: '#FF69B422', color: '#FF69B4' }}>P</div>
            <div>
              <h1 className="text-3xl font-bold text-white">PumpFun Sniper</h1>
              <span className="text-purple-400 text-sm">Trading</span>
            </div>
          </div>
          <p className="text-zinc-400 text-lg">Score any pump.fun token for snipe safety before buying.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Installation</h2>
            <p className="text-zinc-400 text-sm mb-3">Add this skill to your OpenClaw workspace:</p>
            <code className="block bg-zinc-800 text-emerald-400 text-sm p-3 rounded-lg overflow-x-auto">cp -r ~/skills/pumpfun-sniper ~/.openclaw/workspace/skills/</code>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Configuration</h2>
            <p className="text-zinc-400 text-sm mb-3">Setup required before use:</p>
            <code className="block bg-zinc-800 text-amber-400 text-sm p-3 rounded-lg overflow-x-auto">Configure Helius RPC URL in config.json</code>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Available Tools</h2>
          <div className="grid gap-3">
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">score_token</code><p className="text-zinc-400 text-sm mt-1">Score a pump.fun token contract for snipe safety (0-100)</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">check_rug_risk</code><p className="text-zinc-400 text-sm mt-1">Analyze rug pull risk factors</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">check_liquidity</code><p className="text-zinc-400 text-sm mt-1">Check liquidity lock status and amount</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">check_dev_wallet</code><p className="text-zinc-400 text-sm mt-1">Analyze dev wallet history and behavior</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">check_holders</code><p className="text-zinc-400 text-sm mt-1">Get holder distribution and concentration</p></div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">Example Usage</h2>
          <pre className="bg-zinc-800 text-zinc-300 text-sm p-4 rounded-lg overflow-x-auto"><code>{"{EXAMPLE_CODE}"}</code></pre>
        </div>
        <div className="flex gap-4">
          <Link href="/mcps" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">Browse MCPs</Link>
          <Link href="/skills" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors">All Skills</Link>
        </div>
      </div>
    </div>
  );
}
