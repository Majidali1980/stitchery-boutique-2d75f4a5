
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";
import { CustomStitchingOrder, CartItemType, ProductCartItem, StitchingCartItem } from "@/types/stitching";

export interface CartContextProps {
  items: CartItemType[];
  addItem: (item: Product) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  addToCart: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void;
  addStitchingToCart: (stitchingOrder: Omit<CustomStitchingOrder, 'id' | 'customerId' | 'customerName' | 'customerPhone' | 'customerEmail' | 'status' | 'createdAt'>) => void;
  removeFromCart: (itemId: string) => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItemType[]>([]);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        item => item.type === 'product' && item.product.id === product.id
      );
      
      if (existingItemIndex >= 0) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem: ProductCartItem = {
          type: 'product',
          product,
          quantity: 1
        };
        return [...prevItems, newItem];
      }
    });
  };

  const addToCart = (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        item => item.type === 'product' && item.product.id === product.id
      );
      
      if (existingItemIndex >= 0) {
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                ...(selectedSize && { selectedSize }),
                ...(selectedColor && { selectedColor }),
              }
            : item
        );
      } else {
        const newItem: ProductCartItem = {
          type: 'product',
          product,
          quantity,
          selectedSize,
          selectedColor
        };
        return [...prevItems, newItem];
      }
    });
  };

  const addStitchingToCart = (stitchingOrder: Omit<CustomStitchingOrder, 'id' | 'customerId' | 'customerName' | 'customerPhone' | 'customerEmail' | 'status' | 'createdAt'>) => {
    const newStitchingItem: StitchingCartItem = {
      type: 'stitching',
      service: {
        id: `stitch-${Date.now()}`,
        customerId: '',
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        status: 'pending',
        createdAt: new Date().toISOString(),
        ...stitchingOrder
      },
      quantity: 1
    };
    
    setItems(prevItems => [...prevItems, newStitchingItem]);
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter(item => 
      (item.type === 'product' && item.product.id !== itemId) || 
      (item.type === 'stitching' && item.service.id !== itemId)
    ));
  };

  const removeFromCart = (itemId: string) => {
    removeItem(itemId);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) =>
        (item.type === 'product' && item.product.id === itemId) || 
        (item.type === 'stitching' && item.service.id === itemId)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce(
    (total, item) => {
      if (item.type === 'product') {
        return total + item.product.price * item.quantity;
      } else {
        return total + item.service.price * item.quantity;
      }
    },
    0
  );

  const totalPrice = subtotal;

  return (
    <CartContext.Provider
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart, 
        subtotal,
        addToCart,
        addStitchingToCart,
        removeFromCart,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
