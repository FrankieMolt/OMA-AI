# Community Skills Integration Guide

## Overview

OpenMarketAccess allows you to import hundreds of skills and agents from trusted community repositories. This integration brings 200+ ready-to-use capabilities into your local OMA instance.

**Supported Sources:**
- **K-Dense-AI/claude-scientific-skills** (139 scientific research skills)
- **obra/superpowers** (14 developer workflow skills)
- **wshobson/agents** (48 specialized agents)

---

## 🚀 How to Import

You can import community data using either the **Admin Dashboard** or the **CLI**.

### Option 1: Admin Dashboard (Recommended)

1. Navigate to **Dashboard > Settings**.
2. Scroll down to the **Data Import** section.
3. Click the import button for the source you want:
   - **Import Skills**: Fetches scientific skills.
   - **Import Superpowers**: Fetches developer workflow skills.
   - **Import Agents**: Fetches autonomous agents.
   - **Import Everything**: Runs all importers in sequence.

The UI provides real-time feedback and success notifications.

### Option 2: CLI Commands

For developers or CI/CD pipelines, you can run the import scripts directly from the terminal.

```bash
cd apps/web

# Import Scientific Skills
npm run import:scientific

# Import Superpowers
npm run import:superpowers

# Import Wshobson Agents
npm run import:wshobson

# Import Everything
npm run import:all-community
```

---

## 📦 What Gets Imported?

### 1. Scientific Skills (K-Dense-AI)
- **Categories**: Biology, Chemistry, Physics, Mathematics, Medicine.
- **Example Skills**: `protein-folding-analysis`, `chemical-equation-balancer`, `statistical-significance-test`.
- **License**: MIT.

### 2. Superpowers (obra)
- **Categories**: Development, Workflow, Testing.
- **Example Skills**: `test-driven-development`, `systematic-debugging`, `code-review-checklist`.
- **License**: MIT.

### 3. Community Agents (wshobson)
- **Categories**: DevOps, Data Analysis, Web Scraping.
- **Example Agents**: `github-pr-reviewer`, `hacker-news-scraper`, `finance-analyst`.
- **License**: MIT.

---

## 🛠️ Technical Implementation

The import system uses a modular architecture:

1. **Importers**: Located in `apps/web/src/lib/importers/`. Each script fetches from GitHub API, parses the content, and maps it to the OMA database schema.
2. **Database**: Items are inserted into `skills` or `agents` tables with `ownerId` linked to the Admin user.
3. **API**: The `POST /api/admin/import` endpoint orchestrates the process securely.

### Source Tracking
Imported items are tagged for easy identification:
- `metadata.source`: The repository name (e.g., `obra/superpowers`).
- `metadata.originalFile`: The source file name.
- `githubUrl`: Link to the original code.

---

## Troubleshooting

**"Admin user not found"**
- Ensure you have run the database seed script: `npm run db:seed`.
- The importers look for `admin@oma.com` to assign ownership.

**GitHub API Rate Limits**
- The importers use the public GitHub API. If you run them too frequently, you may hit rate limits.
- Wait a few minutes and try again.

---

*Community integration powers the OMA ecosystem with open-source intelligence.*
