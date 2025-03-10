"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash, Eye } from "lucide-react"

// Mock data for templates
const templates = [
  {
    id: "template-001",
    name: "E-commerce Pro",
    description: "A complete e-commerce solution with product management, cart, and checkout.",
    image: "/placeholder.svg?height=400&width=600",
    category: "E-commerce",
    price: "$199",
    sales: 45,
    status: "Active",
  },
  {
    id: "template-002",
    name: "Portfolio Plus",
    description: "Showcase your work with this elegant portfolio template.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Portfolio",
    price: "$149",
    sales: 32,
    status: "Active",
  },
  {
    id: "template-003",
    name: "Blog Master",
    description: "A feature-rich blog template with categories, tags, and comments.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Blog",
    price: "$99",
    sales: 67,
    status: "Active",
  },
  {
    id: "template-004",
    name: "Corporate Suite",
    description: "Professional template for corporate websites with team and services sections.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Business",
    price: "$249",
    sales: 28,
    status: "Active",
  },
  {
    id: "template-005",
    name: "Landing Page Builder",
    description: "Create high-converting landing pages with this template.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Landing",
    price: "$79",
    sales: 93,
    status: "Active",
  },
  {
    id: "template-006",
    name: "Restaurant Showcase",
    description: "Perfect for restaurants with menu, reservation, and gallery features.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Restaurant",
    price: "$179",
    sales: 41,
    status: "Draft",
  },
]

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
        <div className="w-full">
          <h1 className="text-lg font-semibold">Website Templates</h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Manage Templates</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Template
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Template Management</CardTitle>
            <CardDescription>View and manage all website templates available for sale.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="E-commerce">E-commerce</SelectItem>
                    <SelectItem value="Portfolio">Portfolio</SelectItem>
                    <SelectItem value="Blog">Blog</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Landing">Landing</SelectItem>
                    <SelectItem value="Restaurant">Restaurant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden h-full">
                    <div className="relative h-48 w-full">
                      <Image
                        src={template.image || "/placeholder.svg"}
                        alt={template.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant={template.status === "Active" ? "default" : "secondary"}>
                          {template.status}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{template.name}</CardTitle>
                          <CardDescription>{template.category}</CardDescription>
                        </div>
                        <div className="text-lg font-bold">{template.price}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                      <div className="flex justify-between text-sm">
                        <span>Sales: {template.sales}</span>
                        <span>Revenue: ${template.sales * Number.parseInt(template.price.replace("$", ""))}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-4">
                      <div className="flex justify-between w-full">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> Preview
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No templates found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

