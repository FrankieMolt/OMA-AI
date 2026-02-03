import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Coins, DollarSign, TrendingUp, Users, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import strings from '@/constants/text.json';

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  actionButton?: ReactNode;
  statusIndicator?: ReactNode;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  iconClassName,
  valueClassName,
  actionButton,
  statusIndicator,
}: StatCardProps) {
  return (
    <Card className={cn('glass-card hover:border-primary/30 transition-all duration-300', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn('h-4 w-4', iconClassName)}>
          <Icon className={cn('h-4 w-4', iconClassName)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn('text-2xl font-bold text-foreground', valueClassName)}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <span
              className={cn(
                'text-xs font-medium',
                trend.isPositive ? 'text-success' : 'text-destructive'
              )}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}%
            </span>
            {trend.label && <span className="text-xs text-muted-foreground/70">{trend.label}</span>}
          </div>
        )}
        {statusIndicator && <div className="mt-2">{statusIndicator}</div>}
        {actionButton && <div className="mt-2">{actionButton}</div>}
      </CardContent>
    </Card>
  );
}

// Pre-configured stat cards for common use cases
export const StatCards = {
  Credits: (props: Omit<StatCardProps, 'icon' | 'title'>) => (
    <StatsCard title={strings.dashboard.stats_cards.credits} icon={Coins} {...props} />
  ),
  USDCBalance: (props: Omit<StatCardProps, 'icon' | 'title'>) => (
    <StatsCard title={strings.dashboard.stats_cards.usdc_balance} icon={TrendingUp} {...props} />
  ),
  ActiveAgents: (props: Omit<StatCardProps, 'icon' | 'title'>) => (
    <StatsCard title={strings.dashboard.stats_cards.active_agents} icon={Users} {...props} />
  ),
  TotalUsage: (props: Omit<StatCardProps, 'icon' | 'title'>) => (
    <StatsCard title={strings.dashboard.stats_cards.total_usage} icon={Activity} {...props} />
  ),
  Revenue: (props: Omit<StatCardProps, 'icon' | 'title'>) => (
    <StatsCard title={strings.dashboard.stats_cards.revenue} icon={DollarSign} {...props} />
  ),
};
