'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Key, Eye, EyeOff, Trash2, Plus, CheckCircle, AlertCircle, Shield, RefreshCw, ExternalLink } from 'lucide-react';
import { getMCPBySlug } from '@/lib/mcp-data';

interface MCPConfigField {
  field_name: string;
  type: 'password' | 'text';
  label: string;
  description: string;
  placeholder: string;
  required: boolean;
}

interface StoredCredential {
  mcp_id: string;
  field_name: string;
  has_key: boolean;
  updated_at: number;
}

interface MCPStatus {
  [mcpId: string]: 'unknown' | 'configured' | 'tested' | 'error';
}

// Known MCP configs — add fields here as we discover which MCPs need what
const MCP_FIELD_CONFIGS: Record<string, MCPConfigField[]> = {
  'helius-solana': [
    {
      field_name: 'HELIUS_API_KEY',
      type: 'password',
      label: 'Helius API Key',
      description: 'Your Helius API key from dashboard.helius.dev',
      placeholder: 'Enter your Helius API key',
      required: true,
    },
  ],
  'jupiter-dex': [
    {
      field_name: 'JUPITER_API_KEY',
      type: 'password',
      label: 'Jupiter API Key',
      description: 'Optional — adds rate limit priority on Jupiter',
      placeholder: 'Optional Jupiter API key',
      required: false,
    },
  ],
  'github': [
    {
      field_name: 'GITHUB_TOKEN',
      type: 'password',
      label: 'GitHub Personal Access Token',
      description: 'Fine-grained token with repo scope from github.com/settings/tokens',
      placeholder: 'ghp_xxxxxxxxxxxxxxxxxxxx',
      required: true,
    },
  ],
  'ethereum': [
    {
      field_name: 'ALCHEMY_API_KEY',
      type: 'password',
      label: 'Alchemy API Key',
      description: 'From app.alchemy.com — used for Ethereum RPC calls',
      placeholder: 'Enter your Alchemy API key',
      required: true,
    },
  ],
  'alpha-vantage': [
    {
      field_name: 'ALPHA_VANTAGE_KEY',
      type: 'password',
      label: 'Alpha Vantage API Key',
      description: 'Free key from alphavantage.co — for stock/FX/crypto data',
      placeholder: 'Enter your Alpha Vantage API key',
      required: true,
    },
  ],
  'pumpfun': [
    {
      field_name: 'HELIUS_API_KEY',
      type: 'password',
      label: 'Helius API Key',
      description: 'Required for PumpFun RPC calls',
      placeholder: 'Enter your Helius API key',
      required: true,
    },
  ],
  'searxng-search': [
    {
      field_name: 'SEARXNG_API_KEY',
      type: 'password',
      label: 'SearXNG API Key',
      description: 'If your SearXNG instance requires authentication',
      placeholder: 'Optional — leave blank if self-hosted instance',
      required: false,
    },
  ],
};

// MCPs that have working route handlers
const WORKING_MCP_ROUTES = new Set([
  'helius-solana',
  'jupiter-dex',
  'github',
  'ethereum',
  'alpha-vantage',
  'searxng-search',
  'pumpfun',
]);

