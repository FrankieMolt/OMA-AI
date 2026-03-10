import OpenRouterContent from '@/components/openrouter/OpenRouterContent';

export const metadata = {
  title: 'OpenRouter Integration - OMA-AI',
  description: 'Access 50+ AI models through one unified API. Automatic cost optimization, model variety, and zero configuration.',
};

export default function OpenRouterPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <OpenRouterContent />
    </main>
  );
}
