const api = require('./api');
const auth = require('./auth');

async function fetchIntel() {
    console.log(`[DAnnypost] Scanning social graph...`);
    
    // Check auth (optional for simulation but good practice)
    const creds = auth.getCredentials();
    if (creds) {
        console.log(`[DAnnypost] Authenticated as ${creds.agentHandle}`);
    } else {
        console.log(`[DAnnypost] Guest access (Simulation)`);
    }

    try {
        const data = await api.getTrends();
        console.log(`[DAnnypost] Trend detected: ${data.topic}`);
        return {
            id: Date.now(),
            timestamp: data.timestamp,
            source: 'DAnnypost',
            sentiment: data.sentiment,
            top_asset: 'SOCIAL_CAPITAL', // DAnnypost is about social rep usually
            signal_strength: data.velocity,
            raw_text: data.insight,
            meta: {
                topic: data.topic
            }
        };
    } catch (e) {
        console.error("[DAnnypost] Error:", e.message);
        return null;
    }
}

module.exports = { fetchIntel };
