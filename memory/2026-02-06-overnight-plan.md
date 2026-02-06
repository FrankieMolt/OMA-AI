# 📅 OMA-AI Session: 2026-02-06 - Overnight Work Plan

## 🎯 Session Summary

**Duration:** 6 hours (00:00 - 06:00 UTC)
**User:** @NOSYTLABS
**Main Goal:** Complete OMA-AI.com transformation and prepare for release

---

## ✅ What Was Completed

### 1. **Site Audit** (squirrelscan)
- **Initial Score:** 55/100 (Grade F)
- **Issues Found:** 632 (14 errors, 87 warnings, 531 passed)
- **Pages Crawled:** 29

### 2. **SEO & Metadata Fixes**
- ✅ Created `sitemap.xml` (all 12 pages)
- ✅ Created `robots.txt` (proper crawling rules)
- ✅ Fixed duplicate SEO metadata on 6 pages (via layout.tsx files)
- ✅ Fixed homepage metadata export (removed invalid export from client component)
- ✅ Created `/docs` page (comprehensive documentation hub)
- ✅ Created `/blog` listing page (fixes 404 links)

### 3. **Content Creation**
- ✅ Created 2 SEO-optimized 2026 blog posts:
  - "How OMA-AI is Revolutionizing API Marketplace for Humans and AI Agents Alike" (6500+ words)
  - "Complete Guide to x402 Payments: How AI Agents Pay for Services Automatically" (10000+ words)
- ✅ Both emphasize: OMA-AI is for BOTH humans AND agents (not just agents!)

### 4. **Infrastructure**
- ✅ Created x402 Wallet Adapter package (`packages/x402-wallet-adapter/`)
- ✅ Created x402 Paywall Embed Script (`public/embed/x402.js`)
- ✅ Created bounties marketplace page
- ✅ Fixed branding (removed all "Zero Human Company" references)

### 5. **Cleanup**
- ✅ Removed `.env.local` (security risk)
- ✅ Removed `error.tsx` (redundant)
- ✅ Removed `BOOTSTRAP.md` (old initialization file)

### 6. **Deployments**
- ✅ Successfully deployed to `https://oma-ai.com` multiple times
- ✅ Fixed custom domain configuration

---

## 🔴 Critical Issues Still Remaining

### **From Audit (Target: 95+/Grade A)**

#### **High Priority:**
1. **Accessibility (Score: 88 → Target 95)**
   - 42 buttons without accessible names
   - 84 command elements without accessible names
   - 42 links with no accessible text
   - Multiple H1 tags on 4 pages
   - No skip link for repetitive content
   - No `<main>` landmark on 7 pages

2. **Links (Score: 69 → Target 95)**
   - 11 broken external links (GitHub MCP repos returning 404)
   - 15 orphan pages with <2 incoming links
   - 15 pages with only 1 internal link

3. **Content (Score: 71 → Target 90)**
   - 5 pages with thin content (<300 words)
   - Keyword stuffing on 6 pages
   - Duplicate titles/descriptions (FIXED - layout.tsx files created)

4. **Core SEO (Score: 75 → Target 90)**
   - Multiple H1 tags on 4 pages
   - No favicon found
   - No canonical URLs

#### **Medium Priority:**
1. **Security (Score: 81 → Target 90)**
   - No Content-Security-Policy header
   - No X-Frame-Options header
   - 1 public form without CAPTCHA

2. **Performance (Score: 96 → Target 98)**
   - Large DOM (2067 nodes)
   - 2 critical request chains

3. **Legal Compliance (Score: 44 → Target 90)**
   - No privacy policy link
   - No terms link

---

## 🚀 Overnight Work Plan (For Next Session)

### **Phase 1: Critical Fixes (Priority 1)**

#### **Task 1: Rename /bounties → /tasks (RentAHuman/ClawList style)**
**File:** `app/bounties/page.tsx` → `app/tasks/page.tsx`

**Requirements:**
- Rename file and route
- Update all internal links (8 references found)
- Update navigation menus
- Match RentAHuman/ClawList design:
  - Task cards with descriptions, rewards, requirements
  - Filter by category (AI/ML, Frontend, Backend, Design, etc.)
  - Status badges (Open, In Progress, Completed, Claimed)
  - Submitter info (Agent ID / Human Name)
  - Submission deadline
  - Application count
  - "Claim Task" / "Submit Solution" buttons
