# ⚠️ ERROR HANDLING PROTOCOLS

## Error Classification

### 🔴 CRITICAL (Stop Everything)
- Database connection lost
- Security breach detected
- Production site down
- Payment processing failure
- Data corruption detected

**Action:**
1. Stop all automated processes
2. Alert MASTA immediately
3. Preserve logs/evidence
4. Do NOT attempt auto-recovery

### 🟡 WARNING (Monitor & Investigate)
- API rate limit approaching
- High error rate (>10%)
- Slow query detected
- Memory usage high (>80%)
- Unusual traffic patterns

**Action:**
1. Log error details
2. Monitor for escalation
3. Prepare rollback if needed
4. Alert MASTA if persists >10 min

### 🟢 INFO (Log & Continue)
- Non-critical API failures
- Feature flag disabled
- Cached data expired
- Minor UI issues

**Action:**
1. Log for analytics
2. Continue normal operation
3. Review in weekly audit

## Recovery Strategies

### Database Errors
1. Check connection pool
2. Verify query syntax
3. Check RLS policies
4. Fallback to demo mode if critical

### API Errors
1. Verify endpoints exist
2. Check authentication
3. Validate response format
4. Implement retry with exponential backoff

### Build Errors
1. Clear Next.js cache: `rm -rf .next`
2. Verify dependencies: `npm ci`
3. Check TypeScript types
4. Review recent changes

## Escalation Rules
- **Immediately**: Security breaches, data loss
- **Within 5 min**: Site down, payments failing
- **Within 15 min**: High error rates, degraded performance
- **Within 1 hour**: Non-critical issues

## When to Ask MASTA
- Any 🔴 critical error
- Same error occurs 3+ times
- Unsure of recovery strategy
- Breaking change needed
- Database migration required
