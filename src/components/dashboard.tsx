'use client';

import { motion } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  DollarSign, 
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const usageData = [
  { date: 'Mar 1', requests: 45, tokens: 12500, cost: 0.35 },
  { date: 'Mar 2', requests: 52, tokens: 14300, cost: 0.42 },
  { date: 'Mar 3', requests: 48, tokens: 11800, cost: 0.38 },
];

const recentActivity = [
  { type: 'llm', model: 'DeepSeek V3.2', tokens: 450, cost: 0.0045, time: '2 min ago' },
  { type: 'search', query: 'latest AI news', cost: 0.005, time: '5 min ago' },
  { type: 'llm', model: 'Claude Opus 4.6', tokens: 1200, cost: 0.052, time: '12 min ago' },
  { type: 'weather', location: 'San Francisco', cost: 0.002, time: '1 hour ago' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <span className="text-xs text-green-500 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              +12%
            </span>
          </div>
          <div className="text-2xl font-bold">1,247</div>
          <div className="text-sm text-muted-foreground">Total Requests</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-green-500 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              +8%
            </span>
          </div>
          <div className="text-2xl font-bold">324K</div>
          <div className="text-sm text-muted-foreground">Tokens Used</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span className="text-xs text-red-500 flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3" />
              -3%
            </span>
          </div>
          <div className="text-2xl font-bold">$12.47</div>
          <div className="text-sm text-muted-foreground">Total Spent</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <Coins className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold">$87.53</div>
          <div className="text-sm text-muted-foreground">Balance</div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <h3 className="font-semibold mb-4">API Requests</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="requests" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl bg-card border border-border"
        >
          <h3 className="font-semibold mb-4">Token Usage</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #333',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="tokens" 
                stroke="#82ca9d" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Activity</h3>
          <button className="text-sm text-primary hover:underline">View All</button>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  activity.type === 'llm' && "bg-purple-500/20",
                  activity.type === 'search' && "bg-blue-500/20",
                  activity.type === 'weather' && "bg-green-500/20"
                )}>
                  <Activity className={cn(
                    "w-5 h-5",
                    activity.type === 'llm' && "text-purple-500",
                    activity.type === 'search' && "text-blue-500",
                    activity.type === 'weather' && "text-green-500"
                  )} />
                </div>
                <div>
                  <div className="font-medium text-sm">
                    {activity.type === 'llm' && activity.model}
                    {activity.type === 'search' && `Search: "${activity.query}"`}
                    {activity.type === 'weather' && `Weather: ${activity.location}`}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.tokens && `${activity.tokens} tokens • `}
                    {activity.time}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm">${activity.cost.toFixed(4)}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
