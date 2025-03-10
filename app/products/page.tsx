"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BarChart3, Calendar, Instagram, Layers, Sparkles, Zap } from "lucide-react"

const products = [
  {
    id: "automation",
    icon: <Zap className="h-6 w-6 text-blue-500" />,
    title: "Automation",
    description: "AI-powered business process automation to save time and reduce errors.",
    features: ["Workflow automation", "Document processing", "Email automation", "Task scheduling"],
    category: "ai",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "reservation",
    icon: <Calendar className="h-6 w-6 text-purple-500" />,
    title: "Reservation Systems",
    description: "Flexible booking solutions for appointments, restaurants, and services.",
    features: ["Online booking", "Calendar integration", "Automated reminders", "Payment processing"],
    category: "business",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "analytics",
    icon: <BarChart3 className="h-6 w-6 text-green-500" />,
    title: "Lead Analytics",
    description: "Comprehensive tracking and analysis of conversion metrics.",
    features: ["Conversion tracking", "Customer journey mapping", "Performance dashboards", "ROI analysis"],
    category: "analytics",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "ai-content",
    icon: <Sparkles className="h-6 w-6 text-amber-500" />,
    title: "AI Content Creator",
    description: "Automatically generate high-quality content for blogs and social media.",
    features: ["Blog post generation", "SEO optimization", "Content scheduling", "Topic research"],
    category: "ai",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "instagram",
    icon: <Instagram className="h-6 w-6 text-pink-500" />,
    title: "Instagram Automation",
    description: "Schedule and manage Instagram posts with AI-generated content.",
    features: ["Content generation", "Post scheduling", "Analytics tracking", "Hashtag optimization"],
    category: "social",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "ebooks",
    icon: <Layers className="h-6 w-6 text-indigo-500" />,
    title: "Ebook Generator",
    description: "Create professional ebooks and business reports with ease.",
    features: ["Template library", "Content generation", "PDF export", "Brand customization"],
    category: "ai",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredProducts = activeTab === "all" ? products : products.filter((product) => product.category === activeTab)

  return (
    <div className="container py-24 px-4 md:px-6">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <motion.h1
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Products
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg max-w-[800px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Discover our suite of AI-powered tools designed to automate, analyze, and optimize your business processes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  {product.icon}
                  <CardTitle>{product.title}</CardTitle>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/products/${product.id}`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

