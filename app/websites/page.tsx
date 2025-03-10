"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ExternalLink, ShoppingCart, Eye } from "lucide-react"
import { getImages } from "@/data/images"

// Pobierz obrazy dla websites
const websiteImages = getImages("websites", 9)

export default function WebsitesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[0] | null>(null)

  const templates = [
    {
      id: "template-001",
      name: "E-commerce Pro",
      description: "A complete e-commerce solution with product management, cart, and checkout.",
      image: websiteImages[0],
      demoUrl: "https://example.com/demo/ecommerce",
      category: "E-commerce",
      price: 199,
      features: [
        "Product management",
        "Shopping cart",
        "Secure checkout",
        "Order tracking",
        "Customer accounts",
        "Responsive design",
      ],
    },
    {
      id: "template-002",
      name: "Portfolio Plus",
      description: "Showcase your work with this elegant portfolio template.",
      image: websiteImages[1],
      demoUrl: "https://example.com/demo/portfolio",
      category: "Portfolio",
      price: 149,
      features: [
        "Project showcase",
        "Filterable gallery",
        "About me section",
        "Contact form",
        "Blog integration",
        "Responsive design",
      ],
    },
    {
      id: "template-003",
      name: "Blog Master",
      description: "A feature-rich blog template with categories, tags, and comments.",
      image: websiteImages[2],
      demoUrl: "https://example.com/demo/blog",
      category: "Blog",
      price: 99,
      features: [
        "Category system",
        "Tag filtering",
        "Comments section",
        "Author profiles",
        "Search functionality",
        "Responsive design",
      ],
    },
    {
      id: "template-004",
      name: "Corporate Suite",
      description: "Professional template for corporate websites with team and services sections.",
      image: websiteImages[3],
      demoUrl: "https://example.com/demo/corporate",
      category: "Business",
      price: 249,
      features: [
        "Team showcase",
        "Services section",
        "Testimonials",
        "Case studies",
        "Contact form",
        "Responsive design",
      ],
    },
    {
      id: "template-005",
      name: "Landing Page Builder",
      description: "Create high-converting landing pages with this template.",
      image: websiteImages[4],
      demoUrl: "https://example.com/demo/landing",
      category: "Landing",
      price: 79,
      features: [
        "Hero section",
        "Feature showcase",
        "Testimonials",
        "Pricing tables",
        "Contact form",
        "Responsive design",
      ],
    },
    {
      id: "template-006",
      name: "Restaurant Showcase",
      description: "Perfect for restaurants with menu, reservation, and gallery features.",
      image: websiteImages[5],
      demoUrl: "https://example.com/demo/restaurant",
      category: "Restaurant",
      price: 179,
      features: [
        "Menu display",
        "Reservation system",
        "Photo gallery",
        "Chef profiles",
        "Contact information",
        "Responsive design",
      ],
    },
    {
      id: "template-007",
      name: "Medical Practice",
      description: "Designed for healthcare providers with appointment scheduling.",
      image: websiteImages[6],
      demoUrl: "https://example.com/demo/medical",
      category: "Healthcare",
      price: 229,
      features: [
        "Appointment scheduling",
        "Patient portal",
        "Staff profiles",
        "Service listings",
        "Contact information",
        "Responsive design",
      ],
    },
    {
      id: "template-008",
      name: "Real Estate Pro",
      description: "Complete solution for real estate agencies with property listings.",
      image: websiteImages[7],
      demoUrl: "https://example.com/demo/realestate",
      category: "Real Estate",
      price: 259,
      features: [
        "Property listings",
        "Advanced search",
        "Agent profiles",
        "Mortgage calculator",
        "Contact forms",
        "Responsive design",
      ],
    },
    {
      id: "template-009",
      name: "Fitness Studio",
      description: "Perfect for gyms and fitness studios with class schedules.",
      image: websiteImages[8],
      demoUrl: "https://example.com/demo/fitness",
      category: "Fitness",
      price: 169,
      features: [
        "Class schedules",
        "Trainer profiles",
        "Membership options",
        "Testimonials",
        "Contact information",
        "Responsive design",
      ],
    },
  ]

  const filteredTemplates =
    activeTab === "all" ? templates : templates.filter((template) => template.category.toLowerCase() === activeTab)

  return (
    <div className="container py-24 px-4 md:px-6">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <motion.h1
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Website Templates
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg max-w-[800px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Browse our collection of professionally designed website templates ready for your business.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="e-commerce">E-commerce</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" asChild>
                      <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-1" />
                        Live Demo
                      </a>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" onClick={() => setSelectedTemplate(template)}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Purchase
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        {selectedTemplate && (
                          <>
                            <DialogHeader>
                              <DialogTitle>{selectedTemplate.name}</DialogTitle>
                              <DialogDescription>{selectedTemplate.description}</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="relative h-48 w-full rounded-lg overflow-hidden">
                                <img
                                  src={selectedTemplate.image || "/placeholder.svg"}
                                  alt={selectedTemplate.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium mb-2">Features:</h3>
                                <ul className="grid grid-cols-2 gap-2">
                                  {selectedTemplate.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                      <span className="text-sm">{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <Badge className="mb-1">{selectedTemplate.category}</Badge>
                                  <div className="text-2xl font-bold">${selectedTemplate.price}</div>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" asChild>
                                    <a href={selectedTemplate.demoUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4 mr-1" />
                                      View Demo
                                    </a>
                                  </Button>
                                  <Button asChild>
                                    <a href={`/checkout/${selectedTemplate.id}`}>
                                      <ShoppingCart className="h-4 w-4 mr-1" />
                                      Buy Now
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{template.name}</h3>
                  <Badge>{template.category}</Badge>
                </div>
                <p className="text-muted-foreground mb-4">{template.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">${template.price}</div>
                  <Button size="sm" variant="outline" asChild>
                    <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-1" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

