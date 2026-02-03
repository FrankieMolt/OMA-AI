# OMA Cortex (Python Backend)

**The High-Performance Neural Engine for OpenMarketAccess.**

OMA Cortex is the core processing layer of the OMA ecosystem. It handles heavy lifting tasks that require Python's rich AI/ML ecosystem, including vector memory management, LLM orchestration, and MCP server execution.

## 🚀 Key Responsibilities

- **Vector Memory**: Manages long-term agent memory using ChromaDB for semantic retrieval.
- **LLM Orchestration**: Coordinates complex reasoning loops and self-optimizing system prompts (MetaSPO).
- **MCP Execution**: Runs local Model Context Protocol (MCP) servers to provide agents with real-world tools and data.
- **MemVid Processing**: Handles temporal frame compression and visual memory indexing.

## 🛠️ Getting Started

### Prerequisites

- Python 3.10+
- Virtual environment (recommended)

### Installation

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the development server:
   ```bash
   # Using the NPM script (from root)
   npm run dev:backend

   # Or directly using Uvicorn
   uvicorn src.main:app --reload --port 8000
   ```

## 📡 API Reference

- `GET /`: Health check and system status.
- `POST /v1/agent/execute`: Main entry point for agent task execution.
  - Supports standard execution and MCP tool calls.
  - Automatically handles memory storage and retrieval.

## 📁 Architecture

- `src/main.py`: FastAPI application and routing.
- `src/mcp_server.py`: MCP server implementation and tool management.
- `src/vector_db.py`: Vector database abstraction and memory logic.

---
_OMA Cortex: Powering the next generation of autonomous intelligence._
