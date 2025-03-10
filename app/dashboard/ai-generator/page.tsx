"use client"

import { useState } from "react"
import { BrainCircuit, MessageSquare, Copy, Save, Send, Trash, RefreshCw, Wand2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

// Mock data for email templates
const emailTemplates = [
  {
    id: "welcome",
    name: "Oferta powitalna",
    subject: "Oferta specjalna dla Twojej firmy",
    content: `Szanowni Państwo,

Zauważyliśmy, że Państwa firma {NAZWA_FIRMY} działa w branży {BRANŻA} i obecnie nie posiada strony internetowej, co w dzisiejszych czasach może ograniczać rozwój biznesu.

Chcielibyśmy zaproponować stworzenie profesjonalnej strony internetowej, dostosowanej specjalnie do potrzeb Państwa działalności. Nasza oferta obejmuje:

• Nowoczesny design dopasowany do branży
• Responsywny układ działający na wszystkich urządzeniach
• Optymalizacja pod kątem wyszukiwarek (SEO)
• Integracja z mediami społecznościowymi
• Panel administracyjny do samodzielnej edycji treści

Chętnie omówimy szczegóły podczas krótkiej rozmowy telefonicznej lub spotkania.

Z poważaniem,
{TWOJE_IMIĘ}
{FIRMA}
{KONTAKT}`,
  },
  {
    id: "discount",
    name: "Oferta promocyjna",
    subject: "Wyjątkowa zniżka 30% na stronę internetową",
    content: `Szanowni Państwo,

Z przyjemnością informujemy, że dla firm z branży {BRANŻA} przygotowaliśmy specjalną promocję na tworzenie stron internetowych.

Państwa firma {NAZWA_FIRMY} zwróciła naszą uwagę jako solidny lokalny biznes, któremu moglibyśmy pomóc w zwiększeniu obecności online.

**LIMITOWANA OFERTA: 30% ZNIŻKI NA KOMPLEKSOWĄ STRONĘ WWW**

Oferta obejmuje:
• Profesjonalny projekt graficzny
• Dostosowanie do urządzeń mobilnych
• Podstawową optymalizację SEO
• Bezpłatny hosting przez pierwszy rok
• Pomoc techniczną

Promocja jest ważna tylko do końca miesiąca.

Z poważaniem,
{TWOJE_IMIĘ}
{FIRMA}
{KONTAKT}`,
  },
  {
    id: "solution",
    name: "Dedykowane rozwiązanie",
    subject: "Dedykowane rozwiązanie internetowe dla {NAZWA_FIRMY}",
    content: `Szanowni Państwo,

Jako specjaliści w tworzeniu rozwiązań internetowych dla branży {BRANŻA}, przygotowaliśmy propozycję dedykowanego rozwiązania dla firmy {NAZWA_FIRMY}.

Na podstawie analizy Państwa działalności, rekomendujemy wdrożenie:

1. Profesjonalnej strony internetowej z katalogiem produktów/usług
2. Systemu rezerwacji online (idealnego dla Państwa branży)
3. Integracji z popularnymi platformami płatności
4. Narzędzi analitycznych do śledzenia efektywności

Rozwiązanie to zostanie w pełni dostosowane do specyficznych potrzeb Państwa firmy i pozwoli na znaczące zwiększenie rozpoznawalności marki oraz przychodów.

Z przyjemnością przedstawimy szczegółową ofertę podczas spotkania.

Z poważaniem,
{TWOJE_IMIĘ}
{FIRMA}
{KONTAKT}`,
  },
]

export default function AIGeneratorPage() {
  const [template, setTemplate] = useState(emailTemplates[0])
  const [subject, setSubject] = useState(emailTemplates[0].subject)
  const [content, setContent] = useState(emailTemplates[0].content)
  const [companyName, setCompanyName] = useState("Nazwa Firmy")
  const [industry, setIndustry] = useState("Gastronomia")
  const [isGenerating, setIsGenerating] = useState(false)
  const [creativity, setCreativity] = useState([50])
  const { toast } = useToast()

  // Handle template change
  const handleTemplateChange = (templateId: string) => {
    const selectedTemplate = emailTemplates.find((t) => t.id === templateId) || emailTemplates[0]
    setTemplate(selectedTemplate)
    setSubject(selectedTemplate.subject)
    setContent(selectedTemplate.content)
  }

  // Generate AI content
  const generateContent = () => {
    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      const customizedContent = content
        .replace(/{NAZWA_FIRMY}/g, companyName)
        .replace(/{BRANŻA}/g, industry)
        .replace(/{TWOJE_IMIĘ}/g, "Jan Kowalski")
        .replace(/{FIRMA}/g, "NexTech Solutions")
        .replace(/{KONTAKT}/g, "tel: 123 456 789")

      setContent(customizedContent)
      setIsGenerating(false)

      toast({
        title: "Treść wygenerowana",
        description: "Oferta została pomyślnie dostosowana do firmy " + companyName,
      })
    }, 2000)
  }

  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Skopiowano do schowka",
      description: "Teraz możesz wkleić treść w innym miejscu",
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Generator Ofert</h1>
          <p className="text-muted-foreground">Automatyczne generowanie spersonalizowanych ofert handlowych</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={copyToClipboard}>
            <Copy className="mr-2 h-4 w-4" />
            Kopiuj
          </Button>
          <Button variant="default" onClick={generateContent} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generowanie...
              </>
            ) : (
              <>
                <BrainCircuit className="mr-2 h-4 w-4" />
                Generuj ofertę
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Dane do personalizacji</CardTitle>
              <CardDescription>Wprowadź informacje, które zostaną użyte do spersonalizowania oferty</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nazwa firmy</Label>
                <Input id="company-name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Branża</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Wybierz branżę" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gastronomia">Gastronomia</SelectItem>
                    <SelectItem value="Usługi">Usługi</SelectItem>
                    <SelectItem value="Motoryzacja">Motoryzacja</SelectItem>
                    <SelectItem value="Handel detaliczny">Handel detaliczny</SelectItem>
                    <SelectItem value="Uroda i zdrowie">Uroda i zdrowie</SelectItem>
                    <SelectItem value="Sport i rekreacja">Sport i rekreacja</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Szablon oferty</Label>
                <Select value={template.id} onValueChange={handleTemplateChange}>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Wybierz szablon" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Poziom kreatywności AI</Label>
                  <span className="text-sm text-muted-foreground">{creativity[0]}%</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} value={creativity} onValueChange={setCreativity} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Konwencjonalny</span>
                  <span>Kreatywny</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={generateContent} disabled={isGenerating}>
                <Wand2 className="mr-2 h-4 w-4" />
                {isGenerating ? "Generowanie..." : "Personalizuj ofertę"}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Opcje wiadomości</CardTitle>
              <CardDescription>Dodatkowe ustawienia dla generowanej oferty</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Temat wiadomości</Label>
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Dołącz elementy</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Podpis</span>
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Logo</span>
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Social Media</span>
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Załączniki</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Podgląd wygenerowanej oferty</CardTitle>
              <CardDescription>Tak będzie wyglądać wiadomość wysłana do klienta</CardDescription>
            </CardHeader>
            <Tabs defaultValue="preview" className="flex-1 flex flex-col">
              <div className="px-6">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="preview">Podgląd</TabsTrigger>
                  <TabsTrigger value="edit">Edycja</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="preview" className="flex-1 mx-6">
                <div className="border rounded-md p-4 mt-4 mb-2 bg-muted/30">
                  <div className="font-medium mb-2">Temat: {subject.replace(/{NAZWA_FIRMY}/g, companyName)}</div>
                  <div className="whitespace-pre-wrap">{content}</div>
                </div>
              </TabsContent>
              <TabsContent value="edit" className="flex-1 flex flex-col mx-6">
                <div className="space-y-2 mt-4 mb-2 flex-1 flex flex-col">
                  <Label htmlFor="email-content">Treść wiadomości</Label>
                  <Textarea
                    id="email-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 min-h-[300px]"
                  />
                </div>
              </TabsContent>
            </Tabs>
            <CardFooter className="border-t">
              <div className="flex justify-between w-full">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Zapisz
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash className="mr-2 h-4 w-4" />
                    Wyczyść
                  </Button>
                </div>
                <Button size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Wyślij ofertę
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

