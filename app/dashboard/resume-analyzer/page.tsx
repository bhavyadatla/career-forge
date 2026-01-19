'use client';

import React from "react"

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Upload, Download, TrendingUp, AlertCircle, CheckCircle, XCircle,
  FileText, Target, Zap, Award, BarChart3, ArrowRight, Save, Loader2,
  RefreshCw, Shield, Eye, Star, AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

// Demo analysis data
const generateAnalysisData = () => ({
  score: 87,
  passability: 92,
  ranking: 'Top 10%',
  categories: [
    { name: 'ATS Formatting', score: 90, description: 'Clean formatting that ATS can parse', color: '#FF8C42' },
    { name: 'Keyword Match', score: 85, description: 'Industry-relevant keywords found', color: '#9D4EDD' },
    { name: 'Content Quality', score: 88, description: 'Well-written and impactful content', color: '#3B82F6' },
    { name: 'Impact Metrics', score: 82, description: 'Quantifiable achievements present', color: '#10B981' },
    { name: 'Experience Relevance', score: 89, description: 'Experience aligns with job roles', color: '#F59E0B' },
    { name: 'Skill Coverage', score: 86, description: 'Good range of relevant skills', color: '#EF4444' },
    { name: 'Action Verbs', score: 91, description: 'Strong action words used', color: '#8B5CF6' },
    { name: 'Readability', score: 87, description: 'Easy to read and scan', color: '#06B6D4' },
    { name: 'Structure', score: 84, description: 'Logical section organization', color: '#EC4899' },
    { name: 'Grammar', score: 95, description: 'No grammar issues detected', color: '#6366F1' },
    { name: 'Resume Length', score: 80, description: 'Appropriate length for experience', color: '#14B8A6' },
    { name: 'Role Alignment', score: 88, description: 'Content matches target roles', color: '#F97316' },
  ],
  keywords: {
    found: ['JavaScript', 'React', 'Node.js', 'AWS', 'TypeScript', 'Docker', 'Kubernetes', 'Leadership', 'Python', 'SQL'],
    missing: ['Machine Learning', 'Data Science', 'Cloud Architecture', 'Team Management', 'Strategic Planning', 'Microservices'],
    recommended: ['Full-stack Development', 'Agile Methodology', 'System Design', 'API Development', 'DevOps', 'CI/CD'],
  },
  suggestions: [
    { priority: 'high', title: 'Add More Quantifiable Metrics', description: 'Include specific numbers for achievements (e.g., "Increased revenue by 25%")' },
    { priority: 'high', title: 'Include Missing Keywords', description: 'Add industry keywords like "Machine Learning" and "Cloud Architecture"' },
    { priority: 'medium', title: 'Strengthen Action Verbs', description: 'Use more impactful verbs like "Orchestrated", "Championed", "Architected"' },
    { priority: 'medium', title: 'Add Technical Certifications', description: 'Include certifications like AWS Solutions Architect or similar' },
    { priority: 'low', title: 'Optimize Summary Length', description: 'Consider reducing summary to 30-40 words for better ATS scanning' },
    { priority: 'low', title: 'Add LinkedIn Profile', description: 'Include your LinkedIn URL for additional credibility' },
  ],
  issues: [
    { type: 'warning', message: 'Summary exceeds optimal length (45 words vs recommended 30-40)' },
    { type: 'info', message: 'Consider adding more industry-specific keywords' },
    { type: 'success', message: 'No formatting issues detected' },
    { type: 'success', message: 'Contact information is complete' },
  ],
});

