# @modelcontextprotocol/server-filesystem

> File system operations for MCP. Read, write, and manage files.

## Installation

```bash
npx @modelcontextprotocol/server-filesystem /path/to/allowed/directory
```

## Claude Desktop Config

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "/Users/you/projects"
      ]
    }
  }
}
```

## Tools Provided

| Tool | Description |
|------|-------------|
| `read_file` | Read file contents |
| `write_file` | Write to file |
| `list_directory` | List directory contents |
| `create_directory` | Create new directory |
| `delete_file` | Delete a file |
| `move_file` | Move/rename file |
| `search_files` | Search for files |

## Security

- Only operates within allowed directories
- Cannot access files outside sandbox
- Validates all paths

## Version

1.0.0
