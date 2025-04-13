
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orders } from "@/data/orders";
import { Order } from "@/types";
import { Search, ChevronDown, Eye, XCircle, CheckCircle, Truck, Package } from "lucide-react";

const AdminOrdersPage = () => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  
  // Filter orders based on status and search term
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = !filterStatus || order.status === filterStatus;
    const matchesSearch = 
      !searchTerm || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  // Count orders by status
  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length
  };
  
  // Update order status (in a real app, this would call an API)
  const updateOrderStatus = (orderId: string, newStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled") => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    // In a real app, this would update the order in the database
    // and then refresh the orders list
  };
  
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setOrderDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders Management</h1>
      
      {/* Order Status Tabs */}
      <Tabs defaultValue="all" onValueChange={(value) => setFilterStatus(value === "all" ? null : value)}>
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="all">
            All ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({statusCounts.pending})
          </TabsTrigger>
          <TabsTrigger value="processing">
            Processing ({statusCounts.processing})
          </TabsTrigger>
          <TabsTrigger value="shipped">
            Shipped ({statusCounts.shipped})
          </TabsTrigger>
          <TabsTrigger value="delivered">
            Delivered ({statusCounts.delivered})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({statusCounts.cancelled})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-medium">Order ID</th>
                      <th className="text-left p-4 font-medium">Customer</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-left p-4 font-medium">Items</th>
                      <th className="text-left p-4 font-medium">Total</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">{order.id}</td>
                          <td className="p-4">
                            <div>{order.customerName}</div>
                            <div className="text-xs text-gray-500">{order.customerEmail}</div>
                          </td>
                          <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                          <td className="p-4">{order.items.length}</td>
                          <td className="p-4 font-medium">Rs. {order.totalAmount.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge
                              className={
                                order.status === "delivered" ? "bg-green-500" :
                                order.status === "shipped" ? "bg-blue-500" :
                                order.status === "processing" ? "bg-yellow-500" :
                                order.status === "cancelled" ? "bg-red-500" :
                                "bg-gray-500"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => viewOrderDetails(order)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              
                              <Select
                                onValueChange={(value) => 
                                  updateOrderStatus(
                                    order.id, 
                                    value as "pending" | "processing" | "shipped" | "delivered" | "cancelled"
                                  )
                                }
                                defaultValue={order.status}
                              >
                                <SelectTrigger className="w-[120px] h-8">
                                  <SelectValue placeholder="Update" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="processing">Processing</SelectItem>
                                  <SelectItem value="shipped">Shipped</SelectItem>
                                  <SelectItem value="delivered">Delivered</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-4 text-center text-gray-500">
                          No orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* The same content structure is repeated for each tab, but with filtered data */}
        {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-4 font-medium">Order ID</th>
                        <th className="text-left p-4 font-medium">Customer</th>
                        <th className="text-left p-4 font-medium">Date</th>
                        <th className="text-left p-4 font-medium">Items</th>
                        <th className="text-left p-4 font-medium">Total</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">{order.id}</td>
                            <td className="p-4">
                              <div>{order.customerName}</div>
                              <div className="text-xs text-gray-500">{order.customerEmail}</div>
                            </td>
                            <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td className="p-4">{order.items.length}</td>
                            <td className="p-4 font-medium">Rs. {order.totalAmount.toLocaleString()}</td>
                            <td className="p-4">
                              <Badge
                                className={
                                  order.status === "delivered" ? "bg-green-500" :
                                  order.status === "shipped" ? "bg-blue-500" :
                                  order.status === "processing" ? "bg-yellow-500" :
                                  order.status === "cancelled" ? "bg-red-500" :
                                  "bg-gray-500"
                                }
                              >
                                {order.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => viewOrderDetails(order)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                
                                <Select
                                  onValueChange={(value) => 
                                    updateOrderStatus(
                                      order.id, 
                                      value as "pending" | "processing" | "shipped" | "delivered" | "cancelled"
                                    )
                                  }
                                  defaultValue={order.status}
                                >
                                  <SelectTrigger className="w-[120px] h-8">
                                    <SelectValue placeholder="Update" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-4 text-center text-gray-500">
                            No orders found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Order Details Dialog */}
      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order ID: {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Customer Information</h4>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                  <p>{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Order Date</h4>
                  <p>{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Status</h4>
                  <Badge
                    className={
                      selectedOrder.status === "delivered" ? "bg-green-500" :
                      selectedOrder.status === "shipped" ? "bg-blue-500" :
                      selectedOrder.status === "processing" ? "bg-yellow-500" :
                      selectedOrder.status === "cancelled" ? "bg-red-500" :
                      "bg-gray-500"
                    }
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-2">Shipping Address</h4>
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                </p>
                <p>{selectedOrder.shippingAddress.country}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-gray-500 mb-2">Order Items</h4>
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-3 font-medium">Item</th>
                        <th className="text-left p-3 font-medium">Quantity</th>
                        <th className="text-right p-3 font-medium">Price</th>
                        <th className="text-right p-3 font-medium">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-3">{item.productName}</td>
                          <td className="p-3">{item.quantity}</td>
                          <td className="p-3 text-right">Rs. {item.price.toLocaleString()}</td>
                          <td className="p-3 text-right">Rs. {(item.quantity * item.price).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="p-3 text-right font-medium">Total:</td>
                        <td className="p-3 text-right font-medium">Rs. {selectedOrder.totalAmount.toLocaleString()}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="border-t pt-4 flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => console.log("Print order")}
                >
                  Print Order
                </Button>
                
                <Select
                  onValueChange={(value) => 
                    updateOrderStatus(
                      selectedOrder.id, 
                      value as "pending" | "processing" | "shipped" | "delivered" | "cancelled"
                    )
                  }
                  defaultValue={selectedOrder.status}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        Pending
                      </div>
                    </SelectItem>
                    <SelectItem value="processing">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Processing
                      </div>
                    </SelectItem>
                    <SelectItem value="shipped">
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Shipped
                      </div>
                    </SelectItem>
                    <SelectItem value="delivered">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Delivered
                      </div>
                    </SelectItem>
                    <SelectItem value="cancelled">
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 mr-2" />
                        Cancelled
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrdersPage;
