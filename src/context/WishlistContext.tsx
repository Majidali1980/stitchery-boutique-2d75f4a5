
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Product } from "@/types";

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);
  
  const addItem = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Already in wishlist",
          description: `${product.name} is already in your wishlist`,
        });
        return prevItems;
      }
      
      toast({
        title: "Added to wishlist",
        description: `${product.name} added to your wishlist`,
      });
      
      return [...prevItems, product];
    });
  };
  
  const removeItem = (productId: string) => {
    setItems(prevItems => {
      const filtered = prevItems.filter(item => item.id !== productId);
      
      toast({
        title: "Item removed",
        description: "Item removed from your wishlist",
      });
      
      return filtered;
    });
  };
  
  const isInWishlist = (productId: string): boolean => {
    return items.some(item => item.id === productId);
  };
  
  const clearWishlist = () => {
    setItems([]);
    toast({
      title: "Wishlist cleared",
      description: "Your wishlist has been cleared",
    });
  };
  
  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
