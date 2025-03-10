"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code, Database, LineChart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImages } from "@/data/images"

// Pobierz obrazy dla sekcji features
const featureImages = getImages("features", 4)

export function FeatureSection() {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Automatyzacja Procesów",
      description:
        "Zautomatyzuj powtarzalne zadania biznesowe i zwiększ wydajność swojego zespołu dzięki naszym rozwiązaniom AI.",
      image: featureImages[0],
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "Systemy Rezerwacji",
      description:
        "Wdrażamy zaawansowane systemy rezerwacji dla restauracji, salonów, warsztatów i innych biznesów usługowych.",
      image: featureImages[1],
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Analiza Leadów",
      description:
        "Monitoruj i analizuj konwersje, śledź zachowania klientów i optymalizuj swoje działania marketingowe.",
      image: featureImages[2],
    },
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: "AI Content Creator",
      description:
        "Generuj wysokiej jakości treści na bloga, social media i materiały marketingowe przy pomocy sztucznej inteligencji.",
      image: featureImages[3],
    },
  ]

  return (
    <section className="py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Nasze Rozwiązania
          </motion.h2>
          <motion.p
            className="mt-4 text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Wykorzystujemy najnowsze technologie, aby dostarczać innowacyjne rozwiązania dla Twojego biznesu
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20 group-hover:from-background/80 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="mb-3 bg-background/20 backdrop-blur-sm p-3 rounded-lg inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                </div>
              </div>
              <div className="p-6 bg-card rounded-b-lg">
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <a href="#" className="inline-flex items-center gap-1 text-primary">
                    Dowiedz się więcej <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

