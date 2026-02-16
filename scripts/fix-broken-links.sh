#!/bin/bash
# Fix broken external links across all sites

# OMA-AI broken links (from audit)
# These are GitHub MCP server links that 404

# Fix: Update to correct MCP server URLs
find app/ -name "*.tsx" -exec sed -i 's|https://github.com/model-context-protocol/servers/tree/main/src/github|https://github.com/modelcontextprotocol/servers/tree/main/src/github|g' {} \;
find app/ -name "*.tsx" -exec sed -i 's|https://github.com/model-context-protocol/servers/tree/main/src/brave-search|https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search|g' {} \;
find app/ -name "*.tsx" -exec sed -i 's|https://github.com/model-context-protocol/servers/tree/main/src/filesystem|https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem|g' {} \;

echo "✅ Fixed broken MCP server links"
