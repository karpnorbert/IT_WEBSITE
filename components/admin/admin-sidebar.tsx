"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Globe,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const menuItems = [
    { icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard", href: "/admin" },
    { icon: <ShoppingCart className="h-4 w-4" />, label: "Orders", href: "/admin/orders" },
    { icon: <Globe className="h-4 w-4" />, label: "Website Templates", href: "/admin/templates" },
    { icon: <FileText className="h-4 w-4" />, label: "Blog Posts", href: "/admin/blog" },
    { icon: <Users className="h-4 w-4" />, label: "Users", href: "/admin/users" },
    { icon: <BarChart3 className="h-4 w-4" />, label: "Analytics", href: "/admin/analytics" },
    { icon: <Package className="h-4 w-4" />, label: "Products", href: "/admin/products" },
    { icon: <Settings className="h-4 w-4" />, label: "Settings", href: "/admin/settings" },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            NexTech
          </span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Admin</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

