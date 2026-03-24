---
title: Security Best Practices for MCPs
description: Comprehensive guide to securing your Model Context Protocol tools against common vulnerabilities.
date:2026-03-12
author: OMA-AI Team
tags: [security, MCP, best practices, vulnerabilities]
---

## Security Best Practices for MCPs

Security isn't an afterthought—it's foundational to building trustworthy MCPs. With x402 payments handling real money, user data potentially flowing through your tools, and AI agents relying on your code, security is critical.

In this comprehensive guide, we'll cover the 24 most important security practices for MCPs, including input validation, output sanitization, payment security, and more.

## Table of Contents
1. [Input Validation](#input-validation)
2. [Output Sanitization](#output-sanitization)
3. [x402 Payment Security](#x402-payment-security)
4. [API Key Protection](#api-key-protection)
5. [Rate Limiting](#rate-limiting)
6. [SQL Injection Prevention](#sql-injection-prevention)
7. [Command Injection Prevention](#command-injection-prevention)
8. [Authentication & Authorization](#authentication-authorization)
9. [Logging & Monitoring](#logging-monitoring)
10. [Dependencies](#dependencies)
11. [Transport Security](#transport-security)
12. [Error Handling](#error-handling)
13. [Data Privacy](#data-privacy)
14. [Code Review](#code-review)
15. [Testing](#testing)
16. [Infrastructure Security](#infrastructure-security)
17. [Legal Compliance](#legal-compliance)
18. [Security Checklist](#security-checklist)

---

## Input Validation

### 1. Always Validate User Input

Never trust input from users, AI agents, or external APIs:

```typescript
import { z } from 'zod';

// Define strict input schema
const InputSchema = z.object({
  email: z.string().email().max(255),
  age: z.number().min(0).max(120).optional(),
  city: z.string().min(2).max(100).regex(/^[a-zA-Z\s-]+$/),
  limit: z.number().min(1).max(1000)
});

// Validate and sanitize
const validated = InputSchema.parse(input);
```

### 2. Use Type-Safe Validation

Use Zod or similar libraries for runtime validation:

```typescript
// Bad: No validation
export async function getWeather(input: any) {
  const city = input.city; // Could be anything!
}

// Good: Type-safe validation
export async function getWeather(input: GetWeatherInput) {
  const { city } = GetWeatherInputSchema.parse(input);
}
```

### 3. Whitelist Allowed Values

For enum-like fields, use whitelists:

```typescript
const ALLOWED_UNITS = ['metric', 'imperial'] as const;
type Unit = typeof ALLOWED_UNITS[number];

// Validate
const unit: Unit = input.unit;
if (!ALLOWED_UNITS.includes(unit)) {
  throw new Error('Invalid unit');
}
```

---

## Output Sanitization

### 4. Sanitize All Outputs

Never return raw data from external APIs:

```typescript
// Bad: Return raw response
return await fetchExternalAPI(data);

// Good: Sanitize first
const response = await fetchExternalAPI(data);
return sanitizeResponse(response);
```

### 5. Filter Sensitive Data

Never leak secrets, tokens, or personal data:

```typescript
function sanitizeResponse(data: any) {
  const filtered = { ...data };

  // Remove sensitive fields
  delete filtered.apiKey;
  delete filtered.password;
  delete filtered.creditCard;
  delete filtered.token;

  return filtered;
}
```

### 6. Validate JSON Structure

Before returning JSON, ensure it's valid:

```typescript
import { safeStringify } from 'fast-safe-stringify';

// Bad: Can throw on circular refs
return JSON.stringify(data);

// Good: Handles circular refs safely
return safeStringify(data);
```

---

## x402 Payment Security

### 7. Verify Signatures Correctly

Always verify x402 signatures on-chain:

```typescript
import { verifyTypedData } from '@wagmi/core';

async function verifyPayment(
  userAddress: string,
  amount: string,
  nonce: string,
  signature: string
): Promise<boolean> {
  // Recover signer address
  const recoveredAddress = await verifyTypedData({
    domain: DOMAIN,
    types: TYPES,
    primaryType: 'Payment',
    message: { userAddress, amount, nonce },
    signature
  });

  // Verify address matches
  return recoveredAddress.toLowerCase() === userAddress.toLowerCase();
}
```

### 8. Use Nonces Correctly

Never reuse or expose nonces:

```typescript
// Generate cryptographically random nonce
const nonce = crypto.randomBytes(32).toString('hex');

// Store securely in database
await database.insert({
  nonce,
  used: false,
  expiresAt: Date.now() + 86400000 // 24h
});

// Mark as used immediately after verification
await database.update({ nonce, used: true });

// Never return nonce to client
return { paymentIntentId }; // Not the actual nonce
```

### 9. Check Nonce Expiry

Always verify nonces aren't expired:

```typescript
const nonceData = await database.getNonce(nonce);

if (!nonceData) {
  throw new Error('Invalid nonce');
}

if (Date.now() > nonceData.expiresAt) {
  throw new Error('Nonce expired');
}

if (nonceData.used) {
  throw new Error('Nonce already used');
}
```

### 10. Implement Payment Limits

Prevent abuse with payment limits:

```typescript
// Per-user limits
const userPayments = await database.countPayments(userAddress, { timeRange: '1h' });
if (userPayments > 100) {
  throw new Error('Payment limit exceeded');
}

// Per-MCP limits
const mcpPayments = await database.countMcpPayments(mcpId, { timeRange: '1d' });
if (mcpPayments > 10000) {
  throw new Error('MCP payment limit exceeded');
}
```

---

## API Key Protection

### 11. Never Hardcode Keys

Always use environment variables:

```typescript
// Bad: Hardcoded
const API_KEY = 'sk-live-1234567890';

// Good: Environment variable
const API_KEY = process.env.MY_API_KEY;

if (!API_KEY) {
  throw new Error('API_KEY not configured');
}
```

### 12. Use Secrets Management

For production, use secrets management:

```typescript
// Development (.env.local)
MY_API_KEY=sk-live-1234567890

// Production (AWS Secrets Manager, Vercel Env, etc.)
MY_API_KEY=${{ secrets.MY_API_KEY }}
```

### 13. Log-Only Redacted Logs

Never log API keys or secrets:

```typescript
// Bad: Logs key
console.log('Using API key:', API_KEY);

// Good: Logs redacted
const REDACTED = '***REDACTED***';
console.log('Using API key:', REDACTED);

// Or just log that it's loaded
if (API_KEY) {
  console.log('API key loaded');
}
```

---

## Rate Limiting

### 14. Implement Rate Limits

Prevent abuse and control costs:

```typescript
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 100,      // Max 100 requests
  duration: 60,      // Per 60 seconds
  blockDuration: 300  // Block for 5 minutes
});

export async function checkRateLimit(userId: string) {
  const result = await rateLimiter.consume(userId);
  if (result.remainingPoints < 0) {
    throw new Error('Rate limit exceeded');
  }
}
```

### 15. Implement Token Bucket Algorithm

For smoother rate limiting:

```typescript
class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(private capacity: number, private refillRate: number) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  async tryConsume(tokens: number): Promise<boolean> {
    this.refill();

    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }
    return false;
  }

  private refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    const refillAmount = elapsed * this.refillRate;
    this.tokens = Math.min(this.capacity, this.tokens + refillAmount);
    this.lastRefill = now;
  }
}

// Usage
const bucket = new TokenBucket(1000, 10); // 1000 capacity, 10/sec refill

if (!await bucket.tryConsume(1)) {
  throw new Error('Rate limit exceeded');
}
```

---

## SQL Injection Prevention

### 16. Use Parameterized Queries

Never concatenate user input into SQL:

```typescript
// Bad: SQL injection vulnerable
const query = `SELECT * FROM users WHERE name = '${userName}'`;
await db.query(query);

// Good: Parameterized
const query = 'SELECT * FROM users WHERE name = $1';
await db.query(query, [userName]);
```

### 17. Use ORMs with Built-in Protection

Use Sequelize, TypeORM, Prisma:

```typescript
// Prisma (automatically parameterized)
const users = await prisma.user.findMany({
  where: {
    name: userName  // Safely parameterized
  }
});
```

---

## Command Injection Prevention

### 18. Use Safe Command Execution

Never concatenate user input into commands:

```typescript
// Bad: Command injection vulnerable
import { exec } from 'child_process';

exec(`curl ${url}`, (error) => {
  if (error) console.error(error);
});

// Good: Validate and sanitize
import { spawn } from 'child_process';

if (!isValidUrl(url)) {
  throw new Error('Invalid URL');
}

const child = spawn('curl', [url]);
child.on('error', (err) => console.error(err));
```

### 19. Use Allowlisted Commands

Only allow specific commands:

```typescript
const ALLOWED_COMMANDS = ['ls', 'cat', 'grep'] as const;

function executeCommand(command: string, args: string[]) {
  if (!ALLOWED_COMMANDS.includes(command)) {
    throw new Error('Command not allowed');
  }

  // Validate all arguments
  args.forEach(arg => {
    if (!isSafeArgument(arg)) {
      throw new Error('Unsafe argument');
    }
  });

  // Execute safely
  return spawn(command, args);
}
```

---

## Authentication & Authorization

### 20. Implement Authentication

Protect sensitive operations:

```typescript
// Get API key from headers
const apiKey = request.headers['x-api-key'];

// Verify against database
const user = await database.verifyApiKey(apiKey);
if (!user) {
  return { status: 401, error: 'Unauthorized' };
}

// Add user to request context
request.user = user;
```

### 21. Implement Authorization

Check permissions for resources:

```typescript
export async function deleteMCP(userId: string, mcpId: string) {
  const mcp = await database.getMCP(mcpId);

  // Check if user owns the MCP
  if (mcp.author_id !== userId) {
    throw new Error('Unauthorized');
  }

  // Proceed with deletion
  await database.deleteMCP(mcpId);
}
```

---

## Logging & Monitoring

### 22. Log All Actions

Maintain audit logs:

```typescript
export async function logAction(action: string, userId: string, metadata: any) {
  await database.insert({
    action,
    userId,
    metadata,
    timestamp: new Date(),
    ipAddress: request.ip,
    userAgent: request.headers['user-agent']
  });
}

// Usage
await logAction('MCP_CALL', userId, {
  mcpId: 'weather-mcp',
  tool: 'get_weather',
  args: { city: 'London' }
});
```

### 23. Monitor for Anomalies

Detect suspicious activity:

```typescript
// Detect unusually high usage
const recentCalls = await database.getRecentCalls(userId, { hours: 1 });
if (recentCalls.length > 1000) {
  // Potential abuse
  await notifySecurityTeam('Unusual usage detected', userId);
}

// Detect failed payments
const failedPayments = await database.getFailedPayments(userId, { hours: 1 });
if (failedPayments.length > 10) {
  // Potential fraud
  await notifySecurityTeam('Multiple failed payments', userId);
}
```

---

## Dependencies

### 24. Keep Dependencies Updated

Regularly update to patch vulnerabilities:

```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Fix vulnerabilities
npm audit fix
```

### 25. Use Dependabot or Renovate

Automate dependency updates:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

---

## Transport Security

### 26. Use HTTPS Always

Never use HTTP in production:

```typescript
// Bad: HTTP
const server = createHTTPServer(port);

// Good: HTTPS
const server = createHTTPSServer({
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('certificate.crt')
}, port);
```

### 27. Validate SSL Certificates

Ensure valid certificates:

```typescript
const httpsAgent = new https.Agent({
  rejectUnauthorized: true,  // Reject invalid certs
  cert: fs.readFileSync('ca.crt'), // Custom CA if needed
});

const response = await fetch(url, { agent: httpsAgent });
```

---

## Error Handling

### 28. Never Expose Stack Traces

Return generic error messages to users:

```typescript
// Bad: Exposes internals
try {
  return await riskyOperation();
} catch (error) {
  console.error(error);
  return { error: error.stack };  // Leaks internals!
}

// Good: Generic error
try {
  return await riskyOperation();
} catch (error) {
  console.error(error);  // Log full error for debugging
  return { error: 'An error occurred. Please try again.' };  // Generic message
}
```

### 29. Use Error Codes

Define specific error codes:

```typescript
export enum ErrorCode {
  INVALID_INPUT = 'INVALID_INPUT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  RATE_LIMITED = 'RATE_LIMITED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

export class APIError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
  }
}

// Usage
throw new APIError(ErrorCode.INVALID_INPUT, 'City name is required', 400);
```

---

## Data Privacy

### 30. Minimize Data Collection

Only collect data you need:

```typescript
// Bad: Collects everything
const userData = await database.insert({
  name,
  email,
  phone,
  address,
  ssn,  // Unnecessary!
  birthdate,  // Unnecessary!
  browserInfo,  // Unnecessary!
  location,  // Unnecessary!
  deviceFingerprint  // Unnecessary!
});

// Good: Only what's needed
const userData = await database.insert({
  email,
  name,
  createdAt: new Date()
});
```

### 31. Anonymize Logs

Remove PII from logs:

```typescript
function sanitizeForLogging(data: any): any {
  const sanitized = { ...data };

  // Remove PII
  delete sanitized.email;
  delete sanitized.name;
  delete sanitized.phoneNumber;
  delete sanitized.address;

  // Hash sensitive identifiers
  if (sanitized.userId) {
    sanitized.userId = hash(sanitized.userId);
  }

  return sanitized;
}
```

---

## Code Review

### 32. Conduct Security Reviews

Regular security audits:

**Checklist:**
- [ ] All user input validated
- [ ] All outputs sanitized
- [ ] No hardcoded secrets
- [ ] Rate limiting implemented
- [ ] Authentication/authorization implemented
- [ ] SQL injection protected
- [ ] Command injection protected
- [ ] Error handling doesn't expose internals
- [ ] Dependencies updated

---

## Testing

### 33. Write Security Tests

Test security controls:

```typescript
describe('Security Tests', () => {
  it('should reject invalid input', async () => {
    await expect(
      getMCPData({ invalid: 'input' })
    ).rejects.toThrow();
  });

  it('should sanitize output', async () => {
    const result = await getMCPData({ query: 'test' });
    expect(result).not.toHaveProperty('apiKey');
  });

  it('should enforce rate limit', async () => {
    // Make 101 requests (limit is 100)
    for (let i = 0; i < 101; i++) {
      await callAPI('user1');
    }

    // 101st request should fail
    await expect(
      callAPI('user1')
    ).rejects.toThrow('Rate limit exceeded');
  });
});
```

---

## Infrastructure Security

### 34. Use Firewall Rules

Restrict network access:

```bash
# Allow only necessary ports
ufw allow 22/tcp   # SSH
ufw allow 443/tcp  # HTTPS
ufw allow 3000/tcp # App server
ufw deny 80/tcp    # HTTP (redirect to HTTPS)
ufw enable
```

### 35. Use Secure Protocols

SSH, database, and other services:

```bash
# SSH: Key-based only
PasswordAuthentication no
PubkeyAuthentication yes

# Database: SSL/TLS
postgresql:
  ssl: on
  ssl_cert_file: '/path/to/cert.crt'
  ssl_key_file: '/path/to/private.key'
```

---

## Legal Compliance

### 36. GDPR Compliance

For EU users, implement GDPR rights:

- **Right to Access:** Provide data on request
- **Right to Rectification:** Allow data correction
- **Right to Erasure:** Delete data on request
- **Right to Portability:** Export data on request
- **Right to Object:** Allow opt-out of processing

### 37. CCPA Compliance

For California users, implement CCPA rights:

- **Right to Know:** Disclose data collected
- **Right to Delete:** Delete personal information
- **Right to Opt-Out:** Allow opt-out of sale of data

---

## Security Checklist

Before deploying your MCP to production, go through this checklist:

### Input & Output
- [ ] All user input validated
- [ ] All output sanitized
- [ ] Sensitive data filtered
- [ ] Error messages generic

### Authentication & Authorization
- [ ] API key verification implemented
- [ ] Authorization checks for all operations
- [ ] Rate limiting implemented
- [ ] Session management secure

### Payments
- [ ] x402 signatures verified
- [ ] Nonces managed correctly
- [ ] Nonce expiry checked
- [ ] Payment limits enforced

### Infrastructure
- [ ] HTTPS enforced
- [ ] SSL certificates valid
- [ ] Firewall rules configured
- [ ] Dependencies updated

### Code Quality
- [ ] No hardcoded secrets
- [ ] SQL injection protected
- [ ] Command injection protected
- [ ] Security tests passing

### Monitoring
- [ ] Audit logging implemented
- [ ] Anomaly detection configured
- [ ] Error tracking active
- [ ] Performance monitoring active

### Legal
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] GDPR rights implemented
- [ ] CCPA rights implemented

---

## Tools for Security

### Automated Scanning
- **npm audit:** Check for vulnerable dependencies
- **Snyk:** Dependency vulnerability scanner
- **OWASP ZAP:** Web application scanner
- **SonarQube:** Code quality and security

### Code Analysis
- **ESLint:** Lint JavaScript/TypeScript
- **SonarJS:** Static code analysis
- **CodeQL:** Semantic code analysis

### Penetration Testing
- **Burp Suite:** Web application testing
- **OWASP WebGoat:** Practice vulnerabilities
- **Metasploit:** Exploitation testing

---

## Common Vulnerabilities to Avoid

### 1. Injection Attacks
- SQL Injection → Use parameterized queries
- Command Injection → Use allowlisted commands
- LDAP Injection → Use safe LDAP queries

### 2. Authentication Issues
- Weak passwords → Require strong passwords
- Session fixation → Regenerate session IDs
- CSRF → Use CSRF tokens

### 3. Authorization Issues
- IDOR → Verify resource ownership
- Privilege escalation → Check all permissions
- Missing authorization → Protect all endpoints

### 4. Data Exposure
- Unencrypted data → Use TLS/SSL
- Stack traces → Return generic errors
- Sensitive logs → Redact PII

### 5. Business Logic
- Payment manipulation → Verify server-side
- Limit bypass → Validate all limits
- Race conditions → Use transactions

---

## Incident Response Plan

Prepare for security incidents:

### 1. Detection
- Set up alerts for:
  - Failed authentication
  - Unusual usage patterns
  - Payment anomalies
  - Error spikes

### 2. Containment
- Isolate affected systems
- Disable compromised accounts
- Block malicious IPs

### 3. Eradication
- Patch vulnerabilities
- Remove malicious code
- Update dependencies

### 4. Recovery
- Restore from backups
- Verify systems clean
- Monitor for recurrence

### 5. Lessons Learned
- Document incident
- Update security procedures
- Train team on lessons

---

## Next Steps

Security is an ongoing process, not a one-time task.

### Immediate (Today)
1. Review your MCP code for security issues
2. Implement input validation
3. Add output sanitization
4. Set up rate limiting

### Short Term (This Week)
5. Implement x402 signature verification
6. Add audit logging
7. Set up error tracking (Sentry)
8. Write security tests

### Medium Term (This Month)
9. Conduct security audit
10. Set up vulnerability scanning
11. Document security procedures
12. Train team on security best practices

### Long Term (Ongoing)
13. Regularly update dependencies
14. Monitor for new vulnerabilities
15. Stay informed about security trends
16. Participate in security community

---

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Common Weaknesses](https://cwe.mitre.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [OWASP ZAP](https://www.zaproxy.org/)
- [Snyk](https://snyk.io/)
- [OMA-AI Security Guidelines](/docs/security)

---

*Published: March 12, 2026*
*Updated: March 12, 2026*
*Author: OMA-AI Team*
