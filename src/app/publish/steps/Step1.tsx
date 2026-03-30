'use client';

import { PUBLISH_CATEGORIES } from './types';

interface Step1Props {
  name: string;
  setName: (v: string) => void;
  slug: string;
  setSlug: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  longDescription: string;
  setLongDescription: (v: string) => void;
}

export function Step1({
  name, setName, slug, setSlug, category, setCategory,
  description, setDescription, longDescription, setLongDescription,
}: Step1Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
        <p className="text-gray-400">Tell us about your MCP</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">MCP Name *</label>
          <input aria-label="My Awesome MCP" type="text" placeholder="My Awesome MCP"
            value={name} onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500" />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Slug *</label>
          <input aria-label="my-awesome-mcp" type="text" placeholder="my-awesome-mcp"
            value={slug} onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono" />
          <p className="mt-1 text-sm text-gray-400">URL-friendly identifier (auto-generated from name)</p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Category *</label>
          <select aria-label="Select category" value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-violet-500">
            <option value="">Select category</option>
            {PUBLISH_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Short Description *</label>
          <input aria-label="A brief description" type="text" placeholder="A brief description (1-2 sentences)"
            value={description} onChange={(e) => setDescription(e.target.value)} maxLength={200}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500" />
          <p className="mt-1 text-sm text-gray-400">{description.length} / 200 characters</p>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Long Description</label>
          <textarea aria-label="Detailed description" placeholder="Detailed description of your MCP, features, and use cases..."
            value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={6}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 resize-none" />
        </div>
      </div>
    </div>
  );
}
