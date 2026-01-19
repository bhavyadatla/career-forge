'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, BarChart3, Download, Clock, ArrowRight, TrendingUp, 
  Sparkles, Eye, Edit, Plus, Star, Zap, Target, Award, 
  ChevronRight, Calendar, Activity
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { demoAuth } from '@/lib/demo-auth';
import { Skeleton } from '@/components/ui/skeleton';

// Demo data
const stats = [
  { 
    label: 'Total Resumes', 
    value: '3', 
    change: '+1 this week',
    trend: 'up',
    icon: FileText, 
    color: '#FF8C42',
    bgColor: 'bg-orange-500/10',
    description: 'Resumes created'
  },
  { 
    label: 'Avg ATS Score', 
    value: '86', 
    change: '+5 from last',
    trend: 'up',
    icon: BarChart3, 
    color: '#9D4EDD',
    bgColor: 'bg-purple-500/10',
    description: 'Out of 100'
  },
  { 
    label: 'Downloads', 
    value: '12', 
    change: '+3 this month',
    trend: 'up',
    icon: Download, 
    color: '#3B82F6',
    bgColor: 'bg-blue-500/10',
    description: 'PDF exports'
  },
  { 
    label: 'Last Updated', 
    value: 'Today', 
    change: '2 hours ago',
    trend: 'neutral',
    icon: Clock, 
    color: '#10B981',
    bgColor: 'bg-green-500/10',
    description: 'Recent activity'
  },
];

const recentResumes = [
  { id: 1, title: 'Senior Software Engineer', template: 'Modern', score: 87, date: 'Jan 15, 2024', status: 'complete' },
  { id: 2, title: 'Tech Lead Application', template: 'Professional', score: 92, date: 'Jan 10, 2024', status: 'complete' },
  { id: 3, title: 'Full Stack Developer', template: 'Creative', score: 78, date: 'Jan 5, 2024', status: 'draft' },
];

const recentReports = [
  { id: 1, file: 'resume_v3.pdf', score: 87, date: 'Jan 15, 2024', status: 'Good' },
  { id: 2, file: 'tech_lead_resume.pdf', score: 92, date: 'Jan 12, 2024', status: 'Excellent' },
  { id: 3, file: 'developer_cv.pdf', score: 78, date: 'Jan 8, 2024', status: 'Needs Work' },
];

