# Ralph Mode: OMA-AI Full Site Refresh

## Status: IN PROGRESS

## Phase 1 Deliverables
- [ ] SPEC.md - requirements for UI/UX redesign
- [ ] SPEC_credits.md - x402 credits model
- [ ] SPEC_roadmap.md - roadmap accuracy update

## Phase 2 Deliverables  
- [ ] UI/UX redesign (Venice-style dark theme, model grid, clean cards)
- [ ] Credits page rewritten for x402 model
- [ ] Roadmap accuracy update
- [ ] CubeSandbox as MCP infrastructure option
- [ ] SEO audit and fixes

## Phase 3: Validate & Ship
- [ ] TypeScript: pass
- [ ] Build: pass
- [ ] Commit + push

## Current Issues Found
1. Credits page uses old package model (should be x402 pay-per-call)
2. Roadmap marks x402 payment as "in-progress" (wired in route.ts)
3. UI feels generic — needs Venice-style dark aesthetic with model grid
4. MCPSkillCard: category icons, pricing badges, compare CTAs present but could be cleaner

## Commands
- Typecheck: `cd /home/oldpc/oma-ai-repo && npx tsc --noEmit`
- Build: `cd /home/oldpc/oma-ai-repo && npm run build`
- Lint: `cd /home/oldpc/oma-ai-repo && npm run lint`
