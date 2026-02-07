# 🚀 DEPLOYMENT SAFETY PROTOCOLS

## Pre-Deployment Checklist
- [ ] Build passes (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] No TypeScript errors
- [ ] Environment variables verified
- [ ] Database migrations reviewed
- [ ] Security audit passed (if applicable)
- [ ] Critical paths tested manually
- [ ] Rollback plan documented

## Rollback Procedures
1. **Git rollback**: `git revert <commit>`
2. **Database rollback**: Have reverse migration ready
3. **Feature flags**: Use feature flags to disable buggy features
4. **Hotfix process**: Deploy patch, not full rollback if possible

## Production vs Staging Rules
- **Staging**: All changes must pass staging first
- **Production**: Only tested, reviewed code
- **Database changes**: Require manual approval
- **Breaking changes**: Require 24h notice

## Deployment Times
- **Preferred**: Low-traffic hours (UTC 02:00-06:00)
- **Forbidden**: Before major holidays/weekends
- **Emergency**: Can deploy anytime but with rollback ready

## Post-Deployment
1. Monitor error logs for 15 min
2. Verify critical endpoints
3. Check database performance
4. Alert team if issues detected
