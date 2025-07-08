"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowLeft,
  Download,
  RefreshCw,
  Target,
  Shield,
  Leaf,
  AlertTriangle,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"

export default function AnalyticsPage() {
  const monthlyData = [
    { month: "Jan", scans: 45, diseases: 8, healthy: 37 },
    { month: "Feb", scans: 52, diseases: 12, healthy: 40 },
    { month: "Mar", scans: 38, diseases: 6, healthy: 32 },
    { month: "Apr", scans: 61, diseases: 15, healthy: 46 },
    { month: "May", scans: 55, diseases: 9, healthy: 46 },
    { month: "Jun", scans: 67, diseases: 11, healthy: 56 },
  ]

  const cropData = [
    { crop: "Wheat", scans: 89, diseases: 12, healthyRate: 86 },
    { crop: "Tomato", scans: 67, diseases: 18, healthyRate: 73 },
    { crop: "Cotton", scans: 45, diseases: 8, healthyRate: 82 },
    { crop: "Rice", scans: 34, diseases: 5, healthyRate: 85 },
    { crop: "Potato", scans: 23, diseases: 3, healthyRate: 87 },
  ]

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
          <span className="text-foreground">Analytics</span>
        </div>

        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Farm Analytics</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Comprehensive insights into your crop health and farming patterns</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* ===== KEY METRICS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="glass-card hover:glass transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Scans</CardTitle>
              <div className="p-2 gradient-primary rounded-xl group-hover:animate-pulse-glow">
                <BarChart3 className="h-4 w-4 text-white" />
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
              <CardTitle className="text-sm font-medium text-foreground">Disease Detection Rate</CardTitle>
              <div className="p-2 gradient-warning rounded-xl group-hover:animate-pulse-glow">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">9.3%</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                -2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glass transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Prevention Success</CardTitle>
              <div className="p-2 gradient-success rounded-xl group-hover:animate-pulse-glow">
                <Shield className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">87%</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glass transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">AI Accuracy</CardTitle>
              <div className="p-2 gradient-tertiary rounded-xl group-hover:animate-pulse-glow">
                <Target className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">93%</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +1.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ===== MONTHLY TRENDS ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <div className="p-2 gradient-ocean rounded-xl">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span>Monthly Scan Trends</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground">
              Track your scanning activity and disease detection over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {monthlyData.map((data, index) => (
                <div
                  key={data.month}
                  className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-0 p-3 sm:p-4 glass rounded-xl hover:glass-dark transition-all duration-300"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-primary rounded-xl flex items-center justify-center">
                      <span className="text-white font-semibold">{data.month}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm sm:text-base">{data.scans} Total Scans</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {data.diseases} diseases detected, {data.healthy} healthy
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-muted-foreground">Health Rate</p>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{Math.round((data.healthy / data.scans) * 100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ===== CROP ANALYSIS ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <div className="p-2 gradient-success rounded-xl">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span>Crop-wise Analysis</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground">
              Detailed breakdown of health metrics by crop type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              {cropData.map((crop, index) => (
                <div key={crop.crop} className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-2 sm:gap-0">
                    <div>
                      <h3 className="font-medium text-foreground text-sm sm:text-base">{crop.crop}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {crop.scans} scans • {crop.diseases} diseases detected
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground text-sm sm:text-base">{crop.healthyRate}%</p>
                      <p className="text-xs text-muted-foreground">Health Rate</p>
                    </div>
                  </div>
                  <Progress value={crop.healthyRate} className="h-2 sm:h-3" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ===== INSIGHTS & RECOMMENDATIONS ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          <Card className="glass-card hover:glass transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-foreground text-base sm:text-lg">Key Insights</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                AI-generated insights from your farming data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="glass p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 gradient-success rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-foreground">Disease Prevention Improving</p>
                    <p className="text-sm text-muted-foreground">
                      Your early detection rate has improved by 15% this month, leading to better crop protection.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 gradient-warning rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-foreground">Tomato Crop Attention Needed</p>
                    <p className="text-sm text-muted-foreground">
                      Tomato crops show higher disease rates. Consider preventive measures during humid conditions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 gradient-primary rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-foreground">Optimal Scanning Frequency</p>
                    <p className="text-sm text-muted-foreground">
                      Your current scanning frequency is optimal for early disease detection.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:glass transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-foreground text-base sm:text-lg">Recommendations</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                Personalized recommendations to improve your farm health
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="glass p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Increase Tomato Monitoring</p>
                    <p className="text-sm text-muted-foreground">
                      Scan tomato crops twice weekly during monsoon season to catch early blight symptoms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Preventive Treatment Schedule</p>
                    <p className="text-sm text-muted-foreground">
                      Apply organic fungicides every 15 days as a preventive measure for high-risk crops.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass p-4 rounded-xl">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 gradient-tertiary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Expert Consultation</p>
                    <p className="text-sm text-muted-foreground">
                      Schedule monthly consultations with agricultural experts for advanced crop management.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
