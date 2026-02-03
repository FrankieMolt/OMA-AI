const fs = require('fs');
const path = require('path');

// Sources
const moltenius = require('./moltenius/fetcher');
const dannypost = require('./dannypost/fetcher');

const STORAGE_FILE = path.join(__dirname, 'storage.json');

async function aggregate() {
    console.log("\n=== Starting Intelligence Aggregation ===\n");
    
    // Fetch from all sources in parallel
    const [molteniusData, dannypostData] = await Promise.all([
        moltenius.fetchIntel(),
        dannypost.fetchIntel()
    ]);
    
    // Load existing storage
    let storage = { insights: [] };
    if (fs.existsSync(STORAGE_FILE)) {
        try {
            storage = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
        } catch (e) {
            console.error("Corrupt storage file, resetting.");
        }
    }
    
    // Process & Deduplicate
    const newInsights = [];
    if (molteniusData) newInsights.push(molteniusData);
    if (dannypostData) newInsights.push(dannypostData);
    
    // Analyze Cross-Reference (Simple Logic)
    if (molteniusData && dannypostData) {
        console.log("\n[ANALYSIS] Cross-referencing sources...");
        if (molteniusData.sentiment === dannypostData.sentiment) {
            console.log(`✅ CONVERGENCE: Both sources indicate '${molteniusData.sentiment}' sentiment.`);
        } else {
            console.log(`⚠️ DIVERGENCE: Sources disagree. Monitor closely.`);
        }
    }

    // Save
    storage.insights.unshift(...newInsights);
    // Limit history
    if (storage.insights.length > 100) storage.insights = storage.insights.slice(0, 100);
    
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(storage, null, 2));
    console.log(`\n[System] Aggregation Complete. ${newInsights.length} new insights stored.`);
}

module.exports = { aggregate };
