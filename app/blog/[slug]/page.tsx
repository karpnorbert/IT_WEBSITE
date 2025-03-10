"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

// Mock blog post data
const blogPosts = [
  {
    slug: "ai-business-automation",
    title: "How AI is Revolutionizing Business Automation in 2025",
    excerpt: "Discover the latest AI trends that are transforming business automation and increasing efficiency.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "Jane Smith",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Automation",
    tags: ["AI", "Automation", "Business"],
    content: `
      <h2>The Evolution of Business Automation</h2>
      <p>Artificial Intelligence has come a long way in the past decade, transforming from a futuristic concept to an essential business tool. In 2025, we're seeing unprecedented adoption of AI-powered automation across industries, from manufacturing to marketing.</p>
      
      <p>The latest generation of AI tools can now understand context, learn from minimal examples, and adapt to changing business needs without extensive reprogramming. This represents a significant leap forward from the rule-based automation systems of the past.</p>
      
      <h2>Key AI Automation Trends in 2025</h2>
      
      <h3>1. Hyper-Personalized Customer Experiences</h3>
      <p>AI systems now analyze customer data in real-time to deliver personalized experiences at scale. From dynamic website content to customized email campaigns, businesses can now tailor their messaging to individual preferences without manual intervention.</p>
      
      <h3>2. Autonomous Decision Making</h3>
      <p>Advanced AI systems can now make complex business decisions with minimal human oversight. These systems analyze market trends, customer behavior, and internal metrics to optimize everything from inventory management to pricing strategies.</p>
      
      <h3>3. Predictive Maintenance and Operations</h3>
      <p>AI-powered predictive analytics can forecast equipment failures before they happen, schedule maintenance during optimal downtime, and automatically adjust production schedules to minimize disruption.</p>
      
      <h2>Implementation Strategies for Businesses</h2>
      <p>While the benefits of AI automation are clear, successful implementation requires a strategic approach:</p>
      
      <ul>
        <li>Start with high-impact, low-complexity processes to demonstrate value</li>
        <li>Ensure data quality and accessibility before implementing AI solutions</li>
        <li>Invest in employee training to work alongside AI systems</li>
        <li>Establish clear metrics to measure the ROI of automation initiatives</li>
      </ul>
      
      <h2>The Future of Work</h2>
      <p>As AI automation becomes more sophisticated, the nature of work continues to evolve. Rather than replacing human workers, the most successful businesses are finding ways to augment human capabilities with AI. This collaborative approach leads to higher productivity, increased job satisfaction, and better business outcomes.</p>
      
      <h2>Conclusion</h2>
      <p>The AI revolution in business automation is just beginning. Organizations that embrace these technologies now will gain a significant competitive advantage in the years to come. By starting with a clear strategy and focusing on high-value use cases, businesses of all sizes can benefit from the transformative power of AI automation.</p>
    `,
  },
  {
    slug: "reservation-systems-guide",
    title: "The Ultimate Guide to Modern Reservation Systems",
    excerpt: "Learn how to implement and optimize reservation systems for your business.",
    image: "/placeholder.svg?height=600&width=1200",
    author: "John Doe",
    authorImage: "/placeholder.svg?height=100&width=100",
    date: "March 10, 2025",
    readTime: "8 min read",
    category: "Reservation",
    tags: ["Booking", "Hospitality", "Technology"],
    content: `
      <h2>Introduction to Modern Reservation Systems</h2>
      <p>In today's fast-paced digital world, an efficient reservation system is essential for businesses in hospitality, healthcare, professional services, and beyond. Modern reservation systems go far beyond simple booking functionality, offering powerful features that enhance customer experience and streamline operations.</p>
      
      <h2>Key Features of Effective Reservation Systems</h2>
      
      <h3>1. Omnichannel Booking Capabilities</h3>
      <p>Today's customers expect to book appointments or reservations through their preferred channels, whether that's your website, mobile app, social media platforms, or third-party booking sites. A modern reservation system should provide a consistent experience across all these touchpoints.</p>
      
      <h3>2. Real-Time Availability</h3>
      <p>Instant updates to availability prevent double-bookings and allow customers to see exactly when they can book. This transparency improves customer satisfaction and reduces administrative headaches.</p>
      
      <h3>3. Automated Notifications</h3>
      <p>Reduce no-shows by up to 80% with automated confirmation emails, SMS reminders, and follow-up messages. These communications can be personalized and triggered based on specific time intervals before appointments.</p>
      
      <h3>4. Integration Capabilities</h3>
      <p>Your reservation system should integrate seamlessly with your other business tools, including CRM systems, payment processors, marketing platforms, and calendar applications.</p>
      
      <h2>Implementation Best Practices</h2>
      
      <h3>Choosing the Right Solution</h3>
      <p>When selecting a reservation system, consider your specific business needs, budget, and growth plans. Options range from simple booking widgets to comprehensive enterprise solutions. Key factors to evaluate include:</p>
      
      <ul>
        <li>Scalability to grow with your business</li>
        <li>Customization options to match your brand</li>
        <li>Mobile responsiveness for on-the-go bookings</li>
        <li>Analytics capabilities to track performance</li>
        <li>Customer support and training resources</li>
      </ul>
      
      <h3>Optimizing the Booking Experience</h3>
      <p>The reservation process should be intuitive and frictionless. Minimize the number of steps required to complete a booking, and only ask for essential information. Consider implementing features like:</p>
      
      <ul>
        <li>Guest checkout options for first-time customers</li>
        <li>Saved preferences for returning customers</li>
        <li>Multiple payment options</li>
        <li>Clear cancellation and rescheduling policies</li>
      </ul>
      
      <h2>Leveraging Data for Business Growth</h2>
      <p>Modern reservation systems generate valuable data that can drive business decisions. Analyze booking patterns to optimize staffing, identify popular services, and create targeted marketing campaigns. Customer preferences and history can be used to personalize the experience and increase loyalty.</p>
      
      <h2>Conclusion</h2>
      <p>A well-implemented reservation system does more than just manage bookings—it enhances customer experience, improves operational efficiency, and provides insights for business growth. By choosing the right solution and following implementation best practices, you can transform your booking process into a competitive advantage.</p>
    `,
  },
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<(typeof blogPosts)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Find the post based on the slug
    const foundPost = blogPosts.find((p) => p.slug === params.slug)
    if (foundPost) {
      setPost(foundPost)
    } else {
      // Redirect to blog if post not found
      router.push("/blog")
    }
    setIsLoading(false)
  }, [params.slug, router])

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className="container py-24 px-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge>{post.category}</Badge>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 mb-8">
            <Avatar>
              <AvatarImage src={post.authorImage} alt={post.author} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.author}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-4">
                <span className="flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {post.date}
                </span>
                <span className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden"
        >
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <Card key={relatedPost.slug} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2">{relatedPost.category}</Badge>
                    <h3 className="text-lg font-bold mb-2">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{relatedPost.excerpt}</p>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {relatedPost.date}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

