
import { useState } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  return (
    <section className="py-10">
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold heading-fancy">{title}</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
