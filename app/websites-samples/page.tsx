"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { SectionSeparator } from "@/components/ui/section-separator"
import { Filters } from "@/components/website-templates/filters"
import { TemplateCard } from "@/components/website-templates/template-card"
import { CategoryDescription } from "@/components/website-templates/category-description"
import { Button } from "@/components/ui/button"
import { websiteTemplatesData } from "@/data/website-templates"
import type { WebsiteTemplate } from "@/types/website-templates"
import Link from "next/link"

export default function WebsiteSamplesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeSort, setActiveSort] = useState("popular")
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTemplates, setFilteredTemplates] = useState<WebsiteTemplate[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Ref do śledzenia, czy parametry zostały już zainicjowane
  const initializedRef = useRef(false)

  // Przygotowanie kategorii do filtrów
  const categories = [
    { id: "all", name: "Wszystkie szablony", count: Object.values(websiteTemplatesData.templates).flat().length },
    ...Object.entries(websiteTemplatesData.categories).map(([id, category]) => ({
      id,
      name: category.name,
      count: category.count,
    })),
  ]

  // Funkcja do filtrowania szablonów
  const filterTemplates = (category: string, sort: string, filter: string, search: string) => {
    // Pobierz wszystkie szablony
    let templates: WebsiteTemplate[] = []

    if (category === "all") {
      // Pobierz wszystkie szablony ze wszystkich kategorii
      templates = Object.values(websiteTemplatesData.templates).flat()
    } else {
      // Pobierz szablony tylko z wybranej kategorii
      templates = websiteTemplatesData.templates[category] || []
    }

    // Filtruj według wybranego filtra
    if (filter === "new") {
      templates = templates.filter((template) => template.isNew)
    } else if (filter === "bestsellers") {
      templates = templates.filter((template) => template.isBestseller)
    } else if (filter === "discounted") {
      templates = templates.filter((template) => template.isDiscounted)
    }

    // Filtruj według wyszukiwanej frazy
    if (search) {
      const searchLower = search.toLowerCase()
      templates = templates.filter(
        (template) =>
          template.name.toLowerCase().includes(searchLower) ||
          template.description.toLowerCase().includes(searchLower) ||
          template.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Sortuj szablony
    if (sort === "newest") {
      templates = templates.filter((t) => t.isNew).concat(templates.filter((t) => !t.isNew))
    } else if (sort === "popular") {
      templates.sort((a, b) => b.reviewCount - a.reviewCount)
    } else if (sort === "price-asc") {
      templates.sort((a, b) => a.price - b.price)
    } else if (sort === "price-desc") {
      templates.sort((a, b) => b.price - a.price)
    } else if (sort === "rating") {
      templates.sort((a, b) => b.rating - a.rating)
    }

    return templates
  }

  // Efekt dla inicjalizacji stanu z URL
  useEffect(() => {
    setIsMounted(true)

    if (!initializedRef.current) {
      // Pobierz parametry z URL tylko przy pierwszym renderowaniu
      const categoryParam = searchParams.get("category") || "all"
      const sortParam = searchParams.get("sort") || "popular"
      const filterParam = searchParams.get("filter") || "all"
      const searchParam = searchParams.get("search") || ""

      setActiveCategory(categoryParam)
      setActiveSort(sortParam)
      setActiveFilter(filterParam)
      setSearchQuery(searchParam)

      if (categoryParam !== "all") {
        setSelectedCategory(websiteTemplatesData.categories[categoryParam])
      }

      // Oznacz, że inicjalizacja została zakończona
      initializedRef.current = true
    }
  }, [searchParams])

  // Efekt do filtrowania szablonów po zmianie parametrów
  useEffect(() => {
    if (isMounted) {
      const templates = filterTemplates(activeCategory, activeSort, activeFilter, searchQuery)
      setFilteredTemplates(templates)
    }
  }, [activeCategory, activeSort, activeFilter, searchQuery, isMounted])

  // Obsługa zmiany kategorii
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)

    if (category !== "all") {
      setSelectedCategory(websiteTemplatesData.categories[category])
    } else {
      setSelectedCategory(null)
    }

    updateUrl({ category })
  }

  // Obsługa zmiany sortowania
  const handleSortChange = (sort: string) => {
    setActiveSort(sort)
    updateUrl({ sort })
  }

  // Obsługa zmiany filtra
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    updateUrl({ filter })
  }

  // Obsługa wyszukiwania
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    updateUrl({ search: query })
  }

  // Aktualizacja URL z parametrami
  const updateUrl = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString())

    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "all") {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })

    const queryString = newParams.toString()
    router.push(`/websites-samples${queryString ? `?${queryString}` : ""}`, { scroll: false })
  }

  // Jeśli komponent nie jest zamontowany, zwracamy pusty div
  if (!isMounted) {
    return <div className="min-h-screen"></div>
  }

  return (
    <div className="relative min-h-screen">
      <DynamicBackground />

      <div className="container px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-8 md:mb-12">
          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Szablony Stron Internetowych
          </motion.h1>
          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Przeglądaj nasze profesjonalne szablony stron internetowych dla różnych branż. Znajdź idealne rozwiązanie
            dla swojego biznesu.
          </motion.p>
        </div>

        {selectedCategory && <CategoryDescription category={selectedCategory} />}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Filters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
          />
        </motion.div>

        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredTemplates.map((template, index) => (
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
        <h2 className="text-xl md:text-2xl font-bold mb-4">Nie znalazłeś odpowiedniego szablonu?</h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Skontaktuj się z nami, aby omówić stworzenie dedykowanej strony internetowej dostosowanej do specyficznych
          potrzeb Twojego biznesu.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/kontakt">Skontaktuj się z nami</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

