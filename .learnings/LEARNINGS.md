# LEARNINGS.md - Self-Improvement Log

_Captures learnings, errors, and corrections for continuous improvement._

---

## [LRN-20260207-001] best_practice

**Logged**: 2026-02-07T21:30:00Z
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
OpenClaw config edits via `edit` tool often fail due to whitespace mismatch - use `write` for full file replacement instead.

### Details
When trying to disable Discord in `openclaw.json`, repeated `edit` attempts failed with "Could not find the exact text" errors. The JSON formatting from `read` didn't match the actual file's whitespace. Using `write` to overwrite the entire file worked reliably.

### Suggested Action
For JSON config files, prefer `write` (full replacement) over `edit` (partial) when making structural changes. Use `edit` only for single-line changes where whitespace is predictable.

### Metadata
- Source: error
- Related Files: /home/nosyt/.openclaw/openclaw.json
- Tags: openclaw, config, json, edit-tool

---

## [LRN-20260207-002] best_practice

**Logged**: 2026-02-07T21:30:00Z
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary
TypeScript requires global type declarations for `window.ethereum` when using wallet libraries like viem/ethers.

### Details
Build failed with "Property 'ethereum' does not exist on type 'Window'" when using `window.ethereum` for wallet detection. Fixed by creating `types/ethereum.d.ts` with proper global interface extension.

### Suggested Action
Always create `types/ethereum.d.ts` when integrating Web3 wallet functionality in TypeScript projects.

### Metadata
- Source: error
- Related Files: types/ethereum.d.ts, components/WalletConnect.tsx
- Tags: typescript, web3, viem, ethereum, wallet

---

## [LRN-20260207-003] knowledge_gap

**Logged**: 2026-02-07T21:30:00Z
**Priority**: medium
**Status**: pending
**Area**: config

### Summary
ClawHub skill names don't include author prefix in install command.

### Details
MASTA provided link `https://clawhub.ai/rdsthomas/mission-control` but install command `clawhub install rdsthomas/mission-control` failed with "Skill not found". Correct command is `clawhub install mission-control` (no author prefix).

### Suggested Action
When installing ClawHub skills, use just the skill name, not `author/skill-name` format.

### Metadata
- Source: error
- Related Files: N/A
- Tags: clawhub, skills, install

---

## [LRN-20260207-004] correction

**Logged**: 2026-02-07T21:30:00Z
**Priority**: low
**Status**: pending
**Area**: docs

### Summary
mission-control skill is for Kanban task management, NOT for debugging/auditing other skills.

### Details
MASTA asked to install mission-control to "debug all skills". The skill is actually a Kanban-style task board for agents, not a skill debugger. Clarified the purpose and used manual audit loop instead.

### Suggested Action
Read SKILL.md description carefully before assuming functionality from skill name.

### Metadata
- Source: conversation
- Related Files: skills/mission-control/SKILL.md
- Tags: mission-control, skills, misunderstanding

---
