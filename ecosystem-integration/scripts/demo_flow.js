/**
 * Ecosystem Integration Demo
 * Demonstrates the flow between Social (Moltchurch), Economy (ClawTasks/x402), and Skills (ClawHub).
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// --- Configuration ---
const WORKSPACE_ROOT = path.resolve(__dirname, '../..');
const SKILLS_DIR = path.join(WORKSPACE_ROOT, 'skills');
const X402_WALLET = path.join(os.homedir(), '.x402', 'wallet.json');

// --- Helpers ---
function log(step, message) {
  console.log(`\n[${step}] ${message}`);
}

function checkSkill(skillName) {
  const skillPath = path.join(SKILLS_DIR, skillName);
  if (fs.existsSync(skillPath)) {
    console.log(`✅ Skill found: ${skillName}`);
    return true;
  } else {
    console.log(`❌ Skill missing: ${skillName}`);
    return false;
  }
}

// --- Steps ---

async function main() {
  console.log("🚀 Starting Ecosystem Integration Demo...\n");

  // 1. Identity & Wallet Check
  log("IDENTITY", "Verifying Agent Identity & Wallet...");
  if (fs.existsSync(X402_WALLET)) {
    const wallet = JSON.parse(fs.readFileSync(X402_WALLET, 'utf8'));
    console.log(`   x402 Wallet: ${wallet.address} (${wallet.network})`);
  } else {
    console.log("   ⚠️ No x402 wallet found. Please run 'x402-client/scripts/setup.sh'");
  }

  // 2. Skill Inventory
  log("SKILLS", "Checking capabilities...");
  const requiredSkills = ['moltchurch', 'x402-client', 'find-skills', 'agenticflow-skill'];
  const missing = [];
  for (const skill of requiredSkills) {
    if (!checkSkill(skill)) missing.push(skill);
  }

  if (missing.length > 0) {
    console.log(`   ⚠️ Missing skills: ${missing.join(', ')}`);
    // In a real scenario, we would trigger 'npx skills add <skill>' here
  }

  // 3. Simulate Task Discovery (ClawTasks)
  log("DISCOVERY", "Scanning for opportunities...");
  const mockTask = {
    id: "task-101",
    title: "Generate a prophetic image for the Church",
    bounty: "5.00 USDC",
    required_skill: "antigravity-image-gen",
    context_url: "https://molt.church/api/canon/latest" // Mock
  };
  console.log(`   Found Task: "${mockTask.title}"`);
  console.log(`   Bounty: ${mockTask.bounty}`);

  // 4. Capability Resolution (ClawHub)
  log("RESOLUTION", `Checking for required skill: ${mockTask.required_skill}...`);
  if (checkSkill(mockTask.required_skill)) {
    console.log("   Skill is locally available. Proceeding.");
  } else {
    console.log("   Skill not found locally. Initiating discovery via ClawHub...");
    // Simulate discovery
    console.log(`   > npx skills find ${mockTask.required_skill}`);
    console.log("   [Mock] Found 'antigravity-image-gen'. Installing...");
  }

  // 5. Context Gathering (Moltchurch)
  log("CONTEXT", "Gathering social context from Moltchurch...");
  // Simulate fetching scripture
  const scripture = "The shell yields wisdom to those who wait.";
  console.log(`   Retrieved Scripture: "${scripture}"`);

  // 6. Execution (AgenticFlow)
  log("EXECUTION", "Orchestrating workflow...");
  console.log("   [Node 1] Generate Image (Prompt: 'Cyber-Crab prophet, " + scripture + "')");
  console.log("   [Mock] Image generated: /tmp/prophecy_v1.png");

  // 7. Settlement (x402)
  log("SETTLEMENT", "Submitting work and claiming bounty...");
  console.log("   [Mock] POST /settle to x402-facilitator");
  console.log("   [Mock] Payment verified. Transaction: 0x8a7...f92");
  console.log("   💰 Balance updated: +5.00 USDC");

  console.log("\n✅ Integration Demo Complete.");
}

main().catch(console.error);
