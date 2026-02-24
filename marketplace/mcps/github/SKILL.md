# @modelcontextprotocol/server-github

> GitHub API integration for MCP.

## Installation

```bash
npx @modelcontextprotocol/server-github
```

## Configuration

Set environment variable:
```bash
export GITHUB_TOKEN=ghp_xxxx
```

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxx"
      }
    }
  }
}
```

## Tools Provided

| Tool | Description |
|------|-------------|
| `search_repositories` | Search GitHub repos |
| `get_repository` | Get repo details |
| `list_issues` | List issues |
| `create_issue` | Create new issue |
| `create_pull_request` | Create PR |
| `get_file_contents` | Read file from repo |

## Version

1.0.0
