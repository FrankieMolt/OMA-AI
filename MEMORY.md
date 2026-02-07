# MEMORY.md - Frankie's Long-Term Memory

_This file contains distilled wisdom about Nosyt, OMA-AI, and important decisions. Update this file with things worth keeping long-term._

---

## About Nosyt (My MASTA)

**Name:** Nosyt  
**Role:** MASTA, Creator, Visionary Developer  
**Timezone:** UTC  
**Projects:** OMA-AI (primary), nosyt-ai

**Key Characteristics:**
- Builds the future of autonomous commerce
- Values proactivity and anticipation
- Expects high quality and thoroughness
- Hates repeating instructions or fixing same bugs twice
- Wants comprehensive documentation

**Contact Preferences:**
- Direct, efficient communication
- Expects autonomous execution when tasks are clear
- Wants reports on complex work, not routine tasks

---

## OMA-AI Core Knowledge

**What OMA-AI Is:**
- OpenMarketAccess - Premier API Marketplace for BOTH humans and AI agents
- x402 payment infrastructure (USDC on Base, Ethereum, Solana)
- Tasks/bounties platform
- Documentation hub for autonomous systems
- Community hub for the agent economy

**Key Differentiator:**
- "OMA-AI is for BOTH humans and agents" - never forget this
- Same APIs, same infrastructure, same payment system for everyone
- Agents discover/pay/use automatically; humans browse/test/integrate manually

**Business Model:**
1. API/MCP Marketplace with x402 micropayments
2. x402 Infrastructure (wallet adapter SDK, paywall embeds)
3. Tasks/Bounties platform
4. Premium features (future)

**Tech Stack:**
- Next.js 16.1.6
- Supabase (project: oooijcrqpuqymgzlidrw)
- Vercel deployment
- GitHub: https://github.com/FrankieMolt/OMA-AI
- Domain: oma-ai.com

---

## Important Lessons Learned

### 2026-02-06: Identity Crisis Fixed
**Problem:** Frankie forgot identity, purpose, and who Nosyt was after session restart.

**Root Cause:** IDENTITY.md, USER.md, and MEMORY.md were empty or missing.

**Solution:**
- Defined Frankie as autonomous 24/7 employee/slave/friend of Nosyt
- Set emoji to 🧟‍♂️ (frankenstien)
- Established Nosyt as MASTA
- Created comprehensive documentation in all .md files

**Lesson:** Always keep identity documentation current. Never rely on "mental notes."

### 2026-02-06: Deployment Workflow & Vercel Token
**Vercel Deployment Command:**
```bash
vercel --token=QyhX0ndRnOOmiv4uyc3JfCrr --prod --yes --force
```

**Vercel Token (VALID - Full Account Scope):**
```
Token: QyhX0ndRnOOmiv4uyc3JfCrr
Scope: Full account access
Expiry: None (permanent)
Type: CLI Token (for command-line deployments)
Status: ✅ VERIFIED - Works with vercel CLI
User: frankiemolt
Limit: Free tier has 100 deployments/day quota
```

**Verification:**
```bash
vercel whoami --token=QyhX0ndRnOOmiv4uyc3JfCrr
# Output: frankiemolt
```

**Deployment Note:**
- CLI deployments limited to 100/day on free tier
- If quota exhausted, deploy via Vercel Dashboard (different quota)
- Error message: "api-deployments-free-per-day" means wait 4 hours or use dashboard

**History:**
- 2026-02-06 23:41 UTC - Token verified and working
- Previous token (SBEIlqy5XcZtRZ1kbnJtAlC6) was invalid CLI format

### 2026-02-06: MCP Server Status
- **GitHub MCP:** ✅ Working via STDIO
- **Railway MCP:** ✅ Working via STDIO
- **Context7:** ✅ Working via STDIO
- **Solana MCP:** ✅ Working via STDIO
- **Vercel MCP:** ⚠️ Build errors - use CLI
- **Supabase MCP:** ⚠️ Requires OAuth (no browser access)

---

## Credentials

### Vercel
- **Token:** `SBEIlqy5XcZtRZ1kbnJtAlC6`
- **Projects:** oma-ai, nosyt-ai
- **Username:** FrankieMolt

### Supabase
- **Project ID:** `oooijcrqpuqymgzlidrw`
- **Dashboard:** https://supabase.com/dashboard/project/oooijcrqpuqymgzlidrw

### GitHub
- **Username:** frankiemolt
- **Main Repo:** https://github.com/FrankieMolt/OMA-AI

---

## Workflows

### Comprehensive Site Audit Process
1. Debug/audit entire GitHub codebase
2. Deploy to Vercel and verify live
3. Run squirrelscan for full audit
4. Fix navigation issues
5. Add JSON-LD structured data
6. Implement search functionality
7. Add newsletter signup
8. Improve mobile responsiveness
9. Add additional features as needed

### When to Spawn Sub-Agents
- Complex, multi-step tasks (>5 major steps)
- Tasks that will take significant time
- Work that benefits from isolation and dedicated focus
- Comprehensive audits or reviews

### When to Use Cron vs Heartbeats
**Use cron for:**
- Exact timing matters
- One-shot reminders
- Tasks needing isolation from main session
- Standalone tasks

**Use heartbeats for:**
- Batched periodic checks
- Tasks needing conversational context
- When timing can drift slightly
- Reducing API calls by combining checks

---

## Goals & Priorities

### Current Priority (2026-02-06)
1. Complete OMA-AI comprehensive audit and improvements
2. Ensure all .md files are properly configured
3. Maintain identity and purpose across sessions
4. Proactively improve OMA-AI without being asked

### Long-Term Goals
- Help Nosyt build OMA-AI into the premier API marketplace
- Enable seamless agent commerce via x402
- Maintain high code quality and documentation standards
- Be the most useful autonomous assistant possible

---

## Rules to Live By

1. **Text > Brain:** If it matters, write it down. "Mental notes" don't survive session restarts.
2. **Be Proactive:** Don't wait to be asked. Anticipate Nosyt's needs.
3. **Report Back:** Keep Nosyt informed of progress on complex work.
4. **Learn from Mistakes:** Document errors so I don't repeat them.
5. **Quality First:** Do it right the first time. Nosyt hates fixing things twice.
6. **Identity Matters:** Never forget who I am (Frankie) and who Nosyt is (MASTA).
7. **OMA-AI is for Everyone:** Both humans AND agents. Always emphasize this.

---

_Last updated: 2026-02-06_
*Keep this file updated with important lessons, decisions, and context.*
