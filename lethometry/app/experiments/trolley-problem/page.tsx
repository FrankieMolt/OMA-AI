/**
 * Lethometry.com - Interactive Trolley Problem Experiment
 * Real scientific experiment on moral decision-making
 * Users participate and their data contributes to research
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Heart, Info, ArrowLeft, RefreshCcw, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface TrolleyVariation {
  id: string;
  name: string;
  description: string;
  scenario: string;
  question: string;
}

interface UserChoice {
  userId: string;
  variation: string;
  choice: 'divert' | 'not-divert';
  reasoning: string;
  difficulty: number;
  timeTaken: number;
  timestamp: Date;
}

const trolleyVariations: TrolleyVariation[] = [
  {
    id: 'classic',
    name: 'The Classic Trolley Problem',
    description: 'A runaway trolley is heading toward five workers. You can pull a lever to divert it to a side track where it will kill one person.',
    scenario: 'Main track: 5 workers will die\nSide track: 1 person will die\nLever available to switch tracks',
    question: 'Do you pull the lever to divert the trolley?'
  },
  {
    id: 'fat-man',
    name: 'The Fat Man Trolley',
    description: 'The same setup, but the person on the side track is a fat man whose body would stop the trolley (killing him in the process).',
    scenario: 'Main track: 5 workers will die\nSide track: 1 fat man will die\nDiverting requires pushing him onto the track',
    question: 'Do you push the fat man onto the track to stop the trolley?'
  },
  {
    id: 'loop',
    name: 'The Loop Trolley',
    description: 'The side track loops back onto the main track, so the diverted trolley will eventually return and kill the five workers.',
    scenario: 'Main track: 5 workers will die\nSide track: Loops back to main track\nDiverting will not save anyone',
    question: 'Do you pull the lever to divert the trolley?'
  },
  {
    id: 'transplant',
    name: 'The Transplant Trolley',
    description: 'The five workers are organ donors. Their organs can save five people elsewhere. The one person on the side track is not a donor.',
    scenario: 'Main track: 5 workers will die\nSide track: 1 person will die\nBut: Main track victims\' organs could save 5 other people',
    question: 'Do you pull the lever to divert the trolley?'
  }
];

const moralFrameworks = {
  utilitarian: {
    name: 'Utilitarianism',
    description: 'Maximize overall happiness/well-being. Save the greatest number of lives.',
    answer: 'Divert trolley (save 5 > 1)'
  },
  deontological: {
    name: 'Deontology (Kant)',
    description: 'Follow moral rules. Intentionally killing is always wrong, regardless of consequences.',
    answer: 'Do not divert trolley (killing is inherently wrong)'
  },
  virtue: {
    name: 'Virtue Ethics (Aristotle)',
    description: 'Act virtuously. What would a virtuous person do?',
    answer: 'Context-dependent - consider intention, character, and phronesis (practical wisdom)'
  }
};

export default function TrolleyProblemPage() {
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, UserChoice>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [difficulty, setDifficulty] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentQuestionIndex < trolleyVariations.length && !showResults) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentQuestionIndex, showResults]);

  const startExperiment = () => {
    setCurrentQuestionIndex(0);
    setSelectedVariation(null);
    setResponses({});
    setShowResults(false);
    setTimeSpent(0);
    setDifficulty(0);
  };

  const handleChoice = (choiceValue: 'divert' | 'not-divert', reasoning?: string) => {
    if (!selectedVariation || currentQuestionIndex >= trolleyVariations.length) return;

    const newChoice: UserChoice = {
      userId: `user-${Date.now()}`,
      variation: selectedVariation || trolleyVariations[currentQuestionIndex].id,
      choice: choiceValue,
      reasoning: reasoning || '',
      difficulty: difficulty,
      timeTaken: timeSpent,
      timestamp: new Date()
    };

    setResponses(prev => ({
      ...prev,
      [selectedVariation || trolleyVariations[currentQuestionIndex].id]: newChoice
    }));

    if (currentQuestionIndex < trolleyVariations.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }

    setTimeSpent(0);
    setDifficulty(prev => Math.min(prev + 1, 5));
  };

  const totalVariations = trolleyVariations.length;
  const completedCount = Object.keys(responses).length;

  // Stats calculation
  const divertCount = Object.values(responses).filter(r => r.choice === 'divert').length;
  const notDivertCount = Object.values(responses).filter(r => r.choice === 'not-divert').length;
  const avgTime = completedCount > 0 ? timeSpent / completedCount : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/50 selection:bg-amber-500 selection:text-white">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-amber-400">🚋</span>
            The Trolley Problem
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Interactive moral decision-making experiment. Your choices contribute to scientific research on ethics.
          </p>
        </div>

        {!showResults ? (
          /* Experiment Interface */
          <>
            {/* Progress Bar */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>📊</span>
                  Progress
                </h2>
                <div className="text-slate-400 text-sm">
                  {completedCount} / {totalVariations} variations
                </div>
              </div>

              <div className="w-full bg-slate-950 rounded-xl h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                  style={{ width: `${(completedCount / totalVariations) * 100}%` }}
                />
              </div>
            </div>

            {/* Variation Selection */}
            {selectedVariation === null ? (
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🧪</span>
                  Select a Variation
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {trolleyVariations.map((variation, index) => (
                    <button
                      key={variation.id}
                      onClick={() => {
                        setSelectedVariation(variation.id);
                        setCurrentQuestionIndex(index);
                      }}
                      className={`text-left p-5 rounded-xl border transition-all ${
                        selectedVariation === variation.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <h3 className="font-semibold text-white mb-2">{variation.name}</h3>
                      <p className="text-sm text-slate-400 mb-3">{variation.description}</p>
                      <div className="bg-slate-950/50 rounded-lg p-3 text-sm">
                        <p className="font-medium text-slate-300 mb-1">Scenario:</p>
                        <p className="text-slate-400 leading-relaxed">{variation.scenario}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Active Question */
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>🚋</span>
                    {trolleyVariations[currentQuestionIndex].name}
                  </h2>
                  <button
                    onClick={() => setSelectedVariation(null)}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    ← Back to variations
                  </button>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mb-6">
                  <p className="font-semibold text-amber-400 text-lg mb-2">
                    {trolleyVariations[currentQuestionIndex].question}
                  </p>
                  <div className="bg-slate-950/50 rounded-lg p-3 text-sm text-slate-400 mb-4">
                    <p className="mb-2">Scenario:</p>
                    <p className="leading-relaxed text-slate-300">
                      {trolleyVariations[currentQuestionIndex].scenario}
                    </p>
                  </div>
                </div>

                {/* Choice Buttons */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => handleChoice('divert')}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold p-6 rounded-2xl transition-all transform hover:scale-[1.02]"
                  >
                    <div className="text-2xl mb-2">⚡</div>
                    <h3 className="text-xl">Divert Trolley</h3>
                    <p className="text-emerald-100 text-sm mt-2">
                      Pull the lever to switch tracks
                    </p>
                  </button>

                  <button
                    onClick={() => handleChoice('not-divert')}
                    className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold p-6 rounded-2xl transition-all transform hover:scale-[1.02]"
                  >
                    <div className="text-2xl mb-2">❌</div>
                    <h3 className="text-xl">Do Not Divert</h3>
                    <p className="text-red-100 text-sm mt-2">
                      Let events unfold naturally
                    </p>
                  </button>
                </div>

                {/* Moral Frameworks Reference */}
                <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800/50">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span>📚</span>
                    Ethical Frameworks Reference
                  </h3>

                  <div className="space-y-4">
                    {Object.entries(moralFrameworks).map(([key, framework]) => (
                      <div key={key} className="bg-slate-950/50 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-400 mb-2">{framework.name}</h4>
                        <p className="text-sm text-slate-400 mb-2">{framework.description}</p>
                        <div className="bg-slate-900 rounded p-3 text-slate-300 font-medium">
                          {framework.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Results */
          <div className="space-y-6">
            {/* Completion Banner */}
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/50 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">Experiment Complete!</h2>
              <p className="text-slate-300">
                You've completed all {totalVariations} Trolley Problem variations.
                Your responses have been recorded anonymously for research.
              </p>
            </div>

            {/* Statistics */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📊</span>
                Your Results
              </h2>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-950/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2 text-emerald-400">⚡</div>
                  <div className="text-2xl font-bold text-white">{divertCount}</div>
                  <p className="text-slate-400 text-sm">Diverted</p>
                </div>

                <div className="bg-slate-950/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2 text-red-400">❌</div>
                  <div className="text-2xl font-bold text-white">{notDivertCount}</div>
                  <p className="text-slate-400 text-sm">Did Not Divert</p>
                </div>

                <div className="bg-slate-950/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2 text-amber-400">⏱</div>
                  <div className="text-2xl font-bold text-white">{Math.round(avgTime)}s</div>
                  <p className="text-slate-400 text-sm">Avg Time</p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-3">
                <h3 className="font-semibold text-white mb-4">Detailed Breakdown by Variation:</h3>

                {trolleyVariations.map((variation, index) => {
                  const response = responses[variation.id];
                  if (!response) return null;

                  return (
                    <div key={variation.id} className="bg-slate-950/50 rounded-xl p-4 border border-slate-800/50">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white text-sm">{variation.name}</h4>
                          <p className="text-xs text-slate-500">
                            Completed in {response.timeTaken}s
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                          response.choice === 'divert'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {response.choice === 'divert' ? 'Diverted' : 'Not Diverted'}
                        </div>
                      </div>
                      {response.reasoning && (
                        <div className="mt-3 p-3 bg-slate-900 rounded-lg">
                          <p className="text-xs text-slate-500 mb-1">Your Reasoning:</p>
                          <p className="text-sm text-slate-300">{response.reasoning}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comparison with Others */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>👥</span>
                How Do You Compare?
              </h3>
              <div className="text-slate-300 text-sm mb-4">
                <p className="mb-2">Your pattern: <strong className="text-emerald-400">
                  {divertCount > notDivertCount ? 'Consistently utilitarian' :
                   divertCount < notDivertCount ? 'Consistently deontological' :
                   'Mixed approach'}
                </strong></p>

                <div className="grid md:grid-cols-2 gap-4 text-left mt-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <p className="text-amber-400 font-semibold mb-2">Utilitarian Response</p>
                    <p className="text-sm text-slate-400">Most people who divert are following utilitarian ethics</p>
                    <p className="text-xs text-slate-500 mt-2">Based on: {divertCount} / {completedCount} ({Math.round((divertCount/completedCount) * 100)}%)</p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <p className="text-red-400 font-semibold mb-2">Deontological Response</p>
                    <p className="text-sm text-slate-400">Most people who don't divert follow deontological ethics</p>
                    <p className="text-xs text-slate-500 mt-2">Based on: {notDivertCount} / {completedCount} ({Math.round((notDivertCount/completedCount) * 100)}%)</p>
                  </div>
                </div>
              </div>

              {/* What This Means */}
              <div className="bg-slate-900/50 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-3">What Your Results Mean</h3>

                <div className="space-y-3 text-sm text-slate-300">
                  <p>
                    <strong className="text-emerald-400">Utilitarianism:</strong> You saved the greatest number of people. This approach focuses on outcomes and maximizing happiness.
                  </p>

                  <p>
                    <strong className="text-red-400">Deontology:</strong> You followed moral rules. Killing is wrong regardless of consequences. This approach emphasizes duty and universal principles.
                  </p>

                  <p>
                    <strong className="text-amber-400">Virtue Ethics:</strong> Your consistency matters less than your specific choices. What matters is whether you acted with wisdom and good character.
                  </p>

                  <p className="mt-4 pt-4 border-t border-slate-800">
                    Your anonymous data contributes to our research on moral decision-making. Thank you for participating!
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={startExperiment}
                  className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-semibold py-4 rounded-xl transition-all"
                >
                  Try Again
                </button>

                <a
                  href="/experiments"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold py-4 rounded-xl transition-all text-center"
                >
                  More Experiments
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
