# @modelcontextprotocol/server-postgres

> PostgreSQL database connector for MCP.

## Installation

```bash
npx @modelcontextprotocol/server-postgres "postgresql://user:pass@localhost/db"
```

## Configuration

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-postgres",
        "postgresql://localhost/mydb"
      ]
    }
  }
}
```

## Tools Provided

| Tool | Description |
|------|-------------|
| `query` | Execute SQL query |
| `list_tables` | List all tables |
| `describe_table` | Get table schema |
| `insert` | Insert rows |
| `update` | Update rows |

## Version

1.0.0
