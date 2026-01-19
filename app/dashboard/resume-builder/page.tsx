'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Download, Save, Sparkles, ChevronRight, ChevronLeft, Check, 
  Plus, Trash2, FileText, User, Briefcase, GraduationCap, 
  Wrench, Award, Link2, Folder, Target, X, Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

// 10 Resume Templates
const TEMPLATES = [
  { id: 1, name: 'Modern', description: 'Clean lines, contemporary feel', gradient: 'from-blue-500 to-cyan-500' },
  { id: 2, name: 'Professional', description: 'Classic business style', gradient: 'from-slate-600 to-slate-800' },
  { id: 3, name: 'Minimal', description: 'Simple and elegant', gradient: 'from-gray-400 to-gray-600' },
  { id: 4, name: 'Creative', description: 'Bold and unique design', gradient: 'from-pink-500 to-rose-500' },
  { id: 5, name: 'Executive', description: 'Premium corporate look', gradient: 'from-amber-600 to-yellow-500' },
  { id: 6, name: 'Tech', description: 'Developer focused layout', gradient: 'from-green-500 to-emerald-500' },
  { id: 7, name: 'Elegant', description: 'Sophisticated styling', gradient: 'from-purple-500 to-violet-500' },
  { id: 8, name: 'Bold', description: 'Stand out from the crowd', gradient: 'from-red-500 to-orange-500' },
  { id: 9, name: 'Academic', description: 'Research & education', gradient: 'from-indigo-500 to-blue-500' },
  { id: 10, name: 'ATS Optimized', description: 'Maximum ATS compatibility', gradient: 'from-accent to-secondary' },
];

// Form steps with icons
const FORM_STEPS = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: Target },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'certifications', label: 'Certifications', icon: Award },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'links', label: 'Links', icon: Link2 },
];

// Initial form data
const initialFormData = {
  // Personal
  fullName: '',
  email: '',
  phone: '',
  location: '',
  // Summary
  summary: '',
  // Education
  educations: [{ id: '1', school: '', degree: '', field: '', year: '', gpa: '' }],
  // Experience
  experiences: [{ id: '1', title: '', company: '', duration: '', description: '' }],
  // Projects
  projects: [{ id: '1', name: '', description: '', technologies: '', link: '' }],
  // Skills
  skills: [] as string[],
  // Certifications
  certifications: [{ id: '1', name: '', issuer: '', date: '' }],
  // Achievements
  achievements: [{ id: '1', title: '', description: '' }],
  // Links
  linkedin: '',
  github: '',
  portfolio: '',
  other: '',
};

