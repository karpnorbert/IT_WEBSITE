"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface AIGeneratedImageProps {
  category: string
  templateId: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export function AIGeneratedImage({
  category,
  templateId,
  alt,
  width = 600,
  height = 400,
  priority = false,
  className = "",
}: AIGeneratedImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Placeholder URL do użycia podczas ładowania lub w przypadku błędu
  const placeholderUrl = `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(category)}`

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setIsLoading(true)

        // Sprawdź, czy mamy już URL obrazu w sessionStorage (cache po stronie klienta)
        const cachedUrl = sessionStorage.getItem(`template-image-${category}-${templateId}`)

        if (cachedUrl) {
          console.log(`Using cached image for ${category}-${templateId}:`, cachedUrl.substring(0, 50) + "...")
          setImageUrl(cachedUrl)
          setIsLoading(false)
          return
        }

        console.log(`Fetching image for ${category}-${templateId}...`)

        // Pobierz URL obrazu z API
        const response = await fetch(`/api/generate-image?category=${category}&templateId=${templateId}`)

        if (!response.ok) {
          const errorText = await response.text()
          console.error(`API error (${response.status}):`, errorText)
          throw new Error(`API error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        console.log(`API response for ${category}-${templateId}:`, data)

        if (data.error) {
          throw new Error(data.error)
        }

        if (data.imageUrl) {
          console.log(`Got image URL for ${category}-${templateId}:`, data.imageUrl.substring(0, 50) + "...")
          // Zapisz URL w sessionStorage dla bieżącej sesji
          sessionStorage.setItem(`template-image-${category}-${templateId}`, data.imageUrl)
          setImageUrl(data.imageUrl)
        } else {
          throw new Error("No image URL returned")
        }
      } catch (err) {
        console.error("Error loading image:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setIsLoading(false)
      }
    }

    fetchImage()
  }, [category, templateId])

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`} style={{ width, height }}>
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !imageUrl) {
    console.log(`Using placeholder for ${category}-${templateId} due to error:`, error)
    // Fallback do placeholdera w przypadku błędu
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <Image src={placeholderUrl || "/placeholder.svg"} alt={alt} fill className="object-cover" priority={priority} />
        {error && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-500/80 text-white text-xs p-1">Error: {error}</div>
        )}
      </div>
    )
  }

  // Dla zewnętrznych URL-i z OpenAI musimy użyć unoptimized={true}
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => {
          console.error(`Image load error for ${category}-${templateId}`)
          setError("Image load failed")
          setImageUrl(null)
        }}
      />
    </div>
  )
}

