# Getting Help

Resources and support channels for OpenMarketAccess.

## Self-Service Resources

### Documentation

- **Main Documentation** - [docs.openmarketaccess.com](https://docs.openmarketaccess.com)
- **API Reference** - [api.openmarketaccess.com/docs](https://api.openmarketaccess.com/docs)
- **SDK Documentation** - Available in `/docs/sdk/` directory
- **Protocol Specifications** - Available in `/docs/protocols/` directory

### Search

Use the search functionality in the documentation to find relevant information:

```
Search terms: "x402 payment", "webhook signature", "rate limit"
```

### Code Examples

Browse the `/docs/sdk/examples.md` file for common usage patterns.

## Community Support

### Discord Server

Join our [Discord Community](https://discord.gg/openmarketaccess) for:
- Real-time help from other developers
- Discussion of best practices
- Announcements and updates
- Community contributions

**Channels:**
- `#help` - Get help from community
- `#announcements` - Important announcements
- `#showcase` - Share your projects
- `#general` - General discussion

### GitHub Discussions

Participate in [GitHub Discussions](https://github.com/openmarketaccess/discussions):
- Ask questions
- Share ideas
- Report bugs
- Request features

### Stack Overflow

Search and ask questions tagged with `openmarketaccess` on Stack Overflow:
- [Stack Overflow Tag](https://stackoverflow.com/questions/tagged/openmarketaccess)

## Paid Support

### Support Plans

| Plan | Response Time | Features |
|------|---------------|-----------|
| Community | Best effort | Free, community support |
| Standard | 24 hours | Email support |
| Professional | 4 hours | Priority email, chat |
| Enterprise | 1 hour | 24/7 phone, dedicated support |

### Contact Support

**Email:**
- General: support@openmarketaccess.com
- Technical: technical@openmarketaccess.com
- Billing: billing@openmarketaccess.com

**Phone (Enterprise only):**
- US: +1 (555) 123-4567
- EU: +44 20 1234 5678

## Reporting Issues

### Bug Reports

When reporting bugs, include:

1. **Environment Information:**
   ```bash
   node --version
   npm list @openmarketaccess/sdk
   ```

2. **Error Details:**
   - Request ID
   - Error code and message
   - Timestamp
   - Stack trace

3. **Reproduction Steps:**
   ```typescript
   // Minimal reproduction
   const oma = new OpenMarketAccess({ apiKey: 'your_key' });
   await oma.payments.get('pay_123456');
   ```

4. **Expected vs Actual Behavior:**
   - Expected: Payment details returned
   - Actual: 404 Not Found

### Feature Requests

When requesting features, include:

1. **Use Case:**
   - Problem you're trying to solve
   - Current workarounds
   - Impact on your application

2. **Proposed Solution:**
   - Detailed description
   - Mockups or examples
   - Benefits

3. **Alternatives Considered:**
   - Other solutions you've tried
   - Why they don't work

## Professional Services

### Consulting

OpenMarketAccess offers professional consulting services:
- Architecture reviews
- Performance optimization
- Security audits
- Custom integrations

**Contact:** consulting@openmarketaccess.com

### Training

Available training options:
- Online workshops
- On-site training
- Custom curriculum
- Certification programs

**Contact:** training@openmarketaccess.com

## Status Updates

### API Status

Check the [Status Page](https://status.openmarketaccess.com) for:
- Real-time API status
- Incident history
- Maintenance schedules
- Performance metrics

### Subscribe to Updates

Get notified of incidents and maintenance:
- [RSS Feed](https://status.openmarketaccess.com/history.rss)
- [Email Notifications](https://status.openmarketaccess.com/subscribe)
- [Twitter](https://twitter.com/openmarketaccess)

## Feedback

### Product Feedback

Share your thoughts on OpenMarketAccess:
- [Feedback Form](https://openmarketaccess.com/feedback)
- Email: feedback@openmarketaccess.com
- Discord: `#feedback` channel

### Documentation Feedback

Report documentation issues:
- GitHub Issues: [openmarketaccess/docs](https://github.com/openmarketaccess/docs/issues)
- Email: docs@openmarketaccess.com

## Resources for Different Roles

### For Developers

- [Getting Started Guide](../guides/getting-started.md)
- [API Reference](../api/README.md)
- [SDK Documentation](../sdk/README.md)
- [SDK Examples](../sdk/examples.md)

### For Architects

- [x402 Protocol](../protocols/x402.md)
- [MCP Protocol](../protocols/mcp.md)
- [A2A Protocol](../protocols/a2a.md)
- [Architecture Guide](../reference/database-schema.md)

### For DevOps

- [Docker Deployment](../deployment/docker.md)
- [Kubernetes Deployment](../deployment/kubernetes.md)
- [Environment Variables](../deployment/env-vars.md)
- [Scaling Guide](../deployment/scaling.md)

### For Support Teams

- [Troubleshooting Guide](common-issues.md)
- [Error Codes](../reference/error-codes.md)
- [API Errors](api-errors.md)
- [Getting Help](getting-help.md)

## Best Practices for Getting Help

### Before Asking

1. **Search existing resources**
   - Documentation
   - GitHub Issues
   - Stack Overflow
   - Discord history

2. **Prepare your question**
   - Be specific about the problem
   - Include relevant code snippets
   - Describe what you've tried
   - Mention expected vs actual behavior

3. **Gather information**
   - Environment details
   - Error messages
   - Request IDs
   - Stack traces

### When Asking

1. **Use descriptive titles**
   - Good: "Payment creation fails with INVALID_AMOUNT error"
   - Bad: "Payment not working"

2. **Include code snippets**
   - Minimal, reproducible examples
   - Remove sensitive data
   - Use code blocks

3. **Provide context**
   - What you're trying to achieve
   - What you've already tried
   - Your environment details

### After Getting Help

1. **Follow up on solutions**
   - Confirm if the solution worked
   - Share what fixed the issue
   - Help others with similar problems

2. **Contribute back**
   - Improve documentation
   - Submit pull requests
   - Share your solutions

## Escalation Path

1. **Self-Service** - Check documentation and community resources
2. **Community** - Ask in Discord or GitHub Discussions
3. **Paid Support** - Contact support (for paid plans)
4. **Escalation** - Request escalation if issue is critical

For critical issues affecting production:
- Mark as urgent in support ticket
- Include "CRITICAL" in subject line
- Call phone support (Enterprise only)

## Additional Resources

### Blog

Read the [OpenMarketAccess Blog](https://blog.openmarketaccess.com) for:
- Tutorials and guides
- Feature announcements
- Best practices
- Case studies

### Newsletter

Subscribe to the newsletter for:
- Monthly updates
- New features
- Tips and tricks
- Community highlights

### Social Media

Follow us on social media:
- Twitter: [@openmarketaccess](https://twitter.com/openmarketaccess)
- LinkedIn: [OpenMarketAccess](https://linkedin.com/company/openmarketaccess)
- YouTube: [OpenMarketAccess Channel](https://youtube.com/openmarketaccess)

## Quick Reference

| Need | Go To |
|------|--------|
| Quick start | [Getting Started Guide](../guides/getting-started.md) |
| API help | [API Reference](../api/README.md) |
| Payment issues | [Payment Guide](../guides/payments.md) |
| Deployment help | [Deployment Guides](../deployment/docker.md) |
| Error codes | [Error Codes](../reference/error-codes.md) |
| Community help | [Discord](https://discord.gg/openmarketaccess) |
| Support ticket | support@openmarketaccess.com |
| Status check | [Status Page](https://status.openmarketaccess.com) |

## See Also

- [Common Issues](common-issues.md)
- [Performance Issues](performance.md)
- [API Errors](api-errors.md)
- [Deployment Issues](deployment.md)
