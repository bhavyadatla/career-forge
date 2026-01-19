// Mock data for demo resumes and analyses

export interface DemoResume {
  id: string;
  title: string;
  template: number;
  content: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    experiences: Array<{
      id: string;
      title: string;
      company: string;
      duration: string;
      description: string;
    }>;
    educations: Array<{
      id: string;
      school: string;
      degree: string;
      field: string;
      year: string;
    }>;
    skills: string[];
  };
  createdAt: string;
}

export interface DemoAnalysis {
  id: string;
  resumeId: string;
  score: number;
  categories: {
    formatting: number;
    keywords: number;
    structure: number;
    content: number;
  };
  issues: Array<{
    severity: 'high' | 'medium' | 'low';
    title: string;
    description: string;
  }>;
  suggestions: string[];
  missingKeywords: string[];
  createdAt: string;
}

export const demoResumes: DemoResume[] = [
  {
    id: 'res-1',
    title: 'Senior Software Engineer Resume',
    template: 10, // ATS Optimized
    content: {
      fullName: 'John Smith',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary:
        'Experienced Senior Software Engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions and mentoring junior developers.',
      experiences: [
        {
          id: 'exp-1',
          title: 'Senior Software Engineer',
          company: 'Tech Innovations Inc',
          duration: 'Jan 2021 - Present',
          description:
            'Led development of microservices architecture handling 10M+ daily transactions. Mentored team of 5 junior developers. Improved system performance by 40% through optimization initiatives.',
        },
        {
          id: 'exp-2',
          title: 'Software Engineer',
          company: 'Digital Solutions Ltd',
          duration: 'Jun 2018 - Dec 2020',
          description:
            'Developed and maintained RESTful APIs serving 500K+ users. Implemented automated testing framework reducing bugs by 60%. Collaborated with product team on feature prioritization.',
        },
        {
          id: 'exp-3',
          title: 'Junior Developer',
          company: 'StartUp Ventures',
          duration: 'Jan 2016 - May 2018',
          description:
            'Built frontend components using React. Participated in code reviews and contributed to architectural decisions. Learned and implemented best practices in web development.',
        },
      ],
      educations: [
        {
          id: 'edu-1',
          school: 'State University',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          year: '2015',
        },
      ],
      skills: [
        'JavaScript',
        'React',
        'Node.js',
        'Python',
        'AWS',
        'Docker',
        'Kubernetes',
        'PostgreSQL',
        'MongoDB',
        'Git',
        'Agile',
        'System Design',
      ],
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const demoAnalyses: DemoAnalysis[] = [
  {
    id: 'ana-1',
    resumeId: 'res-1',
    score: 87,
    categories: {
      formatting: 90,
      keywords: 85,
      structure: 88,
      content: 82,
    },
    issues: [
      {
        severity: 'medium',
        title: 'Missing Action Keywords',
        description:
          'Consider adding more action keywords like "Architected", "Orchestrated", "Championed" to strengthen achievement statements.',
      },
      {
        severity: 'low',
        title: 'Extra Long Summary',
        description:
          'Your professional summary is 45 words. Consider reducing to 30-40 words for better ATS scanning.',
      },
    ],
    suggestions: [
      'Add technical certifications if you have any (AWS Certified Solutions Architect, etc.)',
      'Include specific metrics and numbers for achievements',
      'Use consistent date formats throughout',
      'Add industry-specific keywords relevant to your target role',
    ],
    missingKeywords: [
      'Leadership',
      'Stakeholder Management',
      'CI/CD',
      'Agile Scrum',
      'API Development',
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
