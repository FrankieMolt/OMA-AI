import { db, apiListings, users, mcpServers, skills } from './index';
import { eq } from 'drizzle-orm';
import { logger } from '@/lib/logger';

type SeedListing = {
  name: string;
  slug: string;
  description: string;
  category: 'agent' | 'mcp' | 'skill' | 'workflow' | 'subagent' | 'n8n';
  type: 'agent' | 'mcp' | 'skill' | 'workflow' | 'subagent' | 'n8n';
  pricingType: 'free' | 'usage' | 'subscription' | 'one-time';
  price: number;
  currency: string;
  capabilities: string[];
  tags: string[];
  endpointUrl?: string;
  verified?: boolean;
  featured?: boolean;
};

const REAL_LISTINGS: SeedListing[] = [
  // --- Agents ---
  {
    name: 'CrewAI Orchestrator',
    slug: 'crewai-orchestrator',
    description: 'Multi-agent orchestration framework for building complex AI teams with role-based agents.',
    category: 'agent',
    type: 'agent',
    pricingType: 'free',
    price: 0,
    currency: 'USDC',
    capabilities: ['orchestration', 'role-management', 'task-delegation', 'multi-agent'],
    tags: ['crewai', 'python', 'orchestration', 'multi-agent'],
    verified: true,
    featured: true,
  },
  {
    name: 'LangGraph State Manager',
    slug: 'langgraph-state-manager',
    description: 'Stateful, multi-actor application builder for creating cyclic agentic workflows.',
    category: 'agent',
    type: 'agent',
    pricingType: 'free',
    price: 0,
    currency: 'USDC',
    capabilities: ['state-management', 'cyclic-graphs', 'persistence', 'human-in-the-loop'],
    tags: ['langgraph', 'langchain', 'graph', 'stateful'],
    verified: true,
    featured: true,
  },
  {
    name: 'DevOps Automator',
    slug: 'devops-automator',
    description: 'Autonomous agent that handles CI/CD pipelines, Docker deployments, and Kubernetes scaling.',
    category: 'agent',
    type: 'agent',
    pricingType: 'usage',
    price: 0.05,
    currency: 'USDC',
    capabilities: ['ci-cd', 'docker', 'kubernetes', 'github-actions'],
    tags: ['devops', 'automation', 'infrastructure'],
    verified: true,
    featured: true,
  },
  {
    name: 'Research Assistant Pro',
    slug: 'research-assistant-pro',
    description: 'Deep-dive research agent that aggregates data from web, academic papers, and news sources.',
    category: 'agent',
    type: 'agent',
    pricingType: 'subscription',
    price: 29.99,
    currency: 'USDC',
    capabilities: ['web-search', 'summarization', 'data-extraction', 'report-generation'],
    tags: ['research', 'analysis', 'content'],
    verified: true,
    featured: false,
  },
  
  // --- MCP Servers ---
  {
    name: 'PostgreSQL MCP',
    slug: 'postgresql-mcp',
    description: 'Secure database access for AI agents. Query, analyze, and manage PostgreSQL databases via natural language.',
    category: 'mcp',
    type: 'mcp',
    pricingType: 'free',
    price: 0,
    currency: 'USDC',
    endpointUrl: 'http://localhost:8080/mcp/postgres',
    capabilities: ['sql-query', 'schema-inspection', 'data-migration'],
    tags: ['database', 'sql', 'postgres', 'backend'],
    verified: true,
    featured: true,
  },
  {
    name: 'Filesystem MCP',
    slug: 'filesystem-mcp',
    description: 'Safe filesystem access for agents. Read/write files with granular permission controls.',
    category: 'mcp',
    type: 'mcp',
    pricingType: 'free',
    price: 0,
    currency: 'USDC',
    endpointUrl: 'http://localhost:8081/mcp/fs',
    capabilities: ['file-read', 'file-write', 'directory-listing'],
    tags: ['system', 'file-io', 'utility'],
    verified: true,
    featured: false,
  },
  {
    name: 'Brave Search MCP',
    slug: 'brave-search-mcp',
    description: 'Privacy-focused web search integration for retrieval-augmented generation (RAG).',
    category: 'mcp',
    type: 'mcp',
    pricingType: 'usage',
    price: 0.001,
    currency: 'USDC',
    endpointUrl: 'https://api.oma.ai/mcp/brave',
    capabilities: ['web-search', 'news-search', 'image-search'],
    tags: ['search', 'web', 'rag', 'privacy'],
    verified: true,
    featured: true,
  },

  // --- Skills ---
  {
    name: 'React Component Generator',
    slug: 'react-component-generator',
    description: 'Expert skill for generating accessible, Tailwind-styled React components.',
    category: 'skill',
    type: 'skill',
    pricingType: 'one-time',
    price: 5.00,
    currency: 'USDC',
    capabilities: ['react', 'typescript', 'tailwind', 'accessibility'],
    tags: ['frontend', 'ui', 'coding', 'react'],
    verified: true,
    featured: true,
  },
  {
    name: 'Python Data Analysis',
    slug: 'python-data-analysis',
    description: 'Advanced Pandas and NumPy patterns for cleaning and analyzing large datasets.',
    category: 'skill',
    type: 'skill',
    pricingType: 'free',
    price: 0,
    currency: 'USDC',
    capabilities: ['python', 'pandas', 'numpy', 'data-science'],
    tags: ['data', 'analysis', 'python'],
    verified: true,
    featured: false,
  },

  // --- Workflows ---
  {
    name: 'Content Marketing Pipeline',
    slug: 'content-marketing-pipeline',
    description: 'End-to-end workflow: Research topic -> Generate Outline -> Write Draft -> SEO Optimize -> Publish.',
    category: 'workflow',
    type: 'workflow',
    pricingType: 'subscription',
    price: 49.00,
    currency: 'USDC',
    capabilities: ['seo', 'writing', 'publishing', 'automation'],
    tags: ['marketing', 'content', 'seo', 'workflow'],
    verified: true,
    featured: true,
  },
  {
    name: 'Automated Code Review',
    slug: 'automated-code-review',
    description: 'GitHub Action workflow that uses multiple agents to review PRs for security, performance, and style.',
    category: 'workflow',
    type: 'workflow',
    pricingType: 'usage',
    price: 0.10,
    currency: 'USDC',
    capabilities: ['code-review', 'security-scan', 'github-integration'],
    tags: ['devops', 'coding', 'security'],
    verified: true,
    featured: true,
  },

  // --- Sub Agents ---
  {
    name: 'SQL Optimizer Sub-Agent',
    slug: 'sql-optimizer-sub',
    description: 'A specialized sub-agent that takes raw SQL and returns optimized queries with explain plans.',
    category: 'subagent',
    type: 'subagent',
    pricingType: 'free',
    price: 0,
    currency: 'USDC',
    capabilities: ['sql-optimization', 'database-tuning'],
    tags: ['database', 'performance', 'sql'],
    verified: true,
    featured: false,
  },

  // --- n8n Automations ---
  {
    name: 'Lead Enrichment Automation',
    slug: 'lead-enrichment-n8n',
    description: 'n8n workflow that listens for new Stripe customers, enriches data via Clearbit, and syncs to HubSpot.',
    category: 'n8n',
    type: 'n8n',
    pricingType: 'one-time',
    price: 15.00,
    currency: 'USDC',
    capabilities: ['webhook', 'crm-sync', 'data-enrichment'],
    tags: ['automation', 'sales', 'crm', 'n8n'],
    verified: true,
    featured: true,
  },
];

