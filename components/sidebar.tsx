'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  History,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { demoAuth } from '@/lib/demo-auth';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Resume Builder', href: '/dashboard/resume-builder' },
  { icon: BarChart3, label: 'ATS Analyzer', href: '/dashboard/resume-analyzer' },
  { icon: History, label: 'History', href: '/dashboard/history' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await demoAuth.logout();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 border border-white/20 text-white"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-screen w-64 glassmorphism border-r border-border flex flex-col z-40 lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link href="/dashboard" className="text-2xl font-bold block text-center" style={{color: '#FF8C42'}}>
            CareerForge
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.href}
                whileHover={{ x: 4 }}
                onClick={() => setIsOpen(false)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'gradient-accent text-white shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-border">
          <Button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
