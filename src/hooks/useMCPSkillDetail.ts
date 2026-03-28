import { useQuery } from '@tanstack/react-query';
import type { MCPSkill } from './useMCPMarketplace';

interface UseMCPSkillDetailResult {
  skill: MCPSkill | null;
  loading: boolean;
  error: string | null;
}

async function fetchSkill(slug: string): Promise<MCPSkill> {
  const response = await fetch(`/api/mcp/skill/${slug}`);
  const data = await response.json();
  if (!data.success) throw new Error(data.error ?? 'Skill not found');
  const s = data.data;
  return {
    id: String(s.id ?? ''),
    name: String(s.name ?? 'Unknown'),
    slug: String(s.slug ?? s.id ?? ''),
    category: Array.isArray(s.category)
      ? s.category
      : s.category
        ? [s.category]
        : ['Utilities'],
    description: String(s.description ?? ''),
    author: String(s.author ?? 'Unknown'),
    repository_url: s.repository_url ?? null,
    documentation_url: s.documentation_url ?? null,
    mcp_endpoint: String(s.mcp_endpoint ?? ''),
    pricing_usdc: Number(s.pricing_usdc ?? 0),
    x402_enabled: Boolean(s.x402_enabled ?? true),
    verified: Boolean(s.verified ?? false),
    rating: Number(s.rating ?? 0),
    total_calls: Number(s.total_calls ?? 0),
    success_rate: Number(s.success_rate ?? 0),
    created_at: s.created_at ?? new Date().toISOString(),
  };
}

export function useMCPSkillDetail(slug: string): UseMCPSkillDetailResult {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['mcp-skill', slug],
    queryFn: () => fetchSkill(slug),
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
    retry: 1,
  });

  return {
    skill: data ?? null,
    loading: isLoading,
    error: isError ? String(error) : null,
  };
}
