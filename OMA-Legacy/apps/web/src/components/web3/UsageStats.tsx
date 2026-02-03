'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, Clock, ArrowUpRight, ArrowDownRight, Calendar, RefreshCw } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export interface UsageStat {
  label: string;
  value: number;
  previousValue?: number;
  trend?: 'up' | 'down' | 'flat';
  period?: string;
  icon?: React.ReactNode;
  unit?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

export interface ChartDataPoint {
  label: string;
  value: number;
  previousValue?: number;
}

export interface UsageStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Statistics to display */
  stats: UsageStat[];
  /** Chart data points */
  chartData?: ChartDataPoint[];
  /** Show trend indicators */
  showTrend?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Card layout */
  layout?: 'grid' | 'list' | 'compact';
  /** Refresh handler */
  onRefresh?: () => void;
  /** Loading state */
  isLoading?: boolean;
  /** Last updated timestamp */
  lastUpdated?: string;
  /** Show chart */
  showChart?: boolean;
  /** Chart title */
  chartTitle?: string;
  /** Chart type */
  chartType?: 'bar' | 'line' | 'area';
}

const sizeClasses = {
  sm: {
    label: 'text-xs',
    value: 'text-lg',
    icon: 'h-4 w-4',
  },
  md: {
    label: 'text-sm',
    value: 'text-2xl',
    icon: 'h-5 w-5',
  },
  lg: {
    label: 'text-base',
    value: 'text-4xl',
    icon: 'h-6 w-6',
  },
};

const colorClasses = {
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-destructive',
  info: 'text-info',
};

const bgColorClasses = {
  primary: 'bg-primary/10',
  success: 'bg-success/10',
  warning: 'bg-warning/10',
  danger: 'bg-destructive/10',
  info: 'bg-info/10',
};

const borderColorClasses = {
  primary: 'border-primary/20',
  success: 'border-success/20',
  warning: 'border-warning/20',
  danger: 'border-destructive/20',
  info: 'border-info/20',
};

// Chart component extracted to avoid creating components during render
interface ChartComponentProps {
  chartData: ChartDataPoint[];
  chartTitle?: string;
  chartType?: 'bar' | 'line' | 'area';
  lastUpdated?: string;
}

