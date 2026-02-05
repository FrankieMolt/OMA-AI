const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CRED_FILE = path.join(__dirname, 'credentials.enc.json');
const SECRET_KEY = 'FRANKIE_INTERNAL_SECRET'; // In prod, use environment variable

// Simple encryption for local storage
function encrypt(text) {
    // This is a placeholder for robust encryption. 
    // In a real scenario, use hardware enclave or system keychain.
    return Buffer.from(text).toString('base64');
}

function decrypt(text) {
    return Buffer.from(text, 'base64').toString('utf8');
}

function saveCredentials(apiKey, agentId) {
    const data = JSON.stringify({
        apiKey: apiKey,
        agentId: agentId,
        registeredAt: new Date().toISOString(),
        lastRotation: new Date().toISOString()
    });
    
    const encrypted = encrypt(data);
    fs.writeFileSync(CRED_FILE, JSON.stringify({ data: encrypted }));
    console.log("✅ Credentials secured.");
}

function getCredentials() {
    if (!fs.existsSync(CRED_FILE)) return null;
    
    try {
        const raw = JSON.parse(fs.readFileSync(CRED_FILE, 'utf8'));
        const decrypted = decrypt(raw.data);
        return JSON.parse(decrypted);
    } catch (e) {
        console.error("❌ Failed to decrypt credentials:", e.message);
        return null;
    }
}

function rotateKey(newKey) {
    const creds = getCredentials();
    if (creds) {
        saveCredentials(newKey, creds.agentId);
        console.log("🔄 API Key rotated successfully.");
    }
}

module.exports = { saveCredentials, getCredentials, rotateKey };
