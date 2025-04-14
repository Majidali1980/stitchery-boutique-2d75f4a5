
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Filter, 
  ChevronDown,
  Search
} from "lucide-react";
import { CustomDesign } from '@/types/stitching';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// This would come from your data source
const getAllDesigns = (): CustomDesign[] => {
  // Combine suit and shirt designs
  return [
    // Suit designs (just a few examples for brevity)
    {
      id: "suit-1",
      name: "Classic Royal Suit",
      type: "suit",
      category: "Wedding",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(1).jpeg?raw=true",
      description: "Traditional Pakistani suit with intricate embroidery",
      price: 15000,
      designCode: "SR-001"
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
    // Shirt designs (just a few examples for brevity)
    {
      id: "shirt-1",
      name: "Classic Collared",
      type: "shirt",
      category: "Formal",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(8).jpeg?raw=true",
      description: "Traditional collar design with premium stitching",
      price: 4500,
      designCode: "SC-001"
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
  ];
};

const DesignCategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [designs, setDesigns] = useState<CustomDesign[]>([]);
  const [filteredDesigns, setFilteredDesigns] = useState<CustomDesign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const allDesigns = getAllDesigns();
      if (category) {
        const categoryDesigns = allDesigns.filter(
          design => design.category?.toLowerCase() === category.toLowerCase()
        );
        setDesigns(categoryDesigns);
        setFilteredDesigns(categoryDesigns);
      } else {
        setDesigns(allDesigns);
        setFilteredDesigns(allDesigns);
      }
      setIsLoading(false);
    }, 500);
  }, [category]);

  useEffect(() => {
    let result = [...designs];
    
    // Apply type filter
    if (filter !== "all") {
      result = result.filter(design => design.type === filter);
    }
    
    // Apply search
    if (searchTerm) {
      result = result.filter(design => 
        design.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        design.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        design.designCode?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredDesigns(result);
  }, [filter, searchTerm, designs]);

  const formatCategoryName = (name?: string) => {
    if (!name) return "All Designs";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  if (isLoading) {
    return (
      <div className="container py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="space-y-4">
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/custom-stitching">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Designs
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {formatCategoryName(category)} Designs
            </h1>
            <p className="text-gray-500 mt-1">
              {filteredDesigns.length} designs available
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search designs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-44">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="suit">Suits</SelectItem>
                <SelectItem value="shirt">Shirts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredDesigns.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl mb-2">No designs found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <Button 
            onClick={() => {
              setFilter("all");
              setSearchTerm("");
            }}
            className="bg-brand-gold hover:bg-brand-gold/90 text-white"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDesigns.map((design) => (
            <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={design.imageUrl}
                  alt={design.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-0 right-0 bg-brand-gold text-white px-2 py-1 text-sm font-bold">
                  Code: {design.designCode || design.id}
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{design.name}</h3>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                    {design.type === "suit" ? "Suit" : "Shirt"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {design.description}
                </p>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button 
                  asChild 
                  className="bg-brand-gold hover:bg-brand-gold/90 text-white w-full"
                >
                  <Link to={`/custom-stitching/design/${design.id}`}>
                    View Design
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DesignCategoryPage;
