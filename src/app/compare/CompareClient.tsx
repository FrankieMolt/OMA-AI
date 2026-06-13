'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Star, Check, X, Download, Share2, CheckCircle, AlertCircle, ChevronDown, Trash2, Plus, Zap, Clock, Activity } from 'lucide-react';
import type { MCPSkill } from '@/lib/types';
import {
  getLatencyDisplay,
  getRatingColor,
  getSuccessRateColor,
} from '@/lib/mcp-utils';
import { useCompare } from '@/stores/compare-store';

function getPricingDisplay(price: number): string {
  if (price === 0) return 'Free';
  if (price < 1) return `$${price.toFixed(3)}/call`;
  return `$${price.toFixed(2)}/call`;
}

export default function CompareClient() {
  const [allMCPs, setAllMCPs] = useState<MCPSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { items: compareItems, add: addToCompare, remove: removeFromCompare, clear: clearCompare } = useCompare();

  const fetchMCPs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/mcp/list?limit=200&offset=0');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const json = await response.json();
      const data = Array.isArray(json.data) ? json.data : [];
      setAllMCPs(data.map((skill: Record<string, unknown>) => ({
        id: String(skill.id ?? ''),
        name: String(skill.name ?? 'Unknown'),
        slug: String(skill.slug ?? skill.id ?? ''),
        category: Array.isArray(skill.category) ? skill.category : skill.category ? [skill.category as string] : ['Utilities'],
        description: String(skill.description ?? ''),
        author: String(skill.author ?? 'Unknown'),
        repository_url: (skill.repository_url as string) || null,
        documentation_url: (skill.documentation_url as string) || null,
        mcp_endpoint: String(skill.mcp_endpoint ?? ''),
        pricing_usdc: Number(skill.pricing_usdc ?? 0),
        x402_enabled: Boolean(skill.x402_enabled ?? true),
        verified: Boolean(skill.verified ?? false),
        rating: Number(skill.rating ?? 0),
        total_calls: Number(skill.total_calls ?? 0),
        success_rate: Number(skill.success_rate ?? 0),
        tier: (skill.tier as 'free' | 'premium') || 'free',
        color: (skill.color as string) || undefined,
        created_at: (skill.created_at as string) || undefined,
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load MCPs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMCPs(); }, [fetchMCPs]);

  const filteredMCPs = useMemo(() => {
    if (!search) return allMCPs;
    const q = search.toLowerCase();
    return allMCPs.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.category.some((c) => c.toLowerCase().includes(q))
    );
  }, [allMCPs, search]);

  const rows = useMemo(() => {
    const r: Array<{ label: string; key: keyof MCPSkill | 'pricing_display'; compareFn: (m: MCPSkill) => React.ReactNode }> = [
      { label: 'Category', key: 'category', compareFn: (m) => m.category.join(', ') },
      { label: 'Author', key: 'author', compareFn: (m) => m.author },
      { label: 'Pricing', key: 'pricing_display', compareFn: (m) => <span className={m.pricing_usdc === 0 ? 'text-green-400' : 'text-amber-400'}>{getPricingDisplay(m.pricing_usdc)}</span> },
      { label: 'x402', key: 'x402_enabled', compareFn: (m) => m.x402_enabled ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : <span className="text-gray-600">—</span> },
      { label: 'Rating', key: 'rating', compareFn: (m) => <span className={getRatingColor(m.rating)}>{m.rating > 0 ? `${m.rating}★` : '—'}</span> },
      { label: 'Total Calls', key: 'total_calls', compareFn: (m) => m.total_calls > 0 ? m.total_calls.toLocaleString() : '—' },
      { label: 'Success Rate', key: 'success_rate', compareFn: (m) => m.success_rate > 0 ? (() => { const c = getSuccessRateColor(m.success_rate); return <span className={c.text}>{m.success_rate}%</span>; })() : '—' },
      { label: 'Verified', key: 'verified', compareFn: (m) => m.verified ? <Check className="w-5 h-5 text-violet-400 mx-auto" /> : <X className="w-5 h-5 text-gray-600 mx-auto" /> },
      { label: 'Tools', key: 'tools', compareFn: (m) => m.tools?.length || '—' },
    ];
    return r;
  }, []);

  const handleAddAll = useCallback((mcp: MCPSkill) => {
    if (!compareItems.some((c) => c.id === mcp.id)) addToCompare(mcp);
  }, [compareItems, addToCompare]);

  const handleCopy = useCallback(() => {
    if (!compareItems.length) return;
    const config = {
      mcpServers: Object.fromEntries(
        compareItems.map((c) => [
          c.slug,
          { command: 'npx', args: ['@oma-ai', c.slug] },
        ])
      ),
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [compareItems]);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 flex items-center justify-center">
      <div className="text-zinc-400">Loading MCPs...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 flex items-center justify-center">
      <div className="text-red-400">{error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Compare MCP Tools</h1>
            <p className="text-zinc-400 mt-2">Side-by-side comparison of selected tools</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={clearCompare} className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-zinc-700 rounded-lg transition-colors">Clear all</button>
            <button onClick={handleCopy} disabled={compareItems.length === 0} className="px-4 py-2 text-sm bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy config'}
            </button>
          </div>
        </div>

        {/* Selected MCPs */}
        {compareItems.length > 0 ? (
          <div className="mb-8">
            <div className="flex flex-col gap-4">
              {compareItems.map((item) => (
                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white">{item.name}</h2>
                      <p className="text-zinc-400 text-sm mt-1">{item.category.join(', ')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${item.pricing_usdc === 0 ? 'text-green-400' : 'text-amber-400'}`}>{getPricingDisplay(item.pricing_usdc)}</div>
                        <div className="text-zinc-500 text-xs capitalize">{item.tier}</div>
                      </div>
                      <button onClick={() => removeFromCompare(item.id)} className="p-2 text-gray-500 hover:text-red-400 transition-colors"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center mb-8">
            <p className="text-zinc-400">No MCPs selected. Browse the <a href="/mcps" className="text-violet-400 hover:underline">marketplace</a> to add tools to compare.</p>
          </div>
        )}

        {/* Comparison Table */}
        {compareItems.length >= 2 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="p-4 text-zinc-400 text-sm font-medium w-40 sticky left-0 bg-zinc-900">Property</th>
                    {compareItems.map((item) => (
                      <th key={item.id} className="p-4 text-white font-semibold min-w-48">{item.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50">
                      <td className="p-4 text-zinc-400 text-sm font-medium sticky left-0 bg-zinc-900">{row.label}</td>
                      {compareItems.map((item) => {
                        const mcp = allMCPs.find((m) => m.id === item.id);
                        return (
                          <td key={item.id} className="p-4 text-white text-sm">
                            {mcp ? row.compareFn(mcp) : '—'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add more MCPs */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Add more MCPs</h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search MCPs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
            {filteredMCPs
              .filter((m) => !compareItems.some((c) => c.id === m.id))
              .slice(0, 20)
              .map((mcp) => (
                <div key={mcp.id} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                  <div>
                    <div className="text-white text-sm font-medium">{mcp.name}</div>
                    <div className="text-zinc-500 text-xs">{mcp.category.join(', ')}</div>
                  </div>
                  <button onClick={() => handleAddAll(mcp)} className="px-3 py-1.5 text-xs bg-violet-600 hover:bg-violet-700 text-white rounded-lg flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Compare
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
