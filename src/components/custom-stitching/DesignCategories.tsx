
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "wedding", name: "Wedding", image: "https://github.com/Majidali1980/lmages/blob/main/1%20(1).jpeg?raw=true" },
  { id: "formal", name: "Formal", image: "https://github.com/Majidali1980/lmages/blob/main/1%20(2).jpeg?raw=true" },
  { id: "casual", name: "Casual", image: "https://github.com/Majidali1980/lmages/blob/main/1%20(3).jpeg?raw=true" },
  { id: "party", name: "Party", image: "https://github.com/Majidali1980/lmages/blob/main/1%20(4).jpeg?raw=true" },
  { id: "traditional", name: "Traditional", image: "https://github.com/Majidali1980/lmages/blob/main/1%20(5).jpeg?raw=true" },
  { id: "modern", name: "Modern", image: "https://github.com/Majidali1980/lmages/blob/main/1%20(6).jpeg?raw=true" },
];

const DesignCategories = () => {
  return (
    <div className="container py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Browse Designs by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.id}
            to={`/custom-stitching/category/${category.id}`} 
            className="block"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild className="bg-brand-gold hover:bg-brand-gold/90 text-white">
          <Link to="/custom-stitching">View All Designs</Link>
        </Button>
      </div>
    </div>
  );
};

export default DesignCategories;
