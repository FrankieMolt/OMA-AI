# automation

> Task automation and workflow orchestration

## Overview

Automation capabilities:
- Schedule tasks
- Chain operations
- Monitor execution
- Handle failures

## Installation

```bash
oma install automation
```

## Tools

### schedule

Schedule recurring tasks.

```javascript
await automation.schedule({
  task: 'check-prices',
  cron: '0 * * * *', // hourly
  action: 'notify-if-change'
});
```

### chain

Chain multiple operations.

```javascript
await automation.chain({
  steps: [
    { action: 'fetch', url: '...' },
    { action: 'parse', selector: '.price' },
    { action: 'notify', channel: 'slack' }
  ]
});
```

### monitor

Monitor task execution.

```javascript
const status = await automation.monitor({
  taskId: 'abc123'
});
```

## Pricing

- **FREE** (basic)
- **Pro:** $4.99/month (advanced scheduling)

## Version

1.0.0
