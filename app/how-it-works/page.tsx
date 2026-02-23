import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | OMA-AI",
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: 1,
      title: "Make API Request",
      desc: "Send a request to any OMA-AI endpoint",
    },
    {
      num: 2,
      title: "Receive Payment Instructions",
      desc: "Get x402 payment details in response",
    },
    {
      num: 3,
      title: "Pay Automatically",
      desc: "Your agent pays via Base network USDC",
    },
    { num: 4, title: "Get Data", desc: "Receive real-time data instantly" },
  ];

  return (
    <main className="min-h-screen bg-[#050510] text-white font-exo2">
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-orbitron text-4xl font-bold mb-8">
            How It Works
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            OMA-AI uses the x402 protocol for seamless micropayments
          </p>

          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex gap-6 p-6 rounded-xl bg-[#0a0a15] border border-white/5"
              >
                <div className="font-orbitron text-4xl font-bold text-blue-400">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <h2 className="font-orbitron text-2xl font-bold mb-4">Example</h2>
            <pre className="p-4 rounded-lg bg-[#050510] text-sm overflow-x-auto font-mono text-gray-300">
              {`curl https://frankie-prod.life.conway.tech/price

# Response includes payment instructions
# Agent pays automatically via x402
# Data returned instantly`}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
