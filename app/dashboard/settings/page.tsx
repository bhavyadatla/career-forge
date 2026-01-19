'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  User, Mail, Lock, Bell, Moon, Sun, Trash2, LogOut, Save,
  AlertTriangle, Loader2, Shield, Eye, EyeOff
} from 'lucide-react';
import { demoAuth } from '@/lib/demo-auth';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
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

export default function Settings() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  
  // Profile state
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Notification state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    resumeSaved: true,
    analysisComplete: true,
    weeklyTips: false,
    productUpdates: true,
  });

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const session = demoAuth.getSession();
    if (session) {
      setUser(session.user);
      setProfile({
        name: session.user.name || '',
        email: session.user.email || '',
      });
    }
  }, []);

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSavingProfile(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleSavePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsSavingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSavingPassword(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    toast({
      title: "Theme Changed",
      description: `Switched to ${newTheme} mode.`,
    });
  };

  const handleLogout = async () => {
    await demoAuth.logout();
    router.push('/login');
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await demoAuth.logout();
    setIsDeleting(false);
    setDeleteDialogOpen(false);
    router.push('/');
    toast({
      title: "Account Deleted",
      description: "Your account has been permanently deleted.",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl space-y-6"
      >
        {/* Profile Section */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-lg">Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="John Smith"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="mt-1.5 opacity-70"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed in demo mode
                </p>
              </div>
              <Button
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {isSavingProfile ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Theme Section */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Moon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Appearance</CardTitle>
                  <CardDescription>Customize the look of your dashboard</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    theme === 'light'
                      ? 'border-accent bg-accent/10'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <Sun className={`h-6 w-6 mx-auto mb-2 ${theme === 'light' ? 'text-accent' : 'text-muted-foreground'}`} />
                  <p className={`text-sm font-medium ${theme === 'light' ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Light
                  </p>
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    theme === 'dark'
                      ? 'border-accent bg-accent/10'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <Moon className={`h-6 w-6 mx-auto mb-2 ${theme === 'dark' ? 'text-accent' : 'text-muted-foreground'}`} />
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Dark
                  </p>
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notifications Section */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Bell className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Notifications</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive email updates</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Resume Saved</p>
                  <p className="text-sm text-muted-foreground">When a resume is saved</p>
                </div>
                <Switch
                  checked={notifications.resumeSaved}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, resumeSaved: checked })}
                  disabled={!notifications.emailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Analysis Complete</p>
                  <p className="text-sm text-muted-foreground">When ATS analysis is done</p>
                </div>
                <Switch
                  checked={notifications.analysisComplete}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, analysisComplete: checked })}
                  disabled={!notifications.emailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Weekly Tips</p>
                  <p className="text-sm text-muted-foreground">Resume improvement tips</p>
                </div>
                <Switch
                  checked={notifications.weeklyTips}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyTips: checked })}
                  disabled={!notifications.emailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Product Updates</p>
                  <p className="text-sm text-muted-foreground">New features and updates</p>
                </div>
                <Switch
                  checked={notifications.productUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, productUpdates: checked })}
                  disabled={!notifications.emailNotifications}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Password Section */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Shield className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Password & Security</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button
                onClick={handleSavePassword}
                disabled={isSavingPassword || !passwordForm.currentPassword || !passwordForm.newPassword}
                className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {isSavingPassword ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Update Password
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                Password changes are simulated in demo mode
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 border-destructive/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full bg-transparent border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
              <Button
                onClick={() => setDeleteDialogOpen(true)}
                variant="outline"
                className="w-full bg-transparent border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Delete Account Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent and cannot be undone. All your resumes, reports, and data will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete Account'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
