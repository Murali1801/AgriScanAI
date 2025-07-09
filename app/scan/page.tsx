"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Camera,
  Upload,
  ImageIcon,
  Zap,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Download,
  Share,
  RefreshCw,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"
import { useState } from "react"
import { useRef } from "react"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedCrop, setSelectedCrop] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loadingStep, setLoadingStep] = useState(0)

  useEffect(() => {
    if (isScanning) {
      setLoadingStep(0)
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 3)
      }, 1200)
      return () => clearInterval(interval)
    }
  }, [isScanning])

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setError(null)
    }
  }

  const handleCropChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrop(e.target.value)
    setError(null)
  }

  const handleScan = async () => {
    setError(null)
    setScanResult(null)
    if (!selectedCrop) {
      setError("Please select a crop.")
      return
    }
    if (!selectedFile) {
      setError("Please upload an image.")
      return
    }
    setIsScanning(true)
    try {
      const formData = new FormData()
      formData.append("model", selectedCrop)
      formData.append("image", selectedFile)
      // Use environment variable for scan API URL
      const SCAN_API_URL = process.env.NEXT_PUBLIC_SCAN_API_URL || ""
      const res = await fetch(SCAN_API_URL + "/predict", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) {
        if (res.status === 400) {
          setError("Missing crop or image. Please check your inputs.")
        } else {
          setError("Server error. Please try again later.")
        }
        setIsScanning(false)
        return
      }
      const data = await res.json()
      setScanResult(data.predicted_class)
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsScanning(false)
    }
  }

  const handleReset = () => {
    setIsScanning(false)
    setScanResult(null)
    setSelectedFile(null)
    setError(null)
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
          <span className="text-foreground">Scan Crops</span>
        </div>

        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">AI Crop Scanner</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Upload leaf images for instant disease detection and treatment recommendations
            </p>
          </div>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* ===== UPLOAD SECTION ===== */}
          <Card className="glass-card hover:glass transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-foreground text-lg sm:text-xl">
                <div className="p-2 gradient-primary rounded-xl animate-pulse-glow">
                  <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span>Upload Leaf Image</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm sm:text-base">
                Take a clear photo of the affected leaf for accurate analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="mb-4">
                  <Label htmlFor="crop-select" className="block mb-2 text-sm font-medium text-foreground">Select Crop</Label>
                  <select
                    id="crop-select"
                    className="w-full rounded-md border border-primary/30 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 text-foreground"
                    value={selectedCrop}
                    onChange={handleCropChange}
                    disabled={isScanning}
                  >
                    <option value="">Choose crop...</option>
                    <option value="rice">Rice</option>
                    <option value="wheat">Wheat</option>
                    <option value="sunflower">Sunflower</option>
                    <option value="maize">Maize</option>
                  </select>
                </div>
                <div className="mb-4">
                  <Label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-foreground">Upload Image</Label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={isScanning}
                  />
                  {selectedFile && <div className="mt-2 text-xs text-muted-foreground">Selected: {selectedFile.name}</div>}
                </div>
                {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
                <Button
                  className="gradient-primary text-white w-full animate-glow"
                  onClick={handleScan}
                  disabled={isScanning || !selectedCrop || !selectedFile}
                >
                  {isScanning ? "Scanning..." : "Scan Image"}
                </Button>
              </div>
              {isScanning && (
                <div className="flex flex-col items-center mt-6">
                  {/* Animated scanning icon with pulse and gradient */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary via-pink to-chart-2 animate-pulse-glow flex items-center justify-center shadow-lg">
                      <Zap className="h-8 w-8 text-white animate-bounce" />
                    </div>
                    {/* Animated scanning ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin-slow absolute"></span>
                    </div>
                  </div>
                  {/* Animated dots */}
                  <div className="flex space-x-1 mb-2">
                    <span className={`h-2 w-2 rounded-full bg-primary ${loadingStep===0?"opacity-100":"opacity-40"} transition-opacity duration-300`}></span>
                    <span className={`h-2 w-2 rounded-full bg-pink ${loadingStep===1?"opacity-100":"opacity-40"} transition-opacity duration-300`}></span>
                    <span className={`h-2 w-2 rounded-full bg-chart-2 ${loadingStep===2?"opacity-100":"opacity-40"} transition-opacity duration-300`}></span>
                  </div>
                  {/* Cycling status text */}
                  <div className="text-muted-foreground text-sm font-medium mb-2 min-h-[1.5em]">
                    {loadingStep === 0 && "Uploading image..."}
                    {loadingStep === 1 && "Analyzing with AI..."}
                    {loadingStep === 2 && "Almost done..."}
                  </div>
                  <Progress value={75} className="w-full h-2" />
                </div>
              )}
              {scanResult && !isScanning && (
                <div className="flex flex-col items-center mt-6">
                  <div className={`w-12 h-12 ${scanResult === "healthy" ? "gradient-success" : "gradient-secondary"} rounded-full flex items-center justify-center mb-2`}>
                    {scanResult === "healthy" ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : (
                      <CheckCircle className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div className="text-lg font-semibold text-foreground mb-1">Prediction</div>
                  <div className={`text-xl font-bold mb-2 ${scanResult === "healthy" ? "text-green-600" : "text-primary"}`}>
                    {scanResult === "healthy" ? "No disease detected" : scanResult}
                  </div>
                  <Button variant="outline" className="glass mt-2" onClick={handleReset}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Scan Another Image
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ===== RESULTS SECTION ===== */}
          <Card className="glass-card hover:glass transition-all duration-300">
            <CardHeader>
             <CardTitle className="flex items-center space-x-3 text-foreground text-lg sm:text-xl">
               <div className="p-2 gradient-secondary rounded-xl">
                 <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
               </div>
               <span>Analysis Results</span>
             </CardTitle>
             <CardDescription className="text-muted-foreground text-sm sm:text-base">
               AI-powered disease detection and treatment recommendations
             </CardDescription>
            </CardHeader>
            <CardContent>
              {!scanResult ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 glass rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">Upload an image to see analysis results</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Disease Detection */}
                  <div className="glass p-4 sm:p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">Disease Detection</h3>
                      <Badge variant={scanResult === "healthy" ? "success" : "destructive"} className={`${scanResult === "healthy" ? "gradient-success" : "gradient-warning"} text-white border-0`}>
                        {scanResult === "healthy" ? "No disease detected" : scanResult}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Crop Type:</span>
                        <span className="font-medium text-foreground">{selectedCrop}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Disease:</span>
                        <span className="font-medium text-foreground">{scanResult === "healthy" ? "None" : "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Severity:</span>
                        <span className="font-medium text-orange-500">N/A</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Confidence:</span>
                          <span className="font-medium text-foreground">100%</span>
                        </div>
                        <Progress value={100} className="h-2 sm:h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Treatment Recommendation */}
                  <div className="glass p-4 sm:p-6 rounded-xl">
                    <h3 className="font-semibold text-foreground mb-4">Treatment Recommendation</h3>
                    <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                      {scanResult === "healthy" ? "No treatment needed." : "No specific treatment needed for this prediction."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button size="sm" className="gradient-success text-white w-full sm:w-auto">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Treated
                      </Button>
                      <Button size="sm" variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
                        Get Expert Help
                      </Button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button className="flex-1 gradient-primary text-white hover:opacity-90 transition-all duration-300 w-full sm:w-auto">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ===== SCANNING TIPS ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground text-lg sm:text-xl">Tips for Better Scanning</CardTitle>
            <CardDescription className="text-muted-foreground text-sm sm:text-base">
              Follow these guidelines to get the most accurate results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 sm:mb-2">Clear Photos</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Take high-resolution photos in good lighting conditions</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 sm:mb-2">Focus on Symptoms</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Capture affected areas clearly with visible symptoms</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-tertiary rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 sm:mb-2">Multiple Angles</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Take photos from different angles for better analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
