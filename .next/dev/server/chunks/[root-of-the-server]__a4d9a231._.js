module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/oma-ai-repo/pages/api/price.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
const APIS = {
    coingecko: 'https://api.coingecko.com/api/v3',
    coincap: 'https://api.coincap.io/v2'
};
let cache = {
    data: null,
    time: 0
};
async function fetchPrices() {
    const now = Date.now();
    if (cache.data && now - cache.time < 30000) {
        return cache.data;
    }
    try {
        const cgRes = await fetch(`${APIS.coingecko}/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true`);
        if (cgRes.ok) {
            const data = await cgRes.json();
            cache = {
                data: {
                    btc: {
                        price: data.bitcoin?.usd,
                        change_24h: data.bitcoin?.usd_24h_change
                    },
                    eth: {
                        price: data.ethereum?.usd,
                        change_24h: data.ethereum?.usd_24h_change
                    },
                    sol: {
                        price: data.solana?.usd,
                        change_24h: data.solana?.usd_24h_change
                    },
                    source: 'coingecko'
                },
                time: now
            };
            return cache.data;
        }
    } catch (e) {}
    return {
        error: 'Unable to fetch prices'
    };
}
async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const prices = await fetchPrices();
    res.json({
        data: prices,
        timestamp: Date.now()
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a4d9a231._.js.map