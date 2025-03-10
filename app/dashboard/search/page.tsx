"use client"

import { useState } from "react"
import {
  Building2,
  Briefcase,
  MapPin,
  SearchIcon,
  Download,
  Filter,
  RotateCw,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Mock data for companies without websites
const mockCompanies = [
  {
    id: 1,
    name: "Kawiarnia u Marka",
    industry: "Gastronomia",
    location: "Warszawa, Polska",
    contact: "tel: 123-456-789",
    source: "Google Maps",
  },
  {
    id: 2,
    name: "Salon Fryzjerski Anna",
    industry: "Usługi",
    location: "Kraków, Polska",
    contact: "email: anna@example.com",
    source: "Facebook",
  },
  {
    id: 3,
    name: "Mechanik Express",
    industry: "Motoryzacja",
    location: "Gdańsk, Polska",
    contact: "tel: 987-654-321",
    source: "Google Maps",
  },
  {
    id: 4,
    name: "Kwiaciarnia Flora",
    industry: "Handel",
    location: "Wrocław, Polska",
    contact: "email: flora@example.com",
    source: "Instagram",
  },
  {
    id: 5,
    name: "Studio Fitness",
    industry: "Sport",
    location: "Poznań, Polska",
    contact: "tel: 111-222-333",
    source: "Facebook",
  },
  {
    id: 6,
    name: "Piekarnia Pod Kłosem",
    industry: "Gastronomia",
    location: "Łódź, Polska",
    contact: "tel: 444-555-666",
    source: "Google Maps",
  },
  {
    id: 7,
    name: "Auto Detailing Błysk",
    industry: "Motoryzacja",
    location: "Katowice, Polska",
    contact: "email: autodetailing@example.com",
    source: "Facebook",
  },
]

export default function SearchPage() {
  const [isSearching, setIsSearching] = useState(false)
  const [progress, setProgress] = useState(0)
  const [searchResults, setSearchResults] = useState<typeof mockCompanies>([])
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])

  // Simulate search process
  const startSearch = () => {
    setIsSearching(true)
    setProgress(0)
    setSearchResults([])

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 5
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsSearching(false)
          setSearchResults(mockCompanies)
          return 100
        }
        return newProgress
      })
    }, 300)
  }

  const toggleCompany = (id: number) => {
    setSelectedCompanies((prev) => (prev.includes(id) ? prev.filter((companyId) => companyId !== id) : [...prev, id]))
  }

  const selectAll = () => {
    if (selectedCompanies.length === searchResults.length) {
      setSelectedCompanies([])
    } else {
      setSelectedCompanies(searchResults.map((company) => company.id))
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wyszukiwanie Klientów</h1>
          <p className="text-muted-foreground">Automatyczne wyszukiwanie firm bez stron internetowych</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={selectedCompanies.length === 0}
            onClick={() => alert(`Eksportowanie ${selectedCompanies.length} firm do CSV`)}
          >
            <Download className="mr-2 h-4 w-4" />
            Eksportuj zaznaczone
          </Button>
          <Button disabled={isSearching} onClick={startSearch}>
            {isSearching ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Wyszukiwanie...
              </>
            ) : (
              <>
                <SearchIcon className="mr-2 h-4 w-4" />
                Rozpocznij wyszukiwanie
              </>
            )}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Konfiguracja wyszukiwania</CardTitle>
          <CardDescription>Zdefiniuj parametry wyszukiwania firm bez stron internetowych</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="location">Lokalizacja</Label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="location" placeholder="Miasto, region lub kraj" className="pl-8" defaultValue="Polska" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Branża</Label>
              <div className="relative">
                <Briefcase className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all">
                  <SelectTrigger id="industry" className="pl-8">
                    <SelectValue placeholder="Wybierz branżę" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie branże</SelectItem>
                    <SelectItem value="gastronomy">Gastronomia</SelectItem>
                    <SelectItem value="services">Usługi</SelectItem>
                    <SelectItem value="automotive">Motoryzacja</SelectItem>
                    <SelectItem value="retail">Handel detaliczny</SelectItem>
                    <SelectItem value="beauty">Uroda i zdrowie</SelectItem>
                    <SelectItem value="sports">Sport i rekreacja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Źródło danych</Label>
              <div className="relative">
                <Building2 className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all">
                  <SelectTrigger id="source" className="pl-8">
                    <SelectValue placeholder="Wybierz źródło" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie źródła</SelectItem>
                    <SelectItem value="google_maps">Google Maps</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <Label>Opcje wyszukiwania</Label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="verify_website" defaultChecked />
                <Label htmlFor="verify_website">Weryfikuj brak strony WWW</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check_contact" defaultChecked />
                <Label htmlFor="check_contact">Sprawdzaj dane kontaktowe</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="exclude_existing" defaultChecked />
                <Label htmlFor="exclude_existing">Pomijaj istniejące w bazie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="deep_search" />
                <Label htmlFor="deep_search">Wyszukiwanie dogłębne (wolniejsze)</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {isSearching && (
        <Card>
          <CardHeader>
            <CardTitle>Wyszukiwanie w toku</CardTitle>
            <CardDescription>Trwa automatyczne wyszukiwanie firm bez stron internetowych</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Postęp: {progress}%</span>
                <span>{Math.floor((progress / 100) * mockCompanies.length)} znalezionych firm</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>
      )}

      {searchResults.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Wyniki wyszukiwania</CardTitle>
              <CardDescription>Znaleziono {searchResults.length} firm bez strony internetowej</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={selectAll}>
                {selectedCompanies.length === searchResults.length ? "Odznacz wszystkie" : "Zaznacz wszystkie"}
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtruj
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Odśwież
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 w-10">
                      <Checkbox
                        checked={selectedCompanies.length === searchResults.length && searchResults.length > 0}
                        onCheckedChange={selectAll}
                      />
                    </th>
                    <th className="text-left p-2 font-medium">Nazwa</th>
                    <th className="text-left p-2 font-medium">Branża</th>
                    <th className="text-left p-2 font-medium">Lokalizacja</th>
                    <th className="text-left p-2 font-medium">Kontakt</th>
                    <th className="text-left p-2 font-medium">Źródło</th>
                    <th className="text-left p-2 font-medium">Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((company) => (
                    <tr key={company.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <Checkbox
                          checked={selectedCompanies.includes(company.id)}
                          onCheckedChange={() => toggleCompany(company.id)}
                        />
                      </td>
                      <td className="p-2">{company.name}</td>
                      <td className="p-2">{company.industry}</td>
                      <td className="p-2">{company.location}</td>
                      <td className="p-2">{company.contact}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            company.source === "Google Maps"
                              ? "bg-blue-500/20 text-blue-500"
                              : company.source === "Facebook"
                                ? "bg-indigo-500/20 text-indigo-500"
                                : "bg-pink-500/20 text-pink-500"
                          }`}
                        >
                          {company.source}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              Dodaj wszystkie do bazy
            </Button>
            <Button variant="outline" size="sm">
              Wyślij oferty do zaznaczonych
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

