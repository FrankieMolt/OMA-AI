import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Bot,
  Settings,
  Trash2,
  Play,
  Pause,
  ExternalLink,
  TrendingUp,
  Activity,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import strings from '@/constants/text.json';

export interface AgentCardProps {
  id: number;
  name: string;
  description: string;
  type: 'agent' | 'mcp' | 'api';
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  category: string;
  usage: number;
  revenue: number;
  rating?: number;
  version?: string;
  className?: string;
  onToggleStatus?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function AgentCard({
  id,
  name,
  description,
  type,
  status,
  category,
  usage,
  revenue,
  rating,
  version,
  className,
  onToggleStatus,
  onEdit,
  onDelete,
}: AgentCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-success/10 text-success border-success/20 gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            {strings.dashboard.agent_card.status.active}
          </Badge>
        );
      case 'inactive':
        return (
          <Badge className="bg-muted/50 text-muted-foreground border-border/60 gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
            {strings.dashboard.agent_card.status.inactive}
          </Badge>
        );
      case 'maintenance':
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20 gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-warning" />
            {strings.dashboard.agent_card.status.maintenance}
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
            {strings.dashboard.agent_card.status.error}
          </Badge>
        );
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'agent':
        return <Bot className="w-5 h-5 text-primary" />;
      case 'mcp':
        return <Activity className="w-5 h-5 text-info" />;
      case 'api':
        return <TrendingUp className="w-5 h-5 text-success" />;
    }
  };

  const getTypeBadge = () => {
    switch (type) {
      case 'agent':
        return <Badge className="bg-primary/20 text-primary border-primary/30">{strings.dashboard.agent_card.type.agent}</Badge>;
      case 'mcp':
        return (
          <Badge className="bg-info/10 text-info border-info/20">
            {strings.dashboard.agent_card.type.mcp}
          </Badge>
        );
      case 'api':
        return <Badge className="bg-success/10 text-success border-success/20">{strings.dashboard.agent_card.type.api}</Badge>;
    }
  };

  const isRunning = status === 'active';

  return (
    <Card
      className={cn(
        'glass-card border-border/60 hover:border-primary/30 transition-all duration-300 group selection:bg-primary/30',
        className
      )}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-foreground/5 border border-border/60 flex items-center justify-center shadow-inner">
              {getTypeIcon()}
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-2">
                {getTypeBadge()}
                {version && <span className="text-xs text-muted-foreground/70">v{version}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleStatus?.(id)}
              aria-label={isRunning ? 'Pause Agent' : 'Start Agent'}
              className={`p-2 ${isRunning ? 'text-warning hover:text-warning/80 hover:bg-warning/10' : 'text-success hover:text-success/80 hover:bg-success/10'}`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit?.(id)}
              aria-label="Edit Agent Settings"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-foreground/10"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete?.(id)}
              aria-label="Delete Agent"
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">{description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-xs text-muted-foreground/70 mb-1">Status</div>
            {getStatusBadge()}
          </div>
          <div>
            <div className="text-xs text-muted-foreground/70 mb-1">Usage (Today)</div>
            <div className="text-sm font-semibold text-foreground">{usage.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground/70 mb-1">Revenue (Month)</div>
            <div className="text-sm font-semibold text-success">${revenue.toFixed(2)}</div>
          </div>
        </div>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.floor(rating) ? 'text-warning' : 'text-muted-foreground/50'
                  }`}
                >
                  ★
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Category */}
        <div className="text-xs text-muted-foreground/70 mb-4">
          {strings.dashboard.agent_card.stats.category}: <span className="text-foreground/80">{category}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-border/60">
          {type === 'agent' || type === 'mcp' ? (
            <Link href="/dashboard/chat" className="flex-1">
              <Button
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-all"
              >
                <Bot className="w-4 h-4 mr-2" />
                {strings.dashboard.agent_card.buttons.interact}
              </Button>
            </Link>
          ) : (
            <Link
              href={`/marketplace/${cn(name.toLowerCase().replace(/\s+/g, '-'))}`}
              className="flex-1"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full border-border/60 text-foreground/80 hover:text-foreground hover:bg-foreground/5"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {strings.dashboard.agent_card.buttons.view}
              </Button>
            </Link>
          )}

          <Button
            size="sm"
            className="flex-1 border-border/60 text-foreground/80 hover:text-foreground hover:bg-foreground/5"
            variant="outline"
          >
            <Activity className="w-4 h-4 mr-2" />
            {strings.dashboard.agent_card.buttons.analytics}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
