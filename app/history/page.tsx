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
import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import jsPDF from "jspdf"

export default function HistoryPage() {
  const [scans, setScans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedScan, setSelectedScan] = useState<any | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const auth = getAuth()
    const user = auth.currentUser
    if (!user) return
    const q = query(collection(db, "users", user.uid, "scans"), orderBy("createdAt", "desc"))
    const unsub = onSnapshot(q, (snapshot) => {
      setScans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleViewDetails = (scan: any) => {
    setSelectedScan(scan)
    setModalOpen(true)
  }

  const handleDownloadReport = (scan: any) => {
    const result = scan.scanResult || {}
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Crop Scan Report", 14, 20)
    doc.setFontSize(12)
    doc.text(`Crop: ${result.crop || "Unknown"}`, 14, 35)
    doc.text(`Disease: ${result.disease_name || result.message || "Healthy"}`, 14, 45)
    doc.text(`Confidence: ${result.confidence || "-"}`, 14, 55)
    doc.text(`Severity: ${result.affected_percentage || "-"}`, 14, 65)
    doc.text(`Status: ${result.status || "-"}`, 14, 75)
    doc.text(`Date: ${scan.createdAt?.toDate ? scan.createdAt.toDate().toLocaleDateString() : "-"}`, 14, 85)
    doc.text(`Time: ${scan.createdAt?.toDate ? scan.createdAt.toDate().toLocaleTimeString() : "-"}`, 14, 95)
    doc.save(`scan-report-${result.crop || "unknown"}-${scan.id}.pdf`)
  }

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
          <span className="text-foreground">Scan History</span>
        </div>

        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Scan History</h1>
            <p className="text-muted-foreground text-sm sm:text-base">View and manage all your previous crop scans</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* ===== FILTERS ===== */}
        <Card className="glass-card">
          <CardContent className="pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
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
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="text-center text-muted-foreground py-8">Loading scan history...</div>
          ) : scans.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">No scans found.</div>
          ) : (
            scans.map((scan) => {
              const result = scan.scanResult || {}
              const isHealthy = result.status === "healthy" || result.status === "Healthy"
              const crop = result.crop || "Unknown"
              const disease = result.disease_name || result.message || "Healthy"
              const confidence = result.confidence || "-"
              const severity = result.affected_percentage || "-"
              const createdAt = scan.createdAt?.toDate ? scan.createdAt.toDate() : null
              const date = createdAt ? createdAt.toLocaleDateString() : "-"
              const time = createdAt ? createdAt.toLocaleTimeString() : "-"
              return (
                <Card key={scan.id} className="glass-card hover:glass transition-all duration-300 group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <Image
                          src={scan.imageUrl || "/placeholder.svg"}
                          alt={crop}
                          width={80}
                          height={80}
                          className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-foreground">{crop}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{disease}</p>
                          </div>
                          <Badge
                            variant={isHealthy ? "default" : "destructive"}
                            className={isHealthy ? "gradient-success text-white border-0" : "gradient-warning text-white border-0"}
                          >
                            {isHealthy ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <AlertTriangle className="h-3 w-3 mr-1" />
                            )}
                            {isHealthy ? "Healthy" : "Disease Detected"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Confidence</p>
                            <p className="font-medium text-foreground">{confidence}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Severity</p>
                            <p className="font-medium text-orange-500">{severity}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Date</p>
                            <p className="font-medium text-foreground">{date}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Time</p>
                            <p className="font-medium text-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {time}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button size="sm" variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto" onClick={() => handleViewDetails(scan)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto" onClick={() => handleDownloadReport(scan)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* ===== PAGINATION ===== */}
        <div className="flex flex-col sm:flex-row justify-center gap-2">
          <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto" disabled>
            Previous
          </Button>
          <Button className="gradient-primary text-white w-full sm:w-auto">1</Button>
          <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
            2
          </Button>
          <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
            3
          </Button>
          <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
            Next
          </Button>
        </div>
      </main>

      {/* ===== SCAN DETAILS MODAL ===== */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan Details</DialogTitle>
            <DialogDescription>
              Detailed information about your crop scan.
            </DialogDescription>
          </DialogHeader>
          {selectedScan && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src={selectedScan.imageUrl || "/placeholder.svg"}
                  alt={selectedScan.scanResult?.crop || "Scan Image"}
                  width={160}
                  height={160}
                  className="rounded-xl object-cover"
                />
              </div>
              <div>
                <p><strong>Crop:</strong> {selectedScan.scanResult?.crop || "Unknown"}</p>
                <p><strong>Disease:</strong> {selectedScan.scanResult?.disease_name || selectedScan.scanResult?.message || "Healthy"}</p>
                <p><strong>Status:</strong> {selectedScan.scanResult?.status || "-"}</p>
                <p><strong>Confidence:</strong> {selectedScan.scanResult?.confidence || "-"}</p>
                <p><strong>Severity:</strong> {selectedScan.scanResult?.affected_percentage || "-"}</p>
                <p><strong>Date:</strong> {selectedScan.createdAt?.toDate ? selectedScan.createdAt.toDate().toLocaleDateString() : "-"}</p>
                <p><strong>Time:</strong> {selectedScan.createdAt?.toDate ? selectedScan.createdAt.toDate().toLocaleTimeString() : "-"}</p>
                {selectedScan.fileName && <p><strong>File Name:</strong> {selectedScan.fileName}</p>}
              </div>
            </div>
          )}
          <DialogClose asChild>
            <Button className="mt-4 w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
