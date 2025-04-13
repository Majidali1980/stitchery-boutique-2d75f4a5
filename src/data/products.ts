
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Pink Embroidered Suit",
    description: "Beautiful pink suit with gold embroidery work, perfect for special occasions. Comes with matching dupatta and bottoms.",
    price: 4999,
    images: [
      "/lovable-uploads/dfede9a3-f79d-44f4-91c7-47c53bd0a969.png",
      "/lovable-uploads/d88e53ea-f8d9-4ca8-8c5c-75267b8ec30b.png"
    ],
    category: "suits",
    type: "ready-to-wear",
    featured: true,
    inStock: true,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "2",
    name: "Red Embellished Suit",
    description: "Stunning red suit featuring intricate gold leaf embroidery around the neckline. Perfect for festive occasions.",
    price: 5999,
    images: [
      "/lovable-uploads/abcb1554-4744-4396-97ce-b9728d2c8645.png",
      "/lovable-uploads/d950e32e-53b6-4972-ad20-9da4f15c2aba.png"
    ],
    category: "suits",
    type: "ready-to-wear",
    featured: true,
    inStock: true,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "3",
    name: "Blue Printed Unstitched Suit",
    description: "Navy blue unstitched fabric with intricate gold motifs, comes with matching dupatta and contrast border.",
    price: 3500,
    images: [
      "/lovable-uploads/7985dfe7-6842-4017-a1ab-95f5fd7318d1.png",
      "/lovable-uploads/ba3e8c33-60f6-418a-b5d7-0736aeb39f72.png"
    ],
    category: "suits",
    type: "unstitched",
    featured: false,
    inStock: true
  },
  {
    id: "4",
    name: "Teal Embroidered Suit",
    description: "Elegant teal colored suit with traditional embroidery work. Comes as unstitched fabric ready for custom tailoring.",
    price: 4200,
    images: [
      "/lovable-uploads/527261c7-9c60-4747-9986-71a1f6e2bac3.png",
      "/lovable-uploads/2211eef9-1b95-4a7d-b99f-b9092ce51c20.png"
    ],
    category: "suits",
    type: "unstitched",
    featured: false,
    inStock: true
  },
  {
    id: "5",
    name: "Cream Glitter Anarkali",
    description: "Beautiful cream colored glittery anarkali dress with sequin work and matching jacket for a glamorous look.",
    price: 8500,
    images: [
      "/lovable-uploads/625af344-7b89-4547-8608-9379d00d5122.png"
    ],
    category: "anarkali",
    type: "ready-to-wear",
    featured: true,
    inStock: true,
    sizes: ["S", "M", "L"]
  },
  {
    id: "6",
    name: "Pink Kids Suit",
    description: "Adorable pink suit for little girls featuring delicate gold embroidery. Perfect for special occasions.",
    price: 2999,
    images: [
      "/lovable-uploads/ecdc2359-49fa-4a2a-a234-45c5dc067a91.png",
      "/lovable-uploads/f5e0d519-e1c3-40c3-b768-b9df885b93a3.png"
    ],
    category: "kids",
    type: "ready-to-wear",
    featured: true,
    inStock: true,
    sizes: ["2-3Y", "4-5Y", "6-7Y"]
  },
  {
    id: "7",
    name: "Floral Printed Shirt",
    description: "Light blue floral printed shirt with navy blue piping. Ready-to-wear or get it custom stitched.",
    price: 3200,
    images: [
      "/lovable-uploads/41586a3f-45ba-4a96-9489-d0f3df5154f1.png"
    ],
    category: "shirts",
    type: "ready-to-wear",
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "8",
    name: "Printed Pajama Set",
    description: "Comfortable printed pajama set with geometric patterns. Perfect for casual wear or lounging at home.",
    price: 2500,
    images: [
      "/lovable-uploads/5898bf2b-6ef8-4b58-a218-35abc28bf4b7.png",
      "/lovable-uploads/4bb7fd20-3b64-4faa-b6a4-74781f1e3538.png"
    ],
    category: "pajama",
    type: "ready-to-wear",
    featured: false,
    inStock: true,
    sizes: ["S", "M", "L"]
  }
];

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductsByType = (type: "ready-to-wear" | "unstitched") => {
  return products.filter(product => product.type === type);
};
