import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "NexTech - Innowacyjne Rozwiązania IT",
  description:
    "Profesjonalne usługi IT, automatyzacja procesów biznesowych, systemy rezerwacji i AI-powered content generation.",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        try {
          // Zawsze ustawiamy klasę 'dark' na elemencie html przy starcie
          document.documentElement.classList.add('dark');
          
          // Sprawdzamy, czy użytkownik ma zapisany motyw
          var savedTheme = localStorage.getItem('nextech-theme');
          
          // Jeśli nie ma zapisanego motywu lub jest inny niż 'dark', zapisujemy 'dark'
          if (!savedTheme || savedTheme !== 'dark') {
            localStorage.setItem('nextech-theme', 'dark');
          }
        } catch (e) {
          console.error('Error accessing localStorage:', e);
          // Nawet jeśli wystąpi błąd z localStorage, nadal ustawiamy ciemny motyw
          document.documentElement.classList.add('dark');
        }
      })();
    `,
          }}
        />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'