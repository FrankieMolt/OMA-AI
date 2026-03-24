---
title: MCP Security Checklist: Before You Publish
description: Comprehensive security checklist for MCP developers to ensure their MCPs are secure, compliant, and production-ready.
date: 2025-03-12
author: OMA-Ai Team
tags: [security, checklist, mcp, best-practices]
---

## MCP Security Checklist: Before You Publish

Security is critical for MCP developers. Before publishing to OMA-Ai, use this checklist to ensure your MCP is secure, compliant, and production-ready.

---

## 🔒 API Security

### Authentication & Authorization

- [ ] **API Keys are properly validated**
  ```typescript
  if (!process.env.API_KEY || process.env.API_KEY.length < 32) {
    throw new Error('Invalid API key');
  }
  ```

- [ ] **Rate limiting is implemented**
  ```typescript
  const rateLimit = new Map();
  const MAX_REQUESTS = 1000; // Per minute

  function checkRateLimit(userId: string): boolean {
    const userRequests = rateLimit.get(userId) || 0;
    if (userRequests >= MAX_REQUESTS) {
      throw new Error('Rate limit exceeded');
    }
    rateLimit.set(userId, userRequests + 1);
    return true;
  }
  ```

- [ ] **Access tokens are JWT-based with expiration**
  ```typescript
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  ```

- [ ] **Permissions are properly scoped**
  ```typescript
  const permissions = {
    read: ['user.profile', 'usage.stats'],
    write: ['user.settings'],
    admin: ['mcp.manage']
  };
  ```

---

## 🛡️ Input Validation

### Schema Validation

- [ ] **Input schemas use Zod or similar**
  ```typescript
  import { z } from 'zod';

  const MCPInputSchema = z.object({
    model: z.string().regex(/^(claude-3-|gpt-4)/),
    messages: z.array(z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().max(100000)
    })),
    max_tokens: z.number().min(1).max(200000)
  });
  ```

- [ ] **SQL injection prevention**
  ```typescript
  // BAD: Direct SQL construction
  const query = `SELECT * FROM users WHERE id = ${userId}`;

  // GOOD: Parameterized queries
  const query = 'SELECT * FROM users WHERE id = $1';
  const result = await db.query(query, [userId]);
  ```

- [ ] **XSS prevention**
  ```typescript
  import DOMPurify from 'dompurify';

  function sanitizeHTML(html: string): string {
    return DOMPurify.sanitize(html);
  }
  ```

- [ ] **File upload validation**
  ```typescript
  import { checkFile } from 'express-validator';

  async function validateUpload(file: File): Promise<void> {
    await checkFile(file, {
      maxSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: ['image/jpeg', 'image/png', 'application/pdf']
    });
  }
  ```

---

## 🔐 Data Protection

### Encryption

- [ ] **Environment variables are encrypted at rest**
  ```bash
  # Use secret management (AWS Secrets, HashiCorp Vault)
  export DB_PASSWORD=$(aws secretsmanager get-secret-value --secret-id prod/db-password)
  ```

- [ ] **Sensitive data is encrypted in database**
  ```typescript
  import crypto from 'crypto';

  function encrypt(text: string, key: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }
  ```

- [ ] **TLS 1.3+ is enforced**
  ```typescript
  const server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    minVersion: 'TLSv1.3'
  }, app);
  ```

### Data Minimization

- [ ] **Only necessary data is collected**
  ```typescript
  // BAD: Collect everything
  await db.insert('user_data', {
    all_data: user,
    browser_fingerprint: fingerprint,
    location: gps
  });

  // GOOD: Collect only what's needed
  await db.insert('user_data', {
    user_id: user.id,
    email: user.email
  });
  ```

- [ ] **Data retention policy is defined**
  ```typescript
  async function cleanupOldData() {
    await db.query(
      'DELETE FROM usage_logs WHERE created_at < $1',
      [new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)] // 90 days
    );
  }
  ```

---

## 📊 Logging & Monitoring

### Structured Logging

- [ ] **Logs are structured JSON**
  ```typescript
  const logger = pino({
    level: 'info',
    redact: ['password', 'token', 'apiKey'],
    formatters: {
      level: (label) => ({ level: label })
    }
  });

  logger.info({
    event: 'mcp_call',
    mcp_id: 'anthropic-claude-mcp',
    user_id: userId,
    success: true,
    duration_ms: 125
  });
  ```

- [ ] **Sensitive data is redacted**
  ```typescript
  logger.info({
    user_id: userId,
    password: '[REDACTED]',
    apiKey: '[REDACTED]'
  });
  ```

