
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { getFormattedDate, OrderData } from "./utils/orderHelpers";
import { useState } from "react";
import { Mail, Send } from "lucide-react";

interface OrderDetailDialogProps {
  selectedOrder: OrderData | null;
  handleCloseDialog: () => void;
  handleUpdateStatus: (orderId: string, newStatus: string) => void;
  sendEmailNotification: (order: OrderData) => void;
}

const OrderDetailDialog = ({
  selectedOrder,
  handleCloseDialog,
  handleUpdateStatus,
  sendEmailNotification,
}: OrderDetailDialogProps) => {
  const [newStatus, setNewStatus] = useState<string>("");

  if (!selectedOrder) return null;

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const handleStatusChange = (value: string) => {
    setNewStatus(value);
  };

  const updateStatus = () => {
    if (newStatus && newStatus !== selectedOrder.status) {
      handleUpdateStatus(selectedOrder.id, newStatus);
      toast({
        title: "Status Updated",
        description: `Order status changed to ${newStatus}`,
      });
    }
  };

  const sendNotification = () => {
    sendEmailNotification(selectedOrder);
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

  return (
    <Dialog open={Boolean(selectedOrder)} onOpenChange={handleCloseDialog}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Order {selectedOrder.id}
          </DialogTitle>
          <DialogDescription>
            Placed on {getFormattedDate(selectedOrder.orderDate)}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Order Status */}
          <div className="space-y-2">
            <h3 className="font-semibold">Current Status</h3>
            {getStatusBadge(selectedOrder.status)}

            <div className="flex items-end gap-2 mt-4">
              <div className="space-y-1 flex-grow">
                <p className="text-sm">Update Status</p>
                <Select
                  value={newStatus || selectedOrder.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={updateStatus} disabled={!newStatus || newStatus === selectedOrder.status}>
                Update
              </Button>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="font-semibold mb-2">Customer Information</h3>
            <p>{selectedOrder.customerName}</p>
            <p>{selectedOrder.customerEmail}</p>
            {selectedOrder.customerPhone && (
              <p>{selectedOrder.customerPhone}</p>
            )}
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={sendNotification}
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p className="text-gray-700 dark:text-gray-300">{selectedOrder.shippingAddress}</p>
        </div>

        <Separator className="my-4" />

        {/* Order Items */}
        <h3 className="font-semibold mb-2">Order Items</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedOrder.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {item.name}
                  {item.type === 'stitching' && (
                    <span className="text-xs bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded ml-2">
                      Custom
                    </span>
                  )}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>Rs. {item.price.toLocaleString()}</TableCell>
                <TableCell>Rs. {(item.price * item.quantity).toLocaleString()}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-semibold">
                Total
              </TableCell>
              <TableCell className="font-semibold">
                Rs. {selectedOrder.total.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={handleCloseDialog}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
