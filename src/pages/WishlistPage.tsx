
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Heart className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added any items to your wishlist yet.
          </p>
          <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold/90">
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold mb-8">My Wishlist</h1>
      
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearWishlist}
        >
          <Trash2 size={16} className="mr-2" />
          Clear Wishlist
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg border shadow-sm overflow-hidden"
          >
            <Link to={`/products/${product.id}`} className="block">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={product.images[0]} 
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
                
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-medium px-4 py-2 bg-red-500 rounded-md">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </Link>
            
            <div className="p-4">
              <Link to={`/products/${product.id}`} className="block hover:text-brand-gold">
                <h3 className="font-medium truncate">{product.name}</h3>
              </Link>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-brand-gold font-semibold">
                  Rs. {product.price.toLocaleString()}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  product.type === "ready-to-wear" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-blue-100 text-blue-800"
                }`}>
                  {product.type === "ready-to-wear" ? "Ready to Wear" : "Unstitched"}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => removeItem(product.id)}
                >
                  Remove
                </Button>
                <Button 
                  className="bg-brand-gold hover:bg-brand-gold/90"
                  size="sm"
                  onClick={() => addItem(product)}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
