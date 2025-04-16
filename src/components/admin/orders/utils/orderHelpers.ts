
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
type SortField = "id" | "customerName" | "orderDate" | "total" | "status";

export const filterOrders = (
  orders: any[],
  searchTerm: string,
  statusFilter: OrderStatus | "all"
) => {
  return orders
    .filter(order => 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(order => statusFilter === "all" || order.status === statusFilter);
};

export const sortOrders = (
  orders: any[],
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
    
    const valueA = String(a[sortField]).toLowerCase();
    const valueB = String(b[sortField]).toLowerCase();
    return sortDirection === "asc" 
      ? valueA.localeCompare(valueB) 
      : valueB.localeCompare(valueA);
  });
};