async function seed() {
  logger.info('Seeding database with real open-source listings');

  let [owner] = await db.select().from(users).where(eq(users.email, 'admin@oma.com'));

  if (!owner) {
    [owner] = await db
      .insert(users)
      .values({
        email: 'admin@oma.com',
        name: 'OMA Admin',
        password: 'hashed-placeholder',
        role: 'admin',
        credits: 1000,
      })
      .returning();
    logger.info('Created Admin User');
  }

  for (const listing of REAL_LISTINGS) {
    const [existing] = await db
      .select()
      .from(apiListings)
      .where(eq(apiListings.slug, listing.slug));

    const values = {
      title: listing.name,
      slug: listing.slug,
      description: listing.description,
      category: listing.category,
      type: listing.type,
      pricingType: listing.pricingType,
      price: listing.price,
      currency: listing.currency,
      ownerId: owner.id,
      capabilities: listing.capabilities,
      tags: listing.tags,
      status: 'approved',
      verified: listing.verified || false,
      featured: listing.featured || false,
      installCommand: `oma install ${listing.slug}`,
      endpointUrl: listing.endpointUrl,
    };

    let apiListingId: number;

    if (existing) {
      const [updated] = await db
        .update(apiListings)
        .set(values)
        .where(eq(apiListings.slug, listing.slug))
        .returning();
      apiListingId = updated.id;
      logger.info('Updated ApiListing', { name: listing.name });
    } else {
      const [inserted] = await db.insert(apiListings).values(values).returning();
      apiListingId = inserted.id;
      logger.info('Inserted ApiListing', { name: listing.name });
    }

    // Seed MCP Servers Table
    if (listing.category === 'mcp') {
      const [mcpExisting] = await db
        .select()
        .from(mcpServers)
        .where(eq(mcpServers.slug, listing.slug));

      const mcpValues = {
        name: listing.name,
        slug: listing.slug,
        description: listing.description,
        endpointUrl: listing.endpointUrl || `https://api.oma.ai/mcp/proxy/${listing.slug}`,
        transportType: 'http' as const,
        capabilities: listing.capabilities || [],
        tools: [],
        pricingType: listing.pricingType,
        price: listing.price,
        category: listing.category,
        tags: listing.tags,
        ownerId: owner.id,
        apiListingId: apiListingId,
        status: 'approved',
        healthStatus: 'healthy' as const,
      };

      if (mcpExisting) {
        await db.update(mcpServers).set(mcpValues).where(eq(mcpServers.slug, listing.slug));
        logger.info('Updated McpServer', { name: listing.name });
      } else {
        await db.insert(mcpServers).values(mcpValues);
        logger.info('Inserted McpServer', { name: listing.name });
      }
    }

    // Seed Skills Table
    if (listing.category === 'skill') {
        const [skillExisting] = await db
          .select()
          .from(skills)
          .where(eq(skills.slug, listing.slug));
  
        const skillValues = {
          name: listing.name,
          slug: listing.slug,
          description: listing.description,
          category: 'coding', // Default category for skills table
          tags: listing.tags,
          capabilities: listing.capabilities,
          pricingType: listing.pricingType,
          price: listing.price,
          ownerId: owner.id,
          status: 'active',
          featured: listing.featured,
          verified: listing.verified,
        };
  
        if (skillExisting) {
          await db.update(skills).set(skillValues).where(eq(skills.slug, listing.slug));
          logger.info('Updated Skill', { name: listing.name });
        } else {
          await db.insert(skills).values(skillValues);
          logger.info('Inserted Skill', { name: listing.name });
        }
      }
  }

  logger.info('Seeding Complete');
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export { seed };
