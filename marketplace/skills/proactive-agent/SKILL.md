# proactive-agent

> Anticipates user needs and takes autonomous action before being asked.

## Installation

```bash
oma install proactive-agent
```

## Configuration

Add to your `~/.oma/config.json`:

```json
{
  "skills": {
    "proactive-agent": {
      "enabled": true,
      "anticipation_level": "high",
      "max_autonomous_actions": 10
    }
  }
}
```

## Features

- **Need Anticipation**: Predicts what the user will need next
- **Autonomous Execution**: Takes action without being prompted
- **Learning Mode**: Improves predictions based on user behavior
- **Safety Guards**: Confirms before critical actions

## Tools Provided

| Tool | Description |
|------|-------------|
| `anticipate_needs` | Analyze context to predict needs |
| `take_action` | Execute an anticipated action |
| `learn_pattern` | Learn from user behavior |
| `confirm_action` | Ask user for confirmation |

## Example Usage

```javascript
// The agent anticipates you need to check API status
await proactive.anticipateNeeds({ context: currentConversation });

// Automatically checks health if predicted
if (prediction.confidence > 0.8) {
  await proactive.takeAction({ action: 'check_api_health' });
}
```

## Pricing

- **FREE** for personal use
- **$10/month** for teams

## Version

3.1.0
