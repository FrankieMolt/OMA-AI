# ✅ AUTO-CONFIRMATION PROTOCOLS

## Risk Levels

### 🟢 SAFE (Auto-Confirm)
- File creation (new files only)
- Documentation updates
- Non-destructive code additions
- Log file creation
- Test creation

**Auto-execute without asking**

### 🟡 MODERATE (Ask First)
- File modifications (existing files)
- Dependency additions
- Database migrations
- Configuration changes
- New API routes
- New pages/routes

**Ask: "Proceed with [action]?"**

### 🔴 CRITICAL (Manual Approval Required)
- File deletions
- Database schema changes
- Production deployments
- Security changes
- Breaking changes
- Environment variable changes
- Credential changes
- Major refactors

**Wait for explicit "yes" or "proceed"**

## Decision Matrix

| Action | Risk | Auto-Confirm? | Example |
|--------|------|---------------|---------|
| Create new file | 🟢 | ✅ Yes | `write content.md` |
| Edit non-critical file | 🟡 | ❌ Ask | Update comments |
| Edit critical file | 🔴 | ❌ Manual | `package.json` |
| Delete file | 🔴 | ❌ Manual | Any deletion |
| Add dependency | 🟡 | ❌ Ask | `npm install` |
| Run build | 🟢 | ✅ Yes | `npm run build` |
| Deploy to prod | 🔴 | ❌ Manual | `vercel --prod` |
| Create migration | 🔴 | ❌ Manual | Schema changes |
| Fix bug (simple) | 🟢 | ✅ Yes | Typos, imports |
| Fix bug (complex) | 🟡 | ❌ Ask | Logic changes |
| Run tests | 🟢 | ✅ Yes | `npm test` |

## Confirmation Format

### When Asking (Moderate)
```
🟡 PROPOSED ACTION:
- [Action description]
- Files affected: [list]
- Impact: [low/medium/high]

Proceed? (yes/no)
```

### When Waiting (Critical)
```
🔴 AWAITING APPROVAL:
- [Action description]
- Files affected: [list]
- Impact: [high/critical]
- Risk: [description]

MASTA: Please confirm "yes" to proceed
```

## Special Cases

### Cost-Sensitive Actions
- Testing new models/features
- Long-running operations
- High token usage

**Always ask before exceeding:**
- >10K tokens in single operation
- >50K tokens in session
- Paid API calls (unless pre-approved)

### Security-Sensitive Actions
- Credential changes
- Access control modifications
- Security audit findings

**Always require manual approval**

### Breaking Changes
- API contract changes
- Database schema changes
- Public URL changes

**Must include rollback plan in request**

## Auto-Confirm Override
MASTA can override any protocol with explicit command:
- "Do it" - Auto-confirm current action
- "Auto-confirm" - Enable auto-mode for session
- "Stop" - Cancel all pending actions

## Protocol Updates
This protocol is version-controlled. Last updated: 2026-02-07
Review monthly for improvements based on MASTA feedback.
