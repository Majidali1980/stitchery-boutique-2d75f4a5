
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductGrid from "@/components/products/ProductGrid";
import Services from "@/components/home/Services";
import PromoBanner from "@/components/home/PromoBanner";
import TestimonialSection from "@/components/home/TestimonialSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      
      <div className="container py-16">
        <ProductGrid 
          products={featuredProducts} 
          title="Featured Products"
        />
        <div className="text-center mt-8">
          <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold/90">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
      
      <PromoBanner />
      <Services />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
