'use client';

import { CheckCircle, AlertCircle, Clock, XCircle, type LucideIcon } from 'lucide-react';

export type Status = 'completed' | 'pending' | 'failed' | 'expired' | 'active' | 'inactive' | 'verified' | 'unverified';

interface StatusBadgeProps {
  status: Status | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

/**
 * StatusBadge - Consistent status indicator across the app
 * 
 * Provides visual indicators for transaction and payment statuses.
 * Uses color coding that meets WCAG accessibility standards.
 */
export function StatusBadge({ 
  status, 
  size = 'md', 
  showIcon = true,
  className = '' 
}: StatusBadgeProps) {
  const config = getStatusConfig(status, showIcon);
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.colors} ${sizeClasses[size]} ${className}`}
    >
      {config.icon && <config.icon size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />}
      <span className="capitalize">{formatStatusLabel(status)}</span>
    </span>
  );
}

function getStatusConfig(status: string, showIcon: boolean): {
  colors: string;
  icon: LucideIcon | null;
} {
  const normalizedStatus = status.toLowerCase();
  
  const configs: Record<string, { colors: string; icon: LucideIcon | null }> = {
    completed: { 
      colors: 'bg-green-900/30 text-green-400 border border-green-700/30',
      icon: showIcon ? CheckCircle : null 
    },
    success: { 
      colors: 'bg-green-900/30 text-green-400 border border-green-700/30',
      icon: showIcon ? CheckCircle : null 
    },
    verified: { 
      colors: 'bg-green-900/30 text-green-400 border border-green-700/30',
      icon: showIcon ? CheckCircle : null 
    },
    active: { 
      colors: 'bg-green-900/30 text-green-400 border border-green-700/30',
      icon: showIcon ? CheckCircle : null 
    },
    pending: { 
      colors: 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30',
      icon: showIcon ? Clock : null 
    },
    processing: { 
      colors: 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30',
      icon: showIcon ? Clock : null 
    },
    failed: { 
      colors: 'bg-red-900/30 text-red-400 border border-red-700/30',
      icon: showIcon ? XCircle : null 
    },
    error: { 
      colors: 'bg-red-900/30 text-red-400 border border-red-700/30',
      icon: showIcon ? AlertCircle : null 
    },
    expired: { 
      colors: 'bg-red-900/30 text-red-400 border border-red-700/30',
      icon: showIcon ? XCircle : null 
    },
    inactive: { 
      colors: 'bg-zinc-800 text-zinc-400 border border-zinc-700',
      icon: null 
    },
    unverified: { 
      colors: 'bg-zinc-800 text-zinc-400 border border-zinc-700',
      icon: null 
    },
  };

  return configs[normalizedStatus] || { 
    colors: 'bg-zinc-800 text-zinc-400 border border-zinc-700',
    icon: null 
  };
}

function formatStatusLabel(status: string): string {
  // Convert snake_case to Title Case
  return status
    .split(/[_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
