import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Mock AI response - replace with real AI SDK integration
function generateAIContent(data: {
  jobTitle: string;
  company: string;
  industry: string;
  experience: string;
}): {
  professional_summary: string;
  experience_suggestions: Array<{
    title: string;
    company: string;
    description: string;
  }>;
  key_skills: string[];
} {
  const { jobTitle, industry, experience } = data;

  const summaryTemplates = {
    tech: `Results-driven ${jobTitle} with proven expertise in developing scalable solutions and leading high-performing teams. Passionate about leveraging cutting-edge technologies to drive business impact and innovation.`,
    finance: `Accomplished ${jobTitle} with deep expertise in financial analysis, risk management, and strategic planning. Committed to delivering exceptional value and driving organizational growth through data-driven decision-making.`,
    healthcare: `Dedicated ${jobTitle} professional with comprehensive experience in healthcare delivery, patient outcomes, and operational excellence. Focused on improving processes and delivering exceptional care.`,
    default: `Experienced ${jobTitle} professional with a track record of delivering results and driving organizational success. Skilled in team leadership, strategic planning, and innovative problem-solving.`,
  };

  const industryKey = industry.toLowerCase().includes('tech')
    ? 'tech'
    : industry.toLowerCase().includes('finance')
      ? 'finance'
      : industry.toLowerCase().includes('health')
        ? 'healthcare'
        : 'default';

  const summary =
    summaryTemplates[industryKey as keyof typeof summaryTemplates] ||
    summaryTemplates.default;

  const skillSets = {
    tech: [
      'Full-stack Development',
      'Cloud Architecture',
      'System Design',
      'Team Leadership',
      'Agile Methodologies',
      'CI/CD Pipelines',
    ],
    finance: [
      'Financial Analysis',
      'Risk Management',
      'Budgeting & Forecasting',
      'Data Analytics',
      'Compliance',
      'Strategic Planning',
    ],
    healthcare: [
      'Patient Care Management',
      'Clinical Operations',
      'Healthcare Analytics',
      'Team Leadership',
      'Quality Improvement',
      'Regulatory Compliance',
    ],
    default: [
      'Strategic Planning',
      'Team Leadership',
      'Project Management',
      'Data Analysis',
      'Communication',
      'Problem Solving',
    ],
  };

  const skills =
    skillSets[industryKey as keyof typeof skillSets] || skillSets.default;

  return {
    professional_summary: summary,
    experience_suggestions: [
      {
        title: jobTitle,
        company: data.company || 'Current Company',
        description: `Led cross-functional initiatives as ${jobTitle}, driving strategic objectives and delivering measurable results. Managed team of professionals to achieve key business goals and improve operational efficiency.`,
      },
      {
        title: `Senior ${jobTitle.split(' ')[0]} Professional`,
        company: 'Previous Organization',
        description: `Contributed to organizational success through expert execution of ${jobTitle} responsibilities. Implemented innovative solutions, improved processes, and mentored junior team members.`,
      },
    ],
    key_skills: skills,
  };
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch (error) {
              console.error('Error setting cookie:', error);
            }
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { jobTitle, company, industry, experience } = body;

    // Generate content using mock AI
    const aiContent = generateAIContent({
      jobTitle,
      company,
      industry,
      experience,
    });

    return NextResponse.json(aiContent);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
