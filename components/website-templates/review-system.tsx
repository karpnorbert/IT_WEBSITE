"use client"

import type React from "react"

import { useState } from "react"
import { Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface ReviewSystemProps {
  templateId: string
  initialRating: number
  initialReviewCount: number
}

interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

// Przykładowe recenzje
const sampleReviews: Record<string, Review[]> = {
  "ecom-001": [
    {
      id: "1",
      author: "Jan Kowalski",
      rating: 5,
      comment:
        "Świetny szablon, bardzo łatwy w konfiguracji. Sklep działa bez zarzutu, klienci chwalą przejrzysty interfejs.",
      date: "2023-10-15",
    },
    {
      id: "2",
      author: "Anna Nowak",
      rating: 4,
      comment:
        "Dobry stosunek jakości do ceny. Potrzebowałam kilku modyfikacji, ale zespół wsparcia pomógł mi je wdrożyć.",
      date: "2023-09-22",
    },
    {
      id: "3",
      author: "Marek Wiśniewski",
      rating: 5,
      comment:
        "Używam tego szablonu od 3 miesięcy i jestem bardzo zadowolony. Sprzedaż wzrosła o 30% dzięki lepszej prezentacji produktów.",
      date: "2023-08-10",
    },
  ],
  "med-001": [
    {
      id: "1",
      author: "Klinika Zdrowia",
      rating: 5,
      comment: "System rezerwacji działa perfekcyjnie. Nasi pacjenci chwalą łatwość umawiania wizyt online.",
      date: "2023-10-05",
    },
    {
      id: "2",
      author: "Dr Marek Zdrój",
      rating: 4,
      comment: "Bardzo profesjonalny wygląd strony, dobrze odzwierciedla charakter naszej kliniki.",
      date: "2023-09-12",
    },
  ],
}

export function ReviewSystem({ templateId, initialRating, initialReviewCount }: ReviewSystemProps) {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews[templateId] || [])
  const [newReview, setNewReview] = useState({ rating: 0, comment: "", author: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)

  const handleRatingClick = (rating: number) => {
    setNewReview({ ...newReview, rating })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newReview.rating || !newReview.comment || !newReview.author) {
      alert("Proszę wypełnić wszystkie pola")
      return
    }

    setIsSubmitting(true)

    // Symulacja wysyłania recenzji
    setTimeout(() => {
      const review: Review = {
        id: Date.now().toString(),
        author: newReview.author,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split("T")[0],
      }

      setReviews([review, ...reviews])
      setNewReview({ rating: 0, comment: "", author: "" })
      setShowForm(false)
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Opinie klientów</h3>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Anuluj" : "Dodaj opinię"}</Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
          <div className="space-y-2">
            <label className="text-sm font-medium">Twoja ocena</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className="p-1"
                  onMouseEnter={() => setHoverRating(rating)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingClick(rating)}
                >
                  <Star
                    className={cn(
                      "h-6 w-6",
                      (hoverRating ? rating <= hoverRating : rating <= newReview.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium">
              Imię
            </label>
            <input
              id="author"
              type="text"
              className="w-full p-2 rounded-md border border-border bg-background"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
              placeholder="Twoje imię"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Komentarz
            </label>
            <Textarea
              id="comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Podziel się swoją opinią o tym szablonie..."
              rows={4}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Wysyłanie..." : "Dodaj opinię"}
          </Button>
        </form>
      )}

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{review.author}</div>
                    <div className="text-xs text-muted-foreground">{review.date}</div>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={cn(
                        "h-4 w-4",
                        rating <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400",
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>Brak opinii dla tego szablonu.</p>
          <p className="text-sm">Bądź pierwszy i podziel się swoją opinią!</p>
        </div>
      )}
    </div>
  )
}

