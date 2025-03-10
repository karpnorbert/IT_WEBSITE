"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArrowRight, Bot, Code, LineChart, Mail, MessageSquare, Smartphone } from "lucide-react"
import { getImages } from "@/data/images"

// Pobierz obrazy dla automatyzacji
const automationImages = getImages("automatyzacja", 4)

export default function AutomatyzacjaPage() {
  const automationSolutions = [
    {
      title: "AI Marketing Automation",
      icon: <Mail className="h-10 w-10 text-primary" />,
      description:
        "Automatyzuj kampanie marketingowe, personalizuj komunikację i zwiększaj konwersję dzięki sztucznej inteligencji.",
      features: [
        "Automatyczne kampanie email",
        "Personalizacja treści w czasie rzeczywistym",
        "A/B testing z optymalizacją AI",
        "Segmentacja odbiorców oparta na zachowaniach",
        "Analityka i raportowanie wyników",
      ],
      image: automationImages[0],
    },
    {
      title: "Chatboty i Asystenci AI",
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      description:
        "Wdrażaj inteligentne chatboty i asystentów AI, którzy odpowiedzą na pytania klientów i zautomatyzują obsługę.",
      features: [
        "Chatboty oparte na GPT-4",
        "Integracja z Messenger, WhatsApp i stroną www",
        "Automatyczna kwalifikacja leadów",
        "Przekazywanie rozmów do konsultantów",
        "Analiza sentymentu i intencji klienta",
      ],
      image: automationImages[1],
    },
    {
      title: "Social Media Automation",
      icon: <Smartphone className="h-10 w-10 text-primary" />,
      description:
        "Automatyzuj publikowanie treści, moderację komentarzy i analizę wyników w mediach społecznościowych.",
      features: [
        "Planowanie i publikowanie postów",
        "Automatyczna moderacja komentarzy",
        "Generowanie treści z AI",
        "Analiza zaangażowania i zasięgów",
        "Raportowanie efektywności kampanii",
      ],
      image: automationImages[2],
    },
    {
      title: "Business Process Automation",
      icon: <Code className="h-10 w-10 text-primary" />,
      description: "Automatyzuj powtarzalne procesy biznesowe, integruj systemy i zwiększaj efektywność operacyjną.",
      features: [
        "Automatyzacja przepływów pracy",
        "Integracja z popularnymi systemami",
        "Automatyczne przetwarzanie dokumentów",
        "Powiadomienia i alerty",
        "Dashboardy i raporty efektywności",
      ],
      image: automationImages[3],
    },
  ]

  return (
    <div className="container py-24 px-4 md:px-6">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <motion.h1
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Automatyzacja Procesów
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg max-w-[800px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Zwiększ efektywność swojego biznesu dzięki inteligentnym rozwiązaniom automatyzacji opartym na AI
        </motion.p>
      </div>

      <Tabs defaultValue="solutions" className="w-full mb-12">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="solutions">Rozwiązania</TabsTrigger>
          <TabsTrigger value="benefits">Korzyści</TabsTrigger>
        </TabsList>
        <TabsContent value="solutions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {automationSolutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={solution.image || "/placeholder.svg"}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
                      <div className="mb-3 bg-background/20 backdrop-blur-sm p-3 rounded-lg inline-block">
                        {solution.icon}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                    <p className="text-muted-foreground mb-4">{solution.description}</p>
                    <ul className="space-y-2 mb-4">
                      {solution.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="link" className="p-0 h-auto" asChild>
                      <a href="#" className="inline-flex items-center gap-1 text-primary">
                        Dowiedz się więcej <ArrowRight className="h-4 w-4 ml-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="benefits">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg"
            >
              <Bot className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Oszczędność czasu</h3>
              <p className="text-muted-foreground">
                Automatyzacja powtarzalnych zadań pozwala zaoszczędzić nawet 70% czasu pracy zespołu.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg"
            >
              <LineChart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Zwiększenie efektywności</h3>
              <p className="text-muted-foreground">
                Automatyzacja procesów biznesowych zwiększa efektywność operacyjną o 30-50%.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg"
            >
              <Code className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Redukcja błędów</h3>
              <p className="text-muted-foreground">
                Automatyzacja eliminuje ludzkie błędy, zwiększając dokładność procesów o 90%.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg"
            >
              <Mail className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Lepsza komunikacja</h3>
              <p className="text-muted-foreground">Automatyzacja komunikacji zwiększa zaangażowanie klientów o 40%.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg"
            >
              <Smartphone className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Skalowalność</h3>
              <p className="text-muted-foreground">
                Automatyzacja umożliwia łatwe skalowanie operacji bez proporcjonalnego wzrostu kosztów.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg"
            >
              <MessageSquare className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Lepsze doświadczenie klienta</h3>
              <p className="text-muted-foreground">Automatyzacja zapewnia szybszą i bardziej spójną obsługę klienta.</p>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16">
        <motion.h2
          className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Jak wdrażamy automatyzację
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            className="bg-card p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Analiza potrzeb</h3>
            <p className="text-muted-foreground">
              Identyfikujemy procesy, które można zautomatyzować i określamy cele biznesowe.
            </p>
          </motion.div>
          <motion.div
            className="bg-card p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Projektowanie rozwiązania</h3>
            <p className="text-muted-foreground">
              Tworzymy architekturę rozwiązania dopasowaną do specyfiki Twojego biznesu.
            </p>
          </motion.div>
          <motion.div
            className="bg-card p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Implementacja</h3>
            <p className="text-muted-foreground">
              Wdrażamy rozwiązanie, integrujemy z istniejącymi systemami i testujemy.
            </p>
          </motion.div>
          <motion.div
            className="bg-card p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-primary">4</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Optymalizacja</h3>
            <p className="text-muted-foreground">
              Monitorujemy wyniki, zbieramy feedback i ciągle doskonalimy rozwiązanie.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

