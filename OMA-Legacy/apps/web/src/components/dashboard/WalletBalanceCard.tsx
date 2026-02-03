import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Wallet, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import strings from '@/constants/text.json';

export interface WalletBalanceCardProps {
  type: 'usdc' | 'sol' | 'credits';
  balance: number | string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onDeposit?: () => void;
  onWithdraw?: () => void;
  className?: string;
}

export function WalletBalanceCard({
  type,
  balance,
  description,
  trend,
  onDeposit,
  onWithdraw,
  className,
}: WalletBalanceCardProps) {
  const getConfig = () => {
    switch (type) {
      case 'usdc':
        return {
          icon: TrendingUp,
          iconBg: 'bg-info/10',
          iconColor: 'text-info',
          glowClass: 'bg-info/10 group-hover:bg-info/20',
          symbol: 'USDC',
          label: strings.dashboard.wallet_card.usdc_label,
        };
      case 'sol':
        return {
          icon: Wallet,
          iconBg: 'bg-accent/10',
          iconColor: 'text-accent',
          glowClass: 'bg-accent/10 group-hover:bg-accent/20',
          symbol: 'SOL',
          label: strings.dashboard.wallet_card.sol_label,
        };
      case 'credits':
        return {
          icon: CreditCard,
          iconBg: 'bg-primary/10',
          iconColor: 'text-primary',
          glowClass: 'bg-primary/10 group-hover:bg-primary/20',
          symbol: '',
          label: strings.dashboard.wallet_card.credits_label,
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        'glass-card border-none hover:border-primary/30 transition-all duration-300 relative overflow-hidden group',
        className
      )}
    >
      {/* Decorative glow */}
      <div
        className={`absolute -top-24 -right-24 size-48 ${config.glowClass} rounded-full blur-3xl pointer-events-none transition-all`}
      />

      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${config.iconBg}`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          {trend && (
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  'text-xs font-bold px-2 py-1 rounded-full',
                  trend.isPositive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                )}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
            </div>
          )}
        </div>

        <div className="mb-2">
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
            {config.label}
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-foreground">
              {typeof balance === 'number' ? balance.toFixed(type === 'sol' ? 4 : 2) : balance}
            </div>
            {config.symbol && (
              <span className="text-lg font-semibold text-muted-foreground">{config.symbol}</span>
            )}
          </div>
        </div>

        {description && <p className="text-xs text-muted-foreground/70 mb-4">{description}</p>}

        {type !== 'credits' && (
          <div className="flex gap-2 pt-4 border-t border-border/60">
            {onDeposit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onDeposit}
                className="flex-1 border-border/60 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              >
                <ArrowDownLeft className="w-4 h-4 mr-2" />
                {strings.dashboard.wallet_card.deposit}
              </Button>
            )}
            {onWithdraw && (
              <Button
                variant="outline"
                size="sm"
                onClick={onWithdraw}
                className="flex-1 border-border/60 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                {strings.dashboard.wallet_card.withdraw}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