function ChartComponent({
  chartData,
  chartTitle,
  chartType = 'bar',
  lastUpdated,
}: ChartComponentProps) {
  if (chartData.length === 0) return null;

  const maxValue = Math.max(...chartData.map((d) => d.value));
  const minValue = Math.min(...chartData.map((d) => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{chartTitle}</h3>
        {lastUpdated && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {lastUpdated}
          </div>
        )}
      </div>

      <div className="space-y-2">
        {chartData.map((point, index) => {
          const height = ((point.value - minValue) / range) * 100 + 10;
          const previousHeight = point.previousValue
            ? ((point.previousValue - minValue) / range) * 100 + 10
            : null;

          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{point.label}</span>
                <span className="font-medium">
                  {formatNumber(point.value, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="h-8 flex items-end gap-1">
                {chartType === 'bar' ? (
                  <div
                    className="w-full bg-primary/20 rounded-t-sm transition-all duration-300 hover:bg-primary/30 relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatNumber(point.value, { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex items-end justify-center gap-0.5">
                    <div
                      className="w-full bg-primary/20 rounded-t-sm transition-all duration-300"
                      style={{ height: `${previousHeight || 0}%` }}
                    />
                    <div
                      className="w-full bg-primary rounded-t-sm transition-all duration-300 relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-background border rounded px-2 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {formatNumber(point.value, { maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function UsageStats({
  stats,
  chartData = [],
  showTrend = true,
  size = 'md',
  layout = 'grid',
  onRefresh,
  isLoading = false,
  lastUpdated,
  showChart = false,
  chartTitle = 'Usage Trends',
  chartType = 'bar',
  className,
  ...props
}: UsageStatsProps) {
  const StatCard = ({ stat }: { stat: UsageStat }) => {
    const percentageChange =
      stat.previousValue && stat.previousValue > 0
        ? ((stat.value - stat.previousValue) / stat.previousValue) * 100
        : null;

    const TrendIcon =
      percentageChange && percentageChange > 0
        ? ArrowUpRight
        : percentageChange && percentageChange < 0
          ? ArrowDownRight
          : null;

    const trendColor =
      percentageChange && percentageChange > 0
        ? 'text-success'
        : percentageChange && percentageChange < 0
          ? 'text-destructive'
          : 'text-muted-foreground';

    const statColor = stat.color ? colorClasses[stat.color] : 'text-foreground';
    const statBgColor = stat.color ? bgColorClasses[stat.color] : 'bg-muted';
    const statBorderColor = stat.color ? borderColorClasses[stat.color] : 'border-border';

    return (
      <div
        className={cn(
          'p-4 rounded-lg border transition-all duration-200 hover:shadow-md',
          statBgColor,
          statBorderColor
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className={cn('text-muted-foreground mb-1', sizeClasses[size].label)}>
              {stat.label}
            </div>
            <div className={cn('font-bold tabular-nums', statColor, sizeClasses[size].value)}>
              {formatNumber(stat.value, { maximumFractionDigits: 2 })}
              {stat.unit && <span className="text-sm font-normal ml-1">{stat.unit}</span>}
            </div>
            {showTrend && (percentageChange !== null || stat.period) && (
              <div className={cn('flex items-center gap-1 mt-1', sizeClasses[size].label)}>
                {percentageChange !== null && TrendIcon && (
                  <span className={cn('flex items-center gap-0.5', trendColor)}>
                    <TrendIcon className="h-3 w-3" />
                    <span className="font-medium">{Math.abs(percentageChange).toFixed(1)}%</span>
                  </span>
                )}
                {stat.period && <span className="text-muted-foreground ml-1">{stat.period}</span>}
              </div>
            )}
          </div>
          {stat.icon && (
            <div className={cn('flex-shrink-0', statColor, sizeClasses[size].icon)}>
              {stat.icon}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (layout === 'compact') {
    return (
      <div className={cn('flex flex-wrap gap-3', className)} {...props}>
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={cn(
                'flex-shrink-0',
                stat.color ? colorClasses[stat.color] : 'text-muted-foreground'
              )}
            >
              {stat.icon || <Activity className="h-4 w-4" />}
            </div>
            <div>
              <div
                className={cn(
                  'font-semibold tabular-nums text-sm',
                  stat.color ? colorClasses[stat.color] : 'text-foreground'
                )}
              >
                {formatNumber(stat.value, { maximumFractionDigits: 0 })}
                {stat.unit && <span className="text-xs ml-1">{stat.unit}</span>}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)} {...props}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Usage Statistics</h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 rounded-md hover:bg-accent transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
          </button>
        )}
      </div>

      {/* Stats Grid */}
      {layout === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      )}

      {/* Chart Section */}
      {showChart && (
        <Card className="border">
          <CardContent className="p-6">
            <ChartComponent
              chartData={chartData}
              chartTitle={chartTitle}
              chartType={chartType}
              lastUpdated={lastUpdated}
            />
          </CardContent>
        </Card>
      )}

      {/* Last Updated */}
      {lastUpdated && (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Last updated: {lastUpdated}
        </div>
      )}
    </div>
  );
}

// Compact stat component for inline use
export function StatCompact({
  label,
  value,
  trend,
  icon,
  color = 'primary',
  className,
}: {
  label: string;
  value: number;
  trend?: number;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}) {
  const TrendIcon = trend && trend > 0 ? ArrowUpRight : trend && trend < 0 ? ArrowDownRight : null;
  const trendColor =
    trend && trend > 0
      ? 'text-success'
      : trend && trend < 0
        ? 'text-destructive'
        : 'text-muted-foreground';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('flex-shrink-0', colorClasses[color], 'h-4 w-4')}>
        {icon || <Activity className="h-4 w-4" />}
      </div>
      <div className="flex-1">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="flex items-baseline gap-1">
          <span className={cn('font-bold tabular-nums text-sm', colorClasses[color])}>
            {formatNumber(value, { maximumFractionDigits: 0 })}
          </span>
          {trend !== undefined && TrendIcon && (
            <span className={cn('flex items-center gap-0.5 text-xs', trendColor)}>
              <TrendIcon className="h-3 w-3" />
              {Math.abs(trend).toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
