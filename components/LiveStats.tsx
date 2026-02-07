'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import { Activity, Database, DollarSign, Zap } from 'lucide-react';

interface Stats {
  activeAgents: number;
  apisListed: number;
  developerEarnings: number;
  totalInvocations: number;
}

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  prefix?: string;
  isLoading?: boolean;
}

const StatCard = memo(({ icon: Icon, value, label, prefix = '', isLoading = false }: StatCardProps) => (
  <div className="metric-card hover:border-purple-500/50 transition-all">
    {isLoading ? (
      <>
        <div className="w-8 h-8 mx-auto mb-2 bg-zinc-800 rounded-lg skeleton" />
        <div className="h-8 w-20 mx-auto mb-1 skeleton" />
        <div className="h-4 w-full bg-zinc-800 rounded skeleton" />
      </>
    ) : (
      <>
        <Icon className="w-8 h-8 mx-auto mb-2 text-purple-400" aria-hidden="true" />
        <div className="text-3xl font-bold text-white mb-1">
          {prefix}{value}
        </div>
        <div className="text-sm text-zinc-500 uppercase tracking-wider">{label}</div>
      </>
    )}
  </div>
));

StatCard.displayName = 'StatCard';

export function LiveStats() {
  const [stats, setStats] = useState<Stats>({
    activeAgents: 1200,
    apisListed: 847,
    developerEarnings: 3400000,
    totalInvocations: 24000000
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStats = useCallback(() => {
    setIsUpdating(true);

    setStats(prev => ({
      activeAgents: Math.floor(1200 + Math.random() * 100),
      apisListed: 847 + Math.floor(Math.random() * 5),
      developerEarnings: prev.developerEarnings + Math.floor(Math.random() * 50000),
      totalInvocations: prev.totalInvocations + Math.floor(Math.random() * 100000)
    }));

    // Brief loading state for visual feedback
    setTimeout(() => setIsUpdating(false), 500);
  }, []);

  useEffect(() => {
    // Initial update after mount
    updateStats();

    // Update every 30 seconds
    const interval = setInterval(updateStats, 30000);
    return () => clearInterval(interval);
  }, [updateStats]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        icon={Activity}
        value={stats.activeAgents.toLocaleString()}
        label="Active Agents"
        isLoading={isUpdating}
      />
      <StatCard
        icon={Database}
        value={stats.apisListed.toLocaleString()}
        label="APIs Listed"
        isLoading={isUpdating}
      />
      <StatCard
        icon={DollarSign}
        value={Math.floor(stats.developerEarnings).toLocaleString()}
        label="Developer Earnings"
        prefix="$"
        isLoading={isUpdating}
      />
      <StatCard
        icon={Zap}
        value={stats.totalInvocations.toLocaleString()}
        label="Total Invocations"
        isLoading={isUpdating}
      />
    </div>
  );
}
