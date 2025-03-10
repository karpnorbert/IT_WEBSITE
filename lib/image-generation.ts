// Mapowanie kategorii na prompty dla AI
const categoryPrompts: Record<string, string> = {
  ecommerce:
    "A modern e-commerce website interface with product shelves, shopping cart, and marketplace features. Dark theme UI with subtle e-commerce elements in the background. Professional, sleek design with product categories and recommended items visible.",

  accounting:
    "A professional accounting website interface showing a desk with laptop displaying spreadsheets and financial dashboard. Dark theme UI with subtle financial charts and accounting forms on computer screen. Clean, corporate design.",

  medical:
    "A medical clinic website interface showing an online appointment booking system and a doctor reviewing patient records on a tablet. Dark theme UI with subtle health icons in the background. Professional and trustworthy design.",

  restaurant:
    "An elegant restaurant website interface showing table reservation system and online menu. Dark theme UI with subtle food imagery. Mobile-friendly design with dish selection options and booking functionality.",

  crm: "A CRM software interface showing customer data, sales statistics on charts, and business automation icons. Dark theme UI with data visualization elements. Professional dashboard layout with analytics.",

  portfolio:
    "A creative portfolio website interface showing a gallery of design works, UI projects, and 3D effects. Dark theme UI with artistic elements. Modern layout showcasing creative projects with visual impact.",
}

// Funkcja do generowania obrazu AI
export async function generateAIImage(category: string): Promise<string | null> {
  try {
    // Sprawdź, czy kategoria ma zdefiniowany prompt
    const prompt = categoryPrompts[category]
    if (!prompt) {
      console.error(`No prompt defined for category: ${category}`)
      return null
    }

    // Wywołanie API OpenAI do generowania obrazu
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "url",
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`)
    }

    const data = await response.json()

    // Zwróć URL obrazu bezpośrednio z API OpenAI
    // Ten URL jest tymczasowy i wygaśnie po pewnym czasie
    return data.data[0].url
  } catch (error) {
    console.error("Error generating image:", error)
    return null
  }
}

// Funkcja do pobierania lub generowania obrazu (z cache w pamięci)
const imageCache: Record<string, string> = {}

export async function getTemplateImage(category: string, templateId: string): Promise<string> {
  const cacheKey = `${category}-${templateId}`

  // Sprawdź, czy obraz jest już w cache
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey]
  }

  // Wygeneruj nowy obraz
  const imageUrl = await generateAIImage(category)

  if (!imageUrl) {
    // Fallback do domyślnego obrazu, jeśli generowanie się nie powiedzie
    return `/placeholder.svg?height=720&width=1280&text=${category}`
  }

  // Zapisz w cache
  imageCache[cacheKey] = imageUrl

  return imageUrl
}

