"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Camera, Edit, Save, ArrowLeft } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import Link from "next/link"

export default function ProfilePage() {
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
          <span className="text-foreground">Profile</span>
        </div>

        {/* ===== PAGE HEADER ===== */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your personal information and farming details</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" className="glass hover:glass-dark bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* ===== PROFILE HEADER ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                  <AvatarFallback className="text-2xl gradient-primary text-white">JD</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0 gradient-primary text-white"
                >
                  <Camera className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4 mb-4">
                  <h2 className="text-3xl font-bold text-foreground">John Doe</h2>
                  <Badge className="gradient-success text-white border-0 w-fit mx-auto md:mx-0">Verified Farmer</Badge>
                </div>
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 text-muted-foreground">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Punjab, India</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Member since Jan 2024</span>
                  </div>
                </div>
              </div>

              <Button className="gradient-primary text-white hover:opacity-90 transition-all duration-300">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* ===== PERSONAL INFORMATION ===== */}
          <Card className="glass-card hover:glass transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-foreground">Personal Information</CardTitle>
              <CardDescription className="text-muted-foreground">Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">
                    First Name
                  </Label>
                  <Input id="firstName" defaultValue="John" className="glass" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">
                    Last Name
                  </Label>
                  <Input id="lastName" defaultValue="Doe" className="glass" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone Number
                </Label>
                <Input id="phone" type="tel" defaultValue="+91 98765 43210" className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-foreground">
                  Date of Birth
                </Label>
                <Input id="dateOfBirth" type="date" defaultValue="1985-06-15" className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">
                  Address
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter your full address"
                  defaultValue="Village Khanna, District Ludhiana, Punjab, India - 141401"
                  className="glass"
                />
              </div>
            </CardContent>
          </Card>

          {/* ===== FARM INFORMATION ===== */}
          <Card className="glass-card hover:glass transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-foreground">Farm Information</CardTitle>
              <CardDescription className="text-muted-foreground">Details about your farming operation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="farmName" className="text-foreground">
                  Farm Name
                </Label>
                <Input id="farmName" defaultValue="Green Valley Farm" className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmSize" className="text-foreground">
                  Farm Size (in acres)
                </Label>
                <Input id="farmSize" type="number" defaultValue="5.5" className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryCrop" className="text-foreground">
                  Primary Crop
                </Label>
                <Select defaultValue="wheat">
                  <SelectTrigger className="glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="potato">Potato</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryCrops" className="text-foreground">
                  Secondary Crops
                </Label>
                <Input id="secondaryCrops" defaultValue="Mustard, Barley" className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmingExperience" className="text-foreground">
                  Years of Experience
                </Label>
                <Select defaultValue="10-15">
                  <SelectTrigger className="glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10-15">10-15 years</SelectItem>
                    <SelectItem value="15+">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmingType" className="text-foreground">
                  Farming Type
                </Label>
                <Select defaultValue="traditional">
                  <SelectTrigger className="glass">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic">Organic</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ===== ACCOUNT STATISTICS ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-foreground">Account Statistics</CardTitle>
            <CardDescription className="text-muted-foreground">Your AgriScan AI usage overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center glass p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">247</div>
                <p className="text-sm text-muted-foreground">Total Scans</p>
              </div>
              <div className="text-center glass p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-warning bg-clip-text text-transparent">23</div>
                <p className="text-sm text-muted-foreground">Diseases Detected</p>
              </div>
              <div className="text-center glass p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-success bg-clip-text text-transparent">91%</div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="text-center glass p-6 rounded-xl">
                <div className="text-3xl font-bold gradient-tertiary bg-clip-text text-transparent">15</div>
                <p className="text-sm text-muted-foreground">Crops Monitored</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ===== ACTION BUTTONS ===== */}
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          <Button variant="outline" className="glass hover:glass-dark transition-all duration-300 bg-transparent">
            Cancel Changes
          </Button>
          <Button className="gradient-primary text-white hover:opacity-90 transition-all duration-300">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  )
}
