'use client';

import { useState } from 'react';

export default function SubmitAPIPage() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    url: '',
    price: '0.01',
    category: 'general',
    owner: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch('/api/apis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', description: '', url: '', price: '0.01', category: 'general', owner: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">List Your API</h1>
        <p className="text-zinc-400 mb-8">Add your x402-enabled API to the marketplace</p>

        {status === 'success' && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-400 rounded-lg p-4 mb-6">
            API submitted successfully! It will appear in the marketplace shortly.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">API Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:border-zinc-700 focus:outline-none"
              placeholder="My Awesome API"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">API URL *</label>
            <input
              type="url"
              required
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:border-zinc-700 focus:outline-none"
              placeholder="https://api.example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:border-zinc-700 focus:outline-none min-h-[100px]"
              placeholder="Describe what your API does..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price per Call ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:border-zinc-700 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:border-zinc-700 focus:outline-none"
              >
                <option value="general">General</option>
                <option value="crypto">Crypto</option>
                <option value="predictions">Predictions</option>
                <option value="ai">AI/ML</option>
                <option value="data">Data</option>
                <option value="tools">Tools</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Name / Organization</label>
            <input
              type="text"
              value={form.owner}
              onChange={(e) => setForm({ ...form, owner: e.target.value })}
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:border-zinc-700 focus:outline-none"
              placeholder="Your name or company"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3 bg-[#22C55E] rounded-lg font-semibold hover:bg-[#16A34A] transition disabled:opacity-50"
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit API'}
          </button>
        </form>
      </div>
    </div>
  );
}
