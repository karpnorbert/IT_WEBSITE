"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User } from "lucide-react"
import { getImages } from "@/data/images"

// Pobierz obrazy dla bloga
const blogImages = getImages("blog", 6)

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("all")

  const blogPosts = [
    {
      title: "Jak AI zmienia automatyzację procesów biznesowych",
      category: "automatyzacja",
      date: "2023-10-15",
      author: "Anna Kowalska",
      excerpt:
        "Odkryj, jak sztuczna inteligencja rewolucjonizuje automatyzację procesów biznesowych i jak może pomóc Twojej firmie.",
      image: blogImages[0],
      slug: "jak-ai-zmienia-automatyzacje-procesow-biznesowych",
    },
    {
      title: "Najlepsze praktyki w tworzeniu systemów rezerwacji online",
      category: "rezerwacje",
      date: "2023-10-10",
      author: "Piotr Nowak",
      excerpt: "Poznaj sprawdzone metody i najlepsze praktyki w projektowaniu i wdrażaniu systemów rezerwacji online.",
      image: blogImages[1],
      slug: "najlepsze-praktyki-w-tworzeniu-systemow-rezerwacji-online",
    },
    {
      title: "Analiza leadów: jak wykorzystać dane do zwiększenia konwersji",
      category: "analityka",
      date: "2023-10-05",
      author: "Magdalena Wiśniewska",
      excerpt:
        "Dowiedz się, jak efektywnie analizować dane o leadach i wykorzystywać je do optymalizacji strategii marketingowych.",
      image: blogImages[2],
      slug: "analiza-leadow-jak-wykorzystac-dane-do-zwiekszenia-konwersji",
    },
    {
      title: "AI Content Creator: przyszłość tworzenia treści marketingowych",
      category: "ai",
      date: "2023-09-28",
      author: "Tomasz Kowalczyk",
      excerpt:
        "Jak sztuczna inteligencja zmienia sposób, w jaki tworzymy treści marketingowe i jakie korzyści przynosi firmom.",
      image: blogImages[3],
      slug: "ai-content-creator-przyszlosc-tworzenia-tresci-marketingowych",
    },
    {
      title: "Automatyzacja Instagrama: strategie dla biznesu",
      category: "social-media",
      date: "2023-09-20",
      author: "Karolina Lewandowska",
      excerpt:
        "Poznaj skuteczne strategie automatyzacji Instagrama, które pomogą Twojej firmie zwiększyć zasięgi i zaangażowanie.",
      image: blogImages[4],
      slug: "automatyzacja-instagrama-strategie-dla-biznesu",
    },
    {
      title: "Jak stworzyć profesjonalny e-book za pomocą AI",
      category: "ai",
      date: "2023-09-15",
      author: "Michał Zieliński",
      excerpt:
        "Krok po kroku, jak wykorzystać sztuczną inteligencję do tworzenia profesjonalnych e-booków i raportów biznesowych.",
      image: blogImages[5],
      slug: "jak-stworzyc-profesjonalny-e-book-za-pomoca-ai",
    },
  ]

  const filteredPosts = activeTab === "all" ? blogPosts : blogPosts.filter((post) => post.category === activeTab)

  return (
    <div className="container py-24 px-4 md:px-6">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <motion.h1
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg max-w-[800px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Najnowsze artykuły, poradniki i aktualności z dziedziny IT, automatyzacji i AI
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              <TabsTrigger value="all">Wszystkie</TabsTrigger>
              <TabsTrigger value="automatyzacja">Automatyzacja</TabsTrigger>
              <TabsTrigger value="rezerwacje">Rezerwacje</TabsTrigger>
              <TabsTrigger value="analityka">Analityka</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
              <TabsTrigger value="social-media">Social Media</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <Badge>{post.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString("pl-PL")}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-1" />
                    {post.author}
                  </div>
                  <Button variant="link" className="p-0 h-auto" asChild>
                    <a href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-primary">
                      Czytaj więcej <ArrowRight className="h-4 w-4 ml-1" />
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

