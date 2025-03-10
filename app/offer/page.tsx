"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function OfferPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const pricingPlans = [
    {
      name: "Basic",
      description: "Perfect for small businesses and startups",
      price: {
        monthly: 99,
        yearly: 79,
      },
      features: [
        "1 Website Template",
        "Basic Customization",
        "3 Months Support",
        "Standard Documentation",
        "Email Support",
      ],
      limitations: ["No Source Code Access", "No Custom Modifications", "No Priority Support"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and agencies",
      price: {
        monthly: 199,
        yearly: 159,
      },
      features: [
        "3 Website Templates",
        "Advanced Customization",
        "6 Months Support",
        "Detailed Documentation",
        "Email & Chat Support",
        "Source Code Access",
        "1 Custom Modification",
      ],
      limitations: ["No Priority Support"],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large businesses with complex needs",
      price: {
        monthly: 399,
        yearly: 319,
      },
      features: [
        "Unlimited Website Templates",
        "Full Customization",
        "12 Months Support",
        "Comprehensive Documentation",
        "24/7 Priority Support",
        "Source Code Access",
        "3 Custom Modifications",
        "Dedicated Account Manager",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="container py-24 px-4 md:px-6">
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <motion.h1
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Pricing Plans
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg max-w-[800px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Choose the perfect plan for your business needs
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4"
        >
          <Tabs defaultValue="monthly" value={billingCycle} onValueChange={setBillingCycle} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <Badge variant="outline" className="ml-2 bg-primary/20 text-primary">
                  Save 20%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            <Card className={`h-full flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price[billingCycle as keyof typeof plan.price]}</span>
                  <span className="text-muted-foreground ml-2">/ month</span>
                  {billingCycle === "yearly" && (
                    <p className="text-sm text-muted-foreground mt-1">Billed annually (${plan.price.yearly * 12})</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="text-sm font-medium text-muted-foreground">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation) => (
                          <li key={limitation} className="flex items-start text-muted-foreground">
                            <span className="h-5 w-5 flex items-center justify-center mr-2 shrink-0">✕</span>
                            <span className="text-sm">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className={`w-full ${plan.popular ? "bg-primary" : ""}`} asChild>
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/portfolio"}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  What's included in the website templates?
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Our templates include all the necessary files and documentation.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our templates include all the necessary HTML, CSS, JavaScript files, along with documentation and
                  setup instructions.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Do I need technical knowledge to use the templates?</h3>
                <p className="text-sm text-muted-foreground">
                  Basic knowledge of HTML and CSS is helpful, but our templates are designed to be user-friendly with
                  clear documentation.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Can I use the templates for multiple projects?</h3>
                <p className="text-sm text-muted-foreground">
                  Each template purchase allows usage for a single end product. For multiple projects, you'll need
                  additional licenses.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Do you offer refunds?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer a 30-day money-back guarantee if you're not satisfied with your purchase.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">How long do I get support?</h3>
                <p className="text-sm text-muted-foreground">
                  Support duration varies by plan: 3 months for Basic, 6 months for Professional, and 12 months for
                  Enterprise.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Can I upgrade my plan later?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade your plan at any time. We'll prorate the cost based on your current subscription.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/contact">Have more questions? Contact us</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

