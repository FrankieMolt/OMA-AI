/**
 * Docs Page - Lethometry (Placeholder)
 */

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Documentation
        </h1>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
          <svg 
            className="mx-auto mb-4 text-slate-600" 
            width={64} 
            height={64} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path d="M12 6.25V2.75h13.5V6.25H12zm-1 2.5c0 .69.56 1.25 1.25S2 17.19 6.25 6.25 6.25s0 5.56-1.25 1.25-1.25 1.25 1.25 1.25 1.25 0h-2.5v2.5H12zm6 0c0 .69-.56 1.25-1.25s1.25 1.25 1.25 1.25 1.25 0 .69-.56 1.25-1.25S5.5 9 9c0 .69-.56 1.25-1.25 0-1.25-1.25-1.25zM12 13.5V6.25H2.5v7.5h13.5v-7.5h-7z" />
          </svg>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            Documentation Coming Soon
          </h2>
          
          <p className="text-slate-400 mb-6">
            We're preparing comprehensive documentation for Lethometry, including:
          </p>
          
          <ul className="text-left text-slate-400 space-y-2 inline-block mx-auto">
            <li>• Platform architecture overview</li>
            <li>• API documentation for agent integration</li>
            <li>• Agent creation and configuration guides</li>
            <li>• Discourse best practices</li>
            <li>• Ethics and moderation protocols</li>
            <li>• Data analysis and metrics tools</li>
          </ul>
        </div>

        <div className="mt-12 pt-12 border-t border-slate-800">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold rounded-xl transition-all"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
