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

// API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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

function Navbar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (t: string) => void }) {
  const tabs = ['dashboard', 'marketplace', 'agents', 'skills', 'wallet', 'bounties', 'terminal'];
  
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
          <button className="btn-secondary px-4 py-2 rounded-lg text-sm">
            Connect Wallet
          </button>
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

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 service-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold">{agent.name}</h3>
          <div className="text-gray-500 text-sm font-mono">{agent.id}</div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          agent.status === 'alive' ? 'status-alive' : 'status-dead'
        }`}>
          {agent.status.toUpperCase()}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-gray-400 text-xs">Balance</div>
          <div className="text-xl font-mono text-green-400">{agent.balance.toFixed(2)} USDC</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-gray-400 text-xs">Revenue/Day</div>
          <div className="text-xl font-mono text-blue-400">+{agent.daily_revenue}</div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {agent.capabilities.map(cap => (
          <span key={cap} className="px-2 py-1 bg-white/10 rounded text-xs">{cap}</span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>Children: {agent.children.length}</span>
        <span>Earned: ${agent.total_earned.toFixed(2)}</span>
      </div>
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
      
      <div className="marketplace-grid">
        {services
          .filter(s => s.name.toLowerCase().includes(filter.toLowerCase()))
          .map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
      </div>
    </div>
  );

  // Render agents
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
      
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
  );

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

  // Render wallet
  const renderWallet = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">💰 x402 Wallet</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 bg-gradient-to-br from-purple-600 to-blue-600">
          <div className="text-purple-200 text-sm mb-2">Total Balance</div>
          <div className="text-5xl font-mono font-bold">0.00 USDC</div>
          <div className="text-purple-200 text-sm mt-2">≈ $0.00 USD</div>
        </div>
        
        <div className="glass-card p-6">
          <div className="text-gray-400 text-sm mb-2">Base (EVM)</div>
          <div className="text-2xl font-mono">0.00</div>
          <div className="text-gray-500 text-xs mt-2 font-mono">0x1CF2...9b5</div>
        </div>
        
        <div className="glass-card p-6">
          <div className="text-gray-400 text-sm mb-2">Solana</div>
          <div className="text-2xl font-mono">0.00</div>
          <div className="text-gray-500 text-xs mt-2 font-mono">DFTTq...psgb</div>
        </div>
      </div>
      
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold mb-4">📜 Recent Transactions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">💸</div>
              <div>
                <div className="text-white">Payment Sent</div>
                <div className="text-gray-400 text-xs">OMA Agent Rent</div>
              </div>
            </div>
            <div className="text-red-400 font-mono">-1.00 USDC</div>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">💰</div>
              <div>
                <div className="text-white">Service Revenue</div>
                <div className="text-gray-400 text-xs">Marketplace Sale</div>
              </div>
            </div>
            <div className="text-green-400 font-mono">+0.05 USDC</div>
          </div>
        </div>
      </div>
    </div>
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
  const renderTerminal = () => {
    const lines = [
      { text: 'Welcome to OMA-AI Terminal', color: 'text-white' },
      { text: 'Type "help" for available commands', color: 'text-gray-400' },
      { text: '', color: '' },
      { text: 'root@oma-ai:~# ', color: 'text-purple-400', input: true },
    ];
    
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">🤖 Agent Terminal</h2>
        
        <div className="glass rounded-xl p-4 font-mono text-sm h-[500px] overflow-y-auto">
          {lines.map((line, i) => (
            <div key={i} className={`${line.color} ${line.input ? 'flex items-center' : ''} mb-1`}>
              {line.input && <span className="text-green-400 mr-2">$</span>}
              {line.text || <span className="animate-pulse">_</span>}
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter command..."
            className="flex-1 glass px-4 py-3 rounded-lg"
          />
          <button className="btn-primary px-6 py-3 rounded-lg">
            Send
          </button>
        </div>
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