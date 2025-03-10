"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()
  const { resolvedTheme } = useTheme()

  // Określamy aktualny motyw
  const currentTheme = resolvedTheme || "dark"

  useEffect(() => {
    // Dodajemy kod, który upewni się, że tło zawsze będzie dostosowane do ciemnego motywu na starcie

    // Upewniamy się, że ciemny motyw jest zastosowany
    document.documentElement.classList.add("dark")

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    // Dostosuj rozmiar canvas do okna
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const displayWidth = window.innerWidth
      const displayHeight = window.innerHeight

      // Ustawiamy rozmiar canvas z uwzględnieniem DPR dla ostrości na ekranach HiDPI
      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr

      // Skalujemy kontekst
      ctx.scale(dpr, dpr)

      // Ustawiamy style CSS dla prawidłowego wyświetlania
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Parametry cząsteczek - zmniejszamy liczbę dla lepszej wydajności
    const particlesArray: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
    }[] = []

    // Tworzenie cząsteczek
    const createParticles = () => {
      // Dostosuj liczbę cząsteczek do rozmiaru ekranu i wydajności
      const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 25000), 50)
      particlesArray.length = 0 // Czyścimy tablicę przed dodaniem nowych cząsteczek

      for (let i = 0; i < particleCount; i++) {
        // Dostosuj kolory w zależności od motywu
        const color =
          currentTheme === "dark"
            ? `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 200 + 55)}, ${Math.random() * 0.3 + 0.1})`
            : `rgba(${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 150)}, ${Math.random() * 0.15 + 0.05})`

        particlesArray.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3, // Zmniejszamy prędkość
          speedY: (Math.random() - 0.5) * 0.3, // Zmniejszamy prędkość
          color: color,
        })
      }
    }

    createParticles()

    // Animacja cząsteczek
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Rysowanie i aktualizacja cząsteczek
      for (let i = 0; i < particlesArray.length; i++) {
        const particle = particlesArray[i]

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Aktualizacja pozycji
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Odbijanie od krawędzi
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.speedY *= -1
        }
      }

      // Rysowanie połączeń między cząsteczkami
      // Dostosuj maksymalną odległość połączeń do rozmiaru ekranu
      const connectionDistance = Math.min(80, window.innerWidth / 12)

      // Ograniczamy liczbę połączeń dla lepszej wydajności
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i + 1; j < Math.min(i + 5, particlesArray.length); j++) {
          const dx = particlesArray[i].x - particlesArray[j].x
          const dy = particlesArray[i].y - particlesArray[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = 0.15 * (1 - distance / connectionDistance)
            const lineColor =
              currentTheme === "dark" ? `rgba(100, 100, 255, ${opacity})` : `rgba(0, 0, 100, ${opacity})`

            ctx.beginPath()
            ctx.strokeStyle = lineColor
            ctx.lineWidth = 0.5
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    // Obsługa zmiany rozmiaru okna
    const handleResize = () => {
      resizeCanvas()
      createParticles() // Regenerujemy cząsteczki przy zmianie rozmiaru
    }

    window.addEventListener("resize", handleResize)

    // Czyszczenie
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("resize", handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [currentTheme]) // Dodajemy currentTheme jako zależność, aby reagować na zmiany motywu

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute inset-0 ${currentTheme === "dark" ? "bg-gradient-to-br from-background via-background/90 to-background/80" : "bg-gradient-to-br from-background/90 via-background/80 to-background/70"} z-10`}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}

