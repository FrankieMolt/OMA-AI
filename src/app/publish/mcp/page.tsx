'use client';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

const TRANSPORTS = ['sse', 'websocket', 'stdio'] as const;
const CATEGORIES = ['Blockchain', 'DeFi', 'Developer Tools', 'AI Agents', 'Finance', 'Web', 'Database', 'Commerce', 'Other'];

export default function PublishMCPPage() {
  const [form, setForm] = useState({
    name: '',
    slug: '',
    category: 'Developer Tools',
    description: '',
    author: '',
    mcp_endpoint: '',
    transport: 'sse',
    pricing_usdc: '0',
    x402_enabled: true,
    webhook_url: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; endpoint?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/mcp/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pricing_usdc: parseFloat(form.pricing_usdc) }),
      });
      const data = await res.json();
      if (data.success) {
        setResult({
          success: true,
          message: 'MCP registered successfully!',
          endpoint: `https://www.oma-ai.com/api/mcp/paid/${form.slug}`,
        });
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('Network error — is OMA-AI online?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navigation />
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <div className="mb-10">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 mb-4 inline-block">← Back</Link>
          <h1 className="text-4xl font-bold text-white mb-3">Register your MCP</h1>
          <p className="text-zinc-400">
            Add your MCP server to the OMA-AI marketplace and start earning per-call revenue via x402 USDC payments.
          </p>
        </div>

        {result ? (
          <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30">
            <h2 className="text-xl font-semibold text-green-400 mb-2">✅ {result.message}</h2>
            <p className="text-zinc-400 text-sm mb-4">Your MCP is now listed on OMA-AI.</p>
            <div className="p-3 rounded-lg bg-zinc-900 font-mono text-sm text-zinc-300 mb-4">
              {result.endpoint}
            </div>
            <Link href="/mcps" className="inline-block px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 font-medium">
              View in Marketplace →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                ❌ {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">MCP Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Helius Solana RPC"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Slug * <span className="text-zinc-600 font-normal">(URL path)</span></label>
                <input
                  required
                  value={form.slug}
                  onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                  placeholder="helius-solana"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Category *</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-violet-500 focus:outline-none"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Author / Organization *</label>
                <input
                  required
                  value={form.author}
                  onChange={e => setForm({ ...form, author: e.target.value })}
                  placeholder="Your name or org"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Description *</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Describe what your MCP does and what tools it exposes..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">MCP Endpoint URL *</label>
              <input
                required
                type="url"
                value={form.mcp_endpoint}
                onChange={e => setForm({ ...form, mcp_endpoint: e.target.value })}
                placeholder="https://your-mcp-server.com/mcps"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none"
              />
              <p className="mt-1.5 text-xs text-zinc-500">Must support the MCP JSON-RPC protocol over HTTP</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Transport</label>
                <select
                  value={form.transport}
                  onChange={e => setForm({ ...form, transport: e.target.value as typeof form.transport })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-violet-500 focus:outline-none"
                >
                  {TRANSPORTS.map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Price (USDC per call)</label>
                <input
                  type="number"
                  step="0.000001"
                  min="0"
                  value={form.pricing_usdc}
                  onChange={e => setForm({ ...form, pricing_usdc: e.target.value })}
                  placeholder="0.001"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none"
                />
                <p className="mt-1.5 text-xs text-zinc-500">Set 0 for free MCP</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Webhook (optional)</label>
                <input
                  type="url"
                  value={form.webhook_url}
                  onChange={e => setForm({ ...form, webhook_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <input
                type="checkbox"
                id="x402_enabled"
                checked={form.x402_enabled}
                onChange={e => setForm({ ...form, x402_enabled: e.target.checked })}
                className="w-4 h-4 rounded accent-violet-600"
              />
              <label htmlFor="x402_enabled" className="text-sm text-zinc-300">
                Enable x402 payments — accept USDC per call via x402 on Base network
                <span className="text-zinc-600 ml-2">(recommended — OMA-AI takes 15%)</span>
              </label>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-sm font-semibold text-white mb-2">How OMA-AI routes paid calls</h3>
              <p className="text-zinc-400 text-xs mb-2 font-mono">
                POST https://www.oma-ai.com/api/mcp/paid/{form.slug || '<slug>'}
              </p>
              <p className="text-zinc-500 text-xs">
                OMA-AI validates x402 payment header → if valid, proxies request to your endpoint → you get credited USDC minus 15% fee.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-violet-600 text-white text-lg font-semibold rounded-xl hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Registering...' : 'Register MCP →'}
            </button>

            <p className="text-center text-zinc-600 text-xs">
              By registering you agree to OMA-AI terms. You keep 85% of all revenue.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
