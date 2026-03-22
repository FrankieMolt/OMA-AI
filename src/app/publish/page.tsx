'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import Link from 'next/link';
import {
  Plus,
  Trash2,
  Save,
  ArrowRight,
  Zap,
  DollarSign,
  Shield,
  Info,
} from 'lucide-react';

interface MCPTool {
  name: string;
  description: string;
  pricing_usdc: number;
}

export default function PublishPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Step 1: Basic Info
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');

  // Step 2: MCP Configuration
  const [mcpEndpoint, setMcpEndpoint] = useState('');
  const [transport, setTransport] = useState('sse');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [documentationUrl, setDocumentationUrl] = useState('');

  // Step 3: Tools
  const [tools, setTools] = useState<MCPTool[]>([{ name: '', description: '', pricing_usdc: 0 }]);

  // Step 4: Pricing
  const [globalPricingUsdc, setGlobalPricingUsdc] = useState(0.001);
  const [x402Enabled, setX402Enabled] = useState(true);

  const categories = [
    'data',
    'ai',
    'dev',
    'finance',
    'search',
    'storage',
    'security',
    'communication',
    'utility',
    'other',
  ];

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  useEffect(() => {
    if (name && !slug) {
      setSlug(generateSlug(name));
    }
  }, [name, slug]);

  const addTool = () => {
    setTools([...tools, { name: '', description: '', pricing_usdc: globalPricingUsdc }]);
  };

  const updateTool = (index: number, field: keyof MCPTool, value: string | number) => {
    const newTools = tools.map((tool, i) => i === index ? { ...tool, [field]: value } : tool);
    setTools(newTools);
  };

  const removeTool = (index: number) => {
    const newTools = tools.filter((_, i) => i !== index);
    setTools(newTools);
  };

  const validateStep1 = () => {
    if (!name.trim()) {
      setMessage({ type: 'error', text: 'Name is required' });
      return false;
    }
    if (!slug.trim()) {
      setMessage({ type: 'error', text: 'Slug is required' });
      return false;
    }
    if (!category) {
      setMessage({ type: 'error', text: 'Category is required' });
      return false;
    }
    if (!description.trim()) {
      setMessage({ type: 'error', text: 'Short description is required' });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!mcpEndpoint.trim()) {
      setMessage({ type: 'error', text: 'MCP endpoint is required' });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const validTools = tools.filter(t => t.name.trim());
    if (validTools.length === 0) {
      setMessage({ type: 'error', text: 'At least one tool is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage({ type: 'error', text: 'Please login to publish' });
        return;
      }

      const mcpData = {
        name,
        slug,
        category,
        description,
        long_description: longDescription,
        mcp_endpoint: mcpEndpoint,
        transport,
        repository_url: repositoryUrl,
        documentation_url: documentationUrl,
        author: user.user_metadata?.name || user.email,
        pricing_usdc: globalPricingUsdc,
        x402_enabled: x402Enabled,
        tools: tools.filter(t => t.name.trim()),
      };

      const response = await fetch('/api/mcp/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mcpData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'MCP submitted for review!' });
        setStep(5); // Success step
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to submit MCP' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setMessage({ type: '', text: '' });

    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;

    if (step === 4) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              OMA-AI
            </Link>
            <div className="flex items-center gap-4">
              <WalletConnect />
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-4xl py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Publish MCP</h1>
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'error'
                ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                : 'bg-green-500/10 border border-green-500/20 text-green-400'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Progress Steps */}
        {step < 5 && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className="flex items-center"
                  style={{ flex: 1 }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      s <= step
                        ? 'bg-violet-600 text-white'
                        : 'bg-zinc-800 text-gray-400'
                    }`}
                  >
                    {s < step ? '✓' : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        s < step ? 'bg-violet-600' : 'bg-zinc-800'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={step >= 1 ? 'text-white' : 'text-gray-400'}>Basic Info</span>
              <span className={step >= 2 ? 'text-white' : 'text-gray-400'}>Config</span>
              <span className={step >= 3 ? 'text-white' : 'text-gray-400'}>Tools</span>
              <span className={step >= 4 ? 'text-white' : 'text-gray-400'}>Pricing</span>
            </div>
          </div>
        )}

        {/* Step Content */}
        {step === 1 && (
          <Step1
            name={name}
            setName={setName}
            slug={slug}
            setSlug={setSlug}
            category={category}
            setCategory={setCategory}
            description={description}
            setDescription={setDescription}
            longDescription={longDescription}
            setLongDescription={setLongDescription}
            categories={categories}
          />
        )}

        {step === 2 && (
          <Step2
            mcpEndpoint={mcpEndpoint}
            setMcpEndpoint={setMcpEndpoint}
            transport={transport}
            setTransport={setTransport}
            repositoryUrl={repositoryUrl}
            setRepositoryUrl={setRepositoryUrl}
            documentationUrl={documentationUrl}
            setDocumentationUrl={setDocumentationUrl}
          />
        )}

        {step === 3 && (
          <Step3
            tools={tools}
            updateTool={updateTool}
            addTool={addTool}
            removeTool={removeTool}
            globalPricing={globalPricingUsdc}
          />
        )}

        {step === 4 && (
          <Step4
            globalPricingUsdc={globalPricingUsdc}
            setGlobalPricingUsdc={setGlobalPricingUsdc}
            x402Enabled={x402Enabled}
            setX402Enabled={setX402Enabled}
          />
        )}

        {step === 5 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
              <Zap className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">MCP Submitted!</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Your MCP has been submitted for review. We'll verify it and make it live in the marketplace.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 5 && step > 1 && (
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Submitting...' : step === 4 ? 'Submit MCP' : 'Next'}
              {step < 4 && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Step1({
  name,
  setName,
  slug,
  setSlug,
  category,
  setCategory,
  description,
  setDescription,
  longDescription,
  setLongDescription,
  categories,
}: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
        <p className="text-gray-400">Tell us about your MCP</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">MCP Name *</label>
          <input
            type="text"
            placeholder="My Awesome MCP"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Slug *</label>
          <input
            type="text"
            placeholder="my-awesome-mcp"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono"
          />
          <p className="mt-1 text-sm text-gray-400">URL-friendly identifier (auto-generated from name)</p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
          >
            <option value="">Select category</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Short Description *</label>
          <input
            type="text"
            placeholder="A brief description (1-2 sentences)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500"
          />
          <p className="mt-1 text-sm text-gray-400">
            {description.length} / 200 characters
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Long Description</label>
          <textarea
            placeholder="Detailed description of your MCP, features, and use cases..."
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}

function Step2({
  mcpEndpoint,
  setMcpEndpoint,
  transport,
  setTransport,
  repositoryUrl,
  setRepositoryUrl,
  documentationUrl,
  setDocumentationUrl,
}: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">MCP Configuration</h2>
        <p className="text-gray-400">Set up your MCP endpoint and connections</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">MCP Endpoint *</label>
          <input
            type="url"
            placeholder="https://your-domain.com/mcp/sse"
            value={mcpEndpoint}
            onChange={(e) => setMcpEndpoint(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono"
          />
          <p className="mt-1 text-sm text-gray-400">
            The URL where your MCP server is running
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Transport Protocol *</label>
          <select
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-violet-500"
          >
            <option value="sse">SSE (Server-Sent Events)</option>
            <option value="stdio">Stdio (Local Development)</option>
            <option value="websocket">WebSocket (Real-time)</option>
          </select>
          <p className="mt-1 text-sm text-gray-400">
            Most MCPs use SSE for production
          </p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Repository URL</label>
          <input
            type="url"
            placeholder="https://github.com/your-username/mcp"
            value={repositoryUrl}
            onChange={(e) => setRepositoryUrl(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono"
          />
          <p className="mt-1 text-sm text-gray-400">GitHub or GitLab repository link</p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Documentation URL</label>
          <input
            type="url"
            placeholder="https://your-docs.com"
            value={documentationUrl}
            onChange={(e) => setDocumentationUrl(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono"
          />
          <p className="mt-1 text-sm text-gray-400">Documentation or README link</p>
        </div>
      </div>
    </div>
  );
}

function Step3({
  tools,
  updateTool,
  addTool,
  removeTool,
  globalPricing,
}: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Define Tools</h2>
        <p className="text-gray-400">Add the tools your MCP provides</p>
      </div>

      <div className="space-y-4">
        {tools.map((tool: MCPTool, index: number) => (
          <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Tool {index + 1}</h3>
              {tools.length > 1 && (
                <button
                  onClick={() => removeTool(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">Tool Name *</label>
                <input
                  type="text"
                  placeholder="my_tool"
                  value={tool.name}
                  onChange={(e) => updateTool(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">Description</label>
                <input
                  type="text"
                  placeholder="What this tool does"
                  value={tool.description}
                  onChange={(e) => updateTool(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">
                  Price per Call (USDC)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  placeholder="0.001"
                  value={tool.pricing_usdc}
                  onChange={(e) => updateTool(index, 'pricing_usdc', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addTool}
        className="w-full p-4 border-2 border-dashed border-zinc-700 rounded-lg text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add Another Tool
      </button>
    </div>
  );
}

function Step4({
  globalPricingUsdc,
  setGlobalPricingUsdc,
  x402Enabled,
  setX402Enabled,
}: any) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Pricing & Payments</h2>
        <p className="text-gray-400">Set up pricing and payment options</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <label className="block text-sm font-bold text-gray-300">Global Pricing (USDC)</label>
          </div>
          <input
            type="number"
            step="0.0001"
            min="0"
            placeholder="0.001"
            value={globalPricingUsdc}
            onChange={(e) => setGlobalPricingUsdc(parseFloat(e.target.value))}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono"
          />
          <p className="mt-2 text-sm text-gray-400">
            Default price per API call. Individual tools can override this.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-violet-400" />
              <div>
                <label className="block text-sm font-bold text-gray-300">Enable x402 Payments</label>
                <p className="text-xs text-gray-400">Gasless microtransactions via x402 protocol</p>
              </div>
            </div>
            <button
              onClick={() => setX402Enabled(!x402Enabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                x402Enabled ? 'bg-violet-600' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  x402Enabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {x402Enabled && (
            <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-violet-200 mb-2">
                    x402 Payment Flow:
                  </p>
                  <ul className="text-sm text-violet-300 space-y-1 list-disc list-inside">
                    <li>5% OMA platform fee</li>
                    <li>95% developer payout</li>
                    <li>Monthly USDC payouts</li>
                    <li>Gasless transactions on Base</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Base Price</span>
            <span className="text-white font-mono">${globalPricingUsdc.toFixed(4)} USDC/call</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">x402 Enabled</span>
            <span className={x402Enabled ? 'text-green-400' : 'text-gray-400'}>
              {x402Enabled ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
