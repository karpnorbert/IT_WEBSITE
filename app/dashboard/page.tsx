"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon, BuildingIcon, MailIcon, PhoneIcon, UserIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

// Mock data for demonstration
const activityData = [
  { name: "Pon", firmy: 15, oferty: 8, konwersje: 2 },
  { name: "Wt", firmy: 20, oferty: 12, konwersje: 3 },
  { name: "Śr", firmy: 25, oferty: 15, konwersje: 5 },
  { name: "Czw", firmy: 18, oferty: 10, konwersje: 2 },
  { name: "Pt", firmy: 22, oferty: 13, konwersje: 4 },
  { name: "Sob", firmy: 10, oferty: 5, konwersje: 1 },
  { name: "Ndz", firmy: 5, oferty: 3, konwersje: 0 },
]

const recentCompanies = [
  { id: 1, name: "Kawiarnia u Marka", industry: "Gastronomia", contact: "marek@example.com", status: "Nowy" },
  { id: 2, name: "Salon Fryzjerski Anna", industry: "Usługi", contact: "anna@example.com", status: "Oferta wysłana" },
  { id: 3, name: "Mechanik Express", industry: "Motoryzacja", contact: "mechanik@example.com", status: "Nowy" },
  { id: 4, name: "Kwiaciarnia Flora", industry: "Handel", contact: "flora@example.com", status: "Zainteresowany" },
  { id: 5, name: "Studio Fitness", industry: "Sport", contact: "fitness@example.com", status: "Oferta wysłana" },
]

const sourceData = [
  { name: "Google Maps", value: 45 },
  { name: "Facebook", value: 30 },
  { name: "Instagram", value: 15 },
  { name: "Inne", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Przegląd aktywności systemu i kluczowych statystyk</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Eksportuj dane</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Znalezione firmy</CardTitle>
            <BuildingIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">115</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                12%
              </span>{" "}
              więcej niż w zeszłym tygodniu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wysłane oferty</CardTitle>
            <MailIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">66</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                8%
              </span>{" "}
              więcej niż w zeszłym tygodniu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potencjalni klienci</CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-yellow-500 inline-flex items-center">
                <ArrowRightIcon className="mr-1 h-3 w-3" />
                Bez zmian
              </span>{" "}
              w porównaniu do zeszłego tygodnia
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Konwersje</CardTitle>
            <PhoneIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <ArrowDownIcon className="mr-1 h-3 w-3" />
                4%
              </span>{" "}
              mniej niż w zeszłym tygodniu
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Przegląd</TabsTrigger>
          <TabsTrigger value="analytics">Analityka</TabsTrigger>
          <TabsTrigger value="reports">Raporty</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Aktywność systemu</CardTitle>
                <CardDescription>
                  Liczba znalezionych firm, wysłanych ofert i konwersji w ostatnich 7 dniach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="firmy" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="oferty" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="konwersje" stroke="#ffc658" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Źródła pozyskania</CardTitle>
                <CardDescription>Skąd pochodzą dane znalezionych firm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ostatnio znalezione firmy</CardTitle>
              <CardDescription>Lista 5 ostatnio znalezionych firm bez stron internetowych</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Nazwa</th>
                      <th className="text-left p-2 font-medium">Branża</th>
                      <th className="text-left p-2 font-medium">Kontakt</th>
                      <th className="text-left p-2 font-medium">Status</th>
                      <th className="text-left p-2 font-medium">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCompanies.map((company) => (
                      <tr key={company.id} className="border-b">
                        <td className="p-2">{company.name}</td>
                        <td className="p-2">{company.industry}</td>
                        <td className="p-2">{company.contact}</td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              company.status === "Nowy"
                                ? "bg-blue-500/20 text-blue-500"
                                : company.status === "Oferta wysłana"
                                  ? "bg-yellow-500/20 text-yellow-500"
                                  : "bg-green-500/20 text-green-500"
                            }`}
                          >
                            {company.status}
                          </span>
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">
                            Szczegóły
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Zobacz wszystkie
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Szczegółowa analityka</CardTitle>
              <CardDescription>Zaawansowana analiza danych i trendów</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Moduł analityki w przygotowaniu...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Raporty systemowe</CardTitle>
              <CardDescription>Podsumowanie raportów i wyników działania systemu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    Raport tygodniowy
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Raport miesięczny
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Skuteczność kampanii
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Analiza konwersji
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

