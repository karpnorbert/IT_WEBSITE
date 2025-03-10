"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Check, Eye, ShoppingCart, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { SectionSeparator } from "@/components/ui/section-separator"
import { ReviewSystem } from "@/components/website-templates/review-system"
import { websiteTemplatesData } from "@/data/website-templates"
import { getTemplateImage } from "@/data/template-images"
import type { WebsiteTemplate } from "@/types/website-templates"
import { cn } from "@/lib/utils"

interface TemplateDetailPageProps {
  params: {
    category: string
    templateId: string
  }
}

export default function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const router = useRouter()
  const [template, setTemplate] = useState<WebsiteTemplate | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("features")
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Znajdź szablon na podstawie ID
    const categoryTemplates = websiteTemplatesData.templates[params.category] || []
    const foundTemplate = categoryTemplates.find((t) => t.id === params.templateId)

    if (foundTemplate) {
      setTemplate(foundTemplate)
    } else {
      // Jeśli szablon nie istnieje, przekieruj do strony kategorii
      router.push(`/websites-samples/${params.category}`)
    }
  }, [params.category, params.templateId, router])

  // Jeśli komponent nie jest zamontowany lub szablon nie istnieje, zwracamy pusty div
  if (!isMounted || !template) {
    return <div className="min-h-screen"></div>
  }

  // Pobierz obraz dla danej kategorii
  const imageUrl = template.image || getTemplateImage(template.category)

  // Fallback w przypadku błędu ładowania obrazu
  const placeholderUrl = `/placeholder.svg?height=800&width=1200&text=${encodeURIComponent(template.category)}`

  // Znajdź podobne szablony (z tej samej kategorii, ale inne niż bieżący)
  const similarTemplates = websiteTemplatesData.templates[params.category]
    .filter((t) => t.id !== template.id)
    .slice(0, 4)

  return (
    <div className="relative min-h-screen">
      <DynamicBackground />

      <div className="container px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push(`/websites-samples/${params.category}`)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do kategorii {websiteTemplatesData.categories[params.category].name}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative aspect-video rounded-lg overflow-hidden border">
              <img
                src={imageError ? placeholderUrl : imageUrl}
                alt={template.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />

              {template.isNew && <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">Nowość</Badge>}

              {template.isBestseller && (
                <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">Bestseller</Badge>
              )}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < template.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400",
                        )}
                      />
                    ))}
                </div>
                <span className="ml-2 text-sm">({template.reviewCount} opinii)</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "")} />
                {isFavorite ? "Zapisano" : "Zapisz"}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{template.name}</h1>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      {template.categoryName}
                    </Badge>
                    {template.isDiscounted && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Promocja
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {template.isDiscounted && template.originalPrice && (
                    <div className="text-lg line-through text-muted-foreground">{template.originalPrice} zł</div>
                  )}
                  <div className="text-3xl font-bold text-primary">{template.price} zł</div>
                </div>
              </div>

              <p className="mt-4 text-muted-foreground">{template.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1" variant="outline">
                <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Eye className="mr-2 h-4 w-4" />
                  Podgląd na żywo
                </a>
              </Button>
              <Button asChild className="flex-1">
                <Link href={`/kontakt?template=${template.id}`}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Zamów teraz
                </Link>
              </Button>
            </div>

            <ReviewSystem templateId={template.id} templateName={template.name} />
          </motion.div>
        </div>

        <Tabs defaultValue="features" value={activeTab} onValueChange={setActiveTab} className="mt-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Funkcje</TabsTrigger>
            <TabsTrigger value="additional">Dodatkowe opcje</TabsTrigger>
            <TabsTrigger value="technical">Specyfikacja techniczna</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4">Funkcje szablonu</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="additional" className="mt-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4">Dodatkowe opcje</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {template.additionalOptions.map((option, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="mt-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-xl font-bold mb-4">Specyfikacja techniczna</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Responsywny design (mobile, tablet, desktop)</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Optymalizacja SEO</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Szybkie ładowanie strony</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Kompatybilność z przeglądarkami</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Łatwa konfiguracja i wdrożenie</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Wsparcie techniczne</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Darmowe aktualizacje</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span>Dokumentacja i instrukcje</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {similarTemplates.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Podobne szablony</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarTemplates.map((template, index) => {
                const similarImageUrl = template.image || getTemplateImage(template.category)
                const similarPlaceholderUrl = `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(template.category)}`

                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="group relative overflow-hidden rounded-lg border">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={similarImageUrl || "/placeholder.svg"}
                          alt={template.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = similarPlaceholderUrl
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium truncate">{template.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-primary font-bold">{template.price} zł</div>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/websites-samples/${params.category}/${template.id}`}>Szczegóły</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <SectionSeparator />

      <div className="container px-4 md:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Potrzebujesz modyfikacji tego szablonu?</h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Skontaktuj się z nami, aby omówić dostosowanie tego szablonu do specyficznych potrzeb Twojego biznesu.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link href={`/kontakt?template=${template.id}`}>Skontaktuj się z nami</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

