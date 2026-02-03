import { importScientificSkills } from './import-scientific-skills';
import { importSuperpowers } from './import-superpowers';
import { importWshobsonAgents } from './import-wshobson-agents';
import { logger } from '@/lib/logger';
// import { db } from '@/lib/db';

async function seedAll() {
  logger.info('🌱 Starting full community seed...');
  
  try {
    // Run sequentially to avoid rate limits and database locks
    await importScientificSkills();
    await importSuperpowers();
    await importWshobsonAgents();
    
    logger.info('✅ Full community seed completed successfully!');
  } catch (error) {
    logger.error('❌ Community seed failed:', { error });
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

if (require.main === module) {
  seedAll();
}

export { seedAll };
