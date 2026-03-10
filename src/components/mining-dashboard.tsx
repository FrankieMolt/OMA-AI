import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, DollarSign, Zap, Users, TrendingUp, Clock } from 'lucide-react';

/**
 * OMA-AI Mining Dashboard
 * 
 * Real-time earnings tracker for miners
 */

export default function MiningDashboard() {
  const [stats, setStats] = useState({
    totalCredits: 0,
    todayCredits: 0,
    hourlyRate: 0,
    totalRequests: 0,
    uptime: 0,
    rank: 0,
  });
  
  const [minerStatus, setMinerStatus] = useState('offline');
  const [recentTransactions, setRecentTransactions] = useState([]);
  
  useEffect(() => {
    // Fetch miner stats
    fetchMinerStats();
    
    // Update every 30 seconds
    const interval = setInterval(fetchMinerStats, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const fetchMinerStats = async () => {
    try {
      const response = await fetch('/api/mining/earnings?miner_id=YOUR_MINER_ID');
      const data = await response.json();
      
      if (data.success) {
        setStats({
          totalCredits: data.total_credits,
          todayCredits: data.today_credits || 0,
          hourlyRate: data.hourly_rate || 50,
          totalRequests: data.total_requests,
          uptime: data.uptime || 0,
          rank: data.rank || 0,
        });
        setRecentTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };
  
  const usdValue = (stats.totalCredits * 0.001).toFixed(2);
  
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Mining Dashboard</h1>
        <p className="text-gray-400">Real-time earnings and performance</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-900/50 to-green-800/30 p-6 rounded-xl border border-green-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-400" />
            <span className="text-xs bg-green-700/50 px-2 py-1 rounded">LIVE</span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.totalCredits.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Total Credits Earned</div>
          <div className="text-lg text-green-400 mt-2">${usdValue}</div>
        </motion.div>
        
        {/* Today's Earnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 p-6 rounded-xl border border-blue-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <span className="text-xs bg-blue-700/50 px-2 py-1 rounded">+{stats.hourlyRate}/hr</span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.todayCredits.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Today's Earnings</div>
          <div className="text-sm text-blue-400 mt-2">≈ ${(stats.todayCredits * 0.001).toFixed(3)} today</div>
        </motion.div>
        
        {/* Requests Processed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 p-6 rounded-xl border border-purple-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-purple-400" />
            <span className="text-xs bg-purple-700/50 px-2 py-1 rounded">#{stats.rank}</span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.totalRequests.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Requests Processed</div>
          <div className="text-sm text-purple-400 mt-2">{stats.uptime}% uptime</div>
        </motion.div>
      </div>
      
      {/* Miner Status */}
      <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Miner Status</h2>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${minerStatus === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className={minerStatus === 'active' ? 'text-green-400' : 'text-red-400'}>
              {minerStatus === 'active' ? 'Mining' : 'Offline'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-400">Model</div>
            <div className="font-semibold">Qwen 3.5 4B</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Hardware</div>
            <div className="font-semibold">CPU (4 cores)</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Speed</div>
            <div className="font-semibold">3.2 t/s</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Memory</div>
            <div className="font-semibold">3.5 GB</div>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        
        <div className="space-y-3">
          {recentTransactions.slice(0, 10).map((tx: any, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-yellow-400 mr-3" />
                <div>
                  <div className="font-semibold">{tx.source}</div>
                  <div className="text-xs text-gray-400">{new Date(tx.timestamp).toLocaleString()}</div>
                </div>
              </div>
              <div className={`font-bold ${tx.credits > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {tx.credits > 0 ? '+' : ''}{tx.credits}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Withdraw Button */}
      <div className="mt-8">
        <button
          onClick={() => {/* Open withdrawal modal */}}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-xl transition-all"
        >
          Withdraw to X402/USDC
        </button>
        <p className="text-center text-sm text-gray-400 mt-2">
          Minimum withdrawal: 100 credits ($0.10) • Weekly payouts
        </p>
      </div>
    </div>
  );
}
