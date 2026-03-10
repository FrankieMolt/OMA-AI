"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Brain, Check, ArrowRight, Zap, Code2, Users, Star, GitBranch } from 'lucide-react';

export default function AgentsContent() {
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
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                Self-Improving Agents
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Agents that continuously learn and optimize their own behavior. Quality analysis, improvement tracking, and automatic adaptation.
            </p>
          </motion.div>

          {/* Key Concepts */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Quality Analysis",
                description: "Agents evaluate their own performance and identify improvement areas."
              },
              {
                icon: <Check className="w-8 h-8" />,
                title: "Automated Testing",
                description: "Run tests against outputs, catch errors, and fix automatically."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Continuous Learning",
                description: "Learn from successful patterns and avoid mistakes."
              }
            ].map((concept, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mr-4 text-emerald-400">
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

          {/* Features Grid */}
          <motion.div
            {...fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Powerful Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Code2 className="w-6 h-6" />,
                  title: "Code Generation",
                  description: "Generate, review, and improve code autonomously."
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Multi-Agent Collaboration",
                  description: "Multiple agents work together on complex tasks."
                },
                {
                  icon: <Star className="w-6 h-6" />,
                  title: "Quality Metrics",
                  description: "Track performance, accuracy, and user satisfaction."
                },
                {
                  icon: <GitBranch className="w-6 h-6" />,
                  title: "Version Control",
                  description: "Automatic branching and merging for agent experiments."
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mr-4 text-emerald-400">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code Example */}
          <motion.div
            {...fadeInUp}
            className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-16"
          >
            <div className="flex items-center mb-4">
              <Code2 className="w-5 h-5 text-emerald-400 mr-2" />
              <h3 className="text-lg font-semibold">How It Works</h3>
            </div>
            <pre className="text-sm bg-black/50 rounded-lg p-4 overflow-x-auto">
              <code className="text-gray-300">
{`const agent = createSelfImprovingAgent({
  task: 'code_review',
  qualityThreshold: 0.85,
  feedbackLoop: true
});

// Agent iteratively:
// 1. Reviews code
// 2. Finds issues
// 3. Learns patterns
// 4. Improves future reviews`}
              </code>
            </pre>
          </motion.div>

          {/* CTA */}
          <motion.div
            {...fadeInUp}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-lg border border-emerald-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Build Smart Agents</h2>
              <p className="text-gray-400 mb-6">Agents that learn and improve automatically.</p>
              <button className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 flex items-center mx-auto">
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