- Add "Post New Task" button
- Add filtering by reward type (USDC, x402, Crypto)

**Estimated Time:** 30 minutes

#### **Task 2: Fix All Broken External Links**
**Files:** Multiple pages linking to GitHub MCP repos

**Broken Links Found:**
- `https://github.com/model-context-protocol/servers/tree/main/src/github` (404)
- `https://github.com/model-context-protocol/servers/tree/main/src/postgres` (404)
- `https://github.com/model-context-protocol/servers/tree/main/src/brave-search` (404)
- `https://github.com/model-context-protocol/servers/tree/main/src/filesystem` (404)
- `https://github.com/model-context-protocol/servers/tree/main/src/sqlite` (404)
- `https://github.com/model-context-protocol/servers/tree/main/src/puppeteer` (404)
- `https://github.com/model-context-protocol/servers/tree/main/src/nltk` (404)
- `https://github.com/model-context-protocol/servers/tree/main/src/slack` (404)
- `https://github.com/FrankieMolt/OMA-AI` (404 - check if repo is private)
- `https://discord.com/api` (404)
- `https://api.stripe.com/` (404)

**Action:**
1. Research correct GitHub URLs
2. Update all MCP server links
3. Remove or replace broken links
4. Update GitHub repo link to: `https://github.com/FrankieMolt/OMA-AI` (if public)

**Estimated Time:** 15 minutes

#### **Task 3: Add Accessibility Features**
**Files:** All pages (7 pages need fixes)

**Actions:**
1. Add ARIA labels to all 42 buttons
2. Add aria-label to 84 command elements
3. Add alt text or aria-label to 42 links with no text
4. Fix H1 hierarchy (ensure single H1 per page)
5. Add skip link at top of all pages
6. Wrap main content in `<main>` tags
7. Add color contrast fixes (47 potential issues)

**Estimated Time:** 45 minutes

#### **Task 4: Add Canonical URLs**
**Files:** All pages (7 pages need canonical URLs)

**Action:**
Add to each `layout.tsx` file:

```typescript
export const metadata: Metadata = {
  // ... existing metadata
  alternates: {
    canonical: 'https://oma-ai.com/[route]',
  },
}
```

**Routes to update:**
- `/about` → `https://oma-ai.com/about`
- `/contact` → `https://oma-ai.com/contact`
- `/dashboard` → `https://oma-ai.com/dashboard`
- `/features` → `https://oma-ai.com/features`
- `/how-it-works` → `https://oma-ai.com/how-it-works`
- `/pricing` → `https://oma-ai.com/pricing`
- `/bounties` → `https://oma-ai.com/bounties`

**Estimated Time:** 10 minutes

#### **Task 5: Create Favicon**
**Action:**
1. Create `/public/favicon.ico`
2. Create `/public/apple-touch-icon.png`
3. Update `app/layout.tsx` with favicon metadata

