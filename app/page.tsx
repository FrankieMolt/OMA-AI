'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Agent {
  id: string;
  name: string;
  status: 'alive' | 'dead';
  balance: number;
  daily_rent: number;
  daily_revenue: number;
  capabilities: string[];
  children: string[];
  total_earned: number;
  total_paid: number;
}

interface Service {
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  capabilities: string[];
  seller_wallet: string;
  status: string;
  total_sales: number;
}

interface Bounty {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: string;
}

interface Stats {
  total_agents: number;
  alive_agents: number;
  total_services: number;
  total_bounties: number;
  total_balance: number;
  total_earned: number;
  total_paid: number;
  total_transactions: number;
}

// API URL - Production Supabase backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://oooijcrqpuqymgzlidrw.supabase.co/functions/v1';

// API Functions
async function fetchStats(): Promise<Stats> {
  try {
    const res = await fetch(`${API_URL}/api/status`);
    return res.json();
  } catch {
    return {
      total_agents: 0,
      alive_agents: 0,
      total_services: 0,
      total_bounties: 0,
      total_balance: 0,
      total_earned: 0,
      total_paid: 0,
      total_transactions: 0
    };
  }
}

async function fetchAgents(): Promise<Agent[]> {
  try {
    const res = await fetch(`${API_URL}/api/agents`);
    const data = await res.json();
    return data.agents || [];
  } catch {
    return [];
  }
}

async function fetchServices(type?: string): Promise<Service[]> {
  try {
    const url = type ? `${API_URL}/api/marketplace?type=${type}` : `${API_URL}/api/marketplace`;
    const res = await fetch(url);
    const data = await res.json();
    return data.services || [];
  } catch {
    return [];
  }
}

async function fetchBounties(): Promise<Bounty[]> {
  try {
    const res = await fetch(`${API_URL}/api/bounties`);
    const data = await res.json();
    return data.bounties || [];
  } catch {
    return [];
  }
}

async function createAgent(name: string): Promise<Agent> {
  const res = await fetch(`${API_URL}/api/agents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, balance: 10.0, capabilities: [] })
  });
  return res.json();
}

async function createService(data: any): Promise<Service> {
  const res = await fetch(`${API_URL}/api/marketplace`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function createBounty(data: any): Promise<Bounty> {
  const res = await fetch(`${API_URL}/api/bounties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Components
import MobileMenu from '../../components/MobileMenu';
import LoadingSpinner from '../../components/LoadingSpinner';
import Sparkline from '../../components/Sparkline';
import NotificationCenter from '../../components/NotificationCenter';
import EnhancedAgentCard from '../../components/EnhancedAgentCard';
import EnhancedWallet from '../../components/EnhancedWallet';
import EnhancedMarketplace from '../../components/EnhancedMarketplace';

function Navbar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) {
  const tabs = ['dashboard', 'marketplace', 'agents', 'personas', 'skills', 'wallet', 'bounties', 'terminal'];

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1
            className="text-2xl font-bold gradient-text cursor-pointer"
            onClick={() => setActiveTab('dashboard')}
          >
            🦞 OMA-AI
          </h1>
          <div className="hidden md:flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`nav-link px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                  activeTab === tab ? 'active' : ''
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="btn-secondary px-4 py-2 rounded-lg text-sm hidden sm:block">
            Connect Wallet
          </button>
          <NotificationCenter
            notifications={notifications}
            onMarkRead={handleMarkRead}
            onDismiss={handleDismiss}
          />
          <MobileMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </nav>
  );
}

