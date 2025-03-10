import { getImageForCategory } from "@/data/template-images"

export async function generateImageForCategory(category: string): Promise<string> {
  try {
    // Pobierz obraz z Unsplash dla danej kategorii
    return getImageForCategory(category)
  } catch (error) {
    console.error("Error generating image for category:", error)
    return `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(category)}`
  }
}

