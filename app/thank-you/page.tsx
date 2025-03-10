"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, FileText, Mail } from "lucide-react"

export default function ThankYouPage() {
  const router = useRouter()

  // Redirect to home if accessed directly without purchase
  useEffect(() => {
    const hasCompletedPurchase = localStorage.getItem("completedPurchase")
    if (!hasCompletedPurchase) {
      // For demo purposes, we'll allow direct access
      // In a real app, you might want to redirect
      // router.push("/")

      // Set a flag for demo purposes
      localStorage.setItem("completedPurchase", "true")
    }
  }, [router])

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Thank You for Your Purchase!</CardTitle>
            <CardDescription>Your order has been successfully processed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Check Your Email</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                We've sent you an email with your purchase details and download instructions.
              </p>
            </div>

            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center gap-3 mb-2">
                <Download className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Download Your Template</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">You can download your template directly from here:</p>
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>

            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Documentation</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Access the documentation to get started with your template:
              </p>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/portfolio">Browse More Templates</Link>
            </Button>
            <Button asChild variant="link" className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

