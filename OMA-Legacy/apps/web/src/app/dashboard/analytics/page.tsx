import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { users, apiListings, usageRecords } from '@/lib/db';
import { count, sql, and } from 'drizzle-orm';
import { MetricsCards } from '@/components/dashboard/MetricsCard';
import { EnhancedAnalyticsChart } from '@/components/dashboard/EnhancedAnalyticsChart';
import {
  BarChart,
  Activity,
  Zap,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  Download,
} from 'lucide-react';

async function getAnalyticsData(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(sql`${users.email} = ${email}`)
    .limit(1);

  if (!user) return null;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Total API calls
  const totalCalls = await db
    .select({ value: count() })
    .from(usageRecords)
    .innerJoin(apiListings, sql`${usageRecords.apiId} = ${apiListings.id}`)
    .where(sql`${apiListings.ownerId} = ${user.id}`);

  // Total revenue (credits spent by users on your APIs)
  const revenueResult = await db
    .select({
      total: sql<number>`COALESCE(SUM(${usageRecords.creditsUsed}), 0)`,
    })
    .from(usageRecords)
    .innerJoin(apiListings, sql`${usageRecords.apiId} = ${apiListings.id}`)
    .where(sql`${apiListings.ownerId} = ${user.id}`);

  // Active APIs
  const activeApis = await db
    .select({ value: count() })
    .from(apiListings)
    .where(and(sql`${apiListings.ownerId} = ${user.id}`, sql`${apiListings.status} = 'approved'`));

  // Usage by day (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // This would normally use GROUP BY with date truncation
  // For simplicity, returning mock data
  const usageByDay = [
    { date: 'Mon', calls: 145, revenue: 12.5 },
    { date: 'Tue', calls: 182, revenue: 15.8 },
    { date: 'Wed', calls: 198, revenue: 17.2 },
    { date: 'Thu', calls: 234, revenue: 21.1 },
    { date: 'Fri', calls: 267, revenue: 24.5 },
    { date: 'Sat', calls: 189, revenue: 16.8 },
    { date: 'Sun', calls: 156, revenue: 13.2 },
  ];

  // Generate mock performance data
  const performanceData = [
    { date: '00:00', value: 95 },
    { date: '04:00', value: 98 },
    { date: '08:00', value: 92 },
    { date: '12:00', value: 88 },
    { date: '16:00', value: 91 },
    { date: '20:00', value: 94 },
  ];

  // Revenue trends
  const revenueData = [
    { date: 'Jan', value: 1200 },
    { date: 'Feb', value: 1450 },
    { date: 'Mar', value: 1320 },
    { date: 'Apr', value: 1680 },
    { date: 'May', value: 1520 },
    { date: 'Jun', value: 1890 },
  ];

  // User growth
  const userGrowthData = [
    { date: 'Jan', value: 150 },
    { date: 'Feb', value: 185 },
    { date: 'Mar', value: 220 },
    { date: 'Apr', value: 265 },
    { date: 'May', value: 310 },
    { date: 'Jun', value: 358 },
  ];

  return {
    user,
    totalCalls: totalCalls[0]?.value || 0,
    totalRevenue: parseFloat(revenueResult[0]?.total?.toString() || '0'),
    activeApis: activeApis[0]?.value || 0,
    usageByDay,
    performanceData,
    revenueData,
    userGrowthData,
    credits: parseInt(user.credits?.toString() || '0'),
  };
}

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser || !authUser.email) {
    redirect('/login');
  }

  const data = await getAnalyticsData(authUser.email);

  if (!data) {
    return <div className="p-8">Profile not found</div>;
  }

  const {
    totalCalls,
    totalRevenue,
    activeApis,
    usageByDay,
    performanceData,
    revenueData,
    userGrowthData,
    credits,
  } = data;

  // const maxCalls = Math.max(...usageByDay.map(d => d.calls))

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <BarChart className="text-primary" />
            Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your API performance, revenue, and user engagement in real-time
          </p>
        </div>
        <div className="flex gap-2">
          <button className="py-2 px-4 glass-panel hover:bg-foreground/10 border border-border/50 text-foreground rounded-lg text-sm font-medium transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString()}
          </button>
          <button className="py-2 px-4 glass-panel hover:bg-foreground/10 border border-border/50 text-foreground rounded-lg text-sm font-medium transition-all flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCards.TotalCalls
          value={totalCalls}
          change={{ value: 15, isPositive: true }}
          icon={Activity}
        />
        <MetricsCards.TotalRevenue
          value={`$${totalRevenue.toFixed(2)}`}
          change={{ value: 22, isPositive: true }}
          icon={DollarSign}
        />
        <MetricsCards.ActiveUsers
          value={activeApis}
          description="Active APIs"
          change={{ value: 8, isPositive: true }}
          icon={Zap}
        />
        <MetricsCards.ConversionRate
          value={`${(credits / 1000).toFixed(2)} USD`}
          description="Account Value"
          change={{ value: 12, isPositive: true }}
          icon={Users}
        />
      </div>

      {/* Enhanced Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EnhancedAnalyticsChart
          title="API Usage"
          description="Total API calls over time"
          data={usageByDay.map((d) => ({ date: d.date, value: d.calls }))}
          type="area"
          color="primary"
          periodButtons
          showTrend
          trendValue={15}
          onPeriodChange={() => {}}
        />
        <EnhancedAnalyticsChart
          title="Revenue"
          description="Total revenue generated from your APIs"
          data={revenueData}
          type="bar"
          color="success"
          periodButtons
          showTrend
          trendValue={22}
          onPeriodChange={() => {}}
        />
      </div>

      {/* Performance and User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EnhancedAnalyticsChart
          title="Performance Metrics"
          description="API response time and success rate"
          data={performanceData}
          type="line"
          color="accent"
          periodButtons
          showTrend
          trendValue={5}
          onPeriodChange={() => {}}
        />
        <EnhancedAnalyticsChart
          title="User Growth"
          description="New users and active sessions"
          data={userGrowthData}
          type="area"
          color="info"
          periodButtons
          showTrend
          trendValue={18}
          onPeriodChange={() => {}}
        />
      </div>

      {/* Top APIs Table */}
      <div className="glass-card rounded-xl border border-border/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Zap className="text-primary size-5" />
            Top Performing APIs
          </h3>
          <button className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
            View All
            <TrendingUp className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase text-muted-foreground tracking-wider border-b border-border/50">
                <th className="px-4 py-3 font-medium">API Name</th>
                <th className="px-4 py-3 font-medium text-right">Calls</th>
                <th className="px-4 py-3 font-medium text-right">Revenue</th>
                <th className="px-4 py-3 font-medium text-right">Avg. Duration</th>
                <th className="px-4 py-3 font-medium text-right">Success Rate</th>
                <th className="px-4 py-3 font-medium text-center">Trend</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-border/50 hover:bg-foreground/[0.02]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-success"></div>
                    <span className="font-medium">Artemis-V2</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono">1,234</td>
                <td className="px-4 py-3 text-right font-mono text-success">$123.40</td>
                <td className="px-4 py-3 text-right font-mono">245ms</td>
                <td className="px-4 py-3 text-right">
                  <span className="text-success">99.8%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <TrendingUp className="w-4 h-4 mx-auto text-success" />
                </td>
              </tr>
              <tr className="border-b border-border/50 hover:bg-foreground/[0.02]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-warning"></div>
                    <span className="font-medium">Data-Fetcher</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono">892</td>
                <td className="px-4 py-3 text-right font-mono text-success">$89.20</td>
                <td className="px-4 py-3 text-right font-mono">156ms</td>
                <td className="px-4 py-3 text-right">
                  <span className="text-success">99.2%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <TrendingUp className="w-4 h-4 mx-auto text-success" />
                </td>
              </tr>
              <tr className="border-b border-border/50 hover:bg-foreground/[0.02]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary"></div>
                    <span className="font-medium">ML-Predictor</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono">567</td>
                <td className="px-4 py-3 text-right font-mono text-success">$56.70</td>
                <td className="px-4 py-3 text-right font-mono">1.2s</td>
                <td className="px-4 py-3 text-right">
                  <span className="text-warning">98.5%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <TrendingUp className="w-4 h-4 mx-auto text-warning rotate-180" />
                </td>
              </tr>
              <tr className="border-b border-border/50 hover:bg-foreground/[0.02]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-accent"></div>
                    <span className="font-medium">Image-Processor</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono">423</td>
                <td className="px-4 py-3 text-right font-mono text-success">$42.30</td>
                <td className="px-4 py-3 text-right font-mono">890ms</td>
                <td className="px-4 py-3 text-right">
                  <span className="text-success">99.5%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <TrendingUp className="w-4 h-4 mx-auto text-success" />
                </td>
              </tr>
              <tr className="hover:bg-foreground/[0.02]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary"></div>
                    <span className="font-medium">Text-Analyzer</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-mono">356</td>
                <td className="px-4 py-3 text-right font-mono text-success">$35.60</td>
                <td className="px-4 py-3 text-right font-mono">412ms</td>
                <td className="px-4 py-3 text-right">
                  <span className="text-success">99.9%</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <TrendingUp className="w-4 h-4 mx-auto text-success" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
