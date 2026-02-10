'use client';

import { useState } from 'react';
import { Loader2, FileText, Briefcase, BarChart3, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface ScoreResult {
  score: number;
  matchPercentage: number;
  analysis: string;
  skillMatch: {
    score: number;
    matching: string[];
    missing: string[];
  };
  experienceMatch: {
    score: number;
    yearsMatched: boolean;
    relevanceScore: number;
  };
  educationMatch: {
    score: number;
    meetsRequirements: boolean;
  };
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
}

export default function ResumeScorePage() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScore = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Parse resume text to structured data
      const parsedResume = {
        name: '',
        email: '',
        skills: extractSkills(resumeText),
        experience: [],
        education: [],
        rawText: resumeText
      };

      const response = await fetch('/api/resume/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeData: parsedResume,
          jobDescription: jobDescription
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to score resume');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const extractSkills = (text: string): string[] => {
    const skills: string[] = [];
    const skillKeywords = [
      'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'ruby', 'php',
      'react', 'vue', 'angular', 'svelte', 'next.js', 'node.js', 'express',
      'django', 'flask', 'spring', 'postgresql', 'mysql', 'mongodb', 'redis',
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'git'
    ];

    const textLower = text.toLowerCase();
    for (const skill of skillKeywords) {
      if (textLower.includes(skill)) {
        skills.push(skill);
      }
    }

    return skills;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Resume Scoring
          </h1>
          <p className="text-xl text-gray-400">
            Compare a resume against a job description and get detailed AI analysis
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link
            href="/resume"
            className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition"
          >
            Upload
          </Link>
          <Link
            href="/resume/score"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Score Resume
          </Link>
          <Link
            href="/resume/batch"
            className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition"
          >
            Batch Process
          </Link>
          <Link
            href="/resume/dashboard"
            className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/resume/api"
            className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition"
          >
            API Docs
          </Link>
        </div>

        {/* Input Section */}
        {!result && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resume Input */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Resume</h2>
              </div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste resume content here..."
                className="w-full h-96 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
              />
              <p className="text-gray-400 text-sm mt-2">
                Or upload a resume on the{' '}
                <Link href="/resume" className="text-blue-400 hover:underline">
                  upload page
                </Link>
              </p>
            </div>

            {/* Job Description Input */}
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Job Description</h2>
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here..."
                className="w-full h-96 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          </div>
        )}

        {/* Score Button */}
        {!result && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleScore}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition flex items-center gap-3 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? 'Analyzing...' : 'Score Resume'}
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">
            {/* Score Header */}
            <div className="bg-gray-800 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <div className={`w-32 h-32 rounded-full ${getScoreBg(result.matchPercentage)} flex items-center justify-center`}>
                  <span className="text-4xl font-bold text-white">{result.matchPercentage}%</span>
                </div>
              </div>
              <h2 className={`text-3xl font-bold ${getScoreColor(result.matchPercentage)} mb-2`}>
                {result.matchPercentage >= 80 ? 'Excellent Match!' : 
                 result.matchPercentage >= 60 ? 'Good Match' :
                 result.matchPercentage >= 40 ? 'Fair Match' : 'Poor Match'}
              </h2>
              <p className="text-gray-400">{result.analysis}</p>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Skills Match</h3>
                <div className={`text-3xl font-bold ${getScoreColor(result.skillMatch.score)} mb-2`}>
                  {result.skillMatch.score}%
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">
                    Matching: {result.skillMatch.matching.length} skills
                  </p>
                  <p className="text-sm text-gray-400">
                    Missing: {result.skillMatch.missing.length} skills
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Experience</h3>
                <div className={`text-3xl font-bold ${getScoreColor(result.experienceMatch.score)} mb-2`}>
                  {result.experienceMatch.score}%
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">
                    Years: {result.experienceMatch.yearsMatched ? '✓ Met' : '✗ Not met'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Relevance: {result.experienceMatch.relevanceScore}%
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Education</h3>
                <div className={`text-3xl font-bold ${getScoreColor(result.educationMatch.score)} mb-2`}>
                  {result.educationMatch.score}%
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">
                    {result.educationMatch.meetsRequirements ? '✓ Meets requirements' : '✗ Below requirements'}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Matching Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.skillMatch.matching.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {result.skillMatch.matching.length === 0 && (
                    <p className="text-gray-500">No matching skills found</p>
                  )}
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.skillMatch.missing.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                  {result.skillMatch.missing.length === 0 && (
                    <p className="text-gray-500">No missing skills - great match!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">💪 Strengths</h3>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <span className="text-green-400">+</span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">⚠️ Areas to Improve</h3>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <span className="text-yellow-400">!</span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">💡 Recommendations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-300 flex items-start gap-2">
                      <span className="text-blue-400">→</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reset Button */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setResult(null);
                  setResumeText('');
                  setJobDescription('');
                }}
                className="px-8 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition"
              >
                Score Another Resume
              </button>
              <Link
                href="/resume/batch"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition"
              >
                Try Batch Processing
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
