'use client';

import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import { Loading } from '@/components/ui/loading'; // Import Loading component

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  FileText, BarChart3, Trash2, Download, Eye, Edit, Clock,
  ChevronLeft, ChevronRight, Search, Filter, MoreHorizontal,
  AlertTriangle, Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';

// Demo data
const initialResumes = [
  { id: '1', title: 'Senior Software Engineer Resume', template: 'Modern', score: 87, createdAt: '2024-01-15', updatedAt: '2024-01-15' },
  { id: '2', title: 'Tech Lead Application', template: 'Professional', score: 92, createdAt: '2024-01-10', updatedAt: '2024-01-12' },
  { id: '3', title: 'Full Stack Developer', template: 'Minimal', score: 79, createdAt: '2024-01-05', updatedAt: '2024-01-08' },
  { id: '4', title: 'Product Manager Resume', template: 'Executive', score: 85, createdAt: '2024-01-02', updatedAt: '2024-01-03' },
  { id: '5', title: 'UX Designer Portfolio', template: 'Creative', score: 88, createdAt: '2023-12-28', updatedAt: '2023-12-30' },
  { id: '6', title: 'Data Scientist CV', template: 'Academic', score: 91, createdAt: '2023-12-20', updatedAt: '2023-12-22' },
];

const initialReports = [
  { id: '1', fileName: 'resume_v3.pdf', score: 87, passability: 92, date: '2024-01-15' },
  { id: '2', fileName: 'tech_lead_resume.pdf', score: 92, passability: 96, date: '2024-01-12' },
  { id: '3', fileName: 'fullstack_dev.docx', score: 79, passability: 84, date: '2024-01-08' },
  { id: '4', fileName: 'pm_resume.pdf', score: 85, passability: 89, date: '2024-01-03' },
  { id: '5', fileName: 'ux_portfolio.pdf', score: 88, passability: 91, date: '2023-12-30' },
  { id: '6', fileName: 'data_scientist_cv.pdf', score: 91, passability: 95, date: '2023-12-22' },
];

const ITEMS_PER_PAGE = 4;

export default function History() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'resumes' | 'reports'>('resumes');
  const [resumes, setResumes] = useState(initialResumes);
  const [reports, setReports] = useState(initialReports);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: 'resume' | 'report' } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filter items based on search
  const filteredResumes = resumes.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.template.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReports = reports.filter(r =>
    r.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const currentItems = activeTab === 'resumes' ? filteredResumes : filteredReports;
  const totalPages = Math.ceil(currentItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = currentItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset page when tab or search changes
  const handleTabChange = (tab: 'resumes' | 'reports') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Delete handlers
  const handleDeleteClick = (id: string, type: 'resume' | 'report') => {
    setItemToDelete({ id, type });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (itemToDelete.type === 'resume') {
      setResumes(resumes.filter(r => r.id !== itemToDelete.id));
    } else {
      setReports(reports.filter(r => r.id !== itemToDelete.id));
    }

    setIsDeleting(false);
    setDeleteDialogOpen(false);
    setItemToDelete(null);

    toast({
      title: "Deleted Successfully",
      description: `The ${itemToDelete.type === 'resume' ? 'resume' : 'report'} has been deleted.`,
    });
  };

  const handleDownload = (type: string, name: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${name}...`,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500 bg-green-500/10';
    if (score >= 80) return 'text-accent bg-accent/10';
    if (score >= 70) return 'text-yellow-500 bg-yellow-500/10';
    return 'text-red-500 bg-red-500/10';
  };

  return (
    <div className="p-6 lg:p-8">
      <Toaster />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">History</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your saved resumes and ATS reports
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
          />
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex gap-1 p-1 bg-muted rounded-lg w-fit mb-6"
      >
        <button
          onClick={() => handleTabChange('resumes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
            activeTab === 'resumes'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <FileText className="h-4 w-4" />
          Saved Resumes
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            activeTab === 'resumes' ? 'bg-accent/10 text-accent' : 'bg-muted-foreground/20'
          }`}>
            {filteredResumes.length}
          </span>
        </button>
        <button
          onClick={() => handleTabChange('reports')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all ${
            activeTab === 'reports'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          ATS Reports
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            activeTab === 'reports' ? 'bg-secondary/10 text-secondary' : 'bg-muted-foreground/20'
          }`}>
            {filteredReports.length}
          </span>
        </button>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {/* Empty State */}
          {paginatedItems.length === 0 && (
            <Card className="bg-card/50 border-border">
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  {activeTab === 'resumes' ? (
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  ) : (
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {searchQuery ? 'No results found' : `No ${activeTab === 'resumes' ? 'resumes' : 'reports'} yet`}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? 'Try adjusting your search query'
                    : activeTab === 'resumes'
                    ? 'Start by creating your first resume'
                    : 'Upload a resume to get your first ATS report'
                  }
                </p>
                {!searchQuery && (
                  <Link href={activeTab === 'resumes' ? '/dashboard/resume-builder' : '/dashboard/resume-analyzer'}>
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      {activeTab === 'resumes' ? 'Create Resume' : 'Analyze Resume'}
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}

          {/* Resumes List */}
          {activeTab === 'resumes' && paginatedItems.length > 0 && (
            <>
              {(paginatedItems as typeof initialResumes).map((resume, idx) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="bg-card/50 border-border hover:border-accent/30 transition-all">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Icon & Info */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-3 rounded-xl bg-accent/10">
                            <FileText className="h-6 w-6 text-accent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{resume.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <span className="px-2 py-0.5 rounded bg-muted">{resume.template}</span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {resume.updatedAt}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Score & Actions */}
                        <div className="flex items-center gap-3">
                          <div className={`px-3 py-1.5 rounded-lg font-bold ${getScoreColor(resume.score)}`}>
                            {resume.score}%
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Link href="/dashboard/resume-builder">
                              <Button variant="ghost" size="sm" className="h-9 w-9 p-0" title="Edit">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0"
                              onClick={() => handleDownload('resume', resume.title)}
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href="/dashboard/resume-builder" className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    View
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href="/dashboard/resume-builder" className="flex items-center gap-2">
                                    <Edit className="h-4 w-4" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDownload('resume', resume.title)}
                                  className="flex items-center gap-2"
                                >
                                  <Download className="h-4 w-4" />
                                  Download PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteClick(resume.id, 'resume')}
                                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </>
          )}

          {/* Reports List */}
          {activeTab === 'reports' && paginatedItems.length > 0 && (
            <>
              {(paginatedItems as typeof initialReports).map((report, idx) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="bg-card/50 border-border hover:border-secondary/30 transition-all">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Icon & Info */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-3 rounded-xl bg-secondary/10">
                            <BarChart3 className="h-6 w-6 text-secondary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{report.fileName}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                Pass Rate: {report.passability}%
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {report.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Score & Actions */}
                        <div className="flex items-center gap-3">
                          <div className={`px-3 py-1.5 rounded-lg font-bold ${getScoreColor(report.score)}`}>
                            {report.score}%
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0"
                              title="View Report"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0"
                              onClick={() => handleDownload('report', report.fileName)}
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  View Report
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDownload('report', report.fileName)}
                                  className="flex items-center gap-2"
                                >
                                  <Download className="h-4 w-4" />
                                  Download PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteClick(report.id, 'report')}
                                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mt-8"
        >
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, currentItems.length)} of {currentItems.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {itemToDelete?.type === 'resume' ? 'resume' : 'report'}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
