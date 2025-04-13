
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductGrid from "@/components/products/ProductGrid";
import { products } from "@/data/products";
import { Product } from "@/types";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const typeParam = searchParams.get("type");
  
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [selectedType, setSelectedType] = useState<string | null>(typeParam);
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "suits", name: "Suits" },
    { id: "anarkali", name: "Anarkali" },
    { id: "shirts", name: "Shirts" },
    { id: "pajama", name: "Pajama Sets" },
    { id: "kids", name: "Kids Collection" }
  ];
  
  const types = [
    { id: "all", name: "All Types" },
    { id: "ready-to-wear", name: "Ready to Wear" },
    { id: "unstitched", name: "Unstitched" }
  ];
  
  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply type filter
    if (selectedType && selectedType !== "all") {
      filtered = filtered.filter(product => product.type === selectedType);
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(lowercaseSearch) || 
        product.description.toLowerCase().includes(lowercaseSearch)
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
        // Assuming id is related to newness, higher id = newer
        filtered.sort((a, b) => Number(b.id) - Number(a.id));
    }
    
    setDisplayProducts(filtered);
  }, [selectedCategory, selectedType, sortBy, searchTerm]);
  
  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedType(null);
    setSortBy("newest");
    setSearchTerm("");
  };
  
  return (
    <div className="container py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold heading-fancy">Our Products</h1>
        <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
        <p className="text-gray-600 mt-4 max-w-lg mx-auto">
          Browse our collection of beautiful ready-to-wear outfits and unstitched fabrics
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="md:w-1/4 lg:w-1/5 hidden md:block">
          <div className="bg-white rounded-lg border p-5 shadow-sm sticky top-24">
            <div className="mb-6">
              <h3 className="font-medium mb-3">Search</h3>
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.id}
                      onChange={() => setSelectedCategory(category.id)}
                      className="hidden"
                    />
                    <span className={`w-5 h-5 border rounded-full mr-2 flex items-center justify-center ${
                      selectedCategory === category.id ? 'border-brand-gold' : 'border-gray-300'
                    }`}>
                      {selectedCategory === category.id && (
                        <span className="w-3 h-3 rounded-full bg-brand-gold"></span>
                      )}
                    </span>
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Product Type</h3>
              <div className="space-y-2">
                {types.map(type => (
                  <label key={type.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={selectedType === type.id}
                      onChange={() => setSelectedType(type.id)}
                      className="hidden"
                    />
                    <span className={`w-5 h-5 border rounded-full mr-2 flex items-center justify-center ${
                      selectedType === type.id ? 'border-brand-gold' : 'border-gray-300'
                    }`}>
                      {selectedType === type.id && (
                        <span className="w-3 h-3 rounded-full bg-brand-gold"></span>
                      )}
                    </span>
                    <span>{type.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={resetFilters}
              className="w-full"
              variant="outline"
            >
              Reset Filters
            </Button>
          </div>
        </div>
        
        {/* Mobile Filter Button */}
        <div className="flex md:hidden justify-between items-center mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <span>Filters</span>
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Search</h3>
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="hidden"
                        />
                        <span className={`w-5 h-5 border rounded-full mr-2 flex items-center justify-center ${
                          selectedCategory === category.id ? 'border-brand-gold' : 'border-gray-300'
                        }`}>
                          {selectedCategory === category.id && (
                            <span className="w-3 h-3 rounded-full bg-brand-gold"></span>
                          )}
                        </span>
                        <span>{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Product Type</h3>
                  <div className="space-y-2">
                    {types.map(type => (
                      <label key={type.id} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          checked={selectedType === type.id}
                          onChange={() => setSelectedType(type.id)}
                          className="hidden"
                        />
                        <span className={`w-5 h-5 border rounded-full mr-2 flex items-center justify-center ${
                          selectedType === type.id ? 'border-brand-gold' : 'border-gray-300'
                        }`}>
                          {selectedType === type.id && (
                            <span className="w-3 h-3 rounded-full bg-brand-gold"></span>
                          )}
                        </span>
                        <span>{type.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={resetFilters}
                  className="w-full"
                  variant="outline"
                >
                  Reset Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
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
        
        {/* Products */}
        <div className="md:w-3/4 lg:w-4/5">
          <div className="hidden md:flex justify-between items-center mb-6">
            <p>
              {displayProducts.length} {displayProducts.length === 1 ? 'product' : 'products'} found
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
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
          
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map(product => (
                <div key={product.id} className="h-full">
                  <ProductGrid products={[product]} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No products found</h3>
              <p className="text-gray-500 mt-2">Try changing your filters or search term</p>
              <Button 
                onClick={resetFilters}
                className="mt-4"
                variant="default"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
