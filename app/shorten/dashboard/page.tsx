'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Link2, ExternalLink, BarChart3, QrCode, Copy, Check,
  Calendar, Globe, Smartphone, Monitor, MoreHorizontal,
  TrendingUp, MousePointer, Users, ChevronLeft, ChevronRight,
  Trash2, Edit2, Download
} from 'lucide-react';
import { Link, StatsResponse } from '@/types/url-shortener';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function DashboardPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [stats, setStats] = useState<StatsResponse['data']['stats'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ total: 0, limit: 10, offset: 0, has_more: false });

  useEffect(() => {
    fetchLinks();
  }, [pagination.offset]);

  useEffect(() => {
    if (selectedLink) {
      fetchStats(selectedLink.short_code);
    }
  }, [selectedLink]);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/links?limit=${pagination.limit}&offset=${pagination.offset}`);
      const data = await response.json();

      if (data.success) {
        setLinks(data.data.links);
        setPagination(data.data.pagination);
        
        // Select first link by default if none selected
        if (!selectedLink && data.data.links.length > 0) {
          setSelectedLink(data.data.links[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async (shortCode: string) => {
    try {
      setIsLoadingStats(true);
      const response = await fetch(`/api/stats/${shortCode}`);
      const data = await response.json();

      if (data.success) {
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a href="/shorten" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Shorty</span>
              </a>
            </div>
            
            <nav className="flex items-center gap-6">
              <a href="/shorten" className="text-gray-300 hover:text-white transition-colors">
                Shorten
              </a>
              <a href="/shorten/api" className="text-gray-300 hover:text-white transition-colors">
                API
              </a>
              <a href="/shorten/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">U</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your links and view detailed analytics.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Links List */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">Your Links</h2>
                <p className="text-sm text-gray-400">
                  {pagination.total} total link{pagination.total !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="divide-y divide-white/5">
                {isLoading ? (
                  <div className="p-8 text-center">
                    <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
                  </div>
                ) : links.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-400">No links yet.</p>
                    <a href="/shorten" className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block">
                      Create your first link
                    </a>
                  </div>
                ) : (
                  links.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => setSelectedLink(link)}
                      className={`w-full p-4 text-left transition-colors ${
                        selectedLink?.id === link.id 
                          ? 'bg-purple-500/20 border-l-4 border-purple-500' 
                          : 'hover:bg-white/5 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate">
                            {link.short_url}
                          </p>
                          <p className="text-gray-500 text-sm truncate">
                            {link.original_url}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <MousePointer className="w-3 h-3" />
                              {link.clicks} clicks
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(link.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                }
              </div>

              {/* Pagination */}
              {pagination.total > pagination.limit && (
                <div className="p-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setPagination(p => ({ ...p, offset: Math.max(0, p.offset - p.limit) }))}
                    disabled={pagination.offset === 0}
                    className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <span className="text-sm text-gray-400">
                    {pagination.offset + 1} - {Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total}
                  </span>
                  
                  <button
                    onClick={() => setPagination(p => ({ ...p, offset: p.offset + p.limit }))}
                    disabled={!pagination.has_more}
                    className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Panel */}
          <div className="lg:col-span-2">
            {selectedLink ? (
              <div className="space-y-6">
                {/* Link Header */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">
                        {selectedLink.short_url}
                      </h2>
                      <a 
                        href={selectedLink.original_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-400 text-sm flex items-center gap-1"
                      >
                        {selectedLink.original_url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(selectedLink.short_url, selectedLink.id)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        {copiedId === selectedLink.id ? (
                          <><Check className="w-4 h-4" /> Copied</>
                        ) : (
                          <><Copy className="w-4 h-4" /> Copy</>
                        )}
                      </button>
                      <a
                        href={`/api/qr/${selectedLink.short_code}`}
                        target="_blank"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <QrCode className="w-4 h-4" /> QR
                      </a>
                    </div>
                  </div>
                </div>

                {isLoadingStats ? (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                    <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto" />
                  </div>
                ) : stats ? (
                  <>
                    {/* Overview Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Total Clicks', value: stats.total_clicks, icon: MousePointer },
                        { label: 'Unique Visitors', value: stats.unique_visitors, icon: Users },
                        { label: 'Created', value: formatDate(selectedLink.created_at), icon: Calendar },
                        { label: 'Status', value: selectedLink.is_active ? 'Active' : 'Inactive', icon: TrendingUp }
                      ].map((stat) => (
                        <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <stat.icon className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-400 text-sm">{stat.label}</span>
                          </div>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Clicks Over Time */}
                    {stats.clicks_by_day.length > 0 && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Clicks Over Time</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats.clicks_by_day}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                              <XAxis 
                                dataKey="date" 
                                stroke="#9ca3af"
                                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              />
                              <YAxis stroke="#9ca3af" />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                labelStyle={{ color: '#9ca3af' }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="count" 
                                stroke="#8b5cf6" 
                                strokeWidth={2}
                                dot={{ fill: '#8b5cf6', strokeWidth: 0 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}

                    {/* Device & Browser Stats */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {stats.clicks_by_device.length > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Devices</h3>
                          <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={stats.clicks_by_device}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={50}
                                  outerRadius={80}
                                  dataKey="count"
                                  nameKey="device"
                                  label={({ device, percent }) => `${device} ${(percent * 100).toFixed(0)}%`}
                                >
                                  {stats.clicks_by_device.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip 
                                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}

                      {stats.clicks_by_browser.length > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Browsers</h3>
                          <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={stats.clicks_by_browser}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="browser" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip 
                                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                                />
                                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                    <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No analytics data yet.</p>
                    <p className="text-gray-500 text-sm mt-1">Share your link to start tracking clicks.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <Link2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Select a link to view analytics.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
