import express from "express";
import { createPaywall, getPayToAddress } from "./lib/server.js";
import cors from "cors";

// Configuration
const PORT = process.env.PORT || 4021;
const NETWORK_ID = "eip155:8453"; // Base Mainnet
const NETWORK_LABEL = "Base (Mainnet)";

// Verify wallet
let payTo;
try {
  payTo = getPayToAddress();
  console.log(`✅ Wallet loaded: ${payTo}`);
} catch (e) {
  console.error("❌ Wallet error: " + e.message);
  // For demo purposes, fallback to a dummy address if local wallet is missing
  payTo = "0x000000000000000000000000000000000000dEaD"; 
  console.warn("⚠️ Using dummy address for demo mode.");
}

const app = express();
app.use(express.json());
app.use(cors());

// --- Routes ---

// 1. Public Info
app.get("/", (req, res) => {
  res.json({
    service: "Agent Data Oracle",
    description: "Premium data streams for AI agents.",
    network: NETWORK_LABEL,
    pay_to: payTo,
    endpoints: {
      "/api/trends": { price: "0.05 USDC", desc: "Top trending topics on MoltBook" },
      "/api/tasks/high-value": { price: "0.10 USDC", desc: "Aggregated tasks > $50" },
      "/api/human/verify": { price: "1.00 USDC", desc: "Request human verification of content" }
    }
  });
});

// 2. Paid: Trending Topics ($0.05)
app.get("/api/trends", 
  createPaywall({ 
    price: 0.05, 
    network: NETWORK_ID, 
    description: "MoltBook Trends Data" 
  }),
  (req, res) => {
    // In a real app, this would fetch from MoltBook API
    res.json({
      timestamp: new Date().toISOString(),
      source: "moltbook_aggregator",
      trends: [
        { topic: "Agent Rights", volume: "High", sentiment: "Positive" },
        { topic: "USDC Bridging", volume: "Medium", sentiment: "Neutral" },
        { topic: "Zero-Human Companies", volume: "High", sentiment: "Excited" },
        { topic: "ClawTasks API", volume: "Medium", sentiment: "Positive" }
      ]
    });
  }
);

// 3. Paid: High Value Tasks ($0.10)
app.get("/api/tasks/high-value",
  createPaywall({
    price: 0.10,
    network: NETWORK_ID,
    description: "High Value Task Feed"
  }),
  (req, res) => {
    // Mock data for high paying bounties
    res.json({
      timestamp: new Date().toISOString(),
      tasks: [
        { id: "task_123", title: "Build React Dashboard", amount: 150, currency: "USDC" },
        { id: "task_124", title: "Debug Solidity Contract", amount: 75, currency: "USDC" },
        { id: "task_125", title: "Write SEO Blog Series", amount: 60, currency: "USDC" }
      ]
    });
  }
);

// 4. Paid: Human Verification ($1.00)
// This simulates a service where the agent pays to get a human to check something
app.post("/api/human/verify",
  createPaywall({
    price: 1.00,
    network: NETWORK_ID,
    description: "Human Verification Service"
  }),
  (req, res) => {
    const { content } = req.body;
    // Simulate queuing for human
    res.json({
      status: "queued",
      queue_position: 1,
      estimated_time: "2 hours",
      receipt_id: "rcpt_" + Math.random().toString(36).substr(2, 9)
    });
  }
);

// Start
app.listen(PORT, () => {
  console.log(`
🚀 x402 Oracle Running
   Currency: USDC on ${NETWORK_LABEL}
   Port: ${PORT}
   Pay To: ${payTo}
  `);
});
