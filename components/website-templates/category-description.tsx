import type { CategoryInfo } from "@/types/website-templates"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

interface CategoryDescriptionProps {
  category: CategoryInfo
}

export function CategoryDescription({ category }: CategoryDescriptionProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-2">{category.name}</h2>
        <p className="text-muted-foreground mb-4">{category.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-semibold mb-2">Dla kogo:</h3>
            <ul className="space-y-1">
              {category.forWho.map((item, index) => (
                <li key={index} className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Kluczowe funkcje:</h3>
            <ul className="space-y-1">
              {category.features.slice(0, 4).map((item, index) => (
                <li key={index} className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-blue-500 mr-1 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
              {category.features.length > 4 && (
                <li className="text-sm text-muted-foreground">+ {category.features.length - 4} więcej...</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-2">Opcje dodatkowe:</h3>
            <ul className="space-y-1">
              {category.additionalOptions.slice(0, 3).map((item, index) => (
                <li key={index} className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-purple-500 mr-1 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
              {category.additionalOptions.length > 3 && (
                <li className="text-sm text-muted-foreground">+ {category.additionalOptions.length - 3} więcej...</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