- [ ] **Error tracking is implemented**
  ```typescript
  async function trackError(error: Error, context: any) {
    await db.insert('errors', {
      message: error.message,
      stack: error.stack,
      context: JSON.stringify(context),
      user_id: context.userId,
      mcp_id: context.mcpId,
      created_at: new Date()
    });
  }
  ```

---

## 🔄 Error Handling

### Graceful Degradation

- [ ] **Circuit breaker pattern is implemented**
  ```typescript
  class CircuitBreaker {
    private failures = 0;
    private threshold = 5;
    private timeout = 60000; // 1 minute

    async execute<T>(fn: () => Promise<T>): Promise<T> {
      if (this.failures >= this.threshold) {
        throw new Error('Circuit breaker is open');
      }

      try {
        const result = await Promise.race([
          fn(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), this.timeout)
          )
        ]);

        this.failures = 0;
        return result as T;
      } catch (error) {
        this.failures++;
        throw error;
      }
    }
  }
  ```

- [ ] **Retry logic is implemented**
  ```typescript
  async function retry<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    delayMs = 1000
  ): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(r => setTimeout(r, delayMs * (i + 1)));
      }
    }
    throw new Error('Max retries exceeded');
  }
  ```

- [ ] **Error responses are consistent**
  ```typescript
  interface ErrorResponse {
    success: false;
    error: string;
    code: number;
    timestamp: number;
    request_id: string;
  }

  function errorResponse(message: string, code: number): ErrorResponse {
    return {
      success: false,
      error: message,
      code,
      timestamp: Date.now(),
      request_id: generateRequestId()
    };
  }
  ```

---

## 🚀 Performance

### Caching

- [ ] **Redis caching is implemented**
  ```typescript
  const redis = new Redis();

  async function getCachedOrFetch<T>(
    key: string,
    fn: () => Promise<T>,
    ttl: number = 300
  ): Promise<T> {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);

    const data = await fn();
    await redis.setex(key, ttl, JSON.stringify(data));
    return data;
  }
  ```

- [ ] **Cache invalidation is proper**
  ```typescript
  async function invalidateUserCache(userId: string) {
    await redis.del([
      `user:${userId}`,
      `user:${userId}:settings`,
      `user:${userId}:usage`
    ]);
  }
  ```

### Query Optimization

- [ ] **Database indexes are created**
  ```sql
  CREATE INDEX idx_mcp_id ON usage_logs(mcp_id);
  CREATE INDEX idx_user_id ON usage_logs(user_id);
  CREATE INDEX idx_created_at ON usage_logs(created_at);
  ```

- [ ] **N+1 queries are avoided**
  ```typescript
  // BAD: N+1 query
  for (const order of orders) {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [order.user_id]);
    orders.push({ ...order, user });
  }

  // GOOD: Single query with JOIN
  const orders = await db.query(`
    SELECT o.*, u.name as user_name
    FROM orders o
    JOIN users u ON o.user_id = u.id
    WHERE o.status = 'active'
  `);
  ```

---

## 🧪 Testing

### Unit Tests

- [ ] **All tools have unit tests**
  ```typescript
  describe('MCP Tool: message', () => {
    it('should validate input', () => {
      expect(() => validateInput({})).toThrow();
    });

    it('should call API successfully', async () => {
      const result = await callTool({
        model: 'claude-3-opus-20240229',
        messages: [{ role: 'user', content: 'Hello!' }]
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should handle errors gracefully', async () => {
      const result = await callTool({
        model: 'invalid-model',
        messages: []
      });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
  ```

### Integration Tests

- [ ] **API endpoints have integration tests**
  ```typescript
  describe('POST /api/mcp/call', () => {
    it('should authenticate valid API keys', async () => {
      const response = await request(app)
        .post('/api/mcp/call')
        .set('Authorization', `Bearer ${VALID_API_KEY}`)
        .send({ mcp_id: 'test', parameters: {} });

      expect(response.status).toBe(200);
    });

    it('should reject invalid API keys', async () => {
      const response = await request(app)
        .post('/api/mcp/call')
        .set('Authorization', `Bearer ${INVALID_API_KEY}`)
        .send({ mcp_id: 'test', parameters: {} });

      expect(response.status).toBe(401);
    });
  });
  ```

### Security Tests

- [ ] **SQL injection is tested**
  ```typescript
  it('should prevent SQL injection', async () => {
    const maliciousInput = "'; DROP TABLE users; --";
    const response = await callTool({ id: maliciousInput });

    expect(response.error).toBeDefined();
  });
  ```

