'use client';
import Link from 'next/link';

const EXAMPLE_CODE = "// Create a new EVM wallet\nconst wallet = await tool(\"evm-wallet.create_wallet\", {});";

export default function EvmWalletDocPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/skills" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 mb-4">&#8592; Back to Skills</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: '#627EEA22', color: '#627EEA' }}>E</div>
            <div>
              <h1 className="text-3xl font-bold text-white">EVM Wallet</h1>
              <span className="text-purple-400 text-sm">Wallet</span>
            </div>
          </div>
          <p className="text-zinc-400 text-lg">Self-sovereign EVM wallet for AI agents.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Installation</h2>
            <p className="text-zinc-400 text-sm mb-3">Add this skill to your OpenClaw workspace:</p>
            <code className="block bg-zinc-800 text-emerald-400 text-sm p-3 rounded-lg overflow-x-auto">cp -r ~/skills/evm-wallet ~/.openclaw/workspace/skills/</code>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Configuration</h2>
            <p className="text-zinc-400 text-sm mb-3">Setup required before use:</p>
            <code className="block bg-zinc-800 text-amber-400 text-sm p-3 rounded-lg overflow-x-auto">Configure RPC URLs for chains.</code>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Available Tools</h2>
          <div className="grid gap-3">
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">create_wallet</code><p className="text-zinc-400 text-sm mt-1">Generate a new EVM wallet</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">get_balance</code><p className="text-zinc-400 text-sm mt-1">Get ETH and ERC20 balances</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">send_eth</code><p className="text-zinc-400 text-sm mt-1">Send ETH to any address</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">send_erc20</code><p className="text-zinc-400 text-sm mt-1">Send any ERC20 token</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">swap_tokens</code><p className="text-zinc-400 text-sm mt-1">Swap tokens via 1inch</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">call_contract</code><p className="text-zinc-400 text-sm mt-1">Call a read function on any contract</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">broadcast_tx</code><p className="text-zinc-400 text-sm mt-1">Broadcast a signed transaction</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">sign_message</code><p className="text-zinc-400 text-sm mt-1">Sign a message with EIP-191</p></div>
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
