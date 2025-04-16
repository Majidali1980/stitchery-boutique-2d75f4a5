
import React from 'react';
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductCartItem as ProductCartItemType } from "@/types/stitching";

interface ProductCartItemProps {
  item: ProductCartItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const ProductCartItem: React.FC<ProductCartItemProps> = ({ 
  item, 
  onQuantityChange, 
  onRemove 
}) => {
  return (
    <div className="flex gap-4 border-b pb-4">
      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
        <img 
          src={item.product.images[0]} 
          alt={item.product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.product.name}</h3>
          <span className="font-semibold">
            Rs. {(item.product.price * item.quantity).toLocaleString()}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 mt-1">
          {item.selectedSize && <span className="mr-3">Size: {item.selectedSize}</span>}
          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded">
            <button 
              onClick={() => onQuantityChange(item.product.id, item.quantity - 1)}
              className="px-2 py-1"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <Input 
              type="number"
              value={item.quantity}
              onChange={(e) => onQuantityChange(
                item.product.id, 
                parseInt(e.target.value) || 1
              )}
              className="w-12 text-center p-0 border-none focus-visible:ring-0"
              min="1"
            />
            <button 
              onClick={() => onQuantityChange(item.product.id, item.quantity + 1)}
              className="px-2 py-1"
            >
              <Plus size={16} />
            </button>
          </div>
          <button 
            onClick={() => onRemove(item.product.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCartItem;
