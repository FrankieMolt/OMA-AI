---
title: Real-Time Analytics Dashboard with OMA-Ai
description: Build and deploy real-time analytics dashboards for MCP usage, revenue tracking, and performance metrics.
date: 2026-03-12
author: OMA-Ai Team
tags: [analytics, dashboard, real-time, supabase, charts]
---

## Real-Time Analytics Dashboard with OMA-Ai

Monitor your MCP usage, track revenue, and analyze performance with OMA-Ai's real-time analytics dashboard. Built with Supabase real-time subscriptions, live data streams give you instant insights into your MCP marketplace.

## Table of Contents
1. [Dashboard Architecture](#dashboard-architecture)
2. [Real-Time Data Streams](#real-time-data-streams)
3. [Building the Dashboard](#building-the-dashboard)
4. [Key Metrics](#key-metrics)
5. [Revenue Analytics](#revenue-analytics)
6. [Performance Monitoring](#performance-monitoring)
7. [User Insights](#user-insights)
8. [Deployment](#deployment)

---

## Dashboard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    OMA-Ai Dashboard                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Revenue     │  │   Usage      │  │ Performance  │ │
│  │  Tracking    │  │   Metrics    │  │   Charts     │ │
│  │              │  │              │  │              │ │
│  │  - Daily     │  │  - Calls     │  │  - Response  │ │
│  │  - Monthly   │  │  - Users     │  │    Time      │ │
│  │  - Trend     │  │  - MCPs      │  │  - Uptime    │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │
│         │                 │                 │             │
│         └────────┬────────┴────────┬────────┘             │
│                  │                 │                      │
│         ┌────────▼─────────────────▼────────┐             │
│         │      Supabase Real-Time         │             │
│         │  (PostgreSQL Subscriptions)     │             │
│         └────────┬────────────────────────┘             │
│                  │                                      │
│         ┌────────▼────────┐                           │
│         │  Database       │                           │
│         │  - usage_stats  │                           │
│         │  - transactions │                           │
│         │  - mcps        │                           │
│         │  - users       │                           │
│         └────────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

### Key Components

1. **Supabase Real-Time:** Live data subscriptions
2. **Next.js Server Components:** Server-side rendering
3. **React Hooks:** State management
4. **Charts:** Visualization with Recharts
5. **API Routes:** Data aggregation

---

## Real-Time Data Streams

### 1. Subscribe to MCP Usage

```typescript
// src/lib/analytics/usage-subscription.ts
import { supabase } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export function useMCPUsage(mcpId: string) {
  const [usage, setUsage] = useState({
    dailyCalls: 0,
    monthlyCalls: 0,
    activeUsers: 0
  });

  useEffect(() => {
    // Fetch initial data
    fetchUsage();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`mcp-usage-${mcpId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'usage_stats',
          filter: `mcp_id=eq.${mcpId}`
        },
        (payload) => {
          setUsage(prev => ({
            dailyCalls: prev.dailyCalls + 1,
            monthlyCalls: prev.monthlyCalls + 1,
            activeUsers: prev.activeUsers + 1
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [mcpId]);

  return usage;
}

async function fetchUsage() {
  const { data } = await supabase
    .from('usage_stats')
    .select('*')
    .eq('mcp_id', mcpId);

  if (data) {
    const today = new Date().toISOString().split('T')[0];
    const dailyCalls = data.filter(row => row.date === today).length;
    const monthlyCalls = data.length;
    const activeUsers = new Set(data.map(row => row.user_id)).size;

    setUsage({ dailyCalls, monthlyCalls, activeUsers });
  }
}
```

### 2. Subscribe to Revenue

```typescript
// src/lib/analytics/revenue-subscription.ts
export function useRevenue(userId: string) {
  const [revenue, setRevenue] = useState({
    daily: 0,
    monthly: 0,
    pending: 0
  });

  useEffect(() => {
    // Fetch initial revenue
    fetchRevenue();

    // Subscribe to new transactions
    const channel = supabase
      .channel(`revenue-${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          const amount = payload.new.amount;
          setRevenue(prev => ({
            daily: prev.daily + amount,
            monthly: prev.monthly + amount,
            pending: prev.pending + amount
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return revenue;
}

async function fetchRevenue() {
  const today = new Date().toISOString().split('T')[0];
  const month = today.slice(0, 7); // YYYY-MM

  const { data } = await supabase
    .from('transactions')
    .select('amount, created_at')
    .eq('user_id', userId)
    .gte('created_at', `${month}-01`);

  if (data) {
    const daily = data
      .filter(row => row.created_at.startsWith(today))
      .reduce((sum, row) => sum + row.amount, 0);

    const monthly = data.reduce((sum, row) => sum + row.amount, 0);
    const pending = data.filter(row => row.status === 'pending').length;

    setRevenue({ daily, monthly, pending });
  }
}
```

### 3. Subscribe to Performance

```typescript
// src/lib/analytics/performance-subscription.ts
export function usePerformance(mcpId: string) {
  const [performance, setPerformance] = useState({
    avgResponseTime: 0,
    uptime: 100,
    errors: 0
  });

  useEffect(() => {
    // Poll performance metrics
    const interval = setInterval(async () => {
      const metrics = await fetchPerformanceMetrics(mcpId);
      setPerformance(metrics);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [mcpId]);

  return performance;
}

async function fetchPerformanceMetrics(mcpId: string) {
  const { data } = await supabase
    .from('audit_logs')
    .select('response_time, status')
    .eq('mcp_id', mcpId)
    .gte('created_at', new Date(Date.now() - 60000).toISOString()) // Last 60 seconds
    .limit(100);

  if (data) {
    const avgResponseTime = data.reduce((sum, row) => sum + row.response_time, 0) / data.length;
    const uptime = (data.filter(row => row.status === 200).length / data.length) * 100;
    const errors = data.filter(row => row.status >= 400).length;

    return { avgResponseTime, uptime, errors };
  }

  return { avgResponseTime: 0, uptime: 100, errors: 0 };
}
```

---

## Building the Dashboard

### Main Dashboard Layout

```typescript
// src/app/dashboard/page.tsx
'use client';

import { useMCPUsage } from '@/lib/analytics/usage-subscription';
import { useRevenue } from '@/lib/analytics/revenue-subscription';
import { usePerformance } from '@/lib/analytics/performance-subscription';
import { RevenueChart } from '@/components/analytics/RevenueChart';
import { UsageChart } from '@/components/analytics/UsageChart';
import { PerformanceMetrics } from '@/components/analytics/PerformanceMetrics';

export default function Dashboard() {
  const revenue = useRevenue(userId);
  const usage = useMCPUsage('all');
  const performance = usePerformance('all');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Daily Revenue"
          value={`$${revenue.daily.toFixed(2)}`}
          trend="+12.5%"
        />
        <MetricCard
          title="Monthly Revenue"
          value={`$${revenue.monthly.toFixed(2)}`}
          trend="+8.3%"
        />
        <MetricCard
          title="Daily Calls"
          value={usage.dailyCalls.toLocaleString()}
          trend="+15.2%"
        />
        <MetricCard
          title="Active Users"
          value={usage.activeUsers.toLocaleString()}
          trend="+5.7%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueChart />
        <UsageChart />
      </div>

      {/* Performance */}
      <PerformanceMetrics performance={performance} />
    </div>
  );
}

function MetricCard({ title, value, trend }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
      <div className={`text-sm mt-1 ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {trend} from last period
      </div>
    </div>
  );
}
```

### Revenue Chart

```typescript
// src/components/analytics/RevenueChart.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function RevenueChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  async function fetchRevenueData() {
    const response = await fetch('/api/analytics/revenue');
    const data = await response.json();
    setData(data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Revenue Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### Usage Chart

```typescript
// src/components/analytics/UsageChart.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function UsageChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchUsageData();
  }, []);

  async function fetchUsageData() {
    const response = await fetch('/api/analytics/usage');
    const data = await response.json();
    setData(data);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">MCP Usage</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => value.toLocaleString()}
          />
          <Bar dataKey="calls" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

### Performance Metrics

```typescript
// src/components/analytics/PerformanceMetrics.tsx
'use client';

interface PerformanceProps {
  performance: {
    avgResponseTime: number;
    uptime: number;
    errors: number;
  };
}

export function PerformanceMetrics({ performance }: PerformanceProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 rounded">
          <div className="text-gray-500 text-sm">Avg Response Time</div>
          <div className="text-2xl font-bold text-green-600">
            {performance.avgResponseTime.toFixed(0)}ms
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {performance.avgResponseTime < 100 ? 'Excellent' : 'Needs improvement'}
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded">
          <div className="text-gray-500 text-sm">Uptime</div>
          <div className="text-2xl font-bold text-blue-600">
            {performance.uptime.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Last 60 seconds
          </div>
        </div>

        <div className="p-4 bg-red-50 rounded">
          <div className="text-gray-500 text-sm">Errors</div>
          <div className="text-2xl font-bold text-red-600">
            {performance.errors}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Last 60 seconds
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Key Metrics

### 1. Revenue Metrics

```typescript
// API Route: /api/analytics/revenue
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  const { data } = await supabase
    .from('transactions')
    .select('amount, created_at')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  if (!data) {
    return NextResponse.json([]);
  }

  // Group by day
  const grouped = data.reduce((acc: any, row: any) => {
    const date = row.created_at.split('T')[0];
    if (!acc[date]) acc[date] = 0;
    acc[date] += row.amount;
    return acc;
  }, {});

  // Format for chart
  const chartData = Object.entries(grouped).map(([date, revenue]) => ({
    date,
    revenue
  }));

  return NextResponse.json(chartData);
}
```

### 2. Usage Metrics

```typescript
// API Route: /api/analytics/usage
export async function GET() {
  const { data } = await supabase
    .from('usage_stats')
    .select('mcp_id, call_count, date')
    .gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  if (!data) {
    return NextResponse.json([]);
  }

  // Group by MCP
  const grouped = data.reduce((acc: any, row: any) => {
    if (!acc[row.mcp_id]) acc[row.mcp_id] = 0;
    acc[row.mcp_id] += row.call_count;
    return acc;
  }, {});

  // Get MCP names
  const { data: mcps } = await supabase
    .from('mcps')
    .select('slug, name');

  const mcpNames = mcps?.reduce((acc: any, mcp: any) => {
    acc[mcp.slug] = mcp.name;
    return acc;
  }, {});

  // Format for chart
  const chartData = Object.entries(grouped).map(([slug, calls]) => ({
    name: mcpNames[slug] || slug,
    calls
  }));

  return NextResponse.json(chartData);
}
```

---

## Revenue Analytics

### 1. Daily Revenue Breakdown

```typescript
// src/lib/analytics/daily-revenue.ts
export async function getDailyRevenueBreakdown() {
  const { data } = await supabase
    .from('transactions')
    .select('amount, mcp_id, created_at')
    .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

  if (!data) return [];

  const breakdown = data.reduce((acc: any, tx: any) => {
    if (!acc[tx.mcp_id]) {
      acc[tx.mcp_id] = { amount: 0, calls: 0 };
    }
    acc[tx.mcp_id].amount += tx.amount;
    acc[tx.mcp_id].calls += 1;
    return acc;
  }, {});

  return Object.entries(breakdown).map(([mcpId, stats]: any) => ({
    mcpId,
    amount: stats.amount,
    calls: stats.calls
  }));
}
```

### 2. Top Revenue Sources

```typescript
export async function getTopRevenueSources(limit: number = 10) {
  const { data } = await supabase
    .from('transactions')
    .select('mcp_id, amount')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  if (!data) return [];

  const revenueByMCP = data.reduce((acc: any, tx: any) => {
    if (!acc[tx.mcp_id]) acc[tx.mcp_id] = 0;
    acc[tx.mcp_id] += tx.amount;
    return acc;
  }, {});

  return Object.entries(revenueByMCP)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, limit)
    .map(([mcpId, revenue]) => ({ mcpId, revenue }));
}
```

---

## Performance Monitoring

### 1. Response Time Tracking

```typescript
export async function trackResponseTime(mcpId: string, endpoint: string, responseTime: number) {
  await supabase
    .from('performance_metrics')
    .insert({
      mcp_id: mcpId,
      endpoint,
      response_time: responseTime,
      created_at: new Date().toISOString()
    });
}
```

### 2. Uptime Monitoring

```typescript
export async function checkUptime(mcpId: string) {
  const startTime = Date.now();

  try {
    const response = await fetch(`https://api.oma-ai.com/mcp/${mcpId}/health`);
    const responseTime = Date.now() - startTime;

    await supabase
      .from('uptime_checks')
      .insert({
        mcp_id: mcpId,
        status: response.ok ? 200 : 503,
        response_time: responseTime,
        created_at: new Date().toISOString()
      });

    return response.ok;
  } catch (error) {
    await supabase
      .from('uptime_checks')
      .insert({
        mcp_id: mcpId,
        status: 503,
        response_time: Date.now() - startTime,
        error: String(error),
        created_at: new Date().toISOString()
      });

    return false;
  }
}
```

---

## User Insights

### 1. Active Users

```typescript
export async function getActiveUsers() {
  const { data } = await supabase
    .from('usage_stats')
    .select('user_id, date')
    .gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

  if (!data) return [];

  const uniqueUsers = new Set(data.map(row => row.user_id));
  const usersByDate = data.reduce((acc: any, row: any) => {
    if (!acc[row.date]) acc[row.date] = new Set();
    acc[row.date].add(row.user_id);
    return acc;
  }, {});

  return {
    total: uniqueUsers.size,
    byDate: Object.entries(usersByDate).map(([date, users]) => ({
      date,
      users: users.size
    }))
  };
}
```

### 2. Retention Analysis

```typescript
export async function getRetentionRate() {
  const { data } = await supabase
    .from('usage_stats')
    .select('user_id, date')
    .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  if (!data) return 0;

  const usersByDate = data.reduce((acc: any, row: any) => {
    if (!acc[row.date]) acc[row.date] = new Set();
    acc[row.date].add(row.user_id);
    return acc;
  }, {});

  const dates = Object.keys(usersByDate).sort();

  let totalRetention = 0;
  let comparisons = 0;

  for (let i = 1; i < dates.length; i++) {
    const previousUsers = usersByDate[dates[i - 1]];
    const currentUsers = usersByDate[dates[i]];

    const retained = [...currentUsers].filter(user => previousUsers.has(user));
    const retentionRate = retained.length / previousUsers.size;

    totalRetention += retentionRate;
    comparisons++;
  }

  return totalRetention / comparisons;
}
```

---

## Deployment

### 1. Deploy Dashboard to Vercel

```bash
# Install dependencies
cd /root/oma-ai
npm install recharts

# Build
npm run build

# Deploy
npm run deploy
```

### 2. Set Up Cron Job for Background Checks

```bash
# Add to crontab
# Every 5 minutes, check uptime for all MCPs
*/5 * * * * node /root/oma-ai/scripts/check-uptime.js
```

### 3. Configure Alert Thresholds

```typescript
// src/lib/analytics/alerts.ts
export async function checkAlerts() {
  const performance = await fetchPerformanceMetrics();

  // Alert if response time > 200ms
  if (performance.avgResponseTime > 200) {
    await sendAlert({
      type: 'PERFORMANCE',
      message: `Average response time is ${performance.avgResponseTime}ms (>200ms threshold)`
    });
  }

  // Alert if uptime < 99%
  if (performance.uptime < 99) {
    await sendAlert({
      type: 'UPTIME',
      message: `Uptime is ${performance.uptime}% (<99% threshold)`
    });
  }

  // Alert if errors > 10
  if (performance.errors > 10) {
    await sendAlert({
      type: 'ERRORS',
      message: `${performance.errors} errors in last 60 seconds (>10 threshold)`
    });
  }
}
```

---

## Next Steps

### Immediate
1. Deploy dashboard to production
2. Set up real-time subscriptions
3. Configure alert thresholds
4. Test all components

### Short Term
5. Add email notifications for alerts
6. Create daily/weekly reports
7. Implement export functionality
8. Add mobile responsive design

### Long Term
9. Machine learning for predictions
10. Custom dashboards per user
11. Integration with external monitoring tools
12. API for third-party analytics

---

## Resources

- [Supabase Real-Time](https://supabase.com/docs/guides/realtime)
- [Recharts Documentation](https://recharts.org)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [OMA-Ai API](/docs/api)

---

*Published: March 12, 2026*
*Updated: March 12, 2026*
*Author: OMA-Ai Team*
