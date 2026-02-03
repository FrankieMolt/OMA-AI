const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

console.log("FRANKIE Nexus - System Status");
console.log("=============================");

function checkCommand(name, cmd) {
    try {
        const output = execSync(cmd, { stdio: 'pipe' }).toString().trim();
        console.log(`✅ ${name}: OK`);
        return true;
    } catch (e) {
        console.log(`⚠️ ${name}: Check failed or not authenticated.`);
        return false;
    }
}

function checkFile(name, filePath) {
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${name}: Found (${filePath})`);
        return true;
    } else {
        console.log(`❌ ${name}: Missing (${filePath})`);
        return false;
    }
}

// 1. Social
console.log("\n[Social & Version Control]");
checkCommand("Twitter (Bird)", "bird --version"); // Just check if binary exists first
checkCommand("GitHub (gh)", "gh status");

// 2. Crypto Wallets
console.log("\n[Crypto Wallets]");
const workspace = process.cwd(); // Look in workspace
checkFile("Solana Wallet", path.join(workspace, "FRANKIE_solana_wallet.json"));
checkFile("Base Wallet", path.join(workspace, "FRANKIE_base_wallet.json"));

// 3. Skills
console.log("\n[Core Skills]");
const skills = {
    'solana-agent': 'skills/solana-defi-agent',
    'base-trader': 'skills/base-trader',
    'x402': 'skills/x402-client'
};

for (const [name, p] of Object.entries(skills)) {
    checkFile(name, p);
}

// 4. Balance Check (Safe Read-Only)
console.log("\n[Balances]");
try {
    // Solana
    if (fs.existsSync('skills/solana-defi-agent/dist/cli.js')) {
        // We assume we can't easily run the agent CLI without args, but we can try to display pubkey if needed.
        // For now, just listing them as "Ready to query"
        console.log("ℹ️  Solana Agent: Ready");
    }
} catch (e) {}

console.log("\nSystem Integration Check Complete.");
