'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ATSReportProps {
  score: number;
  matchScore: number;
  readabilityScore: number;
  keywordScore: number;
  formatScore: number;
  issues: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export function ATSReport({
  score,
  matchScore,
  readabilityScore,
  keywordScore,
  formatScore,
  issues,
  missingKeywords,
  suggestions,
}: ATSReportProps) {
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (value: number) => {
    if (value >= 80) return 'bg-green-400/20';
    if (value >= 60) return 'bg-yellow-400/20';
    return 'bg-red-400/20';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Overall Score */}
      <motion.div variants={itemVariants}>
        <Card className={`p-8 text-center ${getScoreBg(score)} border-0`}>
          <div className="mb-4">
            <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </div>
            <p className="text-muted-foreground mt-2">Overall ATS Score</p>
          </div>
          <div className="text-sm text-muted-foreground">
            {score >= 80
              ? 'Excellent! Your resume is well-optimized for ATS systems.'
              : score >= 60
                ? 'Good. Some improvements can boost your ATS score.'
                : 'Needs improvement. Follow suggestions to increase compatibility.'}
          </div>
        </Card>
      </motion.div>

      {/* Score Breakdown */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Keyword Match', value: matchScore },
            { label: 'Readability', value: readabilityScore },
            { label: 'Keywords Usage', value: keywordScore },
            { label: 'Format Compliance', value: formatScore },
          ].map(metric => (
            <Card key={metric.label} className="p-4 glassmorphism-sm">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">{metric.label}</h4>
                <span className={`text-lg font-bold ${getScoreColor(metric.value)}`}>
                  {metric.value}%
                </span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Issues */}
      {issues.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="p-4 glassmorphism-sm border-red-500/30">
            <div className="flex gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <h3 className="font-semibold">Critical Issues</h3>
            </div>
            <ul className="space-y-2">
              {issues.map((issue, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-red-400">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}

      {/* Missing Keywords */}
      {missingKeywords.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="p-4 glassmorphism-sm border-yellow-500/30">
            <div className="flex gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <h3 className="font-semibold">Missing Keywords</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map(keyword => (
                <div
                  key={keyword}
                  className="px-3 py-1 bg-yellow-400/10 text-yellow-300 rounded-full text-xs"
                >
                  {keyword}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card className="p-4 glassmorphism-sm border-green-500/30">
            <div className="flex gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <h3 className="font-semibold">Improvement Suggestions</h3>
            </div>
            <ul className="space-y-2">
              {suggestions.map((suggestion, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-green-400">✓</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
