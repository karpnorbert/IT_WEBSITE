"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Orders",
      value: "356",
      change: "+12.2%",
      icon: <ShoppingCart className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Templates Sold",
      value: "124",
      change: "+42.1%",
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Active Users",
      value: "2,543",
      change: "+10.3%",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  // Mock data for recent orders
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      product: "E-commerce Template",
      date: "2023-03-01",
      amount: "$199",
      status: "Completed",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      product: "Portfolio Template",
      date: "2023-03-02",
      amount: "$149",
      status: "Processing",
    },
    {
      id: "ORD-003",
      customer: "Bob Johnson",
      product: "Blog Template",
      date: "2023-03-03",
      amount: "$99",
      status: "Completed",
    },
    {
      id: "ORD-004",
      customer: "Alice Brown",
      product: "Corporate Template",
      date: "2023-03-04",
      amount: "$249",
      status: "Pending",
    },
    {
      id: "ORD-005",
      customer: "Charlie Wilson",
      product: "Landing Page",
      date: "2023-03-05",
      amount: "$79",
      status: "Completed",
    },
  ]

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
        <div className="w-full">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
            <p className="text-muted-foreground">Here's an overview of your website sales and performance.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Download Report</Button>
            <Button>Add New Template</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly revenue and sales data.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center border-t">
                <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                <span className="ml-2 text-muted-foreground">Sales chart would be displayed here</span>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer purchases.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-sm">
                        <th className="text-left font-medium p-2">Order ID</th>
                        <th className="text-left font-medium p-2">Customer</th>
                        <th className="text-left font-medium p-2">Product</th>
                        <th className="text-left font-medium p-2">Date</th>
                        <th className="text-left font-medium p-2">Amount</th>
                        <th className="text-left font-medium p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">{order.id}</td>
                          <td className="p-2">{order.customer}</td>
                          <td className="p-2">{order.product}</td>
                          <td className="p-2">{order.date}</td>
                          <td className="p-2">{order.amount}</td>
                          <td className="p-2">
                            <span
                              className={`inline-block px-2 py-1 text-xs rounded-full ${
                                order.status === "Completed"
                                  ? "bg-green-500/10 text-green-500"
                                  : order.status === "Processing"
                                    ? "bg-blue-500/10 text-blue-500"
                                    : "bg-yellow-500/10 text-yellow-500"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Detailed analytics and performance metrics.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center border-t">
                <p className="text-muted-foreground">Analytics dashboard would be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>View and generate reports for your business.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center border-t">
                <p className="text-muted-foreground">Reports dashboard would be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your notification preferences.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center border-t">
                <p className="text-muted-foreground">Notifications settings would be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

