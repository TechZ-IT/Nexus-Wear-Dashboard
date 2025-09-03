"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/redux/provider";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const hideSidebar = pathname === "/signin";
    
    return (
        <SidebarProvider>
            <ReduxProvider>
                <Toaster position="bottom-right" reverseOrder={false} />
                <div className="flex  w-full">
                    {!hideSidebar && <AppSidebar />}
                    <main className="flex-1 p-4">{children}</main>
                </div>
            </ReduxProvider>
        </SidebarProvider>
    );
}
