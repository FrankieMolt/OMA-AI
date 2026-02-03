'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { TrendingUp, Download, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface EnhancedAnalyticsChartProps {
  title: string;
  description?: string;
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'area';
  color?: 'primary' | 'accent' | 'success' | 'info' | 'warning';
  periodButtons?: boolean;
  showTrend?: boolean;
  trendValue?: number;
  onPeriodChange?: (period: string) => void;
  className?: string;
  isLoading?: boolean;
}

const colorClasses = {
  primary: {
    bg: 'bg-primary',
    bgOpacity: 'bg-primary/20',
    text: 'text-primary',
    border: 'border-primary/30',
  },
  accent: {
    bg: 'bg-accent',
    bgOpacity: 'bg-accent/20',
    text: 'text-accent',
    border: 'border-accent/30',
  },
  success: {
    bg: 'bg-success',
    bgOpacity: 'bg-success/20',
    text: 'text-success',
    border: 'border-success/30',
  },
  info: {
    bg: 'bg-info',
    bgOpacity: 'bg-info/20',
    text: 'text-info',
    border: 'border-info/30',
  },
  warning: {
    bg: 'bg-warning',
    bgOpacity: 'bg-warning/20',
    text: 'text-warning',
    border: 'border-warning/30',
  },
};

export function EnhancedAnalyticsChart({
  title,
  description,
  data,
  type = 'line',
  color = 'primary',
  periodButtons = false,
  showTrend = false,
  trendValue = 0,
  onPeriodChange,
  className,
  isLoading = false,
}: EnhancedAnalyticsChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const colors = colorClasses[color];
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const periods = [
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '90D' },
    { id: 'all', label: 'All' },
  ];

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    onPeriodChange?.(period);
  };

  if (isLoading) {
    return (
      <Card className={cn('glass-card border-none', className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('glass-card border-none', className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-foreground">{title}</CardTitle>
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>
          {showTrend && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-success/10 border border-success/20">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm font-semibold text-success">+{trendValue}%</span>
            </div>
          )}
        </div>
        {periodButtons && (
          <div className="flex items-center gap-2 mt-4">
            {periods.map((period) => (
              <Button
                key={period.id}
                variant={selectedPeriod === period.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePeriodChange(period.id)}
                className={
                  selectedPeriod === period.id
                    ? `${colors.bg} ${colors.text} hover:${colors.bg} border-transparent`
                    : 'border-border/60 text-muted-foreground hover:bg-foreground/5'
                }
              >
                {period.label}
              </Button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {/* Custom SVG Chart */}
        <div className="relative h-[300px] w-full">
          <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((line) => (
              <line
                key={line}
                x1="0"
                y1={line * 3}
                x2="800"
                y2={line * 3}
                stroke="hsl(var(--border) / 0.4)"
                strokeWidth="1"
              />
            ))}

            {/* Chart content based on type */}
            {type === 'line' && (
              <>
                {/* Area fill */}
                <path
                  d={`M ${data.map((d, i) => `${i * (800 / (data.length - 1))},${300 - (d.value / maxValue) * 280}`).join(' L ')} L 800,300 L 0,300 Z`}
                  className={cn('fill-current opacity-20', colors.bgOpacity)}
                />
                {/* Line */}
                <path
                  d={`M ${data.map((d, i) => `${i * (800 / (data.length - 1))},${300 - (d.value / maxValue) * 280}`).join(' L ')}`}
                  className={cn('fill-none stroke-current stroke-2', colors.text)}
                  fill="none"
                />
                {/* Data points */}
                {data.map((d, i) => (
                  <circle
                    key={i}
                    cx={i * (800 / (data.length - 1))}
                    cy={300 - (d.value / maxValue) * 280}
                    r="4"
                    className={cn('fill-current', colors.bg)}
                  />
                ))}
              </>
            )}

            {type === 'bar' && (
              <>
                {data.map((d, i) => {
                  const barWidth = (800 / data.length) * 0.6;
                  const x = i * (800 / data.length) + (800 / data.length - barWidth) / 2;
                  const height = (d.value / maxValue) * 280;
                  return (
                    <rect
                      key={i}
                      x={x}
                      y={300 - height}
                      width={barWidth}
                      height={height}
                      className={cn(
                        'fill-current hover:opacity-80 transition-opacity',
                        colors.bgOpacity
                      )}
                      rx="4"
                    />
                  );
                })}
              </>
            )}

            {type === 'area' && (
              <>
                <path
                  d={`M ${data.map((d, i) => `${i * (800 / (data.length - 1))},${300 - (d.value / maxValue) * 280}`).join(' L ')} L 800,300 L 0,300 Z`}
                  className={cn('fill-current opacity-30', colors.bgOpacity)}
                />
                <path
                  d={`M ${data.map((d, i) => `${i * (800 / (data.length - 1))},${300 - (d.value / maxValue) * 280}`).join(' L ')}`}
                  className={cn('fill-none stroke-current stroke-3', colors.text)}
                  fill="none"
                />
              </>
            )}
          </svg>

          {/* Tooltip on hover (simplified) */}
          <div className="absolute top-2 right-2 flex gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between mt-4 text-xs text-muted-foreground">
          {data.map((d, i) => (
            <span key={i} className={i % 2 === 0 ? '' : 'hidden sm:block'}>
              {d.date}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className={cn('w-3 h-3 rounded', colors.bg)} />
            <span className="text-muted-foreground">{title}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
