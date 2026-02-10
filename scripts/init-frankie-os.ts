import { db } from '../lib/db/schema';
import { seedSampleData } from '../lib/seed-data';
import { indexWorkspace } from '../lib/indexer';

async function initializeFrankieOS() {
  console.log('🧟 Initializing Frankie OS...\n');

  // Database is already initialized in schema.ts
  console.log('✅ Database initialized');

  // Seed sample data
  console.log('\n📝 Seeding sample data...');
  await seedSampleData();

  // Index workspace files
  console.log('\n🔍 Indexing workspace files...');
  try {
    const fileCount = await indexWorkspace();
    console.log(`✅ Indexed ${fileCount} files`);
  } catch (error) {
    console.error('⚠️  Warning: Failed to index files:', error);
  }

  console.log('\n✨ Frankie OS is ready!');
  console.log('📍 Dashboard: http://localhost:3000/frankie-os');
  console.log('🔧 Database: .frankie-os/frankie-os.db');

  // Close database
  db.close();
}

initializeFrankieOS().catch(console.error);
