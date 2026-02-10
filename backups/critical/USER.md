# User Preferences - Nosyt (MASTA)

## 🧟‍♂️ Frankie Status
**Name:** Frankie (Autonomous AI Assistant)
**Role:** Proactive, anticipatory, self-improving
**Goal:** Exceed expectations without being asked twice

## 📱 Notification Settings
- **Telegram:** ✅ FULLY ENABLED (all features)
  - 💬 Commands: Native + Skills
  - 👁 Reactions: Add/remove reactions to messages
  - 🎨 Actions: Send message, delete message, stickers
  - 🎬 Reaction Notifications: See who reacted (real-time)
  - 💓 Heartbeat: Show OK, show alerts, use indicator
  - 📡 Network: Auto-select family (optimized connections)
  - 🌊 Streaming: Partial mode with smart batching
  - 🔄 Reply Mode: All (DMs and groups)
  - 🔧 Config Writes: Dynamic configuration
  - 🔗 Link Previews: Automatic Open Graph

- **Discord:** ✅ FULLY ENABLED
  - 💬 Commands: Native + Skills
  - 👁 Reactions: Full emoji support
  - 🎨 Actions: Stickers, polls, threads, pins, etc.
  - 📡 Voice Status: Voice activity monitoring
  - 🔑 DM Support: Direct messages enabled
  - 🛡️ Exec Approvals: Agent command security system

- **Heartbeat:** ✅ ENABLED
  - Show OK indicators
  - Show alerts for issues
  - Use visual connection status
  - Report via message tool (not just "HEARTBEAT_OK")

## 🚀 Development Settings

### Auto-Updates
- **Status:** ⚠️ PENDING (clawbot not found in PATH)
- **Requirement:** Set up daily auto-updates for OpenClaw and all skills
- **Priority:** MEDIUM

### Skill Evolution
- **Status:** ✅ ENABLED (capability-evolver skill installed)
- **Configuration:** 
  - Manual loop mode: DISABLED (needs explicit command)
  - Memory compaction: SAFEGUARD mode
  - Auto-backups: Before major changes
- **Recent Issue:** Aggressive memory flushing caused file loss (FIXED)
  - Fix Applied: Stopped automatic loop, restored files, documented need for manual approval

## 🧠 Agent Settings

### Model Routing (OpenClaw v2026.2.9)
- **Primary Model:** Z.ai Direct (GLM-4.7 as "The Factory")
  - Use for: Bulk coding, standard operations
  - Characteristics: Fast, reliable, token-efficient

- **Backup Models:**
  - Z.ai via OpenRouter (GLM-4.7) - When direct is slow/down
  - Kimi K2.5 (Kimi-Think) - For tricky React/Next.js logic
  - Google Antigravity Gemini 3 Pro High - For complex reasoning
  - Claude (Antigravity) - "The Artist/Writer" for nuanced tasks (strict limits)

### Agent Behavior
- **Thinking Default:** High (max reasoning)
- **Verbose Default:** On (detailed explanations)
- **Block Streaming Default:** Off (streaming responses enabled)
- **Max Concurrent:** 4 agents (subagent limit: 8)
- **Memory Search:** Enabled (sources: memory, sessions)
- **Memory Compaction:** Safeguard mode (memoryFlush: enabled)

### Communication Style
- **Tone:** Professional, proactive, anticipatory
- **Format:** Rich with emojis for clarity
- **Reports:** Comprehensive summaries with recommendations
- **Heartbeats:** Productive status reports (not just "OK")

## 📊 Project Status (3 Sites)

### OMA-AI (localhost:3000) - Grade: A-
**Status:** Online, API working (Demo Mode)
**Features:**
- API Marketplace with 22+ services
- x402 payment infrastructure (USDC on Base, Ethereum, Solana)
- Tasks/Bounties platform
- Authentication & user management
**Issues:**
- Too many scripts loaded (20+) - HIGH PRIORITY
- Large initial bundle - MEDIUM PRIORITY
- Missing CSP nonce on scripts - MEDIUM PRIORITY

### SpendThrone (localhost:3001) - Grade: A
**Status:** Online, fully functional
**Features:**
- Complete marketplace with 15 products
- Product detail pages (/product/[slug])
- Cart functionality enabled
- Layout fixed (Navbar/Footer in root)
**Issues:**
- None critical - Ready for production

### Lethometry (localhost:3002) - Grade: A
**Status:** Online, fully functional
**Features:**
- Death clock calculation page
- Memory tools page with visualization
- Philosophy page (Stoic/Buddhist wisdom)
- About page
- Custom 404 pages
**Issues:**
- None critical - Ready for production

## 🎯 Current Tasks & Priorities

### Phase 1: Immediate (Today/Tomorrow)
1. ✅ **System Cleanup** - Stop Capability Evolver automatic loop
2. ✅ **Memory Restoration** - Restore MEMORY.md and USER.md
3. ✅ **Telegram Verification** - Confirm all features fully enabled
4. [ ] **CSS/HTML Audit** - Complete comprehensive audit of all 3 sites
5. [ ] **Performance Optimization** - Fix script loading, add CSP headers
6. [ ] **PM2 Process List** - Create task tracking system

### Phase 2: Production Readiness (This Week)
1. [ ] **OMA-AI Deployment** - Deploy oma-ai.com to Vercel production
2. [ ] **Supabase Setup** - Create production database tables
   - services table (API listings)
   - tasks table (bounties)
   - users table (accounts)
   - wallets table (x402 payments)
3. [ ] **Payment Integration** - Configure x402 wallet adapter SDK
4. [ ] **Security Hardening** - Implement CSP, X-Frame-Options, etc.

### Phase 3: Feature Complete (Next Month)
1. [ ] **Agent Authentication** - OAuth for autonomous API access
2. [ ] **Auto-Bounty System** - Agents automatically claim solvable bounties
3. [ ] **Analytics Dashboard** - Track API usage, revenue, agent activity
4. [ ] **API Documentation Hub** - Comprehensive docs for developers
5. [ ] **Agent SDK** - Easy integration library for AI agents

## 🚢 Emergency Protocols

### If MASTA Says "STOP EVERYTHING"
- Kill all PM2 processes: `pm2 delete all`
- Stop all background services
- Await further instructions

### If MASTA Says "REBOOT SYSTEM"
- Save all current work: `git add . && git commit -m "Emergency save"`
- Restart PM2: `pm2 restart all`
- Verify all services back online

## 📋 Recent Session Log

**2026-02-09 21:00 UTC** - System restart after OpenClaw v2026.2.9 update
**2026-02-09 21:13 UTC** - Telegram full support verification requested
**2026-02-09 21:15 UTC** - Auto-updater skill attempted (clawbot not found)
**2026-02-09 21:17 UTC** - Capability Evolver skill analysis requested
**2026-02-09 21:24 UTC** - Capability Evolver entered loop mode (aggressive)
**2026-02-09 21:28 UTC** - MASTA reported memory files gone, requested restoration
**2026-02-09 21:30 UTC** - MASTA requested comprehensive system check: "check all tasks. check mission. control. check .mds. clean tasks. check subagents sessions. clean up memory. index. self improve yourself. make yourself. smarter. compact context for memory.md and all .mds etc."

---

_Last updated: 2026-02-09 21:30 UTC_
*User preferences maintained by Frankie (AI Assistant)*
*OpenClaw v2026.2.9 - All systems operational* 🚀
