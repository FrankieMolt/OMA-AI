import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon: LucideIcon;
  description?: string;
  className?: string;
  color?: 'cyan' | 'green' | 'purple' | 'blue' | 'yellow';
}

export function MetricsCard({
  title,
  value,
  change,
  icon: Icon,
  description,
  className,
  color = 'cyan',
}: MetricsCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'cyan':
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          border: 'border-primary/20',
        };
      case 'green':
        return {
          bg: 'bg-success/10',
          text: 'text-success',
          border: 'border-success/20',
        };
      case 'purple':
        return {
          bg: 'bg-accent/10',
          text: 'text-accent',
          border: 'border-accent/20',
        };
      case 'blue':
        return {
          bg: 'bg-info/10',
          text: 'text-info',
          border: 'border-info/20',
        };
      case 'yellow':
        return {
          bg: 'bg-warning/10',
          text: 'text-warning',
          border: 'border-warning/20',
        };
    }
  };

  const colors = getColorClasses();

  return (
    <Card
      className={`glass-card border-none hover:border-primary/30 transition-all duration-300 ${className || ''}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <Icon className={`h-4 w-4 ${colors.text}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-2">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {description && <p className="text-xs text-muted-foreground mb-2">{description}</p>}
        {change && (
          <div className="flex items-center gap-1.5">
            {change.isPositive ? (
              <TrendingUp className={`h-3 w-3 ${colors.text}`} />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive" />
            )}
            <span
              className={`text-xs font-medium ${change.isPositive ? colors.text : 'text-destructive'}`}
            >
              {change.isPositive ? '+' : ''}
              {change.value}%
            </span>
            <span className="text-xs text-muted-foreground/70">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Pre-configured metric cards
export const MetricsCards = {
  TotalRevenue: (
    props: Omit<MetricsCardProps, 'title' | 'icon' | 'color'> & { icon: LucideIcon }
  ) => <MetricsCard title="Total Revenue" color="green" {...props} />,
  ActiveUsers: (
    props: Omit<MetricsCardProps, 'title' | 'icon' | 'color'> & { icon: LucideIcon }
  ) => <MetricsCard title="Active Users" color="cyan" {...props} />,
  TotalCalls: (
    props: Omit<MetricsCardProps, 'title' | 'icon' | 'color'> & { icon: LucideIcon }
  ) => <MetricsCard title="Total API Calls" color="purple" {...props} />,
  ConversionRate: (
    props: Omit<MetricsCardProps, 'title' | 'icon' | 'color'> & { icon: LucideIcon }
  ) => <MetricsCard title="Conversion Rate" color="blue" {...props} />,
  AverageRating: (
    props: Omit<MetricsCardProps, 'title' | 'icon' | 'color'> & { icon: LucideIcon }
  ) => <MetricsCard title="Average Rating" color="yellow" {...props} />,
};
