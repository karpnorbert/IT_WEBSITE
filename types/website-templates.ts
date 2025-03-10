export interface WebsiteTemplate {
  id: string
  name: string
  description: string
  category: string
  categoryName: string
  image: string
  demoUrl: string
  price: number
  features: string[]
  additionalOptions: string[]
  tags: string[]
  rating: number
  reviewCount: number
  isNew?: boolean
  isBestseller?: boolean
  isDiscounted?: boolean
  originalPrice?: number
}

export interface CategoryInfo {
  id: string
  name: string
  description: string
  forWho: string[]
  features: string[]
  additionalOptions: string[]
  count: number
}

export interface WebsiteTemplatesData {
  categories: Record<string, CategoryInfo>
  templates: Record<string, WebsiteTemplate[]>
}

export type Template = WebsiteTemplate

