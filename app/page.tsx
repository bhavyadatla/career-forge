'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, FileText, Sparkles, CheckCircle2, Star, Users, TrendingUp, Award, Zap, Shield, Menu, X } from 'lucide-react';
import { useState, useRef } from 'react';

const stats = [
  { value: '50K+', label: 'Resumes Created', icon: FileText },
  { value: '95%', label: 'ATS Pass Rate', icon: TrendingUp },
  { value: '10K+', label: 'Jobs Landed', icon: Award },
  { value: '4.9/5', label: 'User Rating', icon: Star },
];

const features = [
  {
    icon: FileText,
    title: 'AI Resume Builder',
    description: 'Choose from 10+ professional templates. Our AI helps you write compelling content that highlights your achievements.',
    color: '#FF8C42',
    bg: 'bg-orange-500/10',
  },
  {
    icon: BarChart3,
    title: 'ATS Analyzer',
    description: 'Get detailed scoring across 12+ categories. Know exactly where your resume stands against ATS systems.',
    color: '#9D4EDD',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Sparkles,
    title: 'AI Suggestions',
    description: 'Receive personalized recommendations to improve keywords, formatting, and impact metrics.',
    color: '#3B82F6',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure and never shared. Export your resume anytime, no strings attached.',
    color: '#10B981',
    bg: 'bg-green-500/10',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Google',
    content: 'CareerForge helped me optimize my resume for ATS. Got 3x more callbacks after using it!',
    avatar: 'SC',
  },
  {
    name: 'Michael Roberts',
    role: 'Product Manager at Meta',
    content: 'The AI suggestions were spot-on. It identified exactly what was missing in my resume.',
    avatar: 'MR',
  },
  {
    name: 'Emily Johnson',
    role: 'Data Scientist at Amazon',
    content: 'From 0 interviews to 5 in two weeks. The ATS analyzer is a game-changer.',
    avatar: 'EJ',
  },
];

const processSteps = [
  { step: '01', title: 'Choose Template', description: 'Pick from our collection of ATS-optimized templates' },
  { step: '02', title: 'Add Your Info', description: 'Fill in your details or let AI generate content for you' },
  { step: '03', title: 'Analyze & Optimize', description: 'Get instant feedback and improve your resume score' },
  { step: '04', title: 'Download & Apply', description: 'Export your polished resume and start applying' },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-gradient-to-br from-accent to-secondary rounded-lg"
            >
              <FileText className="w-5 h-5 text-accent-foreground" />
            </motion.div>
            <span className="text-2xl font-bold gradient-text">CareerForge</span>
          </Link>
          
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition animated-underline">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition animated-underline">
              Contact
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/20">
                  Get Started Free
                </Button>
              </motion.div>
            </Link>
          </div>
          
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background border-t border-border p-4 space-y-4"
          >
            <Link href="/about" className="block text-muted-foreground hover:text-foreground transition">About</Link>
            <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition">Contact</Link>
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">Sign In</Button>
              </Link>
              <Link href="/signup" className="flex-1">
                <Button className="w-full bg-accent text-accent-foreground">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Demo Banner */}
      <motion.div
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="p-4 rounded-xl border border-accent/30 bg-gradient-to-r from-accent/10 via-secondary/5 to-accent/10 backdrop-blur-sm">
          <p className="text-sm text-center">
            <Sparkles className="h-4 w-4 inline mr-2 text-accent" />
            <span className="font-semibold text-accent">Try the demo: </span>
            <span className="text-muted-foreground">
              Email: <span className="font-mono font-semibold text-foreground">demo@careerforge.com</span> | 
              Password: <span className="font-mono font-semibold text-foreground">Demo123!</span>
            </span>
            <Link href="/login" className="ml-3 text-accent hover:underline font-semibold inline-flex items-center gap-1">
              Sign in <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          />
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center relative"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6"
            >
              <Zap className="h-4 w-4" />
              AI-Powered Resume Building
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Land Your Dream Job with{' '}
              <span className="gradient-text">CareerForge</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Build ATS-optimized resumes that get noticed. Our AI analyzes, scores, and improves your resume to help you stand out from the competition.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/signup">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl shadow-accent/25 group">
                    Start Building Free
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  See How It Works
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Free forever plan
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            {/* Resume preview mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl blur-2xl" />
              <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-muted rounded" />
                      <div className="h-3 w-24 bg-muted/50 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-muted/50 rounded" />
                    <div className="h-3 w-4/5 bg-muted/50 rounded" />
                    <div className="h-3 w-3/4 bg-muted/50 rounded" />
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="h-4 w-24 bg-accent/30 rounded mb-3" />
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-muted/30 rounded" />
                      <div className="h-3 w-5/6 bg-muted/30 rounded" />
                    </div>
                  </div>
                </div>
                
                {/* ATS Score Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                  className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg"
                >
                  ATS Score: 92%
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="w-full bg-card/50 border-y border-border py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="h-6 w-6 mx-auto text-accent mb-2" />
                <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="w-full py-20 lg:py-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-foreground mb-4"
            >
              Everything You Need to{' '}
              <span className="gradient-text">Stand Out</span>
            </motion.h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From building to analyzing, CareerForge provides all the tools you need to create resumes that get results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="p-6 rounded-2xl border border-border bg-card/50 hover:border-accent/30 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="w-full bg-card/30 py-20 lg:py-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Get Started in <span className="gradient-text">4 Simple Steps</span>
            </h2>
            <p className="text-lg text-muted-foreground">Build your perfect resume in minutes, not hours.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="text-6xl font-bold gradient-text opacity-20 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/30 mx-auto" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="w-full py-20 lg:py-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Loved by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="text-lg text-muted-foreground">Join job seekers who've transformed their careers with CareerForge.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border border-border bg-card/50"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-accent-foreground font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                    <div className="text-muted-foreground text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="relative p-12 rounded-3xl bg-gradient-to-br from-accent/20 via-secondary/10 to-accent/20 border border-accent/20">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-3xl blur-xl" />
          <div className="relative">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of successful job seekers. Start building your ATS-optimized resume today.
            </p>
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl shadow-accent/25 px-8 group">
                  Create Your Free Resume
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-gradient-to-br from-accent to-secondary rounded-lg">
                  <FileText className="w-4 h-4 text-accent-foreground" />
                </div>
                <span className="font-bold text-foreground">CareerForge</span>
              </Link>
              <p className="text-muted-foreground text-sm">AI-powered resume builder and ATS analyzer for job seekers.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><Link href="/about" className="hover:text-foreground transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-foreground transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2025 CareerForge. All rights reserved. Built with passion for job seekers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
