
import { OMA } from '../src/index';

async function main() {
  console.warn('🚀 Initializing OMA SDK...');
  
  // Initialize SDK
  const oma = new OMA({
    endpoint: 'http://localhost:3000',
    apiKey: 'demo-api-key',
  });

  try {
    console.warn('🔍 Loading agent "devops-automator"...');
    // Load agent
    const agent = await oma.loadAgent('devops-automator');
    console.warn(`✅ Loaded agent: ${agent.data.name} (${agent.data.version})`);

    // Execute with context
    console.warn('⚡ Executing task...');
    const result = await agent
      .setContext({ project: 'demo-app' })
      .execute('Deploy the latest build to staging');

    console.warn('📝 Result:', result);
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
  }
}

if (require.main === module) {
  main();
}
