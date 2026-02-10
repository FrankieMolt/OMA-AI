/**
 * Resume Parser Library
 * Handles parsing of PDF, DOCX, and TXT resumes
 */

// Dynamic imports for modules that have ESM issues
async function getPdfParse() {
  const pdfParse = await import('pdf-parse');
  return pdfParse.default || pdfParse;
}

async function getMammoth() {
  const mammoth = await import('mammoth');
  return mammoth.default || mammoth;
}

export interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
  summary: string;
  rawText: string;
}

export interface WorkExperience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
}

export class ResumeParser {
  /**
   * Parse resume file buffer based on file type
   */
  static async parseBuffer(buffer: Buffer, fileType: string): Promise<ParsedResume> {
    let text = '';
    
    switch (fileType.toLowerCase()) {
      case 'pdf':
      case 'application/pdf':
        text = await this.parsePDF(buffer);
        break;
      case 'docx':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        text = await this.parseDOCX(buffer);
        break;
      case 'doc':
      case 'application/msword':
        text = await this.parseDOCX(buffer); // mammoth handles both
        break;
      case 'txt':
      case 'text/plain':
        text = buffer.toString('utf-8');
        break;
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
    
    return this.extractStructuredData(text);
  }

  /**
   * Parse PDF file
   */
  static async parsePDF(buffer: Buffer): Promise<string> {
    try {
      const pdfParse = await getPdfParse();
      const data = await pdfParse(buffer);
      return data.text;
    } catch (error) {
      console.error('PDF parsing error:', error);
      throw new Error('Failed to parse PDF file');
    }
  }

  /**
   * Parse DOCX file
   */
  static async parseDOCX(buffer: Buffer): Promise<string> {
    try {
      const mammoth = await getMammoth();
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error) {
      console.error('DOCX parsing error:', error);
      throw new Error('Failed to parse DOCX file');
    }
  }

  /**
   * Extract structured data from resume text using pattern matching
   */
  static extractStructuredData(text: string): ParsedResume {
    const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    return {
      name: this.extractName(normalizedText),
      email: this.extractEmail(normalizedText),
      phone: this.extractPhone(normalizedText),
      skills: this.extractSkills(normalizedText),
      experience: this.extractExperience(normalizedText),
      education: this.extractEducation(normalizedText),
      summary: this.extractSummary(normalizedText),
      rawText: normalizedText
    };
  }

  /**
   * Extract name from resume
   */
  static extractName(text: string): string {
    // Try to find name at the beginning of resume
    const lines = text.split('\n').slice(0, 10).filter(l => l.trim());
    
    // Look for name patterns (usually first 3 lines, not email/phone)
    for (const line of lines) {
      const cleanLine = line.trim();
      // Skip if looks like email, phone, or address
      if (cleanLine.includes('@') || /^\d/.test(cleanLine) || cleanLine.length < 3) continue;
      
      // Match name patterns (2-3 words, capitalized)
      const nameMatch = cleanLine.match(/^([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)$/);
      if (nameMatch) {
        return nameMatch[1];
      }
    }
    
    return '';
  }

  /**
   * Extract email from resume
   */
  static extractEmail(text: string): string {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const match = text.match(emailRegex);
    return match ? match[0] : '';
  }

  /**
   * Extract phone number from resume
   */
  static extractPhone(text: string): string {
    // Match various phone formats
    const phoneRegex = /(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/;
    const match = text.match(phoneRegex);
    return match ? match[0] : '';
  }

  /**
   * Extract skills from resume
   */
  static extractSkills(text: string): string[] {
    const skills: Set<string> = new Set();
    const textLower = text.toLowerCase();
    
    // Common tech skills to look for
    const skillKeywords = [
      // Programming Languages
      'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'rust', 'ruby', 'php',
      'swift', 'kotlin', 'scala', 'perl', 'r', 'matlab', 'julia', 'dart',
      
      // Web Technologies
      'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt', 'node.js', 'express',
      'django', 'flask', 'spring', 'laravel', 'rails', 'html', 'css', 'sass', 'less',
      'tailwind', 'bootstrap', 'jquery', 'webpack', 'vite', 'rollup',
      
      // Databases
      'postgresql', 'mysql', 'mongodb', 'redis', 'sqlite', 'dynamodb', 'cassandra',
      'elasticsearch', 'firebase', 'supabase', 'prisma', 'sequelize', 'typeorm',
      
      // Cloud & DevOps
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'jenkins',
      'github actions', 'gitlab ci', 'circleci', 'travis ci', 'vercel', 'netlify',
      
      // AI/ML
      'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy', 'opencv',
      'huggingface', 'langchain', 'openai', 'machine learning', 'deep learning',
      
      // Tools & Others
      'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'slack',
      'figma', 'sketch', 'adobe xd', 'photoshop', 'illustrator'
    ];
    
    for (const skill of skillKeywords) {
      // Look for whole word match
      const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (regex.test(textLower)) {
        skills.add(skill);
      }
    }
    
    return Array.from(skills);
  }

  /**
   * Extract work experience from resume
   */
  static extractExperience(text: string): WorkExperience[] {
    const experiences: WorkExperience[] = [];
    const lines = text.split('\n');
    
    // Look for experience section
    let inExperienceSection = false;
    let currentExp: Partial<WorkExperience> = {};
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const lineLower = line.toLowerCase();
      
      // Detect experience section
      if (/\b(experience|work history|employment|career)\b/i.test(lineLower) && line.length < 50) {
        inExperienceSection = true;
        continue;
      }
      
      // Detect end of experience section
      if (inExperienceSection && /\b(education|skills|projects|certifications)\b/i.test(lineLower) && line.length < 50) {
        inExperienceSection = false;
        if (currentExp.company) {
          experiences.push(currentExp as WorkExperience);
        }
        break;
      }
      
      if (inExperienceSection) {
        // Look for date patterns
        const dateMatch = line.match(/((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}|\d{1,2}\/\d{4}|\d{4})\s*[-–]\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d{4}|\d{1,2}\/\d{4}|\d{4}|present|current)/i);
        
        if (dateMatch) {
          // Save previous experience if exists
          if (currentExp.company) {
            experiences.push(currentExp as WorkExperience);
            currentExp = {};
          }
          currentExp.startDate = dateMatch[1];
          currentExp.endDate = dateMatch[2];
        }
        
        // Look for company/title patterns
        if (line.length > 3 && line.length < 100 && !dateMatch) {
          if (!currentExp.company) {
            currentExp.company = line;
          } else if (!currentExp.title) {
            currentExp.title = line;
          } else if (!currentExp.description) {
            currentExp.description = line;
          } else {
            currentExp.description += ' ' + line;
          }
        }
      }
    }
    
    // Add last experience
    if (currentExp.company) {
      experiences.push(currentExp as WorkExperience);
    }
    
    return experiences.slice(0, 10); // Limit to top 10 experiences
  }

  /**
   * Extract education from resume
   */
  static extractEducation(text: string): Education[] {
    const education: Education[] = [];
    const lines = text.split('\n');
    
    let inEducationSection = false;
    let currentEdu: Partial<Education> = {};
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      const lineLower = trimmedLine.toLowerCase();
      
      // Detect education section
      if (/\b(education|academic|qualifications|degrees)\b/i.test(lineLower) && trimmedLine.length < 50) {
        inEducationSection = true;
        continue;
      }
      
      // Detect end of education section
      if (inEducationSection && /\b(experience|skills|projects|certifications)\b/i.test(lineLower) && trimmedLine.length < 50) {
        inEducationSection = false;
        if (currentEdu.institution) {
          education.push(currentEdu as Education);
        }
        break;
      }
      
      if (inEducationSection && trimmedLine.length > 3) {
        // Look for degree patterns
        const degreeMatch = trimmedLine.match(/\b(Bachelor|Master|PhD|Doctorate|B\.S\.|M\.S\.|B\.A\.|M\.A\.|MBA|MD|JD)\b/i);
        if (degreeMatch) {
          if (currentEdu.institution) {
            education.push(currentEdu as Education);
          }
          currentEdu = { degree: degreeMatch[0] };
        }
        
        // Look for university/institution patterns
        const uniMatch = trimmedLine.match(/\b(University|College|Institute|School)\b/i);
        if (uniMatch && !currentEdu.institution) {
          currentEdu.institution = trimmedLine;
        }
        
        // Look for graduation date
        const dateMatch = trimmedLine.match(/(19|20)\d{2}/);
        if (dateMatch && !currentEdu.graduationDate) {
          currentEdu.graduationDate = dateMatch[0];
        }
        
        // Look for field of study
        const fieldMatch = trimmedLine.match(/\b(in|of)\s+([\w\s]+)/i);
        if (fieldMatch && !currentEdu.field && currentEdu.degree) {
          currentEdu.field = fieldMatch[2];
        }
      }
    }
    
    if (currentEdu.institution) {
      education.push(currentEdu as Education);
    }
    
    return education.slice(0, 5);
  }

  /**
   * Extract summary/objective from resume
   */
  static extractSummary(text: string): string {
    const lines = text.split('\n');
    let inSummary = false;
    let summary = '';
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      const lineLower = trimmedLine.toLowerCase();
      
      // Detect summary/objective section
      if (/\b(summary|objective|profile|about me)\b/i.test(lineLower) && trimmedLine.length < 50) {
        inSummary = true;
        continue;
      }
      
      // End of summary section
      if (inSummary && (/\b(experience|education|skills|projects)\b/i.test(lineLower) || trimmedLine === '')) {
        break;
      }
      
      if (inSummary && trimmedLine.length > 20) {
        summary += trimmedLine + ' ';
      }
    }
    
    return summary.trim().substring(0, 500);
  }
}

export default ResumeParser;
