"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { SectionSeparator } from "@/components/ui/section-separator"
import { Filters } from "@/components/website-templates/filters"
import { TemplateCard } from "@/components/website-templates/template-card"
import { CategoryDescription } from "@/components/website-templates/category-description"
import { websiteTemplatesData } from "@/data/website-templates"
import type { WebsiteTemplate } from "@/types/website-templates"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter()
  const [templates, setTemplates] = useState<WebsiteTemplate[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [activeSort, setActiveSort] = useState("popular")
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Przygotowanie kategorii do filtrów
  const categories = [
    { id: "all", name: "Wszystkie szablony", count: Object.values(websiteTemplatesData.templates).flat().length },
    ...Object.entries(websiteTemplatesData.categories).map(([id, category]) => ({
      id,
      name: category.name,
      count: category.count,
    })),
  ]

  // Sprawdź, czy kategoria istnieje
  const categoryExists = websiteTemplatesData.categories[params.category]

  useEffect(() => {
    setIsMounted(true)

    if (!categoryExists) {
      router.push("/websites-samples")
      return
    }

    // Pobierz szablony dla wybranej kategorii
    const categoryTemplates = websiteTemplatesData.templates[params.category] || []
    filterTemplates(categoryTemplates, activeSort, activeFilter, searchQuery)
  }, [params.category, categoryExists, router])

  // Funkcja do filtrowania szablonów
  const filterTemplates = (categoryTemplates: WebsiteTemplate[], sort: string, filter: string, search: string) => {
    let filteredTemplates = [...categoryTemplates]

    // Filtruj według wybranego filtra
    if (filter === "new") {
      filteredTemplates = filteredTemplates.filter((template) => template.isNew)
    } else if (filter === "bestsellers") {
      filteredTemplates = filteredTemplates.filter((template) => template.isBestseller)
    } else if (filter === "discounted") {
      filteredTemplates = filteredTemplates.filter((template) => template.isDiscounted)
    }

    // Filtruj według wyszukiwanej frazy
    if (search) {
      const searchLower = search.toLowerCase()
      filteredTemplates = filteredTemplates.filter(
        (template) =>
          template.name.toLowerCase().includes(searchLower) ||
          template.description.toLowerCase().includes(searchLower) ||
          template.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Sortuj szablony
    if (sort === "newest") {
      filteredTemplates = filteredTemplates.filter((t) => t.isNew).concat(filteredTemplates.filter((t) => !t.isNew))
    } else if (sort === "popular") {
      filteredTemplates.sort((a, b) => b.reviewCount - a.reviewCount)
    } else if (sort === "price-asc") {
      filteredTemplates.sort((a, b) => a.price - b.price)
    } else if (sort === "price-desc") {
      filteredTemplates.sort((a, b) => b.price - a.price)
    } else if (sort === "rating") {
      filteredTemplates.sort((a, b) => b.rating - a.rating)
    }

    setTemplates(filteredTemplates)
  }

  // Obsługa zmiany kategorii
  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      router.push("/websites-samples")
    } else {
      router.push(`/websites-samples/${category}`)
    }
  }

  // Obsługa zmiany sortowania
  const handleSortChange = (sort: string) => {
    setActiveSort(sort)
    filterTemplates(websiteTemplatesData.templates[params.category] || [], sort, activeFilter, searchQuery)
  }

  // Obsługa zmiany filtra
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    filterTemplates(websiteTemplatesData.templates[params.category] || [], activeSort, filter, searchQuery)
  }

  // Obsługa wyszukiwania
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterTemplates(websiteTemplatesData.templates[params.category] || [], activeSort, activeFilter, query)
  }

  // Jeśli komponent nie jest zamontowany lub kategoria nie istnieje, zwracamy pusty div
  if (!isMounted || !categoryExists) {
    return <div className="min-h-screen"></div>
  }

  return (
    <div className="relative min-h-screen">
      <DynamicBackground />

      <div className="container px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push("/websites-samples")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do wszystkich szablonów
          </Button>

          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Szablony dla branży: {websiteTemplatesData.categories[params.category].name}
          </motion.h1>
        </div>

        <CategoryDescription category={websiteTemplatesData.categories[params.category]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Filters
            categories={categories}
            activeCategory={params.category}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />
        </motion.div>

        {templates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {templates.map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Nie znaleziono szablonów</h3>
            <p className="text-muted-foreground">Spróbuj zmienić kryteria wyszukiwania lub wybierz inną kategorię.</p>
          </div>
        )}
      </div>

      <SectionSeparator />

      <div className="container px-4 md:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Potrzebujesz dedykowanego rozwiązania?</h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Skontaktuj się z nami, aby omówić stworzenie dedykowanej strony internetowej dostosowanej do specyficznych
          potrzeb Twojego biznesu.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <a href="/kontakt">Skontaktuj się z nami</a>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

