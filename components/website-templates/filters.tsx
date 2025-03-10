"use client"

import type React from "react"

import { useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  count: number
}

interface FiltersProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  onSortChange: (sort: string) => void
  onFilterChange: (filter: string) => void
  onSearch: (query: string) => void
}

export function Filters({
  categories,
  activeCategory,
  onCategoryChange,
  onSortChange,
  onFilterChange,
  onSearch,
}: FiltersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const clearSearch = () => {
    setSearchQuery("")
    onSearch("")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Input
            type="search"
            placeholder="Szukaj szablonów..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <div className="flex gap-2">
          <Select onValueChange={onSortChange} defaultValue="popular">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sortuj według" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popularność</SelectItem>
              <SelectItem value="newest">Najnowsze</SelectItem>
              <SelectItem value="price-asc">Cena: rosnąco</SelectItem>
              <SelectItem value="price-desc">Cena: malejąco</SelectItem>
              <SelectItem value="rating">Ocena</SelectItem>
            </SelectContent>
          </Select>

          <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filtry</SheetTitle>
                <SheetDescription>Wybierz kategorie i filtry, aby znaleźć idealny szablon.</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Kategorie</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <SheetClose key={category.id} asChild>
                        <Button
                          variant="ghost"
                          className={cn("w-full justify-start", activeCategory === category.id && "bg-muted")}
                          onClick={() => onCategoryChange(category.id)}
                        >
                          {category.name} ({category.count})
                        </Button>
                      </SheetClose>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Filtry</h3>
                  <div className="space-y-1">
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => onFilterChange("all")}>
                        Wszystkie
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => onFilterChange("new")}>
                        Nowości
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => onFilterChange("bestsellers")}
                      >
                        Bestsellery
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => onFilterChange("discounted")}
                      >
                        Promocje
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="hidden md:flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name} ({category.count})
          </Button>
        ))}
      </div>

      <div className="hidden md:flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => onFilterChange("all")} className={cn("border-dashed")}>
          Wszystkie
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFilterChange("new")}
          className={cn("border-blue-500 text-blue-500 hover:bg-blue-500/10")}
        >
          Nowości
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFilterChange("bestsellers")}
          className={cn("border-amber-500 text-amber-500 hover:bg-amber-500/10")}
        >
          Bestsellery
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onFilterChange("discounted")}
          className={cn("border-green-500 text-green-500 hover:bg-green-500/10")}
        >
          Promocje
        </Button>
      </div>
    </div>
  )
}