const tips = [
  { icon: Target, title: 'Use Action Verbs', description: 'Start bullet points with strong action verbs like "Led", "Developed", "Increased".' },
  { icon: Zap, title: 'Quantify Achievements', description: 'Add numbers to show impact: "Increased sales by 25%" is better than "Increased sales".' },
  { icon: Star, title: 'Customize for Each Job', description: 'Tailor your resume keywords to match the job description for better ATS scores.' },
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const session = demoAuth.getSession();
    if (session) {
      setUser(session.user);
    }
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 80) return 'text-accent';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500/10';
    if (score >= 80) return 'bg-accent/10';
    if (score >= 70) return 'bg-yellow-500/10';
    return 'bg-red-500/10';
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Skeleton className="h-72 rounded-xl" />
          <Skeleton className="h-72 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Welcome Header */}
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Welcome back, <span className="gradient-text">{user?.name || 'there'}</span>!
            </h1>
            <p className="text-muted-foreground mt-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/resume-builder">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 shadow-lg shadow-accent/20">
                <Plus className="h-4 w-4" />
                New Resume
              </Button>
            </Link>
            <Link href="/dashboard/resume-analyzer">
              <Button variant="outline" className="gap-2 bg-transparent">
                <BarChart3 className="h-4 w-4" />
                Analyze
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={itemVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group cursor-pointer"
            >
              <Card className="bg-card/50 border-border hover:border-accent/30 transition-all duration-300 overflow-hidden relative">
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardContent className="p-5 relative">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                      <motion.p 
                        className="text-3xl font-bold text-foreground"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {stat.value}
                      </motion.p>
                      <div className="flex items-center gap-1.5 mt-2">
                        {stat.trend === 'up' && (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        )}
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                      </div>
                    </div>
                    <motion.div 
                      className={`p-3 rounded-xl ${stat.bgColor} transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                    </motion.div>
                  </div>
                  <p className="text-xs text-muted-foreground/70 mt-3">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div whileHover={{ y: -4 }} className="group">
              <Card className="bg-card/50 border-border hover:border-accent/50 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <motion.div 
                        className="p-3 rounded-xl bg-accent/10 w-fit"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <FileText className="h-6 w-6 text-accent" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Create New Resume</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Choose from 10 professional templates and build your perfect resume
                        </p>
                      </div>
                      <Link href="/dashboard/resume-builder">
                        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 group/btn shadow-lg shadow-accent/20">
                          Start Building
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                    <Sparkles className="h-20 w-20 text-accent/10 group-hover:text-accent/20 transition-colors absolute right-4 top-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="group">
              <Card className="bg-card/50 border-border hover:border-secondary/50 transition-all duration-300 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <motion.div 
                        className="p-3 rounded-xl bg-secondary/10 w-fit"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <BarChart3 className="h-6 w-6 text-secondary" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Analyze Resume</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Get detailed ATS compatibility score and improvement suggestions
                        </p>
                      </div>
                      <Link href="/dashboard/resume-analyzer">
                        <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 group/btn shadow-lg shadow-secondary/20">
                          Upload & Analyze
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                    <TrendingUp className="h-20 w-20 text-secondary/10 group-hover:text-secondary/20 transition-colors absolute right-4 top-4" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6">
          {/* Recent Resumes */}
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Recent Resumes
                </CardTitle>
                <Link href="/dashboard/history" className="text-sm text-accent hover:underline flex items-center gap-1">
                  View all
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <CardDescription>Your recently created and edited resumes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentResumes.map((resume, idx) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                      <FileText className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm group-hover:text-accent transition-colors">
                        {resume.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {resume.template} template - {resume.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-2.5 py-1 rounded-lg text-sm font-semibold ${getScoreBg(resume.score)} ${getScoreColor(resume.score)}`}>
                      {resume.score}%
                    </div>
                    <Link href="/dashboard/resume-builder">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
              {recentResumes.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No resumes yet</p>
                  <Link href="/dashboard/resume-builder">
                    <Button variant="link" className="text-accent">Create your first resume</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent ATS Reports */}
          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-secondary" />
                  ATS Reports
                </CardTitle>
                <Link href="/dashboard/history?tab=reports" className="text-sm text-accent hover:underline flex items-center gap-1">
                  View all
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <CardDescription>Your recent analysis reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentReports.map((report, idx) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                      <BarChart3 className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm group-hover:text-secondary transition-colors">
                        {report.file}
                      </p>
                      <p className="text-xs text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-2.5 py-1 rounded-lg text-sm font-semibold ${getScoreBg(report.score)} ${getScoreColor(report.score)}`}>
                      {report.score}%
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Tips Carousel */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-accent/10 via-secondary/5 to-accent/10 border-accent/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-6 relative">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-foreground">Pro Tips</h3>
                <div className="flex gap-1 ml-auto">
                  {tips.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTip(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentTip === idx ? 'bg-accent w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTip}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-accent/20">
                    {(() => {
                      const TipIcon = tips[currentTip].icon;
                      return <TipIcon className="h-6 w-6 text-accent" />;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{tips[currentTip].title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{tips[currentTip].description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Graph Placeholder */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                Activity Overview
              </CardTitle>
              <CardDescription>Your resume building activity this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between h-32 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                  const heights = [40, 65, 30, 80, 55, 20, 90];
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: heights[idx] }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="w-full bg-gradient-to-t from-accent to-accent/50 rounded-t-lg"
                        style={{ maxHeight: heights[idx] }}
                      />
                      <span className="text-xs text-muted-foreground">{day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
