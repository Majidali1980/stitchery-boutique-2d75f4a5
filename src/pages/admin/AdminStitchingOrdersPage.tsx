import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomStitchingOrder } from "@/types/stitching";
import { 
  ArrowUpDown, 
  Calendar, 
  Download, 
  Eye, 
  Filter, 
  Search,
  X 
} from "lucide-react";

// Sample data
const mockOrders: CustomStitchingOrder[] = [
  {
    id: "STI-1001",
    customerId: "CUST-1234",
    customerName: "Ahmed Khan",
    customerPhone: "+92 300 1234567",
    customerEmail: "ahmed@example.com",
    garmentType: "complete-suit",
    serviceType: "premium",
    status: "processing",
    price: 9500,
    createdAt: "2023-05-15",
    measurements: { 
      chest: 42, 
      waist: 36, 
      shoulders: 18, 
      armLength: 25,
      neckSize: 16,
      length: 30
    },
    fabric: "Premium Cotton",
    designImage: "https://example.com/design1.jpg",
    notes: "Please use golden buttons for the shirt",
    estimatedDelivery: "2023-05-30"
  },
  {
    id: "STI-1002",
    customerId: "CUST-5678",
    customerName: "Muhammad Ali",
    customerPhone: "+92 333 9876543",
    customerEmail: "mali@example.com",
    garmentType: "shirt",
    serviceType: "standard",
    status: "completed",
    price: 3500,
    createdAt: "2023-05-10",
    measurements: { 
      chest: 40, 
      shoulders: 17, 
      armLength: 24,
      neckSize: 15,
      length: 28 
    },
    fabric: "Linen",
    estimatedDelivery: "2023-05-20",
    completedAt: "2023-05-19"
  },
  {
    id: "STI-1003",
    customerId: "CUST-9012",
    customerName: "Fatima Zaidi",
    customerPhone: "+92 321 1122334",
    customerEmail: "fatima@example.com",
    garmentType: "shalwar",
    serviceType: "custom",
    status: "pending",
    price: 2500,
    createdAt: "2023-05-18",
    measurements: { 
      waist: 32, 
      length: 38,
      ankleWidth: 14
    },
    fabric: "Cotton Blend",
    notes: "Need it urgently",
    estimatedDelivery: "2023-05-28"
  },
  {
    id: "STI-1004",
    customerId: "CUST-3456",
    customerName: "Hassan Ahmed",
    customerPhone: "+92 345 5667788",
    customerEmail: "hassan@example.com",
    garmentType: "complete-suit",
    serviceType: "premium",
    status: "ready",
    price: 12000,
    createdAt: "2023-05-05",
    measurements: { 
      chest: 44, 
      waist: 38, 
      shoulders: 19, 
      armLength: 26,
      neckSize: 17,
      length: 32 
    },
    fabric: "Premium Wool Blend",
    estimatedDelivery: "2023-05-25"
  },
  {
    id: "STI-1005",
    customerId: "CUST-7890",
    customerName: "Zainab Khan",
    customerPhone: "+92 312 9998887",
    customerEmail: "zainab@example.com",
    garmentType: "pajama",
    serviceType: "standard",
    status: "processing",
    price: 2000,
    createdAt: "2023-05-16",
    measurements: { 
      waist: 30, 
      length: 36,
      ankleWidth: 12
    },
    fabric: "Soft Cotton",
    estimatedDelivery: "2023-05-26"
  }
];

// Fixed type definitions
type OrderStatus = "pending" | "processing" | "ready" | "completed" | "cancelled";
type SortField = "id" | "customerName" | "createdAt" | "price" | "status";

