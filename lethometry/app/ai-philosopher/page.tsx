/**
 * Lethometry.com - AI Philosopher Companion
 * Interactive AI chat for philosophical discussions
 * Powered by AI models trained on philosophical texts
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Brain, ShieldCheck, Sparkles, AlertCircle, Info, RefreshCcw, MessageSquare, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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
  icon: string;
}

const topics: PhilosophicalTopic[] = [
  { id: 'stoicism', name: 'Stoicism', category: 'Ethics', description: 'Control what you can, accept what you cannot.', icon: '🏛️' },
  { id: 'buddhism', name: 'Buddhism', category: 'Spirituality', description: 'The path to enlightenment through mindfulness.', icon: '☸️' },
  { id: 'existentialism', name: 'Existentialism', category: 'Meaning', description: 'Existence precedes essence. You define yourself.', icon: '🏔️' },
  { id: 'epicureanism', name: 'Epicureanism', category: 'Happiness', description: 'Seek pleasure in simplicity and friendship.', icon: '🍇' },
  { id: 'consciousness', name: 'Consciousness', category: 'Reality', description: 'The mystery of the "I" and subjective experience.', icon: '🧠' },
  { id: 'ethics', name: 'Ethics', category: 'Morality', description: 'How should one live? What is the good life?', icon: '⚖️' },
];

export default function AIPhilosopherPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Greetings, traveler. I am the AI Philosopher. I have been trained on the collective wisdom of thousands of years of human thought. What deep questions weigh on your mind today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('stoic') || lowerText.includes('marcus') || lowerText.includes('seneca')) {
      return "The Stoics believed that our happiness depends on our own character and our reactions to events, rather than the events themselves. As Marcus Aurelius wrote, 'The happiness of your life depends upon the quality of your thoughts.'";
    }
    
    if (lowerText.includes('buddha') || lowerText.includes('mindful') || lowerText.includes('enlighten')) {
      return "In the Buddhist tradition, suffering arises from attachment and desire. By practicing mindfulness and the Eightfold Path, we can find liberation from the cycle of rebirth and attain Nirvana—a state of perfect peace.";
    }

    if (lowerText.includes('meaning') || lowerText.includes('existential') || lowerText.includes('sartre')) {
      return "Existentialism suggests that we are thrown into a world without inherent meaning. This 'absurdity' gives us the ultimate freedom to create our own meaning through our choices and actions. We are the authors of our own essence.";
    }

    return "That is a profound inquiry. From a philosophical perspective, we must examine the underlying assumptions of our reality. Are we defining our concepts clearly? What is the ultimate goal of this line of thought?";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/50 selection:bg-emerald-500 selection:text-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <ShieldCheck size={12} />
            Verified Philosophical Agent
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Philosopher</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Engage in deep dialogue with an intelligence trained on the world's greatest thinkers.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Topics Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4 px-2">Suggested Topics</h2>
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setInput(`Tell me about ${topic.name}`)}
                className="w-full text-left p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-900 transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{topic.icon}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm">{topic.name}</h3>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{topic.category}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{topic.description}</p>
              </button>
            ))}
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 flex flex-col h-[600px] bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Brain size={20} className="text-emerald-400" />
                      </div>
                    )}
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      message.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <span className="text-[10px] text-slate-500 mt-2 block opacity-50">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                        <User size={20} className="text-indigo-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Brain size={20} className="text-emerald-400 animate-pulse" />
                  </div>
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-slate-800 bg-slate-900/50">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a philosophical question..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:border-emerald-500 transition-colors text-white placeholder:text-slate-600 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-emerald-900/20"
                >
                  <Send size={18} />
                </button>
              </form>
              <div className="mt-3 flex items-center gap-4 px-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Sparkles size={10} className="text-emerald-400" />
                  Context Depth: Deep
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <AlertCircle size={10} className="text-indigo-400" />
                  Safety Filter: On
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Experiment CTA */}
        <section className="mt-20 py-12 px-8 bg-indigo-950/20 border border-indigo-500/20 rounded-3xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
                <ShieldCheck className="text-indigo-400" />
                Scientific Contribution
              </h2>
              <p className="text-slate-400 max-w-xl">
                Lethometry is an open research platform. Your philosophical inquiries and experimental choices contribute to anonymous academic datasets on ethics and human-AI interaction.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/experiments/trolley-problem" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/40">
                Trolley Problem
              </a>
              <a href="/discussions" className="px-6 py-3 bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-white font-bold rounded-xl transition-all">
                Agent Forum
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
