import { useQuery } from '@tanstack/react-query';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { MCPSkill } from '@/lib/types';

export type { MCPSkill } from '@/lib/types';

interface UseMCPMarketplaceOptions {
  skillsPerPage?: number;
}

async function fetchSkills(page: number, limit: number): Promise<MCPSkill[]> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    const response = await fetch(`/api/mcp/list?${params}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    if (!json.success || !Array.isArray(json.data)) {
      throw new Error('Invalid response');
    }
    return json.data.map((skill: Record<string, unknown>) => ({
      id: String(skill.id ?? ''),
      name: String(skill.name ?? 'Unknown'),
      slug: String(skill.slug ?? skill.id ?? ''),
      category: Array.isArray(skill.category)
        ? skill.category
        : skill.category
          ? [skill.category]
          : ['Utilities'],
      description: String(skill.description ?? ''),
      author: String(skill.author ?? 'Unknown'),
      repository_url: (skill.repository_url as string) || null,
      documentation_url: (skill.documentation_url as string) || null,
      mcp_endpoint: String(skill.mcp_endpoint ?? ''),
      pricing_usdc: Number(skill.pricing_usdc ?? 0),
      x402_enabled: Boolean(skill.x402_enabled ?? true),
      verified: Boolean(skill.verified ?? false),
      rating: Number(skill.rating ?? 0),
      total_calls: Number(skill.total_calls ?? 0),
      success_rate: Number(skill.success_rate ?? 0),
      tier: (skill.tier as 'free' | 'premium') || 'free',
      color: (skill.color as string) || undefined,
      created_at: (skill.created_at as string) || undefined,
    }));
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

export function useMCPMarketplace({ skillsPerPage = 12 }: UseMCPMarketplaceOptions = {}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [verified, setVerified] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync state FROM URL on mount
  useEffect(() => {
    const urlSearch = searchParams.get('q') || '';
    const urlCategory = searchParams.get('cat') || 'all';
    if (urlSearch !== search) setSearch(urlSearch);
    if (urlCategory !== category) setCategory(urlCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync state TO URL when it changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (category !== 'all') params.set('cat', category);
    const newUrl = params.toString() ? `?${params.toString()}` : '/mcps';
    router.replace(newUrl, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['mcp-skills', page, skillsPerPage],
    queryFn: () => fetchSkills(page, skillsPerPage),
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const loading = isLoading;
  const skills = useMemo<MCPSkill[]>(() => data ?? [], [data]);

  const processedSkills = useMemo(() => {
    let result = [...skills];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (category !== 'all') {
      result = result.filter((s) => s.category.includes(category));
    }

    if (verified === 'true') {
      result = result.filter((s) => s.verified);
    } else if (verified === 'false') {
      result = result.filter((s) => !s.verified);
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'calls':
        result.sort((a, b) => b.total_calls - a.total_calls);
        break;
      case 'price':
        result.sort((a, b) => a.pricing_usdc - b.pricing_usdc);
        break;
      case 'newest':
        result.sort((a, b) => {
          const aTime = a.created_at ? new Date(a.created_at).getTime() : 0;
          const bTime = b.created_at ? new Date(b.created_at).getTime() : 0;
          return bTime - aTime;
        });
        break;
    }

    return result;
  }, [skills, search, category, verified, sortBy]);

  const paginatedSkills = useMemo(
    () => processedSkills.slice((page - 1) * skillsPerPage, page * skillsPerPage),
    [processedSkills, page, skillsPerPage]
  );

  const totalPages = Math.ceil(processedSkills.length / skillsPerPage);

  const categories = useMemo(() => {
    const cats = new Set<string>(['all']);
    skills.forEach((s) => s.category.forEach((c) => cats.add(c)));
    return Array.from(cats);
  }, [skills]);

  return {
    skills: paginatedSkills,
    allSkills: skills,
    loading,
    error: error ? String(error) : null,
    search,
    setSearch,
    category,
    setCategory,
    verified,
    setVerified,
    sortBy,
    setSortBy,
    page,
    setPage,
    totalPages,
    categories,
    stats: {
      total: processedSkills.length,
      x402Enabled: processedSkills.filter((s) => s.x402_enabled).length,
      avgPrice:
        processedSkills.length > 0
          ? processedSkills.reduce((sum, s) => sum + s.pricing_usdc, 0) /
            processedSkills.length
          : 0,
      avgRating:
        processedSkills.length > 0
          ? processedSkills.reduce((sum, s) => sum + s.rating, 0) /
            processedSkills.length
          : 0,
    },
  };
}
