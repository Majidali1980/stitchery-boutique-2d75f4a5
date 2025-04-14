import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Heart, ShoppingCart, Minus, Plus, Check, ArrowRight,
  ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Share2, LinkIcon, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { getProductById, products, getProductsByCategory } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductGrid from "@/components/products/ProductGrid";

const SizeChart = ({ type }: { type: string }) => {
  const measurements = [
    { label: "Chest", description: "Measured under armpits around chest" },
    { label: "Length", description: "From shoulder to bottom hem" },
    { label: "Shoulder Width", description: "From shoulder seam to shoulder seam" },
    { label: "Sleeve", description: "From shoulder seam to sleeve end" },
    { label: "Daman", description: "Width at the bottom hem" },
    { label: "Collar", description: "Neck circumference" },
  ];
  
  const shalwarMeasurements = [
    { label: "Waist", description: "Around natural waistline" },
    { label: "Hip", description: "Around fullest part of hip" },
    { label: "Length", description: "From waist to ankle" },
    { label: "Bottom Width", description: "Width at ankle" }
  ];
  
  const selectedMeasurements = type.includes("shalwar") ? shalwarMeasurements : measurements;
  
  const sizes = ["S", "M", "L", "XL"];
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="border px-4 py-2 text-left">Size</th>
            {selectedMeasurements.map((m) => (
              <th key={m.label} className="border px-4 py-2 text-left">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="border-b border-dotted border-gray-400">{m.label}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{m.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizes.map((size, i) => (
            <tr key={size} className={i % 2 === 0 ? "" : "bg-gray-50"}>
              <td className="border px-4 py-2">{size}</td>
              {selectedMeasurements.map((m, j) => (
                <td key={`${size}-${m.label}`} className="border px-4 py-2">
                  {m.label === "Length" ? 38 + (i * 2) : 
                   m.label === "Chest" ? 36 + (i * 2) : 
                   m.label === "Shoulder Width" ? 16 + (i * 0.5) : 
                   m.label === "Sleeve" ? 24 + (i * 1) :
                   m.label === "Daman" ? 22 + (i * 1) :
                   m.label === "Waist" ? 30 + (i * 2) :
                   m.label === "Hip" ? 36 + (i * 2) :
                   m.label === "Bottom Width" ? 16 + (i * 0.5) :
                   16 + (i * 0.5)} in
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getSizePrice = (basePrice: number, size: string): number => {
  switch(size) {
    case "XS": return basePrice - 200;
    case "S": return basePrice;
    case "M": return basePrice + 300;
    case "L": return basePrice + 600;
    case "XL": return basePrice + 900;
    case "XXL": return basePrice + 1200;
    default: return basePrice;
  }
};

interface ReviewFormProps {
  productId: string;
  onSubmit: (review: {name: string, rating: number, comment: string}) => void;
}

const ReviewForm = ({ productId, onSubmit }: ReviewFormProps) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, rating, comment });
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

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  
  const product = getProductById(id || "");
  
  if (!product) {
    navigate("/products");
    return null;
  }
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [reviews, setReviews] = useState<{ name: string, rating: number, comment: string, date: string }[]>([
    { name: "Sarah A.", rating: 5, comment: "Excellent quality and fit! Very happy with my purchase.", date: "2023-12-15" },
    { name: "Amir K.", rating: 4, comment: "Good product, but delivery was a bit delayed.", date: "2023-11-25" },
  ]);
  
  const calculatedPrice = getSizePrice(product.price, selectedSize);
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const nextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % product.images.length);
  };
  
  const prevImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    toast({
      title: "Product added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    });
  };
  
  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast({
      title: isInWishlist(product.id) ? "Already in wishlist" : "Added to wishlist",
      description: isInWishlist(product.id) 
        ? `${product.name} is already in your wishlist` 
        : `${product.name} has been added to your wishlist`,
    });
  };
  
  const handleAddReview = (review: {name: string, rating: number, comment: string}) => {
    const newReview = {
      ...review,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newReview, ...prev]);
    toast({
      title: "Thank you for your review!",
      description: "Your review has been submitted successfully.",
    });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Product link copied to clipboard",
    });
  };
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const similarTypeProducts = products
    .filter(p => p.type === product.type && p.id !== product.id && p.category !== product.category)
    .slice(0, 4);
  
  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center text-sm">
        <Link to="/" className="text-gray-500 hover:text-brand-gold">
          Home
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/products" className="text-gray-500 hover:text-brand-gold">
          Products
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link 
          to={`/products?category=${product.category}`} 
          className="text-gray-500 hover:text-brand-gold"
        >
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="font-medium">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="relative overflow-hidden rounded-lg aspect-square">
            <img
              src={product.images[currentImgIndex]}
              alt={product.name}
              className="object-cover w-full h-full"
            />
            
            {product.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft size={20} />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight size={20} />
                </Button>
              </>
            )}
          </div>
          
          <div className="flex space-x-2 mt-4">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                className={`cursor-pointer border-2 rounded-md overflow-hidden w-20 h-20 ${
                  currentImgIndex === idx ? 'border-brand-gold' : 'border-transparent'
                }`}
                onClick={() => setCurrentImgIndex(idx)}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${idx+1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">Share this product:</p>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full" 
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              >
                <Facebook size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full" 
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
              >
                <Twitter size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full" 
                onClick={() => window.open(`https://www.instagram.com/`, '_blank')}
              >
                <Instagram size={16} />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full" 
                onClick={copyToClipboard}
              >
                <LinkIcon size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          
          <div className="text-2xl font-bold text-brand-gold mb-4">
            Rs. {calculatedPrice.toLocaleString()}
            {selectedSize && (
              <span className="text-sm text-gray-500 ml-2">
                (Price for size {selectedSize})
              </span>
            )}
          </div>
          
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <Separator className="my-6" />
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Product Type</p>
            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {product.type === "ready-to-wear" ? "Ready to Wear" : "Unstitched"}
            </span>
          </div>
          
          {product.type === "ready-to-wear" && product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Size</p>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex space-x-2">
                {product.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="hidden"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border cursor-pointer ${
                        selectedSize === size
                          ? "border-brand-gold bg-brand-gold text-white"
                          : "border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <p className="text-sm text-gray-500 mt-2">
                *Price varies based on size selection
              </p>
            </div>
          )}
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Quantity</p>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10 rounded-full"
              >
                <Minus size={16} />
              </Button>
              
              <span className="text-lg font-medium">{quantity}</span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                className="h-10 w-10 rounded-full"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold/90 flex items-center"
              size="lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2" size={18} />
              Add to Cart
            </Button>
            
            <Button
              variant="outline"
              className="w-full sm:w-auto border-brand-gold text-brand-gold hover:bg-brand-gold/10"
              size="lg"
              onClick={handleAddToWishlist}
            >
              <Heart
                className={`mr-2 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`}
                size={18}
              />
              {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
            </Button>
            
            <Button
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
              size="lg"
              asChild
            >
              <Link to="/cart">
                Buy Now <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          {product.type === "unstitched" && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-lg font-medium mb-2">Custom Stitching Available</h3>
              <p className="text-gray-600 text-sm mb-4">
                You can get this fabric custom stitched according to your measurements. 
                Various stitching options are available including dori piping, lace work, and more.
              </p>
              <Button asChild variant="outline">
                <Link to="/custom-stitching">View Stitching Options</Link>
              </Button>
            </div>
          )}
          
          <div className="flex items-start space-x-4 mt-6">
            <div className="flex flex-col items-center">
              <Check className="text-brand-gold" size={18} />
              <div className="w-px h-full bg-gray-200 my-1"></div>
            </div>
            <div>
              <h4 className="font-medium">Free Shipping</h4>
              <p className="text-sm text-gray-500">On orders over Rs. 3000</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 mt-4">
            <div className="flex flex-col items-center">
              <Check className="text-brand-gold" size={18} />
              <div className="w-px h-full bg-gray-200 my-1"></div>
            </div>
            <div>
              <h4 className="font-medium">Quality Assurance</h4>
              <p className="text-sm text-gray-500">Premium fabrics and stitching</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 mt-4">
            <Check className="text-brand-gold" size={18} />
            <div>
              <h4 className="font-medium">Easy Returns</h4>
              <p className="text-sm text-gray-500">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description" className="text-lg">Description</TabsTrigger>
            <TabsTrigger value="sizing" className="text-lg">Sizing Guide</TabsTrigger>
            <TabsTrigger value="care" className="text-lg">Care Instructions</TabsTrigger>
            <TabsTrigger value="reviews" className="text-lg">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="py-6">
            <div className="space-y-4">
              <p>{product.description}</p>
              <p>
                Our {product.type === "ready-to-wear" ? "ready-to-wear" : "unstitched"} {product.name.toLowerCase()} is designed to enhance your style and comfort. 
                Made from premium quality materials, this piece showcases exquisite craftsmanship and attention to detail.
              </p>
              <p>
                {product.type === "ready-to-wear" 
                  ? "The outfit is fully stitched and ready to wear for your convenience." 
                  : "This unstitched fabric set can be tailored according to your preferences and measurements."}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="sizing" className="py-6">
            <div className="space-y-4">
              <p>
                {product.type === "ready-to-wear" 
                  ? "Our clothing is available in standard sizes. Please refer to the size chart below to find your perfect fit." 
                  : "This is an unstitched fabric set that can be tailored according to your specific measurements."}
              </p>
              
              {product.type === "ready-to-wear" && (
                <SizeChart type={product.category} />
              )}
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Price by Size</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.sizes?.map((size) => (
                    <div key={size} className="flex justify-between p-2 border-b">
                      <span className="font-medium">Size {size}</span>
                      <span>Rs. {getSizePrice(product.price, size).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="care" className="py-6">
            <div className="space-y-4">
              <p>
                To maintain the quality and longevity of your {product.name}, please follow these care instructions:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Dry clean only</li>
                <li>Do not bleach</li>
                <li>Iron on low heat</li>
                <li>Store in a cool, dry place</li>
                <li>Handle embellishments with care</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Note: Colors may vary slightly from the images due to photography lighting and display settings.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b pb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <p className="mt-2">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No reviews yet. Be the first to review this product!</p>
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                <ReviewForm productId={product.id} onSubmit={handleAddReview} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
      
      {similarTypeProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
            You May Also Like
            {product.type === "ready-to-wear" ? " (Ready to Wear)" : " (Unstitched)"}
          </h2>
          <ProductGrid products={similarTypeProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
