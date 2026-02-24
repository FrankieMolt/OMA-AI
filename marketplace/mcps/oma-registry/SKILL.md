# @oma/server-registry

> MCP server for OMA marketplace registry operations

## Overview

Browse and search the OMA marketplace registry:
- List available servers
- Search skills
- Get package info
- Install packages

## Installation

```bash
npx @oma/server-registry
```

## Claude Desktop Configuration

```json
{
  "mcpServers": {
    "oma-registry": {
      "command": "npx",
      "args": ["@oma/server-registry"]
    }
  }
}
```

## Tools

### search_servers

Search for MCP servers.

```
Search for "database" servers in the marketplace
```

### search_skills

Search for skills.

```
Search for "trading" skills
```

### get_package

Get package details.

```
Get details for proactive-agent skill
```

### install

Install a package.

```
Install the polymarket skill
```

## Resources

- `oma://servers` - List all servers
- `oma://skills` - List all skills
- `oma://package/{id}` - Package details

## Version

1.0.0
