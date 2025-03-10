"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  BellRing,
  Calendar,
  Clock,
  Code,
  FileText,
  Mail,
  MessageSquare,
  Plus,
  Settings,
  Sparkles,
} from "lucide-react"

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState("workflows")

  const automationTemplates = [
    {
      id: "email-sequence",
      title: "Email Sequence",
      description: "Automate email follow-ups based on user actions",
      icon: <Mail className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "content-generation",
      title: "Content Generation",
      description: "Schedule regular content creation for your blog",
      icon: <FileText className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "social-posting",
      title: "Social Media Posting",
      description: "Automatically post to social media platforms",
      icon: <MessageSquare className="h-5 w-5 text-pink-500" />,
    },
    {
      id: "lead-nurturing",
      title: "Lead Nurturing",
      description: "Nurture leads with personalized content",
      icon: <Sparkles className="h-5 w-5 text-amber-500" />,
    },
    {
      id: "appointment-reminders",
      title: "Appointment Reminders",
      description: "Send automated reminders for upcoming appointments",
      icon: <Calendar className="h-5 w-5 text-green-500" />,
    },
    {
      id: "custom-workflow",
      title: "Custom Workflow",
      description: "Build a custom automation workflow from scratch",
      icon: <Code className="h-5 w-5 text-indigo-500" />,
    },
  ]

  const activeWorkflows = [
    {
      id: "welcome-sequence",
      title: "Welcome Email Sequence",
      description: "5-part email sequence for new subscribers",
      status: "Active",
      lastRun: "2 hours ago",
      nextRun: "Tomorrow, 9:00 AM",
      stats: {
        sent: 1243,
        opened: 876,
        clicked: 432,
      },
    },
    {
      id: "blog-content",
      title: "Weekly Blog Content",
      description: "Generate and publish blog content every Monday",
      status: "Active",
      lastRun: "3 days ago",
      nextRun: "Monday, 8:00 AM",
      stats: {
        generated: 48,
        published: 45,
        views: 12500,
      },
    },
    {
      id: "social-posts",
      title: "Daily Social Media Posts",
      description: "Create and schedule posts for Instagram and Twitter",
      status: "Active",
      lastRun: "Today, 7:00 AM",
      nextRun: "Tomorrow, 7:00 AM",
      stats: {
        created: 365,
        engagement: "4.2%",
        clicks: 2150,
      },
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
          AI-Powered Automation
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-lg max-w-[800px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Create powerful automation workflows to streamline your business processes and save time.
        </motion.p>
      </div>

      <Tabs defaultValue="workflows" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="workflows">Active Workflows</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Active Workflows</h2>
            <Button onClick={() => setActiveTab("create")}>
              <Plus className="mr-2 h-4 w-4" /> Create New
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeWorkflows.map((workflow) => (
              <Card key={workflow.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{workflow.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                        {workflow.status}
                      </span>
                    </div>
                  </div>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-4 w-4" /> Last run:
                      </span>
                      <span>{workflow.lastRun}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center">
                        <Calendar className="mr-1 h-4 w-4" /> Next run:
                      </span>
                      <span>{workflow.nextRun}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Performance</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(workflow.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <div className="flex justify-between w-full">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Pause
                    </Button>
                    <Button variant="outline" size="sm">
                      Analytics
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Automation Templates</h2>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" /> Manage Templates
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {automationTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg p-2 bg-primary/10">{template.icon}</div>
                    <div>
                      <CardTitle>{template.title}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="border-t px-6 py-4">
                  <Button className="w-full" onClick={() => setActiveTab("create")}>
                    Use Template <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Create New Automation</h2>
            <Button variant="outline" onClick={() => setActiveTab("templates")}>
              <BellRing className="mr-2 h-4 w-4" /> Browse Templates
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Workflow Details</CardTitle>
              <CardDescription>Configure the basic settings for your automation workflow.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Workflow Name</Label>
                <Input id="name" placeholder="Enter workflow name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe what this workflow does" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule Type</Label>
                  <select
                    id="schedule"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="recurring">Recurring</option>
                    <option value="one-time">One-time</option>
                    <option value="trigger">Trigger-based</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <select
                    id="frequency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button className="w-full">
                Continue to Workflow Builder <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <div className="bg-muted rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Need help building your automation?</h3>
            <p className="text-muted-foreground mb-4">
              Our AI assistant can help you create the perfect workflow based on your needs.
            </p>
            <Button variant="outline">
              <Sparkles className="mr-2 h-4 w-4" /> Use AI Assistant
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