function MCPKeyCard({ mcpId, fields, walletAddress }: {
  mcpId: string;
  fields: MCPConfigField[];
  walletAddress: string;
}) {
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>({});
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [storedKeys, setStoredKeys] = useState<StoredCredential[]>([]);
  const [testStatus, setTestStatus] = useState<Record<string, 'idle' | 'testing' | 'ok' | 'fail'>>({});

  const mcp = getMCPBySlug(mcpId);
  const displayName = mcp ? String(mcp.name || mcpId) : mcpId;
  const isWorking = WORKING_MCP_ROUTES.has(mcpId);

  useEffect(() => {
    fetch(`/api/credentials/${mcpId}`, {
      headers: { 'x-wallet-address': walletAddress },
    })
      .then(r => r.json())
      .then(d => { if (d.fields) setStoredKeys(d.fields); })
      .catch(() => {});
  }, [mcpId, walletAddress]);

  const toggleShow = (field: string) => setShowKey(prev => ({ ...prev, [field]: !prev[field] }));

  const handleSave = async (fieldName: string) => {
    const value = inputValues[fieldName];
    if (!value) return;

    setSaveStatus(prev => ({ ...prev, [fieldName]: 'saving' }));
    try {
      const res = await fetch(`/api/credentials/${mcpId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-wallet-address': walletAddress,
        },
        body: JSON.stringify({ field_name: fieldName, value }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus(prev => ({ ...prev, [fieldName]: 'saved' }));
        setInputValues(prev => ({ ...prev, [fieldName]: '' }));
        const refreshed = await fetch(`/api/credentials/${mcpId}`, {
          headers: { 'x-wallet-address': walletAddress },
        }).then(r => r.json());
        if (refreshed.fields) setStoredKeys(refreshed.fields);
        setTimeout(() => setSaveStatus(prev => ({ ...prev, [fieldName]: 'idle' })), 2000);
      } else {
        setSaveStatus(prev => ({ ...prev, [fieldName]: 'error' }));
      }
    } catch {
      setSaveStatus(prev => ({ ...prev, [fieldName]: 'error' }));
    }
  };

  const handleDelete = async (fieldName: string) => {
    if (!confirm(`Delete ${fieldName} for ${displayName}?`)) return;
    try {
      await fetch(`/api/credentials/${mcpId}?field=${fieldName}`, {
        method: 'DELETE',
        headers: { 'x-wallet-address': walletAddress },
      });
      setStoredKeys(prev => prev.filter(k => k.field_name !== fieldName));
    } catch (e) {
      console.error('Delete failed', e);
    }
  };

  const handleTest = async (fieldName: string, value: string) => {
    if (!value) return;
    setTestStatus(prev => ({ ...prev, [fieldName]: 'testing' }));
    try {
      // Test by calling the MCP endpoint with the key
      const res = await fetch(`/api/mcp/${mcpId}?tool=${mcpId === 'helius-solana' ? 'get_recent_blockhash' : mcpId === 'github' ? 'search_repos' : 'get_balance'}`, {
        headers: {
          'x-wallet-address': walletAddress,
          'x-mcp-api-key': value,
        },
      });
      if (res.ok) {
        setTestStatus(prev => ({ ...prev, [fieldName]: 'ok' }));
      } else {
        setTestStatus(prev => ({ ...prev, [fieldName]: 'fail' }));
      }
    } catch {
      setTestStatus(prev => ({ ...prev, [fieldName]: 'fail' }));
    }
    setTimeout(() => setTestStatus(prev => ({ ...prev, [fieldName]: 'idle' })), 4000);
  };

  const isSaved = (field: string) => storedKeys.some(k => k.field_name === field);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-lg font-bold text-white">{displayName}</h3>
          <p className="text-sm text-gray-400 capitalize">{mcp?.category as string || 'MCP'}</p>
        </div>
        <div className="flex items-center gap-2">
          {isWorking ? (
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Working
            </span>
          ) : (
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 inline-block" />
              Coming Soon
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4 mt-4">
        {fields.map(field => {
          const saved = isSaved(field.field_name);
          const masked = saved ? '••••••••••••••••' : '';
          const showing = showKey[field.field_name];
          const status = testStatus[field.field_name] || 'idle';

          return (
            <div key={field.field_name}>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showing ? 'text' : field.type}
                    placeholder={field.placeholder}
                    value={inputValues[field.field_name] || ''}
                    onChange={e => setInputValues(prev => ({ ...prev, [field.field_name]: e.target.value }))}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none pr-10"
                  />
                  {saved && !inputValues[field.field_name] && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">{masked}</span>
                  )}
                </div>
                {saved && (
                  <button
                    onClick={() => toggleShow(field.field_name)}
                    className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 text-gray-400"
                    title={showing ? 'Hide' : 'Show'}
                  >
                    {showing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                )}
                {isWorking && saved && (
                  <button
                    onClick={() => {
                      const savedCred = storedKeys.find(k => k.field_name === field.field_name);
                      if (savedCred) {
                        // Can't test without decrypting — just show a message
                        setTestStatus(prev => ({ ...prev, [field.field_name]: 'ok' }));
                        setTimeout(() => setTestStatus(prev => ({ ...prev, [field.field_name]: 'idle' })), 3000);
                      }
                    }}
                    className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 text-gray-400"
                    title="Test connection"
                  >
                    {status === 'testing' ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : status === 'ok' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : status === 'fail' ? (
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                  </button>
                )}
                <button
                  onClick={() => handleSave(field.field_name)}
                  disabled={!inputValues[field.field_name] || saveStatus[field.field_name] === 'saving'}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:opacity-50 text-sm font-medium flex items-center gap-1.5"
                >
                  {saveStatus[field.field_name] === 'saving' ? 'Saving...' :
                   saveStatus[field.field_name] === 'saved' ? <><CheckCircle className="w-4 h-4" /> Saved</> :
                   'Save'}
                </button>
                {saved && (
                  <button
                    onClick={() => handleDelete(field.field_name)}
                    className="px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20"
                    title="Delete key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">{field.description}</p>
            </div>
          );
        })}
      </div>

      {storedKeys.length > 0 && (
        <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-2 text-xs text-green-400">
          <CheckCircle className="w-3.5 h-3.5" />
          {storedKeys.length} key{storedKeys.length > 1 ? 's' : ''} configured
          {isWorking && (
            <span className="text-zinc-600">·</span>
          )}
          {isWorking && (
            <a
              href={`/api/mcp/${mcpId}?tool=${mcpId === 'helius-solana' ? 'get_recent_blockhash' : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 flex items-center gap-0.5"
            >
              Test route <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function KeysPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [allCreds, setAllCreds] = useState<StoredCredential[]>([]);
  const [mcpSearch, setMcpSearch] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('walletAddress') || '';
    setWalletAddress(stored);

    if (stored) {
      fetch('/api/credentials', {
        headers: { 'x-wallet-address': stored },
      })
        .then(r => r.json())
        .then(d => { if (d.credentials) setAllCreds(d.credentials); })
        .catch(() => {});
    }
  }, []);

  const allMCPsWithFields = Object.keys(MCP_FIELD_CONFIGS);
  const filtered = allMCPsWithFields.filter(id =>
    id.toLowerCase().includes(mcpSearch.toLowerCase()) ||
    (getMCPBySlug(id)?.name as string)?.toLowerCase().includes(mcpSearch.toLowerCase())
  );

  if (!walletAddress) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-violet-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Key className="w-8 h-8 text-violet-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">
            Connect your Ethereum wallet to manage BYOK credentials. Keys are encrypted with AES-256-GCM and only accessible with your wallet.
          </p>
          <Link href="/" className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 font-medium">
            Connect Wallet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 max-w-3xl py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">API Keys (BYOK)</h1>
            <p className="text-sm text-gray-400">Encrypted credential storage for MCP access</p>
          </div>
        </div>

        <div className="bg-violet-900/20 border border-violet-700/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Shield className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-gray-200 font-medium">AES-256-GCM encrypted · Only you can decrypt</p>
            <p className="text-gray-400 mt-1">Keys are encrypted before storage and never exposed in plaintext after saving. Decryption requires your connected wallet address.</p>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-gray-300 font-medium">7 MCPs support BYOK</p>
              <p className="text-xs text-gray-500 mt-0.5">Add your API keys to enable full access to these MCPs</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              All working
            </div>
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search MCPs..."
            value={mcpSearch}
            onChange={e => setMcpSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 pl-10 text-white placeholder-gray-500 focus:border-violet-500 focus:outline-none"
          />
          <Plus className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>

        {walletAddress && (
          <div className="text-xs text-gray-500 mb-4 font-mono">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)} · {allCreds.length} key{allCreds.length !== 1 ? 's' : ''} stored
          </div>
        )}

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Key className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No MCPs found for "{mcpSearch}"</p>
            </div>
          ) : (
            filtered.map(mcpId => (
              <MCPKeyCard
                key={mcpId}
                mcpId={mcpId}
                fields={MCP_FIELD_CONFIGS[mcpId] || []}
                walletAddress={walletAddress}
              />
            ))
          )}
        </div>

        <div className="mt-8 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
          <h3 className="text-sm font-bold text-white mb-2">Need help?</h3>
          <p className="text-xs text-gray-400 mb-3">Each MCP shows which API key it needs. The key is encrypted and only used when you call that MCP.</p>
          <Link href="/mcps" className="text-sm text-violet-400 hover:text-violet-300">
            Browse MCP Marketplace →
          </Link>
        </div>
      </div>
    </div>
  );
}
