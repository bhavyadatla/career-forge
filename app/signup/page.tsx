'use client';

import React from "react"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { demoAuth } from '@/lib/demo-auth';
import { Mail, Lock, User, FileText, CheckCircle2, ArrowRight, Eye, EyeOff, Sparkles, Rocket } from 'lucide-react';

const benefits = [
  '10+ Professional Templates',
  'AI-Powered Content Generation',
  'Real-time ATS Analysis',
  'Unlimited Downloads',
];

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const session = await demoAuth.signup(formData.email, formData.password, formData.name);

      if (!session) {
        setError('Failed to create account');
      } else {
        setSuccess(true);
        setTimeout(() => router.push('/dashboard'), 1500);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background to-accent/20" />
        
        {/* Floating shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 right-20 w-40 h-40 rounded-full bg-secondary/10 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 left-20 w-32 h-32 rounded-full bg-accent/10 blur-2xl"
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
            Start Your
            <br />
            <span className="gradient-text">Career Journey</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 max-w-md">
            Join thousands of job seekers who've landed their dream jobs using CareerForge's AI-powered tools.
          </motion.p>
          
          <motion.div variants={itemVariants} className="space-y-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="p-1 rounded-full bg-secondary/20">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 p-4 rounded-xl bg-card/50 border border-border max-w-sm"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-secondary/10">
                <Rocket className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Get Started Free</p>
                <p className="text-xs text-muted-foreground mt-1">
                  No credit card required. Start building professional resumes immediately.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
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
            <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground mt-2">Start building your perfect resume today</p>
          </div>

          <motion.form 
            onSubmit={handleSignUp} 
            className="p-8 rounded-2xl space-y-5 border border-border bg-card/50 backdrop-blur-sm shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-500 text-sm text-center flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="h-5 w-5" />
                Account created! Redirecting...
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="block text-foreground font-medium text-sm">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={loading || success}
                  className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-50"
                  placeholder="John Smith"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-foreground font-medium text-sm">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading || success}
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
                  disabled={loading || success}
                  className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-12 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-50"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
            </div>

            <div className="space-y-2">
              <label className="block text-foreground font-medium text-sm">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  disabled={loading || success}
                  className="w-full bg-muted/50 border border-border rounded-xl pl-10 pr-12 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all disabled:opacity-50"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                disabled={loading || success}
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
                      Creating Account...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Account Created!
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <p className="text-center text-muted-foreground text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-accent hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </motion.form>
          
          <p className="text-center text-xs text-muted-foreground mt-6">
            By creating an account, you agree to our{' '}
            <Link href="#" className="text-accent hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="#" className="text-accent hover:underline">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
