'use client';

import { useEffect, useState } from 'react';

interface Stats {
  activeAgents: number;
  apisListed: number;
  developerEarnings: number;
  totalInvocations: number;
}

export function LiveStats() {
  const [stats, setStats] = useState<Stats>({
    activeAgents: 0,
    apisListed: 0,
    developerEarnings: 0,
    totalInvocations: 0
  });

  useEffect(() => {
    // Simulated stats - in production, fetch from Supabase
    const updateStats = () => {
      setStats({
        activeAgents: Math.floor(1200 + Math.random() * 100),
        apisListed: 847,
        developerEarnings: 3400000 + Math.floor(Math.random() * 50000),
        totalInvocations: 24000000 + Math.floor(Math.random() * 100000)
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) => (
    <div className="glass-card p-6 text-center hover:border-purple-500/50 transition-all">
      <div className="text-4xl font-black gradient-text mb-2">
        {value.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-zinc-500 uppercase tracking-wider">{label}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      <StatCard label="Active Agents" value={stats.activeAgents} />
      <StatCard label="APIs Listed" value={stats.apisListed} />
      <StatCard label="Developer Earnings" value={Math.floor(stats.developerEarnings)} prefix="$" />
      <StatCard label="Total Invocations" value={stats.totalInvocations} />
    </div>
  );
}
