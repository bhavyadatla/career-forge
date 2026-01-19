# CareerForge - Demo Guide

Welcome to CareerForge! This is a fully functional demo of an AI-powered resume builder and ATS analyzer. All features work with demo data and mock authentication.

## Demo Credentials

Use these credentials to access the full application:

- **Email:** `demo@careerforge.com`
- **Password:** `Demo123!`

Or click "Auto-Fill Demo Credentials" on the login page for instant access.

## Features You Can Try

### 1. **Resume Builder** (`/dashboard/resume-builder`)
- Choose from 10 professional resume templates
- Fill in your resume information (personal, experience, education, skills)
- See live preview of your resume as you type
- Download resume as PDF
- Use AI to generate resume content
- Save resumes to your history

### 2. **ATS Analyzer** (`/dashboard/resume-analyzer`)
- Upload a resume file
- Get detailed ATS compatibility scoring
- View formatting, keywords, and structure analysis
- See specific issues and suggestions for improvement
- Get keyword recommendations
- Download analysis report as PDF

### 3. **Dashboard** (`/dashboard`)
- View your resume and analysis statistics
- See quick action buttons for main features
- Access your recent resume with edit/download options
- Responsive design works on all devices

### 4. **History** (`/dashboard/history`)
- View all saved resumes
- View all completed analyses
- Organized list of your past work

### 5. **Settings** (`/dashboard/settings`)
- Update profile information
- Manage notification preferences
- Access security settings
- Logout from your account

## Demo Data Included

The demo comes pre-loaded with:

1. **Sample Resume**: "Senior Software Engineer Resume"
   - 8+ years of experience
   - Multiple positions with detailed descriptions
   - Technical skills and education
   - ATS-optimized formatting

2. **Sample Analysis**: Complete ATS report for the sample resume
   - Overall score: 87/100
   - Category breakdowns (formatting, keywords, structure, content)
   - Specific issues and solutions
   - Keyword recommendations

## Getting Started

1. **Visit the Landing Page** → `/`
   - See features overview
   - Demo credentials displayed at the top

2. **Sign In** → `/login`
   - Use demo credentials
   - Or create a new account (any email/password works in demo)
   - Click "Auto-Fill Demo Credentials" button

3. **Explore Dashboard** → `/dashboard`
   - See your statistics
   - Quick actions to build/analyze resume

4. **Build a Resume** → `/dashboard/resume-builder`
   - Select a template
   - Fill in your information
   - Download as PDF

5. **Analyze a Resume** → `/dashboard/resume-analyzer`
   - Upload a resume file
   - Get detailed scoring and feedback
   - Download the analysis report

## Architecture

### Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Animations**: Framer Motion
- **Authentication**: Demo auth with localStorage (no Supabase required)
- **State**: React hooks + SWR for data fetching
- **Icons**: Lucide React

### Key Files

**Authentication**
- `/lib/demo-auth.ts` - Demo authentication system
- `/app/login/page.tsx` - Login page with demo credentials
- `/app/signup/page.tsx` - Signup page

**Data**
- `/lib/demo-data.ts` - Mock data for resumes and analyses

**Pages**
- `/app/page.tsx` - Landing page with demo banner
- `/app/dashboard/page.tsx` - Main dashboard
- `/app/dashboard/resume-builder/page.tsx` - Resume builder
- `/app/dashboard/resume-analyzer/page.tsx` - ATS analyzer
- `/app/dashboard/history/page.tsx` - Resume history
- `/app/dashboard/settings/page.tsx` - User settings

**Components**
- `/components/sidebar.tsx` - Navigation sidebar
- `/components/resume-form.tsx` - Resume form
- `/components/resume-preview.tsx` - Live preview
- `/components/ats-report.tsx` - Analysis report
- `/components/create-with-ai-modal.tsx` - AI generation dialog

**Utilities**
- `/lib/pdf-utils.ts` - PDF generation

## Design Features

- **Premium Dark Theme**: Black (#0A0E27) backgrounds with orange (#FF8C42) and purple (#9D4EDD) accents
- **Glassmorphism**: Frosted glass effect UI elements
- **Smooth Animations**: Framer Motion animations throughout
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Accessible**: Semantic HTML, proper contrast, keyboard navigation

## Limitations & Notes

- This is a **demo only** - all data is stored in localStorage and resets on browser clear
- Actual PDF generation may require additional setup in production
- AI content generation uses mock responses
- No backend database - all data is client-side
- Authentication is demo-only (no real email verification)

## Customization

To customize the demo:

1. **Change Demo Credentials**: Edit `/lib/demo-auth.ts`
2. **Modify Demo Data**: Edit `/lib/demo-data.ts`
3. **Update Colors**: Edit `/app/globals.css` theme variables
4. **Add Real Features**: Replace demo auth with Supabase/Auth0 integration

## Support

For issues or questions about the demo:
1. Check the provided pages (About, Contact)
2. Review the components and their props
3. Inspect the localStorage to see saved data
4. Check browser console for any errors

---

**Version**: 1.0
**Last Updated**: January 2025
**Created with**: Next.js 16, React 19, Tailwind CSS v4
