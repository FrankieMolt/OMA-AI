'use client';

import { useEffect, useState } from 'react';

interface TradingSignal {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL' | 'HOLD';
  entry: number;
  target: number;
  stop: number;
  confidence: number;
  timeframe: string;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  reason: string;
  indicators: {
    rsi?: number;
    macd?: { value: number; signal: number };
    ema?: { short: number; long: number };
  };
  createdAt: string;
  expiresAt: string;
}

interface AIXBTSignal {
  id: string;
  category: string;
  title: string;
  description: string;
  tier: string;
  tierName: string;
  tickers?: string[];
  xHandles?: string[];
  reinforcedAt: string;
  detectedAt: string;
}

interface AIXBTProject {
  id: string;
  name: string;
  ticker: string;
  xHandle?: string;
  chain: string;
  momentumScore: number;
  momentumTrend: 'SURGING' | 'PEAKING' | 'STABLE' | 'DROPPING' | 'CRASHING';
  price: number;
  mcap: string;
  volume24h: string;
  change24h: number;
}

interface SignalsWithAIXBTProps {
  chain?: string;
  limit?: number;
}

export default function SignalsWithAIXBT({ chain = 'solana', limit = 10 }: SignalsWithAIXBTProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    tradingSignals: TradingSignal[];
    aixbtSignals: AIXBTSignal[];
    projects: AIXBTProject[];
    summary: {
      buySignals: number;
      sellSignals: number;
      holdSignals: number;
      avgConfidence: number;
      topMomentumProjects: AIXBTProject[];
    };
    source?: string;
    timestamp?: number;
  } | null>(null);

  useEffect(() => {
    async function fetchSignals() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/aixbt-signals?chain=${chain}&limit=${limit}`);
        const result = await response.json();

        if (result.success) {
          setData(result);
        } else {
          setError(result.note || 'Failed to fetch signals');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchSignals();
  }, [chain, limit]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-gray-600">Loading signals...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const getMomentumTrendColor = (trend: string) => {
    switch (trend) {
      case 'SURGING': return 'text-green-600 bg-green-100';
      case 'PEAKING': return 'text-yellow-600 bg-yellow-100';
      case 'STABLE': return 'text-blue-600 bg-blue-100';
      case 'DROPPING': return 'text-orange-600 bg-orange-100';
      case 'CRASHING': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'bg-green-500';
      case 'MEDIUM': return 'bg-yellow-500';
      case 'HIGH': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'PARTNERSHIP': '🤝',
      'TECH_EVENT': '🚀',
      'TOKEN_ECONOMICS': '💰',
      'WHALE_ACTIVITY': '🐋',
      'ONCHAIN_METRICS': '📊',
      'REGULATORY': '⚖️',
      'RISK_ALERT': '⚠️',
      'TEAM_UPDATE': '👥',
    };
    return icons[category] || '📢';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">📊 Signals Dashboard</h2>
        <p className="text-blue-100">Powered by Trading Bot + AIXBT Market Data</p>
        <div className="mt-4 flex gap-4 text-sm">
          <div>
            <span className="text-blue-200">Source:</span> {data.source}
          </div>
          <div>
            <span className="text-blue-200">Updated:</span>{' '}
            {new Date(data.timestamp || Date.now()).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-3xl font-bold text-green-700">
            {data.summary.buySignals}
          </div>
          <div className="text-green-600 text-sm">Buy Signals</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-3xl font-bold text-red-700">
            {data.summary.sellSignals}
          </div>
          <div className="text-red-600 text-sm">Sell Signals</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="text-3xl font-bold text-gray-700">
            {data.summary.holdSignals}
          </div>
          <div className="text-gray-600 text-sm">Hold Signals</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="text-3xl font-bold text-purple-700">
            {(data.summary.avgConfidence * 100).toFixed(0)}%
          </div>
          <div className="text-purple-600 text-sm">Avg Confidence</div>
        </div>
      </div>

      {/* Top Momentum Projects */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">🚀 Top Momentum Projects</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 text-gray-600">Name</th>
                <th className="text-left py-2 px-3 text-gray-600">Ticker</th>
                <th className="text-right py-2 px-3 text-gray-600">Momentum</th>
                <th className="text-right py-2 px-3 text-gray-600">24h %</th>
                <th className="text-right py-2 px-3 text-gray-600">Price</th>
                <th className="text-right py-2 px-3 text-gray-600">Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.summary.topMomentumProjects.map((project) => (
                <tr key={project.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium">{project.name}</td>
                  <td className="py-3 px-3">{project.ticker}</td>
                  <td className="py-3 px-3 text-right font-bold">
                    {project.momentumScore.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className={`font-bold ${project.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {project.change24h >= 0 ? '+' : ''}{project.change24h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    ${project.price.toFixed(4)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${getMomentumTrendColor(project.momentumTrend)}`}>
                      {project.momentumTrend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trading Signals */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">📈 Trading Signals</h3>
        <div className="space-y-4">
          {data.tradingSignals.map((signal) => (
            <div
              key={signal.id}
              className={`border rounded-lg p-4 ${
                signal.type === 'BUY' ? 'border-green-300 bg-green-50' :
                signal.type === 'SELL' ? 'border-red-300 bg-red-50' :
                'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    signal.type === 'BUY' ? 'bg-green-500 text-white' :
                    signal.type === 'SELL' ? 'bg-red-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {signal.type}
                  </span>
                  <span className="font-bold">{signal.pair}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {new Date(signal.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{signal.reason}</p>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Entry:</span>{' '}
                  <span className="font-bold">${signal.entry.toFixed(4)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Target:</span>{' '}
                  <span className="font-bold text-green-600">${signal.target.toFixed(4)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Stop:</span>{' '}
                  <span className="font-bold text-red-600">${signal.stop.toFixed(4)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Confidence:</span>{' '}
                  <span className="font-bold">{(signal.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>
              <div className="mt-2 flex gap-4 text-sm">
                <span>
                  <span className="text-gray-600">RSI:</span>{' '}
                  <span className="font-bold">{signal.indicators.rsi?.toFixed(1) || 'N/A'}</span>
                </span>
                <span>
                  <span className="text-gray-600">Timeframe:</span>{' '}
                  <span className="font-bold">{signal.timeframe}</span>
                </span>
                <span>
                  <span className="text-gray-600">Risk:</span>{' '}
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getRiskColor(signal.risk)}`}>
                    {signal.risk}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AIXBT Signals */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">🔔 AIXBT Market Signals</h3>
        <div className="space-y-4">
          {data.aixbtSignals.map((signal) => (
            <div
              key={signal.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getCategoryIcon(signal.category)}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{signal.title}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                        {signal.tierName}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{signal.description}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      {signal.tickers?.map((ticker, idx) => (
                        <span key={idx} className="bg-gray-100 px-2 py-1 rounded">
                          {ticker}
                        </span>
                      ))}
                      {signal.xHandles?.map((handle, idx) => (
                        <span key={idx} className="text-blue-600">
                          {handle}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>Detected: {new Date(signal.detectedAt).toLocaleString()}</div>
                  <div>Reinforced: {new Date(signal.reinforcedAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-bold text-yellow-800 mb-2">⚠️ Disclaimer</h4>
        <p className="text-sm text-yellow-700">
          These signals are for informational purposes only. Trading cryptocurrencies involves significant risk.
          Always do your own research and never invest more than you can afford to lose. Past performance is not
          indicative of future results.
        </p>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500">
        <p>Data powered by AIXBT (Agent Intelligence for X Blockchains)</p>
        <p className="mt-1">
          <a href="https://docs.aixbt.tech" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
            Learn more about AIXBT
          </a>
        </p>
      </div>
    </div>
  );
}
