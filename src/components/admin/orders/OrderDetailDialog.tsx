
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Download, Mail, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderDetailDialogProps {
  selectedOrder: any | null;
  handleCloseDialog: () => void;
  handleUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
  sendEmailNotification: (order: any) => void;
}

const OrderDetailDialog = ({
  selectedOrder,
  handleCloseDialog,
  handleUpdateStatus,
  sendEmailNotification
}: OrderDetailDialogProps) => {
  if (!selectedOrder) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "processing":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case "shipped":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">Shipped</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleStatusUpdate = (value: string) => {
    handleUpdateStatus(selectedOrder.id, value as OrderStatus);
    toast({
      title: "Status Updated",
      description: `Order ${selectedOrder.id} status changed to ${value}`,
      duration: 3000,
    });
  };

  return (
    <Dialog open={!!selectedOrder} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order {selectedOrder.id}</DialogTitle>
          <DialogDescription>
            Created on {formatDate(selectedOrder.orderDate)}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="items">Order Items</TabsTrigger>
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
                  <h3 className="text-lg font-medium">Shipping Address</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>{selectedOrder.shippingAddress}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <Mail className="h-4 w-4 text-brand-gold" />
                  <span className="text-sm">Notifications sent to: alimajid03021980@gmail.com</span>
                </div>
                
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="h-4 w-4 text-brand-gold" />
                  <span className="text-sm">Expected delivery: 3-5 business days</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Order Summary</h3>
                  <div className="text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Order Total:</span>
                      <span>Rs. {selectedOrder.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Items:</span>
                      <span>{selectedOrder.items.length}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Status:</span>
                      <span>{getStatusBadge(selectedOrder.status)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Update Status</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Select 
                      defaultValue={selectedOrder.status}
                      onValueChange={handleStatusUpdate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
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
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="items">
            <div className="space-y-4">
              {selectedOrder.items.map((item: any, index: number) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                      {item.type === 'stitching' && item.designId && (
                        <p className="text-sm text-brand-gold font-medium mt-1">
                          Design #: {item.designId}
                        </p>
                      )}
                    </div>
                    <p className="font-medium">Rs. {item.price.toLocaleString()}</p>
                  </div>
                  
                  {item.measurements && Object.keys(item.measurements).length > 0 && (
                    <div className="mt-3 border-t pt-2">
                      <p className="text-sm font-medium mb-1">Measurements:</p>
                      <div className="grid grid-cols-2 text-sm">
                        {Object.entries(item.measurements).map(([key, value]: [string, any]) => (
                          <div key={key} className="py-1">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="ml-2">{value} inches</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {item.fabric && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Fabric: </span>
                      {item.fabric}
                    </div>
                  )}
                  
                  {item.selectedSize && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Size: </span>
                      {item.selectedSize}
                      {item.selectedColor && (
                        <span className="ml-3">
                          <span className="font-medium">Color: </span>
                          {item.selectedColor}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleCloseDialog}>
            Close
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Print Order
          </Button>
          <Button 
            variant="outline"
            onClick={() => sendEmailNotification(selectedOrder)}
          >
            <Mail className="mr-2 h-4 w-4" />
            Resend Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
