# 🦞🇨🇦 CanClaw - Sovereign Canadian AI Assistant

<div align="center">

![CanClaw Logo](docs/assets/canclaw-banner.png)

**Empowering Canadians with sovereign AI — data stays in Canada, under PIPEDA, powered by open models**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Canada](https://img.shields.io/badge/Made%20in-Canada-red.svg)](https://canada.ca)
[![Sovereignty](https://img.shields.io/badge/Sovereignty-First-blue.svg)](#)
[![Bilingual](https://img.shields.io/badge/Bilingual-EN%20%2F%20FR-purple.svg)](#)

[English](#english) | [Français](#français)

</div>

---

## English

### 🦞 Why CanClaw?

**Your data, your sovereignty.** CanClaw is a privacy-first, Canadian-focused fork of OpenClaw designed to keep your data in Canada and under Canadian law (PIPEDA).

#### 🛡️ Sovereignty First
- **Local-First**: Defaults to Ollama for fully local inference
- **No Foreign APIs**: Hard-blocks OpenAI, Anthropic, Google unless you explicitly enable
- **Data Residency**: Your data never leaves Canada (or your machine)
- **PIPEDA Compliant**: Built for Canadian privacy law

#### 🇨🇦 Canadian Features
- **Bilingual**: Auto-detects English/French, responds appropriately
- **Metric System**: All units in Celsius, kilometers, liters
- **Canadian APIs**: Environment Canada weather, open data integrations
- **Canadian Spelling**: Colour, centre, behaviour, honour

#### 🔒 Privacy & Security
- **No Telemetry**: Zero data collection by default
- **Local Memory**: Markdown-based memory stored locally
- **Tool Warnings**: Prominent warnings before shell/browser/file access
- **Sandbox Options**: Docker and container recommendations

#### 🤖 Model Freedom
- **Ollama Default**: Pull and run open models locally
- **Recommended Models**:
  - `qwen3:8b` - Strong multilingual, great for EN/FR
  - `llama3.1:8b` - Meta's latest, powerful and efficient
  - `aya-expanse` - Cohere's multilingual model
  - `gemma3:4b` - Google's lightweight open model
  - `mistral-nemo` - Mistral's efficient multilingual model
- **Canadian APIs**: Optional opt-in for Cohere (Canadian company)

---

### 📦 Installation

#### Option 1: Local Machine (Recommended for Privacy)

```bash
# 1. Clone CanClaw
git clone https://github.com/canclaw/canclaw.git
cd canclaw

# 2. Install dependencies
npm install

# 3. Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 4. Pull a model
ollama pull qwen3:8b

# 5. Configure environment
cp .env.example .env
# Edit .env with your preferences

# 6. Run CanClaw
npm run dev
```

#### Option 2: Canadian VPS (IONOS, OVH, HostPapa)

See [docs/canadian-vps.md](docs/canadian-vps.md) for complete VPS deployment guide with Docker.

```bash
# Quick VPS setup
docker compose -f docker/docker-compose.sovereign.yml up -d
```

---

### ⚙️ Configuration

Edit `.env` in the project root:

```env
# Sovereignty Settings
LLM_PROVIDER=ollama
OLLAMA_MODEL=qwen3:8b
OLLAMA_HOST=http://localhost:11434
BLOCK_FOREIGN_APIS=true
DATA_RESIDENCY=CA

# Language
LANGUAGE_PREFERENCE=auto  # auto, en, or fr

# Privacy
TELEMETRY_ENABLED=false
MEMORY_BACKEND=local
MEMORY_PATH=./memory

# Security
SANDBOX_ENABLED=true
TOOL_PERMISSIONS=ask  # ask, allow, or deny
```

---

### 🎯 Canadian Skills

CanClaw includes built-in Canadian-focused skills:

#### 🌦️ Weather (Environment Canada)
```bash
canclaw skill:weather toronto
canclaw skill:weather montreal --fr
```

#### 🇫🇷 Bilingual Translation
```bash
canclaw translate "Hello, how are you?" --to fr
canclaw traduire "Bonjour, comment ça va?" --to en
```

#### 📏 Metric Conversion
```bash
canclaw convert 100 fahrenheit --to celsius
canclaw convert 50 miles --to kilometers
```

#### 💰 CRA/PUBLIC Services
```bash
canclaw cra:deadlines 2026
canclaw service:passport info
```

---

### 🛠️ Features

- **💬 Chat Interface**: Natural conversation with context
- **🧠 Local Memory**: Persistent memory in Markdown
- **🔧 Tool Access**: Shell, browser, file operations (with warnings)
- **📁 File Management**: Read, write, organize files
- **🌐 Web Access**: Search and fetch (optional, with warnings)
- **🎨 Skills System**: Extend with custom skills
- **🔄 Auto-Update**: Optional, manual control

---

### 📚 Documentation

- [Deployment Guide](docs/canadian-vps.md)
- [Skills Development](docs/skills.md)
- [Configuration Reference](docs/config.md)
- [API Documentation](docs/api.md)
- [Privacy & Security](docs/privacy.md)
- [French Documentation](docs/fr/README.md)

---

### 🤝 Community & Support

- **GitHub Issues**: https://github.com/canclaw/canclaw/issues
- **Discord**: https://discord.gg/canclaw
- **Twitter**: @CanClawAI

---

### 📜 License & Credits

**CanClaw is MIT licensed.**

This project is a fork of [OpenClaw](https://github.com/openclaw/openclaw) created by **Peter Steinberger** and the OpenClaw team.

We gratefully acknowledge their work in creating an excellent open-source AI assistant framework.

**Original License**: MIT  
**Fork Maintainer**: CanClaw Community  
**License**: MIT (same as original)

---

## Français

### 🦞 Pourquoi CanClaw?

**Vos données, votre souveraineté.** CanClaw est un fork canadien d'OpenClaw axé sur la confidentialité, conçu pour garder vos données au Canada et sous la loi canadienne (PIPEDA).

#### 🛡️ Souveraineté d'Abord
- **Local d'Abord**: Utilise Ollama par défaut pour l'inférence locale
- **Aucune API Étrangère**: Bloque OpenAI, Anthropic, Google sauf activation explicite
- **Résidence des Données**: Vos données ne quittent jamais le Canada
- **Conforme PIPEDA**: Construit pour la loi canadienne sur la confidentialité

#### 🇨🇦 Caractéristiques Canadiennes
- **Bilingue**: Détection automatique anglais/français
- **Système Métrique**: Toutes les unités en Celsius, kilomètres, litres
- **APIs Canadiennes**: Météo Environnement Canada, données ouvertes
- **Orthographe Canadienne**: Couleur, centre, comportement, honneur

#### 🔒 Confidentialité et Sécurité
- **Pas de Télémétrie**: Aucune collecte de données par défaut
- **Mémoire Locale**: Mémoire en Markdown stockée localement
- **Avertissements Outils**: Alertes avant accès shell/navigateur/fichiers

---

### 📦 Installation

```bash
# 1. Cloner CanClaw
git clone https://github.com/canclaw/canclaw.git
cd canclaw

# 2. Installer les dépendances
npm install

# 3. Installer Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 4. Télécharger un modèle
ollama pull qwen3:8b

# 5. Configurer
cp .env.example .env

# 6. Lancer
npm run dev
```

---

### 📜 Licence et Crédits

**CanClaw est sous licence MIT.**

Ce projet est un fork d'[OpenClaw](https://github.com/openclaw/openclaw) créé par **Peter Steinberger** et l'équipe OpenClaw.

Nous reconnaissons avec gratitude leur travail dans la création d'un excellent framework d'assistant IA open-source.

---

<div align="center">

**CanClaw: Empowering Canadians with sovereign AI 🦞🇨🇦**

Made with ❤️ in Canada

</div>
