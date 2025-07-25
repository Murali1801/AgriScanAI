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
import app, { db } from "@/lib/firebase"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"

export default function DashboardPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [mounted, setMounted] = useState(false)
  const [scans, setScans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    const auth = getAuth(app)
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribeAuth()
  }, [])

  useEffect(() => {
    if (!user) return
    const q = query(collection(db, "users", user.uid, "scans"), orderBy("createdAt", "desc"))
    const unsub = onSnapshot(q, (snapshot) => {
      setScans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setLoading(false)
    })
    return () => unsub()
  }, [user])

  // Compute stats
  const totalScans = scans.length
  const healthyCount = scans.filter(s => s.scanResult?.status === "healthy" || s.scanResult?.status === "Healthy").length
  const diseasedCount = scans.filter(s => s.scanResult?.status === "diseased" || s.scanResult?.status === "Disease Detected").length
  const avgConfidence = scans.length > 0 ? Math.round(scans.reduce((sum, s) => sum + (parseFloat(s.scanResult?.confidence) || 0), 0) / scans.length) : 0
  const displayName = user?.displayName || user?.email?.split("@")?.[0] || ""
  const recentScans = scans.slice(0, 5)

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
            {loading ? (
              <div className="text-muted-foreground py-8">Loading...</div>
            ) : recentScans.length === 0 ? (
              <div className="text-muted-foreground py-8">No recent scans.</div>
            ) : (
              recentScans.map((scan) => {
                const result = scan.scanResult || {}
                const isHealthy = result.status === "healthy" || result.status === "Healthy"
                const crop = result.crop || "Unknown"
                const disease = result.disease_name || result.message || "Healthy"
                const confidence = result.confidence || "-"
                const createdAt = scan.createdAt?.toDate ? scan.createdAt.toDate() : null
                const date = createdAt ? createdAt.toLocaleDateString() : "-"
                return (
                  <Card
                    key={scan.id}
                    className="min-w-[260px] max-w-xs w-full flex-shrink-0 glass-card hover:glass-dark transition-all duration-300 group"
                  >
                    <CardContent className="flex flex-col items-center p-4">
                      <Image
                        src={scan.imageUrl || "/placeholder.svg"}
                        alt={crop}
                        width={60}
                        height={60}
                        className="rounded-xl object-cover mb-2 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-foreground text-base">{crop}</p>
                          <Badge
                            variant={isHealthy ? "default" : "destructive"}
                            className={isHealthy ? "gradient-success text-white border-0" : "gradient-warning text-white border-0"}
                          >
                            {isHealthy ? "Healthy" : "Disease Detected"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{disease}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Conf:</span>
                          <Progress value={parseFloat(confidence) || 0} className="w-16 h-2" />
                          <span className="text-xs font-medium text-foreground">{confidence}%</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>

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
