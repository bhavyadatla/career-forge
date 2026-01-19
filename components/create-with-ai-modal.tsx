'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sparkles, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface CreateWithAIModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (data: AIGenerationData) => Promise<void>;
}

export interface AIGenerationData {
  jobTitle: string;
  company: string;
  industry: string;
  experience: string;
}

export default function CreateWithAIModal({
  open,
  onOpenChange,
  onGenerate,
}: CreateWithAIModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AIGenerationData>({
    jobTitle: '',
    company: '',
    industry: '',
    experience: '',
  });

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      await onGenerate(formData);
      onOpenChange(false);
      setStep(1);
      setFormData({ jobTitle: '', company: '', industry: '', experience: '' });
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <DialogTitle>Create Resume with AI</DialogTitle>
          </div>
          <DialogDescription>
            Let AI generate professional resume content tailored to your role
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="jobTitle">Target Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Senior Software Engineer"
                  value={formData.jobTitle}
                  onChange={e =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="company">Target Company (optional)</Label>
                <Input
                  id="company"
                  placeholder="e.g., Google, Meta, etc."
                  value={formData.company}
                  onChange={e =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!formData.jobTitle}
                  className="flex-1 gradient-accent text-foreground"
                >
                  Next
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  placeholder="e.g., Technology, Finance, Healthcare"
                  value={formData.industry}
                  onChange={e =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="experience">Your Background & Experience</Label>
                <Textarea
                  id="experience"
                  placeholder="Describe your relevant experience, skills, and achievements..."
                  rows={5}
                  value={formData.experience}
                  onChange={e =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !formData.experience}
                  className="flex-1 gradient-accent text-foreground"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Resume
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
