'use client';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { Check } from 'lucide-react';

const TRANSPORTS = ['sse', 'websocket', 'stdio'] as const;
const CATEGORIES = ['Blockchain', 'DeFi', 'Developer Tools', 'AI Agents', 'Finance', 'Web', 'Database', 'Commerce', 'Other'];

export default function PublishMCPPage() {
  const [form, setForm] = useState({
    name: '', slug: '', category: 'Developer Tools',
    description: '', author: '', mcp_endpoint: '',
    transport: 'sse', pricing_usdc: '0',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; endpoint?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
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
          message: 'MCP registered! Your endpoint:',
          endpoint: `https://www.oma-ai.com/api/mcp/paid/${form.slug}`,
        });
      } else {
        setError(data.error || 'Registration failed. Is Supabase configured?');
      }
    } catch {
      setError('Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navigation />
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        <Link href="/publish" className="text-sm text-zinc-500 hover:text-zinc-300 mb-4 inline-block">← Back to Publish</Link>
        <h1 className="text-4xl font-bold text-white mb-3">Register Your MCP</h1>
        <p className="text-zinc-400 mb-10">
          Add your MCP to the marketplace. Earn <span className="text-green-400 font-semibold">85%</span> of every call via x402 USDC.
        </p>

        {result ? (
          <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30">
            <h2 className="text-xl font-semibold text-green-400 mb-2">✅ {result.message}</h2>
            <div className="p-3 rounded-lg bg-zinc-900 font-mono text-sm text-zinc-300 mb-4">{result.endpoint}</div>
            <Link href="/mcps" className="inline-block px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 font-medium">
              View in Marketplace →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                ❌ {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">MCP Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Helius Solana RPC"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Slug * <span className="text-zinc-600 font-normal">(URL path)</span></label>
                <input required value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} placeholder="helius-solana"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-violet-500 focus:outline-none">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Author *</label>
                <input required value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} placeholder="Your name or org"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">Description *</label>
              <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="What does your MCP do? What tools does it expose?"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1.5">MCP Endpoint URL *</label>
              <input required type="url" value={form.mcp_endpoint} onChange={e => setForm({ ...form, mcp_endpoint: e.target.value })} placeholder="https://your-mcp-server.com/mcps"
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none" />
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Transport</label>
                <select value={form.transport} onChange={e => setForm({ ...form, transport: e.target.value as typeof form.transport })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white focus:border-violet-500 focus:outline-none">
                  {TRANSPORTS.map(t => <option key={t}>{t.toUpperCase()}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Price (USDC per call)</label>
                <input type="number" step="0.000001" min="0" value={form.pricing_usdc} onChange={e => setForm({ ...form, pricing_usdc: e.target.value })} placeholder="0.001"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:border-violet-500 focus:outline-none" />
                <p className="mt-1 text-xs text-zinc-500">Set 0 for free MCP</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-sm font-semibold text-white mb-1">Your revenue endpoint</h3>
              <p className="text-zinc-400 text-xs font-mono">
                POST https://www.oma-ai.com/api/mcp/paid/{form.slug || '<slug>'}
              </p>
              <p className="text-zinc-500 text-xs mt-1">OMA-AI validates x402 payment → proxies to your endpoint → you keep 85%.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
              {['Free', 'Per-call ($0.001-$1.00)', 'Custom'].map((t, i) => (
                <div key={t} className="flex items-center gap-2 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" /> {t}
                </div>
              ))}
              <div className="md:col-span-3 flex items-center gap-2 text-sm text-green-400 font-semibold">
                <Check className="w-4 h-4" /> You keep 85% of every call
              </div>
            </div>

            <button type="submit" disabled={submitting}
              className="w-full py-4 bg-violet-600 text-white text-lg font-semibold rounded-xl hover:bg-violet-500 disabled:opacity-50 transition-colors">
              {submitting ? 'Registering...' : 'Register MCP →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
