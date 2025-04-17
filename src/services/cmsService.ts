
import { OrderData } from "@/components/admin/orders/utils/orderHelpers";
import { useEffect, useState } from "react";

// Base URL for the TinaCMS API
const CMS_API_URL = "https://content.tinajs.io/content/demo"; // Replace with your actual TinaCMS API URL

// Interface for raw CMS order data
interface CMSOrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  total: number;
  status: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
}

// Interface for raw CMS customer data
interface CMSCustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// Function to transform CMS order data to our app's order data format
const transformOrderData = (cmsOrder: CMSOrderData): OrderData => {
  return {
    id: cmsOrder.id,
    customerName: cmsOrder.customerName,
    customerEmail: cmsOrder.customerEmail,
    orderDate: cmsOrder.orderDate,
    total: cmsOrder.total,
    status: cmsOrder.status as any,
    items: cmsOrder.items,
    shippingAddress: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    }
  };
};

// Hook to fetch orders from the CMS
export const useOrders = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // For demo purposes, we're using localStorage first
        const storedOrders = localStorage.getItem('adminOrders');
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
          setLoading(false);
          return;
        }
        
        // In a real implementation, we would fetch from TinaCMS here
        // const response = await fetch(`${CMS_API_URL}/orders`);
        // if (!response.ok) throw new Error('Failed to fetch orders');
        // const data = await response.json();
        // const transformedOrders = data.map(transformOrderData);
        // setOrders(transformedOrders);

        // For demo purposes, using mock data
        const mockOrders: OrderData[] = [
          {
            id: "ORD-1001",
            customerName: "Sarah Khan",
            customerEmail: "sarah@example.com",
            orderDate: "2025-04-15T10:30:00Z",
            total: 3500,
            status: "pending",
            items: [
              { productId: "1", productName: "Pink Embroidered Suit", quantity: 1, price: 3500 }
            ],
            shippingAddress: {
              address: "123 Main St",
              city: "Karachi",
              state: "Sindh",
              zipCode: "75000",
              country: "Pakistan"
            }
          },
          {
            id: "ORD-1002",
            customerName: "Aisha Malik",
            customerEmail: "aisha@example.com",
            orderDate: "2025-04-14T15:45:00Z",
            total: 7200,
            status: "processing",
            items: [
              { productId: "2", productName: "Red Embellished Suit", quantity: 1, price: 5999 },
              { productId: "5", productName: "Earrings", quantity: 1, price: 1201 }
            ],
            shippingAddress: {
              address: "456 Garden Ave",
              city: "Lahore",
              state: "Punjab",
              zipCode: "54000",
              country: "Pakistan"
            }
          }
        ];

        // Store in localStorage for persistence
        localStorage.setItem('adminOrders', JSON.stringify(mockOrders));
        setOrders(mockOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to add a new order
  const addOrder = (order: OrderData) => {
    setOrders(prevOrders => {
      const newOrders = [order, ...prevOrders];
      localStorage.setItem('adminOrders', JSON.stringify(newOrders));
      return newOrders;
    });
  };

  // Function to update an order's status
  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order => 
        order.id === orderId ? { ...order, status: status as any } : order
      );
      localStorage.setItem('adminOrders', JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };

  return { orders, loading, error, addOrder, updateOrderStatus };
};

// Hook to fetch customers from the CMS
export const useCustomers = () => {
  const [customers, setCustomers] = useState<CMSCustomerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // For demo purposes, we're using localStorage first
        const storedCustomers = localStorage.getItem('adminCustomers');
        if (storedCustomers) {
          setCustomers(JSON.parse(storedCustomers));
          setLoading(false);
          return;
        }

        // In a real implementation, we would fetch from TinaCMS here
        // const response = await fetch(`${CMS_API_URL}/customers`);
        // if (!response.ok) throw new Error('Failed to fetch customers');
        // const data = await response.json();
        // setCustomers(data);

        // For demo purposes, using mock data
        const mockCustomers: CMSCustomerData[] = [
          {
            id: "CUST-1001",
            name: "Sarah Khan",
            email: "sarah@example.com",
            phone: "0300-1234567",
            address: {
              street: "123 Main St",
              city: "Karachi",
              state: "Sindh",
              zipCode: "75000",
              country: "Pakistan"
            }
          },
          {
            id: "CUST-1002",
            name: "Aisha Malik",
            email: "aisha@example.com",
            phone: "0300-7654321",
            address: {
              street: "456 Garden Ave",
              city: "Lahore",
              state: "Punjab",
              zipCode: "54000",
              country: "Pakistan"
            }
          }
        ];

        // Store in localStorage for persistence
        localStorage.setItem('adminCustomers', JSON.stringify(mockCustomers));
        setCustomers(mockCustomers);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to fetch customers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return { customers, loading, error };
};
