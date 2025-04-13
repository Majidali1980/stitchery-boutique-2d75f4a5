import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Product } from '@/types';

// Define the CartItem type
interface ProductCartItem {
  type: 'product';
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

// Extend the CartItem type to include stitching orders
interface StitchingCartItem {
  type: 'stitching';
  service: {
    garmentType: string;
    serviceType: string;
    measurements: Record<string, number>;
    fabric?: string;
    designImage?: string | null;
    notes?: string;
    price: number;
  };
  quantity: number;
}

// Update CartItem type to be a union type
type CartItem = ProductCartItem | StitchingCartItem;

interface CartContextProps {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  addStitchingToCart: (stitchingService: StitchingCartItem['service']) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

export const CartContext = createContext<CartContextProps>({
  items: [],
  addToCart: () => {},
  addStitchingToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalPrice: 0,
  totalItems: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Calculate total price
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      if (item.type === 'product') {
        return total + (item.product.price * item.quantity);
      } else {
        return total + (item.service.price * item.quantity);
      }
    }, 0);
  }, [items]);
  
  // Calculate total items
  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);
  
  // Add product to cart
  const addToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    setItems(prevItems => {
      // Check if product already in cart with same size and color
      const existingItemIndex = prevItems.findIndex(
        item => item.type === 'product' && item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Add new item
        return [...prevItems, { 
          type: 'product',
          product, 
          quantity,
          selectedSize: size,
          selectedColor: color
        }];
      }
    });
  };

  // Add stitching service to cart
  const addStitchingToCart = (stitchingService: StitchingCartItem['service']) => {
    setItems(prevItems => {
      return [...prevItems, {
        type: 'stitching',
        service: stitchingService,
        quantity: 1
      }];
    });
  };
  
  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setItems(prevItems => {
      if (prevItems[0]?.type === 'product') {
        return prevItems.filter(item => 
          item.type === 'product' && item.product.id !== itemId
        );
      } else {
        // For stitching items, we'll use the index as the ID since they don't have a unique id
        const index = parseInt(itemId);
        return prevItems.filter((_, idx) => idx !== index);
      }
    });
  };
  
  // Update quantity of an item
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.type === 'product' && item.product.id === itemId) {
          return { ...item, quantity };
        } else if (item.type === 'stitching' && itemId === prevItems.indexOf(item).toString()) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };
  
  // Clear cart
  const clearCart = () => {
    setItems([]);
  };
  
  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      addStitchingToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPrice,
      totalItems,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
