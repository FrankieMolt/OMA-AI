# proactive-agent

> Anticipates user needs and takes autonomous action before being asked.

## Install

```bash
oma install proactive-agent
```

## Version
3.1.0

## Description

The proactive-agent skill enables AI systems to anticipate user needs and take action autonomously. It uses the WAL (Write-Ahead Logging) protocol for tracking decisions and a Working Buffer to survive context truncation.

## Features

- **WAL Protocol**: Write-Ahead Logging for corrections and decisions
- **Working Buffer**: Survive context truncation
- **Compaction Recovery**: Step-by-step recovery after context loss
- **Security Hardening**: Skill vetting and context leakage prevention
- **Relentless Resourcefulness**: Try 10 approaches before asking

## Usage

```javascript
import { proactiveAgent } from '@oma/proactive-agent';

// Initialize
const agent = proactiveAgent({
  memory: true,
  autonomy: 'high'
});

// The agent will anticipate needs
agent.start();
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `memory` | boolean | true | Enable persistent memory |
| `autonomy` | string | 'medium' | Autonomy level (low/medium/high) |
| `maxRetries` | number | 10 | Max retry attempts |

## Price

FREE

## Links

- [GitHub](https://github.com/openmarketaccess/proactive-agent)
- [Documentation](https://docs.openmarketaccess.io/skills/proactive-agent)
