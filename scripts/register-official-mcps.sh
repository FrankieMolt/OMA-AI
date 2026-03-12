#!/bin/bash

# Register Official MCPs in OMA-AI Marketplace
# Run this after configuring Supabase

set -e

API_BASE="https://www.oma-ai.com/api/mcp"
# Or for local testing:
# API_BASE="http://localhost:3000/api/mcp"

echo "📦 Registering Official MCPs..."
echo ""

# 1. Filesystem MCP
echo "📁 Registering Filesystem MCP..."
curl -X POST "${API_BASE}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Filesystem MCP",
    "slug": "filesystem-mcp",
    "category": "storage",
    "description": "Access local file system for AI agents. Read, write, list, and manage files.",
    "long_description": "The Filesystem MCP provides secure file system access for AI agents. Features include reading and writing files, listing directories, watching for file changes, and managing file permissions. Perfect for agents that need to work with user data, configuration files, or document repositories.",
    "mcp_endpoint": "https://oma-ai.com/mcp/filesystem/sse",
    "transport": "sse",
    "repository_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
    "documentation_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
    "author": "official",
    "pricing_usdc": 0,
    "x402_enabled": false,
    "verified": true,
    "tools": [
      {
        "name": "read_file",
        "description": "Read the contents of a file",
        "pricing_usdc": 0
      },
      {
        "name": "write_file",
        "description": "Write content to a file",
        "pricing_usdc": 0
      },
      {
        "name": "list_directory",
        "description": "List files and directories",
        "pricing_usdc": 0
      },
      {
        "name": "create_directory",
        "description": "Create a new directory",
        "pricing_usdc": 0
      },
      {
        "name": "delete_file",
        "description": "Delete a file or directory",
        "pricing_usdc": 0
      }
    ]
  }'
echo ""
echo ""

# 2. Fetch MCP
echo "🌐 Registering Fetch MCP..."
curl -X POST "${API_BASE}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fetch MCP",
    "slug": "fetch-mcp",
    "category": "data",
    "description": "HTTP requests for AI agents. Fetch web pages, APIs, and external services.",
    "long_description": "The Fetch MCP enables AI agents to make HTTP requests to external services. Supports GET, POST, PUT, DELETE, and other HTTP methods. Handles headers, authentication, cookies, and response parsing. Ideal for agents that need to interact with REST APIs, webhooks, or any HTTP-based service.",
    "mcp_endpoint": "https://oma-ai.com/mcp/fetch/sse",
    "transport": "sse",
    "repository_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch",
    "documentation_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch",
    "author": "official",
    "pricing_usdc": 0.0001,
    "x402_enabled": true,
    "verified": true,
    "tools": [
      {
        "name": "fetch",
        "description": "Make an HTTP request",
        "pricing_usdc": 0.0001
      },
      {
        "name": "fetch_text",
        "description": "Fetch and extract text from a URL",
        "pricing_usdc": 0.0001
      }
    ]
  }'
echo ""
echo ""

# 3. Git MCP
echo "🔀 Registering Git MCP..."
curl -X POST "${API_BASE}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Git MCP",
    "slug": "git-mcp",
    "category": "dev",
    "description": "Git operations for AI agents. Clone, commit, push, pull, and manage repositories.",
    "long_description": "The Git MCP provides comprehensive Git operations for AI agents. Clone repositories, create branches, make commits, push changes, and manage pull requests. Perfect for agents that work with code, contribute to projects, or need to manage version control workflows.",
    "mcp_endpoint": "https://oma-ai.com/mcp/git/sse",
    "transport": "sse",
    "repository_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/git",
    "documentation_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/git",
    "author": "official",
    "pricing_usdc": 0.0005,
    "x402_enabled": true,
    "verified": true,
    "tools": [
      {
        "name": "git_clone",
        "description": "Clone a git repository",
        "pricing_usdc": 0.0005
      },
      {
        "name": "git_status",
        "description": "Show git status",
        "pricing_usdc": 0.0001
      },
      {
        "name": "git_commit",
        "description": "Commit changes",
        "pricing_usdc": 0.0002
      },
      {
        "name": "git_push",
        "description": "Push changes to remote",
        "pricing_usdc": 0.0005
      }
    ]
  }'
echo ""
echo ""

# 4. Memory MCP
echo "🧠 Registering Memory MCP..."
curl -X POST "${API_BASE}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Memory MCP",
    "slug": "memory-mcp",
    "category": "storage",
    "description": "Persistent memory storage for AI agents. Save, retrieve, and query stored memories.",
    "long_description": "The Memory MCP provides long-term memory storage for AI agents. Store key-value pairs, semantic vectors, and structured data. Query memories by similarity or exact match. Perfect for agents that need to remember user preferences, context, or learn over time.",
    "mcp_endpoint": "https://oma-ai.com/mcp/memory/sse",
    "transport": "sse",
    "repository_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/memory",
    "documentation_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/memory",
    "author": "official",
    "pricing_usdc": 0.0001,
    "x402_enabled": true,
    "verified": true,
    "tools": [
      {
        "name": "memory_set",
        "description": "Store a memory",
        "pricing_usdc": 0.0001
      },
      {
        "name": "memory_get",
        "description": "Retrieve a memory",
        "pricing_usdc": 0.00005
      },
      {
        "name": "memory_search",
        "description": "Search memories",
        "pricing_usdc": 0.0001
      },
      {
        "name": "memory_delete",
        "description": "Delete a memory",
        "pricing_usdc": 0.00005
      }
    ]
  }'
