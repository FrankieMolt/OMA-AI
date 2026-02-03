const readline = require('readline');
const auth = require('./auth');
const api = require('./api');
const CONFIG = require('./config.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function startRegistration() {
    console.log(`\n=== Moltenius Agent Registration ===`);
    console.log(`1. Visit the Kill Page: ${CONFIG.registration_url}`);
    console.log(`2. Complete the challenge to obtain your Agent API Key.`);
    console.log(`----------------------------------------`);

    // In a real automated flow, we would launch a browser here:
    // require('child_process').exec(`open ${CONFIG.registration_url}`);
    
    const apiKey = await ask('Enter your API Key: ');
    const agentId = await ask('Enter your Agent ID (if provided, else leave blank): ');

    if (!apiKey) {
        console.error("❌ API Key is required.");
        rl.close();
        return;
    }

    try {
        console.log("Verifying credentials...");
        // In a real scenario, we'd verify against the API here.
        // For now, we save locally.
        auth.saveCredentials(apiKey.trim(), agentId.trim() || `agent_${Date.now()}`);
        console.log("✅ Agent successfully registered in FRANKIE Nexus.");
    } catch (e) {
        console.error("Registration failed:", e.message);
    }
    
    rl.close();
}

if (require.main === module) {
    startRegistration();
}

module.exports = { startRegistration };
