"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Bot, FileText, Home, Instagram, Megaphone, Settings, User } from "lucide-react"

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/admin",
    },
    {
      title: "Analityka Leadów",
      icon: BarChart,
      href: "/admin/analytics",
    },
    {
      title: "Automatyzacja Marketingu",
      icon: Megaphone,
      href: "/admin/marketing",
    },
    {
      title: "Generator Ebooków",
      icon: FileText,
      href: "/admin/ebooks",
    },
    {
      title: "AI Content Creator",
      icon: Bot,
      href: "/admin/content",
    },
    {
      title: "Instagram Automation",
      icon: Instagram,
      href: "/admin/instagram",
    },
    {
      title: "Ustawienia",
      icon: Settings,
      href: "/admin/settings",
    },
  ]

  return (
    <SidebarComponent>
      <SidebarHeader>
        <div className="flex items-center p-2">
          <Link href="/admin" className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">NexTech</span>
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Admin</span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin/profile">
                <User className="h-5 w-5" />
                <span>Mój Profil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </SidebarComponent>
  )
}

