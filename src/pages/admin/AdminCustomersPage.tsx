
import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User, Users } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Extract customer data from orders in localStorage
    const storedOrders = localStorage.getItem('adminOrders');
    if (storedOrders) {
      try {
        const orders = JSON.parse(storedOrders);
        
        // Group orders by customer
        const customerMap = new Map<string, {
          id: string;
          name: string;
          email: string;
          phone: string;
          orders: any[];
        }>();
        
        orders.forEach((order: any) => {
          if (order.customerEmail) {
            if (!customerMap.has(order.customerEmail)) {
              customerMap.set(order.customerEmail, {
                id: `CUST-${Math.floor(100000 + Math.random() * 900000)}`,
                name: order.customerName,
                email: order.customerEmail,
                phone: order.customerPhone || "",
                orders: [order]
              });
            } else {
              const customer = customerMap.get(order.customerEmail);
              if (customer) {
                customer.orders.push(order);
              }
            }
          }
        });
        
        // Convert map to array and calculate metrics
        const customerArray = Array.from(customerMap.values()).map(customer => {
          const totalSpent = customer.orders.reduce((sum, order) => sum + order.total, 0);
          const orderDates = customer.orders.map(order => new Date(order.orderDate).getTime());
          const lastOrderDate = new Date(Math.max(...orderDates)).toISOString();
          
          return {
            id: customer.id,
            name: customer.name,
            email: customer.email,
            phone: customer.phone,
            orderCount: customer.orders.length,
            totalSpent,
            lastOrderDate
          };
        });
        
        setCustomers(customerArray);
      } catch (error) {
        console.error("Error processing customer data:", error);
      }
    }
  }, []);
  
  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <div className="bg-gray-100 p-2 rounded-md flex items-center gap-2">
          <Users className="text-brand-gold h-5 w-5" />
          <span className="font-medium">{customers.length} Customers</span>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            View and manage your customer base
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="bg-gray-100 p-2 rounded-full">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-500">{customer.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{customer.email}</div>
                          <div className="text-gray-500">{customer.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                          {customer.orderCount} {customer.orderCount === 1 ? 'order' : 'orders'}
                        </Badge>
                      </TableCell>
                      <TableCell>Rs. {customer.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>{getFormattedDate(customer.lastOrderDate)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      No customers found. As orders come in, customer information will appear here.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomersPage;
