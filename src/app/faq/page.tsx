'use client';

import { useState } from 'react';

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Everything you need to know about OMA-Ai, MCPs, and getting started
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid gap-8 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-purple-200 mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://discord.gg/oma-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              Join Discord Community
            </a>
            <a
              href="/contact"
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left flex items-center justify-between group"
      >
        <div className="flex items-start gap-4 flex-1">
          <span className="text-2xl">❓</span>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
              {faq.question}
            </h3>
            <p className="text-sm text-purple-300 mt-1">
              Category: {faq.category}
            </p>
          </div>
        </div>
        <span className="text-2xl transform transition-transform duration-300">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="text-slate-200 leading-relaxed">
            {faq.answer}
          </div>
          {faq.related && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-sm text-purple-300 mb-2">Related:</p>
              <div className="space-y-2">
                {faq.related.map((related, index) => (
                  <a
                    key={index}
                    href={related.href}
                    className="text-purple-400 hover:text-purple-300 text-sm transition-colors block"
                  >
                    → {related.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const faqs: FAQ[] = [
  {
    category: 'Getting Started',
    question: 'What is OMA-Ai?',
    answer: `OMA-Ai is a premier MCP (Model Context Protocol) marketplace where developers can publish, monetize, and scale their MCPs, and users can discover, access, and use the best tools for AI agents. Think of it as "npm for AI tools" with built-in payments and analytics.`,
    related: [
      { title: 'What is an MCP?', href: '/docs/blog/building-your-first-mcp' },
      { title: 'How do I get started?', href: '/docs/blog/quick-start-5-minutes' }
    ]
  },
  {
    category: 'Getting Started',
    question: 'How do I get started as a developer?',
    answer: `Getting started is easy:

**1. Create Account:** Visit oma-ai.com/signup and create your account
**2. Connect Wallet:** Connect your Base or Solana wallet for payments
**3. Publish Your MCP:** Use our 4-step wizard to publish your MCP
   - Basic info (name, description, category)
   - Configuration (API endpoints, authentication)
   - Tools definition (input/output schemas)
   - Pricing (choose tier: Free, Low, Medium, High)
**4. Wait for Approval:** We review submissions within 24-48 hours
**5. Start Earning:** Once approved, your MCP is live and ready for calls!

Detailed guides in our documentation.`
  },
  {
    category: 'Getting Started',
    question: 'How do I get started as a user?',
    answer: `Using MCPs is simple:

**1. Browse Marketplace:** Explore all MCPs at oma-ai.com/mcps
**2. Find Your MCP:** Search, filter by category, compare pricing
**3. Get API Key:** Generate free API key for authentication
**4. Call the MCP:** Use our API or SDK to call the MCP
**5. Track Usage:** Monitor your usage and spending in the dashboard

See our Quick Start guide for code examples.`
  },
  {
    category: 'Payments',
    question: 'How does x402 gasless payments work?',
    answer: `x402 is a gasless payment protocol on Base using ERC-3009 (token transfers with authorization). Here's how it works:

**1. User Signs Payment Intent:** User signs transaction data off-chain (no gas required)
**2. OMA-Ai Relayer Executes:** OMA-Ai pays the gas fee and executes the transaction on-chain
**3. User Pays Nothing in Gas:** User pays 0 gas fees - the relayer covers it
**4. Developer Receives 95%:** Developer gets 95% of the call price, OMA-Ai gets 5% platform fee
**5. Security:** Random nonces, time-based auth, domain separation prevent replay attacks

Benefits:
- **Zero gas fees** for users
- **Instant experience** - no waiting for confirmations
- **No gas token required** - users don't need Base or ETH
- **Predictable costs** - pay exactly what you see

Read our x402 documentation for technical details.`,
    related: [
      { title: 'Understanding x402 Payments', href: '/docs/blog/understanding-x402-payments' },
      { title: 'Multi-Chain Wallet Management', href: '/docs/blog/multi-chain-wallet-management' }
    ]
  },
  {
    category: 'Payments',
    question: 'What are the fees?',
    answer: `OMA-Ai has the industry's best platform fee structure:

**Platform Fee: 5%** (lowest in the industry)
- You pay: 95% of your earnings
- OMA-Ai keeps: 5% for platform operations

**Payout Threshold: $10 USDC**
- Minimum payout amount: $10 USDC
- Payout frequency: Monthly (1st of each month)
- Automatic: Yes, no manual requests needed

**Example:**
You earn $1,000/month from your MCP calls:
- Your share: $950 (95%)
- Platform fee: $50 (5%)
- You receive: $950 on the 1st of next month

**Competitive Advantage:**
- Smithery.ai: ~10% fee
- RapidAPI: 20-30% fee
- OMA-Ai: **5% fee (best!)**

You earn significantly more on OMA-Ai!`
  },
  {
    category: 'Pricing',
    question: 'How do I price my MCP?',
    answer: `Choose from 4 pricing tiers based on your MCP's value and costs:

**Free Tier:** $0
- No platform fees
- Great for community building
- Users love free tools

**Low Tier:** $0.0001-0.001 per call
- Good for high-volume tools (email, basic APIs)
- Example: 100K calls = $100/month

**Medium Tier:** $0.001-0.01 per call
- Sweet spot for most MCPs (databases, APIs)
- Example: 10K calls = $100/month

**High Tier:** $0.01-0.10 per call
- Premium value (AI models, advanced tools)
- Example: 1K calls = $100/month

**Recommendation:** Start low to gain users, then increase based on demand.

You can change pricing anytime in your dashboard.`
  },
  {
    category: 'MCPs',
    question: 'What MCPs are available?',
    answer: `We have 19 official MCPs ready to use:

**AI/ML (4):**
- Anthropic Claude MCP - Access Claude 3 models
- Cohere API MCP - Natural language processing
- OpenAI Chat MCP - GPT models
- Stability AI MCP - Image generation

**Data & Databases (3):**
- PostgreSQL Query MCP - SQL operations
- MongoDB Query MCP - NoSQL databases
- Redis Cache MCP - Caching layer

**Finance & Crypto (2):**
- Crypto Prices MCP - FREE crypto prices
- Stock Data MCP - Real-time stock data

**Social Media (2):**
- Twitter/X API MCP - Post, read, interact
- Discord Bot MCP - Server management

**Utilities (5):**
- Weather API MCP - FREE weather data
- Email Sender MCP - Send emails
- SMS Sender MCP - Send SMS
- Image Processing MCP - Resize, compress, convert
- PDF Processing MCP - Extract text from PDFs

**Development (2):**
- GitHub Actions MCP - CI/CD automation
- Web Scraper MCP - Extract data from websites

**Storage (1):**
- S3 Storage MCP - File storage

Browse all MCPs at oma-ai.com/mcps`
  },
  {
    category: 'Security',
    question: 'Is OMA-Ai secure?',
    answer: `Security is our top priority. Here's what we do:

**API Security:**
- Input validation (Zod schemas)
- SQL injection prevention (parameterized queries)
- XSS protection (DOMPurify)
- Rate limiting (100-1000 requests/minute)
- JWT-based authentication (expiration)

**Payment Security:**
- x402 protocol with ERC-3009 standard
- Random nonces (128-bit entropy)
- Time-based authentication (24h expiration)
- Domain separation (replay prevention)
- Monthly automatic payouts (no manual withdrawals)

**Data Security:**
- Encrypted environment variables
- Row Level Security (RLS) on database
- Data retention policies (auto-cleanup)
- GDPR compliance (data deletion on request)

**Monitoring:**
- 24/7 uptime monitoring
- Error tracking and alerting
- Security audits (regular reviews)
- Incident response procedures

Read our security documentation for details.`,
    related: [
      { title: 'Security Best Practices for MCPs', href: '/docs/blog/security-best-practices-for-mcps' },
      { title: 'MCP Security Checklist', href: '/docs/blog/mcp-security-checklist' }
    ]
  },
  {
    category: 'Account',
    question: 'How do I delete my account?',
    answer: `To delete your account and all associated data:

**1. Login to Your Account:** Visit oma-ai.com/dashboard
**2. Go to Settings:** Navigate to Account Settings
**3. Click "Delete Account":** Scroll to bottom of page
**4. Confirm Deletion:** Enter your password to confirm
**5. Immediate Deletion:** All data is deleted within 24 hours

**What Gets Deleted:**
- User profile and settings
- API keys and access tokens
- Wallet connections (but not wallet addresses)
- Usage history
- Transaction history
- Payment information
- Published MCPs (unless transferred to another account)

**What's Kept:**
- Your wallet addresses (we never store private keys)
- Your GitHub/other social media connections
- Your Discord presence (if any)

**GDPR Right to Erasure:** Full compliance. We provide confirmation email when deletion is complete.`
  },
  {
    category: 'Payments',
    question: 'When do I get paid?',
    answer: `Payouts are processed automatically on the 1st of each month:

**Payout Conditions:**
- Your earnings must be at least $10 USDC (payout threshold)
- Your MCP must be active and approved
- No pending disputes or violations

**Payout Process:**
**Day 1:** We calculate your earnings from the previous month
**Day 1-3:** We process payouts to your connected wallet
**Day 3-7:** Payouts complete (depends on blockchain)
**Day 7:** You receive confirmation email

**Example Timeline:**
- March 31: You earned $150 from your MCP
- April 1: Payout processed ($142.50 after 5% fee)
- April 3: Transaction confirmed on blockchain
- April 5: You receive $142.50 in your wallet
- April 7: You get confirmation email

**Payout Methods:**
- Base (USDC)
- Solana (USDC)
- Automatic selection based on your connected wallet

**Check Payout Status:** Visit your dashboard → Earnings → Payout History`
  },
  {
    category: 'Account',
    question: 'Can I use multiple wallets?',
    answer: `Yes! OMA-Ai supports multi-chain wallets:

**Supported Chains:**
- Base (x402 gasless payments)
- Solana (USDC payments)
- More coming soon (Polygon, Arbitrum)

**Multiple Wallets:**
You can connect multiple wallets to your account:
- 1 wallet per chain (Base + Solana = 2 wallets)
- Switch between wallets in your profile settings
- Each wallet has its own balance and transactions

**Why Multiple Wallets?**
- Separation: Keep trading separate from earnings
- Privacy: Different wallets for different purposes
- Security: Spread risk across multiple addresses
- Flexibility: Use the chain that's best for each transaction

**Connecting a New Wallet:**
1. Go to Dashboard → Profile → Wallets
2. Click "Add Wallet"
3. Choose chain (Base or Solana)
4. Connect via MetaMask (Base) or Phantom (Solana)
5. Set as default or keep as secondary

**Switching Wallets:**
In payment prompts, select which wallet to use (if both are connected). Default is your primary wallet.`
  },
  {
    category: 'Technical',
    question: 'What happens if an API call fails?',
    answer: `Our API is designed with graceful failure handling:

**Error Responses:**
All errors return structured JSON:
\`\`\`json
{
  "success": false,
  "error": "Error message",
  "code": 400,
  "timestamp": 1709323200000,
  "request_id": "uuid-request-id"
}
\`\`\`

**Common Error Codes:**
- **400:** Bad request (invalid parameters)
- **401:** Unauthorized (invalid API key)
- **402:** Payment required (insufficient balance)
- **404:** Not found (MCP or resource doesn't exist)
- **429:** Rate limit exceeded (wait and retry)
- **500:** Internal server error (try again later)
- **503:** Service unavailable (maintenance)

**Automatic Retry:**
Our SDKs include automatic retry logic:
- Exponential backoff (2s, 4s, 8s, 16s)
- Max retries: 3
- Retry on: 500, 502, 503, 504 errors

**Manual Retry:**
Preformatted code blocks are shown in the documentation.

See our API documentation for error handling examples.

**Monitoring:**
We track all errors and monitor for issues. If you experience repeated errors, please contact support.`
  },
  {
    category: 'Privacy',
    question: 'What data does OMA-Ai collect?',
    answer: `We collect minimal data to provide our services:

**Data We Collect:**
- **Account Information:** Email, name, optional bio
- **Wallet Addresses:** Public wallet addresses (never private keys)
- **Usage Data:** MCP calls, timestamps, performance metrics
- **Payment Data:** Transaction IDs, amounts (encrypted)
- **Support Data:** Support tickets, chat logs (if enabled)

**Data We DON'T Collect:**
- Private keys or seed phrases
- Full IP addresses (hashed for security)
- Precise location (approximate for CDN optimization)
- Browser fingerprinting
- Unnecessary personal data

**How We Use Your Data:**
- Provide and improve services
- Process payments
- Monitor performance and uptime
- Prevent fraud and abuse
- Send you notifications (with consent)

**Data Sharing:**
- **Never sold** to third parties
- **Only shared** when legally required (subpoenas, etc.)
- **Aggregated analytics** (no personally identifiable information)
- **With your explicit consent** for partners

**Your Rights:**
- Access all your data
- Download your data (portable format)
- Delete your data (right to erasure)
- Opt out of non-essential data collection
- Control what's shared with partners

Read our Privacy Policy for details.`
  },
  {
    category: 'Competition',
    question: 'How is OMA-Ai different from Smithery.ai or RapidAPI?',
    answer: `OMA-Ai is designed specifically for MCPs and offers significant advantages:

**Platform Fee:**
- OMA-Ai: **5%** (best in industry)
- Smithery.ai: ~10% (estimated)
- RapidAPI: 20-30%

**Annual Savings:**
On $10,000/day revenue:
- OMA-Ai: $9,500/month to you
- Smithery.ai: $9,000/month (you lose $1,800/year)
- RapidAPI (20%): $8,000/month (you lose $18,000/year)
- RapidAPI (30%): $7,000/month (you lose $30,000/year)

**Key Differences:**

| Feature | OMA-Ai | Smithery.ai | RapidAPI |
|--------|----------|-------------|-----------|
| Platform Fee | **5%** | ~10% | 20-30% |
| Gasless Payments | ✅ x402 | ❌ | ❌ |
| Multi-Chain | ✅ Base + Solana | Unknown | Unknown |
| Official MCPs | ✅ 19 included | Unknown | ❌ No |
| MCP-Specific | ✅ | ✅ | ❌ (generic APIs) |
| Payout Threshold | $10 | Unknown | Unknown |

**OMA-Ai Advantages:**
- Earn more (95% vs 90% vs 70-80%)
- Zero gas fees for users (x402)
- Multi-chain support (flexibility)
- MCP-specific features (built for MCPs)
- Comprehensive documentation
- Active community (Discord, GitHub)

Choose OMA-Ai for maximum earnings!`,
    related: [
      { title: 'OMA-Ai vs Competitors', href: '/docs/blog/oma-ai-vs-competitors-2026' }
    ]
  }
];

interface FAQ {
  category: string;
  question: string;
  answer: string;
  related?: Array<{ title: string; href: string }>;
}
