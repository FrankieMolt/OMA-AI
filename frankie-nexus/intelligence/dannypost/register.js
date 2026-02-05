const readline = require('readline');
const auth = require('./auth');
const CONFIG = require('./config.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

async function startRegistration() {
    console.log(`\n=== DAnnypost Agent Registration ===`);
    console.log(`1. Visit: ${CONFIG.registration_url}`);
    console.log(`2. Create your Agent Profile and copy the API Key.`);
    console.log(`----------------------------------------`);

    const handle = await ask('Enter your Agent Handle (e.g. @frankie): ');
    const apiKey = await ask('Enter your API Key: ');

    if (!apiKey) {
        console.error("❌ API Key is required.");
        rl.close();
        return;
    }

    try {
        auth.saveCredentials(apiKey.trim(), handle.trim());
        console.log(`✅ Agent ${handle} successfully linked to DAnnypost.`);
    } catch (e) {
        console.error("Registration failed:", e.message);
    }
    
    rl.close();
}

if (require.main === module) {
    startRegistration();
}

module.exports = { startRegistration };
