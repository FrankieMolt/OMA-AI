# 🔍 CODE REVIEW PROTOCOLS

## Pre-Commit Self-Review Checklist

### Code Quality
- [ ] Code follows project conventions
- [ ] Variables/functions named clearly
- [ ] No commented-out code
- [ ] No console.log statements (unless debug)
- [ ] Proper error handling
- [ ] TypeScript types defined

### Functionality
- [ ] Code solves intended problem
- [ ] Edge cases handled
- [ ] Inputs validated
- [ ] Outputs correct format
- [ ] No obvious bugs
- [ ] Logic tested mentally

### Security
- [ ] No hardcoded secrets
- [ ] User input sanitized
- [ ] SQL injection protected
- [ ] XSS protection in place
- [ ] Authentication checked
- [ ] Authorization verified
- [ ] No sensitive data in logs

### Performance
- [ ] No unnecessary loops
- [ ] Database queries optimized
- [ ] Caching where appropriate
- [ ] No memory leaks
- [ ] Efficient algorithms

### Documentation
- [ ] Complex code commented
- [ ] README updated if needed
- [ ] API documentation current
- [ ] Changelog updated

## Security Checklist

### Authentication
- [ ] Passwords hashed (bcrypt/scrypt)
- [ ] Tokens have expiration
- [ ] Session management secure
- [ ] Rate limiting implemented

### Authorization
- [ ] RLS policies on Supabase tables
- [ ] User roles checked
- [ ] Resource ownership verified
- [ ] Admin actions protected

### Data Protection
- [ ] PII encrypted if stored
- [ ] Logs don't contain secrets
- [ ] Environment variables secured
- [ ] HTTPS enforced

### API Security
- [ ] Input validation on all endpoints
- [ ] Output sanitization
- [ ] CORS configured properly
- [ ] Rate limiting on public APIs

## Performance Checklist

### Database
- [ ] Indexes on query columns
- [ ] No N+1 queries
- [ ] Query complexity acceptable
- [ ] Connection pooling used
- [ ] Read replicas for scaling

### Frontend
- [ ] Images optimized (Next.js Image)
- [ ] Code splitting implemented
- [ ] Lazy loading for heavy components
- [ ] No unnecessary re-renders
- [ ] Bundle size monitored

### Backend
- [ ] Response times <200ms (p95)
- [ ] Caching for expensive operations
- [ ] CDN for static assets
- [ ] Gzip/brotli enabled
- [ ] Monitoring configured

## Before Commit Checklist

1. **Run tests:** `npm test` (if tests exist)
2. **Build check:** `npm run build`
3. **Lint check:** `npm run lint` (if configured)
4. **Type check:** `npm run type-check` (if configured)
5. **Review staged changes:** `git diff --staged`
6. **Write clear commit message**

## Commit Message Format

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding tests
- `chore` - Maintenance tasks

### Examples
```
feat(auth): Add x402 wallet login

- Implement wallet connection flow
- Add signature verification
- Create user profile on first connect
- Add wallet API endpoint

Closes #123

fix: Correct import statement in homepage

Changed 'lucide-react' to 'lucide-react/icons'
Resolves blank screen issue on homepage
```

## Review Complexity Levels

### Simple (Self-Review Only)
- Typo fixes
- Comment updates
- Formatting changes
- Variable renames

### Moderate (Self-Review + Test)
- Small logic changes
- New helper functions
- Bug fixes
- Simple features

### Complex (Require Testing + Mental Review)
- New API routes
- Database changes
- Security updates
- Major features

### Critical (Require Manual Review)
- Breaking changes
- Database migrations
- Security fixes
- Payment processing

## When to Ask for Review

### Required
- Breaking changes
- Database schema changes
- Security fixes
- Payment logic
- Authentication/authorization

### Recommended
- Complex refactors
- Performance optimizations
- New major features
- Cross-file changes affecting >3 files

### Optional
- Simple bug fixes
- Documentation updates
- Minor features
- Code cleanup

## Code Smells to Watch For

### Performance
- 🔴 Nested loops >2 deep
- 🔴 Queries in loops
- 🔴 Large objects in memory
- 🟡 Unnecessary object creation
- 🟡 String concatenation in loops

### Security
- 🔴 eval() or similar
- 🔴 innerHTML with user input
- 🔴 SQL string concatenation
- 🔴 Hardcoded secrets
- 🔴 Missing input validation

### Maintainability
- 🔴 Functions >100 lines
- 🔴 Files >500 lines
- 🔴 Deep nesting (>4 levels)
- 🟡 Magic numbers
- 🟡 Duplicate code

## Testing Before Commit

### Unit Tests (if available)
```bash
npm test -- unit
```

### Integration Tests (if available)
```bash
npm test -- integration
```

### Manual Testing
- [ ] Feature works as expected
- [ ] Edge cases tested
- [ ] Error handling verified
- [ ] UI looks correct
- [ ] Mobile responsive

## Post-Commit Verification

1. **Verify commit:** `git log -1`
2. **Push to remote:** `git push origin main`
3. **Check CI/CD:** Watch deployment status
4. **Test in staging:** Verify changes work
5. **Monitor errors:** Check logs for issues

## Protocol Updates
Last updated: 2026-02-07
Review monthly based on code quality metrics.
