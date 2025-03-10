"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Eye, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { WebsiteTemplate } from "@/types/website-templates"
import { getImageForCategory, getRandomImage } from "@/data/template-images"

interface TemplateCardProps {
  template: WebsiteTemplate
  index: number
}

export function TemplateCard({ template, index }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Pobierz obraz dla danej kategorii lub losowy obraz
  const imageUrl = template.image || getImageForCategory(template.category) || getRandomImage()

  // Fallback w przypadku błędu ładowania obrazu
  const placeholderUrl = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(template.category)}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-full transition-all hover:shadow-lg border-border/50">
        <div className="relative aspect-video overflow-hidden">
          {/* Używamy natywnego tagu img zamiast komponentu Image */}
          <img
            src={imageError ? placeholderUrl : imageUrl}
            alt={template.name}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              isHovered ? "scale-105" : "scale-100",
            )}
            onError={() => setImageError(true)}
          />

          {template.isNew && <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-600">Nowość</Badge>}

          {template.isBestseller && (
            <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">Bestseller</Badge>
          )}

          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < template.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400",
                        )}
                      />
                    ))}
                </div>
                <span className="text-white text-xs ml-1">({template.reviewCount})</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                onClick={(e) => {
                  e.preventDefault()
                  setIsFavorite(!isFavorite)
                }}
              >
                <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "")} />
              </Button>
            </div>
          </div>
        </div>

        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg md:text-xl">{template.name}</CardTitle>
            <div className="text-lg font-bold text-primary">{template.price} zł</div>
          </div>
          <div className="text-xs text-muted-foreground">{template.categoryName}</div>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{template.description}</p>

          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between gap-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link href={`/websites-samples/${template.category}/${template.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              Podgląd
            </Link>
          </Button>
          <Button size="sm" asChild className="flex-1">
            <Link href={`/kontakt?template=${template.id}`}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Zamów
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