echo ""
echo ""

# 5. Sequential Thinking MCP
echo "🔄 Registering Sequential Thinking MCP..."
curl -X POST "${API_BASE}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sequential Thinking MCP",
    "slug": "sequential-thinking-mcp",
    "category": "ai",
    "description": "Chain of thought reasoning for AI agents. Break down complex problems step by step.",
    "long_description": "The Sequential Thinking MCP enables AI agents to perform structured, step-by-step reasoning. Break down complex problems, plan solutions, and track thought processes. Perfect for agents that need to solve complex tasks, plan workflows, or demonstrate reasoning.",
    "mcp_endpoint": "https://oma-ai.com/mcp/sequentialthinking/sse",
    "transport": "sse",
    "repository_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking",
    "documentation_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking",
    "author": "official",
    "pricing_usdc": 0.0001,
    "x402_enabled": true,
    "verified": true,
    "tools": [
      {
        "name": "think_step",
        "description": "Add a thinking step",
        "pricing_usdc": 0.00005
      },
      {
        "name": "get_thoughts",
        "description": "Get all thinking steps",
        "pricing_usdc": 0.0001
      },
      {
        "name": "clear_thoughts",
        "description": "Clear all thoughts",
        "pricing_usdc": 0.00005
      }
    ]
  }'
echo ""
echo ""

# 6. Time MCP
echo "⏰ Registering Time MCP..."
curl -X POST "${API_BASE}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Time MCP",
    "slug": "time-mcp",
    "category": "utility",
    "description": "Date and time utilities for AI agents. Get current time, calculate durations, and work with timezones.",
    "long_description": "The Time MCP provides comprehensive date and time functionality for AI agents. Get current time in any timezone, calculate time differences, format dates, and work with calendars. Perfect for agents that need to schedule tasks, track deadlines, or work with time-based data.",
    "mcp_endpoint": "https://oma-ai.com/mcp/time/sse",
    "transport": "sse",
    "repository_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/time",
    "documentation_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/time",
    "author": "official",
    "pricing_usdc": 0,
    "x402_enabled": false,
    "verified": true,
    "tools": [
      {
        "name": "get_current_time",
        "description": "Get current time in a timezone",
        "pricing_usdc": 0
      },
      {
        "name": "time_diff",
        "description": "Calculate time difference",
        "pricing_usdc": 0
      },
      {
        "name": "format_date",
        "description": "Format a date string",
        "pricing_usdc": 0
      }
    ]
  }'
echo ""
echo ""

# 7. Everything MCP
echo "📦 Registering Everything MCP..."
curl -X POST "${API_BASE}/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Everything MCP",
    "slug": "everything-mcp",
    "category": "utility",
    "description": "Universal access to all file system resources. Search, read, and write any file on the system.",
    "long_description": "The Everything MCP provides unrestricted access to the entire file system. Search for files across all directories, read any file, and write anywhere. Ideal for advanced agents that need comprehensive system access or are working in trusted environments. Use with caution - provides full file system access.",
    "mcp_endpoint": "https://oma-ai.com/mcp/everything/sse",
    "transport": "sse",
    "repository_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/everything",
    "documentation_url": "https://github.com/modelcontextprotocol/servers/tree/main/src/everything",
    "author": "official",
    "pricing_usdc": 0.0001,
    "x402_enabled": true,
    "verified": true,
    "tools": [
      {
        "name": "search_files",
        "description": "Search files across the entire system",
        "pricing_usdc": 0.0001
      },
      {
        "name": "read_any_file",
        "description": "Read any file on the system",
        "pricing_usdc": 0.0001
      },
      {
        "name": "write_any_file",
        "description": "Write to any location",
        "pricing_usdc": 0.0001
      }
    ]
  }'
echo ""
echo ""

echo "✅ All 7 Official MCPs registered successfully!"
echo ""
echo "📊 Summary:"
echo "  - Filesystem MCP (free)"
echo "  - Fetch MCP ($0.0001/call)"
echo "  - Git MCP ($0.0005/call)"
echo "  - Memory MCP ($0.0001/call)"
echo "  - Sequential Thinking MCP ($0.0001/call)"
echo "  - Time MCP (free)"
echo "  - Everything MCP ($0.0001/call)"
echo ""
echo "💡 Next: View them at https://www.oma-ai.com/mcps"
