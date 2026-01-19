'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  year: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
}

interface ResumeFormProps {
  onSave: (data: FormData) => void;
  initialData?: FormData;
  isLoading?: boolean;
}

export default function ResumeForm({ onSave, initialData, isLoading = false }: ResumeFormProps) {
  const [formData, setFormData] = useState<FormData>(
    initialData || {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      experiences: [],
      educations: [],
      skills: [],
    }
  );

  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills'>('personal');

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: '',
    };
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));
  };

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      year: '',
    };
    setFormData(prev => ({
      ...prev,
      educations: [...prev.educations, newEducation],
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id),
    }));
  };

  const handleRemoveEducation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      educations: prev.educations.filter(edu => edu.id !== id),
    }));
  };

  const handleUpdateExperience = (id: string, field: keyof Experience, value: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const handleUpdateEducation = (id: string, field: keyof Education, value: string) => {
    setFormData(prev => ({
      ...prev,
      educations: prev.educations.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const handleAddSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        {(['personal', 'experience', 'education', 'skills'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'text-accent border-b-2 border-accent'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {/* Personal Information */}
        {activeTab === 'personal' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="San Francisco, CA"
              />
            </div>
            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Brief overview of your professional background and goals..."
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Experience */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            {formData.experiences.map((exp, idx) => (
              <Card key={exp.id} className="p-4 glassmorphism-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Experience {idx + 1}</h4>
                  <button
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`title-${exp.id}`}>Job Title</Label>
                    <Input
                      id={`title-${exp.id}`}
                      value={exp.title}
                      onChange={e => handleUpdateExperience(exp.id, 'title', e.target.value)}
                      placeholder="Senior Developer"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                    <Input
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={e => handleUpdateExperience(exp.id, 'company', e.target.value)}
                      placeholder="Tech Corp"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`duration-${exp.id}`}>Duration</Label>
                    <Input
                      id={`duration-${exp.id}`}
                      value={exp.duration}
                      onChange={e => handleUpdateExperience(exp.id, 'duration', e.target.value)}
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`description-${exp.id}`}>Description</Label>
                    <Textarea
                      id={`description-${exp.id}`}
                      value={exp.description}
                      onChange={e => handleUpdateExperience(exp.id, 'description', e.target.value)}
                      placeholder="Key responsibilities and achievements..."
                      rows={3}
                    />
                  </div>
                </div>
              </Card>
            ))}
            <Button
              onClick={handleAddExperience}
              variant="outline"
              className="w-full bg-transparent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
        )}

        {/* Education */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            {formData.educations.map((edu, idx) => (
              <Card key={edu.id} className="p-4 glassmorphism-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Education {idx + 1}</h4>
                  <button
                    onClick={() => handleRemoveEducation(edu.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`school-${edu.id}`}>School/University</Label>
                    <Input
                      id={`school-${edu.id}`}
                      value={edu.school}
                      onChange={e => handleUpdateEducation(edu.id, 'school', e.target.value)}
                      placeholder="University of California"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      value={edu.degree}
                      onChange={e => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                    <Input
                      id={`field-${edu.id}`}
                      value={edu.field}
                      onChange={e => handleUpdateEducation(edu.id, 'field', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`year-${edu.id}`}>Graduation Year</Label>
                    <Input
                      id={`year-${edu.id}`}
                      value={edu.year}
                      onChange={e => handleUpdateEducation(edu.id, 'year', e.target.value)}
                      placeholder="2020"
                    />
                  </div>
                </div>
              </Card>
            ))}
            <Button
              onClick={handleAddEducation}
              variant="outline"
              className="w-full bg-transparent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
        )}

        {/* Skills */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="skillInput">Add Skill</Label>
              <div className="flex gap-2">
                <Input
                  id="skillInput"
                  placeholder="e.g., React, TypeScript, Project Management"
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      handleAddSkill((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <Button
                  onClick={e => {
                    const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                    handleAddSkill(input.value);
                    input.value = '';
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map(skill => (
                <div
                  key={skill}
                  className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Save Button */}
      <Button
        onClick={() => onSave(formData)}
        disabled={isLoading}
        className="w-full gradient-accent text-foreground"
        size="lg"
      >
        {isLoading ? 'Saving...' : 'Save Resume'}
      </Button>
    </div>
  );
}
