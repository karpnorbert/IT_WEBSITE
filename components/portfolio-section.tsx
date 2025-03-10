"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getImages } from "@/data/images"

// Pobierz obrazy dla sekcji portfolio
const portfolioImages = getImages("portfolio", 6)

export function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("all")

  const projects = [
    {
      title: "E-commerce Platform",
      category: "web",
      image: portfolioImages[0],
      url: "#",
    },
    {
      title: "Mobile Banking App",
      category: "mobile",
      image: portfolioImages[1],
      url: "#",
    },
    {
      title: "AI Content Generator",
      category: "ai",
      image: portfolioImages[2],
      url: "#",
    },
    {
      title: "Restaurant Booking System",
      category: "web",
      image: portfolioImages[3],
      url: "#",
    },
    {
      title: "Fitness Tracker",
      category: "mobile",
      image: portfolioImages[4],
      url: "#",
    },
    {
      title: "Smart Home Dashboard",
      category: "ai",
      image: portfolioImages[5],
      url: "#",
    },
  ]

  const filteredProjects = activeTab === "all" ? projects : projects.filter((project) => project.category === activeTab)

  return (
    <section className="py-24 px-4 md:px-6 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nasze Portfolio
          </motion.h2>
          <motion.p
            className="mt-4 text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Zobacz nasze najnowsze projekty i przekonaj się o jakości naszych rozwiązań
          </motion.p>
        </div>

        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">Wszystkie</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Zobacz projekt
                      </a>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground capitalize">{project.category}</span>
                    <Button variant="link" className="p-0 h-auto" asChild>
                      <a href={project.url} className="inline-flex items-center gap-1 text-primary">
                        Szczegóły <ArrowRight className="h-4 w-4 ml-1" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

