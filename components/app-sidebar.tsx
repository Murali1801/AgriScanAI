"use client"

import { BarChart3, Camera, HelpCircle, History, Leaf, Settings, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const SidebarLink = ({ href, children, icon: Icon }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <Button variant="ghost" className={`w-full justify-start ${isActive ? "text-primary" : "text-foreground"}`}>
        <Icon className="mr-2 h-4 w-4" />
        {children}
      </Button>
    </Link>
  )
}

export function AppSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <aside className="md:w-60 flex-shrink-0 border-r border-border hidden md:block">
      <div className="h-full px-4 py-6 flex flex-col space-y-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 gradient-primary rounded-lg">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-foreground">AgriScan AI</span>
        </Link>

        <div className="flex-1 space-y-2">
          <SidebarLink href="/dashboard" icon={BarChart3}>
            Dashboard
          </SidebarLink>
          <SidebarLink href="/scan" icon={Camera}>
            Scan Crops
          </SidebarLink>
          <SidebarLink href="/history" icon={History}>
            Scan History
          </SidebarLink>
          <SidebarLink href="/analytics" icon={BarChart3}>
            Analytics
          </SidebarLink>
        </div>

        <div className="space-y-2">
          <SidebarLink href="/profile" icon={User}>
            Profile
          </SidebarLink>
          <SidebarLink href="/settings" icon={Settings}>
            Settings
          </SidebarLink>
          <SidebarLink href="/help" icon={HelpCircle}>
            Help & Support
          </SidebarLink>
        </div>
      </div>
    </aside>
  )
}
