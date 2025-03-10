"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Montowanie komponentu po stronie klienta, aby uniknąć problemów z hydracją
  useEffect(() => {
    setMounted(true)

    // Upewniamy się, że motyw jest ustawiony na ciemny przy pierwszym renderowaniu
    setTheme("dark")

    // Sprawdzamy, czy motyw jest zapisany w localStorage
    const savedTheme = localStorage.getItem("nextech-theme")
    if (!savedTheme || savedTheme !== "dark") {
      // Jeśli nie ma zapisanego motywu lub jest inny niż 'dark', zapisujemy 'dark'
      localStorage.setItem("nextech-theme", "dark")
    }
  }, [setTheme])

  // Funkcja do zmiany motywu z zapisaniem do localStorage
  const handleThemeChange = (newTheme: string) => {
    localStorage.setItem("nextech-theme", newTheme)
    setTheme(newTheme)

    // Dodajemy lub usuwamy klasę 'dark' z elementu html
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Renderujemy placeholder podczas renderowania po stronie serwera
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Moon className="h-4 w-4" />
        <span className="sr-only">Przełącz motyw</span>
      </Button>
    )
  }

  // Określamy aktualny motyw
  const currentTheme = theme || "dark"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          {currentTheme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <span className="sr-only">Przełącz motyw</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>Jasny</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>Ciemny</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

