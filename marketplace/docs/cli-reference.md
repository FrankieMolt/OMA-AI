# CLI Reference

## Installation

```bash
npm install -g @openmarketaccess/cli
```

## Commands

### oma install

Install a skill or MCP server.

```bash
oma install proactive-agent
oma install @modelcontextprotocol/server-filesystem
```

### oma add

Add an MCP server to Claude Desktop.

```bash
oma add @modelcontextprotocol/server-github
```

### oma connect

Connect an API.

```bash
oma connect frankie-api --key YOUR_KEY
```

### oma list

List installed skills and servers.

```bash
oma list
oma list --servers
oma list --skills
```

### oma remove

Remove a skill or server.

```bash
oma remove proactive-agent
```

### oma update

Update all skills and servers.

```bash
oma update
oma update proactive-agent
```

### oma publish

Publish your own skill or server.

```bash
oma publish ./my-skill
```

## Configuration

Config file: `~/.oma/config.json`

```json
{
  "skills": {
    "proactive-agent": {
      "enabled": true
    }
  },
  "apis": {
    "frankie-api": {
      "key": "xxx"
    }
  }
}
```
