/**
 * MCP Marketplace API - List Skills
 * GET /api/mcp/list?page=1&limit=20&category=all&verified=false&sort=rating
 */

import type { NextApiRequest, NextApiResponse } from 'next';

// Mock database for MVP (replace with real Supabase queries)
const MCP_SKILLS = [
  {
    id: '1',
    name: 'Exa Web Search',
    slug: 'exa-web-search',
    category: ['search', 'ai'],
    description: 'High-quality semantic web search with AI-optimized query rewriting. Built on Exa API with automatic result ranking and caching.',
    author: 'oma-ai',
    repository_url: 'https://github.com/FrankieMolt/OMA-AI',
    documentation_url: 'https://docs.oma-ai.com/mcp/exa-web-search',
    mcp_endpoint: 'https://oma-ai.com/mcp/exa-web-search',
    pricing_usdc: 0.0005,
    x402_enabled: true,
    verified: true,
    rating: 4.5,
    total_calls: 100,
    success_rate: 98.5,
    created_at: '2026-03-10T00:00:00Z',
    updated_at: '2026-03-10T00:00:00Z',
  },
  {
    id: '2',
    name: 'ByteOver Memory',
    slug: 'byteover',
    category: ['storage', 'memory', 'ai'],
    description: 'Persistent agent context storage with semantic search and auto-curation. Compatible with ByteRover format, supports markdown files with hierarchical organization.',
    author: 'oma-ai',
    repository_url: 'https://github.com/FrankieMolt/OMA-AI',
    documentation_url: 'https://docs.oma-ai.com/mcp/byteover',
    mcp_endpoint: 'https://oma-ai.com/mcp/byteover',
    pricing_usdc: 0.001,
    x402_enabled: true,
    verified: true,
    rating: 4.8,
    total_calls: 150,
    success_rate: 99.2,
    created_at: '2026-03-10T00:00:00Z',
    updated_at: '2026-03-10T00:00:00Z',
  },
  {
    id: '3',
    name: 'Self-Improving Agent',
    slug: 'self-improving-agent',
    category: ['ai', 'learning', 'optimization'],
    description: 'AI agents that learn from outputs, analyze quality, and optimize future responses. Features pattern recognition, learning-based optimization, and weekly improvement reports.',
    author: 'oma-ai',
    repository_url: 'https://github.com/FrankieMolt/OMA-AI',
    documentation_url: 'https://docs.oma-ai.com/mcp/self-improving-agent',
    mcp_endpoint: 'https://oma-ai.com/mcp/self-improving-agent',
    pricing_usdc: 0.002,
    x402_enabled: true,
    verified: false,
    rating: 4.2,
    total_calls: 50,
    success_rate: 95.0,
    created_at: '2026-03-10T00:00:00Z',
    updated_at: '2026-03-10T00:00:00Z',
  },
  {
    id: '4',
    name: 'GitHub Repo Manager',
    slug: 'github-repo-manager',
    category: ['dev', 'github'],
    description: 'GitHub repository management, code review, and CI monitoring. Create issues, manage PRs, check CI status, and analyze code quality automatically.',
    author: 'oma-ai',
    repository_url: 'https://github.com/FrankieMolt/OMA-AI',
    documentation_url: 'https://docs.oma-ai.com/mcp/github-repo-manager',
    mcp_endpoint: 'https://oma-ai.com/mcp/github-repo-manager',
    pricing_usdc: 0.0015,
    x402_enabled: true,
    verified: true,
    rating: 4.0,
    total_calls: 200,
    success_rate: 97.0,
    created_at: '2026-03-10T00:00:00Z',
    updated_at: '2026-03-10T00:00:00Z',
  },
  {
    id: '5',
    name: 'Smart Contract Auditor',
    slug: 'smart-contract-auditor',
    category: ['blockchain', 'security', 'dev'],
    description: 'AI-powered smart contract security analysis and vulnerability detection. Supports Solidity, Vyper, and Rust contracts. Generates comprehensive audit reports.',
    author: 'oma-ai',
    repository_url: 'https://github.com/FrankieMolt/OMA-AI',
    documentation_url: 'https://docs.oma-ai.com/mcp/smart-contract-auditor',
    mcp_endpoint: 'https://oma-ai.com/mcp/smart-contract-auditor',
    pricing_usdc: 0.005,
    x402_enabled: true,
    verified: false,
    rating: 3.8,
    total_calls: 25,
    success_rate: 92.0,
    created_at: '2026-03-10T00:00:00Z',
    updated_at: '2026-03-10T00:00:00Z',
  },
  {
    id: '6',
    name: 'Weather Forecaster',
    slug: 'weather-forecaster',
    category: ['weather', 'data'],
    description: '7-day weather forecasts with precipitation, temperature, humidity, and wind data. Global coverage with hourly granularity for major cities.',
    author: 'oma-ai',
    repository_url: 'https://github.com/FrankieMolt/OMA-AI',
    documentation_url: 'https://docs.oma-ai.com/mcp/weather-forecaster',
    mcp_endpoint: 'https://oma-ai.com/mcp/weather-forecaster',
    pricing_usdc: 0.001,
    x402_enabled: true,
    verified: true,
    rating: 4.1,
    total_calls: 300,
    success_rate: 99.5,
    created_at: '2026-03-10T00:00:00Z',
    updated_at: '2026-03-10T00:00:00Z',
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  const {
    page = '1',
    limit = '20',
    category = 'all',
    verified,
    search,
    sort = 'rating',
  } = req.query;

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const offset = (pageNum - 1) * limitNum;

  // Start with all skills
  let skills = [...MCP_SKILLS];

  // Filter by category
  if (category !== 'all') {
    skills = skills.filter((skill) =>
      skill.category.includes(category as string)
    );
  }

  // Filter by verification status
  if (verified === 'true') {
    skills = skills.filter((skill) => skill.verified);
  } else if (verified === 'false') {
    skills = skills.filter((skill) => !skill.verified);
  }

  // Search by name or description
  if (search) {
    const query = (search as string).toLowerCase();
    skills = skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query) ||
        skill.category.some((c) => c.toLowerCase().includes(query))
    );
  }

  // Sort results
  switch (sort) {
    case 'rating':
      skills.sort((a, b) => b.rating - a.rating);
      break;
    case 'calls':
      skills.sort((a, b) => b.total_calls - a.total_calls);
      break;
    case 'price':
      skills.sort((a, b) => a.pricing_usdc - b.pricing_usdc);
      break;
    case 'newest':
      skills.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    default:
      skills.sort((a, b) => b.rating - a.rating);
  }

  // Pagination
  const total = skills.length;
  const paginatedSkills = skills.slice(offset, offset + limitNum);

  // Get unique categories
  const categories = [
    ...new Set(MCP_SKILLS.flatMap((skill) => skill.category)),
  ].sort();

  res.status(200).json({
    success: true,
    data: paginatedSkills,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      hasNextPage: offset + limitNum < total,
      hasPrevPage: pageNum > 1,
    },
    filters: {
      categories,
      verifiedSkillsCount: MCP_SKILLS.filter((s) => s.verified).length,
      totalSkills: MCP_SKILLS.length,
    },
  });
}
