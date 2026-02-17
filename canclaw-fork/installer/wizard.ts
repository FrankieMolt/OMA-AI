#!/usr/bin/env node

/**
 * CanClaw Setup Wizard
 * Guides users through initial configuration with Canadian sovereignty focus
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.clear();
console.log(chalk.red.bold(`
🦞🇨🇦 Welcome to CanClaw Setup Wizard

Empowering Canadians with sovereign AI
Data stays in Canada, under PIPEDA
`));

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'sovereignMode',
      message: chalk.yellow('🛡️  Enable sovereign mode (local Ollama only, no foreign APIs)?'),
      default: true,
    },
    {
      type: 'list',
      name: 'language',
      message: chalk.yellow('🌐 Preferred language / Langue préférée:'),
      choices: [
        { name: 'English', value: 'en' },
        { name: 'Français', value: 'fr' },
        { name: 'Auto-detect / Détection automatique', value: 'auto' },
      ],
      default: 'auto',
    },
    {
      type: 'list',
      name: 'model',
      message: chalk.yellow('🤖 Select your local AI model:'),
      choices: [
        {
          name: 'qwen3:8b - Strong multilingual (recommended for EN/FR)',
          value: 'qwen3:8b',
        },
        {
          name: 'llama3.1:8b - Meta latest model',
          value: 'llama3.1:8b',
        },
        {
          name: 'aya-expanse - Cohere multilingual (Canadian company)',
          value: 'aya-expanse',
        },
        {
          name: 'gemma3:4b - Lightweight (for lower specs)',
          value: 'gemma3:4b',
        },
        {
          name: 'mistral-nemo - Efficient multilingual',
          value: 'mistral-nemo',
        },
      ],
      default: 'qwen3:8b',
    },
    {
      type: 'confirm',
      name: 'autoPullModel',
      message: chalk.yellow('📥 Automatically pull the selected model now?'),
      default: true,
    },
    {
      type: 'confirm',
      name: 'enableCanadianFeatures',
      message: chalk.yellow('🇨🇦 Enable Canadian features (metric, bilingual, weather)?'),
      default: true,
    },
    {
      type: 'confirm',
      name: 'blockForeignApis',
      message: chalk.yellow('🚫 Block foreign APIs (OpenAI, Anthropic, Google)?'),
      default: true,
      when: (answers) => answers.sovereignMode,
    },
    {
      type: 'confirm',
      name: 'telemetry',
      message: chalk.yellow('📊 Enable telemetry? (We respect your privacy - default is OFF)'),
      default: false,
    },
    {
      type: 'list',
      name: 'deployment',
      message: chalk.yellow('🚀 Deployment method:'),
      choices: [
        { name: 'Local machine (development)', value: 'local' },
        { name: 'Local machine (production)', value: 'local-prod' },
        { name: 'Docker (sovereign mode)', value: 'docker' },
        { name: 'Canadian VPS (IONOS, OVH, etc.)', value: 'vps' },
      ],
      default: 'local',
    },
  ]);

  console.log(chalk.blue('\n⚙️  Generating configuration...\n'));

  // Generate .env file
  const envContent = generateEnvFile(answers);
  fs.writeFileSync('.env', envContent);
  console.log(chalk.green('✅ Created .env file'));

  // Pull model if requested
  if (answers.autoPullModel) {
    console.log(chalk.blue(`\n📥 Pulling ${answers.model}...`));
    console.log(chalk.gray('This may take a few minutes depending on your internet speed.\n'));
    
    try {
      execSync(`ollama pull ${answers.model}`, { stdio: 'inherit' });
      console.log(chalk.green(`✅ Successfully pulled ${answers.model}`));
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Could not pull ${answers.model} automatically.`));
      console.log(chalk.gray(`Run manually: ollama pull ${answers.model}`));
    }
  }

  // Create directories
  if (!fs.existsSync('memory')) {
    fs.mkdirSync('memory');
    console.log(chalk.green('✅ Created memory directory'));
  }

  // Deployment instructions
  console.log(chalk.blue('\n🚀 Next steps:\n'));
  
  switch (answers.deployment) {
    case 'local':
      console.log(chalk.white('1. Run: npm run dev'));
      console.log(chalk.white('2. Open: http://localhost:3000'));
      break;
    case 'local-prod':
      console.log(chalk.white('1. Run: npm run build'));
      console.log(chalk.white('2. Run: npm start'));
      console.log(chalk.white('3. Open: http://localhost:3000'));
      break;
    case 'docker':
      console.log(chalk.white('1. Run: docker compose -f docker/docker-compose.sovereign.yml up -d'));
      console.log(chalk.white('2. Open: http://localhost:3000'));
      break;
    case 'vps':
      console.log(chalk.white('1. Read: docs/canadian-vps.md'));
      console.log(chalk.white('2. Set up your Canadian VPS'));
      console.log(chalk.white('3. Deploy using Docker'));
      break;
  }

  console.log(chalk.red.bold(`
🦞🇨🇦 CanClaw is ready!

Your data stays in Canada. Your AI is sovereign.
`));

  // Sovereignty notice
  if (answers.sovereignMode) {
    console.log(chalk.green('✅ Sovereign mode enabled'));
    console.log(chalk.gray('   - Local inference only'));
    console.log(chalk.gray('   - Foreign APIs blocked'));
    console.log(chalk.gray('   - Data residency: Canada'));
  }

  if (answers.language === 'fr') {
    console.log(chalk.blue('\n🇫🇷 Mode bilingue activé'));
  } else if (answers.language === 'auto') {
    console.log(chalk.blue('\n🌐 Bilingual mode enabled (auto-detect)'));
  }
}

function generateEnvFile(answers: any): string {
  return `# CanClaw Configuration
# Generated by setup wizard

# ============================================
# SOVEREIGNTY SETTINGS
# ============================================

LLM_PROVIDER=ollama
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=${answers.model}
BLOCK_FOREIGN_APIS=${answers.sovereignMode}
DATA_RESIDENCY=CA

# ============================================
# LANGUAGE & LOCALIZATION
# ============================================

LANGUAGE_PREFERENCE=${answers.language}
BILINGUAL_MODE=${answers.language === 'auto'}
DEFAULT_LANGUAGE=${answers.language === 'auto' ? 'en' : answers.language}

# ============================================
# PRIVACY & SECURITY
# ============================================

TELEMETRY_ENABLED=${answers.telemetry}
ANALYTICS_ENABLED=false
CRASH_REPORTS_ENABLED=false
MEMORY_BACKEND=local
MEMORY_PATH=./memory

# Security
SANDBOX_ENABLED=true
TOOL_PERMISSIONS=ask
RESTRICTED_TOOLS=shell,browser,filesystem,network

# ============================================
# CANADIAN FEATURES
# ============================================

CANADIAN_SPELLING=${answers.enableCanadianFeatures}
METRIC_SYSTEM=${answers.enableCanadianFeatures}
WEATHER_PROVIDER=environment-canada
GOVERNMENT_SERVICES_ENABLED=${answers.enableCanadianFeatures}

# ============================================
# SYSTEM
# ============================================

NODE_ENV=production
PORT=3000
HOST=localhost
LOG_LEVEL=info

# ============================================
# NOTES
# ============================================

# This configuration was generated by the CanClaw setup wizard.
# You can edit this file to customize your settings.
# For documentation: https://docs.canclaw.ca
`;
}

main().catch((error) => {
  console.error(chalk.red('❌ Error:'), error.message);
  process.exit(1);
});
