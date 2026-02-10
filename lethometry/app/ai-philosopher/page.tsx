/**
 * Lethometry.com - AI Philosopher Companion
 * Interactive AI chat for philosophical discussions
 * Powered by AI models trained on philosophical texts
 */

'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface PhilosophicalTopic {
  id: string;
  name: string;
  category: string;
  description: string;
  questions: string[];
}

const philosophicalTopics: PhilosophicalTopic[] = [
  {
    id: 'stoicism',
    name: 'Stoicism',
    category: 'Ancient Philosophy',
    description: 'Stoicism teaches that we cannot control external events, only our reactions to them. Focus on virtue, wisdom, and living in accordance with nature.',
    questions: [
      'What does Stoicism teach about suffering?',
      'How can I practice Stoicism in daily life?',
      'What are the four cardinal virtues?',
      'How do Stoics handle emotions?'
    ]
  },
  {
    id: 'buddhism',
    name: 'Buddhism',
    category: 'Eastern Philosophy',
    description: 'Buddhism teaches the Four Noble Truths and the Eightfold Path to end suffering. Focus on mindfulness, compassion, and impermanence.',
    questions: [
      'What is the nature of suffering in Buddhism?',
      'How does mindfulness help?',
      'What does Buddhism teach about attachment?',
      'What is nirvana?'
    ]
  },
  {
    id: 'existentialism',
    name: 'Existentialism',
    category: 'Modern Philosophy',
    description: 'Existentialism emphasizes individual freedom and responsibility. We must create meaning in a meaningless universe through authentic choice.',
    questions: [
      'What does Sartre mean by "existence precedes essence"?',
      'How do we create meaning?',
      'Is life absurd?',
      'What is authentic existence?'
    ]
  },
  {
    id: 'epicureanism',
    name: 'Epicureanism',
    category: 'Ancient Philosophy',
    description: 'Epicureanism teaches that pleasure is the highest good, but defined as absence of pain and mental tranquility, not hedonistic indulgence.',
    questions: [
      'What is true pleasure for Epicureans?',
      'How does Epicureanism differ from hedonism?',
      'What are the three types of desires?',
      'How do we achieve ataraxia (tranquility)?'
    ]
  }
];

const thoughtExperiments = [
  {
    id: 'trolley',
    name: 'The Trolley Problem',
    description: 'A runaway trolley will kill 5 people unless diverted to kill 1. Is it moral to act?',
    variations: ['Classic Trolley', 'Fat Man', 'Loop', 'Transplant']
  },
  {
    id: 'brain-vat',
    name: 'Brain in a Vat',
    description: 'How do you know your experiences are real if they could be simulated?',
    variations: ['The Matrix', 'Descartes\' Evil Demon', 'Simulation Hypothesis']
  },
  {
    id: 'ship-of-theseus',
    name: 'Ship of Theseus',
    description: 'If we replace every part of you, are you still you?',
    variations: ['Replacement Parts', 'Identity Persistence', 'Gradual Replacement']
  },
  {
    id: 'experience-machine',
    name: 'Experience Machine',
    description: 'Would you plug into a machine that gives perfect artificial happiness?',
    variations: ['Nozick\'s Experience Machine', 'Happiness vs Reality', 'Qualia']
  }
];

