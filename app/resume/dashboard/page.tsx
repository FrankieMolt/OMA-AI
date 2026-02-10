'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { FileText, Briefcase, Users, TrendingUp, Activity, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  totalResumes: number;
  totalJobs: number;
  totalScores: number;
  avgMatchScore: number;
  recentActivity: Array<{
    action: string;
    count: number;
    date: string;
  }>;
  topSkills: Array<{
    name: string;
    count: number;
  }>;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    // Simulated data - in production, fetch from API
    const mockStats: Stats = {
      totalResumes: 156,
      totalJobs: 23,
      totalScores: 412,
      avgMatchScore: 67.5,
      recentActivity: [
        { action: 'Resumes Parsed', count: 45, date: 'Mon' },
        { action: 'Resumes Parsed', count: 52, date: 'Tue' },
        { action: 'Resumes Parsed', count: 38, date: 'Wed' },
        { action: 'Resumes Parsed', count: 65, date: 'Thu' },
        { action: 'Resumes Parsed', count: 48, date: 'Fri' },
        { action: 'Resumes Parsed', count: 72, date: 'Sat' },
        { action: 'Resumes Parsed', count: 55, date: 'Sun' }
      ],
      topSkills: [
        { name: 'JavaScript', count: 89 },
        { name: 'Python', count: 76 },
        { name: 'React', count: 72 },
        { name: 'Node.js', count: 68 },
        { name: 'SQL', count: 54 }
      ]
    };

    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const usageData = [
    { name: 'Free', value: 100, color: '#6B7280' },
    { name: 'Starter', value: 50, color: '#3B82F6' },
    { name: 'Pro', value: 20, color: '#8B5CF6' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-400">Track your resume screening activity and insights</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="mt-4 md:mt-0 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link href="/resume" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">Upload</Link>
          <Link href="/resume/score" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">Score Resume</Link>
          <Link href="/resume/batch" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">Batch Process</Link>
          <Link href="/resume/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Dashboard</Link>
          <Link href="/resume/api" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">API Docs</Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Resumes</p>
                <p className="text-3xl font-bold text-white">{stats?.totalResumes}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2">+12% from last week</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Job Descriptions</p>
                <p className="text-3xl font-bold text-white">{stats?.totalJobs}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2">+5 new this week</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Scores</p>
                <p className="text-3xl font-bold text-white">{stats?.totalScores}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2">+28% from last week</p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg Match Score</p>
                <p className="text-3xl font-bold text-white">{stats?.avgMatchScore}%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-2">Across all candidates</p>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Chart */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Resume Parsing Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.recentActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Skills Chart */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Top Skills Found</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.topSkills}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="name"
                    label={({ name, percent }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {stats?.topSkills.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Distribution */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">User Plan Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={usageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {usageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {usageData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-400 text-sm">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Match Score Trend */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Average Match Score Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { day: 'Mon', score: 62 },
                    { day: 'Tue', score: 65 },
                    { day: 'Wed', score: 64 },
                    { day: 'Thu', score: 68 },
                    { day: 'Fri', score: 70 },
                    { day: 'Sat', score: 67 },
                    { day: 'Sun', score: 67.5 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis domain={[0, 100]} stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ fill: '#8B5CF6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/resume"
              className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">Upload Resume</p>
                <p className="text-gray-400 text-sm">Parse a new resume</p>
              </div>
            </Link>

            <Link
              href="/resume/score"
              className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">Score Resume</p>
                <p className="text-gray-400 text-sm">Compare against job</p>
              </div>
            </Link>

            <Link
              href="/resume/batch"
              className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
            >
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium">Batch Process</p>
                <p className="text-gray-400 text-sm">Score multiple resumes</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
