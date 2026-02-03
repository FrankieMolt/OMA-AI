'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Check,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Activity,
} from 'lucide-react';
import { SolanaCircleColorful, UsdcCircleColorful } from '@ant-design/web3-icons';
import { formatNumber } from '@/lib/utils';

export interface TokenBalance {
  symbol: 'SOL' | 'USDC';
  balance: number;
  valueUsd: number;
  change24h?: number;
  address?: string;
}

export interface WalletBalanceProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Wallet address */
  address?: string;
  /** Token balances */
  tokens: TokenBalance[];
  /** Total USD value */
  totalValueUsd: number;
  /** 24h change percentage */
  change24h?: number;
  /** Show/hide balance */
  showBalance?: boolean;
  /** On toggle balance visibility */
  onToggleBalance?: () => void;
  /** On copy address */
  onCopyAddress?: (address: string) => Promise<void>;
  /** On deposit */
  onDeposit?: () => void;
  /** On withdraw */
  onWithdraw?: () => void;
  /** On refresh */
  onRefresh?: () => void;
  /** Loading state */
  isLoading?: boolean;
  /** Show transaction history */
  showTransactions?: boolean;
  /** Transaction history items */
  transactions?: Array<{
    id: string;
    type: 'sent' | 'received' | 'swap';
    amount: number;
    symbol: string;
    timestamp: string;
    status?: 'pending' | 'confirmed' | 'failed';
  }>;
  /** View on explorer URL */
  explorerUrl?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Compact mode */
  compact?: boolean;
  /** Show network info */
  showNetwork?: boolean;
  /** Network name */
  network?: string;
}

const sizeClasses = {
  sm: {
    title: 'text-sm',
    balance: 'text-xl',
    token: 'text-sm',
    icon: 'h-4 w-4',
  },
  md: {
    title: 'text-base',
    balance: 'text-3xl',
    token: 'text-base',
    icon: 'h-5 w-5',
  },
  lg: {
    title: 'text-lg',
    balance: 'text-4xl',
    token: 'text-lg',
    icon: 'h-6 w-6',
  },
};

