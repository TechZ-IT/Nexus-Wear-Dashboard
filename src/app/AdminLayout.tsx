"use client";

import { ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";
import { Separator } from "@radix-ui/react-separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

    if (!token && pathname !== "/signin") {
        return null;
    }

    // Split pathname and remove last part (like "35")
    const parts = pathname.split("/").filter(Boolean);
    const breadcrumbParts = parts.length > 1 ? parts.slice(0, -1) : parts;

    return (
        <SidebarProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            <div className="flex w-full">
                {!hideSidebar && <AppSidebar />}

                <main className="w-full px-4">
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex items-center">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbParts.map((part, index) => (
                                        <BreadcrumbItem key={index} className="flex items-center">
                                            {/* Always render separator before each part */}
                                            <BreadcrumbSeparator className="hidden md:block" />
                                            <BreadcrumbPage>{part.toUpperCase()}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
