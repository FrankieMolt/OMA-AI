const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(__dirname, '../config.json');

const DEFAULT_CONFIG = {
    mode: 'agent', // 'agent' | 'human'
    identity: {
        moltchurch: 'prophet', // 'prophet' | 'congregation'
        wallet: 'active'
    },
    system: {
        autoSettle: true,
        maxBounty: 10.00
    }
};

function loadConfig() {
    if (!fs.existsSync(CONFIG_FILE)) {
        saveConfig(DEFAULT_CONFIG);
        return DEFAULT_CONFIG;
    }
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
}

function saveConfig(config) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

function toggleMode() {
    const config = loadConfig();
    config.mode = config.mode === 'agent' ? 'human' : 'agent';
    saveConfig(config);
    return config.mode;
}

function getMode() {
    return loadConfig().mode;
}

module.exports = {
    loadConfig,
    saveConfig,
    toggleMode,
    getMode
};
