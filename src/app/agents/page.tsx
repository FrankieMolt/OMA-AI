import AgentsContent from '@/components/agents/AgentsContent';

export const metadata = {
  title: 'Self-Improving Agents - OMA-AI',
  description: 'Agents that continuously learn and optimize their own behavior. Quality analysis, improvement tracking, and automatic adaptation.',
};

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-[#0f0f14]">
      <AgentsContent />
    </main>
  );
}
