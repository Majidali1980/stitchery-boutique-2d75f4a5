
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  type: "ready-to-wear" | "unstitched";
  featured: boolean;
  inStock: boolean;
  colors?: string[];
  sizes?: string[];
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "pending";
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type ServiceType = 
  | "simple-stitching"
  | "dori-piping"
  | "lace-suit"
  | "lining-suit"
  | "lining-with-dori";
