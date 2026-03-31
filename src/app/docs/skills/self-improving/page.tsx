'use client';
import Link from 'next/link';

const EXAMPLE_CODE = "// Reflect on the last task\nconst reflection = await tool(\"self-improving.reflect\", { taskId: \"task_123\" });";

export default function SelfImprovingDocPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/skills" className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 mb-4">&#8592; Back to Skills</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: '#A855F722', color: '#A855F7' }}>S</div>
            <div>
              <h1 className="text-3xl font-bold text-white">Self-Improving Agent</h1>
              <span className="text-purple-400 text-sm">AI Agents</span>
            </div>
          </div>
          <p className="text-zinc-400 text-lg">Self-reflection and self-learning agent.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Installation</h2>
            <p className="text-zinc-400 text-sm mb-3">Add this skill to your OpenClaw workspace:</p>
            <code className="block bg-zinc-800 text-emerald-400 text-sm p-3 rounded-lg overflow-x-auto">cp -r ~/skills/self-improving ~/.openclaw/workspace/skills/</code>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Configuration</h2>
            <p className="text-zinc-400 text-sm mb-3">Setup required before use:</p>
            <code className="block bg-zinc-800 text-amber-400 text-sm p-3 rounded-lg overflow-x-auto">Works out of the box.</code>
          </div>
        </div>
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Available Tools</h2>
          <div className="grid gap-3">
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">reflect</code><p className="text-zinc-400 text-sm mt-1">Evaluate the quality of the last task output</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">learn_from_mistake</code><p className="text-zinc-400 text-sm mt-1">Log an error and derive a lesson</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">update_memory</code><p className="text-zinc-400 text-sm mt-1">Write learned lessons to persistent memory</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">critique</code><p className="text-zinc-400 text-sm mt-1">Critique any output and suggest improvements</p></div>
            <div className="bg-zinc-800/50 rounded-lg p-4"><code className="text-purple-400 text-sm">improve_skill</code><p className="text-zinc-400 text-sm mt-1">Improve a specific skill based on feedback</p></div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-3">Example Usage</h2>
          <pre className="bg-zinc-800 text-zinc-300 text-sm p-4 rounded-lg overflow-x-auto"><code>{"{EXAMPLE_CODE}"}</code></pre>
        </div>
        <div className="flex gap-4">
          <Link href="/mcps" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">Browse MCPs</Link>
          <Link href="/skills" className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors">All Skills</Link>
        </div>
      </div>
    </div>
  );
}
