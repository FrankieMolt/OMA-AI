# code-assist

> AI-powered code assistance and generation

## Overview

Code assistance features:
- Code generation
- Bug detection
- Code review
- Documentation generation

## Installation

```bash
oma install code-assist
```

## Tools

### generate

Generate code from description.

```javascript
const code = await codeAssist.generate({
  language: 'typescript',
  description: 'function to calculate fibonacci',
  style: 'functional'
});
```

### review

Review code for issues.

```javascript
const review = await codeAssist.review({
  code: '...',
  language: 'typescript'
});
// Returns: { issues: [...], suggestions: [...] }
```

### document

Generate documentation.

```javascript
const docs = await codeAssist.document({
  code: '...',
  format: 'jsdoc'
});
```

## Pricing

- **FREE**

## Version

1.0.0
