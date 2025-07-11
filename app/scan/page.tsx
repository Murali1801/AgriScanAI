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
import React, { useState, useRef } from "react"

type ScanResultHealthy = {
  crop: string
  message: string
  recommended_practices: string
  status: "healthy"
}
type ScanResultDiseased = {
  affected_percentage: string
  chemical_remedy: string
  crop: string
  disease_name: string
  organic_remedy: string
  preventive_measures: string
  recommended_action: string
  status: "diseased"
  symptoms: string
}
type ScanResult = ScanResultHealthy | ScanResultDiseased | null

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult>(null)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setIsScanning(true)
      setScanResult(null)
      setError("")
      try {
        const formData = new FormData()
        formData.append("image", file)
        const response = await fetch("https://agriscanapi.onrender.com/analyze-leaf", {
          method: "POST",
          body: formData,
        })
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(errorText || `API error: ${response.status}`)
        }
        const data = await response.json()
        setScanResult(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to analyze image. Please try again.")
      } finally {
        setIsScanning(false)
      }
    }
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

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {/* ===== UPLOAD SECTION ===== */}
          <Card className="glass-card hover:glass transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-foreground text-lg sm:text-xl">
                <div className="p-2 gradient-primary rounded-xl animate-pulse-glow">
                  <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-semibold">Upload Leaf Image</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs sm:text-sm md:text-base">
                Take a clear photo of the affected leaf for accurate analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-primary/30 hover:border-primary/60 rounded-2xl p-4 sm:p-6 md:p-12 text-center transition-all duration-300 cursor-pointer glass-card hover:glass group relative overflow-hidden">
                <div className="absolute inset-0 gradient-hero opacity-5 animate-gradient"></div>
                <div className="relative z-10">
                  {!isScanning && !scanResult && (
                    <>
                      <Upload className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4 sm:mb-6 animate-float group-hover:scale-110 transition-transform duration-300" />
                      <p className="text-base sm:text-xl font-medium text-foreground mb-2 sm:mb-3">
                        Drop your leaf image here or click to browse
                      </p>
                      <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">Supports JPG, PNG files up to 10MB</p>
                      <Button
                        className="gradient-primary text-white hover:opacity-90 transition-all duration-300 animate-glow px-6 sm:px-8 py-3 w-full sm:w-auto"
                        onClick={handleChooseFile}
                      >
                        Choose File & Scan
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </>
                  )}

                  {isScanning && (
                    <div className="flex flex-col items-center justify-center space-y-6 py-8">
                      {/* Custom animated leaf spinner */}
                      <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="absolute animate-spin-slow" width="64" height="64" viewBox="0 0 64 64" fill="none">
                          <ellipse cx="32" cy="32" rx="28" ry="12" fill="#22c55e" fillOpacity="0.15" />
                          <ellipse cx="32" cy="32" rx="20" ry="8" fill="#22c55e" fillOpacity="0.25" />
                        </svg>
                        <svg className="relative animate-bounce" width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path d="M16 2C10 10 2 18 16 30C30 18 22 10 16 2Z" fill="#22c55e" className="animate-pulse" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-base sm:text-xl font-medium text-foreground mb-1 sm:mb-2 text-center">Analyzing Image...</p>
                        <p className="text-muted-foreground mb-2 sm:mb-4 text-sm sm:text-base text-center">AI is processing your leaf image</p>
                        <div className="w-40 mx-auto mt-2">
                          <div className="h-2 rounded-full bg-primary/20 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-primary via-pink to-chart-2 animate-gradient-x rounded-full w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Minimal success state after result is generated */}
                  {!isScanning && scanResult && (
                    <div className="flex flex-col items-center justify-center space-y-4 py-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-success rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-pulse" />
                      </div>
                      <p className="text-lg sm:text-xl font-semibold text-foreground mb-1">Scan Complete!</p>
                      <Button
                        variant="outline"
                        className="glass hover:glass-dark bg-transparent w-full sm:w-auto"
                        onClick={() => {
                          setIsScanning(false)
                          setScanResult(null)
                          setError("")
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Scan Another Image
                      </Button>
                    </div>
                  )}
                  {error && (
                    <div className="text-center text-red-500 font-medium mt-4">{error}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ===== RESULTS SECTION ===== */}
          <Card className="glass-card hover:glass transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-foreground text-lg sm:text-xl">
                <div className="p-2 gradient-secondary rounded-xl">
                  <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-semibold">Analysis Results</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs sm:text-sm md:text-base">
                AI-powered disease detection and treatment recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!scanResult ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 glass rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm md:text-base">Upload an image to see analysis results</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {scanResult.status === "healthy" ? (
                    <div className="glass p-4 sm:p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Crop Health</h3>
                        <Badge variant="default" className="gradient-success text-white border-0">
                          Healthy
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Crop Type:</span>
                          <span className="font-medium text-foreground">{scanResult.crop}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium text-green-600">{scanResult.status}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Message:</span>
                          <span className="font-medium text-foreground">{scanResult.message}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Recommended Practices:</span>
                          <span className="font-medium text-foreground">{scanResult.recommended_practices}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    scanResult.status === "diseased" && (
                      <>
                        <div className="glass p-4 sm:p-6 rounded-xl">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-foreground">Disease Detection</h3>
                            <Badge variant="destructive" className="gradient-warning text-white border-0">
                              {scanResult.status}
                            </Badge>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Crop Type:</span>
                              <span className="font-medium text-foreground">{scanResult.crop}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Disease:</span>
                              <span className="font-medium text-foreground">{scanResult.disease_name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Symptoms:</span>
                              <span className="font-medium text-foreground">{scanResult.symptoms}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Affected %:</span>
                              <span className="font-medium text-orange-500">{scanResult.affected_percentage}</span>
                            </div>
                          </div>
                        </div>
                        <div className="glass p-4 sm:p-6 rounded-xl">
                          <h3 className="font-semibold text-foreground mb-4">Treatment Recommendation</h3>
                          <div className="mb-2">
                            <span className="font-semibold text-foreground">Chemical Remedy: </span>
                            <span className="text-muted-foreground">{scanResult.chemical_remedy}</span>
                          </div>
                          <div className="mb-2">
                            <span className="font-semibold text-foreground">Organic Remedy: </span>
                            <span className="text-muted-foreground">{scanResult.organic_remedy}</span>
                          </div>
                          <div className="mb-2">
                            <span className="font-semibold text-foreground">Preventive Measures: </span>
                            <span className="text-muted-foreground">{scanResult.preventive_measures}</span>
                          </div>
                          <div className="mb-2">
                            <span className="font-semibold text-foreground">Recommended Action: </span>
                            <span className="text-muted-foreground">{scanResult.recommended_action}</span>
                          </div>
                        </div>
                      </>
                    )
                  )}
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
