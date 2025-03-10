"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Formularz wysłany",
      description: "Dziękujemy za kontakt. Odezwiemy się wkrótce!",
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  return (
    <main className="container py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl gradient-text">
          Skontaktuj się z nami
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">Masz pytania? Jesteśmy tutaj, aby pomóc!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Wyślij wiadomość</CardTitle>
            <CardDescription>
              Wypełnij formularz, a nasz zespół skontaktuje się z Tobą najszybciej jak to możliwe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Imię i nazwisko</Label>
                <Input id="name" placeholder="Jan Kowalski" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jan@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon (opcjonalnie)</Label>
                <Input id="phone" type="tel" placeholder="+48 123 456 789" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Wiadomość</Label>
                <Textarea id="message" placeholder="Jak możemy Ci pomóc?" rows={5} required />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Informacje kontaktowe</CardTitle>
              <CardDescription>Skontaktuj się z nami bezpośrednio lub odwiedź naszą siedzibę.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">kontakt@nextech.pl</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Telefon</h3>
                  <p className="text-muted-foreground">+48 123 456 789</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium">Adres</h3>
                  <p className="text-muted-foreground">
                    ul. Technologiczna 42
                    <br />
                    00-000 Warszawa
                    <br />
                    Polska
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Godziny pracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Poniedziałek - Piątek</span>
                  <span>9:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sobota</span>
                  <span>10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Niedziela</span>
                  <span>Zamknięte</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 rounded-lg overflow-hidden h-96 border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156388.35438500392!2d20.92111271640625!3d52.233065000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sWarszawa!5e0!3m2!1spl!2spl!4v1647123456789!5m2!1spl!2spl"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </main>
  )
}

