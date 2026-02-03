import { db } from '@/lib/db';
import { agents, users } from '@/lib/db/schema';
import { logger } from '@/lib/logger';
import { eq } from 'drizzle-orm';

const WSHOBSON_PLUGINS_URL = 'https://api.github.com/repos/wshobson/agents/contents/plugins';

const WSHOBSON_CATEGORIES = [
  'development',
  'documentation',
  'workflows',
  'testing',
  'quality',
  'ai-ml',
  'data',
  'database',
  'operations',
  'performance',
  'infrastructure',
  'security',
  'languages',
  'blockchain',
  'finance',
  'payments',
  'gaming',
  'marketing',
  'business'
];

async function fetchJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
}

async function extractDescription(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) return 'AI agent from wshobson/agents repository';
    const text = await response.text();
    // naive markdown description extraction: first non-header line
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.trim() && !line.trim().startsWith('#') && !line.trim().startsWith('![')) {
        return line.trim().slice(0, 200);
      }
    }
    return 'AI agent from wshobson/agents repository';
  } catch {
    return 'AI agent from wshobson/agents repository';
  }
}

async function importWshobsonAgents() {
  try {
    let [admin] = await db.select().from(users).where(eq(users.email, 'admin@oma.com')).limit(1);
    
    if (!admin) {
      // Fallback: try to find any user to assign ownership to
      const [anyUser] = await db.select().from(users).limit(1);
      if (anyUser) {
        admin = anyUser;
        logger.warn('Admin user not found. Assigning imported agents to the first available user.');
      } else {
         // Create a system admin user if absolutely no users exist
         const [newUser] = await db.insert(users).values({
          email: 'admin@oma.com',
          name: 'System Admin',
          role: 'admin',
          credits: 1000,
          password: '$2a$12$eXo/..placeholder..hashed..password',
        }).returning();
        admin = newUser;
        logger.info('Created system admin user for imports.');
      }
    }

    const plugins = await fetchJson(WSHOBSON_PLUGINS_URL);
    if (!plugins) {
       logger.warn('No plugins found in wshobson/agents');
       return;
    }

    let importedCount = 0;

    for (const plugin of plugins) {
       if (plugin.type !== 'dir') continue;
       
       // const agentsUrl = `${plugin.url}/agents`;
       // Need to construct the URL correctly. The plugin object has a 'url' field which is the API URL for contents.
       // However, we need to append '/agents' to the path, but fetching plugin.url gives contents of plugin dir.
       // We can just construct the agents URL manually if we know the structure, 
       // but strictly speaking we should query the plugin dir first.
       // Let's try to fetch the agents dir directly using the repo API pattern:
       // https://api.github.com/repos/wshobson/agents/contents/plugins/{plugin.name}/agents
       
       const agentsDirUrl = `https://api.github.com/repos/wshobson/agents/contents/plugins/${plugin.name}/agents`;
       const agentsFiles = await fetchJson(agentsDirUrl);
       
       if (!agentsFiles) continue;

       for (const file of agentsFiles) {
          if (file.name.endsWith('.md') || file.name.endsWith('.json')) {
             try {
                const name = file.name.replace(/\.(md|json)$/, '');
                const description = await extractDescription(file.download_url);
                const category = WSHOBSON_CATEGORIES.includes(plugin.name) ? plugin.name : 'development';

                await db.insert(agents).values({
                  name: name.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
                  slug: `wshobson-${plugin.name}-${name}`,
                  description: description,
                  version: '1.0.0',
                  category: category,
                  strategy: 'autonomous',
                  capabilities: [plugin.name, 'agent'],
                  mcpStack: null,
                  executionPolicy: 'sandbox',
                  pricingType: 'usage',
                  baseCostUsd: 0.01,
                  maxCostUsd: 1.0,
                  sla: '99.9% uptime',
                  models: ['gpt-4', 'claude-3-opus'],
                  reputationWeight: 1.0,
                  historicalPerformance: {},
                  riskDisclosure: 'Standard risk for autonomous execution',
                  status: 'active',
                  ownerId: admin.id,
                  // metadata: {
                  //   source: 'wshobson/agents',
                  //   plugin: plugin.name,
                  //   file: file.name
                  // }
                }).onConflictDoNothing();

                importedCount++;
                logger.info(`🤖️ Imported Agent: ${name} (Plugin: ${plugin.name})`);
             } catch (error) {
                logger.error(`❌ Failed to import ${file.name}:`, { error: error as Error });
             }
          }
       }
    }

    logger.info(`🤖️ Wshobson agents import completed. Total agents: ${importedCount}`);
  } catch (error) {
    logger.error('Failed to import wshobson agents:', { error: error as Error });
    throw error;
  }
}

if (require.main === module) {
  importWshobsonAgents()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { importWshobsonAgents };
