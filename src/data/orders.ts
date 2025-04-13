
import { Order } from "@/types";

export const orders: Order[] = [
  {
    id: "order-001",
    customerId: "cust-001",
    customerName: "Fatima Ahmed",
    customerEmail: "fatima@example.com",
    items: [
      {
        productId: "1",
        productName: "Pink Embroidered Suit",
        quantity: 1,
        price: 4999
      }
    ],
    totalAmount: 4999,
    status: "delivered",
    paymentStatus: "paid",
    shippingAddress: {
      address: "123 Main Street",
      city: "Karachi",
      state: "Sindh",
      zipCode: "75300",
      country: "Pakistan"
    },
    createdAt: "2025-04-01T10:00:00Z",
    updatedAt: "2025-04-05T14:30:00Z"
  },
  {
    id: "order-002",
    customerId: "cust-002",
    customerName: "Ayesha Khan",
    customerEmail: "ayesha@example.com",
    items: [
      {
        productId: "2",
        productName: "Red Embellished Suit",
        quantity: 1,
        price: 5999
      },
      {
        productId: "6",
        productName: "Pink Kids Suit",
        quantity: 1,
        price: 2999
      }
    ],
    totalAmount: 8998,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: {
      address: "456 Park Avenue",
      city: "Lahore",
      state: "Punjab",
      zipCode: "54000",
      country: "Pakistan"
    },
    createdAt: "2025-04-05T09:15:00Z",
    updatedAt: "2025-04-07T11:20:00Z"
  },
  {
    id: "order-003",
    customerId: "cust-003",
    customerName: "Sara Malik",
    customerEmail: "sara@example.com",
    items: [
      {
        productId: "4",
        productName: "Teal Embroidered Suit",
        quantity: 1,
        price: 4200
      }
    ],
    totalAmount: 4200,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: {
      address: "789 Garden Road",
      city: "Islamabad",
      state: "Islamabad Capital Territory",
      zipCode: "44000",
      country: "Pakistan"
    },
    createdAt: "2025-04-10T14:20:00Z",
    updatedAt: "2025-04-10T16:45:00Z"
  },
  {
    id: "order-004",
    customerId: "cust-004",
    customerName: "Zainab Hassan",
    customerEmail: "zainab@example.com",
    items: [
      {
        productId: "5",
        productName: "Cream Glitter Anarkali",
        quantity: 1,
        price: 8500
      }
    ],
    totalAmount: 8500,
    status: "pending",
    paymentStatus: "pending",
    shippingAddress: {
      address: "101 River View",
      city: "Faisalabad",
      state: "Punjab",
      zipCode: "38000",
      country: "Pakistan"
    },
    createdAt: "2025-04-12T09:30:00Z",
    updatedAt: "2025-04-12T09:30:00Z"
  }
];
