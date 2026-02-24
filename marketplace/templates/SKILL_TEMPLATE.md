# {skill-name}

> {one-line description of what the skill does}

## Overview

{2-3 paragraphs explaining the skill in detail, what problems it solves, and why someone would use it}

## Installation

```bash
oma install {skill-name}
```

## Requirements

List any prerequisites:
- API keys needed
- Environment variables
- Dependencies

## Configuration

Add to your `~/.oma/config.json`:

```json
{
  "skills": {
    "{skill-name}": {
      "enabled": true,
      "api_key": "YOUR_API_KEY",
      "option": "value"
    }
  }
}
```

## Tools Provided

| Tool | Description | Parameters |
|------|-------------|------------|
| `tool_name` | What it does | `param1`, `param2` |

### Tool Details

#### `tool_name`

Description of what this tool does.

**Parameters:**
- `param1` (string, required): Description
- `param2` (number, optional): Description, default: 0

**Returns:**
```json
{
  "result": "description"
}
```

**Example:**
```javascript
const result = await skill.toolName({
  param1: "value"
});
```

## Usage Examples

### Basic Usage

```javascript
// Example 1: Basic usage
const result = await skill.doSomething();
console.log(result);
```

### Advanced Usage

```javascript
// Example 2: With options
const result = await skill.doSomething({
  option: "value",
  timeout: 5000
});
```

## Error Handling

```javascript
try {
  const result = await skill.doSomething();
} catch (error) {
  if (error.code === 'RATE_LIMIT') {
    // Handle rate limit
  }
}
```

## Rate Limits

| Tier | Requests/min | Requests/day |
|------|--------------|--------------|
| Free | 10 | 100 |
| Pro | 100 | 10,000 |

## Pricing

- **Free Tier**: X requests/month
- **Pro**: $X/month
- **Pay-per-use**: $X/request

## Changelog

### v1.0.0 (2026-02-24)
- Initial release

## Support

- GitHub Issues: [link]
- Discord: [link]
- Email: support@openmarketaccess.io

## License

MIT

---

*Published by: [Your Name]*
*Version: 1.0.0*
