"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function DebugImageGenerator() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [apiResponse, setApiResponse] = useState<any>(null)

  const generateTestImage = async () => {
    try {
      setLoading(true)
      setError(null)

      // Testowe wywołanie API
      const response = await fetch("/api/generate-image?category=ecommerce&templateId=test-template")
      const data = await response.json()

      setApiResponse(data)

      if (data.error) {
        setError(data.error)
      } else if (data.imageUrl) {
        setImageUrl(data.imageUrl)
      } else {
        setError("No image URL returned")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Debug Image Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Button onClick={generateTestImage} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generowanie...
              </>
            ) : (
              "Wygeneruj testowy obraz"
            )}
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-md">
            <h3 className="font-bold">Błąd:</h3>
            <p>{error}</p>
          </div>
        )}

        {apiResponse && (
          <div className="p-4 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-md overflow-auto">
            <h3 className="font-bold">Odpowiedź API:</h3>
            <pre className="text-xs">{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}

        {imageUrl && (
          <div className="space-y-2">
            <h3 className="font-bold">Wygenerowany obraz:</h3>
            <div className="border rounded-md overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl || "/placeholder.svg"} alt="Wygenerowany obraz testowy" className="w-full h-auto" />
            </div>
            <p className="text-xs break-all">{imageUrl}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

