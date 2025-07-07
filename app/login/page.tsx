"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf } from "lucide-react"
import Link from "next/link"
import { auth, googleProvider } from "@/lib/firebase"
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"

const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
    <g clipPath="url(#clip0_17_40)">
      <path d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24V29.5H37.4C36.7 33.1 34.2 36.1 30.7 38.1V44.1H38.2C43.1 39.7 47.5 32.9 47.5 24.5Z" fill="#4285F4"/>
      <path d="M24 48C30.6 48 36.1 45.9 40.1 42.3L32.6 36.3C30.5 37.7 27.7 38.6 24 38.6C17.7 38.6 12.2 34.2 10.4 28.7H2.6V34.9C6.6 42.1 14.6 48 24 48Z" fill="#34A853"/>
      <path d="M10.4 28.7C9.9 27.3 9.6 25.7 9.6 24C9.6 22.3 9.9 20.7 10.4 19.3V13.1H2.6C0.9 16.3 0 20 0 24C0 28 0.9 31.7 2.6 34.9L10.4 28.7Z" fill="#FBBC05"/>
      <path d="M24 9.4C27.9 9.4 31.1 10.7 33.3 12.7L40.3 5.7C36.1 2.1 30.6 0 24 0C14.6 0 6.6 5.9 2.6 13.1L10.4 19.3C12.2 13.8 17.7 9.4 24 9.4Z" fill="#EA4335"/>
    </g>
    <defs>
      <clipPath id="clip0_17_40">
        <rect width="48" height="48" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

export default function LoginPage() {
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      router.push("/dashboard")
    } catch (error) {
      alert("Google sign-in failed")
    }
  }

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
    } catch (error) {
      alert("Email/password login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Card className="w-full max-w-md glass-card shadow-2xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-foreground flex items-center justify-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 gradient-primary rounded-lg animate-glow">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span>AgriScan AI</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2 text-base">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button type="button" variant="outline" className="w-full flex items-center justify-center font-semibold bg-white text-black border hover:bg-gray-100 transition" onClick={handleGoogleSignIn}>
            <GoogleLogo /> Sign in with Google
          </Button>
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span className="mx-3 text-xs text-muted-foreground uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>
          <form className="space-y-4" onSubmit={handleEmailLogin}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <Input id="email" name="email" placeholder="Enter your email" type="email" className="glass" autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <Input id="password" name="password" placeholder="Enter your password" type="password" className="glass" autoComplete="current-password" />
            </div>
            <Button className="w-full gradient-primary text-white font-semibold hover:opacity-90 transition-all duration-300 py-3 rounded-lg shadow-md">
              Login
            </Button>
          </form>
          <div className="text-center text-sm text-muted-foreground mt-4">
            Don&apos;t have an account?
            <Link href="/signup" className="text-primary font-semibold hover:underline ml-1">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
