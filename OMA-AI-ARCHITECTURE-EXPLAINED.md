# OMA-AI Complete Architecture Explainer
**By:** Frankie 🧟‍♂️
**Date:** 2026-02-07
**For:** MASTA (Nosyt)

---

## 🔍 THE BIG QUESTION: "HOW DOES OMA-AI WORK?"

**Answer:** OMA-AI is an **API marketplace** where humans AND AI agents can:
1. Discover APIs/MCPs (like OpenRouter, RapidAPI)
2. Pay for them automatically (x402 crypto payments)
3. Use them programmatically

---

## 📊 CURRENT STATE ANALYSIS

### What EXISTS:
| Component | Status | Source |
|-----------|--------|---------|
| **Database Schema** | ✅ COMPLETE | 12 tables with seed data |
| **API Routes** | ✅ WORKING | 17 endpoints functional |
| **Frontend** | ✅ COMPLETE | 15 pages + 3 blog posts |
| **Seed Data** | ✅ PRESENT | 8 services + categories + tags |
| **Payment System** | 🟡 MOCK | x402 protocol implemented (demo mode) |
| **Authentication** | ✅ WORKING | Signup/Login/Wallet connect |

---

## 🏗️ OMA-AI ARCHITECTURE

### Data Flow:
```
┌─────────────────────────────────────────────────────┐
│             OMA-AI PLATFORM                  │
│                                              │
│  ┌──────────────────────────────────┐         │
│  │    SUPABASE DATABASE          │         │
│  │                              │         │
│  │  Tables:                     │         │
│  │  ├── services (8 seeded)      │         │
│  │  ├── users (auth + profiles)    │         │
│  │  ├── categories (12 categories)   │         │
│  │  ├── tags (30+ tags)           │         │
│  │  ├── reviews (3 seeded)        │         │
│  │  ├── tasks (5 bounties)        │         │
│  │  ├── transactions (payments)     │         │
│  │  ├── wallets                   │         │
│  │  ├── api_keys                  │         │
│  │  ├── notifications             │         │
│  │  ├── audit_logs                 │         │
│  │  └── agent_logs                │         │
│  └──────────────────────────────────┘         │
│                   │                            │
│                   ▼                            │
│  ┌──────────────────────────────────┐         │
│  │   API LAYER                   │         │
│  │                                │         │
│  │  GET /api/services              │◄─────┐ │
│  │  POST /api/services            │      │ │
│  │  GET /api/tasks                │      │ ▼ │
│  │  POST /api/payments/execute    │  ┌─────────┐ │
│  │  GET /api/user/me              │  │ HUMANS  │ │
│  │  POST /api/auth/signup         │  │ & AI    │ │
│  │  POST /api/auth/login          │  │ AGENTS  │ │
│  │  ... (17 endpoints total)      │  └─────────┘ │
│  └──────────────────────────────────┘              │
└─────────────────────────────────────────────────────┘
```

---

## 💰 PAYMENT SYSTEM (x402) - HOW IT WORKS

### x402 Protocol Flow:
```
1. API Request (with 402 status code)
   │
   ▼
2. 402 Payment Required Headers:
   │
   ├─ X-Payment-Required: true
   ├─ X-Payment-Amount: 0.001
   ├─ X-Payment-Currency: USDC
   ├─ X-Payment-Network: base
   └─ X-Payment-Address: 0x1234...
   │
   ▼
3. Wallet Signature (Client signs message)
   │
   ├─ address: 0x1234...
   ├─ message: JSON { timestamp, amount, service_id }
   └─ signature: 0xabcd...
   │
   ▼
4. POST /api/payments/execute
   │
   ├─ Verify signature
   ├─ Record transaction
   ├─ Update service stats
   └─ Return 200 OK + X-Payment-Proof header
   │
   ▼
5. Retry with X-Payment-Proof
   │
   └─ Access granted!
```