export default function ResumeAnalyzer() {
  const { toast } = useToast();
  const [stage, setStage] = useState<'upload' | 'analyzing' | 'report'>('upload');
  const [fileName, setFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx') || file.name.endsWith('.doc'))) {
      setFileName(file.name);
      setStage('analyzing');
      
      // Simulate analysis
      setTimeout(() => {
        setAnalysisData(generateAnalysisData());
        setStage('report');
      }, 3000);
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSaveReport = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    toast({
      title: "Report Saved!",
      description: "Your ATS analysis report has been saved to history.",
    });
  };

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDownloading(false);
    toast({
      title: "Report Downloaded!",
      description: "Your ATS report has been downloaded as a PDF.",
    });
  };

  const handleNewAnalysis = () => {
    setStage('upload');
    setFileName('');
    setAnalysisData(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-accent';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/10';
    if (score >= 80) return 'bg-accent/10';
    if (score >= 70) return 'bg-yellow-500/10';
    return 'bg-red-500/10';
  };

  const getRankingStyle = (ranking: string) => {
    if (ranking.includes('10%')) return 'bg-green-500/10 text-green-500 border-green-500/30';
    if (ranking.includes('25%')) return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
    return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
  };

  const getPriorityStyle = (priority: string) => {
    if (priority === 'high') return 'bg-red-500/10 text-red-500 border-red-500/30';
    if (priority === 'medium') return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
    return 'bg-green-500/10 text-green-500 border-green-500/30';
  };

  // Upload Stage
  if (stage === 'upload') {
    return (
      <div className="p-6 lg:p-8">
        <Toaster />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Resume Analyzer</h1>
          <p className="text-muted-foreground mt-2">
            Upload your resume to get a detailed ATS compatibility analysis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          {/* Upload Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-accent bg-accent/10'
                : 'border-border hover:border-accent/50 hover:bg-muted/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
            
            <motion.div
              animate={dragActive ? { scale: 1.05 } : { scale: 1 }}
              className="space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Upload className={`h-8 w-8 ${dragActive ? 'text-accent' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {dragActive ? 'Drop your resume here' : 'Upload Your Resume'}
                </h3>
                <p className="text-muted-foreground mt-1">
                  Drag & drop or click to browse
                </p>
                <p className="text-sm text-muted-foreground/70 mt-2">
                  Supports PDF, DOC, DOCX
                </p>
              </div>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Choose File
              </Button>
            </motion.div>
          </div>

          {/* What We Analyze */}
          <Card className="mt-8 bg-accent/5 border-accent/20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                What We Analyze
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  'ATS Formatting & Compatibility',
                  'Keyword Matching & Coverage',
                  'Content Quality & Impact',
                  'Grammar & Readability',
                  'Skill Relevance & Coverage',
                  '12+ Quality Metrics',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Analyzing Stage
  if (stage === 'analyzing') {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 border-4 border-accent/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            <FileText className="absolute inset-0 m-auto h-10 w-10 text-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Analyzing Your Resume</h2>
            <p className="text-muted-foreground mt-2">{fileName}</p>
          </div>
          <div className="max-w-xs mx-auto space-y-2">
            <Progress value={66} className="h-2" />
            <p className="text-sm text-muted-foreground">Running 12+ quality checks...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Report Stage
  return (
    <div className="p-6 lg:p-8">
      <Toaster />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">ATS Analysis Report</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {fileName}
          </p>
        </div>
        <Button
          onClick={handleNewAnalysis}
          variant="outline"
          className="bg-transparent"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Analyze Another
        </Button>
      </motion.div>

      {/* Main Score Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid sm:grid-cols-3 gap-4 mb-8"
      >
        {/* ATS Score */}
        <Card className="bg-card/50 border-border overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <span className="font-semibold text-foreground">ATS Score</span>
            </div>
            <div className="relative pt-2">
              <div className={`text-5xl font-bold ${getScoreColor(analysisData.score)}`}>
                {analysisData.score}
              </div>
              <span className="text-muted-foreground text-sm">out of 100</span>
              <div className="mt-4 h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisData.score}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-accent to-secondary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pass Probability */}
        <Card className="bg-card/50 border-border overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <span className="font-semibold text-foreground">Pass Probability</span>
            </div>
            <div className="relative pt-2">
              <div className="text-5xl font-bold text-green-500">
                {analysisData.passability}%
              </div>
              <span className="text-muted-foreground text-sm">likely to pass ATS</span>
              <div className="mt-4 h-2 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisData.passability}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                  className="h-full bg-green-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ranking */}
        <Card className="bg-card/50 border-border overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Award className="h-5 w-5 text-blue-500" />
              </div>
              <span className="font-semibold text-foreground">Your Ranking</span>
            </div>
            <div className="pt-2">
              <div className={`inline-block px-4 py-2 rounded-lg border text-lg font-bold ${getRankingStyle(analysisData.ranking)}`}>
                {analysisData.ranking}
              </div>
              <p className="text-muted-foreground text-sm mt-3">
                Among comparable resumes
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card/50 border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-accent" />
              Category Breakdown
            </CardTitle>
            <CardDescription>Detailed scores across 12 quality metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysisData.categories.map((cat: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground text-sm">{cat.name}</span>
                    <span className="font-bold" style={{ color: cat.color }}>{cat.score}%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.score}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.05 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{cat.description}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Keywords Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid lg:grid-cols-3 gap-4 mb-8"
      >
        {/* Found Keywords */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-500 flex items-center gap-2 text-base">
              <CheckCircle className="h-4 w-4" />
              Found Keywords ({analysisData.keywords.found.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysisData.keywords.found.map((kw: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-medium border border-green-500/20"
                >
                  {kw}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Missing Keywords */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-500 flex items-center gap-2 text-base">
              <XCircle className="h-4 w-4" />
              Missing Keywords ({analysisData.keywords.missing.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysisData.keywords.missing.map((kw: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-medium border border-red-500/20"
                >
                  {kw}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Keywords */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-500 flex items-center gap-2 text-base">
              <Star className="h-4 w-4" />
              Recommended ({analysisData.keywords.recommended.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {analysisData.keywords.recommended.map((kw: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium border border-blue-500/20"
                >
                  {kw}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-card/50 border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Priority Recommendations
            </CardTitle>
            <CardDescription>Actions to improve your ATS score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysisData.suggestions.map((sug: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className={`px-2 py-1 rounded text-xs font-semibold uppercase ${getPriorityStyle(sug.priority)}`}>
                    {sug.priority}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{sug.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{sug.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Issues & Alerts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-card/50 border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-accent" />
              Analysis Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysisData.issues.map((issue: any, idx: number) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    issue.type === 'success' ? 'bg-green-500/10 text-green-500' :
                    issue.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}
                >
                  {issue.type === 'success' ? (
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  ) : issue.type === 'warning' ? (
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span className="text-sm">{issue.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-3"
      >
        <Button
          onClick={handleDownloadReport}
          disabled={isDownloading}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {isDownloading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          {isDownloading ? 'Downloading...' : 'Download Report PDF'}
        </Button>
        <Button
          onClick={handleSaveReport}
          disabled={isSaving}
          variant="outline"
          className="bg-transparent"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {isSaving ? 'Saving...' : 'Save to History'}
        </Button>
      </motion.div>
    </div>
  );
}