export function WalletBalance({
  address,
  tokens,
  totalValueUsd,
  change24h,
  showBalance = true,
  onToggleBalance,
  onCopyAddress,
  onDeposit,
  onWithdraw,
  onRefresh,
  isLoading = false,
  showTransactions = false,
  transactions = [],
  explorerUrl,
  size = 'md',
  compact = false,
  showNetwork = false,
  network,
  className,
  ...props
}: WalletBalanceProps) {
  const [copied, setCopied] = React.useState(false);
  const [hoveredToken, setHoveredToken] = React.useState<string | null>(null);

  const handleCopyAddress = async () => {
    if (address && onCopyAddress) {
      await onCopyAddress(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  const getTokenIcon = (symbol: 'SOL' | 'USDC') => {
    return symbol === 'SOL' ? (
      <SolanaCircleColorful className={sizeClasses[size].icon} />
    ) : (
      <UsdcCircleColorful className={sizeClasses[size].icon} />
    );
  };

  const maskedBalance = '••••••••';
  const formattedTotalValue = formatNumber(totalValueUsd, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const TrendIcon = change24h && change24h >= 0 ? TrendingUp : TrendingDown;
  const trendColor =
    change24h && change24h >= 0
      ? 'text-success'
      : 'text-destructive';

  if (compact) {
    return (
      <div className={cn('flex items-center gap-3', className)} {...props}>
        <div className="flex-shrink-0">
          <Wallet className={cn('text-primary', sizeClasses[size].icon)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                'font-bold tabular-nums',
                sizeClasses[size].balance,
                showBalance ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {showBalance ? `$${formattedTotalValue}` : maskedBalance}
            </span>
            {change24h !== undefined && (
              <span className={cn('flex items-center gap-1 text-xs', trendColor)}>
                <TrendIcon className="h-3 w-3" />
                {change24h >= 0 ? '+' : ''}
                {change24h.toFixed(2)}%
              </span>
            )}
          </div>
          {address && <div className="text-xs text-muted-foreground">{formatAddress(address)}</div>}
        </div>
        {onToggleBalance && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleBalance}
            className="h-8 w-8 flex-shrink-0"
          >
            {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className={cn('overflow-hidden', className)} {...props}>
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className={cn('flex items-center gap-2', sizeClasses[size].title)}>
              <Wallet className={sizeClasses[size].icon} />
              Wallet Balance
            </CardTitle>
            {address && (
              <button
                onClick={handleCopyAddress}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                {formatAddress(address)}
                {copied ? (
                  <Check className="h-3 w-3 text-success" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            )}
            {showNetwork && network && (
              <div className="text-xs text-muted-foreground">Network: {network}</div>
            )}
          </div>
          <div className="flex items-center gap-1">
            {explorerUrl && (
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            {onRefresh && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onRefresh}
                disabled={isLoading}
                className="h-8 w-8"
              >
                <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
              </Button>
            )}
            {onToggleBalance && (
              <Button variant="ghost" size="icon" onClick={onToggleBalance} className="h-8 w-8">
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>

        {/* Total Balance */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                'font-bold tabular-nums',
                sizeClasses[size].balance,
                showBalance ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {showBalance ? `$${formattedTotalValue}` : maskedBalance}
            </span>
            {change24h !== undefined && (
              <span className={cn('flex items-center gap-1 text-sm', trendColor)}>
                <TrendIcon className="h-4 w-4" />
                {change24h >= 0 ? '+' : ''}
                {change24h.toFixed(2)}%
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {onDeposit && (
              <Button size="sm" onClick={onDeposit} className="gap-2">
                <ArrowDownLeft className="h-4 w-4" />
                Deposit
              </Button>
            )}
            {onWithdraw && (
              <Button size="sm" variant="outline" onClick={onWithdraw} className="gap-2">
                <ArrowUpRight className="h-4 w-4" />
                Withdraw
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Token Balances */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Token Balances</div>
          <div className="space-y-2">
            {tokens.map((token, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border transition-all duration-200',
                  'hover:shadow-md',
                  hoveredToken === token.symbol && 'shadow-md'
                )}
                onMouseEnter={() => setHoveredToken(token.symbol)}
                onMouseLeave={() => setHoveredToken(null)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">{getTokenIcon(token.symbol)}</div>
                  <div>
                    <div className="font-medium">{token.symbol}</div>
                    {token.change24h !== undefined && (
                      <div
                        className={cn(
                          'flex items-center gap-1 text-xs',
                          token.change24h >= 0
                            ? 'text-success'
                            : 'text-destructive'
                        )}
                      >
                        <TrendIcon className="h-3 w-3" />
                        {token.change24h >= 0 ? '+' : ''}
                        {token.change24h.toFixed(2)}%
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={cn(
                      'font-semibold tabular-nums',
                      sizeClasses[size].token,
                      showBalance ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {showBalance
                      ? formatNumber(token.balance, { maximumFractionDigits: 6 })
                      : maskedBalance}
                  </div>
                  <div
                    className={cn(
                      'text-xs text-muted-foreground',
                      showBalance ? 'opacity-70' : 'opacity-50'
                    )}
                  >
                    {showBalance
                      ? `$${formatNumber(token.valueUsd, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : maskedBalance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        {showTransactions && transactions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">Recent Transactions</div>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                View All
              </Button>
            </div>
            <div className="space-y-2">
              {transactions.slice(0, 5).map((tx) => {
                const isSent = tx.type === 'sent';
                const isReceived = tx.type === 'received';
                const TxIcon = isSent ? ArrowUpRight : isReceived ? ArrowDownLeft : Activity;
                const iconColor = isSent
                  ? 'text-destructive'
                  : isReceived
                    ? 'text-success'
                    : 'text-info';

                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn('flex-shrink-0', iconColor)}>
                        <TxIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium capitalize">{tx.type}</div>
                        <div className="text-xs text-muted-foreground">{tx.timestamp}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={cn(
                          'font-semibold tabular-nums text-sm',
                          isSent ? 'text-foreground' : 'text-success'
                        )}
                      >
                        {isSent ? '-' : '+'}
                        {formatNumber(tx.amount, { maximumFractionDigits: 6 })} {tx.symbol}
                      </div>
                      {tx.status && (
                        <div
                          className={cn(
                            'text-xs',
                            tx.status === 'confirmed'
                              ? 'text-success'
                              : tx.status === 'pending'
                                ? 'text-warning'
                                : 'text-destructive'
                          )}
                        >
                          {tx.status}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {showTransactions && transactions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <div className="text-sm">No transactions yet</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Mini wallet balance for header/sidebar
export function WalletBalanceMini({
  totalValueUsd,
  change24h,
  showBalance,
  onToggleBalance,
  onClick,
  className,
}: {
  totalValueUsd: number;
  change24h?: number;
  showBalance?: boolean;
  onToggleBalance?: () => void;
  onClick?: () => void;
  className?: string;
}) {
  const formattedTotalValue = formatNumber(totalValueUsd, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const TrendIcon = change24h && change24h >= 0 ? TrendingUp : TrendingDown;
  const trendColor =
    change24h && change24h >= 0
      ? 'text-success'
      : 'text-destructive';
  const maskedBalance = '••••••••';

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-background hover:bg-accent transition-colors',
        className
      )}
    >
      <Wallet className="h-4 w-4 text-primary flex-shrink-0" />
      <span className="font-semibold tabular-nums text-sm">
        {showBalance ? `$${formattedTotalValue}` : maskedBalance}
      </span>
      {change24h !== undefined && (
        <span className={cn('flex items-center gap-0.5 text-xs', trendColor)}>
          <TrendIcon className="h-3 w-3" />
          {change24h >= 0 ? '+' : ''}
          {change24h.toFixed(2)}%
        </span>
      )}
      {onToggleBalance && (
        <span
          className="flex-shrink-0 ml-1"
          onClick={(e) => {
            e.stopPropagation();
            onToggleBalance();
          }}
        >
          {showBalance ? (
            <EyeOff className="h-3 w-3 text-muted-foreground" />
          ) : (
            <Eye className="h-3 w-3 text-muted-foreground" />
          )}
        </span>
      )}
    </button>
  );
}
