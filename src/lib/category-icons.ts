/**
 * OMA-AI Category Configuration
 *
 * SINGLE SOURCE OF TRUTH for category metadata (icon + color).
 * Icons and colors are NOT maintained separately — they're co-located here.
 *
 * Adding a new MCP category? Add one entry to CATEGORY_CONFIG.
 * Both CATEGORY_ICONS and CATEGORY_COLORS are derived from this array —
 * they stay in sync automatically.
 *
 * Categories must match: MARKETPLACE_MCPS[].category values (mcp-data.ts)
 * and the Supabase `mcp_servers.category` column.
 */

import {
  Brain, Database, TrendingUp, Search, Code2, MessageSquare,
  Wrench, Globe, Terminal, Cloud, Bot, DollarSign, Layers,
  type LucideIcon,
} from 'lucide-react';

export interface CategoryColor {
  bg: string;   // e.g. 'bg-purple-500/20'
  text: string; // e.g. 'text-purple-400'
  border: string; // e.g. 'border-purple-500/30'
}

export interface CategoryEntry {
  /** Exact category name as it appears in Supabase / MARKETPLACE_MCPS */
  name: string;
  icon: LucideIcon;
  colors: CategoryColor;
}

/**
 * Canonical category registry — add new categories HERE only.
 * Icon and color are always kept in sync per category.
 */
const CATEGORY_CONFIG: CategoryEntry[] = [
  // ── AI / Intelligence ──────────────────────────────────────────
  { name: 'AI & ML',          icon: Brain,        colors: { bg: 'bg-purple-500/20',   text: 'text-purple-400', border: 'border-purple-500/30' } },
  { name: 'AI Agents',        icon: Bot,          colors: { bg: 'bg-violet-500/20',   text: 'text-violet-400', border: 'border-violet-500/30' } },

  // ── Data ──────────────────────────────────────────────────────
  { name: 'Data & Databases', icon: Database,     colors: { bg: 'bg-blue-500/20',     text: 'text-blue-400',   border: 'border-blue-500/30' } },
  { name: 'Data',             icon: Database,     colors: { bg: 'bg-blue-500/20',     text: 'text-blue-400',   border: 'border-blue-500/30' } },

  // ── Finance / Crypto ───────────────────────────────────────────
  { name: 'Finance & Crypto', icon: TrendingUp,   colors: { bg: 'bg-green-500/20',    text: 'text-green-400',   border: 'border-green-500/30' } },
  { name: 'Finance',          icon: DollarSign,   colors: { bg: 'bg-green-500/20',    text: 'text-green-400',   border: 'border-green-500/30' } },
  { name: 'Blockchain',       icon: Globe,         colors: { bg: 'bg-indigo-500/20',  text: 'text-indigo-400', border: 'border-indigo-500/30' } },

  // ── Web / Search ───────────────────────────────────────────────
  { name: 'Web & Search',     icon: Search,        colors: { bg: 'bg-cyan-500/20',    text: 'text-cyan-400',    border: 'border-cyan-500/30' } },
  { name: 'Search',          icon: Search,        colors: { bg: 'bg-cyan-500/20',    text: 'text-cyan-400',    border: 'border-cyan-500/30' } },
  { name: 'Research',        icon: Search,        colors: { bg: 'bg-cyan-500/20',    text: 'text-cyan-400',    border: 'border-cyan-500/30' } },

  // ── Development ────────────────────────────────────────────────
  { name: 'Developer Tools',  icon: Code2,         colors: { bg: 'bg-orange-500/20',  text: 'text-orange-400', border: 'border-orange-500/30' } },
  { name: 'Development',      icon: Code2,         colors: { bg: 'bg-orange-500/20',  text: 'text-orange-400', border: 'border-orange-500/30' } },

  // ── Infrastructure / DevOps ────────────────────────────────────
  { name: 'DevOps',          icon: Cloud,         colors: { bg: 'bg-cyan-500/20',   text: 'text-cyan-400',   border: 'border-cyan-500/30' } },
  { name: 'Infrastructure',  icon: Cloud,         colors: { bg: 'bg-cyan-500/20',   text: 'text-cyan-400',   border: 'border-cyan-500/30' } },

  // ── Automation ─────────────────────────────────────────────────
  { name: 'Automation',      icon: Terminal,      colors: { bg: 'bg-amber-500/20',  text: 'text-amber-400',  border: 'border-amber-500/30' } },

  // ── Communication ─────────────────────────────────────────────
  { name: 'Communication',   icon: MessageSquare, colors: { bg: 'bg-pink-500/20',    text: 'text-pink-400',   border: 'border-pink-500/30' } },

  // ── Design ─────────────────────────────────────────────────────
  { name: 'Design',          icon: Layers,        colors: { bg: 'bg-pink-500/20',   text: 'text-pink-400',   border: 'border-pink-500/30' } },

  // ── Utilities / Fallback ──────────────────────────────────────
  { name: 'Utilities',       icon: Wrench,        colors: { bg: 'bg-zinc-500/20',    text: 'text-zinc-400',   border: 'border-zinc-500/30' } },
];

// ── Derived maps (always in sync with CATEGORY_CONFIG) ──────────────────

const CATEGORY_ICONS: Record<string, LucideIcon> = Object.fromEntries(
  CATEGORY_CONFIG.map((c) => [c.name, c.icon])
);

const CATEGORY_COLORS: Record<string, CategoryColor> = Object.fromEntries(
  CATEGORY_CONFIG.map((c) => [c.name, c.colors])
);

const DEFAULT_ICON = Wrench;
const DEFAULT_COLORS: CategoryColor = {
  bg: 'bg-zinc-500/20',
  text: 'text-zinc-400',
  border: 'border-zinc-500/30',
};

// ── Public API ─────────────────────────────────────────────────────────────

export function getCategoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] ?? DEFAULT_ICON;
}

export function getCategoryColors(category: string): CategoryColor {
  return CATEGORY_COLORS[category] ?? DEFAULT_COLORS;
}

export function getAllCategories(): string[] {
  return CATEGORY_CONFIG.map((c) => c.name);
}

/**
 * CATEGORIES — array of { id, name, count } for UI dropdowns.
 * count is dynamic (set by the caller from MARKETPLACE_MCPS).
 */
export const CATEGORIES = CATEGORY_CONFIG.map((c) => ({
  id: c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name: c.name,
  count: 0,
}));
