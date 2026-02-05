'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Server, 
  Terminal as TerminalIcon, 
  Wallet, 
  Globe, 
  Shield, 
  Activity, 
  Cpu, 
  Plus,
  Search,
  Settings,
  LogOut,
  ChevronRight,
  Code
} from 'lucide-react';

// Components
import EnhancedAgentCard from '@/components/EnhancedAgentCard';
import EnhancedWallet from '@/components/EnhancedWallet';
import EnhancedMarketplace from '@/components/EnhancedMarketplace';
import NotificationCenter from '@/components/NotificationCenter';

// --- API Configuration ---
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://oooijcrqpuqymgzlidrw.supabase.co/functions/v1';

// --- Types ---
interface SystemStatus {
  activeNodes: number;
  cpuLoad: number;
  memoryUsage: number;
  networkThroughput: number;
}

export default function Dashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    activeNodes: 12,
    cpuLoad: 45,
    memoryUsage: 62,
    networkThroughput: 128
  });

  // Mock data for the "Real" feel until Supabase is fully populated
  const [agents, setAgents] = useState([
    {
      id: 'inst-8f2a9c',
      name: 'Primary-Orchestrator',
      status: 'alive' as const,
      balance: 142.50,
      dailyRent: 2.50,
      dailyRevenue: 15.00,
      capabilities: ['orchestration', 'resource-management'],
      earningsHistory: [12, 14, 13, 15, 18, 15, 20],
      recentActivity: [
        { time: '10:42:01', action: 'Resource check completed' },
        { time: '10:41:30', action: 'Deployed child instance' },
      ]
    },
    {
      id: 'inst-3b7d1e',
      name: 'Market-Analyzer-01',
      status: 'alive' as const,
      balance: 89.20,
      dailyRent: 1.20,
      dailyRevenue: 8.50,
      capabilities: ['market-analysis', 'data-processing'],
      earningsHistory: [5, 6, 8, 7, 9, 8, 10],
      recentActivity: [
        { time: '10:40:15', action: 'Processed market stream' },
      ]
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'info' as const,
      title: 'System Update',
      message: 'Infrastructure upgrade completed successfully.',
      timestamp: new Date(),
      read: false
    }
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans selection:bg-zinc-800">
      {/* --- Sidebar Navigation --- */}
      <aside className="w-64 border-r border-border bg-zinc-950/50 backdrop-blur-xl fixed h-full z-10 flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-black rounded-md flex items-center justify-center font-bold text-sm">
              OM
            </div>
            <span className="font-semibold tracking-tight">OMA Infrastructure</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem 
            icon={<LayoutDashboard size={18} />} 
            label="Overview" 
            active={activeView === 'overview'} 
            onClick={() => setActiveView('overview')} 
          />
          <NavItem 
            icon={<Server size={18} />} 
            label="Instances" 
            active={activeView === 'instances'} 
            onClick={() => setActiveView('instances')} 
          />
          <NavItem 
            icon={<Globe size={18} />} 
            label="Service Registry" 
            active={activeView === 'registry'} 
            onClick={() => setActiveView('registry')} 
          />
          <NavItem 
            icon={<Wallet size={18} />} 
            label="Treasury" 
            active={activeView === 'treasury'} 
            onClick={() => setActiveView('treasury')} 
          />
          <NavItem 
            icon={<TerminalIcon size={18} />} 
            label="Console" 
            active={activeView === 'console'} 
            onClick={() => setActiveView('console')} 
          />
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            System Operational
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 ml-64 bg-background min-h-screen">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Organization / Default</span>
            <ChevronRight size={14} />
            <span className="text-foreground font-medium capitalize">{activeView}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="h-9 pl-9 pr-4 rounded-md bg-zinc-900 border border-input text-sm focus:outline-none focus:ring-1 focus:ring-ring w-64"
              />
            </div>
            <NotificationCenter 
              notifications={notifications} 
              onMarkRead={(id) => {}} 
              onDismiss={(id) => {}} 
            />
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-border flex items-center justify-center text-xs font-medium">
              JD
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeView === 'overview' && (
                <Overview activeNodes={systemStatus.activeNodes} agents={agents} />
              )}
              {activeView === 'instances' && (
                <Instances agents={agents} />
              )}
              {activeView === 'registry' && (
                <EnhancedMarketplace services={[]} categories={['Compute', 'Storage', 'Intelligence']} />
              )}
              {activeView === 'treasury' && (
                <EnhancedWallet 
                  balances={{ usdc: 1240.50, eth: 1.2, sol: 45.0 }} 
                  transactions={[]} 
                />
              )}
              {activeView === 'console' && (
                <div className="h-[600px] bg-black rounded-lg border border-border p-4 font-mono text-sm text-zinc-400">
                  <div className="mb-2">OMA Infrastructure Console v2.1.0</div>
                  <div className="text-green-500">root@oma-system:~# _</div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Sub-components ---

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
        active 
          ? 'bg-zinc-900 text-foreground font-medium' 
          : 'text-muted-foreground hover:text-foreground hover:bg-zinc-900/50'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Overview({ activeNodes, agents }: { activeNodes: number, agents: any[] }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Overview</h1>
        <p className="text-muted-foreground">System performance and active instance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard label="Active Instances" value={activeNodes.toString()} trend="+2.4%" />
        <MetricCard label="Network Load" value="45%" trend="-1.2%" neutral />
        <MetricCard label="Total Revenue" value="$1,240.50" trend="+12.5%" />
        <MetricCard label="System Health" value="99.9%" trend="Stable" neutral />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Deployments</h2>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {agents.map((agent: any) => (
              <EnhancedAgentCard 
                key={agent.id}
                {...agent}
                onViewLogs={() => {}}
                onConfigure={() => {}}
                onPause={() => {}}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">System Activity</h2>
          <div className="border border-border rounded-xl bg-card p-6 h-[400px]">
            <div className="text-sm text-muted-foreground text-center pt-32">
              Activity visualization stream initialized.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Instances({ agents }: { agents: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Instances</h1>
          <p className="text-muted-foreground">Manage your autonomous agent deployments.</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2">
          <Plus size={16} /> Deploy Instance
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {agents.map((agent: any) => (
          <EnhancedAgentCard 
            key={agent.id}
            {...agent}
          />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ label, value, trend, neutral }: { label: string, value: string, trend: string, neutral?: boolean }) {
  return (
    <div className="bg-card border border-border p-6 rounded-xl">
      <div className="text-sm text-muted-foreground mb-2">{label}</div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className={`text-xs font-medium ${neutral ? 'text-zinc-500' : 'text-green-500'}`}>
        {trend}
      </div>
    </div>
  );
}
