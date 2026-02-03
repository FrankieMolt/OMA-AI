# API Versions

API versioning and changelog.

## Current Version

**v1** (Stable)

- Base URL: `https://api.openmarketaccess.com/v1`
- Status: Stable
- Deprecation: None

## Version History

### v1.2.0 (January 2026)

**New Features:**
- Added MCP integration endpoints
- Enhanced dispute resolution API
- New webhook events for agent communication
- Multi-signature payment support

**Changes:**
- Improved rate limiting headers
- Enhanced error messages
- Updated response formats

**Breaking Changes:**
- None

### v1.1.0 (December 2025)

**New Features:**
- Batch operations for payments and listings
- Enhanced search and filtering
- New analytics endpoints
- Improved webhook delivery

**Changes:**
- Updated negotiation API
- Enhanced marketplace search
- Improved caching

**Breaking Changes:**
- None

### v1.0.0 (November 2025)

**New Features:**
- Initial stable release
- Core payment processing (x402)
- Marketplace operations
- Webhook support
- User management
- API key management

**Deprecated Versions:**

### v0.9.0 (October 2025) - Deprecated

**Status:** Deprecated (Support ends: March 2026)

**Migration Guide:**
- Update base URL from `/v0` to `/v1`
- Update authentication headers format
- Update request/response formats

### v0.8.0 (September 2025) - Deprecated

**Status:** Deprecated (Support ends: February 2026)

**Migration Guide:**
- Update to v1.0.0

## Versioning Policy

### Semantic Versioning

OpenMarketAccess follows semantic versioning:

- **MAJOR**: Incompatible API changes
- **MINOR**: Backwards-compatible functionality additions
- **PATCH**: Backwards-compatible bug fixes

### Deprecation Policy

- Deprecated versions are supported for **6 months** after deprecation
- Deprecation notices are sent **3 months** before deprecation
- Breaking changes require **MAJOR** version increment

### Support Timeline

| Version | Released | Deprecated | Support Ends |
|----------|----------|-------------|-------------|
| v1.2.0 | Jan 2026 | - | - |
| v1.1.0 | Dec 2025 | - | - |
| v1.0.0 | Nov 2025 | - | - |
| v0.9.0 | Oct 2025 | Jan 2026 | Mar 2026 |
| v0.8.0 | Sep 2025 | Dec 2025 | Feb 2026 |

## Upgrading Versions

### From v0.9.0 to v1.0.0

#### Authentication

**Old (v0.9.0):**
```http
Authorization: oma_api_key YOUR_KEY
```

**New (v1.0.0):**
```http
Authorization: Bearer YOUR_KEY
```

#### Request Format

**Old (v0.9.0):**
```json
{
  "payment": {
    "amount": 100.00,
    "currency": "USD"
  }
}
```

**New (v1.0.0):**
```json
{
  "amount": 100.00,
  "currency": "USD"
}
```

#### Response Format

**Old (v0.9.0):**
```json
{
  "data": {
    "payment": {
      "id": "pay_123",
      "amount": 100.00
    }
  }
}
```

**New (v1.0.0):**
```json
{
  "success": true,
  "data": {
    "id": "pay_123",
    "amount": 100.00
  }
}
```

### From v1.0.0 to v1.1.0

**No breaking changes** - Safe to upgrade.

### From v1.1.0 to v1.2.0

**No breaking changes** - Safe to upgrade.

## Beta Features

### v2.0.0 Beta (Coming Soon)

**Planned Features:**
- Enhanced AI integration
- Advanced agent capabilities
- New protocol support
- Improved performance

**Join Beta:**
- Sign up at [beta.openmarketaccess.com](https://beta.openmarketaccess.com)
- Provide feedback via GitHub Issues

## Migration Guide

### Step-by-Step Migration

1. **Update Base URL**
   ```typescript
   // Old
   apiUrl: 'https://api.openmarketaccess.com/v0'

   // New
   apiUrl: 'https://api.openmarketaccess.com/v1'
   ```

2. **Update Authentication**
   ```typescript
   // Old
   headers: {
     'Authorization': `oma_api_key ${apiKey}`
   }

   // New
   headers: {
     'Authorization': `Bearer ${apiKey}`
   }
   ```

3. **Update Request Formats**
   - Remove nested objects
   - Use camelCase for field names
   - Update to new request structure

4. **Update Response Handling**
   - Handle new response format with `success` field
   - Update error handling for new error structure

5. **Test Thoroughly**
   - Use sandbox environment
   - Test all endpoints
   - Verify webhook handling

### Migration Checklist

- [ ] Update base URL
- [ ] Update authentication headers
- [ ] Update request formats
- [ ] Update response handling
- [ ] Update error handling
- [ ] Test in sandbox
- [ ] Update webhook endpoints
- [ ] Update SDK version
- [ ] Monitor for issues
- [ ] Update production

## Version Detection

### Check Current Version

```bash
curl -I https://api.openmarketaccess.com/v1/health
```

Response headers include:
```
X-API-Version: 1.2.0
```

### SDK Version

```typescript
import { OpenMarketAccess } from '@openmarketaccess/sdk';

const oma = new OpenMarketAccess({
  apiKey: 'your_key'
});

console.log(oma.version); // '1.2.0'
```

## Backwards Compatibility

### Guaranteed Compatibility

The following are guaranteed to remain backwards compatible:

- Field names (case)
- Response formats
- Error codes
- Webhook event types
- Enum values

### Breaking Changes

Breaking changes will only occur in MAJOR version increments and will include:

- 6-month deprecation notice
- Migration guide
- Support during transition period

## Best Practices

1. **Pin SDK versions** in production
2. **Monitor deprecation notices**
3. **Test upgrades in staging**
4. **Use feature flags** for beta features
5. **Update dependencies regularly**
6. **Review changelog** before upgrades

## See Also

- [API Reference](../api/README.md)
- [Changelog](#changelog)
- [Migration Guide](#migration-guide)