export default function AIPhilosopherPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to Lethometry\'s AI Philosopher! 🧠\n\nI\'m trained on philosophical texts from Stoicism, Buddhism, Existentialism, Epicureanism, and more. I can help you explore life\'s deepest questions.\n\n**Choose a topic to discuss:**\n- Ancient Philosophy (Stoicism, Epicureanism)\n- Eastern Philosophy (Buddhism, Taoism)\n- Modern Philosophy (Existentialism, Absurdism)\n- Ethics & Morality\n- Thought Experiments\n\nOr just ask me anything philosophical!',
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    // Topic-based responses
    if (lowerInput.includes('stoic') || lowerInput.includes('suffering') || lowerInput.includes('virtue')) {
      return `🏛️ **Stoic Wisdom:**\n\nThe Stoics teach that we cannot control external events - only our judgments about them. As Marcus Aurelius said, "You have power over your mind - not outside events."\n\n**Key Stoic principles:**\n\n1. **The Dichotomy of Control** - Distinguish between what you can and cannot control\n2. **Memento Mori** - Remember death to live fully\n3. **Premeditatio Malorum** - Visualize challenges beforehand\n4. **Amor Fati** - Accept your fate\n\n**Would you like to explore how to practice these daily?**`;
    }

    if (lowerInput.includes('buddh') || lowerInput.includes('suffering') || lowerInput.includes('mindful')) {
      return `☸️ **Buddhist Insight:**\n\nThe Buddha taught that suffering (dukkha) comes from craving and attachment. The Four Noble Truths are:\n\n1. **The Truth of Suffering** - Life involves suffering\n2. **The Truth of Cause** - Craving causes suffering\n3. **The Truth of Cessation** - Suffering can end\n4. **The Truth of the Path** - The Eightfold Path leads to cessation\n\n**The key is mindfulness** - observing thoughts without attachment. When we see impermanence clearly, craving loosens its grip.\n\n**Shall we explore meditation techniques?**`;
    }

    if (lowerInput.includes('existential') || lowerInput.includes('meaning') || lowerInput.includes('absurd')) {
      return `🌌 **Existentialist Perspective:**\n\nJean-Paul Sartre famously declared: "Existence precedes essence." We exist first, then define ourselves through choices.\n\n**The Absurd Condition:**\nCamus argued that life has no inherent meaning, yet we must create meaning anyway. As he wrote in *The Myth of Sisyphus*, "One must imagine Sisyphus happy."\n\n**Authentic Living:**\n\n1. Acknowledge freedom and responsibility\n2. Make choices despite uncertainty\n3. Create your own meaning\n4. Embrace the absurd condition\n\n**What aspect of freedom would you like to explore?**`;
    }

    if (lowerInput.includes('trolley') || lowerInput.includes('moral') || lowerInput.includes('ethics')) {
      return `🚋 **The Trolley Problem:**\n\nThis thought experiment reveals tensions in moral reasoning. Utilitarians argue: save 5 lives > 1 life. Deontologists argue: intentional killing is wrong regardless of consequences.\n\n**Key Variations:**\n\n- **Fat Man Trolley:** Pushing a person vs flipping a switch\n- **Loop Trolley:** Diverting vs creating loop\n- **Transplant Trolley:** Organ harvesting vs inaction\n\n**The deeper question:** Are intentions or consequences more important?\n\n**Try the interactive Trolley Problem simulation!** [Link to simulation]`;
    }

    if (lowerInput.includes('brain') && lowerInput.includes('vat')) {
      return `🧠 **Brain in a Vat:**\n\nRené Descartes asked: How can I know I'm not being deceived by an evil demon? Today we ask: How do I know I'm not in a computer simulation?\n\n**The Simulation Hypothesis:**\nNick Bostrom argues that if civilizations can run simulations, they likely will. And if there are many simulations, we probably are in one.\n\n**The Epistemological Problem:**\nAll experience is potentially simulated. What does "real" even mean?\n\n**This connects to:** Matrix theory, virtual reality, and consciousness studies.\n\n**Want to explore knowledge vs reality more deeply?**`;
    }

    // Default responses for other philosophical questions
    const topics = ['consciousness', 'free will', 'determinism', 'identity', 'ethics', 'morality', 'death', 'life', 'meaning', 'purpose', 'happiness', 'reality', 'truth', 'wisdom', 'love', 'time', 'memory'];

    const relevantTopic = topics.find(topic => lowerInput.includes(topic));

    if (relevantTopic) {
      const responses: { [key: string]: string } = {
        consciousness: `🧠 **Consciousness:**\n\nConsciousness is perhaps philosophy's hardest problem - the "hard problem" of explaining how subjective experience arises from physical processes.\n\n**Key Questions:**\n- What is it like to be you? (Qualia)\n- Can machines be conscious?\n- How does unified experience emerge from distributed neurons?\n\n**Theories to explore:**\n- Integrated Information Theory (Tononi)\n- Global Workspace Theory (Dehaene)\n- Panpsychism (Consciousness is fundamental)\n\n**We're actively studying this at Lethometry!**`,
        'free will': `⚖️ **Free Will vs Determinism:**\n\nIf our brains follow physical laws like planets follow gravity, how can we have free will? Yet we feel free...\n\n**Two Main Views:**\n\n**Libertarianism:** We can make undetermined choices\n- Evidence: Quantum indeterminacy in brain processes\n\n**Compatibilism:** Free will is compatible with determinism\n- Freedom = acting according to your true nature\n\n**Hard Determinism:** Free will is an illusion\n- Evidence: Neuroimaging shows decisions before awareness\n\n\nWhat do you believe? Or would you like to explore the evidence?`,
        determinism: `⚖️ **Determinism:**\n\nDeterminism is the view that all events are determined completely by previously existing causes. Every moment flows inevitably from the one before.\n\n**Types of Determinism:**\n\n1. **Causal Determinism:** Every event has a cause\n2. **Logical Determinism:** All propositions are true or false\n3. **Theological Determinism:** God determines all events\n\n**Implications:**\n- Moral responsibility challenges\n- The illusion of choice\n- Predictability of behavior\n\n**Does this unsettle you or make sense of things?**`,
        identity: `👤 **Personal Identity:**\n\nWhat makes you, you? Is it your body, memories, consciousness, or something else?\n\n**Key Thought Experiments:**\n\n**Ship of Theseus:** Replace every part of a ship - is it the same ship?\n**Teletransporter:** Scan your body, reconstruct elsewhere - are you still you?\n**Mind Upload:** Copy consciousness to computer - are you still human?\n\n**Theories:**\n- **Psychological Continuity:** Overlapping memories\n- **Biological Criterion:** Same organism\n- **Social Criterion:** Recognized by others\n\n**What matters to identity?**`,
        ethics: `⚖️ **Ethics:**\n\nEthics is the study of moral principles that guide human conduct. Different frameworks offer different answers to "What should I do?"\n\n**Major Ethical Theories:**\n\n1. **Utilitarianism** (Bentham/Mill): Maximize happiness for greatest number\n2. **Deontology** (Kant): Follow moral rules/duties\n3. **Virtue Ethics** (Aristotle): Cultivate good character\n4. **Care Ethics** (Gilligan): Focus on relationships and care\n\n5. **Contractarianism** (Rawls): What rules would we choose fairly?\n\n**Each has strengths and blind spots. Which resonates with you?**`,
        morality: `⚖️ **Morality:**\n\nMorality is the differentiation of intentions, decisions, and actions that are deemed right or wrong.\n\n**Sources of Morality:**\n\n- **Evolutionary Psychology:** Altruism, fairness, group cooperation\n- **Cultural Evolution:** Social norms, taboos, traditions\n- **Religious Revelation:** Divine commandments, natural law\n- **Rational Reflection:** Philosophical reasoning, thought experiments\n- **Emotional Intuition:** Empathy, disgust, shame\n\n**The Challenge:**\nCan we find objective moral truths? Or are moral frameworks just human constructions?\n\n**What moral question troubles you?**`,
        death: `💀 **Death and Mortality:**\n\nMortality awareness (memento mori) isn't morbid - it's motivating. It clarifies what matters.\n\n**Perspectives on Death:**\n\n**Stoic:** Death is natural, don't fear what you can't control\n**Epicurean:** Death is nothing to fear - we won't experience it\n**Buddhist:** Impermanence is fundamental - all things pass away\n**Existentialist:** Death gives life meaning - limited time creates urgency\n\n**Memento Mori Practice:**\n- Visualize your death daily\n- What would you regret not doing?\n- Are you spending time on what matters?\n- How do you want to be remembered?\n\n**Does thinking about death make you live differently?**`,
        life: `🌱 **Life and Living:**\n\nWhat makes life worth living? Philosophers have explored this for millennia.\n\n**Life-Affirming Philosophies:**\n\n- **Aristotle:** Eudaimonia - flourishing through virtue\n- **Nietzsche:** Affirm life, overcome nihilism, create values\n- **Camus:** Create meaning in absurd universe\n- **Frankl:** Find meaning through love and work even in suffering\n- **Taoism:** Flow with nature, effortless action, simplicity\n\n**Questions to explore:**\n- What does it mean to live well?\n- Can we find objective purpose?\n- Is happiness the goal or byproduct of living well?\n- How much control do we have over our lives?`,
        meaning: `🎯 **Meaning of Life:**\n\nThe search for meaning is perhaps humanity's deepest philosophical question.\n\n**Views on Meaning:**\n\n- **Objective Meaning:** Life has inherent purpose (given by God/nature)\n- **Subjective Meaning:** We create our own purpose\n- **No Meaning (Nihilism):** Life has no purpose\n- **Absurdism:** No inherent meaning, but we create it anyway\n\n**Creating Meaning:**\n1. **Connection:** Relationships, love, community\n2. **Contribution:** Work that helps others\n3. **Self-Expression:** Art, creativity, authentic living\n4. **Growth:** Learning, overcoming challenges\n\n**What gives your life meaning?**`,
        purpose: `🎯 **Purpose:**\n\nPurpose and meaning are related but distinct. Purpose is often seen as something given or found, while meaning is created.\n\n**Finding Purpose:**\n\n1. **Self-Discovery:** Explore values, strengths, passions\n2. **Alignment:** Align actions with discovered values\n3. **Contribution:** Use strengths to help others\n4. **Flow States:** Seek activities where you lose self in doing\n\n**Questions:**\n- Do you feel called to something specific?\n- Is purpose fixed or evolving?\n- Can purpose change over life?\n- How do you know when you've found it?`,
        happiness: `😊 **Happiness:**\n\nWhat is happiness, and how do we achieve it?\n\n**Happiness Theories:**\n\n1. **Hedonism:** Pleasure is the highest good\n2. **Eudaimonia:** Flourishing through virtue (Aristotle)\n3. **Desire Theory:** Satisfaction of desires (Nietzsche)\n4. **Flow Theory:** Engagement in activity (Csikszentmihalyi)\n\n5. **Gratitude Practice:** Appreciation increases happiness\n\n**The Paradox:**\nPursuing happiness directly often makes us unhappy. Happiness is often a byproduct of living well.\n\n**What makes you truly happy?**`,
        reality: `🌌 **Reality and Perception:**\n\nHow do we know what's real? Our senses filter, interpret, and construct reality.\n\n**Theories of Reality:**\n\n- **Direct Realism:** We perceive world directly (Naive)\n- **Representationalism:** We perceive mental representations\n- **Phenomenalism:** We only perceive phenomena (Kant)\n- **Solipsism:** Only my mind exists\n\n- **Simulation Theory:** Reality is computer-generated\n\n\n**The Hard Question:**\nCan we ever step outside our perception to know reality as it is?\n\n**Want to explore deeper?**`,
        truth: `🔍 **Truth and Knowledge:**\n\nWhat can we know with certainty? Epistemology studies the nature, scope, and limits of human knowledge.\n\n**Theories of Knowledge:**\n\n- **Empiricism:** Knowledge comes from sensory experience (Hume, Locke)\n- **Rationalism:** Knowledge comes from reason (Descartes, Spinoza)\n- **Constructivism:** We construct our own knowledge (Piaget)\n- **Skepticism:** Doubt everything (Pyrrho)\n\n- **Pragmatism:** Truth is what works (James, Dewey)\n\n\n**The Gettier Problem:**\nA belief can be justified and true without being knowledge. What does this mean for certainty?\n\n**What philosophical questions keep you up at night?**`,
        wisdom: `🦉 **Wisdom:**\n\nWisdom isn't just knowledge - it's the skillful application of knowledge to live well.\n\n**Characteristics of Wisdom:**\n\n1. **Deep Understanding:** Sees connections others miss\n2. **Emotional Regulation:** Responds thoughtfully to feelings\n3. **Practical Application:** Guides actions, not just theory\n4. **Perspective Taking:** Understands multiple viewpoints\n5. **Self-Knowledge:** Knows own limitations and biases\n\n**Wisdom vs Intelligence:**\nIntelligence solves problems; wisdom asks the right questions.\n\n**How have you grown wiser recently?**`,
        love: `❤️ **Love and Connection:**\n\nLove is perhaps the most examined emotion in philosophy. What is it, and why does it matter?\n\n**Philosophical Views on Love:**\n\n- **Plato:** Love is ascent to the Forms, especially the Form of Beauty\n- **Aristotle:** Love (philia) ranges from friendship to romantic partnership\n- **The Stoics:** Love wisely - with reason, not blind passion\n- **Existentialists:** Love creates meaning in meaningless universe (Sartre, Beauvoir)\n- **Buddhism:** Metta (loving-kindness) leads to enlightenment\n\n**The Paradox:**\nLove can be simultaneously voluntary (we choose to love) and involuntary (we fall in love). It connects us deeply while making us vulnerable.\n\n**What does love mean to you?**`,
        time: `⏰ **Time and Impermanence:**\n\nTime is perhaps the most fundamental dimension of existence. Philosophers have long debated its nature.\n\n**Theories of Time:**\n\n- **Presentism:** Only the present exists (past is gone, future hasn't happened)\n- **Eternalism:** Past, present, and future all exist equally\n- **Growing Block:** Events come into being and cease existing\n- **A-Theory & B-Theory:** Time flows in one direction\n\n- **Block Universe:** Time doesn't flow globally (relativity)\n\n**Impermanence (Anicca):**\nBuddhism teaches that all conditioned things are impermanent - arising, existing, passing away. Nothing lasts forever.\n\n**Practical Application:**\n\n- Accept change as natural\n- Value the present moment\n- Don't attach to temporary states\n- Practice gratitude for what is\n\n**How does time passing affect your life?**`,
        memory: `🧠 **Memory and Identity:**\n\nOur memories shape who we are, yet memory is famously unreliable and constructive.\n\n**Memory Research Insights:**\n\n1. **Ebbinghaus Forgetting Curve:** We forget exponentially over time\n2. **False Memories:** Our brain can implant memories that never happened\n3. **Reconsolidation:** Each recall changes the memory\n4. **Tip-of-the-Tongue:** We can't recall without cues, but we don't know what's stored\n\n**Implications:**\n- If memory is unreliable, can we trust our life narrative?\n- What would it mean to have perfect memory?\n- How does memory loss affect identity?\n\n**We're conducting memory experiments at Lethometry - join a study!**`
      };

      return responses[relevantTopic] || `This is a fascinating philosophical question! ${relevantTopic} touches on deep issues about existence, knowledge, and meaning.\n\n**Here's my perspective:**\n\nI can explore this from multiple philosophical angles - Stoic, Buddhist, Existentialist, and more. Each offers different insights into what it means to be human.\n\n**Key questions to consider:**\n- What evidence do we have?\n- What assumptions are we making?\n- Are there alternative viewpoints?\n- What are the practical implications?\n\n**Would you like to dive deeper into this topic, or explore something else?**`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-emerald-400">🧠</span>
            AI Philosopher
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Engage in philosophical dialogue with an AI trained on the world's greatest thinkers
          </p>
        </div>

        {/* Main Chat Interface */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Topics */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📚</span>
                Philosophical Topics
              </h2>

              <div className="space-y-3">
                {philosophicalTopics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setInput(`Tell me about ${topic.name}`)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedTopic === topic.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-sm text-white">{topic.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{topic.category}</p>
                      </div>
                      <span className="text-lg">→</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {topic.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800/50">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🧪</span>
                  Thought Experiments
                </h2>

                <div className="space-y-2">
                  {thoughtExperiments.map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => setInput(`Let's explore the ${exp.name}: ${exp.description}`)}
                      className="w-full text-left p-3 rounded-xl border border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900 transition-all"
                    >
                      <div>
                        <h3 className="font-semibold text-sm text-white">{exp.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {exp.variations.length} variations
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          {/* Center Panel - Chat */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6 h-[700px] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4" ref={messagesEndRef}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                          : 'bg-slate-800 text-slate-200'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="text-2xl mb-3">🧠</div>
                      )}
                      <div className="prose prose prose-invert prose-sm">
                        {message.content.split('\n\n').map((paragraph, idx) => {
                          const text = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                          return (
                            <p key={idx} className="mb-2 last:mb-0">
                              {text.split('\n').map((line, lineIdx, arr) => (
                                <React.Fragment key={lineIdx}>
                                  {line}
                                  {arr.length - 1 > lineIdx && <br />}
                                </React.Fragment>
                              ))}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-4">
                    <div className="bg-slate-800 rounded-2xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 border-2 border-emerald-400 border-t-transparent animate-spin rounded-full" />
                        <p className="text-slate-400 text-sm">Philosopher is thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-slate-800/50 pt-4">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Ask anything philosophical..."
                    className="flex-1 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-50"
                  >
                    <span className="flex items-center gap-2">
                      Send <span>→</span>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>

        {/* Footer CTA */}
        <div className="mt-8 text-center bg-slate-900/30 rounded-2xl p-6 border border-slate-800/30">
          <h2 className="text-xl font-bold text-white mb-3">
            🧪 Participate in Real Scientific Experiments
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            Your responses contribute to academic research on mortality, memory, and consciousness
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/experiments/memory"
              className="block bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-500/20 transition-all text-center"
            >
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="font-semibold text-white mb-1">Memory Studies</h3>
              <p className="text-emerald-400 text-sm">Ebbinghaus curve, recall tests, false memories</p>
            </a>
            <a
              href="/experiments/mortality"
              className="block bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-500/20 transition-all text-center"
            >
              <div className="text-3xl mb-2">💀</div>
              <h3 className="font-semibold text-white mb-1">Mortality Awareness</h3>
              <p className="text-emerald-400 text-sm">Life expectancy beliefs, death attitudes</p>
            </a>
            <a
              href="/experiments/consciousness"
              className="block bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 hover:bg-emerald-500/20 transition-all text-center"
            >
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold text-white mb-1">Consciousness</h3>
                <p className="text-emerald-400 text-sm">Qualia, attention blink, self-recognition</p>
              </a>
          </div>
        </div>
      </div>
    </div>
  );
}
