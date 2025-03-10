"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getImages } from "@/data/images"

// Pobierz obrazy dla sekcji testimonials
const testimonialImages = getImages("testimonials", 5)

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Anna Kowalska",
      role: "CEO, TechStart",
      content:
        "Współpraca z tym zespołem to czysta przyjemność. Dostarczyli nam system rezerwacji, który znacząco usprawnił naszą działalność i zwiększył zadowolenie klientów.",
      avatar: testimonialImages[0],
      rating: 5,
    },
    {
      name: "Piotr Nowak",
      role: "Marketing Director, GrowthLab",
      content:
        "Dzięki ich systemowi analityki leadów zwiększyliśmy konwersję o 40% w ciągu pierwszych trzech miesięcy. Dane, które otrzymujemy, są bezcenne dla naszej strategii marketingowej.",
      avatar: testimonialImages[1],
      rating: 5,
    },
    {
      name: "Magdalena Wiśniewska",
      role: "Owner, Cafe Milano",
      content:
        "System rezerwacji stolików, który dla nas wdrożyli, działa perfekcyjnie. Nasi klienci chwalą łatwość obsługi, a my mamy pełną kontrolę nad obłożeniem lokalu.",
      avatar: testimonialImages[2],
      rating: 4,
    },
    {
      name: "Tomasz Kowalczyk",
      role: "Content Manager, MediaHouse",
      content:
        "AI Content Creator to narzędzie, które zrewolucjonizowało naszą pracę. Generujemy wysokiej jakości treści w ułamku czasu, który zajmowało nam to wcześniej.",
      avatar: testimonialImages[3],
      rating: 5,
    },
    {
      name: "Karolina Lewandowska",
      role: "Social Media Specialist, BrandBoost",
      content:
        "Automatyzacja Instagrama, którą dla nas wdrożyli, pozwoliła nam zwiększyć zasięgi o 300% i zaoszczędzić kilkanaście godzin tygodniowo na planowaniu postów.",
      avatar: testimonialImages[4],
      rating: 5,
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
            Co mówią nasi klienci
          </motion.h2>
          <motion.p
            className="mt-4 text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Poznaj opinie firm, które skorzystały z naszych rozwiązań
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                    {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-muted-foreground" />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
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

