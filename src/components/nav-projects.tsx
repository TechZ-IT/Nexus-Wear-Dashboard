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
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url
          return (
            <SidebarMenuItem key={item.name}>
              <Link
                href={item.url}
                className={`text-gray-600 `}
              >
                <SidebarMenuButton tooltip={item.name} isActive={isActive}>
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>

  )
}