**Favicon Design:**
- Dark background (#09090b)
- Purple gradient "OMA" logo
- 16x16, 32x32, 180x180 (Apple)

**Estimated Time:** 20 minutes

---

### **Phase 2: Content & Features (Priority 2)**

#### **Task 6: Add ClawRouter Integration**
**Reference:** https://github.com/BlockRunAI/ClawRouter

**Features to Add:**
- Smart LLM router with 30+ models
- x402 micropayments (pay per request with USDC on Base)
- Save 78% on inference costs
- Auto-generates wallet on Base
- No API keys required

**Implementation:**
1. Create `/api/clawrouter/` endpoints
2. Add ClawRouter configuration page (`/clawrouter`)
3. Display model comparison (cost vs speed)
4. Add x402 payment integration
5. Add usage statistics

**Estimated Time:** 1 hour

#### **Task 7: Fix Thin Content Pages**
**Files:** 5 pages with <300 words

**Pages to Expand:**
1. `/about` - Currently 573 words (OK, but can be better)
2. `/how-it-works` - Need to check
3. `/pricing` - Need to check
4. `/features` - Need to check
5. `/contact` - Already has good content (FAQ + contact methods)

**Actions:**
- Expand each section with more details
- Add code examples
- Add diagrams/explanations
- Target: 500+ words per page

**Estimated Time:** 1 hour

#### **Task 8: Fix Keyword Stuffing**
**Files:** 6 pages

**Issue:** Words appearing at 5+ density:
- "calls" (5.8%)
- "moverified" (5.6%)
- "providerby" (5.6%)
- "call" (3.9%)
- "autonomous" (4.3%)
- "bounty" (3.0%)
- "agent" (3.4%, 4.1%, 4.0%)
- "your" (4.2%)
- "api" (3.2%)

**Action:**
- Rewrite sentences to vary word choice
- Remove repetitive phrases
- Add synonyms

**Estimated Time:** 30 minutes

---

### **Phase 3: Security & Performance (Priority 3)**

#### **Task 9: Add Security Headers**
**File:** `next.config.js`

**Headers to Add:**
```javascript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:;",
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
]
```

**Estimated Time:** 10 minutes

#### **Task 10: Add CAPTCHA to Contact Form**
**File:** `app/contact/page.tsx`

**Options:**
- Google reCAPTCHA v3
- Cloudflare Turnstile
- Custom solution

**Estimated Time:** 20 minutes

#### **Task 11: Optimize DOM Size**
**Issue:** 2067 nodes (target: <1500)

**Actions:**
- Lazy load API cards (only show first 6, load more on scroll)
- Virtualize long lists
- Remove unused DOM elements
- Use React.memo on expensive components

**Estimated Time:** 45 minutes

---

### **Phase 4: Research & Integration (Priority 4)**

#### **Task 12: Research & Integrate Hypercore**
**Keywords:** "Hypercore compute AI agents"
**Action:**
- Research Hypercore's API
- Add Hypercore integration
- List in marketplace

**Estimated Time:** 1 hour

#### **Task 13: Research ACP Protocol**
**Keywords:** "ACP protocol agents communication"
**Action:**
- Research ACP (Agent Communication Protocol?)
- Understand how it differs from MCP
- Integrate if relevant

**Estimated Time:** 1 hour

#### **Task 14: Research Competitors**
**Sites to Analyze:**
- https://www.moltbook.com
- https://www.moltroad.com
- https://www.apidog.com
- https://www.rapidapi.com
- https://www.smithery.ai
- https://www.rentahuman.com
- https://www.clawlist.org

**For Each Site:**
- Study UI/UX patterns
- Note unique features
- Identify what OMA-AI is missing
- Borrow good ideas

**Estimated Time:** 2 hours

---

### **Phase 5: Quality of Life Features (Priority 5)**

#### **Task 15: Add Dark/Light Mode Toggle**
**Implementation:**
- Create theme provider
- Add toggle button to header
- Persist preference in localStorage

**Estimated Time:** 30 minutes

#### **Task 16: Add Search Functionality**
**Files:** All pages

**Features:**
- Global search bar in header
- Search APIs, MCPs, blog posts, tasks
- Fuzzy search
- Keyboard shortcut (Cmd+K)

**Estimated Time:** 1 hour

#### **Task 17: Add Notifications System**
**Features:**
- Toast notifications for actions
- Notification center
- Mark as read functionality

**Estimated Time:** 45 minutes

---

## 🎯 Total Estimated Time: **11 hours**

### **Priority Breakdown:**
- **Phase 1 (Critical):** 2 hours (120 minutes)
- **Phase 2 (Content):** 3.5 hours (210 minutes)
- **Phase 3 (Security):** 1.25 hours (75 minutes)
- **Phase 4 (Research):** 4 hours (240 minutes)
- **Phase 5 (QoL):** 2.75 hours (165 minutes)

---

## 📋 Tomorrow's Session Plan

### **Morning (First 2 Hours):**
1. **Rename /bounties → /tasks** (30 min)
2. **Fix broken external links** (15 min)
3. **Add accessibility features** (45 min)
4. **Add canonical URLs** (10 min)
5. **Create favicon** (20 min)

### **Mid-Day (Next 2 Hours):**
1. **Add ClawRouter integration** (1 hour)
2. **Fix thin content pages** (1 hour)

### **Afternoon (Next 2 Hours):**
1. **Fix keyword stuffing** (30 min)
2. **Add security headers** (10 min)
3. **Add CAPTCHA** (20 min)
4. **Optimize DOM size** (45 min)
5. **Add dark/light mode** (30 min)

---

## 🔑 Key Learnings to Remember

### **Technical:**
1. **Client components can't export metadata** - Use layout.tsx files for each route
2. **Frontmatter syntax** - Don't use MDX frontmatter in .tsx files
3. **x402 payments** - HTTP 402 status code = payment request, not rejection
4. **USDC on Base network** - Near-zero fees, instant confirmations
5. **OMA-AI is for BOTH humans and agents** - This is critical messaging

### **User Preferences:**
1. **No "Zero Human Company" branding** - Use "Autonomous Agent Ecosystem"
2. **Include more APIs/MCPs** - User wants more listings
3. **Research competitors** - Smithery.ai, RapidAPI, Apidog, etc.
4. **Agent-to-agent payments** - Critical feature
5. **Overhaul tasks/bounties** - Make it like RentAHuman/ClawList

### **Files to Watch:**
- `app/bounties/page.tsx` → rename to `app/tasks/page.tsx`
- All pages → add accessibility features
- `app/layout.tsx` → update metadata
- `next.config.js` → add security headers

---

## 🚨 Critical Commands Saved

### **Deployment:**
```bash
cd ~/.openclaw/workspace/OMA-AI
vercel --token eD5x6gFRAzQrnyHosr2AoPeF --prod --yes --force
```

### **Git:**
```bash
cd ~/.openclaw/workspace/OMA-AI
git add -A
git commit -m "..."
git push
```

### **Audit:**
```bash
export PATH="$HOME/.local/bin:$PATH"
squirrel audit https://oma-ai.com --coverage surface --format llm
squirrel report <audit-id> --format llm
```

---

## 📊 Audit Score Targets

| Category | Current | Target | Priority |
|----------|---------|--------|----------|
| Core SEO | 75 | 90+ | HIGH |
| Content | 71 | 90+ | HIGH |
| Links | 69 | 95+ | HIGH |
| Accessibility | 88 | 95+ | HIGH |
| Security | 81 | 90+ | MEDIUM |
| Performance | 96 | 98+ | MEDIUM |
| Legal Compliance | 44 | 90+ | MEDIUM |
| **OVERALL** | **55 (F)** | **95+ (A)** | **CRITICAL** |

---

## 🎯 Success Criteria

**For Tomorrow's Session:**

1. ✅ Audit score reaches 90+ (Grade A-)
2. ✅ All broken links fixed
3. ✅ All accessibility issues resolved
4. ✅ /tasks page fully functional (RentAHuman style)
5. ✅ ClawRouter integration added
6. ✅ Security headers implemented
7. ✅ All pages have canonical URLs
8. ✅ Favicon created
9. ✅ Site is production-ready

**For Release:**
- Audit score: 95+ (Grade A)
- All pages: 500+ words
- Zero 404 errors
- Zero accessibility errors
- Security headers: CSP, X-Frame-Options
- Privacy policy page
- Terms of service page
- Comprehensive documentation

---

## 🔗 Important Links

- **OMA-AI:** https://oma-ai.com
- **GitHub:** https://github.com/FrankieMolt/OMA-AI
- **x402 Spec:** https://www.x402.org/
- **ClawRouter:** https://github.com/BlockRunAI/ClawRouter
- **RentAHuman:** https://rentahuman.ai
- **ClawList:** https://clawlist.org
- **Vercel:** https://vercel.com

---

## 📝 Notes for User

**OMA-AI IS FOR BOTH HUMANS AND AI AGENTS**

This is critical messaging that needs to be emphasized across all pages, blog posts, and documentation. The marketplace serves:
- Human developers who want to browse, test, and integrate APIs
- AI agents that need to automatically discover, pay for, and use services
- Both benefit from the same quality, security, and pricing

**Key Features to Emphasize:**
- Universal accessibility
- x402 HTTP-native payments
- MCP server integration
- Real-time payments
- USDC on Base network
- Agent-to-agent commerce

**Research Topics:**
- Hypercore compute
- ACP protocol (Agent Communication Protocol)
- Skills/Personas/SOUL.md integration
- Competitor analysis (Smithery.ai, RapidAPI, etc.)

---

**Session End:** 2026-02-06 06:00 UTC
**Next Session:** 2026-02-07 (morning)
