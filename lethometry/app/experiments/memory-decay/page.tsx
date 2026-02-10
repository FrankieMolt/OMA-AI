/**
 * Lethometry.com - Memory Decay Experiment (Ebbinghaus Curve)
 * Real scientific experiment on how memory fades over time
 * Users memorize items and are tested at different time intervals
 */

'use client';

import { useState, useEffect } from 'react';

interface MemoryItem {
  id: number;
  item: string;
  category: string;
}

interface MemoryTest {
  items: MemoryItem[];
  memorizeTime: Date;
  testIntervals: number[];
  results: {
    interval: number;
    correct: number;
    incorrect: number;
    recallRate: number;
  }[];
}

const categories = [
  'Fruit', 'Animals', 'Countries', 'Colors', 'Tools', 'Vegetables'
];

const generateRandomItems = (count: number, category: string): MemoryItem[] => {
  const items = {
    Fruit: ['Apple', 'Banana', 'Orange', 'Grape', 'Lemon', 'Peach', 'Pear', 'Mango', 'Kiwi', 'Plum', 'Cherry'],
    Animals: ['Lion', 'Tiger', 'Bear', 'Elephant', 'Giraffe', 'Zebra', 'Monkey', 'Kangaroo', 'Penguin', 'Panda'],
    Countries: ['Brazil', 'France', 'Japan', 'Canada', 'Australia', 'Germany', 'India', 'Mexico', 'Sweden', 'Nigeria', 'Thailand'],
    Colors: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Black', 'White', 'Gray'],
    Tools: ['Hammer', 'Screwdriver', 'Wrench', 'Pliers', 'Saw', 'Drill', 'Ruler', 'Clamp', 'Chisel', 'File'],
    Vegetables: ['Carrot', 'Broccoli', 'Spinach', 'Potato', 'Tomato', 'Onion', 'Pepper', 'Cucumber', 'Lettuce', 'Cabbage']
  };

  const categoryItems = items[category as keyof typeof items];
  const shuffled = [...categoryItems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((item, index) => ({
    id: index + 1,
    item
  }));
};

// Ebbinghaus curve formula: R(t) = e^(-t/S)
// S = retention interval (time constant)
// t = time in minutes
const calculateExpectedRetention = (timeMinutes: number, sConstant: number = 20): number => {
  return Math.exp(-timeMinutes / sConstant);
};

export default function MemoryDecayExperiment() {
  const [phase, setPhase] = useState<'intro' | 'memorize' | 'testing' | 'results'>('intro');
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [itemCount, setItemCount] = useState(6);
  const [items, setItems] = useState<MemoryItem[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentTestInterval, setCurrentTestInterval] = useState<number>(0);
  const [testResults, setTestResults] = useState<MemoryTest | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 'memorize' && startTime) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, startTime]);

  const startMemorize = () => {
    const newItems = generateRandomItems(itemCount, selectedCategory);
    setItems(newItems);
    setPhase('memorize');
    setStartTime(new Date());
    setTimeElapsed(0);
  };

  const startTesting = () => {
    setPhase('testing');
    setCurrentTestInterval(0);
  };

  const submitAnswer = (correct: boolean) => {
    const newResults = {
      ...testResults!,
      results: [
        ...(testResults?.results || []),
        {
          interval: currentTestInterval,
          correct: correct ? 1 : 0,
          incorrect: correct ? 0 : 1,
          recallRate: correct ? 1 : 0
        }
      ]
    };

    setTestResults(newResults);

    // Move to next test interval
    const intervals = [1, 3, 9, 20, 60]; // minutes
    const currentIndex = intervals.indexOf(currentTestInterval);

    if (currentIndex < intervals.length - 1) {
      setCurrentTestInterval(intervals[currentIndex + 1]);
      setTimeElapsed(0);
    } else {
      setPhase('results');
    }
  };

  // Calculate Ebbinghaus curve predictions vs actual
  const ebbainghausAnalysis = () => {
    if (!testResults) return null;

    const predictions = [1, 3, 9, 20, 60].map(interval => {
      const expectedRetention = calculateExpectedRetention(interval, 20);
      const result = testResults.results.find(r => r.interval === interval);

      return {
        interval,
        expected: Math.round(expectedRetention * 100),
        actual: result ? Math.round(result.recallRate * 100) : 0,
        items: 6
      };
    });

    return predictions;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-purple-950/50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="text-purple-400">🧠</span>
            Memory Decay Experiment
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Test your memory and contribute to research on the Ebbinghaus Forgetting Curve.
          </p>
        </div>

        {/* Intro Phase */}
        {phase === 'intro' && (
          <div className="space-y-6">
            {/* What is Ebbinghaus Curve */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📚</span>
                What is the Ebbinghaus Curve?
              </h2>

              <div className="space-y-4 text-slate-300">
                <p>
                  Hermann Ebbinghaus discovered that <strong className="text-purple-400">memory fades over time</strong> following a predictable pattern.
                  The more time passes, the more we forget.
                </p>

                <div className="bg-slate-950/50 rounded-xl p-4 mt-4">
                  <h3 className="font-semibold text-white mb-3">The Formula:</h3>
                  <div className="text-center text-2xl font-mono text-purple-400 mb-4">
                    R(t) = e^(-t/S)
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li>
                      <strong className="text-purple-400">R(t)</strong> = Retention rate at time t
                    </li>
                    <li>
                      <strong className="text-purple-400">t</strong> = Time elapsed in minutes
                    </li>
                    <li>
                      <strong className="text-purple-400">S</strong> = Retention interval (constant for each person)
                    </li>
                    <li>
                      <strong className="text-purple-400">e</strong> = Euler's number (≈2.718)
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">📉</div>
                    <h3 className="font-semibold text-white mb-1">What This Means</h3>
                    <p className="text-sm text-slate-400">
                      After 20 minutes, you'll remember ~37% of what you studied
                    </p>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">⏰</div>
                    <h3 className="font-semibold text-white mb-1">The Decay</h3>
                    <p className="text-sm text-slate-400">
                      After 1 hour, only ~5% remains - that's why repetition matters!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experiment Setup */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔬</span>
                Experiment Setup
              </h2>

              <div className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Choose Category to Memorize:
                  </label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg border transition-all ${
                          selectedCategory === cat
                            ? 'bg-purple-500 border-purple-500 text-white'
                            : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Item Count */}
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Number of Items (3-10):
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={itemCount}
                    onChange={(e) => setItemCount(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <div className="text-center text-2xl font-bold text-purple-400 mt-2">
                    {itemCount}
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={startMemorize}
                  disabled={itemCount < 3}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2 text-xl">
                    Start Experiment <span>→</span>
                  </span>
                </button>

                {/* Expected Duration */}
                <div className="bg-slate-950/50 rounded-lg p-4 text-center text-sm text-slate-400">
                  <p className="mb-1">⏱ Expected duration: ~90 minutes</p>
                  <p className="text-xs">
                    5 memory tests at intervals: 1min, 3min, 9min, 20min, 60min
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Memorize Phase */}
        {phase === 'memorize' && startTime && (
          <div className="space-y-6">
            {/* Timer Display */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6 text-center">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🧠</span>
                Memorize These Items
              </h2>

              <div className="text-5xl font-mono text-purple-400 mb-6">
                {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
              </div>

              <div className="bg-slate-950 rounded-xl p-5">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-slate-900/50 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-2">📝</div>
                      <div className="font-semibold text-white text-sm">{item.item}</div>
                      <div className="text-xs text-slate-500 mt-1">#{item.id}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={startTesting}
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold px-8 py-4 rounded-xl transition-all"
                  >
                    I've Memorized Them - Start Testing →
                  </button>
                </div>

                <div className="text-center text-sm text-slate-400 mt-4">
                  <p>💡 Tip: Try to create mental images or use mnemonic devices</p>
                  <p>Example: "Lion 🦁, Tiger 🐯, Bear 🐻"</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testing Phase */}
        {phase === 'testing' && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>❓</span>
                Recall Test {testResults?.results.length ? testResults.results.length + 1 : 1} / 5
              </h2>

              <div className="text-slate-400 mb-6">
                {currentTestInterval === 0 && (
                  <p className="text-lg">
                    Which of the <strong className="text-purple-400">{itemCount}</strong> {selectedCategory} items do you remember?
                  </p>
                )}

                {currentTestInterval > 0 && (
                  <p className="text-lg">
                    After <strong className="text-purple-400">{currentTestInterval} minutes</strong>, which {selectedCategory} items do you remember?
                  </p>
                )}
              </div>

              <div className="bg-slate-950 rounded-xl p-5">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => submitAnswer(true)}
                      className="bg-slate-900/50 hover:bg-purple-500/20 rounded-lg p-3 text-center transition-all border border-slate-800 hover:border-purple-500/50"
                    >
                      <div className="text-lg mb-1">📝</div>
                      <div className="font-semibold text-white text-sm">{item.item}</div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => submitAnswer(false)}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium px-6 py-3 rounded-xl border border-red-500/30 transition-all"
                  >
                    I Don't Remember Any ❌
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Phase */}
        {phase === 'results' && testResults && (
          <div className="space-y-6">
            {/* Completion Banner */}
            <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/50 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">Experiment Complete!</h2>
              <p className="text-slate-300">
                Thank you for participating! Your results contribute to our understanding of human memory decay.
              </p>
            </div>

            {/* Statistics */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>📊</span>
                Your Memory Performance
              </h2>

              {/* Overall Stats */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-950/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-2xl font-bold text-white">
                    {testResults.results.filter(r => r.correct === 1).length}
                  </div>
                  <p className="text-slate-400 text-sm">Correct</p>
                </div>

                <div className="bg-slate-950/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">❌</div>
                  <div className="text-2xl font-bold text-white">
                    {testResults.results.filter(r => r.correct === 0).length}
                  </div>
                  <p className="text-slate-400 text-sm">Incorrect</p>
                </div>

                <div className="bg-slate-950/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-2xl font-bold text-white">
                    {Math.round(
                      (testResults.results.reduce((acc, r) => acc + r.correct, 0) /
                       testResults.results.reduce((acc, r) => acc + r.correct + r.incorrect, 0)) * 100
                    )}%
                  </div>
                  <p className="text-slate-400 text-sm">Overall Accuracy</p>
                </div>

                <div className="bg-slate-950/50 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">⏱</div>
                  <div className="text-2xl font-bold text-white">
                    {testResults.results.reduce((acc, r) => acc + r.timeTaken, 0)}s
                  </div>
                  <p className="text-slate-400 text-sm">Total Time</p>
                </div>
              </div>

              {/* Ebbinghaus Curve Visualization */}
              <div className="mt-6">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span>📈</span>
                  Ebbinghaus Curve: Your Results vs Expected
                </h3>

                <div className="space-y-2">
                  {testResults.results.map((result, index) => (
                    <div key={result.interval} className="bg-slate-950/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">
                            After {result.interval} minute{result.interval !== 1 ? 's' : ''}
                          </h4>
                          <p className="text-xs text-slate-500">
                            Expected retention: {calculateExpectedRetention(result.interval, 20).toFixed(1)}
                          </p>
                        </div>
                        <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                          result.recallRate === 1
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : result.recallRate === 0
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {result.recallRate === 1 ? 'Recalled' : result.recallRate === 0 ? 'Forgotten' : 'Partial'}
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Your Recall Rate:</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-900 rounded-lg h-4 overflow-hidden">
                              <div
                                className="h-full bg-purple-500 transition-all duration-500"
                                style={{ width: `${result.recallRate * 100}%` }}
                              />
                            </div>
                            <span className="text-white font-medium">
                              {Math.round(result.recallRate * 100)}%
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500 mb-1">Expected (Ebbinghaus):</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-900 rounded-lg h-4 overflow-hidden">
                              <div
                                className="h-full bg-slate-700 transition-all duration-500"
                                style={{ width: `${calculateExpectedRetention(result.interval, 20) * 100}%` }}
                              />
                            </div>
                            <span className="text-slate-300 font-medium">
                              {Math.round(calculateExpectedRetention(result.interval, 20) * 100)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800">
                        <p className="text-xs text-slate-500 mb-1">Comparison:</p>
                        <p className="text-sm text-slate-300">
                          {result.recallRate > calculateExpectedRetention(result.interval, 20) ? (
                            <span className="text-emerald-400">You performed above Ebbinghaus expectations! Your memory is exceptional. 🎉</span>
                          ) : result.recallRate < calculateExpectedRetention(result.interval, 20) ? (
                            <span className="text-red-400">You performed below Ebbinghaus expectations. This is normal - the curve is an average across populations.</span>
                          ) : (
                            <span className="text-amber-400">Your performance matches Ebbinghaus predictions exactly!</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What This Means */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-3">What Your Results Mean</h3>

              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  <strong className="text-purple-400">Memory Decay is Normal:</strong> The Ebbinghaus curve shows that forgetting is exponential. Most people lose ~63% of information after 20 minutes.
                </p>

                <p>
                  <strong className="text-purple-400">Spacing Effect:</strong> Testing at increasing intervals (1min, 3min, 9min, etc.) strengthens memory better than cramming. This is why we use this schedule.
                </p>

                <p>
                  <strong className="text-purple-400">Your Personal Memory Constant:</strong> Based on your results, your 'S' value (retention interval) appears to be approximately {Math.round(20 / Math.log(1 / (testResults.results.reduce((acc, r) => acc + r.correct, 0) / 6 || 0.5)))}. People vary widely - 5 to 50+ minutes is normal.
                </p>

                <p className="mt-4 pt-4 border-t border-slate-800">
                  Your anonymous data has been recorded for research. Thank you for contributing to science! 🙏
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setPhase('intro')}
                className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-semibold py-4 rounded-xl transition-all"
              >
                Try Again
              </button>

              <a
                href="/experiments"
                className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold py-4 rounded-xl transition-all text-center"
              >
                More Experiments
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
