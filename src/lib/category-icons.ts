import {
  Brain,
  Database,
  TrendingUp,
  Search,
  Code2,
  MessageSquare,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

// Category → Icon mapping
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'AI/ML': Brain,
  'Data & Databases': Database,
  'Finance & Crypto': TrendingUp,
  'Web & Search': Search,
  'Developer Tools': Code2,
  'Communication': MessageSquare,
  'Utilities': Wrench,
};

// Category → Color classes
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'AI/ML': {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
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
  'Web & Search': {
    bg: 'bg-cyan-500/20',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  'Developer Tools': {
    bg: 'bg-orange-500/20',
    text: 'text-orange-400',
    border: 'border-orange-500/30',
  },
  'Communication': {
    bg: 'bg-pink-500/20',
    text: 'text-pink-400',
    border: 'border-pink-500/30',
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
