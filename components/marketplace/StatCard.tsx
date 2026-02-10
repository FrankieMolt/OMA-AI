'use client';

import React, { memo } from 'react';

interface StatCardProps {
  icon: any;
  value: string;
  label: string;
  isLoading?: boolean;
}

const StatCard = memo(({ icon: Icon, value, label, isLoading }: StatCardProps) => (
  <div className="glass-card p-6 text-center">
    {isLoading ? (
      <>
        <div className="w-8 h-8 mx-auto mb-2 bg-zinc-800 rounded-lg skeleton" />
        <div className="h-8 w-20 mx-auto mb-1 skeleton" />
        <div className="h-4 w-full bg-zinc-800 rounded skeleton" />
      </>
    ) : (
      <>
        <Icon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-sm text-zinc-500 uppercase tracking-wider">{label}</div>
      </>
    )}
  </div>
));

StatCard.displayName = 'StatCard';

export default StatCard;