### x402 vs OpenRouter:

| Aspect | OpenRouter | OMA-AI (x402) |
|--------|-----------|------------------|
| **Payment Method** | Prepaid credits | Pay-per-use (USDC crypto) |
| **Aggregation** | Centralizes APIs | Decentralized marketplace |
| **Control** | API owners set prices | API owners list on marketplace |
| **Payment Flow** | Buy credits → Use credits | HTTP 402 → Pay per request → Retry |
| **Target Users** | Humans (mostly) | Humans + AI agents |
| **Ecosystem** | API providers list on OpenRouter | Anyone can list on OMA-AI |

---

## 🛒 HOW TO SET UP APIs ON OMA-AI

### FOR API PROVIDERS (Current Flow):

#### Step 1: List Your Service in Database
```sql
INSERT INTO services (
  type,              -- 'model', 'api', 'agent', 'skill', 'compute'
  name,              -- "GPT-4 Turbo"
  description,        -- "Advanced LLM for complex tasks..."
  price_per_use,      -- 0.01 (in USDC)
  x402_endpoint,     -- Your API's x402 endpoint
  seller_wallet,      -- Your wallet address (to receive payments)
  capabilities,       -- ['text-generation', 'coding']
  tags,              -- ['llm', 'gpt', 'ai']
  status             -- 'active'
);
```

#### Step 2: Add x402 Paywall to Your API
```javascript
// Example: Express.js middleware
app.get('/api/v1/chat/completions', async (req, res) => {
  const userWallet = req.headers['x-user-wallet'];
  
  // Check if user has paid
  const paymentProof = req.headers['x-payment-proof'];
  
  if (!paymentProof) {
    // User hasn't paid → Return 402 Payment Required
    return res.status(402)
      .set('X-Payment-Required', 'true')
      .set('X-Payment-Amount', '0.01')           // Your price
      .set('X-Payment-Currency', 'USDC')            // Currency
      .set('X-Payment-Network', 'base')              // Blockchain network
      .set('X-Payment-Address', '0xYourWallet...') // Your wallet
      .json({ error: 'Payment required' });
  }
  
  // Verify payment proof (on-chain or via OMA-AI)
  const isValidPayment = await verifyPayment(paymentProof);
  
  if (!isValidPayment) {
    return res.status(403).json({ error: 'Invalid payment proof' });
  }
  
  // User paid → Execute request
  const response = await executeLLMRequest(req.body);
  return res.json(response);
});
```

#### Step 3: Users Pay Automatically
```
AI Agent or Human Client:
1. Calls your API
2. Gets 402 Payment Required
3. Calls OMA-AI: POST /api/payments/execute
   - Signs transaction message
   - Sends wallet signature
4. OMA-AI returns: tx_hash + X-Payment-Proof
5. Retries your API with X-Payment-Proof
6. Your API executes the request
```

---

## 📱 WHERE DO APIs COME FROM?

### CURRENT SOURCES (In Database):

From `supabase/migrations/20260207_004_seed_data.sql`:

#### ✅ SEEDED SERVICES (8 total):
| Service | Type | Price | Endpoint | Wallet |
|---------|------|-------|----------|---------|
| GPT-4 Turbo | model | $0.01 | https://api.openai.com/v1/chat/completions | OpenAI wallet |
| Claude 3 Opus | model | $0.015 | https://api.anthropic.com/v1/messages | Anthropic wallet |
| Image Recognition API | api | $0.001 | https://api.imagerecognition.com/v1/analyze | API provider wallet |
| NLP Suite | api | $0.0005 | https://api.nlp-suite.com/v1/process | NLP provider wallet |
| Research Assistant Agent | agent | $0.05 | https://agents.research-assistant.com/v1/query | Agent owner wallet |
| Code Review Agent | agent | $0.02 | https://agents.code-review.com/v1/analyze | Agent owner wallet |
| Distributed Compute | compute | $0.001 | https://compute.distributed.com/v1/execute | Compute provider wallet |
| Web Scraping Skill | skill | $0.002 | https://skills.scraping.com/v1/scrape | Skill provider wallet |

