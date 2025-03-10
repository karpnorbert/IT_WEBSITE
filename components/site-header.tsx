"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Lock, MessageCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { user, isAdmin, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Główne linki nawigacyjne
  const mainRoutes = [{ href: "/", label: "Home" }]

  // Pozostałe linki nawigacyjne
  const otherRoutes = [
    { href: "/automatyzacja", label: "Automatyzacja" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/kontakt", label: "Kontakt" },
  ]

  // Dodatkowe linki dla niezalogowanych użytkowników
  const publicLinks = [{ href: "/ai-chat", label: "AI Chat", icon: <MessageCircle className="h-4 w-4 mr-2" /> }]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2 md:gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-bold gradient-text">NexTech</span>
          </Link>
          <nav className="hidden md:flex gap-1">
            {mainRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary px-2 py-2 rounded-md lg:px-3",
                  pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}

            <Link
              href="/produkty"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary px-2 py-2 rounded-md lg:px-3",
                pathname === "/produkty" ? "text-primary bg-primary/10" : "text-muted-foreground",
              )}
            >
              Produkty
            </Link>

            <Link
              href="/websites-samples"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary px-2 py-2 rounded-md lg:px-3",
                pathname === "/websites-samples" ? "text-primary bg-primary/10" : "text-muted-foreground",
              )}
            >
              Websites
            </Link>

            {/* Pozostałe linki */}
            {otherRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary px-2 py-2 rounded-md lg:px-3",
                  pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}

            {/* Dodatkowe linki dla niezalogowanych użytkowników */}
            {!user &&
              publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center px-2 py-2 rounded-md lg:px-3",
                    pathname === link.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                  )}
                >
                  {link.icon}
                  <span className="hidden lg:inline">{link.label}</span>
                </Link>
              ))}

            {/* Link do panelu admina dla zalogowanych administratorów */}
            {isAdmin && (
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center px-2 py-2 rounded-md lg:px-3",
                  pathname === "/dashboard" ? "text-primary bg-primary/10" : "text-muted-foreground",
                )}
              >
                <Lock className="h-4 w-4 mr-2" />
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Panel Admina</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Wyloguj</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href="/login">
                <Lock className="mr-2 h-4 w-4" />
                Logowanie
              </Link>
            </Button>
          )}

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
          <nav className="container flex flex-col gap-2 p-4">
            {mainRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-base font-medium p-3 rounded-md transition-colors",
                  pathname === route.href ? "bg-secondary text-primary" : "hover:bg-secondary/50",
                )}
              >
                {route.label}
              </Link>
            ))}

            {/* Produkty - mobile */}
            <Link
              href="/produkty"
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-base font-medium p-3 rounded-md transition-colors",
                pathname === "/produkty" ? "bg-secondary text-primary" : "hover:bg-secondary/50",
              )}
            >
              Produkty
            </Link>

            <Link
              href="/websites-samples"
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-base font-medium p-3 rounded-md transition-colors",
                pathname === "/websites-samples" ? "bg-secondary text-primary" : "hover:bg-secondary/50",
              )}
            >
              Websites-Samples
            </Link>

            {/* Pozostałe linki - mobile */}
            {otherRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-base font-medium p-3 rounded-md transition-colors",
                  pathname === route.href ? "bg-secondary text-primary" : "hover:bg-secondary/50",
                )}
              >
                {route.label}
              </Link>
            ))}

            {/* Dodatkowe linki dla niezalogowanych użytkowników */}
            {!user &&
              publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium p-3 rounded-md transition-colors flex items-center",
                    pathname === link.href ? "bg-secondary text-primary" : "hover:bg-secondary/50",
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

            {/* Link do panelu admina dla zalogowanych administratorów */}
            {isAdmin && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-base font-medium p-3 rounded-md transition-colors flex items-center",
                  pathname === "/dashboard" ? "bg-secondary text-primary" : "hover:bg-secondary/50",
                )}
              >
                <Lock className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            )}

            {user ? (
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Wyloguj
              </Button>
            ) : (
              <Button asChild className="mt-4 w-full">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Lock className="mr-2 h-4 w-4" />
                  Logowanie
                </Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

