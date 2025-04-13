
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { orders } from "@/data/orders";
import { products } from "@/data/products";

const AdminDashboardPage = () => {
  // Sales data for chart
  const monthlySales = [
    { name: "Jan", sales: 15000 },
    { name: "Feb", sales: 18000 },
    { name: "Mar", sales: 22000 },
    { name: "Apr", sales: 21000 },
    { name: "May", sales: 25000 },
    { name: "Jun", sales: 28000 },
    { name: "Jul", sales: 30000 },
    { name: "Aug", sales: 29000 },
    { name: "Sep", sales: 32000 },
    { name: "Oct", sales: 35000 },
    { name: "Nov", sales: 40000 },
    { name: "Dec", sales: 45000 }
  ];

  // Product category distribution
  const categoryData = [
    { name: "Ready-to-Wear", value: products.filter(p => p.type === "ready-to-wear").length },
    { name: "Unstitched", value: products.filter(p => p.type === "unstitched").length }
  ];

  // Order status distribution
  const orderStatusData = [
    { name: "Pending", value: orders.filter(o => o.status === "pending").length },
    { name: "Processing", value: orders.filter(o => o.status === "processing").length },
    { name: "Shipped", value: orders.filter(o => o.status === "shipped").length },
    { name: "Delivered", value: orders.filter(o => o.status === "delivered").length }
  ];

  const COLORS = ["#8B5CF6", "#D946EF", "#ec4899", "#F97316"];

  const [timeRange, setTimeRange] = useState("monthly");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant={timeRange === "weekly" ? "default" : "outline"} 
            onClick={() => setTimeRange("weekly")}
            size="sm"
          >
            Weekly
          </Button>
          <Button 
            variant={timeRange === "monthly" ? "default" : "outline"}
            onClick={() => setTimeRange("monthly")}
            size="sm"
          >
            Monthly
          </Button>
          <Button 
            variant={timeRange === "yearly" ? "default" : "outline"}
            onClick={() => setTimeRange("yearly")}
            size="sm"
          >
            Yearly
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">Rs. 340,500</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-600">+12% from last month</CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Orders</CardDescription>
            <CardTitle className="text-3xl">{orders.length}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-green-600">+5% from last month</CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Products</CardDescription>
            <CardTitle className="text-3xl">{products.length}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <span className="text-gray-500">In stock: {products.filter(p => p.inStock).length}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Orders</CardDescription>
            <CardTitle className="text-3xl">{orders.filter(o => o.status === "pending").length}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-yellow-600">Needs attention</CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `Rs. ${value}`} />
                <Bar dataKey="sales" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Product Category Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Product Types</CardTitle>
              <CardDescription>Distribution by type</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Order Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Current status distribution</CardDescription>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Order ID</th>
                  <th className="text-left p-3 font-medium">Customer</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-3 text-sm">{order.id}</td>
                    <td className="p-3 text-sm">{order.customerName}</td>
                    <td className="p-3 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 text-sm">Rs. {order.totalAmount.toLocaleString()}</td>
                    <td className="p-3 text-sm">
                      <Badge className={
                        order.status === "delivered" ? "bg-green-500" :
                        order.status === "shipped" ? "bg-blue-500" :
                        order.status === "processing" ? "bg-yellow-500" :
                        "bg-gray-500"
                      }>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
