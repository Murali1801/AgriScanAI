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
import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    farmName: "",
    farmSize: "",
    primaryCrop: "wheat",
    secondaryCrops: "",
    farmingExperience: "10-15",
    farmingType: "traditional",
  })
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const auth = getAuth()
        const user = auth.currentUser
        if (!user) throw new Error("Not authenticated")
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        let newProfile = { ...profile }
        if (docSnap.exists()) {
          newProfile = { ...newProfile, ...docSnap.data() }
        } else {
          newProfile.email = user.email || ""
        }
        setProfile(newProfile)
      } catch (e) {
        toast({ title: "Error", description: "Failed to load profile." })
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
    // eslint-disable-next-line
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setProfile((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) throw new Error("Not authenticated")
      const docRef = doc(db, "users", user.uid)
      await setDoc(docRef, profile, { merge: true })
      toast({ title: "Profile updated!", description: "Your changes have been saved." })
    } catch (e) {
      toast({ title: "Error", description: "Failed to save profile." })
    } finally {
      setSaving(false)
    }
  }

  if (!mounted) return null
  if (loading) return <div className="text-center text-muted-foreground py-8">Loading profile...</div>

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
          <span className="text-foreground">Profile</span>
        </div>

        {/* ===== PAGE HEADER ===== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage your personal information and farming details</p>
          </div>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" className="glass hover:glass-dark bg-transparent w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* ===== PROFILE HEADER ===== */}
        <Card className="glass-card hover:glass transition-all duration-300">
          <CardContent className="pt-6 sm:pt-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div className="relative">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                  <AvatarFallback className="text-xl sm:text-2xl gradient-primary text-white">JD</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full p-0 gradient-primary text-white"
                >
                  <Camera className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3 sm:mb-4">
                  <h2 className="text-xl sm:text-3xl font-bold text-foreground">{(profile.firstName || profile.lastName) ? `${profile.firstName} ${profile.lastName}` : "Your Name"}</h2>
                  <Badge className="gradient-success text-white border-0 w-fit mx-auto md:mx-0">Verified Farmer</Badge>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-muted-foreground">
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

              <Button className="gradient-primary text-white hover:opacity-90 transition-all duration-300 w-full md:w-auto mt-4 md:mt-0">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* ===== PERSONAL INFORMATION ===== */}
          <Card className="glass-card hover:glass transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-foreground text-lg sm:text-xl">Personal Information</CardTitle>
              <CardDescription className="text-muted-foreground text-sm sm:text-base">Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">
                    First Name
                  </Label>
                  <Input id="firstName" value={profile.firstName || ""} onChange={handleChange} className="glass" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">
                    Last Name
                  </Label>
                  <Input id="lastName" value={profile.lastName || ""} onChange={handleChange} className="glass" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input id="email" type="email" value={profile.email} onChange={handleChange} className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone Number
                </Label>
                <Input id="phone" type="tel" value={profile.phone} onChange={handleChange} className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-foreground">
                  Date of Birth
                </Label>
                <Input id="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={handleChange} className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground">
                  Address
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter your full address"
                  value={profile.address}
                  onChange={handleChange}
                  className="glass"
                />
              </div>
            </CardContent>
          </Card>

          {/* ===== FARM INFORMATION ===== */}
          <Card className="glass-card hover:glass transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-foreground text-lg sm:text-xl">Farm Information</CardTitle>
              <CardDescription className="text-muted-foreground text-sm sm:text-base">Details about your farming operation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="farmName" className="text-foreground">
                  Farm Name
                </Label>
                <Input id="farmName" value={profile.farmName} onChange={handleChange} className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmSize" className="text-foreground">
                  Farm Size (in acres)
                </Label>
                <Input id="farmSize" type="number" value={profile.farmSize} onChange={handleChange} className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryCrop" className="text-foreground">
                  Primary Crop
                </Label>
                <Select value={profile.primaryCrop} onValueChange={(v) => handleSelectChange("primaryCrop", v)}>
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
                <Input id="secondaryCrops" value={profile.secondaryCrops} onChange={handleChange} className="glass" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmingExperience" className="text-foreground">
                  Years of Experience
                </Label>
                <Select value={profile.farmingExperience} onValueChange={(v) => handleSelectChange("farmingExperience", v)}>
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
                <Select value={profile.farmingType} onValueChange={(v) => handleSelectChange("farmingType", v)}>
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
            <CardTitle className="text-foreground text-lg sm:text-xl">Account Statistics</CardTitle>
            <CardDescription className="text-muted-foreground text-sm sm:text-base">Your AgriScan AI usage overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center glass p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold gradient-primary bg-clip-text text-transparent">247</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Scans</p>
              </div>
              <div className="text-center glass p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold gradient-warning bg-clip-text text-transparent">23</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Diseases Detected</p>
              </div>
              <div className="text-center glass p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold gradient-success bg-clip-text text-transparent">91%</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Accuracy Rate</p>
              </div>
              <div className="text-center glass p-4 sm:p-6 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold gradient-tertiary bg-clip-text text-transparent">15</div>
                <p className="text-xs sm:text-sm text-muted-foreground">Crops Monitored</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ===== ACTION BUTTONS ===== */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
          <Button variant="outline" className="glass hover:glass-dark transition-all duration-300 bg-transparent w-full sm:w-auto" disabled={saving}>
            Cancel Changes
          </Button>
          <Button className="gradient-primary text-white hover:opacity-90 transition-all duration-300 w-full sm:w-auto" onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </main>
    </div>
  )
}
