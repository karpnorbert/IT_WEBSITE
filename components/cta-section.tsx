"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { getImage } from "@/data/images"

export function CTASection() {
  // Pobierz obraz dla sekcji CTA
  const ctaImage = getImage("cta", 0)

  return (
    <section className="relative py-24 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={ctaImage || "/placeholder.svg"} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Gotowy na transformację cyfrową swojego biznesu?
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Skontaktuj się z nami już dziś i dowiedz się, jak nasze rozwiązania mogą pomóc Twojej firmie osiągnąć nowy
            poziom efektywności i konkurencyjności.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" asChild>
              <a href="/kontakt">Skontaktuj się z nami</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/produkty">Zobacz nasze produkty</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

