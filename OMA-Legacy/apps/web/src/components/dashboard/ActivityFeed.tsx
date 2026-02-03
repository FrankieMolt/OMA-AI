import {
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Coins,
  Bot,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import strings from '@/constants/text.json';

export type ActivityType = 'success' | 'info' | 'warning' | 'error';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: Date;
  icon?: React.ReactNode;
  metadata?: Record<string, unknown>;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
  showHeader?: boolean;
}

export function ActivityFeed({ activities, className, showHeader = true }: ActivityFeedProps) {
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'info':
        return <Clock className="w-4 h-4 text-info" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case 'success':
        return 'bg-success rounded-full';
      case 'info':
        return 'bg-info rounded-full';
      case 'warning':
        return 'bg-warning rounded-full';
      case 'error':
        return 'bg-destructive rounded-full';
      default:
        return 'bg-muted-foreground rounded-full';
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return strings.dashboard.activity.time.just_now;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes}${strings.dashboard.activity.time.m_ago}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}${strings.dashboard.activity.time.h_ago}`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days}${strings.dashboard.activity.time.d_ago}`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className={`glass-card border-none ${className || ''}`}>
      {showHeader && (
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-info" />
            {strings.dashboard.activity.title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">{strings.dashboard.activity.no_activity}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="group flex items-start gap-4 p-4 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-border/60 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 transition-all duration-500 pointer-events-none" />

                <div
                  className={cn(
                    'shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-opacity-10 border border-border/60 relative z-10 group-hover:scale-105 transition-transform',
                    getActivityColor(activity.type).replace('rounded-full', '')
                  )}
                >
                  <div className="absolute inset-0 blur-sm opacity-50 bg-inherit" />
                  {activity.icon || getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0 relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-bold truncate uppercase tracking-tight group-hover:text-primary transition-colors">
                        {activity.title}
                      </p>
                      {activity.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                          {activity.description}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] text-muted-foreground/70 font-mono font-bold uppercase tracking-wider whitespace-nowrap bg-foreground/5 px-2 py-0.5 rounded border border-border/60">
                        {getTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Predefined activity types with default icons
export const ActivityTypes = {
  DEPLOYMENT_SUCCESS: {
    type: 'success' as ActivityType,
    icon: <Bot className="w-4 h-4 text-success" />,
  },
  PAYMENT_RECEIVED: {
    type: 'success' as ActivityType,
    icon: <Coins className="w-4 h-4 text-primary" />,
  },
  AGENT_ALERT: {
    type: 'warning' as ActivityType,
    icon: <AlertTriangle className="w-4 h-4 text-warning" />,
  },
  SYSTEM_HEALTH: {
    type: 'info' as ActivityType,
    icon: <ShieldCheck className="w-4 h-4 text-info" />,
  },
  PERFORMANCE_METRIC: {
    type: 'info' as ActivityType,
    icon: <TrendingUp className="w-4 h-4 text-accent" />,
  },
  ERROR_OCCURRED: {
    type: 'error' as ActivityType,
    icon: <XCircle className="w-4 h-4 text-destructive" />,
  },
} as const;
