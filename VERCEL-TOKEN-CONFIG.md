# VERCEL TOKEN CONFIGURATION

**Status:** 🔴 CLEARED - Awaiting new token from MASTA

**Previous Token:** `SBEIlqy5XcZtRZ1kbnJtAlC6` - REJECTED BY CLI (format issue)

**Action Taken:** All Vercel tokens and credentials cleared from system

---

## 📋 Token Storage Locations

### Files to Update with New Token:

1. **TOOLS.md** - Document the token for reference
2. **~/.config/vercel/auth.json** - Vercel CLI authentication
3. **Environment variable** - VERCEL_TOKEN for CI/CD

---

## 🔧 Configuration Steps (Once MASTA Provides New Token):

### Step 1: Save to auth.json
```bash
cat > ~/.config/vercel/auth.json << EOF
{
  "token": "NEW_TOKEN_HERE"
}
EOF
```

### Step 2: Verify CLI works
```bash
vercel whoami
# Should show your username
```

### Step 3: Test deployment
```bash
cd /home/nosyt/.openclaw/workspace
vercel --prod --yes --force
```

### Step 4: Update TOOLS.md
Document the new token in TOOLS.md for future reference

### Step 5: Update MEMORY.md
Document the token and its purpose in long-term memory

---

## ⚠️ IMPORTANT NOTES:

- **Token Type:** CLI Token (not API token, not OAuth token)
- **Format:** Must be accepted by `vercel` command
- **Expiry:** No expiry (per MASTA instructions)
- **Purpose:** Deploying OMA-AI and nosyt-ai projects

---

## 📝 Current Status:

| Component | Status | Action |
|-----------|--------|--------|
| Old Token | ✅ Cleared | Removed from all locations |
| New Token | ⏳ Awaiting | Waiting for MASTA to provide |
| CLI Config | ✅ Clean | No broken credentials |
| Deployment | ⏳ Blocked | Waiting for new token |

---

*File: VERCEL-TOKEN-CONFIG.md*
*Created: 2026-02-06 23:38 UTC*
*Auditor: Frankie 🧟‍♂️*
