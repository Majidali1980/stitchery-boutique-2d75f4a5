
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Ruler, Scissors } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductGrid from "@/components/products/ProductGrid";
import { products } from "@/data/products";

const UnstitchedSuitsPage = () => {
  const [unstitchedProducts, setUnstitchedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  
  useEffect(() => {
    // Filter unstitched products
    let filtered = products.filter(product => product.type === "unstitched");
    
    // Apply search filter if any
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default: // newest
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
    }
    
    setUnstitchedProducts(filtered);
  }, [searchTerm, sortBy]);
  
  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold heading-fancy">Unstitched Suits Collection</h1>
        <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Browse our exclusive collection of premium unstitched fabrics. Choose from a wide range 
          of designs and get them custom stitched according to your measurements and preferences.
        </p>
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-brand-gold/10 p-3 rounded-full mb-4">
              <Scissors className="h-8 w-8 text-brand-gold" />
            </div>
            <h3 className="text-lg font-medium mb-2">Custom Stitching</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get your selected fabric custom stitched with our premium tailoring service
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/custom-stitching">Learn More</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-brand-gold/10 p-3 rounded-full mb-4">
              <Ruler className="h-8 w-8 text-brand-gold" />
            </div>
            <h3 className="text-lg font-medium mb-2">Perfect Fit</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ensure a perfect fit with our comprehensive size chart and measurement guide
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/size-chart">View Size Chart</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-brand-gold/10 p-3 rounded-full mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
                <path d="M14.5 8.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z"></path>
                <path d="M18.5 8.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z"></path>
                <path d="M9.5 14a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                <path d="M14.5 14a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                <path d="M9.5 19.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                <path d="M14.5 19.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Premium Fabrics</h3>
            <p className="text-sm text-gray-600 mb-4">
              Explore our collection of high-quality fabrics in various colors and designs
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/products?type=unstitched">View All Fabrics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="w-full md:w-64">
          <Input
            placeholder="Search unstitched suits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="mb-10">
        {unstitchedProducts.length > 0 ? (
          <ProductGrid products={unstitchedProducts} />
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search term</p>
          </div>
        )}
      </div>
      
      {/* Call to Action */}
      <div className="bg-gray-50 border rounded-lg p-6 md:p-10 text-center mb-10">
        <h2 className="text-2xl font-semibold mb-3">Ready to create your custom outfit?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Browse our unstitched fabric collection, select your favorite, and get it custom stitched 
          according to your measurements and style preferences.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/custom-stitching">Custom Stitching</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/size-chart">View Size Chart</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnstitchedSuitsPage;
