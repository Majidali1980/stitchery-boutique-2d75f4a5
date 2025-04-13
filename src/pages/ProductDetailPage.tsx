
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Heart, ShoppingCart, Minus, Plus, Check, ArrowRight,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductGrid from "@/components/products/ProductGrid";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  
  const product = getProductById(id || "");
  
  // If product not found, redirect to products page
  if (!product) {
    navigate("/products");
    return null;
  }
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  
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
    addItem(product, quantity);
  };
  
  const handleAddToWishlist = () => {
    addToWishlist(product);
  };
  
  // Get similar products (same category)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
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
        <span className="font-medium">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
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
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 mt-4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer border-2 rounded-md overflow-hidden w-20 h-20 ${
                    currentImgIndex === idx ? "border-brand-gold" : "border-transparent"
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
          )}
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          
          <div className="text-2xl font-bold text-brand-gold mb-4">
            Rs. {product.price.toLocaleString()}
          </div>
          
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <Separator className="my-6" />
          
          {/* Product Type */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Product Type</p>
            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {product.type === "ready-to-wear" ? "Ready to Wear" : "Unstitched"}
            </span>
          </div>
          
          {/* Sizes */}
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
            </div>
          )}
          
          {/* Quantity */}
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
          
          {/* Action Buttons */}
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
              className="w-full sm:w-auto"
              size="lg"
              asChild
            >
              <Link to="/cart">
                Buy Now <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          {/* Custom Stitching Info */}
          {product.type === "unstitched" && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-lg font-medium mb-2">Custom Stitching Available</h3>
              <p className="text-gray-600 text-sm mb-4">
                You can get this fabric custom stitched according to your measurements. 
                Various stitching options are available including dori piping, lace work, and more.
              </p>
              <Button asChild variant="outline">
                <Link to="/services">View Stitching Options</Link>
              </Button>
            </div>
          )}
          
          {/* Delivery Info */}
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
      
      {/* Product Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description" className="text-lg">Description</TabsTrigger>
            <TabsTrigger value="sizing" className="text-lg">Sizing Guide</TabsTrigger>
            <TabsTrigger value="care" className="text-lg">Care Instructions</TabsTrigger>
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
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border px-4 py-2 text-left">Size</th>
                        <th className="border px-4 py-2 text-left">Bust (inches)</th>
                        <th className="border px-4 py-2 text-left">Waist (inches)</th>
                        <th className="border px-4 py-2 text-left">Hip (inches)</th>
                        <th className="border px-4 py-2 text-left">Length (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2">S</td>
                        <td className="border px-4 py-2">34-36</td>
                        <td className="border px-4 py-2">28-30</td>
                        <td className="border px-4 py-2">36-38</td>
                        <td className="border px-4 py-2">42</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border px-4 py-2">M</td>
                        <td className="border px-4 py-2">36-38</td>
                        <td className="border px-4 py-2">30-32</td>
                        <td className="border px-4 py-2">38-40</td>
                        <td className="border px-4 py-2">43</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2">L</td>
                        <td className="border px-4 py-2">38-40</td>
                        <td className="border px-4 py-2">32-34</td>
                        <td className="border px-4 py-2">40-42</td>
                        <td className="border px-4 py-2">44</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border px-4 py-2">XL</td>
                        <td className="border px-4 py-2">40-42</td>
                        <td className="border px-4 py-2">34-36</td>
                        <td className="border px-4 py-2">42-44</td>
                        <td className="border px-4 py-2">45</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
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
        </Tabs>
      </div>
      
      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => (
              <ProductGrid key={product.id} products={[product]} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
