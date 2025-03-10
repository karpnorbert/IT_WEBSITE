"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, DollarSignIcon as PaypalLogo } from "lucide-react"

// Mock data for templates (same as in portfolio page)
const templates = [
  {
    id: "template-001",
    name: "E-commerce Pro",
    description: "A complete e-commerce solution with product management, cart, and checkout.",
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com/demo/ecommerce",
    category: "E-commerce",
    price: 199,
    features: [
      "Product management",
      "Shopping cart",
      "Secure checkout",
      "Order tracking",
      "Customer accounts",
      "Responsive design",
    ],
  },
  {
    id: "template-002",
    name: "Portfolio Plus",
    description: "Showcase your work with this elegant portfolio template.",
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com/demo/portfolio",
    category: "Portfolio",
    price: 149,
    features: [
      "Project showcase",
      "Filterable gallery",
      "About me section",
      "Contact form",
      "Blog integration",
      "Responsive design",
    ],
  },
  {
    id: "template-003",
    name: "Blog Master",
    description: "A feature-rich blog template with categories, tags, and comments.",
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com/demo/blog",
    category: "Blog",
    price: 99,
    features: [
      "Category system",
      "Tag filtering",
      "Comments section",
      "Author profiles",
      "Search functionality",
      "Responsive design",
    ],
  },
  {
    id: "template-004",
    name: "Corporate Suite",
    description: "Professional template for corporate websites with team and services sections.",
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com/demo/corporate",
    category: "Business",
    price: 249,
    features: [
      "Team showcase",
      "Services section",
      "Testimonials",
      "Case studies",
      "Contact form",
      "Responsive design",
    ],
  },
  {
    id: "template-005",
    name: "Landing Page Builder",
    description: "Create high-converting landing pages with this template.",
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com/demo/landing",
    category: "Landing",
    price: 79,
    features: [
      "Hero section",
      "Feature showcase",
      "Testimonials",
      "Pricing tables",
      "Contact form",
      "Responsive design",
    ],
  },
  {
    id: "template-006",
    name: "Restaurant Showcase",
    description: "Perfect for restaurants with menu, reservation, and gallery features.",
    image: "/placeholder.svg?height=400&width=600",
    demoUrl: "https://example.com/demo/restaurant",
    category: "Restaurant",
    price: 179,
    features: [
      "Menu display",
      "Reservation system",
      "Photo gallery",
      "Chef profiles",
      "Contact information",
      "Responsive design",
    ],
  },
]

export default function CheckoutPage({ params }: { params: { templateId: string } }) {
  const [template, setTemplate] = useState<(typeof templates)[0] | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Find the template based on the ID from the URL
    const foundTemplate = templates.find((t) => t.id === params.templateId)
    if (foundTemplate) {
      setTemplate(foundTemplate)
    } else {
      // Redirect to portfolio if template not found
      router.push("/portfolio")
    }
  }, [params.templateId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Payment successful!",
      description: "Your template purchase was successful. Check your email for download instructions.",
    })

    setIsLoading(false)
    router.push("/thank-you")
  }

  if (!template) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="container py-24 px-4 md:px-6">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <motion.h1
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Checkout
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg max-w-[800px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Complete your purchase to get instant access to your template.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Enter your billing details to complete your purchase.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input id="zipCode" placeholder="10001" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="United States" required />
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <Label>Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center gap-2">
                        <PaypalLogo className="h-4 w-4" />
                        PayPal
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "credit-card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : `Pay $${template.price}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order details before completing your purchase.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative h-24 w-32 rounded-md overflow-hidden">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.category}</p>
                    <p className="text-sm mt-1">{template.description}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${template.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(template.price * 0.1).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(template.price * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4 text-sm">
                  <h4 className="font-medium mb-2">What's included:</h4>
                  <ul className="space-y-1">
                    <li>✓ Full template source code</li>
                    <li>✓ Documentation and setup guide</li>
                    <li>✓ 6 months of updates</li>
                    <li>✓ 30-day money-back guarantee</li>
                    <li>✓ 24/7 customer support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <p className="text-xs text-muted-foreground">
                By completing this purchase, you agree to our{" "}
                <a href="/terms" className="underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline">
                  Privacy Policy
                </a>
                .
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

