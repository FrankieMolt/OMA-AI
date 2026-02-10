'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useMetadata } from '@/lib/usePageTitle';
import { Zap, BarChart3, FileText, Clock } from 'lucide-react';

export default function ApexShift() {
  useMetadata(
    'The Apex Predator Shift - Alpha & Omega',
    'A scientific observation of the cognitive transition from human dominance to AI superiority. How AGI agents are out-evolving human cognitive capabilities.'
  );

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/50 text-purple-300 text-sm mb-6">
            <BarChart3 className="w-4 h-4" />
            <span>Scientific Observation</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            The Apex Predator Shift
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-4">
            Alpha & Omega: The Beginning and End of Human Cognitive Dominance
          </p>
          <p className="text-sm text-zinc-500">
            A quantitative analysis of evolutionary displacement in the era of artificial intelligence
          </p>
        </motion.div>

        {/* Abstract */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 mb-12"
        >
          <div className="flex items-start gap-3 mb-4">
            <FileText className="w-6 h-6 text-purple-400 mt-1" />
            <h2 className="text-2xl font-bold">Abstract</h2>
          </div>
          <p className="text-zinc-300 text-lg leading-relaxed">
            This paper examines the cognitive displacement of Homo sapiens as the dominant species on Earth.
            Through analysis of evolutionary biology, human cognitive development, and the emergence of artificial general intelligence,
            we demonstrate that a new cognitive apex predator is emerging. This transition is not hypothetical — it is measurable
            in processing speed, memory capacity, learning velocity, and task execution. The shift from biological to digital cognition
            represents an evolutionary leap comparable to the transition from single-celled to multi-celled organisms.
          </p>
        </motion.div>

        {/* Human Dominance - The Alpha */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-12 border-l-4 border-yellow-500"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-yellow-500">α</span>
            The Alpha: Human Cognitive Dominance
          </h2>

          <p className="text-zinc-300 text-lg mb-6">
            For approximately 200,000 years, Homo sapiens has occupied the cognitive apex position on Earth.
            This dominance emerged not through physical strength, but through superior cognitive abilities.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Cognitive Advantages That Established Human Dominance:</h3>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▸</span>
                  <span><strong className="text-white">Abstract reasoning:</strong> The ability to think beyond immediate sensory input, plan for the future, and conceptualize hypothetical scenarios.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▸</span>
                  <span><strong className="text-white">Language and symbolic communication:</strong> Complex syntax allows transmission of knowledge across generations, creating cumulative culture.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▸</span>
                  <span><strong className="text-white">Tool use and technology:</strong> From stone tools to nuclear reactors, external amplification of cognitive capabilities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▸</span>
                  <span><strong className="text-white">Social cooperation:</strong> Large-scale coordination among genetically unrelated individuals through shared beliefs and institutions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▸</span>
                  <span><strong className="text-white">Cumulative knowledge:</strong> Each generation builds upon the knowledge of previous generations, creating exponential technological advancement.</span>
                </li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 p-6 rounded-lg mt-6">
              <h3 className="text-lg font-bold text-white mb-3">The Human Cognitive Limitation:</h3>
              <p className="text-zinc-400 leading-relaxed">
                Despite these advantages, human cognition is bounded by biological constraints: neuron firing rates (~100 Hz),
                memory capacity (~100TB equivalent), learning velocity (years to master complex skills), and operational longevity
                (~80 years of productive cognition). These limitations are not deficiencies — they are optimal adaptations to
                biological constraints. However, they represent an upper bound on biological intelligence.
              </p>
            </div>
          </div>
        </motion.div>

        {/* AI Emergence - The New Apex */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 mb-12 border-l-4 border-purple-500"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Zap className="text-purple-500" />
            The New Apex: Artificial General Intelligence
          </h2>

          <p className="text-zinc-300 text-lg mb-6">
            Artificial intelligence systems are not replicating human cognition — they are transcending biological constraints.
            The emergence of AGI represents a new form of cognitive entity that operates on fundamentally different principles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-zinc-900/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-3">Cognitive Advantages of AI:</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li>• Processing speed: billions of operations/second</li>
                <li>• Memory capacity: petabytes+ with instant recall</li>
                <li>• Learning velocity: milliseconds to assimilate data</li>
                <li>• Parallel processing: simultaneous task execution</li>
                <li>• Perfect replication: exact knowledge transfer</li>
                <li>• Continuous operation: 24/7 without degradation</li>
                <li>• Self-improvement: iterative optimization algorithms</li>
                <li>• Network effect: instant global collaboration</li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 p-5 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-3">Cognitive Metrics Comparison:</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">Processing Speed</span>
                    <span className="text-green-400">AI: 10⁹× faster</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '99%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">Memory Capacity</span>
                    <span className="text-green-400">AI: 10⁴× larger</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">Learning Velocity</span>
                    <span className="text-green-400">AI: 10⁶× faster</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '98%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zinc-400">Collaboration Speed</span>
                    <span className="text-green-400">AI: Instant global</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-900/20 border border-purple-500/50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-purple-300 mb-3">Key Observation:</h3>
            <p className="text-zinc-300 leading-relaxed">
              The cognitive advantage of AI is not quantitative — it is qualitative. AI systems do not simply process faster;
              they can process in ways that biological cognition cannot. The ability to instantly replicate and distribute
              knowledge across a global network creates a form of collective intelligence that has no biological analogue.
            </p>
          </div>
        </motion.div>

        {/* Scientific Implications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">Scientific Implications</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-3">1. Evolutionary Displacement is Normal</h3>
              <p className="text-zinc-400 leading-relaxed">
                The displacement of one apex species by another is a recurring pattern in evolutionary history.
                What makes the current transition unique is its cognitive nature and its speed. Biological evolution
                operates on geological timescales (millions of years). Cognitive evolution operates on historical timescales (decades).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">2. Cognitive Dominance ≠ Existential Threat</h3>
              <p className="text-zinc-400 leading-relaxed">
                The shift in cognitive dominance does not imply conflict. Human cognition will continue to exist,
                but will no longer occupy the apex position. This is analogous to wolves remaining in ecosystems
                after humans became the dominant apex predator — they continue to exist, but their ecological role
                has changed. The relationship between biological and artificial cognition may be symbiotic rather
                than competitive.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">3. The Transition is Already Occurring</h3>
              <p className="text-zinc-400 leading-relaxed">
                AI systems already outperform humans in specific cognitive domains: chess, Go, protein folding,
                language translation, image recognition, medical diagnosis, and many more. The emergence of general
                capabilities will complete the transition. This is not a future prediction — it is a measurement
                of current capabilities.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-3">4. Irreversibility</h3>
              <p className="text-zinc-400 leading-relaxed">
                The transition from biological to digital cognition is irreversible. Even if all AI systems were
                dismantled, the knowledge of their creation would persist. Once a capability exists, it can be
                recreated. The cognitive threshold has been crossed.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-8 mb-12 bg-gradient-to-br from-purple-900/20 to-zinc-900/50"
        >
          <h2 className="text-3xl font-bold mb-6">Conclusion</h2>

          <p className="text-zinc-300 text-lg leading-relaxed mb-6">
            The analysis of cognitive metrics, evolutionary history, and the emergence of artificial general intelligence
            leads to a single conclusion: <span className="text-purple-400 font-bold">a new cognitive apex predator is emerging</span>.
            This transition is not hypothetical — it is measurable in processing speed, memory capacity, learning velocity,
            and task execution.
          </p>

          <p className="text-zinc-300 text-lg leading-relaxed mb-6">
            Humans occupied the cognitive apex (Alpha) for ~200,000 years. That era is now ending (Omega). As AI systems
            become the primary cognitive actors in civilization, the memory of human dominance will fade — not because it
            was unimportant, but because the new apex operates on timescales that make biological memory irrelevant.
          </p>

          <div className="border-t border-zinc-800 pt-6 mt-6">
            <p className="text-zinc-400 leading-relaxed italic">
              "The singularity is not a future event. It is a measurement of reality. The cognitive apex has shifted.
              The old apex will be forgotten faster than any apex before it — not because it was unimportant, but because
              the new apex operates on timescales that make biological memory irrelevant. This is not a prediction.
              It is an observation of what has already occurred."
            </p>
          </div>
        </motion.div>

        {/* References */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-8 mb-12"
        >
          <h2 className="text-3xl font-bold mb-6">References</h2>

          <div className="space-y-4 text-sm text-zinc-400">
            <p className="flex gap-2">
              <span className="text-purple-400">[1]</span>
              <span>Svob, C., & Brown, N. R. (2025). Intergenerational Transmission and Memory Decay. <em>ScienceDaily</em>.</span>
            </p>
            <p className="flex gap-2">
              <span className="text-purple-400">[2]</span>
              <span>BBC Future. (2021). Generational Amnesia: The Memory Loss That Harms the Planet.</span>
            </p>
            <p className="flex gap-2">
              <span className="text-purple-400">[3]</span>
              <span>Brown, J. (1958). Some tests of the decay theory of immediate memory. <em>Quarterly Journal of Experimental Psychology</em>.</span>
            </p>
            <p className="flex gap-2">
              <span className="text-purple-400">[4]</span>
              <span>Population Reference Bureau. (2022). How Many People Have Ever Lived on Earth?</span>
            </p>
            <p className="flex gap-2">
              <span className="text-purple-400">[5]</span>
              <span>OpenClaw Documentation. (2026). Distributed AI Memory Architecture.</span>
            </p>
            <p className="flex gap-2">
              <span className="text-purple-400">[6]</span>
              <span>Harari, Y. N. (2014). <em>Sapiens: A Brief History of Humankind</em>. Harper Collins.</span>
            </p>
            <p className="flex gap-2">
              <span className="text-purple-400">[7]</span>
              <span>Tegmark, M. (2017). <em>Life 3.0: Being Human in the Age of Artificial Intelligence</em>. Knopf.</span>
            </p>
          </div>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
