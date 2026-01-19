'use client'

import React from "react"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Mail, MessageSquare } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

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
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-white mb-4 text-center">Get in Touch</h1>
        <p className="text-slate-400 text-center mb-12 text-lg">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <div className="glassmorphism p-8 rounded-xl mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white mb-2 font-medium">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange transition resize-none"
                placeholder="Tell us what you think..."
              />
            </div>
            <Button
              type="submit"
              className="w-full gradient-accent hover:shadow-lg transition-all py-6 text-base font-semibold"
            >
              {submitted ? '✓ Message Sent!' : 'Send Message'}
            </Button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            className="glassmorphism p-6 rounded-lg text-center"
            whileHover={{ y: -5 }}
          >
            <Mail className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Email</h3>
            <p className="text-slate-400">support@careerforge.com</p>
          </motion.div>
          <motion.div
            className="glassmorphism p-6 rounded-lg text-center"
            whileHover={{ y: -5 }}
          >
            <MessageSquare className="h-12 w-12 text-purple mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Live Chat</h3>
            <p className="text-slate-400">Available 9 AM - 6 PM EST</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
