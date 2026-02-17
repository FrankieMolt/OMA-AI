/**
 * CanClaw Configuration
 * Sovereign Canadian AI Assistant
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface CanClawConfig {
  // Sovereignty
  llmProvider: 'ollama' | 'cohere' | 'openai' | 'anthropic';
  blockForeignApis: boolean;
  dataResidency: 'CA' | 'US' | 'EU' | 'OTHER';
  
  // Ollama
  ollamaHost: string;
  ollamaModel: string;
  
  // Language
  languagePreference: 'auto' | 'en' | 'fr';
  bilingualMode: boolean;
  defaultLanguage: 'en' | 'fr';
  
  // Privacy
  telemetryEnabled: boolean;
  analyticsEnabled: boolean;
  crashReportsEnabled: boolean;
  memoryBackend: 'local' | 'memory';
  memoryPath: string;
  
  // Security
  sandboxEnabled: boolean;
  toolPermissions: 'ask' | 'allow' | 'deny';
  restrictedTools: string[];
  
  // Canadian Features
  canadianSpelling: boolean;
  metricSystem: boolean;
  weatherProvider: 'environment-canada' | 'openweathermap';
  governmentServicesEnabled: boolean;
  
  // Advanced
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  debugMode: boolean;
  maxTokens: number;
  temperature: number;
  contextWindow: number;
  
  // System
  nodeEnv: 'development' | 'production' | 'test';
  port: number;
  host: string;
}

/**
 * Default configuration - Sovereignty First
 */
export const defaultConfig: CanClawConfig = {
  // Sovereignty - LOCAL BY DEFAULT
  llmProvider: 'ollama',
  blockForeignApis: true,
  dataResidency: 'CA',
  
  // Ollama - Local inference
  ollamaHost: 'http://localhost:11434',
  ollamaModel: 'qwen3:8b',
  
  // Language - Bilingual by default
  languagePreference: 'auto',
  bilingualMode: true,
  defaultLanguage: 'en',
  
  // Privacy - NO TELEMETRY by default
  telemetryEnabled: false,
  analyticsEnabled: false,
  crashReportsEnabled: false,
  memoryBackend: 'local',
  memoryPath: './memory',
  
  // Security - ASK before dangerous operations
  sandboxEnabled: true,
  toolPermissions: 'ask',
  restrictedTools: ['shell', 'browser', 'filesystem', 'network'],
  
  // Canadian Features
  canadianSpelling: true,
  metricSystem: true,
  weatherProvider: 'environment-canada',
  governmentServicesEnabled: true,
  
  // Advanced
  logLevel: 'info',
  debugMode: false,
  maxTokens: 4096,
  temperature: 0.7,
  contextWindow: 8192,
  
  // System
  nodeEnv: 'development',
  port: 3000,
  host: 'localhost',
};

/**
 * Load configuration from environment
 */
