/**
 * MCP utility functions — shared by MCPSkillCard and compare/page.
 * Extracted from compare/page.tsx lines 19-37.
 */

export function getLatencyDisplay(latency: number | undefined): string {
  if (!latency || latency <= 0) return 'N/A';
  if (latency < 1000) return `${latency}ms`;
  return `${(latency / 1000).toFixed(1)}s`;
}

export function getPricingDisplay(price: number): string {
  if (price === 0) return 'Free';
  if (price === 0.99) return '<$1';
  if (price === 4.99) return '<$5';
  return `$${price}`;
}

export function getSuccessRateColor(rate: number): { text: string; bg: string } {
  if (rate >= 99) return { text: 'text-green-400', bg: 'bg-green-500/20' };
  if (rate >= 97) return { text: 'text-emerald-400', bg: 'bg-emerald-500/20' };
  if (rate >= 95) return { text: 'text-yellow-400', bg: 'bg-yellow-500/20' };
  return { text: 'text-red-400', bg: 'bg-red-500/20' };
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.8) return 'text-purple-400';
  if (rating >= 4.5) return 'text-violet-400';
  if (rating >= 4.0) return 'text-indigo-400';
  if (rating >= 3.0) return 'text-gray-400';
  return 'text-gray-500';
}
