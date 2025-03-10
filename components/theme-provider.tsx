"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

// Tworzymy własny kontekst dla motywu
type ThemeContextType = {
  isDarkMode: boolean
}

const ThemeContext = createContext<ThemeContextType>({ isDarkMode: true })

// Hook do używania kontekstu motywu
export const useThemeContext = () => useContext(ThemeContext)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Upewniamy się, że komponent jest zamontowany po stronie klienta
  useEffect(() => {
    setMounted(true)

    // Zawsze ustawiamy ciemny motyw przy pierwszym renderowaniu
    document.documentElement.classList.add("dark")

    // Sprawdzamy zapisany motyw
    const savedTheme = localStorage.getItem("nextech-theme")
    if (!savedTheme || savedTheme !== "dark") {
      // Jeśli nie ma zapisanego motywu lub jest inny niż 'dark', zapisujemy 'dark'
      localStorage.setItem("nextech-theme", "dark")
    }

    setIsDarkMode(true)

    // Nasłuchujemy zmian motywu
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem("nextech-theme")
      setIsDarkMode(currentTheme === "dark")
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // Zapobiegamy problemom z hydracją, renderując dzieci tylko po stronie klienta
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode }}>
      <NextThemesProvider
        {...props}
        enableSystem={false}
        enableColorScheme
        storageKey="nextech-theme"
        defaultTheme="dark"
        forcedTheme="dark" // Wymuszamy ciemny motyw
      >
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  )
}

