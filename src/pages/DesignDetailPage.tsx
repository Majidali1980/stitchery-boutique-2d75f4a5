import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CustomDesign } from "@/types/stitching";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { suitDesigns, shirtDesigns, trouserDesigns, kameezShalwarDesigns } from "@/data/stitching-designs";
import { Check, Ruler, Shirt, Star } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const DesignDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [design, setDesign] = useState<CustomDesign | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const [userReview, setUserReview] = useState({ name: "", comment: "", rating: 5 });
  const [reviews, setReviews] = useState<Array<{name: string; comment: string; rating: number; date: string}>>([]);

  useEffect(() => {
    // Find design across all design types
    const allDesigns = [...suitDesigns, ...shirtDesigns, ...trouserDesigns, ...kameezShalwarDesigns];
    const foundDesign = allDesigns.find(d => d.id === id);
    
    setDesign(foundDesign || null);
    setLoading(false);
  }, [id]);

  const handleCustomStitching = () => {
    if (!isSignedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to proceed with custom stitching.",
        variant: "destructive",
      });
      return;
    }
    
    if (!design) return;
    
    // Navigate to custom stitching page with design parameters
    navigate(`/custom-stitching?designId=${design.id}&type=${design.type}`);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userReview.name.trim() || !userReview.comment.trim()) {
      toast({
        title: "Review submission failed",
        description: "Please provide your name and comment",
        variant: "destructive"
      });
      return;
    }

    const newReview = {
      ...userReview,
      date: new Date().toISOString()
    };

    setReviews(prev => [newReview, ...prev]);
    setUserReview({ name: "", comment: "", rating: 5 });

    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!"
    });
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
    <div className="container py-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Design Image */}
        <div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-full">
            <img 
              src={design.imageUrl}
              alt={design.name}
              className="object-contain w-full h-full max-h-[500px] rounded"
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
            <Badge variant="outline" className="ml-0">
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

          <Button 
            onClick={handleCustomStitching}
            className="w-full mt-8 bg-brand-gold hover:bg-brand-gold/90 text-white"
          >
            Get This Design Custom Stitched
          </Button>

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

      {/* Review Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
        
        {/* Submit Review Form */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-medium mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                <Input 
                  id="name" 
                  value={userReview.name}
                  onChange={(e) => setUserReview({...userReview, name: e.target.value})}
                  placeholder="Enter your name"
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="rating" className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserReview({...userReview, rating: star})}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`h-6 w-6 ${star <= userReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="comment" className="block text-sm font-medium mb-1">Your Review</label>
              <Textarea 
                id="comment" 
                value={userReview.comment}
                onChange={(e) => setUserReview({...userReview, comment: e.target.value})}
                placeholder="Share your thoughts about this design"
                className="w-full"
                rows={4}
              />
            </div>
            <Button type="submit" className="mt-4 bg-brand-gold hover:bg-brand-gold/90 text-white">
              Submit Review
            </Button>
          </form>
        </div>

        {/* Display Reviews */}
        <div className="space-y-6">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border-b pb-6 last:border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{review.name}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-300">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No reviews yet. Be the first to review this design!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignDetailPage;