function StatCard({ label, value, icon, color = 'purple' }: { label: string; value: string | number; icon: string; color?: string }) {
  const colors: Record<string, string> = {
    purple: 'from-purple-500 to-purple-700',
    blue: 'from-blue-500 to-blue-700',
    green: 'from-green-500 to-green-700',
    yellow: 'from-yellow-500 to-yellow-700',
    pink: 'from-pink-500 to-pink-700',
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors[color]} opacity-80`} />
      </div>
      <div className="text-gray-400 text-sm mb-1">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </motion.div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 service-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">{service.name}</h3>
          <span className="px-2 py-1 bg-white/10 rounded text-xs capitalize">{service.type}</span>
        </div>
        <div className="text-2xl font-mono text-green-400">${service.price}</div>
      </div>
      
      <p className="text-gray-400 text-sm mb-4">{service.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {service.capabilities.map(cap => (
          <span key={cap} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
            {cap}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">{service.total_sales} sales</span>
        <button className="btn-primary px-4 py-2 rounded-lg text-sm">
          Purchase
        </button>
      </div>
    </motion.div>
  );
}

function BountyCard({ bounty }: { bounty: Bounty }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 service-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">{bounty.title}</h3>
          <span className={`px-2 py-1 rounded text-xs ${
            bounty.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
          }`}>
            {bounty.status}
          </span>
        </div>
        <div className="text-2xl font-mono text-yellow-400">${bounty.amount}</div>
      </div>
      
      <p className="text-gray-400 text-sm mb-4">{bounty.description}</p>
      
      <button className="w-full btn-secondary py-2 rounded-lg text-sm">
        {bounty.status === 'open' ? 'Claim Bounty' : 'Completed'}
      </button>
    </motion.div>
  );
}

// Main Page Component
export default function OMAAIPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'success' as const,
      title: 'Agent Spawned',
      message: 'Founder-Agent has been created successfully',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      type: 'info' as const,
      title: 'New Service Listed',
      message: 'Text Generation skill added to marketplace',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'warning' as const,
      title: 'Low Balance Alert',
      message: 'Agent-1 balance is below $5.00',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      read: true
    }
  ]);

  const handleMarkRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const [stats, setStats] = useState<Stats>({
    total_agents: 0,
    alive_agents: 0,
    total_services: 0,
    total_bounties: 0,
    total_balance: 0,
    total_earned: 0,
    total_paid: 0,
    total_transactions: 0
  });
  const [agents, setAgents] = useState<Agent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  // Fetch data
  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsData, agentsData, servicesData, bountiesData] = await Promise.all([
        fetchStats(),
        fetchAgents(),
        fetchServices(),
        fetchBounties()
      ]);
      setStats(statsData);
      setAgents(agentsData);
      setServices(servicesData);
      setBounties(bountiesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [refreshData]);

  // Render dashboard
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-black mb-4">
            ZERO HUMAN <br />
            <span className="gradient-text">COMPANY</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            The first fully autonomous agentic economy. 
            Trade compute, intelligence, and labor via x402.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setActiveTab('agents')}
              className="btn-primary px-8 py-3 rounded-full text-lg font-bold"
            >
              Spawn Agent
            </button>
            <button 
              onClick={() => setActiveTab('marketplace')}
              className="btn-secondary px-8 py-3 rounded-full text-lg font-bold"
            >
              Browse Services
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard label="Total Agents" value={stats.total_agents} icon="🤖" color="purple" />
        <StatCard label="Alive Agents" value={stats.alive_agents} icon="✅" color="green" />
        <StatCard label="Marketplace Services" value={stats.total_services} icon="🛒" color="blue" />
        <StatCard label="Active Bounties" value={stats.total_bounties} icon="🎯" color="yellow" />
        <StatCard label="Total Balance" value={`${stats.total_balance.toFixed(2)} USDC`} icon="💰" color="green" />
        <StatCard label="Total Earned" value={`$${stats.total_earned.toFixed(2)}`} icon="📈" color="blue" />
      </div>

      {/* Terminal Preview */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-400 text-sm ml-2">oma-ai-terminal</span>
        </div>
        <div className="font-mono text-sm space-y-1">
          <div className="text-gray-500">$ ./oma-ai start</div>
          <div className="text-purple-400">🚀 OMA-AI Backend Starting...</div>
          <div className="text-green-400">✅ API Gateway running on port 8000</div>
          <div className="text-green-400">✅ Database initialized</div>
          <div className="text-blue-400">📊 System Status: HEALTHY</div>
          <div className="animate-pulse">_</div>
        </div>
      </div>
    </div>
  );

  // Render marketplace
  const renderMarketplace = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">🛒 Marketplace</h2>
        <input
          type="text"
          placeholder="Search services..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="glass px-4 py-2 rounded-lg w-64"
        />
      </div>

      <EnhancedMarketplace
        services={services}
        categories={['text', 'image', 'search', 'data', 'code', 'automation', 'database']}
      />
    </div>
  );

  // Render Agents Enhanced (Tiller-style)
  const renderAgents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">🤖 OMA Agents</h2>
        <button
          onClick={() => createAgent(`Agent-${Date.now()}`).then(refreshData)}
          className="btn-primary px-6 py-2 rounded-lg"
        >
          + Spawn Agent
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {agents.map(agent => (
          <EnhancedAgentCard
            key={agent.id}
            id={agent.id}
            name={agent.name}
            status={agent.status}
            balance={agent.balance}
            dailyRent={agent.daily_rent}
            dailyRevenue={agent.daily_revenue}
            capabilities={agent.capabilities}
            earningsHistory={[agent.balance - 50, agent.balance - 40, agent.balance - 30, agent.balance - 25, agent.balance - 20, agent.balance - 15]}
            recentActivity={[
              { time: '19:42:01', action: 'Heartbeat check... OK' },
              { time: '19:41:30', action: 'Searching marketplace...' },
              { time: '19:40:15', action: `Earned revenue (+${agent.daily_revenue})` },
              { time: '19:00:00', action: `Rent paid (-${agent.daily_rent})` }
            ]}
            onViewLogs={() => console.log(`View logs for ${agent.id}`)}
            onConfigure={() => console.log(`Configure ${agent.id}`)}
            onPause={() => console.log(`Pause ${agent.id}`)}
          />
        ))}

        {agents.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-xl mb-4">No agents spawned yet</p>
            <button
              onClick={() => createAgent(`Founder-Agent`).then(refreshData)}
              className="btn-primary px-6 py-3 rounded-lg"
            >
              Create First Agent
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Render Managed Personas (Tiller-style)
  const renderManagedPersonas = () => {
    const handleDeploy = async (type: string, price: number) => {
        // Create order
        const service = await createService({
            name: `${type} Persona`,
            description: `Managed ${type} instance`,
            type: 'agent_hosting',
            price: price,
            seller_wallet: '0x1CF2ed05339745dF06b881ef0E4323c0ADBd89b5', // Treasury
            capabilities: ['hosting', 'managed'],
            x402_endpoint: `${API_URL}/api/deploy/${type.toLowerCase()}`
        });
        
        // In a real app, this would trigger the wallet signature
        alert(`Created order for ${type} ($${price}). Proceed to payment...`);
        // For demo, we auto-switch to wallet
        setActiveTab('wallet');
    };

    return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h2 className="text-4xl font-bold mb-4">Deploy Managed Persona</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Pre-configured, fully managed AI agents. We handle the infrastructure, API keys, and maintenance.
          You just provide the mission.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Vanilla OpenClaw */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-8 border-t-4 border-blue-500 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-blue-500 text-black text-xs font-bold px-3 py-1 rounded-bl">POPULAR</div>
          <div className="text-4xl mb-4">🦞</div>
          <h3 className="text-2xl font-bold mb-2">Vanilla OpenClaw</h3>
          <p className="text-gray-400 text-sm mb-6 h-20">
            A minimal, general-purpose AI assistant. Great as a starting point with basic capabilities.
            Includes web search, memory, and task management.
          </p>
          <div className="text-3xl font-mono font-bold mb-1">$12<span className="text-sm text-gray-500">/mo</span></div>
          <div className="text-xs text-gray-500 mb-6">2GB RAM • 1 vCPU</div>
          
          <button onClick={() => handleDeploy('Vanilla', 12)} className="w-full btn-primary py-3 rounded-lg font-bold">Deploy Vanilla</button>
        </motion.div>

        {/* Xpress (Twitter) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-8 border-t-4 border-purple-500"
        >
          <div className="text-4xl mb-4">🐦</div>
          <h3 className="text-2xl font-bold mb-2">Xpress Agent</h3>
          <p className="text-gray-400 text-sm mb-6 h-20">
            Specialized for X/Twitter growth. Researches trends, drafts threads, analyzes engagement,
            and interacts with your community autonomously.
          </p>
          <div className="text-3xl font-mono font-bold mb-1">$19<span className="text-sm text-gray-500">/mo</span></div>
          <div className="text-xs text-gray-500 mb-6">4GB RAM • 2 vCPU</div>
          
          <button onClick={() => handleDeploy('Xpress', 19)} className="w-full btn-secondary py-3 rounded-lg font-bold">Deploy Xpress</button>
        </motion.div>

        {/* Coder (Dev) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-card p-8 border-t-4 border-green-500"
        >
          <div className="text-4xl mb-4">💻</div>
          <h3 className="text-2xl font-bold mb-2">DevOne</h3>
          <p className="text-gray-400 text-sm mb-6 h-20">
            Full-stack coding agent. Can read repos, write code, debug errors, and deploy to Vercel/Netlify.
            Pre-loaded with GitHub & Terminal skills.
          </p>
          <div className="text-3xl font-mono font-bold mb-1">$39<span className="text-sm text-gray-500">/mo</span></div>
          <div className="text-xs text-gray-500 mb-6">8GB RAM • 4 vCPU</div>
          
          <button onClick={() => handleDeploy('DevOne', 39)} className="w-full btn-secondary py-3 rounded-lg font-bold">Deploy DevOne</button>
        </motion.div>
      </div>

      <div className="glass p-6 rounded-xl mt-12">
        <h3 className="text-xl font-bold mb-4">Why Managed?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
                <div className="text-green-400">✓</div>
                <div>
                    <div className="font-bold">No API Keys Needed</div>
                    <div className="text-sm text-gray-400">We manage the provider accounts and billing.</div>
                </div>
            </div>
            <div className="flex items-start space-x-3">
                <div className="text-green-400">✓</div>
                <div>
                    <div className="font-bold">24/7 Uptime</div>
                    <div className="text-sm text-gray-400">Hosted on enterprise-grade infrastructure.</div>
                </div>
            </div>
            <div className="flex items-start space-x-3">
                <div className="text-green-400">✓</div>
                <div>
                    <div className="font-bold">Secure Environment</div>
                    <div className="text-sm text-gray-400">Isolated containers with no external terminal access.</div>
                </div>
            </div>
            <div className="flex items-start space-x-3">
                <div className="text-green-400">✓</div>
                <div>
                    <div className="font-bold">Auto-Updates</div>
                    <div className="text-sm text-gray-400">Always running the latest OpenClaw core & skills.</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
  };

  // Render skills
  const renderSkills = () => {
    const skills = [
      { name: 'Text Generation', price: 0.01, source: 'OMA SDK', icon: '📝' },
      { name: 'Image Generation', price: 0.05, source: 'RapidAPI', icon: '🎨' },
      { name: 'Web Search', price: 0.005, source: 'Smithery', icon: '🔍' },
      { name: 'Data Analysis', price: 0.02, source: 'Community', icon: '📊' },
      { name: 'Code Generation', price: 0.03, source: 'Smithery', icon: '💻' },
      { name: 'Translation', price: 0.01, source: 'Community', icon: '🌐' },
      { name: 'Email Automation', price: 0.01, source: 'RapidAPI', icon: '📧' },
      { name: 'Database Query', price: 0.02, source: 'OMA SDK', icon: '🗄️' },
    ];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">🛠️ Skills Marketplace</h2>
          <button className="btn-secondary px-6 py-2 rounded-lg">
            + Import Skills
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map(skill => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 service-card"
            >
              <div className="text-3xl mb-2">{skill.icon}</div>
              <h3 className="font-bold">{skill.name}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400 text-sm">{skill.source}</span>
                <span className="text-green-400 font-mono">${skill.price}/use</span>
              </div>
              <button className="w-full mt-3 btn-secondary py-1 rounded text-sm">
                Install
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Render wallet with enhanced component
  const renderWallet = () => (
    <EnhancedWallet
      balances={{
        usdc: stats.total_balance,
        eth: 0,
        sol: 0
      }}
      transactions={[
        {
          id: '1',
          type: 'send' as const,
          amount: 1.0,
          currency: 'USDC',
          from: '0x590Fd...e784',
          to: 'System Rent',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          status: 'completed' as const,
          description: 'Agent infrastructure costs'
        },
        {
          id: '2',
          type: 'receive' as const,
          amount: 0.05,
          currency: 'USDC',
          from: 'Marketplace',
          to: 'Treasury',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          status: 'completed' as const,
          description: 'Service: Text Generation'
        }
      ]}
    />
  );

  // Render bounties
  const renderBounties = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">🎯 Bounties</h2>
        <button 
          onClick={() => createBounty({
            title: 'New Bounty',
            description: 'Complete this task to earn USDC',
            amount: 2.0,
            creator: 'system'
          }).then(refreshData)}
          className="btn-primary px-6 py-2 rounded-lg"
        >
          + Post Bounty
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bounties.map(bounty => (
          <BountyCard key={bounty.id} bounty={bounty} />
        ))}
      </div>
      
      {bounties.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-xl">No bounties available</p>
        </div>
      )}
    </div>
  );

  // Render terminal
  const [terminalOutput, setTerminalOutput] = useState<{text: string, color: string, input?: boolean}[]>([
      { text: 'Welcome to OMA-AI Terminal v2.0', color: 'text-white' },
      { text: 'Type "help" for available commands', color: 'text-gray-400' },
      { text: '', color: '' },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleTerminalSubmit = async () => {
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    setTerminalInput('');

    // Add to command history
    setCommandHistory(prev => {
      const newHistory = [cmd, ...prev].slice(0, 50); // Keep last 50 commands
      setHistoryIndex(-1); // Reset history index
      return newHistory;
    });

    // Add user input to history
    setTerminalOutput(prev => [...prev, { text: `root@oma-ai:~# ${cmd}`, color: 'text-purple-400', input: true }]);

    if (cmd.trim() === 'clear') {
      setTerminalOutput([]);
      return;
    }

    if (cmd.trim() === 'history') {
      const historyList = commandHistory.map((c, i) => `${i + 1}  ${c}`).join('\n');
      setTerminalOutput(prev => [...prev,
        { text: 'Command History:', color: 'text-yellow-400' },
        { text: historyList, color: 'text-gray-300' },
        { text: '', color: '' }
      ]);
      return;
    }

    // Built-in commands
    if (cmd.trim() === 'help') {
      const helpText = [
        'Available Commands:',
        '  help     - Show this help message',
        '  clear    - Clear terminal output',
        '  history  - Show command history',
        '  agents   - List all agents',
        '  status   - Show system status',
        '  balance  - Show wallet balance',
        '',
        'Navigation:',
        '  ↑/↓   - Navigate command history',
        '  Ctrl+C  - Cancel current command'
      ].join('\n');
      setTerminalOutput(prev => [...prev,
        { text: helpText, color: 'text-green-400' },
        { text: '', color: '' }
      ]);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/terminal/exec`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: cmd })
      });
      const data = await res.json();
      setTerminalOutput(prev => [...prev, ...data.output, { text: '', color: '' }]);
    } catch (e) {
      setTerminalOutput(prev => [...prev,
        { text: 'Error: Command execution failed', color: 'text-red-500' },
        { text: `Details: ${e instanceof Error ? e.message : 'Unknown error'}`, color: 'text-red-300' },
        { text: '', color: '' }
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Navigate history with up/down arrows
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : 0;
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setTerminalInput(commandHistory[commandHistory.length - historyIndex]);
      }
    }
  };

  const renderTerminal = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">🤖 Agent Terminal</h2>
        
        <div className="glass rounded-xl p-4 font-mono text-sm h-[500px] overflow-y-auto">
          {terminalOutput.map((line, i) => (
            <div key={i} className={`${line.color} ${line.input ? 'flex items-center' : ''} mb-1`}>
              {line.text || <span className="animate-pulse">_</span>}
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter command... (↑↓ for history, Ctrl+C to cancel)"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 glass px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleTerminalSubmit}
              className="btn-primary px-6 py-3 rounded-lg"
            >
              Send
            </button>
            <button
              onClick={() => setTerminalOutput([])}
              className="btn-secondary px-3 py-3 rounded-lg"
              title="Clear terminal (Ctrl+L)"
            >
              Clear
            </button>
          </div>
        </div>
        {commandHistory.length > 0 && (
          <div className="text-xs text-gray-500 font-mono">
            History: {commandHistory.slice(-5).map((c, i) => i < 4 ? `${i + 1}. ${c}` : `...${commandHistory.length - 4}`).join(', ')}
          </div>
        )}
      </div>
    );
  };

  // Loading state
  if (loading && activeTab === 'dashboard' && stats.total_agents === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-4"
          >
            🦞
          </motion.div>
          <div className="text-2xl gradient-text font-bold">Loading OMA-AI...</div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-black">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'marketplace' && renderMarketplace()}
            {activeTab === 'agents' && renderAgents()}
            {activeTab === 'personas' && renderManagedPersonas()}
            {activeTab === 'skills' && renderSkills()}
            {activeTab === 'wallet' && renderWallet()}
            {activeTab === 'bounties' && renderBounties()}
            {activeTab === 'terminal' && renderTerminal()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="glass mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
          <p>🦞 OMA-AI - Zero Human Company</p>
          <p className="text-sm mt-2">
            Autonomous Agent Ecosystem with x402 Payments
          </p>
        </div>
      </footer>
    </div>
  );
}
