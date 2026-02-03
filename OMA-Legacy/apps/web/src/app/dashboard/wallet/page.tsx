'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Wallet,
  ArrowUp,
  ArrowDown,
  Download,
  Search,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PaymentModal, PaymentItem } from '@/components/web3/PaymentModal';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export interface Transaction {
  id: string;
  type: 'credit' | 'debit' | 'deposit' | 'withdrawal' | 'purchase' | 'refund';
  amount: number;
  currency: 'USD' | 'USDC' | 'CREDITS';
  description: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  agentId?: string;
  agentName?: string;
}

export interface WalletData {
  credits: number;
  usdcBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  monthlySpending: number;
  solanaWalletAddress?: string;
}

export default function WalletPage() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showPurchaseCreditsModal, setShowPurchaseCreditsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<
    'all' | 'credit' | 'debit' | 'deposit' | 'withdrawal' | 'purchase' | 'refund'
  >('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>(
    'all'
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const queryClient = useQueryClient();

  const { data: walletData, isLoading: isLoadingWallet } = useQuery<WalletData>({
    queryKey: ['wallet'],
    queryFn: async () => {
      const res = await fetch('/api/wallet');
      if (!res.ok) throw new Error('Failed to fetch wallet data');
      return res.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: transactions = [], isLoading: isLoadingTransactions } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const res = await fetch('/api/wallet/transactions');
      if (!res.ok) throw new Error('Failed to fetch transactions');
      return res.json();
    },
    refetchInterval: 15000, // Refetch every 15 seconds
  });

  const depositMutation = useMutation({
    mutationFn: async ({ amount, method }: { amount: number; method: string }) => {
      const res = await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, method }),
      });
      if (!res.ok) throw new Error('Deposit failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Deposit successful');
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: async ({ amount, address }: { amount: number; address: string }) => {
      const res = await fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, address }),
      });
      if (!res.ok) throw new Error('Withdrawal failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Withdrawal successful');
    },
  });

  const purchaseCreditsMutation = useMutation({
    mutationFn: async (items: PaymentItem[]) => {
      const res = await fetch('/api/wallet/purchase-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) throw new Error('Purchase failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Credits purchased successfully');
    },
  });

  const creditPackages: PaymentItem[] = [
    {
      id: 'credits-1000',
      name: 'Starter Pack',
      description: '1,000 credits for testing',
      credits: 1000,
    },
    {
      id: 'credits-5000',
      name: 'Pro Pack',
      description: '5,000 credits + 10% bonus',
      credits: 5000,
    },
    {
      id: 'credits-10000',
      name: 'Enterprise Pack',
      description: '10,000 credits + 20% bonus',
      credits: 10000,
    },
    {
      id: 'credits-25000',
      name: 'Ultimate Pack',
      description: '25,000 credits + 30% bonus',
      credits: 25000,
    },
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.agentName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || tx.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || tx.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeposit = async (items: PaymentItem[]) => {
    await depositMutation.mutateAsync({
      amount: items[0].credits * 0.01,
      method: 'card',
    });
    setShowDepositModal(false);
  };

  const handleWithdraw = async (items: PaymentItem[]) => {
    const address = walletData?.solanaWalletAddress;
    if (!address) {
      toast.error('Please connect your Solana wallet before withdrawing.');
      return;
    }

    await withdrawMutation.mutateAsync({ amount: items[0].credits * 0.01, address });
    setShowWithdrawModal(false);
  };

  const handlePurchaseCredits = async (items: PaymentItem[]) => {
    await purchaseCreditsMutation.mutateAsync(items);
    setShowPurchaseCreditsModal(false);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit':
      case 'deposit':
        return <ArrowDown className="w-4 h-4 text-success" />;
      case 'debit':
      case 'withdrawal':
        return <ArrowUp className="w-4 h-4 text-destructive" />;
      case 'purchase':
        return <Zap className="w-4 h-4 text-primary" />;
      case 'refund':
        return <CheckCircle className="w-4 h-4 text-warning" />;
      default:
        return <Wallet className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTransactionBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>
        );
      case 'failed':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Wallet</h1>
          <p className="text-muted-foreground mt-1">
            Manage your credits, USDC, and transaction history
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="glass-enhanced border-border/50 hover:bg-foreground/5"
            onClick={() => setShowPurchaseCreditsModal(true)}
          >
            <Zap className="w-4 h-4 mr-2 text-primary" />
            Buy Credits
          </Button>
          <Button
            variant="outline"
            className="glass-enhanced border-border/50 hover:bg-foreground/5"
            onClick={() => setShowDepositModal(true)}
          >
            <ArrowDown className="w-4 h-4 mr-2 text-success" />
            Deposit
          </Button>
          <Button
            variant="outline"
            className="glass-enhanced border-border/50 hover:bg-foreground/5"
            onClick={() => setShowWithdrawModal(true)}
          >
            <ArrowUp className="w-4 h-4 mr-2 text-destructive" />
            Withdraw
          </Button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Credits Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {isLoadingWallet ? (
                <div className="animate-pulse h-9 bg-foreground/10 rounded w-32" />
              ) : (
                walletData?.credits.toLocaleString() || '0'
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              ≈ ${((walletData?.credits || 0) * 0.01).toFixed(2)} USD
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Wallet className="w-4 h-4 text-success" />
              USDC Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {isLoadingWallet ? (
                <div className="animate-pulse h-9 bg-foreground/10 rounded w-32" />
              ) : (
                `$${(walletData?.usdcBalance || 0).toFixed(2)}`
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Available for withdrawal</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              Total Deposits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              $
              {isLoadingWallet ? (
                <div className="animate-pulse h-9 bg-foreground/10 rounded w-32" />
              ) : (
                (walletData?.totalDeposits || 0).toFixed(2)
              )}
            </div>
            <p className="text-sm text-success mt-1">Lifetime deposits</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ArrowUp className="w-4 h-4 text-destructive" />
              Total Withdrawals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              $
              {isLoadingWallet ? (
                <div className="animate-pulse h-9 bg-foreground/10 rounded w-32" />
              ) : (
                (walletData?.totalWithdrawals || 0).toFixed(2)
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Lifetime withdrawals</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Transaction History
            </CardTitle>
            <Button variant="outline" size="sm" className="border-border/50">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-foreground/5 border-border/50"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as typeof selectedType)}
                className="bg-foreground/5 border border-border/50 rounded-md px-3 py-2 text-foreground"
              >
                <option value="all">All Types</option>
                <option value="credit">Credits</option>
                <option value="debit">Debits</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="purchase">Purchases</option>
                <option value="refund">Refunds</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
                className="bg-foreground/5 border border-border/50 rounded-md px-3 py-2 text-foreground"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Transaction List */}
          {isLoadingTransactions ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-pulse p-4 rounded-lg bg-foreground/5 border border-border/50"
                >
                  <div className="h-4 bg-foreground/10 rounded w-1/4 mb-2" />
                  <div className="h-3 bg-foreground/10 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : paginatedTransactions.length === 0 ? (
            <div className="text-center py-12">
              <Wallet className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No transactions found</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedType !== 'all' || selectedStatus !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Your transaction history is empty'}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {paginatedTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-foreground/[0.02] transition-colors border border-transparent hover:border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-foreground/5">
                        {getTransactionIcon(tx.type)}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{tx.description}</div>
                        {tx.agentName && (
                          <div className="text-sm text-muted-foreground">{tx.agentName}</div>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(tx.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {getTransactionBadge(tx.status)}
                      <div className="text-right">
                        <div
                          className={cn(
                            'font-semibold font-mono',
                            tx.type === 'credit' || tx.type === 'deposit' || tx.type === 'refund'
                              ? 'text-success'
                              : 'text-destructive'
                          )}
                        >
                          {tx.type === 'credit' || tx.type === 'deposit' || tx.type === 'refund'
                            ? '+'
                            : '-'}
                          {tx.currency === 'CREDITS'
                            ? tx.amount.toLocaleString()
                            : `$${tx.amount.toFixed(2)}`}
                          {tx.currency !== 'USD' && tx.currency !== 'USDC' && ` ${tx.currency}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{' '}
                    {filteredTransactions.length} transactions
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="border-border/50"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="border-border/50"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Deposit Modal */}
      <PaymentModal
        open={showDepositModal}
        onOpenChange={setShowDepositModal}
        items={[
          {
            id: 'deposit-10',
            name: 'Quick Deposit',
            description: 'Add $10 USDC to your wallet',
            credits: 1000,
          },
          {
            id: 'deposit-50',
            name: 'Standard Deposit',
            description: 'Add $50 USDC to your wallet',
            credits: 5000,
          },
          {
            id: 'deposit-100',
            name: 'Large Deposit',
            description: 'Add $100 USDC to your wallet',
            credits: 10000,
          },
          {
            id: 'deposit-500',
            name: 'Bulk Deposit',
            description: 'Add $500 USDC to your wallet',
            credits: 50000,
          },
        ]}
        currentBalance={walletData?.usdcBalance || 0}
        onConfirm={handleDeposit}
        isProcessing={depositMutation.isPending}
        title="Deposit USDC"
        description="Select an amount to deposit to your wallet."
        showConversion={false}
      />

      {/* Withdraw Modal */}
      <PaymentModal
        open={showWithdrawModal}
        onOpenChange={setShowWithdrawModal}
        items={[
          {
            id: 'withdraw-10',
            name: 'Quick Withdraw',
            description: 'Withdraw $10 USDC from your wallet',
            credits: 1000,
          },
          {
            id: 'withdraw-50',
            name: 'Standard Withdraw',
            description: 'Withdraw $50 USDC from your wallet',
            credits: 5000,
          },
          {
            id: 'withdraw-100',
            name: 'Large Withdraw',
            description: 'Withdraw $100 USDC from your wallet',
            credits: 10000,
          },
        ]}
        currentBalance={walletData?.usdcBalance || 0}
        onConfirm={handleWithdraw}
        isProcessing={withdrawMutation.isPending}
        title="Withdraw USDC"
        description="Select an amount to withdraw from your wallet."
        showConversion={false}
      />

      {/* Purchase Credits Modal */}
      <PaymentModal
        open={showPurchaseCreditsModal}
        onOpenChange={setShowPurchaseCreditsModal}
        items={creditPackages}
        currentBalance={walletData?.credits || 0}
        onConfirm={handlePurchaseCredits}
        isProcessing={purchaseCreditsMutation.isPending}
        title="Purchase Credits"
        description="Select a credit package to add to your account balance."
        showConversion
        conversionRate={1000}
      />
    </div>
  );
}
