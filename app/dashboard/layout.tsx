'use client';

import React from "react"
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { DashboardNavbar } from '@/components/dashboard-navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { demoAuth } from '@/lib/demo-auth';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const session = demoAuth.getSession();
    if (!session) {
      router.push('/login');
      return;
    }
    setUser(session.user);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top Navbar */}
        <DashboardNavbar 
          user={user} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        
        {/* Page Content with Animation */}
        <AnimatePresence mode="wait">
          <motion.main
            key={typeof window !== 'undefined' ? window.location.pathname : 'page'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 overflow-auto"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
