'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  History,
  Settings,
  LogOut,
  X,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { demoAuth } from '@/lib/demo-auth';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard', description: 'Dashboard home' },
  { icon: FileText, label: 'Resume Builder', href: '/dashboard/resume-builder', description: 'Create resumes' },
  { icon: BarChart3, label: 'Resume Analyzer', href: '/dashboard/resume-analyzer', description: 'ATS analysis' },
  { icon: History, label: 'History', href: '/dashboard/history', description: 'Past resumes' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings', description: 'Preferences' },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await demoAuth.logout();
    router.push('/login');
  };

  return (
    <>
      {/* Desktop Sidebar - Always visible on lg+ screens */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <motion.div 
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-accent/20 rounded-lg blur-md group-hover:bg-accent/30 transition-colors" />
              <div className="relative p-2 bg-gradient-to-br from-accent to-secondary rounded-lg">
                <FileText className="w-5 h-5 text-accent-foreground" />
              </div>
            </motion.div>
            <div>
              <span className="text-xl font-bold gradient-text">CareerForge</span>
              <p className="text-xs text-muted-foreground">Resume Builder</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
            Menu
          </p>
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-accent text-accent-foreground shadow-lg'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-accent'
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-accent rounded-xl"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Glow effect on active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-accent/20 rounded-xl blur-xl" />
                  )}
                  
                  <div className={`relative z-10 p-1.5 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-accent-foreground/10' 
                      : 'bg-muted group-hover:bg-accent/10'
                  }`}>
                    <item.icon className={`h-4 w-4 transition-all duration-300 ${
                      isActive ? '' : 'group-hover:scale-110'
                    }`} />
                  </div>
                  
                  <div className="relative z-10 flex-1">
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="relative z-10 w-1.5 h-1.5 rounded-full bg-accent-foreground"
                    />
                  )}
                  
                  {!isActive && (
                    <ChevronRight className="relative z-10 h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Pro Card */}
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="font-semibold text-foreground text-sm">Pro Tip</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Use AI to generate professional resume content in seconds.
            </p>
            <Link href="/dashboard/resume-builder">
              <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xs h-8">
                Try AI Builder
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-transparent border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50 transition-all group"
          >
            <LogOut className="h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-40"
              onClick={onClose}
            />

            {/* Mobile Sidebar Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-screen w-72 bg-sidebar border-r border-sidebar-border flex flex-col lg:hidden z-50"
            >
              {/* Header with Close Button */}
              <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-3" onClick={onClose}>
                  <div className="p-2 bg-gradient-to-br from-accent to-secondary rounded-lg">
                    <FileText className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <span className="text-xl font-bold gradient-text">CareerForge</span>
                </Link>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-sidebar-accent/10 transition-colors"
                >
                  <X className="h-5 w-5 text-sidebar-foreground" />
                </motion.button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
                  Menu
                </p>
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'bg-accent text-accent-foreground shadow-lg'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-accent'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          isActive ? 'bg-accent-foreground/10' : 'bg-muted'
                        }`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium">{item.label}</span>
                          <p className="text-xs opacity-70">{item.description}</p>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="p-4 border-t border-sidebar-border">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 bg-transparent border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
