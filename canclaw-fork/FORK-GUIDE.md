# CanClaw Fork Guide - Complete Setup Instructions

## 🦞🇨🇦 Creating Your Sovereign Canadian AI Assistant

This guide will walk you through forking OpenClaw into CanClaw.

---

## Step 1: Fork & Clone

```bash
# Clone OpenClaw
git clone https://github.com/openclaw/openclaw.git canclaw
cd canclaw

# Remove original remote
git remote remove origin

# Add your fork as new remote
git remote add origin https://github.com/YOURUSERNAME/canclaw.git

# Create new branch for CanClaw changes
git checkout -b canclaw-main

# Tag the fork point
git tag v0.0.1-canclaw-fork
```

---

## Step 2: Branding Updates

Replace all instances of "OpenClaw" with "CanClaw":

```bash
# Find and replace across all files
find . -type f -not -path "./node_modules/*" -not -path "./.git/*" \
  -exec sed -i 's/OpenClaw/CanClaw/g' {} \;

find . -type f -not -path "./node_modules/*" -not -path "./.git/*" \
  -exec sed -i 's/openclaw/canclaw/g' {} \;

# Update package name
sed -i 's/"name": "openclaw"/"name": "canclaw"/g' package.json
```

---

## Step 3: Install Dependencies

```bash
npm install
# or
yarn install
# or  
pnpm install
```

---

## Step 4: Configure for Canadian Sovereignty

```bash
# Copy environment template
cp .env.example .env

# Edit with Canadian defaults
nano .env
```

Set these values:
```env
LLM_PROVIDER=ollama
OLLAMA_MODEL=qwen3:8b
OLLAMA_HOST=http://localhost:11434
BLOCK_FOREIGN_APIS=true
LANGUAGE_PREFERENCE=auto
DATA_RESIDENCY=CA
TELEMETRY_ENABLED=false
```

---

## Step 5: Install Ollama (Local LLM)

```bash
# Linux/macOS
curl -fsSL https://ollama.com/install.sh | sh

# Pull Canadian-friendly models
ollama pull qwen3:8b        # Strong multilingual
ollama pull llama3.1:8b     # Meta's latest
ollama pull aya-expanse     # Cohere's multilingual
ollama pull gemma3:4b       # Google's open model
ollama pull mistral-nemo    # Mistral's efficient model

# Start Ollama
ollama serve
```

---

## Step 6: Run CanClaw

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# With Docker
docker compose -f docker-compose.sovereign.yml up -d
```

---

## Step 7: Verify Sovereign Mode

```bash
# Check config
npm run config:check

# Verify no foreign APIs
npm run sovereignty:audit

# Test local inference
npm run test:ollama
```

---

## Next Steps

1. Read `docs/canadian-vps.md` for VPS deployment
2. Explore `skills/canadian/` for Canadian features
3. Configure bilingual responses in `.env`
4. Set up local memory in `memory/` directory

---

## Troubleshooting

**Ollama not connecting:**
```bash
# Check Ollama is running
curl http://localhost:11434/api/tags

# Set OLLAMA_HOST if needed
export OLLAMA_HOST=http://localhost:11434
```

**Foreign API warnings:**
- Check `BLOCK_FOREIGN_APIS=true` in `.env`
- Review logs for blocked requests
- Enable explicitly only if needed

**Bilingual not working:**
- Set `LANGUAGE_PREFERENCE=auto` or `en` or `fr`
- Check system prompt includes bilingual instructions

---

*CanClaw: Empowering Canadians with sovereign AI 🦞🇨🇦*
