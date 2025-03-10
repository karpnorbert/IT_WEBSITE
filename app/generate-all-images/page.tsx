"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ImageResult {
  category: string
  imageUrl: string
  source?: string
  error?: string
}

export default function GenerateAllImagesPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ImageResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)

  const categories = [
    "ecommerce",
    "shop",
    "marketplace",
    "accounting",
    "finance",
    "business",
    "medical",
    "healthcare",
    "clinic",
    "restaurant",
    "cafe",
    "food",
    "crm",
    "saas",
    "dashboard",
    "portfolio",
    "creative",
    "agency",
  ]

  const getImageForCategory = async (category: string): Promise<ImageResult> => {
    setCurrentCategory(category)

    try {
      const response = await fetch(`/api/generate-template-image?category=${category}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      return {
        category,
        imageUrl: data.imageUrl,
        source: data.source || "unsplash",
        error: data.error,
      }
    } catch (error) {
      console.error(`Error getting image for ${category}:`, error)
      return {
        category,
        imageUrl: `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(category)}`,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  const getAllImages = async () => {
    setLoading(true)
    setError(null)
    setResults([])

    try {
      const newResults: ImageResult[] = []

      for (const category of categories) {
        try {
          const result = await getImageForCategory(category)
          newResults.push(result)
          setResults([...newResults])
        } catch (error) {
          console.error(`Failed to get image for ${category}:`, error)
          newResults.push({
            category,
            imageUrl: `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(category)}`,
            error: error instanceof Error ? error.message : "Unknown error",
          })
          setResults([...newResults])
        }

        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error occurred")
    } finally {
      setCurrentCategory(null)
      setLoading(false)
    }
  }

  // Funkcja do kopiowania JSON z wynikami
  const copyResultsAsJson = () => {
    const jsonObject: Record<string, string> = {}

    results.forEach((result) => {
      jsonObject[result.category] = result.imageUrl
    })

    const jsonString = JSON.stringify(jsonObject, null, 2)
    navigator.clipboard
      .writeText(jsonString)
      .then(() => {
        alert("JSON skopiowany do schowka!")
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
            <span>Pobieranie obrazów dla wszystkich kategorii</span>
            {results.length > 0 && (
              <Button onClick={copyResultsAsJson} size="sm">
                Kopiuj jako JSON
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Button onClick={getAllImages} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Pobieranie {currentCategory ? `(${currentCategory})` : ""}...
                </>
              ) : (
                "Pobierz obrazy dla wszystkich kategorii"
              )}
            </Button>

            <p className="mt-2 text-sm text-muted-foreground">
              System używa wysokiej jakości obrazów z Unsplash dla każdej kategorii.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Błąd</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Pobrane obrazy ({results.length}/{categories.length}):
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((result) => (
                  <Card key={result.category} className={result.error ? "border-red-300" : ""}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{result.category}</div>
                        <Badge variant="outline">Unsplash</Badge>
                      </div>

                      <div className="mt-2 aspect-video rounded overflow-hidden">
                        <img
                          src={
                            result.imageUrl ||
                            `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(result.category)}`
                          }
                          alt={result.category}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(result.category)}`
                          }}
                        />
                      </div>

                      {result.error ? (
                        <Alert variant="destructive" className="mt-2">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Błąd</AlertTitle>
                          <AlertDescription className="text-xs">{result.error}</AlertDescription>
                        </Alert>
                      ) : (
                        <div className="mt-2 flex items-center text-green-500 text-sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Pobrano pomyślnie
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

