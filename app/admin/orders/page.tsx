"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Filter } from "lucide-react"

// Mock data for orders
const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    product: "E-commerce Template",
    date: "2023-03-01",
    amount: "$199",
    status: "Completed",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Portfolio Template",
    date: "2023-03-02",
    amount: "$149",
    status: "Processing",
  },
  {
    id: "ORD-003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    product: "Blog Template",
    date: "2023-03-03",
    amount: "$99",
    status: "Completed",
  },
  {
    id: "ORD-004",
    customer: "Alice Brown",
    email: "alice@example.com",
    product: "Corporate Template",
    date: "2023-03-04",
    amount: "$249",
    status: "Pending",
  },
  {
    id: "ORD-005",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    product: "Landing Page",
    date: "2023-03-05",
    amount: "$79",
    status: "Completed",
  },
  {
    id: "ORD-006",
    customer: "Diana Miller",
    email: "diana@example.com",
    product: "E-commerce Template",
    date: "2023-03-06",
    amount: "$199",
    status: "Refunded",
  },
  {
    id: "ORD-007",
    customer: "Edward Davis",
    email: "edward@example.com",
    product: "Portfolio Template",
    date: "2023-03-07",
    amount: "$149",
    status: "Completed",
  },
  {
    id: "ORD-008",
    customer: "Fiona Clark",
    email: "fiona@example.com",
    product: "Blog Template",
    date: "2023-03-08",
    amount: "$99",
    status: "Processing",
  },
  {
    id: "ORD-009",
    customer: "George White",
    email: "george@example.com",
    product: "Corporate Template",
    date: "2023-03-09",
    amount: "$249",
    status: "Pending",
  },
  {
    id: "ORD-010",
    customer: "Hannah Green",
    email: "hannah@example.com",
    product: "Landing Page",
    date: "2023-03-10",
    amount: "$79",
    status: "Completed",
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
        <div className="w-full">
          <h1 className="text-lg font-semibold">Orders</h1>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Manage Orders</h2>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Orders
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>View and manage all customer orders.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-sm">
                    <th className="text-left font-medium p-2">Order ID</th>
                    <th className="text-left font-medium p-2">Customer</th>
                    <th className="text-left font-medium p-2">Email</th>
                    <th className="text-left font-medium p-2">Product</th>
                    <th className="text-left font-medium p-2">Date</th>
                    <th className="text-left font-medium p-2">Amount</th>
                    <th className="text-left font-medium p-2">Status</th>
                    <th className="text-left font-medium p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b hover:bg-muted/50"
                    >
                      <td className="p-2">{order.id}</td>
                      <td className="p-2">{order.customer}</td>
                      <td className="p-2">{order.email}</td>
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
                                : order.status === "Pending"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No orders found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

