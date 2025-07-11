"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Camera,
  Upload,
  Leaf,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Plus,
  ArrowRight,
  BarChart3,
  History,
  Brain,
  Shield,
  Users,
  Target,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth"
import app from "@/lib/firebase"

export default function DashboardPage() {
  const recentScans = [
    {
      id: 1,
      crop: "Tomato",
      disease: "Early Blight",
      confidence: 94,
      status: "Disease Detected",
      date: "2024-01-15",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      crop: "Wheat",
      disease: "Healthy",
      confidence: 98,
      status: "Healthy",
      date: "2024-01-14",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 3,
      crop: "Cotton",
      disease: "Leaf Curl",
      confidence: 87,
      status: "Disease Detected",
      date: "2024-01-13",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const quickActions = [
    {
      title: "Scan Crops",
      description: "Upload leaf images for AI analysis",
      icon: Camera,
      href: "/scan",
      gradient: "bg-gradient-to-br from-indigo-500 via-pink-400 to-teal-400",
    },
    {
      title: "View History",
      description: "Browse your previous scans",
      icon: History,
      href: "/history",
      gradient: "bg-gradient-to-br from-pink-400 via-yellow-300 to-green-400",
    },
    {
      title: "Analytics",
      description: "View detailed farm insights",
      icon: BarChart3,
      href: "/analytics",
      gradient: "bg-gradient-to-br from-teal-400 via-indigo-400 to-pink-400",
    },
  ]

  // Get current user for greeting
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])
  const displayName = user?.displayName || user?.email?.split("@")[0] || ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-pink/5">
      {/* ===== HERO WELCOME SECTION (restored) ===== */}
      <div className="glass-card p-4 sm:p-8 rounded-2xl relative overflow-hidden mt-4 mb-8 sm:mb-10">
          <div className="absolute inset-0 bg-[#6366F1] opacity-10 animate-fade" />
          <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="mb-4 lg:mb-0 flex-1 min-w-0">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-primary rounded-2xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  {mounted ? `Welcome back${displayName ? ", " + displayName : ""}!` : "Welcome back!"}
                </h1>
              <p className="text-muted-foreground text-base sm:text-xl max-w-full sm:max-w-2xl">
                Monitor your crops and detect diseases early with AI-powered insights. Your smart farming journey continues here.
                </p>
              </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-shrink-0">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground glass px-4 py-3 rounded-xl">
                  <Calendar className="h-4 w-4" />
                  <span>Last scan: 2 hours ago</span>
                </div>
                <Link href="/scan">
                <Button className="gradient-primary text-white hover:opacity-90 transition-all duration-300 px-6 py-3 rounded-xl w-full sm:w-auto">
                    <Plus className="h-5 w-5 mr-2" />
                    New Scan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      {/* ===== MAIN CONTENT ===== */}
      <div>
        {/* ===== QUICK ACTIONS GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 sm:mt-14">
          {quickActions.map((action, index) => (
            <Link key={action.href} href={action.href}>
              <Card className={`glass-card hover:glass transition-all duration-300 group cursor-pointer h-full`}>
                <CardHeader className="text-center pb-4 rounded-t-2xl">
                  <div
                    className={
                      `w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`
                    }
                  >
                    <action.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{action.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">{action.description}</p>
                  <Button
                    variant="outline"
                    className="glass hover:glass-dark bg-transparent group-hover:border-primary/50 transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* ===== STATS OVERVIEW ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 sm:mt-14">
          <Card className="glass-card hover:glass transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 rounded-t-2xl">
              <CardTitle className="text-sm font-medium text-black">Total Scans</CardTitle>
              <div className="p-2 gradient-primary rounded-xl">
                <Camera className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">247</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glass transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Diseases Detected</CardTitle>
              <div className="p-2 gradient-warning rounded-xl group-hover:animate-pulse-glow">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">23</div>
              <p className="text-xs text-muted-foreground">Early detection saved crops</p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glass transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Healthy Crops</CardTitle>
              <div className="p-2 gradient-success rounded-xl group-hover:animate-pulse-glow">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">224</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                91% healthy rate
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glass transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Avg. Confidence</CardTitle>
              <div className="p-2 gradient-tertiary rounded-xl group-hover:animate-pulse-glow">
                <Target className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">93%</div>
              <p className="text-xs text-muted-foreground">High accuracy rate</p>
            </CardContent>
          </Card>
        </div>

        {/* ===== QUICK SCAN SECTION (reorganized for mobile) ===== */}
        <Card className="glass-card hover:glass transition-all duration-300 mt-10 sm:mt-14">
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 sm:p-3 gradient-primary rounded-2xl">
                <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-2xl text-foreground">AI-Powered Quick Scan</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground text-base sm:text-lg mt-2">
              Upload a leaf image to detect diseases instantly with our advanced AI technology
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-2xl p-6 sm:p-12 w-full max-w-md text-center transition-all duration-300 cursor-pointer glass-card hover:glass group relative overflow-hidden mx-auto">
              <div className="absolute inset-0 gradient-hero opacity-5 animate-gradient"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <Upload className="h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 animate-float group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-lg sm:text-2xl font-medium text-foreground mb-2 sm:mb-3">
                  Drop your leaf image here or click to browse
                </p>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-base sm:text-lg">
                  Supports JPG, PNG files up to 10MB • Get results in seconds with 95% accuracy
                </p>
                  <Button className="gradient-primary text-white hover:opacity-90 transition-all duration-300 animate-glow px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl">
                  Choose File
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ===== RECENT SCANS SECTION (reorganized for mobile) ===== */}
        <div className="flex flex-col gap-4 mt-10 sm:mt-14">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-semibold text-foreground">Recent Scans</h2>
                <Link href="/history">
                  <Button variant="outline" size="sm" className="glass hover:glass-dark bg-transparent rounded-xl">
                    View All
                  </Button>
                </Link>
              </div>
          <div className="flex gap-4 overflow-x-auto pb-2 px-2 -mx-2">
                {recentScans.map((scan) => (
              <Card
                    key={scan.id}
                className="min-w-[260px] max-w-xs w-full flex-shrink-0 glass-card hover:glass-dark transition-all duration-300 group"
                  >
                <CardContent className="flex flex-col items-center p-4">
                    <Image
                      src={scan.image || "/placeholder.svg"}
                      alt={scan.crop}
                      width={60}
                      height={60}
                    className="rounded-xl object-cover mb-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-foreground text-base">{scan.crop}</p>
                        <Badge
                          variant={scan.status === "Healthy" ? "default" : "destructive"}
                          className={scan.status === "Healthy" ? "gradient-success text-white border-0" : ""}
                        >
                          {scan.status}
                        </Badge>
                      </div>
                    <p className="text-sm text-muted-foreground mb-1">{scan.disease}</p>
                      <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Conf:</span>
                      <Progress value={scan.confidence} className="w-16 h-2" />
                          <span className="text-xs font-medium text-foreground">{scan.confidence}%</span>
                        </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{scan.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
                ))}
              </div>
        </div>

        {/* ===== Farm Overview (reorganized for mobile) ===== */}
        <Card className="glass-card hover:glass transition-all duration-300 mt-10 sm:mt-14">
            <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                <CardTitle className="text-lg sm:text-xl text-foreground">Farm Overview</CardTitle>
                <CardDescription className="text-muted-foreground text-base sm:text-lg">
                    Your farming statistics and insights
                  </CardDescription>
                </div>
                <Link href="/analytics">
                <Button variant="outline" size="sm" className="glass hover:glass-dark bg-transparent rounded-xl mt-2 sm:mt-0">
                    Analytics
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl text-center group hover:glass-dark transition-all duration-300">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Location</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Punjab, India</span>
                </div>

                <div className="glass p-4 rounded-xl text-center group hover:glass-dark transition-all duration-300">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Leaf className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Primary Crop</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Wheat</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between text-sm gap-1">
                    <span className="text-foreground">Farm Health Score</span>
                    <span className="font-medium text-foreground">91%</span>
                  </div>
                  <Progress value={91} className="h-3" />
                </div>

                <div className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between text-sm gap-1">
                    <span className="text-foreground">Disease Prevention Rate</span>
                    <span className="font-medium text-foreground">87%</span>
                  </div>
                  <Progress value={87} className="h-3" />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button className="w-full gradient-primary text-white hover:opacity-90 transition-all duration-300 rounded-xl py-3">
                  Schedule Expert Consultation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

        {/* ===== AI INSIGHTS SECTION ===== */}
        <Card className="glass-card hover:glass transition-all duration-300 mt-10 sm:mt-14">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-foreground text-2xl">
              <div className="p-3 gradient-primary rounded-2xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span>AI-Powered Insights</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Smart recommendations based on your farm data and AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-xl text-center group hover:glass-dark transition-all duration-300">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Disease Prevention</h3>
                <p className="text-sm text-muted-foreground">Your crops are 87% protected from common diseases</p>
              </div>

              <div className="glass p-6 rounded-xl text-center group hover:glass-dark transition-all duration-300">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Yield Prediction</h3>
                <p className="text-sm text-muted-foreground">Expected 15% increase in yield this season</p>
              </div>

              <div className="glass p-6 rounded-xl text-center group hover:glass-dark transition-all duration-300">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Expert Support</h3>
                <p className="text-sm text-muted-foreground">24/7 AI assistance with expert consultation available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
