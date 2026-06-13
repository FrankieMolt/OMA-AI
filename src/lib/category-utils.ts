/**
 * category-utils.ts - Centralized category mapping logic
 * 
 * CONSOLIDATED from multiple components to ensure consistency.
 * Single source of truth for:
 * - Category display names
 * - Category to icon mapping
 * - Category to color mapping
 * 
 * Add new categories HERE only - do not scatter category logic across components.
 */

import {
  Brain, Database, TrendingUp, Search, Code2, MessageSquare,
  Wrench, Globe, Terminal, Cloud, Bot, DollarSign, Layers,
  type LucideIcon,
} from 'lucide-react';

// ── Category Config Types ────────────────────────────────────────────────────

export interface CategoryInfo {
  name: string;
  displayName: string;
  icon: LucideIcon;
  colors: {
    bg: string;
    text: string;
    border: string;
    ring?: string;
  };
}

/**
 * Canonical category registry - add new categories HERE only
 */
export const CATEGORY_MAP: Record<string, CategoryInfo> = {
  // AI & ML
  'AI & ML': {
    name: 'AI & ML',
    displayName: 'AI & Machine Learning',
    icon: Brain,
    colors: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  },
  'AI Agents': {
    name: 'AI Agents',
    displayName: 'AI Agents',
    icon: Bot,
    colors: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30' },
  },
  'AI': {
    name: 'AI',
    displayName: 'AI & Machine Learning',
    icon: Brain,
    colors: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  },

  // Data
  'Data & Databases': {
    name: 'Data & Databases',
    displayName: 'Data & Databases',
    icon: Database,
    colors: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  },
  'Data': {
    name: 'Data',
    displayName: 'Data & Databases',
    icon: Database,
    colors: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  },

  // Finance
  'Finance & Crypto': {
    name: 'Finance & Crypto',
    displayName: 'Finance & Crypto',
    icon: TrendingUp,
    colors: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  },
  'Finance': {
    name: 'Finance',
    displayName: 'Finance & Crypto',
    icon: DollarSign,
    colors: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  },
  'Blockchain': {
    name: 'Blockchain',
    displayName: 'Blockchain',
    icon: Globe,
    colors: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  },
  'Crypto': {
    name: 'Crypto',
    displayName: 'Cryptocurrency',
    icon: TrendingUp,
    colors: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  },

  // Web & Search
  'Web & Search': {
    name: 'Web & Search',
    displayName: 'Web & Search',
    icon: Search,
    colors: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  },
  'Search': {
    name: 'Search',
    displayName: 'Search',
    icon: Search,
    colors: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  },
  'Research': {
    name: 'Research',
    displayName: 'Research',
    icon: Search,
    colors: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  },

  // Development
  'Developer Tools': {
    name: 'Developer Tools',
    displayName: 'Developer Tools',
    icon: Code2,
    colors: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  },
  'Development': {
    name: 'Development',
    displayName: 'Development',
    icon: Code2,
    colors: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  },

  // DevOps
  'DevOps': {
    name: 'DevOps',
    displayName: 'DevOps',
    icon: Cloud,
    colors: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  },
  'Infrastructure': {
    name: 'Infrastructure',
    displayName: 'Infrastructure',
    icon: Cloud,
    colors: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  },

  // Automation
  'Automation': {
    name: 'Automation',
    displayName: 'Automation',
    icon: Terminal,
    colors: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  },

  // Communication
  'Communication': {
    name: 'Communication',
    displayName: 'Communication',
    icon: MessageSquare,
    colors: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
  },

  // Design
  'Design': {
    name: 'Design',
    displayName: 'Design',
    icon: Layers,
    colors: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
  },

  // Utilities (default)
  'Utilities': {
    name: 'Utilities',
    displayName: 'Utilities',
    icon: Wrench,
    colors: { bg: 'bg-zinc-500/20', text: 'text-zinc-400', border: 'border-zinc-500/30' },
  },
};

// ── Default/Fallback ─────────────────────────────────────────────────────────

const DEFAULT_CATEGORY: CategoryInfo = {
  name: 'Utilities',
  displayName: 'Utilities',
  icon: Wrench,
  colors: { bg: 'bg-zinc-500/20', text: 'text-zinc-400', border: 'border-zinc-500/30' },
};

// ── Helper Functions ─────────────────────────────────────────────────────────

/**
 * Get category info by category name
 */
export function getCategoryInfo(category: string): CategoryInfo {
  return CATEGORY_MAP[category] || { ...DEFAULT_CATEGORY, name: category };
}

/**
 * Get category icon component
 */
export function getCategoryIcon(category: string): LucideIcon {
  return getCategoryInfo(category).icon;
}

/**
 * Get category color classes
 */
export function getCategoryColors(category: string): CategoryInfo['colors'] {
  return getCategoryInfo(category).colors;
}

/**
 * Get all unique categories from a list of MCP skills
 */
export function extractCategories(mcpList: Array<{ category?: string | string[] }>): string[] {
  const categories = new Set<string>(['all']);
  
  mcpList.forEach(mcp => {
    const cats = Array.isArray(mcp.category) ? mcp.category : [mcp.category].filter(Boolean);
    cats.forEach(c => c && categories.add(c));
  });
  
  return Array.from(categories);
}

/**
 * Normalize a category name to match known categories
 */
export function normalizeCategory(category: string): string {
  const upper = category.trim();
  
  // Direct match
  if (CATEGORY_MAP[upper]) return upper;
  
  // Case-insensitive match
  const lower = upper.toLowerCase();
  for (const key of Object.keys(CATEGORY_MAP)) {
    if (key.toLowerCase() === lower) return key;
  }
  
  // Partial match
  for (const key of Object.keys(CATEGORY_MAP)) {
    if (key.toLowerCase().includes(lower) || lower.includes(key.toLowerCase())) {
      return key;
    }
  }
  
  // Return original if no match (will use default styling)
  return upper;
}
