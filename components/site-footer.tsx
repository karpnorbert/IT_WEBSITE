import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background/50 backdrop-blur-sm">
      <div className="container px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">NexTech</h3>
            <p className="text-sm text-muted-foreground">
              Innowacyjne rozwiązania IT dla Twojego biznesu. Automatyzacja, AI i nowoczesne systemy.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Produkty</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/produkty?category=accounting" className="text-muted-foreground hover:text-primary">
                  Automatyzacja dla księgowości
                </Link>
              </li>
              <li>
                <Link href="/produkty?category=ecommerce" className="text-muted-foreground hover:text-primary">
                  Rozwiązania dla e-commerce
                </Link>
              </li>
              <li>
                <Link href="/produkty?category=crm" className="text-muted-foreground hover:text-primary">
                  Automatyzacje dla CRM
                </Link>
              </li>
              <li>
                <Link href="/produkty?category=creative" className="text-muted-foreground hover:text-primary">
                  Kreatywne AI Tools
                </Link>
              </li>
              <li>
                <Link href="/produkty?category=chatbots" className="text-muted-foreground hover:text-primary">
                  Chatboty dla biznesu
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Firma</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/o-nas" className="text-muted-foreground hover:text-primary">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-primary">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/kariera" className="text-muted-foreground hover:text-primary">
                  Kariera
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-muted-foreground hover:text-primary">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Wsparcie</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pomoc" className="text-muted-foreground hover:text-primary">
                  Centrum pomocy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/dokumentacja" className="text-muted-foreground hover:text-primary">
                  Dokumentacja
                </Link>
              </li>
              <li>
                <Link href="/polityka-prywatnosci" className="text-muted-foreground hover:text-primary">
                  Polityka prywatności
                </Link>
              </li>
              <li>
                <Link href="/regulamin" className="text-muted-foreground hover:text-primary">
                  Regulamin
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center sm:flex sm:justify-between sm:text-left text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NexTech. Wszelkie prawa zastrzeżone.</p>
          <div className="mt-2 sm:mt-0 space-x-4">
            <Link href="/polityka-prywatnosci" className="hover:text-primary">
              Polityka prywatności
            </Link>
            <Link href="/regulamin" className="hover:text-primary">
              Regulamin
            </Link>
            <Link href="/cookies" className="hover:text-primary">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

