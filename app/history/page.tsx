"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, ArrowLeft, Clock, AlertTriangle, CheckCircle } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"
import Image from "next/image"

export default function HistoryPage() {
  const scanHistory = [
    {
      id: 1,
      crop: "Tomato",
      disease: "Early Blight",
      confidence: 94,
      status: "Disease Detected",
      date: "2024-01-15",
      time: "10:30 AM",
      image: "/placeholder.svg?height=80&width=80",
      severity: "Moderate",
    },
    {
      id: 2,
      crop: "Wheat",
      disease: "Healthy",
      confidence: 98,
      status: "Healthy",
      date: "2024-01-14",
      time: "2:15 PM",
      image: "/placeholder.svg?height=80&width=80",
      severity: "None",
    },
    {
      id: 3,
      crop: "Cotton",
      disease: "Leaf Curl",
      confidence: 87,
      status: "Disease Detected",
      date: "2024-01-13",
      time: "9:45 AM",
      image: "/placeholder.svg?height=80&width=80",
      severity: "Severe",
    },
    {
      id: 4,
      crop: "Rice",
      disease: "Brown Spot",
      confidence: 91,
      status: "Disease Detected",
      date: "2024-01-12",
      time: "4:20 PM",
      image: "/placeholder.svg?height=80&width=80",
      severity: "Mild",
    },
    {
      id: 5,
      crop: "Potato",
      disease: "Healthy",
      confidence: 96,
      status: "Healthy",
      date: "2024-01-11",
      time: "11:10 AM",
      image: "/placeholder.svg?height=80&width=80",
      severity: "None",
    },
    {
      id: 6,
      crop: "Corn",
      disease: "Leaf Blight",
      confidence: 89,
      status: "Disease Detected",
      date: "2024-01-10",
      time: "3:30 PM",
      image: "/placeholder.svg?height=80&width=80",
      severity: "Moderate",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-pink/5">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* ===== BREADCRUMB ===== */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-foreground">Scan History</span>
        </div>

        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Scan History</h1>
            <p className="text-muted-foreground">View and manage all your previous crop scans</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" className="glass hover:glass-dark bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" className="glass hover:glass-dark bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* ===== FILTERS ===== */}
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search scans..." className="pl-10 glass" />
              </div>
              <Select>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Filter by crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Crops</SelectItem>
                  <SelectItem value="tomato">Tomato</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="healthy">Healthy</SelectItem>
                  <SelectItem value="disease">Disease Detected</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Sort by date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* ===== SCAN HISTORY GRID ===== */}
        <div className="grid gap-6">
          {scanHistory.map((scan) => (
            <Card key={scan.id} className="glass-card hover:glass transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={scan.image || "/placeholder.svg"}
                      alt={scan.crop}
                      width={80}
                      height={80}
                      className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{scan.crop}</h3>
                        <p className="text-muted-foreground">{scan.disease}</p>
                      </div>
                      <Badge
                        variant={scan.status === "Healthy" ? "default" : "destructive"}
                        className={
                          scan.status === "Healthy"
                            ? "gradient-success text-white border-0"
                            : "gradient-warning text-white border-0"
                        }
                      >
                        {scan.status === "Healthy" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        )}
                        {scan.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Confidence</p>
                        <p className="font-medium text-foreground">{scan.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Severity</p>
                        <p
                          className={`font-medium ${
                            scan.severity === "None"
                              ? "text-green-500"
                              : scan.severity === "Mild"
                                ? "text-yellow-500"
                                : scan.severity === "Moderate"
                                  ? "text-orange-500"
                                  : "text-red-500"
                          }`}
                        >
                          {scan.severity}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-medium text-foreground">{scan.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Time</p>
                        <p className="font-medium text-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {scan.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="glass hover:glass-dark bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="glass hover:glass-dark bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ===== PAGINATION ===== */}
        <div className="flex justify-center">
          <div className="flex space-x-2">
            <Button variant="outline" className="glass hover:glass-dark bg-transparent" disabled>
              Previous
            </Button>
            <Button className="gradient-primary text-white">1</Button>
            <Button variant="outline" className="glass hover:glass-dark bg-transparent">
              2
            </Button>
            <Button variant="outline" className="glass hover:glass-dark bg-transparent">
              3
            </Button>
            <Button variant="outline" className="glass hover:glass-dark bg-transparent">
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
