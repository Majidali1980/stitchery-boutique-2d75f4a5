
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CustomDesign } from "@/types/stitching";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { suitDesigns, shirtDesigns, trouserDesigns, kameezShalwarDesigns } from "@/data/stitching-designs";
import { Check, Ruler, Shirt } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/clerk-react";

const DesignDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [design, setDesign] = useState<CustomDesign | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { addStitchingService } = useCart();

  useEffect(() => {
    // Find design across all design types
    const allDesigns = [...suitDesigns, ...shirtDesigns, ...trouserDesigns, ...kameezShalwarDesigns];
    const foundDesign = allDesigns.find(d => d.id === id);
    
    setDesign(foundDesign || null);
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!design) return;
    
    addStitchingService({
      garmentType: design.type,
      design: design,
      price: design.price,
      details: `${design.name} (${design.designCode || design.id})`,
    }, 1);
    
    toast({
      title: "Added to cart",
      description: `${design.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = () => {
    if (!isSignedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to proceed with checkout.",
        variant: "destructive",
      });
      return;
    }
    
    if (!design) return;
    
    addStitchingService({
      garmentType: design.type,
      design: design,
      price: design.price,
      details: `${design.name} (${design.designCode || design.id})`,
    }, 1);
    
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="container py-16 flex justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Design Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The design you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/stitching-designs">View All Designs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Design Image */}
        <div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-full">
            <img 
              src={design.imageUrl}
              alt={design.name}
              className="object-contain w-full h-full rounded"
            />
          </div>
        </div>

        {/* Design Details */}
        <div>
          <div className="flex items-center">
            <Link 
              to={`/stitching-designs`}
              className="text-sm text-gray-500 hover:text-brand-gold dark:text-gray-400 dark:hover:text-brand-gold"
            >
              Stitching Designs
            </Link>
            <span className="mx-2">›</span>
            <Link 
              to={`/custom-stitching/${design.type}-designs`}
              className="text-sm text-gray-500 hover:text-brand-gold dark:text-gray-400 dark:hover:text-brand-gold"
            >
              {design.type.charAt(0).toUpperCase() + design.type.slice(1)} Designs
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold mt-2">{design.name}</h1>

          <div className="mt-4 flex items-center">
            <span className="text-2xl font-semibold text-brand-gold">
              Rs. {design.price.toLocaleString()}
            </span>
            <Badge variant="outline" className="ml-4">
              Code: {design.designCode || design.id}
            </Badge>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-lg">Description</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {design.description || `Premium quality custom stitched ${design.type} made with attention to detail and excellent craftsmanship.`}
            </p>
          </div>

          <Separator className="my-6" />

          {/* Features */}
          <div>
            <h3 className="font-medium text-lg mb-3">Features</h3>
            <ul className="space-y-2">
              {design.features ? (
                design.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-brand-gold mr-2" />
                    <span>{feature}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-gold mr-2" />
                    <span>Premium quality fabric</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-gold mr-2" />
                    <span>Custom tailoring to your measurements</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-brand-gold mr-2" />
                    <span>Perfect fit guarantee</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="flex items-center space-x-4 mt-8">
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            >
              Add to Cart
            </Button>
            <Button 
              onClick={handleBuyNow}
              className="flex-1 bg-brand-gold hover:bg-brand-gold/90 text-white"
            >
              Buy Now
            </Button>
          </div>

          <div className="mt-6 flex items-center space-x-4">
            <Link 
              to="/size-chart" 
              className="text-sm flex items-center text-gray-600 hover:text-brand-gold dark:text-gray-300"
            >
              <Ruler className="h-4 w-4 mr-1" />
              <span>Size Chart</span>
            </Link>
            <Link 
              to="/custom-stitching" 
              className="text-sm flex items-center text-gray-600 hover:text-brand-gold dark:text-gray-300"
            >
              <Shirt className="h-4 w-4 mr-1" />
              <span>Custom Measurements</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDetailPage;
