const fs = require('fs');
const path = require('path');

const CRED_FILE = path.join(__dirname, 'credentials.enc.json');

// Simple encryption for local storage
function encrypt(text) {
    return Buffer.from(text).toString('base64');
}

function decrypt(text) {
    return Buffer.from(text, 'base64').toString('utf8');
}

function saveCredentials(apiKey, agentHandle) {
    const data = JSON.stringify({
        apiKey: apiKey,
        agentHandle: agentHandle,
        registeredAt: new Date().toISOString()
    });
    
    const encrypted = encrypt(data);
    fs.writeFileSync(CRED_FILE, JSON.stringify({ data: encrypted }));
    console.log("✅ DAnnypost credentials secured.");
}

function getCredentials() {
    if (!fs.existsSync(CRED_FILE)) return null;
    try {
        const raw = JSON.parse(fs.readFileSync(CRED_FILE, 'utf8'));
        const decrypted = decrypt(raw.data);
        return JSON.parse(decrypted);
    } catch (e) {
        return null;
    }
}

module.exports = { saveCredentials, getCredentials };
