import AgenticWebContent from '@/components/agentic-web/AgenticWebContent';

export const metadata = {
  title: 'Agentic Web - OMA-AI',
  description: 'Build autonomous AI agents that can navigate, interact, and complete tasks without human intervention. The future of AI is agentic.',
};

export default function AgenticWebPage() {
  return (
    <main className="min-h-screen bg-[#12121f]">
      <AgenticWebContent />
    </main>
  );
}
