'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Activity,
  Bot,
  Download,
  Plus,
  ShieldCheck,
  Users,
  CheckCircle,
  TrendingUp,
  Coins,
  ArrowRight,
  Filter,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ActivityFeed, ActivityType } from '@/components/dashboard/ActivityFeed';
import { NetworkYieldChart } from '@/components/dashboard/NetworkYieldChart';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useSSEClient, SSEMessage } from '@/components/dashboard/SSEClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PaymentModal, PaymentItem } from '@/components/web3/PaymentModal';
import { toast } from 'sonner';
import { type Listing } from '@/lib/types';

interface Activity {
  id: number;
  type: string;
  agent: string;
  cost: number;
  time: string;
}

interface DashboardStatsResponse {
  user: {
    credits: string;
    usdcBalance: string;
  };
  stats: {
    listingsCount: number;
    totalUsage: string;
    totalUsdValue: number;
  };
  listings: (Listing & { usage: number; revenue: string })[];
  recentActivities: Activity[];
}

export default function DashboardPage() {
  const [showPurchaseCreditsModal, setShowPurchaseCreditsModal] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [creditPackages] = useState<PaymentItem[]>([
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
  ]);

  // SSE for real-time updates
  const { isConnected, lastMessage, messages } = useSSEClient({
    endpoint: '/api/events',
    events: ['activity', 'balance', 'agent', 'system'],
    autoConnect: true,
    onMessage: (message: SSEMessage<unknown>) => {
      // Handle real-time messages
      if (message.type === 'balance') {
        // Trigger balance update refetch
      }
      if (message.type === 'activity') {
        toast.success('New Activity', {
          description: (message.data as { title: string; description?: string }).title,
        });
      }
    },
  });

  const { data: dashboardData } = useQuery<DashboardStatsResponse>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: systemHealth } = useQuery({
    queryKey: ['system-health'],
    queryFn: async () => ({
      cpu: 45,
      memory: 62,
      network: isConnected ? 98 : 95,
      status: isConnected ? 'optimal' : 'degraded',
    }),
  });

  // Extract data with fallbacks
  const stats = dashboardData?.stats || { listingsCount: 0, totalUsage: '0', totalUsdValue: 0 };
  const user = dashboardData?.user || { credits: '0', usdcBalance: '0' };
  const listings = dashboardData?.listings || [];
  const rawActivities = dashboardData?.recentActivities || [];

  // Transform activities to match ActivityFeed format
  const recentActivities = rawActivities.map((activity) => ({
    id: activity.id.toString(),
    type: activity.type as ActivityType,
    title: `Agent ${activity.agent || 'Unknown'}`,
    description: `Cost: ${activity.cost} credits`,
    timestamp: new Date(activity.time),
  }));

  // Add SSE activities
  const sseActivities = messages
    .filter((m) => m.type === 'activity')
    .map((m) => ({
      id: `sse-${m.timestamp}`,
      type: (m.data as { type: ActivityType }).type,
      title: (m.data as { title: string }).title,
      description: (m.data as { description?: string })?.description,
      timestamp: new Date(m.timestamp),
    }));

  const allActivities = [...sseActivities, ...recentActivities].slice(0, 10);

  const yieldData = { amount: '4,203.55', latency: '14' };

  const handlePurchaseCredits = async (items: PaymentItem[]) => {
    setIsPurchasing(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Credits purchased successfully!', {
        description: `${items[0].credits} credits added to your account`,
      });
      setShowPurchaseCreditsModal(false);
    } catch {  
      toast.error('Purchase failed', {
        description: 'Unable to process payment. Please try again.',
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground tracking-tight">
              Command Center <span className="text-primary">.01</span>
            </h1>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-warning'}`}
              />
              <span className="text-xs text-muted-foreground">
                {isConnected ? 'Live' : 'Connecting...'}
              </span>
            </div>
          </div>
          <p className="text-muted-foreground mt-1">
            Welcome back, Operator. System running at {systemHealth?.network || 98}% efficiency.
            {lastMessage && (
              <span className="ml-2 text-primary text-sm">
                Last update: {new Date(lastMessage.timestamp).toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="glass-enhanced border-border/60 hover:bg-foreground/5">
            <Download className="size-4 mr-2" />
            Export Report
          </Button>
          <Button
            variant="outline"
            className="glass-enhanced border-border/60 hover:bg-foreground/5"
            onClick={() => setShowPurchaseCreditsModal(true)}
          >
            <Zap className="size-4 mr-2 text-primary" />
            Buy Credits
          </Button>
          <Link href="/dashboard/create">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-neon">
              <Plus className="size-4 mr-2" />
              New Agent
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Credits"
          value={Number(user.credits).toLocaleString()}
          description={`≈ $${(Number(user.credits) * 0.01).toFixed(2)} USD`}
          icon={Coins}
          iconClassName="text-primary"
          trend={{
            value: 12,
            isPositive: true,
            label: 'vs last month',
          }}
          actionButton={
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
              onClick={() => setShowPurchaseCreditsModal(true)}
            >
              <Zap className="w-3 h-3 mr-1" />
              Buy More
            </Button>
          }
        />
        <StatsCard
          title="USDC Balance"
          value={parseFloat(user.usdcBalance).toFixed(2)}
          description="Available for withdrawal"
          icon={TrendingUp}
          iconClassName="text-success"
          trend={{
            value: 8,
            isPositive: true,
            label: 'vs last month',
          }}
        />
        <StatsCard
          title="Active Agents"
          value={stats.listingsCount}
          description="Deployed and running"
          icon={Users}
          iconClassName="text-accent"
          statusIndicator={
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success">All Online</span>
            </div>
          }
        />
        <StatsCard
          title="Total Usage"
          value={stats.totalUsage}
          description="API calls this month"
          icon={Activity}
          iconClassName="text-warning"
          trend={{
            value: 15,
            isPositive: true,
            label: 'vs last month',
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Chart */}
        <div className="lg:col-span-8">
          <NetworkYieldChart yieldAmount={yieldData.amount} latency={yieldData.latency} />
        </div>

        {/* Right Column - Quick Actions, Health & Activity */}
        <div className="lg:col-span-4 space-y-6">
          <QuickActions />

          {/* System Health */}
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-success" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">API Status</span>
                <Badge className="bg-success/20 text-success border-success/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {systemHealth?.status === 'optimal' ? 'Healthy' : 'Degraded'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">x402 Protocol</span>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">MCP Servers</span>
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              </div>
            </CardContent>
          </Card>

          <ActivityFeed activities={allActivities} />
        </div>
      </div>

      {/* Agents Table */}
      <Card className="glass-card border-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Your Agents
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-border/60 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Link href="/dashboard/agents">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border/60 text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard/create">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Deploy New
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {stats.listingsCount > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs uppercase text-muted-foreground tracking-wider border-b border-border/60">
                    <th className="px-6 py-4 font-medium">Agent</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Usage</th>
                    <th className="px-6 py-4 font-medium text-right">Revenue</th>
                    <th className="px-6 py-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {listings.map((listing: Listing) => (
                    <tr
                      key={listing.id}
                      className="group hover:bg-foreground/5 transition-colors border-b border-border/40"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Bot className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{listing.name}</div>
                            <div className="text-xs text-muted-foreground">
                              Deployed {listing.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-accent/20 text-accent border-accent/30">
                          {listing.category === 'agent'
                            ? 'AI Agent'
                            : (listing.category || 'skill').toUpperCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 ${listing.status === 'approved' ? 'bg-success' : 'bg-warning'} rounded-full animate-pulse`}
                          ></div>
                          <span
                            className={
                              listing.status === 'approved' ? 'text-success' : 'text-warning'
                            }
                          >
                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-medium text-foreground">
                          {listing.totalUsage?.toLocaleString() || '0'}
                        </div>
                        <div className="text-xs text-muted-foreground">calls today</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-medium text-success">$0.00</div>
                        <div className="text-xs text-muted-foreground">this month</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link href={`/marketplace/${listing.slug}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-foreground"
                            >
                              View
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-border/60 shadow-glow">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No agents deployed</h3>
              <p className="text-muted-foreground mb-6">Get started by deploying your first AI agent</p>
              <Link href="/dashboard/create">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Deploy Your First Agent
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Purchase Credits Modal */}
      <PaymentModal
        open={showPurchaseCreditsModal}
        onOpenChange={setShowPurchaseCreditsModal}
        items={creditPackages}
        currentBalance={Number(user.credits)}
        onConfirm={handlePurchaseCredits}
        isProcessing={isPurchasing}
        title="Purchase Credits"
        description="Select a credit package to add to your account balance."
        showConversion
        conversionRate={1000}
      />
    </div>
  );
}
