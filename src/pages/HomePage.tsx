
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductGrid from "@/components/products/ProductGrid";
import Services from "@/components/home/Services";
import PromoBanner from "@/components/home/PromoBanner";
import TestimonialSection from "@/components/home/TestimonialSection";
import CustomDesigns from "@/components/custom-stitching/CustomDesigns";
import DesignCategories from "@/components/custom-stitching/DesignCategories";
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
          <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-white">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>

      {/* Weekend Sale Banner */}
      <div className="container my-12">
        <Link to="/products" className="block">
          <img 
            src="https://github.com/Majidali1980/lmages/blob/main/Weekend%20Sale%20Facebook%20Cover.png?raw=true" 
            alt="Weekend Sale" 
            className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </Link>
      </div>
      
      <DesignCategories />
      <CustomDesigns />
      
      <PromoBanner />
      <Services />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
