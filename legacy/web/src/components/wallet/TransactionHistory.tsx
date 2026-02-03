'use client';

import { useState, useMemo, memo } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  ExternalLink,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge, type BadgeProps } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTransactionHistory } from '@/lib/hooks';
import strings from '@/constants/text.json';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  amountFormatted: string;
  amountUsd: number;
  amountUsdFormatted: string;
  description: string;
  status: string;
  solanaTxId: string | null;
  solanaTxIdShort: string | null;
  createdAt: string;
  createdAtFormatted: string;
  metadata?: Record<string, unknown>;
}

interface TransactionHistoryProps {
  userId?: number;
  className?: string;
}

interface TransactionItemProps {
  tx: Transaction;
  expandedTx: number | null;
  onToggleExpand: (id: number) => void;
  onViewOnExplorer: (txId: string) => void;
}

const TransactionItem = memo(function TransactionItem({
  tx,
  expandedTx,
  onToggleExpand,
  onViewOnExplorer,
}: TransactionItemProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="size-4 text-success" />;
      case 'withdrawal':
        return <ArrowUpRight className="size-4 text-destructive" />;
      case 'payment':
        return <ArrowUpRight className="size-4 text-info" />;
      default:
        return <AlertCircle className="size-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: BadgeProps['variant']; text: string }> = {
      completed: { variant: 'default', text: strings.wallet.history.filters.completed },
      pending: { variant: 'secondary', text: strings.wallet.history.filters.pending },
      failed: { variant: 'outline', text: strings.wallet.history.filters.failed },
    };

    const config = variants[status] || variants.pending;

    return (
      <Badge
        variant={config.variant}
        className={`text-xs ${status === 'failed' ? 'border-destructive/40 text-destructive bg-destructive/10' : ''}`}
      >
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="bg-foreground/5 border border-border/60 rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
      <div className="p-4 cursor-pointer" onClick={() => onToggleExpand(tx.id)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="size-10 rounded-full bg-foreground/5 flex items-center justify-center">
              {getTransactionIcon(tx.type)}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-medium capitalize">{tx.type}</span>
                {getStatusBadge(tx.status)}
              </div>
              <div className="text-sm text-muted-foreground">{tx.createdAtFormatted}</div>
            </div>
          </div>

          <div className="text-right">
            <div className={`font-bold ${tx.type === 'deposit' ? 'text-success' : 'text-foreground'}`}>
              {tx.amountFormatted}
            </div>
            <div className="text-sm text-muted-foreground">{tx.amountUsdFormatted}</div>
          </div>

          <div className="ml-4">
            {expandedTx === tx.id ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {expandedTx === tx.id && (
        <div className="border-t border-border/60 p-4 bg-foreground/5">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{strings.wallet.history.details.description}</span>
              <span className="text-foreground">{tx.description}</span>
            </div>

            {tx.solanaTxId && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{strings.wallet.history.details.tx_id}</span>
                <div className="flex items-center gap-2">
                  <code className="text-info font-mono text-xs">{tx.solanaTxIdShort}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => tx.solanaTxId && onViewOnExplorer(tx.solanaTxId)}
                    className="h-6 w-6"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            {tx.metadata && Object.keys(tx.metadata).length > 0 && (
              <div className="mt-4">
                <span className="text-muted-foreground block mb-2">{strings.wallet.history.details.additional}</span>
                <div className="bg-foreground/5 rounded p-3 font-mono text-xs">
                  <pre className="text-muted-foreground overflow-x-auto">
                    {JSON.stringify(tx.metadata, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export function TransactionHistory({ className }: TransactionHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTx, setExpandedTx] = useState<number | null>(null);

  const [typeFilter, setTypeFilter] = useState<'all' | 'deposit' | 'withdrawal' | 'payment'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'failed'>(
    'all'
  );
  const [page, setPage] = useState(1);

  const typeLabelMap: Record<'all' | 'deposit' | 'withdrawal' | 'payment', string> = {
    all: strings.wallet.history.filters.all_types,
    deposit: strings.wallet.history.filters.deposits,
    withdrawal: strings.wallet.history.filters.withdrawals,
    payment: strings.wallet.history.filters.payments,
  };

  const statusLabelMap: Record<'all' | 'pending' | 'completed' | 'failed', string> = {
    all: strings.wallet.history.filters.all_status,
    pending: strings.wallet.history.filters.pending,
    completed: strings.wallet.history.filters.completed,
    failed: strings.wallet.history.filters.failed,
  };

  const {
    data: transactionsData,
    isLoading: loading,
    error,
    refetch,
  } = useTransactionHistory({
    type: typeFilter,
    status: statusFilter,
    limit: 20,
    offset: (page - 1) * 20,
  });

  const transactions = transactionsData?.transactions || [];
  const totalPages = transactionsData?.pagination?.totalPages || 1;
  const totalTransactions = transactionsData?.pagination?.total || 0;

  const handleRefresh = () => {
    refetch();
  };

  const handleViewOnExplorer = (txId: string) => {
    const explorerUrl = process.env.NEXT_PUBLIC_SOLANA_EXPLORER || 'https://explorer.solana.com';
    window.open(`${explorerUrl}/tx/${txId}?cluster=devnet`, '_blank');
  };

  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions;
    const query = searchQuery.toLowerCase();
    return transactions.filter((tx: Transaction) =>
      (tx.description?.toLowerCase().includes(query) ?? false) ||
      (tx.solanaTxId?.toLowerCase().includes(query) ?? false) ||
      tx.type.toLowerCase().includes(query)
    );
  }, [transactions, searchQuery]);

  const handleToggleExpand = (id: number) => {
    setExpandedTx(expandedTx === id ? null : id);
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="search">{strings.wallet.history.search_label}</Label>
          <Input
            id="search"
            placeholder={strings.wallet.history.search_placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-foreground/5 border-border/60 text-foreground"
          />
        </div>

        <div className="sm:w-40">
          <Label>{strings.wallet.history.type_label}</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between bg-foreground/5 border-border/60 text-foreground"
              >
                {typeLabelMap[typeFilter]}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTypeFilter('all')}>{
                strings.wallet.history.filters.all_types
              }</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter('deposit')}>{
                strings.wallet.history.filters.deposits
              }</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter('withdrawal')}>{
                strings.wallet.history.filters.withdrawals
              }</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter('payment')}>{
                strings.wallet.history.filters.payments
              }</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="sm:w-40">
          <Label>{strings.wallet.history.status_label}</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between bg-foreground/5 border-border/60 text-foreground"
              >
                {statusLabelMap[statusFilter]}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>{
                strings.wallet.history.filters.all_status
              }</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('completed')}>{
                strings.wallet.history.filters.completed
              }</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('pending')}>{
                strings.wallet.history.filters.pending
              }</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('failed')}>{
                strings.wallet.history.filters.failed
              }</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-end">
          <Button variant="outline" size="icon" onClick={handleRefresh} className="mt-6">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg mb-6">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span>{error instanceof Error ? error.message : 'Failed to load transactions'}</span>
          </div>
        </div>
      )}

      {filteredTransactions.length === 0 ? (
        <div className="text-center p-12 text-muted-foreground">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">{strings.wallet.history.empty.title}</p>
          <p className="text-sm">
            {searchQuery
              ? strings.wallet.history.empty.desc_search
              : strings.wallet.history.empty.desc_default}
          </p>
        </div>
      ) : (
        <>
          {/* Transaction List */}
          <div className="space-y-3">
            {filteredTransactions.map((tx: Transaction) => (
              <TransactionItem
                key={tx.id}
                tx={tx}
                expandedTx={expandedTx}
                onToggleExpand={handleToggleExpand}
                onViewOnExplorer={handleViewOnExplorer}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                {strings.wallet.history.pagination.showing
                  .replace('{current}', Math.min(page * 20, totalTransactions).toString())
                  .replace('{total}', totalTransactions.toString())}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  {strings.wallet.history.pagination.previous}
                </Button>

                <span className="text-sm text-muted-foreground">
                  {strings.wallet.history.pagination.page
                    .replace('{current}', page.toString())
                    .replace('{total}', totalPages.toString())}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  {strings.wallet.history.pagination.next}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
