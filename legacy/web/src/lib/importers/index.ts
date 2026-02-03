import { importScientificSkills } from './import-scientific-skills';
import { importSuperpowers } from './import-superpowers';
import { importWshobsonAgents } from './import-wshobson-agents';

async function importAllCommunity() {
  console.warn('🚀 Starting community import...\n');

  try {
    console.warn('\n📚 Importing Scientific Skills (K-Dense-AI)...');
    await importScientificSkills();

    console.warn('\n⚡ Importing Superpowers (obra)...');
    await importSuperpowers();

    console.warn('\n🤖️ Importing Agents (wshobson)...');
    await importWshobsonAgents();

    console.warn('\n✅ All community imports completed successfully!');
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  }
}

if (require.main === module) {
  importAllCommunity()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { importAllCommunity };
