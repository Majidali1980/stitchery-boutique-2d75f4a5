
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download,
  Package,
  PackageCheck,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import OrderFilters from "@/components/admin/orders/OrderFilters";
import OrdersTable from "@/components/admin/orders/OrdersTable";
import OrderDetailDialog from "@/components/admin/orders/OrderDetailDialog";
import { filterOrders, sortOrders } from "@/components/admin/orders/utils/orderHelpers";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
type SortField = "id" | "customerName" | "orderDate" | "total" | "status";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [sortField, setSortField] = useState<SortField>("orderDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const { toast } = useToast();
  
  // Listen for order confirmations
  useEffect(() => {
    const receiveOrder = (event: MessageEvent) => {
      try {
        if (event.data && typeof event.data === 'string' && event.data.startsWith('NEW_ORDER:')) {
          const orderData = JSON.parse(event.data.replace('NEW_ORDER:', ''));
          addNewOrder(orderData);
          
          toast({
            title: "New Order Received",
            description: `Order #${orderData.id} has been placed by ${orderData.customerName}`,
            duration: 5000,
          });
          
          // Send email notification
          sendEmailNotification(orderData);
        }
      } catch (error) {
        console.error("Error processing order message:", error);
      }
    };
    
    window.addEventListener('message', receiveOrder);
    
    // Check for stored orders in localStorage on component mount
    const storedOrders = localStorage.getItem('adminOrders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error("Error loading stored orders:", error);
      }
    }
    
    return () => {
      window.removeEventListener('message', receiveOrder);
    };
  }, [toast]);
  
  // Add a new order to the admin panel
  const addNewOrder = (orderData: any) => {
    setOrders(prevOrders => {
      const newOrders = [orderData, ...prevOrders];
      // Store updated orders in localStorage
      localStorage.setItem('adminOrders', JSON.stringify(newOrders));
      return newOrders;
    });
  };
  
  // Send email notification (mock implementation)
  const sendEmailNotification = (orderData: any) => {
    console.log(`Email notification sent to alimajid03021980@gmail.com for order ${orderData.id}`);
    
    // In a real app, this would be a backend API call to send an email
    toast({
      title: "Email Notification Sent",
      description: `Notification sent to alimajid03021980@gmail.com for order #${orderData.id}`,
      duration: 3000,
    });
  };
  
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
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
  
  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      );
      // Update localStorage with the new orders state
      localStorage.setItem('adminOrders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    
    toast({
      title: "Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  // Filter and sort orders
  const filteredOrders = sortOrders(
    filterOrders(orders, searchTerm, statusFilter),
    sortField,
    sortDirection
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Order Management</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                View and manage your customer orders
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <PackageCheck className="h-8 w-8 text-brand-gold" />
              <div>
                <p className="text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <OrderFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          
          <OrdersTable 
            orders={filteredOrders}
            sortField={sortField}
            sortDirection={sortDirection}
            handleSort={handleSort}
            handleViewOrder={handleViewOrder}
          />
        </CardContent>
      </Card>
      
      <OrderDetailDialog
        selectedOrder={selectedOrder}
        handleCloseDialog={handleCloseDialog}
        handleUpdateStatus={handleUpdateStatus}
        sendEmailNotification={sendEmailNotification}
      />
    </div>
  );
};

export default AdminOrdersPage;