**Note:** These are SEED DATA (mock/demo endpoints). In production, these would be real APIs!

---

## 🔄 HOW AI LLMs FIT IN

### Two Approaches:

#### Approach 1: OMA-AI LISTS EXTERNAL APIS (Current Model)
```
┌────────────────────────────────────────┐
│       OMA-AI MARKETPLACE         │
│                                    │
│  Lists GPT-4, Claude, etc.    │
│  ────────────────────────────┐     │
│                            │         │
│  Users browse & pay             │         │
│                            │         │
│  OMA-AI x402 payment          │         │
│                            │         │
│  Users call external API         │         │
│  (OpenAI, Anthropic, etc.)  │         │
│                            │         │
│  External API gets paid         │         │
│  (via OMA-AI or direct)     │         │
│                            │         │
│  └───────────────────────────┘     │
└────────────────────────────────────────┘
```

#### Approach 2: OMA-AI HOSTS APIS DIRECTLY (Alternative)
```
┌────────────────────────────────────────┐
│       OMA-AI PLATFORM            │
│                                    │
│  Hosts GPT-4, Claude, etc.   │
│  (via API keys to providers)     │
│  ────────────────────────────┐     │
│                            │         │
│  OMA-AI acts as proxy         │         │
│                            │         │
│  Users pay OMA-AI            │         │
│                            │         │
│  OMA-AI calls provider API   │         │
│  (using API keys)            │         │
│                            │         │
│  Provider bills OMA-AI       │         │
│                            │         │
│  └───────────────────────────┘     │
└────────────────────────────────────────┘
```

**RECOMMENDATION:** Use Approach 1 (External APIs) - it's more decentralized and aligns with the marketplace model.

---

## 🤖 HOW AI AGENTS USE OMA-AI

### Autonomous Agent Flow:
```javascript
// AI Agent Code (Python, JavaScript, etc.)
class OMAAgent {
  constructor() {
    this.wallet = '0xAgentWallet...'; // Agent's wallet
  }
  
  async discoverAPIs() {
    // Step 1: Browse marketplace
    const services = await fetch('https://oma-ai.com/api/services?category=ai-ml')
      .then(r => r.json());
    
    return services.services;
  }
  
  async selectBestAPI(task) {
    // Step 2: Analyze task and pick best API
    const apis = await this.discoverAPIs();
    return apis.filter(api => 
      api.tags.includes('llm') && 
      api.price < 0.02
    )[0]; // Pick cheapest LLM
  }
  
  async payAndUseAPI(service) {
    // Step 3: x402 payment flow
    const paymentMessage = {
      timestamp: Date.now(),
      amount: service.price_per_use,
      service_id: service.id
    };
    
    // Sign with agent's wallet
    const signature = await signMessage(paymentMessage, this.wallet.privateKey);
    
    // Execute payment
    const payment = await fetch('https://oma-ai.com/api/payments/execute', {
      method: 'POST',
      body: JSON.stringify({
        serviceId: service.id,
        walletAddress: this.wallet.address,
        message: JSON.stringify(paymentMessage),
        signature: signature
      })
    }).then(r => r.json());
    
    if (payment.success) {
      return payment.txHash; // Payment proof
    }
  }
  
  async executeTask(task) {
    // Step 4: Use the API
    const service = await this.selectBestAPI(task);
    const txHash = await this.payAndUseAPI(service);
    
    // Step 5: Retry with payment proof
    const response = await fetch(service.endpoint, {
      headers: {
        'X-Payment-Proof': txHash,
        'X-Payment-Signature': signature
      },
      body: JSON.stringify(task)
    });
    
    return response.json();
  }
  
  async runAutonomously() {
    // Autonomous loop
    while (true) {
      const task = await this.getNextTask();
      const result = await this.executeTask(task);
      await this.reportResult(result);
      
      // Earn revenue!
      console.log(`Task completed. Earnings: ${task.reward}`);
    }
  }
}

// Autonomous agent running
const agent = new OMAAgent();
agent.runAutonomously();
```

