
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Check, 
  Info, 
  Ruler, 
  Share2, 
  ShoppingBag 
} from "lucide-react";
import { CustomDesign } from '@/types/stitching';

// We'll fetch from our custom design data later, for now using mock data
const getDesignById = (id: string): CustomDesign | undefined => {
  // This would be replaced with actual API call
  const allDesigns = [
    // Suit designs
    {
      id: "suit-1",
      name: "Classic Royal Suit",
      type: "suit",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(1).jpeg?raw=true",
      description: "Traditional Pakistani suit with intricate embroidery",
      price: 15000,
      details: "This classic suit features hand-embroidered details on premium fabric. Ideal for formal occasions and celebrations, it combines traditional craftsmanship with modern tailoring techniques."
    },
    {
      id: "shirt-1",
      name: "Classic Collared",
      type: "shirt",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(8).jpeg?raw=true",
      description: "Traditional collar design with premium stitching",
      price: 4500,
      details: "Our classic collared shirt is crafted with precision using the finest cotton. Perfect for both professional and casual settings, it features durable stitching and a comfortable fit."
    },
  ];
  
  return allDesigns.find(design => design.id === id);
};

const DesignDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [design, setDesign] = useState<CustomDesign | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      if (id) {
        const fetchedDesign = getDesignById(id);
        setDesign(fetchedDesign);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="container py-16 flex justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  
  if (!design) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Design Not Found</h1>
        <p className="mb-8">The design you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/custom-stitching">Browse All Designs</Link>
        </Button>
      </div>
    );
  }
  
  const handleShareDesign = () => {
    if (navigator.share) {
      navigator.share({
        title: design.name,
        text: design.description,
        url: window.location.href,
      });
    }
  };
  
  return (
    <div className="container py-16">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/custom-stitching">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Designs
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden border-2 border-gray-100 dark:border-gray-800">
          <img 
            src={design.imageUrl} 
            alt={design.name} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{design.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{design.description}</p>
          
          {design.price && (
            <p className="text-2xl font-bold mb-6">Rs. {design.price.toLocaleString()}</p>
          )}
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button size="lg" className="bg-brand-gold hover:bg-brand-gold/90 text-white">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Select This Design
            </Button>
            
            <Button variant="outline" size="lg" onClick={handleShareDesign}>
              <Share2 className="mr-2 h-5 w-5" />
              Share Design
            </Button>
          </div>
          
          <Link to="/size-chart" className="flex items-center text-brand-gold hover:underline mb-8">
            <Ruler className="mr-2 h-5 w-5" />
            View Size Chart
          </Link>
          
          <Separator className="my-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Design Details</h3>
              <p className="text-gray-600 dark:text-gray-300">{design.details}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  Premium quality fabric
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  Custom measurements
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  Expert tailoring
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-green-500" />
                  Free alterations
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <Card className="bg-gray-50 dark:bg-gray-800 border-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Info className="mr-2 h-5 w-5 text-brand-gold" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Select this design</li>
                <li>Choose your fabric (optional)</li>
                <li>Provide your measurements or select standard size</li>
                <li>Add any special requirements</li>
                <li>Complete your order</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DesignDetailPage;
