"use client";

import { ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
     // console.log(pathname)
     const formattedPathname = pathname.slice(1).replace(/^./, c => c.toUpperCase());
     const router = useRouter();
     const { token, _persist } = useAppSelector((state) => state.auth);

     const hideSidebar = pathname === "/signin";

     useEffect(() => {
          if (_persist?.rehydrated && !token && pathname !== "/signin") {
               router.replace("/signin");
          }
     }, [_persist?.rehydrated, token, pathname, router]);

     if (!token && pathname !== "/signin") {
          return null;
     }

     return (
          <SidebarProvider>
               <Toaster position="bottom-right" reverseOrder={false} />
               <div className="flex w-full">
                    {!hideSidebar && <AppSidebar />}

                    {
                         !hideSidebar ? <main className="w-full px-4">
                              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12  border-black">
                                   <div className="flex items-center">
                                        <SidebarTrigger className="-ml-1" />
                                        <Separator
                                             orientation="vertical"
                                             className="mr-2 data-[orientation=vertical]:h-4"
                                        />
                                        <Breadcrumb>
                                             <BreadcrumbList>
                                                  <BreadcrumbSeparator className="hidden md:block" />
                                                  <BreadcrumbItem>
                                                       <BreadcrumbPage>{formattedPathname}</BreadcrumbPage>
                                                  </BreadcrumbItem>
                                             </BreadcrumbList>
                                        </Breadcrumb>
                                   </div>
                              </header>
                              {children}
                         </main>
                              :
                              <div className="w-full px-4">
                                   {children}
                              </div>
                    }
               </div>
          </SidebarProvider>
     );
}