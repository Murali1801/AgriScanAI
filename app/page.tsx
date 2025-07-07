"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Camera, Brain, Shield, Users, TrendingUp, ArrowRight, Menu, Sparkles } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRef } from "react"
import React from "react"

export default function LandingPage() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const solutionRef = useRef<HTMLDivElement>(null)
  const [highlight, setHighlight] = React.useState(false)
  const [solutionHighlight, setSolutionHighlight] = React.useState(false)

  const handleFeaturesClick = (e: React.MouseEvent) => {
    e.preventDefault()
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
    setHighlight(true)
    setTimeout(() => setHighlight(false), 1200)
  }

  const handleSolutionClick = (e: React.MouseEvent) => {
    e.preventDefault()
    solutionRef.current?.scrollIntoView({ behavior: "smooth" })
    setSolutionHighlight(true)
    setTimeout(() => setSolutionHighlight(false), 1200)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== HEADER SECTION ===== */}
      <header className="sticky top-0 z-50 w-full glass backdrop-blur-md border-b border-white/10">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 gradient-primary rounded-lg animate-glow">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">AgriScan AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              onClick={handleFeaturesClick}
            >
              Features
            </a>
            <a
              href="#solution"
              className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
              onClick={handleSolutionClick}
            >
              Solution
            </a>
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <ThemeToggle />
            <Link href="/signup">
              <Button className="gradient-primary text-white hover:opacity-90 transition-all duration-300 animate-glow">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="glass">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-card">
                <div className="flex flex-col space-y-4 mt-8">
                  <a
                    href="#features"
                    className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
                    onClick={handleFeaturesClick}
                  >
                    Features
                  </a>
                  <a
                    href="#solution"
                    className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
                    onClick={handleSolutionClick}
                  >
                    Solution
                  </a>
                  <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
                    Login
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full gradient-primary text-white">Get Started</Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-pink/5">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-pink/10 to-chart-2/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 gradient-hero rounded-full blur-3xl opacity-20 animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 gradient-secondary rounded-full blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto text-center relative z-10">
          {/* Hero Badge */}
          <Badge className="mb-6 glass text-primary border-primary/20 animate-float px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Agriculture Revolution
          </Badge>

          {/* Hero Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-float">
            Protect Your Crops with
            <span className="bg-gradient-to-r from-primary via-pink to-chart-2 bg-clip-text text-transparent block mt-2">
              Smart AI Detection
            </span>
          </h1>

          {/* Hero Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
            Instantly identify crop diseases through leaf image uploads. Get real-time results with treatment
            recommendations to save your harvest and increase yields.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup">
              <Button size="lg" className="gradient-primary text-white hover:opacity-90 text-lg px-8 py-4 animate-glow">
                Start Scanning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 glass hover:glass-dark transition-all duration-300 bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          {/* Hero Process Visualization */}
          <div className="animate-float">
            <div className="glass-card rounded-2xl p-8 inline-block max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center group">
                  <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-glow group-hover:scale-110 transition-transform duration-300">
                    <Camera className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Upload Image</h3>
                  <p className="text-sm text-muted-foreground">Take a photo of your crop leaf</p>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 animate-glow group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">Advanced AI processes your image</p>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 gradient-tertiary rounded-full flex items-center justify-center mx-auto mb-4 animate-glow group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-lg">Get Results</h3>
                  <p className="text-sm text-muted-foreground">Instant diagnosis & treatment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM STATEMENT SECTION ===== */}
      <section className="py-20 relative bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">The Crisis Facing Indian Farmers</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Smallholder farmers are losing their livelihoods due to preventable crop diseases
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="glass-card hover:glass transition-all duration-300 border-red-200/20 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">85%</span>
                </div>
                <CardTitle className="text-red-500 text-xl">Farmers Affected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Smallholder farmers forming 85% of India's agricultural community lack access to agricultural experts
                  in remote areas.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:glass transition-all duration-300 border-red-200/20 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg font-bold text-white">30-40%</span>
                </div>
                <CardTitle className="text-red-500 text-xl">Crop Losses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Annual devastating losses due to diseases like blight, rust, and mildew that could be prevented with
                  early detection.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:glass transition-all duration-300 border-red-200/20 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">50%</span>
                </div>
                <CardTitle className="text-red-500 text-xl">Higher Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Misdiagnosis and overuse of broad-spectrum pesticides increase costs while causing environmental harm.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION SECTION ===== */}
      <section
        id="solution"
        ref={solutionRef}
        className={`py-20 bg-gradient-to-br from-background to-primary/5 transition-all duration-700 ${solutionHighlight ? "ring-4 ring-primary/40" : ""}`}
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Our AI-Powered Solution</h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
              AgriScan AI uses advanced CNN technology to provide instant, accurate crop disease identification
            </p>
          </div>

          {/* Solution Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Features List */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4 glass-card p-6 rounded-xl hover:glass transition-all duration-300 group">
                <div className="flex-shrink-0 w-12 h-12 gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Instant Image Analysis</h3>
                  <p className="text-muted-foreground">
                    Simply upload a photo of your crop leaf and get results in seconds with 95% accuracy
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 glass-card p-6 rounded-xl hover:glass transition-all duration-300 group">
                <div className="flex-shrink-0 w-12 h-12 gradient-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">AI-Powered Accuracy</h3>
                  <p className="text-muted-foreground">
                    Trained on 52,000+ images across 15 crops and 30 diseases with ICAR verification
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 glass-card p-6 rounded-xl hover:glass transition-all duration-300 group">
                <div className="flex-shrink-0 w-12 h-12 gradient-tertiary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Treatment Recommendations</h3>
                  <p className="text-muted-foreground">
                    Get both chemical pesticide and organic treatment options for every diagnosis
                  </p>
                </div>
              </div>
            </div>

            {/* AI Visualization */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="text-center">
                <div className="relative">
                  <div className="w-32 h-32 gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
                    <Leaf className="h-16 w-16 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 gradient-secondary rounded-full flex items-center justify-center animate-float">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div
                    className="absolute -bottom-4 -left-4 w-16 h-16 gradient-tertiary rounded-full flex items-center justify-center animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">AI Disease Detection</h3>
                <p className="text-muted-foreground">
                  Advanced machine learning algorithms analyze leaf patterns, colors, and textures to identify diseases
                  with 95% accuracy in real-time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section
        id="features"
        ref={featuresRef}
        className={`py-20 bg-gradient-to-b from-background via-pink/5 to-primary/5 transition-all duration-700 ${highlight ? "ring-4 ring-primary/40" : ""}`}
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools designed to revolutionize agricultural practices
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Card className="glass-card hover:glass transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-glow group-hover:scale-110 transition-all duration-300">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">15 Crop Types</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Support for major crops including wheat, rice, cotton, tomato, and more
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:glass transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-glow group-hover:scale-110 transition-all duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">30 Disease Types</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Comprehensive database covering blight, rust, mildew, and other common diseases
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:glass transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gradient-tertiary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-glow group-hover:scale-110 transition-all duration-300">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Real-time Scanning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Instant results with high accuracy powered by advanced CNN models
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:glass transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-glow group-hover:scale-110 transition-all duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Expert Verified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Developed with ICAR using verified ground-truth data for reliability
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:glass transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-glow group-hover:scale-110 transition-all duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Treatment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Both chemical and organic treatment recommendations for every diagnosis
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:glass transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gradient-tertiary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:animate-glow group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Offline Capable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Works in remote areas with limited internet connectivity
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION SECTION ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-cta animate-gradient"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Protect Your Crops?</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Join thousands of farmers already using AgriScan AI to save their harvests and increase yields
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-4 animate-glow font-semibold"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== FOOTER SECTION ===== */}
      <footer className="glass-card border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          {/* Footer Content */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 gradient-primary rounded-lg">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">AgriScan AI</span>
              </div>
              <p className="text-muted-foreground">
                Empowering farmers with AI-powered crop disease detection for a sustainable future
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#solution" className="hover:text-primary transition-colors">
                    Solution
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Training
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AgriScan AI. All rights reserved. Built with ❤️ for farmers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
