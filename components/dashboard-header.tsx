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
        <div className="flex h-16 items-center justify-between">
          {/* ===== LOGO SECTION ===== */}
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 gradient-primary rounded-xl">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                AgriScan AI
              </span>
            </Link>
          </div>

          {/* ===== RIGHT SECTION ===== */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-3 glass hover:glass-dark transition-all duration-300 px-4 py-2 rounded-xl"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatar} alt={displayName} />
                    <AvatarFallback className="bg-gradient-primary text-white text-sm">
                      {displayName.slice(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-foreground">{displayName}</p>
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-card border-border">
                <div className="p-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={avatar} alt={displayName} />
                      <AvatarFallback className="bg-gradient-primary text-white text-sm">
                        {displayName.slice(0,2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{displayName}</p>
                      <p className="text-xs text-muted-foreground">{email}</p>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {accountItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center space-x-2 cursor-pointer">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center space-x-2 cursor-pointer text-red-500">
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="glass rounded-xl">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="glass-card w-80">
                  <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 gradient-primary rounded-lg">
                          <Leaf className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-foreground">
                          AgriScan AI
                        </span>
                      </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex-1 p-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                          Account
                        </h3>
                        {accountItems.map((item) => (
                          <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start space-x-2 glass hover:glass-dark text-foreground rounded-xl"
                            >
                              <item.icon className="h-4 w-4" />
                              <span>{item.title}</span>
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Footer */}
                    <div className="p-4 border-t border-white/10">
                      <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start space-x-2 text-red-500 rounded-xl">
                          <LogOut className="h-4 w-4" />
                          <span>Sign out</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
