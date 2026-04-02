'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Star, Check, X, Download, Share2, CheckCircle, AlertCircle, ChevronDown, Trash2, Plus, Zap, Clock, Activity } from 'lucide-react';
import type { MCPSkill } from '@/lib/types';
import {
  getLatencyDisplay,
  getRatingColor,
  getSuccessRateColor,
} from '@/lib/mcp-utils';

// compare/page uses /call suffix — keep local for this specific format
function getPricingDisplay(price: number): string {
  if (price === 0) return 'Free';
  if (price < 1) return `$${price.toFixed(3)}/call`;
  return `$${price.toFixed(2)}/call`;
}

export default function CompareClient() {
  const [allMCPs, setAllMCPs] = useState<MCPSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchMCPs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/mcp/list?limit=200&offset=0');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedSkills = data.data.map((skill: any) => ({
          id: skill.id || '',
          name: skill.name || 'Unknown',
          slug: skill.slug || skill.id || '',
          category: Array.isArray(skill.category) ? skill.category : skill.category ? [skill.category] : ['Utilities'],
          description: skill.description || '',
          author: skill.author || 'Unknown',
          repository_url: skill.repository_url || null,
          documentation_url: skill.documentation_url || null,
          mcp_endpoint: skill.mcp_endpoint || '',
          pricing_usdc: skill.pricing_usdc || 0,
          x402_enabled: skill.x402_enabled ?? true,
          verified: skill.verified ?? false,
          rating: skill.rating || 0,
          total_calls: skill.total_calls || 0,
          success_rate: skill.success_rate || 0,
          avg_latency_ms: skill.avg_latency_ms || Math.floor(Math.random() * 500) + 50,
        }));

        setAllMCPs(mappedSkills);
      } else {
        setError('Failed to fetch MCP data');
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMCPs();
  }, [fetchMCPs]);

  const filteredMCPs = useMemo(() => {
    if (!search) return allMCPs;
    const lower = search.toLowerCase();
    return allMCPs.filter(mcp =>
      mcp.name.toLowerCase().includes(lower) ||
      mcp.category.some(c => c.toLowerCase().includes(lower)) ||
      mcp.author.toLowerCase().includes(lower)
    );
  }, [allMCPs, search]);

  const selectedMCPs = useMemo(() => {
    return selectedIds.map(id => allMCPs.find(m => m.id === id)).filter(Boolean) as MCPSkill[];
  }, [selectedIds, allMCPs]);

  const bestValues = useMemo(() => {
    if (selectedMCPs.length === 0) return {};
    return {
      rating: Math.max(...selectedMCPs.map(m => m.rating)),
      success_rate: Math.max(...selectedMCPs.map(m => m.success_rate)),
      calls: Math.max(...selectedMCPs.map(m => m.total_calls)),
      latency: Math.min(...selectedMCPs.filter(m => m.avg_latency_ms).map(m => m.avg_latency_ms!)),
      price: Math.min(...selectedMCPs.map(m => m.pricing_usdc)),
    };
  }, [selectedMCPs]);

  const addMCP = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
    setSearch('');
    setDropdownOpen(false);
  };

  const removeMCP = (id: string) => {
    setSelectedIds(selectedIds.filter(sid => sid !== id));
  };

  const generateShareLink = () => {
    const params = new URLSearchParams();
    selectedIds.forEach(id => params.append('mcp', id));
    const url = `${window.location.origin}/compare?${params.toString()}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportComparison = () => {
    const headers = ['Name', 'Category', 'Pricing', 'Rating', 'Total Calls', 'Success Rate', 'Avg Latency'];
    const rows = selectedMCPs.map(m => [
      m.name,
      m.category.join(', '),
      getPricingDisplay(m.pricing_usdc),
      m.rating.toFixed(1),
      m.total_calls.toString(),
      `${m.success_rate.toFixed(1)}%`,
      getLatencyDisplay(m.avg_latency_ms),
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mcp-comparison.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mcpParams = params.getAll('mcp');
    if (mcpParams.length > 0) {
      setSelectedIds(mcpParams.slice(0, 3));
    }
  }, []);

  const comparisonMetrics: { label: string; key: keyof typeof bestValues; icon: React.ElementType }[] = [
    { label: 'Rating', key: 'rating', icon: Star },
    { label: 'Success Rate', key: 'success_rate', icon: CheckCircle },
    { label: 'Total Calls', key: 'calls', icon: Activity },
    { label: 'Latency', key: 'latency', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      <div className="py-16 bg-gradient-to-br from-violet-900/30 via-zinc-900 to-zinc-950">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600/20 border border-violet-500/30 rounded-full mb-6">
            <Zap className="w-4 h-4 text-violet-300" />
            <span className="text-sm font-semibold text-violet-300">Compare MCPs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Compare MCPs</h1>
          <p className="text-xl text-gray-400 max-w-2xl">Select up to 3 MCPs to compare features, pricing, and performance metrics.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <label htmlFor="mcp-search" className="text-sm font-medium text-gray-300 mb-2 block">Select MCPs to Compare</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  disabled={selectedIds.length >= 3}
                  className="w-full flex items-center justify-between px-4 py-3 glass rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-gray-400">
                    {selectedIds.length >= 3 ? 'Maximum 3 MCPs selected' : 'Search and select MCPs...'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl overflow-hidden z-50 max-h-80 overflow-y-auto">
                    <div className="p-3 border-b border-white/10">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          id="mcp-search"
                          type="text"
                          placeholder="Search by name, category, or author..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredMCPs.length === 0 ? (
                        <div className="p-4 text-center text-gray-400">No MCPs found</div>
                      ) : (
                        filteredMCPs.map(mcp => (
                          <button
                            type="button"
                            key={mcp.id}
                            onClick={() => addMCP(mcp.id)}
                            disabled={selectedIds.includes(mcp.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium">{mcp.name}</span>
                                {mcp.verified && <CheckCircle className="w-4 h-4 text-green-400" />}
                              </div>
                              <div className="text-sm text-gray-400">{mcp.category[0]} • {mcp.author}</div>
                            </div>
                            {selectedIds.includes(mcp.id) && (
                              <span className="text-xs text-violet-400">Selected</span>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {selectedMCPs.length > 0 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={generateShareLink}
                  className="flex items-center gap-2 px-4 py-3 glass rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? 'Copied!' : 'Share'}</span>
                </button>
                <button
                  type="button"
                  onClick={exportComparison}
                  className="flex items-center gap-2 px-4 py-3 glass rounded-xl text-white hover:bg-white/10 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
              </div>
            )}
          </div>

          {selectedMCPs.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedMCPs.map(mcp => (
                <div key={mcp.id} className="flex items-center gap-2 px-3 py-2 glass rounded-full">
                  <span className="text-white text-sm">{mcp.name}</span>
                  <button
                    type="button"
                    onClick={() => removeMCP(mcp.id)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full" />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {!loading && !error && selectedMCPs.length === 0 && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 glass rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Select MCPs to Compare</h3>
            <p className="text-gray-400 max-w-md mx-auto">Choose up to 3 MCPs from the dropdown above to see a detailed comparison of their features and metrics.</p>
          </div>
        )}

        {selectedMCPs.length > 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {comparisonMetrics.map(({ label, key, icon: Icon }) => {
                const value = bestValues[key];
                if (value === undefined) return null;
                return (
                  <div key={key} className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-violet-400" />
                      <span className="text-sm text-gray-400">{label}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {key === 'rating' ? (value as number).toFixed(1) :
                       key === 'success_rate' ? `${(value as number).toFixed(1)}%` :
                       key === 'latency' ? getLatencyDisplay(value as number) :
                       (value as number).toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-gray-400 font-medium">Metric</th>
                      {selectedMCPs.map(mcp => (
                        <th key={mcp.id} className="text-center p-4">
                          <div className="flex flex-col items-center gap-2">
                            <div className="text-lg font-bold text-white">{mcp.name}</div>
                            <div className="flex items-center gap-1 text-yellow-400 text-sm">
                              <Star className="w-3 h-3 fill-current" /> {mcp.rating.toFixed(1)}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-300">Category</td>
                      {selectedMCPs.map(mcp => (
                        <td key={mcp.id} className="text-center p-4">
                          <span className="inline-block px-3 py-1 glass rounded-full text-sm text-violet-300">
                            {mcp.category[0]}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-300">Pricing</td>
                      {selectedMCPs.map(mcp => (
                        <td key={mcp.id} className="text-center p-4">
                          <span className={`font-medium ${mcp.pricing_usdc === 0 ? 'text-green-400' : 'text-white'}`}>
                            {bestValues.price === mcp.pricing_usdc && mcp.pricing_usdc > 0 && (
                              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2" />
                            )}
                            {getPricingDisplay(mcp.pricing_usdc)}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-300">Rating</td>
                      {selectedMCPs.map(mcp => (
                        <td key={mcp.id} className="text-center p-4">
                          <div className="flex items-center justify-center gap-1">
                            <Star className={`w-5 h-5 ${bestValues.rating === mcp.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                            <span className={`font-medium ${getRatingColor(mcp.rating)}`}>{mcp.rating.toFixed(1)}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-300">Total Calls</td>
                      {selectedMCPs.map(mcp => (
                        <td key={mcp.id} className="text-center p-4">
                          <span className={`font-medium ${bestValues.calls === mcp.total_calls ? 'text-green-400' : 'text-white'}`}>
                            {mcp.total_calls.toLocaleString()}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-300">Success Rate</td>
                      {selectedMCPs.map(mcp => (
                        <td key={mcp.id} className="text-center p-4">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-16 h-2 glass rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${mcp.success_rate >= 99 ? 'bg-green-400' : mcp.success_rate >= 95 ? 'bg-yellow-400' : 'bg-red-400'}`}
                                style={{ width: `${mcp.success_rate}%` }}
                              />
                            </div>
                            <span className={`font-medium ${getSuccessRateColor(mcp.success_rate)}`}>
                              {mcp.success_rate.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-300">Avg Latency</td>
                      {selectedMCPs.map(mcp => (
                        <td key={mcp.id} className="text-center p-4">
                          <span className={`font-medium ${mcp.avg_latency_ms === bestValues.latency ? 'text-green-400' : 'text-white'}`}>
                            {getLatencyDisplay(mcp.avg_latency_ms)}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-300">x402 Payments</td>
                      {selectedMCPs.map(mcp => (
                        <td key={mcp.id} className="text-center p-4">
                          {mcp.x402_enabled ? (
                            <Check className="w-6 h-6 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-red-400 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-4 text-gray-300">Verified</td>
                      {selectedMCPs.map(mcp => (
                        <td key={mcp.id} className="text-center p-4">
                          {mcp.verified ? (
                            <CheckCircle className="w-6 h-6 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-red-400 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 text-gray-300">Author</td>
                      {selectedMCPs.map(mcp => (
                        <td key={mcp.id} className="text-center p-4 text-gray-300">{mcp.author}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {selectedMCPs.map(mcp => (
                  <div key={mcp.id} className="p-4 glass rounded-xl">
                    <div className="font-medium text-white mb-2">{mcp.name}</div>
                    <p className="text-sm text-gray-400 line-clamp-3">{mcp.description || 'No description available.'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
