"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Sidebar } from "@/components/dashboard/sidebar"
import { useToast } from "@/hooks/use-toast"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Sprawdź, czy użytkownik jest zalogowany i ma uprawnienia admina
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const userData = localStorage.getItem("user")

    if (!isLoading) {
      if (!isLoggedIn || !userData) {
        toast({
          title: "Dostęp zabroniony",
          description: "Musisz się zalogować, aby uzyskać dostęp do panelu administracyjnego",
          variant: "destructive",
        })
        router.push("/login")
      } else {
        try {
          const parsedUser = JSON.parse(userData)
          if (parsedUser.role === "admin") {
            setIsAuthorized(true)
          } else {
            toast({
              title: "Brak uprawnień",
              description: "Nie masz uprawnień do dostępu do panelu administracyjnego",
              variant: "destructive",
            })
            router.push("/")
          }
        } catch (e) {
          console.error("Failed to parse user data", e)
          router.push("/login")
        }
      }
    }
  }, [isLoading, router, toast])

  if (isLoading || !isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 pt-20 md:pt-24">{children}</div>
    </div>
  )
}

