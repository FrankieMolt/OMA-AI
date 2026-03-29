import {
  Brain,
  Database,
  TrendingUp,
  Search,
  Code2,
  MessageSquare,
  Wrench,
  Globe,
  Terminal,
  Cloud,
  Bot,
  DollarSign,
  Layers,
  type LucideIcon,
} from 'lucide-react';

// Category → Icon mapping — covers all categories from MARKETPLACE_MCPS (lib/mcp-data.ts)
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  // Core set
  'AI/ML': Brain,
  'AI & ML': Brain,
  'Utilities': Wrench,
  'Communication': MessageSquare,
  'Developer Tools': Code2,

  // MARKETPLACE_MCPS categories (merged from both original data files)
  'Blockchain': Globe,
  'Search': Search,
  'DevOps': Cloud,
  'Infrastructure': Cloud,
  'Data': Database,
  'Automation': Terminal,
  'Finance': DollarSign,
  'AI Agents': Bot,

  // lib/mcp-data.ts categories
  'Data & Databases': Database,
  'Finance & Crypto': TrendingUp,
  'Web & Search': Search,
  'Research': Search,
  'Design': Layers,
  'Development': Code2,
};

// Category → Color classes — covers ALL MCP data categories
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'AI/ML': {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
  },
  'AI & ML': {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
  },
  'Blockchain': {
    bg: 'bg-indigo-500/20',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
  },
  'Data & Databases': {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
  },
  'Finance & Crypto': {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    border: 'border-green-500/30',
  },
  'Finance': {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    border: 'border-green-500/30',
  },
  'DevOps': {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  'Infrastructure': {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  'Developer Tools': {
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
  },
  'Development': {
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
  },
  'Communication': {
    bg: 'bg-pink-500/20',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
  },
  'Web & Search': {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  'Search': {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  'Research': {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  'Data': {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
  },
  'Automation': {
    bg: 'bg-amber-500/20',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
  },
  'Design': {
    bg: 'bg-pink-500/20',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
  },
  'AI Agents': {
    bg: 'bg-violet-500/20',
    text: 'text-violet-400',
    border: 'border-violet-500/30',
  },
  'Utilities': {
    bg: 'bg-zinc-500/20',
    text: 'text-zinc-400',
    border: 'border-zinc-500/30',
  },
};

const DEFAULT_ICON = Wrench;
const DEFAULT_COLORS = {
  bg: 'bg-zinc-500/20',
  text: 'text-zinc-400',
  border: 'border-zinc-500/30',
};

export function getCategoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] || DEFAULT_ICON;
}

export function getCategoryColors(category: string): { bg: string; text: string; border: string } {
  return CATEGORY_COLORS[category] || DEFAULT_COLORS;
}

export function getAllCategories(): string[] {
  return Object.keys(CATEGORY_ICONS);
}

// CATEGORIES — derived from CATEGORY_ICONS keys for backwards compatibility
// Used by: /api/marketplace/route.ts
export const CATEGORIES = Object.keys(CATEGORY_ICONS).map((name) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name,
  count: 0, // count is dynamic; set by the caller from MARKETPLACE_MCPS
}));
