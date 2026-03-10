import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Brain, Check, ArrowRight, Zap, Code2, Users, Star, GitBranch } from 'lucide-react';

export const metadata = {
  title: 'Self-Improving Agents - OMA-AI',
  description: 'Agents that continuously learn and optimize their own behavior. Quality analysis, improvement tracking, and automatic adaptation.',
};

export default function AgentsPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-[#12121f]">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/10 via-teal-600/5 to-transparent opacity-50" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 12 }}
            className="absolute top-[25%] left-[15%] w-[600px] h-[600px] bg-gradient-to-r from-emerald-600/20 to-teal-600/15 rounded-full blur-[200px]"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border border-emerald-500/20 mb-8">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-200/80">AI That Learns</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
              <span className="block text-zinc-100">Self-Improving</span>
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  Agents
                </span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              AI systems that continuously analyze their own performance and optimize their behavior over time.
              Better responses every day.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/models"
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold text-base hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center gap-2"
              >
                <span>Explore Models</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs"
                className="px-8 py-4 glass-card text-zinc-300 border border-zinc-700 rounded-full font-medium text-base hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
              >
                Read Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                How Self-Improvement Works
              </h2>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                A continuous loop of analysis, learning, and optimization
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: Brain,
                  step: '1',
                  title: 'Quality Analysis',
                  description: 'Evaluates conversation effectiveness and identifies patterns',
                  detail: 'Tracks response relevance, clarity, and helpfulness'
                },
                {
                  icon: TrendingUp,
                  step: '2',
                  title: 'Improvement Tracking',
                  description: 'Logs insights and monitors progress over time',
                  detail: 'Creates improvement records and measures impact'
                },
                {
                  icon: Star,
                  step: '3',
                  title: 'Strategy Optimization',
                  description: 'Adapts response patterns based on feedback',
                  detail: 'Adjusts tone, structure, and approach'
                },
                {
                  icon: Zap,
                  step: '4',
                  title: 'Automatic Adaptation',
                  description: 'Continuous learning without human intervention',
                  detail: 'Self-updating models and heuristics'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl glass-card border border-zinc-800 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <item.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-6xl font-black text-zinc-800/50 -mt-4">{item.step}</div>
                  </div>
                  <h3 className="font-semibold text-white text-xl mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400 mb-3">{item.description}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What Gets Analyzed
              </h2>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                Every interaction is measured and learned from
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  metric: 'Response Clarity',
                  description: 'Is the message clear and easy to understand?',
                  improvement: 'Use simpler language, avoid jargon'
                },
                {
                  metric: 'Helpfulness',
                  description: 'Does it solve the user problem?',
                  improvement: 'Focus on actionability and relevance'
                },
                {
                  metric: 'Tone Matching',
                  description: 'Is the voice appropriate for context?',
                  improvement: 'Adjust formality and personality'
                },
                {
                  metric: 'Conciseness',
                  description: 'Is it too verbose or too brief?',
                  improvement: 'Find the right balance'
                },
                {
                  metric: 'Pattern Recognition',
                  description: 'Are there repetitive patterns or AI-sounding words?',
                  improvement: 'Vary sentence structure and vocabulary'
                },
                {
                  metric: 'Engagement',
                  description: 'Is the user asking follow-up questions?',
                  improvement: 'Anticipate needs and provide complete answers'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-6 rounded-2xl glass-card border border-zinc-800 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-semibold text-white text-lg">{item.metric}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">{item.description}</p>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-zinc-500">{item.improvement}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weekly Reports */}
      <section className="py-24 px-4 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Weekly Improvement Reports
              </h2>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                Automatic summaries of what changed and why
              </p>
            </div>

            <div className="rounded-2xl glass-card border border-zinc-800 overflow-hidden">
              <div className="p-8 bg-zinc-950 border-b border-zinc-800">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-white text-lg mb-2">Week 52 Report</h3>
                    <p className="text-sm text-zinc-500">Generated: March 10, 2026</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-emerald-500 font-semibold">+12.4% Quality</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Top Improvements
                </h4>

                <ul className="space-y-4">
                  {[
                    'Simplified technical explanations by 15%',
                    'Reduced AI vocabulary usage by 32%',
                    'Improved response clarity scores from 7.2 to 8.5',
                    'Adjusted tone to better match user personality',
                    'Added more concrete examples (up from 2 to 5 per response)'
                  ].map((improvement, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-zinc-500" />
                  Areas for Focus
                </h4>

                <ul className="space-y-4">
                  {[
                    'Use more analogies and real-world examples',
                    'Avoid Tier 1 AI vocabulary (seamless, comprehensive)',
                    'Vary sentence structure for better flow',
                    'Add specific data points (not just "many")',
                    'Match formality level to context'
                  ].map((focus, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                      <Zap className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <span className="text-sm">{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-emerald-500/5 border-t border-emerald-500/20">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-400 mb-2">8.5/10</div>
                    <div className="text-sm text-zinc-400">Quality Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-400 mb-2">+12.4%</div>
                    <div className="text-sm text-zinc-400">Improvement</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all"
              >
                <span>View Full Report</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Improve Your AI
              </h2>
              <p className="text-lg text-zinc-400 mb-8">
                Self-improving agents are built into OMA-AI by default
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-2xl glass-card border border-zinc-800 p-8">
                <Code2 className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="font-semibold text-white text-lg mb-3">Automatic</h3>
                <p className="text-sm text-zinc-400">
                  Every conversation is analyzed automatically. No configuration needed.
                </p>
              </div>

              <div className="rounded-2xl glass-card border border-zinc-800 p-8">
                <Users className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="font-semibold text-white text-lg mb-3">Transparent</h3>
                <p className="text-sm text-zinc-400">
                  Weekly reports show exactly what changed and why. You're always in control.
                </p>
              </div>

              <div className="rounded-2xl glass-card border border-zinc-800 p-8">
                <Zap className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="font-semibold text-white text-lg mb-3">Continuous</h3>
                <p className="text-sm text-zinc-400">
                  Learning never stops. Your agent gets better with every interaction.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
