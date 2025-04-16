
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Calendar, Eye } from "lucide-react";
import { getFormattedDate } from "./utils/orderHelpers";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
type SortField = "id" | "customerName" | "orderDate" | "total" | "status";

interface OrdersTableProps {
  orders: any[];
  sortField: SortField;
  sortDirection: "asc" | "desc";
  handleSort: (field: SortField) => void;
  handleViewOrder: (order: any) => void;
}

const OrdersTable = ({ 
  orders, 
  sortField, 
  sortDirection, 
  handleSort, 
  handleViewOrder 
}: OrdersTableProps) => {
  
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("id")}
              >
                Order ID
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === 'id' ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("customerName")}
              >
                Customer
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === 'customerName' ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("orderDate")}
              >
                Date
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === 'orderDate' ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("total")}
              >
                Total
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === 'total' ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
            </TableHead>
            <TableHead>
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status
                <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === 'status' ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>{order.customerName}</div>
                  <div className="text-sm text-muted-foreground">{order.customerPhone}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    {getFormattedDate(order.orderDate)}
                  </div>
                </TableCell>
                <TableCell>Rs. {order.total.toLocaleString()}</TableCell>
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
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No orders received yet. New orders will appear here automatically.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
