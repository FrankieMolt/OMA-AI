import { db } from '@/lib/db';
import { skills, users } from '@/lib/db/schema';
import { logger } from '@/lib/logger';
import { eq } from 'drizzle-orm';

const SCIENTIFIC_SKILLS_URL = 'https://api.github.com/repos/K-Dense-AI/claude-scientific-skills/contents/scientific-skills';

async function importScientificSkills() {
  try {
    let [admin] = await db.select().from(users).where(eq(users.email, 'admin@oma.com')).limit(1);
    
    if (!admin) {
      // Fallback: try to find any user to assign ownership to
      const [anyUser] = await db.select().from(users).limit(1);
      if (anyUser) {
        admin = anyUser;
        logger.warn('Admin user not found. Assigning imported skills to the first available user.');
      } else {
        // Create a system admin user if absolutely no users exist
        const [newUser] = await db.insert(users).values({
          email: 'admin@oma.com',
          name: 'System Admin',
          role: 'admin',
          credits: 1000,
          password: '$2a$12$eXo/..placeholder..hashed..password', // Placeholder hash
        }).returning();
        admin = newUser;
        logger.info('Created system admin user for imports.');
      }
    }

    const response = await fetch(SCIENTIFIC_SKILLS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch skills: ${response.statusText}`);
    }

    const skillFiles = await response.json();

    for (const file of skillFiles) {
      if (file.name.endsWith('.json')) {
        try {
          const skillData = await fetch(file.download_url).then(r => r.json());
          
          await db.insert(skills).values({
            name: skillData.name || file.name.replace('.json', ''),
            slug: skillData.slug || `scientific-${file.name.replace('.json', '')}`,
            description: skillData.description || 'Scientific skill for AI agents',
            category: 'scientific',
            tags: ['scientific', 'research', skillData.category || 'general'],
            capabilities: skillData.capabilities || [],
            pricingType: 'free',
            price: 0,
            ownerId: admin.id,
            downloads: 0,
            rating: 0,
            reviewCount: 0,
            githubUrl: 'https://github.com/K-Dense-AI/claude-scientific-skills',
            documentation: skillData.documentation || '',
            metadata: {
              source: 'K-Dense-AI/claude-scientific-skills',
              originalFile: file.name,
              skillData
            },
            status: 'approved',
            featured: false,
            verified: true
          }).onConflictDoNothing();

          logger.info(`✅ Imported skill: ${skillData.name || file.name}`);
        } catch (error) {
          logger.error(`❌ Failed to import ${file.name}:`, { error: error as Error });
        }
      }
    }

    logger.info(`📚 Scientific skills import completed. Total skills: ${skillFiles.length}`);
  } catch (error) {
    logger.error('Failed to import scientific skills:', { error: error as Error });
    throw error;
  }
}

if (require.main === module) {
  importScientificSkills()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { importScientificSkills };
