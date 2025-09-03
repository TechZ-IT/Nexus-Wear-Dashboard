"use client";

import { ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { token } = useAppSelector((state) => state.auth);

    const hideSidebar = pathname === "/signin";

    useEffect(() => {
        if (!token && pathname !== "/signin") {
            router.replace("/signin");
        }
    }, [token, pathname, router]);

    // Prevent UI flicker while redirecting
    if (!token && pathname !== "/signin") {
        return null;
    }

    return (
        <SidebarProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            <div className="flex w-full">
                {!hideSidebar && <AppSidebar />}
                <main className=" w-full">{children}</main>
            </div>
        </SidebarProvider>
    );
}
