/**
 * Conway Spawn Demo - Example Agent Spawning
 * 
 * Demonstrates spawning an autonomous agent using Hypercore
 */

const HypercoreClient = require('../frankie-conway-hypercore');

async function main() {
  console.log('🚀 Frankie Conway Spawn Demo');
  console.log('================================');

  // 1. Initialize Hypercore client
  const client = new HypercoreClient();
  
  try {
    console.log('📡 Connecting to Hypercore...');
    await client.connect();
    
    // 2. List existing VMs
    console.log('\n📋 Existing VMs:');
    const existingVMs = await client.listVMs();
    
    if (existingVMs.length === 0) {
      console.log('  No VMs found');
    } else {
      console.log(`  Found ${existingVMs.length} VM(s):`);
      existingVMs.forEach(vm => {
        console.log(`    - ID: ${vm.id}`);
        console.log(`      URL: ${vm.url}`);
        console.log(`      Status: ${vm.status || 'unknown'}`);
      });
    }

    // 3. Spawn a new agent VM
    console.log('\n🎯 Spawning new agent...');
    console.log('-------------------------------');
    
    const spawnConfig = {
      memory: 2048,      // 2GB
      cores: 1,          // 1 vCPU
      image: 'registry.vistara.dev/next-example:latest'
    };

    const result = await client.spawnAgent(spawnConfig);

    if (result.id && result.url) {
      console.log('✅ Agent spawned successfully!');
      console.log('');
      console.log(`🆔 Agent ID:   ${result.id}`);
      console.log(`🌐 Agent URL:  ${result.url}`);
      console.log(`💾 Memory:     ${spawnConfig.memory}MB`);
      console.log(`🔢 Cores:      ${spawnConfig.cores}`);
      console.log('');
      console.log('💡 Next steps:');
      console.log('   1. Fund agent wallet via x402');
      console.log('   2. Initialize agent process');
      console.log('   3. Agent will start generating revenue');
      console.log('   4. If revenue < cost, agent dies');
      console.log('');
      console.log('📊 Economic survival mechanics active');
      console.log('================================');
    } else if (result.error) {
      console.error('❌ Spawn failed:', result.error);
    }

    // 4. Keep running for demonstration
    console.log('\n⏱️  Press Ctrl+C to exit');
    
    // Example: Destroy a VM after 60 seconds (for demo)
    setTimeout(async () => {
      console.log('\n🧹 Destroying agent after demo period...');
      await client.destroyVM(result.id);
      console.log('✅ Agent destroyed');
      process.exit(0);
    }, 60000);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = main;