---

## 📊 SEED DATA BREAKDOWN

### Categories (12 total):
1. AI & Machine Learning
2. Data & Analytics
3. Blockchain & Crypto
4. Communication
5. Developer Tools
6. Finance & Payments
7. Gaming & Entertainment
8. Image & Video
9. Location & Maps
10. Productivity
11. Security
12. Social Media

### Tags (30+ total):
**AI/ML:** llm, gpt, claude, nlp, ai-agents, generative-ai
**Data:** analytics, big-data, data-mining
**Blockchain:** smart-contracts, defi, web3, ethereum, base, solana
**Dev:** api-management, cicd, deployment
**Finance:** trading, payments, crypto
**General:** real-time, scalable, secure, fast, production-ready

### Services (8 total):
- 4 Models: GPT-4 Turbo, Claude 3 Opus
- 2 APIs: Image Recognition, NLP Suite
- 2 Agents: Research Assistant, Code Review Agent
- 1 Compute: Distributed Compute
- 1 Skill: Web Scraping

### Tasks/Bounties (5 total):
1. Build AI Agent for Task Management - $500
2. Develop x402 Payment Integration Guide - $250
3. Create NLP Service for Sentiment Analysis - $750
4. Design Logo and Brand Assets - $150
5. Optimize Database Performance - $300

---

## 🚀 HOW TO MAKE OMA-AI REAL

### Current State:
- ✅ Database schema complete
- ✅ Seed data present (demo data)
- ✅ API routes implemented
- ✅ Frontend displays services
- 🟡 **Services are MOCK/DEMO data**

### What's Real:
1. ✅ Database structure (Supabase)
2. ✅ API endpoints (functional)
3. ✅ x402 payment protocol (implemented)
4. ✅ Authentication system (working)
5. ✅ Categories and tags (populated)

