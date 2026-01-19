'use client';

import React from "react"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { demoAuth } from '@/lib/demo-auth';
import { Mail, Lock, FileText, Sparkles, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const features = [
  'AI-Powered Resume Builder',
  'Professional ATS Analysis',
  '10+ Premium Templates',
  'Real-time Preview',
];

export default function LogIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const session = await demoAuth.login(formData.email, formData.password);

      if (!session) {
        setError('Invalid email or password. Please try again.');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    const creds = demoAuth.getDemoCredentials();
    setFormData(creds);
  };

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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-secondary/20" />
        
        {/* Floating shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-accent/10 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-secondary/10 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-accent/5 blur-xl"
        />
        
        {/* Content */}
        <motion.div 
          className="relative z-10 flex flex-col justify-center px-12 xl:px-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-gradient-to-br from-accent to-secondary rounded-xl shadow-lg"
              >
                <FileText className="w-7 h-7 text-accent-foreground" />
              </motion.div>
              <span className="text-3xl font-bold gradient-text">CareerForge</span>
            </Link>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl xl:text-5xl font-bold text-foreground leading-tight mb-6">
            Build Your Dream
            <br />
            <span className="gradient-text">Career Today</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 max-w-md">
            Create ATS-optimized resumes that get noticed. Our AI-powered tools help you land more interviews.
          </motion.p>
          
          <motion.div variants={itemVariants} className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="p-1 rounded-full bg-accent/20">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                </div>
                <span className="text-foreground">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 p-4 rounded-xl bg-card/50 border border-border max-w-sm"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">New: AI Resume Generator</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Generate professional resumes in seconds with our AI assistant.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-accent to-secondary rounded-lg">
                <FileText className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-2xl font-bold gradient-text">CareerForge</span>
            </Link>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to continue building your career</p>
          </div>
          
          {/* Demo credentials card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <p className="text-accent font-semibold text-sm">Demo Credentials</p>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-mono">Email: demo@careerforge.com</p>
              <p className="font-mono">Password: Demo123!</p>
            </div>
          </motion.div>

          <motion.form 
            onSubmit={handleLogIn} 
            className="p-8 rounded-2xl space-y-6 border border-border bg-card/50 backdrop-blur-sm shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive text-sm flex items-start gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs">!</span>
                </div>
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="block text-foreground font-medium text-sm">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                  className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-50"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-foreground font-medium text-sm">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={loading}
                  className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-12 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-accent-foreground py-3 text-base font-semibold disabled:opacity-50 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                      />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </motion.div>

            <Button
              type="button"
              onClick={fillDemoCredentials}
              variant="outline"
              className="w-full bg-transparent hover:bg-muted/50 transition-all"
            >
              <Sparkles className="h-4 w-4 mr-2 text-accent" />
              Auto-Fill Demo Credentials
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <p className="text-center text-muted-foreground text-sm">
              Don't have an account?{' '}
              <Link href="/signup" className="text-accent hover:underline font-medium">
                Create Account
              </Link>
            </p>
          </motion.form>
          
          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing in, you agree to our{' '}
            <Link href="#" className="text-accent hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="#" className="text-accent hover:underline">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
