import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-pink/5">
      {/* Sticky glassmorphism header */}
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
