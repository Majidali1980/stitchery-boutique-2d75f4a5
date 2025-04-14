
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  ArrowLeft, 
  Check, 
  Info, 
  Ruler, 
  Share2, 
  ShoppingBag,
  Scissors,
  Star
} from "lucide-react";
import { CustomDesign, Review } from '@/types/stitching';

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "rev1",
    userName: "Ahmed K.",
    rating: 5,
    comment: "Excellent design and quality fabric. The custom stitching was perfect!",
    date: "2023-12-10"
  },
  {
    id: "rev2",
    userName: "Sara M.",
    rating: 4,
    comment: "Beautiful design, though delivery took a bit longer than expected.",
    date: "2023-11-25"
  },
  {
    id: "rev3",
    userName: "Imran A.",
    rating: 5,
    comment: "The stitching quality is amazing. Will order again!",
    date: "2023-11-15"
  }
];

// We'll fetch from our custom design data later, for now using mock data
const getDesignById = (id: string): CustomDesign | undefined => {
  // This would be replaced with actual API call
  const allDesigns: CustomDesign[] = [
    // Suit designs
    {
      id: "suit-1",
      name: "Classic Royal Suit",
      type: "suit",
      category: "Wedding",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(1).jpeg?raw=true",
      description: "Traditional Pakistani suit with intricate embroidery",
      price: 15000,
      details: "This classic suit features hand-embroidered details on premium fabric. Ideal for formal occasions and celebrations, it combines traditional craftsmanship with modern tailoring techniques.",
      features: ["Hand embroidery", "Premium fabric", "Customizable length", "Full suit set"],
      materials: ["Premium cotton", "Silk thread", "Quality buttons"],
      stitchingOptions: ["Standard", "Premium", "Rush delivery"],
      reviews: mockReviews,
      designCode: "SR-001"
    },
    {
      id: "shirt-1",
      name: "Classic Collared",
      type: "shirt",
      category: "Formal",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(8).jpeg?raw=true",
      description: "Traditional collar design with premium stitching",
      price: 4500,
      details: "Our classic collared shirt is crafted with precision using the finest cotton. Perfect for both professional and casual settings, it features durable stitching and a comfortable fit.",
      features: ["Classic collar", "Premium stitching", "Business casual", "Formal wear"],
      materials: ["100% cotton", "Quality buttons", "Durable thread"],
      stitchingOptions: ["Standard", "Premium", "Express service"],
      reviews: mockReviews,
      designCode: "SC-001"
    },
    // Suit designs
    {
      id: "suit-2",
      name: "Modern Embroidery",
      type: "suit",
      category: "Formal",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(11).jpeg?raw=true",
      description: "Contemporary design with subtle embroidery details",
      price: 12500,
      designCode: "SR-002",
      details: "A contemporary take on traditional embroidery, this suit features subtle yet elegant details.",
      features: ["Contemporary design", "Subtle embroidery", "Premium fabric"],
      materials: ["Premium cotton", "High-quality thread"],
      stitchingOptions: ["Standard", "Premium", "Rush delivery"],
      reviews: mockReviews
    },
    {
      id: "suit-3",
      name: "Formal Elegance",
      type: "suit",
      category: "Formal",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(13).jpeg?raw=true",
      description: "Sophisticated formal wear with premium stitching",
      price: 18000,
      designCode: "SR-003",
      details: "An elegant formal suit with premium stitching and attention to detail.",
      features: ["Premium stitching", "Formal design", "Quality fabric"],
      materials: ["Premium cotton", "Silk thread"],
      stitchingOptions: ["Standard", "Premium", "Rush delivery"],
      reviews: mockReviews
    },
    {
      id: "shirt-2",
      name: "Modern Cut",
      type: "shirt",
      category: "Modern",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(6).jpeg?raw=true",
      description: "Contemporary cut with clean lines",
      price: 5000,
      designCode: "SC-002",
      details: "A modern shirt with clean lines and contemporary styling.",
      features: ["Modern cut", "Clean lines", "Comfortable fit"],
      materials: ["Premium cotton", "Quality buttons"],
      stitchingOptions: ["Standard", "Premium", "Rush delivery"],
      reviews: mockReviews
    },
    {
      id: "shirt-3",
      name: "Embroidered Collar",
      type: "shirt",
      category: "Premium",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(10).jpeg?raw=true",
      description: "Detailed embroidery around collar and cuffs",
      price: 6500,
      designCode: "SC-003",
      details: "Features detailed embroidery around the collar and cuffs for a premium look.",
      features: ["Embroidered collar", "Embroidered cuffs", "Premium fabric"],
      materials: ["Premium cotton", "Silk thread"],
      stitchingOptions: ["Standard", "Premium", "Rush delivery"],
      reviews: mockReviews
    },
    // Additional designs
    {
      id: "suit-4",
      name: "Wedding Collection",
      type: "suit",
      category: "Wedding",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(14).jpeg?raw=true",
      description: "Perfect for special occasions and celebrations",
      price: 22000,
      designCode: "SR-004",
      details: "A luxurious suit designed specifically for weddings and special occasions.",
      features: ["Wedding design", "Luxury fabric", "Premium stitching"],
      materials: ["Premium cotton", "Gold thread"],
      stitchingOptions: ["Standard", "Premium", "Rush delivery"],
      reviews: mockReviews
    },
    {
      id: "shirt-7",
      name: "Premium Cotton",
      type: "shirt",
      category: "Premium",
      imageUrl: "https://github.com/Majidali1980/lmages/blob/main/1%20(22).jpeg?raw=true",
      description: "Made with the finest cotton for superior comfort",
      price: 6000,
      designCode: "SC-007",
      details: "Our premium cotton shirt offers superior comfort and durability.",
      features: ["Premium cotton", "Superior comfort", "Durable design"],
      materials: ["Premium cotton", "Quality buttons"],
      stitchingOptions: ["Standard", "Premium", "Rush delivery"],
      reviews: mockReviews
    },
  ];
  
  return allDesigns.find(design => design.id === id);
};

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

