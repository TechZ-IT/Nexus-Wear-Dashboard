"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  ShoppingCart, Package, Users, CreditCard, Folder, Layers, Palette, Ruler, Square, Bell, Mail, Newspaper, HelpCircle, Settings, UserCog, Shield, Image, Share2
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  ecommerce: [
    { name: "Products", url: "/dashboard/products", icon: Package },
    { name: "Orders", url: "/dashboard/orders", icon: ShoppingCart },
    { name: "Customers", url: "/dashboard/customers", icon: Users },
    { name: "Payments", url: "#", icon: CreditCard },
  ],
  catalog: [
    { name: "Categories", url: "#", icon: Folder },
    { name: "Subcategories", url: "#", icon: Layers },
    { name: "Colors", url: "#", icon: Palette },
    { name: "Sizes", url: "#", icon: Ruler },
    { name: "Fabrics", url: "#", icon: Square },
    { name: "Materials", url: "#", icon: Square },
  ],
  marketing: [
    { name: "Subscribers", url: "#", icon: Mail },
    { name: "Notifications", url: "#", icon: Bell },
    { name: "Banners", url: "#", icon: Image },
    { name: "Social Links", url: "#", icon: Share2 },
  ],
  support: [
    { name: "FAQ", url: "#", icon: HelpCircle },
    { name: "Contacts", url: "#", icon: Mail },
  ],
  userManagement: [
    { name: "Users", url: "#", icon: Users },
    { name: "Admins", url: "#", icon: UserCog },
    { name: "Roles & Permissions", url: "#", icon: Shield },
  ],
  settings: [
    { name: "General Settings", url: "#", icon: Settings },
    { name: "System Preferences", url: "#", icon: Settings },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavProjects title="Ecommerce" items={data.ecommerce} />
        <NavProjects title="Catalog" items={data.catalog} />
        <NavProjects title="Marketing" items={data.marketing} />
        <NavProjects title="Support" items={data.support} />
        <NavProjects title="User Management" items={data.userManagement} />
        <NavProjects title="Settings" items={data.settings} />
      </SidebarContent>


      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      {/* <SidebarRail /> */}
    </Sidebar>
  )
}
