'use client';


import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import type { MCPTool } from './steps/types';
import { PUBLISH_CATEGORIES } from './steps/types';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { SuccessStep } from './steps/SuccessStep';

export default function PublishClient() {
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

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  useEffect(() => {
    if (name && !slug) setSlug(generateSlug(name));
  }, [name, slug]);

  const addTool = () => setTools((t) => [...t, { name: '', description: '', pricing_usdc: 0 }]);
  const updateTool = (i: number, field: keyof MCPTool, value: string | number) =>
    setTools((t) => t.map((tool, idx) => idx === i ? { ...tool, [field]: value } : tool));
  const removeTool = (i: number) => setTools((t) => t.filter((_, idx) => idx !== i));

  const validateStep1 = () => {
    if (!name.trim()) { setMessage({ type: 'error', text: 'Name is required' }); return false; }
    if (!slug.trim()) { setMessage({ type: 'error', text: 'Slug is required' }); return false; }
    if (!category) { setMessage({ type: 'error', text: 'Category is required' }); return false; }
    if (!description.trim()) { setMessage({ type: 'error', text: 'Description is required' }); return false; }
    return true;
  };

  const validateStep2 = () => {
    if (!mcpEndpoint.trim()) { setMessage({ type: 'error', text: 'MCP endpoint is required' }); return false; }
    if (!mcpEndpoint.startsWith('http')) { setMessage({ type: 'error', text: 'Endpoint must be a valid URL' }); return false; }
    return true;
  };

  const validateStep3 = () => {
    if (tools.some((t) => !t.name.trim())) { setMessage({ type: 'error', text: 'All tools must have a name' }); return false; }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const payload = {
        name, slug, category, description, long_description: longDescription,
        mcp_endpoint: mcpEndpoint, transport, repository_url: repositoryUrl,
        documentation_url: documentationUrl, tools, pricing_usdc: globalPricingUsdc, x402_enabled: x402Enabled,
        status: 'pending', verified: false,
      };
      if (!supabase) return;
      if (!supabase) return;

      const { error } = await supabase.from('mcp_servers').insert(payload);
      if (error) throw error;
      setStep(5);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Failed to submit. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setMessage({ type: '', text: '' });
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    if (step === 4) { handleSubmit(); }
    else { setStep((s) => s + 1); }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">OMA-AI</Link>
            <div className="flex items-center gap-4">
              <WalletConnect />
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">Dashboard</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-4xl py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Publish MCP</h1>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-green-500/10 border border-green-500/20 text-green-400'}`}>
            {message.text}
          </div>
        )}

        {/* Progress Steps */}
        {step < 5 && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center" style={{ flex: 1 }}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${s <= step ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-gray-400'}`}>
                    {s < step ? '✓' : s}
                  </div>
                  {s < 4 && <div className={`h-1 flex-1 mx-2 ${s < step ? 'bg-violet-600' : 'bg-zinc-800'}`} />}
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
            name={name} setName={setName} slug={slug} setSlug={setSlug}
            category={category} setCategory={setCategory}
            description={description} setDescription={setDescription}
            longDescription={longDescription} setLongDescription={setLongDescription}
          />
        )}
        {step === 2 && (
          <Step2
            mcpEndpoint={mcpEndpoint} setMcpEndpoint={setMcpEndpoint}
            transport={transport} setTransport={setTransport}
            repositoryUrl={repositoryUrl} setRepositoryUrl={setRepositoryUrl}
            documentationUrl={documentationUrl} setDocumentationUrl={setDocumentationUrl}
          />
        )}
        {step === 3 && (
          <Step3
            tools={tools} updateTool={updateTool} addTool={addTool} removeTool={removeTool}
          />
        )}
        {step === 4 && (
          <Step4
            globalPricingUsdc={globalPricingUsdc} setGlobalPricingUsdc={setGlobalPricingUsdc}
            x402Enabled={x402Enabled} setX402Enabled={setX402Enabled}
          />
        )}
        {step === 5 && <SuccessStep />}

        {/* Navigation Buttons */}
        {step < 5 && (
          <div className="mt-8 flex justify-end">
            {step > 1 && (
              <button onClick={() => setStep((s) => s - 1)}
                className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors mr-4">
                Previous
              </button>
            )}
            <button onClick={handleNext} disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors">
              {loading ? 'Submitting...' : step === 4 ? 'Submit MCP' : 'Next'}
              {step < 4 && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
