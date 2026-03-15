# AI Agent Builder for OMA-AI

**Generated:** 2026-03-12 08:20 UTC
**Purpose:** Define AI agent builder requirements and implementation plan

---

## VISION: Visual AI Agent Builder

### Core Concept
OMA-AI should enable users to visually build AI agents using MCPs (Model Context Protocol tools). Similar to Smithery.ai but with OMA-AI's advantages:
- x402 gasless payments
- Multi-chain support (Base + Solana)
- Better 5% platform fee
- More MCP options (50+ target)

### User Journey
1. **Discover MCPs** → Browse marketplace, find tools
2. **Build Agent** → Visual drag-and-drop agent builder
3. **Configure** → Set prompts, workflows, triggers
4. **Test** → Real-time agent testing environment
5. **Deploy** → Deploy to production with one click
6. **Monetize** → Earn 95% of revenue when others use your agent

---

## MVP FEATURES (Phase 1)

### 1. Agent Dashboard
- List of user's agents
- Status (active, inactive, testing)
- Metrics (calls, revenue, success rate)
- Quick actions (edit, test, deploy, share)

### 2. Visual Builder
- **MCP Selection:** Drag MCPs from sidebar to canvas
- **Tool Configuration:** Configure each tool with params
- **Prompt Editor:** Write agent system prompt and instructions
- **Workflow Design:** Connect MCPs in sequence
- **Variables:** Define dynamic variables for agent

### 3. Test Environment
- **Chat Interface:** Test agent in real-time
- **Tool Calls:** See which MCPs are called
- **Debug Logs:** View execution logs
- **Performance:** Measure response times

### 4. Deployment
- **One-Click Deploy:** Deploy agent with single click
- **Versioning:** Save multiple versions
- **Rollback:** Revert to previous versions
- **Webhook URLs:** Set up event notifications

---

## TECHNICAL ARCHITECTURE

### Database Schema

```sql
-- Agents table
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  prompt TEXT NOT NULL,
  config JSONB NOT NULL, -- MCP connections, workflow, variables
  version INTEGER DEFAULT 1,
  status VARCHAR(50) DEFAULT 'draft', -- draft, testing, active, inactive
  pricing NUMERIC DEFAULT 0, -- per call in USDC
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent executions (analytics)
CREATE TABLE agent_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id),
  user_id UUID REFERENCES auth.users(id),
  status VARCHAR(50), -- success, error, timeout
  duration_ms INTEGER,
  mcp_calls JSONB, -- Which MCPs were called
  cost NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent versions
CREATE TABLE agent_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agents(id),
  version INTEGER NOT NULL,
  config JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agent MCP connections (many-to-many)
CREATE TABLE agent_mcps (
  agent_id UUID REFERENCES agents(id),
  mcp_id UUID REFERENCES mcps(id),
  configuration JSONB, -- Tool-specific config
  PRIMARY KEY (agent_id, mcp_id)
);
```

### API Routes

```
POST   /api/agents              -- Create new agent
GET    /api/agents              -- List user's agents
GET    /api/agents/[slug]       -- Get agent details
PUT    /api/agents/[id]         -- Update agent
DELETE  /api/agents/[id]         -- Delete agent

POST   /api/agents/[id]/test    -- Test agent execution
POST   /api/agents/[id]/deploy  -- Deploy agent to production
POST   /api/agents/[id]/version -- Create new version

GET    /api/agents/[id]/executions  -- Execution analytics
GET    /api/agents/[id]/versions    -- Version history

POST   /api/agents/[id]/execute     -- Execute agent (public endpoint)
```

### Frontend Pages

```
/build                    -- Visual agent builder dashboard
/build/[id]              -- Edit existing agent
/agents                   -- List of marketplace agents
/agents/[slug]            -- Agent detail page
/agents/[slug]/chat        -- Agent chat interface
/my-agents                -- User's agents dashboard
```

---

## AGENT RUNTIME (How Agents Work)

### Execution Flow

1. **User sends request** → POST /api/agents/[slug]/execute
2. **Load agent config** → Fetch from database
3. **Initialize LLM** → OpenRouter API (configurable)
4. **Process prompt** → LLM decides which MCPs to call
5. **Execute MCPs** → Call selected MCPs via MCP protocol
6. **Return result** → Format and return to user
7. **Log execution** → Save to agent_executions table
8. **Charge user** → x402 payment (if applicable)

### MCP Integration

**Agent connects to MCPs via:**
- stdio (local development)
- HTTP/SSE (production)
- WebSocket (real-time)

**MCP Discovery:**
- Agent reads MCP manifest (.well-known/mcp.json)
- Discovers available tools
- Validates tool schemas

**Tool Execution:**
- Agent calls tool via JSON-RPC
- Passes parameters (validated by MCP)
- Receives response
- Formats for LLM

### x402 Integration

**Payment Flow:**
1. User signs payment (EIP-712 for Base, Ed25519 for Solana)
2. Agent verifies payment signature
3. Agent executes tools
4. Agent charges per tool call (if configured)
5. Revenue split:
   - Agent creator: 85%
   - MCP owners: 10%
   - Platform: 5%

---

## UI/UX DESIGN

