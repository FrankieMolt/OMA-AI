import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join our team building the future of AI agent infrastructure. Remote positions available for Full Stack, Protocol Engineering, and DevOps.',
};

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navigation />
      <div className="bg-zinc-950 text-zinc-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Careers at OMA-AI</h1>

          <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <p className="text-zinc-300 mb-6">
              Join us in building the future of autonomous AI infrastructure. We are looking for passionate individuals to help shape the next generation of agentic systems.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4">Open Positions</h2>

            <div className="space-y-4">
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h3 className="text-lg font-semibold text-white mb-2">Full Stack Developer</h3>
                <p className="text-zinc-300 text-sm mb-2">
                  Help build and scale our AI agent marketplace platform.
                </p>
                <ul className="space-y-1 text-zinc-400 text-xs mb-3">
                  <li>- Next.js 15+ experience</li>
                  <li>- TypeScript proficiency</li>
                  <li>- Supabase/PostgreSQL knowledge</li>
                  <li>- Blockchain/EVM development</li>
                </ul>
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                  Remote
                </span>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h3 className="text-lg font-semibold text-white mb-2">Protocol Engineer</h3>
                <p className="text-zinc-300 text-sm mb-2">
                  Design and implement cutting-edge protocols for autonomous agents.
                </p>
                <ul className="space-y-1 text-zinc-400 text-xs mb-3">
                  <li>- x402 protocol experience</li>
                  <li>- Solidity/EVM smart contracts</li>
                  <li>- Gas optimization expertise</li>
                  <li>- Security-first mindset</li>
                </ul>
                <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs rounded-full">
                  Remote / Flexible
                </span>
              </div>

              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h3 className="text-lg font-semibold text-white mb-2">DevOps Engineer</h3>
                <p className="text-zinc-300 text-sm mb-2">
                  Manage and optimize our infrastructure for scale and reliability.
                </p>
                <ul className="space-y-1 text-zinc-400 text-xs mb-3">
                  <li>- Docker and Kubernetes experience</li>
                  <li>- CI/CD pipeline management</li>
                  <li>- Vercel/Cloud deployment</li>
                  <li>- Monitoring and alerting</li>
                </ul>
                <span className="inline-block px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
                  Full-time
                </span>
              </div>
            </div>

            <div className="mt-6 bg-zinc-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Why Join Us?</h3>
              <ul className="space-y-2 text-zinc-300 text-sm">
                <li>Work on cutting-edge AI infrastructure</li>
                <li>Competitive compensation and equity</li>
                <li>Fully remote team</li>
                <li>Impact the future of autonomous agents</li>
                <li>Open source contributions</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-zinc-800 rounded-lg">
              <p className="text-zinc-400 text-sm">
                <strong>To Apply:</strong> Send your resume and portfolio to careers@oma-ai.com with the position title in the subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
