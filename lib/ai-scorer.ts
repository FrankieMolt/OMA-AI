/**
 * AI Resume Scorer Library
 * Uses Gemini AI to score resumes against job descriptions
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

export interface JobRequirements {
  title: string;
  requiredSkills: string[];
  preferredSkills: string[];
  minExperience: number;
  educationLevel: string;
  responsibilities: string[];
}

export interface ResumeData {
  name: string;
  email: string;
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
  rawText: string;
}

export interface ScoreResult {
  overallScore: number;
  matchPercentage: number;
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
  analysis: string;
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
}

export class AIScorer {
  private genAI: GoogleGenerativeAI;
  private model: string;

  constructor(apiKey: string, model: string = "gemini-1.5-flash") {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = model;
  }

  /**
   * Score a resume against a job description
   */
  async scoreResume(
    resume: ResumeData,
    jobDescription: string,
  ): Promise<ScoreResult> {
    const prompt = this.buildScoringPrompt(resume, jobDescription);

    try {
      const model = this.genAI.getGenerativeModel({ model: this.model });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseScoringResponse(text);
    } catch (error) {
      console.error("AI scoring error:", error);
      // Fallback to local scoring if AI fails
      return this.fallbackScoring(resume, jobDescription);
    }
  }

  /**
   * Analyze job description to extract requirements
   */
  async analyzeJobDescription(description: string): Promise<JobRequirements> {
    const prompt = `Analyze the following job description and extract structured information.
Return ONLY a valid JSON object with this exact structure:
{
  "title": "job title",
  "requiredSkills": ["skill1", "skill2"],
  "preferredSkills": ["skill1", "skill2"],
  "minExperience": number of years (0 if not specified),
  "educationLevel": "required education level",
  "responsibilities": ["responsibility1", "responsibility2"]
}

Job Description:
${description}`;

    try {
      const model = this.genAI.getGenerativeModel({ model: this.model });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      throw new Error("Could not parse JSON response");
    } catch (error) {
      console.error("Job analysis error:", error);
      return this.fallbackJobAnalysis(description);
    }
  }

  /**
   * Batch score multiple resumes
   */
  async batchScore(
    resumes: ResumeData[],
    jobDescription: string,
  ): Promise<Array<ScoreResult & { candidateName: string }>> {
    const results = await Promise.all(
      resumes.map(async (resume) => {
        const score = await this.scoreResume(resume, jobDescription);
        return {
          ...score,
          candidateName: resume.name || "Unknown",
        };
      }),
    );

    // Sort by match percentage (descending)
    return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  /**
   * Build the scoring prompt for AI
   */
  private buildScoringPrompt(
    resume: ResumeData,
    jobDescription: string,
  ): string {
    return `You are an expert HR recruiter and technical interviewer. Score the following resume against the job description.

Return ONLY a valid JSON object with this exact structure:
{
  "overallScore": 0-100,
  "matchPercentage": 0-100,
  "skillMatch": {
    "score": 0-100,
    "matching": ["matched skills"],
    "missing": ["missing required skills"]
  },
  "experienceMatch": {
    "score": 0-100,
    "yearsMatched": true/false,
    "relevanceScore": 0-100
  },
  "educationMatch": {
    "score": 0-100,
    "meetsRequirements": true/false
  },
  "analysis": "Detailed analysis of the candidate fit",
  "recommendations": ["suggestion1", "suggestion2"],
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"]
}

JOB DESCRIPTION:
${jobDescription}

RESUME DATA:
Name: ${resume.name}
Email: ${resume.email}
Skills: ${resume.skills.join(", ")}

Experience:
${resume.experience.map((exp) => `- ${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate})`).join("\n")}

Education:
${resume.education.map((edu) => `- ${edu.degree} from ${edu.institution}`).join("\n")}

Full Resume Text:
${resume.rawText.substring(0, 3000)}`;
  }

  /**
   * Parse AI scoring response
   */
  private parseScoringResponse(text: string): ScoreResult {
    try {
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);

        return {
          overallScore: parsed.overallScore || 0,
          matchPercentage: parsed.matchPercentage || 0,
          skillMatch: parsed.skillMatch || {
            score: 0,
            matching: [],
            missing: [],
          },
          experienceMatch: parsed.experienceMatch || {
            score: 0,
            yearsMatched: false,
            relevanceScore: 0,
          },
          educationMatch: parsed.educationMatch || {
            score: 0,
            meetsRequirements: false,
          },
          analysis: parsed.analysis || "No analysis provided",
          recommendations: parsed.recommendations || [],
          strengths: parsed.strengths || [],
          weaknesses: parsed.weaknesses || [],
        };
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
    }

    return this.fallbackScoring(
      {
        name: "",
        email: "",
        skills: [],
        experience: [],
        education: [],
        rawText: "",
      },
      "",
    );
  }

  /**
   * Fallback scoring when AI is unavailable
   */
  private fallbackScoring(
    resume: ResumeData,
    jobDescription: string,
  ): ScoreResult {
    const jobLower = jobDescription.toLowerCase();
    const resumeLower = resume.rawText.toLowerCase();

    // Extract skills from job description (common tech keywords)
    const commonSkills = [
      "javascript",
      "typescript",
      "python",
      "java",
      "react",
      "node.js",
      "sql",
      "aws",
      "docker",
      "kubernetes",
      "git",
      "agile",
      "scrum",
      "leadership",
      "communication",
      "problem solving",
      "teamwork",
    ];

    const jobSkills = commonSkills.filter((skill) => jobLower.includes(skill));
    const matchingSkills = jobSkills.filter(
      (skill) =>
        resumeLower.includes(skill) ||
        resume.skills.some((s) => s.toLowerCase().includes(skill)),
    );

    const skillScore =
      jobSkills.length > 0
        ? (matchingSkills.length / jobSkills.length) * 100
        : 50;

    return {
      overallScore: Math.round(skillScore),
      matchPercentage: Math.round(skillScore),
      skillMatch: {
        score: Math.round(skillScore),
        matching: matchingSkills,
        missing: jobSkills.filter((s) => !matchingSkills.includes(s)),
      },
      experienceMatch: {
        score: 50,
        yearsMatched: true,
        relevanceScore: 50,
      },
      educationMatch: {
        score: 50,
        meetsRequirements: true,
      },
      analysis: "Basic keyword matching analysis (AI scoring unavailable)",
      recommendations: ["Enable AI scoring for better results"],
      strengths: matchingSkills.slice(0, 3),
      weaknesses: ["AI analysis unavailable"],
    };
  }

  /**
   * Fallback job analysis when AI is unavailable
   */
  private fallbackJobAnalysis(description: string): JobRequirements {
    const descLower = description.toLowerCase();

    // Extract common skills
    const commonSkills = [
      "javascript",
      "typescript",
      "python",
      "java",
      "react",
      "node.js",
      "sql",
      "aws",
      "docker",
      "kubernetes",
      "git",
      "agile",
      "scrum",
    ];

    const foundSkills = commonSkills.filter((skill) =>
      descLower.includes(skill),
    );

    // Extract years of experience
    const yearsMatch = description.match(
      /(\d+)\+?\s*(?:years?|yrs?).*?(?:experience|exp)/i,
    );
    const minExperience = yearsMatch ? parseInt(yearsMatch[1]) : 0;

    return {
      title: "Unknown Position",
      requiredSkills: foundSkills.slice(0, 5),
      preferredSkills: foundSkills.slice(5),
      minExperience,
      educationLevel: "Bachelor's Degree",
      responsibilities: ["Responsibilities not analyzed"],
    };
  }
}

export default AIScorer;
