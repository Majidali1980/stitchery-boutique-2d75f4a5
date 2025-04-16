
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { OrderData } from "@/components/admin/orders/utils/orderHelpers";
import { products } from "@/data/products";

const AdminDashboardPage = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [timeRange, setTimeRange] = useState("monthly");
  const [monthlySales, setMonthlySales] = useState<{ name: string; sales: number }[]>([]);
  
  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = localStorage.getItem('adminOrders');
    if (storedOrders) {
      try {
        const parsedOrders = JSON.parse(storedOrders);
        setOrders(parsedOrders);
        
        // Calculate monthly sales data
        const monthlyData = generateMonthlySalesData(parsedOrders);
        setMonthlySales(monthlyData);
      } catch (error) {
        console.error("Error loading stored orders:", error);
      }
    }
  }, []);

  // Generate monthly sales data from orders
  const generateMonthlySalesData = (orders: OrderData[]) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const salesByMonth: Record<string, number> = {};
    
    // Initialize all months with 0
    months.forEach(month => {
      salesByMonth[month] = 0;
    });
    
    // Sum sales by month
    orders.forEach(order => {
      const orderDate = new Date(order.orderDate);
      const monthName = months[orderDate.getMonth()];
      salesByMonth[monthName] += order.total;
    });
    
    // Convert to array format for chart
    return months.map(month => ({
      name: month,
      sales: salesByMonth[month]
    }));
  };

  // Calculate total revenue from orders
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  
  // Calculate revenue change percentage (mock data for now)
  const revenueChangePercent = orders.length > 0 ? 12 : 0;
  
  // Calculate order change percentage (mock data for now)
  const orderChangePercent = orders.length > 0 ? 5 : 0;

  // Product category distribution
  const categoryData = [
    { name: "Ready-to-Wear", value: products.filter(p => p.type === "ready-to-wear").length },
    { name: "Unstitched", value: products.filter(p => p.type === "unstitched").length }
  ];

  // Order status distribution
  const orderStatusData = [
    { name: "Pending", value: orders.filter(o => o.status === "pending").length || 0 },
    { name: "Processing", value: orders.filter(o => o.status === "processing").length || 0 },
    { name: "Shipped", value: orders.filter(o => o.status === "shipped").length || 0 },
    { name: "Delivered", value: orders.filter(o => o.status === "delivered").length || 0 }
  ].filter(item => item.value > 0);

  const COLORS = ["#8B5CF6", "#D946EF", "#ec4899", "#F97316"];

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
            <CardTitle className="text-3xl">Rs. {totalRevenue.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent className={`text-sm ${revenueChangePercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {revenueChangePercent > 0 ? '+' : ''}{revenueChangePercent}% from last month
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Orders</CardDescription>
            <CardTitle className="text-3xl">{orders.length}</CardTitle>
          </CardHeader>
          <CardContent className={`text-sm ${orderChangePercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {orderChangePercent > 0 ? '+' : ''}{orderChangePercent}% from last month
          </CardContent>
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
                    data={orderStatusData.length > 0 ? orderStatusData : [{ name: "No Orders", value: 1 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {(orderStatusData.length > 0 ? orderStatusData : [{ name: "No Orders", value: 1 }]).map((entry, index) => (
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
            <Button variant="outline" size="sm">
              <Link to="/admin/orders">View All</Link>
            </Button>
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
                {orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="p-3 text-sm">{order.id}</td>
                      <td className="p-3 text-sm">{order.customerName}</td>
                      <td className="p-3 text-sm">{new Date(order.orderDate).toLocaleDateString()}</td>
                      <td className="p-3 text-sm">Rs. {order.total.toLocaleString()}</td>
                      <td className="p-3 text-sm">
                        <Badge className={
                          order.status === "delivered" ? "bg-green-100 text-green-800 border-green-200" :
                          order.status === "shipped" ? "bg-blue-100 text-blue-800 border-blue-200" :
                          order.status === "processing" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                          "bg-gray-100 text-gray-800 border-gray-200"
                        }>
                          {order.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      No orders received yet. New orders will appear here automatically.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;
