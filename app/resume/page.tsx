'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ParsedData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: Array<{
    company: string;
    title: string;
    startDate: string;
    endDate: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
  }>;
  summary: string;
}

export default function ResumeUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ parsedData: ParsedData; fileUrl?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload PDF, DOC, DOCX, or TXT files.');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10MB.');
      return;
    }

    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse resume');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Resume Parser
          </h1>
          <p className="text-xl text-gray-400">
            Upload your resume and let AI extract key information instantly
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link
            href="/resume"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Upload
          </Link>
          <Link
            href="/resume/score"
            className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition"
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

        {/* Upload Area */}
        {!result && (
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition ${
              dragActive
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-600 bg-gray-800'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
            />
            
            {!file ? (
              <label
                htmlFor="resume-upload"
                className="cursor-pointer block"
              >
                <div className="flex justify-center mb-4">
                  <Upload className="w-16 h-16 text-gray-400" />
                </div>
                <p className="text-lg text-white mb-2">
                  Drag and drop your resume here
                </p>
                <p className="text-gray-400 mb-4">
                  or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Supports PDF, DOC, DOCX, TXT (max 10MB)
                </p>
              </label>
            ) : (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <FileText className="w-16 h-16 text-blue-400" />
                </div>
                <p className="text-lg text-white mb-2">{file.name}</p>
                <p className="text-gray-400 mb-6">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={reset}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                    disabled={loading}
                  >
                    Change File
                  </button>
                  <button
                    onClick={handleUpload}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {loading ? 'Parsing...' : 'Parse Resume'}
                  </button>
                </div>
              </div>
            )}
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
            <div className="flex items-center justify-between bg-green-500/20 border border-green-500 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-green-200 font-medium">Resume parsed successfully!</p>
                  <p className="text-green-300 text-sm">Extracted {result.parsedData.skills.length} skills</p>
                </div>
              </div>
              <button
                onClick={reset}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Upload Another
              </button>
            </div>

            {/* Parsed Data */}
            <div className="bg-gray-800 rounded-xl p-6 space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-gray-400 text-sm">Name</p>
                    <p className="text-white font-medium">{result.parsedData.name || 'Not detected'}</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">{result.parsedData.email || 'Not detected'}</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-3">
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-medium">{result.parsedData.phone || 'Not detected'}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {result.parsedData.skills.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Skills ({result.parsedData.skills.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.parsedData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {result.parsedData.experience.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Experience</h3>
                  <div className="space-y-3">
                    {result.parsedData.experience.slice(0, 3).map((exp, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <p className="text-white font-medium">{exp.title}</p>
                        <p className="text-gray-300">{exp.company}</p>
                        <p className="text-gray-400 text-sm">
                          {exp.startDate} - {exp.endDate}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {result.parsedData.education.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Education</h3>
                  <div className="space-y-3">
                    {result.parsedData.education.map((edu, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <p className="text-white font-medium">{edu.degree}</p>
                        <p className="text-gray-300">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary */}
              {result.parsedData.summary && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Summary</h3>
                  <p className="text-gray-300 bg-gray-700 rounded-lg p-4">
                    {result.parsedData.summary}
                  </p>
                </div>
              )}
            </div>

            {/* Score Button */}
            <div className="flex justify-center">
              <Link
                href="/resume/score"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition"
              >
                Score This Resume Against a Job
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
