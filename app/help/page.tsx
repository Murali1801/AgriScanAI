"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Mail,
  ArrowLeft,
  ChevronRight,
  Book,
  Video,
  Users,
  Send,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"

export default function HelpPage() {
  const faqData = [
    {
      question: "How accurate is the AI disease detection?",
      answer:
        "Our AI model has a 95% accuracy rate, trained on over 52,000 verified images from agricultural experts and ICAR institutions.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "We support JPG, PNG, and HEIC formats. Images should be clear, well-lit, and focused on the affected leaf area.",
    },
    {
      question: "Can I use AgriScan offline?",
      answer:
        "Yes, our premium plan includes offline scanning capabilities for areas with limited internet connectivity.",
    },
    {
      question: "How do I get treatment recommendations?",
      answer:
        "After each scan, you'll receive both chemical and organic treatment options based on the detected disease and severity.",
    },
    {
      question: "Is my farm data secure?",
      answer:
        "Absolutely. We use enterprise-grade encryption and never share your personal farming data with third parties.",
    },
  ]

  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      action: "Start Chat",
      available: "24/7 Available",
      gradient: "gradient-primary",
    },
    {
      title: "Phone Support",
      description: "Speak directly with our experts",
      icon: Phone,
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM",
      gradient: "gradient-secondary",
    },
    {
      title: "Email Support",
      description: "Send us detailed questions",
      icon: Mail,
      action: "Send Email",
      available: "Response in 24hrs",
      gradient: "gradient-tertiary",
    },
  ]

  const resources = [
    {
      title: "User Guide",
      description: "Complete guide to using AgriScan AI",
      icon: Book,
      type: "Documentation",
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video instructions",
      icon: Video,
      type: "Videos",
    },
    {
      title: "Community Forum",
      description: "Connect with other farmers",
      icon: Users,
      type: "Community",
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
          <span className="text-foreground">Help & Support</span>
        </div>

        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
            <p className="text-muted-foreground">Get help with AgriScan AI and connect with our support team</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="glass hover:glass-dark bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* ===== SEARCH HELP ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardContent className="pt-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help articles, tutorials, or common issues..."
                className="pl-12 h-12 glass text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* ===== SUPPORT CHANNELS ===== */}
        <div className="grid md:grid-cols-3 gap-6">
          {supportChannels.map((channel, index) => (
            <Card key={index} className="glass-card hover:glass transition-all duration-300 group cursor-pointer">
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 ${channel.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow`}
                >
                  <channel.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-foreground">{channel.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{channel.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Badge variant="outline" className="glass border-primary/20">
                  {channel.available}
                </Badge>
                <Button
                  className={`w-full ${channel.gradient} text-white hover:opacity-90 transition-all duration-300`}
                >
                  {channel.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ===== FREQUENTLY ASKED QUESTIONS ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <div className="p-2 gradient-primary rounded-xl">
                <HelpCircle className="h-5 w-5 text-white" />
              </div>
              <span>Frequently Asked Questions</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Find quick answers to common questions about AgriScan AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="glass p-6 rounded-xl hover:glass-dark transition-all duration-300 group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ===== RESOURCES ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground">Learning Resources</CardTitle>
            <CardDescription className="text-muted-foreground">
              Explore guides, tutorials, and community resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="glass p-6 rounded-xl hover:glass-dark transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <resource.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{resource.title}</h3>
                      <Badge variant="outline" className="glass border-primary/20 text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ===== CONTACT FORM ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground">Send us a Message</CardTitle>
            <CardDescription className="text-muted-foreground">
              Can't find what you're looking for? Send us a detailed message and we'll get back to you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Name</label>
                <Input placeholder="Your full name" className="glass" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input type="email" placeholder="your.email@example.com" className="glass" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Input placeholder="Brief description of your issue" className="glass" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Message</label>
              <Textarea
                placeholder="Please provide detailed information about your question or issue..."
                className="glass min-h-[120px]"
              />
            </div>
            <Button className="gradient-primary text-white hover:opacity-90 transition-all duration-300">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
