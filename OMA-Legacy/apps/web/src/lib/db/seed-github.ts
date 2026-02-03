import { db, apiListings, mcpServers, users } from './index';
import { eq } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import { GithubImportService } from '@/lib/services/github';

const REPO_URLS = [
  // Official MCP (Contains: filesystem, git, github, google-maps, memory, postgres, puppeteer, sentry, slack, sqlite, time, etc.)
  'https://github.com/modelcontextprotocol/servers',
  
  // High Quality Independent Servers
  'https://github.com/ahmedmustahid/postgres-mcp-server',
  'https://github.com/gannonh/firebase-mcp',
  'https://github.com/atharvagupta2003/mcp-stripe',
  'https://github.com/getsentry/sentry-mcp',
  'https://github.com/cloudflare/mcp-server-cloudflare',
  
  // Tools & Skills
  'https://github.com/arben-adm/mcp-sequential-thinking',
  'https://github.com/StacklokLabs/mkp',
  'https://github.com/StacklokLabs/ocireg-mcp',
  'https://github.com/qdrant/mcp-server-qdrant',
  
  // Collections
  'https://github.com/anthropics/skills',
  'https://github.com/travisvn/awesome-claude-skills',
  'https://github.com/ComposioHQ/awesome-claude-skills',
  
  // n8n Workflows
  'https://github.com/enescingoz/awesome-n8n-templates',
  'https://github.com/restyler/awesome-n8n',
  'https://github.com/Zie619/n8n-workflows',
];

async function seedFromGithub() {
  logger.info(`Starting Bulk Import from ${REPO_URLS.length} repositories...`);

  // Get Admin User
  let [owner] = await db.select().from(users).where(eq(users.email, 'admin@oma.com'));
  if (!owner) {
    [owner] = await db.select().from(users).limit(1);
  }

  for (const url of REPO_URLS) {
    try {
      logger.info(`Processing ${url}...`);
      const repoInfo = GithubImportService.parseUrl(url);
      if (!repoInfo) {
        logger.error(`Invalid URL: ${url}`);
        continue;
      }

      const repo = await GithubImportService.fetchRepo(repoInfo.owner, repoInfo.repo);
      const readme = await GithubImportService.fetchReadme(repoInfo.owner, repoInfo.repo);
      const analysis = GithubImportService.analyzeContent(repo, readme);

      const listingValues = {
        title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        slug: repo.name.toLowerCase(),
        description: repo.description || 'Imported from GitHub',
        category: analysis.category,
        type: analysis.category,
        pricingType: 'free',
        price: 0,
        currency: 'USDC',
        ownerId: owner.id,
        capabilities: analysis.capabilities,
        tags: [...(repo.topics || []), 'github-import', analysis.category],
        status: 'approved',
        verified: true, // Auto-verify bulk imports from trusted list
        featured: true,
        installCommand: `git clone ${repo.html_url}`,
        endpointUrl: repo.html_url,
        metadata: {
          github: {
            stars: repo.stargazers_count,
            owner: repo.owner.login,
            url: repo.html_url,
          }
        }
      };

      // Check existing
      const [existing] = await db
        .select()
        .from(apiListings)
        .where(eq(apiListings.slug, listingValues.slug));

      let listingId: number;

      if (existing) {
        const [updated] = await db
          .update(apiListings)
          .set(listingValues)
          .where(eq(apiListings.slug, listingValues.slug))
          .returning();
        listingId = updated.id;
        logger.info(`Updated: ${listingValues.title}`);
      } else {
        const [inserted] = await db.insert(apiListings).values(listingValues).returning();
        listingId = inserted.id;
        logger.info(`Inserted: ${listingValues.title}`);
      }

      // Add to MCP table if applicable
      if (analysis.category === 'mcp') {
        const mcpValues = {
          name: listingValues.title,
          slug: listingValues.slug,
          description: listingValues.description,
          endpointUrl: listingValues.endpointUrl,
          transportType: 'stdio' as const,
          capabilities: listingValues.capabilities,
          pricingType: 'free',
          price: 0,
          category: 'mcp',
          tags: listingValues.tags,
          ownerId: owner.id,
          apiListingId: listingId,
          status: 'approved',
          healthStatus: 'healthy' as const,
        };

        const [existingMcp] = await db.select().from(mcpServers).where(eq(mcpServers.slug, listingValues.slug));
        if (existingMcp) {
          await db.update(mcpServers).set(mcpValues).where(eq(mcpServers.slug, listingValues.slug));
        } else {
          await db.insert(mcpServers).values(mcpValues);
        }
      }

      // Wait a bit to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      logger.error(`Failed to import ${url}`, { error });
    }
  }

  logger.info('Bulk Import Complete');
}

if (require.main === module) {
  seedFromGithub()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export { seedFromGithub };
