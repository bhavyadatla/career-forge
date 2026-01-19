import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Mock ATS analysis function - replace with real AI/ML analysis
function analyzeResume(content: string) {
  const words = content.toLowerCase().split(/\s+/);
  const wordCount = words.length;

  // Check for common ATS keywords
  const atsKeywords = [
    'experience',
    'skills',
    'education',
    'achievement',
    'leadership',
    'management',
    'project',
    'team',
    'results',
    'implemented',
  ];

  const foundKeywords = atsKeywords.filter(keyword =>
    content.toLowerCase().includes(keyword)
  );

  const missingKeywords = atsKeywords.filter(
    keyword => !foundKeywords.includes(keyword)
  );

  // Calculate scores
  const matchScore = Math.min(100, (foundKeywords.length / atsKeywords.length) * 100);
  const readabilityScore =
    wordCount > 200 && wordCount < 800
      ? 90
      : wordCount < 200
        ? 50
        : 60;
  const keywordScore = matchScore;
  const formatScore =
    content.includes('\n') && content.includes('|')
      ? 85
      : content.includes('\n')
        ? 75
        : 50;

  const score = Math.round(
    (matchScore + readabilityScore + keywordScore + formatScore) / 4
  );

  const issues = [];
  if (wordCount < 200) {
    issues.push('Resume is too short. Add more details to your experiences.');
  }
  if (!content.includes('|') && !content.includes('\n\n')) {
    issues.push('Resume lacks proper formatting. Use clear sections and formatting.');
  }
  if (formatScore < 70) {
    issues.push('Consider using a standard resume format for better ATS compatibility.');
  }

  const suggestions = [
    'Add quantifiable achievements and metrics to your experiences.',
    'Use industry-standard keywords relevant to your target role.',
    'Organize your resume into clear sections with headers.',
    'Keep your resume to one page if possible.',
    'Use bullet points for easy parsing by ATS systems.',
  ];

  return {
    score,
    matchScore,
    readabilityScore,
    keywordScore,
    formatScore,
    issues,
    missingKeywords,
    suggestions,
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
    const { content, fileName } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Resume content required' },
        { status: 400 }
      );
    }

    // Analyze resume
    const analysis = analyzeResume(content);

    // Save analysis to database
    const { data, error } = await supabase
      .from('analyses')
      .insert({
        user_id: user.id,
        file_name: fileName || 'resume.txt',
        content,
        report: analysis,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      id: data.id,
      ...analysis,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const { data, error } = await supabase
        .from('analyses')
        .select()
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return NextResponse.json(data);
    } else {
      const { data, error } = await supabase
        .from('analyses')
        .select()
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analyses' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Analysis ID required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('analyses')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete analysis' },
      { status: 500 }
    );
  }
}
