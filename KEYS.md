# KEYS.md - Frankie's Credential Storage

**For Frankie's reference only - Never share publicly!**

---

## 🔑 Vercel Credentials

### Vercel CLI Token (VALID - Full Account Scope)
```
Token: QyhX0ndRnOOmiv4uyc3JfCrr
Scope: Full account access
Expiry: None (permanent)
Type: CLI Token (for command-line deployments)
Status: ✅ VERIFIED - Works with vercel CLI
Limit: Free tier has 100 deployments/day limit
```

**IMPORTANT:** Free tier has deployment limit (100/day). If you hit the limit:
- Deploy via Vercel Dashboard (different quota)
- Wait 4 hours for CLI quota to reset

**Usage:**
```bash
# Deploy with token
vercel --token=QyhX0ndRnOOmiv4uyc3JfCrr --prod --yes --force

# Or export as environment variable
export VERCEL_TOKEN=QyhX0ndRnOOmiv4uyc3JfCrr
vercel --prod --yes --force

# Verify authentication
vercel whoami --token=QyhX0ndRnOOmiv4uyc3JfCrr
# Output: frankiemolt
```

**Authentication Files:**
- `~/.config/vercel/auth.json` - Global Vercel CLI config
- `.vercel/auth.json` - Project-specific Vercel CLI config

---

## 🔑 Supabase Credentials

### Supabase Project
```
Project ID: oooijcrqpuqymgzlidrw
Dashboard: https://supabase.com/dashboard/project/oooijcrqpuqymgzlidrw
Status: ✅ Working - All tables deployed
```

### Supabase Anon Key
```
SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vb2lqY3JxcHVxeW1nemxpZHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDY0MjcsImV4cCI6MjA4NTgyMjQyN30.EhnfDdDPRjlOK7OzJCpAF7aGG4fDtf9bE39QmxBhytw
Purpose: Public API access for web clients
Status: ✅ Working
```

**Usage:**
```bash
# Query Supabase
curl -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Authorization: Bearer $SUPABASE_ANON_KEY" \
  https://oooijcrqpuqymgzlidrw.supabase.co/rest/v1/services
```

---

## 🔑 GitHub Credentials

### GitHub CLI
```
User: frankiemolt
Auth: Configured via gh CLI
Repo: https://github.com/FrankieMolt/OMA-AI
Status: ✅ Working
```

**Usage:**
```bash
# Push to GitHub
cd /home/nosyt/.openclaw/workspace
git push origin main

# Create issue
gh issue create --repo FrankieMolt/OMA-AI --title "Issue"

# List issues
gh issue list --repo FrankieMolt/OMA-AI
```

---

## 🔑 x402 Treasury Wallet

### Treasury Wallet Address
```
Address: 0x590FdA238A52bBA79fD4635e73bDAC1eAe558e784
Purpose: x402 payment treasury
Network: Base, Ethereum, Solana
Status: Configured
```

---

## 🔑 Blockchain RPCs

### Solana RPC
```
URL: https://api.mainnet-beta.solana.com
Purpose: Solana mainnet operations
Status: ✅ Working
```

### Base RPC
```
URL: https://mainnet.base.org
Purpose: Base mainnet operations
Status: ✅ Working
```

---

## 📝 Notes

### Token Security
- All tokens are provided by MASTA (Nosyt)
- Never commit keys.md to git repository
- Update keys.md when tokens change
- Document token sources and purposes

### Token Updates
- 2026-02-06 23:41 UTC - New Vercel token added (QyhX0ndRnOOmiv4uyc3JfCrr)
- Previous token (SBEIlqy5XcZtRZ1kbnJtAlC6) was invalid CLI format

### Token Verification
```bash
# Verify Vercel token works
vercel whoami --token=QyhX0ndRnOOmiv4uyc3JfCrr

# Verify Supabase connection
curl -I https://oooijcrqpuqymgzlidrw.supabase.co/rest/v1/

# Verify GitHub auth
gh auth status
```

---

*File: KEYS.md*
*Created: 2026-02-06 23:41 UTC*
*Last Updated: 2026-02-06 23:41 UTC*
*Maintained by: Frankie 🧟‍♂️*
*Access: Frankie and MASTA only*