- [ ] **XSS is tested**
  ```typescript
  it('should prevent XSS attacks', async () => {
    const xssPayload = '<script>alert("XSS")</script>';
    const response = await callTool({ content: xssPayload });

    expect(response.data).not.toContain('<script>');
  });
  ```

---

## 📋 Documentation

### API Documentation

- [ ] **All endpoints are documented**
- [ ] **Request/response formats are specified**
- [ ] **Error codes are documented**
- [ ] **Code examples are provided**
- [ ] **Authentication is explained**
- [ ] **Rate limits are specified**

### Quick Start Guide

- [ ] **Installation instructions are clear**
- [ ] **First-time setup is guided**
- [ ] **Common errors are explained**
- [ ] **Troubleshooting is comprehensive**
- [ ] **Example usage is provided**

---

## 🔐 Compliance

### GDPR

- [ ] **Privacy policy is published**
- [ ] **Data deletion endpoint exists**
  ```typescript
  app.delete('/api/user/data', async (req, res) => {
    await db.query('DELETE FROM users WHERE id = $1', [req.userId]);
    await db.query('DELETE FROM usage_logs WHERE user_id = $1', [req.userId]);
    res.json({ success: true });
  });
  ```

- [ ] **Cookie consent is implemented**
- [ ] **User consent is tracked**

### PCI DSS

- [ ] **No raw card data is stored**
- [ ] **PCI-compliant payment processor is used**
- [ ] **SSL/TLS is enforced**

---

## 📊 Monitoring & Alerts

### Metrics to Track

- [ ] **Response times (P50, P95, P99)**
- [ ] **Error rates (4xx, 5xx)**
- [ ] **Request volumes**
- [ ] **User growth**
- [ ] **Revenue metrics**

### Alerts

- [ ] **Alert on high error rate** (>5%)
- [ ] **Alert on slow response time** (>500ms P95)
- [ ] **Alert on database connection issues**
- [ ] **Alert on security events** (rate limit breaches)

```typescript
function alertOnHighErrorRate() {
  const errorRate = calculateErrorRate();
  if (errorRate > 0.05) { // 5%
    sendAlert({
      severity: 'high',
      message: `Error rate is ${errorRate}%`,
      channel: ['pagerduty', 'slack']
    });
  }
}
```

---

## 🎯 Pre-Publish Checklist

### Before Publishing to OMA-Ai:

**Security:**
- [ ] API keys are stored securely
- [ ] Rate limiting is implemented
- [ ] Input validation is comprehensive
- [ ] Error handling is graceful
- [ ] SQL injection is prevented
- [ ] XSS is prevented
- [ ] TLS 1.3+ is enforced
- [ ] Sensitive data is encrypted
- [ ] Logs don't contain sensitive data

**Performance:**
- [ ] Caching is implemented
- [ ] Database indexes are optimized
- [ ] N+1 queries are eliminated
- [ ] Response times are <200ms

**Testing:**
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Security tests pass
- [ ] Load tests pass (1000+ concurrent users)

**Documentation:**
- [ ] API documentation is complete
- [ ] Quick start guide exists
- [ ] Examples are provided
- [ ] Error codes are documented

**Compliance:**
- [ ] Privacy policy is published
- [ ] Data deletion is possible
- [ ] Cookie consent is implemented
- [ ] PCI DSS compliance is met

**Support:**
- [ ] Support channel is set up
- [ ] Bug reporting is defined
- [ ] Response SLA is set
- [ ] Escalation path is defined

---

## 🚀 After Publishing

### Day 1-7

- [ ] Monitor error rates
- [ ] Check response times
- [ ] Respond to user feedback
- [ ] Fix critical bugs

### Week 1-4

- [ ] Analyze usage patterns
- [ ] Optimize slow endpoints
- [ ] Add requested features
- [ ] Update documentation

### Month 1-3

- [ ] Scale infrastructure
- [ ] Improve security
- [ ] Add premium features
- [ ] Launch marketing campaigns

---

## Resources

- **OMA-Ai Security:** /docs/security
- **OWASP Top 10:** https://owasp.org/www-project-top-ten
- **PCI DSS:** https://www.pcisecuritystandards.org
- **GDPR:** https://gdpr.eu
- **Security Best Practices:** https://www.oma-ai.com/blog/security-best-practices-for-mcps

---

## Conclusion

Use this checklist before publishing your MCP to ensure it's secure, performant, and production-ready. Security is an ongoing process—review and update regularly.

**Happy secure MCP development!** 🔒

---

*Published: March 12, 2025*
*Updated: March 12, 2025*
*Author: OMA-AI Team*
