
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
type SortField = "id" | "customerName" | "orderDate" | "total" | "status";

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  type: 'product' | 'stitching';
  designId?: string;
  measurements?: Record<string, number>;
  fabric?: string;
  designImage?: string | null;
  selectedSize?: string;
  selectedColor?: string;
}

export interface OrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: string;
  customerPhone?: string;
}

export const filterOrders = (
  orders: OrderData[],
  searchTerm: string,
  statusFilter: OrderStatus | "all"
) => {
  return orders
    .filter(order => 
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customerPhone && order.customerPhone?.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(order => statusFilter === "all" || order.status === statusFilter);
};

export const sortOrders = (
  orders: OrderData[],
  sortField: SortField,
  sortDirection: "asc" | "desc"
) => {
  return [...orders].sort((a, b) => {
    if (sortField === "orderDate") {
      const dateA = new Date(a[sortField]).getTime();
      const dateB = new Date(b[sortField]).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    }
    
    if (sortField === "total") {
      return sortDirection === "asc" 
        ? a[sortField] - b[sortField] 
        : b[sortField] - a[sortField];
    }
    
    const valueA = String(a[sortField] || '').toLowerCase();
    const valueB = String(b[sortField] || '').toLowerCase();
    return sortDirection === "asc" 
      ? valueA.localeCompare(valueB) 
      : valueB.localeCompare(valueA);
  });
};

export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};
