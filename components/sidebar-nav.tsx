"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart,
  SearchIcon,
  Mail,
  MessageCircle,
  FileText,
  Settings,
  BrainCircuit,
  Terminal,
  Database,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    title: "Wyszukiwanie Klientów",
    href: "/dashboard/search",
    icon: <SearchIcon className="h-5 w-5" />,
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
    title: "Logi Systemu",
    href: "/dashboard/logs",
    icon: <Terminal className="h-5 w-5" />,
  },
  {
    title: "Ustawienia",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <div className="flex w-full flex-col gap-2">
      {navItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant={pathname === item.href ? "default" : "ghost"}
          className={cn(
            "justify-start",
            pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground",
          )}
        >
          <Link href={item.href}>
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </Link>
        </Button>
      ))}
    </div>
  )
}