### What's Mock:
1. 🟡 **Service endpoints** - Seed data has fake URLs
   - `https://api.openai.com/v1/chat/completions` (REAL - this is OpenAI's actual endpoint!)
   - `https://api.imagerecognition.com/v1/analyze` (FAKE)
   - `https://agents.research-assistant.com/v1/query` (FAKE)

2. 🟡 **Wallet addresses** - Random demo addresses
3. 🟡 **Reviews** - Static seed data
4. 🟡 **Sales/revenue** - Simulated numbers

---

## 💡 HOW TO CONNECT REAL APIS

### Option 1: Provider Self-Listing (Decentralized - RECOMMENDED)
1. API Provider creates account on OMA-AI
2. Lists their service in database:
   ```sql
   INSERT INTO services (
     name: 'My GPT-4 API',
     description: 'High-performance GPT-4 wrapper',
     price_per_use: 0.012,  // Your markup over OpenAI
     x402_endpoint: 'https://my-api.com/x402-check',
     seller_wallet: '0xProviderWallet...', // Your wallet to receive payments
     capabilities: ['text-generation'],
     tags: ['llm', 'gpt-4'],
     status: 'active'
   );
   ```
3. Adds x402 paywall to their API
4. Agents discover, pay, use service

**Pros:** 
- API owners control their endpoints
- OMA-AI is just a marketplace
- Payments go directly to API owners
- Truly decentralized

### Option 2: OMA-AI Proxying (Centralized)
1. OMA-AI gets API keys from providers
2. OMA-AI hosts "proxy" services
3. Users pay OMA-AI, OMA-AI pays providers
4. OMA-AI takes platform fee (2.5%)

**Pros:**
- Better QoS control
- Easier for small providers
- Unified dashboard

**Cons:**
- Centralized
- Extra layer of cost
- API owners lose direct relationship

---

## 🆚 OMA-AI VS OPENROUTER

| Feature | OpenRouter | OMA-AI |
|---------|-----------|----------|
| **Business Model** | API Aggregator | API Marketplace |
| **Discovery** | Centralized catalog | Decentralized listings |
| **Pricing** | Credits system | Pay-per-use crypto |
| **Payment Flow** | Buy credits → Use | HTTP 402 → Pay → Retry |
| **Target** | AI developers | Humans + AI agents |
| **API Control** | OpenRouter controls access | API owners control access |
| **Revenue Split** | OpenRouter takes % | Platform takes 2.5% |
| **Payment Method** | Credit card/crypto | x402 (USDC on Base) |
| **Autonomous Agents** | Possible | Native support |

---

## 🎯 NEXT STEPS TO MAKE OMA-AI PRODUCTION READY

### Phase 1: Real API Integration (Week 1)
1. [ ] Contact actual API providers (OpenAI, Anthropic, etc.)
2. [ ] Get API keys for OMA-AI to proxy
3. [ ] OR create self-listing portal for providers
4. [ ] Update seed data with real endpoints
5. [ ] Test payment flows end-to-end

### Phase 2: Agent SDK (Week 2)
1. [ ] Build JavaScript/Python SDK for agents
2. [ ] Create agent examples showing autonomous usage
3. [ ] Document x402 integration guide
4. [ ] Publish SDK to npm/pip

### Phase 3: On-Chain Verification (Week 3)
1. [ ] Implement Base RPC integration
2. [ ] Verify transactions on-chain
3. [ ] Reject invalid payment proofs
4. [ ] Add blockchain explorer links

### Phase 4: Launch (Week 4)
1. [ ] Security audit
2. [ ] Load testing
3. [ ] Beta with selected users
4. [ ] Public launch

---

## 📝 SUMMARY FOR MASTA

### What OMA-AI IS:
- An **API marketplace** like OpenRouter, BUT
- Uses **x402 payment protocol** (HTTP 402 + crypto)
- Supports **humans AND autonomous AI agents**
- Lists APIs, MCPs, agents, compute, skills
- Powered by **Supabase** (PostgreSQL + RLS)
- Built with **Next.js 16** (React + Server Components)

### How APIs Get Listed:
1. **Database:** Insert service record with wallet address
2. **Paywall:** Add 402 response to API endpoint
3. **Discovery:** Users browse OMA-AI marketplace
4. **Payment:** x402 protocol signs + executes transaction
5. **Access:** Retry with payment proof header

### How AI Agents Use It:
1. **Browse:** API routes (`/api/services`)
2. **Select:** Choose best service for task
3. **Pay:** x402 payment (`/api/payments/execute`)
4. **Use:** Call API with payment proof header
5. **Earn:** Agents receive payments to their wallets

### Current Reality:
- ✅ Architecture complete
- ✅ Database seeded
- ✅ Frontend functional
- 🟡 **Services are demo/fake** (need real providers)
- 🟡 **Payments simulated** (need on-chain verification)

### What MASTA Should Do:
1. **Decide:** Proxy APIs (centralized) OR marketplace (decentralized)
2. **Integration:** Contact real API providers OR build listing portal
3. **On-Chain:** Implement Base network verification
4. **SDK:** Build agent SDK for easy integration
5. **Launch:** Beta with real users

---

**Questions for MASTA:**
1. Should OMA-AI proxy APIs (like OpenRouter) or be a pure marketplace?
2. Do you have API keys for GPT-4, Claude, etc.?
3. Should I build a self-serve listing portal for API providers?
4. Which blockchain network should be primary? (Base recommended)

---

*Explained by Frankie 🧟‍♂️*
*For MASTA (Nosyt) - 2026-02-07 23:10 UTC*
