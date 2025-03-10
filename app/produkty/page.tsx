"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Bot,
  FileText,
  Instagram,
  LineChart,
  Sparkles,
  ShoppingCart,
  MessageSquare,
  FileCode,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { SectionSeparator } from "@/components/ui/section-separator"

// Dodajmy useEffect, aby reagować na zmiany motywu
import { useTheme } from "next-themes"
import { useEffect } from "react"

// Dane produktów podzielone na kategorie
const productCategories = {
  accounting: {
    title: "Automatyzacja dla księgowości",
    description: "Rozwiązania automatyzujące procesy księgowe i finansowe",
    products: [
      {
        id: "acc-001",
        title: "Automatyczne generowanie faktur",
        description: "System automatycznie generujący faktury na podstawie danych z zamówień i umów.",
        icon: <FileText className="h-6 w-6 text-blue-500" />,
        features: [
          "Automatyczne wypełnianie danych",
          "Integracja z systemami księgowymi",
          "Personalizowane szablony",
          "Archiwizacja i wyszukiwanie",
        ],
      },
      {
        id: "acc-002",
        title: "OCR dla dokumentów księgowych",
        description: "Automatyczne rozpoznawanie i przetwarzanie dokumentów księgowych.",
        icon: <Sparkles className="h-6 w-6 text-purple-500" />,
        features: [
          "Rozpoznawanie faktur i paragonów",
          "Automatyczna kategoryzacja",
          "Integracja z systemami księgowymi",
          "Archiwizacja zgodna z przepisami",
        ],
      },
      {
        id: "acc-003",
        title: "AI chatbot do obsługi zapytań klientów",
        description: "Inteligentny chatbot odpowiadający na pytania klientów dotyczące księgowości.",
        icon: <Bot className="h-6 w-6 text-green-500" />,
        features: [
          "Odpowiedzi na typowe pytania",
          "Dostęp do bazy wiedzy",
          "Przekazywanie złożonych zapytań do konsultantów",
          "Dostępność 24/7",
        ],
      },
    ],
  },
  ecommerce: {
    title: "Rozwiązania dla e-commerce",
    description: "Narzędzia zwiększające sprzedaż i automatyzujące procesy w sklepach internetowych",
    products: [
      {
        id: "ecom-001",
        title: "AI Copywriting dla opisów produktów",
        description: "Automatyczne generowanie unikalnych i perswazyjnych opisów produktów.",
        icon: <FileText className="h-6 w-6 text-amber-500" />,
        features: [
          "Unikalne opisy produktów",
          "Optymalizacja pod SEO",
          "Personalizacja pod grupę docelową",
          "Wsparcie dla wielu języków",
        ],
      },
      {
        id: "ecom-002",
        title: "Automatyczne zarządzanie cenami i zapasami",
        description: "System dynamicznie dostosowujący ceny i monitorujący stany magazynowe.",
        icon: <ShoppingCart className="h-6 w-6 text-red-500" />,
        features: [
          "Dynamiczne dostosowywanie cen",
          "Monitorowanie konkurencji",
          "Alerty niskiego stanu magazynowego",
          "Automatyczne zamówienia",
        ],
      },
      {
        id: "ecom-003",
        title: "Analityka sprzedaży w czasie rzeczywistym",
        description: "Zaawansowana analityka sprzedaży z prognozami i rekomendacjami.",
        icon: <LineChart className="h-6 w-6 text-indigo-500" />,
        features: [
          "Dashboardy w czasie rzeczywistym",
          "Prognozy sprzedaży",
          "Analiza koszyków zakupowych",
          "Rekomendacje produktowe",
        ],
      },
    ],
  },
  crm: {
    title: "Automatyzacje dla systemów CRM",
    description: "Rozwiązania zwiększające efektywność zarządzania relacjami z klientami",
    products: [
      {
        id: "crm-001",
        title: "AI Lead Scoring",
        description: "Automatyczna ocena jakości leadów na podstawie danych i zachowań.",
        icon: <Zap className="h-6 w-6 text-yellow-500" />,
        features: [
          "Automatyczna ocena leadów",
          "Prognozowanie konwersji",
          "Priorytetyzacja kontaktów",
          "Integracja z systemami CRM",
        ],
      },
      {
        id: "crm-002",
        title: "Automatyczne follow-upy do klientów",
        description: "System automatycznie wysyłający spersonalizowane wiadomości follow-up.",
        icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
        features: [
          "Personalizowane sekwencje wiadomości",
          "Automatyczne przypomnienia",
          "Śledzenie odpowiedzi",
          "Integracja z kalendarzem",
        ],
      },
      {
        id: "crm-003",
        title: "Integracja z e-mail marketingiem",
        description: "Kompleksowa integracja CRM z systemami e-mail marketingowymi.",
        icon: <FileText className="h-6 w-6 text-green-500" />,
        features: [
          "Synchronizacja kontaktów",
          "Automatyczne kampanie",
          "Segmentacja odbiorców",
          "Analiza skuteczności",
        ],
      },
    ],
  },
  creative: {
    title: "Kreatywne AI Tools",
    description: "Narzędzia AI wspierające procesy kreatywne i tworzenie treści",
    products: [
      {
        id: "cre-001",
        title: "Generatory grafik AI",
        description: "Tworzenie unikalnych grafik i ilustracji przy pomocy sztucznej inteligencji.",
        icon: <Sparkles className="h-6 w-6 text-pink-500" />,
        features: [
          "Generowanie unikalnych grafik",
          "Edycja i dostosowywanie stylu",
          "Eksport w różnych formatach",
          "Biblioteka szablonów",
        ],
      },
      {
        id: "cre-002",
        title: "Automatyczne tworzenie postów na social media",
        description: "Generowanie angażujących treści na media społecznościowe z harmonogramem publikacji.",
        icon: <Instagram className="h-6 w-6 text-purple-500" />,
        features: [
          "Generowanie treści dostosowanych do platform",
          "Harmonogram publikacji",
          "Sugestie hashtagów",
          "Analiza skuteczności",
        ],
      },
      {
        id: "cre-003",
        title: "AI do edycji zdjęć",
        description: "Zaawansowane narzędzie do automatycznej edycji i ulepszania zdjęć.",
        icon: <FileCode className="h-6 w-6 text-blue-500" />,
        features: [
          "Automatyczna korekta kolorów",
          "Usuwanie niechcianych elementów",
          "Ulepszanie jakości zdjęć",
          "Efekty i filtry AI",
        ],
      },
    ],
  },
  chatbots: {
    title: "Chatboty dla biznesu",
    description: "Inteligentne chatboty zwiększające efektywność obsługi klienta",
    products: [
      {
        id: "chat-001",
        title: "AI chatboty do obsługi klienta",
        description: "Inteligentne chatboty odpowiadające na pytania klientów i rozwiązujące problemy.",
        icon: <Bot className="h-6 w-6 text-cyan-500" />,
        features: [
          "Odpowiedzi na typowe pytania",
          "Rozwiązywanie prostych problemów",
          "Przekazywanie złożonych spraw do konsultantów",
          "Dostępność 24/7",
        ],
      },
      {
        id: "chat-002",
        title: "Chatboty sprzedażowe dla sklepów",
        description: "Chatboty wspierające proces sprzedaży i konwersję w sklepach internetowych.",
        icon: <ShoppingCart className="h-6 w-6 text-green-500" />,
        features: [
          "Rekomendacje produktów",
          "Odpowiedzi na pytania o produkty",
          "Wsparcie procesu zakupowego",
          "Upselling i cross-selling",
        ],
      },
    ],
  },
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("accounting")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = Object.keys(productCategories)

  // W komponencie ProductsPage dodajmy:
  const { theme } = useTheme()

  // Dodajmy useEffect, aby odświeżać komponenty przy zmianie motywu
  useEffect(() => {
    // Ten efekt będzie uruchamiany przy każdej zmianie motywu
    // Możemy tu dodać logikę, która dostosowuje wygląd komponentów do aktualnego motywu
  }, [theme])

  // Filtrowanie produktów na podstawie wyszukiwania
  const filteredProducts = productCategories[activeTab as keyof typeof productCategories].products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="relative">
      <DynamicBackground />

      <div className="container py-24 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <motion.h1
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nasze Produkty
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg max-w-[800px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Kompleksowe rozwiązania automatyzacji i optymalizacji procesów biznesowych dla różnych branż
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md mt-4"
          >
            <div className="relative">
              <Input
                placeholder="Szukaj produktów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <ArrowRight className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="accounting" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {productCategories[category as keyof typeof productCategories].title}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {productCategories[category as keyof typeof productCategories].title}
                </h2>
                <p className="text-muted-foreground">
                  {productCategories[category as keyof typeof productCategories].description}
                </p>
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
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="rounded-lg p-2 bg-primary/10">{product.icon}</div>
                          <CardTitle>{product.title}</CardTitle>
                        </div>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {product.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-primary mr-2 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/produkty/${product.id}`}>
                            Dowiedz się więcej
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">Nie znaleziono produktów</h3>
                  <p className="text-muted-foreground">Spróbuj zmienić kryteria wyszukiwania</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <SectionSeparator variant="gradient" className="my-16" />

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Potrzebujesz niestandardowego rozwiązania?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Skontaktuj się z nami, aby omówić stworzenie dedykowanego rozwiązania dopasowanego do specyficznych potrzeb
            Twojej firmy.
          </p>
          <Button size="lg" asChild>
            <Link href="/kontakt">
              Skontaktuj się z nami
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

