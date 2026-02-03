import { z } from 'zod';

export const GithubRepoSchema = z.object({
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  stargazers_count: z.number(),
  topics: z.array(z.string()).optional(),
  owner: z.object({
    login: z.string(),
    avatar_url: z.string(),
  }),
});

export type GithubRepo = z.infer<typeof GithubRepoSchema>;

export class GithubImportService {
  /**
   * Parse owner and repo from a GitHub URL
   */
  static parseUrl(url: string): { owner: string; repo: string } | null {
    try {
      const parsed = new URL(url);
      if (parsed.hostname !== 'github.com') return null;
      
      const parts = parsed.pathname.split('/').filter(Boolean);
      if (parts.length < 2) return null;
      
      return { owner: parts[0], repo: parts[1] };
    } catch {
      return null;
    }
  }

  /**
   * Fetch repository metadata from GitHub API
   */
  static async fetchRepo(owner: string, repo: string): Promise<GithubRepo> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OpenMarketAccess-Importer',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return GithubRepoSchema.parse(data);
  }

  /**
   * Fetch README content
   */
  static async fetchReadme(owner: string, repo: string): Promise<string> {
    const branches = ['main', 'master'];
    
    for (const branch of branches) {
      const response = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`);
      if (response.ok) {
        return await response.text();
      }
    }
    
    return '';
  }

  /**
   * Analyze repo content to determine type and capabilities
   */
  static analyzeContent(repo: GithubRepo, readme: string) {
    const lowerReadme = readme.toLowerCase();
    const lowerName = repo.name.toLowerCase();
    const lowerDesc = (repo.description || '').toLowerCase();
    
    let category: 'agent' | 'mcp' | 'skill' | 'workflow' | 'n8n' | 'subagent' | 'x402' = 'agent';
    
    // Explicit detection based on repo name/description
    if (lowerName.includes('n8n') || lowerDesc.includes('n8n') || repo.topics?.includes('n8n')) {
      category = 'n8n';
    } else if (lowerName.includes('mcp') || lowerDesc.includes('model context protocol') || lowerReadme.includes('model context protocol')) {
      category = 'mcp';
    } else if (lowerName.includes('skill') || lowerDesc.includes('skill')) {
      category = 'skill';
    } else if (lowerName.includes('subagent') || lowerDesc.includes('sub-agent') || lowerDesc.includes('subagent')) {
      category = 'subagent';
    } else if (lowerName.includes('workflow') || lowerDesc.includes('workflow')) {
      category = 'workflow';
    } else if (lowerName.includes('x402') || lowerDesc.includes('x402')) {
      category = 'x402';
    }

    // Extract basic capabilities from text analysis
    const capabilities = new Set<string>();
    const keywords = {
      'database': ['sql', 'postgres', 'mysql', 'db', 'database'],
      'web-search': ['search', 'crawler', 'scrape', 'google', 'brave'],
      'filesystem': ['file', 'fs', 'read', 'write'],
      'coding': ['react', 'typescript', 'python', 'code', 'git'],
      'automation': ['automation', 'pipeline', 'ci/cd', 'workflow'],
      'data-analysis': ['data', 'pandas', 'numpy', 'analysis', 'csv'],
    };

    const fullText = `${lowerName} ${lowerDesc} ${lowerReadme}`;
    
    Object.entries(keywords).forEach(([capability, terms]) => {
      if (terms.some(term => fullText.includes(term))) {
        capabilities.add(capability);
      }
    });

    return {
      category,
      capabilities: Array.from(capabilities),
      tags: repo.topics || [],
    };
  }
}
