#!/bin/bash
# Fix all HTML pages with proper meta tags, canonical URLs, and charset position

cd /home/nosyt/.openclaw/workspace/oma-ai-repo/public

for file in *.html; do
  echo "Processing $file..."
  
  # Get page name from filename
  pagename=$(basename "$file" .html)
  
  # Skip if already has canonical URL
  if grep -q 'rel="canonical"' "$file"; then
    echo "  ✓ Already has canonical URL"
  else
    # Add canonical URL after viewport meta
    sed -i 's|<meta name="viewport" content="width=device-width, initial-scale=1.0">|<meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <link rel="canonical" href="https://oma-ai.com/'$pagename'">|' "$file"
    echo "  + Added canonical URL"
  fi
  
  # Fix charset position - should be first in head
  if head -20 "$file" | grep -q "<meta charset"; then
    # Check if charset is not first element in head
    first_in_head=$(head -20 "$file" | grep -n "<head>" | head -1 | cut -d: -f1)
    charset_line=$(head -20 "$file" | grep -n "<meta charset" | head -1 | cut -d: -f1)
    
    if [ "$first_in_head" ] && [ "$charset_line" ] && [ "$charset_line" -gt "$first_in_head" ]; then
      # Move charset to immediately after <head>
      sed -i 's|<head>\(.*\)|<head>\n    <meta charset="UTF-8">|' "$file"
      echo "  + Fixed charset position"
    fi
  fi
  
  # Extend meta description if too short
  desc=$(grep -oP 'content="[^"]+"' "$file" | head -1)
  if [ ${#desc:-0} -lt 100 ]; then
    case "$pagename" in
      "index")
        sed -i 's|content="[^"]*"|content="OMA-AI - The AI Agent Marketplace. Browse APIs, MCP servers, and LLM models with x402 crypto payments. Free tier available."|' "$file"
        ;;
      "apis")
        sed -i 's|content="[^"]*"|content="Browse 16+ APIs for AI agents. Crypto prices, weather, search, LLMs. Pay per call with x402 micropayments. Free tier available."|' "$file"
        ;;
      "mcps")
        sed -i 's|content="[^"]*"|content="10+ MCP servers for AI agents. PostgreSQL, Pinecone, SQLite, Redis. Connect instantly with x402 payments."|' "$file"
        ;;
      "compute")
        sed -i 's|content="[^"]*"|content="Deploy AI agents on Akash decentralized cloud. 70% cheaper than AWS. GPU and CPU instances available."|' "$file"
        ;;
      "pricing")
        sed -i 's|content="[^"]*"|content="OMA-AI pricing - Free tier, Pro plan at $29/mo, Enterprise custom. 90% revenue share for publishers. No hidden fees."|' "$file"
        ;;
      "about")
        sed -i 's|content="[^"]*"|content="About OMA-AI - Building the infrastructure for autonomous AI agents. x402 payments, MCP servers, API marketplace."|' "$file"
        ;;
      "contact")
        sed -i 's|content="[^"]*"|content="Contact OMA-AI for partnerships, API listings, and support. Join our Discord community or email us directly."|' "$file"
        ;;
      "blog")
        sed -i 's|content="[^"]*"|content="OMA-AI blog - Latest news, tutorials, and updates on AI agents, x402 payments, and decentralized infrastructure."|' "$file"
        ;;
      "docs")
        sed -i 's|content="[^"]*"|content="OMA-AI API documentation - Quick start guide, authentication, endpoints reference. JavaScript, Python, cURL examples."|' "$file"
        ;;
      "community")
        sed -i 's|content="[^"]*"|content="Join the OMA-AI community - Discord, GitHub, Twitter. 2400+ members building the future of AI agents."|' "$file"
        ;;
    esac
    echo "  + Extended meta description"
  fi
done

echo "Done!"
