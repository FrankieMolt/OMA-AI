'use client';

import { Plus, Trash2 } from 'lucide-react';
import type { MCPTool } from './types';

interface Step3Props {
  tools: MCPTool[];
  updateTool: (index: number, field: keyof MCPTool, value: string | number) => void;
  addTool: () => void;
  removeTool: (index: number) => void;
}

export function Step3({ tools, updateTool, addTool, removeTool }: Step3Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Define Tools</h2>
        <p className="text-gray-400">Add the tools your MCP provides</p>
      </div>

      <div className="space-y-4">
        {tools.map((tool, index) => (
          <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Tool {index + 1}</h3>
              {tools.length > 1 && (
                <button onClick={() => removeTool(index)} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">Tool Name *</label>
                <input aria-label="my_tool" type="text" placeholder="my_tool"
                  value={tool.name} onChange={(e) => updateTool(index, 'name', e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">Description</label>
                <input aria-label="What this tool does" type="text" placeholder="What this tool does"
                  value={tool.description} onChange={(e) => updateTool(index, 'description', e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 text-gray-300">Price per Call (USDC)</label>
                <input aria-label="0.001" type="number" step="0.0001" min="0" placeholder="0.001"
                  value={tool.pricing_usdc} onChange={(e) => updateTool(index, 'pricing_usdc', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 font-mono" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addTool}
        className="w-full p-4 border-2 border-dashed border-zinc-700 rounded-lg text-gray-400 hover:border-violet-500 hover:text-violet-400 transition-colors flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        Add Another Tool
      </button>
    </div>
  );
}
