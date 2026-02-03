import { db } from '@/lib/db';
import { skills, users } from '@/lib/db/schema';
import { logger } from '@/lib/logger';
import { eq } from 'drizzle-orm';

const SUPERPOWERS_SKILLS = [
  {
    name: 'Test-Driven Development',
    slug: 'superpowers-tdd',
    description: 'RED-GREEN-REFACTOR cycle with testing anti-patterns reference',
    category: 'development',
    capabilities: ['tdd', 'testing', 'refactoring'],
    tags: ['testing', 'development', 'workflow']
  },
  {
    name: 'Systematic Debugging',
    slug: 'superpowers-debugging',
    description: '4-phase root cause process with defense-in-depth techniques',
    category: 'development',
    capabilities: ['debugging', 'root-cause-analysis'],
    tags: ['debugging', 'development', 'troubleshooting']
  },
  {
    name: 'Brainstorming',
    slug: 'superpowers-brainstorming',
    description: 'Socratic design refinement through collaborative brainstorming',
    category: 'development',
    capabilities: ['brainstorming', 'design'],
    tags: ['brainstorming', 'design', 'collaboration']
  },
  {
    name: 'Code Review',
    slug: 'superpowers-code-review',
    description: 'Two-stage review process (spec compliance, then code quality)',
    category: 'development',
    capabilities: ['code-review', 'quality-assurance'],
    tags: ['code-review', 'quality', 'development']
  }
];

async function importSuperpowers() {
  try {
    let [admin] = await db.select().from(users).where(eq(users.email, 'admin@oma.com')).limit(1);
    
    if (!admin) {
      // Fallback: try to find any user to assign ownership to
      const [anyUser] = await db.select().from(users).limit(1);
      if (anyUser) {
        admin = anyUser;
        logger.warn('Admin user not found. Assigning imported superpowers to the first available user.');
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

    for (const skill of SUPERPOWERS_SKILLS) {
      try {
        await db.insert(skills).values({
          name: skill.name,
          slug: skill.slug,
          description: skill.description,
          category: skill.category,
          tags: skill.tags,
          capabilities: skill.capabilities,
          pricingType: 'free',
          price: 0,
          ownerId: admin.id,
          downloads: 0,
          rating: 0,
          reviewCount: 0,
          githubUrl: 'https://github.com/obra/superpowers',
          documentation: `https://github.com/obra/superpowers/tree/main/skills/${skill.slug}`,
          metadata: {
            source: 'obra/superpowers',
            license: 'MIT'
          },
          status: 'approved',
          featured: true,
          verified: true
        }).onConflictDoNothing();

        logger.info(`⚡ Imported Superpower: ${skill.name}`);
      } catch (error) {
        logger.error(`❌ Failed to import ${skill.name}:`, { error: error as Error });
      }
    }

    logger.info(`⚡ Superpowers import completed. Total skills: ${SUPERPOWERS_SKILLS.length}`);
  } catch (error) {
    logger.error('Failed to import superpowers:', { error: error as Error });
    throw error;
  }
}

if (require.main === module) {
  importSuperpowers()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { importSuperpowers };
