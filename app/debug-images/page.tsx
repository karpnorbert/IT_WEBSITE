"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getTemplateImage } from "@/data/template-images"

export default function DebugImagesPage() {
  const [testResults, setTestResults] = useState<Array<{ category: string; imageUrl: string; status: string }>>([])
  const [loading, setLoading] = useState(false)

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

  const testImages = async () => {
    setLoading(true)
    const results = []

    for (const category of categories) {
      const imageUrl = getTemplateImage(category)
      let status = "Ładowanie..."

      try {
        const response = await fetch(imageUrl, { method: "HEAD" })
        status = response.ok ? "Sukces" : `Błąd: ${response.status}`
      } catch (error) {
        status = `Błąd: ${error instanceof Error ? error.message : "Nieznany błąd"}`
      }

      results.push({ category, imageUrl, status })
    }

    setTestResults(results)
    setLoading(false)
  }

  return (
    <div className="container py-12">
      <Card>
        <CardHeader>
          <CardTitle>Debugowanie obrazów szablonów</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Button onClick={testImages} disabled={loading}>
              {loading ? "Testowanie..." : "Testuj obrazy dla wszystkich kategorii"}
            </Button>
          </div>

          {testResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Wyniki testów:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testResults.map((result, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="font-medium">{result.category}</div>
                      <div className="text-sm text-muted-foreground truncate">{result.imageUrl}</div>
                      <div
                        className={`mt-2 text-sm ${result.status.includes("Błąd") ? "text-red-500" : "text-green-500"}`}
                      >
                        {result.status}
                      </div>
                      <div className="mt-2 aspect-video rounded overflow-hidden">
                        <img
                          src={result.imageUrl || "/placeholder.svg"}
                          alt={result.category}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(result.category)}`
                          }}
                        />
                      </div>
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

