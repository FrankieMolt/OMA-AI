import { useQuery } from '@tanstack/react-query';

export interface MCPSkillDetail {
  id: string;
  name: string;
  slug: string;
  category: string[];
  description: string;
  long_description?: string;
  author: string;
  repository_url: string | null;
  documentation_url: string | null;
  mcp_endpoint: string;
  pricing_usdc: number;
  x402_enabled: boolean;
  verified: boolean;
  rating: number;
  total_calls: number;
  success_rate: number;
  tier: 'free' | 'premium';
  color?: string | null;
  featured?: boolean;
  tools?: { name: string; description: string }[];
  tags: string[];
  version: string;
  created_at: string;
}

interface UseMCPSkillDetailResult {
  skill: MCPSkillDetail | null;
  loading: boolean;
  error: string | null;
}

async function fetchSkill(slug: string): Promise<MCPSkillDetail> {
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
    long_description: s.long_description || s.description || '',
    author: String(s.author ?? 'Unknown'),
    repository_url: s.repository_url ?? s.repository ?? null,
    documentation_url: s.documentation_url ?? null,
    mcp_endpoint: String(s.mcp_endpoint ?? ''),
    pricing_usdc: Number(s.pricing_usdc ?? 0),
    x402_enabled: Boolean(s.x402_enabled ?? true),
    verified: Boolean(s.verified ?? false),
    rating: Number(s.rating ?? 0),
    total_calls: Number(s.total_calls ?? s.calls ?? 0),
    success_rate: Number(s.success_rate ?? 100),
    tier: s.tier === 'premium' ? 'premium' : 'free',
    color: s.color || null,
    featured: Boolean(s.featured ?? false),
    tools: Array.isArray(s.tools) ? s.tools : [],
    tags: Array.isArray(s.tags) ? s.tags : [],
    version: String(s.version ?? '1.0.0'),
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
