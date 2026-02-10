'use client';

import { useState, useCallback } from 'react';
import { Loader2, Upload, Briefcase, Users, Download, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';

interface BatchResult {
  resumeId: string;
  fileName: string;
  candidateName: string;
  candidateEmail: string;
  score: number;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  analysis: string;
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
}

export default function BatchProcessPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BatchResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [parsedResumes, setParsedResumes] = useState<Array<{ id: string; fileName: string; parsedData: any }>>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).filter(file => {
        const allowedTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain'
        ];
        return allowedTypes.includes(file.type) && file.size <= 10 * 1024 * 1024;
      });
      setFiles(prev => [...prev, ...newFiles].slice(0, 50));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file => file.size <= 10 * 1024 * 1024);
      setFiles(prev => [...prev, ...newFiles].slice(0, 50));
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      setError('Please upload at least one resume');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please provide a job description');
      return;
    }

    if (files.length > 50) {
      setError('Maximum 50 resumes allowed per batch');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setParsedResumes([]);

    try {
      // Step 1: Parse all resumes
      const parsedResults: Array<{ id: string; fileName: string; parsedData: any }> = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/resume/parse', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.ok && data.data?.parsedData) {
          parsedResults.push({
            id: data.data.id || `temp-${Date.now()}-${Math.random()}`,
            fileName: file.name,
            parsedData: data.data.parsedData
          });
        }
      }

      setParsedResumes(parsedResults);

      // Step 2: Batch score
      const resumeIds = parsedResults.map(r => r.id).filter(id => !id.startsWith('temp-'));

      if (resumeIds.length === 0) {
        // Score individually if not saved to DB
        const individualScores = await Promise.all(
          parsedResults.map(async (resume) => {
            const response = await fetch('/api/resume/score', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                resumeData: resume.parsedData,
                jobDescription: jobDescription
              })
            });

            const data = await response.json();
            return {
              resumeId: resume.id,
              fileName: resume.fileName,
              candidateName: resume.parsedData.name || 'Unknown',
              candidateEmail: resume.parsedData.email || '',
              ...data.data
            };
          })
        );

        setResults(individualScores.sort((a, b) => b.matchPercentage - a.matchPercentage));
      } else {
        // Use batch API
        const response = await fetch('/api/resume/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resumeIds: resumeIds,
            jobDescription: jobDescription
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to process batch');
        }

        setResults(data.data.results);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const exportResults = () => {
    if (!results) return;

    const csvContent = [
      ['Rank', 'Candidate Name', 'Email', 'Match %', 'Score', 'Matching Skills', 'Missing Skills'].join(','),
      ...results.map((result, index) => [
        index + 1,
        `"${result.candidateName}"`,
        result.candidateEmail,
        result.matchPercentage,
        result.score,
        `"${result.matchingSkills.join('; ')}"`,
        `"${result.missingSkills.join('; ')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-results-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const reset = () => {
    setFiles([]);
    setJobDescription('');
    setResults(null);
    setError(null);
    setParsedResumes([]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Batch Resume Processing
          </h1>
          <p className="text-xl text-gray-400">
            Score multiple resumes against one job description and get ranked results
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link href="/resume" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">Upload</Link>
          <Link href="/resume/score" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">Score Resume</Link>
          <Link href="/resume/batch" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Batch Process</Link>
          <Link href="/resume/dashboard" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">Dashboard</Link>
          <Link href="/resume/api" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">API Docs</Link>
        </div>

        {!results ? (
          <>
            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition mb-8 ${
                dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 bg-gray-800'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="batch-upload"
                multiple
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
              <label htmlFor="batch-upload" className="cursor-pointer block">
                <div className="flex justify-center mb-4">
                  <Upload className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-lg text-white mb-2">Drag and drop multiple resumes</p>
                <p className="text-gray-400 mb-4">or click to browse</p>
                <p className="text-sm text-gray-500">Max 50 files, 10MB each. PDF, DOC, DOCX, TXT</p>
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Files ({files.length})
                  </h3>
                  <button
                    onClick={() => setFiles([])}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Clear all
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-white text-sm truncate max-w-md">{file.name}</span>
                        <span className="text-gray-500 text-xs">{(file.size / 1024).toFixed(1)} KB</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Job Description */}
            <div className="bg-gray-800 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Job Description</h2>
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-48 bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            {/* Process Button */}
            <div className="flex justify-center">
              <button
                onClick={handleProcess}
                disabled={loading || files.length === 0}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition flex items-center gap-3 disabled:opacity-50"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? `Processing ${files.length} resumes...` : `Process ${files.length} Resume${files.length !== 1 ? 's' : ''}`}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Results Header */}
            <div className="bg-gray-800 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Processing Complete!</h2>
                    <p className="text-gray-400">Scored {results.length} resumes against job description</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={exportResults}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Export CSV
                  </button>
                  <button
                    onClick={reset}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    New Batch
                  </button>
                </div>
              </div>
            </div>

            {/* Ranked Results */}
            <div className="space-y-4">
              {results.map((result, index) => (
                <div
                  key={result.resumeId}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        index < 3 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gray-700'
                      }`}>
                        #{index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{result.candidateName}</h3>
                        <p className="text-gray-400 text-sm">{result.candidateEmail || 'No email'}</p>
                        <p className="text-gray-500 text-xs">{result.fileName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-bold ${getScoreColor(result.matchPercentage)}`}>
                        {result.matchPercentage}%
                      </div>
                      <p className="text-gray-400 text-sm">Match Score</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {result.matchingSkills.slice(0, 5).map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">
                          ✓ {skill}
                        </span>
                      ))}
                      {result.matchingSkills.length > 5 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                          +{result.matchingSkills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-200">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
