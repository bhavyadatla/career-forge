'use client';

import { motion } from 'framer-motion';

interface ExperiencePreview {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface EducationPreview {
  school: string;
  degree: string;
  field: string;
  year: string;
}

interface ResumePreviewProps {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experiences: ExperiencePreview[];
  educations: EducationPreview[];
  skills: string[];
}

export function ResumePreview({
  fullName,
  email,
  phone,
  location,
  summary,
  experiences,
  educations,
  skills,
}: ResumePreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white text-black p-12 rounded-lg shadow-2xl"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {/* Header */}
      <div className="mb-6 border-b-2 border-gray-300 pb-4">
        <h1 className="text-4xl font-bold mb-2">{fullName || 'Your Name'}</h1>
        <div className="flex gap-4 text-sm text-gray-600">
          {email && <span>{email}</span>}
          {phone && <span>•</span>}
          {phone && <span>{phone}</span>}
          {location && <span>•</span>}
          {location && <span>{location}</span>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">PROFESSIONAL SUMMARY</h2>
          <p className="text-sm text-gray-700">{summary}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">EXPERIENCE</h2>
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{exp.title}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">{exp.duration}</span>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">EDUCATION</h2>
          <div className="space-y-3">
            {educations.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                    <p className="text-sm text-gray-600">{edu.school}</p>
                  </div>
                  <span className="text-sm text-gray-600">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-2">SKILLS</h2>
          <p className="text-sm text-gray-700">{skills.join(' • ')}</p>
        </div>
      )}
    </motion.div>
  );
}
