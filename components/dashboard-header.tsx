"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { User, Settings, HelpCircle, Leaf, LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useEffect, useState as useReactState } from "react"
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth"
import app from "@/lib/firebase"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const accountItems = [
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: HelpCircle,
  },
]

function useCurrentUser() {
  const [user, setUser] = useReactState<FirebaseUser | null>(null)
  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])
  return user
}

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = useCurrentUser()
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User"
  const email = user?.email || ""
  const avatar = user?.photoURL || "/placeholder.svg?height=32&width=32"

  return (
    <header className="sticky top-0 z-50 w-full glass backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-2">
          {/* ===== LOGO SECTION ===== */}
          <Link href="/dashboard" className="flex items-center space-x-2 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 gradient-primary rounded-xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-foreground truncate">AgriScan AI</span>
          </Link>

          {/* ===== RIGHT SECTION ===== */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 sm:space-x-3 glass hover:glass-dark transition-all duration-300 px-2 sm:px-4 py-2 rounded-xl min-w-0"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatar} alt={displayName} />
                    <AvatarFallback className="bg-gradient-primary text-white text-sm">
                      {displayName.slice(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{email}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-card border-border p-0 overflow-hidden">
                {/* User Info Section */}
                <div className="flex items-center space-x-3 px-4 py-3 border-b border-border bg-muted/40">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={avatar} alt={displayName} />
                    <AvatarFallback className="bg-gradient-primary text-white text-base">
                      {displayName.slice(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground break-all whitespace-normal">{displayName}</p>
                    <p className="text-xs text-muted-foreground break-all whitespace-normal">{email}</p>
                  </div>
                </div>
                {/* Navigation Links */}
                <div className="py-2">
                  {accountItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href} className="flex items-center space-x-2 px-4 py-2 w-full cursor-pointer hover:bg-accent focus:bg-accent rounded-none">
                        <item.icon className="h-4 w-4" />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
                {/* Sign Out */}
                <div className="border-t border-border">
                  <DropdownMenuItem asChild>
                    <Link href="/" className="flex items-center space-x-2 px-4 py-2 w-full cursor-pointer text-red-500 hover:bg-red-50 focus:bg-red-50 rounded-none">
                      <LogOut className="h-4 w-4" />
                      <span className="truncate">Sign out</span>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
