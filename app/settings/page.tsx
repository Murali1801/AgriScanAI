"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Shield,
  Smartphone,
  Eye,
  Download,
  Trash2,
  CreditCard,
  AlertTriangle,
  Palette,
  ArrowLeft,
  Save,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-pink/5">
      <DashboardHeader />

      <main className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* ===== BREADCRUMB ===== */}
        <div className="flex flex-wrap items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-foreground">Settings</span>
        </div>

        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage your account preferences and application settings</p>
          </div>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* ===== THEME SETTINGS ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <div className="p-2 gradient-primary rounded-xl">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <span>Theme Settings</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Customize the appearance of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-foreground">Theme Preference</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light Mode</SelectItem>
                  <SelectItem value="dark">Dark Mode</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Choose your preferred theme or let the system decide based on your device settings
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5">
                <Label className="text-foreground">Glassmorphism Effects</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Enable modern glass-like visual effects</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5">
                <Label className="text-foreground">Animations</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Enable smooth transitions and animations</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* ===== ACCOUNT SETTINGS ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <div className="p-2 gradient-secondary rounded-xl">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span>Account Security</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your account security and password settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-foreground">
                Current Password
              </Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password" className="glass" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-foreground">
                  New Password
                </Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" className="glass" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirm New Password
                </Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" className="glass" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5">
                <Label className="text-foreground">Two-Factor Authentication</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch />
            </div>

            <Button className="gradient-primary text-white hover:opacity-90 transition-all duration-300 w-full sm:w-auto">
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* ===== NOTIFICATION SETTINGS ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <div className="p-2 gradient-tertiary rounded-xl">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <span>Notification Settings</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose how you want to be notified about important updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5">
                <Label className="text-foreground">Disease Detection Alerts</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Get notified when diseases are detected in your scans</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5">
                <Label className="text-foreground">Weekly Reports</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Receive weekly summaries of your farm health</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5">
                <Label className="text-foreground">Treatment Reminders</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Reminders for recommended treatments</p>
              </div>
              <Switch />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5">
                <Label className="text-foreground">Marketing Communications</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Updates about new features and farming tips</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* ===== APP PREFERENCES ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <div className="p-2 gradient-success rounded-xl">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
              <span>App Preferences</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">Customize your AgriScan AI experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language" className="text-foreground">
                Language
              </Label>
              <Select defaultValue="english">
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="punjabi">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                  <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="units" className="text-foreground">
                Measurement Units
              </Label>
              <Select defaultValue="metric">
                <SelectTrigger className="glass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (Acres, Celsius)</SelectItem>
                  <SelectItem value="imperial">Imperial (Hectares, Fahrenheit)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5">
                <Label className="text-foreground">Auto-save Scan Results</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Automatically save all scan results to your history</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5">
                <Label className="text-foreground">Offline Mode</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Enable scanning without internet connection</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* ===== PRIVACY SETTINGS ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <div className="p-2 gradient-warning rounded-xl">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <span>Privacy Settings</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Control your data and privacy preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5">
                <Label className="text-foreground">Data Analytics</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Help improve our AI by sharing anonymous usage data</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="space-y-0.5">
                <Label className="text-foreground">Location Services</Label>
                <p className="text-xs sm:text-sm text-muted-foreground">Allow location access for weather and regional insights</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div>
                  <Label className="text-foreground">Download My Data</Label>
                  <p className="text-xs sm:text-sm text-muted-foreground">Get a copy of all your data</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass hover:glass-dark transition-all duration-300 bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ===== SUBSCRIPTION & BILLING ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <div className="p-2 gradient-ocean rounded-xl">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <span>Subscription & Billing</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your subscription and payment methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 p-6 border rounded-xl glass">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-foreground">Premium Plan</h3>
                  <Badge className="gradient-success text-white border-0">Active</Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Unlimited scans, priority support</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Next billing: March 15, 2024</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">₹999/month</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass hover:glass-dark transition-all duration-300 bg-transparent mt-2"
                >
                  Manage Plan
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Payment Method</Label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 p-4 border rounded-xl glass">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-5 gradient-primary rounded"></div>
                  <span className="text-sm text-foreground">•••• •••• •••• 4242</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass hover:glass-dark transition-all duration-300 bg-transparent"
                >
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ===== DANGER ZONE ===== */}
        <Card className="glass-card hover:glass transition-all duration-300 border-red-200/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-500">
              <AlertTriangle className="h-5 w-5" />
              <span>Danger Zone</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 p-4 border border-red-200/20 rounded-xl glass">
              <div>
                <h3 className="font-medium text-red-500">Delete Account</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ===== SAVE CHANGES ===== */}
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          <Button variant="outline" className="glass hover:glass-dark transition-all duration-300 bg-transparent">
            Reset to Defaults
          </Button>
          <Button className="gradient-primary text-white hover:opacity-90 transition-all duration-300">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </main>
    </div>
  )
}
