import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category")
  const templateId = searchParams.get("templateId")

  if (!category || !templateId) {
    return NextResponse.json({ error: "Missing category or templateId parameter" }, { status: 400 })
  }

  try {
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

    // Sprawdź, czy kategoria ma zdefiniowany prompt
    const prompt = categoryPrompts[category]
    if (!prompt) {
      return NextResponse.json({ error: `No prompt defined for category: ${category}` }, { status: 400 })
    }

    // Sprawdź, czy klucz API jest dostępny
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY is not set" }, { status: 500 })
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
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        {
          error: `OpenAI API error: ${response.status} ${response.statusText}`,
          details: errorData,
        },
        { status: response.status },
      )
    }

    const data = await response.json()

    if (!data.data || !data.data[0] || !data.data[0].url) {
      return NextResponse.json({ error: "Invalid response from OpenAI API", data }, { status: 500 })
    }

    return NextResponse.json({ imageUrl: data.data[0].url })
  } catch (error) {
    console.error("Error generating image:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

