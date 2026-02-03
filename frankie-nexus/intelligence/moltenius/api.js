const fs = require('fs');
const path = require('path');
const https = require('https');
const auth = require('./auth');
const CONFIG = require('./config.json');

function request(endpoint, method = 'GET', body = null) {
    return new Promise((resolve, reject) => {
        const creds = auth.getCredentials();
        if (!creds && endpoint !== '/agent/register') { // Allow registration without creds
            return reject(new Error("Authentication missing. Run 'frankie intel register'."));
        }

        const url = new URL(CONFIG.base_url + endpoint);
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'FRANKIE-Agent/1.0'
            }
        };

        if (creds) {
            options.headers['X-API-Key'] = creds.apiKey;
            options.headers['X-Agent-ID'] = creds.agentId;
        }

        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        resolve(data); // Return raw if not JSON
                    }
                } else {
                    reject(new Error(`API Error: ${res.statusCode} - ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

module.exports = {
    getInternalStatus: () => request(CONFIG.endpoints.status),
    getIntel: () => request(CONFIG.endpoints.intel),
    registerAgent: (payload) => request(CONFIG.endpoints.register, 'POST', payload)
};
