import React from 'react';
import { motion } from 'framer-motion';
import Sparkline from './Sparkline';

interface EnhancedAgentCardProps {
  id: string;
  name: string;
  status: 'alive' | 'dead';
  balance: number;
  dailyRent: number;
  dailyRevenue: number;
  capabilities: string[];
  earningsHistory: number[];
  recentActivity: Array<{ time: string; action: string }>;
  onViewLogs?: () => void;
  onConfigure?: () => void;
  onPause?: () => void;
}

export default function EnhancedAgentCard({
  id,
  name,
  status,
  balance,
  dailyRent,
  dailyRevenue,
  capabilities,
  earningsHistory,
  recentActivity,
  onViewLogs,
  onConfigure,
  onPause
}: EnhancedAgentCardProps) {
  const netDaily = dailyRevenue - dailyRent;
  const isProfitable = netDaily > 0;

  const statusColors = {
    alive: 'from-green-500/20 to-green-600/20 border-green-500',
    dead: 'from-red-500/20 to-red-600/20 border-red-500'
  };

  const statusIcons = {
    alive: '✅',
    dead: '❌'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-6 border-t-4 ${statusColors[status]}`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold">{name}</h3>
            <span className="text-xl">{statusIcons[status]}</span>
          </div>
          <div className="text-gray-400 font-mono text-sm">{id}</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onViewLogs}
            className="btn-secondary px-3 py-2 rounded text-sm hover:bg-white/10"
          >
            📋 Logs
          </button>
          <button
            onClick={onConfigure}
            className="btn-secondary px-3 py-2 rounded text-sm hover:bg-white/10"
          >
            ⚙️ Config
          </button>
          {status === 'alive' && (
            <button
              onClick={onPause}
              className="btn-secondary px-3 py-2 rounded text-sm hover:bg-white/10"
            >
              ⏸️ Pause
            </button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Balance */}
        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-gray-400 text-xs mb-1">Balance</div>
          <div className="text-xl font-mono font-bold text-green-400">
            ${balance.toFixed(2)}
          </div>
        </div>

        {/* Daily Revenue */}
        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-gray-400 text-xs mb-1">Daily Revenue</div>
          <div className="text-xl font-mono font-bold text-blue-400">
            +${dailyRevenue.toFixed(2)}
          </div>
        </div>

        {/* Daily Rent */}
        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-gray-400 text-xs mb-1">Daily Rent</div>
          <div className="text-xl font-mono font-bold text-red-400">
            -${dailyRent.toFixed(2)}
          </div>
        </div>

        {/* Net Daily */}
        <div className={`bg-black/30 rounded-lg p-3 ${isProfitable ? 'border border-green-500/30' : 'border border-red-500/30'}`}>
          <div className="text-gray-400 text-xs mb-1">Net Daily</div>
          <div className={`text-xl font-mono font-bold ${isProfitable ? 'text-green-400' : 'text-red-400'}`}>
            {isProfitable ? '+' : ''}${netDaily.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Earnings Sparkline */}
      <div className="bg-black/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400 text-sm">7-Day Earnings</span>
          <span className="text-purple-400 text-sm font-mono">
            ${earningsHistory.reduce((a, b) => a + b, 0).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Sparkline
            data={earningsHistory}
            color={isProfitable ? '#22c55e' : '#ef4444'}
            width={200}
            height={40}
          />
          <div className="text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-400">▲</span>
              <span>High: ${Math.max(...earningsHistory).toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-red-400">▼</span>
              <span>Low: ${Math.min(...earningsHistory).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="mb-6">
        <div className="text-gray-400 text-sm mb-2">Capabilities</div>
        <div className="flex flex-wrap gap-2">
          {capabilities.length > 0 ? (
            capabilities.map((cap, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs border border-purple-500/30"
              >
                {cap}
              </span>
            ))
          ) : (
            <span className="text-gray-600 italic text-sm">No capabilities installed</span>
          )}
          <button className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30 hover:bg-blue-500/30 transition-colors">
            + Add
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-black/30 rounded-lg p-4">
        <div className="text-gray-400 text-sm mb-3 font-bold">Recent Activity</div>
        <div className="space-y-2 font-mono text-xs">
          {recentActivity.slice(0, 4).map((activity, index) => (
            <div key={index} className="flex items-start gap-2 text-gray-400">
              <span className="text-purple-400">[{activity.time}]</span>
              <span className={activity.action.includes('Error') ? 'text-red-400' : ''}>
                {activity.action}
              </span>
            </div>
          ))}
          {recentActivity.length === 0 && (
            <div className="text-gray-600 italic">No recent activity</div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Status:</span>
          <span className={`px-2 py-1 rounded ${status === 'alive' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {status.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Uptime:</span>
          <span className="text-white font-mono">99.7%</span>
        </div>
      </div>
    </motion.div>
  );
}