### Visual Builder Layout

```
┌─────────────────────────────────────────────────────────┐
│ Header: Agent Builder [Save | Deploy | Test]         │
├──────────┬──────────────────────┬─────────────────────┤
│          │                      │                     │
│ MCP      │  Canvas              │  Configuration      │
│ Library  │  (Drag & Drop)      │  Panel              │
│          │                      │                     │
│ [Search] │  ┌────────────┐     │  MCP Config        │
│          │  │ [Prompt]   │     │  - Tool params     │
│ Database │  │            │     │  - Auth keys       │
│ ├─ MCP1  │  │ [Tools]   │     │  - Rate limits    │
│ ├─ MCP2  │  └────────────┘     │                     │
│ └─ MCP3  │                      │  Workflow          │
│          │  [Workflow]          │  - Sequences       │
│          │  - Tool 1 → Tool 2  │  - Conditions      │
│          │  - Tool 2 → Tool 3  │  - Loops          │
│          │                      │                     │
│          │                      │  Variables         │
│          │                      │  - Name: Type      │
│          │                      │  - Default values   │
│          │                      │                     │
└──────────┴──────────────────────┴─────────────────────┘
```

### Components Needed

1. **AgentBuilder.tsx** - Main builder component
2. **MCPLibrary.tsx** - Sidebar with MCPs
3. **BuilderCanvas.tsx** - Drag-and-drop canvas
4. **PromptEditor.tsx** - Rich text prompt editor
5. **ToolConfig.tsx** - MCP tool configuration
6. **WorkflowDesigner.tsx** - Visual workflow builder
7. **AgentTestPanel.tsx** - Test environment
8. **AgentDashboard.tsx** - List user's agents
9. **AgentCard.tsx** - Agent card component

---

## IMPLEMENTATION PLAN

### Phase 1: Database & API (Week 1)
- [ ] Create database schema (agents, agent_executions, etc.)
- [ ] Build API routes (create, list, update, delete agents)
- [ ] Implement agent execution endpoint
- [ ] Add execution logging
- [ ] Test with Postman/curl

### Phase 2: Visual Builder (Week 2-3)
- [ ] Create MCP Library component
- [ ] Implement drag-and-drop canvas
- [ ] Build prompt editor
- [ ] Create tool config panel
- [ ] Add workflow designer
- [ ] Implement save/deploy buttons

### Phase 3: Agent Runtime (Week 3-4)
- [ ] Implement LLM integration (OpenRouter)
- [ ] Add MCP protocol client
- [ ] Build execution engine
- [ ] Add error handling
- [ ] Implement retry logic
- [ ] Add execution timeout

### Phase 4: Testing & Polish (Week 4-5)
- [ ] Build test panel
- [ ] Add debug logs
- [ ] Create agent dashboard
- [ ] Add agent marketplace
- [ ] Implement agent sharing
- [ ] Add versioning

### Phase 5: Monetization (Week 5-6)
- [ ] Integrate x402 payments
- [ ] Add revenue tracking
- [ ] Implement payouts
- [ ] Create billing dashboard
- [ ] Add usage analytics

---

## COMPETITIVE ADVANTAGES

### vs Smithery.ai

| Feature | Smithery.ai | OMA-AI |
|---------|-------------|----------|
| Platform Fee | 30% | 5% ✅ |
| Payments | Stripe (credit card) | x402 (gasless) ✅ |
| Chains | Base only | Base + Solana ✅ |
| MCP Count | ~20 | 50+ ✅ |
| Platform Cost | $29+/month | $0/month ✅ |
| Visual Builder | ✅ | ✅ (planned) |
| Test Environment | ✅ | ✅ |
| One-Click Deploy | ✅ | ✅ |
| Agent Marketplace | ✅ | ✅ |
| Dark Mode | ❌ | ✅ |

### Unique OMA-AI Features
1. **x402 Gasless Payments** - No wallet gas fees
2. **Multi-Chain** - Base + Solana support
3. **Lower Fees** - 5% vs 30%
4. **Free Platform** - $0/month vs $29+
5. **More MCPs** - 50+ vs ~20
6. **Better UI** - Dark mode, responsive, modern

---

## SUCCESS METRICS

### Week 1 (Launch)
- 10+ agents built by users
- 100+ agent executions
- 95% success rate
- <2s average response time

### Month 1
- 50+ active agents
- 1,000+ executions
- 90% agent retention
- $100+ in revenue (early adopters)

### Month 3
- 200+ active agents
- 10,000+ executions
- 80% agent retention
- $2,000+ in revenue

### Month 6
- 500+ active agents
- 50,000+ executions
- 75% agent retention
- $10,000+ in revenue

---

## NEXT STEPS

### Immediate (Today)
1. Create database schema
2. Build basic API routes
3. Create agent list page
4. Build MCP library component

### This Week
5. Implement visual builder
6. Add prompt editor
7. Build test panel
8. Deploy first example agent

### Next 2 Weeks
9. Implement agent runtime
10. Add LLM integration
11. Add MCP protocol client
12. Create agent marketplace

---

*Generated: 2026-03-12 08:20 UTC*
*Status: Ready for implementation*
*Next: Database schema + API routes*
