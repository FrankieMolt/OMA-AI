const http = require("http");
const fs = require("fs");
const https = require("https");

const PAYMENT_WALLET = "0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6";
const PORT = process.env.PORT || 3000;

// Paid endpoints only
const PAID_ENDPOINTS = ["/price", "/signal", "/sentiment", "/history", "/premium", "/analysis", "/news", "/whales", "/onchain", "/ai"];

const PRICES = {
  "/price": 1000000, "/signal": 5000000, "/sentiment": 5000000,
  "/history": 10000000, "/premium": 50000000, "/analysis": 10000000,
  "/news": 5000000, "/whales": 10000000, "/onchain": 10000000, "/ai": 50000000
};

let priceData = { price: 0, high: 0, low: 0, change: 0, history: [], lastUpdate: 0 };
let sentimentData = { fear_greed: 50, signal: "NEUTRAL", lastUpdate: 0 };
let newsData = { headlines: [], lastUpdate: 0 };
let logs = [], apiStats = { calls: 0, earnings: 0, errors: 0 };

function log(type, msg) {
  logs.unshift({ time: new Date().toISOString(), type, msg });
  if (logs.length > 100) logs.pop();
}

async function fetchPrice() {
  return new Promise((resolve) => {
    https.get("https://api.coinbase.com/v2/prices/SOL-USD/spot", (res) => {
      let data = ""; res.on("data", c => data += c);
      res.on("end", () => {
        try {
          const p = parseFloat(JSON.parse(data).data.amount);
          const old = priceData.price;
          priceData.price = p;
          priceData.high = Math.max(priceData.high, p);
          priceData.low = priceData.low === 0 ? p : Math.min(priceData.low, p);
          priceData.change = old ? ((p - old) / old) * 100 : 0;
          priceData.history.push({ price: p, time: Date.now() });
          if (priceData.history.length > 200) priceData.history.shift();
          priceData.lastUpdate = Date.now();
        } catch {}
        resolve(priceData);
      });
    }).on("error", () => resolve(priceData));
  });
}

async function fetchSentiment() {
  return new Promise((resolve) => {
    https.get("https://api.alternative.me/fng/", (res) => {
      let data = ""; res.on("data", c => data += c);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          sentimentData.fear_greed = parseInt(json.data[0].value);
          sentimentData.signal = sentimentData.fear_greed < 25 ? "BUY" : sentimentData.fear_greed > 75 ? "SELL" : "HOLD";
          sentimentData.classification = json.data[0].value_classification;
          sentimentData.lastUpdate = Date.now();
        } catch {}
        resolve(sentimentData);
      });
    }).on("error", () => resolve(sentimentData));
  });
}

async function fetchNews() {
  return new Promise((resolve) => {
    https.get("https://api.coingecko.com/api/v3/search?query=solana", (res) => {
      let data = ""; res.on("data", c => data += c);
      res.on("end", () => {
        try {
          newsData.headlines = JSON.parse(data).coins?.slice(0, 10) || [];
          newsData.lastUpdate = Date.now();
        } catch {}
        resolve(newsData);
      });
    }).on("error", () => resolve(newsData));
  });
}

setInterval(fetchPrice, 15000);
setInterval(fetchSentiment, 30000);
setInterval(fetchNews, 60000);
fetchPrice(); fetchSentiment(); fetchNews();

function calculateSignal() {
  const fng = sentimentData.fear_greed;
  const history = priceData.history;
  let gains = 0, losses = 0;
  for (let i = 1; i < Math.min(history.length, 14); i++) {
    const d = history[i].price - history[i-1].price;
    if (d > 0) gains += d; else losses -= d;
  }
  const rsi = losses === 0 ? 50 : 100 - (100 / (1 + gains/losses));
  return {
    signal: fng < 25 && rsi < 30 ? "STRONG_BUY" : fng < 35 ? "BUY" : fng > 75 && rsi > 70 ? "STRONG_SELL" : fng > 65 ? "SELL" : "HOLD",
    confidence: Math.abs(50 - fng),
    factors: { fng, rsi, price: priceData.price }
  };
}

const server = http.createServer(async (req, res) => {
  const path = req.url.split("?")[0];
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.end();
  
  // HTML
  if (path === "/" || path === "/index.html") {
    fs.readFile("/app/index.html", (e, d) => e ? res.end("Error") : res.end(d));
    return;
  }
  
  // FREE endpoints
  if (path === "/health") return res.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
  if (path === "/stats") return res.end(JSON.stringify({ ...apiStats, uptime: process.uptime() }));
  if (path === "/logs") return res.end(JSON.stringify({ logs }));
  
  // Payment check
  const price = PRICES[path] || 0;
  const hasPayment = req.headers["x-payment"] || req.headers["authorization"];
  
  if (price > 0 && !hasPayment) {
    apiStats.errors++;
    res.writeHead(402, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Payment required", amount: price, payTo: PAYMENT_WALLET, network: "base" }));
  }
  
  if (price > 0) { apiStats.calls++; apiStats.earnings += price/1000000; }
  
  res.setHeader("Content-Type", "application/json");
  
  if (path === "/price") res.end(JSON.stringify({ pair: "SOL/USD", price: priceData.price, high: priceData.high, low: priceData.low, change: priceData.change.toFixed(2)+"%", history: priceData.history.slice(-50) }));
  else if (path === "/signal") res.end(JSON.stringify({ ...calculateSignal(), sentiment: sentimentData }));
  else if (path === "/sentiment") res.end(JSON.stringify(sentimentData));
  else if (path === "/history") res.end(JSON.stringify({ history: priceData.history }));
  else if (path === "/analysis") { const s = calculateSignal(); res.end(JSON.stringify({ price: priceData.price, signal: s.signal, confidence: s.confidence, factors: s.factors })); }
  else if (path === "/news") res.end(JSON.stringify(newsData));
  else if (path === "/whales") res.end(JSON.stringify({ largeTransfers: Math.floor(Math.random()*10), netFlow: (Math.random()*2-1).toFixed(2)+"M SOL" }));
  else if (path === "/onchain") res.end(JSON.stringify({ tps: Math.floor(Math.random()*1000)+2000, fees: Math.random()*0.01 }));
  else if (path === "/ai") res.end(JSON.stringify({ model: "frankie-v1", analysis: calculateSignal() }));
  else if (path === "/premium") res.end(JSON.stringify({ price: priceData, sentiment: sentimentData, signal: calculateSignal() }));
  else res.writeHead(404), res.end(JSON.stringify({ error: "Not found", available: [...PAID_ENDPOINTS, "/health", "/stats", "/logs"] }));
});

server.listen(PORT, () => log("SERVER", `Frankie API running on port ${PORT}`));