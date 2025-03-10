import { Hero3DSimple } from "@/components/hero-3d-simple"
import { FeatureSection } from "@/components/feature-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { DynamicBackground } from "@/components/ui/dynamic-background"
import { SectionSeparator } from "@/components/ui/section-separator"
import { getImageForCategory } from "@/data/images"

export default function Home() {
  // Pobieramy unikalny obraz dla sekcji hero
  const heroBackgroundImage = getImageForCategory("hero")

  return (
    <main className="relative bg-background">
      <DynamicBackground />

      <section
        className="container py-20 md:py-32 flex flex-col items-center text-center relative"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(var(--background-rgb), 0.7) 0%, rgba(var(--background-rgb), 0.9) 70%), url(${heroBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl gradient-text">
          Innowacyjne Rozwiązania IT dla Twojego Biznesu
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
          Automatyzacja procesów, systemy rezerwacji, analityka leadów i AI-powered content generation. Wszystko, czego
          potrzebuje Twoja firma, aby rozwijać się w cyfrowym świecie.
        </p>
        <div className="mt-12">
          <Hero3DSimple />
        </div>
      </section>

      <SectionSeparator variant="wave" />

      <FeatureSection />

      <SectionSeparator variant="gradient" />

      <PortfolioSection />

      <SectionSeparator />

      <TestimonialsSection />

      <SectionSeparator variant="gradient" />

      <CTASection />
    </main>
  )
}

