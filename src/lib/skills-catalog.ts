// Skills catalog — maps OpenClaw workspace skills to installable MCP configs
// Scanned from: ~/.openclaw/workspace/skills/

export interface SkillEntry {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: string[];
  author: string;
  repository?: string;
  mcp_endpoint: string;
  pricing_usdc: number;
  x402_enabled: boolean;
  verified: boolean;
  rating: number;
  calls: number;
  tier: 'free' | 'premium';
  tags: string[];
  tools: { name: string; description: string }[];
  tools_count: number;
  color: string;
  featured: boolean;
  install_config?: {
    mcpServers: Record<string, {
      transport: string;
      endpoint: string;
    }>;
  };
}

// These map OpenClaw workspace skills to installable configs
export const SKILLS_CATALOG: SkillEntry[] = [
  {
    name: 'Browser Automation Agent',
    slug: 'browser-automation-agent',
    description: 'Control any web browser programmatically. Navigate, click, screenshot, extract content.',
    longDescription: 'Headless Chrome automation for AI agents. Navigate, click elements, type text, submit forms, take screenshots, evaluate JavaScript, and extract structured data from any website.',
    category: ['Automation'],
    author: 'OMA-AI',
    mcp_endpoint: 'https://www.oma-ai.com/mcp/browser-automation',
    pricing_usdc: 0,
    x402_enabled: true,
    verified: true,
    rating: 4.6,
    calls: 18934,
    tier: 'free',
    tags: ['Browser', 'Automation', 'Chrome', 'Scraping'],
    tools: [
      { name: 'navigate', description: 'Navigate to a URL' },
      { name: 'click', description: 'Click an element by selector' },
      { name: 'type', description: 'Type text into an input field' },
      { name: 'submit', description: 'Submit a form' },
      { name: 'screenshot', description: 'Take a screenshot of the current page' },
      { name: 'evaluate', description: 'Execute JavaScript in the page context' },
      { name: 'get_text', description: 'Get text content from an element' },
      { name: 'wait_for', description: 'Wait for an element to appear' },
    ],
    tools_count: 8,
    color: '#4285F4',
    featured: false,
  },
  {
    name: 'Smart Contract Auditor',
    slug: 'smart-contract-auditor',
    description: 'Audit Solidity smart contracts for vulnerabilities. Check ownership, verify source, simulate execution.',
    longDescription: 'Automated smart contract security analysis. Audit contracts for common vulnerabilities, verify source code matches bytecode, check ownership structures, and simulate transaction execution.',
    category: ['Blockchain'],
    author: 'OMA-AI',
    mcp_endpoint: 'https://www.oma-ai.com/mcp/smart-contract-auditor',
    pricing_usdc: 0.005,
    x402_enabled: true,
    verified: true,
    rating: 4.8,
    calls: 8932,
    tier: 'premium',
    tags: ['Smart Contract', 'Security', 'Audit', 'Solidity', 'Ethereum'],
    tools: [
      { name: 'audit', description: 'Audit a smart contract for vulnerabilities' },
      { name: 'check_ownership', description: 'Check contract ownership structures' },
      { name: 'get_source', description: 'Verify source code matches bytecode' },
      { name: 'simulate', description: 'Simulate transaction execution' },
      { name: 'check_pausable', description: 'Check if contract is pausable' },
      { name: 'get_verification', description: 'Check if contract is verified on block explorer' },
    ],
    tools_count: 6,
    color: '#627EEA',
    featured: false,
  },
  {
    name: 'Self-Improving Agent',
    slug: 'self-improving-agent',
    description: 'An agent that learns from outcomes and refines its own strategy over time.',
    longDescription: 'A meta-cognitive agent skill that observes outcomes, reflects on performance, and autonomously improves its reasoning and strategy based on feedback loops.',
    category: ['AI Agents'],
    author: 'OMA-AI',
    mcp_endpoint: 'https://www.oma-ai.com/mcp/self-improving-agent',
    pricing_usdc: 0.002,
    x402_enabled: true,
    verified: true,
    rating: 4.7,
    calls: 14532,
    tier: 'premium',
    tags: ['AI Agent', 'Self-Improvement', 'Learning', 'Memory'],
    tools: [
      { name: 'learn', description: 'Learn from task outcomes' },
      { name: 'reflect', description: 'Self-reflect on performance' },
      { name: 'improve', description: 'Update strategy based on feedback' },
      { name: 'observe', description: 'Observe environment and state' },
      { name: 'plan', description: 'Plan next action' },
    ],
    tools_count: 5,
    color: '#a855f7',
    featured: false,
  },
  {
    name: 'Data Analyzer',
    slug: 'data-analyzer',
    description: 'Analyze datasets, generate insights, create visualizations.',
    longDescription: 'Statistical analysis and visualization for CSV, JSON, and SQL data sources. Generates summary statistics, correlation analysis, and chart-ready output formats.',
    category: ['Data'],
    author: 'OMA-AI',
    mcp_endpoint: 'https://www.oma-ai.com/mcp/data-analyzer',
    pricing_usdc: 0.001,
    x402_enabled: true,
    verified: true,
    rating: 4.5,
    calls: 7821,
    tier: 'free',
    tags: ['Data', 'Analytics', 'Visualization', 'CSV', 'Statistics'],
    tools: [
      { name: 'analyze', description: 'Run statistical analysis on a dataset' },
      { name: 'correlate', description: 'Find correlations in data' },
      { name: 'visualize', description: 'Generate visualization data (charts, graphs)' },
      { name: 'summarize', description: 'Create summary statistics' },
      { name: 'forecast', description: 'Generate forecasts from time-series data' },
    ],
    tools_count: 5,
    color: '#f59e0b',
    featured: false,
  },
  {
    name: 'Docker Manager',
    slug: 'docker-manager',
    description: 'Manage Docker containers, images, volumes, and networks.',
    longDescription: 'Full Docker daemon control. List and inspect containers, start/stop/restart, pull and remove images, manage volumes and networks, view and stream logs.',
    category: ['Infrastructure'],
    author: 'OMA-AI',
    mcp_endpoint: 'https://www.oma-ai.com/mcp/docker-manager',
    pricing_usdc: 0,
    x402_enabled: true,
    verified: true,
    rating: 4.5,
    calls: 11234,
    tier: 'free',
    tags: ['Docker', 'Containers', 'Infrastructure', 'DevOps'],
    tools: [
      { name: 'list_containers', description: 'List all Docker containers' },
      { name: 'get_container', description: 'Get container details and status' },
      { name: 'start_container', description: 'Start a stopped container' },
      { name: 'stop_container', description: 'Stop a running container' },
      { name: 'get_logs', description: 'Get container logs' },
    ],
    tools_count: 5,
    color: '#2496ED',
    featured: false,
  },
];
