
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  };
  
  return (
    <div className={cn("product-card group relative", className)}>
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-md aspect-[3/4]">
          <img
            src={product.images[0]} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-medium px-4 py-2 bg-red-500 rounded-md">
                Out of Stock
              </span>
            </div>
          )}
          
          <div className="product-actions absolute right-3 top-3 flex flex-col space-y-2">
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white hover:bg-brand-gold hover:text-white transition-all"
              onClick={handleAddToWishlist}
            >
              <Heart 
                className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""} 
                size={18} 
              />
            </Button>
            
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white hover:bg-brand-gold hover:text-white transition-all"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
            </Button>
            
            <Link to={`/products/${product.id}`} onClick={(e) => e.stopPropagation()}>
              <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full bg-white hover:bg-brand-gold hover:text-white transition-all"
              >
                <Eye size={18} />
              </Button>
            </Link>
          </div>
          
          {product.type === "unstitched" && (
            <span className="absolute left-3 top-3 bg-brand-gold text-white text-xs px-2 py-1 rounded">
              Unstitched
            </span>
          )}
        </div>
        
        <div className="mt-3 text-center">
          <h3 className="font-medium text-lg truncate">{product.name}</h3>
          <p className="text-brand-gold font-semibold mt-1">
            Rs. {product.price.toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
