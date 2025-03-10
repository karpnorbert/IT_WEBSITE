"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  Search,
  Mail,
  MessageCircle,
  FileText,
  Settings,
  BrainCircuit,
  Database,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    title: "Wyszukiwanie Klientów",
    href: "/dashboard/search",
    icon: <Search className="h-5 w-5" />,
  },
  {
    title: "Baza Firm",
    href: "/dashboard/companies",
    icon: <Database className="h-5 w-5" />,
  },
  {
    title: "Kampanie Email",
    href: "/dashboard/email-campaigns",
    icon: <Mail className="h-5 w-5" />,
  },
  {
    title: "Social Media",
    href: "/dashboard/social-campaigns",
    icon: <MessageCircle className="h-5 w-5" />,
  },
  {
    title: "AI Generator Ofert",
    href: "/dashboard/ai-generator",
    icon: <BrainCircuit className="h-5 w-5" />,
  },
  {
    title: "Raporty",
    href: "/dashboard/reports",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Ustawienia",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-30 h-screen bg-background border-r transition-all duration-300 pt-16",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-20 -right-3 h-6 w-6 rounded-full border shadow-md bg-background"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="flex w-full flex-col gap-2 p-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn(
                "justify-start",
                pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                collapsed && "justify-center px-2",
              )}
            >
              <Link href={item.href}>
                {item.icon}
                {!collapsed && <span className="ml-2">{item.title}</span>}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

