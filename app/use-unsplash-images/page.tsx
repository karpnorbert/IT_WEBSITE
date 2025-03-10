"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function UseUnsplashImagesPage() {
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Mapowanie kategorii na obrazy z Unsplash
  const unsplashImages: Record<string, string> = {
    // E-commerce
    ecommerce:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    shop: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    marketplace:
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",

    // Księgowość i finanse
    accounting:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    finance:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    business:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",

    // Medycyna
    medical:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    healthcare:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    clinic:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",

    // Restauracje
    restaurant:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    cafe: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    food: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",

    // CRM / SaaS
    crm: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    saas: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    dashboard:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",

    // Portfolio / Usługi kreatywne
    portfolio:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    creative:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    agency:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",

    // Domyślny obraz dla innych kategorii
    default:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  }

  const testImages = async () => {
    setLoading(true)

    // Symulacja testowania obrazów
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setLoading(false)
  }

  const copyImagesAsJson = () => {
    const jsonString = JSON.stringify(unsplashImages, null, 2)
    navigator.clipboard
      .writeText(jsonString)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      })
      .catch((err) => {
        console.error("Nie udało się skopiować do schowka:", err)
        alert("Nie udało się skopiować do schowka. Sprawdź konsolę.")
      })
  }

  const copyImagesAsCode = () => {
    const codeString = `
// Mapowanie kategorii szablonów na obrazy
export const templateImages: Record<string, string> = ${JSON.stringify(unsplashImages, null, 2)}

// Funkcja do pobierania obrazu dla danej kategorii
export function getTemplateImage(category: string): string {
  return templateImages[category.toLowerCase()] || templateImages.default
}
`
    navigator.clipboard
      .writeText(codeString)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      })
      .catch((err) => {
        console.error("Nie udało się skopiować do schowka:", err)
        alert("Nie udało się skopiować do schowka. Sprawdź konsolę.")
      })
  }

  return (
    <div className="container py-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Gotowe obrazy z Unsplash</span>
            <div className="flex gap-2">
              <Button onClick={copyImagesAsJson} size="sm" variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Kopiuj jako JSON
              </Button>
              <Button onClick={copyImagesAsCode} size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Kopiuj jako kod
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Button onClick={testImages} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testowanie obrazów...
                </>
              ) : (
                "Testuj dostępność obrazów"
              )}
            </Button>

            {copied && (
              <Alert className="mt-4">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Skopiowano do schowka!</AlertTitle>
                <AlertDescription>Możesz teraz wkleić kod do pliku data/template-images.ts</AlertDescription>
              </Alert>
            )}

            <p className="mt-4 text-sm text-muted-foreground">
              Poniżej znajduje się lista gotowych obrazów z Unsplash dla różnych kategorii szablonów. Możesz skopiować
              ten kod i wkleić go do pliku <code>data/template-images.ts</code>.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Obrazy z Unsplash ({Object.keys(unsplashImages).length}):</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(unsplashImages).map(([category, imageUrl]) => (
                <Card key={category}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{category}</div>
                      <Badge variant="outline">Unsplash</Badge>
                    </div>

                    <div className="mt-2 aspect-video rounded overflow-hidden">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={category}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(category)}`
                        }}
                      />
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground truncate">{imageUrl}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

