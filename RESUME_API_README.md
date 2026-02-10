# AI Resume Screening API

A fully functional AI-powered resume screening system built with Next.js, Supabase, and Gemini AI.

## 🚀 Features

### 1. Resume Parsing API
Extract structured data from PDF, DOCX, and TXT resumes:
- Name, email, phone
- Skills extraction
- Work experience
- Education history
- Summary/objective

### 2. Resume Scoring API
AI-powered matching against job descriptions:
- Overall match percentage (0-100%)
- Skill matching analysis
- Experience level matching
- Education requirements check
- Detailed recommendations

### 3. Job Description Analysis
Extract structured requirements from job postings:
- Required and preferred skills
- Experience level
- Education requirements
- Key responsibilities

### 4. Batch Processing
Score multiple resumes at once:
- Upload up to 50 resumes
- Rank by match percentage
- Export results as CSV
- Perfect for initial candidate screening

### 5. Dashboard & Analytics
Track your screening activity:
- Total resumes processed
- Average match scores
- Top skills found
- Usage statistics

## 📁 Project Structure

```
app/
├── resume/
│   ├── page.tsx              # Resume upload interface
│   ├── score/page.tsx        # Single resume scoring
│   ├── batch/page.tsx        # Batch processing
│   ├── dashboard/page.tsx    # Analytics dashboard
│   ├── api/page.tsx          # API documentation
│   └── pricing/page.tsx      # Pricing page
├── api/
│   ├── resume/
│   │   ├── parse/route.ts    # POST /api/resume/parse
│   │   ├── score/route.ts    # POST /api/resume/score
│   │   └── batch/route.ts    # POST /api/resume/batch
│   └── job/
│       └── analyze/route.ts  # POST /api/job/analyze
lib/
├── resume-parser.ts          # Resume parsing logic
└── ai-scorer.ts              # AI scoring logic
supabase/
└── migrations/
    └── 20250210_resume_screening.sql  # Database schema
```

## 🔧 API Endpoints

### Parse Resume
```
POST /api/resume/parse
Content-Type: multipart/form-data

file: [binary file data]
userId: [optional]
```

### Score Resume
```
POST /api/resume/score
Content-Type: application/json

{
  "resumeData": { ... },
  "jobDescription": "...",
  "userId": "uuid"
}
```

### Batch Score
```
POST /api/resume/batch
Content-Type: application/json

{
  "resumeIds": ["uuid1", "uuid2"],
  "jobDescription": "...",
  "userId": "uuid"
}
```

### Analyze Job
```
POST /api/job/analyze
Content-Type: application/json

{
  "description": "Job description text...",
  "userId": "uuid",
  "save": true
}
```

## 💰 Pricing Model

| Plan | Price | Resumes/Month | Features |
|------|-------|---------------|----------|
| Free | $0 | 5 | Basic parsing |
| Starter | $29 | 100 | AI scoring, batch processing |
| Pro | $99 | 1000 | Full API, priority support |
| Enterprise | Custom | Unlimited | Custom AI, dedicated support |

## 🛠️ Setup Instructions

### 1. Database Setup
Run the SQL migration in Supabase:
```sql
-- Located at: supabase/migrations/20250210_resume_screening.sql
```

### 2. Environment Variables
Add to your `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI
GEMINI_API_KEY=your_gemini_api_key
# or
GOOGLE_API_KEY=your_google_api_key
```

### 3. Install Dependencies
```bash
npm install pdf-parse docx mammoth @google/generative-ai
```

### 4. Deploy
```bash
vercel --prod
```

## 📊 Revenue Potential

Based on similar SaaS products:
- 100 free users (marketing)
- 50 Starter customers @ $29 = $1,450/month
- 20 Pro customers @ $99 = $1,980/month
- **Total: ~$3,400/month** ($40,800/year)

Similar products like Adaface make ~$500k/year with this model.

## 🎯 Success Criteria

- [x] Can parse PDF/DOCX resumes
- [x] Extract accurate candidate data
- [x] Score resumes against job descriptions
- [x] Provide useful AI analysis
- [x] Batch processing works
- [x] Dashboard shows statistics
- [x] API is well-documented

## 🔒 Security Features

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- API key authentication for enterprise users
- Secure file upload with size limits
- File type validation

## 🚀 Future Enhancements

- Integration with popular ATS systems
- Resume formatting/suggestions
- Candidate comparison view
- Interview question generator
- Email notifications
- Webhook support

## 📄 License

MIT License - Free to use and modify.
