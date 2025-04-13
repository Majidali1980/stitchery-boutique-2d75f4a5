
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Product } from "@/types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);
  
  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Item already in cart",
          description: `Updated ${product.name} quantity to ${existingItem.quantity + quantity}`,
        });
        
        return prevItems.map(item => 
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart`,
      });
      
      return [...prevItems, { product, quantity }];
    });
  };
  
  const removeItem = (productId: string) => {
    setItems(prevItems => {
      const filtered = prevItems.filter(item => item.product.id !== productId);
      
      toast({
        title: "Item removed",
        description: "Item removed from your cart",
      });
      
      return filtered;
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      return removeItem(productId);
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "Your cart has been cleared",
    });
  };
  
  const totalItems = items.reduce(
    (total, item) => total + item.quantity, 
    0
  );
  
  const totalPrice = items.reduce(
    (total, item) => total + (item.product.price * item.quantity), 
    0
  );
  
  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
