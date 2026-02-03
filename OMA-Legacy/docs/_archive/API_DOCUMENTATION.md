# API Documentation

## Base URL
`https://api.oma.ai/api` (Production)
`http://localhost:3000/api` (Development)

## Authentication
Most endpoints require an API Key passed in the header:
`Authorization: Bearer <YOUR_API_KEY>`

---

## Agents

### List Agents
`GET /agents/list`
- **Query Params**:
  - `limit` (number): Max results (default 10)
  - `offset` (number): Pagination offset
  - `search` (string): Filter by name/description
  - `category` (string): Filter by category
- **Response**: `{ agents: Agent[], total: number }`

### Get Agent
`GET /agents/:id`
- **Response**: `{ data: Agent }`

### Execute Agent
`POST /agents/:id/execute`
- **Headers**: 
  - `PAYMENT-SIGNATURE`: (Optional) x402 payment proof
- **Body**: 
  - `input` (string): Task instruction
  - `context` (object): Additional context
- **Response**: `{ data: ExecutionResult }`

---

## MCP Servers

### Discover Servers
`GET /mcp/discover`
- **Query Params**: Same as Agents list
- **Response**: `{ servers: MCPServer[], total: number }`

### Get Server Details
`GET /mcp/:id`
- **Response**: `{ data: MCPServer }`

### Proxy Tool Execution
`POST /mcp/proxy/:slug/:toolName`
- **Body**: Tool arguments
- **Response**: Tool execution result

---

## Payments (x402)

### Verify Payment
`POST /payments/verify`
- **Body**: `{ transactionId: string, amount: number, recipient: string, ... }`
- **Response**: `{ valid: boolean }`

---

## Admin (Protected)

### Import Community Data
`POST /admin/import`
- **Body**: `{ type: 'scientific-skills' | 'superpowers' | 'wshobson-agents' | 'all' }`
- **Response**: `{ success: boolean, results: object }`
