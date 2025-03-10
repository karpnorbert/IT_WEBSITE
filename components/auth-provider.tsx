"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user"
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Sprawdź, czy użytkownik jest zalogowany przy ładowaniu strony
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error("Failed to parse user data", e)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Symulacja logowania - w rzeczywistości powinieneś użyć API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Tylko dla demonstracji - w rzeczywistości sprawdzaj dane na serwerze
        if (email === "admin@example.com" && password === "admin123") {
          const userData: User = {
            id: "1",
            name: "Administrator",
            email: "admin@example.com",
            role: "admin",
          }

          setUser(userData)
          localStorage.setItem("user", JSON.stringify(userData))
          localStorage.setItem("isLoggedIn", "true") // Dodajemy flagę isLoggedIn
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn") // Usuwamy flagę isLoggedIn
  }

  const isAdmin = user?.role === "admin"

  return <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

