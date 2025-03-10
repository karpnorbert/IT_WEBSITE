"use client"

import { useState } from "react"
import {
  Mail,
  Plus,
  Pencil,
  Trash,
  Play,
  Pause,
  ChevronDown,
  BarChart,
  RefreshCw,
  Filter,
  Send,
  Clock,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for email campaigns
const mockCampaigns = [
  {
    id: 1,
    name: "Oferta dla nowo znalezionych firm",
    status: "active",
    audience: "Nowo znalezione firmy bez strony WWW",
    emails: 45,
    opens: 28,
    clicks: 12,
    replies: 5,
    lastSent: "2023-12-15",
  },
  {
    id: 2,
    name: "Promocja świąteczna",
    status: "scheduled",
    audience: "Wszystkie firmy w bazie",
    emails: 150,
    opens: 85,
    clicks: 32,
    replies: 10,
    lastSent: "2023-11-25",
  },
  {
    id: 3,
    name: "Follow-up po 7 dniach",
    status: "active",
    audience: "Firmy, które nie odpowiedziały",
    emails: 78,
    opens: 42,
    clicks: 9,
    replies: 3,
    lastSent: "2023-12-10",
  },
  {
    id: 4,
    name: "Specjalna oferta dla gastronomii",
    status: "paused",
    audience: "Firmy z branży gastronomicznej",
    emails: 37,
    opens: 22,
    clicks: 8,
    replies: 2,
    lastSent: "2023-12-05",
  },
  {
    id: 5,
    name: "Webinar o marketingu online",
    status: "completed",
    audience: "Wszystkie firmy w bazie",
    emails: 200,
    opens: 130,
    clicks: 65,
    replies: 18,
    lastSent: "2023-11-15",
  },
]

export default function EmailCampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter campaigns based on search and status  setStatusFilter] = useState("all")

  // Filter campaigns based on search and status
  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Calculate campaign statistics
  const totalEmails = mockCampaigns.reduce((sum, campaign) => sum + campaign.emails, 0)
  const totalOpens = mockCampaigns.reduce((sum, campaign) => sum + campaign.opens, 0)
  const totalClicks = mockCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0)
  const totalReplies = mockCampaigns.reduce((sum, campaign) => sum + campaign.replies, 0)

  const openRate = totalEmails > 0 ? Math.round((totalOpens / totalEmails) * 100) : 0
  const clickRate = totalOpens > 0 ? Math.round((totalClicks / totalOpens) * 100) : 0
  const replyRate = totalEmails > 0 ? Math.round((totalReplies / totalEmails) * 100) : 0

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kampanie Email</h1>
          <p className="text-muted-foreground">
            Zarządzanie automatycznymi kampaniami email dla potencjalnych klientów
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <BarChart className="mr-2 h-4 w-4" />
            Raporty
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nowa kampania
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wysłane wiadomości</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmails}</div>
            <p className="text-xs text-muted-foreground">Łączna liczba wysłanych wiadomości</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wskaźnik otwarć</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openRate}%</div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${openRate}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {totalOpens} z {totalEmails} wiadomości zostało otwartych
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wskaźnik kliknięć</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clickRate}%</div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${clickRate}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {totalClicks} kliknięć z {totalOpens} otwartych wiadomości
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wskaźnik odpowiedzi</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{replyRate}%</div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${replyRate}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {totalReplies} odpowiedzi na {totalEmails} wysłanych wiadomości
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kampanie marketingowe</CardTitle>
          <CardDescription>Zarządzaj swoimi automatycznymi kampaniami email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  placeholder="Szukaj kampanii..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtruj po statusie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie statusy</SelectItem>
                  <SelectItem value="active">Aktywne</SelectItem>
                  <SelectItem value="paused">Wstrzymane</SelectItem>
                  <SelectItem value="scheduled">Zaplanowane</SelectItem>
                  <SelectItem value="completed">Zakończone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Nazwa kampanii</th>
                  <th className="text-left p-2 font-medium">Status</th>
                  <th className="text-left p-2 font-medium">Grupa docelowa</th>
                  <th className="text-left p-2 font-medium">Statystyki</th>
                  <th className="text-left p-2 font-medium">Ostatnio wysłano</th>
                  <th className="text-left p-2 font-medium">Akcje</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{campaign.name}</td>
                    <td className="p-2">
                      <Badge
                        variant="outline"
                        className={`${
                          campaign.status === "active"
                            ? "border-green-500 text-green-500"
                            : campaign.status === "paused"
                              ? "border-yellow-500 text-yellow-500"
                              : campaign.status === "scheduled"
                                ? "border-blue-500 text-blue-500"
                                : "border-gray-500 text-gray-500"
                        }`}
                      >
                        {campaign.status === "active"
                          ? "Aktywna"
                          : campaign.status === "paused"
                            ? "Wstrzymana"
                            : campaign.status === "scheduled"
                              ? "Zaplanowana"
                              : "Zakończona"}
                      </Badge>
                    </td>
                    <td className="p-2">{campaign.audience}</td>
                    <td className="p-2">
                      <div className="flex items-center space-x-4">
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Otwarcia</div>
                          <div className="text-sm font-medium">
                            {Math.round((campaign.opens / campaign.emails) * 100)}%
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Kliknięcia</div>
                          <div className="text-sm font-medium">
                            {Math.round((campaign.clicks / campaign.opens) * 100)}%
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">Odpowiedzi</div>
                          <div className="text-sm font-medium">
                            {Math.round((campaign.replies / campaign.emails) * 100)}%
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">{campaign.lastSent}</td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          {campaign.status === "active" ? (
                            <Pause className="h-4 w-4" />
                          ) : campaign.status === "paused" ? (
                            <Play className="h-4 w-4" />
                          ) : campaign.status === "scheduled" ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              <span>Wyślij testową</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              <span>Zmień odbiorców</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart className="mr-2 h-4 w-4" />
                              <span>Analiza</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Usuń</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

