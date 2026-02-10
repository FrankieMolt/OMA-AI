import Link from 'next/link';
import { Code, FileText, Briefcase, Users, Key, AlertCircle } from 'lucide-react';

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">API Documentation</h1>
          <p className="text-xl text-gray-400">
            Integrate AI resume screening into your application
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/resume" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">Upload</Link>
          <Link href="/resume/score" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">Score Resume</Link>
          <Link href="/resume/batch" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">Batch Process</Link>
          <Link href="/resume/dashboard" className="px-6 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition">Dashboard</Link>
          <Link href="/resume/api" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">API Docs</Link>
        </div>

        {/* Base URL */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Base URL</h2>
          <code className="block bg-gray-900 text-green-400 p-4 rounded-lg font-mono">
            https://oma-ai.com/api
          </code>
        </div>

        {/* Authentication */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-semibold text-white">Authentication</h2>
          </div>
          <p className="text-gray-400 mb-4">
            All API requests require authentication. Include your API key in the Authorization header:
          </p>
          <code className="block bg-gray-900 text-blue-400 p-4 rounded-lg font-mono">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>

        {/* Rate Limits */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-semibold text-white">Rate Limits</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-3 text-gray-400">Plan</th>
                  <th className="pb-3 text-gray-400">Requests/Month</th>
                  <th className="pb-3 text-gray-400">Rate Limit</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr>
                  <td className="py-3">Free</td>
                  <td className="py-3">5</td>
                  <td className="py-3">1 request/minute</td>
                </tr>
                <tr>
                  <td className="py-3">Starter ($29/mo)</td>
                  <td className="py-3">100</td>
                  <td className="py-3">10 requests/minute</td>
                </tr>
                <tr>
                  <td className="py-3">Pro ($99/mo)</td>
                  <td className="py-3">1000</td>
                  <td className="py-3">60 requests/minute</td>
                </tr>
                <tr>
                  <td className="py-3">Enterprise</td>
                  <td className="py-3">Unlimited</td>
                  <td className="py-3">Custom</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="space-y-8">
          {/* Parse Resume */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">POST /resume/parse</span>
                <span className="text-blue-200">— Parse a resume file</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-4">
                Upload and parse a resume file (PDF, DOC, DOCX, TXT) to extract structured data.
              </p>

              <h4 className="text-white font-medium mb-2">Request</h4>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
<code className="text-sm text-gray-300">{`POST /api/resume/parse
Content-Type: multipart/form-data

file: [binary file data]
userId: [optional] user_id for authenticated requests`}</code>
              </pre>

              <h4 className="text-white font-medium mb-2">Response</h4>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
<code className="text-sm text-green-400">{`{
  "success": true,
  "data": {
    "id": "uuid",
    "parsedData": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-0123",
      "skills": ["JavaScript", "React", "Node.js"],
      "experience": [
        {
          "company": "Tech Corp",
          "title": "Senior Developer",
          "startDate": "2020-01",
          "endDate": "2023-12"
        }
      ],
      "education": [
        {
          "institution": "MIT",
          "degree": "BS Computer Science"
        }
      ],
      "summary": "Experienced developer...",
      "rawText": "..."
    },
    "fileUrl": "https://..."
  }
}`}</code>
              </pre>
            </div>
          </div>

          {/* Score Resume */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="bg-purple-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">POST /resume/score</span>
                <span className="text-purple-200">— Score resume against job</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-4">
                Score a resume against a job description using AI analysis.
              </p>

              <h4 className="text-white font-medium mb-2">Request</h4>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
<code className="text-sm text-gray-300">{`POST /api/resume/score
Content-Type: application/json

{
  "resumeId": "uuid",           // OR use resumeData
  "resumeData": {               // Inline resume data
    "name": "John Doe",
    "skills": ["JavaScript"],
    "rawText": "..."
  },
  "jobDescription": "Looking for a senior developer...",
  "jobId": "uuid",              // optional
  "userId": "uuid"              // optional
}`}</code>
              </pre>

              <h4 className="text-white font-medium mb-2">Response</h4>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
<code className="text-sm text-green-400">{`{
  "success": true,
  "data": {
    "score": 85,
    "matchPercentage": 85,
    "analysis": "Strong candidate match...",
    "skillMatch": {
      "score": 90,
      "matching": ["JavaScript", "React"],
      "missing": ["GraphQL"]
    },
    "experienceMatch": {
      "score": 80,
      "yearsMatched": true,
      "relevanceScore": 85
    },
    "educationMatch": {
      "score": 85,
      "meetsRequirements": true
    },
    "recommendations": ["Consider for interview"],
    "strengths": ["Strong technical skills"],
    "weaknesses": ["Missing GraphQL experience"]
  }
}`}</code>
              </pre>
            </div>
          </div>

          {/* Batch Score */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="bg-green-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">POST /resume/batch</span>
                <span className="text-green-200">— Score multiple resumes</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-4">
                Score multiple resumes against a single job description. Returns ranked results.
              </p>

              <h4 className="text-white font-medium mb-2">Request</h4>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
<code className="text-sm text-gray-300">{`POST /api/resume/batch
Content-Type: application/json

{
  "resumeIds": ["uuid1", "uuid2", "uuid3"],
  "jobDescription": "Looking for...",
  "jobId": "uuid",              // optional
  "userId": "uuid"              // optional
}`}</code>
              </pre>

              <h4 className="text-white font-medium mb-2">Response</h4>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
<code className="text-sm text-green-400">{`{
  "success": true,
  "data": {
    "jobId": "uuid",
    "totalProcessed": 10,
    "successful": 10,
    "failed": 0,
    "results": [
      {
        "resumeId": "uuid",
        "fileName": "resume.pdf",
        "candidateName": "John Doe",
        "candidateEmail": "john@example.com",
        "score": 92,
        "matchPercentage": 92,
        "matchingSkills": ["React", "Node.js"],
        "missingSkills": ["GraphQL"]
      }
    ]
  }
}`}</code>
              </pre>
            </div>
          </div>

          {/* Analyze Job */}
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="bg-orange-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-white" />
                <span className="text-white font-semibold">POST /job/analyze</span>
                <span className="text-orange-200">— Analyze job description</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-400 mb-4">
                Extract structured requirements from a job description using AI.
              </p>

              <h4 className="text-white font-medium mb-2">Request</h4>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
<code className="text-sm text-gray-300">{`POST /api/job/analyze
Content-Type: application/json

{
  "description": "Looking for a senior full-stack developer...",
  "userId": "uuid",             // optional
  "save": true                  // save to database
}`}</code>
              </pre>

              <h4 className="text-white font-medium mb-2">Response</h4>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
<code className="text-sm text-green-400">{`{
  "success": true,
  "data": {
    "jobId": "uuid",
    "title": "Senior Full-Stack Developer",
    "requiredSkills": ["JavaScript", "React", "Node.js"],
    "preferredSkills": ["TypeScript", "GraphQL"],
    "minExperience": 5,
    "educationLevel": "Bachelor's Degree",
    "responsibilities": [
      "Develop full-stack applications",
      "Mentor junior developers"
    ]
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-12 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Code Examples</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">JavaScript/TypeScript</h3>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
<code className="text-sm text-gray-300">{`// Parse a resume
const formData = new FormData();
formData.append('file', resumeFile);

const response = await fetch('https://oma-ai.com/api/resume/parse', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const { data } = await response.json();
console.log(data.parsedData);`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">python</h3>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
<code className="text-sm text-gray-300">{`import requests

# Score a resume
response = requests.post(
    'https://oma-ai.com/api/resume/score',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={
        'resumeData': {
            'name': 'John Doe',
            'skills': ['Python', 'Django'],
            'rawText': '...'
        },
        'jobDescription': 'Looking for Python developer...'
    }
)

data = response.json()
print(f"Match: {data['data']['matchPercentage']}%")`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">curl</h3>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
<code className="text-sm text-gray-300">{`# Batch score resumes
curl -X POST https://oma-ai.com/api/resume/batch \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "resumeIds": ["uuid1", "uuid2"],
    "jobDescription": "Senior developer position..."
  }'`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* SDKs */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Official SDKs coming soon:</p>
          <div className="flex justify-center gap-4">
            <span className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg">python SDK</span>
            <span className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg">Node.js SDK</span>
            <span className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg">PHP SDK</span>
            <span className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg">Ruby SDK</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/resume/pricing"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition"
          >
            Get API Access
          </Link>
        </div>
      </div>
    </div>
  );
}