const ReviewForm = ({ designId }: { designId: string }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle submitting the review to your backend
    toast({
      title: "Review submitted!",
      description: "Thank you for your review! It will be visible after moderation."
    });
    setName("");
    setComment("");
    setRating(5);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium">Your Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      
      <div>
        <label className="block mb-1 text-sm font-medium">Rating</label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="comment" className="block mb-1 text-sm font-medium">Your Review</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-md h-24"
          required
        />
      </div>
      
      <Button type="submit" className="bg-brand-gold hover:bg-brand-gold/90 text-white">
        Submit Review
      </Button>
    </form>
  );
};

const DesignDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [design, setDesign] = useState<CustomDesign | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
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
  
  const handleBuyNow = () => {
    if (design) {
      toast({
        title: "Item added to cart!",
        description: `${design.name} has been added to your cart.`
      });
      // Navigate to checkout page
      navigate('/checkout');
    }
  };
  
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
        <div className="flex justify-center space-x-4">
          <Button asChild className="bg-brand-gold hover:bg-brand-gold/90">
            <Link to="/custom-stitching">Browse All Designs</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const handleShareDesign = () => {
    if (navigator.share) {
      navigator.share({
        title: design.name,
        text: design.description || 'Check out this design from our collection',
        url: window.location.href,
      });
    }
  };
  
  return (
    <div className="container py-16">
      {/* Marquee for promotions */}
      <div className="bg-brand-gold text-white py-3 px-4 mb-8 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          🧵 Design Code: {design.designCode || design.id} • Select this design for custom stitching • Free shipping on orders over Rs.15000 • Custom stitching available for all designs • 
        </div>
        <div className="animate-marquee inline-block absolute">
          🧵 Design Code: {design.designCode || design.id} • Select this design for custom stitching • Free shipping on orders over Rs.15000 • Custom stitching available for all designs • 
        </div>
      </div>
      
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/custom-stitching">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Designs
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden border-2 border-gray-100 dark:border-gray-800 relative">
          <img 
            src={design.imageUrl} 
            alt={design.name} 
            className="w-full h-auto object-cover"
          />
          <div className="absolute top-4 right-4 bg-brand-gold text-white px-3 py-2 rounded-full">
            <span className="font-bold">Code: {design.designCode || design.id}</span>
          </div>
          {design.category && (
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-md">
              <span className="font-medium">{design.category}</span>
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{design.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{design.description}</p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-brand-gold hover:bg-brand-gold/90 text-white"
              asChild
            >
              <Link to={`/custom-stitching?designId=${design.id}&type=${design.type}`}>
                <Scissors className="mr-2 h-5 w-5" />
                Select for Custom Stitching
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleBuyNow}
              className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Buy Now
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
              <p className="text-gray-600 dark:text-gray-300">{design.details || 'No detailed description available for this design.'}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <ul className="space-y-2">
                {design.features ? (
                  design.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      {feature}
                    </li>
                  ))
                ) : (
                  <>
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
                  </>
                )}
              </ul>
            </div>
            
            {design.materials && design.materials.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Materials</h3>
                <ul className="space-y-2">
                  {design.materials.map((material, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
                <li>Select this design for custom stitching</li>
                <li>Provide your measurements or select standard size</li>
                <li>Choose your fabric (optional)</li>
                <li>Add any special requirements</li>
                <li>Complete your order</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="description" className="mt-16">
        <TabsList className="w-full justify-start border-b rounded-none">
          <TabsTrigger value="description" className="text-lg">Description</TabsTrigger>
          <TabsTrigger value="stitching-options" className="text-lg">Stitching Options</TabsTrigger>
          <TabsTrigger value="reviews" className="text-lg">Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="py-6">
          <div className="space-y-4">
            <p>{design.details || design.description}</p>
            <p>
              Our {design.type} designs are created with attention to detail and quality craftsmanship. 
              Each design is unique and can be customized according to your preferences.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="stitching-options" className="py-6">
          <div className="space-y-4">
            <p>We offer various stitching options for this design:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Standard Stitching</CardTitle>
                  <CardDescription>Rs. 2,500</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>7-10 days delivery</li>
                    <li>Standard fabric</li>
                    <li>Basic customization</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-brand-gold hover:bg-brand-gold/90">
                    <Link to={`/custom-stitching?designId=${design.id}&type=${design.type}&service=standard`}>
                      Select
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-brand-gold">
                <div className="bg-brand-gold text-white text-center py-1 text-sm">
                  POPULAR CHOICE
                </div>
                <CardHeader>
                  <CardTitle>Premium Stitching</CardTitle>
                  <CardDescription>Rs. 4,000</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>5-7 days delivery</li>
                    <li>Premium fabric</li>
                    <li>Full customization</li>
                    <li>One free alteration</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-brand-gold hover:bg-brand-gold/90">
                    <Link to={`/custom-stitching?designId=${design.id}&type=${design.type}&service=premium`}>
                      Select
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Express Stitching</CardTitle>
                  <CardDescription>Rs. 5,500</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>3-4 days delivery</li>
                    <li>Premium fabric</li>
                    <li>Full customization</li>
                    <li>Two free alterations</li>
                    <li>Priority service</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-brand-gold hover:bg-brand-gold/90">
                    <Link to={`/custom-stitching?designId=${design.id}&type=${design.type}&service=custom`}>
                      Select
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="py-6">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              
              {design.reviews && design.reviews.length > 0 ? (
                <div className="space-y-6">
                  {design.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{review.userName}</p>
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet for this design.</p>
              )}
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
              <ReviewForm designId={design.id} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignDetailPage;
