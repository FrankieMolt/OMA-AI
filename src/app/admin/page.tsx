'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Link import removed - unused
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  FileCheck, 
  Settings, 
  Activity,
  DollarSign,
  Globe,
  Server
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { fetchJson } from '@/lib/utils/fetchJson';

interface Stats {
  totalMcps: number;
  pendingMcps: number;
  totalUsers: number;
  dailyRevenue: number;
  totalPayouts: number;
  activeAgents: number;
}

export default function AdminPortal() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const data = await fetchJson<Stats>('/api/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
    } finally {
      setLoading(false);
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'mcps', label: 'MCP Management', icon: FileCheck },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'system', label: 'System', icon: Server },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400">Manage OMA-AI platform: MCPs, users, revenue, payouts.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <GlassCard className="p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-violet-600 text-white'
                          : 'text-gray-300 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-400">Loading admin data...</p>
              </div>
            ) : stats && activeTab === 'overview' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <StatCard title="Total MCPs" value={stats.totalMcps} icon={ShoppingBag} trend="+12 this week" />
                  <StatCard title="Pending Review" value={stats.pendingMcps} icon={FileCheck} trend="Needs attention" alert={stats.pendingMcps > 0} />
                  <StatCard title="Total Users" value={stats.totalUsers.toLocaleString()} icon={Users} trend="+5% this month" />
                  <StatCard title="Daily Revenue" value={`$${stats.dailyRevenue.toFixed(2)}`} icon={DollarSign} trend="+2.4% vs yesterday" />
                  <StatCard title="Total Payouts" value={`$${stats.totalPayouts.toFixed(2)}`} icon={CreditCard} trend="Paid to publishers" />
                  <StatCard title="Active Agents" value={stats.activeAgents} icon={Globe} trend="Online now" />
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <GlassCard className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-violet-400" />
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                          <div>
                            <p className="text-white font-medium">New MCP submission</p>
                            <p className="text-sm text-gray-400">Example MCP name • 2 hours ago</p>
                          </div>
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/30">
                            Pending
                          </span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-violet-400" />
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition-colors text-left">
                        <p className="text-white font-medium">Approve MCPs</p>
                        <p className="text-sm text-gray-400">Review pending submissions</p>
                      </button>
                      <button className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition-colors text-left">
                        <p className="text-white font-medium">Process Payouts</p>
                        <p className="text-sm text-gray-400">Send USDC to publishers</p>
                      </button>
                      <button className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition-colors text-left">
                        <p className="text-white font-medium">System Health</p>
                        <p className="text-sm text-gray-400">Check all services</p>
                      </button>
                      <button className="p-4 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 transition-colors text-left">
                        <p className="text-white font-medium">Export Data</p>
                        <p className="text-sm text-gray-400">CSV/JSON reports</p>
                      </button>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            ) : (
              <GlassCard className="p-12 text-center">
                <p className="text-gray-400">Tab under construction: {activeTab}</p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatCard({ title, value, icon: Icon, trend, alert }: any) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-full bg-violet-900/50 border border-violet-700/50 flex items-center justify-center">
          <Icon className="w-6 h-6 text-violet-400" />
        </div>
        {alert && (
          <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/30">
            Alert
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-white mb-2">{value}</p>
      {trend && (
        <p className="text-sm text-green-400">{trend}</p>
      )}
    </GlassCard>
  );
}
