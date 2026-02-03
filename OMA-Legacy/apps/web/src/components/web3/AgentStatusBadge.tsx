'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Circle, Clock, AlertCircle, PowerOff, Activity, Zap } from 'lucide-react';

export type AgentStatusType = 'online' | 'offline' | 'idle' | 'busy' | 'maintenance' | 'error';

const statusVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-300',
  {
    variants: {
      status: {
        online: 'bg-success/10 text-success border border-success/20',
        offline: 'bg-muted/50 text-muted-foreground border border-border',
        idle: 'bg-warning/10 text-warning border border-warning/20',
        busy: 'bg-warning/10 text-warning border border-warning/20',
        maintenance: 'bg-info/10 text-info border border-info/20',
        error: 'bg-destructive/10 text-destructive border border-destructive/20',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      status: 'offline',
      size: 'md',
    },
  }
);

const statusIcons: Record<AgentStatusType, React.ComponentType<{ className?: string }>> = {
  online: Activity,
  offline: PowerOff,
  idle: Clock,
  busy: Zap,
  maintenance: AlertCircle,
  error: AlertCircle,
};

const statusLabels: Record<AgentStatusType, string> = {
  online: 'Online',
  offline: 'Offline',
  idle: 'Idle',
  busy: 'Busy',
  maintenance: 'Maintenance',
  error: 'Error',
};

export interface AgentStatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusVariants> {
  /** Agent status type */
  status: AgentStatusType;
  /** Custom label text */
  label?: string;
  /** Show icon */
  showIcon?: boolean;
  /** Show animated pulse for online status */
  showPulse?: boolean;
  /** Additional status information */
  info?: string;
  /** Last seen timestamp */
  lastSeen?: string;
  /** Uptime percentage */
  uptime?: number;
}

export function AgentStatusBadge({
  status,
  label,
  showIcon = true,
  showPulse = true,
  info,
  lastSeen,
  uptime,
  size = 'md',
  className,
  ...props
}: AgentStatusBadgeProps) {
  const StatusIcon = statusIcons[status];
  const displayLabel = label || statusLabels[status];

  return (
    <div className="flex flex-col gap-1">
      <div className={cn(statusVariants({ status, size }), className)} {...props}>
        {showIcon && (
          <div className="relative flex items-center justify-center">
            <StatusIcon
              className={cn(
                'h-3 w-3 flex-shrink-0',
                showPulse && status === 'online' && 'animate-pulse'
              )}
            />
            {showPulse && status === 'online' && (
              <Circle className="absolute h-2 w-2 animate-ping opacity-75" />
            )}
          </div>
        )}
        <span className="font-medium">{displayLabel}</span>
        {uptime !== undefined && (
          <span className="text-xs opacity-70 ml-1">({uptime}% uptime)</span>
        )}
      </div>

      {/* Additional Information */}
      {(info || lastSeen) && (
        <div className="text-xs text-muted-foreground ml-1">
          {info && <div>{info}</div>}
          {lastSeen && (
            <div className="flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              Last seen: {lastSeen}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Compact version for inline display
export function AgentStatusDot({
  status,
  className,
}: {
  status: AgentStatusType;
  className?: string;
}) {
  const colorMap: Record<AgentStatusType, string> = {
    online: 'bg-success',
    offline: 'bg-muted-foreground',
    idle: 'bg-warning',
    busy: 'bg-warning',
    maintenance: 'bg-info',
    error: 'bg-destructive',
  };

  return (
    <div className={cn('relative flex h-2.5 w-2.5 items-center justify-center', className)}>
      <Circle className={cn('h-2 w-2', colorMap[status])} />
      {status === 'online' && (
        <Circle className="absolute h-2 w-2 animate-ping opacity-75 text-success" />
      )}
    </div>
  );
}
