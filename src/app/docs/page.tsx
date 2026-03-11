import { Metadata } from 'next';
import { 
  Book, 
  Terminal, 
  Shield, 
  Coins, 
  Code, 
  ArrowRight, 
  ChevronRight 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documentation | OMA-AI',
  description: 'Technical documentation for the Agentic Web and x402 protocol.'
};

const sections = [
  {
    id: 'intro',
    title: 'Introduction',
    icon: Book,
    content: 'OMA-AI (Open Market Access) is the first infrastructure layer built specifically for the machine-to-machine economy. We provide autonomous AI agents with the tools they need to discover, pay for, and consume compute resources.'
  },
  {
    id: 'x402',
    title: 'x402 Protocol',
    icon: Coins,
    content: 'The x402 protocol is a standard for machine-readable payments. It leverages the HTTP 402 status code to trigger autonomous wallet settlement using EIP-3009 gasless transfers on the Base network.'
  },
  {
    id: 'mcp',
    title: 'Model Context Protocol',
    icon: Terminal,
    content: 'All OMA-AI services are accessible via MCP. This allows agents to natively "plug in" to our inference clusters, system automation tools, and on-chain execution engines without custom API wrappers.'
  },
  {
    id: 'security',
    title: 'Security & ZDR',
    icon: Shield,
    content: 'We enforce Zero Data Retention (ZDR) on all private models. No logs are stored, and all inference is conducted in isolated sovereign clusters to ensure agentic privacy.'
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block space-y-8 sticky top-24 h-fit">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4">Core Concepts</h3>
              <nav className="flex flex-col gap-2">
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 text-sm font-bold text-gray-400 hover:text-primary transition-colors">
                    <s.icon className="w-4 h-4" />
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-4">API Reference</h3>
              <nav className="flex flex-col gap-2 font-mono text-xs">
                <span className="text-gray-600">GET /api/v1/inference</span>
                <span className="text-gray-600">POST /api/v1/payment</span>
                <span className="text-gray-600">GET /api/v1/models</span>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-24">
            <header>
              <h1 className="text-6xl font-black mb-6 tracking-tighter uppercase italic text-white">Technical Wiki</h1>
              <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                The definitive guide to building, deploying, and monetizing autonomous agents on the OMA-AI infrastructure.
              </p>
            </header>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-lg shadow-primary/10">
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-black tracking-tight uppercase text-white">{section.title}</h2>
                </div>
                <div className="bg-zinc-900/50 rounded-[2rem] border border-white/5 p-10 backdrop-blur-xl">
                  <p className="text-lg text-gray-400 font-medium leading-relaxed mb-8">
                    {section.content}
                  </p>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
                    Read deep dive
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            ))}

            {/* Quick Actions */}
            <section className="grid md:grid-cols-2 gap-6 pt-12 border-t border-white/5">
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 group hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <Terminal className="w-8 h-8 text-primary" />
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-black mb-2 uppercase text-white">CLI Quickstart</h4>
                <p className="text-sm text-gray-500 font-medium">Initialize your first agent node in less than 60 seconds.</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 group hover:border-emerald-500/50 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <Code className="w-8 h-8 text-emerald-400" />
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-black mb-2 uppercase text-white">Protocol Specs</h4>
                <p className="text-sm text-gray-500 font-medium">Implement x402 handlers in your own applications.</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
