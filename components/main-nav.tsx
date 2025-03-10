import Link from "next/link"
import { Home, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MainNav() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/dashboard" className="font-bold text-xl flex items-center gap-2">
        <span className="bg-primary text-primary-foreground p-1 rounded">LG</span>
        <span className="hidden md:inline-block">Lead Generator</span>
      </Link>

      <Button variant="ghost" size="sm" asChild className="ml-4">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" />
          Strona główna
        </Link>
      </Button>

      {/* Dodaj przycisk logowania do panelu administracyjnego */}
      <div className="ml-auto">
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">
            <Lock className="mr-2 h-4 w-4" />
            Panel Admina
          </Link>
        </Button>
      </div>
    </div>
  )
}