export default function ResumeBuilder() {
  const { toast } = useToast();
  const [stage, setStage] = useState<'template' | 'editor'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAIModal, setShowAIModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Add items to arrays
  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      educations: [...prev.educations, { id: Date.now().toString(), school: '', degree: '', field: '', year: '', gpa: '' }]
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { id: Date.now().toString(), title: '', company: '', duration: '', description: '' }]
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now().toString(), name: '', description: '', technologies: '', link: '' }]
    }));
  };

  const addCertification = () => {
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { id: Date.now().toString(), name: '', issuer: '', date: '' }]
    }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, { id: Date.now().toString(), title: '', description: '' }]
    }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  // Remove items from arrays
  const removeItem = (type: string, id: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: (prev as any)[type].filter((item: any) => item.id !== id)
    }));
  };

  // Update array item
  const updateArrayItem = (type: string, id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: (prev as any)[type].map((item: any) => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  // Navigation
  const handleNext = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Save resume
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    toast({
      title: "Resume Saved!",
      description: "Your resume has been saved to your history.",
    });
  };

  // Download PDF
  const handleDownload = async () => {
    setIsDownloading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(false);
    toast({
      title: "PDF Downloaded!",
      description: "Your resume has been downloaded as a PDF.",
    });
  };

  // AI Generation
  const handleAIGenerate = async (aiFormData: any) => {
    setIsGeneratingAI(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Populate form with AI-generated content
    setFormData({
      ...formData,
      fullName: aiFormData.name || 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: `Experienced ${aiFormData.title || 'Software Engineer'} with ${aiFormData.experience || '5'}+ years of expertise in full-stack development. Proven track record of delivering scalable solutions and leading cross-functional teams. Passionate about building innovative products and mentoring junior developers.`,
      experiences: [
        {
          id: '1',
          title: aiFormData.title || 'Senior Software Engineer',
          company: 'Tech Innovations Inc',
          duration: 'Jan 2021 - Present',
          description: 'Led development of microservices architecture handling 10M+ daily transactions. Mentored team of 5 developers. Improved system performance by 40%.'
        },
        {
          id: '2',
          title: 'Software Engineer',
          company: 'Digital Solutions Ltd',
          duration: 'Jun 2018 - Dec 2020',
          description: 'Developed RESTful APIs serving 500K+ users. Implemented automated testing reducing bugs by 60%. Collaborated with product team on feature prioritization.'
        }
      ],
      educations: [
        {
          id: '1',
          school: 'Stanford University',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          year: '2018',
          gpa: '3.8'
        }
      ],
      skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Git', 'Agile'],
      projects: [
        {
          id: '1',
          name: 'E-Commerce Platform',
          description: 'Built a full-stack e-commerce platform with real-time inventory management',
          technologies: 'React, Node.js, PostgreSQL, Redis',
          link: 'github.com/project'
        }
      ],
      certifications: [
        {
          id: '1',
          name: 'AWS Solutions Architect',
          issuer: 'Amazon Web Services',
          date: '2023'
        }
      ],
      achievements: [
        {
          id: '1',
          title: 'Performance Optimization Award',
          description: 'Recognized for improving system performance by 40%'
        }
      ],
      linkedin: 'linkedin.com/in/johnsmith',
      github: 'github.com/johnsmith',
      portfolio: 'johnsmith.dev',
      other: ''
    });
    
    setIsGeneratingAI(false);
    setShowAIModal(false);
    toast({
      title: "AI Content Generated!",
      description: "Your resume has been populated with AI-generated content.",
    });
  };

  // Template Selection Stage
  if (stage === 'template') {
    return (
      <div className="p-6 lg:p-8">
        <Toaster />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Choose Your Template</h1>
          <p className="text-muted-foreground mt-2">Select a professional resume template to get started</p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {TEMPLATES.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedTemplate(template.id)}
              className="cursor-pointer"
            >
              <Card className={`overflow-hidden transition-all duration-300 ${
                selectedTemplate === template.id
                  ? 'ring-2 ring-accent border-accent'
                  : 'hover:border-accent/50'
              }`}>
                <div className={`h-32 bg-gradient-to-br ${template.gradient}`} />
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{template.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                        <Check className="w-4 h-4 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3"
        >
          <Button
            onClick={() => selectedTemplate && setStage('editor')}
            disabled={!selectedTemplate}
            className="bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-50"
          >
            Continue to Editor
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Editor Stage
  return (
    <div className="p-6 lg:p-8">
      <Toaster />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Resume Builder</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Step {currentStep + 1} of {FORM_STEPS.length}: {FORM_STEPS[currentStep].label}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setStage('template')}
            variant="outline"
            className="bg-transparent"
          >
            Change Template
          </Button>
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            className="bg-transparent"
          >
            {showPreview ? 'Hide' : 'Show'} Preview
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Progress Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="bg-card/50 border-border sticky top-24">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Progress</h3>
              <div className="space-y-1">
                {FORM_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = idx === currentStep;
                  const isComplete = idx < currentStep;
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(idx)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                        isActive
                          ? 'bg-accent/20 text-accent border border-accent/50'
                          : isComplete
                          ? 'bg-accent/5 text-accent'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <div className={`p-1.5 rounded-md ${isActive ? 'bg-accent/20' : isComplete ? 'bg-accent/10' : 'bg-muted'}`}>
                        {isComplete ? (
                          <Check className="h-4 w-4 text-accent" />
                        ) : (
                          <Icon className={`h-4 w-4 ${isActive ? 'text-accent' : 'text-muted-foreground'}`} />
                        )}
                      </div>
                      <span className="text-sm font-medium">{step.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* AI Button */}
              <button
                onClick={() => setShowAIModal(true)}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">Create with AI</span>
              </button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form Content */}
        <motion.div
          className={showPreview ? 'lg:col-span-1' : 'lg:col-span-2'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-card/50 border-border">
            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    {(() => {
                      const Icon = FORM_STEPS[currentStep].icon;
                      return <Icon className="h-5 w-5 text-accent" />;
                    })()}
                    {FORM_STEPS[currentStep].label}
                  </h2>

                  {/* Personal Info */}
                  {currentStep === 0 && (
                    <div className="space-y-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="John Smith"
                          className="mt-1.5"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label>Email</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@email.com"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label>Phone</Label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          placeholder="San Francisco, CA"
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {currentStep === 1 && (
                    <div>
                      <Label>Professional Summary</Label>
                      <Textarea
                        value={formData.summary}
                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                        placeholder="Write a brief professional summary highlighting your experience, skills, and career goals..."
                        rows={6}
                        className="mt-1.5"
                      />
                      <p className="text-xs text-muted-foreground mt-2">Recommended: 3-5 sentences</p>
                    </div>
                  )}

                  {/* Education */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      {formData.educations.map((edu, idx) => (
                        <Card key={edu.id} className="p-4 bg-muted/30">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Education {idx + 1}</h4>
                            {formData.educations.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem('educations', edu.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label>School/University</Label>
                              <Input
                                value={edu.school}
                                onChange={(e) => updateArrayItem('educations', edu.id, 'school', e.target.value)}
                                placeholder="Stanford University"
                                className="mt-1.5"
                              />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div>
                                <Label>Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => updateArrayItem('educations', edu.id, 'degree', e.target.value)}
                                  placeholder="Bachelor of Science"
                                  className="mt-1.5"
                                />
                              </div>
                              <div>
                                <Label>Field of Study</Label>
                                <Input
                                  value={edu.field}
                                  onChange={(e) => updateArrayItem('educations', edu.id, 'field', e.target.value)}
                                  placeholder="Computer Science"
                                  className="mt-1.5"
                                />
                              </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div>
                                <Label>Graduation Year</Label>
                                <Input
                                  value={edu.year}
                                  onChange={(e) => updateArrayItem('educations', edu.id, 'year', e.target.value)}
                                  placeholder="2020"
                                  className="mt-1.5"
                                />
                              </div>
                              <div>
                                <Label>GPA (Optional)</Label>
                                <Input
                                  value={edu.gpa}
                                  onChange={(e) => updateArrayItem('educations', edu.id, 'gpa', e.target.value)}
                                  placeholder="3.8"
                                  className="mt-1.5"
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Button onClick={addEducation} variant="outline" className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </div>
                  )}

                  {/* Experience */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      {formData.experiences.map((exp, idx) => (
                        <Card key={exp.id} className="p-4 bg-muted/30">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Experience {idx + 1}</h4>
                            {formData.experiences.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem('experiences', exp.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div>
                                <Label>Job Title</Label>
                                <Input
                                  value={exp.title}
                                  onChange={(e) => updateArrayItem('experiences', exp.id, 'title', e.target.value)}
                                  placeholder="Senior Software Engineer"
                                  className="mt-1.5"
                                />
                              </div>
                              <div>
                                <Label>Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) => updateArrayItem('experiences', exp.id, 'company', e.target.value)}
                                  placeholder="Tech Corp"
                                  className="mt-1.5"
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Duration</Label>
                              <Input
                                value={exp.duration}
                                onChange={(e) => updateArrayItem('experiences', exp.id, 'duration', e.target.value)}
                                placeholder="Jan 2021 - Present"
                                className="mt-1.5"
                              />
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                value={exp.description}
                                onChange={(e) => updateArrayItem('experiences', exp.id, 'description', e.target.value)}
                                placeholder="Describe your responsibilities and achievements..."
                                rows={3}
                                className="mt-1.5"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Button onClick={addExperience} variant="outline" className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  )}

                  {/* Projects */}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      {formData.projects.map((proj, idx) => (
                        <Card key={proj.id} className="p-4 bg-muted/30">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Project {idx + 1}</h4>
                            {formData.projects.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem('projects', proj.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label>Project Name</Label>
                              <Input
                                value={proj.name}
                                onChange={(e) => updateArrayItem('projects', proj.id, 'name', e.target.value)}
                                placeholder="E-Commerce Platform"
                                className="mt-1.5"
                              />
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                value={proj.description}
                                onChange={(e) => updateArrayItem('projects', proj.id, 'description', e.target.value)}
                                placeholder="Describe the project..."
                                rows={2}
                                className="mt-1.5"
                              />
                            </div>
                            <div>
                              <Label>Technologies Used</Label>
                              <Input
                                value={proj.technologies}
                                onChange={(e) => updateArrayItem('projects', proj.id, 'technologies', e.target.value)}
                                placeholder="React, Node.js, PostgreSQL"
                                className="mt-1.5"
                              />
                            </div>
                            <div>
                              <Label>Link (Optional)</Label>
                              <Input
                                value={proj.link}
                                onChange={(e) => updateArrayItem('projects', proj.id, 'link', e.target.value)}
                                placeholder="github.com/project"
                                className="mt-1.5"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Button onClick={addProject} variant="outline" className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  )}

                  {/* Skills */}
                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                          placeholder="Type a skill and press Enter"
                        />
                        <Button onClick={addSkill} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium flex items-center gap-2"
                          >
                            {skill}
                            <button
                              onClick={() => removeSkill(skill)}
                              className="hover:text-destructive transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      {formData.skills.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No skills added yet. Start typing above.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Certifications */}
                  {currentStep === 6 && (
                    <div className="space-y-4">
                      {formData.certifications.map((cert, idx) => (
                        <Card key={cert.id} className="p-4 bg-muted/30">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Certification {idx + 1}</h4>
                            {formData.certifications.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem('certifications', cert.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label>Certification Name</Label>
                              <Input
                                value={cert.name}
                                onChange={(e) => updateArrayItem('certifications', cert.id, 'name', e.target.value)}
                                placeholder="AWS Solutions Architect"
                                className="mt-1.5"
                              />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div>
                                <Label>Issuing Organization</Label>
                                <Input
                                  value={cert.issuer}
                                  onChange={(e) => updateArrayItem('certifications', cert.id, 'issuer', e.target.value)}
                                  placeholder="Amazon Web Services"
                                  className="mt-1.5"
                                />
                              </div>
                              <div>
                                <Label>Date</Label>
                                <Input
                                  value={cert.date}
                                  onChange={(e) => updateArrayItem('certifications', cert.id, 'date', e.target.value)}
                                  placeholder="2023"
                                  className="mt-1.5"
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Button onClick={addCertification} variant="outline" className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Certification
                      </Button>
                    </div>
                  )}

                  {/* Achievements */}
                  {currentStep === 7 && (
                    <div className="space-y-4">
                      {formData.achievements.map((ach, idx) => (
                        <Card key={ach.id} className="p-4 bg-muted/30">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium">Achievement {idx + 1}</h4>
                            {formData.achievements.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem('achievements', ach.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <div>
                              <Label>Achievement Title</Label>
                              <Input
                                value={ach.title}
                                onChange={(e) => updateArrayItem('achievements', ach.id, 'title', e.target.value)}
                                placeholder="Employee of the Year"
                                className="mt-1.5"
                              />
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                value={ach.description}
                                onChange={(e) => updateArrayItem('achievements', ach.id, 'description', e.target.value)}
                                placeholder="Describe the achievement..."
                                rows={2}
                                className="mt-1.5"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Button onClick={addAchievement} variant="outline" className="w-full bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Achievement
                      </Button>
                    </div>
                  )}

                  {/* Links */}
                  {currentStep === 8 && (
                    <div className="space-y-4">
                      <div>
                        <Label>LinkedIn</Label>
                        <Input
                          value={formData.linkedin}
                          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                          placeholder="linkedin.com/in/yourname"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>GitHub</Label>
                        <Input
                          value={formData.github}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                          placeholder="github.com/yourname"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>Portfolio Website</Label>
                        <Input
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          placeholder="yourwebsite.com"
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label>Other Links</Label>
                        <Input
                          value={formData.other}
                          onChange={(e) => setFormData({ ...formData, other: e.target.value })}
                          placeholder="Any other relevant links"
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
                <Button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <div className="flex gap-2">
                  {currentStep === FORM_STEPS.length - 1 ? (
                    <>
                      <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        {isSaving ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        {isSaving ? 'Saving...' : 'Save Resume'}
                      </Button>
                      <Button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        variant="outline"
                        className="bg-transparent"
                      >
                        {isDownloading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4 mr-2" />
                        )}
                        {isDownloading ? 'Downloading...' : 'Download PDF'}
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Preview */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white sticky top-24 overflow-hidden">
              <CardContent className="p-0">
                <div ref={previewRef} className="p-6 text-black text-xs leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                  {/* Header */}
                  <div className="border-b-2 border-gray-300 pb-3 mb-4">
                    <h1 className="text-xl font-bold text-black">{formData.fullName || 'Your Name'}</h1>
                    <div className="flex flex-wrap gap-2 text-gray-600 mt-1">
                      {formData.email && <span>{formData.email}</span>}
                      {formData.phone && <span>| {formData.phone}</span>}
                      {formData.location && <span>| {formData.location}</span>}
                    </div>
                  </div>

                  {/* Summary */}
                  {formData.summary && (
                    <div className="mb-4">
                      <h2 className="text-sm font-bold border-b border-gray-200 pb-1 mb-2">SUMMARY</h2>
                      <p className="text-gray-700">{formData.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {formData.experiences.some(e => e.title || e.company) && (
                    <div className="mb-4">
                      <h2 className="text-sm font-bold border-b border-gray-200 pb-1 mb-2">EXPERIENCE</h2>
                      {formData.experiences.filter(e => e.title || e.company).map((exp) => (
                        <div key={exp.id} className="mb-2">
                          <div className="flex justify-between">
                            <span className="font-semibold">{exp.title}</span>
                            <span className="text-gray-600">{exp.duration}</span>
                          </div>
                          <p className="text-gray-600 italic">{exp.company}</p>
                          {exp.description && <p className="text-gray-700 mt-1">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Education */}
                  {formData.educations.some(e => e.school || e.degree) && (
                    <div className="mb-4">
                      <h2 className="text-sm font-bold border-b border-gray-200 pb-1 mb-2">EDUCATION</h2>
                      {formData.educations.filter(e => e.school || e.degree).map((edu) => (
                        <div key={edu.id} className="mb-2">
                          <div className="flex justify-between">
                            <span className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</span>
                            <span className="text-gray-600">{edu.year}</span>
                          </div>
                          <p className="text-gray-600">{edu.school} {edu.gpa && `| GPA: ${edu.gpa}`}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills */}
                  {formData.skills.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-sm font-bold border-b border-gray-200 pb-1 mb-2">SKILLS</h2>
                      <p className="text-gray-700">{formData.skills.join(' | ')}</p>
                    </div>
                  )}

                  {/* Projects */}
                  {formData.projects.some(p => p.name) && (
                    <div className="mb-4">
                      <h2 className="text-sm font-bold border-b border-gray-200 pb-1 mb-2">PROJECTS</h2>
                      {formData.projects.filter(p => p.name).map((proj) => (
                        <div key={proj.id} className="mb-2">
                          <span className="font-semibold">{proj.name}</span>
                          {proj.description && <p className="text-gray-700">{proj.description}</p>}
                          {proj.technologies && <p className="text-gray-600 italic text-[10px]">{proj.technologies}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* AI Modal */}
      <AnimatePresence>
        {showAIModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <Card className="w-full max-w-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-accent" />
                      Create with AI
                    </h3>
                    <button
                      onClick={() => setShowAIModal(false)}
                      className="p-1 rounded-lg hover:bg-muted transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      handleAIGenerate({
                        name: (form.elements.namedItem('name') as HTMLInputElement).value,
                        title: (form.elements.namedItem('title') as HTMLInputElement).value,
                        experience: (form.elements.namedItem('experience') as HTMLInputElement).value,
                      });
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <Label>Your Name</Label>
                      <Input name="name" placeholder="John Smith" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Current/Target Job Title</Label>
                      <Input name="title" placeholder="Senior Software Engineer" className="mt-1.5" />
                    </div>
                    <div>
                      <Label>Years of Experience</Label>
                      <Input name="experience" placeholder="5" className="mt-1.5" />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        onClick={() => setShowAIModal(false)}
                        variant="outline"
                        className="flex-1 bg-transparent"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isGeneratingAI}
                        className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        {isGeneratingAI ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Generate
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
