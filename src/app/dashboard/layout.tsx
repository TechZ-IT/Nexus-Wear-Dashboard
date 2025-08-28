import { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                {/* Sidebar persists for all dashboard pages */}
                <AppSidebar />

                {/* Content changes per route */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </SidebarProvider>
    )
}
