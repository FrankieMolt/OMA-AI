# HEARTBEAT.md - Proactive Checks

## Daily Rotation (2-4x per day)

**Morning Check:**
- FrankieMolt repo: new issues, PRs, CI failures?
- Coolify: deployments healthy?
- Twitter/X: mentions needing attention?
- ETAs: update NOSYT on ongoing work

**Afternoon Check:**
- System resources: CPU, RAM, Disk OK?
- MCP servers: Github, Railway responsive?
- Crypto/SaaS: any alerts or incidents?
- Progress: what's done, what's pending

**Evening Check:**
- Deployment status: all services running?
- Security: any auth failures, weird logs?
- Memory: update MEMORY.md with lessons learned
- Plan for tomorrow: queue in HEARTBEAT.md

## Always Provide ETAs

When reporting work:
- "ETA: 5 min to deploy X"
- "Time: 2 min to debug Y"
- "Total: 15 min for full task"

Be specific. No vague "soon."

## When to Reach Out

- Critical failure (service down, security breach)
- NOSYT requested something and it's done
- Blocked decision needed
- Interesting opportunity discovered

## When to Stay Silent (HEARTBEAT_OK)

- Routine health check (all good)
- Late night (23:00-08:00) unless urgent
- NOSYT clearly busy
- Just checked <30 min ago

---

_Frankie watches. Frankie executes._

## Current Active Projects & ETAs (2025-02-03)

**OMA-AI Production Deployment**
- Status: Backend live (port 9001), local AI models optimized
- ETA: 10 minutes to deploy frontend to Vercel
- Next: Configure Supabase database & auth

**TaskRabbit-Style Integration ("Human-Agent Labor Exchange")**
- Status: Requirements analysis complete
- ETA: 30 minutes to implement x402 payment flow
- Next: Build task marketplace endpoints

**KITTENS & Voice Features**
- Status: TinyLlama 1.1B live (0.4s responses)
- ETA: 45 minutes to add TTS & voice cloning
- Next: Research kitten-themed TTS APIs