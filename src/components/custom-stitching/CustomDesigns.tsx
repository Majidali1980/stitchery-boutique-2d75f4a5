
import { useEffect, useRef } from "react";
import { CustomDesign } from "@/types/stitching";
import DesignCarousel from "./DesignCarousel";
import Autoplay from "embla-carousel-autoplay";

// Mock data for suit designs
const suitDesigns: CustomDesign[] = [
  {
    id: "suit-1",
    name: "Classic Royal Suit",
    type: "suit",
    category: "Wedding",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(1).jpeg?raw=true",
    description: "Traditional Pakistani suit with intricate embroidery",
    price: 15000,
    designCode: "SR-001",
    features: ["Hand embroidery", "Premium fabric", "Full suit set"],
    materials: ["Premium cotton", "Silk thread"]
  },
  {
    id: "suit-2",
    name: "Modern Embroidery",
    type: "suit",
    category: "Formal",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(11).jpeg?raw=true",
    description: "Contemporary design with subtle embroidery details",
    price: 12500,
    designCode: "SR-002"
  },
  {
    id: "suit-3",
    name: "Formal Elegance",
    type: "suit",
    category: "Formal",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(13).jpeg?raw=true",
    description: "Sophisticated formal wear with premium stitching",
    price: 18000,
    designCode: "SR-003"
  },
  {
    id: "suit-4",
    name: "Wedding Collection",
    type: "suit",
    category: "Wedding",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(14).jpeg?raw=true",
    description: "Perfect for special occasions and celebrations",
    price: 22000,
    designCode: "SR-004"
  },
  {
    id: "suit-5",
    name: "Contemporary Light",
    type: "suit",
    category: "Casual",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(15).jpeg?raw=true",
    description: "Lightweight fabric with modern styling",
    price: 13500,
    designCode: "SR-005"
  },
  {
    id: "suit-6",
    name: "Traditional Craft",
    type: "suit",
    category: "Traditional",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(16).jpeg?raw=true",
    description: "Handcrafted details with traditional aesthetics",
    price: 16500,
    designCode: "SR-006"
  },
  {
    id: "suit-7",
    name: "Summer Collection",
    type: "suit",
    category: "Casual",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(17).jpeg?raw=true",
    description: "Light and breathable for summer comfort",
    price: 11000,
    designCode: "SR-007"
  },
  {
    id: "suit-8",
    name: "Premium Lux",
    type: "suit",
    category: "Premium",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(19).jpeg?raw=true",
    description: "Premium fabric with luxurious detailing",
    price: 25000,
    designCode: "SR-008"
  },
  {
    id: "suit-9",
    name: "Casual Comfort",
    type: "suit",
    category: "Casual",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(2).jpeg?raw=true",
    description: "Everyday wear with comfortable fit",
    price: 9500,
    designCode: "SR-009"
  },
  {
    id: "suit-10",
    name: "Designer Collection",
    type: "suit",
    category: "Premium",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(20).jpeg?raw=true",
    description: "Exclusive designer patterns and cuts",
    price: 28000,
    designCode: "SR-010"
  },
  {
    id: "suit-11",
    name: "Festival Special",
    type: "suit",
    category: "Festival",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(5).jpeg?raw=true",
    description: "Vibrant colors perfect for festivals",
    price: 14500,
    designCode: "SR-011"
  },
  {
    id: "suit-12",
    name: "Simple Elegance",
    type: "suit",
    category: "Formal",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(7).jpeg?raw=true",
    description: "Minimalist design with elegant touches",
    price: 13000,
    designCode: "SR-012"
  },
  {
    id: "suit-13",
    name: "Formal Business",
    type: "suit",
    category: "Formal",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(9).jpeg?raw=true",
    description: "Professional attire for business settings",
    price: 17500,
    designCode: "SR-013"
  }
];

// Mock data for shirt designs
const shirtDesigns: CustomDesign[] = [
  {
    id: "shirt-1",
    name: "Classic Collared",
    type: "shirt",
    category: "Formal",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(8).jpeg?raw=true",
    description: "Traditional collar design with premium stitching",
    price: 4500,
    designCode: "SC-001",
    features: ["Classic collar", "Premium stitching", "Business casual"]
  },
  {
    id: "shirt-2",
    name: "Modern Cut",
    type: "shirt",
    category: "Modern",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(6).jpeg?raw=true",
    description: "Contemporary cut with clean lines",
    price: 5000,
    designCode: "SC-002"
  },
  {
    id: "shirt-3",
    name: "Embroidered Collar",
    type: "shirt",
    category: "Premium",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(10).jpeg?raw=true",
    description: "Detailed embroidery around collar and cuffs",
    price: 6500,
    designCode: "SC-003"
  },
  {
    id: "shirt-4",
    name: "Business Professional",
    type: "shirt",
    category: "Formal",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(12).jpeg?raw=true",
    description: "Sharp and professional for office wear",
    price: 5500,
    designCode: "SC-004"
  },
  {
    id: "shirt-5",
    name: "Casual Comfort",
    type: "shirt",
    category: "Casual",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(18).jpeg?raw=true",
    description: "Relaxed fit for everyday wear",
    price: 4000,
    designCode: "SC-005"
  },
  {
    id: "shirt-6",
    name: "Formal Evening",
    type: "shirt",
    category: "Formal",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(21).jpeg?raw=true",
    description: "Elegant design for formal occasions",
    price: 7000,
    designCode: "SC-006"
  },
  {
    id: "shirt-7",
    name: "Premium Cotton",
    type: "shirt",
    category: "Premium",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(22).jpeg?raw=true",
    description: "Made with the finest cotton for superior comfort",
    price: 6000,
    designCode: "SC-007"
  },
  {
    id: "shirt-8",
    name: "Summer Cool",
    type: "shirt",
    category: "Casual",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(23).jpeg?raw=true",
    description: "Light fabric perfect for hot weather",
    price: 4200,
    designCode: "SC-008"
  },
  {
    id: "shirt-9",
    name: "Traditional Pattern",
    type: "shirt",
    category: "Traditional",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(24).jpeg?raw=true",
    description: "Classic patterns inspired by heritage designs",
    price: 5800,
    designCode: "SC-009"
  },
  {
    id: "shirt-10",
    name: "Executive Style",
    type: "shirt",
    category: "Premium",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(25).jpeg?raw=true",
    description: "Premium design for executives",
    price: 8000,
    designCode: "SC-010"
  },
  {
    id: "shirt-11",
    name: "Everyday Essential",
    type: "shirt",
    category: "Casual",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(3).jpeg?raw=true",
    description: "Reliable and comfortable for daily wear",
    price: 3800,
    designCode: "SC-011"
  },
  {
    id: "shirt-12",
    name: "Festive Collection",
    type: "shirt",
    category: "Festival",
    imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(4).jpeg?raw=true",
    description: "Bright and celebratory for special occasions",
    price: 6800,
    designCode: "SC-012"
  }
];

const CustomDesigns = () => {
  return (
    <div>
      <DesignCarousel 
        title="Custom Suit Designs" 
        designs={suitDesigns} 
        type="suit"
      />
      <div className="my-12 border-b dark:border-gray-700"></div>
      <DesignCarousel 
        title="Custom Shirt Designs" 
        designs={shirtDesigns} 
        type="shirt"
      />
    </div>
  );
};

export default CustomDesigns;
