'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  ChevronDown,
  FileText,
  BarChart3,
  X,
} from 'lucide-react';
import { demoAuth } from '@/lib/demo-auth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

interface DashboardNavbarProps {
  user: {
    name: string;
    email: string;
  };
  onMenuClick: () => void;
}

const notifications = [
  {
    id: 1,
    title: 'Resume saved successfully',
    description: 'Your "Senior Engineer Resume" has been saved.',
    time: '5 min ago',
    icon: FileText,
    read: false,
  },
  {
    id: 2,
    title: 'ATS Analysis complete',
    description: 'Your resume scored 87/100. View the full report.',
    time: '1 hour ago',
    icon: BarChart3,
    read: false,
  },
  {
    id: 3,
    title: 'Tip: Add more keywords',
    description: 'Adding industry keywords can improve your ATS score.',
    time: '2 hours ago',
    icon: Bell,
    read: true,
  },
];

const searchSuggestions = [
  { label: 'Resume Builder', href: '/dashboard/resume-builder' },
  { label: 'Resume Analyzer', href: '/dashboard/resume-analyzer' },
  { label: 'History', href: '/dashboard/history' },
  { label: 'Settings', href: '/dashboard/settings' },
];

export function DashboardNavbar({ user, onMenuClick }: DashboardNavbarProps) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await demoAuth.logout();
    router.push('/login');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = searchSuggestions.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu + Search */}
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>

          {/* Search */}
          <div ref={searchRef} className="relative flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="w-full h-10 pl-10 pr-4 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            <AnimatePresence>
              {searchOpen && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl overflow-hidden"
                >
                  {filteredSuggestions.length > 0 ? (
                    <div className="py-2">
                      {filteredSuggestions.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                        >
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <span className="text-foreground">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-3 text-muted-foreground text-sm">
                      No results found
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div ref={notificationRef} className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Bell className="h-5 w-5 text-foreground" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-muted transition-colors cursor-pointer border-b border-border last:border-0 ${
                          !notification.read ? 'bg-accent/5' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`p-2 rounded-lg ${!notification.read ? 'bg-accent/20' : 'bg-muted'}`}>
                            <notification.icon className={`h-4 w-4 ${!notification.read ? 'text-accent' : 'text-muted-foreground'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground/70 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-border">
                    <button className="text-sm text-accent hover:underline w-full text-center">
                      Mark all as read
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-muted transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-accent text-accent-foreground font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm font-medium text-foreground">
                {user?.name || 'User'}
              </span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border">
                    <p className="font-semibold text-foreground">{user?.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <div className="py-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                    >
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">Profile</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                    >
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">Settings</span>
                    </Link>
                  </div>
                  <div className="py-2 border-t border-border">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 w-full hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4 text-destructive" />
                      <span className="text-destructive">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
