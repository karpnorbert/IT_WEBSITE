"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    // Sprawdź, czy użytkownik jest zalogowany
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    // Jeśli jesteśmy na stronie dashboardu i użytkownik nie jest zalogowany
    if (pathname.startsWith("/dashboard") && !isLoggedIn) {
      toast({
        title: "Dostęp zabroniony",
        description: "Musisz się zalogować, aby uzyskać dostęp do panelu administracyjnego",
        variant: "destructive",
      })
      router.push("/login")
    } else {
      setIsAuthenticated(isLoggedIn)
      setIsLoading(false)
    }
  }, [pathname, router, toast])

  // Jeśli strona wymaga autoryzacji i użytkownik nie jest zalogowany, nie renderuj zawartości
  if (pathname.startsWith("/dashboard") && !isAuthenticated && isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Ładowanie...</div>
  }

  return <>{children}</>
}