export function loadConfig(): CanClawConfig {
  return {
    // Sovereignty
    llmProvider: (process.env.LLM_PROVIDER as CanClawConfig['llmProvider']) || defaultConfig.llmProvider,
    blockForeignApis: process.env.BLOCK_FOREIGN_APIS === 'true' || defaultConfig.blockForeignApis,
    dataResidency: (process.env.DATA_RESIDENCY as CanClawConfig['dataResidency']) || defaultConfig.dataResidency,
    
    // Ollama
    ollamaHost: process.env.OLLAMA_HOST || defaultConfig.ollamaHost,
    ollamaModel: process.env.OLLAMA_MODEL || defaultConfig.ollamaModel,
    
    // Language
    languagePreference: (process.env.LANGUAGE_PREFERENCE as CanClawConfig['languagePreference']) || defaultConfig.languagePreference,
    bilingualMode: process.env.BILINGUAL_MODE === 'true' || defaultConfig.bilingualMode,
    defaultLanguage: (process.env.DEFAULT_LANGUAGE as CanClawConfig['defaultLanguage']) || defaultConfig.defaultLanguage,
    
    // Privacy
    telemetryEnabled: process.env.TELEMETRY_ENABLED === 'true' || defaultConfig.telemetryEnabled,
    analyticsEnabled: process.env.ANALYTICS_ENABLED === 'true' || defaultConfig.analyticsEnabled,
    crashReportsEnabled: process.env.CRASH_REPORTS_ENABLED === 'true' || defaultConfig.crashReportsEnabled,
    memoryBackend: (process.env.MEMORY_BACKEND as CanClawConfig['memoryBackend']) || defaultConfig.memoryBackend,
    memoryPath: process.env.MEMORY_PATH || defaultConfig.memoryPath,
    
    // Security
    sandboxEnabled: process.env.SANDBOX_ENABLED === 'true' || defaultConfig.sandboxEnabled,
    toolPermissions: (process.env.TOOL_PERMISSIONS as CanClawConfig['toolPermissions']) || defaultConfig.toolPermissions,
    restrictedTools: (process.env.RESTRICTED_TOOLS || defaultConfig.restrictedTools.join(',')).split(','),
    
    // Canadian Features
    canadianSpelling: process.env.CANADIAN_SPELLING === 'true' || defaultConfig.canadianSpelling,
    metricSystem: process.env.METRIC_SYSTEM === 'true' || defaultConfig.metricSystem,
    weatherProvider: (process.env.WEATHER_PROVIDER as CanClawConfig['weatherProvider']) || defaultConfig.weatherProvider,
    governmentServicesEnabled: process.env.GOVERNMENT_SERVICES_ENABLED === 'true' || defaultConfig.governmentServicesEnabled,
    
    // Advanced
    logLevel: (process.env.LOG_LEVEL as CanClawConfig['logLevel']) || defaultConfig.logLevel,
    debugMode: process.env.DEBUG_MODE === 'true' || defaultConfig.debugMode,
    maxTokens: parseInt(process.env.MAX_TOKENS || '4096', 10),
    temperature: parseFloat(process.env.TEMPERATURE || '0.7'),
    contextWindow: parseInt(process.env.CONTEXT_WINDOW || '8192', 10),
    
    // System
    nodeEnv: (process.env.NODE_ENV as CanClawConfig['nodeEnv']) || defaultConfig.nodeEnv,
    port: parseInt(process.env.PORT || '3000', 10),
    host: process.env.HOST || defaultConfig.host,
  };
}

/**
 * Validate configuration for sovereignty compliance
 */
export function validateSovereignty(config: CanClawConfig): {
  isCompliant: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  // Check for foreign APIs
  if (config.llmProvider === 'openai' || config.llmProvider === 'anthropic') {
    if (config.blockForeignApis) {
      errors.push(`Foreign API (${config.llmProvider}) is blocked but configured as provider`);
    } else {
      warnings.push(`Using foreign API (${config.llmProvider}) - data may leave Canada`);
    }
  }
  
  // Check data residency
  if (config.dataResidency !== 'CA') {
    warnings.push(`Data residency set to ${config.dataResidency} - may not comply with PIPEDA`);
  }
  
  // Check telemetry
  if (config.telemetryEnabled) {
    warnings.push('Telemetry is enabled - some data may be collected');
  }
  
  // Check memory backend
  if (config.memoryBackend !== 'local') {
    warnings.push(`Memory backend is ${config.memoryBackend} - local is recommended for sovereignty`);
  }
  
  return {
    isCompliant: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * Check if foreign APIs are allowed
 */
export function isForeignApiAllowed(config: CanClawConfig, api: string): boolean {
  if (config.blockForeignApis) {
    const foreignApis = ['openai', 'anthropic', 'google', 'azure'];
    if (foreignApis.includes(api.toLowerCase())) {
      return false;
    }
  }
  return true;
}

/**
 * Get recommended models for Canadian use
 */
export const canadianRecommendedModels = {
  ollama: [
    {
      name: 'qwen3:8b',
      description: 'Strong multilingual model, excellent for English/French',
      pullCommand: 'ollama pull qwen3:8b',
      canadianFriendly: true,
    },
    {
      name: 'llama3.1:8b',
      description: "Meta's latest model, powerful and efficient",
      pullCommand: 'ollama pull llama3.1:8b',
      canadianFriendly: true,
    },
    {
      name: 'aya-expanse',
      description: "Cohere's multilingual model (Canadian company)",
      pullCommand: 'ollama pull aya-expanse',
      canadianFriendly: true,
    },
    {
      name: 'gemma3:4b',
      description: "Google's lightweight open model",
      pullCommand: 'ollama pull gemma3:4b',
      canadianFriendly: true,
    },
    {
      name: 'mistral-nemo',
      description: "Mistral's efficient multilingual model",
      pullCommand: 'ollama pull mistral-nemo',
      canadianFriendly: true,
    },
  ],
  canadian: [
    {
      provider: 'cohere',
      model: 'command',
      description: 'Cohere (Canadian company) - respects data sovereignty',
      requiresApiKey: true,
    },
  ],
};

export const config = loadConfig();
export default config;
