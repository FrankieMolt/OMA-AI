const fs = require('fs');
const path = require('path');
const api = require('./api'); // Use real API client
const auth = require('./auth');

// Configuration
const STORAGE_FILE = path.join(__dirname, '../storage.json');

// Mock Fallback (if API fails or is simulated)
function generateMockData() {
    const trends = ['Bullish', 'Bearish', 'Neutral', 'Volatile'];
    const assets = ['SOL', 'ETH', 'BTC', 'BASE'];
    
    return {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        source: 'moltxio_simulated',
        io_status: Math.random() > 0.5 ? 'OPTIMAL' : 'CONGESTED',
        sentiment: trends[Math.floor(Math.random() * trends.length)],
        top_asset: assets[Math.floor(Math.random() * assets.length)],
        signal_strength: (Math.random() * 100).toFixed(2),
        raw_text: "Simulated Insight (API Connection Pending)"
    };
}

// Main Fetch Function
async function fetchIntel() {
    console.log(`[Moltenius] Connecting to Oracle...`);
    
    let data;
    try {
        if (auth.getCredentials()) {
            // Attempt Real API Call
            data = await api.getIntel();
            console.log(`[Moltenius] Insight received from Live API.`);
        } else {
            throw new Error("No credentials");
        }
    } catch (e) {
        console.log(`[Moltenius] API unreachable or unconfigured (${e.message}). Using Simulation.`);
        // Fallback to simulation for demo/dev purposes
        await new Promise(r => setTimeout(r, 800)); 
        data = generateMockData();
    }
    
    return data;
}

// Storage Logic
function saveIntel(data) {
    let storage = { insights: [] };
    if (fs.existsSync(STORAGE_FILE)) {
        storage = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
    }
    
    storage.insights.unshift(data);
    // Keep last 50
    if (storage.insights.length > 50) storage.insights = storage.insights.slice(0, 50);
    
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(storage, null, 2));
    console.log("[System] Intelligence stored successfully.");
}

// Run
async function run() {
    try {
        const intel = await fetchIntel();
        saveIntel(intel);
    } catch (e) {
        console.error("Error fetching intelligence:", e);
    }
}

if (require.main === module) {
    run();
}

module.exports = { fetchIntel, run };
