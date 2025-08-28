"use client"

import { usePathname } from "next/navigation"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavProjectsProps } from "@/types/navProjectsProps"
import Link from "next/link"

export function NavProjects({ title, items }: NavProjectsProps) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={isActive}>
                <Link
                  href={item.url}
                  className={`flex items-center gap-2  px-2 py-1 transition-colors ${isActive
                      ? "bg-primary text-white  border-l-4 border-gray-500 "
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground "
                    }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
