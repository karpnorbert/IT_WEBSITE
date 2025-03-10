"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

// Przykładowe odpowiedzi bota
const botResponses = [
  "Dziękuję za wiadomość! Jak mogę pomóc w zakresie automatyzacji procesów biznesowych?",
  "Oferujemy kompleksowe rozwiązania w zakresie tworzenia stron internetowych, systemów rezerwacji i automatyzacji marketingu. Czy interesuje Cię któraś z tych usług?",
  "Nasze systemy rezerwacji są idealne dla restauracji, salonów kosmetycznych i warsztatów. Możemy dostosować je do Twoich potrzeb.",
  "Dzięki naszym narzędziom AI możesz automatycznie generować treści na bloga i social media, oszczędzając czas i zwiększając zasięgi.",
  "Chętnie przygotuję dla Ciebie spersonalizowaną ofertę. Czy mógłbyś podać więcej szczegółów dotyczących Twojej firmy?",
  "Nasz zespół specjalistów pomoże Ci zoptymalizować procesy biznesowe i zwiększyć efektywność Twojej firmy.",
  "Możemy umówić bezpłatną konsultację, podczas której omówimy Twoje potrzeby i zaproponujemy najlepsze rozwiązania.",
]

// Funkcja do generowania losowej odpowiedzi bota
const getRandomBotResponse = () => {
  const randomIndex = Math.floor(Math.random() * botResponses.length)
  return botResponses[randomIndex]
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Witaj! Jestem AI asystentem NexTech. Jak mogę Ci pomóc w zakresie automatyzacji procesów biznesowych, systemów rezerwacji lub generowania treści?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Automatyczne przewijanie do najnowszej wiadomości
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Dodaj wiadomość użytkownika
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Symulacja odpowiedzi bota po krótkim opóźnieniu
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomBotResponse(),
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto max-w-4xl pt-20 pb-10 px-4">
      <Card className="h-[80vh] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            AI Asystent NexTech
          </CardTitle>
          <CardDescription>Zadaj pytanie o nasze usługi, automatyzację procesów lub generowanie treści</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar>
                      {message.role === "assistant" ? (
                        <>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-muted">
                      <div className="flex gap-1 items-center">
                        <div
                          className="h-2 w-2 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 rounded-full bg-primary animate-bounce"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex w-full gap-2"
          >
            <Input
              placeholder="Napisz wiadomość..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
            <Button type="button" size="icon" variant="outline">
              <Sparkles className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

