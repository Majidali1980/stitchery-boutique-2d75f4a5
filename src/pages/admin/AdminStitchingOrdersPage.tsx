
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
import { Search, Eye, CheckCircle, XCircle, Scissors } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock stitching orders data
const stitchingOrders = [
  {
    id: "stitch-001",
    customerId: "cust-001",
    customerName: "Fatima Ahmed",
    customerEmail: "fatima@example.com",
    garmentType: "shirt",
    serviceType: "standard",
    measurements: {
      chest: 38,
      length: 42,
      shoulder: 18,
      sleeve: 24,
      collar: 16,
      daman: 22
    },
    fabric: null,
    designImage: "/lovable-uploads/d88e53ea-f8d9-4ca8-8c5c-75267b8ec30b.png",
    notes: "Please add lace work on the collar and cuffs",
    price: 1500,
    status: "completed",
    createdAt: "2025-04-02T14:30:00Z",
    updatedAt: "2025-04-09T11:20:00Z"
  },
  {
    id: "stitch-002",
    customerId: "cust-002",
    customerName: "Ayesha Khan",
    customerEmail: "ayesha@example.com",
    garmentType: "complete-suit",
    serviceType: "premium",
    measurements: {
      chest: 36,
      length: 40,
      shoulder: 16,
      sleeve: 22,
      waist: 32,
      hip: 40,
      shalwarLength: 38,
      bottomWidth: 16
    },
    fabric: "Blue Printed Unstitched Suit",
    fabricId: "3",
    designImage: null,
    notes: "Add embroidery on neckline and dupatta borders",
    price: 3500,
    status: "in-progress",
    createdAt: "2025-04-05T09:15:00Z",
    updatedAt: "2025-04-06T11:20:00Z"
  },
  {
    id: "stitch-003",
    customerId: "cust-003",
    customerName: "Zainab Hassan",
    customerEmail: "zainab@example.com",
    garmentType: "pajama",
    serviceType: "standard",
    measurements: {
      waist: 30,
      hip: 38,
      length: 36,
      bottomWidth: 14
    },
    fabric: null,
    designImage: "/lovable-uploads/5898bf2b-6ef8-4b58-a218-35abc28bf4b7.png",
    notes: "Simple straight pajama with elastic waistband",
    price: 800,
    status: "pending",
    createdAt: "2025-04-10T14:20:00Z",
    updatedAt: "2025-04-10T14:20:00Z"
  }
];

const AdminStitchingOrdersPage = () => {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  
  // Filter orders based on status and search term
  const filteredOrders = stitchingOrders.filter((order) => {
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
    all: stitchingOrders.length,
    pending: stitchingOrders.filter(o => o.status === "pending").length,
    "in-progress": stitchingOrders.filter(o => o.status === "in-progress").length,
    completed: stitchingOrders.filter(o => o.status === "completed").length,
    cancelled: stitchingOrders.filter(o => o.status === "cancelled").length
  };
  
  // Update order status (in a real app, this would call an API)
  const updateOrderStatus = (orderId: string, newStatus: "pending" | "in-progress" | "completed" | "cancelled") => {
    console.log(`Updating stitching order ${orderId} to ${newStatus}`);
    toast({
      title: "Status Updated",
      description: `Order status changed to ${newStatus}`,
    });
    // In a real app, this would update the order in the database
  };
  
  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setOrderDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Custom Stitching Orders</h1>
      
      {/* Order Status Tabs */}
      <Tabs defaultValue="all" onValueChange={(value) => setFilterStatus(value === "all" ? null : value)}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">
            All ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({statusCounts.pending})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({statusCounts["in-progress"]})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({statusCounts.completed})
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
                      <th className="text-left p-4 font-medium">Garment</th>
                      <th className="text-left p-4 font-medium">Service</th>
                      <th className="text-left p-4 font-medium">Price</th>
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
                          <td className="p-4 capitalize">{order.garmentType.replace('-', ' ')}</td>
                          <td className="p-4 capitalize">{order.serviceType}</td>
                          <td className="p-4 font-medium">Rs. {order.price.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge
                              className={
                                order.status === "completed" ? "bg-green-500" :
                                order.status === "in-progress" ? "bg-blue-500" :
                                order.status === "cancelled" ? "bg-red-500" :
                                "bg-gray-500"
                              }
                            >
                              {order.status.replace('-', ' ')}
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
                                    value as "pending" | "in-progress" | "completed" | "cancelled"
                                  )
                                }
                                defaultValue={order.status}
                              >
                                <SelectTrigger className="w-[120px] h-8">
                                  <SelectValue placeholder="Update" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="in-progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="p-4 text-center text-gray-500">
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
        
        {/* Repeat similar content for other status tabs */}
      </Tabs>
      
      {/* Order Details Dialog */}
      <Dialog open={orderDialogOpen} onOpenChange={setOrderDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Stitching Order Details</DialogTitle>
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
                      selectedOrder.status === "completed" ? "bg-green-500" :
                      selectedOrder.status === "in-progress" ? "bg-blue-500" :
                      selectedOrder.status === "cancelled" ? "bg-red-500" :
                      "bg-gray-500"
                    }
                  >
                    {selectedOrder.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-500">Order Details</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-y-2">
                      <div className="text-sm text-gray-500">Garment Type:</div>
                      <div className="text-sm font-medium capitalize">{selectedOrder.garmentType.replace('-', ' ')}</div>
                      
                      <div className="text-sm text-gray-500">Service Type:</div>
                      <div className="text-sm font-medium capitalize">{selectedOrder.serviceType}</div>
                      
                      {selectedOrder.fabric && (
                        <>
                          <div className="text-sm text-gray-500">Fabric:</div>
                          <div className="text-sm font-medium">{selectedOrder.fabric}</div>
                        </>
                      )}
                      
                      <div className="text-sm text-gray-500">Price:</div>
                      <div className="text-sm font-medium">Rs. {selectedOrder.price.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  {selectedOrder.notes && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-500">Customer Notes</h4>
                      <p className="text-sm mt-1 bg-gray-50 p-3 rounded-lg border">
                        {selectedOrder.notes}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-500">Measurements</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-y-2">
                      {Object.entries(selectedOrder.measurements).map(([key, value]) => (
                        <React.Fragment key={key}>
                          <div className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</div>
                          <div className="text-sm font-medium">{value} inches</div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  
                  {selectedOrder.designImage && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-500">Design Reference</h4>
                      <div className="mt-2 h-40 w-full border rounded-lg overflow-hidden">
                        <img 
                          src={selectedOrder.designImage} 
                          alt="Design Reference" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t pt-4 flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => console.log("Print order")}
                >
                  Print Order Details
                </Button>
                
                <Select
                  onValueChange={(value) => 
                    updateOrderStatus(
                      selectedOrder.id, 
                      value as "pending" | "in-progress" | "completed" | "cancelled"
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
                        <Scissors className="h-4 w-4 mr-2" />
                        Pending
                      </div>
                    </SelectItem>
                    <SelectItem value="in-progress">
                      <div className="flex items-center">
                        <Scissors className="h-4 w-4 mr-2" />
                        In Progress
                      </div>
                    </SelectItem>
                    <SelectItem value="completed">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
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

export default AdminStitchingOrdersPage;