const AdminStitchingOrdersPage = () => {
  const [orders, setOrders] = useState<CustomStitchingOrder[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [garmentFilter, setGarmentFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedOrder, setSelectedOrder] = useState<CustomStitchingOrder | null>(null);
  const [viewMode, setViewMode] = useState<"details" | "measurements">("details");
  
  const handleViewOrder = (order: CustomStitchingOrder) => {
    setSelectedOrder(order);
    setViewMode("details");
  };
  
  const handleCloseDialog = () => {
    setSelectedOrder(null);
  };
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };
  
  const filteredOrders = orders
    .filter(order => 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(order => statusFilter === "all" || order.status === statusFilter)
    .filter(order => garmentFilter === "all" || order.garmentType === garmentFilter)
    .sort((a, b) => {
      if (sortField === "createdAt") {
        const dateA = new Date(a[sortField]).getTime();
        const dateB = new Date(b[sortField]).getTime();
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      }
      
      if (sortField === "price") {
        return sortDirection === "asc" 
          ? a[sortField] - b[sortField] 
          : b[sortField] - a[sortField];
      }
      
      const valueA = String(a[sortField]).toLowerCase();
      const valueB = String(b[sortField]).toLowerCase();
      return sortDirection === "asc" 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "processing":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case "ready":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Ready</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const renderMeasurementDetails = (measurements: Record<string, number>) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(measurements).map(([key, value]) => (
          <div key={key}>
            <Label className="text-muted-foreground capitalize">{key}</Label>
            <div className="font-medium">{value} inches</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Custom Stitching Orders</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Stitching Orders</CardTitle>
          <CardDescription>
            View and manage all custom stitching orders
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID or customer name"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select 
                  value={statusFilter} 
                  onValueChange={(value) => setStatusFilter(value as OrderStatus | "all")}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select 
                  value={garmentFilter} 
                  onValueChange={setGarmentFilter}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="shirt">Shirt</SelectItem>
                    <SelectItem value="shalwar">Shalwar</SelectItem>
                    <SelectItem value="pajama">Pajama</SelectItem>
                    <SelectItem value="complete-suit">Complete Suit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setGarmentFilter("all");
              }}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("id")}
                    >
                      ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("customerName")}
                    >
                      Customer
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("createdAt")}
                    >
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("price")}
                    >
                      Price
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div 
                      className="flex items-center cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      Status
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>{order.customerName}</div>
                        <div className="text-sm text-muted-foreground">{order.customerPhone}</div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {order.garmentType.replace(/-/g, ' ')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {formatDate(order.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>Rs. {order.price.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No orders found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Created on {formatDate(selectedOrder.createdAt)}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "details" | "measurements")}>
              <TabsList className="mb-4">
                <TabsTrigger value="details">Order Details</TabsTrigger>
                <TabsTrigger value="measurements">Measurements</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Customer Information</h3>
                      <div className="text-sm text-muted-foreground">
                        <p>{selectedOrder.customerName}</p>
                        <p>{selectedOrder.customerPhone}</p>
                        <p>{selectedOrder.customerEmail}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Order Details</h3>
                      <div className="text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Service Type:</span>
                          <span className="capitalize">{selectedOrder.serviceType}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Garment Type:</span>
                          <span className="capitalize">{selectedOrder.garmentType.replace(/-/g, ' ')}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Fabric:</span>
                          <span>{selectedOrder.fabric || 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Status:</span>
                          <span>{getStatusBadge(selectedOrder.status)}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Price:</span>
                          <span>Rs. {selectedOrder.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Created Date:</span>
                          <span>{formatDate(selectedOrder.createdAt)}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Estimated Delivery:</span>
                          <span>{formatDate(selectedOrder.estimatedDelivery)}</span>
                        </div>
                        {selectedOrder.completedAt && (
                          <div className="flex justify-between py-1">
                            <span className="text-muted-foreground">Completed Date:</span>
                            <span>{formatDate(selectedOrder.completedAt)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {selectedOrder.notes && (
                      <div>
                        <h3 className="text-lg font-medium">Notes</h3>
                        <p className="text-sm">{selectedOrder.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {selectedOrder.designImage && (
                      <div>
                        <h3 className="text-lg font-medium">Design Reference</h3>
                        <div className="mt-2 border rounded-md overflow-hidden">
                          <img 
                            src={selectedOrder.designImage} 
                            alt="Design Reference" 
                            className="w-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-lg font-medium">Status Update</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Select defaultValue={selectedOrder.status}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="ready">Ready</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button>Update</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="measurements">
                <h3 className="text-lg font-medium mb-4">
                  Measurements for {selectedOrder.garmentType.replace(/-/g, ' ')}
                </h3>
                {renderMeasurementDetails(selectedOrder.measurements)}
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleCloseDialog}>
                Close
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Print Details
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminStitchingOrdersPage;
