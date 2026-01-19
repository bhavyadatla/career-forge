'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-md bg-card/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">CareerForge</Link>
          <Link href="/">
            <Button variant="outline" size="sm">Back to Home</Button>
          </Link>
        </div>
      </nav>

      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-white mb-8">About CareerForge</h1>
        
        <div className="space-y-8 text-slate-400 text-lg leading-relaxed">
          <p>
            CareerForge is an AI-powered platform designed to help job seekers create professional, ATS-optimized resumes that get noticed by recruiters.
          </p>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p>
              We believe everyone deserves a fair chance at their dream job. Our mission is to democratize resume building and help job seekers understand what makes their resume stand out to both AI systems and human recruiters.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
            <ul className="space-y-4">
              <li>
                <span className="font-bold text-accent">Resume Builder:</span> Choose from 10+ professional templates and create a resume that showcases your skills and experience.
              </li>
              <li>
                <span className="font-bold text-accent">ATS Analyzer:</span> Upload your resume and get detailed insights on how it performs against Applicant Tracking Systems.
              </li>
              <li>
                <span className="font-bold text-accent">AI Suggestions:</span> Get personalized recommendations to improve your resume's effectiveness.
              </li>
              <li>
                <span className="font-bold text-accent">Resume History:</span> Keep track of all your resume versions in one secure place.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Why CareerForge?</h2>
            <p>
              With over 90% of resumes being filtered out by Applicant Tracking Systems, you need a tool that understands how these systems work. CareerForge uses advanced AI to help you create resumes that pass ATS screening while remaining impressive to human recruiters.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/signup">
            <Button size="lg" className="gradient-accent hover:shadow-lg transition-all">
              Get Started Today
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
