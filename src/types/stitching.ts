
export interface SizeChartMeasurement {
  label: string;
  description?: string;
  unit: "in" | "cm";
}

export interface GarmentSizeChart {
  type: "shirt" | "shalwar" | "pajama";
  measurements: SizeChartMeasurement[];
  standardSizes: {
    [size: string]: { [measurement: string]: number };
  };
}

export type ServiceType = "standard" | "custom" | "premium";

export interface CustomStitchingOrder {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  garmentType: "shirt" | "shalwar" | "pajama" | "complete-suit";
  serviceType: ServiceType;
  status: "pending" | "processing" | "ready" | "completed" | "cancelled";
  price: number;
  createdAt: string;
  measurements: { [key: string]: number };
  fabric?: string;
  designImage?: string;
  notes?: string;
  estimatedDelivery: string;
  completedAt?: string;
}

export interface CustomDesign {
  id: string;
  name: string;
  type: "shirt" | "suit" | "shalwar" | "pajama";
  imageUrl: string;
  description?: string;
  price?: number;
  details?: string;
}

// Extended CartItem type that can handle both products and stitching orders
export interface StitchingCartItem {
  type: 'stitching';
  service: CustomStitchingOrder;
  quantity: number;
}

export interface ProductCartItem {
  type: 'product';
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    type: "ready-to-wear" | "unstitched";
    category: string;
  };
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type CartItemType = ProductCartItem | StitchingCartItem;
