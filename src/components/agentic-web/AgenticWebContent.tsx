"use client";

import { motion } from 'framer-motion';
import { Brain, Network, Wallet, Zap, ArrowRight, Code2, Bot, Globe } from 'lucide-react';

export default function AgenticWebContent() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Agentic Web
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              AI doesn't have to wait for your input anymore. Agents can navigate, interact, and complete complex tasks independently.
            </p>
          </motion.div>

          {/* Key Concepts */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Network className="w-8 h-8" />,
                title: "Autonomous Navigation",
                description: "Agents browse websites, fill forms, and interact with services without human guidance."
              },
              {
                icon: <Wallet className="w-8 h-8" />,
                title: "Smart Transactions",
                description: "Execute payments, sign contracts, and handle financial decisions autonomously."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Continuous Learning",
                description: "Learn from outcomes, adapt strategies, and improve over time."
              }
            ].map((concept, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center mr-4 text-violet-400">
                    {concept.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{concept.title}</h3>
                    <p className="text-sm text-gray-400">{concept.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Code Example */}
          <motion.div
            {...fadeInUp}
            className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-16"
          >
            <div className="flex items-center mb-4">
              <Code2 className="w-5 h-5 text-violet-400 mr-2" />
              <h3 className="text-lg font-semibold">How It Works</h3>
            </div>
            <pre className="text-sm bg-black/50 rounded-lg p-4 overflow-x-auto">
              <code className="text-gray-300">
{`const agent = createAgent({
  tools: [browser, wallet, database],
  goal: "Find the best flight deal and book it",
  maxSteps: 50
});

// Agent autonomously:
// 1. Searches travel sites
// 2. Compares prices
// 3. Makes payment
// 4. Confirms booking`}
              </code>
            </pre>
          </motion.div>

          {/* Use Cases */}
          <motion.div
            {...fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Real-World Examples</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Bot className="w-6 h-6" />,
                  title: "Trading Agent",
                  description: "Monitors markets, executes trades, manages risk - no human needed."
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Research Agent",
                  description: "Surveys sources, synthesizes findings, writes reports automatically."
                }
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center mr-4 text-violet-400">
                      {useCase.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-sm text-gray-400">{useCase.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            {...fadeInUp}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-r from-violet-500/20 to-purple-500/20 backdrop-blur-lg border border-violet-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Build?</h2>
              <p className="text-gray-400 mb-6">Start creating autonomous agents that work for you.</p>
              <button className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-violet-600 hover:to-purple-600 transition-all duration-300 flex items-center mx-auto">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
